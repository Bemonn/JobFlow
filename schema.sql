-- Drop database if exists
DROP DATABASE IF EXISTS jobflow;

-- Create database
CREATE DATABASE work_undesignated;

-- Use the database
USE jobflow;

-- Create employee table
CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

-- Create task table
CREATE TABLE tasks (
    id INT NOT NULL AUTO_INCREMENT,
    description TEXT NOT NULL,
    due_date DATE,
    employee_id INT,
    FOREIGN KEY (employee_id) REFERENCES employees(id),
    PRIMARY KEY (id)
);