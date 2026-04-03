require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

async function reset() {
  const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/amsd_app';
  try {
    console.log('Connecting to', uri);
    await mongoose.connect(uri);

    const User = require('./models/user');
    const Doctor = require('./models/doctor');
    const Appointment = require('./models/appointment');

    console.log('Deleting appointments...');
    const apDel = await Appointment.deleteMany({});
    console.log(`Deleted ${apDel.deletedCount} appointments`);

    console.log('Deleting doctor profiles...');
    const docDel = await Doctor.deleteMany({});
    console.log(`Deleted ${docDel.deletedCount} doctor profiles`);

    console.log('Deleting users...');
    const userDel = await User.deleteMany({});
    console.log(`Deleted ${userDel.deletedCount} users`);

    console.log('Recreating admin user...');
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash('admin123', salt);
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@medicare.com',
      phone: '+91 98765 43200',
      password: hashed,
      role: 'admin',
    });
    console.log('Admin created:', admin.email, 'password: admin123');

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
    process.exit(0);
  } catch (err) {
    console.error('Reset error:', err);
    process.exit(1);
  }
}

reset();
