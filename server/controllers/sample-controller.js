var User = require('../models/user');

module.exports.list = function(req, res) {
	User.find({}, function(err, results) {
		res.json(results);
	});
};

module.exports.create = function(req,res) {
	// console.log(req.body);
	var user = new User(req.body);
	// var user = new User();
	// user.name = req.body;
	// user.folders = [{
	// 	name: 'Important',
	// 	todos: ['hi']
	// },{
	// 	name: 'Urgent',
	// 	todos: []
	// },{
	// 	name: 'Chill',
	// 	todos: []
	// }];

	user.save(function(err, result) {
		res.json(result);
	});
};

module.exports.retrieve = function(req, res) {
	User.find({name: req.params.userName}, function(err, results) {
		res.json(results[0]);
	});
};

module.exports.edit = function(req, res) {
	User.find({name: req.params.userName}, function(err, results) {
		var user = results[0];
		user.folders[0].todos.push('hey there!');
		user.save(function(err,result) {
			res.json(result);
		});
	});
};