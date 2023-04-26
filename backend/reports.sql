DROP TABLE IF EXISTS reports;

CREATE DATABASE IF NOT EXISTS mydatabase;
USE mydatabase;

CREATE TABLE reports (
  id INT(11) NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  date DATE NOT NULL,
  value DECIMAL(10,2) NOT NULL,
  report_type VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO reports (name, date, value, report_type)
VALUES
  ('John', '2022-04-27', 5000, 'Sales'),
  ('Jane', '2022-04-27', 3000, 'Marketing'),
  ('Bob', '2022-04-27', 7000, 'Sales'),
  ('Alice', '2022-04-27', 4500, 'Finance');

-- mysql -u <username> -p <database> < reports.sql