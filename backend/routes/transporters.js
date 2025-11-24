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

module.exports = router;