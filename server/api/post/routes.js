var express = require('express');
var router = express.Router();
var controller = require('./controller');

router.param('post', controller.params);

router.route('/')
  .get(controller.get)
  .post(controller.post);

router.route('/:post')
  .get(controller.getOne);

router.put('/:post/upvote', controller.upvote);
router.put('/:post/downvote', controller.downvote);

router.use('/posts/:post/comments', require('../comment/routes'));

module.exports = router;