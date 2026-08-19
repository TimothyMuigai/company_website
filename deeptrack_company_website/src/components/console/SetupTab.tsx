'use client';

import { useState } from 'react';
import { Lang, CODE_SNIPPETS } from '@/lib/console-data';

export default function SetupTab() {
  const [lang, setLang] = useState<Lang>('ts');
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [codeCopied, setCodeCopied] = useState(false);

  const snippet = CODE_SNIPPETS[lang];

  function generateKey() {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const rand = Array.from({ length: 32 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    const key = 'dt_live_sk_' + rand;
    setApiKey(key);
    sessionStorage.setItem('dt_api_key', key);
  }

  function copy(text: string, setter: (v: boolean) => void) {
    navigator.clipboard.writeText(text).then(() => {
      setter(true);
      setTimeout(() => setter(false), 1500);
    });
  }

  const products = [
    { name: 'Sentinel', desc: 'AI-powered KYC / KYB', icon: <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M7 1L12 4v4c0 2.5-2.5 4-5 5C4.5 12 2 10.5 2 8V4L7 1Z" stroke="#8b90a0" strokeWidth="1.2"/></svg> },
    { name: 'Atlas',    desc: 'News fact-checking',    icon: <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.5" stroke="#8b90a0" strokeWidth="1.2"/><circle cx="7" cy="7" r="2" stroke="#8b90a0" strokeWidth="1.2"/></svg> },
    { name: 'Foundry',  desc: 'Insurance fraud detection', icon: <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M7 2L11 5v7H3V5L7 2Z" stroke="#8b90a0" strokeWidth="1.2"/></svg> },
    { name: 'Gotham',   desc: 'Enterprise deepfake API',   icon: <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M2 11L7 2l5 9H2Z" stroke="#8b90a0" strokeWidth="1.2"/></svg> },
    { name: 'Mirror',   desc: 'Identity protection',   icon: <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M7 1C7 1 3 4 3 7.5a4 4 0 008 0C11 4 7 1 7 1Z" stroke="#8b90a0" strokeWidth="1.2"/></svg> },
  ];

  return (
    <div>
      <div className="page-tag">RealAPI · Developer Console</div>
      <h1 className="page-title">Welcome to RealAPI</h1>
      <p className="page-desc">
        Integrate enterprise-grade deepfake detection into any app or platform. Detect manipulated images, audio, and video at scale — in minutes.
      </p>

      {/* Alert */}
      <div className="alert">
        <div className="alert-icon">
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
            <path d="M7.5 1.5L13.5 12H1.5L7.5 1.5Z" stroke="#00d68f" strokeWidth="1.3" strokeLinejoin="round"/>
            <path d="M7.5 6v3" stroke="#00d68f" strokeWidth="1.3" strokeLinecap="round"/>
            <circle cx="7.5" cy="10.5" r="0.7" fill="#00d68f"/>
          </svg>
        </div>
        <div>
          <strong>Need higher volumes, real-time streams, or custom modalities?</strong> Your Enterprise plan includes priority support and dedicated infrastructure.{' '}
          <a href="https://www.deeptrack.io/contact">Talk to sales →</a>
        </div>
      </div>

      {/* STEP 1 */}
      <div className="step">
        <div className="step-num">01</div>
        <div className="step-body">
          <div className="step-header">
            <div className="step-title">Install the SDK</div>
            <div className="lang-toggle">
              {(['ts', 'py', 'curl'] as Lang[]).map((l) => (
                <button key={l} className={`lang-btn ${lang === l ? 'active' : ''}`} onClick={() => setLang(l)}>
                  {{ ts: 'TypeScript', py: 'Python', curl: 'cURL' }[l]}
                </button>
              ))}
            </div>
          </div>
          <div className="step-desc">Install the Deeptrack client and authenticate with your RealAPI key.</div>

          {/* Install pills */}
          {snippet.install && (
            <div className="install-row">
              {snippet.install.map(({ pm, pkg }) => (
                <div key={pkg} className="install-pill">
                  <span><span className="pm">{pm}</span> <span className="pn">{pkg}</span></span>
                  <button className="copy-btn" onClick={() => copy(`${pm} ${pkg}`, () => {})}>Copy</button>
                </div>
              ))}
            </div>
          )}

          {/* Code block */}
          <div className="code-block">
            <div className="code-header">
              <div className="code-dots"><span /><span /><span /></div>
              <span className="code-fname">{snippet.fname}</span>
              <button
                className={`copy-btn ${codeCopied ? 'ok' : ''}`}
                onClick={() => copy(snippet.body, setCodeCopied)}
              >
                {codeCopied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <pre className="code-body" style={{ whiteSpace: 'pre', overflowX: 'auto' }}>
              {snippet.body}
            </pre>
          </div>
        </div>
      </div>

      {/* STEP 2 */}
      <div className="step">
        <div className="step-num">02</div>
        <div className="step-body">
          <div className="step-title" style={{ marginBottom: 4 }}>Generate your API key</div>
          <div className="step-desc">Your key authenticates every RealAPI request. Keep it secret — never expose it in client-side code.</div>
          <div className="api-key-card">
            <div>
              <strong>Production key</strong>
              <p>Scoped to all products on your plan. Rotate anytime without downtime.</p>
            </div>
            <button className="generate-btn" onClick={generateKey}>
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <circle cx="5" cy="5.5" r="3.5" stroke="#050e09" strokeWidth="1.2"/>
                <path d="M7.5 8L10.5 11" stroke="#050e09" strokeWidth="1.2" strokeLinecap="round"/>
                <path d="M5 4.5v2M4 5.5h2" stroke="#050e09" strokeWidth="1.1" strokeLinecap="round"/>
              </svg>
              Generate key
            </button>
          </div>
          {apiKey && (
            <div style={{ marginTop: 10 }}>
              <div className="code-block">
                <div className="code-header">
                  <div className="code-dots"><span /><span /><span /></div>
                  <span className="code-fname" style={{ color: '#f0a060' }}>New key — copy now, it won&apos;t be shown again</span>
                  <button
                    className={`copy-btn ${copied ? 'ok' : ''}`}
                    onClick={() => copy(apiKey, setCopied)}
                  >
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <div className="code-body" style={{ color: 'var(--accent)', fontWeight: 500 }}>{apiKey}</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* STEP 3 */}
      <div className="step">
        <div className="step-num">03</div>
        <div className="step-body">
          <div className="step-title" style={{ marginBottom: 4 }}>View scan results</div>
          <div className="step-desc">Once your integration is live, verdicts and confidence scores appear in the Scan results tab in real time.</div>
          <div className="empty-state">
            <div className="empty-icon">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="7.5" stroke="#00d68f" strokeWidth="1.5"/>
                <circle cx="10" cy="10" r="3" stroke="#00d68f" strokeWidth="1.5"/>
                <circle cx="10" cy="10" r="1" fill="#00d68f"/>
              </svg>
            </div>
            <h3>No scans yet</h3>
            <p>Complete steps 1 &amp; 2 then run your first scan. Results appear here and in the Scan results tab.</p>
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="products-section">
        <div className="products-label">Deeptrack product suite</div>
        <div className="product-grid">
          {products.map(({ name, desc, icon }) => (
            <div key={name} className="product-card">
              <div className="product-icon">{icon}</div>
              <div className="product-name">{name}</div>
              <div className="product-desc">{desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}