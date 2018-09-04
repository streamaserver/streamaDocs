---
title: FAQ
description: Frequently asked questions
date: 2018-08-18
publishdate: 2018-08-18
lastmod: 2018-08-18
menu:
  docs:
    parent: "about"
    weight: 30
weight: 30
sections_weight: 30
draft: false
toc: true
categories: [about]
---

# Where is data stored?
By default, the data is stored in an embedded, persistent database called H2. This database persists the data into a file adjacent to the .war file that was executed.  
If you prefer a mysql setup, see [MySQL Setup](/config/databases/)

# How do I hook in my existing file system, so that I don't need to re-upload each Video file? 
You can now use the "Local Video Files" Directory in the settings page! Just point it to the root directory of your media collection and you will have a nifty file-browser showing a manage-files popup for each episode/movie

# Video encoding and auto-conversion
Auto-Conversion is still something that I want to see for streama, but there is so much to consider when it comes to self-hosted instances, such as CPU-power for conversion, local dependencies such as ffmpeg, potentially using nodejs as the crawler/worker ... I am still planning this and trying to figure out a way to make it as comfortable to host as possible, but for now it is still up to you to convert videos into html5.  

# 

# 