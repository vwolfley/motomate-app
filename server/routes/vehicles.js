const express = require('express');
const router = express.Router();

const sequenceGenerator = require('./sequenceGenerator');
const Vehicle = require('../models/vehicle');

// GET all vehicles
router.get('/', async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    // console.log(vehicles);
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
      year: req.body.year,
      make: req.body.make,
      model: req.body.model,
      trim: req.body.trim,
      color: req.body.color,
      bodyStyle: req.body.bodyStyle,
      fuelType: req.body.fuelType,
      driveType: req.body.driveType,
      engine: req.body.engine,
      transmission: req.body.transmission,
      mileage: req.body.mileage,
      vin: req.body.vin,
      licensePlate: req.body.licensePlate,
      description: req.body.description,
      isActive: req.body.isActive,
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
    vehicle.year = req.body.year;
    vehicle.make = req.body.make;
    vehicle.model = req.body.model;
    vehicle.trim = req.body.trim;
    vehicle.color = req.body.color;
    vehicle.bodyStyle = req.body.bodyStyle;
    vehicle.fuelType = req.body.fuelType;
    vehicle.driveType = req.body.driveType;
    vehicle.engine = req.body.engine;
    vehicle.transmission = req.body.transmission;
    vehicle.mileage = req.body.mileage;
    vehicle.vin = req.body.vin;
    vehicle.licensePlate = req.body.licensePlate;
    vehicle.description = req.body.description;
    vehicle.isActive = req.body.isActive;

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
