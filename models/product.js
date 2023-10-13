// const products = [];

// save products into a file
const fs = require("fs");
const path = require("path");
const rootDir = require("../util/path");

module.exports = class Product {
  constructor(t) {
    this.title = t;
  }
  save() {
    const p = path.join(rootDir, "data", "products.json");
    let products = [];
    fs.readFile(p, (error, fileContent) => {
      if (!error) {
        products = JSON.parse(fileContent);
      }
      // 這邊一定要用arrow function
      products.push(this);
      // 把products 資料寫進路徑p檔案中
      fs.writeFile(p, JSON.stringify(products), (error) => {
        console.log(error);
      });
    });
  }
  // 定義一個靜態方法（static method）。靜態方法是指可以直接通過類（class）本身調用，而不需要實體化（即不需要創建類的物件）
  static fetchAll() {
    return products;
  }
};
