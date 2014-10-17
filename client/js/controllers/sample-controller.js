app.controller('SampleController', ['$scope', '$resource', '$http', function($scope, $resource, $http) {

	$scope.currentUser;
	$scope.currentFolder;

	$http.get('api/users')
		.success(function(data) {
			$scope.users = data;
		})
		.error(function(data) {
			console.log('Error: ', data);
		});

	$scope.createUser = function() {
		if ($scope.userName) {
			$http.post('api/users', {name: $scope.userName})
				.success(function(data) {
					$scope.users.push(data);
					$scope.userName = '';
				})
				.error(function(data) {
					console.log('Error: ', data);
				});
		}
	};

	$scope.listOfTodos = function() {
		if ($scope.currentUser && $scope.currentFolder) {
			return $scope.currentUser.folders[$scope.arrayObjectIndexOfName($scope.currentUser.folders, $scope.currentFolder.name)].todos;
		}
	};
	
	$scope.switchUser = function(user) {
		$scope.currentUser = user;
	};

	$scope.switchFolder = function(folder) {
		$scope.currentFolder = folder;
	}

	$scope.createTodo = function() {
		if ($scope.newTodo) {
			$http.post('api/users/' + $scope.currentUser.name + '/folders/' + $scope.currentFolder.name, {name: $scope.newTodo})
				.success(function(data) {
					$scope.listOfTodos().push($scope.newTodo);
					$scope.newTodo = '';
				})
				.error(function(data) {
					console.log('Error: ', data);
				});
		}
	};

	$scope.arrayObjectIndexOfName = function(myArray, searchTerm) {
		if (myArray) {
			for (var i=0; i<myArray.length; i++) {
				if (myArray[i].name === searchTerm) return i;
			}
			return -1;
		}
		
	};

}]);
