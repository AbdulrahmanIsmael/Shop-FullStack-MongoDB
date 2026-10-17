const { ObjectId } = require("mongodb");
const { getDB } = require("../config/mongodb");

class User {
  constructor(username, email, cart = { items: [] }, id) {
    this.username = username;
    this.email = email;
    this.cart = cart;
    this._id = id
      ? id instanceof ObjectId
        ? id
        : new ObjectId(id)
      : undefined;
  }

  // add new user
  save() {
    const db = getDB();
    return db
      .collection("users")
      .insertOne(this)
      .then(() => console.log("Welcome To Our Shop new user!"))
      .catch((err) => console.log(err));
  }

  // get user by ID
  static getUserById(id) {
    const db = getDB();

    return db
      .collection("users")
      .findOne({ _id: new ObjectId(id) })
      .then((user) => user)
      .catch((err) => console.log(err));
  }
}

module.exports = User;
