var app = angular.module('meanNews');

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