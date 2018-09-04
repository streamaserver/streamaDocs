---
title: Settings
description: Settings page
date: 2018-08-23
publishdate: 2018-08-23
lastmod: 2018-08-23
menu:
  docs:
    parent: "config"
    weight: 10
weight: 10
sections_weight: 10
draft: false
toc: true
categories: [configuration]
---
Details of the settings page within the admin section.

# Upload Directory
This setting provides the application with your desired upload-path for all files. 
The default so far has been /data/streama. Remember: if you change this path, copy all the files (that were previously added) into the new directory.
**Always use an absolute path,** relative paths can get created in temp folders, not the directory of the `streama.war`.



# TheMovieDB API key
API stands for Application Programming Interface. Streama uses TheMovieDB for Movie/Episode/Show data metadata.

TheMovieDB's information is accessible only by registering at https://www.themoviedb.org/account/signup and requesting an API-key.
After you have sent a request form, you can see your API-key by going to the API section in your profile's settings in TheMovieDB. 
The API-key is required by this application to fetch metadata for you.

You can use Streama without this, but you will need to add all the metadata yourself.


# TheMovieDB API language
Language support on TMDb is based on the language query parameter you send along with your API key.

For example, you could type es-ES for getting responses in spanish. Be careful with your country, es-ES is not the same as es-MX.
More information at https://en.wikipedia.org/wiki/IETF_language_tag.


# Base URL
The Base-URL is used for the link in the invitation-email.


# Second Directory
These directories are only used for reading previously uploaded files. 
This can be useful if you want to spread your video files over two or more directories, for instance by mounting a second or third drive and rsyncing everything over.

Enter one or more directories, split with |. Example: `/data/streama|/mnt/streama`. 


# Local Video Files
If you already have a directory with your videos, put it here and you will be able to choose them when creating movies or TV shows.


# First Time Login Info
Should the First-Time login info (admin/admin) be shown in the login screen.


# Allow anonymous access
Allow to reproduce videos without login in the application


# Show Version Number
Should the Streama version number be shown in the header of the application.


# Logo
You can upload a custom logo that will be shown in the header and login page.


# Favicon
Upload your custom Favicon here. For most compatibility, use 16x16 .ico file.


# loginBG
Upload your custom login background


# Streama title
Change Name of Application. Shown in the page title.


# User Activity Rotation
Input a number here. Limits the amount of stored User Activity entries in the database to the amount supplied here. 
If none is given, all records will be stored without deletion.


# Let users download Videos
When this value is set to true, the player-interface will get an additional download-button for all users. This will download the raw movie file.


# Hidden Dash sections
You can here add a comma-separated list of all the dash sections you would like to hide. 

Valid values:

```
new-releases
continue-watching
```

Example: `continue-watching,new-releases`.