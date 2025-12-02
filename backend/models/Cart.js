const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    farmId: { type: String, required: true },
    productName: { type: String, required: true },
    farmName: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, default: 1 }
});

const cartSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    items: [cartItemSchema],
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Cart', cartSchema);