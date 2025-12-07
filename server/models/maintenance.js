const mongoose = require('mongoose');

const maintenanceSchema = new mongoose.Schema(
  {
    id: { type: String },
    vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle' },
    type: { type: String },
    action: { type: String },
    datePerformed: { type: Date },
    mileage: { type: Number },
    partsReplaced: [
      {
        name: { type: String },
        quantity: { type: Number },
        cost: { type: Number },
      },
    ],
    totalCost: { type: Number },
    notes: { type: String },
  }
);

module.exports = mongoose.model('Maintenance', maintenanceSchema);
