var app = angular.module('meanNews');

app.controller('PostCtrl', ['$scope', '$state', 'posts', 'post', 'auth', function($scope, $state, posts, post, auth) {

  $scope.isLoggedIn = auth.isLoggedIn;
  $scope.post = post;

  $scope.addComment = function() {
    if (auth.isLoggedIn()) {
      if($scope.body && $scope.body !== '') {
        posts.createComment(post, {
          body: $scope.body,
        })
        .success(function(comment) {
          $scope.post.comments.push(comment);
        });
        $scope.body = '';
      }
    } else {
      $state.go('login');
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