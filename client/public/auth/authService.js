var app = angular.module('meanNews');

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