/**
 * Функционал для проверки доступа в систему...
 */

(function(){
    'use strict';

    var md5 = require('md5'),
        MySql = require('mysql'),
        db = new MySql.createConnection({
            host: 'localhost',
            user: 'checkuser',
            password: 'whoareyou'
        });

    /**
     * Функция для проверки данных пользователя(логи, пароль)
     * и возвтрата ответа на разрешение авторизации
     * */
    function checkUser(login, password){
        var hesh = getPassHesh(password),
            query = 'SELECT password FROM core.users WHERE login = \''+ login+'\'',
            self = this;
        db.connect();
        db.query(query, function(err, rows){
            if(err){
                console.log(err);
            } else {
                if (hesh === rows[0].password) {
                    self.isLoggedIn = true;
                } else {
                    self.isLoggedIn = false;
                }
            }
            db.end();
        });
    }

    /**
     * @usage Функция для создания пользователя системы JustDance
     * @param login
     * @param password
     */
    function createUser(login, password) {
        var hesh = getPassHesh(password),
            query = 'INSERT INTO core.users(login, password) VALUES(\''+login+'\', \''+hesh+'\')',
            self = this;
            console.log(query);
        db.connect();
        db.query(query, function(err, rows, fields){
            if(err){
                console.log(err);
            } else {
                console.log('User Added');
            }
            db.end();
        });
    }

    /**
     * @usage Функция для получение шифрованного пароля
     * @param password
     * @return {--null-string--}
     */
    function getPassHesh(password){
        return md5(md5(password) + 'af01');
    }

    //createUser('user2', 'qwerty');
    //checkUser('user2', 'qwerty');

})()