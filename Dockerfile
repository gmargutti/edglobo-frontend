FROM node:12.18-alpine
WORKDIR /usr/src/app
COPY ["package.json", "yarn.lock", "./"]
RUN yarn
COPY . .
RUN yarn build
EXPOSE 5000
CMD yarn serve -s build