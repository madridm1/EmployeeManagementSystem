DROP DATABASE IF EXISTS ee_db;

CREATE DATABASE ee_db;

USE ee_db;

CREATE TABLE employee (
ee_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
first_name VARCHAR(30),
last_name VARCHAR(30),
role_id INT,
manager_id INT
);

CREATE TABLE role (
role_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(30),
salary DECIMAL(10, 2),
department_id INT
);

CREATE TABLE department (
department_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(30)
);

SELECT * FROM role;