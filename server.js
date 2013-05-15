var io = require('socket.io'), connect = require('connect');

var app = connect().use(connect.static('public')).listen(3000);

var server = io.listen(app);

	server.sockets.on('connection', function (socket) {
  
	  	socket.emit('entrance', {message: 'Socket is connected'});

		socket.on('disconnect', function  () {
			server.sockets.emit('exit', {message: 'A user has disconnected.'});
		});
		
		socket.on('chat', function  (data) {
			server.sockets.emit('chat', {message: '# ' + data.message});
		});
		
		// Test custom event 
		socket.on('testEvent', function  (data) {
			server.sockets.emit('testEvent', {message: '# ' + data.message});
		});
		
		socket.on('private message', function (from, msg) {
			console.log('I received a private message by ', from, ' saying ', msg);
		});
		
		socket.on('event', function  (data) {
			server.sockets.emit('event', {message: '# ' + data.message});
		});
		

		server.sockets.emit('entrance', {message: 'New user is connected'});

	}); // end ready 