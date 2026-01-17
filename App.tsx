
import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Operations from './components/Operations';
import AuditLogView from './components/AuditLogView';
import Reports from './components/Reports';
import { Info } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [lang, setLang] = useState<'pt' | 'es'>('pt');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'operations':
        return <Operations lang={lang} />;
      case 'audit':
        return <AuditLogView />;
      case 'reports':
        return <Reports lang={lang} />;
      case 'fleet':
      case 'team':
      case 'settings':
        return (
          <div className="flex flex-col items-center justify-center min-h-[50vh] text-center space-y-4">
             <div className="p-6 bg-accent/20 rounded-3xl">
                <Info className="w-12 h-12 text-bronze" />
             </div>
             <div>
                <h3 className="text-2xl font-bold text-primary">Módulo em Desenvolvimento</h3>
                <p className="text-slate/60 max-w-md">Esta seção está sendo finalizada pela nossa equipe de engenharia para atender aos padrões Pinkerton de segurança.</p>
             </div>
             <button onClick={() => setActiveTab('dashboard')} className="px-8 py-3 bg-primary text-offwhite rounded-xl font-bold shadow-lg hover:opacity-90 transition-all">
                Voltar ao Dashboard
             </button>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout 
      activeTab={activeTab} 
      setActiveTab={setActiveTab} 
      lang={lang} 
      setLang={setLang}
    >
      {renderContent()}
    </Layout>
  );
};

export default App;
