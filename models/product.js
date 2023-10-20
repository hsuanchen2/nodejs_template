const fs = require("fs");
const path = require("path");
const Cart = require("../models/cart");
const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "products.json"
);

const getProductsFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      // 如果讀不到檔案，就傳空陣列當作參數傳入，，空陣列會讓ejs 偵測，並渲染 no products found
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    // products 會是一個陣列
    getProductsFromFile((products) => {
      // edit product 邏輯
      if (this.id) {
        const existingProductIndex = products.findIndex((p) => {
          return p.id === this.id;
        });
        const updatedProduct = [...products];
        updatedProduct[existingProductIndex] = this;
        fs.writeFile(p, JSON.stringify(updatedProduct), (err) => {
          console.log(err);
        });
      } else {
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), (err) => {
          console.log(err);
        });
      }
    });
  }

  static deleteById(productId) {
    getProductsFromFile((products) => {
      const product = products.find((product) => {
        return product.id === productId;
      });
      // 找出需要刪除產品之外的產品
      const updatedProduct = products.filter((product) => {
        return productId !== product.id;
      });
      fs.writeFile(p, JSON.stringify(updatedProduct), (err) => {
        // 刪除產品後也要把購物車的產品刪除
        if (!err) {
          Cart.deleteProduct(productId, product.price);
        }
      });
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static findById(id, cb) {
    getProductsFromFile((products) => {
      const product = products.find((p) => p.id === id);
      cb(product);
    });
  }
};
