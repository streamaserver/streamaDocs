---
title: Reverse proxies
linktitle: Reverse proxies
description: Using a reverse proxy with Streama
date: 2018-10-06
publishdate: 2018-10-06
lastmod: 2019-17-04
categories: [configuration]
keywords: []
menu:
  docs:
    parent: "config"
    weight: 20
weight: 20
sections_weight: 20
draft: false
aliases: [proxy]
toc: true
---
# Nginx


## On the root of a (sub)domain
1. On the settings page, set the `Base URL` that you will use after configuring nginx.
EG: `http://example.com`

2. Configure nginx:

```nginx
server {
  listen 80;
  listen [::]:80;

  server_name example.com;

  client_max_body_size 128g; # allows larger files (like videos) to be uploaded.

  location / {
      proxy_set_header Host $host;
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header X-Forwarded-Proto $scheme;
      proxy_set_header X-Forwarded-Port $server_port;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

      #WebSocket Support
      proxy_http_version 1.1;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection $http_connection;
      
      proxy_pass http://localhost:8080;
  }
}
```

## On a subdirectory
1. On the settings page, set the `Base URL` that you will use after configuring nginx.
EG: `http://example.com/streama`

2. Set `application.yml`

In the `application.yml` set:

```yaml
environments:
    production:
        grails:
            assets:
                url: http://example.com/streama/assets/
```

3. Configure nginx:

```nginx
server {
  listen 80;
  listen [::]:80;

  server_name example.com;

  client_max_body_size 128g; # allows larger files (like videos) to be uploaded.

  location /streama/ {
      proxy_set_header Host $host;
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header X-Forwarded-Proto $scheme;
      proxy_set_header X-Forwarded-Port $server_port;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

      #WebSocket Support
      proxy_http_version 1.1;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection $http_connection;

      rewrite ^/streama/(.*)$ /$1 break;
      proxy_pass http://localhost:8080;
  }
}
```

## SSL
There are no special settings for using SSL with Streama.
Standard Nginx SSL configurations work. Certbot can be used also.

# Apache2

{{% improve %}}
{{% /improve %}}

`etc/apache2/sites-available/streama.example.net.conf`

```
<VirtualHost *:80>
    #Basic apache vhost configuration
    ServerName streama.example.net
    ServerAdmin webmaster@localhost
    ErrorLog /var/log/apache2/syslog
    LogLevel warn
    CustomLog /var/log/apache2/syslog combined
    ServerSignature on

    #Reverse proxy configuration
    #Change the port (here 8080) to whatever you define in your application.yml
    ProxyPreserveHost On
    ProxyPass / http://127.0.0.1:8080
    ProxyPassReverse / http://127.0.0.1:8080
</VirtualHost>
```

# Caddy
## On the root of a (sub)domain
```conf
example.com {
    proxy / localhost:8080 {
        transparent
        websocket
    }
}
```
> Note that `transparent` is shorthand for:
> ```
>  header_upstream Host {host}
>  header_upstream X-Real-IP {remote}
>  header_upstream X-Forwarded-For {remote}
>  header_upstream X-Forwarded-Port {server_port}
>  header_upstream X-Forwarded-Proto {scheme}
> ```

## On a subdirectory

```conf
example.com {
    proxy /streama localhost:8080 {
        transparent
        websocket
    }
}
```
