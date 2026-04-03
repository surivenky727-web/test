const mongoose = require('mongoose');
const User = require('./models/user');
require('dotenv').config();

async function checkDoctors() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
    
    const doctors = await User.find({ role: 'doctor' });
    console.log('\n📋 Registered Doctors in Database:');
    console.log(JSON.stringify(doctors, null, 2));
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

checkDoctors();
