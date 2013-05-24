// Expose required mod objects
var io = require('socket.io'), connect = require('connect');

// Setup server
var app = connect().use(connect.static('public')).listen(8080);
var server = io.listen(app);

// Socket events
server.sockets.on('connection', function (socket) {
	
	// Session Start Event
	socket.on('sessionStart', function (data) {
						
		server.sockets.emit('sessionStart', {message: 'session started' });
 
    }); 
	
	// Session End Event
	socket.on('sessionEnd', function (data) {
						
		server.sockets.emit('sessionEnd', {message: 'session ended'});
 
    });
    
    // Message Event
	socket.on('message', function (msg) {
						
		console.log('Message: ', msg);
		
		server.sockets.emit('message', msg );
 
    });
    
	// Message Event
	socket.on('modeChange', function (msg) {
		
		console.log('I received a modeChange event ', msg);

		server.sockets.emit('modeChange', msg);
		 
    });	
	

}); // end ready 
