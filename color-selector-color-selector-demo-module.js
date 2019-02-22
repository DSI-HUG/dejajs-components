(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["color-selector-color-selector-demo-module"],{

/***/ "./src/app/color-selector/color-selector-demo.html":
/*!*********************************************************!*\
  !*** ./src/app/color-selector/color-selector-demo.html ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-tab-group [selectedIndex]=\"tabIndex\" (selectedTabChange)=\"tabIndex = $event.index\">\n    <!--<mat-tab label=\"OVERVIEW\">-->\n    <!--<mat-card class=\"demo-card demo-basic\">-->\n    <!--TODO-->\n    <!--</mat-card>-->\n    <!--</mat-tab>-->\n    <mat-tab label=\"API REFERENCE\"></mat-tab>\n    <mat-tab label=\"EXAMPLES\"></mat-tab>\n</mat-tab-group>\n\n<mat-card class=\"demo-card demo-basic\" *ngIf=\"tabIndex === 0\">\n    <deja-markdown [url]=\"'https://raw.githubusercontent.com/DSI-HUG/dejajs-components/dev/src/component/color-selector/readme.md'\"></deja-markdown>\n</mat-card>\n\n<div *ngIf=\"tabIndex === 1\">\n    <mat-card class=\"demo-card\">\n        <mat-toolbar color=\"primary\">Color Picker width backdrop - Pick a color:    (selected color: {{ selectedColor.toHex() }});</mat-toolbar>\n        <mat-card-content id=\"colorpickers\">\n            <deja-color-picker name=\"1\" [attr.hexx]=\"selectedColor && selectedColor.toHex()\" class=\"colorpicker\" [colors]=\"materialColors.colors\" [(ngModel)]=\"selectedColor\" (colorhover)=\"onColorPickerHover($event)\" (ngModelChange)=\"onColorPickerChange($event)\"></deja-color-picker>\n            <deja-color-picker name=\"2\" resetcolor=\"red\" class=\"colorpicker\" small [colors]=\"materialColors.colors\" [(ngModel)]=\"invalidColor\" (colorhover)=\"onColorPickerHover($event)\" (ngModelChange)=\"onColorPickerChange($event)\"></deja-color-picker>\n            <deja-color-picker name=\"3\" disabled small class=\"colorpicker\" [colors]=\"materialColors.colors\" [(ngModel)]=\"selectedColor\" (colorhover)=\"onColorPickerHover($event)\" (ngModelChange)=\"onColorPickerChange($event)\"></deja-color-picker>\n        </mat-card-content>\n    </mat-card>\n\n    <mat-card class=\"demo-card\">\n        <mat-toolbar color=\"primary\">Color Selector - Pick a color:</mat-toolbar>\n        <mat-card-content>\n            <div id=\"hoveredColor\" [style.background-color]=\"(hoveredColor && hoveredColor.toHex()) || selectedColor.toHex()\">\n                <deja-color-selector name=\"4\" [colors]=\"materialColors.colors\" [(ngModel)]=\"selectedColor\" (colorhover)=\"onColorPickerHover($event)\" (ngModelChange)=\"onColorPickerChange($event)\"></deja-color-selector>\n            </div>\n        </mat-card-content>\n    </mat-card>\n\n    <mat-card class=\"demo-card\">\n        <mat-toolbar color=\"primary\">Color Selector - Disabled:</mat-toolbar>\n        <mat-card-content id=\"colorpickers\">\n            <deja-color-selector name=\"5\" disabled [colors]=\"materialColors.colors\" [(ngModel)]=\"selectedColor\" (colorhover)=\"onColorPickerHover($event)\" (ngModelChange)=\"onColorPickerChange($event)\"></deja-color-selector>\n        </mat-card-content>\n    </mat-card>\n</div>"

/***/ }),

/***/ "./src/app/color-selector/color-selector-demo.module.ts":
/*!**************************************************************!*\
  !*** ./src/app/color-selector/color-selector-demo.module.ts ***!
  \**************************************************************/
/*! exports provided: DejaColorSelectorDemoModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DejaColorSelectorDemoModule", function() { return DejaColorSelectorDemoModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/card */ "./node_modules/@angular/material/esm5/card.es5.js");
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/toolbar */ "./node_modules/@angular/material/esm5/toolbar.es5.js");
/* harmony import */ var _deja_js_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @deja-js/component */ "./dist/deja-js/component/fesm5/deja-js-component.js");
/* harmony import */ var _component_markdown_index__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../component/markdown/index */ "./src/component/markdown/index.ts");
/* harmony import */ var _color_selector_demo__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./color-selector-demo */ "./src/app/color-selector/color-selector-demo.ts");
/* harmony import */ var _color_selector_demo_routes__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./color-selector-demo.routes */ "./src/app/color-selector/color-selector-demo.routes.ts");
/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */











var DejaColorSelectorDemoModule = /** @class */ (function () {
    function DejaColorSelectorDemoModule() {
    }
    DejaColorSelectorDemoModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [_color_selector_demo__WEBPACK_IMPORTED_MODULE_9__["DejaColorSelectorDemoComponent"]],
            exports: [_color_selector_demo__WEBPACK_IMPORTED_MODULE_9__["DejaColorSelectorDemoComponent"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _angular_material_card__WEBPACK_IMPORTED_MODULE_5__["MatCardModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatTabsModule"],
                _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_6__["MatToolbarModule"],
                _deja_js_component__WEBPACK_IMPORTED_MODULE_7__["DejaColorSelectorModule"],
                _deja_js_component__WEBPACK_IMPORTED_MODULE_7__["DejaColorPickerModule"],
                _component_markdown_index__WEBPACK_IMPORTED_MODULE_8__["DejaMarkdownModule"],
                _color_selector_demo_routes__WEBPACK_IMPORTED_MODULE_10__["routing"],
            ],
            providers: [],
        })
    ], DejaColorSelectorDemoModule);
    return DejaColorSelectorDemoModule;
}());



/***/ }),

/***/ "./src/app/color-selector/color-selector-demo.routes.ts":
/*!**************************************************************!*\
  !*** ./src/app/color-selector/color-selector-demo.routes.ts ***!
  \**************************************************************/
/*! exports provided: routing */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "routing", function() { return routing; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _color_selector_demo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./color-selector-demo */ "./src/app/color-selector/color-selector-demo.ts");
/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */


var routes = [
    { path: '', component: _color_selector_demo__WEBPACK_IMPORTED_MODULE_1__["DejaColorSelectorDemoComponent"] },
    { path: '**', redirectTo: '', pathMatch: 'full' },
];
var routing = _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forChild(routes);


/***/ }),

/***/ "./src/app/color-selector/color-selector-demo.scss":
/*!*********************************************************!*\
  !*** ./src/app/color-selector/color-selector-demo.scss ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host deja-color-selector {\n  background-color: #222; }\n\n:host deja-color-selector[disabled] {\n  margin: 1rem 2rem 3rem 2rem; }\n\n:host #hoveredColor {\n  width: 100%;\n  margin: 1rem 0 3rem 0;\n  padding: 5rem 0;\n  transition: background-color ease 0.5s; }\n\n:host #colorpickers {\n  flex-direction: row; }\n\n:host #colorpickers .colorpicker {\n    margin-right: 1rem; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3RyYXZpcy9idWlsZC9EU0ktSFVHL2RlamFqcy1jb21wb25lbnRzL3NyYy9hcHAvY29sb3Itc2VsZWN0b3IvY29sb3Itc2VsZWN0b3ItZGVtby5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBRVEsc0JBQXNCLEVBQUE7O0FBRjlCO0VBTVEsMkJBQTJCLEVBQUE7O0FBTm5DO0VBVVEsV0FBVztFQUNYLHFCQUFxQjtFQUNyQixlQUFlO0VBQ2Ysc0NBQXNDLEVBQUE7O0FBYjlDO0VBaUJRLG1CQUFtQixFQUFBOztBQWpCM0I7SUFtQlksa0JBQWtCLEVBQUEiLCJmaWxlIjoic3JjL2FwcC9jb2xvci1zZWxlY3Rvci9jb2xvci1zZWxlY3Rvci1kZW1vLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyI6aG9zdCB7XG4gICAgZGVqYS1jb2xvci1zZWxlY3RvciB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICMyMjI7XG4gICAgfVxuXG4gICAgZGVqYS1jb2xvci1zZWxlY3RvcltkaXNhYmxlZF0ge1xuICAgICAgICBtYXJnaW46IDFyZW0gMnJlbSAzcmVtIDJyZW07XG4gICAgfVxuXG4gICAgI2hvdmVyZWRDb2xvciB7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICBtYXJnaW46IDFyZW0gMCAzcmVtIDA7XG4gICAgICAgIHBhZGRpbmc6IDVyZW0gMDtcbiAgICAgICAgdHJhbnNpdGlvbjogYmFja2dyb3VuZC1jb2xvciBlYXNlIDAuNXM7XG4gICAgfVxuXG4gICAgI2NvbG9ycGlja2VycyB7XG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gICAgICAgIC5jb2xvcnBpY2tlciB7XG4gICAgICAgICAgICBtYXJnaW4tcmlnaHQ6IDFyZW07XG4gICAgICAgIH1cbiAgICB9XG59Il19 */"

/***/ }),

/***/ "./src/app/color-selector/color-selector-demo.ts":
/*!*******************************************************!*\
  !*** ./src/app/color-selector/color-selector-demo.ts ***!
  \*******************************************************/
/*! exports provided: DejaColorSelectorDemoComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DejaColorSelectorDemoComponent", function() { return DejaColorSelectorDemoComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _deja_js_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @deja-js/core */ "./dist/deja-js/core/fesm5/deja-js-core.js");
/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */



var DejaColorSelectorDemoComponent = /** @class */ (function () {
    function DejaColorSelectorDemoComponent(materialColors) {
        this.materialColors = materialColors;
        this.tabIndex = 1;
        this.selectedColor = new _deja_js_core__WEBPACK_IMPORTED_MODULE_2__["Color"](233, 30, 99);
        this.invalidColor = _deja_js_core__WEBPACK_IMPORTED_MODULE_2__["Color"].fromHex('#D02D06');
    }
    DejaColorSelectorDemoComponent.prototype.onColorPickerHover = function (event) {
        this.hoveredColor = event.color;
    };
    DejaColorSelectorDemoComponent.prototype.onColorPickerChange = function (event) {
        this.hoveredColor = event.color;
    };
    DejaColorSelectorDemoComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'deja-color-selector-demo',
            template: __webpack_require__(/*! ./color-selector-demo.html */ "./src/app/color-selector/color-selector-demo.html"),
            styles: [__webpack_require__(/*! ./color-selector-demo.scss */ "./src/app/color-selector/color-selector-demo.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_deja_js_core__WEBPACK_IMPORTED_MODULE_2__["MaterialColors"]])
    ], DejaColorSelectorDemoComponent);
    return DejaColorSelectorDemoComponent;
}());



/***/ })

}]);
//# sourceMappingURL=color-selector-color-selector-demo-module.js.map