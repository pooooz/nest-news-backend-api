"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.CommentsController = void 0;
var openapi = require("@nestjs/swagger");
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var comments_responses_1 = require("./comments.responses");
var CommentsController = /** @class */ (function () {
    function CommentsController(commentsService) {
        this.commentsService = commentsService;
    }
    CommentsController.prototype.getCommentsByNewsId = function (newsId) {
        return this.commentsService.getById(newsId);
    };
    CommentsController.prototype.createComment = function (newsId, comment) {
        return this.commentsService.create(newsId, comment);
    };
    CommentsController.prototype.deleteComment = function (newsId, commentId) {
        return this.commentsService["delete"](newsId, commentId);
    };
    CommentsController.prototype.changeComment = function (newsId, commentId, commentItem) {
        return this.commentsService.update(newsId, commentId, commentItem);
    };
    __decorate([
        openapi.ApiOperation({ description: "" }),
        (0, common_1.Get)('/:newsId'),
        (0, swagger_1.ApiResponse)(comments_responses_1.BadRequestResponse),
        openapi.ApiResponse({ status: 200, type: [Object] }),
        __param(0, (0, common_1.Param)('newsId'))
    ], CommentsController.prototype, "getCommentsByNewsId");
    __decorate([
        openapi.ApiOperation({ description: "" }),
        (0, common_1.Post)('/:newsId'),
        openapi.ApiResponse({ status: 201 }),
        __param(0, (0, common_1.Param)('newsId')),
        __param(1, (0, common_1.Body)())
    ], CommentsController.prototype, "createComment");
    __decorate([
        openapi.ApiOperation({ description: "" }),
        (0, common_1.Delete)('/:newsId/:commentId'),
        (0, swagger_1.ApiResponse)(comments_responses_1.BadRequestResponse),
        openapi.ApiResponse({ status: 200, type: [Object] }),
        __param(0, (0, common_1.Param)('newsId')),
        __param(1, (0, common_1.Param)('commentId'))
    ], CommentsController.prototype, "deleteComment");
    __decorate([
        openapi.ApiOperation({ description: "" }),
        (0, common_1.Patch)('/:newsId/:commentId'),
        (0, swagger_1.ApiResponse)(comments_responses_1.BadRequestResponse),
        openapi.ApiResponse({ status: 200 }),
        __param(0, (0, common_1.Param)('newsId')),
        __param(1, (0, common_1.Param)('commentId')),
        __param(2, (0, common_1.Body)())
    ], CommentsController.prototype, "changeComment");
    CommentsController = __decorate([
        (0, common_1.Controller)('comments')
    ], CommentsController);
    return CommentsController;
}());
exports.CommentsController = CommentsController;
