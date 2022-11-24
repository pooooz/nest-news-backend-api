"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UpdateNewsDto = exports.CreateNewsDto = void 0;
var openapi = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var swagger_1 = require("@nestjs/swagger");
var CreateNewsDto = /** @class */ (function () {
    function CreateNewsDto() {
    }
    CreateNewsDto._OPENAPI_METADATA_FACTORY = function () {
        return { title: { required: true, type: function () { return String; } }, author: { required: true, type: function () { return String; } }, description: { required: true, type: function () { return String; } }, coverSrc: { required: true, type: function () { return String; } }, views: { required: true, type: function () { return Number; } } };
    };
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsNotEmpty)()
    ], CreateNewsDto.prototype, "title");
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsNotEmpty)()
    ], CreateNewsDto.prototype, "author");
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsNotEmpty)()
    ], CreateNewsDto.prototype, "description");
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsNotEmpty)()
    ], CreateNewsDto.prototype, "coverSrc");
    __decorate([
        (0, class_validator_1.IsNumber)(),
        (0, class_validator_1.IsOptional)(),
        (0, swagger_1.ApiPropertyOptional)()
    ], CreateNewsDto.prototype, "views");
    return CreateNewsDto;
}());
exports.CreateNewsDto = CreateNewsDto;
var UpdateNewsDto = /** @class */ (function () {
    function UpdateNewsDto() {
    }
    UpdateNewsDto._OPENAPI_METADATA_FACTORY = function () {
        return { id: { required: false, type: function () { return String; } }, title: { required: false, type: function () { return String; } }, author: { required: false, type: function () { return String; } }, description: { required: false, type: function () { return String; } }, coverSrc: { required: false, type: function () { return String; } }, views: { required: false, type: function () { return Number; } } };
    };
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsOptional)()
    ], UpdateNewsDto.prototype, "id");
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsOptional)()
    ], UpdateNewsDto.prototype, "title");
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsOptional)()
    ], UpdateNewsDto.prototype, "author");
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsOptional)()
    ], UpdateNewsDto.prototype, "description");
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsOptional)()
    ], UpdateNewsDto.prototype, "coverSrc");
    __decorate([
        (0, class_validator_1.IsNumber)(),
        (0, class_validator_1.IsOptional)()
    ], UpdateNewsDto.prototype, "views");
    return UpdateNewsDto;
}());
exports.UpdateNewsDto = UpdateNewsDto;
