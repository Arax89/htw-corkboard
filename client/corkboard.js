import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import template from './main.html';
import { name as Auth } from './auth/auth/auth';
import { name as Board } from './board/board/board';


class Corkboard {

}

const name = 'corkboad';

export default angular.module(name,[
  uiRouter,
  angularMeteor,
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
  $urlRouterProvider.otherwise('/board');

}

function run($rootScope, $state) {
  'ngInject';
    console.log('Running');
    console.log($rootScope);
  $rootScope.$on('$stateChangeError',
    (event, toState, toParams, fromState, fromParams, error) => {
      if (error === 'AUTH_REQUIRED') {
        $state.go('login');
      }
    }
  );
}
