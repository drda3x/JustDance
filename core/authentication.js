/**
 * Функционал для проверки доступа в систему...
 */

 /**
  * Т.З. (После исполнения удалить!)
  * Данный пакет отвечает за предоставление доступа к системе JustDance
  * Тут необходимо реализовать следующее:
  *     1. Зашифровать пароль.
  *     2. Сделать запрос к базе для подтверждения пароля.
  *     3. Сравнить два полученных хеша.
  *     4. Выдать ответ об авторизации пользователя.
  */

(function(global){
    'use strict';

    var md5 = require('md5'),
        MySql = require('mysql'),
        connection = MySql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root'
        });

    var User = function(login, password) {
        this.login = login;
        this.passHesh = getPasswordHesh(password);
    }

    // Функция для получения пользовательских прав доступа
    User.prototype.checkAccess = function() {
        var query = 'SELECT password FROM core.users WHERE login = "'+this.login+'"',
            self = this;
        connection.connect();
        connection.query(query, function(err, rows, fields) {
            console.log(rows);
        });
    }


    User.prototype.addMe = function(login, password) {
        var query = 'INSERT INTO core.users(login, password) VALUES("'+login+'","'+getPasswordHesh(password)+'")';
        connection.connect();
        connection.query(query, function(err){
            if(err) {
                console.log(err);
            } else {
                console.log('user added');
            }
            connection.end();
        });
    }

    /**
     * @usage Функуия для получения хеша пароля...
     */
    function getPasswordHesh(str) {
        return md5(md5(str) + 'afg1');
    }

    global.User = User;
})(exports)