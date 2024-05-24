const express = require('express');
const socket = require('socket.io');

const app = express();

const server = app.listen(5000,()=>console.log('Listening to request on Port 5000'));

//static files
app.use(express.static('public'));

// socket setup
const io = socket(server);

//socket connection
io.on('connection',(socket)=>{
  console.log('made connection to Websocket',socket.id);

//server Listening for an event
  socket.on('chat',(data)=>{
    //server emits an event
    io.sockets.emit('chat',data)
  })

// typing Message
  socket.on('typing',function(data){
    socket.broadcast.emit('typing',data)
  })

})
