
import React, { useState, useMemo } from 'react';
import { 
  FileText, 
  Download, 
  Calendar as CalendarIcon, 
  Globe, 
  Briefcase, 
  Activity,
  ArrowUpRight,
  Filter,
  FileSpreadsheet
} from 'lucide-react';
import { mockCases } from '../utils/mockData';
import { TRANSLATIONS, COUNTRIES, SERVICE_TYPES, STATUS_TYPES } from '../constants';
import { Case } from '../types';

interface ReportsProps {
  lang: 'pt' | 'es';
}

const Reports: React.FC<ReportsProps> = ({ lang }) => {
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    country: 'All',
    service: 'All',
    status: 'All'
  });

  const t = (key: string) => TRANSLATIONS[key]?.[lang] || key;

  const filteredData = useMemo(() => {
    return mockCases.filter(c => {
      const matchCountry = filters.country === 'All' || c.country === filters.country;
      const matchService = filters.service === 'All' || c.service === filters.service;
      const matchStatus = filters.status === 'All' || c.status === filters.status;
      const matchDate = (!filters.startDate || c.startDateTime >= filters.startDate) &&
                        (!filters.endDate || c.startDateTime <= filters.endDate);
      return matchCountry && matchService && matchStatus && matchDate;
    });
  }, [filters]);

  const stats = useMemo(() => {
    const totalRevenue = filteredData.reduce((sum, c) => sum + c.revenue, 0);
    const totalCost = filteredData.reduce((sum, c) => sum + c.cost, 0);
    return {
      count: filteredData.length,
      revenue: totalRevenue,
      cost: totalCost,
      margin: totalRevenue - totalCost
    };
  }, [filteredData]);

  const exportCSV = () => {
    const headers = ['ID', 'Project', 'Client', 'Service', 'Country', 'City', 'Revenue', 'Cost', 'Status', 'Date'];
    const rows = filteredData.map(c => [
      c.id, c.projectNumber, c.clientName, c.service, c.country, c.city, c.revenue, c.cost, c.status, c.startDateTime
    ]);
    
    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `exec_pro_report_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-primary flex items-center gap-3">
            <FileText className="text-bronze" />
            {t('reports')}
          </h2>
          <p className="text-sm text-slate/60">Análise financeira e operacional detalhada</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={exportCSV}
            className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate/10 rounded-xl text-sm font-bold text-slate hover:bg-offwhite transition-all shadow-sm active:scale-95"
          >
            <FileSpreadsheet className="w-4 h-4 text-green-600" />
            Exportar CSV
          </button>
          <button 
            className="flex items-center gap-2 px-5 py-2.5 bg-primary text-offwhite rounded-xl text-sm font-bold hover:bg-primary/90 transition-all shadow-lg active:scale-95"
          >
            <Download className="w-4 h-4" />
            Exportar PDF
          </button>
        </div>
      </div>

      {/* Filter Panel */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate/5">
        <div className="flex items-center gap-2 mb-6 text-primary font-bold">
          <Filter className="w-4 h-4" />
          <span className="text-sm uppercase tracking-widest">Filtros de Relatório</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate/40 uppercase flex items-center gap-1">
              <CalendarIcon className="w-3 h-3" /> Início
            </label>
            <input 
              type="date" 
              className="w-full p-2.5 bg-offwhite rounded-lg border-none text-sm font-medium focus:ring-2 focus:ring-primary/10"
              onChange={(e) => setFilters({...filters, startDate: e.target.value})}
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate/40 uppercase flex items-center gap-1">
              <CalendarIcon className="w-3 h-3" /> Fim
            </label>
            <input 
              type="date" 
              className="w-full p-2.5 bg-offwhite rounded-lg border-none text-sm font-medium focus:ring-2 focus:ring-primary/10"
              onChange={(e) => setFilters({...filters, endDate: e.target.value})}
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate/40 uppercase flex items-center gap-1">
              <Globe className="w-3 h-3" /> {t('country')}
            </label>
            <select 
              className="w-full p-2.5 bg-offwhite rounded-lg border-none text-sm font-medium focus:ring-2 focus:ring-primary/10"
              onChange={(e) => setFilters({...filters, country: e.target.value})}
            >
              <option value="All">Todos os Países</option>
              {COUNTRIES.map(c => <option key={c.code} value={c.name}>{c.name}</option>)}
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate/40 uppercase flex items-center gap-1">
              <Briefcase className="w-3 h-3" /> {t('service')}
            </label>
            <select 
              className="w-full p-2.5 bg-offwhite rounded-lg border-none text-sm font-medium focus:ring-2 focus:ring-primary/10"
              onChange={(e) => setFilters({...filters, service: e.target.value})}
            >
              <option value="All">Todos os Serviços</option>
              {SERVICE_TYPES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate/40 uppercase flex items-center gap-1">
              <Activity className="w-3 h-3" /> {t('status')}
            </label>
            <select 
              className="w-full p-2.5 bg-offwhite rounded-lg border-none text-sm font-medium focus:ring-2 focus:ring-primary/10"
              onChange={(e) => setFilters({...filters, status: e.target.value})}
            >
              <option value="All">Todos os Status</option>
              {STATUS_TYPES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Casos', value: stats.count, sub: 'Operações filtradas' },
          { label: 'Receita Total', value: `R$ ${stats.revenue.toLocaleString()}`, sub: 'Bruto operacional', accent: true },
          { label: 'Custo Total', value: `R$ ${stats.cost.toLocaleString()}`, sub: 'Logística e pessoal' },
          { label: 'Margem Líquida', value: `R$ ${stats.margin.toLocaleString()}`, sub: 'Lucro do período', positive: stats.margin >= 0 },
        ].map((card, i) => (
          <div key={i} className={`p-6 bg-white rounded-2xl shadow-sm border ${card.accent ? 'border-accent/30' : 'border-slate/5'}`}>
            <p className="text-[10px] font-bold text-slate/40 uppercase tracking-widest mb-1">{card.label}</p>
            <div className="flex items-center justify-between">
              <h4 className={`text-xl font-black ${card.positive === false ? 'text-red-600' : 'text-primary'}`}>
                {card.value}
              </h4>
              {card.accent && <ArrowUpRight className="text-accent w-5 h-5" />}
            </div>
            <p className="text-[10px] text-slate/40 mt-1">{card.sub}</p>
          </div>
        ))}
      </div>

      {/* Report Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate/5 border-b border-slate/10">
                <th className="px-6 py-4 text-[10px] font-bold text-slate/60 uppercase tracking-widest">Projeto</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate/60 uppercase tracking-widest">Localização</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate/60 uppercase tracking-widest text-right">Faturamento</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate/60 uppercase tracking-widest text-right">Custos</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate/60 uppercase tracking-widest text-right">Margem</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate/60 uppercase tracking-widest text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate/5">
              {filteredData.map((c) => (
                <tr key={c.id} className="hover:bg-offwhite/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-primary">{c.projectNumber}</span>
                      <span className="text-[10px] text-slate/40 uppercase font-bold">{c.service}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs text-charcoal font-medium">{c.city}, {c.country}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-xs font-bold text-primary">R$ {c.revenue.toLocaleString()}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-xs font-medium text-red-500">R$ {c.cost.toLocaleString()}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className={`text-xs font-bold ${c.revenue - c.cost >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      R$ {(c.revenue - c.cost).toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center">
                      <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded bg-slate/5 text-slate/60 border border-slate/10">
                        {c.status}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredData.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-20 text-center text-slate/40 text-sm font-medium italic">
                    Nenhum dado encontrado para os filtros selecionados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports;
