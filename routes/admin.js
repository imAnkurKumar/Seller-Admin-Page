const express = require("express");
const router = express.Router();

const adminController = require("../controllers/admin");

router.get("/products", adminController.getProducts);
router.post("/add-product", adminController.addProduct);
router.delete("/delete-product/:productId", adminController.deleteProduct);

module.exports = router;
