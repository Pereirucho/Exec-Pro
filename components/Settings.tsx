
import React from 'react';
import { 
  Settings, 
  Moon, 
  Sun, 
  Globe, 
  Monitor, 
  Shield, 
  Clock, 
  RefreshCw,
  Eye,
  Layout as LayoutIcon,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { AppSettings } from '../types';

interface SettingsPageProps {
  settings: AppSettings;
  setSettings: React.Dispatch<React.SetStateAction<AppSettings>>;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ settings, setSettings }) => {
  const toggleDarkMode = () => setSettings(prev => ({ ...prev, darkMode: !prev.darkMode }));
  const updateLang = (lang: 'pt' | 'es') => setSettings(prev => ({ ...prev, lang }));
  const toggleOutlook = () => setSettings(prev => ({ ...prev, outlookSync: !prev.outlookSync }));
  
  const toggleDashboardPart = (part: keyof AppSettings['dashboard']) => {
    setSettings(prev => ({
      ...prev,
      dashboard: {
        ...prev.dashboard,
        [part]: !prev.dashboard[part]
      }
    }));
  };

  const toggleMetric = (metric: string) => {
    setSettings(prev => {
      const activeMetrics = prev.dashboard.activeMetrics.includes(metric)
        ? prev.dashboard.activeMetrics.filter(m => m !== metric)
        : [...prev.dashboard.activeMetrics, metric];
      return {
        ...prev,
        dashboard: { ...prev.dashboard, activeMetrics }
      };
    });
  };

  const sectionClasses = "bg-white dark:bg-slate/10 p-6 rounded-2xl border border-slate/5 dark:border-white/5 space-y-6";
  const titleClasses = "text-sm font-black text-primary dark:text-accent uppercase tracking-widest flex items-center gap-2 mb-4";
  const labelClasses = "text-xs font-bold text-charcoal dark:text-offwhite/80";
  const subClasses = "text-[10px] text-slate/40 dark:text-offwhite/40";

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h2 className="text-2xl font-bold text-primary dark:text-offwhite flex items-center gap-3">
          <Settings className="text-bronze" />
          Configurações do Sistema
        </h2>
        <p className="text-sm text-slate/60 dark:text-offwhite/40">Gerencie sua experiência e protocolos de segurança</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Preferências de Interface */}
        <div className={sectionClasses}>
          <h3 className={titleClasses}><Monitor className="w-4 h-4" /> Interface e Exibição</h3>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={labelClasses}>Modo Escuro</p>
                <p className={subClasses}>Alternar entre tema claro e escuro</p>
              </div>
              <button 
                onClick={toggleDarkMode}
                className={`w-14 h-7 rounded-full transition-all relative ${settings.darkMode ? 'bg-bronze' : 'bg-slate/20'}`}
              >
                <div className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-sm transition-all flex items-center justify-center ${settings.darkMode ? 'right-1' : 'left-1'}`}>
                  {settings.darkMode ? <Moon className="w-3 h-3 text-bronze" /> : <Sun className="w-3 h-3 text-slate/40" />}
                </div>
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className={labelClasses}>Idioma do Sistema</p>
                <p className={subClasses}>Aplica-se a todos os módulos e relatórios</p>
              </div>
              <div className="flex bg-offwhite dark:bg-white/5 p-1 rounded-lg">
                <button 
                  onClick={() => updateLang('pt')}
                  className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${settings.lang === 'pt' ? 'bg-primary text-white' : 'text-slate/60 dark:text-offwhite/40'}`}
                >
                  Português
                </button>
                <button 
                  onClick={() => updateLang('es')}
                  className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${settings.lang === 'es' ? 'bg-primary text-white' : 'text-slate/60 dark:text-offwhite/40'}`}
                >
                  Español
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Segurança e LGPD */}
        <div className={sectionClasses}>
          <h3 className={titleClasses}><Shield className="w-4 h-4" /> Segurança e Privacidade</h3>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={labelClasses}>Tempo de Mascaramento PII</p>
                <p className={subClasses}>Ocultar dados sensíveis após inatividade</p>
              </div>
              <select 
                className="bg-offwhite dark:bg-white/5 border-none text-xs font-bold p-2 rounded-lg outline-none cursor-pointer"
                value={settings.piiTimeout}
                onChange={(e) => setSettings(prev => ({...prev, piiTimeout: Number(e.target.value)}))}
              >
                <option value={5}>5 Minutos</option>
                <option value={10}>10 Minutos</option>
                <option value={30}>30 Minutos</option>
                <option value={0}>Sempre Visível</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className={labelClasses}>Trilha de Auditoria Estendida</p>
                <p className={subClasses}>Registrar cada visualização de documento</p>
              </div>
              <div className="flex items-center gap-2 text-bronze font-bold text-xs">
                <Lock className="w-3 h-3" /> Obrigatório
              </div>
            </div>
          </div>
        </div>

        {/* Customização do Dashboard */}
        <div className={`${sectionClasses} lg:col-span-2`}>
          <h3 className={titleClasses}><LayoutIcon className="w-4 h-4" /> Painel de Controle (Personalização)</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="space-y-4">
              <p className="text-[10px] font-black text-slate/40 uppercase">Componentes Visíveis</p>
              <div className="space-y-3">
                {[
                  { id: 'showMetrics', label: 'Métricas Superiores' },
                  { id: 'showVolatility', label: 'Gráfico de Volatilidade' },
                  { id: 'showAgenda', label: 'Agenda Próxima' }
                ].map(comp => (
                  <label key={comp.id} className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 rounded border-slate/20 text-bronze focus:ring-bronze"
                      checked={settings.dashboard[comp.id as keyof AppSettings['dashboard']] as boolean}
                      onChange={() => toggleDashboardPart(comp.id as keyof AppSettings['dashboard'])}
                    />
                    <span className="text-xs font-medium text-slate dark:text-offwhite/60 group-hover:text-primary dark:group-hover:text-accent transition-colors">
                      {comp.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-[10px] font-black text-slate/40 uppercase">Métricas de Destaque</p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: 'cases', label: 'Casos Ativos' },
                  { id: 'revenue', label: 'Receita' },
                  { id: 'drivers', label: 'Motoristas' },
                  { id: 'alerts', label: 'Alertas' }
                ].map(metric => (
                  <label key={metric.id} className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 rounded border-slate/20 text-bronze focus:ring-bronze"
                      checked={settings.dashboard.activeMetrics.includes(metric.id)}
                      onChange={() => toggleMetric(metric.id)}
                    />
                    <span className="text-xs font-medium text-slate dark:text-offwhite/60">
                      {metric.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-primary/5 dark:bg-accent/5 p-4 rounded-xl border border-primary/10 dark:border-accent/10 flex flex-col justify-center items-center text-center">
               <RefreshCw className="w-8 h-8 text-bronze mb-2 animate-spin-slow" />
               <p className="text-[10px] font-bold text-primary dark:text-accent uppercase">Auto-Sincronização</p>
               <p className="text-[9px] text-slate/40 dark:text-offwhite/40 mt-1">O Dashboard atualiza automaticamente a cada 2 minutos.</p>
            </div>
          </div>
        </div>

        {/* Sincronização e Integração */}
        <div className={`${sectionClasses} lg:col-span-2`}>
           <div className="flex items-center justify-between">
             <div className="flex items-center gap-4">
               <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                 <RefreshCw className="w-6 h-6 text-blue-600" />
               </div>
               <div>
                 <h4 className="text-sm font-bold text-primary dark:text-accent">Sincronização Microsoft Outlook</h4>
                 <p className="text-xs text-slate/60 dark:text-offwhite/40">Sincronizar agendamentos de casos diretamente com calendários corporativos.</p>
               </div>
             </div>
             <button 
                onClick={toggleOutlook}
                className={`flex items-center gap-2 px-6 py-2 rounded-xl text-xs font-bold transition-all ${settings.outlookSync ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-slate/10 text-slate'}`}
              >
                {settings.outlookSync ? <CheckCircle2 className="w-4 h-4" /> : null}
                {settings.outlookSync ? 'Ativo' : 'Desativado'}
              </button>
           </div>
        </div>
      </div>

      <div className="flex justify-center py-8">
        <p className="text-[10px] text-slate/30 dark:text-offwhite/20 font-bold uppercase tracking-[0.2em]">
          Exec Pro v2.4.0 — Pinkerton Global Security Standards
        </p>
      </div>
    </div>
  );
};

export default SettingsPage;
