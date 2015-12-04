/**
 * Created by yang on 2015/6/5.
 */
const TAG = '[upload]';
var express = require('express');
var multer = require('multer');
var fs = require('fs');
var path = require('path');
var uuid = require('node-uuid');
var FdfsStorage = require('../utils/FdfsStorage.js');
var UploadCtrl = require('../controller/UploadCtrl.js');


var router = module.exports = express.Router();

var uploaddir = 'd:/temp';

if (!fs.existsSync(uploaddir)) {
    fs.mkdirSync(uploaddir);
}

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, uploaddir);
    },
    filename: function(req, file, cb) {
        var fn = uuid() + path.extname(file.originalname);
        cb(null, fn);
    }
});

//var fdfsStorage = FdfsStorage({
//    trackers: [
//        {
//            "host": "192.168.1.120",
//            "port": 22122
//        }
//    ],
//    timeout: 10000,
//    defaultExt: '',
//    charset: 'utf8'
//});

var upload = multer({
    storage: storage,
    limits: {
        // 文件大小限制10G
        fileSize: 10*1024*1024*1024,
        // 一次只能上传一个文件
        files: 1
    }
});

// 上传文件
router.post('/upload/file', upload.single('file'), UploadCtrl.uploadFile);