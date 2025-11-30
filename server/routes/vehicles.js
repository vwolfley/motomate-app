const express = require('express');
const router = express.Router();

const sequenceGenerator = require('./sequenceGenerator');
const Vehicle = require('../models/vehicle');

// GET all vehicles
router.get('/', async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.status(200).json(vehicles);
  } catch (err) {
    res.status(500).json({
      message: 'An error occurred while fetching vehicles.',
      error: err,
    });
  }
});

// POST a new vehicle
router.post('/', async (req, res) => {
  try {
    const maxVehicleId = await sequenceGenerator.nextId('vehicles');

    const vehicle = new Vehicle({
      id: maxVehicleId,
      name: req.body.name,
      description: req.body.description,
      url: req.body.url,
    });

    const createdVehicle = await vehicle.save();

    res.status(201).json({
      message: 'Vehicle added successfully',
      vehicle: createdVehicle,
    });
  } catch (error) {
    res.status(500).json({
      message: 'An error occurred',
      error,
    });
  }
});

// PUT update a vehicle
router.put('/:id', async (req, res) => {
  try {
    const vehicle = await Vehicle.findOne({ id: req.params.id });

    if (!vehicle) {
      return res.status(404).json({
        message: 'Vehicle not found.',
        error: { vehicle: 'Vehicle not found' },
      });
    }

    // Update fields
    vehicle.name = req.body.name;
    vehicle.description = req.body.description;

    await Vehicle.updateOne({ id: req.params.id }, vehicle);

    res.status(204).json({
      message: 'Vehicle updated successfully',
    });
  } catch (error) {
    res.status(500).json({
      message: 'An error occurred',
      error,
    });
  }
});

// DELETE a vehicle
router.delete('/:id', async (req, res) => {
  try {
    const vehicle = await Vehicle.findOne({ id: req.params.id });

    if (!vehicle) {
      return res.status(404).json({
        message: 'Vehicle not found.',
        error: { vehicle: 'Vehicle not found' },
      });
    }

    await Vehicle.deleteOne({ id: req.params.id });

    res.status(204).json({
      message: 'Vehicle deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      message: 'An error occurred',
      error,
    });
  }
});

module.exports = router;
