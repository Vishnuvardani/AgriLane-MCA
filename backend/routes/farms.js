const express = require('express');
const Farm = require('../models/Farm');
const router = express.Router();

// Get all farms
router.get('/', async (req, res) => {
  try {
    const farms = await Farm.find().populate('owner', 'name email');
    res.json(farms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create farm
router.post('/', async (req, res) => {
  try {
    const farm = new Farm(req.body);
    await farm.save();
    res.status(201).json(farm);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update farm
router.put('/:id', async (req, res) => {
  try {
    const farm = await Farm.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(farm);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;