---
title: Video Codecs & Conversion
description: Video Codecs & Conversion
date: 2018-08-19
publishdate: 2018-08-19
lastmod: 2018-08-19
menu:
  docs:
    parent: "about"
    weight: 40
weight: 40
sections_weight: 40
draft: false
toc: true
categories: [about]
---

Unfortunately, the application does not convert or transcode your videos for you (this feature is planned).
In order to get the videos working, you might have to convert them yourself. 
For compatible codecs, see [HTML5 Video Browser Support](https://en.wikipedia.org/wiki/HTML5_video#Browser_support)

If your videos won't play, make sure that they are HTML5 compatible. 
We will add video-conversion soon, but right now there is no conversion, so you have to rely on what your browser can handle.
A quick and easy test is to open a new empty browser-tab and drag&drop your video file in. 
If it shows up in a player, then it's a compatible format. If it downloads, it's incompatible.

You can convert you videos with FFMPEG. You can try this as a starting point: 

```
ffmpeg -i input.mkv -vcodec h264 -acodec aac -strict -2 output.mp4
```