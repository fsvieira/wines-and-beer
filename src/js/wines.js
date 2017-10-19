const angular = require('angular');
const uirouter = require('angular-ui-router');
const wines = angular.module('wines', [uirouter]);

wines.config([
	'$stateProvider',
	'$urlRouterProvider',
function (
	$stateProvider,
	$urlRouterProvider
) {
	'use strict';

	$stateProvider
		.state('drinks-search', {
			url: '/drinks/search',
			templateUrl: 'templates/drinks/search.html',
			controller: 'DrinksSearchCtrl'
		})
		.state('drinks-add', {
			url: '/add',
			templateUrl: 'templates/drinks/add.html',
			controller: 'DrinksAddCtrl'
		})
		.state('drinks-details', {
			url: '/details/:id',
			templateUrl: 'templates/drinks/details.html'
		})
		.state('about', {
			url: '/about',
			templateUrl: 'templates/about.html'
		});
		
	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise('/drinks/search');
}]);

module.exports = wines;
