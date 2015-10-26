var app = angular.module('vitalsApp', ['ngRoute']);

app.config(function($routeProvider){
	// $locationProvider.html5Mode(true);

	$routeProvider
		.when('/pressure', {
			// controller: 'PressureController',
			templateUrl: '/partials/pressure.html'
		})
		.when('/glucose', {
			// controller: 'GlucoseController',
			templateUrl: '/partials/glucose.html'
		})
		.when('/home', {
			// controller: 'HomeController', 
			templateUrl: '/partials/home.html'
		})
});
