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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.NewsController = void 0;
var openapi = require("@nestjs/swagger");
var common_1 = require("@nestjs/common");
var platform_express_1 = require("@nestjs/platform-express");
var multer_1 = require("multer");
var swagger_1 = require("@nestjs/swagger");
var news_responses_1 = require("./news.responses");
var news_all_1 = require("../views/news/news.all");
var template_1 = require("../views/template");
var news_detailed_1 = require("../views/news/news.detailed");
var fileLoadHelper_1 = require("../utils/fileLoadHelper");
var news_form_1 = require("../views/news/news.form");
var NEWS_PATH = '/static/';
fileLoadHelper_1.FileLoadHelper.path = NEWS_PATH;
var NewsController = /** @class */ (function () {
    function NewsController(newsService, commentsService) {
        this.newsService = newsService;
        this.commentsService = commentsService;
    }
    NewsController.prototype.getAllNews = function () {
        return this.newsService.getAll();
    };
    NewsController.prototype.getAllNewsView = function () {
        var news = this.newsService.getAll();
        var content = "".concat((0, news_all_1.renderNewsList)(news), " ").concat((0, news_form_1.renderNewsForm)());
        return (0, template_1.renderTemplate)(content, {
            title: 'News',
            description: 'News list'
        });
    };
    NewsController.prototype.getNewsViewById = function (id) {
        var news = this.newsService.getById(id);
        var comments = this.commentsService.getById(id);
        return (0, news_detailed_1.renderNewsItemDetailed)(news, comments);
    };
    NewsController.prototype.getNewsById = function (id) {
        var news = this.newsService.getById(id);
        var comments = this.commentsService.getById(id);
        return __assign(__assign({}, news), { comments: comments });
    };
    NewsController.prototype.createNewsItem = function (newsItem, cover) {
        console.log(newsItem);
        if (cover === null || cover === void 0 ? void 0 : cover.filename) {
            newsItem.coverSrc = "".concat(NEWS_PATH).concat(cover.filename);
        }
        console.log(cover);
        return this.newsService.create(newsItem);
    };
    NewsController.prototype.updateNewsItemById = function (id, newsItem) {
        return this.newsService.update(newsItem, id);
    };
    NewsController.prototype.updateNewsItemByQueryParam = function (id, newsItem) {
        return this.newsService.update(newsItem, id);
    };
    NewsController.prototype.updateNewsItem = function (id, newsItem) {
        return this.newsService.update(newsItem, id);
    };
    NewsController.prototype.deleteNewsById = function (id) {
        return this.newsService["delete"](id);
    };
    __decorate([
        openapi.ApiOperation({ description: "" }),
        (0, common_1.Get)(),
        openapi.ApiResponse({ status: 200, type: Object })
    ], NewsController.prototype, "getAllNews");
    __decorate([
        openapi.ApiOperation({ description: "" }),
        (0, common_1.Get)('/all'),
        openapi.ApiResponse({ status: 200, type: String })
    ], NewsController.prototype, "getAllNewsView");
    __decorate([
        openapi.ApiOperation({ description: "" }),
        (0, common_1.Get)(':id/detail'),
        (0, swagger_1.ApiResponse)(news_responses_1.BadRequestResponse),
        openapi.ApiResponse({ status: 200, type: String }),
        __param(0, (0, common_1.Param)('id'))
    ], NewsController.prototype, "getNewsViewById");
    __decorate([
        openapi.ApiOperation({ description: "" }),
        (0, common_1.Get)(':id'),
        (0, swagger_1.ApiResponse)(news_responses_1.BadRequestResponse),
        openapi.ApiResponse({ status: 200 }),
        __param(0, (0, common_1.Param)('id'))
    ], NewsController.prototype, "getNewsById");
    __decorate([
        openapi.ApiOperation({ description: "" }),
        (0, common_1.Post)(),
        (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('cover', {
            storage: (0, multer_1.diskStorage)({
                destination: fileLoadHelper_1.FileLoadHelper.destinationPath,
                filename: fileLoadHelper_1.FileLoadHelper.uniqueFileName
            })
        })),
        openapi.ApiResponse({ status: 201 }),
        __param(0, (0, common_1.Body)()),
        __param(1, (0, common_1.UploadedFile)())
    ], NewsController.prototype, "createNewsItem");
    __decorate([
        openapi.ApiOperation({ description: "" }),
        (0, common_1.Patch)(':id'),
        (0, swagger_1.ApiResponse)(news_responses_1.BadRequestResponse),
        openapi.ApiResponse({ status: 200 }),
        __param(0, (0, common_1.Param)('id')),
        __param(1, (0, common_1.Body)())
    ], NewsController.prototype, "updateNewsItemById");
    __decorate([
        openapi.ApiOperation({ description: "" }),
        (0, common_1.Patch)(),
        (0, swagger_1.ApiResponse)(news_responses_1.BadRequestResponse),
        openapi.ApiResponse({ status: 200 }),
        __param(0, (0, common_1.Query)('id')),
        __param(1, (0, common_1.Body)())
    ], NewsController.prototype, "updateNewsItemByQueryParam");
    __decorate([
        openapi.ApiOperation({ description: "" }),
        (0, common_1.Patch)(),
        (0, swagger_1.ApiResponse)(news_responses_1.BadRequestResponse),
        openapi.ApiResponse({ status: 200 }),
        __param(0, (0, common_1.Param)('id')),
        __param(1, (0, common_1.Body)())
    ], NewsController.prototype, "updateNewsItem");
    __decorate([
        openapi.ApiOperation({ description: "" }),
        (0, common_1.Delete)(':id'),
        (0, swagger_1.ApiResponse)(news_responses_1.BadRequestResponse),
        openapi.ApiResponse({ status: 200, type: Object }),
        __param(0, (0, common_1.Param)('id'))
    ], NewsController.prototype, "deleteNewsById");
    NewsController = __decorate([
        (0, common_1.Controller)('news')
    ], NewsController);
    return NewsController;
}());
exports.NewsController = NewsController;
