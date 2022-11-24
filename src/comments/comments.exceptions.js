"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.BadRequestException = void 0;
var common_1 = require("@nestjs/common");
var errorMessages = new Map([
    ['badNewsId', 'News with passed ID not found'],
    ['badCommentId', 'Comment with passed ID not found'],
]);
var BadRequestException = /** @class */ (function (_super) {
    __extends(BadRequestException, _super);
    function BadRequestException(reason) {
        return _super.call(this, {
            status: common_1.HttpStatus.BAD_REQUEST,
            error: errorMessages.get(reason)
        }, common_1.HttpStatus.BAD_REQUEST) || this;
    }
    return BadRequestException;
}(common_1.HttpException));
exports.BadRequestException = BadRequestException;
