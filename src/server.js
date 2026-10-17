const { port } = require("./config/env");

const express = require("express");

// packages
const path = require("path");
const bodyParser = require("body-parser");

// mongodb
const { connectToMongoDB } = require("./config/mongodb");

// models
const User = require("./models/user");

// router
const adminRouter = require("./routes/admin");
const productsRouter = require("./routes/products");
const shopRouter = require("./routes/shop");

// controllers
const errorController = require("./controllers/error");

const app = express();

// setting up the templating engine
app.set("view engine", "ejs"); // templating engine name
app.set("views", path.join(__dirname, "views")); // folder path

// parsing data middelwares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// static files middleware
app.use(express.static(path.join(__dirname, "..", "public")));

//! provide the user to any incoming requests | UPDATED AFTER ADDING AUTH LOGIC
app.use((req, res, next) => {
  User.getUserById("6acf9af009cbbdf444954649")
    .then((user) => {
      if (!user) {
        return errorController.getErrorPage(req, res, next); // Handle case where user doesn't exist
      }
      req.user = new User(user.username, user.email, user.cart, user._id);
      next();
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Server error"); // Handle server errors
    });
});

// consuming routers
app.use("/admin", adminRouter);
app.use(productsRouter);
app.use(shopRouter);

// 404 error page
app.use(errorController.getErrorPage);

// run the server after connecting to MongoDB
connectToMongoDB(() => {
  app.listen(port, "0.0.0.0", () => {
    console.log(`Server is running on port ${port}`);
  });
});
