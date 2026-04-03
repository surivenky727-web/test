const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, sparse: true, lowercase: true, trim: true },
  phone: String,
  password: String, // hashed
  role: { type: String, enum: ['user', 'doctor', 'admin'], default: 'user' },
  // reference to doctor profile document when role === 'doctor'
  doctorProfile: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', default: null },
}, { timestamps: true });

// Handle duplicate key errors
UserSchema.post('save', function(error, doc, next) {
  if (error.name === 'MongoServerError' && error.code === 11000) {
    next(new Error('Email already in use'));
  } else {
    next(error);
  }
});

module.exports = mongoose.model('User', UserSchema);