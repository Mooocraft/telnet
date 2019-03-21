var net = require('net');
const readline = require('readline');

console.log("Server Running...\r\n")
var server = net.createServer(function (socket) {
	var fdatab;
	var fdata;
    var q = 1;
    var typpingAllowed = false;
	console.log(socket.address());
	socket.write('Welcome to the Telnet server!\r\n');
    qSelect(q);
    function qSelect(qNum) {
        if (qNum == 1) {
            fdatab = fdata = "";
            socket.write("What's your name?\r\n")
            socket.write('First name: ');
            typpingAllowed = true;
        }else if (qNum == 2) {
            fdatab = fdata = "";
            socket.write(' how are you doing?\r\n')
            typpingAllowed = true
        }
    }
	socket.on('data', function(data) {
        if (data.toString().charCodeAt(0) === 3) {
                socket.end();
        }else if (typpingAllowed == false) {
            socket.write("\x08\0\033[<N>C");
        }else if (q == 1) {
            if (data.toString().charCodeAt(0) === 3) {
                socket.end();
            }else if (data.toString() === "\r\n") {
                fdata = fdatab.replace('undefined','');
                console.log('Received: ' + fdata);
                socket.write("Hello " + fdata);
                q = q + 1;
                typpingAllowed = false;
                qSelect(q);
            }else if (data.toString() === "\b" || data.toString().charCodeAt(0) === 127) {
                fdatab = fdatab.substring(0, fdatab.length - 1);
            }else {
                fdatab += data;
            }
        }else if (q == 2) {
            if (data.toString().charCodeAt(0) === 3) {
                socket.end();
            }else if (data.toString() === "\r\n") {
                fdata = fdatab.replace('undefined','');
                console.log('Received: ' + fdata);
                console.log('Fixed version: ' + fdata.toLowerCase())
                socket.write("Mabye tomorrow will be better than today which was " + fdata.toLowerCase() + '.');
                q += 1;
                typpingAllowed = false;
            }else if (data.toString() === "\b" || data.toString().charCodeAt(0) === 127) {
                fdatab = fdatab.substring(0, fdatab.length - 1);
            }else {
                fdatab += data;
            }
        }
	});
}).listen(23, '0.0.0.0');