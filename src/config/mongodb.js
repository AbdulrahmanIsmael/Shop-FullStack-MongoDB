const { MongoClient } = require("mongodb");
const { mongodbUri } = require("./env");

const client = mongodbUri ? new MongoClient(mongodbUri) : null;

let _db;
let connectionPromise;

// Reuse the same database connection across requests.
const connectToMongoDB = () => {
  if (_db) {
    return Promise.resolve(_db);
  }

  if (!client) {
    return Promise.reject(
      new Error("Missing MONGODB_URI environment variable"),
    );
  }

  if (!connectionPromise) {
    connectionPromise = client
      .connect()
      .then((connectedClient) => {
        console.log("Connected to MongoDB Atlas");

        _db = connectedClient.db("shop");

        return _db;
      })
      .catch((err) => {
        connectionPromise = null;

        console.error("MongoDB connection failed:", err);

        throw err;
      });
  }

  return connectionPromise;
};

// Get the connected database.
const getDB = () => {
  if (_db) {
    return _db;
  }

  throw new Error("MongoDB is not connected. Call connectToMongoDB() first.");
};

// Disconnect when explicitly needed.
const disconnectFromMongoDB = async () => {
  if (!client) return;

  await client.close();

  _db = undefined;
  connectionPromise = null;

  console.log("Disconnected from MongoDB Atlas");
};

module.exports = {
  connectToMongoDB,
  disconnectFromMongoDB,
  getDB,
};
