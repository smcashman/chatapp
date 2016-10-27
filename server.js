var socket_io = require('socket.io');
var http = require('http');
var express = require('express');

var app = express();
app.use(express.static('public'));

var server = http.Server(app);
var io = socket_io(server);


var clientsConnected = 0
io.on('connection', function (socket) {
    console.log('Client connected');
    clientsConnected ++
    console.log(clientsConnected)
    socket.broadcast.emit('count', clientsConnected);
    io.emit('message', 'A new user has joined!');
    io.emit('message', 'Currently, there are '+clientsConnected+' users online!')
    socket.on('user', function(userName) {
    socket.userName = userName;
});
    socket.on('message', function(message) {
        console.log('Received message from:'+socket.userName+':'+message);
        socket.broadcast.emit('message', socket.userName+' says: '+message);
	});

	socket.on('disconnect', function(){
	console.log('client disappeared');
	io.emit('message', 'A user disconnected');
})
});


server.listen(process.env.PORT || 8080);