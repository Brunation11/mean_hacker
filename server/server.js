var express = require('express');
var app = express();
var config = require('./config/config');
var logger = require('./util/logger');
var passport = require('passport');
var staticRouter = require('./api/staticRouter');
var userRouter = require('./api/user/routes');
var postRouter = require('./api/post/routes');

require('mongoose').connect(config.db.url);
require('./middleware/appMiddleware')(app);
require('./api/user/auth');

app.use(passport.initialize());
app.use('/', staticRouter);
app.use('/auth', userRouter);
app.use('/posts', postRouter);

app.use(function(err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(400).send('Invalid token');
  } else {
    logger.error(err.stack);
    res.status(500).send('Something broke!');
  }
});

module.exports = app;