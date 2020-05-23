---
title: Docker Compose (v3)
description: Setting up streama using Docker Compose v3
publishdate: 2020-05-23
lastmod: 2020-05-23
menu:
  docs:
    parent: "config"
    weight: 30
weight: 40
sections_weight: 40
draft: false
toc: true
categories: [configuration]
---

# Background
Some people (me included) use the full advantages of docker, without using a ready-made streama-only docker file. Instead, we use docker (or rather, docker-compose) to line up all the required components for the running system, and let them communicate with each other, as well as mount the relevant files and folders as volumes so that they are persisted.   
  
In this section, I will give you a pretty solid Docker-Compose file and some instructions for getting it running with streama. 

# The folder structure
As usual, I like to start with `/data/streama`. In there, I have the following files: 

```
/data/streama

-rw-r--r--  docker-compose.yml
-rw-r--r--  application.yml
-rwxr--r--  streama-1.x.x.jar
lrwxrwxrwx  streama.jar -> streama-1.x.x.jar
```

Lets go over every file, one by one: 


## docker-compose.yml
Below you will find the full configuration for the docker-compose setup, including nginx, letsencrypt, mysql and smtp.
Note how a lot of volumes are configured, both as files and folders. this is important to ensure that your dockerized data is actually persisted on your main VM. 

For configuring the upload dirs, check the volumes `/app/uploads` and `/app/local-files` below. 
```
docker-compose.yml

version: '3'
services:

  nginx-proxy:
    image: jwilder/nginx-proxy
    restart: always
    ports:
    - "80:80"
    - "443:443"
    volumes:
    - ./volumes/nginx/conf.d:/etc/nginx/conf.d
    - ./volumes/nginx/html:/usr/share/nginx/html
    - ./volumes/nginx/htpasswd:/etc/nginx/htpasswd
    - ./volumes/nginx/dhparam:/etc/nginx/dhparam
    - ./volumes/nginx/vhost:/etc/nginx/vhost.d
    - ./volumes/nginx/certs:/etc/nginx/certs:ro
    - /var/run/docker.sock:/tmp/docker.sock:ro
    labels:
    - "com.github.jrcs.letsencrypt_nginx_proxy_companion.nginx_proxy"

  letsencrypt:
    image: jrcs/letsencrypt-nginx-proxy-companion
    depends_on:
    - "nginx-proxy"
    volumes:
    - ./volumes/nginx/conf.d:/etc/nginx/conf.d
    - ./volumes/nginx/vhost:/etc/nginx/vhost.d
    - ./volumes/nginx/html:/usr/share/nginx/html
    - ./volumes/nginx/certs:/etc/nginx/certs:rw
    - /var/run/docker.sock:/var/run/docker.sock:ro

  streama:
    image: anapsix/alpine-java:8
    volumes:
    - ./streama.jar:/app/app.jar
    - ./application.yml:/app/application.yml
    - ./volumes/streama/uploads:/app/uploads
    - ./volumes/streama/local-files:/app/local-files
    working_dir: /app
    command: java -jar app.jar
    ports:
    - "127.0.0.1:8080:8080"
    depends_on:
    - db
    environment:
    - VIRTUAL_HOST=streama.your-host.net
    - VIRTUAL_PORT=8080
    - LETSENCRYPT_HOST=streama.your-host.net
    - LETSENCRYPT_EMAIL=you@gmail.com

  db:
    image: mariadb:10
    volumes:
    - ./volumes/db:/var/lib/mysql
    restart: always
    command: --max_allowed_packet=256M --innodb_log_buffer_size=32M --innodb_buffer_pool_size=128M
    environment:
    - MYSQL_ROOT_PASSWORD=INSERT_SEC_PASSWORD
    - MYSQL_DATABASE=streama
    - MYSQL_USER=streama
    - MYSQL_PASSWORD=INSERT_ANOTHER_SEC_PASSWORD
    ports:
      - 127.0.0.1:3306:3306

  mail:
    image: bytemark/smtp
    restart: always
```


## application.yml
This file holds the custom database configuration, as well as potential regex adjustments & mail-server adjustments. This is important to add here, because the docker-compose networking strategy will automatically add DNS entries for each docker-container, named after the respective config block. So in order for streama to speak with the mysql-database, you gotta use the docker-compose name ("db" in my example) instead of localhost. Same for mail. 
```
## application.yml


environments:
    production:
        dataSource:
            driverClassName: 'com.mysql.jdbc.Driver'
            url: "jdbc:mysql://db/streama"
            username: streama
            password: 'ANOTHER_SEC_PASSWORD'
        server:
            port: 8080
streama:
  uploadtypes: ['video/h264', 'video/mp4', 'video/mpeg', 'video/quicktime', 'video/webm', 'video/x-ms-wm', 'video/x-ms-wmv',
              'video/x-msvideo', 'image/bmp', 'image/gif', 'image/jpeg', 'image/pjpeg', 'image/png', 'image/svg+xml',
              'image/x-icon', 'image/x-png', 'application/x-subrip', 'text/plain', 'text/vtt', 'text/plain', 'application/octet-stream']
grails:
   mail:
     host: mail
```



