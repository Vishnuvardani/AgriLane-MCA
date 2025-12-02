const express = require('express');
const Cart = require('../models/Cart');
const router = express.Router();

// Get user cart
router.get('/:userId', async (req, res) => {
    try {
        console.log(`🔍 Getting cart for user: ${req.params.userId}`);
        const cart = await Cart.findOne({ userId: req.params.userId });
        const result = cart || { items: [] };
        console.log(`🛒 Cart found with ${result.items?.length || 0} items`);
        res.json(result);
    } catch (error) {
        console.error('❌ Cart get error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Update cart
router.put('/:userId', async (req, res) => {
    try {
        const cart = await Cart.findOneAndUpdate(
            { userId: req.params.userId },
            { items: req.body.items, updatedAt: new Date() },
            { upsert: true, new: true }
        );
        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add item to cart
router.post('/:userId/add', async (req, res) => {
    try {
        console.log(`🛒 Adding item to cart for user: ${req.params.userId}`);
        console.log('Item data:', req.body);
        
        let cart = await Cart.findOne({ userId: req.params.userId });
        
        if (!cart) {
            cart = new Cart({ userId: req.params.userId, items: [] });
            console.log('🆕 Created new cart for user');
        }
        
        const existingItem = cart.items.find(item => 
            item.farmId === req.body.farmId && item.productName === req.body.productName
        );
        
        if (existingItem) {
            existingItem.quantity += req.body.quantity || 1;
            console.log(`➕ Updated existing item quantity: ${existingItem.quantity}`);
        } else {
            cart.items.push({
                farmId: req.body.farmId,
                productName: req.body.productName,
                farmName: req.body.farmName,
                price: req.body.price,
                quantity: req.body.quantity || 1
            });
            console.log('➕ Added new item to cart');
        }
        
        cart.updatedAt = new Date();
        await cart.save();
        console.log(`✅ Cart saved successfully. Total items: ${cart.items.length}`);
        res.json(cart);
    } catch (error) {
        console.error('❌ Cart add error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Clear cart
router.delete('/:userId', async (req, res) => {
    try {
        await Cart.findOneAndUpdate(
            { userId: req.params.userId },
            { items: [], updatedAt: new Date() },
            { upsert: true }
        );
        res.json({ message: 'Cart cleared' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;