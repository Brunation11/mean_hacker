var app = angular.module('meanNews', ['ui.router']);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/home.html',
      controller: 'MainCtrl',
      resolve: {
        postPromise: ['posts', function(posts) {
          return posts.getAll();
        }]
      }
    })

    .state('posts', {
      url: '/posts/{id}',
      templateUrl: '/posts.html',
      controller: 'PostsCtrl'
    });

  $urlRouterProvider.otherwise('home');
}]);

app.factory('posts', ['$http', function($http) {
  o = {
    posts: []
  };

  o.getAll = function() {
    return $http.get('/posts')
      .then(function(res) {
        angular.copy(res.data, o.posts);
      });
  };

  o.create = function(post) {
    return $http.post('/posts', post)
      .then(function(res) {
        o.posts.push(res.data);
      });
  };

  return o;
}]);

app.controller('MainCtrl', ['$scope', 'posts', function($scope, posts) {
  $scope.posts = posts.posts;
  $scope.addPost = function() {
    if ($scope.title && $scope.title !== '') {
      posts.create({
        title: $scope.title,
        link: $scope.link
      });
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