const mongoose = require('mongoose');

const maintenanceSchema = new mongoose.Schema(
  {
    state: { type: String },
    licenseNumber: { type: String },
  },
  { _id: false }
);

module.exports = mongoose.model('Maintenance', maintenanceSchema);
