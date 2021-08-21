const mongoose = require("mongoose");
const colorLog = require("../utils/colorLog");
require("dotenv").config({ path: "./config/.env" });
module.exports = async () => {
  try {
    await mongoose.connect(process.env.Mongo_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    colorLog("DATABASE CONNECTED ....");
  } catch (error) {
    console.log(error);
  }
};