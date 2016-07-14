'use strict';

angular.module('corkboardApp')
.controller('LoginCtrl', function($scope, $state) {
  $scope.viewName = 'Login';
  $scope.content = ['login', 'register'];
  $scope.setPage = function (page) {
    $state.transitionTo(page);
  }
});
