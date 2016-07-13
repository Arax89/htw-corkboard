'use strict';

angular.module('corkboardApp')

.config(function($urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/');
})
.factory('Auth', function() {return {isLoggedIn : false}})
.controller('AuthCtrl', ['$scope', 'Auth', function($scope, Auth){
  $scope.auth = Auth;
}])
.run(function ($rootScope, $state, $location, Auth) {
  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams, error) {
    var shouldLogin = toState.data !== undefined
                    && toState.data.requireLogin
                    && !Auth.isLoggedIn;

    if (shouldLogin){
      $state.go('login');
      event.preventDefault();
      return;
    }

    if(Auth.isLoggedIn){
      var shouldGoToMain = fromState.name === ""
                        && toState.name !== "main";

      if (shouldGoToMain) {
        $state.got('main');
        event.preventDefault();
      }
      return;
    }

    var shouldGoToPublic = fromState.name === ""
                        && toState.name !== "public"
                        && toState.name !== "auth";
    if(shouldGoToPublic) {
      $state.go('public');
      event.preventDefault();
    }

    switch(error) {
      case 'AUTH_REQUIRED':
        $state.go('auth', {url: '/login'});
        break;
      case 'FORBIDDEN':
      case 'UNAUTHORIZED':
        $state.go('auth', {url: '/login'});
        break;
      default:
        $state.go('auth', {url: '/login'});
        break;
    }
  });
});
