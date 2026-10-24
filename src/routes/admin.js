const express = require("express");

const adminController = require("../controllers/admin");

const router = express.Router();

router.get("/add-product", adminController.getAddProductPage);

router.post("/add-product", adminController.postProducts);

router.get("/products", adminController.getAdminProductsPage);

router.get("/edit-product/:productId", adminController.getEditProductPage);

router.post("/edit-product", adminController.postEditProduct);

router.post("/delete-product/:productId", adminController.postDeleteProduct);

module.exports = router;
