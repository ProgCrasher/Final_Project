var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var matrix = require('./modules/matrix');

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.redirect('public/index.html');
});

server.listen(3000);

io.on('connection', function (socket) {
  socket.emit('recieve matrix', matrix);

  var interval = setInterval( function(){
                                            socket.emit("redraw", matrix)
                                        }, 200);

  socket.on('stop-draw', function(){clearInterval(interval);})
});

//////
/*
const express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.set('port', process.env.PORT || 3000);

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.redirect('public/index.html');
});

server.listen(3000);*/