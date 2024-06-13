# 콜라보그라운드 백엔드 과제

## Installation

```bash
$ npm install
```

## Set up DB

```bash
# run docker
$ docker-compose up -d

# get docker container id
$ docker ps -a

# connect to docker
$ docker exec -it container-id bash

# connect to mysql
$ mysql -u root -p pwd1234!@#$

# backup.sql 파일에서 데이터베이스 및 유저 준비 부분의 SQL을 순서대로 실행
# colavo 데이터베이스 준비 및 유저 생성 후 접속했던 mysql에서 exit 후 새로 생성한 유저로 mysql DB 접속
$ exit
$ mysql -u su -p qwer1234

# 아래 명령대로 watch mode로 app 실행 후 backup.sql 에 있는 나머지 데이터 준비 SQL 문을 실행
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Swagger API

브라우저에서 아래 주소로 접속

```
http://localhost:3000/api
```

## License

Nest is [MIT licensed](LICENSE).
