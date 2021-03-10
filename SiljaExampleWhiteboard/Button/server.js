<!DOCTYPE html>
<html>
   <head>
      <title>Socket.io Demo</title>
      <meta charset="utf-8">
		<link rel="stylesheet" href="styles.css">
   </head>
   <body>
		 <h1>Socket.io Demo</h1>	 
		 <p id="buttonCount">The button has been clicked 0 times.</p>
		 <button onclick="buttonClicked()">Click me</button>
		 <button onclick="playAudio()" type="button">Play Audio</button>
		 <button onclick="pauseAudio()" type="button">Pause Audio</button> 
		 <audio id="audio" src="Bees.mp3"></audio>
		 <script src="/socket.io/socket.io.js"></script>
		 <script>
			 var socket = io.connect();
			 
			 function buttonClicked(){
			   socket.emit('clicked');
			 }
			 
			 //when we receive buttonUpdate, do this
			 socket.on('buttonUpdate', function(data){
				 document.getElementById("buttonCount").innerHTML = 'The button has been clicked ' + data + ' times.';
			 });
             
			 //Add audio to the button
			 var x = document.getElementById("audio"); 

			 function playAudio() { 
				x.play(); 
				} 

			 function pauseAudio() { 
				x.pause(); 
				} 
			</script>
		</script>
   </body>
</html>

