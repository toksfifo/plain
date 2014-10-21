app.controller('SampleController', ['$scope', '$http', '$routeParams', '$location', function($scope, $http, $routeParams, $location) {

	$scope.currentUser;
	$scope.currentFolder;
	$scope.show;

	$http.get('api/users/' + $routeParams.userName)
		.success(function(data) {
			if (data) { // if user exists
				$scope.currentUser = data;
			}
			else { // if user doesn't exist
				$scope.userName = $routeParams.userName;
				$scope.createUser();
			}
			
			// set current folder
			var importantFolderIndex = $scope.arrayObjectIndexOfName($scope.currentUser.folders, 'Important');
			var importantFolder = $scope.currentUser.folders[importantFolderIndex];
			$scope.currentFolder = importantFolder || $scope.currentUser.folders[0];
		})
		.error(function(data) {
			console.log('Error: ', data);
		});

	

	$scope.createUser = function() {

		if ($scope.userName) {
			$http.post('api/users', {name: $scope.userName})
				.success(function(data) {
					$scope.currentUser = data;
				})
				.error(function(data) {
					console.log('Error: ', data);
				});
		}
	};

	// $scope.redirect = function() {
	// 	console.log('go');
	// };


	$scope.createFolder = function() {
		// console.log('go');
		if ($scope.newFolder) {
			$http.post('api/users/' + $scope.currentUser.name + '/folders', {name: $scope.newFolder})
				.success(function(data) {
					$scope.currentUser.folders.push(
						{
							name: $scope.newFolder,
							todos: []
						});
					$scope.newFolder = '';
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
	
	$scope.isActive = function(folder) {
		return folder == $scope.currentFolder;
	}

	$scope.isFirst = function(folder) {
		return folder == $scope.currentUser.folders[0];
	}

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

	$scope.deleteTodo = function(todo) {
		$http.delete('/api/users/' + $scope.currentUser.name + '/folders/' + $scope.currentFolder.name + '/' + todo)
			.success(function(data) {
				var todoIndex = $scope.listOfTodos().indexOf(todo);
				$scope.listOfTodos().splice(todoIndex, 1);
			})
			.error(function(data) {
				console.log('Error: ', data);
			});
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
