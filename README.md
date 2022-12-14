## About the project

- host: http://localhost:3000
- swagger: http://localhost:3000/api
- database: postgres
- tests: jest and supertest
- container: docker

<p>The application it is separated by layers respecting some architecture concepts</p>

## Installation

```bash
$ npm install

#or

$ yarn install
```

## Running the app

- Before use the app you have to run the migrations, if you are inside the docker you must open the app terminal inside the docker.
  you can choose run only the database using docker and run the app without docker.

ex:

```bash
$ docker-compose up database
```

- database host inside docker: database
- database host outside docker: localhost

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod

# docker
$ docker-compose up

# migrations
$ yarn knex migrate:latest

# or

$ npm run knex migrate:latest
```

## Getting started

- Create a user
- Create a account
- Create another account

### After this you can:

- Make a deposit
- Make a withdrawal
- Transfer amount
- Get account balance
- Get account statement

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Challenge:

This document describes the test for backend development positions at the RipioTrade cryptocurrency exchange.

The goal of this test is to develop a REST API in NodeJS that simulates a banking system. These are the endpoints that you should include:

[✅] 1.Create account;

[✅] 2.Make a deposit;

[✅] 3.Get account balance;

[✅] 4.Get account statement;

[✅] 5.Transfer amount between two accounts;

[✅] 6.Make a withdrawal;

## There is no rule regarding frameworks or persistence, but there are some things that can be a plus:

[✅] -Implementing the API using TypeScript;

[✅] -Using the NestJS framework;

[✅] -Persisting the data in a PostgreSQL database (in this case you should also create the migrations for the database);

[❌] -Using the Prisma ORM;

[✅] -Creating tests (unit, integration and end-to-end);

[✅] -Documenting the API using Swagger / OpenAPI;

[✅] Another big plus is also how your code is written, because this will be evaluated.

[✅] The code for this API needs to be versioned in a public GitHub repository, and the URL should be shared with us. If possible, also include in the README the instructions to run the application and the tests (if there are any).

## Screenshots

<p align="center" style="margin:14px 0;">
  <img src="./github/assets/unit-tests.png" width="600" alt="Nest Logo" />
</p>

<p align="center" style="margin:14px 0;">
  <img src="./github/assets/insomnia-screenshot.png" width="600" alt="Nest Logo" />
</p>

<p align="center" style="margin:14px 0;">
  <img src="./github/assets/swagger-screenshot.png" width="600" alt="Nest Logo" />
</p>

<p align="center" style="margin:14px 0;">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->
