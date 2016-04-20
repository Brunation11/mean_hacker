var _ = require('lodash');
var userModel = require('./api/user/model');
var postModel = require('./api/post/model');
var commentModel = require('./api/comment/model');
var faker = require('faker');

userModel.remove({}, function(err) {
  if (err) throw err;
  console.log('User collection dropped');
});

postModel.remove({}, function(err) {
  if (err) throw err;
  console.log('Post collection dropped');
});

commentModel.remove({}, function(err) {
  if (err) throw err;
  console.log('Comment collection dropped');
});

_.times(_.random(5,100), function() {
  var user = new userModel();
  user.username = faker.internet.userName();
  user.setPassword(faker.internet.password());
  user.save();
});

var allUsers;

userModel.find({}, function(err, users) {
  if (err) throw err;
  allUsers = users;
});

_.times(_.random(50,100), function() {
  var user = _.sample(allUsers);
  var post = new postModel();
  post.title = faker.lorem.words();
  post.link = faker.internet.url();
  post.upvotes = _.random(0,100);
  post.author = user.username;
  post.save();
});

var allPosts;

postModel.find({}, function(err, posts) {
  if (err) throw err;
  allPosts = posts;
})

_.times(_.random(50,100), function() {
  var user = _.sample(allUsers);
  var post = _.sample(allPosts);
  var comment = new commentModel();
  comment.author = user;
  comment.body = faker.lorem.sentences();
  comment.upvotes = _.random(0,100);
  comment.save();
  post.comments.push(comment);
  post.save();
});

