// modules =================================================
  var express = require('express');
  var app     = express();
  var mongoose= require('mongoose');
  var path = require('path');

  // configuration ===========================================
    
  // config files
  // var db = require('./config/db');

  var port = process.env.PORT || 8080; // set our port
  // mongoose.connect(db.url); // connect to our mongoDB database (uncomment after you enter in your own credentials in config/db.js)

  app.configure(function() {
    app.use(express.static(path.join(__dirname, '../client')));
    // app.use(express.static(__dirname + '../client'));   // set the static files location /public/img will be /img for users
    app.use(express.logger('dev'));           // log every request to the console
    app.use(express.bodyParser());            // have the ability to pull information from html in POST
    app.use(express.methodOverride());          // have the ability to simulate DELETE and PUT
  });

  // routes ==================================================
  require('./app/routes')(app); // configure our routes

  // start app ===============================================
  app.listen(port);                   // startup our app at http://localhost:8080
  console.log('Magic happens on port ' + port);       // shoutout to the user
  exports = module.exports = app;             // expose app