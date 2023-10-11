const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

const expressHbs = require("express-handlebars");
app.engine("hbs", expressHbs());
app.set("view engine", "hbs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use("/admin", adminRoutes.routes);
app.use(shopRoutes);
// 讓指定路徑成為靜態資源，可以被直接訪問
app.use(express.static(path.join(__dirname, "public")));
app.use((req, res, next) => {
  res.status(404).render("404", { pageTitle: "404 page not found hbs" });
});

app.listen(3000);
