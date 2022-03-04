const io = require('socket.io')(9191, {
    cors: {
        origin: '*',
    }
});

const person = {};
io.on('connection', socket => {
    socket.on('new-user-joined', user_name => {

        console.log("New user joined", user_name)

        person[socket.id] = user_name;
        socket.broadcast.emit('user-joined', user_name);
    });

    socket.on('send', message => {
        socket.broadcast.emit('receive', { message: message, user_name: person[socket.id] })
    });

    socket.on('disconnect', message => {
        socket.broadcast.emit('left', person[socket.id]);
        delete person[socket.id];
    });
})