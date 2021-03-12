//set up dependencies
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

//start listening for messages from the client
io.on('connection', (socket) => {
//receive messages
  socket.on('chat message', (msg) => {
 //sends chat mesages to all users
   io.emit('chat message', msg);
  });
});
//check that the server is running on port 3000
http.listen(3000, () => {
  console.log('listening on *:3000');
});
