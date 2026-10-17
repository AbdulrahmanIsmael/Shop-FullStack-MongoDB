const Cart = require("../models/cart");
const Order = require("../models/order");
const Product = require("../models/product");

const { handleError } = require("../utils/errorHandler");

// get the main page
exports.getHome = (req, res) => {
  Product.getAll()
    .then((products) => {
      res.render("shop/index", {
        title: "Shop",
        products,
      });
    })
    .catch((err) => handleError(res, err));
};

// get the cart page
exports.getCart = (req, res) => {
  const user = req.user;
  const cart = new Cart(user._id, user.cart.items);

  cart
    .getItems()
    .then((products) => {
      const totalPrice = products.reduce(
        (acc, prod) => +acc + +prod?.price * +prod?.quantity || 0,
        0,
      );

      res.render("shop/cart", {
        title: "My Cart",
        products: products,
        totalPrice: totalPrice ?? 0,
      });
    })
    .catch((err) => handleError(res, err));
};

// get the orders page
exports.getOrders = (req, res) => {
  const user = req.user;

  Order.getOrders(user._id)
    .then((orders) => {
      console.log(orders);
      res.render("shop/orders", {
        title: "My Orders",
        orders,
      });
    })
    .catch((err) => handleError(res, err));
};

// add product to cart
exports.postCart = (req, res) => {
  const user = req.user;
  const productId = req.body.productId;

  const cart = new Cart(user._id, user.cart.items);

  cart
    .addItem(productId)
    .then(() => res.redirect("/cart"))
    .catch((err) => handleError(res, err));
};

exports.postRemoveFromCart = (req, res) => {
  const user = req.user;
  const productId = req.body.productId;

  const cart = new Cart(user._id, user.cart.items);

  cart
    .deleteItem(productId)
    .then(() => res.redirect("/cart"))
    .catch((err) => handleError(res, err));
};

// post new order
exports.postOrder = (req, res) => {
  const user = req.user;
  const order = new Order(user._id, user.cart.items);

  order
    .createOrder()
    .then(() => res.redirect("/orders"))
    .catch((err) => handleError(res, err));
};
