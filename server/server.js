const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const uuid = require('uuid');

const app = express();

app.use(express.static(`${__dirname}/../client`));

const server = http.createServer(app);
const io = socketio(server);

let users = [];
let connections = [];

io.on('connection', (socket) => {
    console.log('New user connected');
    connections.push(socket);

    socket.username = 'Anonymous';

    socket.on('change_username', data => {
        let id = uuid.v4();
        socket.id = id;
        socket.username = data.nickName;
        users.push({id, username: socket.username});
        updateUsernames;
    })

    const updateUsernames = () => {
        io.sockets.emit('get users', users)
    }

    socket.on('new_message', (data) => {
        io.sockets.emit('new_message', {message : data.message, username: socket.username});
    })


    //socket.on('message', (text) => io.emit('message', text));
});

server.on('error', (err) => {
    console.error(err);
});

server.listen(8080, () => {
    console.log('Server is ready');
});
