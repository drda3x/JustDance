/**
 * 	@authot da3x11@gmail.com (Vasily Nesterov)
 *	@usage Пакет функций для создания базы данных
 */

(function(){
	"use strict";
	console.log('db module activated');
	var mysql = require("mysql"),
		connection = mysql.createConnection({
			host: 'localhost',
			user: 'root',
			password: 'foriin0..1',
			database: 'ash'
		});

	// Конструктор создания таблицы в базе данных
	var Table = function(name, fields) {
		this.tablename = name;
		this.fields = fields;
		this.create = function() {
			var queryStr = 'CREATE TABLE `' + this.tablename + '` (',
				fieldsLen = fields.length;
			for (var i = 0; i < fieldsLen; i++) {
				var f = fields[i];

				if (fields[i].search('PRIMARY KEY') > 0) {
					var pk = f.slice(0, fields[i].indexOf(' ', 0));
					f = f.slice(0, f.indexOf('PRIMARY KEY', 0));
				}
				queryStr += ' ' + f + ',';
			}
			if(pk) {
				queryStr += ' PRIMARY KEY(' + pk + ')';
			}
			queryStr += ')';
			return queryStr;
		}
		this.drop = function() {
			return 'DROP ' + this.tablename;
		}
		// Подумать...
		this.update = function(fields, values) {
			var f = fields, v = values,
				fLen = f.length,
				q = 'UPDATE TABLE ' + this.tablename;

			for(var i=0; i<fLen; i++) {

			}
		}
	}

	// ToDo: продумать вариант с массивом таблиц, чтобы проходить по каждому объекту, 
	//       вызывать у него метод create и запускать создание таблицы в БД...

	var club = new Table('club', [
			'`CLUBID` INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY',
			'`NAME` VARCHAR(100)'
		]);

	connection.connect();
	connection.query(club.create(), function(err, rows, fields) {
		if(err) {
			throw err;
		}
		console.log('table a created');
	});
	connection.end();
}())