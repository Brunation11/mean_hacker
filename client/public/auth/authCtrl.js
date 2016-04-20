var app = angular.module('meanNews');

app.controller('AuthCtrl', ['$scope', '$state', 'auth', function($scope, $state, auth) {

  $scope.loginUser = {};
  $scope.registerUser = {};

  $scope.register = function() {
    auth.register($scope.registerUser)
      .then(function(err) {
        if (err) {
          $scope.error = err;
        } else {
          $state.go('home');
        }
      });
  };

  $scope.logIn = function() {
    auth.logIn($scope.loginUser)
      .then(function(err) {
        if (err) {
          $scope.error = err;
        } else {
          $state.go('home');
        }
      });
  };

}]);