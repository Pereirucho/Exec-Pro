
export type ServiceType = 'Transfer' | 'Daily';
export type VehicleType = 'Sedan' | 'SUV' | 'Minivan' | 'Van';
export type ArmorType = 'Conventional' | 'Armored';
export type CaseStatus = 'Pending' | 'In Progress' | 'Completed' | 'Cancelled';
export type PaymentMethod = 'PO' | 'Credit Card';

export interface Vehicle {
  id: string;
  model: string;
  type: VehicleType;
  armor: ArmorType;
  plate: string;
  partner: string;
  status: 'Available' | 'On Mission' | 'Maintenance';
}

export interface Personnel {
  id: string;
  name: string;
  role: 'Driver' | 'Agent';
  document: string;
  partner: string;
  status: 'Available' | 'On Mission' | 'Off Duty';
}

export interface Case {
  id: string;
  projectNumber: string;
  clientName: string;
  service: ServiceType;
  vehicleId: string;
  driverId: string;
  agentId: string;
  hasAgent: boolean;
  startDateTime: string;
  endDateTime: string;
  country: string;
  cities: string[];
  city: string;
  hotel?: string;
  agenda?: string;
  paymentMethod: PaymentMethod;
  cardType?: string;
  passengerEmail: string;
  passengerPhone: string;
  cost: number;
  revenue: number;
  status: CaseStatus;
  notes?: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  userId: string;
  action: string;
  details: string;
}

export interface Translation {
  [key: string]: {
    [lang: string]: string;
  };
}

export interface AppSettings {
  lang: 'pt' | 'es';
  darkMode: boolean;
  piiTimeout: number; // minutes
  outlookSync: boolean;
  dashboard: {
    showMetrics: boolean;
    showVolatility: boolean;
    showAgenda: boolean;
    activeMetrics: string[]; // ['cases', 'revenue', 'drivers', 'alerts']
  };
}
