"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.BadRequestResponse = void 0;
var swagger_1 = require("@nestjs/swagger");
var BadRequestError = /** @class */ (function () {
    function BadRequestError() {
    }
    __decorate([
        (0, swagger_1.ApiProperty)({
            description: 'status',
            example: 400
        })
    ], BadRequestError.prototype, "status");
    __decorate([
        (0, swagger_1.ApiProperty)({
            description: 'error',
            example: 'News with passed id not found'
        })
    ], BadRequestError.prototype, "error");
    return BadRequestError;
}());
exports.BadRequestResponse = {
    type: BadRequestError,
    status: 400
};
