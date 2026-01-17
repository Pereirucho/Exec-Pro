
import React from 'react';
import { ShieldCheck, History, Clock } from 'lucide-react';
import { mockAudit } from '../utils/mockData';

const AuditLogView: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-primary flex items-center gap-3">
            <History className="text-bronze" />
            Trilha de Auditoria
          </h2>
          <p className="text-sm text-slate/60">Registros imutáveis de todas as operações do sistema</p>
        </div>
        <div className="flex items-center gap-2 p-3 bg-green-50 text-green-700 rounded-xl border border-green-100 shadow-sm">
          <ShieldCheck className="w-4 h-4" />
          <span className="text-xs font-bold uppercase tracking-widest">Logs Criptografados</span>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate/5 overflow-hidden">
        <div className="p-6 border-b border-slate/5 bg-slate/5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <input type="date" className="bg-white border border-slate/10 text-xs p-2 rounded-lg outline-none" />
            <span className="text-slate/40 text-xs">até</span>
            <input type="date" className="bg-white border border-slate/10 text-xs p-2 rounded-lg outline-none" />
          </div>
          <button className="text-xs font-bold text-primary hover:underline">Limpar Filtros</button>
        </div>
        
        <div className="divide-y divide-slate/5">
          {mockAudit.map((log) => (
            <div key={log.id} className="p-6 hover:bg-offwhite/30 transition-colors flex gap-6 items-start">
               <div className="p-3 bg-slate/5 rounded-xl">
                 <Clock className="w-5 h-5 text-slate/40" />
               </div>
               <div className="flex-1">
                 <div className="flex justify-between items-start">
                    <h4 className="font-bold text-charcoal">{log.action}</h4>
                    <span className="text-[10px] text-slate/40 font-medium">{new Date(log.timestamp).toLocaleString()}</span>
                 </div>
                 <p className="text-sm text-slate/60 mt-1">{log.details}</p>
                 <div className="flex items-center gap-2 mt-3">
                   <div className="w-5 h-5 bg-primary text-offwhite text-[8px] font-bold rounded-full flex items-center justify-center">U</div>
                   <span className="text-xs font-bold text-primary">{log.userId}</span>
                   <span className="text-[10px] text-slate/40 uppercase tracking-widest ml-auto font-bold">SHA-256 HASH VERIFIED</span>
                 </div>
               </div>
            </div>
          ))}
        </div>

        <div className="p-6 text-center border-t border-slate/5">
          <button className="text-sm font-bold text-slate/60 hover:text-primary transition-colors">Carregar logs mais antigos</button>
        </div>
      </div>
    </div>
  );
};

export default AuditLogView;
