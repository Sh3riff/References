// Tutorial @ https://dzone.com/articles/how-to-develop-your-nodejs-docker-applications-fas.  
// Github @ https://github.com/kelda/node-todo

docker-compose.yml
```yml
version: '3'
services:
  web:
    build: .
    ports:
      - "8080:8080"
    depends_on:
      - mongo
    volumes:
      - "./app:/usr/src/app/app"
  mongo:
    image: "mongo"
    ports:
      - "27017:27017"
```

Dockerfile  

```
FROM node:10-alpine
ENV PORT 8080
WORKDIR /usr/src/app
COPY . /usr/src/app

RUN npm install -g nodemon
RUN npm install

ENTRYPOINT ["nodemon", "/usr/src/app/server.js"]
```  

# How to Configure Your Container to Automatically Sync Your Node.js Code 

1) Locate the folder in your Docker container that has your code. The easiest way to figure out where your code is stored in your container is to look at your Dockerfile’s COPY commands. In the Node-todo example, its Dockerfile tells Docker to put the code in . /usr/src/app:
```
COPY . /usr/src/app
```
2) Find the path to the folder on your laptop that has the same Node.js code.
3) Add a host volume to your docker-compose file. Find the container in your docker-compose file that you want to sync code with, and add a volume instruction underneath that container:
```
volumes:
  "/path-to-laptop-folder:/path-to-container-folder"
```
4) Switch from using node.js to nodemon. In the Node-todo example, you implemented it via Dockerfile commands:
```
RUN npm install -g nodemon
RUN npm install

ENTRYPOINT ["nodemon", "/usr/src/app/server.js"]
```
5) Run Docker Compose or Blimp. Now all you need to do is either run docker-compose:
```
docker-compose up

or

blimp up
```

## Docker will overwrite the container’s code with the code that’s on your laptop.

Now that you’ve modified your project so it uses a host volume and nodemon, any changes you make to your Node.js code on your laptop will now automatically appear in the container.
