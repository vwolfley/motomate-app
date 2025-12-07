const mongoose = require('mongoose');

const licensePlateSchema = new mongoose.Schema(
  {
    state: { type: String },
    licenseNumber: { type: String },
  },
  { _id: false }
);

const purchaseInfoSchema = new mongoose.Schema(
  {
    purchaseDate: { type: Date },
    purchasePrice: { type: Number },
    purchaseMileage: { type: Number },
    dealerName: { type: String },
  },
  { _id: false }
);

const vehicleServiceSpecsSchema = new mongoose.Schema(
  {
    oilType: { type: String },
    oilWeight: { type: String },
    oilCapacity: { type: String },
    oilFilter: { type: String },
    airFilter: { type: String },
    cabinAirFilter: { type: String },
    batteryGroupSize: { type: String },
    tireSize: { type: String },
    wiperBladeSizeDriver: { type: String },
    wiperBladeSizePassenger: { type: String },
  },
);

const vehicleSchema = new mongoose.Schema(
  {
    id: { type: String, required: true }, // Or use mongoose.Types.ObjectId if preferred
    year: { type: String, required: true },
    make: { type: String, required: true },
    model: { type: String, required: true },
    trim: { type: String },
    bodyStyle: { type: String },
    color: { type: String },
    fuelType: { type: String },
    driveType: { type: String },
    engine: { type: String },
    transmission: { type: String },
    vin: { type: String },
    mileage: { type: Number, required: true },
    description: { type: String },
    serviceSpecs: { type: vehicleServiceSpecsSchema },
    licensePlate: { type: licensePlateSchema },
    purchaseInfo: { type: purchaseInfoSchema },
    isActive: { type: Boolean, default: true },
  },
  {
    toJSON: {
      versionKey: false, // removes __v
      transform: function (doc, ret) {
        delete ret._id; // removes _id
      },
    },
  }
);

module.exports = mongoose.model('Vehicle', vehicleSchema);
