const mongoose = require('mongoose');

const DeliverySchema = new mongoose.Schema({
    orderId: {
        type: String,
        required: true,
        unique: true
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    farm: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Farm',
        required: true
    },
    transporter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Transporter'
    },
    items: [{
        produce: String,
        quantity: Number,
        unit: String,
        price: Number
    }],
    pickup: {
        address: String,
        coordinates: {
            lat: Number,
            lng: Number
        }
    },
    delivery: {
        address: String,
        coordinates: {
            lat: Number,
            lng: Number
        },
        preferredTime: String,
        phone: String,
        notes: String
    },
    status: {
        type: String,
        enum: ['pending', 'assigned', 'confirmed', 'in-transit', 'delivered', 'cancelled'],
        default: 'pending'
    },
    totalAmount: {
        type: Number,
        required: true
    },
    paymentMethod: String,
    paymentStatus: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending'
    },
    tax: Number,
    shipping: Number
}, {
    timestamps: true
});

module.exports = mongoose.model('Delivery', DeliverySchema);