var mongoose = require('mongoose');

module.exports = mongoose.model('User', {
	name: String,
	folders: [{
		name: String,
		todos: []
	},{
		name: String,
		todos: []
	},{
		name: String,
		todos: []
	}]
});