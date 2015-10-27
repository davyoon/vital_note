app.controller('GlucoseController', ['$scope', '$http', function($scope, $http){

	var refresh = function(){
		$http.get('/api/glucoses').success(function(response){
			$scope.glucoses = response;
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
				$("#glucoseSelect").append("<option " + "value=" + array[i] + ">" + array[i] + "</option>");
			}

		});
	}


	refresh();

	$scope.createGlucose = function(){
		$http.post('/api/glucoses', $scope.glucose).success(function(response){
			$scope.glucose = '';
			refresh();

		})
	}

	$scope.removeGlucose = function(id){

		$http.delete('/api/glucoses/' + id).success(function(response){
			refresh();
		});
	}


}])