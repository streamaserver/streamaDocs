---
title: Reverse proxies
linktitle: Reverse proxies
description: Using a reverse proxy with Streama
date: 2019-21-06
publishdate: 2018-10-06
lastmod: 2019-21-06
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

> If you **DON'T** have **SSL** enabled:

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

> If you **DO** have **SSL** enabled:

`etc/apache2/sites-available/streama.example.net.SSL.conf`

```
# First of all, we want all traffic coming from the unsecure end going into the secure one, namely, a simple HTTP -> HTTPS redirection
# If you don't want to redirect all traffic to the secure website (I don't understand why, having a secure one, but just in case),
# simply remove or comment this entire block.
<VirtualHost *:80>
	ServerAdmin name@mail.com		# Change this to your own email
	ServerName my_streama.com 		# Change this to your own hostname

	RewriteEngine On
	RewriteCond %{HTTPS} off
	RewriteRule (.*) https://%{SERVER_NAME}$1 [R,L]
</VirtualHost>

#Then, we configure our SSL-secured website:
<VirtualHost *:443>
	SSLProxyEngine on
	ProxyPreserveHost On
	ProxyRequests Off

	ServerAdmin name@mail.com		# Change this to your own email
	ServerName my_streama.com 		# Change this to your own hostname

	#Logs for errors, access and SSL requests. Comment what you don't want.
	#Access logs
	LogFormat "%h %l %u %t \"%r\" %>s %b \"%{Referer}i\" \"%{User-Agent}i\""
	LogLevel warn
	TransferLog "logs/access.log"
	#Error logs
	ErrorLog "logs/error.log"
	#SSL logs
	CustomLog "logs/ssl_request.log" "%t %h %{SSL_PROTOCOL}x %{SSL_CIPHER}x \"%r\" %b"

	#The SSL part
	SSLEngine on
	SSLCertificateFile "conf/ssl/my_streama.crt"		# Change this to the path of your own cert.
	SSLCertificateKeyFile "conf/ssl/my_streama.key"		# Change this to the path of your own cert.

	#The actual redirection of the traffic
	ProxyPass / https://localhost:8080/					# If you have streama running on another port than 8080, change it here.
	ProxyPassReverse / https://localhost:8080/			# If you have streama running on another port than 8080, change it here.
</VirtualHost>
```


# Caddy
[Caddy](https://caddyserver.com/) is a lesser-known webserver from Light Code Labs.

## Instructions

* On the settings page, set the `Base URL` that you will use after configuring Caddy.
EG: `http://plexbad.com`

* Configure from the snippets below as needed.

## On the root of a (sub)domain

```conf
plexbad.com {
    proxy / localhost:8080 {
        transparent
        websocket
    }
}
```
> Note that `transparent` is shorthand for:
```
>  header_upstream Host {host}
>  header_upstream X-Real-IP {remote}
>  header_upstream X-Forwarded-For {remote}
>  header_upstream X-Forwarded-Port {server_port}
>  header_upstream X-Forwarded-Proto {scheme}
```

## On a subdirectory
```
plexbad.com {
    proxy /streama localhost:8080 {
        transparent
        websocket
    }
}
```
> Note that some of the humor is obviously made in jest, don't take us to court, Plex Inc
