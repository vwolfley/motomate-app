const mongoose = require('mongoose');
const { max } = require('rxjs');

const sequenceSchema = mongoose.Schema({
  maxVehicleId: { type: Number },
});

module.exports = mongoose.model('Sequence', sequenceSchema);
