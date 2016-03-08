var UserModel = require('./model');
var _ = require('lodash');
var passport = require('passport');

exports.register = function(req, res, next) {
  if(!req.body.username || !req.body.password) {
    return res.status(400).json({message: 'Please fill out all fields'});
  }
  var user = new UserModel();
  user.username = req.body.username;
  user.setPassword(req.body.password);
  user.save(function(err) {
    if (err) {
      next(err);
    } else {
      res.json({token: user.generateJWT()});
    }
  });
};

exports.login = function(req, res, next) {
  if(!req.body.username || !req.body.password) {
    return res.status(400).json({message: 'Please fill out all fields'});
  }
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      next(err);
    } else if (user) {
      res.json({token: user.generateJWT()});
    } else {
      res.status(401).json(info);
    }
  })(req, res, next);
};