const { ObjectId } = require("mongodb");
const { getDB } = require("../config/mongodb");
const Cart = require("./cart");

class Order {
  constructor(id, items) {
    this.userId = id;
    this.currentItems = items;
  }

  // create new order
  createOrder() {
    const db = getDB();
    return Order.#getProductsDetails(this.currentItems)
      .then((products) => {
        const order = {
          products: products,
          userId: new ObjectId(this.userId),
          createdAt: new Date().toISOString(),
        };

        return db.collection("orders").insertOne(order);
      })
      .then(() => {
        Cart.clearCart(this.userId);
        return db
          .collection("users")
          .updateOne(
            { _id: new ObjectId(this._id) },
            { $set: { cart: { items: [] } } },
          )
          .then(() => console.log("Order created successfully!"))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }

  // get orders from user
  static getOrders(userId) {
    const db = getDB();
    return db
      .collection("orders")
      .find({ userId: new ObjectId(userId) })
      .toArray()
      .then((orders) => orders)
      .catch((err) => console.log(err));
  }

  //* get products details from Ids
  static #getProductsDetails(productItems) {
    const db = getDB();
    const productIds = productItems.map((p) => new ObjectId(p.productId));

    return db
      .collection("products")
      .find({
        _id: { $in: productIds },
      })
      .toArray()
      .then((products) =>
        products.map((p) => ({
          ...p,
          quantity: productItems.find(
            (i) => i.productId.toString() === p._id.toString(),
          ).quantity,
        })),
      )
      .catch((err) => console.log(err));
  }
}

module.exports = Order;
