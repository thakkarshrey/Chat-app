const io = require('socket.io')(8000, {
    cors:{
        origin:['http://127.0.0.1:5501'],
    },
}); 

let users = {};

io.on('connection', socket =>{
    socket.on('new-user-joined', name1 => {
        console.log('New user joined', name1);
        users[socket.id] = name1;
        socket.broadcast.emit('User-has-joined', name1);
    });

    socket.on('send', message => {
        socket.broadcast.emit('Message-recieved', {message:message,name1: users[socket.id]})
    });
    socket.on('disconnect', message => {
        socket.broadcast.emit('left',users[socket.id])
        delete users[socket.id];
    });
});
