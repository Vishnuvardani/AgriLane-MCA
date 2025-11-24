const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  farm: { type: mongoose.Schema.Types.ObjectId, ref: 'Farm', required: true },
  items: [{
    product: String,
    quantity: Number,
    price: Number
  }],
  totalAmount: Number,
  deliveryAddress: String,
  deliveryDate: Date,
  deliveryMethod: { type: String, enum: ['transporter', 'pickup'] },
  transporter: { type: mongoose.Schema.Types.ObjectId, ref: 'Transporter' },
  status: { type: String, enum: ['pending', 'confirmed', 'in-transit', 'delivered', 'cancelled'], default: 'pending' }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);