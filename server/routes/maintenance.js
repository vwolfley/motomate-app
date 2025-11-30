const express = require('express');
const router = express.Router();

const sequenceGenerator = require('./sequenceGenerator');
const Vehicle = require('../models/vehicle');

// GET all vehicles
router.get('/', async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    console.log(vehicles);
    res.status(200).json(vehicles);
  } catch (err) {
    res.status(500).json({
      message: 'An error occurred while fetching vehicles.',
      error: err,
    });
  }
});

module.exports = router;
