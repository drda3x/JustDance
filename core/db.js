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
			password: 'root',
			database: 'ash'
		});

	// Конструктор создания таблицы в базе данных
	var Table = function(name, fields) {
		this.tablename = name;
		this.fields = fields;
		this.create = function() {
			var queryStr = 'CREATE TABLE IF NOT EXISTS `' + this.tablename + '` (',
				fieldsLen = fields.length,
                pk, fk=[], fkLen;
			for (var i = 0; i < fieldsLen; i++) {
				var f = fields[i];
                pk = null;

				if (f.search('PRIMARY KEY') > 0) {
					pk = f.slice(0, f.indexOf(' ', 0));
					f = f.slice(0, f.indexOf('PRIMARY KEY', 0));
				}
                if (f.search('FOREIGN KEY') > 0) {
                    console.log(name);
                    var key = function(f) {
                        this.name = f.slice(0, f.indexOf(' ', 0));
                        this.onDel = 'ON DELETE NO ACTION';
                        this.onUpd = 'ON UPDATE NO ACTION';
                        this.ref = (function(){
                            var i = f.indexOf('REFERENCES', 0);
                             if (i > 0) {
                                 var str = f.slice(i);
                                 return str.slice(0, str.indexOf(' ', 11));
                             }
                             return null;
                        })();
                    };
                    fk.push(new key(f));
                    fkLen = fk.length;
                    f = f.slice(0, f.indexOf('FOREIGN KEY', 0));
                }
				queryStr += ' ' + f + ',';
			}
			if(pk) {
				queryStr += ' PRIMARY KEY(' + pk + ')';
			}
            for(var i=0; i<fkLen; i++) {
                queryStr += ' FOREIGN KEY ('+fk[i].name+') ';
                (fk[i].ref) ? queryStr += fk[i].ref :  null;
            }
            // todo Добавить вставку конструкции FOREIGN KEY
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

	// ToDo продумать вариант с массивом таблиц, чтобы проходить по каждому объекту,
	// ToDo вызывать у него метод create и запускать создание таблицы в БД...
    // ToDo а вообще для создания таблиц в базе надо бы написать ф-цию...

    var dbTables = [
        // Таблица клубов
        new Table('clubs', [
            '`CLUBID` INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY',
            '`NAME` VARCHAR(100)'
        ]),
        // Таблица клубных баллов
        new Table('club_points' ,[
            '`CLUBID` INT(11) NOT NULL PRIMARY KEY',
            '`TOURNAMENTID` INT(11) NOT NULL FOREIGN KEY REFERENCES clubs',
            '`POINTS INT(11)`',
            'INDEX `clubtournaments`(`TOURNAMENTID` ASC)'
        ]),
        // Таблица организаторов
        new Table('organizer', [
            '`ORGID` INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY'
        ])

    ];

    for(var i=0; i<dbTables.length; i++) {
        console.log(dbTables[i].create());
    }

	var club = new Table('club', [
			'`CLUBID` INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY',
			'`NAME` VARCHAR(100)'
		]);

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