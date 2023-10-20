const path = require("path");

const express = require("express");

const shopController = require("../controllers/shop");

const router = express.Router();

router.get("/", shopController.getIndex);

router.get("/products", shopController.getProducts);
// 假設客戶端發送了一個請求 /products/delete，由於這個請求路徑符合第一個路由的定義，Express會執行與 /products/delete 相關聯的處理程序。即使有第二個路由的定義，但只有當請求路徑不匹配第一個路由時，第二個路由的處理程序才會被執行。

// 總之要注意你可能以為會跑到 :productId 的路由，會在上方就被處理
router.get("/products/:productId", shopController.getProduct);

router.get("/cart", shopController.getCart);

router.post("/cart", shopController.postCart);

router.post("/cart-delete-item", shopController.postCartDeleteProduct);

router.get("/orders", shopController.getOrders);

router.get("/checkout", shopController.getCheckout);

module.exports = router;
