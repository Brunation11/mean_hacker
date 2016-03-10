var app = angular.module('meanNews');

app.controller('PostsCtrl', ['$scope', '$state', 'posts', 'auth', function($scope, $state, posts, auth) {

  $scope.isLoggedIn = auth.isLoggedIn;
  $scope.posts = posts.posts;

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

  $scope.removePost = function(post) {
    posts.deletePost(post);
  };

  $scope.upvotePost = function(post) {
    if (!auth.isLoggedIn()) {
      $state.go('login');
    } else {
      posts.upvotePost(post);
    }
  };

  $scope.downvotePost = function(post) {
    if (!auth.isLoggedIn()) {
      $state.go('login');
    } else {
      posts.downvotePost(post);
    }
  };

}]);