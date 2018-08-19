FROM node:alpine

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install && npm i -g serve

# Bundle app source
COPY . /usr/src/app
RUN npm run build

EXPOSE 3082
CMD ["npm", "run", "prod"]