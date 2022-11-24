"use strict";
exports.__esModule = true;
exports.renderNewsItem = exports.renderNewsList = void 0;
var renderNewsList = function (news) {
    var newsListHtml = '';
    for (var newsItem in news) {
        newsListHtml += (0, exports.renderNewsItem)(news[newsItem]);
    }
    return "\n    <h1>News</h1>\n    <ul class=\"row\">\n        ".concat(newsListHtml, "\n    </ul>\n    ");
};
exports.renderNewsList = renderNewsList;
var renderNewsItem = function (news) {
    return "\n    <li class=\"col-lg-4 mb-2\">\n        <div class=\"card\">\n              <img src=".concat(news.coverSrc, " class=\"card-img-top\" alt=\"cat\" style=\"height: 200px; object-fit: cover\" />\n              <div class=\"card-body\">\n                  <a href=\"/news/").concat(news.id, "/detail\">\n                    <h5 class=\"card-title\">").concat(news.title, "</h5>\n                  </a>\n                  <h6 class=\"card-subtitle mb-2 text-muted\">").concat(news.author, "</h6>\n                  <p class=\"card-text\">").concat(news.description, "</p>\n              </div>\n        </div>  \n    </li>\n    ");
};
exports.renderNewsItem = renderNewsItem;
