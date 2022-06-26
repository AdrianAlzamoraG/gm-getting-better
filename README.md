## Requisites
- https://dev.mysql.com/downloads/mysql
- https://www.mysql.com/products/workbench

## Run app
```
$ npm install
$ npm run build
$ npm run start:dev

@nestjs/typeorm 8.0.4 and typeorm 0.3.6 are now compatible

$ npm update
```

## API documentation
# <img src="https://raw.githubusercontent.com/swagger-api/swagger.io/wordpress/images/assets/SWU-logo-clr.png" width="300">

[![NPM version](https://badge.fury.io/js/swagger-ui.svg)](http://badge.fury.io/js/swagger-ui)
[![Build Status](https://jenkins.swagger.io/view/OSS%20-%20JavaScript/job/oss-swagger-ui-master/badge/icon?subject=jenkins%20build)](https://jenkins.swagger.io/view/OSS%20-%20JavaScript/job/oss-swagger-ui-master/)
[![npm audit](https://jenkins.swagger.io/buildStatus/icon?job=oss-swagger-ui-security-audit&subject=npm%20audit)](https://jenkins.swagger.io/job/oss-swagger-ui-security-audit/lastBuild/console)

## Introduction
[Swagger UI](https://swagger.io/tools/swagger-ui/) allows anyone — be it your development team or your end consumers — to visualize and interact with the API’s resources without having any of the implementation logic in place. It’s automatically generated from your OpenAPI (formerly known as Swagger) Specification, with the visual documentation making it easy for back end implementation and client side consumption.

## General
**👉🏼 Want to score an easy open-source contribution?** Check out our [Good first issue](https://github.com/swagger-api/swagger-ui/issues?q=is%3Aissue+is%3Aopen+label%3A%22Good+first+issue%22) label.

**🕰️ Looking for the older version of Swagger UI?** Refer to the [*2.x* branch](https://github.com/swagger-api/swagger-ui/tree/2.x).

### Running

Once the application is running you can visit [http://localhost:8080/api](http://localhost:8080/api) to see the Swagger interface.

See [here](https://docs.nestjs.com/recipes/swagger#bootstrap) for more information.

## Migrations

```
$ npm run build
$ npm run typeorm migration:create -- -n InitialSchema
$ npm run typeorm migration:create -- -n MasterData
$ npm run typeorm migration:create -- -n UserEmailUpdate
$ npm run typeorm migration:create -- -n UserEmailReupdate
$ npm run start:dev
```

## Terminal

```
$ npm install --save typeorm @nestjs/typeorm mysql
$ npm install --save @nestjs/cqrs
$ npm install --save typescript-result
$ npm install --save moment-timezone
$ npm install --save node-sql-reader
$ nest g resource customers
```

## Environment variables

```
BANKING_DDD_NEST_MYSQL=mysql://{user}:{password}@{host}:{port}/{database}
BANKING_DDD_NEST_MYSQL=mysql://root:root@localhost:3306/banking-ddd-nest
Note: Password must be URL encoded, %25 is the url encoding of %.
```

## Fix issue with MySQL 8

Client does not support authentication protocol requested by server; consider upgrading MySQL client.
To fix it, run the following command changing the values with your credentials:

```
ALTER USER '{user}'@'{host}' IDENTIFIED WITH mysql_native_password BY '{password}'
FLUSH PRIVILEGES;
```

### Example:

```
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root'
FLUSH PRIVILEGES;
```

