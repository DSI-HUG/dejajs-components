(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["sidenav-sidenav-demo-module"],{

/***/ "./src/app/sidenav/sidenav-demo.component.html":
/*!*****************************************************!*\
  !*** ./src/app/sidenav/sidenav-demo.component.html ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-tab-group [selectedIndex]=\"tabIndex\" (selectedTabChange)=\"tabIndex = $event.index\">\n    <mat-tab label=\"API REFERENCE\"></mat-tab>\n    <mat-tab label=\"EXAMPLES\"></mat-tab>\n</mat-tab-group>\n\n<mat-card class=\"demo-card demo-basic\" *ngIf=\"tabIndex === 0\">\n    TODO\n    <!-- <deja-markdown [url]=\"'https://raw.githubusercontent.com/DSI-HUG/dejajs-components/dev/projects/deja-js/component/snackbar/readme.md'\"></deja-markdown> -->\n</mat-card>\n\n<mat-card class=\"demo-card\" *ngIf=\"tabIndex === 1\">\n    <mat-toolbar color=\"primary\">Manage app sidenav</mat-toolbar>\n    <mat-card-content class=\"listContainer\">\n        <button mat-raised-button color=\"primary\" (click)=\"toggle()\">Toggle</button>\n        <button mat-raised-button color=\"accent\" (click)=\"open()\">Open</button>\n        <button mat-raised-button color=\"warn\" (click)=\"close()\">Close</button>\n    </mat-card-content>\n</mat-card>"

/***/ }),

/***/ "./src/app/sidenav/sidenav-demo.component.scss":
/*!*****************************************************!*\
  !*** ./src/app/sidenav/sidenav-demo.component.scss ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host button {\n  margin: 1rem 0.5rem; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3RyYXZpcy9idWlsZC9EU0ktSFVHL2RlamFqcy1jb21wb25lbnRzL3NyYy9hcHAvc2lkZW5hdi9zaWRlbmF2LWRlbW8uY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFFUSxtQkFBbUIsRUFBQSIsImZpbGUiOiJzcmMvYXBwL3NpZGVuYXYvc2lkZW5hdi1kZW1vLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiOmhvc3Qge1xuICAgIGJ1dHRvbiB7XG4gICAgICAgIG1hcmdpbjogMXJlbSAwLjVyZW07XG4gICAgfVxufSJdfQ== */"

/***/ }),

/***/ "./src/app/sidenav/sidenav-demo.component.ts":
/*!***************************************************!*\
  !*** ./src/app/sidenav/sidenav-demo.component.ts ***!
  \***************************************************/
/*! exports provided: SidenavDemoComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SidenavDemoComponent", function() { return SidenavDemoComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _deja_js_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @deja-js/component */ "./dist/deja-js/component/fesm5/deja-js-component.js");
/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */



var SidenavDemoComponent = /** @class */ (function () {
    function SidenavDemoComponent(sidenavService) {
        this.sidenavService = sidenavService;
        this.tabIndex = 1;
    }
    SidenavDemoComponent.prototype.ngOnInit = function () { };
    SidenavDemoComponent.prototype.toggle = function () {
        this.sidenavService.toggle();
    };
    SidenavDemoComponent.prototype.open = function () {
        this.sidenavService.open();
    };
    SidenavDemoComponent.prototype.close = function () {
        this.sidenavService.close();
    };
    SidenavDemoComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'sidenav-demo',
            template: __webpack_require__(/*! ./sidenav-demo.component.html */ "./src/app/sidenav/sidenav-demo.component.html"),
            styles: [__webpack_require__(/*! ./sidenav-demo.component.scss */ "./src/app/sidenav/sidenav-demo.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_deja_js_component__WEBPACK_IMPORTED_MODULE_2__["DejaSidenavService"]])
    ], SidenavDemoComponent);
    return SidenavDemoComponent;
}());



/***/ }),

/***/ "./src/app/sidenav/sidenav-demo.module.ts":
/*!************************************************!*\
  !*** ./src/app/sidenav/sidenav-demo.module.ts ***!
  \************************************************/
/*! exports provided: DejaSidenavDemoModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DejaSidenavDemoModule", function() { return DejaSidenavDemoModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/button */ "./node_modules/@angular/material/esm5/button.es5.js");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/card */ "./node_modules/@angular/material/esm5/card.es5.js");
/* harmony import */ var _angular_material_tabs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/tabs */ "./node_modules/@angular/material/esm5/tabs.es5.js");
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/toolbar */ "./node_modules/@angular/material/esm5/toolbar.es5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _deja_js_component_sidenav__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @deja-js/component/sidenav */ "./dist/deja-js/component/fesm5/deja-js-component-sidenav.js");
/* harmony import */ var _sidenav_demo_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./sidenav-demo.component */ "./src/app/sidenav/sidenav-demo.component.ts");
/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */










var routes = [
    { path: '', component: _sidenav_demo_component__WEBPACK_IMPORTED_MODULE_9__["SidenavDemoComponent"] },
];
var DejaSidenavDemoModule = /** @class */ (function () {
    function DejaSidenavDemoModule() {
    }
    DejaSidenavDemoModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [_sidenav_demo_component__WEBPACK_IMPORTED_MODULE_9__["SidenavDemoComponent"]],
            exports: [_sidenav_demo_component__WEBPACK_IMPORTED_MODULE_9__["SidenavDemoComponent"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _deja_js_component_sidenav__WEBPACK_IMPORTED_MODULE_8__["DejaSidenavModule"],
                _angular_material_button__WEBPACK_IMPORTED_MODULE_3__["MatButtonModule"],
                _angular_material_card__WEBPACK_IMPORTED_MODULE_4__["MatCardModule"],
                _angular_material_tabs__WEBPACK_IMPORTED_MODULE_5__["MatTabsModule"],
                _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_6__["MatToolbarModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_7__["RouterModule"].forChild(routes),
            ],
            providers: [],
        })
    ], DejaSidenavDemoModule);
    return DejaSidenavDemoModule;
}());



/***/ })

}]);
//# sourceMappingURL=sidenav-sidenav-demo-module.js.map