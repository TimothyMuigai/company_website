"use client";

/**
 * RealAPI Console — deeptrack.io/console
 *
 * Auth:  Auth0-style demo mode (no live auth calls while DEMO_MODE is true)
 * Style: CSS-in-JSX via <style> tag — all design tokens preserved from v3 HTML
 *
 * TODO items are marked with  // TODO:  comments throughout.
 * Most live data should come from your Deeptrack backend API.
 */

// TODO: re-enable Clerk once keys are configured
// import { useUser, useClerk, useSignIn } from "@clerk/nextjs";
import React, { useState, useEffect, useCallback } from "react";
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

interface UsageStat {
  product: string;
  scans: number;
  pct: number;
  avgConf: number;
}

interface KeyUsage {
  api_key_preview: string;
  scans_used: number;
  status: string;
  created_at: string;
  plan: string;
}

interface UsageResponse {
  plan?: string;
  scan_count?: number;
  monthly_limit?: number;
  active?: boolean;
  keys?: KeyUsage[];
  total_scans?: number;
}

// ─────────────────────────────────────────
// Demo / placeholder data
// Replace these with real API calls.
// ─────────────────────────────────────────

// Live data will be fetched from server APIs; keep empty defaults here.
const SCANS: Scan[] = [];

const USAGE_BY_PRODUCT: UsageStat[] = [];

// ─────────────────────────────────────────
// Code snippets (Step 01)
// ─────────────────────────────────────────

const DEEPTRACK_API_BASE =
  process.env.NEXT_PUBLIC_DEEPTRACK_API_BASE_URL ||
  "https://fridep38xb.execute-api.us-east-1.amazonaws.com/prod";

// Use local Next.js API routes as a server-side proxy to avoid CORS
const LOCAL_KEY_API = {
  generate: `/api/generate-key`,
  usage: `/api/usage`,
  revoke: `/api/revoke-key`,
} as const;

const GOTHAM_ENDPOINT = process.env.NEXT_PUBLIC_GOTHAM_ENDPOINT || "https://gotham.deeptrack.io/scan";

const CODE: Record<Lang, { fname: string; install: { pm: string; pkg: string }[] | null; body: string }> = {
  ts: {
    fname: "index.ts",
    install: null,
    body: `const response = await fetch('%ENDPOINT%', {
  method: 'POST',
  headers: {
    'x-api-key': '%KEY%',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ file_url: 'https://example.com/video.mp4' }),
});

const result = await response.json();
console.log(result);
`,
  },
  py: {
    fname: "main.py",
    install: [{ pm: "pip install", pkg: "requests" }],
    body: `import requests

response = requests.post(
  "%ENDPOINT%",
  headers={
    "x-api-key": "%KEY%",
    "Content-Type": "application/json",
  },
  json={"file_url": "https://example.com/video.mp4"},
)

print(response.json())
`,
  },
  curl: {
    fname: "terminal",
    install: null,
    body: `curl -X POST %ENDPOINT% \
  -H 'x-api-key: %KEY%' \
  -H 'Content-Type: application/json' \
  -d '{"file_url":"https://example.com/video.mp4"}'
`,
  },
};

// ─────────────────────────────────────────
// Product suite
// ─────────────────────────────────────────

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
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

async function copyToClipboard(text: string): Promise<void> {
  await navigator.clipboard.writeText(text);
}

const AUTH0_DOMAIN = "YOUR_AUTH0_DOMAIN.auth0.com";
const AUTH0_CLIENT_ID = "YOUR_AUTH0_CLIENT_ID";
const DEMO_MODE = true;

// ─────────────────────────────────────────
// Auth Gate (shown when not signed in)
// ─────────────────────────────────────────

function AuthGate({ onSignIn }: { onSignIn: (user: DemoUser) => void }) {
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function enterApp(user: DemoUser) {
    onSignIn(user);
  }

  function loginWithGoogle() {
    setError(null);
    setLoading("Redirecting to Google...");
    if (DEMO_MODE) {
      setTimeout(() => {
        enterApp({ name: "Demo Developer" });
      }, 1200);
      return;
    }
    setLoading(null);
    setError(`Auth is not configured yet. Set ${AUTH0_DOMAIN} and ${AUTH0_CLIENT_ID}.`);
  }

  function loginWithAuth0() {
    setError(null);
    setLoading("Redirecting to Auth0...");
    if (DEMO_MODE) {
      setTimeout(() => {
        enterApp({ name: "Demo Developer" });
      }, 1200);
      return;
    }
    setLoading(null);
    setError(`Auth is not configured yet. Set ${AUTH0_DOMAIN} and ${AUTH0_CLIENT_ID}.`);
  }

  return (
    <div id="auth-gate">
      <div className="auth-card fade-up">
        {/* Logo */}
        <div className="auth-logo-wrap">
          <img
            src="/logos/deeptrack-high-resolution-logo-transparent.png"
            alt="Deeptrack"
            className="auth-logo-img"
          />
        </div>

        <h1 className="auth-headline">Sign in to RealAPI Console</h1>
        <p className="auth-sub">
          Access your developer dashboard, generate API keys, and monitor your
          deepfake detection scans in real time.<br /><br />
          No account yet?{" "}
          <a href="https://www.deeptrack.io/contact">Talk to us →</a>
        </p>

        {loading ? (
          <div className="auth-loading" style={{ display: "flex" }}>
            <div className="spinner" />
            <span>{loading}</span>
          </div>
        ) : (
          <>
            <button type="button" className="auth-btn auth-btn-google" onClick={loginWithGoogle}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z" fill="#4285F4" />
                <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z" fill="#34A853" />
                <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z" fill="#FBBC05" />
                <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58Z" fill="#EA4335" />
              </svg>
              Continue with Google
            </button>

            <div className="auth-divider">
              <span /><em>or</em><span />
            </div>

            <button type="button" className="auth-btn auth-btn-auth0" onClick={loginWithAuth0}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M9 1L15 4.5V9c0 3.5-3 6-6 7.5C6 15 3 12.5 3 9V4.5L9 1Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
                <circle cx="9" cy="9" r="2.5" fill="white" />
              </svg>
              Continue with Auth0 SSO
            </button>

            {error && (
              <div
                role="alert"
                style={{
                  marginTop: 10,
                  border: "1px solid #fecaca",
                  background: "#fef2f2",
                  color: "#991b1b",
                  borderRadius: 8,
                  padding: "10px 12px",
                  fontSize: 12,
                  lineHeight: 1.5,
                  textAlign: "left",
                }}
              >
                {error}
              </div>
            )}
          </>
        )}

        <p className="auth-terms" style={{ marginTop: 20 }}>
          By signing in you agree to Deeptrack&apos;s{" "}
          <a href="https://docs.google.com/document/d/1jSyNPxKrabOBlZxi8kf0eRsjsAyo6G5vFCLDhY6ockE/edit?tab=t.0" target="_blank" rel="noreferrer">Terms of Service</a>
          {" "}and{" "}
          <a href="https://app.eu.vanta.com/deeptrack.io/trust/ykzpe8x33wwv9mki8rjv61" target="_blank" rel="noreferrer">Privacy Policy</a>.
        </p>
        <div className="auth-back">
          <a href="https://www.deeptrack.io/productApi">← Back to RealAPI</a>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────
// App Shell (shown when signed in)
// ─────────────────────────────────────────

function AppShell({ onSignOut, userName }: { onSignOut: () => void; userName: string }) {
  const [activeTab, setActiveTab]     = useState<Tab>("quickstart");
  const [activeLang, setActiveLang]   = useState<Lang>("ts");
  const [apiKey, setApiKey]           = useState<string | null>(null);
  const [apiKeyCreatedAt, setApiKeyCreatedAt] = useState<string | null>(null);
  const [isGeneratingKey, setIsGeneratingKey] = useState(false);
  const [generateKeyError, setGenerateKeyError] = useState<string | null>(null);
  const [usageData, setUsageData] = useState<UsageResponse | null>(null);
  const [usageError, setUsageError] = useState<string | null>(null);
  const [copied, setCopied]           = useState<string | null>(null); // tracks which copy button
  const [revoking, setRevoking] = useState<string | null>(null);

  const name     = userName;
  const initials = getInitials(name);
  const role     = "";

  function showTab(tab: Tab) {
    setActiveTab(tab);
  }

  async function handleGenKey() {
    setIsGeneratingKey(true);
    setGenerateKeyError(null);
    setUsageError(null);

    try {
      const clientId = name.includes("@") ? name : "test-client";
      const response = await fetch(LOCAL_KEY_API.generate, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          clientId,
          clientName: name,
        }),
      });

      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload?.error || payload?.message || "Failed to generate key");
      }

      const rawKey = payload?.api_key;
      if (!rawKey || typeof rawKey !== "string") {
        throw new Error("Key not returned by key generation endpoint");
      }

      setApiKey(rawKey);
      setApiKeyCreatedAt(
        new Date().toLocaleDateString(undefined, {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
      );
      sessionStorage.setItem("dt_api_key", rawKey);
      // Fetch usage from local usage endpoint by clientId
      await fetchUsageForClient(clientId, rawKey);
    } catch (error) {
      setGenerateKeyError(error instanceof Error ? error.message : "Failed to generate key");
    } finally {
      setIsGeneratingKey(false);
    }
  }

  // Fetch usage for a given clientId using the local proxy
  async function fetchUsageForClient(clientId?: string, key?: string) {
    try {
      setUsageError(null);
      const cid = clientId ?? (name.includes("@") ? name : "test-client");
      if (!cid) return;

      const response = await fetch(`${LOCAL_KEY_API.usage}?clientId=${encodeURIComponent(cid)}`, { cache: "no-store" });
      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload?.error || payload?.message || "Failed to load usage data");
      }

      // Local /api/usage returns { keys: KeyUsage[], total_scans }
      // Convert to the UsageResponse shape used by the UI
      const keys = Array.isArray(payload.keys) ? payload.keys : [];
      const first = keys[0];
      const result = {
        plan: first?.plan ?? "basic",
        scan_count: first?.scans_used ?? payload.total_scans ?? 0,
        monthly_limit: first?.monthly_limit ?? 0,
        active: first ? first.status === "active" : true,
        keys,
        total_scans: payload.total_scans ?? 0,
      } as UsageResponse;

      setUsageData(result);
    } catch (error) {
      setUsageError(error instanceof Error ? error.message : "Failed to load usage");
    }
  }

  async function handleRevoke() {
    if (!apiKey) return;
    if (!confirm("Revoke this API key? This cannot be undone.")) return;
    try {
      setRevoking(apiKey);
      setUsageError(null);
      const response = await fetch(LOCAL_KEY_API.revoke, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ api_key: apiKey, api_key_preview: apiKey.slice(0, 12) + "..." }),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload?.error || payload?.message || "Failed to revoke key");
      setApiKey(null);
      setUsageData(null);
      setApiKeyCreatedAt(null);
      sessionStorage.removeItem("dt_api_key");
    } catch (err) {
      setUsageError(err instanceof Error ? err.message : "Failed to revoke key");
    } finally {
      setRevoking(null);
    }
  }

  useEffect(() => {
    if (!name) return;
    const storedKey = typeof window !== "undefined" ? sessionStorage.getItem("dt_api_key") : null;
    if (storedKey) {
      setApiKey(storedKey);
      const clientId = name.includes("@") ? name : "test-client";
      void fetchUsageForClient(clientId, storedKey);
    }
  }, [name]);

  const handleCopy = useCallback(async (id: string, text: string) => {
    await copyToClipboard(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 1500);
  }, []);

  const lang = CODE[activeLang];
  const codeBody = lang.body
    .replace(/%ENDPOINT%/g, GOTHAM_ENDPOINT)
    .replace(/%KEY%/g, apiKey || "dt_live_••••••••••••••••");

  const currentKeyPreview = apiKey ? `${apiKey.slice(0, 12)}...` : null;

  return (
    <div id="app" className="visible">
      {/* ── SIDEBAR ── */}
      <aside className="sidebar">
        <div className="logo-area">
          <img
            src="/logos/deeptrack-high-resolution-logo-transparent.png"
            alt="Deeptrack"
            className="sidebar-logo-img"
          />
          <span className="api-badge">RealAPI</span>
        </div>

        <nav>
          <div className="nav-label">Developer</div>
          <a className={`nav-item${activeTab === "quickstart"   ? " active" : ""}`} href="#" onClick={(e) => { e.preventDefault(); showTab("quickstart");   }}>
            <svg className="ni" viewBox="0 0 14 14" fill="none"><rect x="1" y="1" width="5" height="5" rx="1.2" stroke="currentColor" strokeWidth="1.2"/><rect x="8" y="1" width="5" height="5" rx="1.2" stroke="currentColor" strokeWidth="1.2"/><rect x="1" y="8" width="5" height="5" rx="1.2" stroke="currentColor" strokeWidth="1.2"/><rect x="8" y="8" width="5" height="5" rx="1.2" stroke="currentColor" strokeWidth="1.2"/></svg>
            Quick start
          </a>
          <a className={`nav-item${activeTab === "keys" ? " active" : ""}`} href="#" onClick={(e) => { e.preventDefault(); showTab("keys"); }}>
            <svg className="ni" viewBox="0 0 14 14" fill="none"><circle cx="4.5" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.2"/><path d="M7 6h6M10 6v2M12 6v2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
            API keys
          </a>
          <a className={`nav-item${activeTab === "results" ? " active" : ""}`} href="#" onClick={(e) => { e.preventDefault(); showTab("results"); }}>
            <svg className="ni" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.2"/><circle cx="7" cy="7" r="2" stroke="currentColor" strokeWidth="1.2"/></svg>
            Scan results
          </a>
          <a className={`nav-item${activeTab === "usage"   ? " active" : ""}`} href="#" onClick={(e) => { e.preventDefault(); showTab("usage");   }}>
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

        {/* sidebar footer removed per request */}
      </aside>

      {/* ── MAIN ── */}
      <main className="main">
        {/* Tab bar */}
        <div className="tabs">
          <button id="tab-btn-quickstart"   className={`tab-btn${activeTab === "quickstart"   ? " active" : ""}`} onClick={() => showTab("quickstart")}>Quick start</button>
          <button id="tab-btn-keys" className={`tab-btn${activeTab === "keys" ? " active" : ""}`} onClick={() => showTab("keys")}>API keys</button>
          <button id="tab-btn-results" className={`tab-btn${activeTab === "results" ? " active" : ""}`} onClick={() => showTab("results")}>Scan results</button>
          <button id="tab-btn-usage"   className={`tab-btn${activeTab === "usage"   ? " active" : ""}`} onClick={() => showTab("usage")}>Usage &amp; limits</button>
        </div>

        {activeTab === "keys" && (
          <div className="tab-panel active fade-up">
            <div className="page-tag">RealAPI · API keys</div>
            <h1 className="page-title" style={{ marginBottom: 20 }}>API key management</h1>
            <p className="page-desc">
              Generate and revoke keys from the Deeptrack gateway. Use your active key to authenticate requests.
            </p>

            {usageError && (
              <div style={{ marginBottom: 16, color: "var(--red)", fontSize: 13 }}>
                {usageError}
              </div>
            )}

            {apiKey ? (
              <>
                <div className="api-key-card" style={{ marginBottom: 20 }}>
                  <div>
                    <strong>Active API key</strong>
                    <p>Keep this key secret. Revoke it if it is compromised.</p>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                    <div className="code-block" style={{ minWidth: 0, flex: 1 }}>
                      <div className="code-header">
                        <div className="code-dots"><span /><span /><span /></div>
                        <span className="code-fname" style={{ color: "var(--amber)" }}>
                          Key preview
                        </span>
                        <button
                          className={`copy-btn${copied === "api-key" ? " ok" : ""}`}
                          onClick={() => handleCopy("api-key", apiKey)}
                        >
                          {copied === "api-key" ? "Copied!" : "Copy"}
                        </button>
                      </div>
                      <div className="code-body" style={{ color: "var(--blue-primary)", fontWeight: 700 }}>
                        {`${apiKey.slice(0, 12)}...`}
                      </div>
                    </div>
                    <button className="generate-btn" onClick={handleRevoke} disabled={revoking !== null}>
                      {revoking !== null ? "Revoking..." : "Revoke key"}
                    </button>
                  </div>
                </div>

                <div className="table-wrap">
                  <div className="table-head-bar">
                    <strong>Key details</strong>
                    <span>Live from Deeptrack</span>
                  </div>
                  <table>
                    <thead>
                      <tr>
                        <th>Plan</th><th>Scans used</th><th>Limit</th><th>Status</th><th>Created</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{usageData?.plan ?? "basic"}</td>
                        <td>{usageData?.scan_count ?? "—"}</td>
                        <td>{usageData?.monthly_limit?.toLocaleString() ?? "—"}</td>
                        <td>{usageData ? (usageData.active ? "active" : "revoked") : "—"}</td>
                        <td>{apiKeyCreatedAt ?? "just now"}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </>
            ) : (
              <div className="empty-state">
                <div className="empty-icon">
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <circle cx="11" cy="11" r="8" stroke="#009FE3" strokeWidth="1.5"/>
                    <circle cx="11" cy="11" r="3.5" stroke="#009FE3" strokeWidth="1.5"/>
                    <circle cx="11" cy="11" r="1" fill="#009FE3"/>
                  </svg>
                </div>
                <h3>No API key yet</h3>
                <p>Generate a key in Quick start to manage it here and view usage.</p>
              </div>
            )}
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

            {/* STEP 01 — Install SDK */}
            <div className="step">
              <div className="step-num">01</div>
              <div className="step-body">
                <div className="step-header">
                  <div className="step-title">Install the SDK</div>
                  <div className="lang-toggle">
                    {(["ts", "py", "curl"] as Lang[]).map((l) => (
                      <button
                        key={l}
                        className={`lang-btn${activeLang === l ? " active" : ""}`}
                        onClick={() => setActiveLang(l)}
                      >
                        {l === "ts" ? "TypeScript" : l === "py" ? "Python" : "cURL"}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="step-desc">
                  Install the Deeptrack client library and authenticate with your RealAPI key.
                </div>

                {lang.install && (
                  <div className="install-row">
                    {lang.install.map((pill) => (
                      <div key={pill.pm} className="install-pill">
                        <span>
                          <span className="pm">{pill.pm}</span>{" "}
                          <span className="pn">{pill.pkg}</span>
                        </span>
                        <button
                          className={`copy-btn${copied === pill.pkg ? " ok" : ""}`}
                          onClick={() => handleCopy(pill.pkg, `${pill.pm} ${pill.pkg}`)}
                        >
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
                    <button
                      className={`copy-btn${copied === "code-body" ? " ok" : ""}`}
                      onClick={() => handleCopy("code-body", codeBody)}
                    >
                      {copied === "code-body" ? "Copied!" : "Copy"}
                    </button>
                  </div>
                  <pre className="code-body">{codeBody}</pre>
                </div>
              </div>
            </div>

            {/* STEP 02 — Generate Key */}
            <div className="step">
              <div className="step-num">02</div>
              <div className="step-body">
                <div className="step-title" style={{ marginBottom: 4 }}>Generate your API key</div>
                <div className="step-desc">
                  Your key authenticates every RealAPI request. Never expose it in client-side code.
                </div>
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
                  <div style={{ marginTop: 10, color: "var(--red)", fontSize: 12.5 }}>
                    {generateKeyError}
                  </div>
                )}
                {apiKey && (
                  <div style={{ marginTop: 10 }}>
                    <div className="code-block">
                      <div className="code-header">
                        <div className="code-dots"><span /><span /><span /></div>
                        <span className="code-fname" style={{ color: "var(--amber)" }}>
                          New key — copy now, it won't be shown again
                        </span>
                        <button
                          className={`copy-btn${copied === "api-key" ? " ok" : ""}`}
                          onClick={() => handleCopy("api-key", apiKey)}
                        >
                          {copied === "api-key" ? "Copied!" : "Copy"}
                        </button>
                      </div>
                      <div className="code-body" style={{ color: "var(--blue-primary)", fontWeight: 700 }}>
                        {apiKey}
                      </div>
                    </div>
                  </div>
                )}
                <div style={{ marginTop: 14 }}>
                  <div className="endpoint-row">
                    <span>Endpoint:</span>
                    <code>{GOTHAM_ENDPOINT}</code>
                    <button
                      className={`copy-btn${copied === "endpoint" ? " ok" : ""}`}
                      onClick={() => handleCopy("endpoint", GOTHAM_ENDPOINT)}
                    >
                      {copied === "endpoint" ? "Copied!" : "Copy endpoint"}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* STEP 03 — View Scan Results */}
            <div className="step">
              <div className="step-num">03</div>
              <div className="step-body">
                <div className="step-title" style={{ marginBottom: 4 }}>View your scan results</div>
                <div className="step-desc">
                  Once your integration is live, verdicts and confidence scores stream into the
                  Scan results tab in real time.
                </div>
                <div className="empty-state">
                  <div className="empty-icon">
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                      <circle cx="11" cy="11" r="8"   stroke="#009FE3" strokeWidth="1.5"/>
                      <circle cx="11" cy="11" r="3.5" stroke="#009FE3" strokeWidth="1.5"/>
                      <circle cx="11" cy="11" r="1"   fill="#009FE3"/>
                    </svg>
                  </div>
                  <h3>No scans yet</h3>
                  <p>
                    Complete steps 1 &amp; 2 then run your first scan. Results appear here and in the{" "}
                    <a href="#" onClick={(e) => { e.preventDefault(); showTab("results"); }}>
                      Scan results
                    </a>{" "}
                    tab.
                  </p>
                </div>
              </div>
            </div>

            {/* Product Suite */}
            <div className="products-section">
              <div className="products-label">Deeptrack product suite</div>
              <div className="product-grid">
                {PRODUCTS.map((p) => (
                  <div
                    key={p.name}
                    className="product-card"
                    onClick={() => showTab("results")}
                    // TODO: replace showTab("results") with a product-specific route when ready
                  >
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

            {SCANS.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <circle cx="11" cy="11" r="8" stroke="#009FE3" strokeWidth="1.5"/>
                    <circle cx="11" cy="11" r="3.5" stroke="#009FE3" strokeWidth="1.5"/>
                    <circle cx="11" cy="11" r="1" fill="#009FE3"/>
                  </svg>
                </div>
                <h3>No scans yet</h3>
                <p>
                  Complete the Quick start flow and run your first scan. Results will appear here once your integration sends a request to RealAPI.
                </p>
              </div>
            ) : (
              <>
                <div className="stat-grid">
                  <div className="stat-card"><div className="stat-label">Total scans</div><div className="stat-value blue">{SCANS.length.toLocaleString()}</div><div className="stat-sub">Last 30 days</div></div>
                  <div className="stat-card"><div className="stat-label">Authentic</div><div className="stat-value green">{SCANS.filter((scan) => scan.verdict === "authentic").length.toLocaleString()}</div><div className="stat-sub">of scans</div></div>
                  <div className="stat-card"><div className="stat-label">Manipulated</div><div className="stat-value red">{SCANS.filter((scan) => scan.verdict === "manipulated").length.toLocaleString()}</div><div className="stat-sub">of scans</div></div>
                  <div className="stat-card"><div className="stat-label">Uncertain</div><div className="stat-value amber">{SCANS.filter((scan) => scan.verdict === "uncertain").length.toLocaleString()}</div><div className="stat-sub">of scans</div></div>
                </div>

                <div className="table-wrap">
                  <div className="table-head-bar">
                    <strong>Recent scans</strong>
                    <span>Showing {SCANS.length} of {SCANS.length}</span>
                  </div>
                  <table>
                    <thead>
                      <tr>
                        <th>File</th><th>Type</th><th>Product</th>
                        <th>Verdict</th><th>Confidence</th><th>Time</th>
                      </tr>
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
                                <div className="conf-bg">
                                  <div className={`conf-fill${fillCls}`} style={{ width: `${Math.round(s.conf * 100)}%` }} />
                                </div>
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
              </>
            )}
          </div>
        )}

        {/* ── USAGE TAB ── */}
        {activeTab === "usage" && (
          <div className="tab-panel active fade-up">
            <div className="page-tag">RealAPI · Usage</div>
            <h1 className="page-title" style={{ marginBottom: 20 }}>Usage &amp; limits</h1>

            {usageError && (
              <div style={{ marginBottom: 16, color: "var(--red)", fontSize: 13 }}>
                {usageError}
              </div>
            )}

            {!apiKey ? (
              <div className="empty-state">
                <div className="empty-icon">
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <circle cx="11" cy="11" r="8" stroke="#009FE3" strokeWidth="1.5"/>
                    <circle cx="11" cy="11" r="3.5" stroke="#009FE3" strokeWidth="1.5"/>
                    <circle cx="11" cy="11" r="1" fill="#009FE3"/>
                  </svg>
                </div>
                <h3>No API key connected</h3>
                <p>Generate a key in the Quick start tab to view usage and limits.</p>
              </div>
            ) : (
              <>
                <div className="stat-grid" style={{ gridTemplateColumns: "repeat(3, minmax(0, 1fr))" }}>
                  <div className="stat-card"><div className="stat-label">Scans used</div><div className="stat-value blue">{usageData?.scan_count ?? "—"}</div><div className="stat-sub">of {usageData?.monthly_limit?.toLocaleString() ?? "—"} this month</div></div>
                  <div className="stat-card"><div className="stat-label">Remaining</div><div className="stat-value green">{usageData ? Math.max(0, (usageData.monthly_limit ?? 0) - (usageData.scan_count ?? 0)).toLocaleString() : "—"}</div><div className="stat-sub">Resets monthly</div></div>
                  <div className="stat-card"><div className="stat-label">Status</div><div className={`stat-value ${usageData?.active ? "green" : "red"}`}>{usageData ? (usageData.active ? "Active" : "Revoked") : "—"}</div><div className="stat-sub">API key status</div></div>
                </div>

                <div className="table-wrap" style={{ marginTop: 0 }}>
                  <div className="table-head-bar">
                    <strong>Current key</strong>
                    <span>Usage details</span>
                  </div>
                  <table>
                    <thead>
                      <tr><th>Key</th><th>Plan</th><th>Monthly limit</th><th>Used</th><th>Status</th></tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><span className="scan-fname">{currentKeyPreview}</span></td>
                        <td>{usageData?.plan ?? "basic"}</td>
                        <td>{usageData?.monthly_limit?.toLocaleString() ?? "—"}</td>
                        <td>{usageData?.scan_count ?? "—"}</td>
                        <td>{usageData ? (usageData.active ? "active" : "revoked") : "—"}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </>
            )}
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
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<DemoUser>({ name: "Developer" });

  return (
    <>
      {/* All design tokens + component styles from v3 HTML - do not hardcode hex values in new code */}
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
          --code-kw:       #6366F1;
          --code-str:      #C2410C;
          --code-fn:       #0077B6;
          --code-cm:       #9CA3AF;
          --code-num:      #B45309;
          --sans: 'Space Grotesk', sans-serif;
          --mono: 'Space Mono', monospace;
        }

        html, body { height: 100%; }
        body { font-family: var(--sans); background: var(--bg); color: var(--text-1); line-height: 1.5; -webkit-font-smoothing: antialiased; }

        /* AUTH GATE */
        #auth-gate { min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 24px; background: var(--bg); position: relative; overflow: hidden; }
        #auth-gate::before { content: ''; position: absolute; inset: 0; background-image: radial-gradient(circle, var(--border-mid) 1px, transparent 1px); background-size: 28px 28px; opacity: 0.6; pointer-events: none; }
        #auth-gate::after  { content: ''; position: absolute; top: 30%; left: 50%; transform: translate(-50%,-50%); width: 700px; height: 500px; background: radial-gradient(ellipse, #009FE320 0%, transparent 65%); pointer-events: none; }
        .auth-card { position: relative; z-index: 1; background: var(--surface); border: 1px solid var(--border); border-radius: 16px; padding: 44px 48px; width: 100%; max-width: 440px; box-shadow: 0 4px 24px rgba(0,159,227,0.08), 0 1px 4px rgba(0,0,0,0.06); text-align: center; }
        .auth-logo-wrap { display: flex; align-items: center; justify-content: center; margin-bottom: 32px; }
        .auth-logo-img { max-width: 220px; width: 100%; height: auto; }
        .sidebar-logo-img { height: 24px; width: auto; display: block; }
        .auth-headline { font-size: 22px; font-weight: 700; color: var(--text-1); letter-spacing: -0.4px; margin-bottom: 8px; }
        .auth-sub { font-size: 14px; color: var(--text-2); line-height: 1.65; margin-bottom: 32px; }
        .auth-sub a { color: var(--blue-primary); text-decoration: none; font-weight: 500; }
        .auth-sub a:hover { text-decoration: underline; }
        .auth-btn { width: 100%; display: flex; align-items: center; justify-content: center; gap: 10px; padding: 13px 20px; border-radius: 10px; font-size: 14px; font-weight: 600; font-family: var(--sans); cursor: pointer; transition: all 0.15s; margin-bottom: 10px; letter-spacing: -0.1px; }
        .auth-btn:active { transform: scale(0.98); }
        .auth-btn-google { background: var(--surface); color: var(--text-1); border: 1.5px solid var(--border-mid); }
        .auth-btn-google:hover { background: var(--surface-2); border-color: var(--blue-primary); }
        .auth-btn-auth0  { background: var(--blue-primary); color: #fff; border: 1.5px solid var(--blue-primary); }
        .auth-btn-auth0:hover { background: var(--blue-deep); border-color: var(--blue-deep); }
        .auth-divider { display: flex; align-items: center; gap: 12px; margin: 6px 0 16px; }
        .auth-divider span { flex: 1; height: 1px; background: var(--border); }
        .auth-divider em { font-style: normal; font-size: 12px; color: var(--text-3); }
        .auth-loading { display: none; flex-direction: column; align-items: center; gap: 12px; padding: 8px 0; font-size: 13px; color: var(--text-2); }
        .spinner { width: 20px; height: 20px; border: 2px solid var(--border-mid); border-top-color: var(--blue-primary); border-radius: 50%; animation: spin 0.7s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .auth-terms { font-size: 11.5px; color: var(--text-3); margin-top: 20px; line-height: 1.6; }
        .auth-terms a { color: var(--text-2); text-decoration: underline; }
        .auth-back { margin-top: 16px; font-size: 13px; }
        .auth-back a { color: var(--text-2); text-decoration: none; display: inline-flex; align-items: center; gap: 5px; }
        .auth-back a:hover { color: var(--blue-primary); }

        /* APP SHELL */
        #app { display: none; min-height: 100vh; }
        #app.visible { display: flex; }

        /* SIDEBAR */
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
        .nav-badge { margin-left: auto; font-size: 10px; font-weight: 500; background: var(--surface-2); color: var(--text-3); padding: 2px 7px; border-radius: 20px; border: 1px solid var(--border); }
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

        /* MAIN */
        .main { flex: 1; padding: 44px 52px; max-width: 880px; }
        .page-tag { font-size: 11px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--blue-primary); margin-bottom: 6px; }
        .page-title { font-size: 26px; font-weight: 700; letter-spacing: -0.5px; color: var(--text-1); margin-bottom: 6px; }
        .page-desc { font-size: 14px; color: var(--text-2); line-height: 1.65; max-width: 540px; margin-bottom: 28px; font-weight: 400; }

        /* TABS */
        .tabs { display: flex; border-bottom: 1.5px solid var(--border); margin-bottom: 32px; }
        .tab-btn { padding: 10px 18px; font-size: 13.5px; font-weight: 500; color: var(--text-3); background: none; border: none; border-bottom: 2.5px solid transparent; margin-bottom: -1.5px; cursor: pointer; font-family: var(--sans); transition: all 0.12s; }
        .tab-btn:hover { color: var(--text-1); }
        .tab-btn.active { color: var(--blue-primary); border-bottom-color: var(--blue-primary); font-weight: 600; }
        .tab-panel { display: none; }
        .tab-panel.active { display: block; }

        /* ALERT */
        .alert { background: var(--blue-pale); border: 1px solid var(--blue-pale2); border-left: 3px solid var(--blue-primary); border-radius: 10px; padding: 14px 18px; display: flex; align-items: center; gap: 13px; margin-bottom: 32px; font-size: 13.5px; color: var(--text-2); line-height: 1.55; }
        .alert-icon { width: 32px; height: 32px; background: var(--blue-pale2); border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .alert a { color: var(--blue-primary); text-decoration: none; font-weight: 600; }
        .alert a:hover { text-decoration: underline; }
        .alert strong { color: var(--text-1); }

        /* STEPS */
        .step { display: flex; gap: 20px; margin-bottom: 30px; }
        .step-num { width: 34px; height: 34px; border-radius: 8px; background: var(--blue-pale); border: 1.5px solid var(--blue-pale2); display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; color: var(--blue-primary); flex-shrink: 0; margin-top: 1px; font-family: var(--mono); }
        .step-body { flex: 1; }
        .step-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; margin-bottom: 4px; flex-wrap: wrap; }
        .step-title { font-size: 15px; font-weight: 700; color: var(--text-1); }
        .step-desc { font-size: 13.5px; color: var(--text-2); line-height: 1.6; margin-bottom: 14px; font-weight: 400; }

        /* LANG TOGGLE */
        .lang-toggle { display: flex; gap: 2px; background: var(--surface-2); border: 1px solid var(--border); border-radius: 8px; padding: 3px; flex-shrink: 0; }
        .lang-btn { font-size: 11.5px; font-weight: 500; padding: 4px 11px; border-radius: 6px; border: none; background: transparent; color: var(--text-3); cursor: pointer; font-family: var(--sans); transition: all 0.12s; }
        .lang-btn.active { background: var(--surface); color: var(--text-1); font-weight: 600; box-shadow: 0 1px 3px rgba(0,0,0,0.08); }

        /* CODE BLOCK */
        .code-block { background: var(--code-bg); border: 1px solid var(--border); border-radius: 10px; overflow: hidden; margin-bottom: 10px; }
        .code-header { background: var(--surface); border-bottom: 1px solid var(--border); padding: 9px 14px; display: flex; align-items: center; gap: 8px; }
        .code-dots { display: flex; gap: 5px; }
        .code-dots span { width: 9px; height: 9px; border-radius: 50%; background: var(--border); }
        .code-fname { font-size: 11.5px; color: var(--text-3); font-family: var(--mono); flex: 1; margin-left: 4px; }
        .copy-btn { font-size: 11.5px; font-weight: 500; padding: 3px 11px; border-radius: 6px; border: 1px solid var(--border); background: var(--surface); color: var(--text-2); cursor: pointer; font-family: var(--sans); transition: all 0.12s; }
        .copy-btn:hover { border-color: var(--blue-primary); color: var(--blue-primary); }
        .copy-btn.ok { color: var(--green); border-color: #A7F3D0; }
        .code-body { padding: 16px 18px; font-size: 12.5px; font-family: var(--mono); line-height: 1.8; overflow-x: auto; white-space: pre; color: #374151; margin: 0; }
        .endpoint-row { display: flex; gap: 10px; align-items: center; flex-wrap: wrap; margin-top: 12px; }
        .endpoint-row span { font-size: 12.5px; color: var(--text-3); font-weight: 600; }
        .endpoint-row code { background: var(--code-bg); border: 1px solid var(--border); border-radius: 8px; padding: 8px 10px; font-size: 12px; color: var(--text-1); }

        /* INSTALL ROW */
        .install-row { display: flex; gap: 8px; margin-bottom: 10px; flex-wrap: wrap; }
        .install-pill { flex: 1; min-width: 200px; background: var(--code-bg); border: 1px solid var(--border); border-radius: 10px; padding: 10px 14px; display: flex; align-items: center; justify-content: space-between; font-family: var(--mono); font-size: 12.5px; color: var(--text-2); }
        .install-pill .pm { color: var(--text-3); margin-right: 6px; }
        .install-pill .pn { color: var(--blue-primary); font-weight: 700; }

        /* API KEY CARD */
        .api-key-card { background: var(--surface); border: 1px solid var(--border); border-radius: 10px; padding: 18px 20px; display: flex; align-items: center; justify-content: space-between; gap: 20px; flex-wrap: wrap; }
        .api-key-card strong { font-size: 14px; font-weight: 700; color: var(--text-1); display: block; margin-bottom: 3px; }
        .api-key-card p { font-size: 13px; color: var(--text-2); line-height: 1.5; }
        .generate-btn { display: inline-flex; align-items: center; gap: 8px; background: var(--blue-primary); color: #fff; font-size: 13.5px; font-weight: 700; padding: 10px 20px; border-radius: 9px; border: none; cursor: pointer; font-family: var(--sans); transition: all 0.15s; white-space: nowrap; }
        .generate-btn:hover { background: var(--blue-deep); }
        .generate-btn:active { transform: scale(0.98); }

        /* STATS */
        .stat-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 10px; margin-bottom: 22px; }
        .stat-card { background: var(--surface); border: 1px solid var(--border); border-radius: 10px; padding: 16px; }
        .stat-label { font-size: 11px; font-weight: 600; letter-spacing: 0.07em; text-transform: uppercase; color: var(--text-3); margin-bottom: 6px; }
        .stat-value { font-size: 28px; font-weight: 700; color: var(--text-1); line-height: 1; letter-spacing: -1px; }
        .stat-value.blue  { color: var(--blue-primary); }
        .stat-value.green { color: var(--green); }
        .stat-value.red   { color: var(--red); }
        .stat-value.amber { color: var(--amber); }
        .stat-sub { font-size: 11.5px; color: var(--text-3); margin-top: 5px; }

        /* TABLE */
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

        /* EMPTY STATE */
        .empty-state { background: var(--surface); border: 1px solid var(--border); border-radius: 10px; padding: 48px 24px; text-align: center; }
        .empty-icon { width: 48px; height: 48px; border-radius: 12px; background: var(--blue-pale); border: 1.5px solid var(--blue-pale2); display: flex; align-items: center; justify-content: center; margin: 0 auto 14px; }
        .empty-state h3 { font-size: 15px; font-weight: 700; color: var(--text-1); margin-bottom: 6px; }
        .empty-state p  { font-size: 13.5px; color: var(--text-2); line-height: 1.65; max-width: 360px; margin: 0 auto; }
        .empty-state a  { color: var(--blue-primary); text-decoration: none; font-weight: 600; }

        /* PRODUCTS */
        .products-section { margin-top: 36px; padding-top: 26px; border-top: 1px solid var(--border); }
        .products-label { font-size: 11px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-3); margin-bottom: 12px; }
        .product-grid { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 8px; }
        .product-card { background: var(--surface); border: 1px solid var(--border); border-radius: 10px; padding: 14px; cursor: pointer; transition: all 0.14s; }
        .product-card:hover { border-color: var(--blue-primary); background: var(--blue-pale); transform: translateY(-1px); }
        .product-icon { width: 28px; height: 28px; border-radius: 6px; background: var(--surface-2); border: 1px solid var(--border); display: flex; align-items: center; justify-content: center; margin-bottom: 10px; }
        .product-name { font-size: 12.5px; font-weight: 700; color: var(--text-1); margin-bottom: 2px; }
        .product-desc { font-size: 10.5px; color: var(--text-3); line-height: 1.4; }

        /* UTILS */
        ::-webkit-scrollbar { width: 5px; height: 5px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: var(--border-mid); border-radius: 3px; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .fade-up { animation: fadeUp 0.35s ease both; }
      `}</style>

      {!isSignedIn && <AuthGate onSignIn={(user) => { setCurrentUser(user); setIsSignedIn(true); }} />}
      {isSignedIn  && <AppShell userName={currentUser.name} onSignOut={() => setIsSignedIn(false)} />}
    </>
  );
}