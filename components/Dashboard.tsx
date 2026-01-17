
import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area 
} from 'recharts';
import { 
  TrendingUp, 
  Users, 
  Shield, 
  AlertCircle,
  Plus
} from 'lucide-react';

const data = [
  { name: 'Seg', cases: 4, revenue: 2400 },
  { name: 'Ter', cases: 3, revenue: 1800 },
  { name: 'Qua', cases: 5, revenue: 3200 },
  { name: 'Qui', cases: 8, revenue: 5800 },
  { name: 'Sex', cases: 10, revenue: 7500 },
  { name: 'Sab', cases: 2, revenue: 1200 },
  { name: 'Dom', cases: 1, revenue: 800 },
];

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Casos Ativos', value: '12', icon: Shield, color: 'bg-primary text-offwhite' },
          { label: 'Receita Mensal', value: 'R$ 42.5k', icon: TrendingUp, color: 'bg-accent text-primary' },
          { label: 'Motoristas Online', value: '8/12', icon: Users, color: 'bg-bronze text-offwhite' },
          { label: 'Alertas', value: '2', icon: AlertCircle, color: 'bg-red-100 text-red-600' },
        ].map((card, i) => (
          <div key={i} className={`p-6 rounded-2xl shadow-sm border border-slate/5 transition-transform hover:-translate-y-1 bg-white flex flex-col justify-between h-40`}>
             <div className="flex justify-between items-start">
               <span className="text-slate/60 text-xs font-bold uppercase tracking-widest">{card.label}</span>
               <div className={`p-2 rounded-lg ${card.color}`}>
                 <card.icon className="w-5 h-5" />
               </div>
             </div>
             <div className="mt-4">
                <h3 className="text-3xl font-bold text-charcoal">{card.value}</h3>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-green-500 text-xs font-bold">+12.5%</span>
                  <span className="text-slate/40 text-[10px] font-medium uppercase">vs mês ant.</span>
                </div>
             </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-sm border border-slate/5">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold text-primary flex items-center gap-2">
              Volatilidade de Operações
              <span className="text-[10px] font-normal text-slate/40 uppercase tracking-widest">Últimos 7 dias</span>
            </h3>
            <button className="text-primary text-sm font-semibold flex items-center gap-1 hover:underline">
              Ver Relatório Completo
            </button>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#182D3D" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#182D3D" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#43423E', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#43423E', fontSize: 12}} />
                <Tooltip 
                   contentStyle={{backgroundColor: '#182D3D', color: '#F7F6F3', borderRadius: '12px', border: 'none'}}
                   itemStyle={{color: '#EAD3AA'}}
                />
                <Area type="monotone" dataKey="revenue" stroke="#182D3D" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate/5">
           <h3 className="text-lg font-bold text-primary mb-6">Agenda Próxima</h3>
           <div className="space-y-6">
              {[
                { time: '14:30', client: 'John Wick', type: 'Transfer', loc: 'GRU Airport' },
                { time: '16:00', client: 'VIP Event', type: 'Daily', loc: 'WTC SP' },
                { time: '18:15', client: 'M. Gates', type: 'Transfer', loc: 'Hotel Unique' },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-xl hover:bg-offwhite transition-colors border border-transparent hover:border-slate/5">
                   <div className="flex flex-col items-center justify-center min-w-[50px] border-r border-slate/10 pr-4">
                      <span className="text-sm font-bold text-primary">{item.time}</span>
                      <span className="text-[10px] text-slate/60 uppercase font-bold">HOJE</span>
                   </div>
                   <div className="flex-1">
                      <p className="text-sm font-bold text-charcoal">{item.client}</p>
                      <div className="flex items-center gap-2 mt-1">
                         <span className="text-[10px] px-2 py-0.5 rounded bg-accent/30 text-bronze font-bold uppercase">{item.type}</span>
                         <span className="text-xs text-slate/60 truncate">{item.loc}</span>
                      </div>
                   </div>
                </div>
              ))}
           </div>
           <button className="w-full mt-8 py-3 rounded-xl border-2 border-dashed border-slate/20 text-slate/40 hover:border-primary hover:text-primary transition-all flex items-center justify-center gap-2 text-sm font-bold">
             <Plus className="w-4 h-4" />
             Novo Agendamento
           </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
