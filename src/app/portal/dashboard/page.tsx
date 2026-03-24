"use client";

/**
 * Deeptrack — Channel Partner Portal
 * Page: Dashboard (/portal/dashboard)
 *
 * Dependencies (add to project if not already installed):
 *   npm install chart.js react-chartjs-2
 *
 * Replace all values in the DATA LAYER section below with your Convex queries.
 * Commission calculations must stay on the backend — only display results here.
 */

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Briefcase,
  DollarSign,
  TrendingUp,
  ChevronRight,
  Activity,
} from "lucide-react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Filler,
  Tooltip,
  Legend,
  type ChartOptions,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Filler,
  Tooltip,
  Legend
);

// ---------------------------------------------------------------------------
// TYPES
// ---------------------------------------------------------------------------

type Tier = "Registered" | "Silver" | "Gold" | "Platinum";
type DotColor = "green" | "blue" | "amber";

interface Partner {
  name: string;
  tier: Tier;
  commissionRate: number;
  currentRevenue: number;
  tierTarget: number;
  nextTier: Tier;
}

interface MetricCard {
  label: string;
  value: string;
  sub: string;
  icon: React.ElementType;
  colorClass: string;
}

interface FunnelStage {
  label: string;
  count: number;
  color: string;
  pct: number;
}

interface MarketRow {
  label: string;
  count: number;
  pct: number;
}

interface ActivityEvent {
  dot: DotColor;
  text: string;
  time: string;
}

// ---------------------------------------------------------------------------
// DATA LAYER — Convex queries (mock for now)
// ---------------------------------------------------------------------------

const PARTNER: Partner = {
  name: "Partner account",
  tier: "Registered",
  commissionRate: 10,
  currentRevenue: 3400,
  tierTarget: 10000,
  nextTier: "Silver",
};

const METRIC_CARDS: MetricCard[] = [
  {
    label: "Total leads",
    value: "8",
    sub: "+2 this month",
    icon: Users,
    colorClass: "text-[#185FA5]",
  },
  {
    label: "Deals closed",
    value: "2",
    sub: "$3,400 net revenue",
    icon: Briefcase,
    colorClass: "text-[#3B6D11]",
  },
  {
    label: "Commission earned",
    value: "$340",
    sub: "Lifetime total",
    icon: DollarSign,
    colorClass: "text-[#3B6D11]",
  },
  {
    label: "Conversion rate",
    value: "25%",
    sub: "2 of 8 leads closed",
    icon: TrendingUp,
    colorClass: "text-[#BA7517]",
  },
];

const REVENUE_LABELS = ["Nov", "Dec", "Jan", "Feb", "Mar"];
const REVENUE_DATA = [0, 0, 0, 1600, 1800];

const FUNNEL: FunnelStage[] = [
  { label: "Submitted", count: 8, color: "#185FA5", pct: 100 },
  { label: "Contacted", count: 6, color: "#378ADD", pct: 75 },
  { label: "Negotiating", count: 4, color: "#BA7517", pct: 50 },
  { label: "Closed", count: 2, color: "#3B6D11", pct: 25 },
  { label: "Lost", count: 1, color: "#A32D2D", pct: 12.5 },
];

const MARKETS: MarketRow[] = [
  { label: "Kenya", count: 6, pct: 75 },
  { label: "USA", count: 2, pct: 25 },
  { label: "EU", count: 1, pct: 12 },
];

const INDUSTRY_LABELS = ["Fintech", "Insurance", "HR Tech", "Media"];
const INDUSTRY_DATA = [4, 2, 1, 1];
const INDUSTRY_COLORS = ["#185FA5", "#378ADD", "#3B6D11", "#BA7517"];

const ACTIVITY: ActivityEvent[] = [
  {
    dot: "green",
    text: "Deal closed — VerifyNow EU",
    time: "2 days ago · $1,800 net revenue",
  },
  {
    dot: "blue",
    text: "Demo completed — Equity Fintech",
    time: "3 days ago · Pricing discussion started",
  },
  {
    dot: "amber",
    text: "Lead registered — NationMedia Group",
    time: "5 days ago · Confirmed by Office of Sales",
  },
  {
    dot: "blue",
    text: "Commission statement issued",
    time: "7 days ago · $340 due Apr 30",
  },
  {
    dot: "green",
    text: "Deal closed — FastLend Africa",
    time: "18 days ago · $1,600 net revenue",
  },
  {
    dot: "amber",
    text: "Tier progress update",
    time: "20 days ago · 34% toward Silver",
  },
];

// ---------------------------------------------------------------------------
// ANIMATION VARIANTS
// ---------------------------------------------------------------------------

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

const cardVariant = {
  hidden: { opacity: 0, y: 14, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

// ---------------------------------------------------------------------------
// HELPERS
// ---------------------------------------------------------------------------

const DOT_CLASSES: Record<DotColor, string> = {
  green: "bg-[#3B6D11]",
  blue: "bg-[#185FA5]",
  amber: "bg-[#BA7517]",
};

const TIER_COLORS: Record<Tier, { badge: string; label: string }> = {
  Registered: {
    badge: "bg-[#185FA5]/10 text-[#185FA5]",
    label: "Registered",
  },
  Silver: { badge: "bg-slate-200/70 text-slate-600", label: "Silver" },
  Gold: { badge: "bg-amber-100 text-amber-700", label: "Gold" },
  Platinum: { badge: "bg-violet-100 text-violet-700", label: "Platinum" },
};

function fmt(n: number) {
  return "$" + n.toLocaleString();
}

// ---------------------------------------------------------------------------
// SUB-COMPONENTS
// ---------------------------------------------------------------------------

function TierBar({ partner }: { partner: Partner }) {
  const pct = Math.min(
    100,
    Math.round((partner.currentRevenue / partner.tierTarget) * 100)
  );
  const remaining = partner.tierTarget - partner.currentRevenue;
  const tierColor = TIER_COLORS[partner.tier];

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-center gap-5 rounded-xl border border-border bg-muted/40 px-5 py-4 mb-6"
    >
      <span
        className={`shrink-0 rounded px-3 py-1 text-[11px] font-semibold tracking-wide ${tierColor.badge}`}
      >
        {partner.tier} partner
      </span>

      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-xs text-muted-foreground">
            {fmt(partner.currentRevenue)} toward {partner.nextTier} (
            {fmt(partner.tierTarget)})
          </span>
          <span className="text-xs font-semibold text-foreground">{pct}%</span>
        </div>
        <div className="h-[6px] rounded-full bg-background border border-border overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-[#185FA5]"
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </div>

      <span className="shrink-0 text-xs text-muted-foreground whitespace-nowrap">
        {fmt(remaining)} to {partner.nextTier}
      </span>
    </motion.div>
  );
}

function MetricCardComponent({
  card,
  index,
}: {
  card: MetricCard;
  index: number;
}) {
  const Icon = card.icon;
  return (
    <motion.div
      variants={cardVariant}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="rounded-xl border border-border bg-muted/40 px-4 py-4 flex flex-col gap-2"
    >
      <div className="flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-[0.07em] font-medium text-muted-foreground">
          {card.label}
        </span>
        <Icon className={`w-3.5 h-3.5 ${card.colorClass} opacity-70`} />
      </div>
      <div className={`text-[22px] font-semibold leading-none ${card.colorClass}`}>
        {card.value}
      </div>
      <div className="text-[11px] text-muted-foreground">{card.sub}</div>
    </motion.div>
  );
}

function FunnelChart({ stages }: { stages: FunnelStage[] }) {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 400);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="space-y-2 mt-2">
      {stages.map((s, i) => (
        <motion.div
          key={s.label}
          custom={i}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.45, delay: i * 0.06 }}
          className="flex items-center gap-3"
        >
          <span className="text-[12px] text-muted-foreground w-24 text-right shrink-0">
            {s.label}
          </span>
          <div className="flex-1 h-7 rounded bg-muted overflow-hidden">
            <motion.div
              className="h-full rounded flex items-center px-3"
              style={{ backgroundColor: s.color }}
              initial={{ width: 0 }}
              animate={{ width: animated ? `${s.pct}%` : 0 }}
              transition={{
                duration: 0.7,
                delay: 0.5 + i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <span className="text-[11px] font-medium text-white whitespace-nowrap">
                {s.count} {s.count === 1 ? "lead" : s.label === "Closed" ? "deals" : "leads"}
              </span>
            </motion.div>
          </div>
          <span className="text-[12px] text-muted-foreground w-6 shrink-0">
            {s.count}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

function MarketBars({ markets }: { markets: MarketRow[] }) {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="space-y-2.5">
      {markets.map((m, i) => (
        <motion.div
          key={m.label}
          custom={i}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.45, delay: i * 0.06 }}
          className="flex items-center gap-2.5 text-[13px]"
        >
          <span className="w-20 shrink-0 text-foreground">{m.label}</span>
          <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-[#185FA5]"
              initial={{ width: 0 }}
              animate={{ width: animated ? `${m.pct}%` : 0 }}
              transition={{
                duration: 0.7,
                delay: 0.6 + i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          </div>
          <span className="text-[12px] text-muted-foreground w-4 text-right shrink-0">
            {m.count}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

function ActivityFeed({ events }: { events: ActivityEvent[] }) {
  return (
    <div>
      {events.map((e, i) => (
        <motion.div
          key={i}
          custom={i}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.45, delay: i * 0.06 }}
          className="flex gap-3 py-2.5 border-b border-border last:border-0"
        >
          <div
            className={`w-2 h-2 rounded-full mt-1 shrink-0 ${DOT_CLASSES[e.dot]}`}
          />
          <div>
            <div className="text-[13px] text-foreground">{e.text}</div>
            <div className="text-[11px] text-muted-foreground mt-0.5">
              {e.time}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// CHART CONFIGS
// ---------------------------------------------------------------------------

function useChartColors() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDark(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDark(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return {
    gridColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
    labelColor: isDark ? "#9c9a92" : "#73726c",
  };
}

function RevenueChart() {
  const { gridColor, labelColor } = useChartColors();

  const data = useMemo(
    () => ({
      labels: REVENUE_LABELS,
      datasets: [
        {
          data: REVENUE_DATA,
          backgroundColor: "#185FA5",
          borderRadius: 4,
          barThickness: 28,
        },
      ],
    }),
    []
  );

  const options: ChartOptions<"bar"> = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (c) => " $" + Math.round(c.parsed.y || 0).toLocaleString(),
          },
        },
      },
      scales: {
        x: {
          grid: { color: gridColor },
          ticks: { color: labelColor, font: { size: 11 } },
        },
        y: {
          grid: { color: gridColor },
          ticks: {
            color: labelColor,
            font: { size: 11 },
            callback: (v) => "$" + v.toLocaleString(),
          },
        },
      },
      animation: {
        duration: 900,
        easing: "easeOutQuart",
      },
    }),
    [gridColor, labelColor]
  );

  return <Bar data={data} options={options} />;
}

function IndustryChart() {
  const { labelColor } = useChartColors();

  const data = useMemo(
    () => ({
      labels: INDUSTRY_LABELS,
      datasets: [
        {
          data: INDUSTRY_DATA,
          backgroundColor: INDUSTRY_COLORS,
          borderWidth: 0,
          hoverOffset: 6,
        },
      ],
    }),
    []
  );

  const options: ChartOptions<"doughnut"> = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      cutout: "68%",
      plugins: {
        legend: {
          display: true,
          position: "right",
          labels: {
            color: labelColor,
            font: { size: 11 },
            boxWidth: 10,
            padding: 12,
          },
        },
        tooltip: {
          callbacks: {
            label: (c) =>
              ` ${c.label}: ${c.parsed} lead${c.parsed !== 1 ? "s" : ""}`,
          },
        },
      },
      animation: {
        animateRotate: true,
        duration: 900,
        easing: "easeOutQuart",
      },
    }),
    [labelColor]
  );

  return <Doughnut data={data} options={options} />;
}

// ---------------------------------------------------------------------------
// CARD WRAPPER
// ---------------------------------------------------------------------------

function Card({
  title,
  children,
  legend,
  className = "",
  delay = 0,
}: {
  title: string;
  children: React.ReactNode;
  legend?: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay,
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`rounded-xl border border-border bg-background p-5 ${className}`}
    >
      <div className="text-[13px] font-medium text-foreground mb-3">{title}</div>
      {legend && <div className="mb-2">{legend}</div>}
      {children}
    </motion.div>
  );
}

function LegendDot({
  color,
  label,
}: {
  color: string;
  label: string;
}) {
  return (
    <span className="flex items-center gap-1.5 text-[12px] text-muted-foreground">
      <span
        className="inline-block w-2.5 h-2.5 rounded-[2px] shrink-0"
        style={{ backgroundColor: color }}
      />
      {label}
    </span>
  );
}

// ---------------------------------------------------------------------------
// MAIN PAGE
// ---------------------------------------------------------------------------

export default function DashboardPage() {
  // Get today's month/year for the subtitle — replace with Convex data as needed
  const subtitle = useMemo(() => {
    const now = new Date();
    return `Your program snapshot for ${now.toLocaleString("default", {
      month: "long",
    })} ${now.getFullYear()}.`;
  }, []);

  return (
    <div className="px-6 py-6 max-w-[1100px] mx-auto">
      {/* Page header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="mb-5"
      >
        <h1 className="text-[18px] font-medium text-foreground">Dashboard</h1>
        <p className="text-[13px] text-muted-foreground mt-0.5">{subtitle}</p>
      </motion.div>

      {/* Tier progress bar */}
      <TierBar partner={PARTNER} />

      {/* Metric cards */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {METRIC_CARDS.map((card, i) => (
          <MetricCardComponent key={card.label} card={card} index={i} />
        ))}
      </div>

      {/* Row 1 + side panel */}
      <div className="grid lg:grid-cols-[1fr_280px] gap-4 mb-4">
        <div className="grid grid-cols-2 gap-4">
          <Card
            title="Monthly revenue generated"
            delay={0.28}
            legend={
              <div className="flex gap-3">
                <LegendDot color="#185FA5" label="Net revenue ($)" />
              </div>
            }
          >
            <div className="relative h-[180px]">
              <RevenueChart />
            </div>
          </Card>

          <Card title="Lead pipeline funnel" delay={0.34}>
            <FunnelChart stages={FUNNEL} />
          </Card>
        </div>

        <aside className="space-y-4 rounded-xl border border-border bg-background p-4">
          <div className="text-[14px] font-semibold text-foreground">Partner Insights</div>
          <div className="text-sm text-muted-foreground">Quick reference for your performance and next steps.</div>

          <div className="rounded-lg bg-muted/70 p-3">
            <div className="text-xs text-muted-foreground uppercase mb-1">Current tier</div>
            <div className="text-sm font-semibold text-foreground">{PARTNER.tier}</div>
          </div>

          <div className="rounded-lg bg-muted/70 p-3">
            <div className="text-xs text-muted-foreground uppercase mb-1">Commission rate</div>
            <div className="text-sm font-semibold text-foreground">{PARTNER.commissionRate}%</div>
          </div>

          <div className="rounded-lg bg-muted/70 p-3">
            <div className="text-xs text-muted-foreground uppercase mb-1">Revenue this period</div>
            <div className="text-sm font-semibold text-foreground">{fmt(PARTNER.currentRevenue)}</div>
          </div>

          <div className="rounded-lg bg-muted/70 p-3">
            <div className="text-xs text-muted-foreground uppercase mb-1">Next tier goal</div>
            <div className="text-sm font-semibold text-foreground">{fmt(PARTNER.tierTarget)} ({PARTNER.nextTier})</div>
          </div>

          <button className="w-full rounded-md bg-[#185FA5] py-2 text-xs font-semibold text-white hover:bg-[#154c88]">
            Submit a new lead
          </button>
        </aside>
      </div>

      {/* Row 2: Geo/industry + Activity */}
      <div className="grid grid-cols-2 gap-4">
        <Card title="Leads by market" delay={0.4}>
          <MarketBars markets={MARKETS} />

          {/* Industry doughnut nested below */}
          <div className="mt-5">
            <div className="text-[13px] font-medium text-foreground mb-3">
              Leads by industry
            </div>
            <div className="relative h-[140px]">
              <IndustryChart />
            </div>
          </div>
        </Card>

        <Card title="Recent activity" delay={0.46}>
          <ActivityFeed events={ACTIVITY} />
        </Card>
      </div>
    </div>
  );
}