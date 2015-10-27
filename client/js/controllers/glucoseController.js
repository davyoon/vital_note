app.controller('GlucoseController', ['$scope', '$http', function($scope, $http){

	var refresh = function(){
		$http.get('/api/glucoses').success(function(response){
			$scope.glucoses = response;
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

			$("#glucoseSelect").empty();
			$("#glucoseSelect").append("<option value=''>Please select</option>");
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