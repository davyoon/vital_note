var $ = require('jquery');
var app = angular.module('vitalsApp', ['ngRoute']);
require('./controllers/mainController.js')(app);
require('./controllers/homeController.js')(app);
require('./controllers/glucoseController.js')(app);
require('./controllers/pressureController.js')(app);




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