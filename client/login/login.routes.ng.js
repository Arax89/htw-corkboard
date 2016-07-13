'use strict'

angular.module('corkboardApp')
.config(function($stateProvider) {
  $stateProvider
  .state('login', {
    url: '/login',
    controller: 'LoginCtrl',
    templateUrl: 'client/login/login.view.ng.html'
  })
  .state('register', {
    url: '/register',
    controller: 'RegCtrl',
    templateUrl: 'client/login/register.view.ng.html'
  });
});
