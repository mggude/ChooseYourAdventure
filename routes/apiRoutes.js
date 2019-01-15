// *********************************************************************************
// apiRoutes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************


// Dependencies
// =============================================================
// var data = require("../public/js/app.js");
var db = require("../models");

// === API ROUTES ===
module.exports = function(app) {
// ?? GET route to give initial character info for home screen display ??



// GET route to server character info (image link, questions, death status, etc)
// example route to get data about requested character (images, status, characters)
// app.get("/api/:character", function(req, res) {
// 	res.json(data[req.params.character])
// }); 


// GET route for high scores (top 5 from table)/GET route to serve up game over/leader board page
//this is our one route that we are routing to handlebars SO we do not do an api/ because in this case we 
//are just slapping on this info and not necessarily interacting with it

app.get("/gameOver", function(req, res) {
    db.Score.findAll({
        //filter to get top 5
        order: [["score", "DESC"]],
        limit: 5
    }).then(function(dbScores) {
        res.render("end", {scores: dbScores});
    })
  });



// POST route for adding score/user (only at end of game)
  // POST route for saving user/score
  app.post("/api/newUserScore", function(req, res) {
    // create takes an argument of an object describing the item we want to
    // insert into our table. In this case we just we pass in an object with a user
    // and score property (req.body)
    console.log(req.body);
    db.Score.create(req.body).then(function(dbScores) {
      // We have access to the new user and score as an argument inside of the callback function
      res.json(dbScores);
    })
  });
};



