
import React, { useMemo } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area 
} from 'recharts';
import { 
  TrendingUp, 
  Users, 
  Shield, 
  AlertCircle,
  Plus,
  Clock,
  AlertTriangle
} from 'lucide-react';
import { AppSettings } from '../types';
import { mockCases } from '../utils/mockData';

const chartData = [
  { name: 'Seg', cases: 4, revenue: 2400 },
  { name: 'Ter', cases: 3, revenue: 1800 },
  { name: 'Qua', cases: 5, revenue: 3200 },
  { name: 'Qui', cases: 8, revenue: 5800 },
  { name: 'Sex', cases: 10, revenue: 7500 },
  { name: 'Sab', cases: 2, revenue: 1200 },
  { name: 'Dom', cases: 1, revenue: 800 },
];

interface DashboardProps {
  settings: AppSettings;
}

const Dashboard: React.FC<DashboardProps> = ({ settings }) => {
  // Lógica para identificar casos iminentes
  const agendaItems = useMemo(() => {
    const now = new Date();
    
    return mockCases.map(c => {
      const startTime = new Date(c.startDateTime);
      const diffMs = startTime.getTime() - now.getTime();
      const diffHours = diffMs / (1000 * 60 * 60);
      
      return {
        ...c,
        isImminent: diffHours > 0 && diffHours <= 3,
        timeLabel: startTime.toLocaleTimeString(settings.lang === 'pt' ? 'pt-BR' : 'es-ES', { hour: '2-digit', minute: '2-digit' }),
        dateLabel: startTime.toLocaleDateString(settings.lang === 'pt' ? 'pt-BR' : 'es-ES', { day: '2-digit', month: 'short' })
      };
    }).sort((a, b) => new Date(a.startDateTime).getTime() - new Date(b.startDateTime).getTime());
  }, [settings.lang]);

  const metricCards = [
    { id: 'cases', label: 'Casos Ativos', value: '12', icon: Shield, color: 'bg-primary text-offwhite' },
    { id: 'revenue', label: 'Receita Mensal', value: 'R$ 42.5k', icon: TrendingUp, color: 'bg-accent text-primary' },
    { id: 'drivers', label: 'Motoristas Online', value: '8/12', icon: Users, color: 'bg-bronze text-offwhite' },
    { id: 'alerts', label: 'Alertas', value: '2', icon: AlertCircle, color: 'bg-red-100 text-red-600' },
  ].filter(card => settings.dashboard.activeMetrics.includes(card.id));

  return (
    <div className="space-y-8">
      {/* Metric Cards */}
      {settings.dashboard.showMetrics && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metricCards.map((card) => (
            <div key={card.id} className={`p-6 rounded-2xl shadow-sm border border-slate/5 dark:border-white/5 transition-transform hover:-translate-y-1 bg-white dark:bg-slate/10 flex flex-col justify-between h-40`}>
               <div className="flex justify-between items-start">
                 <span className="text-slate/60 dark:text-offwhite/40 text-xs font-bold uppercase tracking-widest">{card.label}</span>
                 <div className={`p-2 rounded-lg ${card.color}`}>
                   <card.icon className="w-5 h-5" />
                 </div>
               </div>
               <div className="mt-4">
                  <h3 className="text-3xl font-bold text-charcoal dark:text-offwhite">{card.value}</h3>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-green-500 text-xs font-bold">+12.5%</span>
                    <span className="text-slate/40 dark:text-offwhite/20 text-[10px] font-medium uppercase">vs mês ant.</span>
                  </div>
               </div>
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        {settings.dashboard.showVolatility && (
          <div className="lg:col-span-2 bg-white dark:bg-slate/10 p-8 rounded-2xl shadow-sm border border-slate/5 dark:border-white/5">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-bold text-primary dark:text-accent flex items-center gap-2">
                Volatilidade de Operações
                <span className="text-[10px] font-normal text-slate/40 dark:text-offwhite/40 uppercase tracking-widest">Últimos 7 dias</span>
              </h3>
              <button className="text-primary dark:text-accent text-sm font-semibold flex items-center gap-1 hover:underline">
                Ver Relatório Completo
              </button>
            </div>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={settings.darkMode ? "#EAD3AA" : "#182D3D"} stopOpacity={0.1}/>
                      <stop offset="95%" stopColor={settings.darkMode ? "#EAD3AA" : "#182D3D"} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={settings.darkMode ? "#ffffff10" : "#f0f0f0"} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: settings.darkMode ? '#ffffff60' : '#43423E', fontSize: 12}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: settings.darkMode ? '#ffffff60' : '#43423E', fontSize: 12}} />
                  <Tooltip 
                     contentStyle={{backgroundColor: '#182D3D', color: '#F7F6F3', borderRadius: '12px', border: 'none'}}
                     itemStyle={{color: '#EAD3AA'}}
                  />
                  <Area type="monotone" dataKey="revenue" stroke={settings.darkMode ? "#EAD3AA" : "#182D3D"} strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Activity Feed / Agenda */}
        {settings.dashboard.showAgenda && (
          <div className="bg-white dark:bg-slate/10 p-8 rounded-2xl shadow-sm border border-slate/5 dark:border-white/5 flex flex-col">
             <div className="flex items-center justify-between mb-6">
               <h3 className="text-lg font-bold text-primary dark:text-accent">Agenda Próxima</h3>
               <span className="text-[10px] font-black text-bronze dark:text-accent/60 uppercase bg-bronze/5 dark:bg-accent/5 px-2 py-1 rounded">Tempo Real</span>
             </div>
             
             <div className="space-y-4 flex-1 overflow-y-auto max-h-[500px] pr-2 custom-scrollbar">
                {agendaItems.map((item, i) => (
                  <div 
                    key={item.id} 
                    className={`relative flex gap-4 p-4 rounded-xl transition-all duration-300 border ${
                      item.isImminent 
                        ? 'bg-accent/20 dark:bg-accent/10 border-bronze/30 shadow-md translate-x-1' 
                        : 'bg-offwhite/50 dark:bg-white/5 border-transparent hover:border-slate/10'
                    }`}
                  >
                     {/* Imminent Highlight Bar */}
                     {item.isImminent && (
                       <div className="absolute left-0 top-0 bottom-0 w-1 bg-bronze rounded-l-xl animate-pulse"></div>
                     )}

                     <div className="flex flex-col items-center justify-center min-w-[60px] border-r border-slate/10 dark:border-white/10 pr-4">
                        <span className={`text-sm font-black ${item.isImminent ? 'text-bronze' : 'text-primary dark:text-accent'}`}>
                          {item.timeLabel}
                        </span>
                        <span className="text-[9px] text-slate/60 dark:text-offwhite/40 uppercase font-bold">
                          {item.dateLabel}
                        </span>
                     </div>

                     <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <p className="text-sm font-bold text-charcoal dark:text-offwhite truncate">
                            {item.clientName}
                          </p>
                          {item.isImminent && (
                            <span className="flex items-center gap-1 text-[8px] font-black bg-bronze text-offwhite px-1.5 py-0.5 rounded animate-bounce">
                              <AlertTriangle className="w-2.5 h-2.5" /> IMINENTE
                            </span>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-2 mt-1">
                           <span className={`text-[9px] px-2 py-0.5 rounded font-black uppercase ${
                             item.service === 'Daily' ? 'bg-primary text-offwhite' : 'bg-bronze/20 text-bronze'
                           }`}>
                             {item.service}
                           </span>
                           <span className="text-[11px] text-slate/60 dark:text-offwhite/40 truncate flex items-center gap-1">
                             <Clock className="w-3 h-3" /> {item.city}
                           </span>
                        </div>
                     </div>
                  </div>
                ))}

                {agendaItems.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-sm text-slate/40 italic">Sem agendamentos próximos.</p>
                  </div>
                )}
             </div>

             <button className="w-full mt-6 py-3 rounded-xl border-2 border-dashed border-slate/20 dark:border-white/10 text-slate/40 hover:border-primary dark:hover:border-accent hover:text-primary dark:hover:text-accent transition-all flex items-center justify-center gap-2 text-sm font-bold">
               <Plus className="w-4 h-4" />
               Novo Agendamento
             </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
