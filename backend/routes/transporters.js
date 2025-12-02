const express = require('express');
const Transporter = require('../models/Transporter');
const router = express.Router();

// Get all transporters
router.get('/', async (req, res) => {
  try {
    const transporters = await Transporter.find().populate('owner', 'name email');
    res.json(transporters);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get transporter by ID
router.get('/:id', async (req, res) => {
  try {
    const transporter = await Transporter.findById(req.params.id).populate('owner', 'name email');
    if (!transporter) return res.status(404).json({ error: 'Transporter not found' });
    res.json(transporter);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create transporter
router.post('/', async (req, res) => {
  try {
    const transporter = new Transporter(req.body);
    await transporter.save();
    res.status(201).json(transporter);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update transporter
router.put('/:id', async (req, res) => {
  try {
    const transporter = await Transporter.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!transporter) return res.status(404).json({ error: 'Transporter not found' });
    res.json(transporter);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete transporter
router.delete('/:id', async (req, res) => {
  try {
    const transporter = await Transporter.findByIdAndDelete(req.params.id);
    if (!transporter) return res.status(404).json({ error: 'Transporter not found' });
    res.json({ message: 'Transporter deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;