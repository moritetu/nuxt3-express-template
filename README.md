# nuxt3-express-template

The template for nuxt3 with express and primevue etc.

## Setup

```bash
yarn
cp .env.local .env

# DB migration
yarn dev:db:migrate
yarn dev:db:seed:all
```

## Usage

### Run in development mode

```bash
yarn dev
```

http://localhost:3000/

### Request Server API

```bash
$ curl http://localhost:3000/server/api/hello/say
{"message":"Hello World"}
```

### Add Server Routes

- `src/server/routes/index.ts`

### Run in producion mode

```bash
yarn build
yarn start
```

## Test

```bash
yarn test:server
yarn test:client
```
