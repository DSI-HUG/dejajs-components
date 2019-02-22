(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["circular-picker-circular-picker-demo-module"],{

/***/ "./src/app/circular-picker/circular-picker-demo.html":
/*!***********************************************************!*\
  !*** ./src/app/circular-picker/circular-picker-demo.html ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-tab-group [selectedIndex]=\"tabIndex\" (selectedTabChange)=\"tabIndex = $event.index\">\n\t<!--<mat-tab label=\"OVERVIEW\">-->\n\t<!--<mat-card class=\"demo-card demo-basic\">-->\n\t<!--TODO-->\n\t<!--</mat-card>-->\n\t<!--</mat-tab>-->\n\t<mat-tab label=\"API REFERENCE\"></mat-tab>\n\t<mat-tab label=\"EXAMPLES\"></mat-tab>\n</mat-tab-group>\n\n<mat-card class=\"demo-card demo-basic\" *ngIf=\"tabIndex === 0\">\n\t<deja-markdown [url]=\"'https://raw.githubusercontent.com/DSI-HUG/dejajs-components/dev/src/component/circular-picker/readme.md'\"></deja-markdown>\n</mat-card>\n\n<div *ngIf=\"tabIndex === 1\">\n\t<mat-card class=\"demo-card\">\n\t\t<mat-toolbar color=\"primary\">Complex Circular-picker width custom labels</mat-toolbar>\n\t\t<mat-card-content id=\"complex-wrapper\" class=\"listContainer\">\n\t\t\t<deja-circular-picker [ranges]=\"ranges41\" [outerLabels]=\"true\" id=\"outside\">\n\t\t\t</deja-circular-picker>\n\t\t\t<deja-circular-picker [(ngModel)]=\"sm\" [ranges]=\"ranges42\" id=\"inside\" (ngModelChange)=\"range42Changed($event)\">\n\t\t\t\t<ng-template #cursorTemplate #labelTemplate let-value>\n\t\t\t\t\t{{ getLabelForValue(value) }}\n\t\t\t\t</ng-template>\n\t\t\t</deja-circular-picker>\n\t\t</mat-card-content>\n\t</mat-card>\n\t<mat-card class=\"demo-card\">\n\t\t<mat-toolbar color=\"primary\">Circular-picker demo simple - Range 1 to 20 (inside and outside labels)</mat-toolbar>\n\t\t<mat-card-content class=\"listContainer\">\n\t\t\t<div>\n\t\t\t\t<deja-circular-picker [ranges]=\"ranges1\">\n\t\t\t\t</deja-circular-picker>\n\t\t\t</div>\n\t\t\t<div>\n\t\t\t\t<deja-circular-picker [ranges]=\"ranges2\" [outerLabels]=\"true\">\n\t\t\t\t</deja-circular-picker>\n\t\t\t</div>\n\t\t</mat-card-content>\n\t</mat-card>\n\t<mat-card class=\"demo-card\">\n\t\t<mat-toolbar color=\"primary\">Circular-picker demo multiple range (inside labels)</mat-toolbar>\n\t\t<mat-card-content class=\"listContainer\">\n\t\t\t<deja-circular-picker [(ngModel)]=\"sms\" [ranges]=\"ranges3\">\n\t\t\t\t<ng-template #cursorTemplate #labelTemplate let-value>\n\t\t\t\t\t{{ value === 24 ? 0 : value }}\n\t\t\t\t</ng-template>\n\t\t\t</deja-circular-picker>\n\t\t</mat-card-content>\n\t</mat-card>\n</div>"

/***/ }),

/***/ "./src/app/circular-picker/circular-picker-demo.module.ts":
/*!****************************************************************!*\
  !*** ./src/app/circular-picker/circular-picker-demo.module.ts ***!
  \****************************************************************/
/*! exports provided: DejaCircularPickerDemoModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DejaCircularPickerDemoModule", function() { return DejaCircularPickerDemoModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/card */ "./node_modules/@angular/material/esm5/card.es5.js");
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/toolbar */ "./node_modules/@angular/material/esm5/toolbar.es5.js");
/* harmony import */ var _deja_js_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @deja-js/component */ "./dist/deja-js/component/fesm5/deja-js-component.js");
/* harmony import */ var _component_markdown_index__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../component/markdown/index */ "./src/component/markdown/index.ts");
/* harmony import */ var _circular_picker_demo__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./circular-picker-demo */ "./src/app/circular-picker/circular-picker-demo.ts");
/* harmony import */ var _circular_picker_demo_routes__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./circular-picker-demo.routes */ "./src/app/circular-picker/circular-picker-demo.routes.ts");
/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */











var DejaCircularPickerDemoModule = /** @class */ (function () {
    function DejaCircularPickerDemoModule() {
    }
    DejaCircularPickerDemoModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [_circular_picker_demo__WEBPACK_IMPORTED_MODULE_9__["DejaCircularPickerDemoComponent"]],
            exports: [_circular_picker_demo__WEBPACK_IMPORTED_MODULE_9__["DejaCircularPickerDemoComponent"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _angular_material_card__WEBPACK_IMPORTED_MODULE_5__["MatCardModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatTabsModule"],
                _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_6__["MatToolbarModule"],
                _deja_js_component__WEBPACK_IMPORTED_MODULE_7__["DejaCircularPickerModule"],
                _component_markdown_index__WEBPACK_IMPORTED_MODULE_8__["DejaMarkdownModule"],
                _circular_picker_demo_routes__WEBPACK_IMPORTED_MODULE_10__["routing"],
            ],
            providers: [],
        })
    ], DejaCircularPickerDemoModule);
    return DejaCircularPickerDemoModule;
}());



/***/ }),

/***/ "./src/app/circular-picker/circular-picker-demo.routes.ts":
/*!****************************************************************!*\
  !*** ./src/app/circular-picker/circular-picker-demo.routes.ts ***!
  \****************************************************************/
/*! exports provided: routing */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "routing", function() { return routing; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _circular_picker_demo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./circular-picker-demo */ "./src/app/circular-picker/circular-picker-demo.ts");
/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */


var routes = [
    { path: '', component: _circular_picker_demo__WEBPACK_IMPORTED_MODULE_1__["DejaCircularPickerDemoComponent"] },
    { path: '**', redirectTo: '', pathMatch: 'full' },
];
var routing = _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forChild(routes);


/***/ }),

/***/ "./src/app/circular-picker/circular-picker-demo.scss":
/*!***********************************************************!*\
  !*** ./src/app/circular-picker/circular-picker-demo.scss ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host .listContainer {\n  display: flex;\n  justify-content: center;\n  margin-top: 15px;\n  padding: 2rem 0; }\n  :host .listContainer > div {\n    flex: 1 1 auto; }\n  :host .listContainer > div deja-circular-picker {\n      align-items: center;\n      display: flex;\n      justify-content: center; }\n  :host .listContainer#complex-wrapper {\n    position: relative;\n    height: 333px; }\n  :host .listContainer#complex-wrapper #outside,\n    :host .listContainer#complex-wrapper #inside {\n      left: 50%;\n      position: absolute !important;\n      top: 50%;\n      -webkit-transform: translate(-50%, -50%);\n              transform: translate(-50%, -50%); }\n  :host .listContainer#complex-wrapper #inside .circular-picker {\n      background: transparent;\n      border: none; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3RyYXZpcy9idWlsZC9EU0ktSFVHL2RlamFqcy1jb21wb25lbnRzL3NyYy9hcHAvY2lyY3VsYXItcGlja2VyL2NpcmN1bGFyLXBpY2tlci1kZW1vLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFFRSxhQUFhO0VBQ2IsdUJBQXVCO0VBQ3ZCLGdCQUFnQjtFQUNoQixlQUFlLEVBQUE7RUFMakI7SUFPRyxjQUFjLEVBQUE7RUFQakI7TUFTSSxtQkFBbUI7TUFDbkIsYUFBYTtNQUNiLHVCQUF1QixFQUFBO0VBWDNCO0lBZUcsa0JBQWtCO0lBQ2xCLGFBQWEsRUFBQTtFQWhCaEI7O01BbUJJLFNBQVM7TUFDVCw2QkFBNkI7TUFDN0IsUUFBUTtNQUNSLHdDQUFnQztjQUFoQyxnQ0FBZ0MsRUFBQTtFQXRCcEM7TUF5QkksdUJBQXVCO01BQ3ZCLFlBQVksRUFBQSIsImZpbGUiOiJzcmMvYXBwL2NpcmN1bGFyLXBpY2tlci9jaXJjdWxhci1waWNrZXItZGVtby5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiOmhvc3Qge1xuXHQubGlzdENvbnRhaW5lciB7XG5cdFx0ZGlzcGxheTogZmxleDtcblx0XHRqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcblx0XHRtYXJnaW4tdG9wOiAxNXB4O1xuXHRcdHBhZGRpbmc6IDJyZW0gMDtcblx0XHQ+ZGl2IHtcblx0XHRcdGZsZXg6IDEgMSBhdXRvO1xuXHRcdFx0ZGVqYS1jaXJjdWxhci1waWNrZXIge1xuXHRcdFx0XHRhbGlnbi1pdGVtczogY2VudGVyO1xuXHRcdFx0XHRkaXNwbGF5OiBmbGV4O1xuXHRcdFx0XHRqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcblx0XHRcdH1cblx0XHR9XG5cdFx0JiNjb21wbGV4LXdyYXBwZXIge1xuXHRcdFx0cG9zaXRpb246IHJlbGF0aXZlO1xuXHRcdFx0aGVpZ2h0OiAzMzNweDtcblx0XHRcdCNvdXRzaWRlLFxuXHRcdFx0I2luc2lkZSB7XG5cdFx0XHRcdGxlZnQ6IDUwJTtcblx0XHRcdFx0cG9zaXRpb246IGFic29sdXRlICFpbXBvcnRhbnQ7XG5cdFx0XHRcdHRvcDogNTAlO1xuXHRcdFx0XHR0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKTtcblx0XHRcdH1cblx0XHRcdCNpbnNpZGUgLmNpcmN1bGFyLXBpY2tlciB7XG5cdFx0XHRcdGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuXHRcdFx0XHRib3JkZXI6IG5vbmU7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59Il19 */"

/***/ }),

/***/ "./src/app/circular-picker/circular-picker-demo.ts":
/*!*********************************************************!*\
  !*** ./src/app/circular-picker/circular-picker-demo.ts ***!
  \*********************************************************/
/*! exports provided: DejaCircularPickerDemoComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DejaCircularPickerDemoComponent", function() { return DejaCircularPickerDemoComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */


var DejaCircularPickerDemoComponent = /** @class */ (function () {
    function DejaCircularPickerDemoComponent() {
        this.tabIndex = 1;
        this.sm = 3;
        this.sms = 10;
        this.ranges1 = [
            { min: 1, max: 20, labelInterval: 2 },
        ];
        this.ranges2 = [
            { min: 1, max: 20 },
        ];
        this.ranges3 = [
            { min: 1, max: 12, beginOffset: Math.PI / 3 },
            { min: 13, max: 24, beginOffset: Math.PI / 3 },
        ];
        this.ranges41 = [
            {
                labelInterval: 5,
                max: 59,
                min: 0,
            },
        ];
        this.ranges42 = [
            {
                max: 11,
                min: 0,
            },
            {
                max: 111,
                min: 100,
            },
        ];
        this.myModel = [
            { value: 0, label: 'T0' },
            { value: 1, label: 'T1' },
            { value: 2, label: 'T2' },
            { value: 3, label: 'T3' },
            { value: 4, label: 'T4' },
            { value: 5, label: 'T5' },
            { value: 6, label: 'T6' },
            { value: 7, label: 'T7' },
            { value: 8, label: 'T8' },
            { value: 9, label: 'T9' },
            { value: 10, label: 'T10' },
            { value: 11, label: 'T11' },
            { value: 100, label: 'T-1', realValue: -1 },
            { value: 101, label: 'T-2', realValue: -2 },
            { value: 102, label: 'T-3', realValue: -3 },
            { value: 103, label: 'T-4', realValue: -4 },
            { value: 104, label: 'T-5', realValue: -5 },
            { value: 105, label: 'T-6', realValue: -6 },
            { value: 106, label: 'T-7', realValue: -7 },
            { value: 107, label: 'T-8', realValue: -8 },
            { value: 108, label: 'T-9', realValue: -9 },
            { value: 109, label: 'T-10', realValue: -10 },
            { value: 110, label: 'T-11', realValue: -11 },
            { value: 111, label: 'T-12', realValue: -12 },
        ];
    }
    DejaCircularPickerDemoComponent.prototype.ngOnInit = function () {
    };
    DejaCircularPickerDemoComponent.prototype.range42Changed = function (selection) {
        console.log("Selected model " + this.getLabelForValue(selection));
    };
    DejaCircularPickerDemoComponent.prototype.getLabelForValue = function (value) {
        var val = this.myModel.find(function (m) { return m.value === value; });
        return (val) ? val.label : value;
    };
    DejaCircularPickerDemoComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'deja-circular-picker-demo',
            template: __webpack_require__(/*! ./circular-picker-demo.html */ "./src/app/circular-picker/circular-picker-demo.html"),
            styles: [__webpack_require__(/*! ./circular-picker-demo.scss */ "./src/app/circular-picker/circular-picker-demo.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], DejaCircularPickerDemoComponent);
    return DejaCircularPickerDemoComponent;
}());



/***/ })

}]);
//# sourceMappingURL=circular-picker-circular-picker-demo-module.js.map