'use strict';

(function() {

  var socket = io();
  var canvas = document.getElementsByClassName('whiteboard')[0];
  var colors = document.getElementsByClassName('color');
  var context = canvas.getContext('2d');

  var current = {
    color: 'black'
  };
  var drawing = false;

  socket.on('drawing', onDrawingEvent);

  function onDrawingEvent(data){
    
    drawLeaf(data.color);
    
  }

  function drawLeaf(color, emit) {
    var ctx = canvas.getContext('2d');
    var x,y
    ctx.beginPath();     // Start a new path.
    ctx.lineWidth = "3";
    ctx.strokeStyle = "green";  // This path is green
    ctx.fillStyle = color;
    x=150;
    y=150;
    ctx.moveTo(x, y);
    ctx.lineTo(x-=50, y+=50);
    ctx.lineTo(x+=40, y);
    ctx.lineTo(x-=50, y+=50);
    ctx.lineTo(x+=40, y);
    ctx.lineTo(x-=50, y+=50);
    ctx.lineTo(x+=140, y);
   
    ctx.lineTo(x-=50, y-=50);
    ctx.lineTo(x+=40, y);
    ctx.lineTo(x-=50, y-=50);
    ctx.lineTo(x+=40, y);
    ctx.lineTo(x-=50, y-=50);
    
    ctx.stroke();
    ctx.fill();


    if (!emit) { return; }


    socket.emit('drawing', {
      color: 'red'
    });
    
    console.log('it works');

  }

  setTimeout(function(){
    drawLeaf('lightgreen');
   }, 600);



  window.addEventListener('resize', onResize, false);
  onResize();

  canvas.addEventListener('mousedown', onMouseDown, false);
  canvas.addEventListener('mouseup', onMouseUp, false);

  canvas.addEventListener('touchstart', onMouseDown, false);
  canvas.addEventListener('touchend', onMouseUp, false);


  function onMouseDown(e) {
    drawLeaf('red', true);
    drawing = true;
    current.x = e.clientX||e.touches[0].clientX;
    current.y = e.clientY||e.touches[0].clientY;

  }
 
  function onMouseUp(e){
    drawLeaf("green", true);
    if (!drawing) { return; }
    drawing = false; 
    // drawLine(current.x, current.y, e.clientX||e.touches[0].clientX, e.clientY||e.touches[0].clientY, current.color, true);
  }

  // limit the number of events per second
  function throttle(callback, delay) {
    var previousCall = new Date().getTime();
    return function() {
      var time = new Date().getTime();

      if ((time - previousCall) >= delay) {
        previousCall = time;
        callback.apply(null, arguments);
      }
    };
  }



  function onDrawingEvent(data){
    drawLeaf(data.color);
    var w = canvas.width;
    var h = canvas.height;
    //drawLine(data.x0 * w, data.y0 * h, data.x1 * w, data.y1 * h, data.color);
  }

  // make the canvas fill its parent
  function onResize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

})();
