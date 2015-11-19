module.exports = function(app){	
	app.controller('MainController', ['$scope', '$location', function($scope, $location){
		$scope.setRoute = function(route){
			$location.path(route);
		}
	}]);
};