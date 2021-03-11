var express = require('express');
var socket = require('socket.io');
var app = express();
var server = app.listen(3000, function() {
console.log("Listening to requests on port 3000")
});

var io = socket(server);

app.use(express.static('public'));

io.on('connection', function(socket) {
console.log('New transmitter', socket.id);


    socket.on('first', function(data) {
        socket.emit('first', data);
        console.log('Long press from' + socket.id);

    socket.on('second', function(data) {
        socket.emit('second', data);
        console.log('second button has been pressed from' + socket.id);
    })
     
    });
});
