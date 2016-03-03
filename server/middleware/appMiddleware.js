var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cors = require ('cors');
var override = require('method-override');
var path = require('path');

module.exports = function(app) {
  app.set('views', path.join(__dirname, '..', '..', 'client', 'views'));
  app.set('view engine', 'ejs');
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(cors());
  app.use(override());
  app.use(express.static(path.join(__dirname, '..', '..', 'client', 'public')));
};