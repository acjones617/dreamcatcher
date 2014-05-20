var db = require('../app/config');
var Dream = require('../app/models/user');
var Ya = require('../app/models/link');
var Firebase = require('firebase');

var handle = {};


handle.renderIndex = function(req, res) {
  res.render('index.html');
}

handler.returnPersonal = function(req, res) {
  var username = req.param('user');
  var refDreams = new Firebase("https://blazing-fire-3752.firebaseIO.com/personal/"+username);
  refDreams.
}


module.exports = handle;