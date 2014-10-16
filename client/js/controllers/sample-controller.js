app.controller('SampleController', ['$scope', '$resource', function($scope, $resource) {
	$scope.count = 7;
	// $scope.users = [
	// 	{name: 'A'},
	// 	{name: 'B'}
	// ];

	var User = $resource('/api/users');

	User.query(function(results) {
		$scope.users = results;
	})

	$scope.createUser = function() {
		var user = new User();
		user.name = $scope.userName;
		user.$save(function(result) {
			$scope.users.push(result);
			$scope.userName = '';
		});
		// $scope.users.push({name: $scope.userName});
		// $scope.userName = '';
	};

}]);