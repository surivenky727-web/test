const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
  // optional link back to the User auth record for newly registered doctors
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  name: String,
  specialty: String,
  experience: Number,
  qualification: String,
  image: String,
  rating: Number,
  consultationFee: Number,
  about: String,
  availableDays: [String],
  availableSlots: [String]
}, { timestamps: true });

module.exports = mongoose.model('Doctor', DoctorSchema);
