app.controller('PressureController', ['$scope', '$http', function($scope, $http){

	var refresh = function(){
		$http.get('/api/pressures').success(function(response){
			$scope.pressures = response;
			var array = [];
			for(var i = 0; i < response.length; i++){
				var date = response[i].filter;
				if(i === 0){
					array.push(date);
				}else{
					var previousDate = response[i-1].filter;
					if(date != previousDate){
						array.push(date);
					}
				}
			}

			$("#pressureSelect").empty();
			$("#pressureSelect").append("<option value=''>Filter</option>");
			for(var i = 0; i < array.length; i++){
				$("#pressureSelect").append("<option " + "value=" + array[i] + ">" + array[i] + "</option>");
			}

		});
	}
	
	refresh();

	$scope.createPressure = function(){
		$http.post('/api/pressures', $scope.pressure).success(function(response){
			$scope.pressure = '';
			refresh();	
		})
	}

		$scope.removePressure = function(id){

		$http.delete('/api/pressures/' + id).success(function(response){
			refresh();
		});
	}
 	
}])