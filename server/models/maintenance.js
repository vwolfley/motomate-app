const mongoose = require('mongoose');

const maintenanceSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    vehicleId: { type: String, required: true },
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

module.exports = mongoose.model('Maintenance', maintenanceSchema);
