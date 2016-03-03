var express = require('express');
var router = express.Router();
var controller = require('./controller');

router.param('comment', controller.params);

router.post('/', controller.post);
router.put('/:comment/upvote', controller.upvote);
router.put('/:comment/downvote', controller.downvote);

module.exports = router;