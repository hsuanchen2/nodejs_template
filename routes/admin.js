const express = require("express");
const path = require("path");
const router = express.Router();
const products = [];
const rootDir = require("../util/path");

// admin/add-product => GET
router.get("/add-product", (req, res, next) => {
//  path 只是一個key value pair, 名稱可以自訂
  res.render("add-product", { pageTitle: "Add product", path: "/admin/add-product" });
});

router.post("/add-product", (request, response, next) => {
  console.log(request.body);
  products.push({ title: request.body.title });
  response.redirect("/");
});

exports.routes = router;
exports.products = products;
