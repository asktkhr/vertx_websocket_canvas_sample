load('vertx.js');

var wss = {};
vertx.createHttpServer().websocketHandler(function(ws){
  wss[ws.binaryHandlerID] = ws;
  ws.dataHandler(function(buffer){
    for(var key in wss){
      if(ws.binaryHandlerID == key) continue;
      wss[key].writeTextFrame(buffer.toString());
    }
  });
  ws.endHandler(function(){
    delete wss[ws.binaryHandlerID];
  });
})
.requestHandler(function(req) {
  if (req.uri == "/"){
    req.response.sendFile("web/index.html");
  } else {
    req.response.sendFile("web" + req.uri);
  }

}).listen(8080)


