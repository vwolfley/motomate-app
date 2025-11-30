const mongoose = require('mongoose');

const licensePlateSchema = new mongoose.Schema({
  state: { type: String, required: true },
  licenseNumber: { type: String, required: true },
});

const purchaseInfoSchema = new mongoose.Schema({
  purchaseDate: { type: Date, required: true },
  purchasePrice: { type: Number, required: true },
  purchaseMileage: { type: Number, required: true },
  dealerName: { type: String, required: true },
});

const vehicleSchema = new mongoose.Schema({
  id: { type: String, required: true }, // Or use mongoose.Types.ObjectId if preferred
  year: { type: String, required: true },
  make: { type: String, required: true },
  model: { type: String, required: true },
  trim: { type: String },
  bodyStyle: { type: String },
  transmission: { type: String },
  fuelType: { type: String },
  driveType: { type: String },
  engine: { type: String },
  vin: { type: String, required: true },
  mileage: { type: Number, required: true },
  color: { type: String },
  description: { type: String },

  licensePlate: { type: licensePlateSchema, required: true },
  purchaseInfo: { type: purchaseInfoSchema, required: true },

  isActive: { type: Boolean, default: true },
});

module.exports = mongoose.model('Vehicle', vehicleSchema);
