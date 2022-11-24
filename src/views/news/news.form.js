"use strict";
exports.__esModule = true;
exports.renderNewsForm = void 0;
var renderNewsForm = function () {
    return "\n  <form action=\"/news\" method=\"post\" enctype=\"multipart/form-data\">\n      <input type=\"file\" name=\"avatar\" />\n      <input type=\"text\" name=\"name\" />\n      <button type=\"submit\">Add news</button>\n  </form>\n  ";
};
exports.renderNewsForm = renderNewsForm;
