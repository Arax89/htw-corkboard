'use strict'

angular.module('corkboardApp')
.config(function($stateProvider) {
  var login = {
      name: 'login',
      url: '/',
      templateUrl: 'client/login/login.view.ng.html',
      controller: 'LoginCtrl'
  },
  register = {
    name: 'register',
    url: '/register',
    templateUrl: 'client/login/register.view.ng.html',
    controller: 'RegCtrl'
  };
  $stateProvider.state(login);
  $stateProvider.state(register);
})
.run(['$state', function($state){
  $state.transitionTo('login');
}]);
