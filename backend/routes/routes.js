const express = require('express');
const Route = require('../models/Route');
const router = express.Router();

// Get all routes
router.get('/', async (req, res) => {
  try {
    const routes = await Route.find()
      .populate('transporter', 'company driver')
      .populate('orders');
    res.json(routes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create route
router.post('/', async (req, res) => {
  try {
    const route = new Route(req.body);
    await route.save();
    res.status(201).json(route);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;