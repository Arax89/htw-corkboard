import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import ngMaterial from 'angular-material';

import template from './main.html';
import { name as Auth } from './auth/auth/auth';
import { name as Board } from './board/board/board';


class Corkboard {

}

const name = 'corkboad';

export default angular.module(name,[
  uiRouter,
  angularMeteor,
  ngMaterial,
  Auth,
  Board,
  'accounts.ui'
]).component(name, {
  templateUrl: template,
  controllerAs: name,
  controller: Corkboard
})
  .config(config)
  .run(run);

function config ($locationProvider, $urlRouterProvider) {
  'ngInject';
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/login');

}

function run($rootScope, $state) {
  'ngInject';
    console.log('Running');
    console.log('state: ' + $state.current);
  $rootScope.$on('$stateChangeError',
    (event, toState, toParams, fromState, fromParams, error) => {
      event.preventDefault();
      if (error === 'AUTH_REQUIRED') {
        $state.go('login');
        console.log('Auth required');
      }
    }
  );
  $rootScope.$on('')
}
