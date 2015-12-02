const TAG = '[route]';
var express = require('express');

var router = module.exports = express.Router();

// log
router.use(function (req, res, next) {
  var params = '';
  var str = req.headers['content-type'] || '';
  var mime = str.split(';')[0];
  if (req.body && mime === 'application/json') {
    params += "[body]: " + JSON.stringify(req.body);
  }

  console.log(TAG, 'uri:', req.url, ",", params);
  next();
});

// routes
router.use(require('./upload.js'));
