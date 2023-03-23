# Overview

This application provide simple service to broadcast messages to all connected clients

# To run in local

## Prerequisites

- node 16

### `npm install`

install all dependencies

### `npm start`

Runs chat server in .\
 [http://localhost:4000](http://localhost:4000)

### `npm test`

run unit tests

# To run in docker

## Prerequisites

- docker

steps:

`docker build . -t chat-service`

`docker run -p 4000:4000 chat-service`

then
service should be accessible in [http://localhost:4000](http://localhost:4000)
