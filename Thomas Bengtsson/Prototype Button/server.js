// part of setting up the server
var express = require("express");
var socket = require("socket.io");
var app = express();
var server = app.listen(3000, function () {
  console.log("Listening to requests on port 3000");
});
var io = socket(server);

//express looks for the files relative to the static directory
app.use(express.static("public"));

//listens for events on the client side
io.on("connection", function (socket) {
  console.log("New transmitter", socket.id);

  //listening for a button click and telling all the other clients that the button has been clicked
  socket.on("first", function (data) {
    io.emit("first", data);
    console.log("Button has been pressed by" + "  " + socket.id);
  });
});
