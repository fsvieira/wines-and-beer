const wines = require('../wines.js');

wines.factory('drinks', [
	'$http', '$q', 'config',
function (
	$http,
	$q,
	config
) {
	'use strict';
	
	function search () {
		return $http.get(config.service);
	}
		
	return {
		search
	};
}]);

