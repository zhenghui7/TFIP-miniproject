-- in command line: 
-- mysql -u root -p -e "source create.sql"

-- source C:/opt/tfip/miniProject/Database/create.sql

drop database if exists miniproject;

create database miniproject;

use miniproject;

CREATE TABLE easy (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `timer` DECIMAL(30,2) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);

CREATE TABLE medium (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `timer` DECIMAL(30,2) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);

CREATE TABLE hard (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `timer` DECIMAL(30,2) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);

CREATE TABLE extreme (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `timer` DECIMAL(30,2) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);

  INSERT INTO `miniproject`.`medium` (`id`, `name`, `timer`) VALUES ('1', 'DEFAULT', '1000');
  
  INSERT INTO `miniproject`.`hard` (`id`, `name`, `timer`) VALUES ('1', 'DEFAULT', '1000');

  INSERT INTO `miniproject`.`extreme` (`id`, `name`, `timer`) VALUES ('1', 'DEFAULT', '10000');

CREATE TABLE messages (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `content` TEXT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE
);

grant all privileges on miniproject.* to 'fred'@'%';



