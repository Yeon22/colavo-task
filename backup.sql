-- 데이터베이스 및 유저 준비
CREATE DATABASE colavo;

GRANT ALL PRIVILEGES ON *.* TO 'root'@'%';

CREATE USER 'su'@'%' IDENTIFIED BY 'qwer1234';
GRANT ALL PRIVILEGES ON colavo.* TO 'su'@'%';

CREATE USER 'dev-nest'@'%' IDENTIFIED BY 'dev1234!@#$';
GRANT ALL PRIVILEGES ON colavo.* TO 'dev-nest'@'%';

FLUSH PRIVILEGES;

-- 임시 데이터 준비
INSERT INTO workhour (is_day_off, weekday, open_interval, close_interval) VALUES (true, 1, 0, 0);
INSERT INTO workhour (is_day_off, weekday, open_interval, close_interval) VALUES (false, 2, 36900, 36900);
INSERT INTO workhour (is_day_off, weekday, open_interval, close_interval) VALUES (false, 3, 36000, 72000);
INSERT INTO workhour (is_day_off, weekday, open_interval, close_interval) VALUES (false, 4, 36000, 72000);
INSERT INTO workhour (is_day_off, weekday, open_interval, close_interval) VALUES (false, 5, 36000, 72000);
INSERT INTO workhour (is_day_off, weekday, open_interval, close_interval) VALUES (false, 6, 36000, 72000);
INSERT INTO workhour (is_day_off, weekday, open_interval, close_interval) VALUES (true, 7, 0, 0);