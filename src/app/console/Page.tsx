'use client';

import { useState } from 'react';
import AuthGate from '@/components/console/AuthGate';
import Sidebar from '@/components/console/Sidebar';
import SetupTab from '@/components/console/SetupTab';
import ResultsTab from '@/components/console/ResultsTab';
import UsageTab from '@/components/console/UsageTab';
import { TabId, User } from '@/lib/console-data';
import './console.css';
import './console-classes.css';

export default function ConsolePage() {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<TabId>('setup');

  if (!user) {
    return <AuthGate onLogin={setUser} />;
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg)' }}>
      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        user={user}
        onLogout={() => setUser(null)}
      />
      <main className="main">
        {/* Tab bar */}
        <div className="tabs">
          {(['setup', 'results', 'usage'] as TabId[]).map((t) => (
            <button
              key={t}
              className={`tab-btn ${activeTab === t ? 'active' : ''}`}
              onClick={() => setActiveTab(t)}
            >
              {{ setup: 'Setup', results: 'Scan results', usage: 'Usage & limits' }[t]}
            </button>
          ))}
        </div>

        {/* Tab panels */}
        {activeTab === 'setup'   && <SetupTab />}
        {activeTab === 'results' && <ResultsTab />}
        {activeTab === 'usage'   && <UsageTab />}
      </main>
    </div>
  );
}