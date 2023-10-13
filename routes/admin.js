const express = require("express");
const router = express.Router();

// const rootDir = require("../util/path");
const productController = require("../controllers/products");
// admin/add-product => GET
// 渲染頁面
router.get("/add-product", productController.getAddProduct);

// 把商品傳入
router.post("/add-product", productController.postAddProduct);

module.exports = router;
