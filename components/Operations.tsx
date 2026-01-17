
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
  ShieldAlert,
  User,
  CreditCard,
  Building2,
  FileText,
  X
} from 'lucide-react';
import { mockCases, mockVehicles, mockPersonnel } from '../utils/mockData';
import { Case } from '../types';
import { TRANSLATIONS, COUNTRIES, VEHICLE_TYPES, ARMOR_TYPES, STATUS_TYPES, SERVICE_TYPES, PAYMENT_METHODS, CARD_TYPES } from '../constants';

interface OperationsProps {
  lang: 'pt' | 'es';
}

const Operations: React.FC<OperationsProps> = ({ lang }) => {
  const [cases, setCases] = useState<Case[]>(mockCases);
  const [searchTerm, setSearchTerm] = useState('');
  const [showPII, setShowPII] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCase, setEditingCase] = useState<Case | null>(null);

  // Form State for multiple cities
  const [tempCities, setTempCities] = useState<string[]>([]);
  const [newCityInput, setNewCityInput] = useState('');

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

  const addCity = () => {
    if (newCityInput.trim()) {
      setTempCities([...tempCities, newCityInput.trim()]);
      setNewCityInput('');
    }
  };

  const removeCity = (index: number) => {
    setTempCities(tempCities.filter((_, i) => i !== index));
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
            onClick={() => { setEditingCase(null); setTempCities([]); setIsModalOpen(true); }}
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
                        <span className="text-sm text-charcoal truncate max-w-[150px]">{c.city}</span>
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
                        <span className="text-xs text-slate font-medium">{new Date(c.startDateTime).toLocaleDateString()}</span>
                        <span className="text-xs text-slate/40 font-medium tracking-tight">a {new Date(c.endDateTime).toLocaleDateString()}</span>
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

      {/* Expanded Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/40 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in duration-300">
             <div className="bg-primary p-6 text-offwhite flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <ShieldAlert className="text-accent w-6 h-6" />
                  <h3 className="text-xl font-bold">{editingCase ? t('editCase') : t('newCase')}</h3>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                  <X className="w-5 h-5" />
                </button>
             </div>
             <div className="p-8 space-y-8 overflow-y-auto max-h-[85vh]">
                
                {/* Section 1: General Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                   <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate/40 uppercase tracking-widest flex items-center gap-1">
                        <FileText className="w-3 h-3" /> Projeto
                      </label>
                      <input type="text" className="w-full p-3 bg-offwhite rounded-xl border-none focus:ring-2 focus:ring-primary/20 text-sm font-bold text-primary" placeholder="EP-XXXXX" />
                   </div>
                   <div className="space-y-1 md:col-span-2">
                      <label className="text-[10px] font-bold text-slate/40 uppercase tracking-widest flex items-center gap-1">
                        <User className="w-3 h-3" /> Cliente Principal
                      </label>
                      <input type="text" className="w-full p-3 bg-offwhite rounded-xl border-none focus:ring-2 focus:ring-primary/20 text-sm" placeholder="Nome da Empresa ou VIP" />
                   </div>
                </div>

                {/* Section 2: Vehicle & Security */}
                <div className="bg-slate/5 p-6 rounded-2xl space-y-6">
                  <h4 className="text-xs font-black text-primary uppercase tracking-widest border-b border-slate/10 pb-2">Veículo e Segurança</h4>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate/40 uppercase tracking-widest">Tipo de Veículo</label>
                      <select className="w-full p-3 bg-white rounded-xl border-none focus:ring-2 focus:ring-primary/20 text-sm">
                         {VEHICLE_TYPES.map(v => <option key={v}>{v}</option>)}
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate/40 uppercase tracking-widest">Blindagem</label>
                      <select className="w-full p-3 bg-white rounded-xl border-none focus:ring-2 focus:ring-primary/20 text-sm">
                         {ARMOR_TYPES.map(a => <option key={a}>{a}</option>)}
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate/40 uppercase tracking-widest">Agente de Segurança</label>
                      <div className="flex items-center gap-4 p-3 bg-white rounded-xl">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="radio" name="agent" className="text-primary focus:ring-primary" />
                          <span className="text-xs font-semibold">Sim</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="radio" name="agent" className="text-primary focus:ring-primary" defaultChecked />
                          <span className="text-xs font-semibold">Não</span>
                        </label>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate/40 uppercase tracking-widest">Serviço</label>
                      <select className="w-full p-3 bg-white rounded-xl border-none focus:ring-2 focus:ring-primary/20 text-sm">
                         {SERVICE_TYPES.map(s => <option key={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Section 3: Logistics (Multi-city & Hotel) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="text-xs font-black text-primary uppercase tracking-widest border-b border-slate/10 pb-2">Logística de Cidades</h4>
                    <div className="space-y-2">
                       <div className="flex gap-2">
                         <input 
                           type="text" 
                           className="flex-1 p-3 bg-offwhite rounded-xl border-none focus:ring-2 focus:ring-primary/20 text-sm" 
                           placeholder="Adicionar cidade..."
                           value={newCityInput}
                           onChange={(e) => setNewCityInput(e.target.value)}
                           onKeyDown={(e) => e.key === 'Enter' && addCity()}
                         />
                         <button 
                           onClick={addCity}
                           className="px-4 py-2 bg-bronze text-offwhite rounded-xl hover:bg-bronze/90 transition-all shadow-md active:scale-95"
                         >
                           <Plus className="w-5 h-5" />
                         </button>
                       </div>
                       <div className="flex flex-wrap gap-2 min-h-[40px]">
                         {tempCities.map((city, idx) => (
                           <span key={idx} className="flex items-center gap-2 px-3 py-1.5 bg-accent text-primary text-xs font-bold rounded-lg shadow-sm">
                             {city}
                             <button onClick={() => removeCity(idx)} className="hover:text-red-600">
                               <X className="w-3 h-3" />
                             </button>
                           </span>
                         ))}
                       </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate/40 uppercase tracking-widest flex items-center gap-1">
                        <Building2 className="w-3 h-3" /> Hotel / Ponto de Referência
                      </label>
                      <input type="text" className="w-full p-3 bg-offwhite rounded-xl border-none focus:ring-2 focus:ring-primary/20 text-sm" placeholder="Nome do Hotel ou Base" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-xs font-black text-primary uppercase tracking-widest border-b border-slate/10 pb-2">Agenda Detalhada</h4>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate/40 uppercase tracking-widest">Descrição da Agenda</label>
                      <textarea className="w-full p-3 bg-offwhite rounded-xl border-none focus:ring-2 focus:ring-primary/20 text-sm min-h-[120px]" placeholder="Liste os horários e paradas previstos..."></textarea>
                    </div>
                  </div>
                </div>

                {/* Section 4: Calendar & Dates */}
                <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10">
                   <div className="flex items-center justify-between mb-4">
                      <h4 className="text-xs font-black text-primary uppercase tracking-widest">Configuração de Calendário</h4>
                      <span className="text-[10px] text-bronze font-bold bg-accent/20 px-2 py-0.5 rounded">Fuso Horário Local</span>
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1">
                         <label className="text-[10px] font-bold text-slate/40 uppercase tracking-widest">Data/Hora Início</label>
                         <input type="datetime-local" className="w-full p-3 bg-white rounded-xl border-none focus:ring-2 focus:ring-primary/20 text-sm font-medium" />
                      </div>
                      <div className="space-y-1">
                         <label className="text-[10px] font-bold text-slate/40 uppercase tracking-widest">Data/Hora Término</label>
                         <input type="datetime-local" className="w-full p-3 bg-white rounded-xl border-none focus:ring-2 focus:ring-primary/20 text-sm font-medium" />
                      </div>
                   </div>
                </div>

                {/* Section 5: Passenger & Billing */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="text-xs font-black text-primary uppercase tracking-widest border-b border-slate/10 pb-2">Dados do Passageiro</h4>
                    <div className="space-y-4">
                       <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate/40 uppercase tracking-widest">Email Corporativo</label>
                          <input type="email" className="w-full p-3 bg-offwhite rounded-xl border-none focus:ring-2 focus:ring-primary/20 text-sm" placeholder="passageiro@email.com" />
                       </div>
                       <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate/40 uppercase tracking-widest">Telefone (WhatsApp)</label>
                          <input type="tel" className="w-full p-3 bg-offwhite rounded-xl border-none focus:ring-2 focus:ring-primary/20 text-sm" placeholder="+55 (11) 99999-9999" />
                       </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-xs font-black text-primary uppercase tracking-widest border-b border-slate/10 pb-2">Faturamento</h4>
                    <div className="space-y-4">
                       <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                             <label className="text-[10px] font-bold text-slate/40 uppercase tracking-widest">Forma Pagto</label>
                             <select className="w-full p-3 bg-offwhite rounded-xl border-none focus:ring-2 focus:ring-primary/20 text-sm font-bold">
                                {PAYMENT_METHODS.map(m => <option key={m}>{m}</option>)}
                             </select>
                          </div>
                          <div className="space-y-1">
                             <label className="text-[10px] font-bold text-slate/40 uppercase tracking-widest">Tipo Cartão</label>
                             <select className="w-full p-3 bg-offwhite rounded-xl border-none focus:ring-2 focus:ring-primary/20 text-sm">
                                {CARD_TYPES.map(t => <option key={t}>{t}</option>)}
                             </select>
                          </div>
                       </div>
                       <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                             <label className="text-[10px] font-bold text-slate/40 uppercase tracking-widest">Custo Estimado</label>
                             <div className="relative">
                               <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate/40 text-xs font-bold">R$</span>
                               <input type="number" className="w-full pl-9 p-3 bg-offwhite rounded-xl border-none focus:ring-2 focus:ring-primary/20 text-sm font-bold text-red-600" defaultValue="0" />
                             </div>
                          </div>
                          <div className="space-y-1">
                             <label className="text-[10px] font-bold text-slate/40 uppercase tracking-widest">Receita Bruta</label>
                             <div className="relative">
                               <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate/40 text-xs font-bold">R$</span>
                               <input type="number" className="w-full pl-9 p-3 bg-offwhite rounded-xl border-none focus:ring-2 focus:ring-primary/20 text-sm font-bold text-green-600" defaultValue="0" />
                             </div>
                          </div>
                       </div>
                    </div>
                  </div>
                </div>

                {/* LGPD Warning */}
                <div className="flex items-center gap-3 p-4 bg-accent/10 border border-accent/20 rounded-2xl">
                  <ShieldAlert className="text-bronze w-5 h-5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-bold text-bronze leading-tight">Protocolo de Confidencialidade (LGPD)</p>
                    <p className="text-[10px] text-bronze/70 leading-relaxed font-medium">Os dados de contato do passageiro são criptografados em repouso. O acesso aos campos PII é registrado na trilha de auditoria.</p>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-6 border-t border-slate/10">
                   <button onClick={() => setIsModalOpen(false)} className="px-6 py-2.5 text-sm font-bold text-slate hover:bg-slate/5 rounded-xl transition-all">{t('cancel')}</button>
                   <button onClick={() => setIsModalOpen(false)} className="px-12 py-2.5 text-sm font-black text-offwhite bg-primary rounded-xl hover:bg-primary/90 transition-all shadow-xl active:scale-95 flex items-center gap-2">
                     <CreditCard className="w-4 h-4" />
                     {t('save')}
                   </button>
                </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Operations;
