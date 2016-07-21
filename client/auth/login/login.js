import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import ngMaterial from 'angular-material';
import ngMessages from  'angular-messages';

import { Meteor } from 'meteor/meteor';

import template from './loginForm.html';

const name = 'login';

export default angular.module(name, [
  angularMeteor,
  ngMaterial,
  ngMessages,
  uiRouter
])
  .controller('loginCtrl',['$scope','$state', function($scope, $state) {
    'ngInject';


    $scope.credentials = {
      email: 'test@test.de',
      password: '123456'
    };

    $scope.error = '';

    console.log('Login constructed');

  $scope.login = function() {
    console.log('Login clicked');
    console.log('email: ' + this.credentials.email);
    console.log('pasword: ' + this.credentials.password);
    Meteor.loginWithPassword($scope.credentials.email, $scope.credentials.password,
    function(err) {
        if (err) {
          $scope.error = err.reason;
          console.log(err);
        } else {
          $state.go('board');
        }
      })
  }
}])
  .config(config);

  function config($stateProvider) {
    'ngInject';

    $stateProvider.state('login', {
        url: '/login',
        templateUrl: template
      });
  }
