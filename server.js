var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var SampleController = require('./server/controllers/sample-controller.js');

mongoose.connect('mongodb://localhost:27017/users');

app.use(bodyParser());

app.get('/', function(req,res) {
	res.sendfile(__dirname + '/client/views/index.html');
});

app.use('', express.static(__dirname));

// REST API
app.get('/api/users', SampleController.list);
app.post('/api/users', SampleController.create);
app.get('/api/users/:userName', SampleController.retrieve);
app.post('/api/users/:userName', SampleController.edit);

app.listen(3000, function() {
	console.log('lisening on port 3000');
})