FROM node:10
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run prebuild
EXPOSE 4000
CMD [ "node", "build/bundle.js" ]
