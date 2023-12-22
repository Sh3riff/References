# MYSQL SERVER

## [SETUP](https://medium.com/@michaelobasa2/sql-project-setting-up-and-configuring-a-database-in-digital-ocean-dcdcc95c1c4c)

- ssh root@<my-droplet-ip>
- apt update && apt upgrade -y
- apt install mysql-server -y
- mysql_secure_installation
- Enable Remote Access (READ UP)

## [User MGT](https://matomo.org/faq/how-to-install/faq_23484/)

- CREATE DATABASE matomo_db_name_here;
- CREATE USER 'matomo'@'localhost' IDENTIFIED WITH mysql_native_password BY 'my-strong-password-here';
- CREATE USER 'matomo'@'localhost' IDENTIFIED BY 'my-strong-password-here';
- GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, INDEX, DROP, ALTER, CREATE TEMPORARY TABLES, LOCK TABLES ON matomo_db_name_here.* TO 'matomo'@'localhost';

## Backup & Restore
