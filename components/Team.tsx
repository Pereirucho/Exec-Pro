
import React, { useState } from 'react';
import { 
  Users, 
  Plus, 
  Search, 
  ShieldCheck, 
  UserCheck, 
  MoreVertical, 
  Briefcase,
  Eye,
  EyeOff,
  Phone,
  Mail
} from 'lucide-react';
import { mockPersonnel } from '../utils/mockData';

const Team: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showPII, setShowPII] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-primary flex items-center gap-3">
            <Users className="text-bronze" />
            Gestão de Equipe
          </h2>
          <p className="text-sm text-slate/60">Operacionais, motoristas e agentes especializados</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setShowPII(!showPII)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate/10 rounded-xl text-sm font-semibold text-slate hover:bg-offwhite transition-all shadow-sm"
          >
            {showPII ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            {showPII ? 'Ocultar PII' : 'Revelar PII'}
          </button>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-primary text-offwhite rounded-xl text-sm font-bold hover:bg-primary/90 transition-all shadow-lg active:scale-95">
            <Plus className="w-5 h-5" />
            Novo Membro
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate/5 overflow-hidden">
        <div className="p-4 border-b border-slate/5 flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate/40" />
            <input 
              type="text" 
              placeholder="Buscar por nome, documento ou parceiro..." 
              className="w-full pl-10 pr-4 py-2 bg-offwhite rounded-lg border-none focus:ring-2 focus:ring-primary/20 text-sm"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate/5 border-b border-slate/10">
                <th className="px-6 py-4 text-[10px] font-bold text-slate/60 uppercase tracking-widest">Profissional</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate/60 uppercase tracking-widest">Função</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate/60 uppercase tracking-widest">Documento (PII)</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate/60 uppercase tracking-widest">Parceiro</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate/60 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate/60 uppercase tracking-widest"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate/5">
              {mockPersonnel.map((person) => (
                <tr key={person.id} className="hover:bg-offwhite/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                        {person.name.charAt(0)}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-charcoal">{person.name}</span>
                        <div className="flex gap-2 mt-0.5">
                           <Phone className="w-3 h-3 text-slate/30" />
                           <Mail className="w-3 h-3 text-slate/30" />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5">
                      {person.role === 'Agent' ? (
                        <ShieldCheck className="w-4 h-4 text-bronze" />
                      ) : (
                        <UserCheck className="w-4 h-4 text-primary" />
                      )}
                      <span className="text-xs font-semibold text-slate">{person.role === 'Agent' ? 'Agente Seg.' : 'Motorista'}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-mono text-slate/60 ${!showPII ? 'mask-pii' : ''}`}>
                      {person.document}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5">
                       <Briefcase className="w-3 h-3 text-slate/30" />
                       <span className="text-xs font-bold text-primary">{person.partner || 'Pinkerton Interno'}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-50 text-green-600 border border-green-100">
                      Disponível
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-slate/40 hover:bg-slate/5 rounded-lg">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Team;
