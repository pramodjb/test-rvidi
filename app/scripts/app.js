'use strict';

/**
 * @ngdoc overview
 * @name rVidiWebApp
 * @description
 * # rVidiWebApp
 *
 * Main module of the application.
 */
 angular
 .module('rVidiWebApp', [
  'ngAnimate',
  'ngCookies',
  'ngResource',
  'ngRoute',
  'ngSanitize',
  'ngTouch',
  'ngIdle',
  'LocalStorageModule',
  "ngSanitize",
  "com.2fdevs.videogular",
  "com.2fdevs.videogular.plugins.controls",
  "com.2fdevs.videogular.plugins.overlayplay",
  "com.2fdevs.videogular.plugins.poster",
  "com.2fdevs.videogular.plugins.buffering",
  'config'
  ])
 .config(function ($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'views/login.html',
    controller: 'LoginCtrl',
    controllerAs: 'logCtrl'
  })
  .when('/shows', {
    templateUrl: 'views/list.html',
    controller: 'ListCtrl',
    controllerAs: 'listCtrl'
  })
  .otherwise({
    redirectTo: '/'
  });
});


