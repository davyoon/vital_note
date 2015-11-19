(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var app = angular.module('vitalsApp', ['ngRoute']);
require('./controllers/glucoseController.js');



app.config(function($routeProvider){
	// $locationProvider.html5Mode(true);

	$routeProvider
		.when('/pressure', {
			controller: 'PressureController',
			templateUrl: '/partials/pressure.html'
		})
		.when('/glucose', {
			controller: 'GlucoseController',
			templateUrl: '/partials/glucose.html'
		})
		.when('/', {
			controller: 'HomeController', 
			templateUrl: '/partials/home.html'
		})
});
},{"./controllers/glucoseController.js":2}],2:[function(require,module,exports){
module.exports = function(app){

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
				$("#glucoseSelect").append("<option value=''>Filter</option>");
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
};
},{}]},{},[1]);
