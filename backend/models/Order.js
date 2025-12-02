const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  customer: {
    id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true }
  },
  deliveryAddress: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    pincode: { type: String, required: true }
  },
  deliveryDate: { type: String, required: true },
  items: [{
    farmId: { type: String },
    productName: { type: String, required: true },
    farmName: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }
  }],
  subtotal: { type: Number, required: true },
  deliveryCharges: { type: Number, default: 30 },
  tax: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
  invoiceNumber: { type: String },
  paymentMethod: { type: String },
  paymentStatus: { type: String, enum: ['pending', 'paid'], default: 'pending' },
  transactionId: { type: String },
  status: { type: String, enum: ['pending', 'confirmed', 'in-transit', 'delivered', 'cancelled'], default: 'pending' },
  orderDate: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);