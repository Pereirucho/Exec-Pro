
import React, { useState } from 'react';
import { 
  Car, 
  Plus, 
  Search, 
  Filter, 
  Shield, 
  Truck, 
  MoreVertical, 
  AlertTriangle,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { mockVehicles } from '../utils/mockData';
import { VEHICLE_TYPES, ARMOR_TYPES } from '../constants';

const Fleet: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Available': return <span className="flex items-center gap-1 text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full"><CheckCircle2 className="w-3 h-3" /> Disponível</span>;
      case 'On Mission': return <span className="flex items-center gap-1 text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full"><Shield className="w-3 h-3" /> Em Missão</span>;
      case 'Maintenance': return <span className="flex items-center gap-1 text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full"><AlertTriangle className="w-3 h-3" /> Manutenção</span>;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-primary flex items-center gap-3">
            <Car className="text-bronze" />
            Gestão de Frota
          </h2>
          <p className="text-sm text-slate/60">Controle de ativos e parceiros logísticos</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2.5 bg-primary text-offwhite rounded-xl text-sm font-bold hover:bg-primary/90 transition-all shadow-lg active:scale-95">
          <Plus className="w-5 h-5" />
          Cadastrar Veículo
        </button>
      </div>

      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate/5 flex flex-wrap items-center gap-4">
        <div className="flex-1 min-w-[300px] relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate/40" />
          <input 
            type="text" 
            placeholder="Buscar por placa, modelo ou parceiro..." 
            className="w-full pl-10 pr-4 py-2 bg-offwhite rounded-lg border-none focus:ring-2 focus:ring-primary/20 text-sm"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <select 
            className="bg-offwhite border-none text-xs font-bold text-slate p-2 rounded-lg outline-none cursor-pointer"
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="All">Todos os Tipos</option>
            {VEHICLE_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
          <button className="p-2 bg-slate/5 text-slate rounded-lg hover:bg-slate/10">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockVehicles.map((vehicle) => (
          <div key={vehicle.id} className="bg-white rounded-2xl shadow-sm border border-slate/5 overflow-hidden group hover:border-bronze/30 transition-all">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl ${vehicle.armor === 'Armored' ? 'bg-primary text-accent' : 'bg-offwhite text-primary'}`}>
                  <Car className="w-6 h-6" />
                </div>
                <div className="text-right">
                  {getStatusBadge(vehicle.status || 'Available')}
                  <p className="text-[10px] font-black text-slate/30 mt-1 uppercase tracking-tighter">{vehicle.plate}</p>
                </div>
              </div>
              
              <h3 className="text-lg font-bold text-charcoal">{vehicle.model}</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] font-bold px-2 py-0.5 bg-slate/5 text-slate/60 rounded uppercase tracking-widest">{vehicle.type}</span>
                {vehicle.armor === 'Armored' && (
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-accent/20 text-bronze rounded uppercase tracking-widest flex items-center gap-1">
                    <Shield className="w-3 h-3" /> Blindado
                  </span>
                )}
              </div>

              <div className="mt-6 pt-6 border-t border-slate/5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate/40 uppercase tracking-widest flex items-center gap-1">
                    <Truck className="w-3 h-3" /> Parceiro
                  </span>
                  <span className="text-xs font-bold text-primary flex items-center gap-1">
                    {vehicle.partner || 'Frota Própria'}
                    <ExternalLink className="w-3 h-3 opacity-30" />
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate/40 uppercase tracking-widest">Última Missão</span>
                  <span className="text-[10px] font-medium text-slate">12/06/2024 - EP-10023</span>
                </div>
              </div>
            </div>
            <div className="bg-slate/5 px-6 py-3 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="text-xs font-bold text-bronze hover:underline">Ver Histórico</button>
              <div className="flex gap-2">
                <button className="p-1.5 hover:bg-white rounded-lg transition-colors"><MoreVertical className="w-4 h-4 text-slate/40" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Fleet;
