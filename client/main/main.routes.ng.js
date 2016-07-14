'use strict'

angular.module('corkboardApp')
.config(function($stateProvider) {
  $stateProvider
  .state('main', {
    url: '/',
    templateUrl: 'client/main/main.view.ng.html',
    controller: 'MainCtrl',
    data: {requireLogin : true}
  });
});
