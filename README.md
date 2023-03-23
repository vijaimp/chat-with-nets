# Overview

This application provides chat functionality whereas user has to enter server address(chat server) and username.

# To run in local

## Prerequisites

- node 16

### `npm install`

install all dependencies

### `npm start`

Runs chat server in .\
 [http://localhost:3000](http://localhost:3000)

**Note:** make sure backend chat service has started already

### `npm test`

run unit tests

# To run in docker

## Prerequisites

- docker

steps:

`docker build . -t chat-ui`

`docker run -p 3000:80 chat-ui`

then
service should be accessible in [http://localhost:3000](http://localhost:3000)
