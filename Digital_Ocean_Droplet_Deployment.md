
# Digital Ocean Deployment

This project was deployed to digital ocean using [this guide](https://www.linkedin.com/pulse/deploying-nodejs-app-digitalocean-server-hayk-simonyan/). Let's start by assuming the following.  
    - You have a digital ocean account 
    - You have Setup a digital ocean account and droplet (server)
    - You have created a SSH connection with digital ocean

### Connect to droplet
```
ssh root@161.15.121.96 # replace with droplet id
```
### Update
```
sudo apt update
```
### Install Node.js & Git on the server
```
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash - &&\ sudo apt-get install -y nodejs

sudo apt install git
```
### Clone project
```
git clone <your_project_link>
cd <project folder>
npm i
```
###  Keep your app always running with the PM2 process manager
```
sudo npm i pm2 -g
cd <project folder>
pm2 start index.js (or <entryfile>.js)
// Set your app to start when even the server is rebooted
pm2 startup ubuntu
```
### Enable ufw firewall
```
ufw status // Status: inactive
ufw enable
ufw allow ssh
ufw allow http
ufw allow https
ufw status
```
### Use Nginx as a reverse proxy
```
sudo apt install nginx
sudo nano /etc/nginx/sites-available/default
```
- Updatethe server_name and location like below & close with Ctrl+X 
```
server_name yourdomain.com www.yourdomain.com;

location / {
    proxy_pass http://localhost:5000; #or your app port

    #Maybe
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
}
```
- Check if the Nginx config file is ok and restart Nginx
```
sudo nginx -t
```
### Domain & SSL Certificate and enable HTTPS





