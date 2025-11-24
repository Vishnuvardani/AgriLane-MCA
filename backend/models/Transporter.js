const mongoose = require('mongoose');

const transporterSchema = new mongoose.Schema({
  company: { type: String, required: true },
  driver: { type: String, required: true },
  vehicleType: String,
  capacity: Number,
  licensePlate: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  contact: String,
  currentLoad: { type: Number, default: 0 },
  status: { type: String, enum: ['available', 'busy', 'maintenance'], default: 'available' },
  location: {
    lat: Number,
    lng: Number
  },
  rating: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Transporter', transporterSchema);