import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import { Meteor } from 'meteor/meteor';

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
.controller('CorkBoardCtrl',['$scope', function ($scope) {
    $scope.dragOptions = {
        start: function (e) {
            console.log("STARTING");
        },
        drag: function (e) {
            console.log("DRAGGING");
        },
        stop: function (e) {
            console.log("STOPPING");
        },
        container: 'container'
    }

}])

.directive('ngDraggable', ['$document',function($document) {
    return {
        restrict: 'A',
        scope: {
            dragOptions: '= ngDraggable'
        },
        link: function(scope, elem, attr) {
            var startX, startY, x = 0, y = 0,
                start, stop, drag, container;

            var width  = elem[0].offsetWidth,
                height = elem[0].offsetHeight;

            // Obtain drag options
            if (scope.dragOptions) {
                start  = scope.dragOptions.start;
                drag   = scope.dragOptions.drag;
                stop   = scope.dragOptions.stop;
                var id = scope.dragOptions.container;
                if (id) {
                    container = document.getElementById(id).getBoundingClientRect();
                }
            }

            // Bind mousedown event
            elem.on('mousedown', function(e) {
                e.preventDefault();
                startX = e.clientX - elem[0].offsetLeft;
                startY = e.clientY - elem[0].offsetTop;
                $document.on('mousemove', mousemove);
                $document.on('mouseup', mouseup);
                if (start) start(e);
            });

            // Handle drag event
            function mousemove(e) {
                y = e.clientY - startY;
                x = e.clientX - startX;
                setPosition();
                if (drag) drag(e);
            }

            // Unbind drag events
            function mouseup(e) {
                $document.unbind('mousemove', mousemove);
                $document.unbind('mouseup', mouseup);
                if (stop) stop(e);
            }

            // Move element, within container if provided
            function setPosition() {
                if (container) {
                    if (x < container.left) {
                        x = container.left;
                    } else if (x > container.right - width) {
                        x = container.right - width;
                    }
                    if (y < container.top) {
                        y = container.top;
                    } else if (y > container.bottom - height) {
                        y = container.bottom - height;
                    }
                }

                elem.css({
                    top: y + 'px',
                    left:  x + 'px'
                });
            }
        }
    }

}])
  .controller('boardCtrl',['$scope','$state', function($scope, $state) {

    $scope.user = Meteor.user().username;
    if ($scope.user === null) {
      $state.go('login');
    }
    console.log('boardCtrl constructed');
    $scope.logout = function() {
      console.log('Logout');
      Meteor.logout(function(err){
        if (err) {
          console.log(err);
        } else {
          $state.go('login');
        }
      });
    }
  }])
  .config(config);

  function config($stateProvider) {
    'ngInject';
    $stateProvider
      .state('board', {
        url: '/board',
        templateUrl: template,
        resolve: {
          currentUser($q) {
            console.log("Promise");
            console.log(Meteor.userId());
            if (Meteor.userId() === null) {
              console.log('reject');
              return $q.reject('AUTH_REQUIRED');
            } else {
              console.log('resolve');
              return $q.resolve();
            }
          }
        }
      })
      .state('corkboard', {
          url: '/corkboard',
          templateUrl: 'client/corkboard/corkboard.view.ng.html',
          controller: 'CorkBoardCtrl'
      });;
  }
