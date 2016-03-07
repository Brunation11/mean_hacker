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
      controller: 'PostsCtrl',
      resolve: {
        post: ['$stateParams', 'posts', function($stateParams, posts) {
          return posts.getOne($stateParams.id);
        }]
      }
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

  o.getOne =function(id) {
    return $http.get('/posts/' + id)
      .then(function(res) {
        return res.data;
      });
  };

  o.create = function(post) {
    return $http.post('/posts', post)
      .then(function(res) {
        o.posts.push(res.data);
      });
  };

  o.delete = function(post) {
    return $http.delete('/posts/' + post._id)
      .then(function(res) {
        o.posts.splice(res.data, 1);
      });
  };

  o.upvote = function(post) {
    return $http.put('/posts/' + post._id + '/upvote')
      .then(function(res) {
        o.posts.splice(res.data, 1);
        o.posts.push(res.data);
      });
  };

  o.downvote = function(post) {
    return $http.put('/posts/' + post._id + '/downvote')
    .then(function(res) {
      o.posts.splice(res.data, 1);
      o.posts.push(res.data);
    });
  };

  o.createComment = function(id, comment) {
    return $http.post('/posts/' + id + '/comments', comment);
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

  $scope.removePost = function(post) {
    posts.delete(post);
  };

  $scope.upvote = function(post) {
    posts.upvote(post);
  };

  $scope.downvote = function(post) {
    posts.downvote(post);
  };

}]);

app.controller('PostsCtrl', ['$scope', 'posts', 'post', function($scope, posts, post) {
  $scope.post = post;
  $scope.addComment = function() {
    if($scope.body && $scope.body !== '') {
      var comment = {
        body: $scope.body,
        author: 'user',
      };
      posts.createComment(post._id, {
        body: $scope.body,
        author: 'user',
      }).success(function(comment) {
        $scope.post.comments.push(comment);
      });
      $scope.body = '';
    }
  };
}]);