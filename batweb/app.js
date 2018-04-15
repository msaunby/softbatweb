var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// Lines above generated by express app generator.

// My middleware starts.

var fs = require('fs');

const { spawn } = require('child_process');

app.get('/stream.mp3', function (req, res) {
     // NB use Transfer-Encoding 'chunked' when Content-Length is unkown
    res.set({
      'Content-Type': 'audio/mpeg3',
      'Transfer-Encoding': 'chunked'
    });
    // This works for a real file
    //fs.createReadStream('./sample.mp3').pipe(res);
    // So does this
    //cat = spawn('cat', ['sample.mp3']);
    //cat.stdout.on('data', (data)=>{
    //  res.write(data);
    //});

    // Note. Using this technique there is considerable delay in the audio.
    // Playing from Loopback,0,0
    // Send audio to this with a command like
    // aplay -D hw:Loopback,1,0 decoded.wav
    // or
    // ffmpeg -i sample.mp3 -f alsa hw:Loopback,1,0
    ffmpeg = spawn('ffmpeg', ['-f', 'alsa', '-ac', '2', '-i', 'hw:Loopback,0,0', '-codec:a', 'libmp3lame',
     '-qscale:a', '2', '-f', 'mp3', '-']);
    ffmpeg.stdout.on('data', (data)=>{
       res.write(data);
    });
    ffmpeg.on('error', (err)=>{
       console.log("ffmpeg error", err);
    });
  });


// Could use something like
/*
 var ffmpeg = spawn(argv.ffmpeg, [
    '-i', argv.file,
    '-f', 's16le', // PCM 16bits, little-endian
    '-ar', '44100', // Sampling rate
    '-ac', 2, // Stereo
    'pipe:1' // Output on stdout
  ]);
*/
// My middleware ends.

// Lines below generated by express app generator.

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
