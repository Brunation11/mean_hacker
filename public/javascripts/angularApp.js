var app = angular.module('meanNews', ['ui.router']);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/home.html',
      controller: 'MainCtrl'
    })

    .state('posts', {
      url: '/posts/{id}',
      templateUrl: '/posts.html',
      controller: 'PostsCtrl'
    });

  $urlRouterProvider.otherwise('home');
}]);

app.factory('posts', [function() {
  return {
    posts: []
  };
}]);

app.controller('MainCtrl', ['$scope', 'posts', function($scope, posts) {
  $scope.posts = posts.posts;
  $scope.addPost = function() {
    if ($scope.title && $scope.title !== '') {
      $scope.posts.push(
        {
          title: $scope.title,
          link: $scope.link,
          upvotes: 0,
          comments: [
            {
              author: 'Joe',
              body: 'Cool post!',
              upvotes: 0
            },
            {
              author: 'Bob',
              body: 'Great idea but everything is wrong!',
              upvotes: 0
            }
          ]
        }
      );
      $scope.title = '';
      $scope.link = '';
    }
  };

  $scope.upvote = function(post) {
    post.upvotes++;
  };

  $scope.downvote = function(post) {
    post.upvotes--;
  };
}]);

app.controller('PostsCtrl', ['$scope', '$stateParams', 'posts', function($scope, $stateParams, posts) {
  $scope.post = posts.posts[$stateParams.id];
  $scope.addComment = function() {
    if($scope.body && $scope.body !== '') {
      $scope.post.comments.push(
        {
          body: $scope.body,
          author: 'user',
          upvotes: 0
        }
      );
      $scope.body = '';
    }
  };
}]);