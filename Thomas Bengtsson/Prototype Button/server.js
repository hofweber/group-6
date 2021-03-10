// part of setting up the server
var express = require('express');  
var app = express();  
var server = require('http').createServer(app);
//makes the socket.io package available via the io variable
var io = require('socket.io')(server); 

//keeps count the number of clicks the button has left. Starts att 50 clicks
var clickCount = 1000;

//allows the use for CSS
app.use(express.static(__dirname + '/public')); 
//redirect / to our index.html file
app.get('/', function(req, res,next) {  
    res.sendFile(__dirname + '/public/index.html');
});

//when client connects to the browser it will say "CLient connected..." in terminal
io.on('connection', function(client) { 
	console.log('Client connected...'); 
	//when the button is clicked the click counter will be reduced by 1
    client.on('clicked', function(data) {
    	  clickCount--;
		  //this updates the click counter for all the clients
		  io.emit('buttonUpdate', clickCount);
    });
});

//makes web server and socket.io server start listening to port 3000
server.listen(3000, function(){
  console.log('listening on *:3000');
});
