/**
 *	@author da3x11@gmail.com (Vasily Nesterov)
 *	@usage	Пакет для запуска http-сервера
 *			localhost: 7070
 */

    // todo: Продумать как модули будут принемать запросы от WebSocket'a

(function(global) {
	"use strict";
	var http = require('http'),
        WebSocketServer = require('websocket').server;

    // Функция подъема сервера
	function initServer() {

		var host = '127.0.0.1',
            port = 7070,
            server, wsServer;

		try {
            // Создаем web-сервер
            server = http.createServer(function(request, response) { });
            server.listen(port, function(){ });

            // Создаем сервер для WebSocket'а
            var wsServer = new WebSocketServer({
                httpServer: server
            });

            // Вешаем event'ы на WebSocket'а
            wsServer.on('request', function(request){
                if(!originIsAllowed(request.origin)) {
                    request.reject();
                    return;
                }

                // Обработка запросов на WebSocket
                var connection = request.accept(null, request.origin);

                connection.on('message', function(message){
                    if(message.type == 'utf8'){
                        var data = JSON.parse(message.utf8Data);
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

    // Проверка доступа для WebSocketa
    function originIsAllowed(origin) {
        // todo: Научиться определять права доступа к WebSocket'у
        return true;
    }

	global.start = initServer;
})(exports)