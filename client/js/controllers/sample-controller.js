app.controller('SampleController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {

	$scope.fromUrl = $routeParams.userName;
	$scope.currentUser;
	$scope.currentFolder;

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

	$scope.createFolder = function() {
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
	
	// $scope.switchUser = function(user) {
	// 	$scope.currentUser = user;
	// };

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
