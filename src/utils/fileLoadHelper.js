"use strict";
exports.__esModule = true;
exports.FileLoadHelper = void 0;
var uuid_1 = require("uuid");
var publicPath = './public';
var path = publicPath;
var FileLoadHelper = /** @class */ (function () {
    function FileLoadHelper() {
    }
    Object.defineProperty(FileLoadHelper, "path", {
        set: function (path) {
            path = publicPath + path;
        },
        enumerable: false,
        configurable: true
    });
    FileLoadHelper.uniqueFileName = function (req, file, callback) {
        var ext = file.originalname.split('.').at(-1);
        callback(null, "".concat((0, uuid_1.v4)(), ".").concat(ext));
    };
    FileLoadHelper.destinationPath = function (req, file, callback) {
        callback(null, path);
    };
    return FileLoadHelper;
}());
exports.FileLoadHelper = FileLoadHelper;
