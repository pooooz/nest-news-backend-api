"use strict";
exports.__esModule = true;
exports.renderTemplate = void 0;
var renderTemplate = function (content, seo) {
    return "\n    <!doctype html>\n    <html lang=\"en\">\n      <head>\n        <meta charset=\"utf-8\">\n        <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n        <link href=\"https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css\" rel=\"stylesheet\" integrity=\"sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi\" crossorigin=\"anonymous\">\n        <title>".concat(seo.title, "</title>\n        ").concat(seo.description
        ? "<meta name=\"description\" content=".concat(seo.description, "/> ")
        : '', "\n      </head>\n      <body>\n        ").concat(content, "\n        <script src=\"https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js\" integrity=\"sha384-OERcA2EqjJCMA+/3y+gxIOqMEjwtxJY7qPCqsdltbNJuaOe923+mo//f6V8Qbsw3\" crossorigin=\"anonymous\"></script>\n      </body>\n    </html>\n    ");
};
exports.renderTemplate = renderTemplate;
