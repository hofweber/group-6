// part of setting up the server
const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);

//redirect / to our index.html file
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

//when a client connects to the browser or disconnects, it will send a message in the terminal
io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

//start listening to port 3000
http.listen(3000, () => {
  console.log("listening on *:3000");
});

//listening for messages from the client
io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    console.log("message: " + msg);
  });
  //listening for button click and letting other clients now when the button has been clicked
  socket.on("music", function (data) {
    io.emit("music", data);
  });
});

//sends a message to all the connected clients
io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
});
