var app = angular.module('vitalsApp', ['ngRoute']);
require('./controllers/mainController.js');
require('./controllers/homeController.js');
require('./controllers/glucoseController.js');
require('./controllers/pressureController.js');



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