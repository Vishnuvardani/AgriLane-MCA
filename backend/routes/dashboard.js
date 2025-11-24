const express = require('express');
const User = require('../models/User');
const Farm = require('../models/Farm');
const Transporter = require('../models/Transporter');
const Order = require('../models/Order');
const router = express.Router();

// Get dashboard data based on user role
router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    let dashboardData = {};

    switch(user.role) {
      case 'admin':
        dashboardData = {
          farms: await Farm.find().populate('owner', 'name'),
          transporters: await Transporter.find().populate('owner', 'name'),
          orders: await Order.find().populate('customer farm transporter'),
          totalUsers: await User.countDocuments()
        };
        break;
      case 'farmer':
        dashboardData = {
          farms: await Farm.find({ owner: user._id }),
          orders: await Order.find().populate('farm').where('farm').in(await Farm.find({ owner: user._id }).select('_id'))
        };
        break;
      case 'transporter':
        dashboardData = {
          transporters: await Transporter.find({ owner: user._id }),
          orders: await Order.find({ transporter: { $in: await Transporter.find({ owner: user._id }).select('_id') } })
        };
        break;
      case 'customer':
        dashboardData = {
          farms: await Farm.find({ status: 'active' }),
          orders: await Order.find({ customer: user._id }).populate('farm transporter')
        };
        break;
    }

    res.json(dashboardData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;