(function(){
    var canvas = document.getElementById("canvas");
    if(!canvas || !canvas.getContext) return false;
    var ctx = canvas.getContext("2d");
    var objects = [];
    var delay = 50;
    var timer;

    function drawObjects(){
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      var result = true;
      objects.forEach(function(obj){
        if(obj.isMove){
          objects.forEach(function(otherObj){
            if(otherObj.isMove || obj == otherObj) return;
            obj.detectCollision(otherObj);
          });
        }
        obj.draw();
        result = (obj.isMove && true);
      });
      return result;
    }
    
    var draw = function(){
      clearTimeout(timer);
      if(!drawObjects()) return;
      
      timer = setTimeout(draw, delay);
    }

    var socket;
    var colors = ["#bbcece","#cebbce","#cecebb","#ceceff","#ffcece","#ceffce"];
    if (window.WebSocket) {
        socket = new WebSocket("ws://"+ location.host);
        socket.onmessage = function(event) {
          if(event.data === 'drop'){
            var initPosX = parseInt(Math.random() * canvas.width);
            var options = {
              position: {x: initPosX, y:0},
              size: {width: 50, height: 50},
              acceleration: {x: 0, y: 3},
              speed: {x: 0, y: 0},
              color: colors[parseInt(Math.random() * (colors.length + 1))],
            }
            objects.push(new SampleObj(ctx, options));
            draw();
          }
        }
        socket.onopen = function(event) {
        };
        socket.onclose = function(event) {
        };
    } else {
      console.log("your browser is not supported");
    }

    function send(message) {
        if (!window.WebSocket) {
            return;
        }
        if (socket.readyState == WebSocket.OPEN) {
            socket.send(message);
        } else {
          console.log("Not connected");
        }
    } 

    document.getElementById('drop-btn').addEventListener('click', function(e){
      send("drop");
    });
})();
