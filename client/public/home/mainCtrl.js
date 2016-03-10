var app = angular.module('meanNews');

app.controller('MainCtrl', ['$scope', 'posts', 'auth', function($scope, posts, auth) {

  $scope.isLoggedIn = auth.isLoggedIn;
  $scope.posts = posts.posts;

  $scope.removePost = function(post) {
    posts.deletePost(post);
  };

  $scope.upvotePost = function(post) {
    posts.upvotePost(post);
  };

  $scope.downvotePost = function(post) {
    posts.downvotePost(post);
  };

}]);