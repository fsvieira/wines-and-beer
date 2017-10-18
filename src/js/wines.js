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
		.state('drinks', {
			url: '/drinks',
			templateUrl: 'templates/drinks/drinks.html'
		})
		.state('drinks.search', {
			url: '/search',
			templateUrl: 'templates/drinks/search.html'
		})
		.state('drinks.add', {
			url: '/add',
			templateUrl: 'templates/drinks/add.html'
		})
		.state('drinks.details', {
			url: '/details/:id',
			templateUrl: 'templates/drinks/details.html'
		});
		
	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise('/drinks/search');
}]);

module.exports = wines;
