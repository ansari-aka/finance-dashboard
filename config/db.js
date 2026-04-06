const { default: mongoose } = require("mongoose");

require("dotenv").config();

const mongoUrl = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    if (!mongoUrl) throw new Error("Missing MONGO_URI");
    await mongoose.connect(mongoUrl);
    console.log("MongoDB Connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
