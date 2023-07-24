-- in command line: 
-- mysql -u root -p -e "source create.sql"

-- source C:/opt/tfip/miniProject/Database/create.sql

drop database if exists railway;

create database railway;

use railway;

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

  INSERT INTO `railway`.`medium` (`id`, `name`, `timer`) VALUES ('1', 'DEFAULT', '1000');
  
  INSERT INTO `railway`.`hard` (`id`, `name`, `timer`) VALUES ('1', 'DEFAULT', '1000');

  INSERT INTO `railway`.`extreme` (`id`, `name`, `timer`) VALUES ('1', 'DEFAULT', '10000');

CREATE TABLE messages (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `content` TEXT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE
);



