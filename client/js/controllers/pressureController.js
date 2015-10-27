app.controller('PressureController', ['$scope', '$http', function($scope, $http){

	var refresh = function(){
		$http.get('/api/pressures').success(function(response){
			$scope.pressures = response;
			var array = [];
			for(var i = 0; i < response.length; i++){
				var date = new Date(response[i].time);
				var month = date.getMonth() + 1;
				var year = date.getFullYear();
				if(i === 0){
					array.push(month + "/" + year)
				}else{
					var previousDate = new Date(response[i-1].time);
					var previousMonth = previousDate.getMonth() + 1;
					var previousYear = previousDate.getFullYear();
					if(month != previousMonth || year != previousYear){
						array.push(month + "/" + year)
					}
				}
			}

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