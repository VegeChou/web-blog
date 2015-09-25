'use strict';

/* Controllers */
// userinfo controller
app.controller('UserInfoController', ['$scope', '$http', '$state', '$window', 'UserService', '$cookies',
  function($scope, $http, $state, $window, UserService, $cookies) {
    $scope.user = {};

    $http.get($scope.app.API + '/users/info', {
        headers: {
          'X-Session-ID': UserService.getToken()
        }
      })
      .success(function(data, status, headers, config) {
        $scope.user = data;
        console.log($scope.user.username);
      })
      .error(function(data, status, headers, config) {
        if (status == 403) {
          $state.go('signin');
        };
      });
  }
]);