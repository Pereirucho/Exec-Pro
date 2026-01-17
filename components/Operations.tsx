
import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit2, 
  Trash2, 
  MoreVertical, 
  Download,
  Eye,
  EyeOff,
  MapPin,
  Calendar as CalendarIcon,
  ShieldAlert
} from 'lucide-react';
import { mockCases, mockVehicles, mockPersonnel } from '../utils/mockData';
import { Case } from '../types';
// Fixed: Added SERVICE_TYPES to the import list from constants.tsx
import { TRANSLATIONS, COUNTRIES, VEHICLE_TYPES, ARMOR_TYPES, STATUS_TYPES, SERVICE_TYPES } from '../constants';

interface OperationsProps {
  lang: 'pt' | 'es';
}

const Operations: React.FC<OperationsProps> = ({ lang }) => {
  const [cases, setCases] = useState<Case[]>(mockCases);
  const [searchTerm, setSearchTerm] = useState('');
  const [showPII, setShowPII] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCase, setEditingCase] = useState<Case | null>(null);

  const t = (key: string) => TRANSLATIONS[key]?.[lang] || key;

  const handleDelete = (id: string) => {
    if(window.confirm(lang === 'pt' ? 'Excluir este caso permanentemente?' : '¿Eliminar este caso permanentemente?')) {
      setCases(cases.filter(c => c.id !== id));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Progress': return 'bg-blue-100 text-blue-700';
      case 'Completed': return 'bg-green-100 text-green-700';
      case 'Pending': return 'bg-yellow-100 text-yellow-700';
      case 'Cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-slate/5 text-slate';
    }
  };

  const filteredCases = cases.filter(c => 
    c.projectNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-primary">{t('operations')}</h2>
          <p className="text-sm text-slate/60">Controle logístico de missões e agentes</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setShowPII(!showPII)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate/10 rounded-xl text-sm font-semibold text-slate hover:bg-offwhite transition-all shadow-sm"
          >
            {showPII ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            {showPII ? 'Ocultar PII' : 'Revelar PII'}
          </button>
          <button 
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate/10 rounded-xl text-sm font-semibold text-slate hover:bg-offwhite transition-all shadow-sm"
          >
            <Download className="w-4 h-4" />
            Exportar
          </button>
          <button 
            onClick={() => { setEditingCase(null); setIsModalOpen(true); }}
            className="flex items-center gap-2 px-6 py-2 bg-primary text-offwhite rounded-xl text-sm font-bold hover:bg-primary/90 transition-all shadow-lg active:scale-95"
          >
            <Plus className="w-5 h-5" />
            {t('newCase')}
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate/5 flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate/40" />
          <input 
            type="text" 
            placeholder="Pesquisar por projeto, cliente ou cidade..." 
            className="w-full pl-10 pr-4 py-2 bg-offwhite rounded-lg border-none focus:ring-2 focus:ring-primary/20 text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 text-slate text-sm font-medium hover:bg-offwhite rounded-lg">
          <Filter className="w-4 h-4" />
          Filtros
        </button>
      </div>

      {/* Operations Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate/5 border-b border-slate/10">
                <th className="px-6 py-4 text-[10px] font-bold text-slate/60 uppercase tracking-widest">Projeto / Cliente</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate/60 uppercase tracking-widest">Localização</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate/60 uppercase tracking-widest">Recursos</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate/60 uppercase tracking-widest">Período</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate/60 uppercase tracking-widest">Financeiro</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate/60 uppercase tracking-widest text-center">Status</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate/60 uppercase tracking-widest"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate/5">
              {filteredCases.map((c) => (
                <tr key={c.id} className="hover:bg-offwhite/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-primary">{c.projectNumber}</span>
                      <span className="text-sm font-semibold text-charcoal">{c.clientName}</span>
                      <span className="text-[10px] text-slate/40 font-bold uppercase mt-1">{c.service}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3 h-3 text-bronze" />
                      <div className="flex flex-col">
                        <span className="text-sm text-charcoal">{c.city}</span>
                        <span className="text-[10px] text-slate/60 font-medium">{c.country}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1">
                        <span className="text-[10px] bg-accent/20 text-bronze px-1.5 rounded font-bold">CAR</span>
                        <span className="text-xs text-slate">{mockVehicles.find(v => v.id === c.vehicleId)?.model}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-[10px] bg-primary/10 text-primary px-1.5 rounded font-bold">EXE</span>
                        <span className={`text-xs text-slate ${!showPII ? 'mask-pii' : ''}`}>
                          {mockPersonnel.find(p => p.id === c.driverId)?.name}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="w-3 h-3 text-slate/40" />
                      <div className="flex flex-col">
                        <span className="text-xs text-slate font-medium">Início: {new Date(c.startDateTime).toLocaleDateString()}</span>
                        <span className="text-xs text-slate/40">Fim: {new Date(c.endDateTime).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex flex-col">
                      <span className="text-xs text-green-600 font-bold">R$ {c.revenue.toLocaleString()}</span>
                      <span className="text-[10px] text-red-500 font-semibold tracking-tighter">C: R$ {c.cost.toLocaleString()}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusColor(c.status)}`}>
                        {c.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-slate hover:text-primary hover:bg-primary/5 rounded-lg">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(c.id)}
                        className="p-2 text-slate hover:text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-slate hover:bg-slate/5 rounded-lg">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Simple Modal Simulation */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/40 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in duration-300">
             <div className="bg-primary p-6 text-offwhite flex justify-between items-center">
                <h3 className="text-xl font-bold">{editingCase ? t('editCase') : t('newCase')}</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-offwhite/50 hover:text-white transition-colors">
                  &times; Fechar
                </button>
             </div>
             <div className="p-8 space-y-6 overflow-y-auto max-h-[80vh]">
                <div className="grid grid-cols-2 gap-6">
                   <div className="space-y-1">
                      <label className="text-xs font-bold text-slate/60 uppercase">Número do Projeto</label>
                      <input type="text" className="w-full p-3 bg-offwhite rounded-xl border-none focus:ring-2 focus:ring-primary/20 text-sm font-medium" defaultValue="EP-XXXXX" />
                   </div>
                   <div className="space-y-1">
                      <label className="text-xs font-bold text-slate/60 uppercase">Cliente</label>
                      <input type="text" className="w-full p-3 bg-offwhite rounded-xl border-none focus:ring-2 focus:ring-primary/20 text-sm" placeholder="Nome do Cliente ou Empresa" />
                   </div>
                   <div className="space-y-1">
                      <label className="text-xs font-bold text-slate/60 uppercase">Tipo de Serviço</label>
                      <select className="w-full p-3 bg-offwhite rounded-xl border-none focus:ring-2 focus:ring-primary/20 text-sm">
                         {SERVICE_TYPES.map(s => <option key={s}>{s}</option>)}
                      </select>
                   </div>
                   <div className="space-y-1">
                      <label className="text-xs font-bold text-slate/60 uppercase">País</label>
                      <select className="w-full p-3 bg-offwhite rounded-xl border-none focus:ring-2 focus:ring-primary/20 text-sm">
                         {COUNTRIES.map(c => <option key={c.code}>{c.name}</option>)}
                      </select>
                   </div>
                </div>
                
                <div className="space-y-4">
                   <div className="flex items-center gap-2 p-4 bg-accent/10 border border-accent/20 rounded-2xl">
                      <ShieldAlert className="text-bronze w-5 h-5" />
                      <div>
                         <p className="text-sm font-bold text-bronze">Compliance LGPD</p>
                         <p className="text-[10px] text-bronze/70">Todos os dados de agentes e motoristas serão mascarados na visualização pública por padrão.</p>
                      </div>
                   </div>
                </div>

                <div className="flex justify-end gap-3 mt-8">
                   <button onClick={() => setIsModalOpen(false)} className="px-6 py-2 text-sm font-bold text-slate hover:bg-slate/5 rounded-xl transition-all">{t('cancel')}</button>
                   <button onClick={() => setIsModalOpen(false)} className="px-10 py-2 text-sm font-bold text-offwhite bg-primary rounded-xl hover:bg-primary/90 transition-all shadow-lg active:scale-95">{t('save')}</button>
                </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Operations;
