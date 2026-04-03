const mongoose = require('mongoose');
const User = require('./models/user');
require('dotenv').config();

async function checkAdminAndUsers() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB\n');
    
    const allUsers = await User.find().select('-password');
    console.log('📋 All Users in Database:');
    console.log(`Total Users: ${allUsers.length}\n`);
    allUsers.forEach(user => {
      console.log(`- ${user.name} (${user.email}) - Role: ${user.role}`);
    });
    
    const admin = await User.findOne({ role: 'admin' });
    if (admin) {
      console.log('\n✅ Admin exists!');
      console.log(`Admin Name: ${admin.name}`);
      console.log(`Admin Email: ${admin.email}`);
    } else {
      console.log('\n❌ Admin NOT found!');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

checkAdminAndUsers();
