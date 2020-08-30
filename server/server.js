const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const randomColor = require('randomcolor');
const uuid = require('uuid');

const app = express();

app.use(express.static(`${__dirname}/../client`));

const server = http.createServer(app);
const io = socketio(server);

const users = [];
const connections = [];

io.on('connection', (socket) => {
    console.log('New user connected');

    connections.push(socket);

    let color = randomColor;

    socket.username = 'Anonymous';
    socket.color = color;

    socket.on('change_username', data => {
        let id = uuid.v4();
        socket.id = id;
        socket.username = data.nickName;
        users.push({id, username: socket.username, color: socket.color});
        updateUsernames();
    });

    const updateUsernames = () => {
        io.sockets.emit('get users', users)
    };

    socket.emit('message', 'You are connected');

    socket.on('typing', data => {
        socket.broadcast.emit('typing',{username: socket.username});
    })

    socket.on('message', (data) => {
        io.sockets.emit('message', {message: data.message, username: socket.username, color: socket.color});
    });

    socket.on('disconnect', data => {
        if (!socket.username)
            return;
        let user = undefined;
        for (let i = 0; i < users.length; i++){
            if (users[i].id === socket.id){
                user = users[i];
                break;
            }
        }

        users.splice(user,1);
        updateUsernames();
        connections.splice(connections.indexOf(socket),1);
    })
});




server.on('error', (err) => {
    console.error(err);
});

server.listen(8080, () => {
    console.log('Server is ready');
});