(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["content-editable-content-editable-demo-module"],{

/***/ "./src/app/content-editable/content-editable-demo.html":
/*!*************************************************************!*\
  !*** ./src/app/content-editable/content-editable-demo.html ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-tab-group [selectedIndex]=\"tabIndex\" (selectedTabChange)=\"tabIndex = $event.index\">\n    <!--<mat-tab label=\"OVERVIEW\">-->\n    <!--<mat-card class=\"demo-card demo-basic\">-->\n    <!--TODO-->\n    <!--</mat-card>-->\n    <!--</mat-tab>-->\n    <mat-tab label=\"API REFERENCE\"></mat-tab>\n    <mat-tab label=\"EXAMPLES\"></mat-tab>\n</mat-tab-group>\n\n<mat-card class=\"demo-card demo-basic\" *ngIf=\"tabIndex === 0\">\n    <deja-markdown [url]=\"'https://raw.githubusercontent.com/DSI-HUG/dejajs-components/dev/projects/deja-js/component/content-editable/readme.md'\"></deja-markdown>\n</mat-card>\n\n<mat-card class=\"demo-card demo-basic\" *ngIf=\"tabIndex === 1\">\n    <mat-toolbar color=\"primary\">Content Editable Demo</mat-toolbar>\n    <mat-card-content>\n        <mat-checkbox color=\"primary\" [(ngModel)]=\"designMode\">Design Mode&nbsp;</mat-checkbox>\n        <mat-checkbox color=\"primary\" [(ngModel)]=\"disabled\">Disabled</mat-checkbox>\n    </mat-card-content>\n    <mat-card-content id=\"contentEditableContainer\">\n        <div [deja-editable]=\"designMode\" [disabled]=\"disabled\" multiline>\n            Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n            <br /> Mauris auctor sit amet odio et aliquet. Curabitur auctor eleifend mattis.\n            <br /> Nullam sit amet quam tellus. Ut mattis tellus sed erat ultricies ornare.\n            <br /> Nulla dictum nisi eu tortor lacinia porttitor. Donec eu arcu et enim cursus viverra.\n            <br /> Praesent pulvinar dui nisi, a tincidunt arcu finibus sed.\n            <br /> <a href=\"http://www.google.ch\">Google</a>\n        </div>\n    </mat-card-content>\n</mat-card>"

/***/ }),

/***/ "./src/app/content-editable/content-editable-demo.module.ts":
/*!******************************************************************!*\
  !*** ./src/app/content-editable/content-editable-demo.module.ts ***!
  \******************************************************************/
/*! exports provided: DejaContentEditableDemoModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DejaContentEditableDemoModule", function() { return DejaContentEditableDemoModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/card */ "./node_modules/@angular/material/esm5/card.es5.js");
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/toolbar */ "./node_modules/@angular/material/esm5/toolbar.es5.js");
/* harmony import */ var _deja_js_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @deja-js/component */ "./dist/deja-js/component/fesm5/deja-js-component.js");
/* harmony import */ var _component_markdown_index__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../component/markdown/index */ "./src/component/markdown/index.ts");
/* harmony import */ var _content_editable_demo__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./content-editable-demo */ "./src/app/content-editable/content-editable-demo.ts");
/* harmony import */ var _content_editable_demo_routes__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./content-editable-demo.routes */ "./src/app/content-editable/content-editable-demo.routes.ts");
/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */











var DejaContentEditableDemoModule = /** @class */ (function () {
    function DejaContentEditableDemoModule() {
    }
    DejaContentEditableDemoModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [_content_editable_demo__WEBPACK_IMPORTED_MODULE_9__["DejaContentEditableDemoComponent"]],
            exports: [_content_editable_demo__WEBPACK_IMPORTED_MODULE_9__["DejaContentEditableDemoComponent"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _angular_material_card__WEBPACK_IMPORTED_MODULE_5__["MatCardModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatCheckboxModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatTabsModule"],
                _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_6__["MatToolbarModule"],
                _deja_js_component__WEBPACK_IMPORTED_MODULE_7__["DejaEditableModule"],
                _component_markdown_index__WEBPACK_IMPORTED_MODULE_8__["DejaMarkdownModule"],
                _content_editable_demo_routes__WEBPACK_IMPORTED_MODULE_10__["routing"],
            ],
            providers: [],
        })
    ], DejaContentEditableDemoModule);
    return DejaContentEditableDemoModule;
}());



/***/ }),

/***/ "./src/app/content-editable/content-editable-demo.routes.ts":
/*!******************************************************************!*\
  !*** ./src/app/content-editable/content-editable-demo.routes.ts ***!
  \******************************************************************/
/*! exports provided: routing */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "routing", function() { return routing; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _content_editable_demo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./content-editable-demo */ "./src/app/content-editable/content-editable-demo.ts");
/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */


var routes = [
    { path: '', component: _content_editable_demo__WEBPACK_IMPORTED_MODULE_1__["DejaContentEditableDemoComponent"] },
    { path: '**', redirectTo: '', pathMatch: 'full' },
];
var routing = _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forChild(routes);


/***/ }),

/***/ "./src/app/content-editable/content-editable-demo.ts":
/*!***********************************************************!*\
  !*** ./src/app/content-editable/content-editable-demo.ts ***!
  \***********************************************************/
/*! exports provided: DejaContentEditableDemoComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DejaContentEditableDemoComponent", function() { return DejaContentEditableDemoComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */


var DejaContentEditableDemoComponent = /** @class */ (function () {
    function DejaContentEditableDemoComponent() {
        this.tabIndex = 1;
        this.designMode = false;
        this.disabled = false;
    }
    DejaContentEditableDemoComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'deja-content-editable-demo',
            template: __webpack_require__(/*! ./content-editable-demo.html */ "./src/app/content-editable/content-editable-demo.html"),
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], DejaContentEditableDemoComponent);
    return DejaContentEditableDemoComponent;
}());



/***/ })

}]);
//# sourceMappingURL=content-editable-content-editable-demo-module.js.map