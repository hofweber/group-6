const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
//var five = require('johnny-five');
//const board = new Board();
var heldDown = false;


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });

  http.listen(3000, () => {
    console.log('listening on *:3000');
  });

 // board.on("ready", () => {
    // Create a standard `led` component
    // on a valid pwm pin
   // const led = new Led(11);

if (heldDown = true) {
    //led.pulse(),
    console.log("button held down");
} else {
    //led.stop().off(),
    console.log("button not held down");
};

   // led.pulse();

    // Stop and turn off the led pulse loop after
    // 10 seconds (shown in ms)
   // board.wait(10000, () => {
  
      // stop() terminates the interval
      // off() shuts the led off
     // led.stop().off();
   // });
 // });
     // led.stop().off();
   // });
 // });
