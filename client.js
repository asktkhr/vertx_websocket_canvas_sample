load('vertx.js');

var client = vertx.createHttpClient().setPort(8080);

client.connectWebsocket('http://localhost:8080', function(websocket){
  console.log(websocket);
  websocket.dataHandler(function(data){
    console.log('receive data: ' + data);
  });
  websocket.writeTextFrame('Hello, World');
});
