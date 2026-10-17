const { port } = require("./config/env");

const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const { connectToMongoDB } = require("./config/mongodb");
const User = require("./models/user");

const adminRouter = require("./routes/admin");
const productsRouter = require("./routes/products");
const shopRouter = require("./routes/shop");

const errorController = require("./controllers/error");

const app = express();

// EJS configuration
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Request body parsers
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Local development static files.
// Vercel serves files in /public separately.
app.use(express.static(path.join(__dirname, "..", "public")));

// Ensure MongoDB is connected before accessing any models.
app.use((req, res, next) => {
  connectToMongoDB()
    .then(() => next())
    .catch((err) => {
      console.error("MongoDB connection failed:", err);
      res.status(500).send("Database connection failed");
    });
});

// Provide a user to incoming requests.
app.use((req, res, next) => {
  User.getUserById("6acf9af009cbbdf444954649")
    .then((user) => {
      if (!user) {
        return errorController.getErrorPage(req, res, next);
      }

      req.user = new User(user.username, user.email, user.cart, user._id);

      next();
    })
    .catch((err) => {
      console.error("Failed to load user:", err);
      res.status(500).send("Server error");
    });
});

// Routes
app.use("/admin", adminRouter);
app.use(productsRouter);
app.use(shopRouter);

// 404 handler
app.use(errorController.getErrorPage);

// Local development only.
// Vercel imports the exported Express application instead.
if (require.main === module) {
  connectToMongoDB()
    .then(() => {
      app.listen(port, "0.0.0.0", () => {
        console.log(`Server is running on port ${port}`);
        console.log(`http://localhost:${port}`);
      });
    })
    .catch((err) => {
      console.error("Server failed to start:", err);
      process.exit(1);
    });
}

// Required for Vercel
module.exports = app;
