var app = angular.module('meanNews', ['ui.router']);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '../home/home.html',
      controller: 'PostsCtrl',
      resolve: {
        postPromise: ['posts', function(posts) {
          return posts.getAllPosts();
        }]
      }
    })

    .state('posts', {
      url: '/posts/{id}',
      templateUrl: '../posts/posts.html',
      controller: 'PostCtrl',
      resolve: {
        post: ['$stateParams', 'posts', function($stateParams, posts) {
          return posts.getOnePost($stateParams.id);
        }]
      }
    })

    .state('submitPost', {
      url: '/posts',
      templateUrl: '../posts/submit.html',
      controller: 'PostsCtrl',
      onEnter: ['$state', 'auth', function($state, auth) {
        if(!auth.isLoggedIn()) {
          $state.go('login');
        }
      }]
    })

    .state('login', {
      url: '/login',
      templateUrl: '../auth/login.html',
      controller: 'AuthCtrl',
      onEnter: ['$state', 'auth', function($state, auth) {
        if (auth.isLoggedIn()) {
          $state.go('home');
        }
      }]
    });

  $urlRouterProvider.otherwise('home');
}]);