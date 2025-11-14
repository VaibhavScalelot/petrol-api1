const mongoose = require('mongoose');

const laborSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String },
  role: { type: String },
  petrolPump: { type: mongoose.Schema.Types.ObjectId, ref: 'PetrolPump', required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Labor', laborSchema);
