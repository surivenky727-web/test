require("dotenv").config();
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const Doctor = require("../models/doctor");

async function run() {
  try {
    const uri =
      process.env.MONGO_URI || "mongodb://localhost:27017/amsd_app";

    await mongoose.connect(uri);
    console.log("MongoDB connected for seeding");

    // ✅ correct path - doctors.json is in models folder
    const dataPath = path.join(__dirname, "..", "models", "doctors.json");

    const docs = JSON.parse(fs.readFileSync(dataPath, "utf8"));

    // ✅ clear old
    await Doctor.deleteMany({});

    // ✅ INSERT NEW (VERY IMPORTANT)
    await Doctor.insertMany(docs);

    console.log(`✅ Seeded ${docs.length} doctors`);

    await mongoose.disconnect();
    process.exit();
  } catch (error) {
    console.error("Seeder error:", error);
    process.exit(1);
  }
}

run();