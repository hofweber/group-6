// set up the dependencies
var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io")(server);

//keep track of how times clients have clicked the buttons
var clickCount = 0;

//connect the server to the html file
app.use(express.static(__dirname + "/public"));
//redirect / to our index.html file
app.get("/", function (req, res, next) {
  res.sendFile(__dirname + "/public/index.html");
});

//start listening for information from the client side
io.on("connection", function (client) {
//checks to see when users connect
  console.log("Client connected...");
//when the server receives that the client has clicked the addition button, do this
  client.on("clicked1", function (data) {
    clickCount++;
    console.log("button 1 " + clickCount);
//update the counter on the web page
    io.emit("buttonUpdate", clickCount);
  });
//when the server receives that the client has clicked the subtraction button, do this
  client.on("clicked2", function (data) {
    clickCount--;
    console.log("button 2 " + clickCount);
//update the counter on the web page
    io.emit("buttonUpdate", clickCount);
  });
});

//start the server and check that it is on port 3000
server.listen(3000, function () {
  console.log("listening on *:3000");
});

