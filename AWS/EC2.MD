## How to Connect to ec2 Instance From SSH Terminal
  - chmod 400 **/path/to/your/key/filename.pem  
  - ssh -i /path/to/your/key/filename.pem ubuntu@ipaddress  


## How to deploy node on EC2
  - Launch EC2 with required Security group & generate Key-pair
  - Connect tO SSH
  - Update Package (optional)
    ```
    sudo apt-get update
    ```
  - Install Node
    ```
    curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
    sudo apt-get install -y nodejs
    ```
  - Include the app via github clone or in Shell
  - Install PM2
    ```
    sudo npm i -g pm2
    pm2 start index.js
    ```
  - Also Install Nginx (reverse-proxy), certificates etc


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
  - Install Git
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
