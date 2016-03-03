var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
  body: {
    type: String,
    required: true
  },
  author: String,
  upvotes: {
    type: Number,
    default: 0
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: 'Post'
  }
});

CommentSchema.methods.upvote = function(cb) {
  this.upvotes++;
  this.save(cb);
};

CommentSchema.methods.downvote = function(cb) {
  this.upvotes--;
  this.save(cb);
};

mongoose.model('Comment', CommentSchema);