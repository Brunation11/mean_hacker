var UserModel = require('../user/model');
var signToken = require('./auth').signToken;

exports.signIn = function(req, res) {
  var token = signToken(req.user._id);
  res.json({token: token});
};