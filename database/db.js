const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const DB_URL = process.env.MONGO_URL;

const dbConnection = () => {
  mongoose.connect(DB_URL, {
    useNewURLParser: true,
    useUnifiedTopology: true,
  });

  mongoose.connection.on("connected", () => {
    console.log("database connected successfully");
  });

  mongoose.connection.on("error", (error) => {
    console.log(error);
    console.log("error connecting to database");

    process.exit(1);
  });
};

module.exports = dbConnection;
