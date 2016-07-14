'use strict'

angular.module('corkboardApp')
.config(function($stateProvider) {
  $stateProvider
  .state('login', {
    url: '/',
    templateUrl: 'client/login/login.view.ng.html',
    controller: 'LoginCtrl'
  });
});
