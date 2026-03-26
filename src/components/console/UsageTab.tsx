'use client';

import { useEffect, useState } from 'react';
import { ENDPOINTS } from '@/lib/console-data';

interface ProductUsage {
  name: string;
  scans: number;
  pct: number;
  avgConf: number;
}

interface UsageData {
  scans_used: number;
  scans_limit: number;
  scans_remaining: number;
  avg_response_ms: number;
  reset_date: string;
  by_product: ProductUsage[];
}

const FALLBACK: UsageData = {
  scans_used: 280,
  scans_limit: 1000,
  scans_remaining: 720,
  avg_response_ms: 1200,
  reset_date: 'May 1, 2026',
  by_product: [
    { name: 'Sentinel', scans: 142, pct: 50.7, avgConf: 0.91 },
    { name: 'Gotham',   scans: 88,  pct: 31.4, avgConf: 0.87 },
    { name: 'Atlas',    scans: 34,  pct: 12.1, avgConf: 0.83 },
    { name: 'Foundry',  scans: 16,  pct: 5.7,  avgConf: 0.79 },
  ],
};

export default function UsageTab() {
  const [data, setData] = useState<UsageData>(FALLBACK);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUsage() {
      try {
        const res = await fetch(ENDPOINTS.usageMe, {
          headers: { Authorization: `Bearer ${getApiKey()}` },
        });
        if (!res.ok) throw new Error(`${res.status}`);
        const json = await res.json();
        setData(normalise(json));
      } catch {
        setError('Could not load live usage data. Showing demo values.');
      } finally {
        setLoading(false);
      }
    }
    fetchUsage();
  }, []);

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
          <strong>Usage by product</strong>
          <span>Current billing period</span>
        </div>
        <table>
          <thead>
            <tr><th>Product</th><th>Scans</th><th>% of total</th><th>Avg confidence</th></tr>
          </thead>
          <tbody>
            {data.by_product.map((p) => (
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function getApiKey(): string {
  if (typeof window === 'undefined') return '';
  return sessionStorage.getItem('dt_api_key') ?? '';
}

// Adjust field names once you see the real /v1/client/usage/me shape
function normalise(json: Record<string, unknown>): UsageData {
  return {
    scans_used:      (json.scans_used      as number)        ?? FALLBACK.scans_used,
    scans_limit:     (json.scans_limit     as number)        ?? FALLBACK.scans_limit,
    scans_remaining: (json.scans_remaining as number)        ?? FALLBACK.scans_remaining,
    avg_response_ms: (json.avg_response_ms as number)        ?? FALLBACK.avg_response_ms,
    reset_date:      (json.reset_date      as string)        ?? FALLBACK.reset_date,
    by_product:      (json.by_product      as ProductUsage[]) ?? FALLBACK.by_product,
  };
}