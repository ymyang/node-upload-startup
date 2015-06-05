/**
 * Created by yang on 2015/6/5.
 */
var express = require('express');
var fs = require('fs');
var router  = express.Router();

router.get('/', function(req,res){ res.redirect('/'); });
router.post('/', function(req, res) {
    console.log("[file]:", JSON.stringify(req.files.file), ', [body]:', req.body.param);
    res.send('[files]:' + req.files.file + ',[body]:' + req.body.param);
});

module.exports = router;