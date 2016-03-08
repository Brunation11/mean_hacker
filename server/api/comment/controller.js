var CommentModel = require('./model');
var _ = require('lodash');

exports.params = function(req, res, next, id) {
  CommentModel.findById(id, function(err, comment) {
    if (err) {
      next(err);
    } else if (!comment) {
      next(new Error('Comment not found'));
    } else {
      req.comment = comment;
      next();
    }
  });
};


exports.post = function(req, res, next) {
  var comment = new CommentModel(req.body);
  comment.author = req.payload._id;
  comment.save(function(err, comment) {
    if (err) {
      next(err);
    } else {
      req.post.comments.push(comment);
      req.post.save(function(err, post) {
        if (err) {
          next(err);
        } else {
          res.json(comment);
        }
      });
    }
  });
};

exports.upvote = function(req, res, next) {
  req.comment.upvote(function(err, comment) {
    if (err) {
      next(err);
    } else {
      res.json(comment);
    }
  });
};

exports.downvote = function(req, res, next) {
  req.comment.downvote(function(err, comment) {
    if (err) {
      next(err);
    } else {
      res.json(comment);
    }
  });
};