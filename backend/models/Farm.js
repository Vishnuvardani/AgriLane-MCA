const mongoose = require('mongoose');

const farmSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  coordinates: {
    lat: Number,
    lng: Number
  },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  produce: [String],
  stock: [{
    item: String,
    quantity: Number,
    unit: String,
    price: Number
  }],
  contact: String,
  status: { type: String, enum: ['active', 'inactive'], default: 'active' }
}, { timestamps: true });

module.exports = mongoose.model('Farm', farmSchema);