var express = require('express');
var router = express.Router();
var PostModel = require('../models/Post');
var CommentModel = require('../models/Comment');

router.param('post', function(req, res, next, id) {
  PostModel.findById(id)
    .populate('comments')
    .exec(function(err, post) {
      if (err) {
        next(err);
      } else if (!post) {
        next(new Error('Post not found'));
      } else {
        req.post = post;
        next();
      }
    });
});

router.param('comment', function(req, res, next, id) {
  CommentModel.findById(id, function(err, comment) {
    if (err) {
      next(err);
    } else if (!comment) {
      next(new Error('Comment not found'));
    } else {
      req.comment = comment;
    }
  });
});

router.get('/posts', function(req, res, next) {
  PostModel.find({})
    .populate('comments')
    .exec(function(err, posts) {
      if (err) {
        next(err);
      } else {
        res.json(posts);
      }
    });
});

router.post('/posts', function(req, res, next) {
  var post = new PostModel(req.body);
  post.save(function(err, post) {
    if (err) {
      next(err);
    } else {
      res.json(post);
    }
  });
});

router.get('/post/:post', function(req, res) {
  res.json(req.post);
});

router.put('/posts/:post/upvote', function(req, res, next) {
  req.post.upvote(function(err, post) {
    if (err) {
      next(err);
    } else {
      res.json(post);
    }
  });
});

router.put('/posts/:post/downvote', function(req, res, next) {
  req.post.downvote(function(err, post) {
    if (err) {
      next(err);
    } else {
      res.json(post);
    }
  });
});

router.post('posts/:post/comments', function(req, res, next) {
  var comment = new CommentModel(req.body);
  comment.post = req.post;
  comment.save(function(err, comment) {
    if (err) {
      next(err);
    } else {
      req.post.comments.push(comment);
      req.post.save(function(err, res) {
        if (err) {
          next(err);
        } else {
          res.json(comment);
        }
      });
    }
  });
});

router.put('posts/:post/comments/:comment/upvote', function(req, res, next) {
  req.comment.upvote(function(err, comment) {
    if (err) {
      next(err);
    } else {
      res.json(comment);
    }
  });
});

router.put('posts/:post/comments/:comment/downvote', function(req, res, next) {
  req.comment.downvote(function(err, comment) {
    if (err) {
      next(err);
    } else {
      res.json(comment);
    }
  });
});

module.exports = router;
