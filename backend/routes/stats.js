const express = require('express');
const User = require('../models/User');
const Farm = require('../models/Farm');
const Transporter = require('../models/Transporter');
const Order = require('../models/Order');
const Delivery = require('../models/Delivery');
const Route = require('../models/Route');
const router = express.Router();

// Get all counts
router.get('/', async (req, res) => {
  try {
    const stats = {
      totalUsers: await User.countDocuments(),
      totalFarms: await Farm.countDocuments(),
      totalTransporters: await Transporter.countDocuments(),
      totalOrders: await Order.countDocuments(),
      totalDeliveries: await Delivery.countDocuments(),
      totalRoutes: await Route.countDocuments(),
      deliveredOrders: await Delivery.countDocuments({ status: 'delivered' }),
      pendingOrders: await Delivery.countDocuments({ status: 'pending' }),
      inProgressOrders: await Delivery.countDocuments({ status: 'in-transit' }),
      confirmedOrders: await Delivery.countDocuments({ status: 'confirmed' }),
      activeTransporters: await Transporter.countDocuments({ status: 'available' })
    };
    
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;