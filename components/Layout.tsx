
import React from 'react';
import { 
  LayoutDashboard, 
  Car, 
  Users, 
  Calendar, 
  ShieldCheck, 
  FileText, 
  Settings, 
  Globe,
  Bell,
  LogOut,
  ChevronRight
} from 'lucide-react';
import { TRANSLATIONS } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  lang: 'pt' | 'es';
  setLang: (lang: 'pt' | 'es') => void;
  darkMode?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab, lang, setLang, darkMode }) => {
  const t = (key: string) => TRANSLATIONS[key]?.[lang] || key;

  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: t('dashboard') },
    { id: 'operations', icon: Calendar, label: t('operations') },
    { id: 'fleet', icon: Car, label: t('fleet') },
    { id: 'team', icon: Users, label: t('team') },
    { id: 'audit', icon: ShieldCheck, label: t('audit') },
    { id: 'reports', icon: FileText, label: t('reports') },
    { id: 'settings', icon: Settings, label: t('settings') },
  ];

  return (
    <div className={`flex h-screen overflow-hidden font-sans ${darkMode ? 'dark' : ''}`}>
      {/* Sidebar */}
      <aside className="w-64 bg-primary text-offwhite flex-shrink-0 flex flex-col shadow-2xl z-20">
        <div className="p-6 border-b border-white/10 flex items-center gap-3">
          <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
            <ShieldCheck className="text-primary w-7 h-7" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white leading-tight">EXEC PRO</h1>
            <p className="text-[10px] text-accent/80 uppercase tracking-widest font-semibold">Security Transport</p>
          </div>
        </div>

        <nav className="flex-1 mt-6 space-y-1 px-3">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                activeTab === item.id 
                  ? 'bg-accent text-primary font-bold shadow-lg' 
                  : 'text-offwhite/70 hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon className={`w-5 h-5 ${activeTab === item.id ? 'text-primary' : 'group-hover:scale-110 transition-transform'}`} />
              <span className="text-sm">{item.label}</span>
              {activeTab === item.id && <ChevronRight className="ml-auto w-4 h-4" />}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10 space-y-4">
          <div className="flex items-center gap-3 p-2 rounded-xl bg-white/5">
            <div className="w-8 h-8 rounded-full bg-bronze flex items-center justify-center text-xs font-bold">JD</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">John Doe</p>
              <p className="text-[10px] text-offwhite/50 uppercase tracking-wider">Super Admin</p>
            </div>
            <button className="text-offwhite/40 hover:text-white transition-colors">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col bg-offwhite dark:bg-charcoal relative overflow-hidden transition-colors duration-300">
        {/* Top Header */}
        <header className="h-20 bg-white dark:bg-slate border-b border-slate/10 dark:border-white/5 flex items-center justify-between px-8 z-10 transition-colors duration-300">
          <div className="flex items-center gap-6">
            <div className="flex bg-slate/5 dark:bg-white/5 p-1 rounded-lg">
              <button 
                onClick={() => setLang('pt')}
                className={`px-3 py-1 text-xs rounded transition-all font-semibold ${lang === 'pt' ? 'bg-white dark:bg-primary text-primary dark:text-white shadow-sm' : 'text-slate/60 dark:text-offwhite/40 hover:text-slate'}`}
              >
                PT
              </button>
              <button 
                onClick={() => setLang('es')}
                className={`px-3 py-1 text-xs rounded transition-all font-semibold ${lang === 'es' ? 'bg-white dark:bg-primary text-primary dark:text-white shadow-sm' : 'text-slate/60 dark:text-offwhite/40 hover:text-slate'}`}
              >
                ES
              </button>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-sm font-medium text-slate dark:text-offwhite/60">
              <Globe className="w-4 h-4" />
              <span>GMT -03:00 (Brasília)</span>
            </div>
            <button className="relative p-2 text-slate dark:text-offwhite hover:bg-slate/5 rounded-full transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-charcoal"></span>
            </button>
            <div className="h-8 w-[1px] bg-slate/10 dark:bg-white/10"></div>
            <button className="flex items-center gap-2 px-4 py-2 bg-primary dark:bg-accent text-offwhite dark:text-primary rounded-lg text-sm font-semibold hover:opacity-90 active:scale-95 transition-all shadow-md">
              <img src="https://flagcdn.com/w20/br.png" className="rounded-sm" alt="Sync" />
              <span>Outlook Sync</span>
            </button>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <section className="flex-1 overflow-y-auto p-8 bg-offwhite/50 dark:bg-charcoal/50">
          <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {children}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Layout;
