const express = require('express')
const path = require('path')
const http = require('http')
const socketio = require('socket.io')

const app = express()

const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname , '../public')

app.use(express.static(publicDirectoryPath))

io.sockets.on('connection', function(socket) {
    socket.emit('welcomeMessage' , 'Welcome!')

    socket.on('username', (username) => {
        socket.username = username;
        io.emit('is_online', '🔵 <i>' + socket.username + ' has joined the chat..</i>');
    });

    socket.on('disconnect', (username) => {
        io.emit('is_online', '🔴 <i>' + socket.username + ' left the chat..</i>');
    })

    socket.on('chat_message', (message) => {
        io.emit('chat_message', '<strong>' + socket.username + '</strong>: ' + message);
    });


});

server.listen(port , () => {
    console.log('port is up on ' + port)
})
