const fs = require("fs");
const path = require("path");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "cart.json"
);

module.exports = class Cart {
  static addProduct(id, price) {
    // 這個function 沒有考慮 error 發生的狀況  
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      // 若已經有存在的cart, 那cart 就是 cart.json中的cart
      if (!err) {
        // 這會覆蓋掉一開始的cart 
        cart = JSON.parse(fileContent);
      }
      // 接著檢查是否有已經在cart中的產品
      const existingPrdocutIndex = cart.products.findIndex(
        (product) => product.id === id
      );
      const existingProduct = cart.products[existingPrdocutIndex];
      let updatedProduct;
      // 若有，則數量加 1
      // 淺拷貝一份後，數量加一，然後取代
      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty++;
        cart.products = [...cart.products];
        // 取代掉
        cart.products[existingPrdocutIndex] = updatedProduct;
        // 若沒有重複的產品，則新增一個
      } else {
        updatedProduct = { id: id, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice += price;
      fs.writeFile(p, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
  }
};
