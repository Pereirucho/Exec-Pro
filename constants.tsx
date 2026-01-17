
import { Translation } from './types';

export const TRANSLATIONS: Translation = {
  dashboard: { pt: 'Painel de Controle', es: 'Panel de Control' },
  operations: { pt: 'Operações', es: 'Operaciones' },
  fleet: { pt: 'Frota', es: 'Flota' },
  team: { pt: 'Equipe', es: 'Equipo' },
  audit: { pt: 'Auditoria', es: 'Auditoría' },
  settings: { pt: 'Configurações', es: 'Configuración' },
  newCase: { pt: 'Novo Caso', es: 'Nuevo Caso' },
  editCase: { pt: 'Editar Caso', es: 'Editar Caso' },
  delete: { pt: 'Excluir', es: 'Eliminar' },
  activeCases: { pt: 'Casos Ativos', es: 'Casos Activos' },
  revenue: { pt: 'Receita', es: 'Ingresos' },
  cost: { pt: 'Custo', es: 'Costo' },
  status: { pt: 'Status', es: 'Estado' },
  service: { pt: 'Serviço', es: 'Servicio' },
  vehicle: { pt: 'Veículo', es: 'Vehículo' },
  driver: { pt: 'Motorista', es: 'Conductor' },
  agent: { pt: 'Agente', es: 'Agente' },
  country: { pt: 'País', es: 'País' },
  city: { pt: 'Cidade', es: 'Ciudad' },
  date: { pt: 'Data', es: 'Fecha' },
  save: { pt: 'Salvar', es: 'Guardar' },
  cancel: { pt: 'Cancelar', es: 'Cancelar' },
};

export const COUNTRIES = [
  { name: 'Brasil', code: 'BR', currency: 'BRL', flag: '🇧🇷' },
  { name: 'México', code: 'MX', currency: 'MXN', flag: '🇲🇽' },
  { name: 'Argentina', code: 'AR', currency: 'ARS', flag: '🇦🇷' },
  { name: 'Colômbia', code: 'CO', currency: 'COP', flag: '🇨🇴' },
  { name: 'Chile', code: 'CL', currency: 'CLP', flag: '🇨🇱' },
  { name: 'Peru', code: 'PE', currency: 'PEN', flag: '🇵🇪' },
];

export const VEHICLE_TYPES = ['Sedan', 'SUV', 'Minivan', 'Van'];
export const ARMOR_TYPES = ['Conventional', 'Armored'];
export const SERVICE_TYPES = ['Transfer', 'Daily'];
export const STATUS_TYPES = ['Pending', 'In Progress', 'Completed', 'Cancelled'];
export const PAYMENT_METHODS = ['PO', 'Credit Card'];
export const CARD_TYPES = ['Visa', 'Mastercard', 'Amex', 'Diners'];
