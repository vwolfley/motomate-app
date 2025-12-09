const express = require('express');
const router = express.Router();

const sequenceGenerator = require('./sequenceGenerator');
const Maintenance = require('../models/maintenance');

// GET all maintenance records
router.get('/', async (req, res) => {
  try {
    const maintenanceRecords = await Maintenance.find().populate('vehicleId');
    // console.log(maintenanceRecords);
    res.status(200).json(maintenanceRecords);
  } catch (err) {
    res.status(500).json({
      message: 'An error occurred while fetching maintenance records.',
      error: err,
    });
  }
});

// POST a new maintenance record
router.post('/', async (req, res) => {
  try {
    const maxMaintenanceId = await sequenceGenerator.nextId('maintenance');

    const maintenance = new Maintenance({
      id: maxMaintenanceId,
      vehicleId: req.body.vehicleId,
      type: req.body.type,
      action: req.body.action,
      datePerformed: req.body.datePerformed,
      mileage: req.body.mileage,
      partsReplaced: req.body.partsReplaced,
      totalCost: req.body.totalCost,
      notes: req.body.notes,
    });
    const createdMaintenance = await maintenance.save();

    res.status(201).json({
      message: 'Maintenance record added successfully',
      maintenance: createdMaintenance,
    });
  } catch (error) {
    res.status(500).json({
      message: 'An error occurred',
      error,
    });
  }
});

// PUT update a maintenance record
router.put('/:id', async (req, res) => {
  try {
    const maintenance = await Maintenance.findOne({ id: req.params.id });

    if (!maintenance) {
      return res.status(404).json({
        message: 'Maintenance record not found.',
        error: { maintenance: 'Maintenance record not found' },
      });
    }

    // Update fields
    maintenance.vehicleId = req.body.vehicleId;
    maintenance.type = req.body.type;
    maintenance.action = req.body.action;
    maintenance.datePerformed = req.body.datePerformed;
    maintenance.mileage = req.body.mileage;
    maintenance.partsReplaced = req.body.partsReplaced;
    maintenance.totalCost = req.body.totalCost;
    maintenance.notes = req.body.notes;

    await Maintenance.updateOne({ id: req.params.id }, maintenance);

    res.status(204).json({
      message: 'Maintenance record updated successfully',
    });
  } catch (error) {
    res.status(500).json({
      message: 'An error occurred',
      error,
    });
  }
});

// DELETE a maintenance record
router.delete('/:id', async (req, res) => {
  try {
    const maintenance = await Maintenance.findOne({ id: req.params.id });

    if (!maintenance) {
      return res.status(404).json({
        message: 'Maintenance record not found.',
        error: { maintenance: 'Maintenance record not found' },
      });
    }

    await Maintenance.deleteOne({ id: req.params.id });
    res.status(204).json({
      message: 'Maintenance record deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      message: 'An error occurred',
      error,
    });
  }
});

module.exports = router;
