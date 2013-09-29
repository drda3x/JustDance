/**
 * 	@authot da3x11@gmail.com (Vasily Nesterov)
 *	@usage Пакет функций для создания базы данных
 */

(function(){
	"use strict";
	console.log('db module activated');
	var mysql = require("mysql"),
        fs = require("fs"),
		connection = mysql.createConnection({
			host: 'localhost',
			user: 'root',
			password: 'root',
			database: 'ash'
		});

    // Функция для создания структуры базы данных
    function dbStructureCreator() {
        fs.open('../sql/dbStructure.sql', 'r', null, function(err, file_handle) {

            if(err) {
                console.log('Error of file opening');
                console.log(err);
            } else {

                if(err) {
                    console.log('Error of file reading');
                    console.log(err);
                } else {
                    fs.read(file_handle, 100000000, null, 'utf8', function(err, data){
                        if (err) {
                            console.log(err);
                        } else {
                            var sql = data, query;
                            connection.connect();
                            while(1) { // todo УБРАТЬ БЕСКОНЕЧНЫЙ ЦИКЛ!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                                var curIndex = sql.indexOf(');', 0);
                                if(curIndex<0) {
                                    break;
                                }
                                curIndex += 2;
                                query = sql.slice(0, curIndex);
                                connection.query(query, function(err, rows, fields) {
                                    if(err) {
                                        console.log(err);
                                    } else {
                                        console.log(rows);
                                    }
                                });
                                sql = sql.slice(curIndex, sql.length);
                            }
                            connection.end();
                        }
                })
                }

            }

        });

    }

    dbStructureCreator();
/*    try {
        connection.connect();
        connection.query(club.create(), function(err, rows, fields) {
            if(err) {
                throw err;
            }
            console.log('table a created');
        });
        connection.end();
    } catch(e) {
        console.log(e);
    }*/
}())