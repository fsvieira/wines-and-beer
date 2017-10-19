const wines = require('../../wines');

wines.controller('DrinksSearchCtrl', [
	'$scope',
	'drinksService',
function (
	$scope,
	drinksService
) {
	'use strict';
	
	$scope.search = {
		form: {query: ''},
		filters: {}
	};

	$scope.doSearch = function () {
		drinksService.search($scope.search.form.query).then(
			drinks => {
				// clean up filters and sort,
				$scope.search.fillters = {};
				delete $scope.search.sort;
				
				$scope.search.results = drinks;
			}
		);
	};
	
	function filterDrinks (drinks, filter, value) {
		if (value !== '') {
			return drinks.filter(drink => drink[filter] == value);
		}
		
		return drinks;
	}
	
	$scope.filter = function () {
		var toFilter = $scope.search.results.originalResults = 
			$scope.search.results.originalResults || 
			$scope.search.results.drinks
		;
		
		const filters = $scope.search.filters;
		for (var filter in filters) {
			if (filters.hasOwnProperty(filter)) {
				toFilter = filterDrinks(toFilter, filter, filters[filter]);
			}
		}
		
		$scope.search.results.drinks = toFilter;
	};
	
	$scope.sort = function () {
		const field = $scope.search.sort;
		
		if (field && field.length > 0) {
			$scope.search.results.drinks.sort((a, b) => {
				const valueA = a[field];
				const valueB = b[field];
				
				return ('' + valueA).localeCompare('' + valueB);
			});
		}
		
	};
	
}]);
