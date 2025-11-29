// vehicle.model.ts

export class LicensePlate {
  constructor(public state: string, public licenseNumber: string) {}
}

export class PurchaseInfo {
  constructor(
    public purchaseDate: Date,
    public purchasePrice: number,
    public purchaseMileage: number,
    public dealerName: string
  ) {}
}

export class Vehicle {
  constructor(
    public id: string,
    public year: string,
    public make: string,
    public model: string,
    public trim: string,
    public bodyStyle: string,
    public transmission: string,
    public fuelType: string,
    public driveType: string,
    public engine: string,
    public vin: string,
    public mileage: number,
    public color: string,
    public description: string,
    public licensePlate: LicensePlate,
    public purchaseInfo: PurchaseInfo,
    public isActive: boolean
  ) {}
}

// trim: string — e.g., “XLE”, “Sport”, “Limited”
// bodyStyle: string — e.g., “Sedan”, “SUV”, “Truck”
// transmission: string — e.g., “Automatic”, “Manual”
// fuelType: string — e.g., “Gasoline”, “Diesel”, “Electric”, “Hybrid”
// driveType: string — e.g., “FWD”, “RWD”, “AWD”
