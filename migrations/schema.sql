-- Create Database
CREATE DATABASE taskflow_db;

--select Database
USE taskflow_db;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(100) NOT NULL,
email VARCHAR(100) UNIQUE NOT NULL
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(100) NOT NULL,
description TEXT,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create project_members table (many-to-many between users & projects)
CREATE TABLE IF NOT EXISTS project_members (
id INT AUTO_INCREMENT PRIMARY KEY,
project_id INT,
user_id INT,
FOREIGN KEY (project_id) REFERENCES projects(id),
FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Create tasks table
CREATE TABLE IF NOT EXISTS tasks (
id INT AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(100) NOT NULL,
description TEXT,
status ENUM('pending', 'in_progress', 'completed') DEFAULT 'pending',
project_id INT,
assignee_id INT,
FOREIGN KEY (project_id) REFERENCES projects(id),
FOREIGN KEY (assignee_id) REFERENCES users(id)
);

-- Create task_dependencies table
CREATE TABLE IF NOT EXISTS task_dependencies (
id INT AUTO_INCREMENT PRIMARY KEY,
task_id INT,
depends_on_task_id INT,
FOREIGN KEY (task_id) REFERENCES tasks(id),
FOREIGN KEY (depends_on_task_id) REFERENCES tasks(id)
);

-- Create comments table
CREATE TABLE IF NOT EXISTS comments (
id INT AUTO_INCREMENT PRIMARY KEY,
task_id INT,
user_id INT,
content TEXT NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (task_id) REFERENCES tasks(id),
FOREIGN KEY (user_id) REFERENCES users(id)
);