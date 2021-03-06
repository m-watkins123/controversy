// ******************************** DEPENDENCIES ****************************
//---------------------------------------------------------------------------
var express = require("express"),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override"),
    path = require("path"),
    mysql = require("mysql"),
    handlebars = require("handlebars");

// ******************************** EXPRESS SET-UP **************************
//---------------------------------------------------------------------------
var app = express();

var PORT = process.env.PORT || 8080;

//Requires models
var db = require("./models");


// * SETS UP THE EXPRESS APP TO HANDLE DATA PARSING**************************
//---------------------------------------------------------------------------
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static(path.join(__dirname, './public')))

//ROUTESgit
require("./controllers/apiPostRoutes.js")(app);
require("./controllers/apiSearchRoutes.js")(app);
require("./controllers/htmlRoutes.js")(app);

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
