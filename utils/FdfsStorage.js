/**
 * Created by yang on 2015/12/3.
 */
const TAG = '[fdfs]';
var fs = require('fs');
var path = require('path');
var stream = require('stream');
var FdfsClient = require('fdfs');

module.exports = function (opts) {
    return new FdfsStorage(opts)
};

function FdfsStorage (opts) {
    this.fdfs = new FdfsClient(opts);
}

FdfsStorage.prototype._handleFile = function(req, file, cb) {
    console.log(TAG, '_handleFile:', file);
    var ext = path.extname(file.originalname);
    if (ext) {
        ext = ext.substring(1);
    }
    var options = {
        size: req.query.fs,
        ext: ext

    };
    console.log(TAG, 'options:', options);

    //var finalPath = 'd:/upload.jpg';
    //var outStream = fs.createWriteStream(finalPath);
    //file.stream.pipe(outStream);
    //outStream.on('error', cb);
    //outStream.on('finish', function () {
    //    cb(null, {
    //        path: finalPath,
    //        size: outStream.bytesWritten
    //    })
    //});
    //return;

    //var readStream = new stream.Readable;
    //readStream._read = function(){
    //};
    //
    //var size = 0;
    //
    //file.stream.on('end', function() {
    //    console.log(TAG, 'end:', size);
    //    readStream.push(null);
    //});
    //
    //file.stream.on('data', function(data) {
    //    console.log(TAG, 'data');
    //    readStream.push(data);
    //    size += data.length;
    //});


    var _self = this;
    _self.fdfs.upload(file.stream, options, function (err, fileId) {
        if (err) {
            cb(err);
            return;
        }
        cb(null, {
            filename: fileId
        });
    });
};

FdfsStorage.prototype._removeFile = function(req, file, cb) {
    logger.debug(TAG, '_removeFile:', file);
    this.fdfs.del(file.filename, cb);
};
