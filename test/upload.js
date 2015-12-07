/**
 * Created by yang on 2015/12/7.
 */
var fs = require('fs');
var request = require('request');

describe('test upload', function() {

    it.only('upload', function(done) {
        this.timeout(0);
        var file = 'd:/test.jpg';
        var stream = fs.createReadStream(file);
        var transferSize = 0;
        stream.on('data', function(chunk) {
            transferSize += chunk.length;
            console.log(transferSize);
        });

        var param = {
            fileCategory: 'personal',
            fileSize: fs.statSync(file).size,
            parentId: 2226
        };

        var form = {
            param: JSON.stringify(param),
            file: stream
        };
        request.post({
            url: 'http://192.168.1.120/yang/upload/file',
            formData: form
        }, function(err, res, body) {
            if (!err) {
                console.log(body);
            } else {
                console.error(err);
            }
            done();
        });
    });

});
