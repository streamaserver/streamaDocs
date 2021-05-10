---
title: Install Streama
linktitle: Install Streama
description: Install Streama on Linux, Windows, macOS, FreeBSD, and on any machine with sufficient resources where Java can run.
date: 2018-10-06
publishdate: 2018-10-06
lastmod: 2018-10-06
categories: [getting started,fundamentals]
keywords: [install,pc,windows,linux,macos,binary,tarball]
menu:
  docs:
    parent: "getting-started"
    weight: 10
weight: 10
sections_weight: 10
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

Java 8 is the recommended, Streama may not work with Java 7 or 10.

```bash
sudo apt install openjdk-8-jre
```

### Download Streama

Create or enter the directory streama will be run from (the directory should be owned as the user that will run Streama). `/data/streama` or `/srv/streama` are good options, but any will work.

Download the *jar* from the [GitHub releases page][releases]. You can use the example below to download.

```bash
wget https://github.com/streamaserver/streama/releases/download/vEXAMPLE/streama-EXAMPLE.jar
```

Make the `.jar` executable with (replace the filename with the one you downloaded):

```bash
chmod +x streama-X.Y.jar
```

### Run

{{% warn %}}
It is **not** recommended to run streama as root.
{{% /warn %}}

```bash
java -jar streama-X.Y.jar
```

You should see the following output after a short time: 

```
Grails application running at http://localhost:8080 in environment: production
```

## Other distributions
Other mainstream distributions are supported and should be very similar to the Ubuntu instructions.

{{% improve %}}
{{% /improve %}}

# FreeNAS

FreeNAS supports virtual machines, so a Linux virtual machine may be created to run streama, in which case the Linux instructions should be used.
However, it may be preferable to run streama within a jail.
The following describes how to install streama within a FreeNAS 11 jail.

## Create and setup a jail

Create a new jail with network access.
Enable DHCP Autoconfigure and Ip4 and VNET.

Enter the jail via ssh and install wget and openjdk8.

```
pkg install wget openjdk8
```

Then create a new user, e.g. streama, with the adduser tool.
Using shell tcsh is recommended.
See: https://www.freebsd.org/doc/handbook/users-synopsis.html

```
adduser
```

## Download Streama

Now change to the new user, in this case streama, download a recent version of streama and give the file execute permissions.

```
su streama
cd ~
wget --no-check-certificate https://github.com/streamaserver/streama/releases/download/v1.6.7/streama-1.6.7.jar
chmod +x streama-1.6.7.jar
```

## Mount existing media to the jail

Now, we must give our jail read (write optional) access to videos on the NAS.
To do this, stop the jail and, through the GUI, add a mount point.
e.g. mount a directory from /mnt/pool/user/movies to /usr/home/streama/movies.

Note: depending on the destination chosen, you may need to give the jail user, e.g. streama, read permissions.
Use 'ls -ld directory' to check permissions of directory.

## Run Streama (not recommended)

At this stage, we may simply run the java with the commands:

```
su streama
cd ~
java -jar streama-1.6.7.jar
```

## Run Streama as a service

It may be beneficial to instead run streama as a service.
If you are currently user streama, simply use the command:

```
exit
```

to go back to root.
To create a service, we create and go to the directory:

```
mkdir /usr/local/etc/rc.d
cd /usr/local/etc/rc.d
```

Using the easy editor, create the text file:

```
ee streama_server
```

and enter the following text (if you created a user different than streama please, replace 'streama' with your user name in the line that starts with rc_flags= as well as in the lines that point to the /usr/home/streama directory):

```
#!/bin/sh

# PROVIDE: streama_server


. /etc/rc.subr

name=streama_server
rcvar=streama_server_enable
pidfile_child="/var/run/${name}.pid"
pidfile="/var/run/${name}_daemon.pid"
logfile="/var/log/${name}.log"
streama_server_chdir="/usr/home/streama"

command="/usr/sbin/daemon"
start_precmd="${name}_prestart"

daemon="java"

load_rc_config $name
: ${streama_server_enable:=no}

streama_server_prestart() {

    # set the daemon / java flags
    rc_flags="-u 'streama' -r -P ${pidfile} -p ${pidfile_child}  /usr/local/bin/java -jar /usr/home/streama/streama-1.6.7.jar >> /usr/home/streama/streama_server.log 2>&1 ${rc_flags}"

    touch $pidfile
}

streama_server_describe() {
    echo "Service for running streama."
}


run_rc_command "$1"
```

press esc+enter for the prompt to save and exit the easy editor.
Make the file streama_server executable:

```
chmod +x streama_server
```

Now we must edit the rc.conf file with the easy editor

```
ee /etc/rc.conf
```

then add to the bottom of the file

```
streama_server_enable="YES"
```

now exit the shell and restart the jail from the GUI.

To verify that streama_server is running, re enter the jail and use the command

```
service -e
```

and look for /usr/local/etc/rc.d/streama_server

# Windows
### Install Java

Download and install Java **8** RE from the Oracle website.

http://www.oracle.com/technetwork/java/javase/downloads/index.html


### Download Streama

Download Streama from the [releases page][releases] page into the folder you will be running from.

### Run
Start Command Prompt or Powershell in the directory with the `streama-X.Y.jar` you downloaded.

```
java -jar streama-X.Y.jar
``` 

You should see the following output after a short time.

```
Grails application running at http://localhost:8080 in environment: production
```
 

# Next Steps

Now that you've installed Streama, have a look at the [first steps][firststeps] page and explore the rest of the documentation. If you have questions, connect with the community via [Discord or GitHub][help].

[firststeps]: /getting-started/first-steps/
[releases]: https://github.com/streamaserver/streama/releases/
[help]: /help
