'use strict';

/**
 * 0.1.1
 * Deferred load js/css file, used for ui-jq.js and Lazy Loading.
 * 
 * @ flatfull.com All Rights Reserved.
 * Author url: #user/flatfull
 */

angular.module('user.service', [])
	.config(['$httpProvider', function($httpProvider) {
	  $httpProvider.defaults.withCredentials = true;
	  var interceptor = ['$rootScope', '$q', function($rootScope, $q) {
	    function success(response) {
	      return response;
	    }

	    function error(response) {
	      if (response.status === 401 && !response.config.ignoreAuthModule) {
	        $rootScope.$broadcast('event:auth-loginRequired');
	      }
	      return $q.reject(response);
	    }

	    return function(promise) {
	      return promise.then(success, error);
	    };

	  }];
	  $httpProvider.interceptors.push(interceptor);
	}])
	.service('UserService', function($cookieStore) {
	// body...
	var service = {};
	var token = null;

	var setToken  = function(token){
		$cookieStore.put('token',token);
	}

	var getToken = function(){
		token = $cookieStore.get('token');
		return token;
	}

	var clearToken = function(){
		$cookieStore.remove('token');
	}

	return {
		setToken: function(token){
			return setToken(token);
		},
		getToken: function(){
			return getToken();
		},
		clearToken: function(){
			return clearToken();
		}
	};
});