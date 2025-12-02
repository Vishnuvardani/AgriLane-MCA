const express = require('express');
const jwt = require('jsonwebtoken');
const Delivery = require('../models/Delivery');
const router = express.Router();

// Get all deliveries or filter by transporterEmail
router.get('/', async (req, res) => {
    try {
        const { transporterEmail } = req.query;
        let query = {};
        
        if (transporterEmail) {
            query.transporterEmail = transporterEmail;
        }
        
        const deliveries = await Delivery.find(query)
            .populate('customer', 'name email')
            .populate('farm', 'name')
            .sort({ createdAt: -1 });
        res.json(deliveries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get user's deliveries
router.get('/my-orders', async (req, res) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) return res.status(401).json({ message: 'No token' });
        
        const decoded = jwt.verify(token, 'secret');
        const deliveries = await Delivery.find({ customer: decoded.user.id })
            .populate('customer', 'name email')
            .populate('farm', 'name')
            .sort({ createdAt: -1 });
        res.json(deliveries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get farm orders
router.get('/farm-orders', async (req, res) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) return res.status(401).json({ message: 'No token' });
        
        const decoded = jwt.verify(token, 'secret');
        const Farm = require('../models/Farm');
        const userFarms = await Farm.find({ owner: decoded.user.id });
        const farmIds = userFarms.map(f => f._id);
        
        const deliveries = await Delivery.find({ farm: { $in: farmIds } })
            .populate('customer', 'name email')
            .populate('farm', 'name')
            .sort({ createdAt: -1 });
        res.json(deliveries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get transporter deliveries
router.get('/transporter-orders', async (req, res) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) return res.status(401).json({ message: 'No token' });
        
        const decoded = jwt.verify(token, 'secret');
        const Transporter = require('../models/Transporter');
        const userTransporters = await Transporter.find({ owner: decoded.user.id });
        const transporterIds = userTransporters.map(t => t._id);
        
        const deliveries = await Delivery.find({ transporter: { $in: transporterIds } })
            .populate('customer', 'name email')
            .populate('farm', 'name')
            .populate('transporter', 'company driver')
            .sort({ createdAt: -1 });
        res.json(deliveries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create delivery
router.post('/', async (req, res) => {
    try {
        const delivery = new Delivery(req.body);
        await delivery.save();
        
        const populatedDelivery = await Delivery.findById(delivery._id)
            .populate('customer', 'name email')
            .populate('farm', 'name');
            
        res.status(201).json(populatedDelivery);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update delivery status
router.put('/:id', async (req, res) => {
    try {
        const delivery = await Delivery.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        ).populate('customer', 'name email').populate('farm', 'name');
        
        if (!delivery) {
            return res.status(404).json({ message: 'Delivery not found' });
        }
        
        res.json(delivery);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;