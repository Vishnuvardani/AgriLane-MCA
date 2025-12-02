const express = require('express');
const jwt = require('jsonwebtoken');
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

// Get farms by user
router.get('/my-farms', async (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: 'No token' });
    
    const decoded = jwt.verify(token, 'secret');
    const farms = await Farm.find({ owner: decoded.user.id }).populate('owner', 'name email');
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

// Get farm by ID
router.get('/:id', async (req, res) => {
  try {
    const farm = await Farm.findById(req.params.id).populate('owner', 'name email');
    if (!farm) return res.status(404).json({ error: 'Farm not found' });
    res.json(farm);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update farm
router.put('/:id', async (req, res) => {
  try {
    const farm = await Farm.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!farm) return res.status(404).json({ error: 'Farm not found' });
    res.json(farm);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete farm
router.delete('/:id', async (req, res) => {
  try {
    const farm = await Farm.findByIdAndDelete(req.params.id);
    if (!farm) return res.status(404).json({ error: 'Farm not found' });
    res.json({ message: 'Farm deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;