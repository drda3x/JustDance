/**
 * @author (da3x11@gmail.com) Vasily Nesterov
 * @usage Клиентский js, отправляющий запрос на авторизацию
 */
(function(global, $, WebSocket){

    'use strict';

    window.WebSocket = window.WebSocket || window.MozWebSocket;

    var wsUri = 'ws://127.0.0.1:7070',
        ws = new WebSocket(wsUri);

    ws.onopen = function() {
        console.log('WS opened');
    }

    ws.onmessage = function() {}

    ws.onerror = function() {}

    ws.onclose = function() {
        console.log('WS closed');
    }

    function getDataFromPage() {
        var data = {
            login: $('.login').val(),
            pass: $('.pass').val()
            }
        var str = JSON.stringify(data);
        console.log(str);
        ws.send(str);
    }

    global.getDataFromPage = getDataFromPage;

})(this, jQuery, WebSocket)
