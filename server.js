//Define App Dependencies
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var express = require("express");
var logger = require("morgan");

//Starting with express app
var app = express();

app.use(logger("dev"));
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use(express.static(process.cwd() + "/public"));
//Require handlebars
var exphbs = require("express-handlebars");
app.engine(
  "handlebars",
  exphbs({ defaultLayout: "main"})
);
app.set("view engine", "handlebars");

//Establishing connection MongoDB & mongoose.connect("mongodb://localhost/scrapeNews");
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost/scrapeNews";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

var db = mongoose.connection;
db.on("error", console.error.bind(console, "There is a connection problem:"));
db.once("open", function() {
  console.log("scrapeNews App is now connected to Mongoose!");
});

var routes = require("./controller/controller.js");
app.use("/", routes);
//Define localhost PORT
var PORT = process.env.PORT || 8000;
app.listen(PORT, function() {
  console.log(` *** App ScrapeNews is listening on PORT   ${PORT} ***`);
});