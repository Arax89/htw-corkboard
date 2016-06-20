'use strict'

angular.module('corkboardApp')
.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
  .primaryPalette('deep-orange')
  .accentPalette('lime');
});