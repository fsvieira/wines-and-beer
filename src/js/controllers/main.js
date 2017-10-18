const wines = require('../wines');

wines.controller('MainCtrl', [
	'$scope',
function (
	$scope
) {
	'use strict';
	
	$scope.drinks = [
		{name: 'test1'},
		{name: 'test2'},
		{name: 'test3'},
		{name: 'test4'}
	];
	
}]);
