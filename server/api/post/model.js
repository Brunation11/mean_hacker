var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  link: String,
  upvotes: {
    type: Number,
    default: 0,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ]
});

PostSchema.methods.upvote = function(cb) {
  this.upvotes++;
  this.save(cb);
};

PostSchema.methods.downvote = function(cb) {
  this.upvotes--;
  this.save(cb);
};

module.exports = mongoose.model('Post', PostSchema);