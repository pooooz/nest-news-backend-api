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
exports.NewsService = void 0;
var common_1 = require("@nestjs/common");
var uuid_1 = require("uuid");
var news_exception_1 = require("./news.exception");
var NewsService = /** @class */ (function () {
    function NewsService() {
        this.news = {
            1: {
                id: '1',
                title: 'Initial',
                author: 'Poz',
                description: 'Initial new',
                coverSrc: 'https://i.pinimg.com/736x/f4/d2/96/f4d2961b652880be432fb9580891ed62.jpg',
                views: 48
            }
        };
    }
    NewsService.prototype.getAll = function () {
        return this.news;
    };
    NewsService.prototype.getById = function (newsId) {
        var attempt = this.news[newsId];
        if (!attempt)
            throw new news_exception_1.BadRequestException('badId');
        return attempt;
    };
    NewsService.prototype.create = function (newsItem) {
        var newsId = (0, uuid_1.v4)();
        var dataItem = __assign(__assign({}, newsItem), { id: newsId });
        this.news[newsId] = dataItem;
        return dataItem;
    };
    NewsService.prototype.update = function (updateProps, updateId) {
        var _this = this;
        if (!updateId && Object.keys(updateProps).indexOf('id') < 0)
            throw new news_exception_1.BadRequestException('noId');
        var updateUtil = function (idToUpdate) {
            var attempt = _this.news[idToUpdate];
            if (attempt) {
                var updated = __assign(__assign({}, attempt), updateProps);
                _this.news[idToUpdate] = updated;
                return updated;
            }
            throw new news_exception_1.BadRequestException('badId');
        };
        if (updateId)
            return updateUtil(updateId);
        if (updateProps.id)
            return updateUtil(updateProps.id);
    };
    NewsService.prototype["delete"] = function (deleteId) {
        var attempt = this.news[deleteId];
        if (!attempt)
            throw new news_exception_1.BadRequestException('badId');
        delete this.news[deleteId];
        return attempt;
    };
    NewsService = __decorate([
        (0, common_1.Injectable)()
    ], NewsService);
    return NewsService;
}());
exports.NewsService = NewsService;
