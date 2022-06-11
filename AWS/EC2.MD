## How to Connect to ec2 Instance From SSH Terminal
  - chmod 400 **/path/to/your/key/filename.pem  
  - ssh -i /path/to/your/key/filename.pem ubuntu@ipaddress  


## How to deploy node on EC2 (Amazon Linux & Ubuntu)
  - Launch EC2 with required Security group & generate Key-pair
  - Connect tO SSH
  - Update Package (optional)
    ```
    sudo apt-get update
    ```
  - Install Node (Amazon Linux)
    ```
    sudo yum install -y gcc-c++ make
    curl -sL https://rpm.nodesource.com/setup_16.x | sudo -E bash -
    sudo yum install -y nodejs
    ```
    
  - Install Node  (Ubuntu)
    ```
    curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash -
    sudo apt-get install -y nodejs
    ```
  - Include the app via github clone or in Shell
  - Install PM2
    ```
    sudo npm i -g pm2
    pm2 start index.js
    ```
  - Or use Systemd service services
    ```sh
    sudo vim /etc/systemd/system/NodeServer.service
    ```
    ```
    [Unit]
    Description=My Node Server
    After=multi-user.target

    [Service]
    ExecStart=/usr/bin/node /home/ec2-user/lotr/server.js
    Restart=always
    RestartSec=10
    StandardOutput=syslog
    StandardError=syslog
    SyslogIdentifier=my-node-server
    User=ec2-user
    EnvironmentFile=/home/ec2-user/lotr/app.env

    [Install]
    WantedBy=multi-user.target
    ```
    ```sh
    sudo systemctl enable NodeServer.service
    sudo systemctl start NodeServer.service
    ```
    ```sh
    sudo systemctl status NodeServer.service
    ```
  - Installing Nginx  
    ```
    sudo amazon-linux-extras install nginx1 -y
    sudo systemctl enable nginx
    sudo systemctl start nginx
    ```
    ```
    sudo vim /etc/nginx/nginx.conf
    ```
    ```
    server {
      listen         80;
      listen         [::]:80;
      server_name    _;
      location / {
        proxy_pass http://localhost:8080;
      }
    }
    ```
  - Also certificates & any other thing etc


## Create App In Shell
  - Create folder & initiate app.
    ```
    mkdir Sample-App
    cd Sample-App
    npm init -y
    npm i express
    touch index.js
    ```
  - Open entry file with vim
    ```
    vim index.js
    ```
  - Paste the sample code
    ```
    const express = require('express');
    const app = express();
    const PORT = process.env.PORT || 3000;
    app.get('/',(req, res) => res.send('Hello World'));
    app.listen(PORT, () => console.log(`Server listening in port ${PORT}`))
    ```


## Clone app from Github
  - Install Git (Amazon Linux)
    ```
    sudo yum install -y git
    ```
  - Install Git (Ubuntu)  
    ```
    sudo apt-get install git
    ```
   - Clone & Start App  
     ```  
      git clone https://github.com/sh3riff/Sample-App.git   
      cd Sample-App    
      npm i     
      node index.js  
     ```
