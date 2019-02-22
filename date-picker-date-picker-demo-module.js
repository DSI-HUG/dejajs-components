(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["date-picker-date-picker-demo-module"],{

/***/ "./src/app/date-picker/date-picker-demo.html":
/*!***************************************************!*\
  !*** ./src/app/date-picker/date-picker-demo.html ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-tab-group [selectedIndex]=\"tabIndex\" (selectedTabChange)=\"tabIndex = $event.index\">\n\t<!--<mat-tab label=\"OVERVIEW\">-->\n\t<!--<mat-card class=\"demo-card demo-basic\">-->\n\t<!--TODO-->\n\t<!--</mat-card>-->\n\t<!--</mat-tab>-->\n\t<mat-tab label=\"API REFERENCE\"></mat-tab>\n\t<mat-tab label=\"EXAMPLES\"></mat-tab>\n</mat-tab-group>\n\n<mat-card class=\"demo-card demo-basic\" *ngIf=\"tabIndex === 0\">\n\t<deja-markdown [url]=\"'https://raw.githubusercontent.com/DSI-HUG/dejajs-components/dev/src/component/date-picker/readme.md'\"></deja-markdown>\n</mat-card>\n\n<div *ngIf=\"tabIndex === 1\">\n\t<mat-card class=\"demo-card\">\n\t\t<mat-toolbar color=\"primary\">Date Selector</mat-toolbar>\n\t\t<mat-card-content>\n\t\t\t<div class=\"flex-layout\">\n\t\t\t\t<div>\n\t\t\t\t\t<h3>Only weeks are disabled :</h3>\n\t\t\t\t\t<deja-date-time-selector [disableDates]=\"disabledDate\" [(ngModel)]=\"theDate1\"></deja-date-time-selector>\n\t\t\t\t\t<p>Selected date : {{theDate1 | date:'yyyy-MM-dd'}}</p>\n\t\t\t\t</div>\n\t\t\t\t<div>\n\t\t\t\t\t<h3>With initial date setted :</h3>\n\t\t\t\t\t<deja-date-time-selector [(ngModel)]=\"theDateSelected\"></deja-date-time-selector>\n\t\t\t\t\t<p>Selected date : {{theDateSelected | date:'yyyy-MM-dd'}}</p>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<hr>\n\t\t\t<div class=\"flex-layout\">\n\t\t\t\t<div>\n\t\t\t\t\t<h3>With min / max dates :</h3>\n\t\t\t\t\t<deja-date-time-selector [(ngModel)]=\"theDate2\" [dateMin]=\"dateMin\" [dateMax]=\"dateMax\"></deja-date-time-selector>\n\t\t\t\t\t<p>Selected date : {{theDate2 | date:'yyyy-MM-dd'}}</p>\n\t\t\t\t\t<p>min => max date : {{dateMin | date:'yyyy-MM-dd'}} => {{dateMax | date:'yyyy-MM-dd'}}</p>\n\t\t\t\t</div>\n\t\t\t\t<div>\n\t\t\t\t\t<h3>With min / max dates and weeks are disabled :</h3>\n\t\t\t\t\t<deja-date-time-selector [disableDates]=\"disabledDate\" [(ngModel)]=\"theDate3\" [dateMin]=\"dateMin\" [dateMax]=\"dateMax\"></deja-date-time-selector>\n\t\t\t\t\t<p>Selected date : {{theDate3 | date:'yyyy-MM-dd'}}</p>\n\t\t\t\t\t<p>min => max date : {{dateMin | date:'yyyy-MM-dd'}} => {{dateMax | date:'yyyy-MM-dd'}}</p>\n\t\t\t\t</div>\n\t\t\t</div>\n\n\t\t</mat-card-content>\n\t</mat-card>\n\t<mat-card class=\"demo-card\">\n\t\t<mat-toolbar color=\"primary\">Date Time Selector</mat-toolbar>\n\t\t<mat-card-content>\n\t\t\t<div class=\"flex-layout flex-layout-column flex-layout-wrap\">\n\t\t\t\t<div class=\"flex-layout-column flex-layout-center\">\n\t\t\t\t\t<deja-date-time-selector [disableDates]=\"disabledDate\" [(ngModel)]=\"theDateTime\" time (dateChange)=\"dateChange($event)\" (timeChange)=\"timeChange($event)\"></deja-date-time-selector>\n\t\t\t\t\t<p>Selected date : {{theDateTime | date:'yyyy-MM-dd HH:mm:ss'}}</p>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"flex-layout-column flex-layout-center\">\n\t\t\t\t\t<deja-date-time-selector [disabled]=\"disableDateTime\" time></deja-date-time-selector>\n\t\t\t\t\t<p>\n\t\t\t\t\t\t<mat-checkbox [(ngModel)]=\"disableDateTime\">Disable date-time-picker</mat-checkbox>\n\t\t\t\t\t</p>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"flex-layout-column flex-layout-center\">\n\t\t\t\t\t<deja-date-time-selector [(ngModel)]=\"theDateTimeLayout\" [layout]=\"myLayout\"></deja-date-time-selector>\n\t\t\t\t\t<p>Selected time : {{theDateTimeLayout | date:'HH:mm'}}</p>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</mat-card-content>\n\t</mat-card>\n\n\t<mat-card class=\"demo-card\">\n\t\t<mat-toolbar color=\"primary\">Date Picker & DateTime Picker</mat-toolbar>\n\t\t<mat-card-content>\n\t\t\t<div class=\"flex-layout\">\n\t\t\t\t<div>\n\t\t\t\t\t<h3>Date Picker :</h3>\n\t\t\t\t\t<mat-form-field appearance=\"outline\">\n\t\t\t\t\t\t<mat-label>Date</mat-label>\n\t\t\t\t\t\t<deja-date-picker [disableDates]=\"disabledDate\" [(ngModel)]=\"theDatePicker\"></deja-date-picker>\n\t\t\t\t\t\t<mat-hint>Selected date : {{theDatePicker | date:'yyyy-MM-dd'}}</mat-hint>\n\t\t\t\t\t</mat-form-field>\n\t\t\t\t</div>\n\t\t\t\t<div>\n\t\t\t\t\t<h3>DateTime Picker :</h3>\n\t\t\t\t\t<mat-form-field appearance=\"outline\">\n\t\t\t\t\t\t<mat-label>DateTime Picker</mat-label>\n\t\t\t\t\t\t<deja-date-picker [disableDates]=\"disabledDate\" [(ngModel)]=\"theDatetimePicker\" time></deja-date-picker>\n\t\t\t\t\t\t<mat-hint>Selected date : {{theDatetimePicker | date:'yyyy-MM-dd HH:mm:ss'}}</mat-hint>\n\t\t\t\t\t</mat-form-field>\n\t\t\t\t</div>\n\t\t\t\t<div>\n\t\t\t\t\t<h3>Time Picker :</h3>\n\t\t\t\t\t<mat-form-field appearance=\"outline\">\n\t\t\t\t\t\t<mat-label>Time picker</mat-label>\n\t\t\t\t\t\t<deja-date-picker [disableDates]=\"disabledDate\" [(ngModel)]=\"theTimePicker\" [layout]=\"'timeonly'\"></deja-date-picker>\n\t\t\t\t\t\t<mat-hint>Selected date : {{theTimePicker | date:'HH:mm:ss'}}</mat-hint>\n\t\t\t\t\t</mat-form-field>\n\t\t\t\t</div>\n\t\t\t\t<div>\n\t\t\t\t\t<h3>Free Entry Date Picker :</h3>\n\t\t\t\t\t<mat-form-field appearance=\"outline\">\n\t\t\t\t\t\t<mat-label>Free Entry Date Picker</mat-label>\n\t\t\t\t\t\t<deja-date-picker [disableDates]=\"disabledDate\" [(ngModel)]=\"theFreeEntryDatePicker\" required [allowFreeEntry]=\"true\"></deja-date-picker>\n\t\t\t\t\t\t<mat-hint>Selected date : {{theFreeEntryDatePicker}}</mat-hint>\n\t\t\t\t\t</mat-form-field>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<hr>\n\t\t\t<div class=\"flex-layout\">\n\t\t\t\t<h3>Shortcut navigation :</h3>\n\t\t\t\t<div class=\"flex-layout flex-layout-center\" id=\"shortcut-list\">\n\t\t\t\t\t<ul>\n\t\t\t\t\t\t<li> Inside input :\n\t\t\t\t\t\t\t<ul>\n\t\t\t\t\t\t\t\t<li>Press<span class=\"keyboard-key\">D</span> to select the current date.</li>\n\t\t\t\t\t\t\t\t<li>Press<span class=\"keyboard-key\">↑</span> to increase the selected number of 1 day.</li>\n\t\t\t\t\t\t\t\t<li>Press<span class=\"keyboard-key\">↓</span> to decrease the selected number of 1 day.</li>\n\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t</li>\n\t\t\t\t\t</ul>\n\t\t\t\t\t<ul>\n\t\t\t\t\t\t<li> Inside date selector :\n\t\t\t\t\t\t\t<ul>\n\t\t\t\t\t\t\t\t<li>Press<span class=\"keyboard-key\">↑</span> to decrease the selected date of 7 day.</li>\n\t\t\t\t\t\t\t\t<li>Press<span class=\"keyboard-key\">↓</span> to increase the selected date of 7 day.</li>\n\t\t\t\t\t\t\t\t<li>Press<span class=\"keyboard-key\">←</span> to decrease the selected date of 1 day.</li>\n\t\t\t\t\t\t\t\t<li>Press<span class=\"keyboard-key\">→</span> to increase the selected date of 1 day.</li>\n\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t</li>\n\t\t\t\t\t</ul>\n\t\t\t\t</div>\n\t\t\t</div>\n\n\n\t\t</mat-card-content>\n\t</mat-card>\n\n\t<mat-card class=\"demo-card\">\n\t\t<mat-toolbar color=\"primary\">Date Range Picker & DateTime Range Picker</mat-toolbar>\n\t\t<mat-card-content>\n\t\t\t<div class=\"flex-layout\">\n\t\t\t\t<div>\n\t\t\t\t\t<h3>Date Range Picker :</h3>\n\t\t\t\t\t<mat-form-field appearance=\"fill\">\n\t\t\t\t\t\t<mat-label>Range min</mat-label>\n\t\t\t\t\t\t<deja-date-picker format=\"DD.MM.YYYY\" #dtfrom [disableDates]=\"disabledDate\" [(ngModel)]=\"dateRangeFrom\"></deja-date-picker>\n\t\t\t\t\t</mat-form-field>\n\t\t\t\t\t<mat-form-field appearance=\"fill\">\n\t\t\t\t\t\t<mat-label>Range max</mat-label>\n\t\t\t\t\t\t<deja-date-picker format=\"DD.MM.YYYY\" #dtto [disableDates]=\"disabledDate\" [(ngModel)]=\"dateRangeTo\"></deja-date-picker>\n\t\t\t\t\t</mat-form-field>\n\t\t\t\t\t<p>Selected date : from {{dateRangeFrom | date:'yyyy-MM-dd'}} to {{dateRangeTo | date:'yyyy-MM-dd'}}</p>\n\t\t\t\t</div>\n\t\t\t\t<div>\n\t\t\t\t\t<h3>DateTime Range Picker :</h3>\n\t\t\t\t\t<mat-form-field>\n\t\t\t\t\t\t<mat-label>Range min</mat-label>\n\t\t\t\t\t\t<deja-date-picker format=\"DD.MM.YYYY HH:mm\" #dtfrom [disableDates]=\"disabledDate\" [(ngModel)]=\"datetimeRangeFrom\" time></deja-date-picker>\n\t\t\t\t\t</mat-form-field>\n\t\t\t\t\t<mat-form-field>\n\t\t\t\t\t\t<mat-label>Range max</mat-label>\n\t\t\t\t\t\t<deja-date-picker format=\"DD.MM.YYYY HH:mm\" #dtto [disableDates]=\"disabledDate\" [(ngModel)]=\"datetimeRangeTo\" time></deja-date-picker>\n\t\t\t\t\t</mat-form-field>\n\t\t\t\t\t<p>Selected date : from {{datetimeRangeFrom | date:'yyyy-MM-dd HH:mm:ss'}} to {{datetimeRangeTo | date:'yyyy-MM-dd HH:mm:ss'}}</p>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</mat-card-content>\n\t</mat-card>\n\n</div>\n"

/***/ }),

/***/ "./src/app/date-picker/date-picker-demo.module.ts":
/*!********************************************************!*\
  !*** ./src/app/date-picker/date-picker-demo.module.ts ***!
  \********************************************************/
/*! exports provided: DejaDatePickerDemoModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DejaDatePickerDemoModule", function() { return DejaDatePickerDemoModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/card */ "./node_modules/@angular/material/esm5/card.es5.js");
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/toolbar */ "./node_modules/@angular/material/esm5/toolbar.es5.js");
/* harmony import */ var _deja_js_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @deja-js/component */ "./dist/deja-js/component/fesm5/deja-js-component.js");
/* harmony import */ var _component_markdown_index__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../component/markdown/index */ "./src/component/markdown/index.ts");
/* harmony import */ var _date_picker_demo__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./date-picker-demo */ "./src/app/date-picker/date-picker-demo.ts");
/* harmony import */ var _date_picker_demo_routes__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./date-picker-demo.routes */ "./src/app/date-picker/date-picker-demo.routes.ts");
/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */











var DejaDatePickerDemoModule = /** @class */ (function () {
    function DejaDatePickerDemoModule() {
    }
    DejaDatePickerDemoModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [_date_picker_demo__WEBPACK_IMPORTED_MODULE_9__["DejaDatePickerDemoComponent"]],
            exports: [_date_picker_demo__WEBPACK_IMPORTED_MODULE_9__["DejaDatePickerDemoComponent"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatFormFieldModule"],
                _angular_material_card__WEBPACK_IMPORTED_MODULE_5__["MatCardModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatCheckboxModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatTabsModule"],
                _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_6__["MatToolbarModule"],
                _deja_js_component__WEBPACK_IMPORTED_MODULE_7__["DejaDatePickerModule"],
                _deja_js_component__WEBPACK_IMPORTED_MODULE_7__["DejaDateSelectorModule"],
                _component_markdown_index__WEBPACK_IMPORTED_MODULE_8__["DejaMarkdownModule"],
                _date_picker_demo_routes__WEBPACK_IMPORTED_MODULE_10__["routing"],
            ],
            providers: [],
        })
    ], DejaDatePickerDemoModule);
    return DejaDatePickerDemoModule;
}());



/***/ }),

/***/ "./src/app/date-picker/date-picker-demo.routes.ts":
/*!********************************************************!*\
  !*** ./src/app/date-picker/date-picker-demo.routes.ts ***!
  \********************************************************/
/*! exports provided: routing */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "routing", function() { return routing; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _date_picker_demo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./date-picker-demo */ "./src/app/date-picker/date-picker-demo.ts");
/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */


var routes = [
    { path: '', component: _date_picker_demo__WEBPACK_IMPORTED_MODULE_1__["DejaDatePickerDemoComponent"] },
    { path: '**', redirectTo: '', pathMatch: 'full' },
];
var routing = _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forChild(routes);


/***/ }),

/***/ "./src/app/date-picker/date-picker-demo.scss":
/*!***************************************************!*\
  !*** ./src/app/date-picker/date-picker-demo.scss ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host .flex-layout {\n  display: flex;\n  flex-direction: row; }\n  :host .flex-layout > div {\n    flex: 1 1 auto; }\n  :host .flex-layout-center {\n  align-items: center;\n  justify-items: center; }\n  :host .flex-layout-column {\n  display: flex;\n  flex-direction: column; }\n  :host .flex-layout-wrap {\n  flex-wrap: wrap; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3RyYXZpcy9idWlsZC9EU0ktSFVHL2RlamFqcy1jb21wb25lbnRzL3NyYy9hcHAvZGF0ZS1waWNrZXIvZGF0ZS1waWNrZXItZGVtby5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBRVEsYUFBYTtFQUNiLG1CQUFtQixFQUFBO0VBSDNCO0lBS1ksY0FBYyxFQUFBO0VBTDFCO0VBVVEsbUJBQW1CO0VBQ25CLHFCQUFxQixFQUFBO0VBWDdCO0VBZVEsYUFBYTtFQUNiLHNCQUFzQixFQUFBO0VBaEI5QjtFQW9CUSxlQUFlLEVBQUEiLCJmaWxlIjoic3JjL2FwcC9kYXRlLXBpY2tlci9kYXRlLXBpY2tlci1kZW1vLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyI6aG9zdCB7XG4gICAgLmZsZXgtbGF5b3V0IHtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgICAgICAgPiBkaXYge1xuICAgICAgICAgICAgZmxleDogMSAxIGF1dG87XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAuZmxleC1sYXlvdXQtY2VudGVyIHtcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAganVzdGlmeS1pdGVtczogY2VudGVyO1xuICAgIH1cblxuICAgIC5mbGV4LWxheW91dC1jb2x1bW4ge1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIH1cblxuICAgIC5mbGV4LWxheW91dC13cmFwIHtcbiAgICAgICAgZmxleC13cmFwOiB3cmFwO1xuICAgIH1cbn0iXX0= */"

/***/ }),

/***/ "./src/app/date-picker/date-picker-demo.ts":
/*!*************************************************!*\
  !*** ./src/app/date-picker/date-picker-demo.ts ***!
  \*************************************************/
/*! exports provided: DejaDatePickerDemoComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DejaDatePickerDemoComponent", function() { return DejaDatePickerDemoComponent; });
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



var DejaDatePickerDemoComponent = /** @class */ (function () {
    function DejaDatePickerDemoComponent() {
        this.tabIndex = 1;
        this.theDate = new Date();
        this.theDateSelected = new Date();
        this.disabledDate = [0, 6, new Date(2016, 9, 12)];
        this.myLayout = _deja_js_component__WEBPACK_IMPORTED_MODULE_2__["DateComponentLayout"].timeonly;
    }
    DejaDatePickerDemoComponent.prototype.ngOnInit = function () {
        var now = new Date();
        this.dateMin = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
        this.dateMax = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        this.theDateSelected = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
        console.log(this.dateMin);
        console.log(this.dateMax);
    };
    DejaDatePickerDemoComponent.prototype.dateChange = function (date) {
        console.log('dateChange', date);
    };
    DejaDatePickerDemoComponent.prototype.timeChange = function (date) {
        console.log('timeChange', date);
    };
    DejaDatePickerDemoComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'dejadate-picker-demo',
            template: __webpack_require__(/*! ./date-picker-demo.html */ "./src/app/date-picker/date-picker-demo.html"),
            styles: [__webpack_require__(/*! ./date-picker-demo.scss */ "./src/app/date-picker/date-picker-demo.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], DejaDatePickerDemoComponent);
    return DejaDatePickerDemoComponent;
}());



/***/ })

}]);
//# sourceMappingURL=date-picker-date-picker-demo-module.js.map