const mongoose = require("mongoose");

// helper that establishes the connection and wires up listeners
const connectDB = async () => {
  try {
    // attempt initial connect using environment variable
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("Database connection error:", error.message);
    // if we can't connect on startup there is no point running the app
    process.exit(1);
  }
};

// listen for mongoose events so we can log state and optionally reconnect
mongoose.connection.on("connected", () => {
  console.log("🔌 Mongoose default connection is open");
});

mongoose.connection.on("error", (err) => {
  console.error("🚨 Mongoose connection error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.warn("⚠️  Mongoose default connection disconnected");
  // you might want to try reconnecting here
  // connectDB(); // uncomment to automatically attempt reconnects
});

// close mongoose connection on app termination (SIGINT), etc.
process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("Mongoose connection closed due to app termination");
  process.exit(0);
});

module.exports = connectDB;