app.controller('MainController', ['$scope', '$location', function($scope, $location){
	$scope.setRoute = function(route){
		$location.path(route);
	}
	$scope.name = "picard";
}])