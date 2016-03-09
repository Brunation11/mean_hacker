var PostModel = require('./model');
var _ = require('lodash');

exports.params = function(req, res, next, id) {
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
};

exports.get = function(req, res, next) {
  PostModel.find({})
    .populate('comments')
    .exec(function(err, posts) {
      if (err) {
        next(err);
      } else {
        res.json(posts);
      }
    });
};

exports.post = function(req, res, next) {
  var post = new PostModel(req.body);
  post.author = req.payload.username;
  post.save(function(err, post) {
    if (err) {
      next(err);
    } else {
      res.json(post);
    }
  });
};

exports.getOne = function(req, res) {
  res.json(req.post);
};

exports.delete = function(req, res, next) {
  req.post.remove(function(err, post) {
    if (err) {
      next(err);
    } else {
      res.json(post);
    }
  });
};

exports.upvote = function(req, res, next) {
  req.post.upvote(function(err, post) {
    if (err) {
      next(err);
    } else {
      res.json(post);
    }
  });
};

exports.downvote = function(req, res, next) {
  req.post.downvote(function(err, post) {
    if (err) {
      next(err);
    } else {
      res.json(post);
    }
  });
};