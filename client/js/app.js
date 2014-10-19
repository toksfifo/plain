var app = angular.module('plainApp', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
	$routeProvider.
		when('/', {
			templateUrl: 'client/views/home.html',
			controller: ''
		}).
		when('/users/:userName', {
			templateUrl: 'client/views/todos.html',
			controller: 'SampleController'
		}).
		otherwise({
			redirectTo: '/'
		});
}]);