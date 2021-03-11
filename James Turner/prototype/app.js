const app = require("express")();
const http = require("http").Server(app);
const socket = require("socket.io")(http);
var five = require("johnny-five");
const {Board, Led} = require("johnny-five");

const board = new Board({ port: "COM3" });

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

http.listen(3000, () => {
  console.log("listening on *:3000");
});

board.on("ready", () => {
  //Create a standard `led` component
  //on a valid pwm pin
  const led = new Led(11);

  socket.on("buttonDown", () => {
    console.log("someone pressed the button");
    led.pulse();
    socket.emit("startLed");
  });

  socket.on("buttonUp", () => {
    console.log("someone released the button");
    led.stop().off();
    socket.emit("stopLed");
  });
});

