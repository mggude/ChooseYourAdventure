var express = require("express");
var app = express();


var PORT = process.env.PORT || 8080;


var db = require("./models");

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Parse application body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
require("./routes/apiRoutes.js")(app);
require("./routes/htmlRoutes.js")(app);

// Start our server so that it can begin listening to client requests.
db.sequelize.sync({ force: true }).then(function() {
    app.listen(PORT, function() {
      console.log("App listening on PORT " + PORT);
    });
  });
