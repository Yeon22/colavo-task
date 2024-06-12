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

# connect to mysql
$ docker exec -it container-id bash
$ mysql -u root -p password

# 이후 실행은 backup.sql 을 참고해주세요.
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

```
http://localhost:3000/api
```

## License

Nest is [MIT licensed](LICENSE).
