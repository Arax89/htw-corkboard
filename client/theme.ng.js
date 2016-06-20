'use strict'

angular.module('corkboardApp')
.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
  .primaryPalette('blue')
  .accentPalette('amber');
})
.config(function($mdIconProvider){
  $mdIconProvider
    .icon('pin','pinIcon.svg')
});
