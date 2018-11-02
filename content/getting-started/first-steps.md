---
title: First Steps
linktitle: First Steps
description: First steps after installing Streama
date: 2018-10-06
publishdate: 2018-10-06
lastmod: 2018-10-06
categories: [getting started,fundamentals]
keywords: []
menu:
  docs:
    parent: "getting-started"
    weight: 20
weight: 20
sections_weight: 20
draft: false
aliases: []
toc: true
---


# Add an upload directory:

This is the directory that Streama stores all uploaded files in. It is required to be set.
Create a folder that the application can access and add the **full path** into the settings page.

{{% warn %}}
Using a relative path will not work.
{{% /warn %}}  


# Optional but recommended:
The below steps are optional but recommended to use Streama properly.


## Add a themoviedb API key

To automatically get metadata you need to add a API key for themoviedb. 
Create an account and request and API key, once you have an API key you can add it in the settings page.

https://www.themoviedb.org/documentation/api


## Import your current media

If you already have a media library accessible from the system Streama is running on, you can add the folder as a "Local Directory" in the settings.
You can then select files from this folder or bulk-add them.


# Optional:
The below steps are completely optional and depend on your use of Streama.

## Reverse proxy for running on port 80 or with HTTPS
If you want to run on port 80 or with HTTPS see [Reverse proxies](/config/proxy).

