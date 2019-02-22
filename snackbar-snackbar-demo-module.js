(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["snackbar-snackbar-demo-module"],{

/***/ "./src/app/snackbar/message.class.ts":
/*!*******************************************!*\
  !*** ./src/app/snackbar/message.class.ts ***!
  \*******************************************/
/*! exports provided: Message */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Message", function() { return Message; });
/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */
var Message = /** @class */ (function () {
    function Message(content, gate) {
        if (content === void 0) { content = "Some snackbar"; }
        if (gate === void 0) { gate = true; }
        this.content = content;
        this.gate = gate;
    }
    return Message;
}());



/***/ }),

/***/ "./src/app/snackbar/snackbar-demo.html":
/*!*********************************************!*\
  !*** ./src/app/snackbar/snackbar-demo.html ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-tab-group [selectedIndex]=\"tabIndex\" (selectedTabChange)=\"tabIndex = $event.index\">\n\t<!--<mat-tab label=\"OVERVIEW\">-->\n\t<!--<mat-card class=\"demo-card demo-basic\">-->\n\t<!--TODO-->\n\t<!--</mat-card>-->\n\t<!--</mat-tab>-->\n\t<mat-tab label=\"API REFERENCE\"></mat-tab>\n\t<mat-tab label=\"EXAMPLES\"></mat-tab>\n</mat-tab-group>\n\n<mat-card class=\"demo-card demo-basic\" *ngIf=\"tabIndex === 0\">\n\t<deja-markdown [url]=\"'https://raw.githubusercontent.com/DSI-HUG/dejajs-components/dev/src/component/snackbar/readme.md'\"></deja-markdown>\n</mat-card>\n\n<div class=\"demo-card\" *ngIf=\"tabIndex === 1\">\n\t<!--\n\t\t\timportant:\n\n\t\t\tusing web-animations-js polyfill is mandatory for IE & Safari because\n\t\t\tthey don't implement the Web Animation API natively\n\n\t\t\tnote:\n\t\t\tthe graphic representation of the snackbar has no link with it's implementation beside it's size (see impl)\n\t\t\tthe graphic impl proposed here may be impl in the future as a separate component\n\t\t\tit may be something that looks like a mat-card but with context property defining the context (danger, warning, success, info, simple)\n\t\t\twhich will be translated to it's color and z index\n\t\t\t-->\n\n\t<!--\n\t\t\ttodo\n\t\t\tcheck body position if scrollHeight > viewportHeight\n\t\t\tcheck if html container but !outerContainerElement => position on viewport\n\t\t-->\n\n\t<div id=\"btnContainer\">\n\t\t<button mat-raised-button [style.background]=\"danger\" (click)=\"push.emit('danger')\">Danger</button>\n\t\t<button mat-raised-button [style.background]=\"warning\" (click)=\"push.emit('warning')\">Warning</button>\n\t\t<button mat-raised-button [style.background]=\"success\" (click)=\"push.emit('success')\">Success</button>\n\t\t<button mat-raised-button [style.background]=\"info\" (click)=\"push.emit('info')\">Info</button>\n\t\t<button mat-raised-button (click)=\"simpleGate = true\">Simple</button>\n\t</div>\n\n\t<!-- simple use case, single snackbar -->\n\t<deja-snackbar *ngIf=\"simpleGate\" alignment=\"top left\" [duration]=\"2000\" (onAnimationDone)=\"simpleGate = false\">\n\t\t<deja-message-box type=\"primary\" horizontal>\n\t\t\tHello world ! I'm a simple snackbar.\n\t\t</deja-message-box>\n\t</deja-snackbar>\n\n\t<!-- event driven from UI -->\n\t<!-- this behavior is to be used to react to user behavior on the UI, snackbars MUST be disposed using user interraction -->\n\n\t<!--inside a container-->\n\t<section #containerEl id=\"container\" [style.position]=\"'relative'\">\n\t\t<ng-template ngFor let-message [ngForOf]=\"infos | async\">\n\t\t\t<deja-snackbar *ngIf=\"message.gate\" alignment=\"right\" [outerContainerElement]=\"containerEl\">\n\t\t\t\t<deja-message-box type=\"primary\" horizontal>\n\t\t\t\t\t{{message.content}}\n\t\t\t\t\t<ng-template #actionsTemplate>\n\t\t\t\t\t\t<button mat-mini-fab class=\"action-button\" [color]=\"'blank'\" (click)=\"message.gate = false\">\n\t\t\t\t\t\t\t<mat-icon>clear</mat-icon>\n\t\t\t\t\t\t</button>\n\t\t\t\t\t</ng-template>\n\t\t\t\t</deja-message-box>\n\t\t\t</deja-snackbar>\n\t\t</ng-template>\n\t</section>\n\n\t<!--on the viewport-->\n\t<ng-template ngFor let-message [ngForOf]=\"successes | async\">\n\t\t<deja-snackbar *ngIf=\"message.gate\" alignment=\"bottom left\">\n\t\t\t<deja-message-box type=\"success\" horizontal>\n\t\t\t\t{{message.content}}\n\t\t\t\t<ng-template #actionsTemplate>\n\t\t\t\t\t<button mat-mini-fab class=\"action-button\" [color]=\"'blank'\" (click)=\"message.gate = false\">\n\t\t\t\t\t\t<mat-icon>clear</mat-icon>\n\t\t\t\t\t</button>\n\t\t\t\t</ng-template>\n\t\t\t</deja-message-box>\n\t\t</deja-snackbar>\n\t</ng-template>\n\n\t<ng-template ngFor let-message [ngForOf]=\"warnings | async\">\n\t\t<deja-snackbar *ngIf=\"message.gate\" alignment=\"bottom\">\n\t\t\t<deja-message-box type=\"warn\" horizontal>\n\t\t\t\t{{message.content}}\n\t\t\t\t<ng-template #actionsTemplate>\n\t\t\t\t\t<button mat-mini-fab class=\"action-button\" [color]=\"'blank'\" (click)=\"message.gate = false\">\n\t\t\t\t\t\t<mat-icon>clear</mat-icon>\n\t\t\t\t\t</button>\n\t\t\t\t</ng-template>\n\t\t\t</deja-message-box>\n\t\t</deja-snackbar>\n\t</ng-template>\n\n\t<ng-template ngFor let-message [ngForOf]=\"dangers | async\">\n\t\t<deja-snackbar *ngIf=\"message.gate\" alignment=\"bottom right\">\n\t\t\t<deja-message-box type=\"danger\" horizontal>\n\t\t\t\t{{message.content}}\n\t\t\t\t<ng-template #actionsTemplate>\n\t\t\t\t\t<button mat-mini-fab class=\"action-button\" [color]=\"'blank'\" (click)=\"message.gate = false\">\n\t\t\t\t\t\t<mat-icon>clear</mat-icon>\n\t\t\t\t\t</button>\n\t\t\t\t</ng-template>\n\t\t\t</deja-message-box>\n\t\t</deja-snackbar>\n\t</ng-template>\n\n\t<section style=\"width: 400px; height: 4000px; border: red solid 1px;\">\n\t\t<!-- server push like feed -->\n\t\t<!-- this behavior is to be used to push message to the client for example, snackbars MUST be displosed by themself -->\n\t\t<!-- to do so, define duration @Input and negate flag used for disposal using the onAnimationDone @Output -->\n\t\t<ng-template ngFor let-message [ngForOf]=\"messages | async\">\n\t\t\t<deja-snackbar *ngIf=\"message.gate\" alignment=\"left\" [duration]=\"5000\" (onAnimationDone)=\"message.gate = false\">\n\t\t\t\t<deja-message-box type=\"primary\" horizontal>\n\t\t\t\t\t{{message.content}}\n\t\t\t\t</deja-message-box>\n\t\t\t</deja-snackbar>\n\t\t</ng-template>\n\t</section>\n</div>"

/***/ }),

/***/ "./src/app/snackbar/snackbar-demo.module.ts":
/*!**************************************************!*\
  !*** ./src/app/snackbar/snackbar-demo.module.ts ***!
  \**************************************************/
/*! exports provided: DejaSnackbarDemoModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DejaSnackbarDemoModule", function() { return DejaSnackbarDemoModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/card */ "./node_modules/@angular/material/esm5/card.es5.js");
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/toolbar */ "./node_modules/@angular/material/esm5/toolbar.es5.js");
/* harmony import */ var _deja_js_component_message_box__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @deja-js/component/message-box */ "./dist/deja-js/component/fesm5/deja-js-component-message-box.js");
/* harmony import */ var _deja_js_component_snackbar__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @deja-js/component/snackbar */ "./dist/deja-js/component/fesm5/deja-js-component-snackbar.js");
/* harmony import */ var _component_markdown_index__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../component/markdown/index */ "./src/component/markdown/index.ts");
/* harmony import */ var _snackbar_demo__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./snackbar-demo */ "./src/app/snackbar/snackbar-demo.ts");
/* harmony import */ var _snackbar_demo_routes__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./snackbar-demo.routes */ "./src/app/snackbar/snackbar-demo.routes.ts");
/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */












var DejaSnackbarDemoModule = /** @class */ (function () {
    function DejaSnackbarDemoModule() {
    }
    DejaSnackbarDemoModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [_snackbar_demo__WEBPACK_IMPORTED_MODULE_10__["DejaSnackbarDemoComponent"]],
            exports: [_snackbar_demo__WEBPACK_IMPORTED_MODULE_10__["DejaSnackbarDemoComponent"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatButtonModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatIconModule"],
                _angular_material_card__WEBPACK_IMPORTED_MODULE_5__["MatCardModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatTabsModule"],
                _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_6__["MatToolbarModule"],
                _deja_js_component_snackbar__WEBPACK_IMPORTED_MODULE_8__["DejaSnackbarModule"],
                _component_markdown_index__WEBPACK_IMPORTED_MODULE_9__["DejaMarkdownModule"],
                _deja_js_component_message_box__WEBPACK_IMPORTED_MODULE_7__["DejaMessageBoxModule"],
                _snackbar_demo_routes__WEBPACK_IMPORTED_MODULE_11__["routing"],
            ],
            providers: [],
        })
    ], DejaSnackbarDemoModule);
    return DejaSnackbarDemoModule;
}());



/***/ }),

/***/ "./src/app/snackbar/snackbar-demo.routes.ts":
/*!**************************************************!*\
  !*** ./src/app/snackbar/snackbar-demo.routes.ts ***!
  \**************************************************/
/*! exports provided: routing */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "routing", function() { return routing; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _snackbar_demo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./snackbar-demo */ "./src/app/snackbar/snackbar-demo.ts");
/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */


var routes = [
    { path: '', component: _snackbar_demo__WEBPACK_IMPORTED_MODULE_1__["DejaSnackbarDemoComponent"] },
    { path: '**', redirectTo: '', pathMatch: 'full' },
];
var routing = _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forChild(routes);


/***/ }),

/***/ "./src/app/snackbar/snackbar-demo.scss":
/*!*********************************************!*\
  !*** ./src/app/snackbar/snackbar-demo.scss ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/* These styles are used for demo purposes only, you don't need to use them at all. */\n:host #container {\n  display: block;\n  margin: auto;\n  max-width: 800px;\n  max-height: 800px;\n  min-height: 400px;\n  box-sizing: border-box;\n  border: solid black 1px; }\n:host .snackbarContent {\n  display: flex;\n  justify-content: space-between;\n  border-radius: 1px;\n  box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12), 0 3px 5px -1px rgba(0, 0, 0, 0.4); }\n:host .snackbarContent span {\n    margin: 12px 0px 12px 12px; }\n:host #btnContainer {\n  width: 500px;\n  margin: auto;\n  margin-bottom: 12px; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3RyYXZpcy9idWlsZC9EU0ktSFVHL2RlamFqcy1jb21wb25lbnRzL3NyYy9hcHAvc25hY2tiYXIvc25hY2tiYXItZGVtby5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLHFGQUFBO0FBRUE7RUFFUSxjQUFjO0VBQ2QsWUFBWTtFQUNaLGdCQUFnQjtFQUNoQixpQkFBaUI7RUFDakIsaUJBQWlCO0VBQ2pCLHNCQUFzQjtFQUN0Qix1QkFBa0MsRUFBQTtBQVIxQztFQWFRLGFBQWE7RUFHYiw4QkFBOEI7RUFDOUIsa0JBQWtCO0VBQ2xCLGlIQUFpSCxFQUFBO0FBbEJ6SDtJQXFCWSwwQkFBMEIsRUFBQTtBQXJCdEM7RUF5QlEsWUFBWTtFQUNaLFlBQVk7RUFDWixtQkFBbUIsRUFBQSIsImZpbGUiOiJzcmMvYXBwL3NuYWNrYmFyL3NuYWNrYmFyLWRlbW8uc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIFRoZXNlIHN0eWxlcyBhcmUgdXNlZCBmb3IgZGVtbyBwdXJwb3NlcyBvbmx5LCB5b3UgZG9uJ3QgbmVlZCB0byB1c2UgdGhlbSBhdCBhbGwuICovXG5cbjpob3N0IHtcbiAgICAjY29udGFpbmVyIHtcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgIG1hcmdpbjogYXV0bztcbiAgICAgICAgbWF4LXdpZHRoOiA4MDBweDtcbiAgICAgICAgbWF4LWhlaWdodDogODAwcHg7XG4gICAgICAgIG1pbi1oZWlnaHQ6IDQwMHB4O1xuICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgICAgICBib3JkZXI6IHNvbGlkIHJnYmEoMCwgMCwgMCwgMSkgMXB4O1xuICAgIH1cbiAgICAuc25hY2tiYXJDb250ZW50IHtcbiAgICAgICAgZGlzcGxheTogLXdlYmtpdC1ib3g7XG4gICAgICAgIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAtd2Via2l0LWJveC1wYWNrOiBqdXN0aWZ5O1xuICAgICAgICAtbXMtZmxleC1wYWNrOiBqdXN0aWZ5O1xuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDFweDtcbiAgICAgICAgYm94LXNoYWRvdzogMCA2cHggMTBweCAwIHJnYmEoMCwgMCwgMCwgMC4xNCksIDAgMXB4IDE4cHggMCByZ2JhKDAsIDAsIDAsIDAuMTIpLCAwIDNweCA1cHggLTFweCByZ2JhKDAsIDAsIDAsIDAuNCk7XG5cbiAgICAgICAgc3BhbiB7XG4gICAgICAgICAgICBtYXJnaW46IDEycHggMHB4IDEycHggMTJweDtcbiAgICAgICAgfVxuICAgIH1cbiAgICAjYnRuQ29udGFpbmVyIHtcbiAgICAgICAgd2lkdGg6IDUwMHB4O1xuICAgICAgICBtYXJnaW46IGF1dG87XG4gICAgICAgIG1hcmdpbi1ib3R0b206IDEycHg7XG4gICAgfVxufSJdfQ== */"

/***/ }),

/***/ "./src/app/snackbar/snackbar-demo.ts":
/*!*******************************************!*\
  !*** ./src/app/snackbar/snackbar-demo.ts ***!
  \*******************************************/
/*! exports provided: DejaSnackbarDemoComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DejaSnackbarDemoComponent", function() { return DejaSnackbarDemoComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _deja_js_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @deja-js/core */ "./dist/deja-js/core/fesm5/deja-js-core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _message_class__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./message.class */ "./src/app/snackbar/message.class.ts");
/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */






var DejaSnackbarDemoComponent = /** @class */ (function () {
    function DejaSnackbarDemoComponent() {
        this.tabIndex = 1;
        this.push = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
    }
    DejaSnackbarDemoComponent.prototype.ngOnInit = function () {
        // tslint:disable-next-line:no-string-literal
        this.colors = new _deja_js_core__WEBPACK_IMPORTED_MODULE_2__["MaterialColors"]()['palet'];
        this.danger = this.colors['mat-red']['500'];
        this.warning = this.colors['mat-orange']['500'];
        this.success = this.colors['mat-green']['500'];
        this.info = this.colors['mat-blue']['500'];
        this.default = this.colors['mat-grey']['900'];
        this.dangers = Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["from"])(this.push).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["filter"])(function (type) { return type === 'danger'; }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function () { return new _message_class__WEBPACK_IMPORTED_MODULE_5__["Message"]('Danger snackbar'); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["scan"])(function (acc, curr) { return acc.concat([curr]); }, []), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["defaultIfEmpty"])([]));
        this.warnings = Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["from"])(this.push).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["filter"])(function (type) { return type === 'warning'; }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function () { return new _message_class__WEBPACK_IMPORTED_MODULE_5__["Message"]('Warning snackbar'); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["scan"])(function (acc, curr) { return acc.concat([curr]); }, []), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["defaultIfEmpty"])([]));
        this.successes = Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["from"])(this.push).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["filter"])(function (type) { return type === 'success'; }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function () { return new _message_class__WEBPACK_IMPORTED_MODULE_5__["Message"]('Success snackbar'); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["scan"])(function (acc, curr) { return acc.concat([curr]); }, []), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["defaultIfEmpty"])([]));
        this.infos = Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["from"])(this.push).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["filter"])(function (type) { return type === 'info'; }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function () { return new _message_class__WEBPACK_IMPORTED_MODULE_5__["Message"]('Info snackbar'); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["scan"])(function (acc, curr) { return acc.concat([curr]); }, []), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["defaultIfEmpty"])([]));
        this.messages = Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["interval"])(2000).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function () { return new _message_class__WEBPACK_IMPORTED_MODULE_5__["Message"]('Server push snackbar'); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["scan"])(function (acc, curr) { return acc.concat([curr]); }, []), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["defaultIfEmpty"])([]));
    };
    DejaSnackbarDemoComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'deja-snackbar-demo',
            template: __webpack_require__(/*! ./snackbar-demo.html */ "./src/app/snackbar/snackbar-demo.html"),
            styles: [__webpack_require__(/*! ./snackbar-demo.scss */ "./src/app/snackbar/snackbar-demo.scss")]
        })
    ], DejaSnackbarDemoComponent);
    return DejaSnackbarDemoComponent;
}());



/***/ })

}]);
//# sourceMappingURL=snackbar-snackbar-demo-module.js.map