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

You can convert your videos with FFMPEG. You can try this as a starting point: 

```
ffmpeg -i input.mkv -vcodec h264 -acodec aac -strict -2 output.mp4
```

If you're lucky and your files are already encoded in x264, you might be fine with changing the audio codec and container while keeping the video stream. This would be preferable to the above because encoding audio is much cheaper cpu-wise, typically tenfolds faster and even doable on a laptop:

```
ffmpeg -i input.mkv -vcodec copy -acodec aac -strict 2 output.mp4
```

Convert recursively mkv and avi with no spaces and remove original file.

```
#! /bin/bash
while IFS= read -r -d '' file
do
  ffmpeg -nostdin -i "$file" -vcodec h264 -acodec aac -strict -2 "${file%.*}.mp4"
  rm -f "$file"
done <   <(find mydir -name '*.mkv' -print0 -o -name '*.avi' -print0)
```


To make better use of multicore machines, GNU parallel can be used to distribute the conversion job across the available cpus:
```
#! /bin/bash
find -iname "*.mkv" -o -iname "*.avi" | parallel 'ffmpeg -i {} -vcodec h264 -acodec aac -strict -2 {.}.mp4'
```
