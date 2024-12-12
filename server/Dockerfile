FROM node
ENV NODE_ENV production
WORKDIR /application
COPY package.json .
COPY package-lock.json .
RUN npm ci
COPY . .
EXPOSE 80
CMD [ "npm", "start" ]