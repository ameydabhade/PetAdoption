const mongoose = require('mongoose');

const adoptionRequestSchema = new mongoose.Schema({
  petId: { type: mongoose.Schema.Types.ObjectId, ref: 'Pet', required: true },
  seekerName: { type: String, required: true },
  seekerContact: { type: String, required: true },
  applicationMessage: { type: String, required: true },
  status: { type: String, default: 'pending' },
});

module.exports = mongoose.model('AdoptionRequest', adoptionRequestSchema);
