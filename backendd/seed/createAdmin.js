require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/user");

async function createAdminUser() {
  try {
    const uri = process.env.MONGO_URI || "mongodb://localhost:27017/amsd_app";
    await mongoose.connect(uri);
    console.log("MongoDB connected");

    // Check if admin already exists
    const adminExists = await User.findOne({ role: "admin" });
    if (adminExists) {
      console.log("Admin user already exists");
      await mongoose.disconnect();
      process.exit(0);
    }

    // Create admin user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("admin123", salt);

    const adminUser = await User.create({
      name: "Admin User",
      email: "admin@medicare.com",
      phone: "+91 98765 43200",
      password: hashedPassword,
      role: "admin",
    });

    console.log("✅ Admin user created successfully!");
    console.log("Email: admin@medicare.com");
    console.log("Password: admin123");
    console.log("Please change the password after first login!");

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("Setup error:", error);
    process.exit(1);
  }
}

createAdminUser();
