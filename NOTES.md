Recording using ffmpeg

# 2 channels (stereo) at 192kHz
ffmpeg -f alsa -ac 2 -i hw:0 -ar 192000 audio.wav
ffmpeg -f alsa -ac 2 -i hw:0 -ar 192000 -codec:a libmp3lame -qscale:a 2 -f mp3 -
