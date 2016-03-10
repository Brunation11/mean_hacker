var express = require('express');
var router = express.Router();
var controller = require('./controller');
var auth = require('../user/auth').auth();

router.param('comment', controller.params);

router.post('/', auth, controller.post);
router.delete('/:comment', auth, controller.delete);
router.put('/:comment/upvote', auth, controller.upvote);
router.put('/:comment/downvote', auth, controller.downvote);

module.exports = router;