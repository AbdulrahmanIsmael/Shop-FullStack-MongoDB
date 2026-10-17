const { ObjectId } = require("mongodb");
const { getDB } = require("../config/mongodb");
const Cart = require("./cart");

class Product {
  constructor(title, price, quantity, imageUrl, description, userId) {
    this.title = title;
    this.price = price;
    this.quantity = quantity;
    this.imageUrl = imageUrl;
    this.description = description;
    this.userId = userId;
  }

  // fetch all products
  static getAll() {
    const db = getDB();
    return db
      .collection("products")
      .find({}) // return a cursor, an object that allows to iterate over the results one by one
      .toArray() // convert cursor to array with all products
      .then((products) => products)
      .catch((err) => console.log(err));
  }

  // fetch product by id
  static getProductById(id) {
    const db = getDB();
    return db
      .collection("products")
      .find({ _id: new ObjectId(id) }) // in mongodb, id is stored in "_id" key in ObjectId type, it is special type mongodb use, so we import it and use it in the filter for id
      .next() // used to iterate over results and get the documents one by one | YOU CAN CALL IT MULTIPLE TIMES TO ITERATE
      .then((product) => product)
      .catch((err) => console.log(err));
  }

  static updateProduct(id, data) {
    const db = getDB();
    const {
      productName,
      productDesc,
      productQuantity,
      productPrice,
      productImage,
    } = data;

    return db
      .collection("products")
      .updateOne(
        { _id: new ObjectId(id) },
        {
          $set: {
            title: productName,
            description: productDesc,
            quantity: productQuantity,
            price: productPrice,
            imageUrl: productImage,
          },
        },
      )
      .then(() => console.log("Product Updated!"))
      .catch((err) => console.log(err));
  }

  // delete product by Id
  static deleteProductById(id) {
    const db = getDB();

    return db
      .collection("products")
      .deleteOne({
        _id: new ObjectId(id),
      })
      .then(() => Cart.removeProductFromAllCarts(id))
      .then(() => console.log("Product Deleted!"))
      .catch((err) => console.log(err));
  }

  // save product to the database
  save() {
    const db = getDB();
    return db
      .collection("products")
      .insertOne(this) // if you want to insert multiple documents => insertMany([{...}, {...}, ...])
      .catch((err) => console.log(err));
  }
}

module.exports = Product;
