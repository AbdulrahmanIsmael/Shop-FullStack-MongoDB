const { MongoClient } = require("mongodb");

// configuration
const { mongodbUri } = require("./env");

// create new MongoClient for connecting to the MongoDB server
const client = new MongoClient(mongodbUri);

// signal (internal variable in this file olny) to store the db object from the returned client object after connecting to the MongoDB server.
// This is used to avoid creating multiple connections to the MongoDB server.
let _db;

// connect to the MongoDB server and execute the callback function
const connectToMongoDB = (callback) => {
  client
    .connect()
    .then((client) => {
      console.log("Connected!");
      _db = client.db("shop"); // create new Database instance called 'shop' if not existed, and store it in _db to use it globally
      callback();
    })
    .catch((err) => {
      console.log("MongoDB connection failed: ", err);
      throw new Error(err);
    });
};

// get Database
const getDB = () => {
  if (_db) return _db;
  return "No Database Found!";
};

// disconnect from the MongoDB server
const disconnectFromMongoDB = () => {
  client
    .close()
    .then(() => {
      console.log("Disconnected!");
    })
    .catch((err) => {
      console.log("MongoDB disconnection failed: ", err);
    });
};

module.exports = {
  connectToMongoDB,
  disconnectFromMongoDB,
  getDB,
};
