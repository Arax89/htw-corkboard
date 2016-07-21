import angular from 'angular';
import angularMeteor from 'angular-meteor';

import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { name as Register } from '../register/register';

import { name as Login } from '../login/login';

import template from './auth.html';


const name = 'auth';

class Auth {
  constructor($scope, $reactive) {
    'ngInject';

    $reactive(this).attach($scope);

    this.helpers({
      isLoggedIn() {
        Console.log(Meteor.userId());
        return !!Meteor.userId();
      },
      currentUser() {
        Console.log(Meteor.user());
        return Meteor.user();
      }
    });
  }

  logout() {
    Accounts.logout();
  }
}

// create a module
export default angular.module(name, [
  angularMeteor,
  Login,
  Register
]).component(name, {
  template,
  controllerAs: name,
  controller: Auth
});
