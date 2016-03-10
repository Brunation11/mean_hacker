var config = require('../../config/config');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var UserModel = require('./model');
var ejwt = require('express-jwt');
var checkToken = ejwt({secret: config.secrets.jwt, userProperty: 'payload'});

passport.use(new LocalStrategy(function(username, password, done) {
  UserModel.findOne({username: username}, function(err, user) {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false, {message: 'Incorrect username.'});
    }
    if (!user.validatePassword(password)) {
      return done(null, false, {message: 'Incorrect password.'});
    }
    return done(null, user);
  });
}));

exports.auth = function() {
  return function(req, res, next) {
    if (req.query && req.query.hasOwnProperty('access_token')) {
      req.headers.authorization = 'Bearer ' + req.query.access_token;
    }
    checkToken(req, res, next);
  };
};