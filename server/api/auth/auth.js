var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var config = require('../../config/config');
var checkToken = expressJwt({secret: config.secrets.jwt});
var UserModel = require('../user/model');

exports.decodeToken = function() {
  return function(req, res, next) {
    if (req.query && req.query.hasOwnProperty('access_token')) {
      req.headers.authorization = 'Bearer ' + req.query.access_token;
    }
    checkToken(req, res, next);
  };
};

exports.getFreshUser = function() {
  return function(req, res, next) {
    UserModel.findById(req.user._id, function(err, user) {
      if (err) {
        next(err);
      } else if (!user) {
        next(new Error('User not found'));
      } else {
        req.user = user;
        next();
      }
    });
  };
};

exports.verifyUser = function() {
  return function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    if (!username || !password) {
      res.status(400).send('Username and password required');
    } else {
      UserModel.findOne({username: username}, function(err, user) {
        if (err) {
          next(err);
        } else if (!user) {
          res.status(401).send('No user with given username');
        } else {
          if (!user.authenticate(password)) {
            res.status(401).send('Wrong password');
          } else {
            req.user = user;
            next();
          }
        }
      });
    }
  };
};

exports.signToken = function(id) {
  return jwt.sign(
    {_id: id},
    config.secrets.jwt,
    {expiresInMinutes: config.expireTime}
  );
};