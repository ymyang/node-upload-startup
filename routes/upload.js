/**
 * Created by yang on 2015/6/5.
 */
const TAG = '[upload]';
var express = require('express');
var multer = require('multer');
var fs = require('fs');
var path = require('path');
var uuid = require('node-uuid');
var FdfsClient = require('fdfs');
var FdfsStorage = require('../utils/FdfsStorage.js');
var UploadCtrl = require('../controller/UploadCtrl.js');


var router = module.exports = express.Router();

//var uploaddir = 'd:/temp';
//
//if (!fs.existsSync(uploaddir)) {
//    fs.mkdirSync(uploaddir);
//}
//
//var storage = multer.diskStorage({
//    destination: function(req, file, cb) {
//        cb(null, uploaddir);
//    },
//    filename: function(req, file, cb) {
//        var fn = uuid() + path.extname(file.originalname);
//        cb(null, fn);
//    }
//});

var fdfs = new FdfsClient({
    trackers: [
        {
            "host": "192.168.1.120",
            "port": 22122
        }
    ],
    timeout: 10000,
    defaultExt: '',
    charset: 'utf8'
});

var fdfsStorage = FdfsStorage(fdfs);

var upload = multer({
    storage: fdfsStorage,
    limits: {
        // �ļ���С����10G
        fileSize: 10*1024*1024*1024,
        // һ��ֻ���ϴ�һ���ļ�
        files: 1
    }
});

// �ϴ��ļ�
router.post('/upload/file', upload.single('file'), UploadCtrl.uploadFile);