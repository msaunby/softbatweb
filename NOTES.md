## Upgrade nodejs
This code might need a more recent version of Nodejs than the default on your system.

For Ubuntu I did the following-
$ sudo apt-get install npm
$ sudo npm cache clean -f
$ sudo npm install -g n
$ sudo n stable

On 15th April 2018 this gave me v9.10.1

## Recording using ffmpeg

For 2 channels (stereo) at 192kHz
$ ffmpeg -f alsa -ac 2 -i hw:0 -ar 192000 audio.wav
$ ffmpeg -f alsa -ac 2 -i hw:0 -ar 192000 -codec:a libmp3lame -qscale:a 2 -f mp3 -

Maybe use something more like
var ffmpeg = spawn(argv.ffmpeg, [
    '-i', argv.file,
    '-f', 's16le', // PCM 16bits, little-endian
    '-ar', '44100', // Sampling rate
    '-ac', 2, // Stereo
    'pipe:1' // Output on stdout
  ]);
