var config = require('../../config/config');
var jwt = require('express-jwt');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var UserModel = require('./model');

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
  return jwt({secret: config.secrets.jwt, userProperty: 'payload'});
};