(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["overlay-overlay-demo-module"],{

/***/ "./src/app/overlay/overlay-demo.html":
/*!*******************************************!*\
  !*** ./src/app/overlay/overlay-demo.html ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-tab-group [selectedIndex]=\"tabIndex\" (selectedTabChange)=\"tabIndex = $event.index\">\n\t<!--<mat-tab label=\"OVERVIEW\">-->\n\t<!--<mat-card class=\"demo-card demo-basic\">-->\n\t<!--TODO-->\n\t<!--</mat-card>-->\n\t<!--</mat-tab>-->\n\t<mat-tab label=\"API REFERENCE\"> </mat-tab>\n\t<mat-tab label=\"EXAMPLES\"></mat-tab>\n</mat-tab-group>\n\n<mat-card class=\"demo-card demo-basic\" *ngIf=\"tabIndex === 0\">\n\tTODO\n</mat-card>\n\n<div *ngIf=\"tabIndex === 1\" (contextmenu)=\"onContextMenu($event)\">\n\t<deja-overlay #contextMenu>\n\t\t<div class=\"deja-menu-content\">\n\t\t\t<ul>\n\t\t\t\t<li class=\"menu-item\" (click)=\"contextMenu.close()\">\n\t\t\t\t\t<mat-icon>delete_sweep</mat-icon> Context menu\n\t\t\t\t</li>\n\t\t\t\t<li class=\"menu-item\" (click)=\"contextMenu.close()\">\n\t\t\t\t\t<mat-icon>content_copy</mat-icon> Dupliquer\n\t\t\t\t</li>\n\t\t\t\t<li class=\"menu-item\" (click)=\"contextMenu.close()\">\n\t\t\t\t\t<mat-icon>edit</mat-icon> Editer\n\t\t\t\t</li>\n\t\t\t</ul>\n\t\t</div>\n\t</deja-overlay>\n\t<mat-card class=\"demo-card\">\n\t\t<mat-toolbar color=\"primary\">Overlay</mat-toolbar>\n\t\t<mat-card-content>\n\t\t\t<deja-overlay #posYMenu>\n\t\t\t\t<div class=\"deja-menu-content\">\n\t\t\t\t\t<ul>\n\t\t\t\t\t\t<li class=\"menu-item\" (click)=\"posYMenu.close()\">\n\t\t\t\t\t\t\t<mat-icon>delete_sweep</mat-icon> Supprimer\n\t\t\t\t\t\t</li>\n\t\t\t\t\t\t<li class=\"menu-item\" (click)=\"posYMenu.close()\">\n\t\t\t\t\t\t\t<mat-icon>content_copy</mat-icon> Dupliquer\n\t\t\t\t\t\t</li>\n\t\t\t\t\t\t<li class=\"menu-item\" (click)=\"posYMenu.close()\">\n\t\t\t\t\t\t\t<mat-icon>edit</mat-icon> Editer\n\t\t\t\t\t\t</li>\n\t\t\t\t\t</ul>\n\t\t\t\t</div>\n\t\t\t</deja-overlay>\n\n\t\t\t<div id=\"demo-deja-menu\">\n\t\t\t\t<div class=\"menu-section\">\n\t\t\t\t\t<p>You clicked on: {{ selected }}</p>\n\n\t\t\t\t\t<mat-toolbar>\n\t\t\t\t\t\t<button mat-icon-button (click)=\"menu.show($event)\">\n\t\t\t\t\t\t\t<mat-icon>more_vert</mat-icon>\n\t\t\t\t\t\t</button>\n\t\t\t\t\t</mat-toolbar>\n\n\t\t\t\t\t<deja-overlay #menu>\n\t\t\t\t\t\t<div class=\"deja-menu-content\">\n\t\t\t\t\t\t\t<button class=\"menu-item\" *ngFor=\"let item of items\" (click)=\"select(item.text); menu.close()\">\n\t\t\t\t\t\t\t\t{{ item.text }}\n\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</deja-overlay>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"menu-section\">\n\t\t\t\t\t<p> Clicking these will navigate:</p>\n\t\t\t\t\t<mat-toolbar>\n\t\t\t\t\t\t<button mat-icon-button (click)=\"anchorMenu.show($event)\">\n\t\t\t\t\t\t\t<mat-icon>more_vert</mat-icon>\n\t\t\t\t\t\t</button>\n\t\t\t\t\t</mat-toolbar>\n\n\t\t\t\t\t<deja-overlay #anchorMenu>\n\t\t\t\t\t\t<div id=\"anchorMenu\" class=\"deja-menu-content\">\n\t\t\t\t\t\t\t<a class=\"menu-item\" *ngFor=\"let item of items\" href=\"http://www.google.com\">\n                                {{ item.text }}\n                            </a>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</deja-overlay>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"menu-section\">\n\t\t\t\t\t<p>\n\t\t\t\t\t\tWith buttons position before\n\t\t\t\t\t</p>\n\t\t\t\t\t<mat-toolbar class=\"end-icon\">\n\t\t\t\t\t\t<button mat-icon-button (click)=\"posXMenu.show($event)\">\n\t\t\t\t\t\t\t<mat-icon>more_vert</mat-icon>\n\t\t\t\t\t\t</button>\n\t\t\t\t\t</mat-toolbar>\n\n\t\t\t\t\t<deja-overlay #posXMenu class=\"before\" positions=\"end bottom end top\">\n\t\t\t\t\t\t<div class=\"deja-menu-content\">\n\t\t\t\t\t\t\t<button class=\"menu-item\" *ngFor=\"let item of items\" (click)=\"posXMenu.close()\">\n\t\t\t\t\t\t\t\t{{ item.text }}\n\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</deja-overlay>\n\t\t\t\t</div>\n\n\t\t\t\t<div class=\"menu-section\">\n\t\t\t\t\t<p>\n\t\t\t\t\t\tWith ul/li, position top\n\t\t\t\t\t</p>\n\t\t\t\t\t<mat-toolbar>\n\t\t\t\t\t\t<button mat-icon-button (click)=\"posYMenu.show($event)\">\n\t\t\t\t\t\t\t<mat-icon>more_vert</mat-icon>\n\t\t\t\t\t\t</button>\n\t\t\t\t\t</mat-toolbar>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</mat-card-content>\n\t</mat-card>\n</div>"

/***/ }),

/***/ "./src/app/overlay/overlay-demo.module.ts":
/*!************************************************!*\
  !*** ./src/app/overlay/overlay-demo.module.ts ***!
  \************************************************/
/*! exports provided: DejaOverlayDemoModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DejaOverlayDemoModule", function() { return DejaOverlayDemoModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/card */ "./node_modules/@angular/material/esm5/card.es5.js");
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/toolbar */ "./node_modules/@angular/material/esm5/toolbar.es5.js");
/* harmony import */ var _deja_js_component_overlay__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @deja-js/component/overlay */ "./dist/deja-js/component/fesm5/deja-js-component-overlay.js");
/* harmony import */ var _component_markdown_index__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../component/markdown/index */ "./src/component/markdown/index.ts");
/* harmony import */ var _overlay_demo__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./overlay-demo */ "./src/app/overlay/overlay-demo.ts");
/* harmony import */ var _overlay_demo_routes__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./overlay-demo.routes */ "./src/app/overlay/overlay-demo.routes.ts");
/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */











var DejaOverlayDemoModule = /** @class */ (function () {
    function DejaOverlayDemoModule() {
    }
    DejaOverlayDemoModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [_overlay_demo__WEBPACK_IMPORTED_MODULE_9__["DejaOverlayDemoComponent"]],
            exports: [_overlay_demo__WEBPACK_IMPORTED_MODULE_9__["DejaOverlayDemoComponent"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatButtonModule"],
                _angular_material_card__WEBPACK_IMPORTED_MODULE_5__["MatCardModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatIconModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatTabsModule"],
                _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_6__["MatToolbarModule"],
                _deja_js_component_overlay__WEBPACK_IMPORTED_MODULE_7__["DejaOverlayModule"],
                _component_markdown_index__WEBPACK_IMPORTED_MODULE_8__["DejaMarkdownModule"],
                _overlay_demo_routes__WEBPACK_IMPORTED_MODULE_10__["routing"],
            ],
            providers: [],
        })
    ], DejaOverlayDemoModule);
    return DejaOverlayDemoModule;
}());



/***/ }),

/***/ "./src/app/overlay/overlay-demo.routes.ts":
/*!************************************************!*\
  !*** ./src/app/overlay/overlay-demo.routes.ts ***!
  \************************************************/
/*! exports provided: routing */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "routing", function() { return routing; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _overlay_demo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./overlay-demo */ "./src/app/overlay/overlay-demo.ts");
/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */


var routes = [
    { path: '', component: _overlay_demo__WEBPACK_IMPORTED_MODULE_1__["DejaOverlayDemoComponent"] },
    { path: '**', redirectTo: '', pathMatch: 'full' },
];
var routing = _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forChild(routes);


/***/ }),

/***/ "./src/app/overlay/overlay-demo.scss":
/*!*******************************************!*\
  !*** ./src/app/overlay/overlay-demo.scss ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "deja-overlay-demo #demo-deja-menu {\n  display: flex;\n  flex-flow: row; }\n  deja-overlay-demo #demo-deja-menu .menu-section {\n    width: 300px;\n    margin: 0.5rem; }\n  deja-overlay-demo #demo-deja-menu .end-icon {\n    align-items: flex-end; }\n  .deja-overlay-container .deja-menu-content#anchorMenu .menu-item {\n  white-space: nowrap;\n  padding: 0.5rem 2rem; }\n  .deja-overlay-container .deja-menu-content .mat-icon {\n  margin-right: 0.5rem; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3RyYXZpcy9idWlsZC9EU0ktSFVHL2RlamFqcy1jb21wb25lbnRzL3NyYy9hcHAvb3ZlcmxheS9vdmVybGF5LWRlbW8uc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUVFLGFBQWE7RUFDYixjQUFjLEVBQUE7RUFIaEI7SUFLRyxZQUFZO0lBQ1osY0FBYyxFQUFBO0VBTmpCO0lBU0cscUJBQXFCLEVBQUE7RUFLeEI7RUFJSSxtQkFBbUI7RUFDbkIsb0JBQW9CLEVBQUE7RUFMeEI7RUFVRyxvQkFBb0IsRUFBQSIsImZpbGUiOiJzcmMvYXBwL292ZXJsYXkvb3ZlcmxheS1kZW1vLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJkZWphLW92ZXJsYXktZGVtbyB7XG5cdCNkZW1vLWRlamEtbWVudSB7XG5cdFx0ZGlzcGxheTogZmxleDtcblx0XHRmbGV4LWZsb3c6IHJvdztcblx0XHQubWVudS1zZWN0aW9uIHtcblx0XHRcdHdpZHRoOiAzMDBweDtcblx0XHRcdG1hcmdpbjogMC41cmVtO1xuXHRcdH1cblx0XHQuZW5kLWljb24ge1xuXHRcdFx0YWxpZ24taXRlbXM6IGZsZXgtZW5kO1xuXHRcdH1cblx0fVxufVxuXG4uZGVqYS1vdmVybGF5LWNvbnRhaW5lciB7XG5cdC5kZWphLW1lbnUtY29udGVudCB7XG5cdFx0JiNhbmNob3JNZW51IHtcblx0XHRcdC5tZW51LWl0ZW0ge1xuXHRcdFx0XHR3aGl0ZS1zcGFjZTogbm93cmFwO1xuXHRcdFx0XHRwYWRkaW5nOiAwLjVyZW0gMnJlbTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQubWF0LWljb24ge1xuXHRcdFx0bWFyZ2luLXJpZ2h0OiAwLjVyZW07XG5cdFx0fVxuXHR9XG59Il19 */"

/***/ }),

/***/ "./src/app/overlay/overlay-demo.ts":
/*!*****************************************!*\
  !*** ./src/app/overlay/overlay-demo.ts ***!
  \*****************************************/
/*! exports provided: DejaOverlayDemoComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DejaOverlayDemoComponent", function() { return DejaOverlayDemoComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _deja_js_component_overlay__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @deja-js/component/overlay */ "./dist/deja-js/component/fesm5/deja-js-component-overlay.js");
/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */



var DejaOverlayDemoComponent = /** @class */ (function () {
    function DejaOverlayDemoComponent() {
        this.selected = '';
        this.items = [
            { text: 'Refresh' },
            { text: 'Settings' },
            { text: 'Help', disabled: true },
            { text: 'Sign Out' },
        ];
        this.tabIndex = 1;
    }
    DejaOverlayDemoComponent.prototype.select = function (text) { this.selected = text; };
    DejaOverlayDemoComponent.prototype.onContextMenu = function (event) {
        var parent = event.currentTarget;
        var parentRect = parent.getBoundingClientRect();
        this.contextMenu.show(event.pageX - parentRect.left, event.pageY - parentRect.top);
        event.preventDefault();
        return false;
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('contextMenu'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _deja_js_component_overlay__WEBPACK_IMPORTED_MODULE_2__["DejaOverlayComponent"])
    ], DejaOverlayDemoComponent.prototype, "contextMenu", void 0);
    DejaOverlayDemoComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewEncapsulation"].None,
            selector: 'deja-overlay-demo',
            template: __webpack_require__(/*! ./overlay-demo.html */ "./src/app/overlay/overlay-demo.html"),
            styles: [__webpack_require__(/*! ./overlay-demo.scss */ "./src/app/overlay/overlay-demo.scss")]
        })
    ], DejaOverlayDemoComponent);
    return DejaOverlayDemoComponent;
}());



/***/ })

}]);
//# sourceMappingURL=overlay-overlay-demo-module.js.map