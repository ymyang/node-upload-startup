/**
 * Created by yang on 2015/7/9.
 */
const TAG = '[UploadCtrl]';


var UploadCtrl = module.exports = {};

/**
 * 上传文件
 * @param req
 * @param res
 */
UploadCtrl.uploadFile = function(req, res) {
    var param = req.body.param ? JSON.parse(req.body.param) : {};
    param.file = req.file;


    res.json(req.file);

    // TODO
};
