/**
 *	@author da3x11@gmail.com (Vasily Nesterov)
 *	@usage	Пакет для запуска http-сервера
 *			localhost: 7070
 */

(function(global) {
	"use strict";
	var http = require('http');

	function initServer() {

		var host = '127.0.0.1',
            port = 7070,
            server = http.Server();

		try {
			http.createServer(function(request, response) {
				response.writeHead(200, {'Connection-Type': 'text/plain'});
				response.end('OK');
			}).listen(port, ip);
			console.log('Server has been created');
		} catch(e) {
			console.log('Server is already running!');
		}

	}

	global.start = initServer;
})(exports)