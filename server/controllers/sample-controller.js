var User = require('../models/user');

module.exports.getAllUsers = function(req, res) {
	User.find({}, function(err, results) {
		res.json(results);
	});
};

module.exports.postSingleUser = function(req,res) {
	// console.log(req.body);
	// var user = new User(req.body);
	var user = new User();
	user.name = req.body.name;
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

	user.save(function(err, result) {
		res.json(result);
	});
};

module.exports.getSingleUser = function(req, res) {
	User.find({name: req.params.userName}, function(err, results) {
		res.json(results[0]);
	});
};

module.exports.getAllFolders = function(req, res) {
	User.find({name: req.params.userName}, function(err, results) {
		res.json(results[0].folders);
	});
};

module.exports.postSingleFolder = function(req, res) {
	User.find({name: req.params.userName}, function(err, results) {
		results[0].folders.push({
			name: req.body.name,
			todos: []
		});
		results[0].save(function(err, result) {
			res.json(result);
		});
	});
};

module.exports.deleteSingleFolder = function(req, res) {
	User.find({name: req.params.userName}, function(err, results) {
		var folderIndex = arrayObjectIndexOfName(results[0].folders, req.params.folderName);
		results[0].folders.splice(folderIndex, 1);
		results[0].save(function(err, result) {
			res.json(result);
		});
	});
};

module.exports.getAllTodos = function(req, res) {
	User.find({name: req.params.userName}, function(err, results) {
		var folderIndex = arrayObjectIndexOfName(results[0].folders, req.params.folderName);
		res.json(results[0].folders[folderIndex].todos);
	});
};

module.exports.postSingleTodo = function(req, res) {
	User.find({name: req.params.userName}, function(err, results) {
		var folderIndex = arrayObjectIndexOfName(results[0].folders, req.params.folderName);
		results[0].folders[folderIndex].todos.push(req.body.name);
		results[0].save(function(err, result) {
			res.json(result);
		});
	});
};

module.exports.deleteSingleTodo = function(req, res) {
	User.find({name: req.params.userName}, function(err, results) {
		var folderIndex = arrayObjectIndexOfName(results[0].folders, req.params.folderName);
		var todoIndex = results[0].folders[folderIndex].todos.indexOf(req.params.todoName);
		results[0].folders[folderIndex].todos.splice(todoIndex, 1);
		results[0].save(function(err, result) {
			res.json(result);
		});
	});
};

module.exports.updateSingleTodo = function(req, res) {
	User.find({name: req.params.userName}, function(err, results) {
		var folderIndex = arrayObjectIndexOfName(results[0].folders, req.params.folderName);
		var todoIndex = results[0].folders[folderIndex].todos.indexOf(req.params.todoName);
		// results[0].folders[folderIndex].todos[todoIndex] = req.body.name;
		results[0].folders[folderIndex].todos = results[0].folders[folderIndex].todos.slice(0,todoIndex) + req.body.name + results[0].folders[folderIndex].todos.slice(todoIndex+1);
		results[0].save(function(err, result) {
			res.json(result);
		});
	});
};

module.exports.updateSingleFolder = function(req, res) {
	User.find({name: req.params.userName}, function(err, results) {
		var folderIndex = arrayObjectIndexOfName(results[0].folders, req.params.folderName);
		results[0].folders[folderIndex].name = req.body.name;
		results[0].save(function(err, result) {
			res.json(result);
		});
	});
};

arrayObjectIndexOfName = function(myArray, searchTerm) {
	if (myArray) {
		for (var i=0; i<myArray.length; i++) {
			if (myArray[i].name === searchTerm) return i;
		}
		return -1;
	}
};
































