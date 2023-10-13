const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

const expressHbs = require("express-handlebars");
app.engine(
  "hbs",
  // layoutsDir 固定名稱，無法修改
  // defaultLayout : 指定預設樣板檔案
  expressHbs({
    layoutsDir: "views/layouts/",
    defaultLayout: "main-layout",
    extname: "hbs",
  })
);
// app.set("view engine", "hbs");
app.set("view engine", "ejs");
app.set("views", "views");

const adminRoute = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const notFoundController = require("./controllers/404");

app.use(bodyParser.urlencoded({ extended: false }));
app.use("/admin", adminRoute);
app.use(shopRoutes);
// 讓指定路徑成為靜態資源，可以被直接訪問
app.use(express.static(path.join(__dirname, "public")));

// 404 路由
app.use(notFoundController.notFoundRoute);

app.listen(3000);
