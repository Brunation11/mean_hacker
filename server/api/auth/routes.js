var express = require('express');
var router = express.Router();
var verifyUser = require('./auth').verifyUser;
var controller = require('./controller');

router.post('/signin', verifyUser(), controller.signIn);

module.exports = router;

