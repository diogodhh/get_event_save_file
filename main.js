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

	console.log(`${data.call.call_mode} | ${data.call.id} | Identifier ${data.call.identifier} | Extension ${data.agent.extension.extension_number}`);

    // Extract the ID and replace colons with slashes
    var filename = data.call.id.replace(/:/g, '-') + '.json';

    // Prepend the path
    filename = process.env.FILE_PATH + filename;

    // Check if call mode is 'dialer' and save new file
    if(data.call.call_mode='dialer' && data.agent.extension.extension_number){

    	fs.writeFile(filename, JSON.stringify(data), function(err) {
        	if (err) {
            	return console.log(err);
        	}
        });
    };
});
    


process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function(data) {
    socket.emit('message', data.trim());
});