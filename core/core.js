"use strict";

// todo: Продумать как передавать модулям запросы с клиента

var login = require('./authentication'),
    server = require('./server');
server.start(login);
//var db = require('./db');