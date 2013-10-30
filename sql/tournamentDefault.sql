CREATE DATABASE `@db_name@` /*!40100 DEFAULT CHARACTER SET utf8 */;

CREATE TABLE `@db_name@`.`couples` (
  `couple_id` int(11) NOT NULL AUTO_INCREMENT,
  `number_him` int(11) DEFAULT NULL,
  `number_her` int(11) DEFAULT NULL,
  `partner_he` int(11) DEFAULT NULL,
  `partner_she` int(11) DEFAULT NULL,
  PRIMARY KEY (`couple_id`),
  KEY `he_people_idx` (`partner_he`),
  KEY `she_people_idx` (`partner_she`),
  CONSTRAINT `he_people` FOREIGN KEY (`partner_he`) REFERENCES `reg_system`.`people` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `she_people` FOREIGN KEY (`partner_she`) REFERENCES `reg_system`.`people` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `@db_name@`.`judge_lines` (
  `line_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `judge_count` int(11) DEFAULT NULL,
  PRIMARY KEY (`line_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `@db_name@`.`judge_list` (
  `judge_id` int(11) NOT NULL,
  `line_id` int(11) NOT NULL,
  `in_reverse` int(11) NOT NULL,
  KEY `jList_jLine_idx` (`line_id`),
  KEY `judge_people_idx` (`judge_id`),
  CONSTRAINT `judge_people` FOREIGN KEY (`judge_id`) REFERENCES `reg_system`.`people` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `jList_jLine` FOREIGN KEY (`line_id`) REFERENCES `judge_lines` (`line_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `@db_name@`.`nomination_participants_list` (
  `couple_id` int(11) NOT NULL,
  `nomination_id` int(11) NOT NULL,
  KEY `npl_couples_idx` (`couple_id`),
  KEY `npl_nominations_idx` (`nomination_id`),
  CONSTRAINT `npl_couples` FOREIGN KEY (`couple_id`) REFERENCES `couples` (`couple_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `npl_nominations` FOREIGN KEY (`nomination_id`) REFERENCES `nominations` (`nomination_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `@db_name@`.`nominations` (
  `nomination_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(80) NOT NULL,
  `association_id` int(11) NOT NULL,
  `judge_line_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`nomination_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `@db_name@`.`roles` (
  `roleid` int(11) NOT NULL AUTO_INCREMENT,
  `shortname` varchar(15) DEFAULT NULL,
  `fullname` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`roleid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `@db_name@`.`roles_assigment` (
  `roleid` int(11) NOT NULL,
  `userid` int(11) NOT NULL,
  KEY `user_idx` (`userid`),
  KEY `role_idx` (`roleid`),
  CONSTRAINT `ra_role` FOREIGN KEY (`roleid`) REFERENCES `roles` (`roleid`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `ra_user` FOREIGN KEY (`userid`) REFERENCES `users` (`userid`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `@db_name@`.`section` (
  `sectionid` int(11) NOT NULL AUTO_INCREMENT,
  `section_index` int(11) NOT NULL,
  PRIMARY KEY (`sectionid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `@db_name@`.`set_participants_list` (
  `set_id` int(11) NOT NULL,
  `couple_id` int(11) NOT NULL,
  KEY `spl_couple_idx` (`couple_id`),
  KEY `spl_set_idx` (`set_id`),
  CONSTRAINT `spl_couple` FOREIGN KEY (`couple_id`) REFERENCES `tour_participants_list` (`couple_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `spl_set` FOREIGN KEY (`set_id`) REFERENCES `sets` (`set_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `@db_name@`.`sets` (
  `set_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `tour_id` int(11) NOT NULL,
  `judgeline_id` int(11) NOT NULL,
  PRIMARY KEY (`set_id`),
  KEY `set_tour_idx` (`tour_id`),
  KEY `set_nomination_idx` (`judgeline_id`),
  CONSTRAINT `set_tour` FOREIGN KEY (`tour_id`) REFERENCES `tours` (`tour_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `set_nomination` FOREIGN KEY (`judgeline_id`) REFERENCES `nominations` (`nomination_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `@db_name@`.`tour_participants_list` (
  `tour_id` int(11) NOT NULL,
  `couple_id` int(11) NOT NULL,
  KEY `tpl_tour_idx` (`tour_id`),
  KEY `tpl_couple_idx` (`couple_id`),
  CONSTRAINT `tpl_tour` FOREIGN KEY (`tour_id`) REFERENCES `tours` (`tour_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `tpl_couple` FOREIGN KEY (`couple_id`) REFERENCES `nomination_participants_list` (`couple_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `@db_name@`.`tournaments` (
  `tournament_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `place` int(11) DEFAULT NULL,
  `organiser` varchar(45) DEFAULT NULL,
  `club_id` int(11) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `end_reg_date` date DEFAULT NULL,
  `info` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`tournament_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `@db_name@`.`tours` (
  `tour_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `sets` int(11) NOT NULL,
  `dances` int(11) DEFAULT NULL,
  `passes` int(11) NOT NULL,
  `nomination_id` int(11) NOT NULL,
  PRIMARY KEY (`tour_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `@db_name@`.`user_views` (
  `viewid` int(11) NOT NULL AUTO_INCREMENT,
  `shortname` varchar(10) DEFAULT NULL,
  `fullname` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`viewid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `@db_name@`.`users` (
  `userid` int(11) NOT NULL AUTO_INCREMENT,
  `login` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  PRIMARY KEY (`userid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `@db_name@`.`views_assigment` (
  `viewid` int(11) NOT NULL,
  `roleid` int(11) NOT NULL,
  KEY `view_idx` (`viewid`),
  KEY `role_idx` (`roleid`),
  CONSTRAINT `va_role` FOREIGN KEY (`roleid`) REFERENCES `roles` (`roleid`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `va_view` FOREIGN KEY (`viewid`) REFERENCES `user_views` (`viewid`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
