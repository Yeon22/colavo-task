-- 데이터베이스 및 유저 준비
CREATE DATABASE colavo;

GRANT ALL PRIVILEGES ON *.* TO 'root'@'%';

CREATE USER 'su'@'%' IDENTIFIED BY 'qwer1234';
GRANT ALL PRIVILEGES ON colavo.* TO 'su'@'%';

CREATE USER 'dev-nest'@'%' IDENTIFIED BY 'dev1234!@#$';
GRANT ALL PRIVILEGES ON colavo.* TO 'dev-nest'@'%';

FLUSH PRIVILEGES;