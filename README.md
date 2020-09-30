# Car dealerhip

## Description

API rest to handle car dearlership vehicules using the power of nestjs and typescript

## Installation

```bash
$ yarn install
```

## Running the app in bare env

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Running the app into container env with docker

### Configuration

| Env           | Description       |
|---------------|-------------------|
| `DB_HOST`     | database host     |
| `DB_USERNAME` | database username |
| `DB_PASSWORD` | database password |

### Run a demo

```bash
# run a demo
$ make demo

# stop demo
$ make stop
```

### Deploy in production

```bash
# build docker image
$ make build

# run on docker host
$ docker run -e ... car-dealership:0.0.1
```

## Test

```bash
# unit tests
$ make unittest

# e2e tests
$ make test

# test coverage
$ make coverage
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Fabien](mailto@fabien.lassagne@gmail.com)

## License

  car-dealership is [MIT licensed](LICENSE).
