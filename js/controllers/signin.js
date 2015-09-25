'use strict';

/* Controllers */
// signin controller
app.controller('SigninFormController', ['$scope','$http', '$state','$window','UserService','$cookies',
  function($scope, $http, $state,$window,UserService,$cookies) {
  $scope.user = {};
  $scope.authError = null;
  $scope.login = function() {
    $scope.authError = null;
    // Try to login
    $http.post($scope.app.API+'/users/signin',{
        email: $scope.user.email,
        password: $scope.user.password
      })
    .success(function (data, status, headers, config) {
        if (data.access_token != null) {
          UserService.setToken(data.access_token);
          $state.go('dashboard.dashboard-v1');
        } else {
          $scope.authError = data;
        }
      })
      .error(function (data, status, headers, config) {
        // Erase the token if the user fails to log in
        UserService.clearToken();

        // Handle login errors here
        $scope.authError = data;
      });
  };
}]);