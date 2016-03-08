var app = angular.module('meanNews', ['ui.router']);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/home.html',
      controller: 'MainCtrl',
      resolve: {
        postPromise: ['posts', function(posts) {
          return posts.getAllPosts();
        }]
      }
    })

    .state('posts', {
      url: '/posts/{id}',
      templateUrl: '/posts.html',
      controller: 'PostsCtrl',
      resolve: {
        post: ['$stateParams', 'posts', function($stateParams, posts) {
          return posts.getOnePost($stateParams.id);
        }]
      }
    })

    .state('login', {
      url: '/login',
      templateUrl: '/login.html',
      controller: 'AuthCtrl',
      onEnter: ['$state', 'auth', function($state, auth) {
        if (auth.isLoggedIn()) {
          $state.go('home');
        }
      }]
    })

    .state('register', {
      url: '/register',
      templateUrl: '/register.html',
      controller: 'AuthCtrl',
      onEnter: ['$state', 'auth', function($state, auth) {
        if (auth.isLoggedIn()) {
          $state.go('home');
        }
      }]
    });

  $urlRouterProvider.otherwise('home');
}]);

app.factory('auth', ['$http', '$window', function($http, $window) {
  var auth = {};

  auth.saveToken = function(token) {
    $window.localStorage['mean-hacker-token'] = token;
  };

  auth.getToken = function() {
    return $window.localStorage['mean-hacker-token'];
  };

  auth.isLoggedIn = function() {
    var token = auth.getToken();
    if (token) {
      var payload = JSON.parse($window.atob(token.split('.')[1]));

      return payload.exp > Date.now() / 1000;
    } else {
      return false;
    }
  };

  auth.currentUser = function() {
    if (auth.isLoggedIn()) {
      var token = auth.getToken();
      var payload = JSON.parse($window.atob(token.split('.')[1]));
      return payload.username;
    }
  };

  auth.register = function(user) {
    return $http.post('/auth/register', user)
      .then(function(res) {
        auth.saveToken(res.data.token);
      });
  };

  auth.logIn = function(user) {
    return $http.post('/auth/login', user)
      .then(function(res) {
        auth.saveToken(res.data.token);
      });
  };

  auth.logOut = function() {
    $window.localStorage.removeItem('mean-hacker-token');
  };

  return auth;

}]);

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
    return $http.put('/posts/' + post._id + '/upvote', {headers: {Authorization: 'Bearer ' + auth.getToken()}})
      .then(function(res) {
        post.upvotes++;
      });
  };

  o.downvotePost = function(post) {
    return $http.put('/posts/' + post._id + '/downvote', {headers: {Authorization: 'Bearer ' + auth.getToken()}})
      .then(function(res) {
        post.upvotes--;
      });
  };

  o.createComment = function(id, comment) {
    return $http.post('/posts/' + id + '/comments', comment);
  };

  o.upvoteComment = function(post, comment) {
    return $http.put('/posts/' + post._id + '/comments/' + comment._id + '/upvote')
      .then(function(res) {
        comment.upvotes++;
      });
  };

  o.downvoteComment = function(post, comment) {
    return $http.put('/posts/' + post._id + '/comments/' + comment._id + '/downvote')
      .then(function(res) {
        comment.upvotes--;
      });
  };

  return o;

}]);

app.controller('MainCtrl', ['$scope', 'posts', 'auth', function($scope, posts, auth) {

  $scope.isLoggedIn = auth.isLoggedIn;

  $scope.posts = posts.posts;

  $scope.addPost = function() {
    if ($scope.title && $scope.title !== '') {
      posts.createPost({
        title: $scope.title,
        link: $scope.link,
        author: auth.currentUser()
      });
      $scope.title = '';
      $scope.link = '';
    }
  };

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

app.controller('PostsCtrl', ['$scope', 'posts', 'post', 'auth', function($scope, posts, post, auth) {

  $scope.isLoggedIn = auth.isLoggedIn;

  $scope.post = post;

  $scope.addComment = function() {
    if($scope.body && $scope.body !== '') {
      posts.createComment(post._id, {
        body: $scope.body,
        author: 'user'
      })
      .success(function(comment) {
        $scope.post.comments.push(comment);
      });
      $scope.body = '';
    }
  };

  $scope.upvoteComment = function(comment) {
    posts.upvoteComment(post, comment);
  };

  $scope.downvoteComment = function(comment) {
    posts.downvoteComment(post, comment);
  };

}]);

app.controller('AuthCtrl', ['$scope', '$state', 'auth', function($scope, $state, auth) {
  $scope.user = {};
  $scope.register = function() {
    auth.register($scope.user)
      .then(function(err) {
        if (err) {
          $scope.error = err;
        } else {
          $state.go('home');
        }
      });
  };

  $scope.logIn = function() {
    auth.logIn($scope.user)
      .then(function(err) {
        if (err) {
          $scope.error = err;
        } else {
          $state.go('home');
        }
      });
  };

}]);

app.controller('NavCtrl', ['$scope', 'auth', function($scope, auth) {
  $scope.isLoggedIn = auth.isLoggedIn;
  $scope.currentUser = auth.currentUser;
  $scope.logOut = auth.logOut;
}]);