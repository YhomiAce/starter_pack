//make connection on the frontend

const socket = io.connect('http://localhost:5000');

let message = document.getElementById('message');
let handle = document.getElementById('handle');
let btn = document.getElementById('send');
let output = document.getElementById('output'),
    feedback = document.getElementById('feedback')

// emit event: when a user send a message
btn.addEventListener('click',function(){

    socket.emit('chat',{
      message:message.value,
      handle:handle.value
    })
})

//keypress event: when a user is typing
message.addEventListener('keypress',function(){
    socket.emit('typing',handle.value)
})

//listening for typing Message
socket.on('typing',function(data){
  feedback.innerHTML=`<p><em>${data} is typing a message...</em></p>`;
})


//Listen for events
socket.on('chat',function(data){
  feedback.innerHTML = "";
  output.innerHTML += `<p><strong>${data.handle}: </strong>${data.message}</p>`;
})
