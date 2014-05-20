"use strict";

var express = require('express');
var partials = require('express-partials');
var handler = require('../lib/request-handler');
var middle = require('./middleware');
var bodyParser  = require('body-parser');

var app = express();
// var routers = {};
// var NoteRouter = express.Router();
// routers.NoteRouter = NoteRouter;

// require('./config.js')(app, express, routers);

// require('../note/note_routes.js')(NoteRouter);

// app.configure(function() {
  app.set('port', process.env.PORT || 9000);
  app.set('base url', process.env.URL || 'http://localhost');
  //app.use(morgan('dev'));
  app.use(bodyParser());
  app.use(middle.cors);
  app.use(express.static(__dirname + '/../../client'));
  //app.use('/note', routers.NoteRouter);
  app.use(middle.logError);
  app.use(middle.handleError);
// });

app.get('/ajax/personal/:user', handler.returnPersonal);}

app.get('/*', handler.renderIndex);





module.exports = exports = app;