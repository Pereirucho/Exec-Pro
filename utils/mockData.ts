
import { Case, Vehicle, Personnel, AuditLog } from '../types';

export const mockVehicles: Vehicle[] = [
  { id: 'v1', model: 'Toyota Corolla', type: 'Sedan', armor: 'Conventional', plate: 'ABC-1234' },
  { id: 'v2', model: 'Chevrolet Suburban', type: 'SUV', armor: 'Armored', plate: 'SEC-001' },
  { id: 'v3', model: 'Mercedes Sprinter', type: 'Van', armor: 'Conventional', plate: 'TRN-999' },
  { id: 'v4', model: 'Volvo XC90', type: 'SUV', armor: 'Armored', plate: 'PRO-101' },
];

export const mockPersonnel: Personnel[] = [
  { id: 'p1', name: 'João Silva', role: 'Driver', document: '123.456.789-00' },
  { id: 'p2', name: 'Carlos Mendez', role: 'Driver', document: '987.654.321-11' },
  { id: 'p3', name: 'Ricardo Santos', role: 'Agent', document: '555.444.333-22' },
  { id: 'p4', name: 'Elena Gomez', role: 'Agent', document: '111.222.333-44' },
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
    startDateTime: '2024-06-15T08:00',
    endDateTime: '2024-06-16T18:00',
    country: 'Brasil',
    city: 'São Paulo',
    cost: 1200.00,
    revenue: 2500.00,
    status: 'In Progress'
  },
  {
    id: 'c2',
    projectNumber: 'EP-10024',
    clientName: 'Tech Summit VIP',
    service: 'Transfer',
    vehicleId: 'v4',
    driverId: 'p2',
    agentId: 'p4',
    startDateTime: '2024-06-16T14:00',
    endDateTime: '2024-06-16T16:00',
    country: 'México',
    city: 'Ciudad de México',
    cost: 450.00,
    revenue: 900.00,
    status: 'Pending'
  }
];

export const mockAudit: AuditLog[] = [
  { id: 'a1', timestamp: new Date().toISOString(), userId: 'Admin', action: 'CREATE_CASE', details: 'Novo caso EP-10024 criado.' },
  { id: 'a2', timestamp: new Date().toISOString(), userId: 'Manager', action: 'VIEW_PII', details: 'Documento do motorista p1 acessado.' }
];
