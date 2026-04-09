/**
 * Types + parser for GET /usage/month (authenticated with X-API-Key per key).
 * Supports aggregate fields, per-key `usage` maps (key id → scan count), and `by_product` rows.
 */

export interface ProductUsageRow {
  name: string;
  scans: number;
  pct: number;
  avgConf: number;
}

export interface ConsoleUsageData {
  scans_used: number;
  scans_limit: number;
  scans_remaining: number;
  avg_response_ms: number;
  reset_date: string;
  by_product: ProductUsageRow[];
  usage_period_label?: string;
  usage_row_kind?: 'key' | 'product';
  /** Shown in sidebar credit line when API returns a plan label */
  plan_name?: string;
}

export const USAGE_FALLBACK: ConsoleUsageData = {
  scans_used: 280,
  scans_limit: 1000,
  scans_remaining: 720,
  avg_response_ms: 1200,
  reset_date: 'May 1, 2026',
  by_product: [
    { name: 'Sentinel', scans: 142, pct: 50.7, avgConf: 0.91 },
    { name: 'Gotham', scans: 88, pct: 31.4, avgConf: 0.87 },
    { name: 'Atlas', scans: 34, pct: 12.1, avgConf: 0.83 },
    { name: 'Foundry', scans: 16, pct: 5.7, avgConf: 0.79 },
  ],
  usage_row_kind: 'product',
  plan_name: 'Enterprise',
};

interface UsageMeLike {
  owner?: string;
  track?: string;
  plan?: string;
  rate_per_scan?: number;
  monthly_limit?: number;
  used_this_month?: number;
  remaining?: number;
  resets_at?: string;
}

function shortenKeyId(id: string): string {
  if (id.length <= 14) return id;
  return `${id.slice(0, 10)}…`;
}

function formatBillingMonth(raw: string | undefined): string | undefined {
  if (!raw || typeof raw !== 'string') return undefined;
  const m = /^(\d{4})-(\d{2})/.exec(raw.trim());
  if (!m) return raw;
  const year = Number(m[1]);
  const monthIdx = Number(m[2]) - 1;
  if (monthIdx < 0 || monthIdx > 11) return raw;
  const names = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  return `${names[monthIdx]} ${year}`;
}

export function parseUsageMonthJson(json: Record<string, unknown>): ConsoleUsageData {
  const avgMs =
    typeof json.avg_response_ms === 'number' && !Number.isNaN(json.avg_response_ms)
      ? json.avg_response_ms
      : USAGE_FALLBACK.avg_response_ms;

  const rawUsage = json.usage;
  if (rawUsage && typeof rawUsage === 'object' && !Array.isArray(rawUsage)) {
    const usageMap = rawUsage as Record<string, unknown>;
    const entries = Object.entries(usageMap).filter(
      ([, v]) => typeof v === 'number' && !Number.isNaN(v as number),
    ) as [string, number][];

    const totalUsed = entries.reduce((s, [, n]) => s + n, 0);

    const monthlyLimit =
      typeof json.monthly_limit === 'number'
        ? json.monthly_limit
        : typeof json.scans_limit === 'number'
          ? json.scans_limit
          : USAGE_FALLBACK.scans_limit;

    let remaining: number;
    if (typeof json.remaining === 'number') {
      remaining = json.remaining;
    } else if (typeof json.scans_remaining === 'number') {
      remaining = json.scans_remaining;
    } else if (monthlyLimit >= 999999) {
      remaining = monthlyLimit;
    } else {
      remaining = Math.max(0, monthlyLimit - totalUsed);
    }

    const resetDate =
      (typeof json.resets_at === 'string' && json.resets_at) ||
      (typeof json.reset_date === 'string' && json.reset_date) ||
      formatBillingMonth(typeof json.month === 'string' ? json.month : undefined) ||
      USAGE_FALLBACK.reset_date;

    const period = typeof json.month === 'string' ? json.month : undefined;

    const usedAggregate =
      typeof json.used_this_month === 'number' ? json.used_this_month : totalUsed;

    const by_product: ProductUsageRow[] =
      entries.length === 0
        ? []
        : entries.map(([id, scans]) => ({
            name: shortenKeyId(id),
            scans,
            pct: totalUsed > 0 ? Math.round((scans / totalUsed) * 1000) / 10 : 0,
            avgConf: 0,
          }));

    return {
      scans_used: usedAggregate,
      scans_limit: monthlyLimit,
      scans_remaining: remaining,
      avg_response_ms: avgMs,
      reset_date: resetDate,
      by_product,
      usage_period_label: period ? formatBillingMonth(period) || period : undefined,
      usage_row_kind: 'key',
      plan_name: typeof json.plan === 'string' ? json.plan : undefined,
    };
  }

  const u = json as UsageMeLike & Record<string, unknown>;

  const scansLimit =
    u.monthly_limit ??
    (typeof json.scans_limit === 'number' ? json.scans_limit : undefined) ??
    USAGE_FALLBACK.scans_limit;
  const scansUsed =
    u.used_this_month ??
    (typeof json.scans_used === 'number' ? json.scans_used : undefined) ??
    USAGE_FALLBACK.scans_used;
  const scansRemaining =
    u.remaining ??
    (typeof json.scans_remaining === 'number' ? json.scans_remaining : undefined) ??
    USAGE_FALLBACK.scans_remaining;
  const resetDate =
    u.resets_at ??
    (typeof json.reset_date === 'string' ? json.reset_date : undefined) ??
    USAGE_FALLBACK.reset_date;

  if (Array.isArray(json.by_product) && (json.by_product as ProductUsageRow[]).length > 0) {
    const rows = json.by_product as ProductUsageRow[];
    return {
      scans_used: scansUsed,
      scans_limit: scansLimit,
      scans_remaining: scansRemaining,
      avg_response_ms: avgMs,
      reset_date: resetDate,
      by_product: rows,
      usage_period_label:
        typeof json.month === 'string' ? formatBillingMonth(json.month) || json.month : undefined,
      usage_row_kind: 'product',
      plan_name: typeof json.plan === 'string' ? json.plan : (json as UsageMeLike).plan,
    };
  }

  const u2 = json as UsageMeLike;
  const label =
    u2.owner && u2.plan
      ? `${u2.owner} (${u2.track || 'api'} · ${u2.plan})`
      : 'All scans';

  const pct =
    scansLimit >= 999999
      ? 0
      : Math.min(100, Math.round((scansUsed / Math.max(scansLimit, 1)) * 1000) / 10);

  return {
    scans_used: scansUsed,
    scans_limit: scansLimit,
    scans_remaining: scansRemaining,
    avg_response_ms: avgMs,
    reset_date: resetDate,
    by_product: [
      {
        name: label,
        scans: scansUsed,
        pct,
        avgConf: u2.rate_per_scan ?? 0,
      },
    ],
    usage_period_label:
      typeof json.month === 'string' ? formatBillingMonth(json.month) || json.month : undefined,
    usage_row_kind: 'product',
    plan_name: u2.plan,
  };
}
