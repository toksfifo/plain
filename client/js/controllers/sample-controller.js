app.controller('SampleController', ['$scope', '$resource', function($scope, $resource) {
	$scope.count = 7;


	var User = $resource('/api/users');

	User.query(function(results) {
		$scope.users = results;
		$scope.currentUser = $scope.users[24];
		$scope.currentFolder = $scope.currentUser.folders[0];
	})

	$scope.createUser = function() {
		if ($scope.userName) {
			var user = new User();
			user.name = $scope.userName;
			user.folders = [{
				name: 'Important',
				todos: ['hi']
			},{
				name: 'Urgent',
				todos: []
			},{
				name: 'Chill',
				todos: []
			}];
			user.$save(function(result) {
				$scope.users.push(result);
				$scope.userName = '';
			});
		}
		
		// $scope.users.push({name: $scope.userName});
		// $scope.userName = '';
	};

	

	$scope.newUser = function(user) {
		$scope.currentUser = user;
	};

	// $scope.isCurrent = function(user) {
	// 	return $scope.currentUser == user;
	// };

	$scope.newFolder = function(folder) {
		$scope.currentFolder = folder;
	}

	$scope.addTodo = function() {
		if ($scope.newTodo) {

			var SpecificUser = $resource('/api/users/:userName', {userName:'@name'});
			SpecificUser.get({userName: $scope.currentUser.name}, function(user) {
				console.log('user:', user);
				var folderIndex = $scope.arrayObjectIndexOfName($scope.currentUser.folders, $scope.currentFolder.name);
				user.folders[folderIndex].todos.push($scope.newTodo);
				$scope.newTodo = '';
				user.$save(function() {
					
				});
			})

			// var folderIndex = $scope.arrayObjectIndexOfName($scope.currentUser.folders, $scope.currentFolder.name);
			// $scope.currentUser.folders[folderIndex].todos.push($scope.newTodo);
			// $scope.newTodo = '';
			// $scope.currentUser.$save();
		}
	}

	$scope.arrayObjectIndexOfName = function(myArray, searchTerm) {
		if (myArray) {
			for (var i=0; i<myArray.length; i++) {
				if (myArray[i].name === searchTerm) return i;
			}
			return -1;
		}
		
	};

}]);
