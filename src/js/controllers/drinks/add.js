const wines = require('../../wines');

wines.controller('DrinksAddCtrl', [
	'$scope',
	'drinksService',
function (
	$scope,
	drinksService
) {
	'use strict';
	
	$scope.drink = {};
	
	function resetForm () {
		$scope.drink.form = {
			type: 'wine',
			name: '',
			year: '',
			vineyard: '',
			service: 'local'
		};
	}
	
	resetForm();
	
	$scope.add = function () {
		const form = $scope.drink.form;
		const errors = $scope.drink.errors = [];
		delete $scope.drink.message;

		for (var field in form) {
			if (form.hasOwnProperty(field)) {
				const value = form[field];
				if (!value || value.trim().length === 0) {
					errors.push('Field ' + field + ' is required!');
				}
			}
		}
		
		if (errors.length === 0) {
			drinksService.save($scope.drink.form).then((drink) => {
				$scope.drink.message = 'Drink ' + drink.name + ' Saved!';
				resetForm();
			}, (err) => {
				errors.push(err);
			});
		}
	};

}]);
