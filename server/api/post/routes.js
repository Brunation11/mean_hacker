var express = require('express');
var router = express.Router();
var controller = require('./controller');
var auth = require('../user/auth').auth();

router.param('post', controller.params);

router.route('/')
  .get(controller.get)
  .post(auth, controller.post);

router.route('/:post')
  .get(controller.getOne)
  .delete(auth, controller.delete);

router.put('/:post/upvote', auth, controller.upvote);
router.put('/:post/downvote', auth, controller.downvote);

router.use('/:post/comments', require('../comment/routes'));

module.exports = router;