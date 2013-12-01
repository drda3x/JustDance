/**
 *	@author da3x11@gmail.com (Vasily Nesterov)
 *	@usage	Пакет для запуска http-сервера
 *			localhost: 7070
 */

(function(global) {
	"use strict";
	var http = require('http'),
        WebSocketServer = require('websocket').server;

	function initServer() {

		var host = '127.0.0.1',
            port = 7070,
            server, wsServer;

        function originIsAllowed(origin) {
            return true;
        }

		try {
            server = http.createServer(function(request, response) { });
            server.listen(port, function(){ });

            var wsServer = new WebSocketServer({
                httpServer: server
            });

            wsServer.on('request', function(request){
                if(!originIsAllowed(request.origin)) {
                    request.reject();
                    return;
                }

                var connection = request.accept(null, request.origin);

                connection.on('message', function(message){
                    if(message.type == 'utf8'){
                        var data = JSON.parse(message.utf8Data);
                        console.log(data);
                    }
                });

                connection.on('close', function(reasonCode, description){
                });
            });

			console.log('Server started at '+ new Date());
		} catch(e) {
            console.log(e);
		}

	}

	global.start = initServer;
})(exports)