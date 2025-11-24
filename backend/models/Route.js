const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema({
  name: String,
  startLocation: {
    name: String,
    coordinates: { lat: Number, lng: Number }
  },
  endLocation: {
    name: String,
    coordinates: { lat: Number, lng: Number }
  },
  waypoints: [{
    name: String,
    coordinates: { lat: Number, lng: Number }
  }],
  distance: Number,
  estimatedTime: Number,
  cost: Number,
  transporter: { type: mongoose.Schema.Types.ObjectId, ref: 'Transporter' },
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
  status: { type: String, enum: ['planned', 'active', 'completed'], default: 'planned' }
}, { timestamps: true });

module.exports = mongoose.model('Route', routeSchema);