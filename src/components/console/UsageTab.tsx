'use client';

import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { ENDPOINTS } from '@/lib/console-data';
import { parseUsageMonthJson, type ConsoleUsageData } from '@/lib/usage-month';

const EMPTY: ConsoleUsageData = {
  scans_used: 0,
  scans_limit: 0,
  scans_remaining: 0,
  avg_response_ms: 0,
  reset_date: '—',
  usage_row_kind: 'product',
  by_product: [],
};

export default function UsageTab() {
  const { getAccessTokenSilently } = useAuth0();
  const [data, setData] = useState<ConsoleUsageData>(EMPTY);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUsage() {
      try {
        const token = await getAccessTokenSilently();
        const res = await fetch(ENDPOINTS.usageMonth, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
        const json = (await res.json()) as Record<string, unknown>;
        setData(parseUsageMonthJson(json));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load usage data.');
      } finally {
        setLoading(false);
      }
    }
    void fetchUsage();
  }, [getAccessTokenSilently]);

  const rowLabel = data.usage_row_kind === 'key' ? 'API key' : 'Product';

  return (
    <div>
      <div className="page-tag">RealAPI · Usage</div>
      <h1 className="page-title" style={{ marginBottom: 20 }}>Usage &amp; limits</h1>

      {error && (
        <div style={{
          background: 'var(--amber-dim)',
          border: '1px solid #f0a00030',
          borderRadius: 8,
          padding: '10px 16px',
          fontSize: 12.5,
          color: 'var(--amber)',
          marginBottom: 20,
        }}>
          {error}
        </div>
      )}

      <div className="stat-grid" style={{ gridTemplateColumns: 'repeat(3,minmax(0,1fr))' }}>
        <div className="stat-card">
          <div className="stat-label">Scans used</div>
          <div className="stat-value">{loading ? '—' : data.scans_used.toLocaleString()}</div>
          <div className="stat-sub">of {data.scans_limit.toLocaleString()} this month</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Remaining</div>
          <div className="stat-value green">{loading ? '—' : data.scans_remaining.toLocaleString()}</div>
          <div className="stat-sub">Resets {data.reset_date}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Avg response</div>
          <div className="stat-value">{loading ? '—' : `${(data.avg_response_ms / 1000).toFixed(1)}s`}</div>
          <div className="stat-sub">Last 7 days</div>
        </div>
      </div>

      <div className="table-wrap">
        <div className="table-head-bar">
          <strong>{data.usage_row_kind === 'key' ? 'Usage by API key' : 'Usage by product'}</strong>
          <span>{data.usage_period_label ?? 'Current billing period'}</span>
        </div>
        <table>
          <thead>
            <tr><th>{rowLabel}</th><th>Scans</th><th>% of total</th><th>Avg confidence</th></tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={4} style={{ color: 'var(--text-3)', fontSize: 13 }}>Loading…</td></tr>
            ) : data.by_product.length === 0 ? (
              <tr><td colSpan={4} style={{ color: 'var(--text-3)', fontSize: 13 }}>No usage recorded for this period.</td></tr>
            ) : (
              data.by_product.map((p) => (
                <tr key={p.name}>
                  <td><strong style={{ color: 'var(--text-1)' }}>{p.name}</strong></td>
                  <td>{p.scans}</td>
                  <td>
                    <div className="conf-wrap">
                      <div className="conf-bg">
                        <div className="conf-fill" style={{ width: `${p.pct}%` }} />
                      </div>
                      <span className="conf-pct">{p.pct}%</span>
                    </div>
                  </td>
                  <td>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--accent)' }}>
                      {p.avgConf}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}