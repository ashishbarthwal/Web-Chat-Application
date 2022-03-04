const socket = io('http://localhost:9191');
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp')
const messageContainer = document.querySelector(".container")
var audio = new Audio('sound.mp3');
const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if (position == 'left') {
        audio.play();
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = ''
})
const user_name = prompt("Enter your name to join");
socket.emit('new-user-joined', user_name)

socket.on('user-joined', user_name => {
    append(`${user_name} joined the chat`, 'right')
})

socket.on('receive', user_data => {
    append(`${user_data.user_name}: ${user_data.message}`, 'left')
})
socket.on('left', user_name => {
    append(`${user_name} left the chat`, 'left')
})