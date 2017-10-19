const wines = require('../wines');

wines.factory('drinksService', [
	'$http', '$q', 'config',
function (
	$http,
	$q,
	config
) {
	'use strict';
	
	var cache = {};
	
	const localStorageMyDrinks = config.appId + '@myDrinks';
	const excludeFields = ['image'];
	
	function load () {
		if (cache.myDrinks) {
			return $q.resolve(cache.myDrinks);
		}
		else {
			const data = localStorage.getItem(localStorageMyDrinks);
			cache.myDrinks = data?JSON.parse(data):[];
			return $q.resolve(cache.myDrinks);
		}
	}

	function save (drink) {
		return load().then(myDrinks => {
			myDrinks.push(drink);
			localStorage.setItem(
				localStorageMyDrinks, 
				JSON.stringify(myDrinks)
			);

			return drink;
		});
	}
	
	function search (query) {
		return $q.all([
			load(), 
			$http.get(config.service).then(
				({data: drinks, status}) => {
					if (status === 200) {
						return drinks;
					}
					
					return [];
				},
				() => $q.resolve([])
			)
		]).then(drinks => {
			return drinks.reduce((result, drinks) => result.concat(drinks), []);
		})
		.then((drinks) => {
			if (!query || query.trim().length === 0) {
				return drinks;
			}
			
			const words = query.trim().split(' ');
			
			return drinks.filter(drink => {
				for (var field in drink) {
					if (excludeFields.indexOf(field) === -1 &&
						drink.hasOwnProperty(field)
					) {
						for (var i=0; i<words.length; i++) {
							const word = words[i];
							
							if (('' + drink[field]).indexOf(word) !== -1) {
								return true;
							}
						}
					}
				}
				
				return false;
			});
		}).then(drinks => {
			const {filters, sort} = drinks.reduce((acc, drink) => {
				const {filters, sort} = acc;
				
				for (var field in drink) {
					if (excludeFields.indexOf(field) === -1 &&
						drink.hasOwnProperty(field)
					) {
						const value = drink[field];
						
						filters[field] = filters[field] || [];
						if (filters[field].indexOf(value) === -1) {
							filters[field].push(value);
						}
						
						if (sort.indexOf(field) === -1) {
							sort.push(field);
						}
					}
				}

				return acc;
			}, {filters: {}, sort: []});

			// remove filters with only one value,
			for (var filter in filters) {
				if (filters[filter].length <= 1) {
					delete filters[filter];
				}
			}
							
			return {filters, sort, drinks};
		});
	}

	return {
		search,
		load,
		save
	};
}]);

