FROM node:alpine as build

# Update os packages and add git
RUN apk update && apk upgrade && apk add --no-cache bash git openssh

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install && npm i -g babel babel-cli serve

# Bundle app source
COPY . /usr/src/app
RUN npm run build

FROM node:alpine
COPY --from=build /usr/src/app /
EXPOSE 3082
CMD ["npm", "run", "prod"]

# https://itnext.io/3-simple-tricks-for-smaller-docker-images-f0d2bda17d1e