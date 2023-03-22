FROM node:16-alpine AS builder

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install

# copy all sources
COPY . .

RUN npm run build

#use nginx for production build
FROM nginx:1.19-alpine AS server
# copy files from builder
COPY --from=builder ./app/build /usr/share/nginx/html