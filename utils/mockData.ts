
import { Case, Vehicle, Personnel, AuditLog } from '../types';

// Helper to create dates relative to now
const getRelativeDate = (hoursAhead: number) => {
  const d = new Date();
  d.setHours(d.getHours() + hoursAhead);
  return d.toISOString();
};

export const mockVehicles: Vehicle[] = [
  { id: 'v1', model: 'Toyota Corolla', type: 'Sedan', armor: 'Conventional', plate: 'ABC-1234', partner: 'Localiza Corp', status: 'Available' },
  { id: 'v2', model: 'Chevrolet Suburban', type: 'SUV', armor: 'Armored', plate: 'SEC-001', partner: 'Pinkerton Global', status: 'On Mission' },
  { id: 'v3', model: 'Mercedes Sprinter', type: 'Van', armor: 'Conventional', plate: 'TRN-999', partner: 'Hertz Exec', status: 'Available' },
  { id: 'v4', model: 'Volvo XC90', type: 'SUV', armor: 'Armored', plate: 'PRO-101', partner: 'Guardian Logistics', status: 'Maintenance' },
];

export const mockPersonnel: Personnel[] = [
  { id: 'p1', name: 'João Silva', role: 'Driver', document: '123.456.789-00', partner: 'Pinkerton Internal', status: 'Available' },
  { id: 'p2', name: 'Carlos Mendez', role: 'Driver', document: '987.654.321-11', partner: 'Mendez Transp', status: 'On Mission' },
  { id: 'p3', name: 'Ricardo Santos', role: 'Agent', document: '555.444.333-22', partner: 'Pinkerton Security', status: 'Available' },
  { id: 'p4', name: 'Elena Gomez', role: 'Agent', document: '111.222.333-44', partner: 'Elite Guard', status: 'Available' },
];

export const mockCases: Case[] = [
  {
    id: 'c1',
    projectNumber: 'EP-10023',
    clientName: 'Global Corp CEO',
    service: 'Daily',
    vehicleId: 'v2',
    driverId: 'p1',
    agentId: 'p3',
    hasAgent: true,
    startDateTime: getRelativeDate(1.5), // Iminente (daqui a 1.5 horas)
    endDateTime: getRelativeDate(12),
    country: 'Brasil',
    cities: ['São Paulo'],
    city: 'São Paulo',
    paymentMethod: 'PO',
    passengerEmail: 'ceo@globalcorp.com',
    passengerPhone: '+55 11 99999-9999',
    cost: 1200.00,
    revenue: 2500.00,
    status: 'In Progress'
  },
  {
    id: 'c2',
    projectNumber: 'EP-10024',
    clientName: 'Tech Venture Partner',
    service: 'Transfer',
    vehicleId: 'v1',
    driverId: 'p2',
    agentId: '',
    hasAgent: false,
    startDateTime: getRelativeDate(4), // Fora do range de iminência
    endDateTime: getRelativeDate(6),
    country: 'Brasil',
    cities: ['Rio de Janeiro'],
    city: 'GIG Airport',
    paymentMethod: 'Credit Card',
    cardType: 'Visa',
    passengerEmail: 'partner@techv.com',
    passengerPhone: '+55 21 98888-7777',
    cost: 300.00,
    revenue: 850.00,
    status: 'Pending'
  },
  {
    id: 'c3',
    projectNumber: 'EP-10025',
    clientName: 'WBC Executive',
    service: 'Daily',
    vehicleId: 'v4',
    driverId: 'p1',
    agentId: 'p4',
    hasAgent: true,
    startDateTime: getRelativeDate(0.5), // Iminente (daqui a 30 mins)
    endDateTime: getRelativeDate(8),
    country: 'México',
    cities: ['CDMX'],
    city: 'Polanco',
    paymentMethod: 'PO',
    passengerEmail: 'exec@wbc.mx',
    passengerPhone: '+52 55 1234 5678',
    cost: 1500.00,
    revenue: 3200.00,
    status: 'Pending'
  }
];

export const mockAudit: AuditLog[] = [
  { id: 'a1', timestamp: new Date().toISOString(), userId: 'Admin', action: 'CREATE_CASE', details: 'Novo caso EP-10024 criado.' },
  { id: 'a2', timestamp: new Date().toISOString(), userId: 'Manager', action: 'VIEW_PII', details: 'Documento do motorista p1 acessado.' }
];
