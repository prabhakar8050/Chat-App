
const socket = io('http://localhost:8000');

// Get DOM elements in the respective JS variable
const form = document.getElementById('send-container');
const messageInp = document.getElementById('messageInp')
const messageContainer = document.querySelector(".container")
var audio = new Audio('ting.mp3');
var leave = new Audio('discord-leave.mp3');


// Function which will append event info to the container
const append = (message, position)=> {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);

    if (position == 'left') {
        audio.play();
    }

    if (position == 'mid') {
        leave.play();
    }

}

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInp.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInp.value = '';
})

const name = prompt("Enter  your name to join");
socket.emit('new-user-joined', name);  

socket.on('user-joined', name => {
   append(`${name} joined the chat`, 'mid');
})

socket.on('receive', data => {
    append(`${data.name}: ${data.message}`, 'left');
 })

 socket.on('left', name => {
    append(`${name} left the chat`, 'mid');
 })

