FROM node:14-alpine
WORKDIR /var/www/mdw
COPY ["package.json",  "./"]
RUN npm install -g @nestjs/cli
COPY . .
COPY .env.stage.dev ./.env
RUN yarn install
COPY tsconfig.build.json .
EXPOSE 3000
CMD ["yarn", "start:dev"]