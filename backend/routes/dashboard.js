const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Farm = require('../models/Farm');
const Delivery = require('../models/Delivery');
const Transporter = require('../models/Transporter');
const router = express.Router();

// Get dashboard stats
router.get('/stats', async (req, res) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) return res.status(401).json({ message: 'No token' });
        
        const decoded = jwt.verify(token, 'secret');
        const user = await User.findById(decoded.user.id);
        
        let stats = {};
        
        if (user.role === 'admin') {
            stats = {
                totalUsers: await User.countDocuments(),
                totalFarms: await Farm.countDocuments(),
                totalDeliveries: await Delivery.countDocuments(),
                totalRevenue: await Delivery.aggregate([
                    { $group: { _id: null, total: { $sum: '$totalAmount' } } }
                ]).then(result => result[0]?.total || 0)
            };
        } else if (user.role === 'farmer') {
            const userFarms = await Farm.find({ owner: decoded.user.id });
            const farmIds = userFarms.map(f => f._id);
            
            stats = {
                myFarms: userFarms.length,
                totalOrders: await Delivery.countDocuments({ farm: { $in: farmIds } }),
                pendingOrders: await Delivery.countDocuments({ 
                    farm: { $in: farmIds }, 
                    status: 'pending' 
                }),
                revenue: await Delivery.aggregate([
                    { $match: { farm: { $in: farmIds } } },
                    { $group: { _id: null, total: { $sum: '$totalAmount' } } }
                ]).then(result => result[0]?.total || 0)
            };
        } else if (user.role === 'customer') {
            stats = {
                myOrders: await Delivery.countDocuments({ customer: decoded.user.id }),
                activeOrders: await Delivery.countDocuments({ 
                    customer: decoded.user.id, 
                    status: { $in: ['pending', 'confirmed', 'in-transit'] }
                }),
                completedOrders: await Delivery.countDocuments({ 
                    customer: decoded.user.id, 
                    status: 'delivered' 
                }),
                totalSpent: await Delivery.aggregate([
                    { $match: { customer: decoded.user.id } },
                    { $group: { _id: null, total: { $sum: '$totalAmount' } } }
                ]).then(result => result[0]?.total || 0)
            };
        }
        
        res.json(stats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;