var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var SampleController = require('./server/controllers/sample-controller.js');

mongoose.connect('mongodb://localhost:27017/users');
// mongoose.connect('mongodb://heroku_app30863986:35qnqeqhhc44svh1ams4briida@ds045970.mongolab.com:45970/heroku_app30863986');

app.use(bodyParser());

app.get('/', function(req,res) {
	res.sendfile(__dirname + '/client/views/index.html');
});

app.use('', express.static(__dirname));

// REST API
app.get('/api/users', SampleController.getAllUsers);
app.post('/api/users', SampleController.postSingleUser);
app.get('/api/users/:userName', SampleController.getSingleUser);
app.get('/api/users/:userName/folders', SampleController.getAllFolders);
app.post('/api/users/:userName/folders', SampleController.postSingleFolder);
app.delete('/api/users/:userName/folders/:folderName', SampleController.deleteSingleFolder);
app.get('/api/users/:userName/folders/:folderName', SampleController.getAllTodos);
app.post('/api/users/:userName/folders/:folderName', SampleController.postSingleTodo);
app.delete('/api/users/:userName/folders/:folderName/:todoName', SampleController.deleteSingleTodo);
app.put('/api/users/:userName/folders/:folderName/:todoName', SampleController.updateSingleTodo);
app.put('/api/users/:userName/folders/:folderName', SampleController.updateSingleFolder);


app.listen(3000, function() {
	console.log('lisening on port 3000');
});

// app.listen(process.env.PORT, function() {
// 	console.log('listening on heroku');
// });