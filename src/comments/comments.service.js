"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CommentsService = void 0;
var common_1 = require("@nestjs/common");
var uuid_1 = require("uuid");
var comments_exceptions_1 = require("./comments.exceptions");
var CommentsService = /** @class */ (function () {
    function CommentsService() {
        this.comments = {
            1: [{ id: '1', author: 'Poz', text: 'New comment' }]
        };
    }
    CommentsService.prototype.getById = function (newsId) {
        var attempt = this.comments[newsId];
        if (attempt) {
            return attempt;
        }
        throw new comments_exceptions_1.BadRequestException('badNewsId');
    };
    CommentsService.prototype.create = function (newsId, comment) {
        console.log(comment);
        var attempt = this.comments[newsId];
        if (!attempt) {
            this.comments[newsId] = [];
        }
        var newCommentId = (0, uuid_1.v4)();
        var newComment = __assign({ id: newCommentId }, comment);
        this.comments[newsId].push(newComment);
        return newComment;
    };
    CommentsService.prototype["delete"] = function (newsId, commentId) {
        var attempt = this.comments[newsId];
        if (!attempt)
            throw new comments_exceptions_1.BadRequestException('badNewsId');
        var commentIdx = attempt.findIndex(function (_a) {
            var id = _a.id;
            return id === commentId;
        });
        if (commentIdx < 0)
            throw new comments_exceptions_1.BadRequestException('badCommentId');
        return this.comments[newsId].splice(commentIdx, 1);
    };
    CommentsService.prototype.update = function (newsId, commentId, updateProps) {
        var attempt = this.comments[newsId];
        if (!attempt)
            throw new comments_exceptions_1.BadRequestException('badNewsId');
        var commentIdx = attempt.findIndex(function (_a) {
            var id = _a.id;
            return id === commentId;
        });
        if (commentIdx < 0)
            throw new comments_exceptions_1.BadRequestException('badCommentId');
        var updated = __assign(__assign({}, attempt[commentIdx]), updateProps);
        this.comments[newsId][commentIdx] = updated;
        return updated;
    };
    CommentsService = __decorate([
        (0, common_1.Injectable)()
    ], CommentsService);
    return CommentsService;
}());
exports.CommentsService = CommentsService;
