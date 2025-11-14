const mongoose = require('mongoose');

const petrolPumpSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String },
  contactNumber: { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

module.exports = mongoose.model('PetrolPump', petrolPumpSchema);
