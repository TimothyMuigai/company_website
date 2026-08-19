'use client';

import Link from 'next/link';
import { TabId, User } from '@/lib/console-data';

interface SidebarProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  user: User;
  onLogout: () => void;
}

const navItems: { tab: TabId; label: string; icon: React.ReactNode }[] = [
  {
    tab: 'setup',
    label: 'Get started',
    icon: <svg className="ni" viewBox="0 0 14 14" fill="none"><rect x="1" y="1" width="5" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.2"/><rect x="8" y="1" width="5" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.2"/><rect x="1" y="8" width="5" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.2"/><rect x="8" y="8" width="5" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.2"/></svg>,
  },
  {
    tab: 'results',
    label: 'Scan results',
    icon: <svg className="ni" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.2"/><circle cx="7" cy="7" r="2" stroke="currentColor" strokeWidth="1.2"/></svg>,
  },
  {
    tab: 'usage',
    label: 'Usage & limits',
    icon: <svg className="ni" viewBox="0 0 14 14" fill="none"><path d="M1 10L4 6l3 2 3-4 3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  },
];

const products = [
  { label: 'Sentinel', badge: 'KYC', icon: <svg className="ni" viewBox="0 0 14 14" fill="none"><path d="M7 1L12 4v4c0 2.5-2.5 4-5 5C4.5 12 2 10.5 2 8V4L7 1Z" stroke="currentColor" strokeWidth="1.2"/></svg> },
  { label: 'Atlas',    badge: 'News', icon: <svg className="ni" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.2"/><circle cx="7" cy="7" r="2" stroke="currentColor" strokeWidth="1.2"/></svg> },
  { label: 'Foundry',  badge: 'Fraud', icon: <svg className="ni" viewBox="0 0 14 14" fill="none"><path d="M7 2L11 5v7H3V5L7 2Z" stroke="currentColor" strokeWidth="1.2"/></svg> },
  { label: 'Gotham',   badge: null, icon: <svg className="ni" viewBox="0 0 14 14" fill="none"><path d="M2 11L7 2l5 9H2Z" stroke="currentColor" strokeWidth="1.2"/></svg> },
  { label: 'Mirror',   badge: null, icon: <svg className="ni" viewBox="0 0 14 14" fill="none"><path d="M7 1C7 1 3 4 3 7.5a4 4 0 008 0C11 4 7 1 7 1Z" stroke="currentColor" strokeWidth="1.2"/></svg> },
];

export default function Sidebar({ activeTab, onTabChange, user, onLogout }: SidebarProps) {
  const initials = user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="logo-area">
        <div className="logo-mark">
          <svg viewBox="0 0 15 15" fill="none">
            <circle cx="7.5" cy="7.5" r="5.5" stroke="black" strokeWidth="1.5"/>
            <circle cx="7.5" cy="7.5" r="2" fill="black"/>
          </svg>
        </div>
        <span className="logo-name">Deeptrack</span>
        <span className="logo-badge">RealAPI</span>
      </div>

      <nav>
        <div className="nav-label">Developer</div>
        {navItems.map(({ tab, label, icon }) => (
          <button
            key={tab}
            className={`nav-item ${activeTab === tab ? 'active' : ''}`}
            onClick={() => onTabChange(tab)}
          >
            {icon}
            {label}
          </button>
        ))}
        <Link className="nav-item" href="https://www.deeptrack.io/docs/introduction" target="_blank" rel="noopener noreferrer">
          <svg className="ni" viewBox="0 0 14 14" fill="none"><path d="M2 4h10M2 7h7M2 10h5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
          API docs ↗
        </Link>

        <div className="nav-label" style={{ marginTop: 8 }}>Products</div>
        {products.map(({ label, badge, icon }) => (
          <button key={label} className="nav-item">
            {icon}
            {label}
            {badge && <span className="nav-badge">{badge}</span>}
          </button>
        ))}

        <div className="nav-label" style={{ marginTop: 8 }}>Account</div>
        <button className="nav-item">
          <svg className="ni" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="4.5" r="2.5" stroke="currentColor" strokeWidth="1.2"/><path d="M2 12c0-2.5 2-4 5-4s5 1.5 5 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
          Team
        </button>
        <button className="nav-item">
          <svg className="ni" viewBox="0 0 14 14" fill="none"><rect x="1.5" y="2.5" width="11" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.2"/><path d="M1.5 5.5h11" stroke="currentColor" strokeWidth="1.2"/></svg>
          Plan &amp; billing
        </button>
        <button className="nav-item">
          <svg className="ni" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.2"/><path d="M7 4.5v3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/><circle cx="7" cy="9.5" r="0.6" fill="currentColor"/></svg>
          Settings
        </button>
      </nav>

      <div className="sidebar-footer">
        <div className="credit-label">
          <strong>720 scans left</strong>
          <span>1,000/mo</span>
        </div>
        <div className="credit-track"><div className="credit-fill" /></div>
        <div className="credit-sub">Renews May 1, 2026 · Enterprise</div>
        <div className="user-row">
          <div className="avatar">{initials}</div>
          <div>
            <div className="user-name">{user.name}</div>
            <div className="user-role">Founder · Deeptrack</div>
          </div>
          <button className="logout-btn" onClick={onLogout} title="Sign out">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M5 2H2.5A1.5 1.5 0 001 3.5v7A1.5 1.5 0 002.5 12H5M9 10l3-3-3-3M13 7H5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </aside>
  );
}