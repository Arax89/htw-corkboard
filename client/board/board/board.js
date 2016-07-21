import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import template from './board.html';

class Board {};

const name = 'board';

export default angular.module(name, [
  angularMeteor,
  uiRouter
]).component(name, {
  template,
  controllerAs: name,
  controller: Board
})
  .config(config);

  function config($stateProvider) {
    'ngInject';
    $stateProvider
      .state('board', {
        url: '/board',
        templateUrl: template,
        resolve: {
          currentUser($q) {
            if (Meteor.userId() === null) {
              return $q.reject('AUTH_REQUIRED');
            } else {
              return $q.resolve();
            }
          }
        }
      });
  }
