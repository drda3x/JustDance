/**
 * 	@author da3x11@gmail.com (Vasily Nesterov)
 *	@usage Пакет функций для создания базы данных
 */

(function(){
	"use strict";
    var MySql = require("mysql"),
        connection = MySql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root'
        });

    /**
     * @usage Конструктор объекта базы данных
     * @param name - наименование базы данных
     * @param sqlPath - путь к sql-файлу
     * @constructor
     */
    var DataBase = function(name, sqlPath) {
        this.name = name;
        this.sqlPath = sqlPath;
        this.connection = new MySql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root'
        });
    };
    // Модуль работы с файловой системой
    DataBase.prototype.fs = require("fs");

    // Метод для вызова процедуры создания базы данных
    DataBase.prototype.createDataBase = function() {
        var self = this;
        self.fs.open(self.sqlPath, 'r', null, function(err, file_handle){
            if(err) {
                console.log('Error of file opening');
                console.log(err);
            } else {
                self.fs.read(file_handle, 100000000, null, 'utf8', function (err, data) {
                    if (err) {
                        console.log(err);
                    } else {
                        var sql = data, query;
                        while (1) {  // todo Всетаки убрать бесконечный цикл!!!!!
                            var curIndex = sql.indexOf(';', 0);
                            if (curIndex < 0) {
                                break;
                            }
                            curIndex ++;
                            query = sql.slice(0, curIndex);
                            query = query.replace("@db_name@", self.name);
                            try {
                                self.connection.connect();
                            } catch(e) {
                                null;
                            }
                            self.connection.query(query, function (err, rows, fields) {
                                if (err) {
                                    console.log(err);
                                }
                            });
                            sql = sql.slice(curIndex, sql.length);
                        }
                        self.connection.end();
                    }
                });

            }
        });
        console.log('End of function work');
    }

    DataBase.prototype.removeDataBase = function() {
        var self = this;
        connection.query('DROP DATABASE `' + self.name + '`', function(err) {
            if(err) {
                console.log(err);
            } else {
                console.log('data base has been successfully removed')
            }
        })
    }

 /*   var regSystem = new DataBase('reg_system', '../sql/regSystem.sql'),
        tournament = new DataBase('tournament', '../sql/tournamentDefault.sql'),
        ash = new DataBase('ash', '../sql/ash.sql');
    regSystem.createDataBase();
    tournament.createDataBase();
    ash.createDataBase();
    console.log('Everything is OK!');
  */
    console.log('Start import');

    /**
     * Экземпляр класса DataBase для импорта клубной принадлежности
     * делаю упрощенный вариант, так как в дальнейшем использование этого
     * кода не планируется...
     *
     * А хотя, скорее всего планируется и это надо будет переписать так, чтобы это можно было использовать при
     * обновлении таблиц ассоциаций...
     */
    var Clubs = new DataBase('clubs_imp','../sql/json-test.json');
    Clubs.importClubs = function() {
        var self = this;
        // Открываем файлик с json-строкой
        self.fs.open(self.sqlPath, 'r', null, function(err, file_handle, json){
            if(err) {
                console.log(err);
            } else {
                self.fs.read(file_handle, 100000000, null, 'utf8', function (err, data) {
                    if(err){
                        console.log(err);
                    } else {
                        json = JSON.parse(data).data;
                        var query = 'SELECT * FROM reg_system.clubs ORDER BY name'
                        self.connection.query(query, function(err, rows, fields){
                            if(err) {
                                console.log(err);
                            } else {
                                var jLen = json.length, curDancer, clubs, clubsLen, query,
                                    rowsLen = rows.length, k;
                                for(var i=0; i<jLen; i++) {                                curDancer = json[i];
                                    clubs = curDancer.clubs;
                                    clubsLen = clubs.length;
                                    for(var j=0; j<clubsLen; j++) {
                                        k = 0;
                                        var cid = null;
                                        while(k < rowsLen ) {
                                            if (rows[k].name == clubs[j]) {
                                                cid = rows[k].club_id;
                                            }
                                            k++;
                                        }
                                        query = 'INSERT INTO ash.club_affiliation(dancer_id, club_id) VALUES('+curDancer.num+','+cid+');';
                                        self.connection.query(query, function(err, rows, fields){
                                            if(err){
                                                console.log(err);
                                                console.log(query);
                                            }
                                        });
                                    }
                                }
                            }
                            self.connection.end();
                        });
                    }
                });
            }
        });
    };

    //Clubs.importClubs();
}())