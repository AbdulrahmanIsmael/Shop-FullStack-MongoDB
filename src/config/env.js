require("dotenv").config();

module.exports = {
  port: process.env.PORT,
  mongodbUri: process.env.MONGODB_URI,
};
