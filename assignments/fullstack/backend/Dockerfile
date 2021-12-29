FROM node:14-alpine


# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install && mkdir -m777 node_modules/.cache
COPY . .


# USER 1000
CMD ["npm","start"]