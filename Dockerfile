///////////////////////// SIMPLE /////////////////////////

FROM node:14.15.0-slim

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=8080

EXPOSE 8080

CMD [ "npm", "start" ]


///////////////////////// Multi Step /////////////////////////

FROM node:14.15.0-slim as build

WORKDIR /app

COPY package*.json ./

COPY . .

RUN npm install

RUN npm run build



FROM node:14.15.0-slim  // FROM node:14.15.0-slim as build 

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY --from=0 /app/src ./src  // COPY --from=build /app/src ./src

ENV PORT=8080

EXPOSE 8080

CMD [ "npm", "start" ]
