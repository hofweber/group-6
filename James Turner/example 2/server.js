// server.js
var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io")(server);

//keep track of how times clients have clicked the button
var clickCount = 0;


app.use(express.static(__dirname + "/public"));
//redirect / to our index.html file
app.get("/", function (req, res, next) {
  res.sendFile(__dirname + "/public/index.html");
});

io.on("connection", function (client) {
  console.log("Client connected...");
  //when the server receives clicked message, do this
  client.on("clicked1", function (data) {
    clickCount++;
    console.log("button 1 " + clickCount);
    //send a message to ALL connected clients
    io.emit("buttonUpdate", clickCount);
  });
  client.on("clicked2", function (data) {
    clickCount--;
    console.log("button 2 " + clickCount);
    //send a message to ALL connected clients
    io.emit("buttonUpdate", clickCount);
  });
});

//start our web server and socket.io server listening
server.listen(3000, function () {
  console.log("listening on *:3000");
});

