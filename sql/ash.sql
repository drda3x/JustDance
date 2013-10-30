CREATE DATABASE `ash` /*!40100 DEFAULT CHARACTER SET utf8 */;

CREATE TABLE `ash`.`classes` (
  `class_id` int(11) NOT NULL AUTO_INCREMENT,
  `class_name` varchar(1) NOT NULL,
  PRIMARY KEY (`class_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `ash`.`dancers` (
  `dancer_id` int(11) NOT NULL,
  `person_id` int(11) NOT NULL,
  `club_id` int(11) DEFAULT NULL,
  `current_class_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`dancer_id`),
  KEY `club_idx` (`club_id`),
  KEY `class_idx` (`current_class_id`),
  CONSTRAINT `class` FOREIGN KEY (`current_class_id`) REFERENCES `classes` (`class_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `club` FOREIGN KEY (`club_id`) REFERENCES `reg_system`.`clubs` (`club_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `ash`.`judge_categories` (
  `category_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(15) NOT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `ash`.`judges` (
  `personid` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `club_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`personid`),
  KEY `category_idx` (`category_id`),
  CONSTRAINT `category` FOREIGN KEY (`category_id`) REFERENCES `judge_categories` (`category_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `ash`.`ratings` (
  `dancer_id` int(11) NOT NULL,
  `class_id` int(11) NOT NULL,
  `score` int(11) NOT NULL,
  PRIMARY KEY (`dancer_id`),
  KEY `class_idx` (`class_id`),
  CONSTRAINT `rating_class` FOREIGN KEY (`class_id`) REFERENCES `classes` (`class_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
