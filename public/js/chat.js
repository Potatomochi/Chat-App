socket.on('chat_message', function(msg){
    $('#messages').append($('<li>').html(msg));
});
// append text if someone is online
socket.on('is_online', function(username) {
    $('#messages').append($('<li>').html(username));
});
// Get username
var username = prompt('Hi! Whats your name?');
socket.emit('username', username);

socket.on('welcomeMessage', (message) => {
    console.log(message + ' user to the chat app.')
})