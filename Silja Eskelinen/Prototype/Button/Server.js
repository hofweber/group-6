var express = require('express');
var socket = require('socket.io');

var app = express();
var server = app.listen(5000, function() {
console.log("Listening to requests on port 5000")
});

app.use(express.static('public'));

var io = socket(server);
//User connects to server
io.on('connection', function(socket) {
console.log('New transmitter', socket.id);

    // Send back to server
    socket.on('changeColor', function(data) {
        io.emit('changeColor', data);
        console.log("Long press from " + socket.id);
        

    });
});
