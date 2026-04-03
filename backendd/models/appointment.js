const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
  doctorName: String,
  specialty: String,
  date: String,
  time: String,
  status: { type: String, enum: ['upcoming', 'completed', 'cancelled'], default: 'upcoming' },
  patientName: String,
  patientEmail: String,
  patientPhone: String,
}, { timestamps: true });

module.exports = mongoose.model('Appointment', AppointmentSchema);
