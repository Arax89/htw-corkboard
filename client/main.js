import angular from 'angular';

import { Meteor } from 'meteor/meteor';

import { name as Corkboard } from './corkboard';

function onReady() {
  angular.bootstrap(document, [
    Corkboard
  ], {
    strictDi: true
  });
}

if (Meteor.isCordova) {
  angular.element(document).on('deviceready', onReady);
} else {
  angular.element(document).ready(onReady);
}
