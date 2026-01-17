
export type ServiceType = 'Transfer' | 'Daily';
export type VehicleType = 'Sedan' | 'SUV' | 'Minivan' | 'Van';
export type ArmorType = 'Conventional' | 'Armored';
export type CaseStatus = 'Pending' | 'In Progress' | 'Completed' | 'Cancelled';

export interface Vehicle {
  id: string;
  model: string;
  type: VehicleType;
  armor: ArmorType;
  plate: string;
}

export interface Personnel {
  id: string;
  name: string;
  role: 'Driver' | 'Agent';
  document: string; // PII
}

export interface Case {
  id: string;
  projectNumber: string;
  clientName: string;
  service: ServiceType;
  vehicleId: string;
  driverId: string;
  agentId: string;
  startDateTime: string;
  endDateTime: string;
  country: string;
  city: string;
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
