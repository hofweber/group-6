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

  function drawLeaf() {
    var ctx = canvas.getContext('2d');
    var x,y;
    ctx.beginPath();     // Start a new path.
    ctx.lineWidth = "3";
    ctx.strokeStyle = "green";  // This path is green
    ctx.fillStyle = "lightgreen";
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
    
    console.log('it works');

  }

  setTimeout(function(){
    drawLeaf();
   }, 600);
  
  



  socket.on('drawing', onDrawingEvent);

  window.addEventListener('resize', onResize, false);
  onResize();


  function drawLine(x0, y0, x1, y1, color, emit){
    context.beginPath();
    context.moveTo(x0, y0);
    context.lineTo(x1, y1);
    context.strokeStyle = color;
    context.lineWidth = 2;
    context.stroke();
    context.closePath();

    if (!emit) { return; }
    var w = canvas.width;
    var h = canvas.height;

    socket.emit('drawing', {
      x0: x0 / w,
      y0: y0 / h,
      x1: x1 / w,
      y1: y1 / h,
      color: color
    });
  }

  function onMouseDown(e){
    drawLeaf();
    drawing = true;
    current.x = e.clientX||e.touches[0].clientX;
    current.y = e.clientY||e.touches[0].clientY;
  }

  function onMouseUp(e){
    if (!drawing) { return; }
    drawing = false;
    // drawLine(current.x, current.y, e.clientX||e.touches[0].clientX, e.clientY||e.touches[0].clientY, current.color, true);
  }

  function onMouseMove(e){
    if (!drawing) { return; }
    //drawLine(current.x, current.y, e.clientX||e.touches[0].clientX, e.clientY||e.touches[0].clientY, current.color, true);
    current.x = e.clientX||e.touches[0].clientX;
    current.y = e.clientY||e.touches[0].clientY;
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
