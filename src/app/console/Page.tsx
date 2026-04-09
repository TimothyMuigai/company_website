"use client";

import React, { useState, useCallback, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import ApiKeysTab from "@/components/admin/ApiKeysTab";
import { ENDPOINTS } from "@/lib/console-data";
import { parseUsageMonthJson, USAGE_FALLBACK } from "@/lib/usage-month";

// ─────────────────────────────────────────
// Types
// ─────────────────────────────────────────

type Tab = "quickstart" | "keys" | "results" | "usage";
type Lang = "ts" | "py" | "curl";
type Verdict = "authentic" | "manipulated" | "uncertain";

interface DemoUser {
  name: string;
}

interface AdminUserRecord {
  id: string;
  name: string;
  email: string;
}

interface Scan {
  file: string;
  type: string;
  product: string;
  verdict: Verdict;
  conf: number;
  time: string;
}

// ─────────────────────────────────────────
// Static data
// ─────────────────────────────────────────

const SCANS: Scan[] = [
  { file: "kyc_upload_2841.jpg",  type: "image",    product: "Sentinel", verdict: "manipulated", conf: 0.97, time: "2m ago"  },
  { file: "press_release_v2.mp4", type: "video",    product: "Atlas",    verdict: "authentic",   conf: 0.89, time: "5m ago"  },
  { file: "claims_doc_1194.pdf",  type: "document", product: "Foundry",  verdict: "uncertain",   conf: 0.61, time: "12m ago" },
  { file: "id_scan_front.jpg",    type: "image",    product: "Sentinel", verdict: "authentic",   conf: 0.96, time: "18m ago" },
  { file: "ceo_interview.mp4",    type: "video",    product: "Gotham",   verdict: "manipulated", conf: 0.93, time: "34m ago" },
  { file: "passport_scan.jpg",    type: "image",    product: "Sentinel", verdict: "authentic",   conf: 0.91, time: "41m ago" },
  { file: "article_draft.html",   type: "text",     product: "Atlas",    verdict: "authentic",   conf: 0.78, time: "1h ago"  },
  { file: "profile_photo.png",    type: "image",    product: "Mirror",   verdict: "manipulated", conf: 0.88, time: "2h ago"  },
];

const STATS = {
  totalScans:  2841,
  authentic:   2104,
  manipulated: 612,
  uncertain:   125,
};

const CODE: Record<Lang, { fname: string; install: { pm: string; pkg: string }[] | null; body: string }> = {
  ts: {
    fname: "index.ts",
    install: [
      { pm: "npm install", pkg: "@deeptrack" },
      { pm: "yarn add",    pkg: "@deeptrack" },
    ],
    body: `import { Deeptrack } from '@deeptrack';

const client = new Deeptrack({ apiKey: 'dt_live_••••••••••••••••' });

const result = await client.scan({
  type:    'image',
  url:     'https://your-domain.com/media/photo.jpg',
  product: 'sentinel',
});

console.log(result.verdict);    // 'authentic' | 'manipulated' | 'uncertain'
console.log(result.confidence); // 0.0 – 1.0
console.log(result.signals);    // detection signal breakdown`,
  },
  py: {
    fname: "main.py",
    install: [{ pm: "pip install", pkg: "deeptrack" }],
    body: `from deeptrack import Deeptrack

client = Deeptrack(api_key="dt_live_••••••••••••••••")

result = client.scan(
  type="image",
  url="https://your-domain.com/media/photo.jpg",
  product="sentinel"
)

print(result.verdict)    # 'authentic' | 'manipulated' | 'uncertain'
print(result.confidence) # 0.0 – 1.0`,
  },
  curl: {
    fname: "terminal",
    install: null,
    body: `curl https://api.deeptrack.io/v1/scan \\
  -H "Authorization: Bearer dt_live_••••••••••••••••" \\
  -H "Content-Type: application/json" \\
  -d '{"type":"image","url":"https://your-domain.com/photo.jpg","product":"sentinel"}'

# Response
{ "verdict": "manipulated", "confidence": 0.94, "scan_id": "sc_01j8x...", "signals": [...] }`,
  },
};

const PRODUCTS = [
  {
    name: "Sentinel",
    desc: "AI-powered KYC / KYB",
    icon: (
      <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
        <path d="M7 1L12 4v4c0 2.5-2.5 4-5 5C4.5 12 2 10.5 2 8V4L7 1Z" stroke="#009FE3" strokeWidth="1.3" />
      </svg>
    ),
  },
  {
    name: "Atlas",
    desc: "News fact-checking",
    icon: (
      <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
        <circle cx="7" cy="7" r="5.5" stroke="#009FE3" strokeWidth="1.3" />
        <circle cx="7" cy="7" r="2"   stroke="#009FE3" strokeWidth="1.3" />
      </svg>
    ),
  },
  {
    name: "Foundry",
    desc: "Insurance fraud detection",
    icon: (
      <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
        <path d="M7 2L11 5v7H3V5L7 2Z" stroke="#009FE3" strokeWidth="1.3" />
      </svg>
    ),
  },
  {
    name: "Gotham",
    desc: "Enterprise deepfake API",
    icon: (
      <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
        <path d="M2 11L7 2l5 9H2Z" stroke="#009FE3" strokeWidth="1.3" />
      </svg>
    ),
  },
  {
    name: "Mirror",
    desc: "Identity protection",
    icon: (
      <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
        <path d="M7 1C7 1 3 4 3 7.5a4 4 0 008 0C11 4 7 1 7 1Z" stroke="#009FE3" strokeWidth="1.3" />
      </svg>
    ),
  },
];

// ─────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────

function getInitials(name: string | null | undefined): string {
  if (!name) return "?";
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}

async function copyToClipboard(text: string): Promise<void> {
  await navigator.clipboard.writeText(text);
}

// ─────────────────────────────────────────
// AppShell
// ─────────────────────────────────────────

function AppShell({
  onSignOut,
  userName,
  getAccessTokenSilently,
}: {
  onSignOut: () => void;
  userName: string;
  getAccessTokenSilently: () => Promise<string>;
}) {
  const [activeTab, setActiveTab]             = useState<Tab>("quickstart");
  const [activeLang, setActiveLang]           = useState<Lang>("ts");
  const [apiKey, setApiKey]                   = useState<string | null>(null);
  const [isGeneratingKey, setIsGeneratingKey] = useState(false);
  const [generateKeyError, setGenerateKeyError] = useState<string | null>(null);
  const [copied, setCopied]                   = useState<string | null>(null);
  const [usageData, setUsageData]             = useState(USAGE_FALLBACK);
  const [usageLoading, setUsageLoading]       = useState(false);
  const [usageError, setUsageError]           = useState<string | null>(null);

  const name     = userName;
  const initials = getInitials(name);
  const role     = "Developer · Deeptrack";

  useEffect(() => {
    try {
      const k = sessionStorage.getItem("dt_api_key");
      if (k) setApiKey(k);
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      setUsageLoading(true);
      setUsageError(null);
      try {
        const token = await getAccessTokenSilently();
        const res = await fetch(ENDPOINTS.usageMonth, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error(String(res.status));
        const json = (await res.json()) as Record<string, unknown>;
        if (!cancelled) setUsageData(parseUsageMonthJson(json));
      } catch {
        if (!cancelled) {
          setUsageError("Could not load live usage data. Showing demo values.");
          setUsageData(USAGE_FALLBACK);
        }
      } finally {
        if (!cancelled) setUsageLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [getAccessTokenSilently]);

  const creditPct = Math.min(
    100,
    Math.round((usageData.scans_used / Math.max(usageData.scans_limit, 1)) * 100),
  );

  async function handleGenKey() {
    setIsGeneratingKey(true);
    setGenerateKeyError(null);

    try {
      const token = await getAccessTokenSilently();
      const authHeader = { Authorization: `Bearer ${token}` };

      const usersResponse = await fetch("/api/admin/users", {
        cache: "no-store",
        headers: authHeader,
      });
      const usersPayload = await usersResponse.json();
      if (!usersResponse.ok) {
        const usersErr = usersPayload?.error || usersPayload?.details?.detail || "Failed to load users";
        throw new Error(typeof usersErr === "string" ? usersErr : JSON.stringify(usersErr));
      }

      const users = (usersPayload?.users || []) as AdminUserRecord[];
      if (users.length === 0) {
        throw new Error("No users found. Create at least one user before generating keys.");
      }

      const matchedUser = users.find((u) => u.name?.toLowerCase() === name.toLowerCase()) || users[0];

      const response = await fetch("/api/admin/keys", {
        method: "POST",
        headers: { ...authHeader, "Content-Type": "application/json" },
        body: JSON.stringify({
          owner:   name || matchedUser.name,
          user_id: matchedUser.id,
          track:   "api",
          plan:    "starter",
        }),
      });

      const payload = await response.json();
      if (!response.ok) {
        const detail = payload?.details?.detail;
        const firstDetail = Array.isArray(detail) && detail.length > 0 ? detail[0]?.msg : undefined;
        const err = payload?.error || firstDetail || detail || "Failed to generate key";
        throw new Error(typeof err === "string" ? err : JSON.stringify(err));
      }

      const rawKey = payload?.key || payload?.api_key;
      if (!rawKey || typeof rawKey !== "string") {
        throw new Error("Key not returned by /keys endpoint");
      }

      setApiKey(rawKey);
      sessionStorage.setItem("dt_api_key", rawKey);
    } catch (error) {
      setGenerateKeyError(error instanceof Error ? error.message : "Failed to generate key");
    } finally {
      setIsGeneratingKey(false);
    }
  }

  const handleCopy = useCallback(async (id: string, text: string) => {
    await copyToClipboard(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 1500);
  }, []);

  const lang = CODE[activeLang];

  return (
    <div id="app" className="visible">
      {/* ── SIDEBAR ── */}
      <aside className="sidebar">
        <div className="logo-area">
          <svg width="140" height="28" viewBox="0 0 140 28" fill="none">
            <text x="0" y="21" fontFamily="'Space Grotesk', sans-serif" fontSize="18" fontWeight="600" fill="#111827" letterSpacing="-0.3">deeptrack</text>
            <rect x="107" y="5" width="6" height="18" rx="1" fill="#7EC8E3" />
            <rect x="115" y="2" width="6" height="21" rx="1" fill="#4DB8E0" />
            <rect x="123" y="0" width="7" height="24" rx="1" fill="#009FE3" />
          </svg>
          <span className="api-badge">RealAPI</span>
        </div>

        <nav>
          <div className="nav-label">Developer</div>
          <a className={`nav-item${activeTab === "quickstart" ? " active" : ""}`} href="#" onClick={(e) => { e.preventDefault(); setActiveTab("quickstart"); }}>
            <svg className="ni" viewBox="0 0 14 14" fill="none"><rect x="1" y="1" width="5" height="5" rx="1.2" stroke="currentColor" strokeWidth="1.2"/><rect x="8" y="1" width="5" height="5" rx="1.2" stroke="currentColor" strokeWidth="1.2"/><rect x="1" y="8" width="5" height="5" rx="1.2" stroke="currentColor" strokeWidth="1.2"/><rect x="8" y="8" width="5" height="5" rx="1.2" stroke="currentColor" strokeWidth="1.2"/></svg>
            Quick start
          </a>
          <a className={`nav-item${activeTab === "keys" ? " active" : ""}`} href="#" onClick={(e) => { e.preventDefault(); setActiveTab("keys"); }}>
            <svg className="ni" viewBox="0 0 14 14" fill="none"><circle cx="4.5" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.2"/><path d="M7 6h6M10 6v2M12 6v2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
            API keys
          </a>
          <a className={`nav-item${activeTab === "results" ? " active" : ""}`} href="#" onClick={(e) => { e.preventDefault(); setActiveTab("results"); }}>
            <svg className="ni" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.2"/><circle cx="7" cy="7" r="2" stroke="currentColor" strokeWidth="1.2"/></svg>
            Scan results
          </a>
          <a className={`nav-item${activeTab === "usage" ? " active" : ""}`} href="#" onClick={(e) => { e.preventDefault(); setActiveTab("usage"); }}>
            <svg className="ni" viewBox="0 0 14 14" fill="none"><path d="M1 10L4 6l3 2 3-4 3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Usage &amp; limits
          </a>

          <div className="nav-label" style={{ marginTop: 8 }}>Tools</div>
          <a className="nav-item" href="https://www.deeptrack.io/productApi" target="_blank" rel="noreferrer">
            <svg className="ni" viewBox="0 0 14 14" fill="none"><path d="M2 4h10M2 7h7M2 10h5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
            Documentation ↗
          </a>
          <a className="nav-item" href="https://api.deeptrack.io" target="_blank" rel="noreferrer">
            <svg className="ni" viewBox="0 0 14 14" fill="none"><path d="M3 3h8v8H3z" stroke="currentColor" strokeWidth="1.2"/><path d="M1 7h2M11 7h2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
            API reference ↗
          </a>
          <a className="nav-item" href="https://www.deeptrack.io/contact" target="_blank" rel="noreferrer">
            <svg className="ni" viewBox="0 0 14 14" fill="none"><path d="M2 3h10v8H2z" stroke="currentColor" strokeWidth="1.2"/><path d="M2 4l5 4 5-4" stroke="currentColor" strokeWidth="1.2"/></svg>
            Support ↗
          </a>
        </nav>

        <div className="sidebar-footer">
          <div className="credit-row">
            <strong>{usageLoading ? "—" : usageData.scans_remaining.toLocaleString()} scans left</strong>
            <span>{usageData.scans_limit.toLocaleString()}/mo</span>
          </div>
          <div className="credit-track">
            <div className="credit-fill" style={{ width: `${creditPct}%` }} />
          </div>
          <div className="credit-sub">Renews {usageData.reset_date} · {usageData.plan_name ?? "API"}</div>
          <div className="user-row">
            <div className="avatar">{initials}</div>
            <div>
              <div className="user-name">{name}</div>
              <div className="user-role">{role}</div>
            </div>
            <button className="logout-btn" title="Sign out" onClick={onSignOut}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M5 2H2.5A1.5 1.5 0 001 3.5v7A1.5 1.5 0 002.5 12H5M9 10l3-3-3-3M13 7H5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <main className="main">
        <div className="tabs">
          <button className={`tab-btn${activeTab === "quickstart" ? " active" : ""}`} onClick={() => setActiveTab("quickstart")}>Quick start</button>
          <button className={`tab-btn${activeTab === "keys"       ? " active" : ""}`} onClick={() => setActiveTab("keys")}>API keys</button>
          <button className={`tab-btn${activeTab === "results"    ? " active" : ""}`} onClick={() => setActiveTab("results")}>Scan results</button>
          <button className={`tab-btn${activeTab === "usage"      ? " active" : ""}`} onClick={() => setActiveTab("usage")}>Usage &amp; limits</button>
        </div>

        {/* ── KEYS TAB ── */}
        {activeTab === "keys" && (
          <div className="tab-panel active fade-up">
            <div className="page-tag">RealAPI · API keys</div>
            <h1 className="page-title" style={{ marginBottom: 20 }}>API key management</h1>
            <ApiKeysTab />
          </div>
        )}

        {/* ── QUICK START TAB ── */}
        {activeTab === "quickstart" && (
          <div className="tab-panel active fade-up">
            <div className="page-tag">RealAPI · Developer Console</div>
            <h1 className="page-title">Welcome to RealAPI</h1>
            <p className="page-desc">
              Integrate enterprise-grade deepfake detection into any app or platform.
              Detect manipulated images, audio, and video at scale — in minutes.
            </p>

            <div className="alert">
              <div className="alert-icon">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 2L14 13H2L8 2Z" stroke="#009FE3" strokeWidth="1.4" strokeLinejoin="round"/>
                  <path d="M8 6.5v3" stroke="#009FE3" strokeWidth="1.4" strokeLinecap="round"/>
                  <circle cx="8" cy="11" r="0.7" fill="#009FE3"/>
                </svg>
              </div>
              <div>
                <strong>Need higher volumes, real-time streams, or custom modalities?</strong>{" "}
                Your Enterprise plan includes priority support and dedicated infrastructure.{" "}
                <a href="https://www.deeptrack.io/contact">Talk to sales →</a>
              </div>
            </div>

            {/* STEP 01 */}
            <div className="step">
              <div className="step-num">01</div>
              <div className="step-body">
                <div className="step-header">
                  <div className="step-title">Install the SDK</div>
                  <div className="lang-toggle">
                    {(["ts", "py", "curl"] as Lang[]).map((l) => (
                      <button key={l} className={`lang-btn${activeLang === l ? " active" : ""}`} onClick={() => setActiveLang(l)}>
                        {l === "ts" ? "TypeScript" : l === "py" ? "Python" : "cURL"}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="step-desc">Install the Deeptrack client library and authenticate with your RealAPI key.</div>

                {lang.install && (
                  <div className="install-row">
                    {lang.install.map((pill) => (
                      <div key={pill.pm} className="install-pill">
                        <span><span className="pm">{pill.pm}</span> <span className="pn">{pill.pkg}</span></span>
                        <button className={`copy-btn${copied === pill.pkg ? " ok" : ""}`} onClick={() => handleCopy(pill.pkg, `${pill.pm} ${pill.pkg}`)}>
                          {copied === pill.pkg ? "Copied!" : "Copy"}
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="code-block">
                  <div className="code-header">
                    <div className="code-dots"><span /><span /><span /></div>
                    <span className="code-fname">{lang.fname}</span>
                    <button className={`copy-btn${copied === "code-body" ? " ok" : ""}`} onClick={() => handleCopy("code-body", lang.body)}>
                      {copied === "code-body" ? "Copied!" : "Copy"}
                    </button>
                  </div>
                  <pre className="code-body">{lang.body}</pre>
                </div>
              </div>
            </div>

            {/* STEP 02 */}
            <div className="step">
              <div className="step-num">02</div>
              <div className="step-body">
                <div className="step-title" style={{ marginBottom: 4 }}>Generate your API key</div>
                <div className="step-desc">Your key authenticates every RealAPI request. Never expose it in client-side code.</div>
                <div className="api-key-card">
                  <div>
                    <strong>Production key</strong>
                    <p>Scoped to all products on your plan. Rotate anytime without downtime.</p>
                  </div>
                  <button className="generate-btn" onClick={handleGenKey} disabled={isGeneratingKey}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <circle cx="5.5" cy="6" r="3.5" stroke="white" strokeWidth="1.3"/>
                      <path d="M8 8.5L11.5 12" stroke="white" strokeWidth="1.3" strokeLinecap="round"/>
                      <path d="M5.5 4.5V7.5M4 6h3" stroke="white" strokeWidth="1.2" strokeLinecap="round"/>
                    </svg>
                    {isGeneratingKey ? "Generating..." : "Generate key"}
                  </button>
                </div>
                {generateKeyError && (
                  <div style={{ marginTop: 10, color: "var(--red)", fontSize: 12.5 }}>{generateKeyError}</div>
                )}
                {apiKey && (
                  <div style={{ marginTop: 10 }}>
                    <div className="code-block">
                      <div className="code-header">
                        <div className="code-dots"><span /><span /><span /></div>
                        <span className="code-fname" style={{ color: "var(--amber)" }}>New key — copy now, it won&apos;t be shown again</span>
                        <button className={`copy-btn${copied === "api-key" ? " ok" : ""}`} onClick={() => handleCopy("api-key", apiKey)}>
                          {copied === "api-key" ? "Copied!" : "Copy"}
                        </button>
                      </div>
                      <div className="code-body" style={{ color: "var(--blue-primary)", fontWeight: 700 }}>{apiKey}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* STEP 03 */}
            <div className="step">
              <div className="step-num">03</div>
              <div className="step-body">
                <div className="step-title" style={{ marginBottom: 4 }}>View your scan results</div>
                <div className="step-desc">Once your integration is live, verdicts and confidence scores stream into the Scan results tab in real time.</div>
                <div className="empty-state">
                  <div className="empty-icon">
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                      <circle cx="11" cy="11" r="8"   stroke="#009FE3" strokeWidth="1.5"/>
                      <circle cx="11" cy="11" r="3.5" stroke="#009FE3" strokeWidth="1.5"/>
                      <circle cx="11" cy="11" r="1"   fill="#009FE3"/>
                    </svg>
                  </div>
                  <h3>No scans yet</h3>
                  <p>Complete steps 1 &amp; 2 then run your first scan. Results appear here and in the{" "}
                    <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab("results"); }}>Scan results</a> tab.
                  </p>
                </div>
              </div>
            </div>

            {/* Product Suite */}
            <div className="products-section">
              <div className="products-label">Deeptrack product suite</div>
              <div className="product-grid">
                {PRODUCTS.map((p) => (
                  <div key={p.name} className="product-card" onClick={() => setActiveTab("results")}>
                    <div className="product-icon">{p.icon}</div>
                    <div className="product-name">{p.name}</div>
                    <div className="product-desc">{p.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── SCAN RESULTS TAB ── */}
        {activeTab === "results" && (
          <div className="tab-panel active fade-up">
            <div className="page-tag">RealAPI · Scan results</div>
            <h1 className="page-title" style={{ marginBottom: 20 }}>Scan results</h1>

            <div className="stat-grid">
              <div className="stat-card"><div className="stat-label">Total scans</div><div className="stat-value blue">{STATS.totalScans.toLocaleString()}</div><div className="stat-sub">Last 30 days</div></div>
              <div className="stat-card"><div className="stat-label">Authentic</div><div className="stat-value green">{STATS.authentic.toLocaleString()}</div><div className="stat-sub">{((STATS.authentic / STATS.totalScans) * 100).toFixed(1)}% of scans</div></div>
              <div className="stat-card"><div className="stat-label">Manipulated</div><div className="stat-value red">{STATS.manipulated.toLocaleString()}</div><div className="stat-sub">{((STATS.manipulated / STATS.totalScans) * 100).toFixed(1)}% of scans</div></div>
              <div className="stat-card"><div className="stat-label">Uncertain</div><div className="stat-value amber">{STATS.uncertain.toLocaleString()}</div><div className="stat-sub">{((STATS.uncertain / STATS.totalScans) * 100).toFixed(1)}% of scans</div></div>
            </div>

            <div className="table-wrap">
              <div className="table-head-bar">
                <strong>Recent scans</strong>
                <span>Showing {SCANS.length} of {STATS.totalScans.toLocaleString()}</span>
              </div>
              <table>
                <thead>
                  <tr><th>File</th><th>Type</th><th>Product</th><th>Verdict</th><th>Confidence</th><th>Time</th></tr>
                </thead>
                <tbody>
                  {SCANS.map((s, i) => {
                    const fillCls = s.verdict === "manipulated" ? " r" : s.verdict === "uncertain" ? " a" : "";
                    return (
                      <tr key={i}>
                        <td><span className="scan-fname">{s.file}</span></td>
                        <td><span className="type-pill">{s.type}</span></td>
                        <td style={{ fontSize: 13, color: "var(--text-2)" }}>{s.product}</td>
                        <td><span className={`v-pill ${s.verdict}`}>{s.verdict}</span></td>
                        <td>
                          <div className="conf-wrap">
                            <div className="conf-bg"><div className={`conf-fill${fillCls}`} style={{ width: `${Math.round(s.conf * 100)}%` }} /></div>
                            <span className="conf-pct">{Math.round(s.conf * 100)}%</span>
                          </div>
                        </td>
                        <td style={{ color: "var(--text-3)", fontSize: 12, whiteSpace: "nowrap" }}>{s.time}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── USAGE TAB ── */}
        {activeTab === "usage" && (
          <div className="tab-panel active fade-up">
            <div className="page-tag">RealAPI · Usage</div>
            <h1 className="page-title" style={{ marginBottom: 20 }}>Usage &amp; limits</h1>

            {usageError && (
              <div style={{ background: "var(--amber-light)", border: "1px solid #f0a00030", borderRadius: 8, padding: "10px 16px", fontSize: 12.5, color: "var(--amber)", marginBottom: 20 }}>
                {usageError}
              </div>
            )}

            <div className="stat-grid" style={{ gridTemplateColumns: "repeat(3, minmax(0, 1fr))" }}>
              <div className="stat-card"><div className="stat-label">Scans used</div><div className="stat-value blue">{usageLoading ? "—" : usageData.scans_used.toLocaleString()}</div><div className="stat-sub">of {usageData.scans_limit.toLocaleString()} this month</div></div>
              <div className="stat-card"><div className="stat-label">Remaining</div><div className="stat-value green">{usageLoading ? "—" : usageData.scans_remaining.toLocaleString()}</div><div className="stat-sub">Resets {usageData.reset_date}</div></div>
              <div className="stat-card"><div className="stat-label">Avg response</div><div className="stat-value">{usageLoading ? "—" : `${(usageData.avg_response_ms / 1000).toFixed(1)}s`}</div><div className="stat-sub">Last 7 days</div></div>
            </div>

            <div className="table-wrap" style={{ marginTop: 0 }}>
              <div className="table-head-bar">
                <strong>{usageData.usage_row_kind === "key" ? "Usage by API key" : "Usage by product"}</strong>
                <span>{usageData.usage_period_label ?? "Current billing period"}</span>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>{usageData.usage_row_kind === "key" ? "API key" : "Product"}</th>
                    <th>Scans</th><th>% of total</th><th>Avg confidence</th>
                  </tr>
                </thead>
                <tbody>
                  {usageData.by_product.length === 0 ? (
                    <tr><td colSpan={4} style={{ color: "var(--text-3)", fontSize: 13 }}>No usage recorded for this period.</td></tr>
                  ) : (
                    usageData.by_product.map((row) => (
                      <tr key={row.name}>
                        <td><strong>{row.name}</strong></td>
                        <td>{row.scans}</td>
                        <td>
                          <div className="conf-wrap">
                            <div className="conf-bg"><div className="conf-fill" style={{ width: `${row.pct}%` }} /></div>
                            <span className="conf-pct">{row.pct}%</span>
                          </div>
                        </td>
                        <td>
                          <span style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--blue-primary)", fontWeight: 700 }}>
                            {usageData.usage_row_kind === "key" && row.avgConf === 0 ? "—" : row.avgConf.toFixed(2)}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

// ─────────────────────────────────────────
// Page entry point
// ─────────────────────────────────────────

export default function ConsolePage() {
  const { isAuthenticated, isLoading, user, loginWithRedirect, logout, getAccessTokenSilently } = useAuth0();
  const [currentUser, setCurrentUser] = useState<DemoUser>({ name: "Developer" });

  useEffect(() => {
    if (isAuthenticated && user) {
      setCurrentUser({ name: user.name ?? user.email ?? "Developer" });
    }
  }, [isAuthenticated, user]);

  if (isLoading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#F0F4F7" }}>
        <div style={{ width: 24, height: 24, border: "2px solid #C4D6E0", borderTopColor: "#009FE3", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (!isAuthenticated) {
    loginWithRedirect();
    return null;
  }

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --blue-primary:  #009FE3;
          --blue-mid:      #4DB8E0;
          --blue-light:    #7EC8E3;
          --blue-deep:     #0077B6;
          --blue-pale:     #E6F5FB;
          --blue-pale2:    #CCE9F5;
          --bg:            #F0F4F7;
          --surface:       #FFFFFF;
          --surface-2:     #F7FAFB;
          --border:        #DDE8EE;
          --border-mid:    #C4D6E0;
          --text-1:        #111827;
          --text-2:        #4B5563;
          --text-3:        #9CA3AF;
          --red:           #DC2626;
          --red-light:     #FEF2F2;
          --amber:         #D97706;
          --amber-light:   #FFFBEB;
          --green:         #059669;
          --green-light:   #ECFDF5;
          --code-bg:       #F8FAFB;
          --sans: 'Space Grotesk', sans-serif;
          --mono: 'Space Mono', monospace;
        }
        html, body { height: 100%; }
        body { font-family: var(--sans); background: var(--bg); color: var(--text-1); line-height: 1.5; -webkit-font-smoothing: antialiased; }
        #app { display: none; min-height: 100vh; }
        #app.visible { display: flex; }
        .sidebar { width: 240px; flex-shrink: 0; background: var(--surface); border-right: 1px solid var(--border); display: flex; flex-direction: column; position: sticky; top: 0; height: 100vh; overflow-y: auto; }
        .logo-area { padding: 18px 18px 16px; border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; }
        .api-badge { font-size: 9.5px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; background: var(--blue-pale); color: var(--blue-primary); border: 1px solid var(--blue-pale2); padding: 3px 8px; border-radius: 20px; }
        nav { padding: 10px 0; flex: 1; }
        .nav-label { font-size: 10px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-3); padding: 10px 18px 4px; }
        .nav-item { display: flex; align-items: center; gap: 9px; padding: 8px 18px; font-size: 13.5px; font-weight: 400; color: var(--text-2); cursor: pointer; border-left: 2px solid transparent; transition: all 0.12s; text-decoration: none; }
        .nav-item:hover { background: var(--surface-2); color: var(--text-1); }
        .nav-item.active { background: var(--blue-pale); color: var(--blue-primary); border-left-color: var(--blue-primary); font-weight: 600; }
        .ni { width: 14px; height: 14px; opacity: 0.4; flex-shrink: 0; }
        .nav-item.active .ni { opacity: 1; color: var(--blue-primary); }
        .nav-item:hover .ni { opacity: 0.7; }
        .sidebar-footer { padding: 16px 18px; border-top: 1px solid var(--border); }
        .credit-row { display: flex; justify-content: space-between; align-items: baseline; font-size: 12px; margin-bottom: 6px; }
        .credit-row strong { color: var(--text-1); font-weight: 600; }
        .credit-row span { color: var(--text-3); }
        .credit-track { height: 4px; background: var(--blue-pale2); border-radius: 2px; overflow: hidden; margin-bottom: 4px; }
        .credit-fill { height: 100%; background: var(--blue-primary); border-radius: 2px; }
        .credit-sub { font-size: 11px; color: var(--text-3); margin-bottom: 14px; }
        .user-row { display: flex; align-items: center; gap: 9px; }
        .avatar { width: 32px; height: 32px; border-radius: 50%; background: var(--blue-pale); border: 1.5px solid var(--blue-pale2); display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; color: var(--blue-primary); flex-shrink: 0; }
        .user-name { font-size: 13px; font-weight: 600; color: var(--text-1); }
        .user-role { font-size: 11px; color: var(--text-3); }
        .logout-btn { margin-left: auto; background: none; border: none; color: var(--text-3); cursor: pointer; padding: 4px; border-radius: 5px; transition: color 0.12s; display: flex; align-items: center; }
        .logout-btn:hover { color: var(--text-2); }
        .main { flex: 1; padding: 44px 52px; max-width: 880px; }
        .page-tag { font-size: 11px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--blue-primary); margin-bottom: 6px; }
        .page-title { font-size: 26px; font-weight: 700; letter-spacing: -0.5px; color: var(--text-1); margin-bottom: 6px; }
        .page-desc { font-size: 14px; color: var(--text-2); line-height: 1.65; max-width: 540px; margin-bottom: 28px; font-weight: 400; }
        .tabs { display: flex; border-bottom: 1.5px solid var(--border); margin-bottom: 32px; }
        .tab-btn { padding: 10px 18px; font-size: 13.5px; font-weight: 500; color: var(--text-3); background: none; border: none; border-bottom: 2.5px solid transparent; margin-bottom: -1.5px; cursor: pointer; font-family: var(--sans); transition: all 0.12s; }
        .tab-btn:hover { color: var(--text-1); }
        .tab-btn.active { color: var(--blue-primary); border-bottom-color: var(--blue-primary); font-weight: 600; }
        .tab-panel { display: none; }
        .tab-panel.active { display: block; }
        .alert { background: var(--blue-pale); border: 1px solid var(--blue-pale2); border-left: 3px solid var(--blue-primary); border-radius: 10px; padding: 14px 18px; display: flex; align-items: center; gap: 13px; margin-bottom: 32px; font-size: 13.5px; color: var(--text-2); line-height: 1.55; }
        .alert-icon { width: 32px; height: 32px; background: var(--blue-pale2); border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .alert a { color: var(--blue-primary); text-decoration: none; font-weight: 600; }
        .alert strong { color: var(--text-1); }
        .step { display: flex; gap: 20px; margin-bottom: 30px; }
        .step-num { width: 34px; height: 34px; border-radius: 8px; background: var(--blue-pale); border: 1.5px solid var(--blue-pale2); display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; color: var(--blue-primary); flex-shrink: 0; margin-top: 1px; font-family: var(--mono); }
        .step-body { flex: 1; }
        .step-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; margin-bottom: 4px; flex-wrap: wrap; }
        .step-title { font-size: 15px; font-weight: 700; color: var(--text-1); }
        .step-desc { font-size: 13.5px; color: var(--text-2); line-height: 1.6; margin-bottom: 14px; font-weight: 400; }
        .lang-toggle { display: flex; gap: 2px; background: var(--surface-2); border: 1px solid var(--border); border-radius: 8px; padding: 3px; flex-shrink: 0; }
        .lang-btn { font-size: 11.5px; font-weight: 500; padding: 4px 11px; border-radius: 6px; border: none; background: transparent; color: var(--text-3); cursor: pointer; font-family: var(--sans); transition: all 0.12s; }
        .lang-btn.active { background: var(--surface); color: var(--text-1); font-weight: 600; box-shadow: 0 1px 3px rgba(0,0,0,0.08); }
        .code-block { background: var(--code-bg); border: 1px solid var(--border); border-radius: 10px; overflow: hidden; margin-bottom: 10px; }
        .code-header { background: var(--surface); border-bottom: 1px solid var(--border); padding: 9px 14px; display: flex; align-items: center; gap: 8px; }
        .code-dots { display: flex; gap: 5px; }
        .code-dots span { width: 9px; height: 9px; border-radius: 50%; background: var(--border); }
        .code-fname { font-size: 11.5px; color: var(--text-3); font-family: var(--mono); flex: 1; margin-left: 4px; }
        .copy-btn { font-size: 11.5px; font-weight: 500; padding: 3px 11px; border-radius: 6px; border: 1px solid var(--border); background: var(--surface); color: var(--text-2); cursor: pointer; font-family: var(--sans); transition: all 0.12s; }
        .copy-btn:hover { border-color: var(--blue-primary); color: var(--blue-primary); }
        .copy-btn.ok { color: var(--green); border-color: #A7F3D0; }
        .code-body { padding: 16px 18px; font-size: 12.5px; font-family: var(--mono); line-height: 1.8; overflow-x: auto; white-space: pre; color: #374151; margin: 0; }
        .install-row { display: flex; gap: 8px; margin-bottom: 10px; flex-wrap: wrap; }
        .install-pill { flex: 1; min-width: 200px; background: var(--code-bg); border: 1px solid var(--border); border-radius: 10px; padding: 10px 14px; display: flex; align-items: center; justify-content: space-between; font-family: var(--mono); font-size: 12.5px; color: var(--text-2); }
        .install-pill .pm { color: var(--text-3); margin-right: 6px; }
        .install-pill .pn { color: var(--blue-primary); font-weight: 700; }
        .api-key-card { background: var(--surface); border: 1px solid var(--border); border-radius: 10px; padding: 18px 20px; display: flex; align-items: center; justify-content: space-between; gap: 20px; flex-wrap: wrap; }
        .api-key-card strong { font-size: 14px; font-weight: 700; color: var(--text-1); display: block; margin-bottom: 3px; }
        .api-key-card p { font-size: 13px; color: var(--text-2); line-height: 1.5; }
        .generate-btn { display: inline-flex; align-items: center; gap: 8px; background: var(--blue-primary); color: #fff; font-size: 13.5px; font-weight: 700; padding: 10px 20px; border-radius: 9px; border: none; cursor: pointer; font-family: var(--sans); transition: all 0.15s; white-space: nowrap; }
        .generate-btn:hover { background: var(--blue-deep); }
        .generate-btn:active { transform: scale(0.98); }
        .stat-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 10px; margin-bottom: 22px; }
        .stat-card { background: var(--surface); border: 1px solid var(--border); border-radius: 10px; padding: 16px; }
        .stat-label { font-size: 11px; font-weight: 600; letter-spacing: 0.07em; text-transform: uppercase; color: var(--text-3); margin-bottom: 6px; }
        .stat-value { font-size: 28px; font-weight: 700; color: var(--text-1); line-height: 1; letter-spacing: -1px; }
        .stat-value.blue  { color: var(--blue-primary); }
        .stat-value.green { color: var(--green); }
        .stat-value.red   { color: var(--red); }
        .stat-value.amber { color: var(--amber); }
        .stat-sub { font-size: 11.5px; color: var(--text-3); margin-top: 5px; }
        .table-wrap { background: var(--surface); border: 1px solid var(--border); border-radius: 10px; overflow: hidden; margin-bottom: 16px; }
        .table-head-bar { padding: 12px 18px; border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; }
        .table-head-bar strong { font-size: 13.5px; font-weight: 700; color: var(--text-1); }
        .table-head-bar span   { font-size: 12px; color: var(--text-3); }
        table { width: 100%; border-collapse: collapse; }
        thead th { padding: 9px 18px; text-align: left; font-size: 11px; font-weight: 600; letter-spacing: 0.07em; text-transform: uppercase; color: var(--text-3); border-bottom: 1px solid var(--border); background: var(--surface-2); }
        tbody tr { border-bottom: 1px solid var(--border); transition: background 0.1s; }
        tbody tr:last-child { border-bottom: none; }
        tbody tr:hover { background: var(--surface-2); }
        tbody td { padding: 11px 18px; font-size: 13px; color: var(--text-2); vertical-align: middle; }
        .scan-fname { font-family: var(--mono); font-size: 12px; color: var(--text-1); font-weight: 700; }
        .v-pill { display: inline-flex; align-items: center; gap: 5px; font-size: 11px; font-weight: 700; padding: 3px 10px; border-radius: 20px; letter-spacing: 0.02em; }
        .v-pill::before { content: ''; width: 5px; height: 5px; border-radius: 50%; background: currentColor; }
        .v-pill.authentic   { background: var(--green-light);  color: var(--green); border: 1px solid #A7F3D0; }
        .v-pill.manipulated { background: var(--red-light);    color: var(--red);   border: 1px solid #FECACA; }
        .v-pill.uncertain   { background: var(--amber-light);  color: var(--amber); border: 1px solid #FDE68A; }
        .conf-wrap { display: flex; align-items: center; gap: 8px; }
        .conf-bg { flex: 1; height: 4px; background: var(--border); border-radius: 2px; overflow: hidden; min-width: 50px; }
        .conf-fill { height: 100%; border-radius: 2px; background: var(--blue-primary); }
        .conf-fill.r { background: var(--red); }
        .conf-fill.a { background: var(--amber); }
        .conf-pct { font-size: 11.5px; font-family: var(--mono); color: var(--text-3); min-width: 30px; text-align: right; }
        .type-pill { font-size: 11px; font-family: var(--mono); background: var(--surface-2); border: 1px solid var(--border); color: var(--text-2); padding: 2px 8px; border-radius: 5px; }
        .empty-state { background: var(--surface); border: 1px solid var(--border); border-radius: 10px; padding: 48px 24px; text-align: center; }
        .empty-icon { width: 48px; height: 48px; border-radius: 12px; background: var(--blue-pale); border: 1.5px solid var(--blue-pale2); display: flex; align-items: center; justify-content: center; margin: 0 auto 14px; }
        .empty-state h3 { font-size: 15px; font-weight: 700; color: var(--text-1); margin-bottom: 6px; }
        .empty-state p  { font-size: 13.5px; color: var(--text-2); line-height: 1.65; max-width: 360px; margin: 0 auto; }
        .empty-state a  { color: var(--blue-primary); text-decoration: none; font-weight: 600; }
        .products-section { margin-top: 36px; padding-top: 26px; border-top: 1px solid var(--border); }
        .products-label { font-size: 11px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-3); margin-bottom: 12px; }
        .product-grid { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 8px; }
        .product-card { background: var(--surface); border: 1px solid var(--border); border-radius: 10px; padding: 14px; cursor: pointer; transition: all 0.14s; }
        .product-card:hover { border-color: var(--blue-primary); background: var(--blue-pale); transform: translateY(-1px); }
        .product-icon { width: 28px; height: 28px; border-radius: 6px; background: var(--surface-2); border: 1px solid var(--border); display: flex; align-items: center; justify-content: center; margin-bottom: 10px; }
        .product-name { font-size: 12.5px; font-weight: 700; color: var(--text-1); margin-bottom: 2px; }
        .product-desc { font-size: 10.5px; color: var(--text-3); line-height: 1.4; }
        ::-webkit-scrollbar { width: 5px; height: 5px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: var(--border-mid); border-radius: 3px; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes spin { to { transform: rotate(360deg); } }
        .fade-up { animation: fadeUp 0.35s ease both; }
      `}</style>

      <AppShell
        userName={currentUser.name}
        onSignOut={() => logout({ logoutParams: { returnTo: window.location.origin } })}
        getAccessTokenSilently={getAccessTokenSilently}
      />
    </>
  );
}