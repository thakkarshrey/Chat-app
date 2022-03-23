const socket = io('http://localhost:8000');

let name1 = prompt('Write your name to join')
socket.emit('new-user-joined', name1) // name was not working for some reason so i used name1


let messageContainer = document.querySelector('.container');
const append =  (message, position) =>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
}

socket.on('User-has-joined', name1 =>{
    append(`${name1} has joined the chat`, 'right')
});

let form = document.getElementById('send-container');  
let messageInp = document.getElementById('messageInp');

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    message = messageInp.value;
    append(`you:${message}`,'right')
    socket.emit('send',message)
    messageInp.value = '';
});

socket.on('Message-recieved',data =>{
    append(`${data.message}:${data.name1}`, 'left')
})
socket.on('left',name1 =>{
    append(`${name1} has left the chat`, 'left')
})