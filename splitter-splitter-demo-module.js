(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["splitter-splitter-demo-module"],{

/***/ "./src/app/splitter/splitter-demo.html":
/*!*********************************************!*\
  !*** ./src/app/splitter/splitter-demo.html ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-tab-group [selectedIndex]=\"tabIndex\" (selectedTabChange)=\"tabIndex = $event.index\">\n    <!--<mat-tab label=\"OVERVIEW\">-->\n        <!--<mat-card class=\"demo-card demo-basic\">-->\n            <!--TODO-->\n        <!--</mat-card>-->\n    <!--</mat-tab>-->\n    <mat-tab label=\"API REFERENCE\"></mat-tab>\n    <mat-tab label=\"EXAMPLES\"></mat-tab>\n</mat-tab-group>\n\n<mat-card class=\"demo-card demo-basic\" *ngIf=\"tabIndex === 0\">\n    <deja-markdown [url]=\"'https://raw.githubusercontent.com/DSI-HUG/dejajs-components/dev/projects/deja-js/component/splitter/readme.md'\"></deja-markdown>\n</mat-card>\n    \n<div *ngIf=\"tabIndex === 1\">\n    <mat-card class=\"demo-card\">\n        <mat-toolbar color=\"primary\">Horizontal splitter</mat-toolbar>\n        <mat-card-content class=\"no-padding\">\n            <div class=\"container\">\n                <deja-splitter [direction]=\"'horizontal'\" order=\"1\">\n                    <split-area [size]=\"25\" minSizePixel=\"100\">\n                        <p>Lorem ipsum dolor sit amet...</p>\n                    </split-area>\n                    <split-area [size]=\"75\" minSizePixel=\"100\">\n                        <p>Sed ut perspiciatis unde omnis iste natus erro...</p>\n                    </split-area>\n                </deja-splitter>\n            </div>\n        </mat-card-content>\n    </mat-card>\n\n    <mat-card class=\"demo-card\">\n        <mat-toolbar color=\"primary\">Vertical splitter</mat-toolbar>\n        <mat-card-content class=\"no-padding\">\n            <div class=\"container\">\n                <deja-splitter [direction]=\"'vertical'\">\n                    <split-area [size]=\"25\">\n                        <p>Lorem ipsum dolor sit amet...</p>\n                    </split-area>\n                    <split-area [size]=\"75\">\n                        <p>Sed ut perspiciatis unde omnis iste natus erro...</p>\n                    </split-area>\n                </deja-splitter>\n            </div>\n        </mat-card-content>\n    </mat-card>\n\n    <mat-card class=\"demo-card\">\n        <mat-toolbar color=\"primary\">Multiple splitter</mat-toolbar>\n        <mat-card-content class=\"no-padding\">\n            <div class=\"container\">\n                <deja-splitter [direction]=\"'horizontal'\">\n                    <split-area [size]=\"40\">\n                        <deja-splitter [direction]=\"'vertical'\">\n                            <split-area [size]=\"30\">\n                                <p>Lorem ipsum dolor sit amet...</p>\n                            </split-area>\n                            <split-area [size]=\"40\">\n                                <p>Sed ut perspiciatis unde omnis iste natus erro...</p>\n                            </split-area>\n                            <split-area [size]=\"30\">\n                                <p>Lorem ipsum dolor sit amet...</p>\n                            </split-area>\n                        </deja-splitter>\n                    </split-area>\n                    <split-area [size]=\"60\">\n                        <deja-splitter [direction]=\"'vertical'\">\n                            <split-area [size]=\"50\">\n                                <p>Lorem ipsum dolor sit amet...</p>\n                            </split-area>\n                            <split-area [size]=\"50\">\n                                <p>Sed ut perspiciatis unde omnis iste natus erro...</p>\n                            </split-area>\n                        </deja-splitter>\n                    </split-area>\n                </deja-splitter>\n            </div>\n        </mat-card-content>\n    </mat-card>\n</div>"

/***/ }),

/***/ "./src/app/splitter/splitter-demo.module.ts":
/*!**************************************************!*\
  !*** ./src/app/splitter/splitter-demo.module.ts ***!
  \**************************************************/
/*! exports provided: DejaSplitterDemoModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DejaSplitterDemoModule", function() { return DejaSplitterDemoModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/card */ "./node_modules/@angular/material/esm5/card.es5.js");
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/toolbar */ "./node_modules/@angular/material/esm5/toolbar.es5.js");
/* harmony import */ var _deja_js_component_splitter__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @deja-js/component/splitter */ "./dist/deja-js/component/fesm5/deja-js-component-splitter.js");
/* harmony import */ var _component_markdown_index__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../component/markdown/index */ "./src/component/markdown/index.ts");
/* harmony import */ var _splitter_demo__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./splitter-demo */ "./src/app/splitter/splitter-demo.ts");
/* harmony import */ var _splitter_demo_routes__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./splitter-demo.routes */ "./src/app/splitter/splitter-demo.routes.ts");
/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */











var DejaSplitterDemoModule = /** @class */ (function () {
    function DejaSplitterDemoModule() {
    }
    DejaSplitterDemoModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [_splitter_demo__WEBPACK_IMPORTED_MODULE_9__["DejaSplitterDemoComponent"]],
            exports: [_splitter_demo__WEBPACK_IMPORTED_MODULE_9__["DejaSplitterDemoComponent"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _angular_material_card__WEBPACK_IMPORTED_MODULE_5__["MatCardModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatTabsModule"],
                _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_6__["MatToolbarModule"],
                _deja_js_component_splitter__WEBPACK_IMPORTED_MODULE_7__["DejaSplitterModule"],
                _component_markdown_index__WEBPACK_IMPORTED_MODULE_8__["DejaMarkdownModule"],
                _splitter_demo_routes__WEBPACK_IMPORTED_MODULE_10__["routing"],
            ],
            providers: [],
        })
    ], DejaSplitterDemoModule);
    return DejaSplitterDemoModule;
}());



/***/ }),

/***/ "./src/app/splitter/splitter-demo.routes.ts":
/*!**************************************************!*\
  !*** ./src/app/splitter/splitter-demo.routes.ts ***!
  \**************************************************/
/*! exports provided: routing */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "routing", function() { return routing; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _splitter_demo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./splitter-demo */ "./src/app/splitter/splitter-demo.ts");
/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */


var routes = [
    { path: '', component: _splitter_demo__WEBPACK_IMPORTED_MODULE_1__["DejaSplitterDemoComponent"] },
    { path: '**', redirectTo: '', pathMatch: 'full' },
];
var routing = _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forChild(routes);


/***/ }),

/***/ "./src/app/splitter/splitter-demo.scss":
/*!*********************************************!*\
  !*** ./src/app/splitter/splitter-demo.scss ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host .container {\n  position: relative;\n  height: 300px;\n  width: 100%; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3RyYXZpcy9idWlsZC9EU0ktSFVHL2RlamFqcy1jb21wb25lbnRzL3NyYy9hcHAvc3BsaXR0ZXIvc3BsaXR0ZXItZGVtby5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBRVEsa0JBQWtCO0VBQ2xCLGFBQWE7RUFDYixXQUFXLEVBQUEiLCJmaWxlIjoic3JjL2FwcC9zcGxpdHRlci9zcGxpdHRlci1kZW1vLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyI6aG9zdCB7IFxuICAgIC5jb250YWluZXIge1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgIGhlaWdodDogMzAwcHg7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgIH1cbn1cblxuIl19 */"

/***/ }),

/***/ "./src/app/splitter/splitter-demo.ts":
/*!*******************************************!*\
  !*** ./src/app/splitter/splitter-demo.ts ***!
  \*******************************************/
/*! exports provided: DejaSplitterDemoComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DejaSplitterDemoComponent", function() { return DejaSplitterDemoComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */


var DejaSplitterDemoComponent = /** @class */ (function () {
    function DejaSplitterDemoComponent() {
        this.tabIndex = 1;
    }
    DejaSplitterDemoComponent.prototype.ngOnInit = function () {
    };
    DejaSplitterDemoComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'deja-splitter-demo',
            template: __webpack_require__(/*! ./splitter-demo.html */ "./src/app/splitter/splitter-demo.html"),
            styles: [__webpack_require__(/*! ./splitter-demo.scss */ "./src/app/splitter/splitter-demo.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], DejaSplitterDemoComponent);
    return DejaSplitterDemoComponent;
}());



/***/ })

}]);
//# sourceMappingURL=splitter-splitter-demo-module.js.map