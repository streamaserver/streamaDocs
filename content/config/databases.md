---
title: Databases
description: Database setup
date: 2018-08-23
publishdate: 2018-08-23
lastmod: 2018-08-23
menu:
  docs:
    parent: "config"
    weight: 30
weight: 30
sections_weight: 30
draft: false
toc: true
categories: [configuration]
---

# H2 database
By default Streama uses an embedded database. This is created in the same folder that you start streama from and are the files `streama.mv.db` and `streama.trace.db`.

# MySQL
To use MySQL as your data backend you need to install a MySQL compatible database server. Streama recommends and tests against [mariaDB](https://mariadb.org/).
Once your database is installed you need to create the database (ie with: `CREATE DATABASE`). Then configure your [application.yml](/config/application.yml/) to use mysql:

```
environments:
    production:
        dataSource:
            driverClassName:  'com.mysql.jdbc.Driver'
            url: jdbc:mysql://MYSQL_SERVER_IP/MYSQL_DATABASE
            username: MYSQL_USER
            password: MYSQL_PASSWORD
```

# PostgresSQL or Others
Currently PostgresSQL is not supported (see [issue #409](https://github.com/streamaserver/streama/issues/409)) but is planned.

Support for any other database is not planned or tested.