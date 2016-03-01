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
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ]
});

mongoose.model('Post', PostSchema);