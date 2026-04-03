require("dotenv").config();
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

async function reseed() {
  try {
    const uri = process.env.MONGO_URI || "mongodb://localhost:27017/amsd_app";
    
    console.log("Connecting to:", uri);
    
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 5000,
    });
    
    console.log("✅ Connected to MongoDB");

    const Doctor = require("./models/doctor");
    const dataPath = path.join(__dirname, "models", "doctors.json");
    
    console.log("Reading from:", dataPath);
    const docs = JSON.parse(fs.readFileSync(dataPath, "utf8"));
    
    console.log(`Found ${docs.length} doctors to seed`);
    
    const deleted = await Doctor.deleteMany({});
    console.log(`Deleted ${deleted.deletedCount} existing doctors`);

    const result = await Doctor.insertMany(docs);
    console.log(`✅ Successfully seeded ${result.length} doctors`);

    await mongoose.disconnect();
    console.log("✅ Disconnected from MongoDB");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding error:", error.message);
    console.error(error);
    process.exit(1);
  }
}

reseed();
