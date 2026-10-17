const { ObjectId } = require("mongodb");
const { getDB } = require("../config/mongodb");

class Cart {
  constructor(id, items) {
    this.userId = id;
    this.currentItems = items;
  }

  // add new product to cart
  addItem(productId) {
    const updatedCart = { items: [...this.currentItems] };

    const productIndex = updatedCart.items.findIndex(
      (item) => item.productId.toString() === productId.toString(),
    );

    // if existed, increase quantity, if not, add it
    if (productIndex >= 0) {
      updatedCart.items[productIndex].quantity =
        +updatedCart.items[productIndex].quantity + 1;
    } else {
      updatedCart.items.push({
        productId: new ObjectId(productId),
        quantity: 1,
      });
    }

    const db = getDB();
    return db
      .collection("users")
      .updateOne(
        {
          _id: new ObjectId(this.userId),
        },
        {
          $set: { cart: updatedCart },
        },
      )
      .then(() => {
        console.log("Cart updated!");
        return updatedCart;
      })
      .catch((err) => console.log(err));
  }

  // get user's cart products
  getItems() {
    const db = getDB();
    const productIds = this.currentItems.map((product) => product.productId);

    return db
      .collection("products")
      .find({ _id: { $in: productIds } })
      .toArray()
      .then((products) =>
        products.map((p) => ({
          ...p,
          quantity: this.currentItems.find(
            (i) => i.productId.toString() === p._id.toString(),
          ).quantity,
        })),
      )
      .catch((err) => console.log(err));
  }

  // delete product from cart
  deleteItem(productId) {
    const db = getDB();
    const updatedCartItems = this.currentItems.filter(
      (item) => item.productId.toString() !== productId.toString(),
    );

    return db
      .collection("users")
      .updateOne(
        { _id: new ObjectId(this.userId) },
        { $set: { cart: { items: updatedCartItems } } },
      )
      .then(() => console.log("Item deleted from cart!"))
      .catch((err) => console.log(err));
  }

  // clear the cart
  static clearCart(userId) {
    const db = getDB();

    return db
      .collection("users")
      .updateOne(
        { _id: new ObjectId(userId) },
        { $set: { cart: { items: [] } } },
      )
      .then(() => console.log("Cart cleared!"))
      .catch((err) => console.log(err));
  }

  static removeProductFromAllCarts(productId) {
    const db = getDB();
    return db
      .collection("users")
      .updateMany(
        {},
        { $pull: { "cart.items": { productId: new ObjectId(productId) } } },
      );
  }
}

module.exports = Cart;
