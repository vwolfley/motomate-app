// vehicle.model.ts

export class PurchaseInfo {
  constructor(
    public purchaseDate: Date,
    public purchasePrice: number,
    public purchaseMileage: number,
    public dealerName: string
  ) {}
}

export class VehicleServiceSpecs {
  constructor(
    public oilType: string,
    public oilWeight: string,
    public oilCapacity: string,
    public oilFilter: string,
    public airFilter: string,
    public cabinAirFilter: string,
    public batteryGroupSize: string,
    public tireSize: string,
    public wiperBladeSizeDriver: string,
    public wiperBladeSizePassenger: string
  ) {}
}
export class LicensePlate {
  constructor(public state: string, public licenseNumber: string) {}
}
export class Vehicle {
  constructor(
    public id: string,
    public year: string,
    public make: string,
    public model: string,
    public trim: string,
    public color: string,
    public bodyStyle: string,
    public fuelType: string,
    public driveType: string,
    public engine: string,
    public transmission: string,
    public mileage: number,
    public vin: string,
    public licensePlate: LicensePlate,
    public description: string,
    public isActive: boolean
  ) {}
}
// public serviceSpecs: VehicleServiceSpecs,
// public purchaseInfo: PurchaseInfo,

// trim: string — e.g., “XLE”, “Sport”, “Limited”
// bodyStyle: string — e.g., “Sedan”, “SUV”, “Truck”
// transmission: string — e.g., “Automatic”, “Manual”
// fuelType: string — e.g., “Gasoline”, “Diesel”, “Electric”, “Hybrid”
// driveType: string — e.g., “FWD”, “RWD”, “AWD”
