const express = require('express');
const router = express.Router();

const sequenceGenerator = require('./sequenceGenerator');
const Maintenance = require('../models/maintenance');

// GET all maintenance records
router.get('/', async (req, res) => {
  try {
    const maintenanceRecords = await Maintenance.find().populate('vehicleId');
    console.log(maintenanceRecords);
    res.status(200).json(maintenanceRecords);
  } catch (err) {
    res.status(500).json({
      message: 'An error occurred while fetching maintenance records.',
      error: err,
    });
  }
});

module.exports = router;
