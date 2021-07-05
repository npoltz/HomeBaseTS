FROM node:16.3-alpine3.11
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
COPY . .
EXPOSE 8080
CMD ["npm", "start"]
