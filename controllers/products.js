const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  //  path 只是一個key value pair, 名稱可以自訂
  res.render("add-product", {
    pageTitle: "Add product",
    path: "/admin/add-product",
    productCSS: true,
    formCSS: true,
    activeAddProduct: true,
  });
};

exports.postAddProduct = (req, res, next) => {
  // products.push({ title: request.body.title });
  const product = new Product(req.body.title);
  product.save();
  res.redirect("/");
};

exports.getProducts = (req, res, next) => {
  const products = Product.fetchAll();
  res.render("shop", {
    prods: products,
    pageTitle: "shop",
    path: "/",
    hasProducts: products.length > 0,
    activeShop: true,
    productsCSS: true,
    // layout: false,
  });
};
