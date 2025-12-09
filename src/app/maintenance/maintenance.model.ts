import { Vehicle } from "../vehicles/vehicle.model";

export class MaintenanceRecord {
  constructor(
    public id: string, // unique id for this record
    public vehicleId: Vehicle | string, // which vehicle this maintenance belongs to
    public type: MaintenanceType | string, // linked to enum
    public action: string, // description of the maintenance action
    public datePerformed: Date, // when it was done
    public mileage: number, // vehicle mileage at the time
    public partsReplaced?: ReplacedPart[], // optional list of parts
    public totalCost?: number, // total cost of service
    public notes?: string, // optional notes or details
  ) {}
}

export enum MaintenanceType {
  OilChange = 'Oil Change',
  BrakeChange = 'Brake Change',
  TireRotation = 'Tire Rotation',
  NewTires = 'New Tires',
  BatteryReplacement = 'Battery Replacement',
  AlternatorReplacement = 'Alternator Replacement',
  StarterReplacement = 'Starter Replacement',
  SparkPlugs = 'Spark Plugs Replacement',
  AirFilter = 'Air Filter Replacement',
  CabinFilter = 'Cabin Filter Replacement',
  WheelAlignment = 'Wheel Alignment',
  FluidCheck = 'Fluid Check/Top-off',
  FuelFilerReplacement = 'Fuel Filter Replacement',
  BeltsAndHoses = 'Belts and Hoses Replacement',
  TransmissionService = 'Transmission Service',
  CoolantFlush = 'Coolant Flush',
  ACService = 'A/C Service',
  WindshieldWipers = 'Windshield Wipers Replacement',
  WindshieldRepair = 'Windshield Repair/Replacement',
  Other = 'Other',
}

// model for a part replaced
export class ReplacedPart {
  constructor(
    public name: string, // e.g., "Brake Pads"
    public quantity: number, // e.g., 4
    public cost: number // cost for this part
  ) {}
}

//  model for an attachment
export class Attachment {
  constructor(
    public fileName: string,
    public url: string, // URL or local path
    public description?: string
  ) {}
}

// export class MaintenanceRecord {
//   constructor(
//     public id: string, // unique id for this record
//     public vehicleId: string, // which vehicle this maintenance belongs to
//     public type: MaintenanceType, // linked to enum
//     public datePerformed: Date, // when it was done
//     public mileage: number, // vehicle mileage at the time
//     public serviceCenter?: string, // optional, where it was done
//     public notes?: string, // optional notes or details
//     public nextDueDate?: Date, // optional: when it’s next due
//     public nextDueMileage?: number, // optional: mileage for next service
//     public partsReplaced?: ReplacedPart[], // optional list of parts
//     public totalCost?: number, // total cost of service
//     public reminders?: {
//       // optional reminders
//       date?: Date;
//       mileage?: number;
//     },
//     public attachments?: Attachment[] // optional receipts/photos
//   ) {}
// }
