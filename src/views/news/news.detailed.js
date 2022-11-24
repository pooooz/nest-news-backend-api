"use strict";
exports.__esModule = true;
exports.renderComment = exports.renderCommentsList = exports.renderNewsItemDetailed = void 0;
var renderNewsItemDetailed = function (news, comments) {
    return "\n    <div class=\"p-4 p-md-5 mb-4 rounded text-bg-dark\">\n        <img src=".concat(news.coverSrc, " class=\"card-img-top\" alt=\"cat\" style=\"height: 200px; object-fit: cover\" />\n        <h1 class=\"display-1 fst-italic\">").concat(news.title, "</h1>\n        <h4 class=\"card-subtitle mb-2 text-muted\">Author: ").concat(news.author, "</h4>\n        <h5 class=\"lead my-3\">Description: ").concat(news.description, "</h5>\n    </div>\n    <div>\n        ").concat((0, exports.renderCommentsList)(comments), "\n    </div>\n    ");
};
exports.renderNewsItemDetailed = renderNewsItemDetailed;
var renderCommentsList = function (comments) {
    var commentsListHtml = '';
    for (var commentItem in comments) {
        commentsListHtml += (0, exports.renderComment)(comments[commentItem]);
    }
    return "\n    <p>Comments:</p>\n    <ol class=\"list-group list-group-numbered\">\n        ".concat(commentsListHtml, "\n    </ol>\n    ");
};
exports.renderCommentsList = renderCommentsList;
var renderComment = function (comment) {
    return "\n    <li class=\"list-group-item d-flex justify-content-between align-items-start mb-2\">\n        <div class=\"ms-2 me-auto\">\n            <div class=\"fw-bold bold\">".concat(comment.author, "</div>\n            ").concat(comment.text, "\n        </div>  \n    </li>\n    ");
};
exports.renderComment = renderComment;
