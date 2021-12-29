# pull official base image
FROM node:14-alpine

# set working directory
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install 
RUN npm install react-scripts@5.0.0 -g --silent

# add app
COPY . ./

# start app
CMD ["npm", "start"]