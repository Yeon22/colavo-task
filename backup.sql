-- 데이터베이스 및 유저 준비
CREATE DATABASE colavo;

GRANT ALL PRIVILEGES ON *.* TO 'root'@'%';

CREATE USER 'su'@'%' IDENTIFIED BY 'qwer1234';
GRANT ALL PRIVILEGES ON colavo.* TO 'su'@'%';

CREATE USER 'dev-nest'@'%' IDENTIFIED BY 'dev1234!@#$';
GRANT ALL PRIVILEGES ON colavo.* TO 'dev-nest'@'%';

FLUSH PRIVILEGES;

-- 데이터 준비
INSERT INTO workhour (is_day_off, weekday, open_interval, close_interval) VALUES (false, 1, 36000, 72000);
INSERT INTO workhour (is_day_off, weekday, open_interval, close_interval) VALUES (false, 2, 36900, 36900);
INSERT INTO workhour (is_day_off, weekday, open_interval, close_interval) VALUES (false, 3, 36000, 72000);
INSERT INTO workhour (is_day_off, weekday, open_interval, close_interval) VALUES (false, 4, 36000, 72000);
INSERT INTO workhour (is_day_off, weekday, open_interval, close_interval) VALUES (false, 5, 36000, 72000);
INSERT INTO workhour (is_day_off, weekday, open_interval, close_interval) VALUES (false, 6, 36000, 72000);
INSERT INTO workhour (is_day_off, weekday, open_interval, close_interval) VALUES (false, 7, 36000, 72000);

INSERT INTO event (begin_at, end_at, created_at, updated_at) VALUES (1620583200, 1620586800, 1620615600, 1620615600);
INSERT INTO event (begin_at, end_at, created_at, updated_at) VALUES (1620608400, 1620610200, 1620615600, 1620615600);
INSERT INTO event (begin_at, end_at, created_at, updated_at) VALUES (1620635400, 1620639000, 1620615600, 1620615600);
INSERT INTO event (begin_at, end_at, created_at, updated_at) VALUES (1620649200, 1620651000, 1620615600, 1620615600);