# HelpBid

Hackathon test task


## Installation

- Install packages

```bash
  cd client
  npm install

  cd ../server
  npm install
```

- Create **.env** file in **/server** directory

```
PORT=5000

DATABASE_URL="postgresql://postgres:postgres@localhost:5432/Auction?schema=public"

CLIENT_URL="http://localhost:5173"

PASSWORD_SALT=8
TOKEN_SALT=2

JWT_ALGORITHM=HS512
JWT_ACCESS_SECRET=jwt-access-secret
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_SECRET=jwt-refresh-secret
JWT_REFRESH_EXPIRES_IN=7d

COOKIE_NAME=Auction_jwt_refresh_token
COOKIE_MAX_AGE=604800000

SERVE_STATIC_FOLDER=static
SERVE_STATIC_PREFIX=static
```

- Create folder called **static** in **/server** directory
- Execute following command in **/server** directory
```
npm run db:reset
```

## Start

- In **/client** directory
```
npm run dev
```
- In **/server** directory
```
npm run start:dev
```
