There are many ways to convert your files, but these have proven to be the best for me.

First of all you need to install ffmpeg.
In my case I use Linux Ubuntu version 16.04, but the installation is the same for all versions.

First of all it is necessary to add the repository with a command
`` `
sudo add-apt-repository ppa: jonathonf / ffmpeg-4
`` `

After that it is necessary to install ffmpeg
`` `
sudo apt-get update
sudo apt-get install ffmpeg
`` `

To check the ffmpeg version you installed, run the command
`` `
ffmpeg -version
`` `

Once you have successfully installed ffmpeg, the following are a couple of scripts that will surely help you in your further work.

CONVERT MKV TO MP4 FORMAT
To convert from mkv to mp4, type the following command
`` `
ffmpeg -i InputVideoNameHere.mkv -c copy -c: a aac -movflags + faststart OutputVideoNameHere.mp4
`` `

This will convert only one file you select to mp4.
For InputVideoNameHere, enter the original name of the file located on your server.
For OutputVideoNameHere, enter the name you want after converting.

CONVERTING THE ENTIRE DIRECTORY FROM MKV TO MP4 FORMAT (AUTOMATIC SCRIPT)
To convert the selected directory from mkv format to mp4, first use the cd command to navigate to the directory you want to format and where the files are located, then type the following command
`` `
for f in * .mkv; do ffmpeg -i "$ f" -c copy -c: a aac "$ {f% .mkv} .mp4"; done
`` `
The script will convert all files from mkv format to mp4 format and will keep the original file names.

CONVERT AVI TO MP4 FORMAT
To convert from avi to mp4, type the following command
`` `
ffmpeg -i InputVideoNameHere.avi -c: v copy -c: a copy -y OutputVideoNameHere.mp4
`` `
This will convert only one file you select to avi.
For InputVideoNameHere, enter the original name of the file located on your server.
For OutputVideoNameHere, enter the name you want after converting.

CONVERTING AN ENTIRE DIRECTORY FROM AVI TO MP4 FORMAT (AUTOMATIC SCRIPT)
To convert the selected directory from avi format to mp4, first use the cd command to navigate to the directory you want to format and where the files are located, then type the following command
`` `
for i in * .avi; to ffmpeg -i "$ i" "$ {i%. *}. mp4"; done
`` `
The script will convert all files from avi format to mp4 format and will keep the original file names.

EXTRACTION OF TRANSLATIONS FROM MKV FILES
To check if the mkv file contains a subtitle built in, type the following command
`` `
mkvmerge -i input.mkv
`` `
For input.mkv, enter the original name of the file you want to check

After you type the command, the output should look like this:
`` `
File 'Just.Another.Christmas.2020.mkv': container: Matroska
Track ID 0: video (MPEG-4p10 / AVC / H.264)
Track ID 1: audio (AAC)
Track ID 2: subtitles (SubRip / SRT)
`` `

If there is no subtitle on Track ID 2 or Track ID 3 then that mkv file does not have a built-in subtitle in it.
But if there is, as is the case in my example, then we will type the following command to get the subtitle separately separate from the mkv file
`` `
mkvextract tracks input.mkv 3: subtitles.srt
`` `
For input.mkv, enter the original name of the file from which you want to extract the subtitle
For subtitles.srt enter under what name you want the subtitle to be saved (ex. Just.another.christmas.2020.srt)

Pay attention to number 3 in the command, that number indicates the Track ID we want to extract, in my case there is no Track ID 3, but my subtitle is under number 2, so in command number 3 I will change to number 2 and it will look like this

`` `
mkvextract tracks input.mkv 2: subtitles.srt
`` `

If your file has Track ID 3 and has a subtitle on it, you will use a command that contains the number 3 (if the subtitle is on Track ID 5, you will change the number from 3 to 5 and so on.)

ADDING SUBTITLES TO THE MP4 FILE
After extracting the subtitle from the mkv file, and converting the file to mp4 format, now we have to paste the subtitle we extracted back, but into the mp4 file that we previously converted from the mkv format.
Why do we use mp4? Because most internet browsers & devices support this format.

To add a subtitle to a single file, we use the command
`` `
ffmpeg -i input.mp4 -i input.srt -c copy -c: s mov_text output.mp4
`` `
For input.mp4, type the original name of the file you want to paste the subtitle into
For input.srt, type the original name of the subtitle you want to paste into the file
For output.mp4, type a name that will create an mp4 file with a subtitle inserted in it.

ADDING SUBTITLES TO THE ENTIRE DIRECTORY (AUTOMATIC SCRIPT)
If we want an automatic script, which will go in order and paste the subtitle into mp4 files, we can do it as follows.

WARNING: It is important that the original subtitle name has the same name as the movie / series name (example: packman.mp4 & packman.srt).

Navigate to the directory where you want to run this command, with the already known cd command.
Then we will create an output directory where movies with pasted subtitles will be saved, we do that with a command
`` `
mkdir outputs
`` `
Then we run the script with the command
`` `
for f in * .mp4; to ffmpeg -i "$ f" -vf subtitles = "$ {f%. *}. srt" -c: a copy outputs / "$ f"; done
`` `
If all is well, the script will start pasting subtitles.
The output in the console will look like this:
https://prnt.sc/wl23du

I hope I helped you and explained in more detail how you can make a particular movie or series viewable for 99% of users.
If you have any questions, advice, complaints in this way, feel free to leave a comment, I will answer as soon as possible.
