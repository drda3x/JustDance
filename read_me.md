[
  {
    "tags": [],
    "description": {
      "full": "<p>Пакет низкоуровневых классов-моделей.<br />(Турнир, Номинация, Судейская линейка, Судья, Пара)</p>",
      "summary": "<p>Пакет низкоуровневых классов-моделей.<br />(Турнир, Номинация, Судейская линейка, Судья, Пара)</p>",
      "body": ""
    },
    "ignore": false,
    "code": "(function(global){\n\n    \"use strict\";\n\n    var Sync = require('sync'),\n        connection = require('../DataBase').DataBaseConnection;"
  },
  {
    "tags": [
      {
        "type": "param",
        "types": [
          "id"
        ],
        "name": "",
        "description": ""
      },
      {
        "type": "param",
        "types": [
          "update_sql"
        ],
        "name": "",
        "description": ""
      },
      {
        "type": "param",
        "types": [
          "insert_sql"
        ],
        "name": "",
        "description": ""
      },
      {
        "type": "param",
        "types": [
          "callback"
        ],
        "name": "",
        "description": ""
      },
      {
        "type": "deprecated",
        "string": ""
      }
    ],
    "description": {
      "full": "<p>Функция предоставляющая общий интерфейс для сохранения данных в базе</p>",
      "summary": "<p>Функция предоставляющая общий интерфейс для сохранения данных в базе</p>",
      "body": ""
    },
    "isPrivate": false,
    "ignore": false,
    "code": "function dataSaver(id, update_sql, insert_sql, callback) {\n        var sql = (id != undefined) ? update_sql : insert_sql;\n        connection.query(sql, function(err) {\n            callback(err)\n        })\n    }",
    "ctx": {
      "type": "function",
      "name": "dataSaver",
      "string": "dataSaver()"
    }
  },
  {
    "tags": [
      {
        "type": "param",
        "types": [
          "id"
        ],
        "name": "{number}",
        "description": "идентификатор турнира"
      },
      {
        "type": "param",
        "types": [
          "name"
        ],
        "name": "{String}",
        "description": "наименование"
      },
      {
        "type": "param",
        "types": [
          "organizer"
        ],
        "name": "{String}",
        "description": "студия-организатор"
      },
      {
        "type": "param",
        "types": [
          "place"
        ],
        "name": "{String}",
        "description": "место проведения"
      },
      {
        "type": "param",
        "types": [
          "mainDate"
        ],
        "name": "{Date}",
        "description": "дата проведения турнина"
      },
      {
        "type": "param",
        "types": [
          "regEndDate"
        ],
        "name": "{Date}",
        "description": "дата окончания предварительной регистрации"
      },
      {
        "type": "param",
        "types": [
          "info"
        ],
        "name": "{string}",
        "description": "информация о турнире"
      },
      {
        "type": "constructor",
        "string": ""
      }
    ],
    "description": {
      "full": "<p>Конструктор турниров</p>",
      "summary": "<p>Конструктор турниров</p>",
      "body": ""
    },
    "isPrivate": false,
    "ignore": false,
    "code": "function Cup(id, name, organizer, place, mainDate, regEndDate, info) {\n        this.id = id;\n        this.name = name;\n        this.organizer = organizer;\n        this.place = place;\n        this.mainDate = mainDate;\n        this.regEndDate = regEndDate;\n        this.info = info;\n    }",
    "ctx": {
      "type": "function",
      "name": "Cup",
      "string": "Cup()"
    }
  },
  {
    "tags": [
      {
        "type": "param",
        "types": [
          "callback"
        ],
        "name": "{function}",
        "description": "функция-обработчик ответа"
      }
    ],
    "description": {
      "full": "<p>Метод для сохранения данных в базе</p>",
      "summary": "<p>Метод для сохранения данных в базе</p>",
      "body": ""
    },
    "isPrivate": false,
    "ignore": false,
    "code": "Cup.prototype.save = function(callback) {\n        var update_sql =\n                'UPDATE cup.tournaments ' +\n                'SET name = \\'' + this.name + '\\',' +\n                '    organizer = \\'' + this.organizer + '\\',' +\n                '    place = \\'' + this.place + '\\',' +\n                '    date = str_to_date(\\''+this.mainDate+'\\',\\'%a, %e %b %Y %T\\'),' +\n                '    end_reg_date = str_to_date(\\''+this.regEndDate+'\\',\\'%a, %e %b %Y %T\\'),' +\n                '    info = \\'' + this.info + '\\' ' +\n                'WHERE id = ' + this.id,\n\n            insert_sql =\n                'INSERT INTO cup.tournaments(name, place, organiser, club_id, date, end_reg_date, info) ' +\n                'VALUES (\\''+this.name + '\\',\\'' +this.place + '\\',\\'' +this.organizer + '\\',' +null + ',str_to_date(\\''+this.mainDate+'\\',\\'%a, %e %b %Y %T\\'),' +'str_to_date(\\''+this.regEndDate+'\\',\\'%a, %e %b %Y %T\\')'+ ',\\'' +this.info + '\\')';\n\n        var used_sql = (this.id == undefined) ? insert_sql : update_sql;\n\n        connection.query(used_sql, function(err) {\n            callback(err);\n        })\n\n    }",
    "ctx": {
      "type": "method",
      "constructor": "Cup",
      "cons": "Cup",
      "name": "save",
      "string": "Cup.prototype.save()"
    }
  },
  {
    "tags": [
      {
        "type": "param",
        "types": [
          "callback"
        ],
        "name": "{function}",
        "description": "функция-обработчик ответа"
      }
    ],
    "description": {
      "full": "<p>Метод для удаления данных из базы</p>",
      "summary": "<p>Метод для удаления данных из базы</p>",
      "body": ""
    },
    "isPrivate": false,
    "ignore": false,
    "code": "Cup.prototype.remove = function(callback) {\n        var sql = 'DELETE FROM cup.tournaments WHERE tournament_id = ' + this.id;\n        connection.query(sql, function(err) {\n            if(err) throw err;\n            callback()\n        })\n    }\n\n    Cup.prototype.get_id = function(callback) {\n        var sql =\n            'SELECT tournament_id ' +\n            'FROM cup.tournaments ' +\n            'WHERE name = \\'' + this.name + '\\'' +\n            ' AND place = \\'' + this.place + '\\'' +\n            ' AND date = str_to_date(\\''+this.mainDate+'\\',\\'%a, %e %b %Y\\')',\n\n           self = this;\n\n        connection.query(sql, function(err, rows) {\n            if(err) {\n                callback(err)\n            } else {\n                self.id = rows[0].tournament_id;\n                callback(null, self.id)\n            }\n        })\n    }",
    "ctx": {
      "type": "method",
      "constructor": "Cup",
      "cons": "Cup",
      "name": "remove",
      "string": "Cup.prototype.remove()"
    }
  },
  {
    "tags": [
      {
        "type": "param",
        "types": [
          "id"
        ],
        "name": "{number}",
        "description": "идентификатор номинации"
      },
      {
        "type": "param",
        "types": [
          "name"
        ],
        "name": "{string}",
        "description": "наименование номинации"
      },
      {
        "type": "param",
        "types": [
          "cup"
        ],
        "name": "{Cup}",
        "description": ""
      },
      {
        "type": "param",
        "types": [
          "assosiation"
        ],
        "name": "{string}",
        "description": "ассоциация"
      },
      {
        "type": "param",
        "types": [
          "referee_group"
        ],
        "name": "{RefereeGroup}",
        "description": ""
      },
      {
        "type": "constructor",
        "string": ""
      }
    ],
    "description": {
      "full": "<p>Класс 'Номинации'</p>",
      "summary": "<p>Класс 'Номинации'</p>",
      "body": ""
    },
    "isPrivate": false,
    "ignore": false,
    "code": "function Nomination(id, name, cup, assosiation, referee_group) {\n        this.id = id;\n        this.name = name;\n        this.cup = cup;\n        this.assosiation = assosiation;\n        this.referee_group = referee_group;\n    }",
    "ctx": {
      "type": "function",
      "name": "Nomination",
      "string": "Nomination()"
    }
  },
  {
    "tags": [
      {
        "type": "param",
        "types": [
          "callback"
        ],
        "name": "{function}",
        "description": "Функция-обработчик результата"
      }
    ],
    "description": {
      "full": "<p>Метод для сохранения данных в базе</p>",
      "summary": "<p>Метод для сохранения данных в базе</p>",
      "body": ""
    },
    "isPrivate": false,
    "ignore": false,
    "code": "Nomination.prototype.save = function(callback) {\n        var self = this;\n        Sync(\n            function() {\n                var cup = self.cup;\n                if(!cup.id) {\n                    try{\n                        cup.get_id.sync(cup);\n                    } catch(e) {\n                        throw e;\n                    }\n\n                }\n\n                var update_sql =\n                        'UPDATE cup.nominations ' +\n                        'SET name = \\'' + self.name + '\\'' +\n                        '    association_id = ' + self.assosiation +\n                        '    referee_group_id = ' + ((self.referee_group) ? self.referee_group.id : null) + // todo сделать функционал чтобы до сохранения можно было определять судейскую линейку\n                        '    tournament_id =' + self.cup.id + ' '+\n                        'WHERE nomination_id = ' + self.id;\n\n                var    insert_sql =\n                        'INSERT INTO cup.nominations(name, association_id, referee_group_id, tournament_id) ' +\n                        'VALUES(\\''+\n                            self.name +'\\','+\n                            self.assosiation +','+\n                            ((self.referee_group) ? self.referee_group.id : null) + ','+\n                            self.cup.id +')';\n\n                var used_sql = ((self.id == undefined) ? insert_sql : update_sql);\n\n                connection.query(used_sql, function(err) {\n                    callback(err)\n                })\n            }\n        );\n    };",
    "ctx": {
      "type": "method",
      "constructor": "Nomination",
      "cons": "Nomination",
      "name": "save",
      "string": "Nomination.prototype.save()"
    }
  },
  {
    "tags": [
      {
        "type": "param",
        "types": [
          "callback"
        ],
        "name": "{func}",
        "description": ""
      }
    ],
    "description": {
      "full": "<p>Метод для удаления данных из базы</p>",
      "summary": "<p>Метод для удаления данных из базы</p>",
      "body": ""
    },
    "isPrivate": false,
    "ignore": false,
    "code": "Nomination.prototype.remove = function(callback) {\n        var sql = 'DELETE FROM cup.nominations WHERE nomination_id = ' + this.id;\n        connection.query(sql, function(err) {\n            callback(err)\n        })\n    };",
    "ctx": {
      "type": "method",
      "constructor": "Nomination",
      "cons": "Nomination",
      "name": "remove",
      "string": "Nomination.prototype.remove()"
    }
  },
  {
    "tags": [
      {
        "type": "param",
        "types": [
          "group_id"
        ],
        "name": "{number}",
        "description": "идентификатор группы"
      },
      {
        "type": "param",
        "types": [
          "name"
        ],
        "name": "{string}",
        "description": "наименование"
      },
      {
        "type": "param",
        "types": [
          "referees"
        ],
        "name": "[{Object}]",
        "description": "список судей"
      },
      {
        "type": "param",
        "types": [
          "r_count"
        ],
        "name": "{number}",
        "description": "кол-во судей"
      },
      {
        "type": "param",
        "types": [
          "cup"
        ],
        "name": "{Cup}",
        "description": "турнир"
      },
      {
        "type": "param",
        "types": [
          "nominations"
        ],
        "name": "[{Nomination}]",
        "description": ""
      },
      {
        "type": "constructor",
        "string": ""
      }
    ],
    "description": {
      "full": "<p>Конструктор судейской линейки</p>",
      "summary": "<p>Конструктор судейской линейки</p>",
      "body": ""
    },
    "isPrivate": false,
    "ignore": false,
    "code": "function RefereeGroup(group_id, name, referees, r_count, cup, nominations) {\n        this.id = group_id;\n        this.name = name;\n        this.referees = referees;\n        this.r_count = r_count;\n        this.cup = cup;\n        this.nominations = nominations;\n    };",
    "ctx": {
      "type": "function",
      "name": "RefereeGroup",
      "string": "RefereeGroup()"
    }
  },
  {
    "tags": [
      {
        "type": "param",
        "types": [
          "callback"
        ],
        "name": "{function}",
        "description": "Функция-обработчик ответа"
      }
    ],
    "description": {
      "full": "<p>Метод для сохранения данных в базе</p>",
      "summary": "<p>Метод для сохранения данных в базе</p>",
      "body": ""
    },
    "isPrivate": false,
    "ignore": false,
    "code": "RefereeGroup.prototype.save = function(callback) {\n        var self = this;\n        Sync(\n            function() {\n                var cup = self.cup;\n                // Проверяем наличие id турнира и если необходимо - получаем\n                if(!cup.id) {\n                    cup.get_id.sync(cup);\n                }\n                // Обновляем таблицу с судейскими линейками\n                var update_sql =\n                        'UPDATE cup.judge_lines ' +\n                        'SET name = \\'' + self.name + '\\', ' +\n                        '    judge_count = '+ self.r_count + ', ' +\n                        '    cupid = ' + cup.id + ' ' +\n                        'WHERE line_id = ' + self.id,\n\n                    insert_sql =\n                        'INSERT INTO cup.judge_lines(name, judge_count, cupid) ' +\n                        'VALUES(\\''+ self.name +'\\','+ self.r_count +','+ cup.id +')';\n\n                var used_sql = ((self.id == undefined) ? insert_sql : update_sql);\n\n                connection.query.sync(connection, used_sql);\n\n                // Обновляем таблицу с судьями\n                var delete_sql =\n                        'DELETE FROM cup.judge_list WHERE line_id = ' + self.id,\n\n                    get_id_sql =\n                        'SELECT line_id ' +\n                        'FROM cup.judge_lines ' +\n                        'WHERE name = \\'' + self.name + '\\''+\n                        '  AND cupid = ' + cup.id;\n\n                if(!self.id) {\n                    var sql_result = connection.query.sync(connection, get_id_sql),\n                        row = sql_result[0];\n                    self.id = row[0].line_id;\n                } else {\n                    connection.query.sync(connection, delete_sql);\n                }\n\n                // Обновляем данные в таблице cup.judge_list при этом блокируем поток но не на каждую функцию\n                if (self.referees && self.referees.length > 0) {\n                    (function(callback) {\n                        var flag_count = 0,\n                            exit_count = 0;\n                        // Обновляем таблицу с судьями\n                        for (var i= 0, j= self.referees.length; i<j; i++) {\n                            var ref = self.referees[i];\n                            insert_sql =\n                                'INSERT INTO cup.judge_list(judge_id, line_id) ' +\n                                'VALUES(' + ref.id + ',' + self.id + ')';\n\n                            flag_count++;\n\n                            connection.query(insert_sql, function (err) {\n                                if (err) throw err;\n                                if(exit_count == flag_count) {\n                                    callback();\n                                }\n                                exit_count++\n                            })\n                        }\n                    }).sync()\n                }\n\n            },\n            function(err) {\n                callback(err)\n            }\n        )\n    };",
    "ctx": {
      "type": "method",
      "constructor": "RefereeGroup",
      "cons": "RefereeGroup",
      "name": "save",
      "string": "RefereeGroup.prototype.save()"
    }
  },
  {
    "tags": [
      {
        "type": "param",
        "types": [
          "callback"
        ],
        "name": "{function}",
        "description": "Функция-обработчик ответа"
      }
    ],
    "description": {
      "full": "<p>Метод для удаления данных из базы</p>",
      "summary": "<p>Метод для удаления данных из базы</p>",
      "body": ""
    },
    "isPrivate": false,
    "ignore": false,
    "code": "RefereeGroup.prototype.remove = function(callback) {\n        var self = this;\n        Sync(\n            function() {\n                var sql = 'DELETE FROM cup.judge_list WHERE line_id = ' + self.id;\n\n                connection.query.sync(connection, sql);\n\n                sql = 'DELETE FROM cup.judge_lines WHERE line_di = ' + self.id;\n\n                connection.query.sync(connection, sql);\n            },\n            function(err) {\n                callback(err)\n            }\n        );\n    };",
    "ctx": {
      "type": "method",
      "constructor": "RefereeGroup",
      "cons": "RefereeGroup",
      "name": "remove",
      "string": "RefereeGroup.prototype.remove()"
    }
  },
  {
    "tags": [
      {
        "type": "param",
        "types": [
          "referees"
        ],
        "name": "{[object]}",
        "description": "экземпляры класса 'Судья'"
      }
    ],
    "description": {
      "full": "<p>Метод для назначения судей в линейку</p>",
      "summary": "<p>Метод для назначения судей в линейку</p>",
      "body": ""
    },
    "isPrivate": false,
    "ignore": false,
    "code": "RefereeGroup.prototype.setReferees = function(referees) {\n        // Функция для присваивания судей линейкам\n        var group_referees = ((this.referees) ? this.referees : []),\n            gr_Length = ((group_referees) ? group_referees.length : 0),\n            referee_list = referees;\n        // todo как проверить что referees - это экземпляр класса Referee??\n        if (!(referee_list instanceof Array)) {\n            var s = [];\n            s.push(referee_list);\n            referee_list = s;\n        }\n\n        var flag = false;\n        for (var k= 0, n= referee_list.length; k<n; k++) {\n            var cur_referee = referee_list[k];\n            for (var i = 0; i < gr_Length; i++) {\n                if (cur_referee.id == group_referees[i].id) {\n                    flag = true;\n                }\n            }\n            if (!flag) {\n                group_referees.push(cur_referee);\n            }\n        }\n\n        this.referees = group_referees;\n    };",
    "ctx": {
      "type": "method",
      "constructor": "RefereeGroup",
      "cons": "RefereeGroup",
      "name": "setReferees",
      "string": "RefereeGroup.prototype.setReferees()"
    }
  },
  {
    "tags": [
      {
        "type": "param",
        "types": [
          "name"
        ],
        "name": "{String}",
        "description": "Имя"
      },
      {
        "type": "param",
        "types": [
          "surname"
        ],
        "name": "{String}",
        "description": "Фамилия"
      },
      {
        "type": "param",
        "types": [
          "patronymic"
        ],
        "name": "{String}",
        "description": "Отчество"
      },
      {
        "type": "constructor",
        "string": ""
      }
    ],
    "description": {
      "full": "<p>Конструктор судьи</p>",
      "summary": "<p>Конструктор судьи</p>",
      "body": ""
    },
    "isPrivate": false,
    "ignore": false,
    "code": "function Referee(id, name, surname, patronymic) {\n        this.id = id;\n        this.name = name;\n        this.surname = surname;\n        this.patronymic = patronymic;\n    }",
    "ctx": {
      "type": "function",
      "name": "Referee",
      "string": "Referee()"
    }
  },
  {
    "tags": [
      {
        "type": "param",
        "types": [
          "id"
        ],
        "name": "{number}",
        "description": ""
      },
      {
        "type": "param",
        "types": [
          "name"
        ],
        "name": "{string}",
        "description": ""
      },
      {
        "type": "param",
        "types": [
          "surname"
        ],
        "name": "{string}",
        "description": ""
      },
      {
        "type": "param",
        "types": [
          "patronymic"
        ],
        "name": "{string}",
        "description": ""
      },
      {
        "type": "param",
        "types": [
          "category"
        ],
        "name": "{string}",
        "description": ""
      },
      {
        "type": "constructor",
        "string": ""
      }
    ],
    "description": {
      "full": "<p>Конструктор судей АСХ</p>",
      "summary": "<p>Конструктор судей АСХ</p>",
      "body": ""
    },
    "isPrivate": false,
    "ignore": false,
    "code": "function AshReferee(id, name, surname, patronymic, category) {\n        this.id = id;\n        this.name = name;\n        this.surname = surname;\n        this.patronymic = patronymic;\n        this.category = category;\n    }",
    "ctx": {
      "type": "function",
      "name": "AshReferee",
      "string": "AshReferee()"
    }
  },
  {
    "tags": [
      {
        "type": "param",
        "types": [
          "id"
        ],
        "name": "{int}",
        "description": "Идентификатор пары"
      },
      {
        "type": "param",
        "types": [
          "leader"
        ],
        "name": "{Object}",
        "description": "Партнер"
      },
      {
        "type": "param",
        "types": [
          "follower"
        ],
        "name": "{Object}",
        "description": "Партнерша"
      },
      {
        "type": "param",
        "types": [
          "coupleClass"
        ],
        "name": "{String}",
        "description": "Класс пары"
      },
      {
        "type": "param",
        "types": [
          "cup"
        ],
        "name": "{Object}",
        "description": "турнир"
      },
      {
        "type": "param",
        "types": [
          "nominations"
        ],
        "name": "{[Nomination]}",
        "description": "номинации"
      },
      {
        "type": "constructor",
        "string": ""
      }
    ],
    "description": {
      "full": "<p>Конструктор пары</p>",
      "summary": "<p>Конструктор пары</p>",
      "body": ""
    },
    "isPrivate": false,
    "ignore": false,
    "code": "function Couple(id, leader, follower, coupleClass, cup, nominations) {\n        this.id = id;\n        this.leader = leader;\n        this.follower = follower;\n        this.coupleClass = coupleClass;\n        this.cup = cup;\n        this.nominations = nominations;\n    }",
    "ctx": {
      "type": "function",
      "name": "Couple",
      "string": "Couple()"
    }
  },
  {
    "tags": [
      {
        "type": "param",
        "types": [
          "callback"
        ],
        "name": "{function}",
        "description": "функция-обработчик ответа"
      }
    ],
    "description": {
      "full": "<p>Метод для сохранения данных в базе</p>",
      "summary": "<p>Метод для сохранения данных в базе</p>",
      "body": ""
    },
    "isPrivate": false,
    "ignore": false,
    "code": "Couple.prototype.save = function(callback) {\n        var self = this;\n        Sync(\n            function() {\n                var insert_sql =\n                        'INSERT INTO cup.couples(leader_id, follower_id, cup_id) ' +\n                        'VALUES('+self.leader.id+','+self.follower.id+','+self.cup.id+')',\n\n                    update_sql =\n                        'UPDATE cup.couples ' +\n                        'SET leader_id = ' + self.leader.id +\n                        '    follower_id = ' + self.follower.id +\n                        ' WHERE couple_id = ' + self.id +\n                        '       cup_id = ' + self.cup.id,\n\n                used_sql = ((self.id == undefined) ? insert_sql : update_sql);\n\n                connection.query.sync(connection, used_sql);\n\n                var nominations_length = self.nominations.length;\n\n                if(nominations_length > 0) {\n\n                    var select_sql =\n                        'SELECT couple_id id ' +\n                        'FROM cup.couples ' +\n                        'WHERE cup_id = '+ self.cup.id +\n                        '  AND (leader_id = '+self.leader.id+' or (leader_id is null and follower_id is not null ))'+\n                        '  AND (follower_id = '+self.follower.id+' or (follower_id is null and leader_id is not null ))';\n\n                    var sql_ans = connection.query.sync(connection, select_sql),\n                        row = sql_ans[0];\n                    self.id = row[0].id;\n\n                    for(var i=0; i<nominations_length; i++) {\n                        var insert_sql =\n                            'INSERT INTO cup.couples_nominations(couple_id, nomination_id, cup_id) ' +\n                            'VALUES('+self.id+','+self.nominations[i].id+','+self.cup.id+')';\n                        connection.query.sync(connection, insert_sql);\n                    }\n                }\n            },\n            function(err){\n                callback(err);\n            }\n        )\n    };",
    "ctx": {
      "type": "method",
      "constructor": "Couple",
      "cons": "Couple",
      "name": "save",
      "string": "Couple.prototype.save()"
    }
  },
  {
    "tags": [],
    "description": {
      "full": "<p>Метод для удаления данных о паре из базы</p>",
      "summary": "<p>Метод для удаления данных о паре из базы</p>",
      "body": ""
    },
    "ignore": false,
    "code": "Couple.prototype.remove = function() {};",
    "ctx": {
      "type": "method",
      "constructor": "Couple",
      "cons": "Couple",
      "name": "remove",
      "string": "Couple.prototype.remove()"
    }
  },
  {
    "tags": [
      {
        "type": "param",
        "types": [
          "id"
        ],
        "name": "{number}",
        "description": "идентификатор участника турнира"
      },
      {
        "type": "param",
        "types": [
          "person"
        ],
        "name": "{Person}",
        "description": ""
      },
      {
        "type": "param",
        "types": [
          "number"
        ],
        "name": "{number}",
        "description": "Номер участника на турнире"
      },
      {
        "type": "param",
        "types": [
          "cup"
        ],
        "name": "{Cup}",
        "description": ""
      },
      {
        "type": "param",
        "types": [
          "state"
        ],
        "name": "{string}",
        "description": "показатель типа (партнер/партнерша)"
      },
      {
        "type": "constructor",
        "string": ""
      }
    ],
    "description": {
      "full": "<p>Класс 'Участник турнира'</p>",
      "summary": "<p>Класс 'Участник турнира'</p>",
      "body": ""
    },
    "isPrivate": false,
    "ignore": false,
    "code": "function Participant(id, person, number, cup, state) {\n        this.id = id;\n        this.person = person;\n        this.number = number;\n        this.cup = cup;\n        this.state = state;\n    }",
    "ctx": {
      "type": "function",
      "name": "Participant",
      "string": "Participant()"
    }
  },
  {
    "tags": [
      {
        "type": "param",
        "types": [
          "callback"
        ],
        "name": "{object}",
        "description": "функция-обработчик ответа"
      }
    ],
    "description": {
      "full": "<p>Метод для сохранения данных об участнике в базе</p>",
      "summary": "<p>Метод для сохранения данных об участнике в базе</p>",
      "body": ""
    },
    "isPrivate": false,
    "ignore": false,
    "code": "Participant.prototype.save = function(callback) {\n        var self = this;\n        Sync(\n            function() {\n                var insert_sql =\n                        'INSERT INTO cup.cup_participants(person_id, cup_id, num, state) ' +\n                        'VALUES('+self.person.id+','+self.cup.id+','+self.number+',\\''+self.state+'\\')',\n                    select_sql =\n                        'SELECT participant_id id ' +\n                        'FROM cup.cup_participants ' +\n                        'WHERE cup_id = '+self.cup.id +\n                        ' AND person_id = '+self.person.id;\n                try{\n                    connection.query.sync(connection, insert_sql);\n                } catch(e) {\n                    console.log(e);\n                }\n\n                var sql_ans = connection.query.sync(connection, select_sql),\n                    row = sql_ans[0];\n                    self.id = row[0].id;\n            },\n            function(err) {\n                callback(err);\n            }\n        );\n    };",
    "ctx": {
      "type": "method",
      "constructor": "Participant",
      "cons": "Participant",
      "name": "save",
      "string": "Participant.prototype.save()"
    }
  },
  {
    "tags": [
      {
        "type": "param",
        "types": [
          "id"
        ],
        "name": "{number}",
        "description": "идентификатор персоны"
      },
      {
        "type": "param",
        "types": [
          "name"
        ],
        "name": "{string}",
        "description": "имя"
      },
      {
        "type": "param",
        "types": [
          "surname"
        ],
        "name": "{string}",
        "description": "фамилия"
      },
      {
        "type": "param",
        "types": [
          "patronymic"
        ],
        "name": "{string}",
        "description": "отчество"
      },
      {
        "type": "param",
        "types": [
          "clubs"
        ],
        "name": "{[string]}",
        "description": "названия клубов"
      },
      {
        "type": "constructor",
        "string": ""
      }
    ],
    "description": {
      "full": "<p>Класс 'Персона'</p>",
      "summary": "<p>Класс 'Персона'</p>",
      "body": ""
    },
    "isPrivate": false,
    "ignore": false,
    "code": "function Person(id, name, surname, patronymic, clubs) {\n        this.id = id;\n        this.name = name;\n        this.surname = surname;\n        this.patronymic = patronymic;\n        this.clubs = clubs;\n    }\n\n    global.Cup = Cup;\n    global.Nomination = Nomination;\n    global.RefereeGroup = RefereeGroup;\n    global.Referee = {\n        simple_referee: Referee,\n        ash_referee: AshReferee\n    };\n    global.Couple = Couple;\n    global.Participant = Participant;\n    global.Person = Person;\n\n})(exports);",
    "ctx": {
      "type": "function",
      "name": "Person",
      "string": "Person()"
    }
  }
]
