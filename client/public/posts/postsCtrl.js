var app = angular.module('meanNews');

app.controller('PostsCtrl', ['$scope', '$state', 'posts', 'post', 'auth', function($scope, posts, post, auth) {

  $scope.isLoggedIn = auth.isLoggedIn;
  $scope.post = post;

  $scope.addPost = function() {
    if ($scope.title && $scope.title !== '') {
      posts.createPost({
        title: $scope.title,
        link: $scope.link,
        author: auth.currentUser()
      });
      $state.go('home');
      $scope.title = '';
      $scope.link = '';
    }
  };

  $scope.addComment = function() {
    if($scope.body && $scope.body !== '') {
      posts.createComment(post, {
        body: $scope.body,
      })
      .success(function(comment) {
        $scope.post.comments.push(comment);
      });
      $scope.body = '';
    }
  };

  $scope.removeComment = function(comment) {
    posts.deleteComment(post, comment);
  };

  $scope.upvoteComment = function(comment) {
    posts.upvoteComment(post, comment);
  };

  $scope.downvoteComment = function(comment) {
    posts.downvoteComment(post, comment);
  };

}]);