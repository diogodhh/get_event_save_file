require('dotenv').config();

var io = require('socket.io-client');
var fs = require('fs');

var socket = io.connect(process.env.SOCKETIO_SERVER, { 
  reconnect: true, 
  transports: ['websocket'], 
  query: { 
    token: process.env.SOCKETIO_TOKEN 
  }
});

// Add a connect listener
socket.on('connect', function() {
    console.log('Connected to Socket.IO server!');
});

// Add listeners for potential connection issues
socket.on('connect_error', function(err) {
    console.log('Connection Error: ' + err);
});

socket.on('connect_timeout', function() {
    console.log('Connection Timeout');
});

socket.on('error', function(err) {
    console.log('Error: ' + err);
});

socket.on('disconnect', function(reason) {
    console.log('Disconnected: ' + reason);
});

socket.on('message', function(data) {
    console.log(data);
});

socket.on('call-was-connected', function(data) {

    // Check if call mode is 'dialer' and save new file
    if(data.call.call_mode==='dialer' && data.agent && data.agent.extension && data.agent.extension.extension_number){

        // Extract the ID and replace colons with slashes
        var filename = `onConnect_${data.agent.extension.extension_number}.txt`;

        // Prepend the path
        filename = process.env.FILE_PATH + filename;

        var filecontent = `${data.call.connected_time};${data.call.call_mode};${data.call.sid};${data.call.identifier};${data.agent.extension.extension_number}`;

    	fs.appendFile(filename, filecontent + '\n', function(err) {
            if (err) {
                return console.log(err);
            }
            console.log(`Logged: ${filecontent} | File: ${filename}`)
        });
    }
});
    


process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function(data) {
    socket.emit('message', data.trim());
});