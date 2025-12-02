const express = require('express');
const Transaction = require('../models/Transaction');
const router = express.Router();

// Create transaction
router.post('/', async (req, res) => {
    try {
        const transaction = new Transaction(req.body);
        await transaction.save();
        res.status(201).json(transaction);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get transactions by customer
router.get('/customer/:customerId', async (req, res) => {
    try {
        const transactions = await Transaction.find({ customerId: req.params.customerId })
            .sort({ createdAt: -1 });
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get transaction by order ID
router.get('/order/:orderId', async (req, res) => {
    try {
        const transaction = await Transaction.findOne({ orderId: req.params.orderId });
        res.json(transaction);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update transaction status
router.put('/:id/status', async (req, res) => {
    try {
        const transaction = await Transaction.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        );
        res.json(transaction);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;