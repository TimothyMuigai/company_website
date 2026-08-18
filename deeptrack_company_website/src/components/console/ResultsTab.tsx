'use client';

import { useEffect, useState } from 'react';
import { ENDPOINTS, SCANS, ScanRow, Verdict } from '@/lib/console-data';

interface JobEntry {
  status: string;
  filename: string;
  age_sec: number;
  result?: {
    label: string;
    confidence: number;
    fake_prob: number;
    total_frames?: number;
    face_pct?: number;
  };
}

interface JobsResponse {
  jobs: Record<string, JobEntry>;
  counts: Record<string, number>;
  total: number;
}

interface DisplayRow {
  file: string;
  type: string;
  product: string;
  verdict: Verdict;
  conf: number;
  time: string;
}

function VerdictPill({ verdict }: { verdict: Verdict }) {
  return <span className={`v-pill ${verdict}`}>{verdict}</span>;
}

function ConfBar({ conf, verdict }: { conf: number; verdict: Verdict }) {
  const cls = verdict === 'manipulated' ? 'r' : verdict === 'uncertain' ? 'a' : '';
  return (
    <div className="conf-wrap">
      <div className="conf-bg">
        <div className={`conf-fill ${cls}`} style={{ width: `${Math.round(conf * 100)}%` }} />
      </div>
      <span className="conf-pct">{Math.round(conf * 100)}%</span>
    </div>
  );
}

function labelToVerdict(label: string): Verdict {
  if (label === 'FAKE' || label === 'Fake') return 'manipulated';
  if (label === 'UNCERTAIN') return 'uncertain';
  return 'authentic';
}

function ageToString(age: number): string {
  if (age < 60) return `${age}s ago`;
  if (age < 3600) return `${Math.round(age / 60)}m ago`;
  return `${Math.round(age / 3600)}h ago`;
}

export default function ResultsTab() {
  const [rows, setRows] = useState<DisplayRow[]>(
    SCANS.map((s) => ({ ...s })) // start with demo data
  );
  const [stats, setStats] = useState({ total: 2841, authentic: 2104, manipulated: 612, uncertain: 125 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchJobs() {
      try {
        const res = await fetch(ENDPOINTS.videoJobs, {
          headers: { Authorization: `Bearer ${getApiKey()}` },
        });
        if (!res.ok) throw new Error(`${res.status}`);
        const json: JobsResponse = await res.json();

        const live: DisplayRow[] = Object.entries(json.jobs)
          .filter(([, j]) => j.status === 'done' && j.result)
          .map(([, j]) => ({
            file:    j.filename,
            type:    'video',
            product: 'Gotham',
            verdict: labelToVerdict(j.result!.label),
            conf:    j.result!.fake_prob ?? j.result!.confidence / 100,
            time:    ageToString(j.age_sec),
          }));

        if (live.length > 0) {
          setRows(live.slice(0, 8));
          const total = json.total;
          const manipulated = live.filter((r) => r.verdict === 'manipulated').length;
          const uncertain   = live.filter((r) => r.verdict === 'uncertain').length;
          setStats({ total, authentic: total - manipulated - uncertain, manipulated, uncertain });
        }
      } catch {
        setError('Showing demo data — connect an API key to see live results.');
      } finally {
        setLoading(false);
      }
    }
    fetchJobs();
  }, []);

  return (
    <div>
      <div className="page-tag">RealAPI · Scan results</div>
      <h1 className="page-title" style={{ marginBottom: 20 }}>Scan results</h1>

      {error && (
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border-mid)',
          borderRadius: 8,
          padding: '10px 16px',
          fontSize: 12.5,
          color: 'var(--text-3)',
          marginBottom: 20,
        }}>
          {error}
        </div>
      )}

      <div className="stat-grid">
        <div className="stat-card">
          <div className="stat-label">Total scans</div>
          <div className="stat-value">{stats.total.toLocaleString()}</div>
          <div className="stat-sub">Last 30 days</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Authentic</div>
          <div className="stat-value green">{stats.authentic.toLocaleString()}</div>
          <div className="stat-sub">{((stats.authentic / stats.total) * 100).toFixed(1)}%</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Manipulated</div>
          <div className="stat-value red">{stats.manipulated.toLocaleString()}</div>
          <div className="stat-sub">{((stats.manipulated / stats.total) * 100).toFixed(1)}%</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Uncertain</div>
          <div className="stat-value amber">{stats.uncertain.toLocaleString()}</div>
          <div className="stat-sub">{((stats.uncertain / stats.total) * 100).toFixed(1)}%</div>
        </div>
      </div>

      <div className="table-wrap">
        <div className="table-head-bar">
          <strong>Recent scans</strong>
          <span>{loading ? 'Loading…' : `Showing ${rows.length} of ${stats.total.toLocaleString()}`}</span>
        </div>
        <table>
          <thead>
            <tr><th>File</th><th>Type</th><th>Product</th><th>Verdict</th><th>Confidence</th><th>Time</th></tr>
          </thead>
          <tbody>
            {rows.map((s) => (
              <tr key={s.file}>
                <td><span className="scan-fname">{s.file}</span></td>
                <td><span className="type-pill">{s.type}</span></td>
                <td style={{ fontSize: 12.5 }}>{s.product}</td>
                <td><VerdictPill verdict={s.verdict} /></td>
                <td><ConfBar conf={s.conf} verdict={s.verdict} /></td>
                <td style={{ color: 'var(--text-3)', fontSize: 12, whiteSpace: 'nowrap' }}>{s.time}</td>
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