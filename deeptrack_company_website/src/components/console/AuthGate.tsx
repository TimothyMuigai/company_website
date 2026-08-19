'use client';

import { User } from '@/lib/console-data';

interface AuthGateProps {
  onLogin: (user: User) => void;
}

const DEMO_USER: User = { name: 'Brian Koyundi', email: 'brian@deeptrack.io', picture: null };

export default function AuthGate({ onLogin }: AuthGateProps) {
  function handleGoogle() {
    // Replace with real Auth0 SDK call: auth0Client.loginWithRedirect({ authorizationParams: { connection: 'google-oauth2' } })
    setTimeout(() => onLogin(DEMO_USER), 1000);
  }

  function handleAuth0() {
    // Replace with real Auth0 SDK call: auth0Client.loginWithRedirect()
    setTimeout(() => onLogin(DEMO_USER), 1000);
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      background: 'var(--bg)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Grid background */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
        backgroundSize: '48px 48px',
        opacity: 0.35,
        pointerEvents: 'none',
      }} />
      {/* Radial glow */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -60%)',
        width: 600, height: 600,
        background: 'radial-gradient(circle, #00d68f0a 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        position: 'relative', zIndex: 1,
        background: 'var(--surface)',
        border: '1px solid var(--border-mid)',
        borderRadius: 16,
        padding: '40px 44px',
        width: '100%', maxWidth: 420,
        textAlign: 'center',
        animation: 'fadeIn 0.35s ease both',
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 28 }}>
          <div style={{
            width: 34, height: 34,
            background: 'var(--text-1)',
            borderRadius: 8,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="9" cy="9" r="6.5" stroke="#0b0c0f" strokeWidth="2" />
              <circle cx="9" cy="9" r="2.5" fill="#0b0c0f" />
            </svg>
          </div>
          <span style={{ fontSize: 18, fontWeight: 600, color: 'var(--text-1)', letterSpacing: '-0.3px' }}>Deeptrack</span>
        </div>

        <h1 style={{ fontSize: 22, fontWeight: 600, color: 'var(--text-1)', letterSpacing: '-0.4px', marginBottom: 8 }}>
          Sign in to RealAPI Console
        </h1>
        <p style={{ fontSize: 13.5, color: 'var(--text-2)', lineHeight: 1.6, marginBottom: 32 }}>
          Access your developer dashboard, generate API keys, and monitor your deepfake detection scans.<br /><br />
          Don&apos;t have an account?{' '}
          <a href="https://www.deeptrack.io/contact" style={{ color: 'var(--accent-text)', textDecoration: 'none' }}>Talk to us →</a>
        </p>

        {/* Google */}
        <button onClick={handleGoogle} style={btnStyle('google')}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z" fill="#4285F4"/>
            <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z" fill="#34A853"/>
            <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z" fill="#FBBC05"/>
            <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58Z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </button>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '20px 0' }}>
          <span style={{ flex: 1, height: 1, background: 'var(--border)' }} />
          <em style={{ fontStyle: 'normal', fontSize: 12, color: 'var(--text-3)' }}>or</em>
          <span style={{ flex: 1, height: 1, background: 'var(--border)' }} />
        </div>

        {/* Auth0 */}
        <button onClick={handleAuth0} style={btnStyle('auth0')}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M9 1.5L14.5 5.1V9C14.5 12.1 12.1 14.9 9 15.9C5.9 14.9 3.5 12.1 3.5 9V5.1L9 1.5Z" stroke="#00d68f" strokeWidth="1.4" strokeLinejoin="round"/>
            <circle cx="9" cy="9" r="2" fill="#00d68f"/>
          </svg>
          Continue with Auth0 SSO
        </button>

        <p style={{ fontSize: 11.5, color: 'var(--text-3)', marginTop: 20, lineHeight: 1.5 }}>
          By signing in you agree to Deeptrack&apos;s{' '}
          <a href="https://docs.google.com/document/d/1jSyNPxKrabOBlZxi8kf0eRsjsAyo6G5vFCLDhY6ockE/edit?tab=t.0" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-2)', textDecoration: 'underline' }}>Terms of Service</a>
          {' '}and{' '}
          <a href="https://app.eu.vanta.com/deeptrack.io/trust/ykzpe8x33wwv9mki8rjv61" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-2)', textDecoration: 'underline' }}>Privacy Policy</a>.
        </p>

        <div style={{ marginTop: 20, fontSize: 13 }}>
          <a href="https://www.deeptrack.io/productApi" style={{ color: 'var(--text-2)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 5 }}>
            ← Back to RealAPI
          </a>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        button:active { transform: scale(0.98) !important; }
      `}</style>
    </div>
  );
}

function btnStyle(variant: 'google' | 'auth0'): React.CSSProperties {
  return {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    padding: '12px 20px',
    borderRadius: 9,
    fontSize: 14,
    fontWeight: 500,
    fontFamily: 'var(--sans)',
    cursor: 'pointer',
    transition: 'all 0.15s',
    border: '1px solid var(--border-mid)',
    marginBottom: 10,
    letterSpacing: '-0.1px',
    background: variant === 'auth0' ? 'var(--accent-dim)' : 'var(--surface-2)',
    color: variant === 'auth0' ? 'var(--accent)' : 'var(--text-1)',
    borderColor: variant === 'auth0' ? 'var(--accent-mid)' : 'var(--border-mid)',
  };
}