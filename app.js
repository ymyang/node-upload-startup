/**
 * Created by yang on 2015/6/5.
 */
var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var multer = require('multer');

var routes = require('./routes/index');
var upload = require('./routes/upload');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({
    dest: './uploads/',
    includeEmptyFields: false,
    putSingleFilesInArray: false,
    inMemory: false,
    limits: {
        fileSize: 10*1024*1024*1024,
        files: 1
    },
    onFileUploadStart: function (file, req, res) {
        console.log(file.originalname + ' is starting ...');
        console.log('[start]:', req.body.param);
        if (req.body.param === undefined) {
            return false;
        }
    },
    onFileUploadData: function (file, data, req, res) {
        console.log(data.length + ' of ' + file.originalname + ' arrived');
    },
    onFileUploadComplete: function (file, req, res) {
        console.log(file.originalname + ' uploaded to  ' + file.path);
        console.log('[complete] file:', file, ', [param]', req.body.param);
    },
    onError: function (err, next) {
        console.error(err);
        next(err);
    }
}));

app.disable('x-powered-by');

app.use('/', routes);
app.use('/upload', upload);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send(err.message);
});


module.exports = app;