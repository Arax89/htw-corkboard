import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

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
})
  .config(config);

  function config($stateProvider) {
    'ngInject';
    $stateProvider
      .state('register', {
        url: '/register',
        templateUrl: template
      });
  }
