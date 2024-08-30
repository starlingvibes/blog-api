FROM node:16
WORKDIR /app
COPY ./package.json ./
RUN npm i
COPY . .
RUN npm cache clean --force

EXPOSE 1337
RUN ls -la
CMD ["npm", "start"]