/**
 *	@author da3x11@gmail.com (Vasily Nesterov)
 *	@usage	Пакет для запуска http-сервера
 *			localhost: 7070
 */

(function(global) {
	"use strict";
	var http = require('http');

	function initServer() {

		var port = 7070;

		try {
			http.createServer(function(request, response) {
				response.writeHead(200, {'Connection-Type': 'text/plain'});
				response.end('OK');
			}).listen(7070);
			console.log('Server has been created');
		} catch(e) {
			console.log('Error');
		}

	}

	global.start = initServer;
})(exports)