var net = require('net');

console.log("Server Running...\r\n")
var server = net.createServer(function (socket) {
	var fdatab;
	var fdata;
	console.log(socket.address());
	socket.write('Welcome to the Telnet server!\r\n');
	socket.write("Enter name: ");
	socket.on('data', function(data) {
		if (data.toString().charCodeAt(0) === 3) {
        	socket.end();
    	}else if (data.toString() === "\r\n") {
    		fdata = fdatab.replace('undefined','');
    		console.log('Received: ' + fdata);
    		socket.write("Hello " + fdata);
    	}else {
    		fdatab += data.toString();
    	}
	});
}).listen(23, '0.0.0.0');