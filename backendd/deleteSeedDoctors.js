const mongoose = require('mongoose');
const Doctor = require('./models/doctor');
require('dotenv').config();

async function deleteSeedDoctors() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
    
    // Delete all seeded doctors
    const result = await Doctor.deleteMany({});
    console.log(`✅ Deleted ${result.deletedCount} seeded doctors`);
    
    console.log('\nNow only newly registered doctors will appear in the list.');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

deleteSeedDoctors();
