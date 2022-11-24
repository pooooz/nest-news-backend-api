"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UpdateCommentDto = exports.CreateCommentDto = void 0;
var openapi = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var swagger_1 = require("@nestjs/swagger");
var CreateCommentDto = /** @class */ (function () {
    function CreateCommentDto() {
    }
    CreateCommentDto._OPENAPI_METADATA_FACTORY = function () {
        return { author: { required: true, type: function () { return String; } }, text: { required: true, type: function () { return String; } } };
    };
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, swagger_1.ApiProperty)()
    ], CreateCommentDto.prototype, "author");
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, swagger_1.ApiProperty)({
            example: 'My comment'
        })
    ], CreateCommentDto.prototype, "text");
    return CreateCommentDto;
}());
exports.CreateCommentDto = CreateCommentDto;
var UpdateCommentDto = /** @class */ (function () {
    function UpdateCommentDto() {
    }
    UpdateCommentDto._OPENAPI_METADATA_FACTORY = function () {
        return { author: { required: false, type: function () { return String; } }, text: { required: false, type: function () { return String; } } };
    };
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsOptional)()
    ], UpdateCommentDto.prototype, "author");
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsOptional)()
    ], UpdateCommentDto.prototype, "text");
    return UpdateCommentDto;
}());
exports.UpdateCommentDto = UpdateCommentDto;
