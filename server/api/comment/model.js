var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
  body: {
    type: String,
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  upvotes: {
    type: Number,
    default: 0
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

module.exports = mongoose.model('Comment', CommentSchema);