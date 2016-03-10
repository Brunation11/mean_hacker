var app = angular.module('meanNews');

app.factory('posts', ['$http', 'auth', function($http, auth) {
  var o = {
    posts: []
  };

  o.getAllPosts = function() {
    return $http.get('/posts')
      .then(function(res) {
        angular.copy(res.data, o.posts);
      });
  };

  o.getOnePost =function(id) {
    return $http.get('/posts/' + id)
      .then(function(res) {
        return res.data;
      });
  };

  o.createPost = function(post) {
    return $http.post('/posts', post, {headers: {Authorization: 'Bearer ' + auth.getToken()}})
      .then(function(res) {
        o.posts.push(res.data);
      });
  };

  o.deletePost = function(post) {
    return $http.delete('/posts/' + post._id, {headers: {Authorization: 'Bearer ' + auth.getToken()}})
      .then(function(res) {
        var idx = o.posts.indexOf(post);
        o.posts.splice(idx, 1);
      });
  };

  o.upvotePost = function(post) {
    return $http.put('/posts/' + post._id + '/upvote', null, {headers: {Authorization: 'Bearer ' + auth.getToken()}})
      .then(function(res) {
        post.upvotes++;
      });
  };

  o.downvotePost = function(post) {
    return $http.put('/posts/' + post._id + '/downvote', null, {headers: {Authorization: 'Bearer ' + auth.getToken()}})
      .then(function(res) {
        post.upvotes--;
      });
  };

  o.createComment = function(post, comment) {
    return $http.post('/posts/' + post._id + '/comments', comment, {headers: {Authorization: 'Bearer ' + auth.getToken()}});
  };

  o.deleteComment = function(post, comment) {
    return $http.delete('/posts/' + post._id + '/comments/' + comment._id, {headers: {Authorization: 'Bearer ' + auth.getToken()}})
      .then(function(res) {
        var idx = post.comments.indexOf(comment);
        post.comments.splice(idx, 1);
      });
  };

  o.upvoteComment = function(post, comment) {
    return $http.put('/posts/' + post._id + '/comments/' + comment._id + '/upvote', null, {headers: {Authorization: 'Bearer ' + auth.getToken()}})
      .then(function(res) {
        comment.upvotes++;
      });
  };

  o.downvoteComment = function(post, comment) {
    return $http.put('/posts/' + post._id + '/comments/' + comment._id + '/downvote', null, {headers: {Authorization: 'Bearer ' + auth.getToken()}})
      .then(function(res) {
        comment.upvotes--;
      });
  };

  return o;

}]);