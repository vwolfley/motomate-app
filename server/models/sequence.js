const mongoose = require('mongoose');

const sequenceSchema = mongoose.Schema({
  maxVehicleId: { type: Number },
  maxMaintenanceId: { type: Number },
});

module.exports = mongoose.model('Sequence', sequenceSchema);
