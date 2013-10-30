CREATE DATABASE `reg_system` /*!40100 DEFAULT CHARACTER SET utf8 */;

CREATE TABLE `reg_system`.`association_links` (
  `association_id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `db_name` varchar(45) DEFAULT NULL,
  `host` varchar(50) DEFAULT NULL,
  `port` int(11) DEFAULT NULL,
  `login` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`association_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `reg_system`.`clubs` (
  `club_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`club_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `reg_system`.`people` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `lastname` varchar(50) DEFAULT NULL,
  `firstname` varchar(50) DEFAULT NULL,
  `patronymic` varchar(50) DEFAULT NULL,
  `sex` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `reg_system`.`places` (
  `place_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `coords` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`place_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `reg_system`.`tournament_links` (
  `tournametID` int(11) NOT NULL,
  `db_adress` varchar(100) NOT NULL,
  `db_login` varchar(45) NOT NULL,
  `db_password` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `reg_system`.`users` (
  `userid` int(11) NOT NULL AUTO_INCREMENT,
  `login` varchar(10) NOT NULL,
  `password` varchar(50) NOT NULL,
  PRIMARY KEY (`userid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
