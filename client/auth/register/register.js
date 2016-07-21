import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import { Accounts } from 'meteor/accounts-base';

import template from './register.html';

class Register {};

const name = 'registerForm';

export default angular.module(name, [
  angularMeteor,
  uiRouter
]).component(name, {
  template,
  controllerAs: name,
  controller: Register
}).controller('registerCtrl',['$scope', function($scope){

  $scope.credentials = {
    username: '',
    email: '',
    password: ''
  };

  $scope.error = '';
  $scope.register = function() {
   Accounts.createUser($scope.credentials, function(err){
     if(err) {
       $scope.error = err.reason;
     } else {
       $state.go('board');
     }
   });
 }
}])
  .config(config);

  function config($stateProvider) {
    'ngInject';
    $stateProvider
      .state('register', {
        url: '/register',
        templateUrl: template
      });
  }
