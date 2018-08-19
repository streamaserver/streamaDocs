---
title: Install Streama
linktitle: Install Streama
description: Install Streama on Linux, Windows, macOS, FreeBSD, and on any machine with sufficient resources where Java can run.
date: 2016-11-01
publishdate: 2016-11-01
lastmod: 2018-01-02
categories: [getting started,fundamentals]
keywords: [install,pc,windows,linux,macos,binary,tarball]
menu:
  docs:
    parent: "getting-started"
    weight: 30
weight: 30
sections_weight: 30
draft: false
aliases: [/tutorials/installing-on-windows/,/tutorials/installing-on-mac/,/overview/installing/,/getting-started/install,/install/]
toc: true
---

Streama is written in [Java](https://java.com/) with support for multiple platforms. The latest release can be found at [Streama Releases][releases].


# System requirements
Streama requires a minimum of 2gb RAM and a modern multicore processor. Low end or older systems do not preform well or at all, this includes the RaspberryPi and variants which are **not** currently supported.


# Linux
## Ubuntu
Ubuntu is the recommended distribution for Streama.

### Install Java

```bash
sudo apt install openjdk-8-jre
```

### Download Streama

Create or enter the directory streama will be run from (the directory should be owned as the user that will run Streama). `/data/streama` or `/srv/streama` are good options, but any will work.

```bash
wget https://github.com/streamaserver/streama/releases/download/vX.Y/streama-X.Y.war
```

Make the `.war` executable with:

```bash
chmod +x streama-X.Y.war
```

### Run

{{% warn %}}
It is **not** recommended to run streama as root.
{{% /warn %}}

```bash
java -jar streama-X.Y.war
```

You should see the following output after a short time: 

```
Grails application running at http://localhost:8080 in environment: production
```

## Other distributions
Other mainstream distributions are supported and should be very similar to the Ubuntu instructions.

{{% improve %}}
{{% /improve %}}

# Windows
### Install Java

Download and install Java **8** RE from the Oracle website.

http://www.oracle.com/technetwork/java/javase/downloads/index.html


### Download Streama

Download Streama from the [releases page][releases] page into the folder you will be running from.

### Run
Start Command Prompt or Powershell in the directory with the `streama-X.Y.war` you downloaded.

```
java -jar streama-X.Y.war
``` 

You should see the following output after a short time.

```
Grails application running at http://localhost:8080 in environment: production
```
 

# Next Steps

Now that you've installed Streama, have a look at the [first steps][firststeps] page and explore the rest of the documentation. If you have questions, connect with the community via [Discord or GitHub][/help].

[firststeps]: /getting-started/first-steps/
[releases]: https://github.com/streamaserver/streama/releases/