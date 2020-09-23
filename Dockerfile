FROM node:13.14

WORKDIR /car-dealership

ADD package.json yarn.lock ./
RUN yarn install

COPY . .
RUN yarn run build

EXPOSE 3000

CMD ["yarn", "start"]