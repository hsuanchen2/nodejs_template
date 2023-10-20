const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "All Products",
      path: "/products",
    });
  });
};

exports.getProduct = (req, res, next) => {
  const productId = req.params.productId;
  // callback 的 product 參數會在引用getProduct 的地方被宣告
  Product.findById(productId, (product) => {
    res.render("shop/product-detail", {
      product: product,
      pageTitle: product.title,
      path: "/products",
      productId: product.id,
    });
  });
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/index", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
    });
  });
};

exports.getCart = (req, res, next) => {
  // cart 變數在 Cart.getCart 中會被定義
  Cart.getCart((cart) => {
    // 這個products 會是 fetchAll 中callback  中的 fileContent
    // fileContent 會是 products.json 中的產品資料陣列
    Product.fetchAll((products) => {
      const cartProducts = [];
      // 因為每次product 都會不同，所以不會找到重複的商品
      for (let product of products) {
        const cartProductsData = cart.products.find((prod) => {
          return prod.id === product.id;
        });
        // 如果購物車內的商品在產品列表中存在，才會加入到 cartProduct 陣列中
        if (cartProductsData) {
          cartProducts.push({
            productData: product,
            qty: cartProductsData.qty,
          });
        }
      }
      // cartProducts 是一個陣列，代表一個購物車
      console.log(cartProducts);
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        cart: cart,
        product: cartProducts,
      });
    });
  });
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    path: "/orders",
    pageTitle: "Your Orders",
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};

exports.postCart = (req, res, next) => {
  const productId = req.body.productId;
  // find by Id 中會有一個叫做 product 的變數, 由於findById 的callback 會在後續執行，所以能夠取得變數 product
  Product.findById(productId, (product) => {
    Cart.addProduct(productId, product.price);
  });
  res.redirect("/cart");
};

exports.postCartDeleteProduct = (req, res, next) => {
  const productId = req.body.productId;
  console.log("product");
  Product.findById(productId, (p) => {
    Cart.deleteProduct(productId, p.price);
    res.redirect("/cart");
  });
};
