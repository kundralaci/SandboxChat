var express = require('express');
var app = express();
app.use(express.static('public'));
var io = require('socket.io')(3001);

var cnt=0;

app.get('/cnt', function(req, res){
	res.send({cnt: cnt});
});

app.get('/up', function(req, res){
	cnt++;
	res.end();
	io.emit('cnt', {cnt: cnt});
});

var server = app.listen(3000, function(){
	var address = server.address().address;
	var port = server.address().port;
	console.log('Listening at http://'+address+':'+port);
});

io.on('connection', function(socket){
	console.log('got new connection');
	socket.on('message', function(msg){
		io.emit('message', msg);
	});
});