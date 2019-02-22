(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["common"],{

/***/ "./src/app/common/news-card.component.html":
/*!*************************************************!*\
  !*** ./src/app/common/news-card.component.html ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<span *ngIf=\"item\" class=\"news\">\n\t<span  class=\"logo\">\n\t\t<img *ngIf=\"item.urlToImage\" [attr.src]=\"item.urlToImage\" (load)=\"imageLoaded.emit()\">\n\t</span>\n\t<span class=\"text\">\n\t\t<span class=\"title\">{{ item.title }}</span>\n\t\t<span class=\"description\">{{ item.description }}</span>\n\t\t<span class=\"footer\">\n\t\t\t<a class=\"url\" [attr.href]=\"item.url\">{{ item.url }}</a>\n\t\t\t<span class=\"author\">{{ item.author }}</span>\n\t\t\t<span class=\"publishedAt\">{{ item.publishedAt }}</span>\n\t\t</span>\n\t</span>\n</span>"

/***/ }),

/***/ "./src/app/common/news-card.component.scss":
/*!*************************************************!*\
  !*** ./src/app/common/news-card.component.scss ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  display: block; }\n  :host .news {\n    padding: 5px;\n    overflow: hidden;\n    display: flex;\n    flex-direction: row; }\n  :host .news .logo {\n      flex: 0 0 25%; }\n  :host .news .logo img {\n        width: auto;\n        height: auto;\n        -o-object-fit: contain;\n           object-fit: contain;\n        max-width: 100%;\n        max-height: 100%; }\n  :host .news .text {\n      display: flex;\n      flex-direction: column;\n      border-left: 1px #aaa solid;\n      padding-left: 0.3rem;\n      margin-left: 0.3rem;\n      flex: 0 0 75%; }\n  :host .news .text .title {\n        font-size: 200%;\n        margin: 0 1rem 0.3rem 0.3rem;\n        white-space: normal; }\n  :host .news .text .description {\n        font-size: 120%;\n        margin: 0.3rem 1rem 0.3rem 0.3rem;\n        white-space: normal; }\n  :host .news .text .footer {\n        display: flex;\n        flex-direction: row;\n        margin: 0.3rem 1rem 0 0.3rem;\n        overflow: hidden;\n        justify-content: space-between;\n        flex-wrap: wrap; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3RyYXZpcy9idWlsZC9EU0ktSFVHL2RlamFqcy1jb21wb25lbnRzL3NyYy9hcHAvY29tbW9uL25ld3MtY2FyZC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNDLGNBQWMsRUFBQTtFQURmO0lBR0UsWUFBWTtJQUNaLGdCQUFnQjtJQUNoQixhQUFhO0lBQ2IsbUJBQW1CLEVBQUE7RUFOckI7TUFRWSxhQUFhLEVBQUE7RUFSekI7UUFVSSxXQUFXO1FBQ1gsWUFBWTtRQUNaLHNCQUFtQjtXQUFuQixtQkFBbUI7UUFDbkIsZUFBZTtRQUNmLGdCQUFnQixFQUFBO0VBZHBCO01Ba0JHLGFBQWE7TUFDYixzQkFBc0I7TUFDdEIsMkJBQTJCO01BQzNCLG9CQUFvQjtNQUNwQixtQkFBbUI7TUFDbkIsYUFBYSxFQUFBO0VBdkJoQjtRQXlCSSxlQUFlO1FBQ2YsNEJBQTRCO1FBQzVCLG1CQUFtQixFQUFBO0VBM0J2QjtRQThCSSxlQUFlO1FBQ2YsaUNBQWlDO1FBQ2pDLG1CQUFtQixFQUFBO0VBaEN2QjtRQW1DSSxhQUFhO1FBQ2IsbUJBQW1CO1FBQ25CLDRCQUE0QjtRQUM1QixnQkFBZ0I7UUFDaEIsOEJBQThCO1FBQzlCLGVBQWUsRUFBQSIsImZpbGUiOiJzcmMvYXBwL2NvbW1vbi9uZXdzLWNhcmQuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyI6aG9zdCB7XG5cdGRpc3BsYXk6IGJsb2NrO1xuXHQubmV3cyB7XG5cdFx0cGFkZGluZzogNXB4O1xuXHRcdG92ZXJmbG93OiBoaWRkZW47XG5cdFx0ZGlzcGxheTogZmxleDtcblx0XHRmbGV4LWRpcmVjdGlvbjogcm93O1xuXHRcdC5sb2dvIHtcbiAgICAgICAgICAgIGZsZXg6IDAgMCAyNSU7XG5cdFx0XHRpbWcge1xuXHRcdFx0XHR3aWR0aDogYXV0bztcblx0XHRcdFx0aGVpZ2h0OiBhdXRvO1xuXHRcdFx0XHRvYmplY3QtZml0OiBjb250YWluO1xuXHRcdFx0XHRtYXgtd2lkdGg6IDEwMCU7XG5cdFx0XHRcdG1heC1oZWlnaHQ6IDEwMCU7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdC50ZXh0IHtcblx0XHRcdGRpc3BsYXk6IGZsZXg7XG5cdFx0XHRmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuXHRcdFx0Ym9yZGVyLWxlZnQ6IDFweCAjYWFhIHNvbGlkO1xuXHRcdFx0cGFkZGluZy1sZWZ0OiAwLjNyZW07XG5cdFx0XHRtYXJnaW4tbGVmdDogMC4zcmVtO1xuXHRcdFx0ZmxleDogMCAwIDc1JTtcblx0XHRcdC50aXRsZSB7XG5cdFx0XHRcdGZvbnQtc2l6ZTogMjAwJTtcblx0XHRcdFx0bWFyZ2luOiAwIDFyZW0gMC4zcmVtIDAuM3JlbTtcblx0XHRcdFx0d2hpdGUtc3BhY2U6IG5vcm1hbDtcblx0XHRcdH1cblx0XHRcdC5kZXNjcmlwdGlvbiB7XG5cdFx0XHRcdGZvbnQtc2l6ZTogMTIwJTtcblx0XHRcdFx0bWFyZ2luOiAwLjNyZW0gMXJlbSAwLjNyZW0gMC4zcmVtO1xuXHRcdFx0XHR3aGl0ZS1zcGFjZTogbm9ybWFsO1xuXHRcdFx0fVxuXHRcdFx0LmZvb3RlciB7XG5cdFx0XHRcdGRpc3BsYXk6IGZsZXg7XG5cdFx0XHRcdGZsZXgtZGlyZWN0aW9uOiByb3c7XG5cdFx0XHRcdG1hcmdpbjogMC4zcmVtIDFyZW0gMCAwLjNyZW07XG5cdFx0XHRcdG92ZXJmbG93OiBoaWRkZW47XG5cdFx0XHRcdGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2Vlbjtcblx0XHRcdFx0ZmxleC13cmFwOiB3cmFwO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxufSJdfQ== */"

/***/ }),

/***/ "./src/app/common/news-card.component.ts":
/*!***********************************************!*\
  !*** ./src/app/common/news-card.component.ts ***!
  \***********************************************/
/*! exports provided: NewsCardComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NewsCardComponent", function() { return NewsCardComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _news_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./news.model */ "./src/app/common/news.model.ts");
/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */



var NewsCardComponent = /** @class */ (function () {
    function NewsCardComponent() {
        this.imageLoaded = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
    }
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _news_model__WEBPACK_IMPORTED_MODULE_2__["News"])
    ], NewsCardComponent.prototype, "item", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], NewsCardComponent.prototype, "imageLoaded", void 0);
    NewsCardComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'news-card',
            template: __webpack_require__(/*! ./news-card.component.html */ "./src/app/common/news-card.component.html"),
            styles: [__webpack_require__(/*! ./news-card.component.scss */ "./src/app/common/news-card.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], NewsCardComponent);
    return NewsCardComponent;
}());



/***/ }),

/***/ "./src/app/common/news-card.module.ts":
/*!********************************************!*\
  !*** ./src/app/common/news-card.module.ts ***!
  \********************************************/
/*! exports provided: NewsCardModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NewsCardModule", function() { return NewsCardModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _news_card_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./news-card.component */ "./src/app/common/news-card.component.ts");
/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */




var NewsCardModule = /** @class */ (function () {
    function NewsCardModule() {
    }
    NewsCardModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [_news_card_component__WEBPACK_IMPORTED_MODULE_3__["NewsCardComponent"]],
            exports: [_news_card_component__WEBPACK_IMPORTED_MODULE_3__["NewsCardComponent"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
            ],
            providers: [],
        })
    ], NewsCardModule);
    return NewsCardModule;
}());



/***/ })

}]);
//# sourceMappingURL=common.js.map