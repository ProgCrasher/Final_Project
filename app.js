var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var matrix = require('./modules/matrix');

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.redirect('index.html');
});

server.listen(3000);

/*// Define the port to run on
app.set('port', process.env.PORT || 3000);

// Listen for requests
var server = app.listen(app.get('port'), function() {
  var port = server.address().port;
  console.log('Magic happens on port ' + port);
});*/

io.on('connection', function (socket) {
  socket.emit('recieve matrix', matrix);

  var interval = setInterval( function(){
                                            socket.emit("redraw", matrix)
                                        }, 200);

  socket.on('stop-draw', function(){clearInterval(interval);})
});