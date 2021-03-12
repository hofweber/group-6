//set up dependencies
const app = require("express")();
const http = require("http").Server(app);
const socket = require("socket.io")(http);

//set up the Arduino board
const {Board, Led} = require("johnny-five");

const board = new Board({ port: "COM3" });

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

//establish that the server is running on serial port 3000
http.listen(3000, () => {
  console.log("listening on *:3000");
});

//get the Arduino board running
board.on("ready", () => {
//Create a standard `led` component
//on a valid pwm pin
  const led = new Led(11);

//start listening for information from the client
socket.on('connection', function(socket){
//when someone presses the button, start blinking the led 
  socket.on("buttonDown", () => {
    console.log("someone pressed the button");
    led.blink();
    socket.emit("startLed");
 }) });

//start listening for information from the client
 socket.on('connection', function(socket){
//when someone releases the button, turn off the led
  socket.on("buttonUp", () => {
    console.log("someone released the button");
    led.stop().off();
    socket.emit("stopLed");
  }) });
});
