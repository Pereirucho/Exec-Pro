
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Operations from './components/Operations';
import AuditLogView from './components/AuditLogView';
import Reports from './components/Reports';
import Fleet from './components/Fleet';
import Team from './components/Team';
import SettingsPage from './components/Settings';
import { AppSettings } from './types';

const defaultSettings: AppSettings = {
  lang: 'pt',
  darkMode: false,
  piiTimeout: 10,
  outlookSync: true,
  dashboard: {
    showMetrics: true,
    showVolatility: true,
    showAgenda: true,
    activeMetrics: ['cases', 'revenue', 'drivers', 'alerts']
  }
};

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [settings, setSettings] = useState<AppSettings>(() => {
    const saved = localStorage.getItem('exec_pro_settings');
    return saved ? JSON.parse(saved) : defaultSettings;
  });

  useEffect(() => {
    localStorage.setItem('exec_pro_settings', JSON.stringify(settings));
    // Apply dark mode to document
    if (settings.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings]);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard settings={settings} />;
      case 'operations':
        return <Operations lang={settings.lang} />;
      case 'fleet':
        return <Fleet />;
      case 'team':
        return <Team />;
      case 'audit':
        return <AuditLogView />;
      case 'reports':
        return <Reports lang={settings.lang} />;
      case 'settings':
        return <SettingsPage settings={settings} setSettings={setSettings} />;
      default:
        return <Dashboard settings={settings} />;
    }
  };

  return (
    <Layout 
      activeTab={activeTab} 
      setActiveTab={setActiveTab} 
      lang={settings.lang} 
      setLang={(l) => setSettings({...settings, lang: l})}
      darkMode={settings.darkMode}
    >
      {renderContent()}
    </Layout>
  );
};

export default App;
