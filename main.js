(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./dist/deja-js/component/fesm5/deja-js-component-sidenav.js":
/*!*******************************************************************!*\
  !*** ./dist/deja-js/component/fesm5/deja-js-component-sidenav.js ***!
  \*******************************************************************/
/*! exports provided: DejaSidenavModule, DejaSidenavComponent, DejaSidenavMenuDirective, DejaSidenavContentDirective, DejaSidenavMenuSeparatorDirective, DejaSidenavHeaderDirective, DejaSidenavService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DejaSidenavModule", function() { return DejaSidenavModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DejaSidenavComponent", function() { return DejaSidenavComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DejaSidenavMenuDirective", function() { return DejaSidenavMenuDirective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DejaSidenavContentDirective", function() { return DejaSidenavContentDirective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DejaSidenavMenuSeparatorDirective", function() { return DejaSidenavMenuSeparatorDirective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DejaSidenavHeaderDirective", function() { return DejaSidenavHeaderDirective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DejaSidenavService", function() { return DejaSidenavService; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/cdk/coercion */ "./node_modules/@angular/cdk/esm5/coercion.es5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _deja_js_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @deja-js/core */ "./dist/deja-js/core/fesm5/deja-js-core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");









/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var DejaSidenavContentDirective = /** @class */ (function () {
    function DejaSidenavContentDirective() {
    }
    DejaSidenavContentDirective.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_7__["Directive"], args: [{
                    selector: 'deja-sidenav-content, [deja-sidenav-content]'
                },] }
    ];
    /** @nocollapse */
    DejaSidenavContentDirective.ctorParameters = function () { return []; };
    return DejaSidenavContentDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var DejaSidenavHeaderDirective = /** @class */ (function () {
    function DejaSidenavHeaderDirective() {
    }
    DejaSidenavHeaderDirective.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_7__["Directive"], args: [{
                    selector: 'deja-sidenav-header, [deja-sidenav-header]'
                },] }
    ];
    /** @nocollapse */
    DejaSidenavHeaderDirective.ctorParameters = function () { return []; };
    return DejaSidenavHeaderDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var DejaSidenavMenuDirective = /** @class */ (function () {
    function DejaSidenavMenuDirective() {
    }
    DejaSidenavMenuDirective.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_7__["Directive"], args: [{
                    selector: 'deja-sidenav-menu, [deja-sidenav-menu]'
                },] }
    ];
    /** @nocollapse */
    DejaSidenavMenuDirective.ctorParameters = function () { return []; };
    return DejaSidenavMenuDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var DejaSidenavMenuSeparatorDirective = /** @class */ (function () {
    function DejaSidenavMenuSeparatorDirective(el) {
        Object.assign(el.nativeElement.style, {
            display: 'block',
            background: 'rgba(0, 0, 0, 0.14)',
            height: '1px',
            margin: '8px 0'
        });
    }
    DejaSidenavMenuSeparatorDirective.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_7__["Directive"], args: [{
                    selector: 'deja-sidenav-menu-separator, [deja-sidenav-menu-separator]'
                },] }
    ];
    /** @nocollapse */
    DejaSidenavMenuSeparatorDirective.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_7__["ElementRef"] }
    ]; };
    return DejaSidenavMenuSeparatorDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var DejaSidenavService = /** @class */ (function () {
    function DejaSidenavService() {
        this.mode = 'side';
        this.hidden = false;
    }
    /**
     * @return {?}
     */
    DejaSidenavService.prototype.open = /**
     * @return {?}
     */
    function () {
        this.opened = true;
    };
    /**
     * @return {?}
     */
    DejaSidenavService.prototype.close = /**
     * @return {?}
     */
    function () {
        this.opened = false;
    };
    /**
     * @return {?}
     */
    DejaSidenavService.prototype.toggle = /**
     * @return {?}
     */
    function () {
        this.opened = !this.opened;
    };
    DejaSidenavService.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_7__["Injectable"] }
    ];
    /** @nocollapse */
    DejaSidenavService.ctorParameters = function () { return []; };
    return DejaSidenavService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var DejaSidenavComponent = /** @class */ (function () {
    function DejaSidenavComponent(sidenavService, mediaService, router, activatedRoute, changeDetectorRef) {
        var _this = this;
        this.sidenavService = sidenavService;
        this.mediaService = mediaService;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.changeDetectorRef = changeDetectorRef;
        this.headerText = 'TITLE';
        this.headerIcon = 'face';
        this.mode = 'side';
        this._showToolbar = false;
        this.ngUnsubscribe = new rxjs__WEBPACK_IMPORTED_MODULE_5__["Subject"]();
        Object(rxjs__WEBPACK_IMPORTED_MODULE_5__["from"])(this.mediaService.mediaChanged$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["takeUntil"])(this.ngUnsubscribe))
            .subscribe((/**
         * @param {?} alias
         * @return {?}
         */
        function (alias) {
            _this.sidenavService.hidden = alias === 'xs';
            _this.sidenavService.opened = alias === 'lg';
            _this.sidenavService.mode = alias === 'xs' ? 'over' : 'side';
            _this.changeDetectorRef.markForCheck();
        }));
    }
    Object.defineProperty(DejaSidenavComponent.prototype, "showToolbar", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._showToolbar = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_2__["coerceBooleanProperty"])(value);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DejaSidenavComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        // Initialize
        this.title = this.getActivatedRouteLastChild().data["title"];
        // Listen for future route changes
        this.router.events.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["takeUntil"])(this.ngUnsubscribe), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["filter"])((/**
         * @param {?} event
         * @return {?}
         */
        function (event) { return event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_3__["NavigationEnd"]; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["map"])((/**
         * @return {?}
         */
        function () { return _this.activatedRoute; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["map"])((/**
         * @param {?} route
         * @return {?}
         */
        function (route) {
            while (route.firstChild) {
                route = route.firstChild;
            }
            return route;
        })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["filter"])((/**
         * @param {?} route
         * @return {?}
         */
        function (route) { return route.outlet === 'primary'; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["mergeMap"])((/**
         * @param {?} route
         * @return {?}
         */
        function (route) { return route.data; })))
            .subscribe((/**
         * @param {?} event
         * @return {?}
         */
        function (event) { return _this.title = event["title"]; }));
    };
    /**
     * @return {?}
     */
    DejaSidenavComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    };
    /**
     * @private
     * @return {?}
     */
    DejaSidenavComponent.prototype.getActivatedRouteLastChild = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var route = this.activatedRoute.snapshot.root;
        while (route.firstChild) {
            route = route.firstChild;
        }
        return route;
    };
    DejaSidenavComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_7__["Component"], args: [{
                    encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_7__["ViewEncapsulation"].None,
                    selector: 'deja-sidenav',
                    template: "<mat-sidenav-container [class.sidenav-hidden]=\"sidenavService.hidden\" [class.sidenav-light]=\"!sidenavService.hidden && !sidenavService.opened\">\n    <mat-sidenav [(opened)]=\"sidenavService.opened\" [mode]=\"sidenavService.mode\">\n        <mat-toolbar class=\"header\">\n            <mat-icon class=\"header-icon\">headerIcon</mat-icon>\n            <span class=\"header-text\">{{headerText}}</span>\n            <button type=\"button\" mat-icon-button class=\"header-menu-btn\" (click)=\"sidenavService.toggle()\">\n                <mat-icon>{{!sidenavService.hidden && !sidenavService.opened ? 'menu' : 'keyboard_arrow_left'}}</mat-icon>\n            </button>\n        </mat-toolbar>\n        <ng-content select=\"deja-sidenav-menu\"></ng-content>\n    </mat-sidenav>\n\n    <mat-toolbar color=\"primary\" *ngIf=\"_showToolbar\">\n        <button type=\"button\" mat-icon-button class=\"menu-btn\" *ngIf=\"!sidenavService.opened\" (click)=\"sidenavService.open()\">\n            <mat-icon>menu</mat-icon>\n        </button>\n        <span class=\"menu-title\">{{ title }}</span>\n        <ng-content select=\"deja-sidenav-header\"></ng-content>\n    </mat-toolbar>\n    <ng-content select=\"deja-sidenav-content\"></ng-content>\n</mat-sidenav-container>\n",
                    styles: ["deja-sidenav{display:flex;flex:1 1 100%;height:100%}deja-sidenav .header{flex:0 0 auto}deja-sidenav .mat-drawer-container{height:100%;flex:1 1 100%}deja-sidenav .mat-drawer-container.sidenav-light .mat-sidenav{-webkit-transform:translate3d(calc(-100% + 58px),0,0);transform:translate3d(calc(-100% + 58px),0,0);visibility:visible!important}deja-sidenav .mat-drawer-container.sidenav-light .mat-sidenav .header{padding:0 8px;justify-content:flex-end}deja-sidenav .mat-drawer-container.sidenav-light .mat-sidenav .header .header-icon,deja-sidenav .mat-drawer-container.sidenav-light .mat-sidenav .header .header-text{display:none}deja-sidenav .mat-drawer-container.sidenav-light .mat-sidenav deja-sidenav-menu .mat-list-item .mat-list-item-content{justify-content:flex-end}deja-sidenav .mat-drawer-container.sidenav-light .mat-sidenav deja-sidenav-menu .mat-list-item .mat-list-item-content .mat-list-icon{padding:0}deja-sidenav .mat-drawer-container.sidenav-light .mat-sidenav deja-sidenav-menu .mat-list-item .mat-list-item-content .mat-list-text{display:none}deja-sidenav .mat-drawer-container.sidenav-light .mat-drawer-content{margin-left:58px!important}deja-sidenav .mat-drawer-container.sidenav-hidden .mat-sidenav{width:280px}deja-sidenav .mat-drawer-container.sidenav-hidden .mat-sidenav .mat-toolbar{border-right:none}deja-sidenav .mat-drawer-container.sidenav-hidden .mat-drawer-content .mat-toolbar{padding:0 8px}deja-sidenav .mat-drawer-container.sidenav-hidden .mat-drawer-content .mat-toolbar .menu-btn{margin-right:8px;display:block!important}deja-sidenav .mat-drawer-container .mat-sidenav{overflow:visible;width:320px}deja-sidenav .mat-drawer-container .mat-sidenav .mat-drawer-inner-container{display:flex;flex-direction:column}deja-sidenav .mat-drawer-container .mat-sidenav .header{padding-right:8px;font-size:14px}deja-sidenav .mat-drawer-container .mat-sidenav .header .header-icon{padding:4px}deja-sidenav .mat-drawer-container .mat-sidenav .header .header-text{margin-left:32px;flex:1 1 auto}deja-sidenav .mat-drawer-container .mat-sidenav deja-sidenav-menu .mat-list-item .mat-list-item-content .mat-list-text{padding-left:32px;font-size:14px}deja-sidenav .mat-drawer-container .mat-sidenav deja-sidenav-menu .mat-divider{margin:.7rem 0}deja-sidenav .mat-drawer-container .mat-drawer-content{display:flex;flex-direction:column;height:100%}deja-sidenav .mat-drawer-container .mat-drawer-content>div{overflow:hidden;height:100%}deja-sidenav .mat-drawer-container .mat-drawer-content .mat-toolbar{box-shadow:0 3px 3px -2px rgba(0,0,0,.2),0 3px 4px 0 rgba(0,0,0,.14),0 1px 8px 0 rgba(0,0,0,.12);-webkit-font-smoothing:antialiased;padding-right:8px;flex:0 0 auto}deja-sidenav .mat-drawer-container .mat-drawer-content .mat-toolbar .menu-title{flex:1 1 auto}deja-sidenav .mat-drawer-container .mat-drawer-content .mat-toolbar .menu-btn{display:none}deja-sidenav .mat-drawer-container .mat-drawer-content deja-sidenav-content{overflow-y:auto}deja-sidenav .mat-drawer-container .mat-drawer-content deja-sidenav-content>*{overflow-x:hidden;overflow-y:auto}"]
                }] }
    ];
    /** @nocollapse */
    DejaSidenavComponent.ctorParameters = function () { return [
        { type: DejaSidenavService },
        { type: _deja_js_core__WEBPACK_IMPORTED_MODULE_4__["MediaService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_7__["ChangeDetectorRef"] }
    ]; };
    DejaSidenavComponent.propDecorators = {
        showToolbar: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_7__["Input"] }],
        headerText: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_7__["Input"] }],
        headerIcon: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_7__["Input"] }]
    };
    return DejaSidenavComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var DejaSidenavModule = /** @class */ (function () {
    function DejaSidenavModule() {
    }
    /**
     * @return {?}
     */
    DejaSidenavModule.forRoot = /**
     * @return {?}
     */
    function () {
        return {
            ngModule: DejaSidenavModule,
            providers: [DejaSidenavService]
        };
    };
    DejaSidenavModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_7__["NgModule"], args: [{
                    declarations: [
                        DejaSidenavComponent,
                        DejaSidenavMenuDirective,
                        DejaSidenavContentDirective,
                        DejaSidenavMenuSeparatorDirective,
                        DejaSidenavHeaderDirective,
                    ],
                    exports: [
                        DejaSidenavComponent,
                        DejaSidenavMenuDirective,
                        DejaSidenavContentDirective,
                        DejaSidenavMenuSeparatorDirective,
                        DejaSidenavHeaderDirective,
                    ],
                    imports: [
                        _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
                        _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSidenavModule"],
                        _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatToolbarModule"],
                        _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatButtonModule"],
                        _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatIconModule"],
                        _deja_js_core__WEBPACK_IMPORTED_MODULE_4__["MediaModule"],
                        _deja_js_core__WEBPACK_IMPORTED_MODULE_4__["DejaSlimScrollModule"],
                    ],
                },] }
    ];
    return DejaSidenavModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */



//# sourceMappingURL=deja-js-component-sidenav.js.map

/***/ }),

/***/ "./dist/deja-js/core/fesm5/deja-js-core.js":
/*!*************************************************!*\
  !*** ./dist/deja-js/core/fesm5/deja-js-core.js ***!
  \*************************************************/
/*! exports provided: DejaClipboardModule, DejaClipboardService, DejaMaterialColorsModule, MaterialColor, MaterialColors, Diacritics, Position, RectOverlapDirection, Rect, Circle, Directions, Size, UnitValue, Color, GroupingModule, GroupingService, IconModule, IconService, DejaItemModule, ViewportMode, ViewportDirection, ViewPortService, ItemListService, ItemListBase, DejaItemEvent, DejaItemsEvent, DejaItemComponent, MediaModule, MediaService, DejaConnectionPositionPair, ResizeListenerModule, DejaResizeListenerDirective, DejaSlimScrollModule, DejaSlimScrollDirective, DejaSortingModule, SortOrder, SortingService, DejaSortIndicatorComponent, DejaTextMetricsModule, DejaTextMetricsService, DejaChildValidatorModule, ValidationMessages, DejaChildValidatorDirective, KeyCodes, UUID */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DejaClipboardModule", function() { return DejaClipboardModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DejaClipboardService", function() { return DejaClipboardService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DejaMaterialColorsModule", function() { return DejaMaterialColorsModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MaterialColor", function() { return MaterialColor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MaterialColors", function() { return MaterialColors; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Diacritics", function() { return Diacritics; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Position", function() { return Position; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RectOverlapDirection", function() { return RectOverlapDirection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Rect", function() { return Rect; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Circle", function() { return Circle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Directions", function() { return Directions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Size", function() { return Size; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UnitValue", function() { return UnitValue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Color", function() { return Color; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GroupingModule", function() { return GroupingModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GroupingService", function() { return GroupingService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IconModule", function() { return IconModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IconService", function() { return IconService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DejaItemModule", function() { return DejaItemModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ViewportMode", function() { return ViewportMode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ViewportDirection", function() { return ViewportDirection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ViewPortService", function() { return ViewPortService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ItemListService", function() { return ItemListService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ItemListBase", function() { return ItemListBase; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DejaItemEvent", function() { return DejaItemEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DejaItemsEvent", function() { return DejaItemsEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DejaItemComponent", function() { return DejaItemComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MediaModule", function() { return MediaModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MediaService", function() { return MediaService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DejaConnectionPositionPair", function() { return DejaConnectionPositionPair; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ResizeListenerModule", function() { return ResizeListenerModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DejaResizeListenerDirective", function() { return DejaResizeListenerDirective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DejaSlimScrollModule", function() { return DejaSlimScrollModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DejaSlimScrollDirective", function() { return DejaSlimScrollDirective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DejaSortingModule", function() { return DejaSortingModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SortOrder", function() { return SortOrder; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SortingService", function() { return SortingService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DejaSortIndicatorComponent", function() { return DejaSortIndicatorComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DejaTextMetricsModule", function() { return DejaTextMetricsModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DejaTextMetricsService", function() { return DejaTextMetricsService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DejaChildValidatorModule", function() { return DejaChildValidatorModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ValidationMessages", function() { return ValidationMessages; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DejaChildValidatorDirective", function() { return DejaChildValidatorDirective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KeyCodes", function() { return KeyCodes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UUID", function() { return UUID; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/cdk/coercion */ "./node_modules/@angular/cdk/esm5/coercion.es5.js");
/* harmony import */ var _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/cdk/overlay */ "./node_modules/@angular/cdk/esm5/overlay.es5.js");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/icon */ "./node_modules/@angular/material/esm5/icon.es5.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");














/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Global property bag for copy paste
 */
var DejaClipboardService = /** @class */ (function () {
    function DejaClipboardService() {
        this.clipboard = (/** @type {?} */ ({}));
    }
    /**
     * @param {?} key
     * @return {?}
     */
    DejaClipboardService.prototype.get = /**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        return this.clipboard[key];
    };
    /**
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    DejaClipboardService.prototype.set = /**
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    function (key, value) {
        this.clipboard[key] = value;
    };
    /**
     * @param {?} key
     * @return {?}
     */
    DejaClipboardService.prototype.isAvailable = /**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        return !!this.clipboard[key];
    };
    /**
     * @return {?}
     */
    DejaClipboardService.prototype.clear = /**
     * @return {?}
     */
    function () {
        this.clipboard = {};
    };
    DejaClipboardService.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_11__["Injectable"] }
    ];
    return DejaClipboardService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var DejaClipboardModule = /** @class */ (function () {
    function DejaClipboardModule() {
    }
    /**
     * @return {?}
     */
    DejaClipboardModule.forRoot = /**
     * @return {?}
     */
    function () {
        return {
            ngModule: DejaClipboardModule,
            providers: [DejaClipboardService],
        };
    };
    DejaClipboardModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_11__["NgModule"], args: [{
                    providers: [DejaClipboardService],
                },] }
    ];
    return DejaClipboardModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var Color = /** @class */ (function () {
    function Color(r, g, b, a) {
        this._r = r;
        this._g = g;
        this._b = b;
        this._a = a;
    }
    /**
     * @param {?} c1
     * @param {?} c2
     * @return {?}
     */
    Color.equals = /**
     * @param {?} c1
     * @param {?} c2
     * @return {?}
     */
    function (c1, c2) {
        return !c1 === !c2 && !c1.isEmpty() && c1.r === c2.r && c1.g === c2.g && c1.b === c2.b && c1.a === c2.a;
    };
    /**
     * @param {?} h
     * @param {?} s
     * @param {?} l
     * @return {?}
     */
    Color.fromHSL = /**
     * @param {?} h
     * @param {?} s
     * @param {?} l
     * @return {?}
     */
    function (h, s, l) {
        /** @type {?} */
        var r;
        /** @type {?} */
        var g;
        /** @type {?} */
        var b;
        if (s === 0) {
            r = g = b = l; // achromatic
        }
        else {
            /** @type {?} */
            var hue2rgb = (/**
             * @param {?} p
             * @param {?} q
             * @param {?} t
             * @return {?}
             */
            function (p, q, t) {
                if (t < 0) {
                    t += 1;
                }
                if (t > 1) {
                    t -= 1;
                }
                if (t < 1 / 6) {
                    return p + (q - p) * 6 * t;
                }
                if (t < 1 / 2) {
                    return q;
                }
                if (t < 2 / 3) {
                    return p + (q - p) * (2 / 3 - t) * 6;
                }
                return p;
            });
            /** @type {?} */
            var qq = l < 0.5 ? l * (1 + s) : l + s - l * s;
            /** @type {?} */
            var pp = 2 * l - qq;
            r = hue2rgb(pp, qq, h + 1 / 3);
            g = hue2rgb(pp, qq, h);
            b = hue2rgb(pp, qq, h - 1 / 3);
        }
        return new Color(Math.round(r * 255), Math.round(g * 255), Math.round(b * 255));
    };
    /**
     * @param hex hexadecimal color value, exemple: #127bdc #FFF #127bdc56
     */
    /**
     * @param {?} hex hexadecimal color value, exemple: #127bdc #FFF #127bdc56
     * @return {?}
     */
    Color.fromHex = /**
     * @param {?} hex hexadecimal color value, exemple: #127bdc #FFF #127bdc56
     * @return {?}
     */
    function (hex) {
        if (!hex || hex.length < 3) {
            return new Color();
        }
        /** @type {?} */
        var r;
        /** @type {?} */
        var g;
        /** @type {?} */
        var b;
        /** @type {?} */
        var a;
        /** @type {?} */
        var startIndex = hex[0] === '#' ? 1 : 0;
        switch (hex.length - startIndex) {
            case 3:
                r = parseInt(hex[startIndex] + hex[startIndex], 16);
                g = parseInt(hex[++startIndex] + hex[startIndex], 16);
                b = parseInt(hex[++startIndex] + hex[startIndex], 16);
                break;
            case 4:
                r = parseInt(hex[startIndex] + hex[startIndex], 16);
                g = parseInt(hex[++startIndex] + hex[startIndex], 16);
                b = parseInt(hex[++startIndex] + hex[startIndex], 16);
                a = parseInt(hex[++startIndex] + hex[startIndex], 16);
                break;
            case 6:
                r = parseInt(hex[startIndex] + hex[++startIndex], 16);
                g = parseInt(hex[++startIndex] + hex[++startIndex], 16);
                b = parseInt(hex[++startIndex] + hex[++startIndex], 16);
                break;
            case 8:
                r = parseInt(hex[startIndex] + hex[++startIndex], 16);
                g = parseInt(hex[++startIndex] + hex[++startIndex], 16);
                b = parseInt(hex[++startIndex] + hex[++startIndex], 16);
                a = parseInt(hex[++startIndex] + hex[++startIndex], 16);
                break;
            default:
                throw new Error('Invalid color.');
        }
        return new Color(r, g, b, a);
    };
    /**
     * @param {?} color
     * @return {?}
     */
    Color.parse = /**
     * @param {?} color
     * @return {?}
     */
    function (color) {
        if (!color || color.length === 0) {
            return new Color();
        }
        else if (Color.colorNames[color]) {
            return Color.fromHex(Color.colorNames[color]);
        }
        else if (color[0] === '#') {
            return Color.fromHex(color);
        }
        else {
            /** @type {?} */
            var rgb = /rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)/.exec(color);
            if (rgb !== null) {
                return new Color(+rgb[1], +rgb[2], +rgb[3]);
            }
            /** @type {?} */
            var rgba = /rgba\((\d{1,3}), (\d{1,3}), (\d{1,3}), ([0-9.]*)\)/.exec(color);
            if (rgba !== null) {
                /** @type {?} */
                var a = +rgba[4];
                if (isNaN(a)) {
                    a = 1;
                }
                else if (a <= 1) {
                    a = Math.round(a * 255);
                }
                return new Color(+rgba[1], +rgba[2], +rgba[3], a);
            }
        }
    };
    Object.defineProperty(Color.prototype, "r", {
        get: /**
         * @return {?}
         */
        function () {
            return this._r;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color.prototype, "g", {
        get: /**
         * @return {?}
         */
        function () {
            return this._g;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color.prototype, "b", {
        get: /**
         * @return {?}
         */
        function () {
            return this._b;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color.prototype, "a", {
        get: /**
         * @return {?}
         */
        function () {
            return this._a;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color.prototype, "bestTextColor", {
        get: /**
         * @return {?}
         */
        function () {
            if (this.isEmpty()) {
                return new Color();
            }
            /** @type {?} */
            var m = 1 - (0.299 * this.r + 0.587 * this.g + 0.114 * this.b) / 255;
            /** @type {?} */
            var d = m < 0.5 ? 0 : 255;
            return new Color(d, d, d);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Color.prototype, "grayScale", {
        get: /**
         * @return {?}
         */
        function () {
            if (this.isEmpty()) {
                return new Color();
            }
            /** @type {?} */
            var g = Math.round((this.r + this.g + this.b) / 3);
            return new Color(g, g, g, this.a);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    Color.prototype.isEmpty = /**
     * @return {?}
     */
    function () {
        return this.r === undefined || this.g === undefined || this.b === undefined;
    };
    /**
     * @return {?}
     */
    Color.prototype.clone = /**
     * @return {?}
     */
    function () {
        return new Color(this.r, this.g, this.b, this.a);
    };
    /**
     * @return {?}
     */
    Color.prototype.toHex = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var toHex = (/**
         * @param {?} d
         * @return {?}
         */
        function (d) {
            /** @type {?} */
            var s = Number(d).toString(16);
            return ("0" + s).slice(-2).toUpperCase();
        });
        if (this.isEmpty()) {
            return undefined;
        }
        else if (this.a !== undefined) {
            return "#" + toHex(this.r) + toHex(this.g) + toHex(this.b) + toHex(this.a);
        }
        else {
            return "#" + toHex(this.r) + toHex(this.g) + toHex(this.b);
        }
    };
    /**
     * @return {?}
     */
    Color.prototype.toHSL = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var r = this.r / 255;
        /** @type {?} */
        var g = this.g / 255;
        /** @type {?} */
        var b = this.b / 255;
        /** @type {?} */
        var max = Math.max(r, g, b);
        /** @type {?} */
        var min = Math.min(r, g, b);
        /** @type {?} */
        var h = (max + min) / 2;
        /** @type {?} */
        var s = h;
        /** @type {?} */
        var l = h;
        if (max === min) {
            h = s = 0; // achromatic
        }
        else {
            /** @type {?} */
            var d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            if (r > g && r > b) {
                h = (g - b) / d + (g < b ? 6 : 0);
            }
            else if (g > b) {
                h = (b - r) / d + 2;
            }
            else {
                h = (r - g) / d + 4;
            }
            h /= 6;
        }
        return (/** @type {?} */ ({ h: h, s: s, l: l }));
    };
    Color.colorNames = (/** @type {?} */ ({
        aliceblue: '#f0f8ff',
        antiquewhite: '#faebd7',
        aqua: '#00ffff',
        aquamarine: '#7fffd4',
        azure: '#f0ffff',
        beige: '#f5f5dc',
        bisque: '#ffe4c4',
        black: '#000000',
        blanchedalmond: '#ffebcd',
        blue: '#0000ff',
        blueviolet: '#8a2be2',
        brown: '#a52a2a',
        burlywood: '#deb887',
        cadetblue: '#5f9ea0',
        chartreuse: '#7fff00',
        chocolate: '#d2691e',
        coral: '#ff7f50',
        cornflowerblue: '#6495ed',
        cornsilk: '#fff8dc',
        crimson: '#dc143c',
        cyan: '#00ffff',
        darkblue: '#00008b',
        darkcyan: '#008b8b',
        darkgoldenrod: '#b8860b',
        darkgray: '#a9a9a9',
        darkgreen: '#006400',
        darkkhaki: '#bdb76b',
        darkmagenta: '#8b008b',
        darkolivegreen: '#556b2f',
        darkorange: '#ff8c00',
        darkorchid: '#9932cc',
        darkred: '#8b0000',
        darksalmon: '#e9967a',
        darkseagreen: '#8fbc8f',
        darkslateblue: '#483d8b',
        darkslategray: '#2f4f4f',
        darkturquoise: '#00ced1',
        darkviolet: '#9400d3',
        deeppink: '#ff1493',
        deepskyblue: '#00bfff',
        dimgray: '#696969',
        dodgerblue: '#1e90ff',
        firebrick: '#b22222',
        floralwhite: '#fffaf0',
        forestgreen: '#228b22',
        fuchsia: '#ff00ff',
        gainsboro: '#dcdcdc',
        ghostwhite: '#f8f8ff',
        gold: '#ffd700',
        goldenrod: '#daa520',
        gray: '#808080',
        green: '#008000',
        greenyellow: '#adff2f',
        honeydew: '#f0fff0',
        hotpink: '#ff69b4',
        indianred: '#cd5c5c',
        indigo: '#4b0082',
        ivory: '#fffff0',
        khaki: '#f0e68c',
        lavender: '#e6e6fa',
        lavenderblush: '#fff0f5',
        lawngreen: '#7cfc00',
        lemonchiffon: '#fffacd',
        lightblue: '#add8e6',
        lightcoral: '#f08080',
        lightcyan: '#e0ffff',
        lightgoldenrodyellow: '#fafad2',
        lightgrey: '#d3d3d3',
        lightgreen: '#90ee90',
        lightpink: '#ffb6c1',
        lightsalmon: '#ffa07a',
        lightseagreen: '#20b2aa',
        lightskyblue: '#87cefa',
        lightslategray: '#778899',
        lightsteelblue: '#b0c4de',
        lightyellow: '#ffffe0',
        lime: '#00ff00',
        limegreen: '#32cd32',
        linen: '#faf0e6',
        magenta: '#ff00ff',
        maroon: '#800000',
        mediumaquamarine: '#66cdaa',
        mediumblue: '#0000cd',
        mediumorchid: '#ba55d3',
        mediumpurple: '#9370d8',
        mediumseagreen: '#3cb371',
        mediumslateblue: '#7b68ee',
        mediumspringgreen: '#00fa9a',
        mediumturquoise: '#48d1cc',
        mediumvioletred: '#c71585',
        midnightblue: '#191970',
        mintcream: '#f5fffa',
        mistyrose: '#ffe4e1',
        moccasin: '#ffe4b5',
        navajowhite: '#ffdead',
        navy: '#000080',
        oldlace: '#fdf5e6',
        olive: '#808000',
        olivedrab: '#6b8e23',
        orange: '#ffa500',
        orangered: '#ff4500',
        orchid: '#da70d6',
        palegoldenrod: '#eee8aa',
        palegreen: '#98fb98',
        paleturquoise: '#afeeee',
        palevioletred: '#d87093',
        papayawhip: '#ffefd5',
        peachpuff: '#ffdab9',
        peru: '#cd853f',
        pink: '#ffc0cb',
        plum: '#dda0dd',
        powderblue: '#b0e0e6',
        purple: '#800080',
        rebeccapurple: '#663399',
        red: '#ff0000',
        rosybrown: '#bc8f8f',
        royalblue: '#4169e1',
        saddlebrown: '#8b4513',
        salmon: '#fa8072',
        sandybrown: '#f4a460',
        seagreen: '#2e8b57',
        seashell: '#fff5ee',
        sienna: '#a0522d',
        silver: '#c0c0c0',
        skyblue: '#87ceeb',
        slateblue: '#6a5acd',
        slategray: '#708090',
        snow: '#fffafa',
        springgreen: '#00ff7f',
        steelblue: '#4682b4',
        tan: '#d2b48c',
        teal: '#008080',
        thistle: '#d8bfd8',
        tomato: '#ff6347',
        turquoise: '#40e0d0',
        violet: '#ee82ee',
        wheat: '#f5deb3',
        white: '#ffffff',
        whitesmoke: '#f5f5f5',
        yellow: '#ffff00',
        yellowgreen: '#9acd3',
    }));
    return Color;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var MaterialColor = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_6__["__extends"])(MaterialColor, _super);
    function MaterialColor() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.subColors = (/** @type {?} */ ([]));
        return _this;
    }
    return MaterialColor;
}(Color));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var MaterialColors = /** @class */ (function () {
    function MaterialColors() {
        this.palet = (/** @type {?} */ ({
            'mat-red': {
                50: '#ffebee',
                100: '#ffcdd2',
                200: '#ef9a9a',
                300: '#e57373',
                400: '#ef5350',
                500: '#f44336',
                600: '#e53935',
                700: '#d32f2f',
                800: '#c62828',
                900: '#b71c1c',
            },
            'mat-pink': {
                50: '#fce4ec',
                100: '#f8bbd0',
                200: '#f48fb1',
                300: '#f06292',
                400: '#ec407a',
                500: '#e91e63',
                600: '#d81b60',
                700: '#c2185b',
                800: '#ad1457',
                900: '#880e4f',
            },
            'mat-purple': {
                50: '#f3e5f5',
                100: '#e1bee7',
                200: '#ce93d8',
                300: '#ba68c8',
                400: '#ab47bc',
                500: '#9c27b0',
                600: '#8e24aa',
                700: '#7b1fa2',
                800: '#6a1b9a',
                900: '#4a148c',
            },
            'mat-deep-purple': {
                50: '#ede7f6',
                100: '#d1c4e9',
                200: '#b39ddb',
                300: '#9575cd',
                400: '#7e57c2',
                500: '#673ab7',
                600: '#5e35b1',
                700: '#512da8',
                800: '#4527a0',
                900: '#311b92',
            },
            'mat-indigo': {
                50: '#e8eaf6',
                100: '#c5cae9',
                200: '#9fa8da',
                300: '#7986cb',
                400: '#5c6bc0',
                500: '#3f51b5',
                600: '#3949ab',
                700: '#303f9f',
                800: '#283593',
                900: '#1a237e',
            },
            'mat-blue': {
                50: '#e3f2fd',
                100: '#bbdefb',
                200: '#90caf9',
                300: '#64b5f6',
                400: '#42a5f5',
                500: '#2196f3',
                600: '#1e88e5',
                700: '#1976d2',
                800: '#1565c0',
                900: '#0d47a1',
            },
            'mat-light-blue': {
                50: '#e1f5fe',
                100: '#b3e5fc',
                200: '#81d4fa',
                300: '#4fc3f7',
                400: '#29b6f6',
                500: '#03a9f4',
                600: '#039be5',
                700: '#0288d1',
                800: '#0277bd',
                900: '#01579b',
            },
            'mat-cyan': {
                50: '#e0f7fa',
                100: '#b2ebf2',
                200: '#80deea',
                300: '#4dd0e1',
                400: '#26c6da',
                500: '#00bcd4',
                600: '#00acc1',
                700: '#0097a7',
                800: '#00838f',
                900: '#006064',
            },
            'mat-teal': {
                50: '#e0f2f1',
                100: '#b2dfdb',
                200: '#80cbc4',
                300: '#4db6ac',
                400: '#26a69a',
                500: '#009688',
                600: '#00897b',
                700: '#00796b',
                800: '#00695c',
                900: '#004d40',
            },
            'mat-green': {
                50: '#e8f5e9',
                100: '#c8e6c9',
                200: '#a5d6a7',
                300: '#81c784',
                400: '#66bb6a',
                500: '#4caf50',
                600: '#43a047',
                700: '#388e3c',
                800: '#2e7d32',
                900: '#1b5e20',
            },
            'mat-light-green': {
                50: '#f1f8e9',
                100: '#dcedc8',
                200: '#c5e1a5',
                300: '#aed581',
                400: '#9ccc65',
                500: '#8bc34a',
                600: '#7cb342',
                700: '#689f38',
                800: '#558b2f',
                900: '#33691e',
            },
            'mat-lime': {
                50: '#f9fbe7',
                100: '#f0f4c3',
                200: '#e6ee9c',
                300: '#dce775',
                400: '#d4e157',
                500: '#cddc39',
                600: '#c0ca33',
                700: '#afb42b',
                800: '#9e9d24',
                900: '#827717',
            },
            'mat-yellow': {
                50: '#fffde7',
                100: '#fff9c4',
                200: '#fff59d',
                300: '#fff176',
                400: '#ffee58',
                500: '#ffeb3b',
                600: '#fdd835',
                700: '#fbc02d',
                800: '#f9a825',
                900: '#f57f17',
            },
            'mat-amber': {
                50: '#fff8e1',
                100: '#ffecb3',
                200: '#ffe082',
                300: '#ffd54f',
                400: '#ffca28',
                500: '#ffc107',
                600: '#ffb300',
                700: '#ffa000',
                800: '#ff8f00',
                900: '#ff6f00',
            },
            'mat-orange': {
                50: '#fff3e0',
                100: '#ffe0b2',
                200: '#ffcc80',
                300: '#ffb74d',
                400: '#ffa726',
                500: '#ff9800',
                600: '#fb8c00',
                700: '#f57c00',
                800: '#ef6c00',
                900: '#e65100',
            },
            'mat-deep-orange': {
                50: '#fbe9e7',
                100: '#ffccbc',
                200: '#ffab91',
                300: '#ff8a65',
                400: '#ff7043',
                500: '#ff5722',
                600: '#f4511e',
                700: '#e64a19',
                800: '#d84315',
                900: '#bf360c',
            },
            'mat-brown': {
                50: '#efebe9',
                100: '#d7ccc8',
                200: '#bcaaa4',
                300: '#a1887f',
                400: '#8d6e63',
                500: '#795548',
                600: '#6d4c41',
                700: '#5d4037',
                800: '#4e342e',
                900: '#3e2723',
            },
            'mat-grey': {
                0: '#ffffff',
                50: '#fafafa',
                100: '#f5f5f5',
                200: '#eeeeee',
                300: '#e0e0e0',
                400: '#bdbdbd',
                500: '#9e9e9e',
                600: '#757575',
                700: '#616161',
                800: '#424242',
                900: '#212121',
                1000: '#000000',
            },
            'mat-blue-grey': {
                50: '#eceff1',
                100: '#cfd8dc',
                200: '#b0bec5',
                300: '#90a4ae',
                400: '#78909c',
                500: '#607d8b',
                600: '#546e7a',
                700: '#455a64',
                800: '#37474f',
                900: '#263238',
            },
        }));
    }
    Object.defineProperty(MaterialColors.prototype, "colors", {
        get: /**
         * @return {?}
         */
        function () {
            var _this = this;
            if (!this._colors) {
                this._colors = (/** @type {?} */ ([]));
                Object.keys(this.palet).forEach((/**
                 * @param {?} baseColorName
                 * @return {?}
                 */
                function (baseColorName) {
                    /** @type {?} */
                    var baseColor = (/** @type {?} */ (MaterialColor.fromHex(_this.palet[baseColorName]['500'])));
                    baseColor.subColors = [];
                    baseColor.name = baseColorName;
                    _this._colors.push(baseColor);
                    Object.keys(_this.palet[baseColorName]).forEach((/**
                     * @param {?} subColorName
                     * @return {?}
                     */
                    function (subColorName) {
                        /** @type {?} */
                        var subColor = (/** @type {?} */ (MaterialColor.fromHex(_this.palet[baseColorName][subColorName])));
                        subColor.name = subColorName;
                        baseColor.subColors.unshift(subColor);
                    }));
                }));
            }
            return this._colors;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} subColor
     * @return {?}
     */
    MaterialColors.prototype.getPalet = /**
     * @param {?} subColor
     * @return {?}
     */
    function (subColor) {
        var _this = this;
        if (!this.palettes) {
            this.palettes = {};
            Object.keys(this.palet).forEach((/**
             * @param {?} baseColorName
             * @return {?}
             */
            function (baseColorName) {
                /** @type {?} */
                var baseColorObj = _this.palet[baseColorName];
                Object.keys(baseColorObj).forEach((/**
                 * @param {?} subColorName
                 * @return {?}
                 */
                function (subColorName) {
                    if (!_this.palettes[subColorName]) {
                        _this.palettes[subColorName] = (/** @type {?} */ ([]));
                    }
                    _this.palettes[subColorName].push(Color.fromHex(_this.palet[baseColorName][subColorName]));
                }));
            }));
        }
        return this.palettes[subColor];
    };
    /**
     * @param {?} text
     * @return {?}
     */
    MaterialColors.prototype.getColorFromText = /**
     * @param {?} text
     * @return {?}
     */
    function (text) {
        /** @type {?} */
        var sum = 0;
        for (var i = 0; i < text.length; i++) {
            sum += text.charCodeAt(i);
        }
        /** @type {?} */
        var colors = this.colors;
        /** @type {?} */
        var subColors = (colors[sum % colors.length]).subColors;
        return subColors[sum % subColors.length];
    };
    MaterialColors.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_11__["Injectable"] }
    ];
    return MaterialColors;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var DejaMaterialColorsModule = /** @class */ (function () {
    function DejaMaterialColorsModule() {
    }
    /**
     * @return {?}
     */
    DejaMaterialColorsModule.forRoot = /**
     * @return {?}
     */
    function () {
        return {
            ngModule: MaterialColors,
            providers: [MaterialColors],
        };
    };
    DejaMaterialColorsModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_11__["NgModule"], args: [{
                    providers: [MaterialColors],
                },] }
    ];
    return DejaMaterialColorsModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */
/**
 * Remove diacritics (accent and other marks) on characters, and dissociate double characters.
 * Based on the character map of http://lehelk.com/2011/05/06/script-to-remove-diacritics/
 * but per-character walk (improved performance).
 *
 * Licensed under WTFPL v2 http://sam.zoy.org/wtfpl/COPYING
 */
// @dynamic
var Diacritics = /** @class */ (function () {
    function Diacritics() {
    }
    Diacritics.map = { 9398: 'A', 65313: 'A', 192: 'A', 193: 'A', 194: 'A', 7846: 'A', 7844: 'A', 7850: 'A', 7848: 'A', 195: 'A', 256: 'A', 258: 'A', 7856: 'A', 7854: 'A', 7860: 'A', 7858: 'A', 550: 'A', 480: 'A', 196: 'A', 478: 'A', 7842: 'A', 197: 'A', 506: 'A', 461: 'A', 512: 'A', 514: 'A', 7840: 'A', 7852: 'A', 7862: 'A', 7680: 'A', 260: 'A', 570: 'A', 11375: 'A', 42802: 'AA', 198: 'AE', 508: 'AE', 482: 'AE', 42804: 'AO', 42806: 'AU', 42808: 'AV', 42810: 'AV', 42812: 'AY', 9399: 'B', 65314: 'B', 7682: 'B', 7684: 'B', 7686: 'B', 579: 'B', 386: 'B', 385: 'B', 9400: 'C', 65315: 'C', 262: 'C', 264: 'C', 266: 'C', 268: 'C', 199: 'C', 7688: 'C', 391: 'C', 571: 'C', 42814: 'C', 9401: 'D', 65316: 'D', 7690: 'D', 270: 'D', 7692: 'D', 7696: 'D', 7698: 'D', 7694: 'D', 272: 'D', 395: 'D', 394: 'D', 393: 'D', 42873: 'D', 497: 'DZ', 452: 'DZ', 498: 'Dz', 453: 'Dz', 9402: 'E', 65317: 'E', 200: 'E', 201: 'E', 202: 'E', 7872: 'E', 7870: 'E', 7876: 'E', 7874: 'E', 7868: 'E', 274: 'E', 7700: 'E', 7702: 'E', 276: 'E', 278: 'E', 203: 'E', 7866: 'E', 282: 'E', 516: 'E', 518: 'E', 7864: 'E', 7878: 'E', 552: 'E', 7708: 'E', 280: 'E', 7704: 'E', 7706: 'E', 400: 'E', 398: 'E', 9403: 'F', 65318: 'F', 7710: 'F', 401: 'F', 42875: 'F', 9404: 'G', 65319: 'G', 500: 'G', 284: 'G', 7712: 'G', 286: 'G', 288: 'G', 486: 'G', 290: 'G', 484: 'G', 403: 'G', 42912: 'G', 42877: 'G', 42878: 'G', 9405: 'H', 65320: 'H', 292: 'H', 7714: 'H', 7718: 'H', 542: 'H', 7716: 'H', 7720: 'H', 7722: 'H', 294: 'H', 11367: 'H', 11381: 'H', 42893: 'H', 9406: 'I', 65321: 'I', 204: 'I', 205: 'I', 206: 'I', 296: 'I', 298: 'I', 300: 'I', 304: 'I', 207: 'I', 7726: 'I', 7880: 'I', 463: 'I', 520: 'I', 522: 'I', 7882: 'I', 302: 'I', 7724: 'I', 407: 'I', 9407: 'J', 65322: 'J', 308: 'J', 584: 'J', 9408: 'K', 65323: 'K', 7728: 'K', 488: 'K', 7730: 'K', 310: 'K', 7732: 'K', 408: 'K', 11369: 'K', 42816: 'K', 42818: 'K', 42820: 'K', 42914: 'K', 9409: 'L', 65324: 'L', 319: 'L', 313: 'L', 317: 'L', 7734: 'L', 7736: 'L', 315: 'L', 7740: 'L', 7738: 'L', 321: 'L', 573: 'L', 11362: 'L', 11360: 'L', 42824: 'L', 42822: 'L', 42880: 'L', 455: 'LJ', 456: 'Lj', 9410: 'M', 65325: 'M', 7742: 'M', 7744: 'M', 7746: 'M', 11374: 'M', 412: 'M', 9411: 'N', 65326: 'N', 504: 'N', 323: 'N', 209: 'N', 7748: 'N', 327: 'N', 7750: 'N', 325: 'N', 7754: 'N', 7752: 'N', 544: 'N', 413: 'N', 42896: 'N', 42916: 'N', 458: 'NJ', 459: 'Nj', 9412: 'O', 65327: 'O', 210: 'O', 211: 'O', 212: 'O', 7890: 'O', 7888: 'O', 7894: 'O', 7892: 'O', 213: 'O', 7756: 'O', 556: 'O', 7758: 'O', 332: 'O', 7760: 'O', 7762: 'O', 334: 'O', 558: 'O', 560: 'O', 214: 'O', 554: 'O', 7886: 'O', 336: 'O', 465: 'O', 524: 'O', 526: 'O', 416: 'O', 7900: 'O', 7898: 'O', 7904: 'O', 7902: 'O', 7906: 'O', 7884: 'O', 7896: 'O', 490: 'O', 492: 'O', 216: 'O', 510: 'O', 390: 'O', 415: 'O', 42826: 'O', 42828: 'O', 338: 'OE', 418: 'OI', 42830: 'OO', 546: 'OU', 9413: 'P', 65328: 'P', 7764: 'P', 7766: 'P', 420: 'P', 11363: 'P', 42832: 'P', 42834: 'P', 42836: 'P', 9414: 'Q', 65329: 'Q', 42838: 'Q', 42840: 'Q', 586: 'Q', 9415: 'R', 65330: 'R', 340: 'R', 7768: 'R', 344: 'R', 528: 'R', 530: 'R', 7770: 'R', 7772: 'R', 342: 'R', 7774: 'R', 588: 'R', 11364: 'R', 42842: 'R', 42918: 'R', 42882: 'R', 9416: 'S', 65331: 'S', 346: 'S', 7780: 'S', 348: 'S', 7776: 'S', 352: 'S', 7782: 'S', 7778: 'S', 7784: 'S', 536: 'S', 350: 'S', 11390: 'S', 42920: 'S', 42884: 'S', 7838: 'SS', 9417: 'T', 65332: 'T', 7786: 'T', 356: 'T', 7788: 'T', 538: 'T', 354: 'T', 7792: 'T', 7790: 'T', 358: 'T', 428: 'T', 430: 'T', 574: 'T', 42886: 'T', 42792: 'TZ', 9418: 'U', 65333: 'U', 217: 'U', 218: 'U', 219: 'U', 360: 'U', 7800: 'U', 362: 'U', 7802: 'U', 364: 'U', 220: 'U', 475: 'U', 471: 'U', 469: 'U', 473: 'U', 7910: 'U', 366: 'U', 368: 'U', 467: 'U', 532: 'U', 534: 'U', 431: 'U', 7914: 'U', 7912: 'U', 7918: 'U', 7916: 'U', 7920: 'U', 7908: 'U', 7794: 'U', 370: 'U', 7798: 'U', 7796: 'U', 580: 'U', 9419: 'V', 65334: 'V', 7804: 'V', 7806: 'V', 434: 'V', 42846: 'V', 581: 'V', 42848: 'VY', 9420: 'W', 65335: 'W', 7808: 'W', 7810: 'W', 372: 'W', 7814: 'W', 7812: 'W', 7816: 'W', 11378: 'W', 9421: 'X', 65336: 'X', 7818: 'X', 7820: 'X', 9422: 'Y', 65337: 'Y', 7922: 'Y', 221: 'Y', 374: 'Y', 7928: 'Y', 562: 'Y', 7822: 'Y', 376: 'Y', 7926: 'Y', 7924: 'Y', 435: 'Y', 590: 'Y', 7934: 'Y', 9423: 'Z', 65338: 'Z', 377: 'Z', 7824: 'Z', 379: 'Z', 381: 'Z', 7826: 'Z', 7828: 'Z', 437: 'Z', 548: 'Z', 11391: 'Z', 11371: 'Z', 42850: 'Z', 9424: 'a', 65345: 'a', 7834: 'a', 224: 'a', 225: 'a', 226: 'a', 7847: 'a', 7845: 'a', 7851: 'a', 7849: 'a', 227: 'a', 257: 'a', 259: 'a', 7857: 'a', 7855: 'a', 7861: 'a', 7859: 'a', 551: 'a', 481: 'a', 228: 'a', 479: 'a', 7843: 'a', 229: 'a', 507: 'a', 462: 'a', 513: 'a', 515: 'a', 7841: 'a', 7853: 'a', 7863: 'a', 7681: 'a', 261: 'a', 11365: 'a', 592: 'a', 42803: 'aa', 230: 'ae', 509: 'ae', 483: 'ae', 42805: 'ao', 42807: 'au', 42809: 'av', 42811: 'av', 42813: 'ay', 9425: 'b', 65346: 'b', 7683: 'b', 7685: 'b', 7687: 'b', 384: 'b', 387: 'b', 595: 'b', 9426: 'c', 65347: 'c', 263: 'c', 265: 'c', 267: 'c', 269: 'c', 231: 'c', 7689: 'c', 392: 'c', 572: 'c', 42815: 'c', 8580: 'c', 9427: 'd', 65348: 'd', 7691: 'd', 271: 'd', 7693: 'd', 7697: 'd', 7699: 'd', 7695: 'd', 273: 'd', 396: 'd', 598: 'd', 599: 'd', 42874: 'd', 499: 'dz', 454: 'dz', 9428: 'e', 65349: 'e', 232: 'e', 233: 'e', 234: 'e', 7873: 'e', 7871: 'e', 7877: 'e', 7875: 'e', 7869: 'e', 275: 'e', 7701: 'e', 7703: 'e', 277: 'e', 279: 'e', 235: 'e', 7867: 'e', 283: 'e', 517: 'e', 519: 'e', 7865: 'e', 7879: 'e', 553: 'e', 7709: 'e', 281: 'e', 7705: 'e', 7707: 'e', 583: 'e', 603: 'e', 477: 'e', 9429: 'f', 65350: 'f', 7711: 'f', 402: 'f', 42876: 'f', 9430: 'g', 65351: 'g', 501: 'g', 285: 'g', 7713: 'g', 287: 'g', 289: 'g', 487: 'g', 291: 'g', 485: 'g', 608: 'g', 42913: 'g', 7545: 'g', 42879: 'g', 9431: 'h', 65352: 'h', 293: 'h', 7715: 'h', 7719: 'h', 543: 'h', 7717: 'h', 7721: 'h', 7723: 'h', 7830: 'h', 295: 'h', 11368: 'h', 11382: 'h', 613: 'h', 405: 'hv', 9432: 'i', 65353: 'i', 236: 'i', 237: 'i', 238: 'i', 297: 'i', 299: 'i', 301: 'i', 239: 'i', 7727: 'i', 7881: 'i', 464: 'i', 521: 'i', 523: 'i', 7883: 'i', 303: 'i', 7725: 'i', 616: 'i', 305: 'i', 9433: 'j', 65354: 'j', 309: 'j', 496: 'j', 585: 'j', 9434: 'k', 65355: 'k', 7729: 'k', 489: 'k', 7731: 'k', 311: 'k', 7733: 'k', 409: 'k', 11370: 'k', 42817: 'k', 42819: 'k', 42821: 'k', 42915: 'k', 9435: 'l', 65356: 'l', 320: 'l', 314: 'l', 318: 'l', 7735: 'l', 7737: 'l', 316: 'l', 7741: 'l', 7739: 'l', 322: 'l', 410: 'l', 619: 'l', 11361: 'l', 42825: 'l', 42881: 'l', 42823: 'l', 457: 'lj', 9436: 'm', 65357: 'm', 7743: 'm', 7745: 'm', 7747: 'm', 625: 'm', 623: 'm', 9437: 'n', 65358: 'n', 505: 'n', 324: 'n', 241: 'n', 7749: 'n', 328: 'n', 7751: 'n', 326: 'n', 7755: 'n', 7753: 'n', 414: 'n', 626: 'n', 329: 'n', 42897: 'n', 42917: 'n', 460: 'nj', 9438: 'o', 65359: 'o', 242: 'o', 243: 'o', 244: 'o', 7891: 'o', 7889: 'o', 7895: 'o', 7893: 'o', 245: 'o', 7757: 'o', 557: 'o', 7759: 'o', 333: 'o', 7761: 'o', 7763: 'o', 335: 'o', 559: 'o', 561: 'o', 246: 'o', 555: 'o', 7887: 'o', 337: 'o', 466: 'o', 525: 'o', 527: 'o', 417: 'o', 7901: 'o', 7899: 'o', 7905: 'o', 7903: 'o', 7907: 'o', 7885: 'o', 7897: 'o', 491: 'o', 493: 'o', 248: 'o', 511: 'o', 596: 'o', 42827: 'o', 42829: 'o', 629: 'o', 339: 'oe', 630: 'oe', 419: 'oi', 547: 'ou', 42831: 'oo', 9439: 'p', 65360: 'p', 7765: 'p', 7767: 'p', 421: 'p', 7549: 'p', 42833: 'p', 42835: 'p', 42837: 'p', 9440: 'q', 65361: 'q', 587: 'q', 42839: 'q', 42841: 'q', 9441: 'r', 65362: 'r', 341: 'r', 7769: 'r', 345: 'r', 529: 'r', 531: 'r', 7771: 'r', 7773: 'r', 343: 'r', 7775: 'r', 589: 'r', 637: 'r', 42843: 'r', 42919: 'r', 42883: 'r', 9442: 's', 65363: 's', 347: 's', 7781: 's', 349: 's', 7777: 's', 353: 's', 7783: 's', 7779: 's', 7785: 's', 537: 's', 351: 's', 575: 's', 42921: 's', 42885: 's', 383: 's', 7835: 's', 223: 'ss', 9443: 't', 65364: 't', 7787: 't', 7831: 't', 357: 't', 7789: 't', 539: 't', 355: 't', 7793: 't', 7791: 't', 359: 't', 429: 't', 648: 't', 11366: 't', 42887: 't', 42793: 'tz', 9444: 'u', 65365: 'u', 249: 'u', 250: 'u', 251: 'u', 361: 'u', 7801: 'u', 363: 'u', 7803: 'u', 365: 'u', 252: 'u', 476: 'u', 472: 'u', 470: 'u', 474: 'u', 7911: 'u', 367: 'u', 369: 'u', 468: 'u', 533: 'u', 535: 'u', 432: 'u', 7915: 'u', 7913: 'u', 7919: 'u', 7917: 'u', 7921: 'u', 7909: 'u', 7795: 'u', 371: 'u', 7799: 'u', 7797: 'u', 649: 'u', 9445: 'v', 65366: 'v', 7805: 'v', 7807: 'v', 651: 'v', 42847: 'v', 652: 'v', 42849: 'vy', 9446: 'w', 65367: 'w', 7809: 'w', 7811: 'w', 373: 'w', 7815: 'w', 7813: 'w', 7832: 'w', 7817: 'w', 11379: 'w', 9447: 'x', 65368: 'x', 7819: 'x', 7821: 'x', 9448: 'y', 65369: 'y', 7923: 'y', 253: 'y', 375: 'y', 7929: 'y', 563: 'y', 7823: 'y', 255: 'y', 7927: 'y', 7833: 'y', 7925: 'y', 436: 'y', 591: 'y', 7935: 'y', 9449: 'z', 65370: 'z', 378: 'z', 7825: 'z', 380: 'z', 382: 'z', 7827: 'z', 7829: 'z', 438: 'z', 549: 'z', 576: 'z', 11372: 'z', 42851: 'z', 65296: '0', 8320: '0', 9450: '0', 8304: '0', 185: '1', 9332: '1', 8321: '1', 10102: '1', 9461: '1', 9352: '1', 9312: '1', 65297: '1', 178: '2', 10103: '2', 9333: '2', 65298: '2', 8322: '2', 9462: '2', 9313: '2', 9353: '2', 179: '3', 65299: '3', 9354: '3', 9334: '3', 8323: '3', 10104: '3', 9463: '3', 9314: '3', 9464: '4', 9315: '4', 9355: '4', 65300: '4', 8308: '4', 8324: '4', 10105: '4', 9335: '4', 9356: '5', 8325: '5', 9465: '5', 9336: '5', 10106: '5', 9316: '5', 65301: '5', 8309: '5', 9337: '6', 8310: '6', 65302: '6', 10107: '6', 8326: '6', 9317: '6', 9466: '6', 9357: '6', 65303: '7', 8311: '7', 10108: '7', 9467: '7', 9358: '7', 8327: '7', 9338: '7', 9318: '7', 9319: '8', 9359: '8', 9468: '8', 9339: '8', 8312: '8', 65304: '8', 10109: '8', 8328: '8', 9469: '9', 65305: '9', 9360: '9', 10110: '9', 9340: '9', 8329: '9', 9320: '9', 8313: '9', };
    Diacritics.remove = (/**
     * @param {?} str
     * @return {?}
     */
    function (str) {
        /** @type {?} */
        var newStr = (/** @type {?} */ ([]));
        /** @type {?} */
        var alter = false;
        /** @type {?} */
        var length = (str && str.length) || 0;
        try {
            for (var i = 0; i < length; i++) {
                /** @type {?} */
                var c = str.charCodeAt(i);
                /** @type {?} */
                var replacement = ((/** @type {?} */ (Diacritics.map)))[c];
                if (replacement) {
                    newStr.push(replacement);
                    alter = true;
                }
                else {
                    newStr.push(str.charAt(i));
                }
            }
            if (alter) {
                str = newStr.join('');
            }
        }
        catch (e) {
            alert(e);
        }
        return str;
    });
    return Diacritics;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */
var Position = /** @class */ (function () {
    function Position(left, top) {
        this.left = left || 0;
        this.top = top || 0;
    }
    /**
     * @param {?} p1
     * @param {?} p2
     * @return {?}
     */
    Position.equals = /**
     * @param {?} p1
     * @param {?} p2
     * @return {?}
     */
    function (p1, p2) {
        return p1.left === p2.left && p1.top === p2.top;
    };
    /**
     * @param {?} x
     * @param {?} y
     * @return {?}
     */
    Position.prototype.offset = /**
     * @param {?} x
     * @param {?} y
     * @return {?}
     */
    function (x, y) {
        return new Position(this.left + x, this.top + y);
    };
    /**
     * @return {?}
     */
    Position.prototype.clone = /**
     * @return {?}
     */
    function () {
        return new Position(this.left, this.top);
    };
    /**
     * @param {?} xmin
     * @param {?} xmax
     * @param {?} ymin
     * @param {?} ymax
     * @return {?}
     */
    Position.prototype.constrain = /**
     * @param {?} xmin
     * @param {?} xmax
     * @param {?} ymin
     * @param {?} ymax
     * @return {?}
     */
    function (xmin, xmax, ymin, ymax) {
        return new Position(Math.min(Math.max(xmin, this.left), xmax), Math.min(Math.max(ymin, this.top), ymax));
    };
    /**
     * @param {?} x
     * @param {?} y
     * @param {?} xspan
     * @param {?=} yspan
     * @return {?}
     */
    Position.prototype.around = /**
     * @param {?} x
     * @param {?} y
     * @param {?} xspan
     * @param {?=} yspan
     * @return {?}
     */
    function (x, y, xspan, yspan) {
        return Math.abs(this.left - x) <= xspan && Math.abs(this.top - y) <= (yspan || xspan);
    };
    return Position;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {number} */
var RectOverlapDirection = {
    horizontal: 0,
    vertical: 1,
};
RectOverlapDirection[RectOverlapDirection.horizontal] = 'horizontal';
RectOverlapDirection[RectOverlapDirection.vertical] = 'vertical';
var Rect = /** @class */ (function () {
    function Rect(left, top, width, height) {
        if (typeof left === 'object') {
            /** @type {?} */
            var bounds = (/** @type {?} */ (left)) || {};
            this.left = bounds.left || 0;
            this.top = bounds.top || 0;
            this.width = bounds.right !== undefined ? bounds.right - this.left : bounds.width || 0;
            this.height = bounds.bottom !== undefined ? bounds.bottom - this.top : bounds.height || 0;
        }
        else {
            this.left = left || 0;
            this.top = top || 0;
            this.width = width || 0;
            this.height = height || 0;
        }
    }
    /**
     * @param {?} r1
     * @param {?} r2
     * @return {?}
     */
    Rect.equals = /**
     * @param {?} r1
     * @param {?} r2
     * @return {?}
     */
    function (r1, r2) {
        return r1 && r2 && r1.left === r2.left && r1.top === r2.top && r1.width === r2.width && r1.height === r2.height;
    };
    /**
     * @param {?} r1
     * @param {?} r2
     * @return {?}
     */
    Rect.union = /**
     * @param {?} r1
     * @param {?} r2
     * @return {?}
     */
    function (r1, r2) {
        return Rect.fromLTRB(Math.min(r1.left, r2.left), Math.min(r1.top, r2.top), Math.max(r1.left + r1.width, r2.left + r2.width), Math.max(r1.top + r1.height, r2.top + r2.height));
    };
    /**
     * @param {?} rect1
     * @param {?} rect2
     * @return {?}
     */
    Rect.overlapInfos = /**
     * @param {?} rect1
     * @param {?} rect2
     * @return {?}
     */
    function (rect1, rect2) {
        /** @type {?} */
        var x = Math.max(0, Math.min(rect1.right, rect2.right) - Math.max(rect1.left, rect2.left));
        /** @type {?} */
        var y = Math.max(0, Math.min(rect1.bottom, rect2.bottom) - Math.max(rect1.top, rect2.top));
        return {
            area: x * y,
            width: x,
            height: y,
            direction: x > y ? RectOverlapDirection.horizontal : RectOverlapDirection.vertical,
        };
    };
    /**
     * @param {?} left
     * @param {?} top
     * @param {?} right
     * @param {?} bottom
     * @return {?}
     */
    Rect.fromLTRB = /**
     * @param {?} left
     * @param {?} top
     * @param {?} right
     * @param {?} bottom
     * @return {?}
     */
    function (left, top, right, bottom) {
        return new Rect(left, top, right - left, bottom - top);
    };
    /**
     * @param {?} p1
     * @param {?} p2
     * @return {?}
     */
    Rect.fromPoints = /**
     * @param {?} p1
     * @param {?} p2
     * @return {?}
     */
    function (p1, p2) {
        return Rect.fromLTRB(Math.min(p1.left, p2.left), Math.min(p1.top, p2.top), Math.max(p1.left, p2.left), Math.max(p1.top, p2.top));
    };
    Object.defineProperty(Rect.prototype, "right", {
        get: /**
         * @return {?}
         */
        function () {
            return this.left + this.width;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.width = value - this.left;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rect.prototype, "bottom", {
        get: /**
         * @return {?}
         */
        function () {
            return this.top + this.height;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.height = value - this.top;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rect.prototype, "position", {
        get: /**
         * @return {?}
         */
        function () {
            return new Position(this.left, this.top);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} x
     * @param {?} y
     * @return {?}
     */
    Rect.prototype.offset = /**
     * @param {?} x
     * @param {?} y
     * @return {?}
     */
    function (x, y) {
        return new Rect(this.left + x, this.top + y, this.width, this.height);
    };
    /**
     * @param {?} bounds
     * @return {?}
     */
    Rect.prototype.adjacent = /**
     * @param {?} bounds
     * @return {?}
     */
    function (bounds) {
        return bounds.left <= this.right &&
            bounds.right >= this.left &&
            bounds.top <= this.bottom &&
            bounds.bottom >= this.top;
    };
    /**
     * @param {?} bounds
     * @return {?}
     */
    Rect.prototype.contains = /**
     * @param {?} bounds
     * @return {?}
     */
    function (bounds) {
        return bounds.left >= this.left && bounds.right <= this.right && bounds.top >= this.top && bounds.bottom <= this.bottom;
    };
    /**
     * @param {?} point
     * @return {?}
     */
    Rect.prototype.containsPoint = /**
     * @param {?} point
     * @return {?}
     */
    function (point) {
        return point.left >= this.left && point.left <= this.right && point.top >= this.top && point.top <= this.bottom;
    };
    /**
     * @param {?} bounds
     * @return {?}
     */
    Rect.prototype.intersectWith = /**
     * @param {?} bounds
     * @return {?}
     */
    function (bounds) {
        return bounds.left < this.right &&
            bounds.right > this.left &&
            bounds.top < this.bottom &&
            bounds.bottom > this.top;
    };
    /**
     * @return {?}
     */
    Rect.prototype.isEmpty = /**
     * @return {?}
     */
    function () {
        return !this.width || !this.height;
    };
    /**
     * @return {?}
     */
    Rect.prototype.clone = /**
     * @return {?}
     */
    function () {
        return new Rect(this.left, this.top, this.width, this.height);
    };
    /**
     * @return {?}
     */
    Rect.prototype.toClientRect = /**
     * @return {?}
     */
    function () {
        return (/** @type {?} */ ({
            left: this.left,
            top: this.top,
            bottom: this.bottom,
            right: this.right,
            width: this.width,
            height: this.height,
        }));
    };
    /**
     * @deprecated use toClientRect instead
     */
    /**
     * @deprecated use toClientRect instead
     * @return {?}
     */
    Rect.prototype.toRectStruct = /**
     * @deprecated use toClientRect instead
     * @return {?}
     */
    function () {
        return this.toClientRect();
    };
    return Rect;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var Circle = /** @class */ (function () {
    /** Create e new circle instance from the center position and the radius */
    function Circle(center, radius) {
        this.center = center;
        this.radius = radius;
    }
    /**
     * Return a circle from his outer rectangle.
     *
     * @param left      The left position of the circle center or a rectangle object.
     * @param top       The top position of the circle center
     * @param width     The width of the outer rectangle
     * @param height    The height of the outer rectangle
     * @return A circle contained end centered inside the passed ractangle
     */
    /**
     * Return a circle from his outer rectangle.
     *
     * @param {?=} left      The left position of the circle center or a rectangle object.
     * @param {?=} top       The top position of the circle center
     * @param {?=} width     The width of the outer rectangle
     * @param {?=} height    The height of the outer rectangle
     * @return {?} A circle contained end centered inside the passed ractangle
     */
    Circle.fromOuterRect = /**
     * Return a circle from his outer rectangle.
     *
     * @param {?=} left      The left position of the circle center or a rectangle object.
     * @param {?=} top       The top position of the circle center
     * @param {?=} width     The width of the outer rectangle
     * @param {?=} height    The height of the outer rectangle
     * @return {?} A circle contained end centered inside the passed ractangle
     */
    function (left, top, width, height) {
        if (typeof left === 'object') {
            /** @type {?} */
            var bounds = (/** @type {?} */ (left));
            left = bounds.left;
            top = bounds.top;
            width = bounds.width;
            height = bounds.height;
        }
        /** @type {?} */
        var radius = Math.min(width, height) / 2;
        /** @type {?} */
        var center = new Position(+left + (width / 2), top + (height / 2));
        return new Circle(center, radius);
    };
    /** Return a boolean indicating if the two circle are equals */
    /**
     * Return a boolean indicating if the two circle are equals
     * @param {?} c1
     * @param {?} c2
     * @return {?}
     */
    Circle.equals = /**
     * Return a boolean indicating if the two circle are equals
     * @param {?} c1
     * @param {?} c2
     * @return {?}
     */
    function (c1, c2) {
        return !c1 === !c2 && Position.equals(c1.center, c2.center) && c1.radius === c2.radius;
    };
    Object.defineProperty(Circle.prototype, "outerRect", {
        /** Return the outer rectangle of the circle */
        get: /**
         * Return the outer rectangle of the circle
         * @return {?}
         */
        function () {
            return Rect.fromLTRB(this.center.left - this.radius, this.center.top - this.radius, this.center.left + this.radius, this.center.top + this.radius);
        },
        enumerable: true,
        configurable: true
    });
    /** Return a boolean indicate if the circle contains the passed circle */
    /**
     * Return a boolean indicate if the circle contains the passed circle
     * @param {?} circle
     * @return {?}
     */
    Circle.prototype.contains = /**
     * Return a boolean indicate if the circle contains the passed circle
     * @param {?} circle
     * @return {?}
     */
    function (circle) {
        return this.outerRect.contains(circle.outerRect);
    };
    /** Return a boolean indicate if the passed point is inside the circle */
    /**
     * Return a boolean indicate if the passed point is inside the circle
     * @param {?} point
     * @return {?}
     */
    Circle.prototype.containsPoint = /**
     * Return a boolean indicate if the passed point is inside the circle
     * @param {?} point
     * @return {?}
     */
    function (point) {
        /** @type {?} */
        var dx = Math.abs(point.left - this.center.left);
        /** @type {?} */
        var dy = Math.abs(point.top - this.center.top);
        return dx * dx + dy * dy <= this.radius * this.radius;
    };
    /** Return a the cloned of the cirlce */
    /**
     * Return a the cloned of the cirlce
     * @return {?}
     */
    Circle.prototype.clone = /**
     * Return a the cloned of the cirlce
     * @return {?}
     */
    function () {
        return new Circle(this.center, this.radius);
    };
    /** Inflate the circle radius with the specified value */
    /**
     * Inflate the circle radius with the specified value
     * @param {?} radius
     * @return {?}
     */
    Circle.prototype.inflate = /**
     * Inflate the circle radius with the specified value
     * @param {?} radius
     * @return {?}
     */
    function (radius) {
        return new Circle(this.center, this.radius + radius);
    };
    return Circle;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */
/** @enum {number} */
var Directions = {
    none: 0,
    left: 1,
    right: 2,
    top: 4,
    bottom: 8,
    horizontal: 3,
    vertical: 12,
    all: 15,
};
Directions[Directions.none] = 'none';
Directions[Directions.left] = 'left';
Directions[Directions.right] = 'right';
Directions[Directions.top] = 'top';
Directions[Directions.bottom] = 'bottom';
Directions[Directions.horizontal] = 'horizontal';
Directions[Directions.vertical] = 'vertical';
Directions[Directions.all] = 'all';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */
var Size = /** @class */ (function () {
    function Size(width, height) {
        this.width = width || 0;
        this.height = height || 0;
    }
    /**
     * @param {?} s1
     * @param {?} s2
     * @return {?}
     */
    Size.equals = /**
     * @param {?} s1
     * @param {?} s2
     * @return {?}
     */
    function (s1, s2) {
        return s1.width === s2.width && s1.height === s2.height;
    };
    /**
     * @return {?}
     */
    Size.prototype.clone = /**
     * @return {?}
     */
    function () {
        return new Size(this.width, this.height);
    };
    return Size;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */
var UnitValue = /** @class */ (function () {
    function UnitValue(value, unit) {
        if (typeof value === 'string') {
            /** @type {?} */
            var match = value.match(/([0-9\.]+)(.*)/);
            this.value = match && match.length >= 2 && parseInt(match[1], 10);
            this.unit = match && match.length >= 3 && match[2];
        }
        else {
            this.value = value;
            this.unit = unit;
        }
    }
    /**
     * @param {?} s1
     * @param {?} s2
     * @return {?}
     */
    UnitValue.equals = /**
     * @param {?} s1
     * @param {?} s2
     * @return {?}
     */
    function (s1, s2) {
        return s1.value === s2.value && s1.unit === s2.unit;
    };
    /**
     * @return {?}
     */
    UnitValue.prototype.clone = /**
     * @return {?}
     */
    function () {
        return new UnitValue(this.value, this.unit);
    };
    /**
     * @return {?}
     */
    UnitValue.prototype.toString = /**
     * @return {?}
     */
    function () {
        return String(this.value) + this.unit;
    };
    /**
     * @return {?}
     */
    UnitValue.prototype.isInvalid = /**
     * @return {?}
     */
    function () {
        return this.value === undefined || this.value === null || isNaN(this.value);
    };
    return UnitValue;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */
/** @enum {number} */
var SortOrder = {
    /** Ascendant */
    ascending: 0,
    /** Descendant */
    descending: 1,
};
SortOrder[SortOrder.ascending] = 'ascending';
SortOrder[SortOrder.descending] = 'descending';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Classe de tri d'une liste plate ou hierarchique
 */
var  /**
 * Classe de tri d'une liste plate ou hierarchique
 */
SortingService = /** @class */ (function () {
    function SortingService() {
    }
    /** Trie les éléments de la liste plate spécifiée en fonction du modèle de tri spécifié. Peut être surchargé pour implémenter un tri asynchrone
     * @param list Liste à trier.
     * @param sortInfos Modèle de tri à appliquer.
     * @return Observable résolu par la fonction.
     */
    /**
     * Trie les éléments de la liste plate spécifiée en fonction du modèle de tri spécifié. Peut être surchargé pour implémenter un tri asynchrone
     * @param {?} list Liste à trier.
     * @param {?} sortInfos Modèle de tri à appliquer.
     * @return {?} Observable résolu par la fonction.
     */
    SortingService.prototype.sort$ = /**
     * Trie les éléments de la liste plate spécifiée en fonction du modèle de tri spécifié. Peut être surchargé pour implémenter un tri asynchrone
     * @param {?} list Liste à trier.
     * @param {?} sortInfos Modèle de tri à appliquer.
     * @return {?} Observable résolu par la fonction.
     */
    function (list, sortInfos) {
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["of"])(this.sort(list, sortInfos));
    };
    /** Trie les éléments de la liste plate spécifiée en fonction du modèle de tri spécifié
     * @param list Liste à trier.
     * @param sortInfos Modèle de tri à appliquer.
     * @return Liste triée.
     */
    /**
     * Trie les éléments de la liste plate spécifiée en fonction du modèle de tri spécifié
     * @param {?} list Liste à trier.
     * @param {?} sortInfos Modèle de tri à appliquer.
     * @return {?} Liste triée.
     */
    SortingService.prototype.sort = /**
     * Trie les éléments de la liste plate spécifiée en fonction du modèle de tri spécifié
     * @param {?} list Liste à trier.
     * @param {?} sortInfos Modèle de tri à appliquer.
     * @return {?} Liste triée.
     */
    function (list, sortInfos) {
        if (list && list.length) {
            /** @type {?} */
            var sis = sortInfos instanceof Array ? sortInfos : [sortInfos];
            /** @type {?} */
            var i = sis.length;
            while (--i >= 0) {
                /** @type {?} */
                var si = sis[i];
                list = Object(lodash__WEBPACK_IMPORTED_MODULE_0__["sortBy"])(list, si.name);
                if (si.order === SortOrder.descending) {
                    list = list.reverse();
                }
            }
        }
        return list;
    };
    /** Trie les éléments de la liste hierarchique spécifiée en fonction du modèle de tri spécifié.  Peut être surchargé pour implémenter un tri asynchrone
     * @param tree Liste à trier.
     * @param sortInfos Modèle de tri à appliquer.
     * @param childrenField Champ à utiliser pour la recherche dans les enfants d'un parent.
     * @return Observable résolue par la fonction.
     */
    /**
     * Trie les éléments de la liste hierarchique spécifiée en fonction du modèle de tri spécifié.  Peut être surchargé pour implémenter un tri asynchrone
     * @param {?} tree Liste à trier.
     * @param {?} sortInfos Modèle de tri à appliquer.
     * @param {?=} childrenField Champ à utiliser pour la recherche dans les enfants d'un parent.
     * @return {?} Observable résolue par la fonction.
     */
    SortingService.prototype.sortTree$ = /**
     * Trie les éléments de la liste hierarchique spécifiée en fonction du modèle de tri spécifié.  Peut être surchargé pour implémenter un tri asynchrone
     * @param {?} tree Liste à trier.
     * @param {?} sortInfos Modèle de tri à appliquer.
     * @param {?=} childrenField Champ à utiliser pour la recherche dans les enfants d'un parent.
     * @return {?} Observable résolue par la fonction.
     */
    function (tree, sortInfos, childrenField) {
        var _this = this;
        childrenField = childrenField || 'items';
        return this.sort$(tree, sortInfos).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["switchMap"])((/**
         * @param {?} child
         * @return {?}
         */
        function (child) { return child; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["switchMap"])((/**
         * @param {?} child
         * @return {?}
         */
        function (child) {
            if (!child || !child[childrenField]) {
                return Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["of"])(child);
            }
            return _this.sortTree$(child[childrenField], sortInfos, childrenField).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["map"])((/**
             * @param {?} sortedList
             * @return {?}
             */
            function (sortedList) {
                child[childrenField] = sortedList;
                return child;
            })));
        })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["reduce"])((/**
         * @param {?} acc
         * @param {?} cur
         * @return {?}
         */
        function (acc, cur) { return Object(tslib__WEBPACK_IMPORTED_MODULE_6__["__spread"])(acc, [cur]); }), []));
    };
    return SortingService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Service de regroupement d'un tableau de modèles
 */
var  /**
 * Service de regroupement d'un tableau de modèles
 */
GroupingService = /** @class */ (function () {
    function GroupingService() {
    }
    /** Groupe les éléments de la liste hierarchique spécifiée à partir du niveau spécifié, et en fonction du modèle de groupe spécifié
     * @param tree Liste à trier.
     * @param groupInfos Modèle de groupe à appliquer.
     * @param childrenField Champs à utiliser comme collection des enfants d'un parent.
     * @param depth Niveau à partir duquel le modèle de regroupement doit être appliqué.
     * @return Observable résolu par la fonction.
     */
    /**
     * Groupe les éléments de la liste hierarchique spécifiée à partir du niveau spécifié, et en fonction du modèle de groupe spécifié
     * @param {?} tree Liste à trier.
     * @param {?} groupInfos Modèle de groupe à appliquer.
     * @param {?=} childrenField Champs à utiliser comme collection des enfants d'un parent.
     * @return {?} Observable résolu par la fonction.
     */
    GroupingService.prototype.group$ = /**
     * Groupe les éléments de la liste hierarchique spécifiée à partir du niveau spécifié, et en fonction du modèle de groupe spécifié
     * @param {?} tree Liste à trier.
     * @param {?} groupInfos Modèle de groupe à appliquer.
     * @param {?=} childrenField Champs à utiliser comme collection des enfants d'un parent.
     * @return {?} Observable résolu par la fonction.
     */
    function (tree, groupInfos, childrenField) {
        var _this = this;
        if (childrenField === void 0) { childrenField = 'items'; }
        if (!tree || tree.length === 0 || !groupInfos) {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["of"])(tree);
        }
        if (groupInfos instanceof Array) {
            // Create a observable stream with a sequence for each groupinfos.
            /** @type {?} */
            var result$_1 = Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["of"])(tree);
            groupInfos.forEach((/**
             * @param {?} groupInfo
             * @return {?}
             */
            function (groupInfo) { return result$_1 = result$_1.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["switchMap"])((/**
             * @param {?} t
             * @return {?}
             */
            function (t) { return _this.group$(t, groupInfo, childrenField); }))); }));
            return result$_1;
        }
        else {
            // Group the tree with the current groupInfo
            /** @type {?} */
            var groupInfo_1 = (/** @type {?} */ (groupInfos));
            if (!tree[0][childrenField]) {
                // No children, group the tree
                return this.groupChildren$(tree, groupInfo_1, 0, childrenField);
            }
            /** @type {?} */
            var groupTree$_1 = (/**
             * @param {?} t
             * @param {?} curDepth
             * @return {?}
             */
            function (t, curDepth) {
                return Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["from"])(t).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["switchMap"])((/**
                 * @param {?} treeItem
                 * @return {?}
                 */
                function (treeItem) {
                    /** @type {?} */
                    var children = treeItem[childrenField];
                    if (children[0] && children[0][childrenField]) {
                        return groupTree$_1(children, curDepth + 1).map((/**
                         * @return {?}
                         */
                        function () { return treeItem; }));
                    }
                    else {
                        return _this.groupChildren$(children, groupInfo_1, curDepth, childrenField).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["map"])((/**
                         * @param {?} groupedChildren
                         * @return {?}
                         */
                        function (groupedChildren) {
                            treeItem[childrenField] = groupedChildren;
                            return treeItem;
                        })));
                    }
                })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["reduce"])((/**
                 * @param {?} acc
                 * @param {?} cur
                 * @return {?}
                 */
                function (acc, cur) { return Object(tslib__WEBPACK_IMPORTED_MODULE_6__["__spread"])(acc, [cur]); }), []));
            });
            // If the tree has chidren, group only the last level items
            return groupTree$_1(tree, 1);
        }
    };
    /**
     * @deprecated > 06.11.2017
     */
    /**
     * @deprecated > 06.11.2017
     * @param {?} tree
     * @param {?} groupInfos
     * @param {?=} childrenField
     * @return {?}
     */
    GroupingService.prototype.group = /**
     * @deprecated > 06.11.2017
     * @param {?} tree
     * @param {?} groupInfos
     * @param {?=} childrenField
     * @return {?}
     */
    function (tree, groupInfos, childrenField) {
        return this.group$(tree, groupInfos, childrenField).toPromise();
    };
    /**
     * @protected
     * @param {?} list
     * @param {?} groupInfo
     * @param {?} _depth
     * @param {?} childrenField
     * @return {?}
     */
    GroupingService.prototype.groupChildren$ = /**
     * @protected
     * @param {?} list
     * @param {?} groupInfo
     * @param {?} _depth
     * @param {?} childrenField
     * @return {?}
     */
    function (list, groupInfo, _depth, childrenField) {
        var _this = this;
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["of"])(list).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["switchMap"])((/**
         * @param {?} l
         * @return {?}
         */
        function (l) { return l; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["reduce"])((/**
         * @param {?} groups
         * @param {?} item
         * @return {?}
         */
        function (groups, item) {
            /** @type {?} */
            var groupedBy = typeof groupInfo.groupByField === 'function' ? groupInfo.groupByField(item) : item[groupInfo.groupByField];
            if (typeof item[groupedBy] === 'function') {
                groupedBy = item[groupedBy]();
            }
            if (!groupedBy) {
                groupedBy = _this.getTextValue(item);
            }
            /** @type {?} */
            var parent = groups[groupedBy];
            if (!parent) {
                /** @type {?} */
                var groupLabel_1 = groupInfo.groupTextField ? (typeof groupInfo.groupTextField === 'function' ? groupInfo.groupTextField(item) : item[groupInfo.groupTextField]) : groupedBy;
                parent = groups[groupedBy] = (/** @type {?} */ ({
                    depth: _depth,
                    toString: (/**
                     * @return {?}
                     */
                    function () { return groupLabel_1; }),
                    $text: groupLabel_1,
                }));
                ((/** @type {?} */ (parent)))[childrenField] = [];
            }
            ((/** @type {?} */ (parent)))[childrenField].push(item);
            return groups;
        }), {}), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["map"])((/**
         * @param {?} grps
         * @return {?}
         */
        function (grps) { return Object.keys(grps).map((/**
         * @param {?} key
         * @return {?}
         */
        function (key) { return grps[key]; })); })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["tap"])((/**
         * @param {?} groupedChildren
         * @return {?}
         */
        function (groupedChildren) { return groupedChildren.forEach((/**
         * @param {?} parent
         * @return {?}
         */
        function (parent) { return parent.sortField = (groupInfo.sortInfos && groupInfo.sortInfos.name) || 'toString'; })); })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["switchMap"])((/**
         * @param {?} groupedChildren
         * @return {?}
         */
        function (groupedChildren) {
            if (groupInfo.sortInfos) {
                /** @type {?} */
                var sortingService = new SortingService();
                return sortingService.sort$(groupedChildren, groupInfo.sortInfos);
            }
            else {
                return Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["of"])(groupedChildren);
            }
        })));
    };
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    GroupingService.prototype.getTextValue = /**
     * @private
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (!value) {
            return '';
        }
        else {
            if (value.displayName) {
                return typeof value.displayName === 'string' ? value.displayName : value.displayName();
            }
            else if (typeof value.toString === 'function') {
                return value.toString();
            }
        }
    };
    return GroupingService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var GroupingModule = /** @class */ (function () {
    function GroupingModule() {
    }
    GroupingModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_11__["NgModule"], args: [{
                    providers: [
                        SortingService,
                        GroupingService,
                    ],
                },] }
    ];
    return GroupingModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var IconService = /** @class */ (function () {
    function IconService(iconRegistry, sanitizer) {
        this.iconRegistry = iconRegistry;
        this.sanitizer = sanitizer;
    }
    /**
     * register an SVG icon to the MatIconRegistry, so that this icon can be used with the MatIcon component.
     *
     * &lt;mat-icon svgIcon='my-svg-icon' &gt;&lt;/mat-icon&gt;
     *
     * @param iconName
     * @param iconUrl
     */
    /**
     * register an SVG icon to the MatIconRegistry, so that this icon can be used with the MatIcon component.
     *
     * &lt;mat-icon svgIcon='my-svg-icon' &gt;&lt;/mat-icon&gt;
     *
     * @param {?} iconName
     * @param {?} iconUrl
     * @return {?}
     */
    IconService.prototype.addSvgIcon = /**
     * register an SVG icon to the MatIconRegistry, so that this icon can be used with the MatIcon component.
     *
     * &lt;mat-icon svgIcon='my-svg-icon' &gt;&lt;/mat-icon&gt;
     *
     * @param {?} iconName
     * @param {?} iconUrl
     * @return {?}
     */
    function (iconName, iconUrl) {
        this.iconRegistry.addSvgIcon(iconName, this.sanitizer.bypassSecurityTrustResourceUrl(iconUrl));
    };
    /**
     * @param {?=} value
     * @return {?}
     */
    IconService.prototype.useMaterialIcons = /**
     * @param {?=} value
     * @return {?}
     */
    function (value) {
        if (value === void 0) { value = true; }
        this.iconRegistry.registerFontClassAlias('deja-icons', value ? 'material-icons' : null);
    };
    IconService.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_11__["Injectable"] }
    ];
    /** @nocollapse */
    IconService.ctorParameters = function () { return [
        { type: _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatIconRegistry"] },
        { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["DomSanitizer"] }
    ]; };
    return IconService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var IconModule = /** @class */ (function () {
    function IconModule() {
    }
    IconModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_11__["NgModule"], args: [{
                    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_10__["CommonModule"], _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClientModule"]],
                    providers: [IconService],
                },] }
    ];
    return IconModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var DejaItemComponent = /** @class */ (function () {
    function DejaItemComponent() {
    }
    Object.defineProperty(DejaItemComponent.prototype, "selected", {
        get: /**
         * @return {?}
         */
        function () {
            return this._selected;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._selected = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_4__["coerceBooleanProperty"])(value);
        },
        enumerable: true,
        configurable: true
    });
    DejaItemComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_11__["Component"], args: [{
                    selector: 'deja-item',
                    template: ''
                }] }
    ];
    DejaItemComponent.propDecorators = {
        value: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_11__["Input"] }],
        text: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_11__["Input"] }],
        selected: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_11__["Input"] }]
    };
    return DejaItemComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {number} */
var ViewportMode = {
    disabled: 0,
    fixed: 1,
    variable: 2,
    auto: 3,
};
ViewportMode[ViewportMode.disabled] = 'disabled';
ViewportMode[ViewportMode.fixed] = 'fixed';
ViewportMode[ViewportMode.variable] = 'variable';
ViewportMode[ViewportMode.auto] = 'auto';
/** @enum {number} */
var ViewportDirection = {
    vertical: 0,
    horizontal: 1,
};
ViewportDirection[ViewportDirection.vertical] = 'vertical';
ViewportDirection[ViewportDirection.horizontal] = 'horizontal';
/**
 * Service de gestion du viewport d'une liste.
 * Ce service permet la gestion du viewport verticalement ou horizontalement.
 */
var ViewPortService = /** @class */ (function () {
    function ViewPortService() {
        var _this = this;
        this.mode$ = new rxjs__WEBPACK_IMPORTED_MODULE_8__["BehaviorSubject"](ViewportMode.fixed);
        this.items$ = new rxjs__WEBPACK_IMPORTED_MODULE_8__["BehaviorSubject"]([]);
        this.maxSize$ = new rxjs__WEBPACK_IMPORTED_MODULE_8__["BehaviorSubject"](0);
        this.ensureItem$ = new rxjs__WEBPACK_IMPORTED_MODULE_8__["BehaviorSubject"](null);
        this.scrollPosition$ = new rxjs__WEBPACK_IMPORTED_MODULE_8__["BehaviorSubject"](0);
        this.element$ = new rxjs__WEBPACK_IMPORTED_MODULE_8__["ReplaySubject"](1);
        this.itemsSize$ = new rxjs__WEBPACK_IMPORTED_MODULE_8__["BehaviorSubject"](0);
        this.direction$ = new rxjs__WEBPACK_IMPORTED_MODULE_8__["BehaviorSubject"](ViewportDirection.vertical);
        this.subscriptions = (/** @type {?} */ ([]));
        this.refresh$ = new rxjs__WEBPACK_IMPORTED_MODULE_8__["BehaviorSubject"](null);
        this.deleteSizeCache$ = new rxjs__WEBPACK_IMPORTED_MODULE_8__["BehaviorSubject"](true);
        this.emptyViewPort = (/** @type {?} */ ({
            beforeSize: 0,
            afterSize: 0,
            viewPortSize: 0,
            listSize: 0,
            visibleItems: [],
            startIndex: 0,
            endIndex: 0,
            scrollPos: 0,
            items: [],
        }));
        this.measureViewPort = (/** @type {?} */ ({
            beforeSize: 0,
            afterSize: 200000,
            viewPortSize: 0,
            listSize: 0,
            visibleItems: [],
            startIndex: 0,
            endIndex: 0,
            scrollPos: undefined,
            // Do not change the scroll pos in case of refresh is called when the list is scrolling (I.E. dynamic content loading)
            items: [],
        }));
        this.viewPortResult$ = new rxjs__WEBPACK_IMPORTED_MODULE_8__["BehaviorSubject"](this.emptyViewPort);
        this._mode = ViewportMode.fixed;
        this._itemsSize = ViewPortService.itemDefaultSize;
        this._direction = ViewportDirection.vertical;
        this._scrollPosition = 0;
        this.ignoreScrollCount = 0;
        this.viewPort$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["from"])(this.viewPortResult$);
        // const consoleLog = (_message: string) => {
        //     // console.log(_message);
        // };
        /** @type {?} */
        var innerSize = (/**
         * @return {?}
         */
        function () {
            return _this._direction === ViewportDirection.horizontal ? window.innerWidth : window.innerHeight;
        });
        /** @type {?} */
        var clientSize = (/**
         * @param {?} element
         * @return {?}
         */
        function (element) {
            return Math.ceil(_this._direction === ViewportDirection.horizontal ? element.clientWidth : element.clientHeight);
        });
        /** @type {?} */
        var calcFixedSizeViewPort$ = (/**
         * @param {?} items
         * @param {?} containerSize
         * @param {?} scrollPos
         * @param {?} itemDefaultSize
         * @param {?} ensureParams
         * @return {?}
         */
        function (items, containerSize, scrollPos, itemDefaultSize, ensureParams) {
            // consoleLog(`calcFixedSizeViewPort`);
            /** @type {?} */
            var maxCount = Math.ceil(containerSize / itemDefaultSize) + 1;
            /** @type {?} */
            var startRow = Math.floor(scrollPos / itemDefaultSize);
            /** @type {?} */
            var rowsCount = Math.min(items.length - startRow, maxCount);
            /** @type {?} */
            var startIndex;
            /** @type {?} */
            var endIndex;
            /** @type {?} */
            var newScrollPos;
            if (!ensureParams || ensureParams.index === undefined || !ensureParams.atEnd) {
                if (rowsCount < 0) {
                    endIndex = items.length - 1;
                    startIndex = endIndex + 1 - Math.min(items.length, maxCount);
                }
                else if (ensureParams.index !== undefined) {
                    startIndex = ensureParams.index;
                    endIndex = startIndex + rowsCount - 1;
                    newScrollPos = startIndex * itemDefaultSize;
                }
                else {
                    startIndex = startRow;
                    endIndex = startIndex + rowsCount - 1;
                }
            }
            else {
                // Ensure visible from the end
                startIndex = Math.max(0, ensureParams.index + 1 - Math.min(items.length, maxCount));
                endIndex = Math.max(ensureParams.index, rowsCount - 1);
                newScrollPos = (endIndex + 1) * itemDefaultSize - containerSize;
            }
            /** @type {?} */
            var visibleItems = items.slice(startIndex, endIndex + 1);
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["of"])((/** @type {?} */ ({
                beforeSize: startIndex * itemDefaultSize,
                afterSize: (items.length - endIndex - 1) * itemDefaultSize,
                listSize: containerSize,
                viewPortSize: visibleItems.length * itemDefaultSize,
                visibleItems: visibleItems,
                startIndex: startIndex,
                endIndex: endIndex,
                scrollPos: newScrollPos,
                items: items,
            })));
        });
        /** @type {?} */
        var calcVariableSizeViewPort$ = (/**
         * @param {?} items
         * @param {?} containerSize
         * @param {?} scrollPos
         * @param {?} itemDefaultSize
         * @param {?} ensureParams
         * @return {?}
         */
        function (items, containerSize, scrollPos, itemDefaultSize, ensureParams) {
            // consoleLog(`calcVariableSizeViewPort`);
            /** @type {?} */
            var visibleList = (/** @type {?} */ ([]));
            /** @type {?} */
            var startIndex;
            /** @type {?} */
            var endIndex;
            /** @type {?} */
            var beforeSize = 0;
            /** @type {?} */
            var viewPortSize = 0;
            /** @type {?} */
            var afterSize = 0;
            /** @type {?} */
            var newScrollPos;
            if (!ensureParams || ensureParams.index === undefined || !ensureParams.atEnd) {
                items.forEach((/**
                 * @param {?} item
                 * @param {?} index
                 * @return {?}
                 */
                function (item, index) {
                    /** @type {?} */
                    var itemSize = item.size || itemDefaultSize;
                    if (ensureParams && ensureParams.index === index) {
                        startIndex = index;
                        newScrollPos = beforeSize;
                    }
                    if (startIndex === undefined) {
                        if (beforeSize + itemSize >= scrollPos) {
                            startIndex = index;
                        }
                        else {
                            beforeSize += itemSize;
                        }
                    }
                    if (startIndex !== undefined && endIndex === undefined) {
                        viewPortSize += itemSize;
                        visibleList.push(item);
                    }
                    if (endIndex === undefined) {
                        if ((beforeSize + viewPortSize > (newScrollPos || scrollPos) + containerSize) || index === items.length - 1) {
                            endIndex = index;
                        }
                    }
                    else {
                        afterSize += itemSize;
                    }
                }));
            }
            else {
                // Ensure visible from the end
                /** @type {?} */
                var index = items.length;
                while (--index >= 0) {
                    /** @type {?} */
                    var item = items[index];
                    /** @type {?} */
                    var itemSize = item.size || itemDefaultSize;
                    if (ensureParams.index === index) {
                        endIndex = index;
                    }
                    if (endIndex !== undefined) {
                        if (startIndex === undefined) {
                            viewPortSize += itemSize;
                            visibleList.unshift(item);
                            if (viewPortSize > containerSize || index === 0) {
                                startIndex = index;
                                newScrollPos = viewPortSize - containerSize;
                            }
                        }
                        else {
                            newScrollPos += itemSize;
                            beforeSize += itemSize;
                        }
                    }
                    else {
                        afterSize += itemSize;
                    }
                }
            }
            if (ensureParams && ensureParams.index !== undefined && viewPortSize < containerSize && visibleList.length < items.length) {
                if (ensureParams.atEnd) {
                    return calcVariableSizeViewPort$(items, containerSize, scrollPos, itemDefaultSize, (/** @type {?} */ ({
                        index: 0,
                        atEnd: false,
                    })));
                }
                else {
                    return calcVariableSizeViewPort$(items, containerSize, scrollPos, itemDefaultSize, (/** @type {?} */ ({
                        index: items.length - 1,
                        atEnd: true,
                    })));
                }
            }
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["of"])((/** @type {?} */ ({
                beforeSize: beforeSize,
                afterSize: afterSize,
                listSize: containerSize,
                viewPortSize: viewPortSize,
                visibleItems: visibleList,
                startIndex: startIndex || 0,
                endIndex: endIndex,
                scrollPos: newScrollPos,
                items: items,
            })));
        });
        /** @type {?} */
        var calcAutoSizeViewPort$ = (/**
         * @param {?} items
         * @param {?} containerSize
         * @param {?} scrollPos
         * @param {?} element
         * @param {?} itemDefaultSize
         * @param {?} ensureParams
         * @param {?=} isCalculation
         * @return {?}
         */
        function (items, containerSize, scrollPos, element, itemDefaultSize, ensureParams, isCalculation) {
            // consoleLog(`calcAutoSizeViewPort`);
            return calcVariableSizeViewPort$(items, containerSize, scrollPos, itemDefaultSize, ensureParams).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["switchMap"])((/**
             * @param {?} viewPort
             * @return {?}
             */
            function (viewPort) {
                /** @type {?} */
                var calculationRequired = !isCalculation && viewPort.visibleItems.find((/**
                 * @param {?} item
                 * @return {?}
                 */
                function (item) { return !item.size; }));
                if (!calculationRequired) {
                    return Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["of"])(viewPort);
                }
                else {
                    // Measure items size
                    _this.viewPortResult$.next(viewPort);
                    return Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["timer"])(1).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["tap"])((/**
                     * @return {?}
                     */
                    function () {
                        /** @type {?} */
                        var elements = element.getElementsByClassName('listitem');
                        // tslint:disable-next-line:prefer-for-of
                        for (var i = 0; i < elements.length; i++) {
                            /** @type {?} */
                            var itemElement = (/** @type {?} */ (elements[i]));
                            /** @type {?} */
                            var index = +itemElement.getAttribute('flat');
                            /** @type {?} */
                            var item = viewPort.visibleItems[index - viewPort.startIndex];
                            if (item) {
                                item.size = clientSize(itemElement);
                            }
                        }
                        // Recalc Viewport size
                        viewPort.viewPortSize = viewPort.visibleItems.reduce((/**
                         * @param {?} size
                         * @param {?} item
                         * @return {?}
                         */
                        function (size, item) { return size += item.size || itemDefaultSize; }), 0);
                    })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["switchMap"])((/**
                     * @return {?}
                     */
                    function () { return calcVariableSizeViewPort$(items, containerSize, viewPort.scrollPos || scrollPos, itemDefaultSize, ensureParams); })));
                }
            })));
        });
        /** @type {?} */
        var calcDisabledViewPort$ = (/**
         * @param {?} items
         * @param {?} containerSize
         * @param {?} scrollPos
         * @param {?} element
         * @param {?} ensureParams
         * @param {?} bindIfAny
         * @return {?}
         */
        function (items, containerSize, scrollPos, element, ensureParams, bindIfAny) {
            /** @type {?} */
            var viewPortSize = 0;
            /** @type {?} */
            var startIndex;
            /** @type {?} */
            var endIndex;
            /** @type {?} */
            var newScrollPos;
            /** @type {?} */
            var elements = element.getElementsByClassName('listitem');
            /** @type {?} */
            var viewPort = (/** @type {?} */ ({
                beforeSize: 0,
                afterSize: 0,
                listSize: containerSize,
                viewPortSize: 0,
                visibleItems: [],
                startIndex: 0,
                endIndex: 0,
                scrollPos: 0,
                items: items,
            }));
            if (elements.length !== items.length && bindIfAny !== false) {
                _this.viewPortResult$.next(viewPort);
                return Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["timer"])(1).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["switchMap"])((/**
                 * @return {?}
                 */
                function () { return calcDisabledViewPort$(items, containerSize, scrollPos, element, ensureParams, false); })));
            }
            if (!ensureParams || ensureParams.index === undefined || !ensureParams.atEnd) {
                for (var i = 0; i < elements.length; i++) {
                    /** @type {?} */
                    var itemElement = (/** @type {?} */ (elements[i]));
                    /** @type {?} */
                    var itemSize = items[i].size = clientSize(itemElement);
                    if (ensureParams && ensureParams.index === i) {
                        startIndex = i;
                        newScrollPos = viewPortSize;
                    }
                    viewPortSize += itemSize;
                    if (startIndex === undefined && viewPortSize > scrollPos) {
                        startIndex = i;
                    }
                    if (endIndex === undefined && viewPortSize > (newScrollPos || scrollPos) + containerSize) {
                        endIndex = i;
                    }
                }
            }
            else {
                // Ensure visible from the end
                newScrollPos = 0;
                /** @type {?} */
                var listSize = 0;
                /** @type {?} */
                var i = elements.length;
                while (--i >= 0) {
                    /** @type {?} */
                    var itemElement = (/** @type {?} */ (elements[i]));
                    /** @type {?} */
                    var itemSize = items[i].size = clientSize(itemElement);
                    if (ensureParams.index === i) {
                        endIndex = i;
                    }
                    if (endIndex !== undefined) {
                        if (startIndex === undefined) {
                            listSize += itemSize;
                            if (listSize > containerSize) {
                                startIndex = i;
                                newScrollPos = listSize - containerSize;
                            }
                        }
                        else {
                            newScrollPos += itemSize;
                        }
                    }
                    viewPortSize += itemSize;
                }
            }
            startIndex = startIndex || 0;
            endIndex = endIndex || 0;
            // consoleLog(`viewPortSize ${viewPortSize}`);
            viewPort = (/** @type {?} */ ({
                beforeSize: 0,
                afterSize: 0,
                listSize: containerSize,
                viewPortSize: viewPortSize,
                visibleItems: items.slice(startIndex, 1 + endIndex),
                startIndex: startIndex,
                endIndex: endIndex,
                scrollPos: newScrollPos,
                items: items,
            }));
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["of"])(viewPort);
        });
        /** @type {?} */
        var calcViewPort$ = (/**
         * @param {?} items
         * @param {?} maxSize
         * @param {?} scrollPos
         * @param {?} element
         * @param {?} itemDefaultSize
         * @param {?} ensureParams
         * @param {?=} fromMeasure
         * @return {?}
         */
        function (items, maxSize, scrollPos, element, itemDefaultSize, ensureParams, fromMeasure) {
            // consoleLog(`calcViewPort`);
            if (!items || !items.length) {
                return Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["of"])(_this.emptyViewPort);
            }
            /** @type {?} */
            var listSize = maxSize || clientSize(element);
            if (listSize <= ViewPortService.itemDefaultSize) {
                listSize = innerSize();
            }
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["of"])(_this.mode).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["switchMap"])((/**
             * @param {?} mode
             * @return {?}
             */
            function (mode) {
                if (ensureParams.index !== undefined) {
                    _this.ignoreScrollCount++;
                }
                else {
                    _this.ignoreScrollCount = 0;
                }
                switch (mode) {
                    case ViewportMode.disabled:
                        return calcDisabledViewPort$(items, listSize, scrollPos, element, ensureParams, true);
                    case ViewportMode.variable:
                        return calcVariableSizeViewPort$(items, listSize, scrollPos, itemDefaultSize, ensureParams);
                    case ViewportMode.auto:
                        return calcAutoSizeViewPort$(items, listSize, scrollPos, element, itemDefaultSize, ensureParams);
                    case ViewportMode.fixed:
                        return calcFixedSizeViewPort$(items, listSize, scrollPos, itemDefaultSize, ensureParams);
                    default:
                        throw new Error('ViewPortService, invalide mode. The value can be disabled, variable, auto and fixed.');
                }
            })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["switchMap"])((/**
             * @param {?} viewPort
             * @return {?}
             */
            function (viewPort) {
                if (!fromMeasure) {
                    /** @type {?} */
                    var endScrollPos = viewPort.beforeSize + viewPort.viewPortSize + viewPort.afterSize - viewPort.listSize;
                    if (_this.mode !== ViewportMode.disabled && listSize < 2 * ViewPortService.itemDefaultSize) {
                        // Measure again container and recalc viewport
                        _this.viewPortResult$.next(_this.measureViewPort);
                        return Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["timer"])(1).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["switchMap"])((/**
                         * @return {?}
                         */
                        function () { return calcViewPort$(items, maxSize, scrollPos, element, itemDefaultSize, ensureParams, true); })));
                    }
                    else if (endScrollPos < 0 || (items.length && endScrollPos > 0 && (viewPort.scrollPos || scrollPos) > endScrollPos)) {
                        // Scroll position is over the last item
                        // Ensure last item visible and recalc viewport
                        return calcViewPort$(items, maxSize, 0, element, itemDefaultSize, (/** @type {?} */ ({
                            index: items.length - 1,
                            atEnd: true,
                        })), true);
                    }
                    else if (_this.mode === ViewportMode.auto && viewPort.viewPortSize < listSize) {
                        // Rendered viewport is to small, render again to complete
                        return calcViewPort$(items, maxSize, 0, element, itemDefaultSize, (/** @type {?} */ ({
                            index: items.length - 1,
                            atEnd: true,
                        })), true);
                    }
                }
                // Return calculated viewport
                return Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["of"])(viewPort);
            })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["tap"])((/**
             * @return {?}
             */
            function () {
                // consoleLog(`clear ensureParams ${ensureParams && ensureParams.index}`);
                ensureParams.index = undefined;
            })));
        });
        /** @type {?} */
        var items$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["from"])(this.items$);
        // .do(() => consoleLog('items'));
        // Ensure item visible by index or instance
        this.ensureParams$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["combineLatest"])(this.ensureItem$, items$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["map"])((/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_6__["__read"])(_a, 2), ensureItem = _b[0], items = _b[1];
            _this.ignoreScrollCount = 0;
            /** @type {?} */
            var ensureParams = (/** @type {?} */ ({}));
            if (ensureItem !== undefined && ensureItem !== null && items && items.length) {
                /** @type {?} */
                var ensureIndex = (/** @type {?} */ (ensureItem));
                if (isNaN(ensureIndex)) {
                    ensureIndex = items.findIndex((/**
                     * @param {?} itm
                     * @return {?}
                     */
                    function (itm) { return ensureItem === itm; }));
                }
                if (ensureIndex >= 0) {
                    if (_this.viewPort && ensureIndex <= _this.viewPort.startIndex) {
                        ensureParams.index = ensureIndex;
                        ensureParams.atEnd = false;
                    }
                    else if (!_this.viewPort || ensureIndex >= _this.viewPort.endIndex) {
                        ensureParams.index = ensureIndex;
                        ensureParams.atEnd = true;
                    }
                }
            }
            return ensureParams;
        })));
        // .do((ensureParams) => consoleLog(`ensureParams index:${ensureParams && ensureParams.index} atEnd:${ensureParams && ensureParams.atEnd}`));
        /** @type {?} */
        var maxSize$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["from"])(this.maxSize$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["distinctUntilChanged"])());
        // .do((value) => consoleLog(`maxSize ${value}`));
        /** @type {?} */
        var refresh$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["from"])(this.refresh$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["switchMap"])((/**
         * @param {?} params
         * @return {?}
         */
        function (params) {
            _this.ignoreScrollCount = 0;
            if (params) {
                if (params.clearMeasuredSize) {
                    return Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["from"])(_this.items$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["tap"])((/**
                     * @param {?} items
                     * @return {?}
                     */
                    function (items) {
                        _this.lastCalculatedSize = undefined;
                        items.forEach((/**
                         * @param {?} item
                         * @return {?}
                         */
                        function (item) { return item.size = undefined; }));
                    })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["map"])((/**
                     * @return {?}
                     */
                    function () { return params; })));
                }
                if (params.items) {
                    params.items.forEach((/**
                     * @param {?} item
                     * @return {?}
                     */
                    function (item) { return item.size = undefined; }));
                }
            }
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["of"])(params);
        })));
        // .do(() => consoleLog('refresh'));
        /** @type {?} */
        var scrollPos$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["from"])(this.scrollPosition$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["map"])((/**
         * @param {?} scrollPos
         * @return {?}
         */
        function (scrollPos) { return _this._scrollPosition = scrollPos || 0; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["map"])((/**
         * @param {?} scrollPos
         * @return {?}
         */
        function (scrollPos) { return Math.max(scrollPos, 0); })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["filter"])((/**
         * @return {?}
         */
        function () {
            if (_this.ignoreScrollCount > 0) {
                _this.ignoreScrollCount--;
                // consoleLog(`ignoreScrollCount ${this.ignoreScrollCount}`);
                return false;
            }
            else {
                return true;
            }
        })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["distinctUntilChanged"])());
        // .do((value) => consoleLog(`scrollPos ${value}`));
        /** @type {?} */
        var mode$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["from"])(this.mode$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["map"])((/**
         * @param {?} mode
         * @return {?}
         */
        function (mode) {
            _this._mode = typeof mode === 'string' ? ((/** @type {?} */ (ViewportMode)))[mode] : mode;
            return _this._mode;
        })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["distinctUntilChanged"])());
        // .do((value) => consoleLog(`mode ${value}`));
        /** @type {?} */
        var direction$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["from"])(this.direction$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["map"])((/**
         * @param {?} direction
         * @return {?}
         */
        function (direction) {
            _this._direction = typeof direction === 'string' ? ((/** @type {?} */ (ViewportDirection)))[direction] : direction;
            return _this._direction;
        })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["distinctUntilChanged"])());
        // .do((value) => consoleLog(`direction ${value}`));
        /** @type {?} */
        var itemsSize$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["from"])(this.itemsSize$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["distinctUntilChanged"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["tap"])((/**
         * @param {?} value
         * @return {?}
         */
        function (value) { return _this._itemsSize = value; })));
        // .do((value) => consoleLog(`itemsSize ${value}`));
        /** @type {?} */
        var element$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["from"])(this.element$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["tap"])((/**
         * @param {?} element
         * @return {?}
         */
        function (element) {
            if (!element) {
                _this.viewPort = undefined;
                _this.ignoreScrollCount = 0;
                _this.lastCalculatedSize = undefined;
            }
        })));
        // .do(() => consoleLog(`element`));
        // Reset items size when direction change in auto mode
        this.subscriptions.push(Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["combineLatest"])(direction$, items$, mode$, this.deleteSizeCache$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["filter"])((/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_6__["__read"])(_a, 3), _direction = _b[0], items = _b[1], mode = _b[2];
            return items && items.length && mode === ViewportMode.auto;
        })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["switchMap"])((/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_6__["__read"])(_a, 2), _direction = _b[0], items = _b[1];
            return items;
        })))
            .subscribe((/**
         * @param {?} item
         * @return {?}
         */
        function (item) {
            item.size = undefined;
        })));
        // Calc view port observable
        this.subscriptions.push(Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["combineLatest"])(element$, items$, refresh$, this.ensureParams$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["combineLatest"])(direction$, mode$, itemsSize$, maxSize$), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["debounceTime"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["combineLatest"])(scrollPos$), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["filter"])((/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_6__["__read"])(_a, 1), _c = Object(tslib__WEBPACK_IMPORTED_MODULE_6__["__read"])(_b[0], 1), _d = Object(tslib__WEBPACK_IMPORTED_MODULE_6__["__read"])(_c[0], 1), element = _d[0];
            return !!element;
        })), 
        // .do(([[[_element, _items, _refresh, ensureParams], _direction, _mode, _itemDefaultSize, _maxSize], _scrollPos]) => consoleLog(`combineLatest ${JSON.stringify(ensureParams)}`))
        Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["switchMap"])((/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_6__["__read"])(_a, 2), _c = Object(tslib__WEBPACK_IMPORTED_MODULE_6__["__read"])(_b[0], 5), _d = Object(tslib__WEBPACK_IMPORTED_MODULE_6__["__read"])(_c[0], 4), element = _d[0], items = _d[1], _refresh = _d[2], ensureParams = _d[3], _direction = _c[1], _mode = _c[2], itemDefaultSize = _c[3], maxSize = _c[4], _scrollPos = _b[1];
            // consoleLog(`combineLatest ${ensureParams && ensureParams.index}`);
            if (!itemDefaultSize) {
                itemDefaultSize = ViewPortService.itemDefaultSize;
            }
            /** @type {?} */
            var listSize = _this.lastCalculatedSize || maxSize || clientSize(element);
            /** @type {?} */
            var scrollPos = _this._scrollPosition;
            /** @type {?} */
            var maxSizeValue = maxSize === 'auto' ? 0 : +maxSize;
            if (items && items.length && (listSize === 'auto' || listSize < 2 * ViewPortService.itemDefaultSize)) {
                // Set the viewlist to the maximum height to measure the real max-height defined in the css
                // Use a blank div to do that
                // consoleLog(`viewPortResult for measure ${JSON.stringify(this.measureViewPort)}`);
                _this.viewPortResult$.next(_this.measureViewPort);
                // Wait next life cycle for the result
                return Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["timer"])(1).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["map"])((/**
                 * @return {?}
                 */
                function () {
                    // Get mx size from container
                    maxSizeValue = _this.lastCalculatedSize = clientSize(element);
                    // Ensure that max size is not more than the items size
                    if (_this.mode === ViewportMode.fixed) {
                        if (items.length * itemDefaultSize < maxSizeValue) {
                            maxSizeValue = items.length * itemDefaultSize;
                        }
                    }
                    else if (_this.mode === ViewportMode.variable) {
                        /** @type {?} */
                        var maxItemsSize_1 = 0;
                        items.find((/**
                         * @param {?} item
                         * @return {?}
                         */
                        function (item) {
                            maxItemsSize_1 += item.size || itemDefaultSize;
                            return maxItemsSize_1 > maxSizeValue;
                        }));
                        if (maxItemsSize_1 < maxSizeValue) {
                            maxSizeValue = maxItemsSize_1;
                        }
                    }
                    else if (_this.mode === ViewportMode.auto) ;
                    return { element: element, scrollPos: scrollPos, items: items, maxSizeValue: maxSizeValue, itemDefaultSize: itemDefaultSize, ensureParams: ensureParams };
                })));
            }
            else {
                maxSizeValue = maxSizeValue || _this.lastCalculatedSize;
                return Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["of"])({ element: element, scrollPos: scrollPos, items: items, maxSizeValue: maxSizeValue, itemDefaultSize: itemDefaultSize, ensureParams: ensureParams });
            }
        })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["switchMap"])((/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var element = _a.element, scrollPos = _a.scrollPos, items = _a.items, maxSizeValue = _a.maxSizeValue, itemDefaultSize = _a.itemDefaultSize, ensureParams = _a.ensureParams;
            // consoleLog(`calcViewPort ${ensureParams && ensureParams.index}`);
            return calcViewPort$(items, maxSizeValue, scrollPos, element, itemDefaultSize, ensureParams);
        })))
            .subscribe((/**
         * @param {?} viewPort
         * @return {?}
         */
        function (viewPort) {
            // consoleLog(`viewPortResult final ${JSON.stringify(viewPort)}`);
            _this.viewPortResult$.next(viewPort);
        }), ((/**
         * @param {?} error
         * @return {?}
         */
        function (error) {
            console.error(error);
        }))));
        // Cache last calculated viewport
        this.subscriptions.push(Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["from"])(this.viewPortResult$).subscribe((/**
         * @param {?} viewPort
         * @return {?}
         */
        function (viewPort) { return _this.viewPort = viewPort; })));
    }
    Object.defineProperty(ViewPortService.prototype, "mode", {
        get: /**
         * @return {?}
         */
        function () {
            return this._mode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewPortService.prototype, "itemsSize", {
        get: /**
         * @return {?}
         */
        function () {
            return this._itemsSize;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewPortService.prototype, "direction", {
        get: /**
         * @return {?}
         */
        function () {
            return this._direction;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ViewPortService.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.subscriptions.forEach((/**
         * @param {?} subscription
         * @return {?}
         */
        function (subscription) { return subscription.unsubscribe(); }));
    };
    /**
     * @return {?}
     */
    ViewPortService.prototype.deleteSizeCache = /**
     * @return {?}
     */
    function () {
        this.deleteSizeCache$.next(true);
    };
    /**
     * @return {?}
     */
    ViewPortService.prototype.clear = /**
     * @return {?}
     */
    function () {
        this.viewPortResult$.next(this.emptyViewPort);
    };
    /**
     * @param {?=} params
     * @return {?}
     */
    ViewPortService.prototype.refresh = /**
     * @param {?=} params
     * @return {?}
     */
    function (params) {
        this.refresh$.next(params || null);
    };
    ViewPortService.itemDefaultSize = 40;
    ViewPortService.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_11__["Injectable"] }
    ];
    /** @nocollapse */
    ViewPortService.ctorParameters = function () { return []; };
    return ViewPortService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Service de gestion des listes (deja-treelist, deja-select et deja-grid).
 * Ce service permet la gestion du viewport et la gestion des caches des listes.
 * Il peut-être surchargé pour faire du lazy loading ou du paging.
 */
var ItemListService = /** @class */ (function () {
    function ItemListService() {
        var _this = this;
        // Waiter
        this._waiter$ = new rxjs__WEBPACK_IMPORTED_MODULE_8__["BehaviorSubject"](false);
        // Cache for lists (flat lists only, not recursive)
        this._cache = (/** @type {?} */ ({}));
        this._childrenField = ItemListService.defaultChildrenField;
        this.compareItems = (/**
         * @param {?} item1
         * @param {?} item2
         * @return {?}
         */
        function (item1, item2) {
            // tslint:disable-next-line:triple-equals
            /** @type {?} */
            var isDefined = (/**
             * @param {?} value
             * @return {?}
             */
            function (value) { return value != undefined; });
            if (!isDefined(item1) || !isDefined(item2)) {
                return false;
            }
            else if (isDefined(item1) && !isDefined(item2)) {
                return false;
            }
            else if (!isDefined(item1) && isDefined(item2)) {
                return false;
            }
            else {
                if (item1.equals) {
                    return item1.equals(item2);
                }
                else if (item2.equals) {
                    return item2.equals(item1);
                }
                else if (item1.model && item1.model.equals) {
                    return item1.model.equals(item2.model);
                }
                else if (item2.model && item2.model.equals) {
                    return item2.model.equals(item1.model);
                }
                else {
                    return _this.getValue(item1, _this._valueField) === _this.getValue(item2, _this._valueField);
                }
            }
        });
    }
    /** Evalue la valeur à comparer pour l'élément spécifié.
     * @param value  Model à évaluer.
     * @param valueField (optional) Champs à traiter comme valeur.
     * @return Valeur à comparer pour le modèle spécifié.
     */
    /**
     * Evalue la valeur à comparer pour l'élément spécifié.
     * @param {?} item
     * @param {?=} valueField (optional) Champs à traiter comme valeur.
     * @return {?} Valeur à comparer pour le modèle spécifié.
     */
    ItemListService.getItemValue = /**
     * Evalue la valeur à comparer pour l'élément spécifié.
     * @param {?} item
     * @param {?=} valueField (optional) Champs à traiter comme valeur.
     * @return {?} Valeur à comparer pour le modèle spécifié.
     */
    function (item, valueField) {
        // tslint:disable-next-line:triple-equals
        /** @type {?} */
        var isDefined = (/**
         * @param {?} value
         * @return {?}
         */
        function (value) { return value != undefined; });
        if (valueField) {
            /** @type {?} */
            var fields = valueField.split('.');
            /** @type {?} */
            var model_1 = item.model && item.model[fields[0]] !== undefined ? item.model : item;
            fields.forEach((/**
             * @param {?} fieldName
             * @return {?}
             */
            function (fieldName) {
                model_1 = model_1 && model_1[fieldName];
            }));
            if (isDefined(model_1)) {
                return typeof model_1 === 'function' ? model_1() : model_1;
            }
        }
        return isDefined(item.value) ? item.value : (isDefined(item.model) ? item.model : item);
    };
    /** Evalue le texte à afficher pour l'élément spécifié.
     * @param value  Model à évaluer.
     * @param textField (optional) Champs à traiter comme source du texte.
     * @return Texte à afficher pour le modèle spécifié.
     */
    /**
     * Evalue le texte à afficher pour l'élément spécifié.
     * @param {?} value  Model à évaluer.
     * @param {?=} textField (optional) Champs à traiter comme source du texte.
     * @return {?} Texte à afficher pour le modèle spécifié.
     */
    ItemListService.getItemText = /**
     * Evalue le texte à afficher pour l'élément spécifié.
     * @param {?} value  Model à évaluer.
     * @param {?=} textField (optional) Champs à traiter comme source du texte.
     * @return {?} Texte à afficher pour le modèle spécifié.
     */
    function (value, textField) {
        if (value) {
            if (textField) {
                /** @type {?} */
                var fields = textField.split('.');
                /** @type {?} */
                var model_2 = value.model && value.model[fields[0]] !== undefined ? value.model : value;
                fields.forEach((/**
                 * @param {?} fieldName
                 * @return {?}
                 */
                function (fieldName) {
                    model_2 = model_2 && model_2[fieldName];
                }));
                if (model_2 !== undefined) {
                    return typeof model_2 === 'function' ? model_2() : model_2;
                }
                return '';
            }
            if (value.displayName) {
                return typeof value.displayName === 'string' ? value.displayName : value.displayName();
            }
            else if (typeof value.toString === 'function') {
                return value.toString();
            }
        }
        return '';
    };
    Object.defineProperty(ItemListService.prototype, "lastQuery", {
        get: /**
         * @return {?}
         */
        function () {
            return this._lastQuery;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Set a observable called before the list will be displayed
     */
    /**
     * Set a observable called before the list will be displayed
     * @param {?} fn
     * @return {?}
     */
    ItemListService.prototype.setLoadingItems = /**
     * Set a observable called before the list will be displayed
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.loadingItems$ = fn;
    };
    /**
     * Set a promise or an observable called before an item selection
     */
    /**
     * Set a promise or an observable called before an item selection
     * @param {?} fn
     * @return {?}
     */
    ItemListService.prototype.setSelectingItem = /**
     * Set a promise or an observable called before an item selection
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.selectingItem$ = fn;
    };
    /**
     * Set a promise or an observable called before an item deselection
     */
    /**
     * Set a promise or an observable called before an item deselection
     * @param {?} fn
     * @return {?}
     */
    ItemListService.prototype.setUnselectingItem = /**
     * Set a promise or an observable called before an item deselection
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.unselectingItem$ = fn;
    };
    /**
     * Set a promise or an observable called before an item expand
     */
    /**
     * Set a promise or an observable called before an item expand
     * @param {?} fn
     * @return {?}
     */
    ItemListService.prototype.setExpandingItem = /**
     * Set a promise or an observable called before an item expand
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.expandingItem$ = fn;
    };
    /**
     * Set a promise or an observable called before an item collapse
     */
    /**
     * Set a promise or an observable called before an item collapse
     * @param {?} fn
     * @return {?}
     */
    ItemListService.prototype.setCollapsingItem = /**
     * Set a promise or an observable called before an item collapse
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.collapsingItem$ = fn;
    };
    Object.defineProperty(ItemListService.prototype, "waiter$", {
        /**
         * Permet de controler l'affichage du waiter
         * @return un sujet contenant la valeur du waiter
         */
        get: /**
         * Permet de controler l'affichage du waiter
         * @return {?} un sujet contenant la valeur du waiter
         */
        function () {
            return this._waiter$;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemListService.prototype, "childrenField", {
        /** Renvoie le champs utilisé comme collection pour les enfants d'un parent
         * @return value Nom du champ à utilisé comme collection d'enfants.
         */
        get: /**
         * Renvoie le champs utilisé comme collection pour les enfants d'un parent
         * @return {?} value Nom du champ à utilisé comme collection d'enfants.
         */
        function () {
            return this._childrenField;
        },
        /** Définit le champs utilisé comme collection pour les enfants d'un parent.
         * @param value Nom du champ à utiliser comme collection d'enfants
         */
        set: /**
         * Définit le champs utilisé comme collection pour les enfants d'un parent.
         * @param {?} value Nom du champ à utiliser comme collection d'enfants
         * @return {?}
         */
        function (value) {
            this._childrenField = value || ItemListService.defaultChildrenField;
            this.invalidateCache();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemListService.prototype, "hideSelected", {
        /** Renvoie une valeur indiquant si les éléments selectionés doivent être masqué.
         * @return value True si les éléments selectionés sont masqués
         */
        get: /**
         * Renvoie une valeur indiquant si les éléments selectionés doivent être masqué.
         * @return {?} value True si les éléments selectionés sont masqués
         */
        function () {
            return this._hideSelected;
        },
        /** Définit une valeur indiquant si les éléments selectionés doivent être masqué. Ce flag est principalement utilisé dans le cas d'un multi-select
         * @param value True si les éléments selectionés doivent être masqués
         */
        set: /**
         * Définit une valeur indiquant si les éléments selectionés doivent être masqué. Ce flag est principalement utilisé dans le cas d'un multi-select
         * @param {?} value True si les éléments selectionés doivent être masqués
         * @return {?}
         */
        function (value) {
            this._hideSelected = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemListService.prototype, "valueField", {
        /** Renvoie le champs à utiliser comme valeur de comparaison */
        get: /**
         * Renvoie le champs à utiliser comme valeur de comparaison
         * @return {?}
         */
        function () {
            return this._valueField;
        },
        /** Définit le champs à utiliser comme valeur de comparaison */
        set: /**
         * Définit le champs à utiliser comme valeur de comparaison
         * @param {?} valueField
         * @return {?}
         */
        function (valueField) {
            this._valueField = valueField;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemListService.prototype, "hasCache", {
        get: /**
         * @return {?}
         */
        function () {
            return this._cache && !!this._cache.visibleList;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemListService.prototype, "items", {
        get: /**
         * @private
         * @return {?}
         */
        function () {
            return this._items;
        },
        set: /**
         * @private
         * @param {?} items
         * @return {?}
         */
        function (items) {
            this._items = items;
            this.invalidateCache();
        },
        enumerable: true,
        configurable: true
    });
    /** Définit le modèle utilisé par la liste. Ce model peut ètre hierarchique sans limitation de la profondeur ou une chargé en asynchrone par une promise ou un observable.
     * @param items Provider de la liste des éléments de la liste.
     */
    /**
     * Définit le modèle utilisé par la liste. Ce model peut ètre hierarchique sans limitation de la profondeur ou une chargé en asynchrone par une promise ou un observable.
     * @param {?} items Provider de la liste des éléments de la liste.
     * @return {?}
     */
    ItemListService.prototype.setItems$ = /**
     * Définit le modèle utilisé par la liste. Ce model peut ètre hierarchique sans limitation de la profondeur ou une chargé en asynchrone par une promise ou un observable.
     * @param {?} items Provider de la liste des éléments de la liste.
     * @return {?}
     */
    function (items) {
        var _this = this;
        if (!items) {
            this.items = undefined;
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["of"])(null);
        }
        else if (items instanceof Array) {
            this.ensureChildrenProperties(items);
            this.ensureSelectedItems(items);
            this.items = items;
            this._waiter$.next(false);
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["of"])(items);
        }
        else {
            this.items = undefined;
            this._waiter$.next(true);
            /** @type {?} */
            var observable = (/** @type {?} */ (items));
            if (observable.subscribe === undefined) {
                /** @type {?} */
                var promise = (/** @type {?} */ (items));
                observable = Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["from"])(promise);
            }
            return observable.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["map"])((/**
             * @param {?} its
             * @return {?}
             */
            function (its) {
                if (its) {
                    _this.ensureChildrenProperties(its);
                    // TODO La déselection ne fonctionne pas pendant le chargement
                    _this.ensureSelectedItems(its);
                    _this.items = Object(tslib__WEBPACK_IMPORTED_MODULE_6__["__spread"])(_this.items || [], its);
                    _this._waiter$.next(false);
                    return its;
                }
                else {
                    _this.items = [];
                    _this._waiter$.next(false);
                    return [];
                }
            })));
        }
    };
    /**
     * @param {?} items
     * @return {?}
     */
    ItemListService.prototype.setModels$ = /**
     * @param {?} items
     * @return {?}
     */
    function (items) {
        return this.setItems$(items);
    };
    Object.defineProperty(ItemListService.prototype, "groupInfos", {
        /** Renvoie le modèle de grouping ajouté à la liste de base par le service. Ce modèle ne modifie pas la donée, mais est jsute ajouté à l'affichage
         * @return value Modèle de grouping d'affichage de la liste.
         */
        get: /**
         * Renvoie le modèle de grouping ajouté à la liste de base par le service. Ce modèle ne modifie pas la donée, mais est jsute ajouté à l'affichage
         * @return {?} value Modèle de grouping d'affichage de la liste.
         */
        function () {
            return this._groupInfos;
        },
        enumerable: true,
        configurable: true
    });
    // Ne pas utiliser, cette fonction retourne la liste des éléments pour l'implémentation de ngModel.
    // Ne pas utiliser, cette fonction retourne la liste des éléments pour l'implémentation de ngModel.
    /**
     * @return {?}
     */
    ItemListService.prototype.getItems = 
    // Ne pas utiliser, cette fonction retourne la liste des éléments pour l'implémentation de ngModel.
    /**
     * @return {?}
     */
    function () {
        return this.items;
    };
    /** Retourne l'élément corresondant à l'index spéficié dans la liste des éléments visibles.
     * @param index Index de l'élément à chercher sur la liste des éléments visibles.
     * @return Element correspondant à l'index recherché.
     */
    /**
     * Retourne l'élément corresondant à l'index spéficié dans la liste des éléments visibles.
     * @param {?} index Index de l'élément à chercher sur la liste des éléments visibles.
     * @return {?} Element correspondant à l'index recherché.
     */
    ItemListService.prototype.getItemFromIndex = /**
     * Retourne l'élément corresondant à l'index spéficié dans la liste des éléments visibles.
     * @param {?} index Index de l'élément à chercher sur la liste des éléments visibles.
     * @return {?} Element correspondant à l'index recherché.
     */
    function (index) {
        return this._cache.visibleList ? this._cache.visibleList[index] : null;
    };
    /** Retourne l'index correspondant à l'élément spéficié dans la liste des éléments visibles
     * @param item Element à chercher sur la liste des éléments visibles.
     * @return Index correspondant à l'élément recherché.
     */
    /**
     * Retourne l'index correspondant à l'élément spéficié dans la liste des éléments visibles
     * @param {?} item Element à chercher sur la liste des éléments visibles.
     * @return {?} Index correspondant à l'élément recherché.
     */
    ItemListService.prototype.getItemIndex = /**
     * Retourne l'index correspondant à l'élément spéficié dans la liste des éléments visibles
     * @param {?} item Element à chercher sur la liste des éléments visibles.
     * @return {?} Index correspondant à l'élément recherché.
     */
    function (item) {
        var _this = this;
        return this._cache.visibleList ? this._cache.visibleList.findIndex((/**
         * @param {?} itm
         * @return {?}
         */
        function (itm) { return _this.compareItems(item, itm); })) : -1;
    };
    /** Renvoie le service utilisé pour le tri de la liste
     * @return Service utilisé pour le tri.
     */
    /**
     * Renvoie le service utilisé pour le tri de la liste
     * @return {?} Service utilisé pour le tri.
     */
    ItemListService.prototype.getSortingService = /**
     * Renvoie le service utilisé pour le tri de la liste
     * @return {?} Service utilisé pour le tri.
     */
    function () {
        if (!this._sortingService) {
            this._sortingService = new SortingService();
        }
        return this._sortingService;
    };
    /** Définit le service utilisé pour le tri de la liste
     * @param value  Service à utiliser pour le tri.
     */
    /**
     * Définit le service utilisé pour le tri de la liste
     * @param {?} value  Service à utiliser pour le tri.
     * @return {?}
     */
    ItemListService.prototype.setSortingService = /**
     * Définit le service utilisé pour le tri de la liste
     * @param {?} value  Service à utiliser pour le tri.
     * @return {?}
     */
    function (value) {
        this._sortingService = value;
    };
    /** Renvoie le service utilisé pour le regroupement de la liste
     * @return Service utilisé pour le regroupement.
     */
    /**
     * Renvoie le service utilisé pour le regroupement de la liste
     * @return {?} Service utilisé pour le regroupement.
     */
    ItemListService.prototype.getGroupingService = /**
     * Renvoie le service utilisé pour le regroupement de la liste
     * @return {?} Service utilisé pour le regroupement.
     */
    function () {
        if (!this._groupingService) {
            this._groupingService = new GroupingService();
        }
        return this._groupingService;
    };
    /** Définit le service utilisé pour le regroupement de la liste
     * @param value Service à utiliser pour le regroupement.
     */
    /**
     * Définit le service utilisé pour le regroupement de la liste
     * @param {?} value Service à utiliser pour le regroupement.
     * @return {?}
     */
    ItemListService.prototype.setGroupingService = /**
     * Définit le service utilisé pour le regroupement de la liste
     * @param {?} value Service à utiliser pour le regroupement.
     * @return {?}
     */
    function (value) {
        this._groupingService = value;
    };
    /** Evalue le texte à afficher pour l'élément spécifié.
     * @param value  Model à évaluer.
     * @param textField (optional) Champs à traiter comme source du texte.
     * @return Texte à afficher pour le modèle spécifié.
     */
    /**
     * Evalue le texte à afficher pour l'élément spécifié.
     * @param {?} value  Model à évaluer.
     * @param {?=} textField (optional) Champs à traiter comme source du texte.
     * @return {?} Texte à afficher pour le modèle spécifié.
     */
    ItemListService.prototype.getTextValue = /**
     * Evalue le texte à afficher pour l'élément spécifié.
     * @param {?} value  Model à évaluer.
     * @param {?=} textField (optional) Champs à traiter comme source du texte.
     * @return {?} Texte à afficher pour le modèle spécifié.
     */
    function (value, textField) {
        return ItemListService.getItemText(value, textField);
    };
    /** Evalue la valeur à comparer pour l'élément spécifié.
     * @param value  Model à évaluer.
     * @param valueField (optional) Champs à traiter comme valeur.
     * @return Valeur à comparer pour le modèle spécifié.
     */
    /**
     * Evalue la valeur à comparer pour l'élément spécifié.
     * @param {?} item
     * @param {?=} valueField (optional) Champs à traiter comme valeur.
     * @return {?} Valeur à comparer pour le modèle spécifié.
     */
    ItemListService.prototype.getValue = /**
     * Evalue la valeur à comparer pour l'élément spécifié.
     * @param {?} item
     * @param {?=} valueField (optional) Champs à traiter comme valeur.
     * @return {?} Valeur à comparer pour le modèle spécifié.
     */
    function (item, valueField) {
        return ItemListService.getItemValue(item, valueField);
    };
    /** Usage interne. Termine le drag and drop en cours. */
    /**
     * Usage interne. Termine le drag and drop en cours.
     * @return {?}
     */
    ItemListService.prototype.drop$ = /**
     * Usage interne. Termine le drag and drop en cours.
     * @return {?}
     */
    function () {
        var _this = this;
        return new rxjs__WEBPACK_IMPORTED_MODULE_8__["Observable"]((/**
         * @param {?} subscriber
         * @return {?}
         */
        function (subscriber) {
            if (!_this._ddList || !_this.items) {
                subscriber.next(false);
                return undefined;
            }
            /** @type {?} */
            var listIndex = _this._ddCurrentIndex;
            /** @type {?} */
            var item = (/** @type {?} */ (_this._ddList[listIndex]));
            if (!item) {
                throw new Error('invalid drag infos stored in cache.');
            }
            // La drag and drop liste est incomplète, en cas de filtrage, retrouver l'élément juste en dessus dans la liste complète
            /** @type {?} */
            var targetItem = (/** @type {?} */ (_this._ddList[listIndex - 1]));
            /** @type {?} */
            var targetParent;
            // Find target in the flat list to calculate the correct index
            /** @type {?} */
            var flatListIndex = _this._cache.flatList.findIndex((/**
             * @param {?} itm
             * @return {?}
             */
            function (itm) { return itm === targetItem; }));
            /** @type {?} */
            var targetIndex = 0;
            while (flatListIndex >= 0) {
                /** @type {?} */
                var parentItem = (/** @type {?} */ (_this._cache.flatList[flatListIndex]));
                if (parentItem.depth === undefined) {
                    // Flat list
                    targetIndex = flatListIndex;
                    break;
                }
                else if (parentItem.depth === item.depth - 1) {
                    targetParent = parentItem;
                    break;
                }
                else if (parentItem.depth === item.depth) {
                    ++targetIndex;
                }
                --flatListIndex;
            }
            /** @type {?} */
            var findItem = (/**
             * @param {?} itemToFind
             * @param {?} treeList
             * @return {?}
             */
            function (itemToFind, treeList) {
                for (var i = 0; i < treeList.length; i++) {
                    /** @type {?} */
                    var itm = treeList[i];
                    if (itm === itemToFind) {
                        return {
                            index: i,
                            list: treeList,
                        };
                    }
                    else if (itm.$items !== undefined) {
                        /** @type {?} */
                        var result = findItem(itemToFind, itm.$items);
                        if (result) {
                            return result;
                        }
                    }
                }
            });
            /** @type {?} */
            var originResult = findItem(item, _this.items);
            // Remove item from the origin
            originResult.list.splice(originResult.index, 1);
            // Add in the new location
            /** @type {?} */
            var targetList = targetParent ? targetParent.$items : _this.items;
            if (targetIndex > originResult.index && originResult.list === targetList) {
                --targetIndex;
            }
            targetList.splice(targetIndex, 0, item);
            // Invalidate view cache
            _this.invalidateCache();
            subscriber.next(true);
        }));
    };
    /** Usage interne. Calcul l'élément cible d'un drag and drop en fonction de l'index spécifié. */
    /**
     * Usage interne. Calcul l'élément cible d'un drag and drop en fonction de l'index spécifié.
     * @param {?} index
     * @param {?} targetIndex
     * @return {?}
     */
    ItemListService.prototype.calcDragTargetIndex$ = /**
     * Usage interne. Calcul l'élément cible d'un drag and drop en fonction de l'index spécifié.
     * @param {?} index
     * @param {?} targetIndex
     * @return {?}
     */
    function (index, targetIndex) {
        var _this = this;
        return new rxjs__WEBPACK_IMPORTED_MODULE_8__["Observable"]((/**
         * @param {?} subscriber
         * @return {?}
         */
        function (subscriber) {
            /** @type {?} */
            var currentList = _this._ddList || _this._cache.visibleList;
            if (!currentList) {
                throw new Error('Empty cache on calcDragTargetIndex');
            }
            /** @type {?} */
            var startIndex = _this._ddCurrentIndex !== undefined ? _this._ddCurrentIndex : index;
            if (startIndex >= currentList.length) {
                subscriber.next(currentList.length - 1);
                return undefined;
            }
            /** @type {?} */
            var item = (/** @type {?} */ (currentList[startIndex]));
            /** @type {?} */
            var dragDropIndex = startIndex;
            if (item.depth !== undefined && targetIndex !== startIndex) {
                if (targetIndex < startIndex) {
                    // Remonte jusqu'au premier élément avec une profondeur plus grande
                    /** @type {?} */
                    var beforeIndex = 0;
                    for (var b = startIndex - 1; b >= 0; b--) {
                        /** @type {?} */
                        var targetItem = (/** @type {?} */ (currentList[b]));
                        if (targetItem.depth <= item.depth) {
                            beforeIndex = b;
                            break;
                        }
                    }
                    if (targetIndex <= beforeIndex) {
                        // Descend jusqu'au premier élément avec la même profondeur
                        for (var a = targetIndex; a <= beforeIndex; a++) {
                            /** @type {?} */
                            var targetItem = (/** @type {?} */ (currentList[a]));
                            if (targetItem.depth === item.depth) {
                                subscriber.next(a);
                                return undefined;
                            }
                            else if (targetItem.depth === item.depth - 1) {
                                subscriber.next(a + 1);
                                return undefined;
                            }
                        }
                    }
                }
                if (targetIndex > startIndex) {
                    // Descend jusqu'au premier élément avec une profondeur plus grande ou égale
                    /** @type {?} */
                    var afterIndex = currentList.length - 1;
                    for (var a = startIndex + 1; a < currentList.length; a++) {
                        /** @type {?} */
                        var targetItem = (/** @type {?} */ (currentList[a]));
                        if (targetItem.depth <= item.depth) {
                            afterIndex = a;
                            break;
                        }
                    }
                    if (targetIndex >= afterIndex) {
                        // Descend jusqu'au premier élément avec la même profondeur
                        for (var a = targetIndex + 1; a < currentList.length; a++) {
                            /** @type {?} */
                            var itm = (/** @type {?} */ (currentList[a]));
                            if (itm.depth === item.depth) {
                                subscriber.next(a);
                                return undefined;
                            }
                            else if (itm.depth === item.depth - 1) {
                                subscriber.next(a - 1);
                                return undefined;
                            }
                        }
                        // Not found
                        /** @type {?} */
                        var targetItem = (/** @type {?} */ (currentList[afterIndex]));
                        if (targetItem.depth === item.depth) {
                            subscriber.next(afterIndex);
                            return undefined;
                        }
                    }
                }
            }
            subscriber.next(dragDropIndex);
        }));
    };
    /** Change l'état d'expansion de tous les éléments.
     * @param collapsed True si les éléments doivent être réduits.
     * @return Observable résolu par la fonction.
     */
    /**
     * Change l'état d'expansion de tous les éléments.
     * @param {?} collapsed True si les éléments doivent être réduits.
     * @return {?} Observable résolu par la fonction.
     */
    ItemListService.prototype.toggleAll$ = /**
     * Change l'état d'expansion de tous les éléments.
     * @param {?} collapsed True si les éléments doivent être réduits.
     * @return {?} Observable résolu par la fonction.
     */
    function (collapsed) {
        var _this = this;
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["of"])(this._cache.flatList).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["map"])((/**
         * @param {?} items
         * @return {?}
         */
        function (items) { return items.filter((/**
         * @param {?} item
         * @return {?}
         */
        function (item) { return item.$items && item.collapsible !== false; })); })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["tap"])((/**
         * @return {?}
         */
        function () { return delete _this._cache.visibleList; })), // Invalidate view cache
        Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["switchMap"])((/**
         * @param {?} items
         * @return {?}
         */
        function (items) { return collapsed ? _this.collapseItems$(items) : _this.expandItems$(items); })));
    };
    /** Change l'état d'expansion de l'élément spécifié par son index sur la liste des éléments visibles.
     * @param index Index sur la liste des éléments visibles de l'élément à changer.
     * @param collapse Etat de l'élément. True pour réduire l'élément.
     * @return Observable résolu par la fonction.
     */
    /**
     * Change l'état d'expansion de l'élément spécifié par son index sur la liste des éléments visibles.
     * @param {?} index Index sur la liste des éléments visibles de l'élément à changer.
     * @param {?=} collapse Etat de l'élément. True pour réduire l'élément.
     * @return {?} Observable résolu par la fonction.
     */
    ItemListService.prototype.toggleCollapse$ = /**
     * Change l'état d'expansion de l'élément spécifié par son index sur la liste des éléments visibles.
     * @param {?} index Index sur la liste des éléments visibles de l'élément à changer.
     * @param {?=} collapse Etat de l'élément. True pour réduire l'élément.
     * @return {?} Observable résolu par la fonction.
     */
    function (index, collapse) {
        /** @type {?} */
        var visibleList = this._cache.visibleList;
        if (!visibleList || !visibleList.length) {
            throw new Error('Empty cache on toggleCollapse');
        }
        /** @type {?} */
        var item = (/** @type {?} */ (visibleList[index]));
        if (!item || item.collapsible === false) {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["of"])([]);
        }
        /** @type {?} */
        var collapsed = collapse !== undefined ? collapse : item.collapsed ? false : true;
        return collapsed ? this.collapseItem$(item) : this.expandItem$(item);
    };
    /** Etends les éléments spécifiés.
     * @param items Liste des éléments à étendre.
     * @return Observable résolu par la fonction.
     */
    /**
     * Etends les éléments spécifiés.
     * @param {?} items Liste des éléments à étendre.
     * @return {?} Observable résolu par la fonction.
     */
    ItemListService.prototype.expandItems$ = /**
     * Etends les éléments spécifiés.
     * @param {?} items Liste des éléments à étendre.
     * @return {?} Observable résolu par la fonction.
     */
    function (items) {
        var _this = this;
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["from"])(items || []).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["switchMap"])((/**
         * @param {?} item
         * @return {?}
         */
        function (item) { return _this.expandItem$(item); })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["reduce"])((/**
         * @param {?} acc
         * @param {?} cur
         * @return {?}
         */
        function (acc, cur) { return Object(tslib__WEBPACK_IMPORTED_MODULE_6__["__spread"])(acc, [cur]); }), []));
    };
    /** Reduits les éléments spécifiés.
     * @param items Liste des éléments à réduire.
     * @return Observable résolu par la fonction.
     */
    /**
     * Reduits les éléments spécifiés.
     * @param {?} items Liste des éléments à réduire.
     * @return {?} Observable résolu par la fonction.
     */
    ItemListService.prototype.collapseItems$ = /**
     * Reduits les éléments spécifiés.
     * @param {?} items Liste des éléments à réduire.
     * @return {?} Observable résolu par la fonction.
     */
    function (items) {
        var _this = this;
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["from"])(items || []).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["switchMap"])((/**
         * @param {?} item
         * @return {?}
         */
        function (item) { return _this.collapseItem$(item); })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["reduce"])((/**
         * @param {?} acc
         * @param {?} cur
         * @return {?}
         */
        function (acc, cur) { return Object(tslib__WEBPACK_IMPORTED_MODULE_6__["__spread"])(acc, [cur]); }), []));
    };
    /** Etends l'élément spécifié.
     * @param items Eléments à étendre.
     * @return Observable résolu par la fonction.
     */
    /**
     * Etends l'élément spécifié.
     * @param {?} item
     * @return {?} Observable résolu par la fonction.
     */
    ItemListService.prototype.expandItem$ = /**
     * Etends l'élément spécifié.
     * @param {?} item
     * @return {?} Observable résolu par la fonction.
     */
    function (item) {
        var _this = this;
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["of"])(item).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["filter"])((/**
         * @param {?} itm
         * @return {?}
         */
        function (itm) { return !!itm; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["switchMap"])((/**
         * @param {?} itm
         * @return {?}
         */
        function (itm) { return _this.expandingItem$ ? _this.expandingItem$(itm) : Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["of"])(itm); })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["filter"])((/**
         * @param {?} itm
         * @return {?}
         */
        function (itm) { return !!itm; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["tap"])((/**
         * @param {?} itm
         * @return {?}
         */
        function (itm) {
            itm.collapsed = false;
            // Invalidate view cache
            delete _this._cache.visibleList;
        })));
    };
    /** Réduit l'élément spécifié.
     * @param items Eléments à réduire.
     * @return Observable résolu par la fonction.
     */
    /**
     * Réduit l'élément spécifié.
     * @param {?} item
     * @return {?} Observable résolu par la fonction.
     */
    ItemListService.prototype.collapseItem$ = /**
     * Réduit l'élément spécifié.
     * @param {?} item
     * @return {?} Observable résolu par la fonction.
     */
    function (item) {
        var _this = this;
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["of"])(item).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["filter"])((/**
         * @param {?} itm
         * @return {?}
         */
        function (itm) { return !!itm; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["switchMap"])((/**
         * @param {?} itm
         * @return {?}
         */
        function (itm) { return _this.collapsingItem$ ? _this.collapsingItem$(itm) : Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["of"])(itm); })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["filter"])((/**
         * @param {?} itm
         * @return {?}
         */
        function (itm) { return !!itm; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["tap"])((/**
         * @param {?} itm
         * @return {?}
         */
        function (itm) {
            itm.collapsed = true;
            // Invalidate view cache
            delete _this._cache.visibleList;
        })));
    };
    /** Retourne la liste des éléments sélectionés.
     * @return Liste des éléments selectionés.
     */
    /**
     * Retourne la liste des éléments sélectionés.
     * @return {?} Liste des éléments selectionés.
     */
    ItemListService.prototype.getSelectedItems = /**
     * Retourne la liste des éléments sélectionés.
     * @return {?} Liste des éléments selectionés.
     */
    function () {
        return this.selectedList || [];
    };
    /** Définit la liste des éléments sélectionés.
     * @param items Liste des éléments a selectioner.
     */
    /**
     * Définit la liste des éléments sélectionés.
     * @param {?} items Liste des éléments a selectioner.
     * @return {?}
     */
    ItemListService.prototype.setSelectedItems = /**
     * Définit la liste des éléments sélectionés.
     * @param {?} items Liste des éléments a selectioner.
     * @return {?}
     */
    function (items) {
        if (this.selectedList) {
            this.selectedList.forEach((/**
             * @param {?} item
             * @return {?}
             */
            function (item) {
                item.selected = false;
            }));
        }
        this.selectedList = items;
        if (this.hideSelected) {
            delete this._cache.visibleList;
        }
        this.ensureSelectedItems(this.items);
    };
    /** Déselectionne tous les éléments sélectionés.
     * @return Observable résolu par la fonction.
     */
    /**
     * Déselectionne tous les éléments sélectionés.
     * @return {?} Observable résolu par la fonction.
     */
    ItemListService.prototype.unselectAll$ = /**
     * Déselectionne tous les éléments sélectionés.
     * @return {?} Observable résolu par la fonction.
     */
    function () {
        if (this.hideSelected) {
            delete this._cache.visibleList;
        }
        /** @type {?} */
        var selectedList = this.selectedList;
        this.selectedList = [];
        return this.unSelectItems$(selectedList);
    };
    /** Sélectionne une plage d'éléments en fonction de l'index de début et l'index de fin sur la liste des éléments visibles.
     * @param indexFrom index sur la liste des éléments visibles du premier élément à sélectioner.
     * @param indexTo index sur la liste des éléments visibles du dernier élément à sélectioner.
     * @return Observable résolu par la fonction.
     */
    /**
     * Sélectionne une plage d'éléments en fonction de l'index de début et l'index de fin sur la liste des éléments visibles.
     * @param {?} indexFrom index sur la liste des éléments visibles du premier élément à sélectioner.
     * @param {?=} indexTo index sur la liste des éléments visibles du dernier élément à sélectioner.
     * @return {?} Observable résolu par la fonction.
     */
    ItemListService.prototype.selectRange$ = /**
     * Sélectionne une plage d'éléments en fonction de l'index de début et l'index de fin sur la liste des éléments visibles.
     * @param {?} indexFrom index sur la liste des éléments visibles du premier élément à sélectioner.
     * @param {?=} indexTo index sur la liste des éléments visibles du dernier élément à sélectioner.
     * @return {?} Observable résolu par la fonction.
     */
    function (indexFrom, indexTo) {
        var _this = this;
        if (indexTo === undefined) {
            indexTo = indexFrom;
        }
        // Backup current visible list in case of unselectAll clear the cache
        /** @type {?} */
        var visibleList = this._cache.visibleList;
        if (!visibleList || !visibleList.length) {
            throw new Error('Empty cache on selection');
        }
        return this.unselectAll$().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["map"])((/**
         * @return {?}
         */
        function () { return visibleList.slice(Math.min(indexFrom, indexTo), 1 + Math.max(indexFrom, indexTo)); })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["map"])((/**
         * @param {?} items
         * @return {?}
         */
        function (items) { return items.filter((/**
         * @param {?} itm
         * @return {?}
         */
        function (itm) { return itm.selectable !== false; })); })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["tap"])((/**
         * @return {?}
         */
        function () {
            if (_this.hideSelected) {
                delete _this._cache.visibleList;
            }
        })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["switchMap"])((/**
         * @param {?} items
         * @return {?}
         */
        function (items) { return _this.selectItems$(items).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["map"])((/**
         * @param {?} selected
         * @return {?}
         */
        function (selected) { return selected.length; }))); })));
    };
    /** Change l'état de selection de l'élément spécifié.
     * @param items Liste des éléments à modifier.
     * @param selected True si les éléments divent être sélectionés, False si ils doivent être déselectionés.
     * @return Observable résolu par la fonction.
     */
    /**
     * Change l'état de selection de l'élément spécifié.
     * @param {?} items Liste des éléments à modifier.
     * @param {?} selected True si les éléments divent être sélectionés, False si ils doivent être déselectionés.
     * @return {?} Observable résolu par la fonction.
     */
    ItemListService.prototype.toggleSelect$ = /**
     * Change l'état de selection de l'élément spécifié.
     * @param {?} items Liste des éléments à modifier.
     * @param {?} selected True si les éléments divent être sélectionés, False si ils doivent être déselectionés.
     * @return {?} Observable résolu par la fonction.
     */
    function (items, selected) {
        var _this = this;
        items = items || [];
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["iif"])((/**
         * @return {?}
         */
        function () { return selected; }), this.selectItems$(items), this.unSelectItems$(items)).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["map"])((/**
         * @return {?}
         */
        function () {
            if (_this.hideSelected) {
                delete _this._cache.visibleList;
            }
            return _this.selectedList;
        })));
    };
    /** Sélectionne les éléments spécifiés
     * @param items Liste des éléments à sélectioner.
     * @return Observable résolu par la fonction.
     */
    /**
     * Sélectionne les éléments spécifiés
     * @param {?} items Liste des éléments à sélectioner.
     * @return {?} Observable résolu par la fonction.
     */
    ItemListService.prototype.selectItems$ = /**
     * Sélectionne les éléments spécifiés
     * @param {?} items Liste des éléments à sélectioner.
     * @return {?} Observable résolu par la fonction.
     */
    function (items) {
        var _this = this;
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["from"])(items || []).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["switchMap"])((/**
         * @param {?} item
         * @return {?}
         */
        function (item) { return _this.selectItem$(item); })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["reduce"])((/**
         * @param {?} acc
         * @param {?} cur
         * @return {?}
         */
        function (acc, cur) { return Object(tslib__WEBPACK_IMPORTED_MODULE_6__["__spread"])(acc, [cur]); }), []));
    };
    /** Déselectionne les éléments spécifiés
     * @param items Liste des éléments à déselectioner.
     * @return Observable résolu par la fonction.
     */
    /**
     * Déselectionne les éléments spécifiés
     * @param {?} items Liste des éléments à déselectioner.
     * @return {?} Observable résolu par la fonction.
     */
    ItemListService.prototype.unSelectItems$ = /**
     * Déselectionne les éléments spécifiés
     * @param {?} items Liste des éléments à déselectioner.
     * @return {?} Observable résolu par la fonction.
     */
    function (items) {
        var _this = this;
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["from"])(items || []).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["filter"])((/**
         * @param {?} item
         * @return {?}
         */
        function (item) { return item.selected; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["switchMap"])((/**
         * @param {?} item
         * @return {?}
         */
        function (item) { return _this.unSelectItem$(item); })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["reduce"])((/**
         * @param {?} acc
         * @param {?} cur
         * @return {?}
         */
        function (acc, cur) { return Object(tslib__WEBPACK_IMPORTED_MODULE_6__["__spread"])(acc, [cur]); }), []));
    };
    /** Sélectionne l'élément spécifié
     * @param item Elément à sélectioner.
     * @return Observable résolu par la fonction.
     */
    /**
     * Sélectionne l'élément spécifié
     * @param {?} item Elément à sélectioner.
     * @return {?} Observable résolu par la fonction.
     */
    ItemListService.prototype.selectItem$ = /**
     * Sélectionne l'élément spécifié
     * @param {?} item Elément à sélectioner.
     * @return {?} Observable résolu par la fonction.
     */
    function (item) {
        var _this = this;
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["of"])(item).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["filter"])((/**
         * @param {?} itm
         * @return {?}
         */
        function (itm) { return !!itm; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["switchMap"])((/**
         * @param {?} itm
         * @return {?}
         */
        function (itm) { return _this.selectingItem$ ? _this.selectingItem$(itm) : Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["of"])(itm); })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["filter"])((/**
         * @param {?} itm
         * @return {?}
         */
        function (itm) { return !!itm; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["tap"])((/**
         * @param {?} itm
         * @return {?}
         */
        function (itm) {
            if (!_this.selectedList) {
                _this.selectedList = [];
            }
            itm.selected = true;
            _this.selectedList.push(itm);
        })));
    };
    /** Déselectionne l'élément spécifié
     * @param item Elément à déselectioner.
     * @return Observable résolu par la fonction.
     */
    /**
     * Déselectionne l'élément spécifié
     * @param {?} item Elément à déselectioner.
     * @return {?} Observable résolu par la fonction.
     */
    ItemListService.prototype.unSelectItem$ = /**
     * Déselectionne l'élément spécifié
     * @param {?} item Elément à déselectioner.
     * @return {?} Observable résolu par la fonction.
     */
    function (item) {
        var _this = this;
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["of"])(item).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["filter"])((/**
         * @param {?} itm
         * @return {?}
         */
        function (itm) { return !!itm; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["switchMap"])((/**
         * @param {?} itm
         * @return {?}
         */
        function (itm) { return _this.unselectingItem$ ? _this.unselectingItem$(itm) : Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["of"])(itm); })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["filter"])((/**
         * @param {?} itm
         * @return {?}
         */
        function (itm) { return !!itm; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["tap"])((/**
         * @param {?} itm
         * @return {?}
         */
        function (itm) {
            itm.selected = false;
            if (_this.selectedList && _this.selectedList.length) {
                /** @type {?} */
                var index = _this.selectedList.findIndex((/**
                 * @param {?} i
                 * @return {?}
                 */
                function (i) { return _this.compareItems(i, itm); }));
                if (index >= 0) {
                    _this.selectedList.splice(index, 1);
                }
            }
        })));
    };
    /** Trouve l'élément suivant répondant à la fonction de comparaison spécifiée.
     * @param compare Function de comparaison pour la recherche de l'élément.
     * @param startIndex Index de départ sur la liste des éléments visibles.
     * @return Observable résolu par la fonction.
     */
    /**
     * Trouve l'élément suivant répondant à la fonction de comparaison spécifiée.
     * @param {?=} compare Function de comparaison pour la recherche de l'élément.
     * @param {?=} startIndex Index de départ sur la liste des éléments visibles.
     * @return {?} Observable résolu par la fonction.
     */
    ItemListService.prototype.findNextMatch$ = /**
     * Trouve l'élément suivant répondant à la fonction de comparaison spécifiée.
     * @param {?=} compare Function de comparaison pour la recherche de l'élément.
     * @param {?=} startIndex Index de départ sur la liste des éléments visibles.
     * @return {?} Observable résolu par la fonction.
     */
    function (compare, startIndex) {
        /** @type {?} */
        var result = (/** @type {?} */ ({ index: -1 }));
        /** @type {?} */
        var list = this._cache.visibleList;
        if (!list || !list.length) {
            throw new Error('Empty cache on findNextMatch');
        }
        if (list.length) {
            if (startIndex < 0 || startIndex >= list.length) {
                startIndex = -1;
            }
            /** @type {?} */
            var idx = startIndex + 1;
            while (idx !== startIndex) {
                /** @type {?} */
                var itm = list[idx];
                if (compare(itm, idx)) {
                    result = (/** @type {?} */ ({
                        index: idx,
                        item: itm,
                    }));
                    break;
                }
                idx++;
                if (idx >= list.length) {
                    if (startIndex === -1) {
                        break;
                    }
                    idx = 0;
                }
            }
        }
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["of"])(result);
    };
    /** Trie les éléments en fonction du modèle de tri spécifié
     * @param sortInfos Modèle de tri à appliquer.
     * @return Observable résolu par la fonction.
     */
    /**
     * Trie les éléments en fonction du modèle de tri spécifié
     * @param {?} sortInfos Modèle de tri à appliquer.
     * @return {?} Observable résolu par la fonction.
     */
    ItemListService.prototype.sort$ = /**
     * Trie les éléments en fonction du modèle de tri spécifié
     * @param {?} sortInfos Modèle de tri à appliquer.
     * @return {?} Observable résolu par la fonction.
     */
    function (sortInfos) {
        var _this = this;
        if (!this.items) {
            throw new Error('No Items');
        }
        /** @type {?} */
        var sortTree$ = this.getSortingService()
            .sortTree$(this._cache.groupedList, sortInfos, '$items').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["tap"])((/**
         * @param {?} sortedList
         * @return {?}
         */
        function (sortedList) {
            _this._cache.groupedList = sortedList;
            _this.invalidateViewCache();
        })));
        if (!this._cache.groupedList || this._cache.groupedList.length === 0) {
            return this.getGroupedList$(this.items).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["tap"])((/**
             * @param {?} groupedList
             * @return {?}
             */
            function (groupedList) { return _this._cache.groupedList = groupedList; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["switchMap"])((/**
             * @return {?}
             */
            function () { return sortTree$; })));
        }
        else {
            return sortTree$;
        }
    };
    /** Groupe les éléments en fonction du modèle de groupe spécifié
     * @param groupInfos Modèle de groupe à appliquer.
     * @return Observable résolu par la fonction.
     */
    /**
     * Groupe les éléments en fonction du modèle de groupe spécifié
     * @param {?} groupInfos Modèle de groupe à appliquer.
     * @return {?} Observable résolu par la fonction.
     */
    ItemListService.prototype.group$ = /**
     * Groupe les éléments en fonction du modèle de groupe spécifié
     * @param {?} groupInfos Modèle de groupe à appliquer.
     * @return {?} Observable résolu par la fonction.
     */
    function (groupInfos) {
        this._groupInfos = groupInfos;
        this.invalidateCache();
        this.ensureChildrenProperties(this.items);
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["of"])(groupInfos);
    };
    /** Retire les groupe correspondants au modèle de groupe spécifié
     * @param groupInfos Modèle de groupe à retirer.
     * @return Observable résolu par la fonction.
     */
    /**
     * Retire les groupe correspondants au modèle de groupe spécifié
     * @param {?} groupInfo
     * @return {?} Observable résolu par la fonction.
     */
    ItemListService.prototype.ungroup$ = /**
     * Retire les groupe correspondants au modèle de groupe spécifié
     * @param {?} groupInfo
     * @return {?} Observable résolu par la fonction.
     */
    function (groupInfo) {
        /** @type {?} */
        var groupIndex = this._groupInfos ? this._groupInfos.findIndex((/**
         * @param {?} gi
         * @return {?}
         */
        function (gi) { return gi.groupByField === groupInfo.groupByField; })) : -1;
        if (groupIndex >= 0) {
            this._groupInfos.splice(groupIndex, 1);
        }
        this.invalidateCache();
        this.ensureChildrenProperties(this.items);
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["of"])(groupInfo);
    };
    /** Retrouve les informations du parent de l'élément spécifié
     * @param item Element enfant du parent à retrouver.
     * @return Observable résolu par la fonction, qui retourne les informations sur le parent de l'élément spécifié
     */
    /**
     * Retrouve les informations du parent de l'élément spécifié
     * @param {?} item Element enfant du parent à retrouver.
     * @param {?} multiSelect
     * @return {?} Observable résolu par la fonction, qui retourne les informations sur le parent de l'élément spécifié
     */
    ItemListService.prototype.getParentListInfos$ = /**
     * Retrouve les informations du parent de l'élément spécifié
     * @param {?} item Element enfant du parent à retrouver.
     * @param {?} multiSelect
     * @return {?} Observable résolu par la fonction, qui retourne les informations sur le parent de l'élément spécifié
     */
    function (item, multiSelect) {
        var _this = this;
        /** @type {?} */
        var search$ = (/**
         * @param {?} flatList
         * @return {?}
         */
        function (flatList) {
            /** @type {?} */
            var flatIndex = flatList.findIndex((/**
             * @param {?} itm
             * @return {?}
             */
            function (itm) { return itm === item; }));
            if (flatIndex < 0) {
                throw new Error('Item not found.');
            }
            /** @type {?} */
            var result;
            if (!item.depth) {
                /** @type {?} */
                var rootIndex = _this.items.findIndex((/**
                 * @param {?} itm
                 * @return {?}
                 */
                function (itm) { return itm === item; }));
                result = (/** @type {?} */ ({
                    index: rootIndex,
                }));
            }
            else {
                // Search parent and treeindex
                /** @type {?} */
                var idx = 0;
                while (--flatIndex >= 0) {
                    /** @type {?} */
                    var parentItem = (/** @type {?} */ (flatList[flatIndex]));
                    if (parentItem.depth < item.depth) {
                        result = (/** @type {?} */ ({
                            index: idx,
                            parent: parentItem,
                        }));
                    }
                    idx++;
                }
            }
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["of"])(result);
        });
        return this.ensureFlatListCache$(true, multiSelect).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["switchMap"])(search$));
    };
    /** Supprime tous les caches internes. Ils seront recréés à la première demande de la portion de la liste à afficher. */
    /**
     * Supprime tous les caches internes. Ils seront recréés à la première demande de la portion de la liste à afficher.
     * @return {?}
     */
    ItemListService.prototype.invalidateCache = /**
     * Supprime tous les caches internes. Ils seront recréés à la première demande de la portion de la liste à afficher.
     * @return {?}
     */
    function () {
        this._cache = {};
        this.ensureChildrenProperties(this.items);
    };
    /** Efface la hauteur calculée des lignes en mode automatique */
    /**
     * Efface la hauteur calculée des lignes en mode automatique
     * @return {?}
     */
    ItemListService.prototype.invalidateRowsHeightCache = /**
     * Efface la hauteur calculée des lignes en mode automatique
     * @return {?}
     */
    function () {
        if (this._items) {
            this._items.forEach((/**
             * @param {?} item
             * @return {?}
             */
            function (item) { return item.size = undefined; }));
        }
    };
    /** Usage interne. Retourne la portion de la liste à afficher en fonction des paramètres spécifiés. */
    /**
     * Usage interne. Retourne la portion de la liste à afficher en fonction des paramètres spécifiés.
     * @param {?} searchField
     * @param {?=} query
     * @param {?=} ignoreCache
     * @param {?=} ddStartIndex
     * @param {?=} ddTargetIndex
     * @param {?=} multiSelect
     * @return {?}
     */
    ItemListService.prototype.getViewList$ = /**
     * Usage interne. Retourne la portion de la liste à afficher en fonction des paramètres spécifiés.
     * @param {?} searchField
     * @param {?=} query
     * @param {?=} ignoreCache
     * @param {?=} ddStartIndex
     * @param {?=} ddTargetIndex
     * @param {?=} multiSelect
     * @return {?}
     */
    function (searchField, query, ignoreCache, ddStartIndex, ddTargetIndex, multiSelect) {
        var _this = this;
        /** @type {?} */
        var result = (/** @type {?} */ ({}));
        /** @type {?} */
        var queryChanged = (query && query.toString()) !== (this._lastQuery && this._lastQuery.toString());
        ignoreCache = ignoreCache || queryChanged || !this.items || !this.items.length;
        this._lastQuery = query;
        /** @type {?} */
        var escapeChars = (/**
         * @param {?} text
         * @return {?}
         */
        function (text) {
            /** @type {?} */
            var specialChars = ['\\', '/', '|', '&', ';', '$', '%', '@', '"', '<', '>', '(', ')', '+'];
            specialChars.forEach((/**
             * @param {?} c
             * @return {?}
             */
            function (c) { return text = text.replace(c, "\\" + c); }));
            return text;
        });
        // Check regexp validity
        // regExp.test(this.getTextValue(item));
        /** @type {?} */
        var regExp;
        if (query) {
            if (typeof query === 'string') {
                try {
                    query = Diacritics.remove(query);
                    /** @type {?} */
                    var escapedQuery = escapeChars(query);
                    regExp = new RegExp(escapedQuery, 'i');
                }
                catch (exc) {
                    console.log('Invalid search parameters');
                }
            }
            else {
                regExp = (/** @type {?} */ (query));
                if (regExp.test === undefined) {
                    regExp = undefined;
                }
            }
        }
        /** @type {?} */
        var loadViewList = (/**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var viewList;
            if (ddStartIndex !== undefined && ddTargetIndex !== undefined && ddStartIndex !== ddTargetIndex) {
                if (!_this._ddList) {
                    // Generate a modified flat list for drag and drop Only
                    _this._ddList = Object(tslib__WEBPACK_IMPORTED_MODULE_6__["__spread"])(_this._cache.visibleList);
                    // Calc child count to be dragged
                    /** @type {?} */
                    var draggedItem = (/** @type {?} */ (_this._ddList[ddStartIndex]));
                    /** @type {?} */
                    var parentDepth = draggedItem.depth;
                    /** @type {?} */
                    var lastIndex = ddStartIndex;
                    if (parentDepth !== undefined) {
                        for (var i = ddStartIndex + 1; i < _this._ddList.length; i++) {
                            /** @type {?} */
                            var curItem = (/** @type {?} */ (_this._ddList[i]));
                            if (curItem.depth <= parentDepth) {
                                break;
                            }
                            lastIndex = i;
                        }
                    }
                    _this._ddChildCount = lastIndex - ddStartIndex + 1;
                    _this._ddCurrentIndex = ddStartIndex;
                }
                /** @type {?} */
                var removed = _this._ddList.splice(_this._ddCurrentIndex, _this._ddChildCount);
                if (ddTargetIndex > _this._ddCurrentIndex) {
                    ddTargetIndex -= _this._ddChildCount;
                    ++ddTargetIndex;
                }
                _this._ddCurrentIndex = ddTargetIndex;
                removed.forEach((/**
                 * @param {?} itm
                 * @return {?}
                 */
                function (itm) { return _this._ddList.splice(ddTargetIndex++, 0, itm); }));
                viewList = _this._ddList;
            }
            else {
                delete _this._ddList;
                delete _this._ddCurrentIndex;
                delete _this._ddChildCount;
                viewList = _this._cache.visibleList || [];
            }
            result.depthMax = _this._cache.depthMax;
            result.visibleList = viewList;
            return result;
        });
        if (ignoreCache) {
            // console.log('getItemList ' + Date.now());
            this.waiter$.next(true);
            if (queryChanged || !this.items || !this.items.length) {
                this.internalQuery = regExp;
            }
            return this.getItemList$(query, this.selectedList).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["tap"])((/**
             * @param {?} items
             * @return {?}
             */
            function (items) {
                if (!_this.items || !_this.items.length) {
                    _this.ensureSelectedItems(items);
                }
                if (items !== _this.items) {
                    // New item list, invalidate view cache
                    _this.items = items;
                    // Be cause a new array was returned by getItemList, the list is considered as already filtered (Lazy loading)
                    _this.internalQuery = undefined;
                    _this.ensureChildrenProperties(items);
                }
                delete _this._cache.visibleList;
                _this.waiter$.next(_this.items === undefined);
            })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["switchMap"])((/**
             * @return {?}
             */
            function () { return _this.ensureVisibleListCache$(searchField, _this.internalQuery, queryChanged, multiSelect); })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["map"])(loadViewList));
        }
        else {
            return this.ensureVisibleListCache$(searchField, this.internalQuery, queryChanged, multiSelect).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["map"])(loadViewList));
        }
    };
    /**
     * @return {?}
     */
    ItemListService.prototype.ensureSelection = /**
     * @return {?}
     */
    function () {
        return this.ensureSelectedItems(this.items);
    };
    /** Retourne la liste à utilise pour la création des caches. Surcharger cetee méthode pour fournir une liste de façon lazy.
     * En cas de surcharge, retourner une nouvelle instance de la liste originale pour que le service regénère ses caches.
     * @param query Texte ou regular expression par laquelle la liste doit être filtrée.
     * @param selectedItems Liste des éléments selectionés.
     * @return Observable résolu par la fonction, qui retourne la liste à utiliser.
     */
    /**
     * Retourne la liste à utilise pour la création des caches. Surcharger cetee méthode pour fournir une liste de façon lazy.
     * En cas de surcharge, retourner une nouvelle instance de la liste originale pour que le service regénère ses caches.
     * @protected
     * @param {?=} query Texte ou regular expression par laquelle la liste doit être filtrée.
     * @param {?=} selectedItems Liste des éléments selectionés.
     * @return {?} Observable résolu par la fonction, qui retourne la liste à utiliser.
     */
    ItemListService.prototype.getItemList$ = /**
     * Retourne la liste à utilise pour la création des caches. Surcharger cetee méthode pour fournir une liste de façon lazy.
     * En cas de surcharge, retourner une nouvelle instance de la liste originale pour que le service regénère ses caches.
     * @protected
     * @param {?=} query Texte ou regular expression par laquelle la liste doit être filtrée.
     * @param {?=} selectedItems Liste des éléments selectionés.
     * @return {?} Observable résolu par la fonction, qui retourne la liste à utiliser.
     */
    function (query, selectedItems) {
        return this.loadingItems$ ? this.loadingItems$(query, selectedItems) : Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["of"])(this.items);
    };
    /** Retourne une valeur indiquant si l'élément spécifié correspond aux critères de recherche spécifiés
     * @param item Elément à analyser.
     * @param searchField Nom du champ à utiliser pour la recherche. Le champ représenté peut-être une valeur ou une function.
     * @param regExp Expression de test sur le champs spécifié.
     * @return True si l'élément correspond aux critères de recherche.
     */
    /**
     * Retourne une valeur indiquant si l'élément spécifié correspond aux critères de recherche spécifiés
     * @protected
     * @param {?} item Elément à analyser.
     * @param {?} searchField Nom du champ à utiliser pour la recherche. Le champ représenté peut-être une valeur ou une function.
     * @param {?} regExp Expression de test sur le champs spécifié.
     * @return {?} True si l'élément correspond aux critères de recherche.
     */
    ItemListService.prototype.itemMatch = /**
     * Retourne une valeur indiquant si l'élément spécifié correspond aux critères de recherche spécifiés
     * @protected
     * @param {?} item Elément à analyser.
     * @param {?} searchField Nom du champ à utiliser pour la recherche. Le champ représenté peut-être une valeur ou une function.
     * @param {?} regExp Expression de test sur le champs spécifié.
     * @return {?} True si l'élément correspond aux critères de recherche.
     */
    function (item, searchField, regExp) {
        /** @type {?} */
        var itmTree = ((/** @type {?} */ (item)));
        if (itmTree.$items) {
            return true;
        }
        /** @type {?} */
        var field = ((/** @type {?} */ (item)))[searchField];
        /** @type {?} */
        var value = typeof field === 'function' ? field() : (field ? field : this.getTextValue(item, searchField));
        return value && regExp.test(Diacritics.remove(value));
    };
    /** Retourne une liste groupée si un modèle de groupe interne est spécifié.
     * En cas de surcharge, retourner une nouvelle instance de la liste originale pour que le service regénère ses caches.
     * @param items Liste des éléments à grouper.
     * @return Observable résolu par la fonction, qui retourne la liste groupés.
     */
    /**
     * Retourne une liste groupée si un modèle de groupe interne est spécifié.
     * En cas de surcharge, retourner une nouvelle instance de la liste originale pour que le service regénère ses caches.
     * @protected
     * @param {?} items Liste des éléments à grouper.
     * @return {?} Observable résolu par la fonction, qui retourne la liste groupés.
     */
    ItemListService.prototype.getGroupedList$ = /**
     * Retourne une liste groupée si un modèle de groupe interne est spécifié.
     * En cas de surcharge, retourner une nouvelle instance de la liste originale pour que le service regénère ses caches.
     * @protected
     * @param {?} items Liste des éléments à grouper.
     * @return {?} Observable résolu par la fonction, qui retourne la liste groupés.
     */
    function (items) {
        return items ? this.getGroupingService().group$(this.items, this.groupInfos, '$items') : Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["of"])([]);
    };
    /** Retourne la liste des éléments visibles. Si la liste des éléments est hièrarchique, cette fonction retourne une liste plate. Cette liste est utilisé pour calculer la portion de la liste à afficher.
     * En cas de surcharge, retourner une nouvelle instance de la liste originale pour que le service regénère ses caches.
     * @param items Liste des éléments à traiter.
     * @param searchField Nom du champ à utiliser pour la recherche. Le champ représenté peut-être une valeur ou une function.
     * @param regExp Expression de test à appliquer sur le champ de recherche.
     * @param Auto expand parents on search query.
     * @return Observable résolu par la fonction, qui retourne la liste visibles.
     */
    /**
     * Retourne la liste des éléments visibles. Si la liste des éléments est hièrarchique, cette fonction retourne une liste plate. Cette liste est utilisé pour calculer la portion de la liste à afficher.
     * En cas de surcharge, retourner une nouvelle instance de la liste originale pour que le service regénère ses caches.
     * @protected
     * @param {?} items Liste des éléments à traiter.
     * @param {?} searchField Nom du champ à utiliser pour la recherche. Le champ représenté peut-être une valeur ou une function.
     * @param {?} regExp Expression de test à appliquer sur le champ de recherche.
     * @param {?} expandTree
     * @param {?} multiSelect
     * @return {?} Observable résolu par la fonction, qui retourne la liste visibles.
     */
    ItemListService.prototype.getVisibleList$ = /**
     * Retourne la liste des éléments visibles. Si la liste des éléments est hièrarchique, cette fonction retourne une liste plate. Cette liste est utilisé pour calculer la portion de la liste à afficher.
     * En cas de surcharge, retourner une nouvelle instance de la liste originale pour que le service regénère ses caches.
     * @protected
     * @param {?} items Liste des éléments à traiter.
     * @param {?} searchField Nom du champ à utiliser pour la recherche. Le champ représenté peut-être une valeur ou une function.
     * @param {?} regExp Expression de test à appliquer sur le champ de recherche.
     * @param {?} expandTree
     * @param {?} multiSelect
     * @return {?} Observable résolu par la fonction, qui retourne la liste visibles.
     */
    function (items, searchField, regExp, expandTree, multiSelect) {
        var _this = this;
        if (!items) {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["of"])([]);
        }
        /** @type {?} */
        var visibleList = (/** @type {?} */ ([]));
        /** @type {?} */
        var selectedList = (/** @type {?} */ ([]));
        /** @type {?} */
        var odd = false;
        if (regExp) {
            // Recalc visible list and select list from the filter
            /** @type {?} */
            var getFilteredList_1 = (/**
             * @param {?} treeList
             * @param {?} depth
             * @param {?} hidden
             * @return {?}
             */
            function (treeList, depth, hidden) {
                /** @type {?} */
                var filteredItems;
                if (treeList) {
                    treeList.forEach((/**
                     * @param {?} itm
                     * @return {?}
                     */
                    function (itm) {
                        /** @type {?} */
                        var itmTree = ((/** @type {?} */ (itm)));
                        if (itmTree.$items) {
                            if (itmTree.visible !== false && _this.itemMatch(itmTree, searchField, regExp)) {
                                odd = false;
                                /** @type {?} */
                                var filteredChildren = getFilteredList_1(itmTree.$items, depth + 1, hidden);
                                if (filteredChildren) {
                                    if (itmTree.collapsed && expandTree) {
                                        itmTree.collapsed = false;
                                    }
                                    filteredItems = !filteredItems ? (itmTree.collapsed ? [itmTree] : Object(tslib__WEBPACK_IMPORTED_MODULE_6__["__spread"])([itmTree], filteredChildren)) : (itmTree.collapsed ? Object(tslib__WEBPACK_IMPORTED_MODULE_6__["__spread"])(filteredItems, [itmTree]) : Object(tslib__WEBPACK_IMPORTED_MODULE_6__["__spread"])(filteredItems, [itmTree], filteredChildren));
                                    if (itmTree.selected) {
                                        selectedList.push(itmTree);
                                    }
                                }
                            }
                            // compare fn can be something like re.test(this.getTextValue(itm)
                        }
                        else if (_this.itemMatch(itm, searchField, regExp)) {
                            itmTree.depth = depth;
                            if (!filteredItems) {
                                filteredItems = [];
                            }
                            if (!hidden && !(itm.visible === false) && !(itm.selected && _this.hideSelected)) {
                                // For style
                                itmTree.odd = odd;
                                odd = !odd;
                                filteredItems.push(itmTree);
                            }
                            if (itmTree.selected) {
                                selectedList.push(itmTree);
                            }
                        }
                        else if (itmTree.selected) {
                            selectedList.push(itmTree);
                        }
                    }));
                }
                return filteredItems;
            });
            visibleList = getFilteredList_1(items || [], 0, false) || [];
        }
        else {
            // Get visible items list without filter
            /** @type {?} */
            var getVisibleListInternal_1 = (/**
             * @param {?} treeList
             * @param {?} depth
             * @param {?} hidden
             * @return {?}
             */
            function (treeList, depth, hidden) {
                if (treeList) {
                    treeList.forEach((/**
                     * @param {?} item
                     * @return {?}
                     */
                    function (item) {
                        if (!hidden && !(item.visible === false) && !(item.selected && _this.hideSelected)) {
                            // For style
                            item.odd = odd;
                            odd = !odd;
                            // Add to visible list only the visible items (uncollapsed)
                            visibleList.push(item);
                        }
                        // Add to selected list only the visible items (uncollapsed) and selected
                        if (item.selected) {
                            selectedList.push(item);
                        }
                        // Recursive call
                        if (item.$items) {
                            odd = false;
                            getVisibleListInternal_1(item.$items, depth + 1, hidden || item.collapsed || item.visible === false);
                        }
                    }));
                }
            });
            getVisibleListInternal_1(items, 0, false);
        }
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["of"])(visibleList).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["tap"])((/**
         * @return {?}
         */
        function () {
            if (!multiSelect) {
                _this.selectedList = selectedList;
            }
        })));
    };
    /** Retourne une liste plate depuis la liste originale sans hierarchie.
     * En cas de surcharge, retourner une nouvelle instance de la liste originale pour que le service regénère ses caches.
     * @param items Liste des éléments hierarchique.
     * @return Observable résolu par la fonction, qui retourne la liste hierarchique mise à plat.
     */
    /**
     * Retourne une liste plate depuis la liste originale sans hierarchie.
     * En cas de surcharge, retourner une nouvelle instance de la liste originale pour que le service regénère ses caches.
     * @protected
     * @param {?} items Liste des éléments hierarchique.
     * @param {?} isFiltered
     * @param {?} multiSelect
     * @return {?} Observable résolu par la fonction, qui retourne la liste hierarchique mise à plat.
     */
    ItemListService.prototype.getFlatList$ = /**
     * Retourne une liste plate depuis la liste originale sans hierarchie.
     * En cas de surcharge, retourner une nouvelle instance de la liste originale pour que le service regénère ses caches.
     * @protected
     * @param {?} items Liste des éléments hierarchique.
     * @param {?} isFiltered
     * @param {?} multiSelect
     * @return {?} Observable résolu par la fonction, qui retourne la liste hierarchique mise à plat.
     */
    function (items, isFiltered, multiSelect) {
        var _this = this;
        if (!items) {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["of"])([]);
        }
        /** @type {?} */
        var visibleList = (/** @type {?} */ ([]));
        /** @type {?} */
        var selectedList = (/** @type {?} */ ([]));
        /** @type {?} */
        var depthMax = 0;
        /** @type {?} */
        var isTree = false;
        /** @type {?} */
        var odd = false;
        /** @type {?} */
        var flatList$ = (/**
         * @param {?} itms
         * @param {?} depth
         * @param {?} hidden
         * @return {?}
         */
        function (itms, depth, hidden) {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["from"])(itms || []).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["tap"])((/**
             * @param {?} item
             * @return {?}
             */
            function (item) {
                if (depth > depthMax) {
                    depthMax = depth;
                }
                // Fill system properties
                item.depth = depth;
                if (!hidden && !(item.visible === false) && !(item.selected && _this.hideSelected)) {
                    // For style
                    item.odd = odd;
                    odd = !odd;
                    // Add to visible list only the visible items (uncollapsed)
                    visibleList.push(item);
                }
                // Add to selected list only the visible items (uncollapsed) and selected
                if (item.selected) {
                    selectedList.push(item);
                }
            })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["switchMap"])((/**
             * @param {?} item
             * @return {?}
             */
            function (item) {
                if (item.$items) {
                    isTree = true;
                    odd = false;
                    return Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["concat"])(Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["of"])(item), flatList$(item.$items, depth + 1, hidden || item.collapsed));
                }
                else {
                    return Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["of"])(item);
                }
            })));
        });
        return flatList$(items, 0, false).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["tap"])((/**
         * @return {?}
         */
        function () {
            if (!multiSelect) {
                _this.selectedList = selectedList;
            }
            if (!isFiltered) {
                _this._cache.visibleList = visibleList;
            }
            _this._cache.depthMax = isTree ? depthMax : 0;
        })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["reduce"])((/**
         * @param {?} acc
         * @param {?} cur
         * @return {?}
         */
        function (acc, cur) {
            acc.push(cur);
            return acc;
        }), []));
    };
    /** Efface une partie des caches  */
    /**
     * Efface une partie des caches
     * @protected
     * @return {?}
     */
    ItemListService.prototype.invalidateViewCache = /**
     * Efface une partie des caches
     * @protected
     * @return {?}
     */
    function () {
        delete this._cache.flatList;
        delete this._cache.visibleList;
        delete this._cache.depthMax;
        this._cache.rowsCount = 0;
    };
    /**
     * @private
     * @param {?} items
     * @return {?}
     */
    ItemListService.prototype.ensureSelectedItems = /**
     * @private
     * @param {?} items
     * @return {?}
     */
    function (items) {
        var _this = this;
        if (this.selectedList && this.selectedList.length > 0) {
            // Ensure selected flag
            this.selectedList.forEach((/**
             * @param {?} item
             * @return {?}
             */
            function (item) { return item.selected = true; }));
            if (!items) {
                return this.selectedList;
            }
            /** @type {?} */
            var newSelectedList_1 = (/** @type {?} */ ([]));
            /** @type {?} */
            var ensureSelectedChildren_1 = (/**
             * @param {?} children
             * @return {?}
             */
            function (children) {
                children.forEach((/**
                 * @param {?} item
                 * @return {?}
                 */
                function (item) {
                    /** @type {?} */
                    var selectedItem = _this.selectedList.find((/**
                     * @param {?} selected
                     * @return {?}
                     */
                    function (selected) { return _this.compareItems(selected, item); }));
                    if (selectedItem) {
                        selectedItem.selected = false;
                        newSelectedList_1.push(item);
                    }
                    if (item.$items) {
                        ensureSelectedChildren_1(item.$items);
                    }
                }));
            });
            ensureSelectedChildren_1(items);
            // Add not found selected items
            this.selectedList.filter((/**
             * @param {?} item
             * @return {?}
             */
            function (item) { return item.selected; })).forEach((/**
             * @param {?} item
             * @return {?}
             */
            function (item) { return newSelectedList_1.push(item); }));
            this.selectedList = newSelectedList_1;
            // Ensure selected flag for the new items
            this.selectedList.forEach((/**
             * @param {?} item
             * @return {?}
             */
            function (item) { return item.selected = true; }));
        }
        else {
            this.selectedList = [];
            if (!items) {
                return this.selectedList;
            }
            /** @type {?} */
            var ensureSelectedChildren_2 = (/**
             * @param {?} children
             * @return {?}
             */
            function (children) {
                children.forEach((/**
                 * @param {?} item
                 * @return {?}
                 */
                function (item) {
                    if (item.selected) {
                        _this.selectedList.push(item);
                    }
                    if (item.$items) {
                        ensureSelectedChildren_2(item.$items);
                    }
                }));
            });
            ensureSelectedChildren_2(items);
        }
        return this.selectedList;
    };
    /**
     * @private
     * @param {?} searchField
     * @param {?} regExp
     * @param {?} expandTree
     * @param {?} multiSelect
     * @return {?}
     */
    ItemListService.prototype.ensureVisibleListCache$ = /**
     * @private
     * @param {?} searchField
     * @param {?} regExp
     * @param {?} expandTree
     * @param {?} multiSelect
     * @return {?}
     */
    function (searchField, regExp, expandTree, multiSelect) {
        var _this = this;
        if (this._cache.visibleList && this._cache.visibleList.length) {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["of"])(this._cache.visibleList);
        }
        else {
            return this.ensureFlatListCache$(!!regExp, multiSelect).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["switchMap"])((/**
             * @return {?}
             */
            function () { return _this.getVisibleList$(_this._cache.groupedList, searchField, regExp, expandTree, multiSelect); })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["tap"])((/**
             * @param {?} visibleList
             * @return {?}
             */
            function (visibleList) {
                /* if (this._cache.visibleList && this._cache.visibleList.length && this._cache.visibleList !== visibleList) {
                 // New visible list
                 // Nothing to do yet
                 }*/
                _this._cache.visibleList = visibleList;
                _this._cache.rowsCount = visibleList.length;
            })));
        }
    };
    /**
     * @private
     * @param {?} isFiltered
     * @param {?} multiSelect
     * @return {?}
     */
    ItemListService.prototype.ensureFlatListCache$ = /**
     * @private
     * @param {?} isFiltered
     * @param {?} multiSelect
     * @return {?}
     */
    function (isFiltered, multiSelect) {
        var _this = this;
        if (this._cache.flatList && this._cache.flatList.length) {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["of"])(this._cache.flatList);
        }
        else {
            return this.ensureGroupedListCache$().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["switchMap"])((/**
             * @return {?}
             */
            function () { return _this.getFlatList$(_this._cache.groupedList, isFiltered, multiSelect); })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["tap"])((/**
             * @param {?} flatList
             * @return {?}
             */
            function (flatList) {
                if (_this._cache.flatList && _this._cache.flatList.length && _this._cache.flatList !== flatList) {
                    // New flat list
                    delete _this._cache.visibleList;
                    _this._cache.rowsCount = 0;
                    // Ensure depth max
                    _this._cache.depthMax = 0;
                    if (flatList) {
                        flatList.forEach((/**
                         * @param {?} item
                         * @return {?}
                         */
                        function (item) {
                            if (item.depth && item.depth > _this._cache.depthMax) {
                                _this._cache.depthMax = item.depth;
                            }
                        }));
                    }
                }
                _this._cache.flatList = flatList;
            })));
        }
    };
    /**
     * @private
     * @return {?}
     */
    ItemListService.prototype.ensureGroupedListCache$ = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        if (this._cache.groupedList && this._cache.groupedList.length) {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["of"])(this._cache.groupedList);
        }
        else if (!this.groupInfos || this.groupInfos.length === 0) {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["of"])(this.items).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["tap"])((/**
             * @param {?} items
             * @return {?}
             */
            function (items) { return _this._cache.groupedList = items; })));
        }
        else if (this.items) {
            return this.getGroupedList$(this.items).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["tap"])((/**
             * @param {?} groupedList
             * @return {?}
             */
            function (groupedList) {
                if (_this._cache.groupedList && _this._cache.groupedList.length && _this._cache.groupedList !== groupedList) {
                    // New grouped list
                    _this.invalidateViewCache();
                }
                _this._cache.groupedList = groupedList;
            })));
        }
        else {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["of"])([]);
        }
    };
    /**
     * @private
     * @param {?} items
     * @return {?}
     */
    ItemListService.prototype.ensureChildrenProperties = /**
     * @private
     * @param {?} items
     * @return {?}
     */
    function (items) {
        var _this = this;
        if (!items) {
            return;
        }
        items.forEach((/**
         * @param {?} item
         * @return {?}
         */
        function (item) {
            /** @type {?} */
            var field = ((/** @type {?} */ (item)))[_this.childrenField];
            if (field) {
                item.$items = field;
                _this.ensureChildrenProperties(item.$items);
            }
        }));
    };
    ItemListService.defaultChildrenField = 'items';
    ItemListService.defaultTextField = 'displayName';
    ItemListService.defaultValueField = 'value';
    return ItemListService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var noop = (/**
 * @return {?}
 */
function () { });
/**
 * Classe de base pour tous les composants à listes (deja-treelist, deja-select, deja-grid)
 * @abstract
 */
var  /**
 * Classe de base pour tous les composants à listes (deja-treelist, deja-select, deja-grid)
 * @abstract
 */
ItemListBase = /** @class */ (function () {
    function ItemListBase(changeDetectorRef, viewPort) {
        var _this = this;
        this.changeDetectorRef = changeDetectorRef;
        this.viewPort = viewPort;
        this._waiter = true;
        this._itemList = []; // Viewport list
        // Viewport list
        this._multiSelect = false;
        this._currentItemIndex = -1;
        this._minSearchLength = 0;
        this._isAlive = true;
        // Viewport
        this._vpBeforeHeight = 0;
        this._vpAfterHeight = 0;
        this._vpStartRow = 0;
        this._vpEndRow = 0;
        this._pageSize = 0;
        this._depthMax = 0;
        this.rowsCount = 0;
        this.allCollapsed = false;
        this._viewPortRowHeight = ViewPortService.itemDefaultSize;
        this._listElementId = "listcontainer_" + (1000000000 * Math.random()).toString().substr(10);
        viewPort.viewPort$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["takeWhile"])((/**
         * @return {?}
         */
        function () { return _this._isAlive; })))
            .subscribe((/**
         * @param {?} viewPortResult
         * @return {?}
         */
        function (viewPortResult) {
            delete _this._hintLabel;
            if (viewPort.mode === ViewportMode.disabled) {
                _this._itemList = viewPortResult.items;
                _this._vpStartRow = 0;
                _this._vpEndRow = 0;
                _this._vpBeforeHeight = 0;
                _this._vpAfterHeight = 0;
            }
            else {
                _this._itemList = viewPortResult.visibleItems;
                _this._vpStartRow = viewPortResult.startIndex;
                _this._vpEndRow = viewPortResult.endIndex;
                _this._vpBeforeHeight = viewPortResult.beforeSize;
                _this._vpAfterHeight = viewPortResult.afterSize;
            }
            if (viewPortResult.scrollPos !== undefined) {
                if (_this.listElement) {
                    /** @type {?} */
                    var listItems = _this.listElement.getElementsByClassName('listitem');
                    /** @type {?} */
                    var rebind = listItems.length !== viewPortResult.visibleItems.length;
                    if (!rebind) {
                        _this.listElement.scrollTop = viewPortResult.scrollPos;
                    }
                    else {
                        Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["timer"])(1).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["first"])())
                            .subscribe((/**
                         * @return {?}
                         */
                        function () {
                            _this.listElement.scrollTop = viewPortResult.scrollPos;
                        }));
                    }
                }
            }
            _this.changeDetectorRef.markForCheck();
            // console.log(viewPortResult);
            if (_this._viewPortChanged) {
                _this._viewPortChanged.next(viewPortResult);
            }
        }));
    }
    Object.defineProperty(ItemListBase.prototype, "isMultiSelect", {
        get: /**
         * @return {?}
         */
        function () {
            return this._multiSelect;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemListBase.prototype, "itemList", {
        get: /**
         * @return {?}
         */
        function () {
            return this._itemList;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemListBase.prototype, "treeItemList", {
        get: /**
         * @return {?}
         */
        function () {
            return (/** @type {?} */ (this._itemList));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemListBase.prototype, "ddStartIndex", {
        get: /**
         * @return {?}
         */
        function () {
            return this._ddStartIndex;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemListBase.prototype, "vpBeforeHeight", {
        get: /**
         * @return {?}
         */
        function () {
            return this._vpBeforeHeight;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemListBase.prototype, "vpAfterHeight", {
        get: /**
         * @return {?}
         */
        function () {
            return this._vpAfterHeight;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemListBase.prototype, "vpStartRow", {
        get: /**
         * @return {?}
         */
        function () {
            return this._vpStartRow;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemListBase.prototype, "vpEndRow", {
        get: /**
         * @return {?}
         */
        function () {
            return this._vpEndRow;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemListBase.prototype, "sortInfos", {
        /** Renvoie le modèle de tri appliqué à la liste.
         * @param sortInfos Modèle de tri appliqué.
         */
        get: /**
         * Renvoie le modèle de tri appliqué à la liste.
         * @return {?}
         */
        function () {
            return this._sortInfos;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemListBase.prototype, "groupInfos", {
        /** Renvoie le modèle de regroupement appliqué à la liste.
         * @param sortInfos Modèle de regroupement appliqué.
         */
        get: /**
         * Renvoie le modèle de regroupement appliqué à la liste.
         * @return {?}
         */
        function () {
            return this._itemListService.groupInfos;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ItemListBase.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._isAlive = false;
    };
    /** Définit une valeur indiquant si les éléments selectionés doivent être masqué. Ce flag est principalement utilisé dans le cas d'un multi-select
     * @param value True si les éléments selectionés doivent être masqués
     */
    /**
     * Définit une valeur indiquant si les éléments selectionés doivent être masqué. Ce flag est principalement utilisé dans le cas d'un multi-select
     * @param {?} value True si les éléments selectionés doivent être masqués
     * @return {?}
     */
    ItemListBase.prototype.setHideSelected = /**
     * Définit une valeur indiquant si les éléments selectionés doivent être masqué. Ce flag est principalement utilisé dans le cas d'un multi-select
     * @param {?} value True si les éléments selectionés doivent être masqués
     * @return {?}
     */
    function (value) {
        this._hideSelected = value;
        if (this._itemListService) {
            this._itemListService.hideSelected = value;
        }
    };
    /** Définit le champs utilisé comme collection pour les enfants d'un parent.
     * @param value Nom du champ à utiliser comme collection d'enfants
     */
    /**
     * Définit le champs utilisé comme collection pour les enfants d'un parent.
     * @param {?} value Nom du champ à utiliser comme collection d'enfants
     * @return {?}
     */
    ItemListBase.prototype.setChildrenField = /**
     * Définit le champs utilisé comme collection pour les enfants d'un parent.
     * @param {?} value Nom du champ à utiliser comme collection d'enfants
     * @return {?}
     */
    function (value) {
        this._childrenField = value;
        if (this._itemListService) {
            this._itemListService.childrenField = value;
        }
    };
    /** Renvoie l'index de l'élément sur la liste plate corespondant à l'élément HTML spécifié
     * @return Index sur la liste plate corespondant à l'élément HTML
     */
    /**
     * Renvoie l'index de l'élément sur la liste plate corespondant à l'élément HTML spécifié
     * @param {?} element
     * @return {?} Index sur la liste plate corespondant à l'élément HTML
     */
    ItemListBase.prototype.getItemIndexFromHTMLElement = /**
     * Renvoie l'index de l'élément sur la liste plate corespondant à l'élément HTML spécifié
     * @param {?} element
     * @return {?} Index sur la liste plate corespondant à l'élément HTML
     */
    function (element) {
        while (element && element.parentElement && element.hasAttribute && !element.hasAttribute('flat') && element.parentElement.id !== this.listElementId) {
            element = element.parentElement;
        }
        if (!element || !element.hasAttribute('flat')) {
            return undefined;
        }
        return +element.getAttribute('flat');
    };
    /**
     * @param {?} element
     * @return {?}
     */
    ItemListBase.prototype.getItemFromHTMLElement = /**
     * @param {?} element
     * @return {?}
     */
    function (element) {
        /** @type {?} */
        var itemIndex = this.getItemIndexFromHTMLElement(element);
        if (itemIndex === undefined) {
            return undefined;
        }
        return this._itemList[itemIndex - this.vpStartRow];
    };
    /** Retourne le service de liste utilisé par ce composant.
     * @return Service de liste utilisé par ce composant.
     */
    /**
     * Retourne le service de liste utilisé par ce composant.
     * @return {?} Service de liste utilisé par ce composant.
     */
    ItemListBase.prototype.getItemListService = /**
     * Retourne le service de liste utilisé par ce composant.
     * @return {?} Service de liste utilisé par ce composant.
     */
    function () {
        if (!this._itemListService) {
            this.setItemListService(new ItemListService());
        }
        return this._itemListService;
    };
    /** Retourne la liste des éléments sélectionés.
     * @return Liste des éléments selectionés.
     */
    /**
     * Retourne la liste des éléments sélectionés.
     * @return {?} Liste des éléments selectionés.
     */
    ItemListBase.prototype.getSelectedItems = /**
     * Retourne la liste des éléments sélectionés.
     * @return {?} Liste des éléments selectionés.
     */
    function () {
        return this.getItemListService().getSelectedItems();
    };
    /** Définit la liste des éléments sélectionés.
     * @param items Liste des éléments a selectioner.
     */
    /**
     * Définit la liste des éléments sélectionés.
     * @param {?} value
     * @return {?}
     */
    ItemListBase.prototype.setSelectedItems = /**
     * Définit la liste des éléments sélectionés.
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.getItemListService().setSelectedItems(value);
        this.changeDetectorRef.markForCheck();
    };
    /**
     * Set a promise or an observable called before an item selection
     */
    /**
     * Set a promise or an observable called before an item selection
     * @param {?} fn
     * @return {?}
     */
    ItemListBase.prototype.setLoadingItems = /**
     * Set a promise or an observable called before an item selection
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.getItemListService().setLoadingItems(fn);
    };
    /**
     * Set a promise or an observable called before an item deselection
     */
    /**
     * Set a promise or an observable called before an item deselection
     * @param {?} fn
     * @return {?}
     */
    ItemListBase.prototype.setSelectingItem = /**
     * Set a promise or an observable called before an item deselection
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.getItemListService().setSelectingItem(fn);
    };
    /**
     * Set a promise or an observable called before an item deselection
     */
    /**
     * Set a promise or an observable called before an item deselection
     * @param {?} fn
     * @return {?}
     */
    ItemListBase.prototype.setUnselectingItem = /**
     * Set a promise or an observable called before an item deselection
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.getItemListService().setUnselectingItem(fn);
    };
    /**
     * Set a promise or an observable called before an item selection
     */
    /**
     * Set a promise or an observable called before an item selection
     * @param {?} fn
     * @return {?}
     */
    ItemListBase.prototype.setExpandingItem = /**
     * Set a promise or an observable called before an item selection
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.getItemListService().setExpandingItem(fn);
    };
    /**
     * Set a promise or an observable called before an item deselection
     */
    /**
     * Set a promise or an observable called before an item deselection
     * @param {?} fn
     * @return {?}
     */
    ItemListBase.prototype.setCollapsingItem = /**
     * Set a promise or an observable called before an item deselection
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.getItemListService().setCollapsingItem(fn);
    };
    /** Evalue le texte à afficher pour l'élément spécifié.
     * @param value  Model à évaluer.
     * @return Texte à afficher pour le modèle spécifié.
     */
    /**
     * Evalue le texte à afficher pour l'élément spécifié.
     * @param {?} value  Model à évaluer.
     * @return {?} Texte à afficher pour le modèle spécifié.
     */
    ItemListBase.prototype.getTextValue = /**
     * Evalue le texte à afficher pour l'élément spécifié.
     * @param {?} value  Model à évaluer.
     * @return {?} Texte à afficher pour le modèle spécifié.
     */
    function (value) {
        return this.getItemListService().getTextValue(value, this._textField);
    };
    /**
     * Set le viewport mode
     *
     * @param mode Mode du viewport (sans viewport, avec un viewport tailles des rows fixes ou dynamiques)
     */
    /**
     * Set le viewport mode
     *
     * @param {?} mode Mode du viewport (sans viewport, avec un viewport tailles des rows fixes ou dynamiques)
     * @return {?}
     */
    ItemListBase.prototype.setViewportMode = /**
     * Set le viewport mode
     *
     * @param {?} mode Mode du viewport (sans viewport, avec un viewport tailles des rows fixes ou dynamiques)
     * @return {?}
     */
    function (mode) {
        this.viewPort.mode$.next(mode);
    };
    /** Trie la liste par le champs spécifié. */
    /**
     * Trie la liste par le champs spécifié.
     * @param {?=} name
     * @return {?}
     */
    ItemListBase.prototype.sort = /**
     * Trie la liste par le champs spécifié.
     * @param {?=} name
     * @return {?}
     */
    function (name) {
        this.sort$(name).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["first"])()).subscribe(noop);
    };
    /** Trie la liste par le champs spécifié. */
    /**
     * Trie la liste par le champs spécifié.
     * @param {?=} name
     * @return {?}
     */
    ItemListBase.prototype.sort$ = /**
     * Trie la liste par le champs spécifié.
     * @param {?=} name
     * @return {?}
     */
    function (name) {
        var _this = this;
        /** @type {?} */
        var sortField = name || this._textField;
        if (!this._sortInfos) {
            this._sortInfos = {
                name: sortField,
                order: SortOrder.ascending,
            };
        }
        else if (sortField === this._sortInfos.name) {
            this._sortInfos.order = this._sortInfos.order === SortOrder.ascending ? SortOrder.descending : SortOrder.ascending;
        }
        else {
            this._sortInfos.name = sortField;
            this._sortInfos.order = SortOrder.ascending;
        }
        return this.getItemListService().sort$(this._sortInfos).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["first"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["switchMap"])((/**
         * @param {?} si
         * @return {?}
         */
        function (si) { return _this.calcViewList$().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["first"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["map"])((/**
         * @return {?}
         */
        function () { return si; }))); })));
    };
    /** Groupe les éléments en fonction du modèle de groupe spécifié
     * @param groupInfos Modèle de groupe à appliquer.
     * @return Observable résolu par la fonction.
     */
    /**
     * Groupe les éléments en fonction du modèle de groupe spécifié
     * @param {?} groups
     * @return {?} Observable résolu par la fonction.
     */
    ItemListBase.prototype.group$ = /**
     * Groupe les éléments en fonction du modèle de groupe spécifié
     * @param {?} groups
     * @return {?} Observable résolu par la fonction.
     */
    function (groups) {
        var _this = this;
        return this.getItemListService().group$(groups).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["switchMap"])((/**
         * @return {?}
         */
        function () { return _this.calcViewList$().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["first"])()); })));
    };
    /** Retire les groupe correspondants au modèle de groupe spécifié
     * @param groupInfos Modèle de groupe à retirer.
     * @return Observable résolu par la fonction.
     */
    /**
     * Retire les groupe correspondants au modèle de groupe spécifié
     * @param {?} groupInfo
     * @return {?} Observable résolu par la fonction.
     */
    ItemListBase.prototype.ungroup$ = /**
     * Retire les groupe correspondants au modèle de groupe spécifié
     * @param {?} groupInfo
     * @return {?} Observable résolu par la fonction.
     */
    function (groupInfo) {
        var _this = this;
        return this.getItemListService().ungroup$(groupInfo).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["switchMap"])((/**
         * @return {?}
         */
        function () { return _this.calcViewList$().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["first"])()); })));
    };
    /** Change l'état d'expansion de tous les éléments.
     * @return Observable résolu par la fonction.
     */
    /**
     * Change l'état d'expansion de tous les éléments.
     * @param {?=} collapsed
     * @return {?} Observable résolu par la fonction.
     */
    ItemListBase.prototype.toggleAll$ = /**
     * Change l'état d'expansion de tous les éléments.
     * @param {?=} collapsed
     * @return {?} Observable résolu par la fonction.
     */
    function (collapsed) {
        var _this = this;
        this.allCollapsed = (collapsed !== undefined) ? collapsed : !this.allCollapsed;
        if (this.viewPort.mode === ViewportMode.disabled) {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["from"])(this._itemList).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["filter"])((/**
             * @param {?} item
             * @return {?}
             */
            function (item) { return item.$items && item.depth === 0 && item.collapsible !== false; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["switchMap"])((/**
             * @param {?} _item
             * @param {?} index
             * @return {?}
             */
            function (_item, index) { return _this.toggleCollapse$(index + _this.vpStartRow, _this.allCollapsed); })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["reduce"])((/**
             * @param {?} acc
             * @param {?} item
             * @return {?}
             */
            function (acc, item) {
                acc.push(item);
                return acc;
            }), (/** @type {?} */ ([]))));
        }
        else {
            return this.getItemListService().toggleAll$(this.allCollapsed);
        }
    };
    /** Change l'état d'expansion de l'élément spécifié par son index sur la liste des éléments visibles.
     * @param index  Index sur la liste des éléments visibles de l'élément à changer.
     * @param collapse  Etat de l'élément. True pour réduire l'élément.
     * @return Observable résolu par la fonction.
     */
    /**
     * Change l'état d'expansion de l'élément spécifié par son index sur la liste des éléments visibles.
     * @param {?} index  Index sur la liste des éléments visibles de l'élément à changer.
     * @param {?} collapsed
     * @return {?} Observable résolu par la fonction.
     */
    ItemListBase.prototype.toggleCollapse$ = /**
     * Change l'état d'expansion de l'élément spécifié par son index sur la liste des éléments visibles.
     * @param {?} index  Index sur la liste des éléments visibles de l'élément à changer.
     * @param {?} collapsed
     * @return {?} Observable résolu par la fonction.
     */
    function (index, collapsed) {
        var _this = this;
        return this.getItemListService().toggleCollapse$(index, collapsed).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["switchMap"])((/**
         * @param {?} toogleResult
         * @return {?}
         */
        function (toogleResult) { return _this.calcViewList$().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["first"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["map"])((/**
         * @return {?}
         */
        function () { return toogleResult; }))); })));
    };
    /** Déselectionne tous les éléments sélectionés.
     * @return Observable résolu par la fonction.
     */
    /**
     * Déselectionne tous les éléments sélectionés.
     * @return {?} Observable résolu par la fonction.
     */
    ItemListBase.prototype.unselectAll$ = /**
     * Déselectionne tous les éléments sélectionés.
     * @return {?} Observable résolu par la fonction.
     */
    function () {
        /** @type {?} */
        var itemListService = this.getItemListService();
        return itemListService.unselectAll$();
    };
    /** Nettoye les caches et réaffiche le viewport. */
    /**
     * Nettoye les caches et réaffiche le viewport.
     * @return {?}
     */
    ItemListBase.prototype.refresh = /**
     * Nettoye les caches et réaffiche le viewport.
     * @return {?}
     */
    function () {
        this.getItemListService().invalidateCache();
        this.calcViewList$().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["first"])())
            .subscribe(noop);
    };
    /** Recalcule le viewport. */
    /**
     * Recalcule le viewport.
     * @param {?=} item
     * @param {?=} clearMeasuredHeight
     * @return {?}
     */
    ItemListBase.prototype.refreshViewPort = /**
     * Recalcule le viewport.
     * @param {?=} item
     * @param {?=} clearMeasuredHeight
     * @return {?}
     */
    function (item, clearMeasuredHeight) {
        /** @type {?} */
        var refreshParams = (/** @type {?} */ ({}));
        if (item) {
            refreshParams.items = item instanceof Array ? item : [item];
        }
        if (clearMeasuredHeight) {
            refreshParams.clearMeasuredSize = clearMeasuredHeight;
        }
        this.viewPort.refresh(refreshParams);
        this.changeDetectorRef.markForCheck();
    };
    /** Efface le viewport */
    /**
     * Efface le viewport
     * @return {?}
     */
    ItemListBase.prototype.clearViewPort = /**
     * Efface le viewport
     * @return {?}
     */
    function () {
        this.viewPort.clear();
    };
    /** Efface la hauteur calculée des lignes en mode automatique */
    /**
     * Efface la hauteur calculée des lignes en mode automatique
     * @return {?}
     */
    ItemListBase.prototype.clearRowsHeight = /**
     * Efface la hauteur calculée des lignes en mode automatique
     * @return {?}
     */
    function () {
        this.getItemListService().invalidateRowsHeightCache();
    };
    /** Retrouve les informations du parent de l'élément spécifié
     * @param item Element enfant du parent à retrouver.
     * @return Observable résolu par la fonction, qui retourne les informations sur le parent de l'élément spécifié
     */
    /**
     * Retrouve les informations du parent de l'élément spécifié
     * @param {?} item Element enfant du parent à retrouver.
     * @return {?} Observable résolu par la fonction, qui retourne les informations sur le parent de l'élément spécifié
     */
    ItemListBase.prototype.getParentListInfos$ = /**
     * Retrouve les informations du parent de l'élément spécifié
     * @param {?} item Element enfant du parent à retrouver.
     * @return {?} Observable résolu par la fonction, qui retourne les informations sur le parent de l'élément spécifié
     */
    function (item) {
        return this.getItemListService().getParentListInfos$(item, this._multiSelect);
    };
    Object.defineProperty(ItemListBase.prototype, "listElementId", {
        get: /**
         * @return {?}
         */
        function () {
            return this._listElementId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemListBase.prototype, "listElement", {
        get: /**
         * @return {?}
         */
        function () {
            // Can be an overlay
            return this._listElement || document.getElementById(this.listElementId);
        },
        set: /**
         * @param {?} elem
         * @return {?}
         */
        function (elem) {
            this._listElement = elem;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @protected
     * @return {?}
     */
    ItemListBase.prototype.getSelectedModels = /**
     * @protected
     * @return {?}
     */
    function () {
        return this.getItemListService().getSelectedItems().map((/**
         * @param {?} itm
         * @return {?}
         */
        function (itm) { return itm.model !== undefined ? itm.model : itm; }));
    };
    /**
     * @protected
     * @param {?} values
     * @return {?}
     */
    ItemListBase.prototype.setSelectedModels = /**
     * @protected
     * @param {?} values
     * @return {?}
     */
    function (values) {
        return this.setSelectedItems(values && this.mapToIItemBase(values, true));
    };
    /** Trouve l'élément suivant répondant à la fonction de comparaison spécifiée.
     * @param compare Function de comparaison pour la recherche de l'élément.
     * @param startIndex Index de départ sur la liste des éléments visibles.
     * @return Observable résolu par la fonction.
     */
    /**
     * Trouve l'élément suivant répondant à la fonction de comparaison spécifiée.
     * @protected
     * @param {?=} compare Function de comparaison pour la recherche de l'élément.
     * @param {?=} startIndex Index de départ sur la liste des éléments visibles.
     * @return {?} Observable résolu par la fonction.
     */
    ItemListBase.prototype.findNextMatch$ = /**
     * Trouve l'élément suivant répondant à la fonction de comparaison spécifiée.
     * @protected
     * @param {?=} compare Function de comparaison pour la recherche de l'élément.
     * @param {?=} startIndex Index de départ sur la liste des éléments visibles.
     * @return {?} Observable résolu par la fonction.
     */
    function (compare, startIndex) {
        var _this = this;
        return this.ensureListCaches$().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["switchMap"])((/**
         * @return {?}
         */
        function () { return _this.getItemListService().findNextMatch$(compare, startIndex); })));
    };
    /** Définit la hauteur d'une ligne pour le calcul du viewport. Le Viewport ne fonctionne qu'avec des hauteurs de lignes fixe.
     * Pour désactiver le viewport, mettre la hauteur de ligne à 0.
     * Attention, une désactivation du viewport dégrade considérablement les performances de la liste et ne doit pas être activée si la liste
     * est suceptible de contenir beaucoup d'éléments.
     * @param value Hauteur de ligne à utiliser pour le calcul du viewport.
     */
    /**
     * Définit la hauteur d'une ligne pour le calcul du viewport. Le Viewport ne fonctionne qu'avec des hauteurs de lignes fixe.
     * Pour désactiver le viewport, mettre la hauteur de ligne à 0.
     * Attention, une désactivation du viewport dégrade considérablement les performances de la liste et ne doit pas être activée si la liste
     * est suceptible de contenir beaucoup d'éléments.
     * @protected
     * @param {?} value Hauteur de ligne à utiliser pour le calcul du viewport.
     * @return {?}
     */
    ItemListBase.prototype.setViewPortRowHeight = /**
     * Définit la hauteur d'une ligne pour le calcul du viewport. Le Viewport ne fonctionne qu'avec des hauteurs de lignes fixe.
     * Pour désactiver le viewport, mettre la hauteur de ligne à 0.
     * Attention, une désactivation du viewport dégrade considérablement les performances de la liste et ne doit pas être activée si la liste
     * est suceptible de contenir beaucoup d'éléments.
     * @protected
     * @param {?} value Hauteur de ligne à utiliser pour le calcul du viewport.
     * @return {?}
     */
    function (value) {
        this._viewPortRowHeight = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_4__["coerceNumberProperty"])(value);
        if (value) {
            this.viewPort.itemsSize$.next(this._viewPortRowHeight);
        }
    };
    /**
     * @return {?}
     */
    ItemListBase.prototype.getViewPortRowHeight = /**
     * @return {?}
     */
    function () {
        return this._viewPortRowHeight || ViewPortService.itemDefaultSize;
    };
    /** Definit le service de liste utilisé par ce composant.
     * @param value Service de liste utilisé par ce composant.
     */
    /**
     * Definit le service de liste utilisé par ce composant.
     * @protected
     * @param {?} value Service de liste utilisé par ce composant.
     * @return {?}
     */
    ItemListBase.prototype.setItemListService = /**
     * Definit le service de liste utilisé par ce composant.
     * @protected
     * @param {?} value Service de liste utilisé par ce composant.
     * @return {?}
     */
    function (value) {
        var _this = this;
        if (this.waiter$sub) {
            this.waiter$sub.unsubscribe();
            this.waiter$sub = undefined;
        }
        this._itemListService = value;
        if (this._itemListService) {
            this._itemListService.hideSelected = this._hideSelected;
            this._itemListService.childrenField = this._childrenField;
            this._itemListService.valueField = this._valueField;
            this.waiter$sub = Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["from"])(this._itemListService.waiter$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["takeWhile"])((/**
             * @return {?}
             */
            function () { return _this._isAlive; })))
                .subscribe((/**
             * @param {?} status
             * @return {?}
             */
            function (status) {
                _this._waiter = status;
                _this.changeDetectorRef.markForCheck();
            }));
        }
    };
    /** Definit le service de tri utilisé par ce composant.
     * @param value Service de tri utilisé par ce composant.
     */
    /**
     * Definit le service de tri utilisé par ce composant.
     * @protected
     * @param {?} value Service de tri utilisé par ce composant.
     * @return {?}
     */
    ItemListBase.prototype.setSortingService = /**
     * Definit le service de tri utilisé par ce composant.
     * @protected
     * @param {?} value Service de tri utilisé par ce composant.
     * @return {?}
     */
    function (value) {
        if (!value && !this._itemListService) {
            return;
        }
        this._itemListService.setSortingService(value);
    };
    /** Definit le service de regroupement utilisé par ce composant.
     * @param value Service de regroupement utilisé par ce composant.
     */
    /**
     * Definit le service de regroupement utilisé par ce composant.
     * @protected
     * @param {?} value Service de regroupement utilisé par ce composant.
     * @return {?}
     */
    ItemListBase.prototype.setGroupingService = /**
     * Definit le service de regroupement utilisé par ce composant.
     * @protected
     * @param {?} value Service de regroupement utilisé par ce composant.
     * @return {?}
     */
    function (value) {
        if (!value && !this._itemListService) {
            return;
        }
        this._itemListService.setGroupingService(value);
    };
    /** Définit le texte à afficher dans la zone de conseil.
     * @param value Texte à afficher.
     */
    /**
     * Définit le texte à afficher dans la zone de conseil.
     * @protected
     * @param {?} value Texte à afficher.
     * @return {?}
     */
    ItemListBase.prototype.setHintLabel = /**
     * Définit le texte à afficher dans la zone de conseil.
     * @protected
     * @param {?} value Texte à afficher.
     * @return {?}
     */
    function (value) {
        this._hintLabel = value;
    };
    /** Définit le texte à afficher si la liste est vide.
     * @param value Texte à afficher.
     */
    /**
     * Définit le texte à afficher si la liste est vide.
     * @protected
     * @param {?} value Texte à afficher.
     * @return {?}
     */
    ItemListBase.prototype.setNodataLabel = /**
     * Définit le texte à afficher si la liste est vide.
     * @protected
     * @param {?} value Texte à afficher.
     * @return {?}
     */
    function (value) {
        this._nodataLabel = value;
    };
    /**
     * @protected
     * @param {?} value
     * @return {?}
     */
    ItemListBase.prototype.setCurrentItemIndex = /**
     * @protected
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this._currentItemIndex = value;
        this._currentItem = null;
    };
    /**
     * @return {?}
     */
    ItemListBase.prototype.getCurrentItemIndex = /**
     * @return {?}
     */
    function () {
        return this._currentItemIndex;
    };
    /** Retourne l'élément courant (actif).
     * @return Elément courant.
     */
    /**
     * Retourne l'élément courant (actif).
     * @return {?} Elément courant.
     */
    ItemListBase.prototype.getCurrentItem = /**
     * Retourne l'élément courant (actif).
     * @return {?} Elément courant.
     */
    function () {
        if (!this._currentItem && this._currentItemIndex >= 0) {
            this._currentItem = this.getItemListService().getItemFromIndex(this._currentItemIndex);
        }
        return this._currentItem;
    };
    /** Définit l'élément courant (actif).
     * @param item Elément courant.
     */
    /**
     * Définit l'élément courant (actif).
     * @protected
     * @param {?} item Elément courant.
     * @return {?}
     */
    ItemListBase.prototype.setCurrentItem = /**
     * Définit l'élément courant (actif).
     * @protected
     * @param {?} item Elément courant.
     * @return {?}
     */
    function (item) {
        this._currentItemIndex = item ? this.getItemListService().getItemIndex(item) : -1;
        this._currentItem = item;
    };
    /** Retourne l'index correspondant à l'élément spéficié dans la liste des éléments visibles
     * @param item Element à chercher sur la liste des éléments visibles.
     * @return Index correspondant à l'élément recherché.
     */
    /**
     * Retourne l'index correspondant à l'élément spéficié dans la liste des éléments visibles
     * @protected
     * @param {?} item Element à chercher sur la liste des éléments visibles.
     * @return {?} Index correspondant à l'élément recherché.
     */
    ItemListBase.prototype.getItemIndex = /**
     * Retourne l'index correspondant à l'élément spéficié dans la liste des éléments visibles
     * @protected
     * @param {?} item Element à chercher sur la liste des éléments visibles.
     * @return {?} Index correspondant à l'élément recherché.
     */
    function (item) {
        return item && this.getItemListService() ? this.getItemListService().getItemIndex(item) : -1;
    };
    /** Définit si plusieurs éléments peuvent être sélectionés.
     * @param value True si plusieurs éléments peuvent être sélectionés.
     */
    /**
     * Définit si plusieurs éléments peuvent être sélectionés.
     * @protected
     * @param {?} value True si plusieurs éléments peuvent être sélectionés.
     * @return {?}
     */
    ItemListBase.prototype.setMultiSelect = /**
     * Définit si plusieurs éléments peuvent être sélectionés.
     * @protected
     * @param {?} value True si plusieurs éléments peuvent être sélectionés.
     * @return {?}
     */
    function (value) {
        this._multiSelect = value;
    };
    /** Définit le modèle utilisé par la liste. Il est uniquement de type IItemBase. Ce model peut ètre hierarchique sans limitation de la profondeur ou une chargé en asynchrone par une promise ou un observable.
     * @param items Provider de la liste des éléments de la liste.
     */
    /**
     * Définit le modèle utilisé par la liste. Il est uniquement de type IItemBase. Ce model peut ètre hierarchique sans limitation de la profondeur ou une chargé en asynchrone par une promise ou un observable.
     * @protected
     * @param {?} items Provider de la liste des éléments de la liste.
     * @return {?}
     */
    ItemListBase.prototype.setItems$ = /**
     * Définit le modèle utilisé par la liste. Il est uniquement de type IItemBase. Ce model peut ètre hierarchique sans limitation de la profondeur ou une chargé en asynchrone par une promise ou un observable.
     * @protected
     * @param {?} items Provider de la liste des éléments de la liste.
     * @return {?}
     */
    function (items) {
        if (!(items instanceof Array)) {
            this.clearViewPort();
        }
        return this.getItemListService().setItems$(items);
    };
    /** Définit le modèle utilisé par la liste. Il peut être de tout type d'objet. Ce model peut ètre hierarchique sans limitation de la profondeur ou une chargé en asynchrone par une promise ou un observable.
     * @param items Provider de la liste des éléments de la liste.
     */
    /**
     * Définit le modèle utilisé par la liste. Il peut être de tout type d'objet. Ce model peut ètre hierarchique sans limitation de la profondeur ou une chargé en asynchrone par une promise ou un observable.
     * @protected
     * @param {?} models
     * @return {?}
     */
    ItemListBase.prototype.setModels$ = /**
     * Définit le modèle utilisé par la liste. Il peut être de tout type d'objet. Ce model peut ètre hierarchique sans limitation de la profondeur ou une chargé en asynchrone par une promise ou un observable.
     * @protected
     * @param {?} models
     * @return {?}
     */
    function (models) {
        var _this = this;
        /** @type {?} */
        var models$;
        if (models instanceof Array) {
            models$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["of"])(models);
        }
        else {
            models$ = (/** @type {?} */ (models));
        }
        /** @type {?} */
        var items$ = models$ && models$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["map"])((/**
         * @param {?} model
         * @return {?}
         */
        function (model) { return _this.mapToIItemBase(model); })));
        return this.setItems$(items$);
    };
    // Ne pas utiliser, cette fonction retourne la liste des éléments pour l'implémentation de ngModel.
    // Ne pas utiliser, cette fonction retourne la liste des éléments pour l'implémentation de ngModel.
    /**
     * @protected
     * @return {?}
     */
    ItemListBase.prototype.getItems = 
    // Ne pas utiliser, cette fonction retourne la liste des éléments pour l'implémentation de ngModel.
    /**
     * @protected
     * @return {?}
     */
    function () {
        return this.getItemListService().getItems();
    };
    /** Usage interne. Termine le drag and drop en cours. */
    /**
     * Usage interne. Termine le drag and drop en cours.
     * @protected
     * @return {?}
     */
    ItemListBase.prototype.drop$ = /**
     * Usage interne. Termine le drag and drop en cours.
     * @protected
     * @return {?}
     */
    function () {
        this.setCurrentItemIndex(-1);
        return this.getItemListService().drop$();
    };
    /** Usage interne. Retourne la portion de la liste à afficher en fonction des paramètres spécifiés. */
    /**
     * Usage interne. Retourne la portion de la liste à afficher en fonction des paramètres spécifiés.
     * @protected
     * @param {?=} query
     * @param {?=} ignoreCache
     * @return {?}
     */
    ItemListBase.prototype.getViewList$ = /**
     * Usage interne. Retourne la portion de la liste à afficher en fonction des paramètres spécifiés.
     * @protected
     * @param {?=} query
     * @param {?=} ignoreCache
     * @return {?}
     */
    function (query, ignoreCache) {
        if (typeof query === 'string' && (query || '').length < this._minSearchLength) {
            /** @type {?} */
            var emptyListResult_1 = (/** @type {?} */ ({
                depthMax: 0,
                visibleList: [],
            }));
            if (!this.getItems()) {
                return this.setItems$([]).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["map"])((/**
                 * @return {?}
                 */
                function () { return emptyListResult_1; })));
            }
            else {
                return Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["of"])(emptyListResult_1);
            }
        }
        return this.getItemListService()
            .getViewList$(this._searchField || this._textField, query, ignoreCache, this._ddStartIndex, this._ddTargetIndex, this._multiSelect);
    };
    /** Sélectionne une plage d'éléments en fonction de l'index de début et l'index de fin sur la liste des éléments visibles.
     * @param indexFrom index sur la liste des éléments visibles du premier élément à sélectioner.
     * @param indexTo index sur la liste des éléments visibles du dernier élément à sélectioner.
     * @return Observable résolu par la fonction.
     */
    /**
     * Sélectionne une plage d'éléments en fonction de l'index de début et l'index de fin sur la liste des éléments visibles.
     * @protected
     * @param {?} indexFrom index sur la liste des éléments visibles du premier élément à sélectioner.
     * @param {?=} indexTo index sur la liste des éléments visibles du dernier élément à sélectioner.
     * @return {?} Observable résolu par la fonction.
     */
    ItemListBase.prototype.selectRange$ = /**
     * Sélectionne une plage d'éléments en fonction de l'index de début et l'index de fin sur la liste des éléments visibles.
     * @protected
     * @param {?} indexFrom index sur la liste des éléments visibles du premier élément à sélectioner.
     * @param {?=} indexTo index sur la liste des éléments visibles du dernier élément à sélectioner.
     * @return {?} Observable résolu par la fonction.
     */
    function (indexFrom, indexTo) {
        /** @type {?} */
        var itemListService = this.getItemListService();
        return this.ensureListCaches$().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["switchMap"])((/**
         * @return {?}
         */
        function () { return itemListService.selectRange$(indexFrom, indexTo); })));
    };
    /** Change l'état de selection de l'élément spécifié.
     * @param items Liste des éléments à modifier.
     * @param selected True si les éléments divent être sélectionés, False si ils doivent être déselectionés.
     * @return Observable résolu par la fonction.
     */
    /**
     * Change l'état de selection de l'élément spécifié.
     * @protected
     * @param {?} items Liste des éléments à modifier.
     * @param {?} selected True si les éléments divent être sélectionés, False si ils doivent être déselectionés.
     * @return {?} Observable résolu par la fonction.
     */
    ItemListBase.prototype.toggleSelect$ = /**
     * Change l'état de selection de l'élément spécifié.
     * @protected
     * @param {?} items Liste des éléments à modifier.
     * @param {?} selected True si les éléments divent être sélectionés, False si ils doivent être déselectionés.
     * @return {?} Observable résolu par la fonction.
     */
    function (items, selected) {
        /** @type {?} */
        var itemListService = this.getItemListService();
        return itemListService.toggleSelect$(items, selected);
    };
    /** Définit si l'élément spécifié peut être réduit.
     * @param item Elément à analyser.
     * @return True si l'élément peut être réduit.
     */
    /**
     * Définit si l'élément spécifié peut être réduit.
     * @protected
     * @param {?} item Elément à analyser.
     * @return {?} True si l'élément peut être réduit.
     */
    ItemListBase.prototype.isCollapsible = /**
     * Définit si l'élément spécifié peut être réduit.
     * @protected
     * @param {?} item Elément à analyser.
     * @return {?} True si l'élément peut être réduit.
     */
    function (item) {
        return item && item.$items && item.collapsible !== false;
    };
    /** Définit si l'élément spécifié est selectionable.
     * @param item Elément à analyser.
     * @return True si l'élément est selectionable.
     */
    /**
     * Définit si l'élément spécifié est selectionable.
     * @protected
     * @param {?} item Elément à analyser.
     * @return {?} True si l'élément est selectionable.
     */
    ItemListBase.prototype.isSelectable = /**
     * Définit si l'élément spécifié est selectionable.
     * @protected
     * @param {?} item Elément à analyser.
     * @return {?} True si l'élément est selectionable.
     */
    function (item) {
        return item && item.selectable !== false;
    };
    /** Définit le champ à utiliser comme valeur d'affichage.
     * @param value Champ à utiliser comme valeur d'affichage.
     */
    /**
     * Définit le champ à utiliser comme valeur d'affichage.
     * @protected
     * @param {?} value Champ à utiliser comme valeur d'affichage.
     * @return {?}
     */
    ItemListBase.prototype.setTextField = /**
     * Définit le champ à utiliser comme valeur d'affichage.
     * @protected
     * @param {?} value Champ à utiliser comme valeur d'affichage.
     * @return {?}
     */
    function (value) {
        this._textField = value;
    };
    /** Retourne le champ utilisé comme valeur d'affichage.*/
    /**
     * Retourne le champ utilisé comme valeur d'affichage.
     * @protected
     * @return {?}
     */
    ItemListBase.prototype.getTextField = /**
     * Retourne le champ utilisé comme valeur d'affichage.
     * @protected
     * @return {?}
     */
    function () {
        return this._textField || ItemListService.defaultTextField;
    };
    /** Définit le champ à utiliser comme valeur de comparaison.
     * @param value Champ à utiliser comme valeur de comparaison.
     */
    /**
     * Définit le champ à utiliser comme valeur de comparaison.
     * @protected
     * @param {?} value Champ à utiliser comme valeur de comparaison.
     * @return {?}
     */
    ItemListBase.prototype.setValueField = /**
     * Définit le champ à utiliser comme valeur de comparaison.
     * @protected
     * @param {?} value Champ à utiliser comme valeur de comparaison.
     * @return {?}
     */
    function (value) {
        this._valueField = value;
        if (this._itemListService) {
            this._itemListService.valueField = value;
        }
    };
    /** Retourne le champ utilisé comme valeur de comparaison.*/
    /**
     * Retourne le champ utilisé comme valeur de comparaison.
     * @protected
     * @return {?}
     */
    ItemListBase.prototype.getValueField = /**
     * Retourne le champ utilisé comme valeur de comparaison.
     * @protected
     * @return {?}
     */
    function () {
        return this._valueField || ItemListService.defaultValueField;
    };
    /** Définit le champ à utiliser comme champ de recherche.
     * Ce champ peut indiquer, un champ contenant une valeur, un texte indexé, ou une fonction.
     * @param value Champ à utiliser comme champ de recherche.
     */
    /**
     * Définit le champ à utiliser comme champ de recherche.
     * Ce champ peut indiquer, un champ contenant une valeur, un texte indexé, ou une fonction.
     * @protected
     * @param {?} value Champ à utiliser comme champ de recherche.
     * @return {?}
     */
    ItemListBase.prototype.setSearchField = /**
     * Définit le champ à utiliser comme champ de recherche.
     * Ce champ peut indiquer, un champ contenant une valeur, un texte indexé, ou une fonction.
     * @protected
     * @param {?} value Champ à utiliser comme champ de recherche.
     * @return {?}
     */
    function (value) {
        this._searchField = value;
    };
    /** Définit la hauteur maximum avant que le composant affiche une scrollbar
     * spécifier une grande valeur pour ne jamais afficher de scrollbar
     * Spécifier 0 pour que le composant determine sa hauteur à partir du container
     */
    /**
     * Définit la hauteur maximum avant que le composant affiche une scrollbar
     * spécifier une grande valeur pour ne jamais afficher de scrollbar
     * Spécifier 0 pour que le composant determine sa hauteur à partir du container
     * @protected
     * @param {?} value
     * @return {?}
     */
    ItemListBase.prototype.setMaxHeight = /**
     * Définit la hauteur maximum avant que le composant affiche une scrollbar
     * spécifier une grande valeur pour ne jamais afficher de scrollbar
     * Spécifier 0 pour que le composant determine sa hauteur à partir du container
     * @protected
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this._maxHeight = value === 'auto' ? null : +value || null;
        this.viewPort.maxSize$.next(value);
    };
    /** Retourne la hauteur maximum avant que le composant affiche une scrollbar
     * spécifier une grande valeur pour ne jamais afficher de scrollbar
     * Spécifier 0 pour que le composant determine sa hauteur à partir du container
     */
    /**
     * Retourne la hauteur maximum avant que le composant affiche une scrollbar
     * spécifier une grande valeur pour ne jamais afficher de scrollbar
     * Spécifier 0 pour que le composant determine sa hauteur à partir du container
     * @protected
     * @return {?}
     */
    ItemListBase.prototype.getMaxHeight = /**
     * Retourne la hauteur maximum avant que le composant affiche une scrollbar
     * spécifier une grande valeur pour ne jamais afficher de scrollbar
     * Spécifier 0 pour que le composant determine sa hauteur à partir du container
     * @protected
     * @return {?}
     */
    function () {
        return this._maxHeight;
    };
    /** Internal usage. Calc the best target when an item is drag and dropped */
    /**
     * Internal usage. Calc the best target when an item is drag and dropped
     * @protected
     * @param {?} index
     * @param {?} targetIndex
     * @return {?}
     */
    ItemListBase.prototype.calcDragTargetIndex$ = /**
     * Internal usage. Calc the best target when an item is drag and dropped
     * @protected
     * @param {?} index
     * @param {?} targetIndex
     * @return {?}
     */
    function (index, targetIndex) {
        var _this = this;
        return this.ensureListCaches$().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["switchMap"])((/**
         * @return {?}
         */
        function () { return _this.getItemListService().calcDragTargetIndex$(index, targetIndex); })));
    };
    /** Internal usage */
    /**
     * Internal usage
     * @protected
     * @param {?} items
     * @param {?} item
     * @return {?}
     */
    ItemListBase.prototype.getItemTreeInfo = /**
     * Internal usage
     * @protected
     * @param {?} items
     * @param {?} item
     * @return {?}
     */
    function (items, item) {
        /** @type {?} */
        var parentIndex = items.findIndex((/**
         * @param {?} itm
         * @return {?}
         */
        function (itm) { return itm === item; }));
        if (parentIndex < 0) {
            return null;
        }
        /** @type {?} */
        var treeItem = (/** @type {?} */ (item));
        /** @type {?} */
        var parentDepth = treeItem.depth;
        /** @type {?} */
        var lastIndex = parentIndex;
        /** @type {?} */
        var children = (/** @type {?} */ ([]));
        if (parentDepth !== undefined) {
            for (var i = parentIndex + 1; i < items.length; i++) {
                /** @type {?} */
                var curItem = (/** @type {?} */ (items[i]));
                if (curItem.depth <= parentDepth) {
                    break;
                }
                children.push(curItem);
                lastIndex = i;
            }
        }
        return (/** @type {?} */ ({
            children: children,
            item: item,
            lastIndex: lastIndex,
            startIndex: parentIndex,
        }));
    };
    /** Calcule le viewport pour le conteneur spécifié. */
    /**
     * Calcule le viewport pour le conteneur spécifié.
     * @protected
     * @param {?=} query
     * @return {?}
     */
    ItemListBase.prototype.calcViewList$ = /**
     * Calcule le viewport pour le conteneur spécifié.
     * @protected
     * @param {?=} query
     * @return {?}
     */
    function (query) {
        var _this = this;
        return this.getViewList$(query).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["tap"])((/**
         * @param {?} result
         * @return {?}
         */
        function (result) {
            if (result.depthMax !== undefined) {
                _this._depthMax = result.depthMax;
            }
            _this.rowsCount = result.visibleList.length;
            _this.viewPort.items$.next(result.visibleList);
        })));
    };
    /**
     * @protected
     * @return {?}
     */
    ItemListBase.prototype.ensureListCaches$ = /**
     * @protected
     * @return {?}
     */
    function () {
        return this._itemListService.hasCache ? Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["of"])(null) : this.getViewList$();
    };
    /** Calcul la position de la scrollbar pour que l'élément spécifié soit dans la zone visible. */
    /**
     * Calcul la position de la scrollbar pour que l'élément spécifié soit dans la zone visible.
     * @protected
     * @param {?} item
     * @return {?}
     */
    ItemListBase.prototype.ensureItemVisible = /**
     * Calcul la position de la scrollbar pour que l'élément spécifié soit dans la zone visible.
     * @protected
     * @param {?} item
     * @return {?}
     */
    function (item) {
        this.viewPort.ensureItem$.next(item);
    };
    /**
     * @protected
     * @param {?} modls
     * @param {?=} selected
     * @return {?}
     */
    ItemListBase.prototype.mapToIItemBase = /**
     * @protected
     * @param {?} modls
     * @param {?=} selected
     * @return {?}
     */
    function (modls, selected) {
        var _this = this;
        /** @type {?} */
        var m = modls || [];
        return m.map((/**
         * @param {?} model
         * @return {?}
         */
        function (model) {
            /** @type {?} */
            var itemBase = {};
            itemBase.model = model;
            /** @type {?} */
            var displayField = _this.getTextField();
            /** @type {?} */
            var valueField = _this.getValueField();
            if (typeof model === 'string') {
                ((/** @type {?} */ (itemBase)))[displayField] = model;
                ((/** @type {?} */ (itemBase)))[valueField] = model;
                if (_this._searchField) {
                    ((/** @type {?} */ (itemBase)))[_this._searchField] = model;
                }
            }
            else {
                ((/** @type {?} */ (itemBase)))[displayField] = _this.getTextValue(model);
                ((/** @type {?} */ (itemBase)))[valueField] = model[valueField];
                if (_this._searchField) {
                    ((/** @type {?} */ (itemBase)))[_this._searchField] = model[_this._searchField];
                }
            }
            /** @type {?} */
            var childrenField = _this.getItemListService().childrenField;
            if (model[childrenField]) {
                ((/** @type {?} */ (itemBase)))[childrenField] = _this.mapToIItemBase(model[childrenField], selected);
            }
            else {
                itemBase.selected = selected || undefined;
            }
            return itemBase;
        }));
    };
    /**
     * @param {?} item
     * @return {?}
     */
    ItemListBase.prototype.getItemHeight = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        if (this.viewPort.mode === ViewportMode.disabled) {
            return null;
        }
        else if (this.viewPort.mode === ViewportMode.fixed) {
            return this.getViewPortRowHeight();
        }
        else if (this.viewPort.mode === ViewportMode.auto) {
            return item.size || null;
        }
        else {
            return (item.size && item.size > ViewPortService.itemDefaultSize) ? item.size : this.getViewPortRowHeight();
        }
    };
    /**
     * @protected
     * @param {?} value
     * @return {?}
     */
    ItemListBase.prototype.getVirtualSelectedEntities = /**
     * @protected
     * @param {?} value
     * @return {?}
     */
    function (value) {
        var _this = this;
        /** @type {?} */
        var dic = (/**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            if (typeof v === 'string') {
                v = v.trim();
            }
            /** @type {?} */
            var model = {};
            /** @type {?} */
            var textField = _this.getTextField();
            /** @type {?} */
            var valueField = _this.getValueField();
            ((/** @type {?} */ (model)))[textField] = v.toString();
            ((/** @type {?} */ (model)))[valueField] = v;
            return model;
        });
        if (value) {
            /** @type {?} */
            var modelType = typeof value;
            if (modelType === 'string' || modelType === 'number') {
                value = this._multiSelect ? value.split(',').map(dic) : dic(value);
            }
            else if (value instanceof Array && value.length) {
                /** @type {?} */
                var type = typeof value[0];
                if (type === 'string' || type === 'number') {
                    value = this._multiSelect ? value.map(dic) : dic(value[0]);
                }
            }
            else if (value instanceof Array && !this._multiSelect) {
                value = null;
            }
        }
        return value;
    };
    return ItemListBase;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */
var DejaItemEvent = /** @class */ (function () {
    function DejaItemEvent() {
    }
    return DejaItemEvent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */
var DejaItemsEvent = /** @class */ (function () {
    function DejaItemsEvent() {
    }
    return DejaItemsEvent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var DejaItemModule = /** @class */ (function () {
    function DejaItemModule() {
    }
    DejaItemModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_11__["NgModule"], args: [{
                    declarations: [
                        DejaItemComponent,
                    ],
                    exports: [
                        DejaItemComponent,
                    ],
                    imports: [
                        _angular_common__WEBPACK_IMPORTED_MODULE_10__["CommonModule"],
                    ],
                },] }
    ];
    return DejaItemModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var MediaService = /** @class */ (function () {
    function MediaService(zone) {
        var _this = this;
        this.zone = zone;
        this.isAlive = true;
        this.mql = (/** @type {?} */ ({}));
        this.mql.xs = window.matchMedia('(max-width: 599px)');
        this.mql.sm = window.matchMedia('(min-width: 600px) and (max-width:959px)');
        this.mql.md = window.matchMedia('(min-width: 860px) and (max-width:1279px)');
        this.mql.lg = window.matchMedia('(min-width: 1280px)');
        Object.keys(this.mql).forEach((/**
         * @param {?} alias
         * @return {?}
         */
        function (alias) {
            _this.mql[alias].addListener(_this.onMQLEvent.bind(_this, alias));
            if (_this.mql[alias].matches) {
                _this.mediaChanged$ = new rxjs__WEBPACK_IMPORTED_MODULE_8__["BehaviorSubject"](alias);
            }
        }));
        this.isMobile$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["from"])(this.mediaChanged$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["takeWhile"])((/**
         * @return {?}
         */
        function () { return _this.isAlive; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["map"])((/**
         * @return {?}
         */
        function () { return _this.mql.xs.matches || _this.mql.sm.matches; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["distinctUntilChanged"])());
    }
    /**
     * @return {?}
     */
    MediaService.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        var _this = this;
        Object.keys(this.mql).forEach((/**
         * @param {?} alias
         * @return {?}
         */
        function (alias) {
            _this.mql[alias].removeListener((/** @type {?} */ (_this.onMQLEvent)));
            delete _this.mql[alias];
        }));
        this.isAlive = false;
    };
    /**
     * @private
     * @param {?} alias
     * @return {?}
     */
    MediaService.prototype.onMQLEvent = /**
     * @private
     * @param {?} alias
     * @return {?}
     */
    function (alias) {
        var _this = this;
        this.zone.run((/**
         * @return {?}
         */
        function () {
            _this.mediaChanged$.next(alias);
        }));
    };
    MediaService.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_11__["Injectable"] }
    ];
    /** @nocollapse */
    MediaService.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_11__["NgZone"] }
    ]; };
    return MediaService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var MediaModule = /** @class */ (function () {
    function MediaModule() {
    }
    MediaModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_11__["NgModule"], args: [{
                    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_10__["CommonModule"]],
                    providers: [MediaService],
                },] }
    ];
    return MediaModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var DejaConnectionPositionPair = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_6__["__extends"])(DejaConnectionPositionPair, _super);
    function DejaConnectionPositionPair() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    DejaConnectionPositionPair.parse = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        /** @type {?} */
        var values = value.trim().split(',');
        /** @type {?} */
        var positions = (/** @type {?} */ ([]));
        values.forEach((/**
         * @param {?} pos
         * @return {?}
         */
        function (pos) {
            /** @type {?} */
            var poss = pos.trim().split(' ');
            if (poss.length !== 4) {
                throw new Error("Invalid positions property for DejaMenuComponent. String entry must be of type 'positions=\"start top end bottom\"'");
            }
            /** @type {?} */
            var originPosition = (/** @type {?} */ ({
                originX: poss[0],
                originY: poss[1],
            }));
            /** @type {?} */
            var overlayPosition = (/** @type {?} */ ({
                overlayX: poss[2],
                overlayY: poss[3],
            }));
            positions.push(new DejaConnectionPositionPair(originPosition, overlayPosition));
        }));
        return positions;
    };
    DejaConnectionPositionPair.default = DejaConnectionPositionPair.parse('start bottom start top,start top start bottom,end bottom end top,end top end bottom');
    return DejaConnectionPositionPair;
}(_angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_5__["ConnectionPositionPair"]));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var DejaResizeListenerDirective = /** @class */ (function () {
    function DejaResizeListenerDirective(elementRef) {
        var _this = this;
        this.elementRef = elementRef;
        this.sizeChanged = new _angular_core__WEBPACK_IMPORTED_MODULE_11__["EventEmitter"]();
        this.element = (/** @type {?} */ (elementRef.nativeElement));
        this.resizeSensor = document.createElement('div');
        this.resizeSensor.dir = 'ltr';
        this.resizeSensor.className = 'resize-sensor';
        /** @type {?} */
        var style = 'position: absolute; left: -10px; top: -10px; right: 0; bottom: 0; overflow: hidden; z-index: -1; visibility: hidden;';
        /** @type {?} */
        var styleChild = 'position: absolute; left: 0; top: 0; transition: 0s;';
        this.resizeSensor.style.cssText = style;
        this.resizeSensor.innerHTML =
            "<div class=\"resize-sensor-expand\" style=\"" + style + "\">\n                <div style=\"" + styleChild + "\"></div>\n            </div>\n            <div class=\"resize-sensor-shrink\" style=\"" + style + "\">\n                <div style=\"" + styleChild + "width: 200%; height: 200%\"></div>\n            </div>";
        this.element.appendChild(this.resizeSensor);
        /** @type {?} */
        var expand = (/** @type {?} */ (this.resizeSensor.children[0]));
        /** @type {?} */
        var expandChild = (/** @type {?} */ (expand.children[0]));
        /** @type {?} */
        var shrink = (/** @type {?} */ (this.resizeSensor.children[1]));
        /** @type {?} */
        var position = window.getComputedStyle(this.element).getPropertyPriority('position');
        if ('absolute' !== position && 'relative' !== position && 'fixed' !== position) {
            this.element.style.position = 'relative';
        }
        /** @type {?} */
        var getElementSize = (/**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            if (!e.getBoundingClientRect) {
                return {
                    width: e.offsetWidth,
                    height: e.offsetHeight
                };
            }
            /** @type {?} */
            var rect = e.getBoundingClientRect();
            return {
                width: Math.round(rect.width),
                height: Math.round(rect.height)
            };
        });
        /** @type {?} */
        var rafId;
        /** @type {?} */
        var size = getElementSize(this.element);
        /** @type {?} */
        var lastWidth = size.width;
        /** @type {?} */
        var lastHeight = size.height;
        /** @type {?} */
        var reset = (/**
         * @return {?}
         */
        function () {
            // set display to block, necessary otherwise hidden elements won't ever work
            /** @type {?} */
            var invisible = _this.element.offsetWidth === 0 && _this.element.offsetHeight === 0;
            /** @type {?} */
            var saveDisplay = invisible && _this.element.style.display;
            if (invisible) {
                _this.element.style.display = 'block';
            }
            expandChild.style.width = expandChild.style.height = '100000px';
            expand.scrollLeft = expand.scrollTop = shrink.scrollLeft = shrink.scrollTop = 100000;
            if (invisible) {
                _this.element.style.display = saveDisplay;
            }
        });
        /** @type {?} */
        var onScroll = (/**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var s = getElementSize(_this.element);
            /** @type {?} */
            var newWidth = s.width;
            /** @type {?} */
            var newHeight = s.height;
            /** @type {?} */
            var onResized = (/**
             * @return {?}
             */
            function () {
                rafId = 0;
                if (newWidth === lastWidth && newHeight === lastHeight) {
                    return;
                }
                lastWidth = newWidth;
                lastHeight = newHeight;
                _this.sizeChanged.emit();
            });
            if ((newWidth !== lastWidth || newHeight !== lastHeight) && !rafId) {
                rafId = requestAnimationFrame(onResized);
            }
            reset();
        });
        expand.addEventListener('scroll', onScroll);
        shrink.addEventListener('scroll', onScroll);
        // Fix for custom Elements
        requestAnimationFrame(reset);
    }
    /**
     * @return {?}
     */
    DejaResizeListenerDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this.resizeSensor) {
            if (this.element.contains(this.resizeSensor)) {
                this.element.removeChild(this.resizeSensor);
            }
            delete this.resizeSensor;
        }
    };
    DejaResizeListenerDirective.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_11__["Directive"], args: [{
                    selector: '[resize-listener]',
                },] }
    ];
    /** @nocollapse */
    DejaResizeListenerDirective.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_11__["ElementRef"] }
    ]; };
    DejaResizeListenerDirective.propDecorators = {
        sizeChanged: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_11__["Output"] }]
    };
    return DejaResizeListenerDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ResizeListenerModule = /** @class */ (function () {
    function ResizeListenerModule() {
    }
    ResizeListenerModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_11__["NgModule"], args: [{
                    declarations: [
                        DejaResizeListenerDirective,
                    ],
                    exports: [
                        DejaResizeListenerDirective,
                    ],
                },] }
    ];
    return ResizeListenerModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var defaults = {
    width: 'auto',
    height: '100%',
    size: '7px',
    color: '#000',
    position: 'right',
    distance: '1px',
    start: 'top',
    opacity: 0.4,
    transition: 0.3,
    alwaysVisible: false,
    disableFadeOut: false,
    railVisible: false,
    railColor: '#333',
    railOpacity: 0.2,
    railClass: 'slimScrollRail',
    barClass: 'slimScrollBar',
    wrapperClass: 'slimScrollDiv',
    allowPageScroll: false,
    wheelStep: 20,
    touchScrollStep: 200,
    borderRadius: '7px',
    railBorderRadius: '7px',
    scrollTo: 0,
    autoScrollToBottom: false,
    maxHeightBeforeEnable: undefined,
};
var DejaSlimScrollDirective = /** @class */ (function () {
    function DejaSlimScrollDirective(rendererFactory, elementRef) {
        var _this = this;
        this._minBarHeight = 30;
        this._releaseScroll = false;
        this.trackPanelHeightChanged = (/**
         * @return {?}
         */
        function () {
            _this._previousHeight = _this._me.scrollHeight;
            _this._changesTracker = window.setInterval((/**
             * @return {?}
             */
            function () {
                if (_this._previousHeight !== _this._me.scrollHeight) {
                    _this._previousHeight = _this._me.scrollHeight;
                    _this.init();
                    if (_this._options.autoScrollToBottom) {
                        _this._renderer.setStyle(_this._bar, 'top', _this._me.offsetHeight - _this._bar.offsetHeight + "px");
                        _this.scrollContent(0, true);
                    }
                }
            }), 1000);
        });
        this._renderer = rendererFactory.createRenderer(null, null);
        this._me = elementRef.nativeElement;
        this._options = Object(tslib__WEBPACK_IMPORTED_MODULE_6__["__assign"])({}, defaults);
        this.showBar = this.showBar.bind(this);
        this.hideBar = this.hideBar.bind(this);
        this.onWheel = this.onWheel.bind(this);
        this.barMouseMove = this.barMouseMove.bind(this);
        this.barMouseUp = this.barMouseUp.bind(this);
        this.barMouseDown = this.barMouseDown.bind(this);
        this.railMouseDown = this.railMouseDown.bind(this);
    }
    /**
     * @return {?}
     */
    DejaSlimScrollDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.init();
    };
    /**
     * @return {?}
     */
    DejaSlimScrollDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this._changesTracker) {
            clearInterval(this._changesTracker);
        }
        if (window.removeEventListener) {
            window.removeEventListener('DOMMouseScroll', this.onWheel);
            window.removeEventListener('mousewheel', this.onWheel);
        }
        else {
            document.removeEventListener('mousewheel', this.onWheel);
        }
        document.removeEventListener('mousemove', this.barMouseMove, false);
        document.removeEventListener('mouseup', this.barMouseUp, false);
    };
    /**
     * @return {?}
     */
    DejaSlimScrollDirective.prototype.onResize = /**
     * @return {?}
     */
    function () {
        this.init();
    };
    Object.defineProperty(DejaSlimScrollDirective.prototype, "width", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._options.width = value || defaults.width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaSlimScrollDirective.prototype, "height", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._options.height = value || defaults.height;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaSlimScrollDirective.prototype, "size", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._options.size = value || defaults.size;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaSlimScrollDirective.prototype, "color", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._options.color = value || defaults.color;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaSlimScrollDirective.prototype, "position", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._options.position = value || defaults.position;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaSlimScrollDirective.prototype, "distance", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._options.distance = value || defaults.distance;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaSlimScrollDirective.prototype, "start", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._options.start = value || defaults.start;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaSlimScrollDirective.prototype, "opacity", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._options.opacity = value || defaults.opacity;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaSlimScrollDirective.prototype, "transition", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._options.transition = value || defaults.transition;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaSlimScrollDirective.prototype, "alwaysVisible", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._options.alwaysVisible = value || defaults.alwaysVisible;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaSlimScrollDirective.prototype, "disableFadeOut", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._options.disableFadeOut = value || defaults.disableFadeOut;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaSlimScrollDirective.prototype, "railVisible", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._options.railVisible = value || defaults.railVisible;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaSlimScrollDirective.prototype, "railColor", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._options.railColor = value || defaults.railColor;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaSlimScrollDirective.prototype, "railOpacity", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._options.railOpacity = value || defaults.railOpacity;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaSlimScrollDirective.prototype, "railClass", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._options.railClass = value || defaults.railClass;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaSlimScrollDirective.prototype, "barClass", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._options.barClass = value || defaults.barClass;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaSlimScrollDirective.prototype, "wrapperClass", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._options.wrapperClass = value || defaults.wrapperClass;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaSlimScrollDirective.prototype, "allowPageScroll", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._options.allowPageScroll = value || defaults.allowPageScroll;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaSlimScrollDirective.prototype, "wheelStep", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._options.wheelStep = value || defaults.wheelStep;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaSlimScrollDirective.prototype, "touchScrollStep", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._options.touchScrollStep = value || defaults.touchScrollStep;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaSlimScrollDirective.prototype, "borderRadius", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._options.borderRadius = value || defaults.borderRadius;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaSlimScrollDirective.prototype, "railBorderRadius", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._options.railBorderRadius = value || defaults.railBorderRadius;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaSlimScrollDirective.prototype, "scrollTo", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._options.scrollTo = value || defaults.scrollTo;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaSlimScrollDirective.prototype, "autoScrollToBottom", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._options.autoScrollToBottom = value || defaults.autoScrollToBottom;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaSlimScrollDirective.prototype, "maxHeightBeforeEnable", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._options.maxHeightBeforeEnable = value || defaults.maxHeightBeforeEnable;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     * @return {?}
     */
    DejaSlimScrollDirective.prototype.init = /**
     * @private
     * @return {?}
     */
    function () {
        // ensure we are not binding it again
        if (this._bar && this._rail) {
            this.refresh();
        }
        else {
            this.setup();
        }
    };
    /**
     * @private
     * @param {?} e
     * @param {?} className
     * @return {?}
     */
    DejaSlimScrollDirective.prototype.hasParentClass = /**
     * @private
     * @param {?} e
     * @param {?} className
     * @return {?}
     */
    function (e, className) {
        if (!e) {
            return false;
        }
        if (e.classList.contains(this._options.wrapperClass)) {
            return true;
        }
        return this.hasParentClass(e.parentElement, className);
    };
    /**
     * @private
     * @param {?} e
     * @return {?}
     */
    DejaSlimScrollDirective.prototype.onWheel = /**
     * @private
     * @param {?} e
     * @return {?}
     */
    function (e) {
        // use mouse wheel only when mouse is over
        if (!this._isOverPanel) {
            return;
        }
        /** @type {?} */
        var delta = 0;
        if (e.wheelDelta) {
            delta = -e.wheelDelta / 120;
        }
        if (e.detail) {
            delta = e.detail / 3;
        }
        /** @type {?} */
        var target = (/** @type {?} */ ((e.target || e.currentTarget || e.relatedTarget)));
        if (this.hasParentClass(target, this._options.wrapperClass)) {
            // scroll content
            this.scrollContent(delta, true);
        }
        // stop window scroll
        if (e.preventDefault && !this._releaseScroll) {
            e.preventDefault();
        }
        if (!this._releaseScroll) {
            e.returnValue = false;
        }
    };
    /**
     * @private
     * @param {?} target
     * @return {?}
     */
    DejaSlimScrollDirective.prototype.attachWheel = /**
     * @private
     * @param {?} target
     * @return {?}
     */
    function (target) {
        if (window.addEventListener) {
            target.addEventListener('DOMMouseScroll', this.onWheel, false);
            target.addEventListener('mousewheel', this.onWheel, false);
        }
        else {
            document.addEventListener('mousewheel', this.onWheel, false);
        }
    };
    /**
     * @private
     * @return {?}
     */
    DejaSlimScrollDirective.prototype.showBar = /**
     * @private
     * @return {?}
     */
    function () {
        // recalculate bar height
        this.getBarHeight();
        if (this._queueHide) {
            this._queueHide.unsubscribe();
            this._queueHide = null;
        }
        // when bar reached top or bottom
        // tslint:disable-next-line:no-bitwise
        if (this._percentScroll === ~~this._percentScroll) {
            // release wheel
            this._releaseScroll = this._options.allowPageScroll;
        }
        else {
            this._releaseScroll = false;
        }
        // show only when required
        if (this._barHeight >= this._me.offsetHeight) {
            // allow window scroll
            this._releaseScroll = true;
            return;
        }
        this._renderer.setStyle(this._bar, 'opacity', this._options.opacity.toString());
        this._renderer.setStyle(this._rail, 'opacity', this._options.railOpacity.toString());
    };
    /**
     * @private
     * @return {?}
     */
    DejaSlimScrollDirective.prototype.hideBar = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        // only hide when options allow it
        if (!this._options.alwaysVisible
            && !(this._options.disableFadeOut && this._isOverPanel)
            && !this._isOverBar
            && !this._isDragg) {
            this._queueHide = Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["timer"])(1000).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["first"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["filter"])((/**
             * @return {?}
             */
            function () { return !_this._queueHide; })))
                .subscribe((/**
             * @return {?}
             */
            function () {
                _this._renderer.setStyle(_this._bar, 'opacity', '0');
                _this._renderer.setStyle(_this._rail, 'opacity', '0');
            }));
        }
    };
    /**
     * @param {?} y
     * @param {?} isWheel
     * @param {?=} isJump
     * @return {?}
     */
    DejaSlimScrollDirective.prototype.scrollContent = /**
     * @param {?} y
     * @param {?} isWheel
     * @param {?=} isJump
     * @return {?}
     */
    function (y, isWheel, isJump) {
        if (isJump === void 0) { isJump = false; }
        this._releaseScroll = false;
        /** @type {?} */
        var delta = y;
        /** @type {?} */
        var maxTop = this._me.offsetHeight - this._bar.offsetHeight;
        if (isWheel) {
            // move bar with mouse wheel
            delta = parseInt(this._bar.style.top, 10) + y * this._options.wheelStep / 100 * this._bar.offsetHeight;
            // move bar, make sure it doesn't go out
            delta = Math.min(Math.max(delta, 0), maxTop);
            // if scrolling down, make sure a fractional change to the
            // scroll position isn't rounded away when the scrollbar's CSS is set
            // this flooring of delta would happened automatically when
            // bar.css is set below, but we floor here for clarity
            delta = (y > 0) ? Math.ceil(delta) : Math.floor(delta);
            // scroll the scrollbar
            this._renderer.setStyle(this._bar, 'top', delta + "px");
        }
        // calculate actual scroll amount
        this._percentScroll = parseInt(this._bar.style.top, 10) / (this._me.offsetHeight - this._bar.offsetHeight);
        delta = this._percentScroll * (this._me.scrollHeight - this._me.offsetHeight);
        if (isJump) {
            delta = y;
            /** @type {?} */
            var offsetTop = delta / this._me.scrollHeight * this._me.offsetHeight;
            offsetTop = Math.min(Math.max(offsetTop, 0), maxTop);
            this._renderer.setStyle(this._bar, 'top', offsetTop + "px");
        }
        // scroll content
        this._me.scrollTop = delta;
        // ensure bar is visible
        this.showBar();
        // trigger hide when scroll is stopped
        this.hideBar();
    };
    /**
     * @private
     * @return {?}
     */
    DejaSlimScrollDirective.prototype.getBarHeight = /**
     * @private
     * @return {?}
     */
    function () {
        // calculate scrollbar height and make sure it is not too small
        this._barHeight = Math.max(this._me.offsetHeight / (this._me.scrollHeight === 0 ? 1 : this._me.scrollHeight) * this._me.offsetHeight, this._minBarHeight);
        this._renderer.setStyle(this._bar, 'height', this._barHeight + "px");
        // hide scrollbar if content is not long enough
        /** @type {?} */
        var display = this._barHeight === this._me.offsetHeight ? 'none' : 'block';
        this._renderer.setStyle(this._bar, 'display', display);
    };
    /**
     * @private
     * @return {?}
     */
    DejaSlimScrollDirective.prototype.refresh = /**
     * @private
     * @return {?}
     */
    function () {
        this.getBarHeight();
        // Pass height: auto to an existing slimscroll object to force a resize after contents have changed
        if ('height' in this._options && this._options.height === 'auto') {
            this._renderer.setStyle(this._me.parentElement, 'height', 'auto');
            this._renderer.setStyle(this._me, 'height', 'auto');
            /** @type {?} */
            var height = this._me.parentElement.clientHeight;
            this._renderer.setStyle(this._me.parentElement, 'height', height + "px");
            this._renderer.setStyle(this._me, 'height', height + "px");
        }
        else if ('height' in this._options) {
            /** @type {?} */
            var h = this._options.height;
            this._renderer.setStyle(this._me.parentElement, 'height', h);
            this._renderer.setStyle(this._me, 'height', h);
        }
    };
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    DejaSlimScrollDirective.prototype.railMouseDown = /**
     * @private
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var clientRects = this._rail.getBoundingClientRect();
        /** @type {?} */
        var elementOffsetTop = clientRects.top + window.scrollY;
        /** @type {?} */
        var moveTo = event.pageY - elementOffsetTop - (this._barHeight / 2);
        /** @type {?} */
        var scrollTo = this._me.scrollHeight * (moveTo / clientRects.height);
        this._renderer.setStyle(this._bar, 'top', (moveTo >= 0 ? moveTo : 0) + "px");
        this.scrollContent(scrollTo, false, true);
    };
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    DejaSlimScrollDirective.prototype.barMouseMove = /**
     * @private
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var currTop = this._startBarTop + event.pageY - this._barMouseDownPageY;
        this._renderer.setStyle(this._bar, 'top', (currTop >= 0 ? currTop : 0) + "px");
        /** @type {?} */
        var position = this._bar.getClientRects()[0];
        if (position) {
            this.scrollContent(0, position.top > 0);
        }
    };
    /**
     * @private
     * @return {?}
     */
    DejaSlimScrollDirective.prototype.barMouseUp = /**
     * @private
     * @return {?}
     */
    function () {
        this._isDragg = false;
        // return normal text selection
        /** @type {?} */
        var body = document.body;
        this._renderer.setStyle(body, '-webkit-user-select', 'initial');
        this._renderer.setStyle(body, '-moz-user-select', 'initial');
        this._renderer.setStyle(body, '-ms-user-select', 'initial');
        this._renderer.setStyle(body, 'user-select', 'initial');
        this.hideBar();
        document.removeEventListener('mousemove', this.barMouseMove, false);
        document.removeEventListener('mouseup', this.barMouseUp, false);
    };
    /**
     * @private
     * @param {?} e
     * @return {?}
     */
    DejaSlimScrollDirective.prototype.barMouseDown = /**
     * @private
     * @param {?} e
     * @return {?}
     */
    function (e) {
        this._isDragg = true;
        // disable text selection
        /** @type {?} */
        var body = document.body;
        this._renderer.setStyle(body, '-webkit-user-select', 'none');
        this._renderer.setStyle(body, '-moz-user-select', 'none');
        this._renderer.setStyle(body, '-ms-user-select', 'none');
        this._renderer.setStyle(body, 'user-select', 'none');
        this._barMouseDownPageY = e.pageY;
        this._startBarTop = parseFloat(this._bar.style.top);
        document.addEventListener('mousemove', this.barMouseMove, false);
        document.addEventListener('mouseup', this.barMouseUp, false);
        return false;
    };
    /**
     * @private
     * @return {?}
     */
    DejaSlimScrollDirective.prototype.setup = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        // check whether it changes in content
        this.trackPanelHeightChanged();
        if (this._options.maxHeightBeforeEnable && this._me.scrollHeight <= this._options.maxHeightBeforeEnable) {
            return;
        }
        // wrap content
        /** @type {?} */
        var wrapper = document.createElement('div');
        this._renderer.addClass(wrapper, this._options.wrapperClass);
        this._renderer.setStyle(wrapper, 'position', 'relative');
        this._renderer.setStyle(wrapper, 'overflow', 'hidden');
        this._renderer.setStyle(wrapper, 'width', this._options.width);
        this._renderer.setStyle(wrapper, 'height', this._options.height);
        // update style for the div
        this._renderer.setStyle(this._me, 'overflow', 'hidden');
        this._renderer.setStyle(this._me, 'width', this._options.width);
        this._renderer.setStyle(this._me, 'height', this._options.height);
        // create scrollbar rail
        this._rail = document.createElement('div');
        this._renderer.addClass(this._rail, this._options.railClass);
        this._renderer.setStyle(this._rail, 'width', this._options.size);
        this._renderer.setStyle(this._rail, 'height', '100%');
        this._renderer.setStyle(this._rail, 'position', 'absolute');
        this._renderer.setStyle(this._rail, 'top', '0');
        this._renderer.setStyle(this._rail, 'display', this._options.railVisible ? 'block' : 'none');
        this._renderer.setStyle(this._rail, 'border-radius', this._options.railBorderRadius);
        this._renderer.setStyle(this._rail, 'background', this._options.railColor);
        this._renderer.setStyle(this._rail, 'opacity', this._options.railOpacity.toString());
        this._renderer.setStyle(this._rail, 'transition', "opacity " + this._options.transition + "s");
        this._renderer.setStyle(this._rail, 'z-index', '90');
        // create scrollbar
        this._bar = document.createElement('div');
        this._renderer.addClass(this._bar, this._options.barClass);
        this._renderer.setStyle(this._bar, 'background', this._options.color);
        this._renderer.setStyle(this._bar, 'width', this._options.size);
        this._renderer.setStyle(this._bar, 'position', 'absolute');
        this._renderer.setStyle(this._bar, 'top', '0');
        this._renderer.setStyle(this._bar, 'opacity', this._options.opacity.toString());
        this._renderer.setStyle(this._bar, 'transition', "opacity " + this._options.transition + "s");
        this._renderer.setStyle(this._bar, 'display', this._options.alwaysVisible ? 'block' : 'none');
        this._renderer.setStyle(this._bar, 'border-radius', this._options.borderRadius);
        this._renderer.setStyle(this._bar, 'webkit-border-radius', this._options.borderRadius);
        this._renderer.setStyle(this._bar, 'moz-border-radius', this._options.borderRadius);
        this._renderer.setStyle(this._bar, 'z-index', '99');
        // set position
        if (this._options.position === 'right') {
            this._renderer.setStyle(this._rail, 'right', this._options.distance);
            this._renderer.setStyle(this._bar, 'right', this._options.distance);
        }
        else {
            this._renderer.setStyle(this._rail, 'left', this._options.distance);
            this._renderer.setStyle(this._bar, 'left', this._options.distance);
        }
        // wrap it
        this._me.parentElement.insertBefore(wrapper, this._me);
        wrapper.appendChild(this._me);
        if (this._options.scrollTo > 0) {
            // jump to a static point
            this.scrollContent(this._options.scrollTo, false, true);
        }
        // append to parent div
        this._me.parentElement.appendChild(this._bar);
        this._me.parentElement.appendChild(this._rail);
        this._bar.addEventListener('mousedown', this.barMouseDown, false);
        // on rail over
        this._rail.addEventListener('mouseenter', this.showBar, false);
        this._rail.addEventListener('mouseleave', this.hideBar, false);
        this._rail.addEventListener('mousedown', this.railMouseDown, false);
        // on bar over
        this._bar.addEventListener('mouseenter', (/**
         * @return {?}
         */
        function () { return _this._isOverBar = true; }), false);
        this._bar.addEventListener('mouseleave', (/**
         * @return {?}
         */
        function () { return _this._isOverBar = false; }), false);
        // show on parent mouseover
        this._me.addEventListener('mouseenter', (/**
         * @return {?}
         */
        function () {
            _this._isOverPanel = true;
            _this.showBar();
            _this.hideBar();
        }), false);
        this._me.addEventListener('mouseleave', (/**
         * @return {?}
         */
        function () {
            _this._isOverPanel = false;
            _this.hideBar();
        }), false);
        // support for mobile
        this._me.addEventListener('touchstart', (/**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            if (e.touches.length) {
                // record where touch started
                _this._touchDif = e.touches[0].pageY;
            }
        }), false);
        this._me.addEventListener('touchmove', (/**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            // prevent scrolling the page if necessary
            if (!_this._releaseScroll) {
                e.preventDefault();
            }
            if (e.touches.length) {
                // see how far user swiped
                /** @type {?} */
                var diff = (_this._touchDif - e.touches[0].pageY) / _this._options.touchScrollStep;
                // scroll content
                _this.scrollContent(diff, true);
                _this._touchDif = e.touches[0].pageY;
            }
        }), false);
        // set up initial height
        this.getBarHeight();
        // hide bar on init if alwaysVisible equal false
        this.hideBar();
        // check start position
        if (this._options.start === 'bottom') {
            // scroll content to bottom
            this._renderer.setStyle(this._bar, 'top', this._me.offsetHeight - this._bar.offsetHeight + "px");
            this.scrollContent(0, true);
        }
        // attach scroll events
        this.attachWheel(window);
    };
    DejaSlimScrollDirective.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_11__["Directive"], args: [{
                    selector: '[slimScroll]'
                },] }
    ];
    /** @nocollapse */
    DejaSlimScrollDirective.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_11__["RendererFactory2"] },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_11__["ElementRef"] }
    ]; };
    DejaSlimScrollDirective.propDecorators = {
        onResize: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_11__["HostListener"], args: ['window:resize', ['$event'],] }],
        width: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_11__["Input"] }],
        height: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_11__["Input"] }],
        size: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_11__["Input"] }],
        color: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_11__["Input"] }],
        position: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_11__["Input"] }],
        distance: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_11__["Input"] }],
        start: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_11__["Input"] }],
        opacity: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_11__["Input"] }],
        transition: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_11__["Input"] }],
        alwaysVisible: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_11__["Input"] }],
        disableFadeOut: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_11__["Input"] }],
        railVisible: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_11__["Input"] }],
        railColor: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_11__["Input"] }],
        railOpacity: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_11__["Input"] }],
        railClass: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_11__["Input"] }],
        barClass: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_11__["Input"] }],
        wrapperClass: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_11__["Input"] }],
        allowPageScroll: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_11__["Input"] }],
        wheelStep: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_11__["Input"] }],
        touchScrollStep: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_11__["Input"] }],
        borderRadius: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_11__["Input"] }],
        railBorderRadius: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_11__["Input"] }],
        scrollTo: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_11__["Input"] }],
        autoScrollToBottom: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_11__["Input"] }],
        maxHeightBeforeEnable: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_11__["Input"] }]
    };
    return DejaSlimScrollDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var DejaSlimScrollModule = /** @class */ (function () {
    function DejaSlimScrollModule() {
    }
    DejaSlimScrollModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_11__["NgModule"], args: [{
                    declarations: [
                        DejaSlimScrollDirective,
                    ],
                    exports: [
                        DejaSlimScrollDirective,
                    ],
                },] }
    ];
    return DejaSlimScrollModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var DejaSortIndicatorComponent = /** @class */ (function () {
    function DejaSortIndicatorComponent() {
    }
    DejaSortIndicatorComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_11__["Component"], args: [{
                    selector: 'deja-sort-indicator',
                    template: "<span [attr.sortorder]=\"sortInfos ? sortInfos.order : null\"><mat-icon>arrow_upward</mat-icon></span>",
                    styles: [":host{display:block;position:relative;width:1rem}:host [sortorder] .mat-icon{position:absolute;right:0;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);transition:.5s linear;padding:.3rem;zoom:72%}:host [sortorder=\"1\"] .mat-icon{-webkit-transform:translateY(-50%) rotate(180deg);transform:translateY(-50%) rotate(180deg)}"]
                }] }
    ];
    DejaSortIndicatorComponent.propDecorators = {
        sortInfos: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_11__["Input"], args: ['sort-infos',] }]
    };
    return DejaSortIndicatorComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var DejaSortingModule = /** @class */ (function () {
    function DejaSortingModule() {
    }
    DejaSortingModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_11__["NgModule"], args: [{
                    declarations: [
                        DejaSortIndicatorComponent
                    ],
                    imports: [
                        _angular_material_icon__WEBPACK_IMPORTED_MODULE_7__["MatIconModule"]
                    ],
                    exports: [
                        DejaSortIndicatorComponent
                    ],
                    providers: [
                        SortingService
                    ],
                },] }
    ];
    return DejaSortingModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Service to measure the theorical size of a text inside a container
 */
var DejaTextMetricsService = /** @class */ (function () {
    /**
     * Constructor
     * Add observable to wait for element to be set. And then take its properties to measure all ASCII char size.
     */
    function DejaTextMetricsService() {
        var _this = this;
        this.element$ = new rxjs__WEBPACK_IMPORTED_MODULE_8__["Subject"]();
        this.charSize$ = new rxjs__WEBPACK_IMPORTED_MODULE_8__["BehaviorSubject"](null);
        Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["from"])(this.element$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["delay"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["first"])())
            .subscribe((/**
         * @param {?} element
         * @return {?}
         */
        function (element) {
            /** @type {?} */
            var charSize = [];
            for (var i = 0; i < 255; i++) {
                /** @type {?} */
                var c = String.fromCharCode(i);
                charSize[i] = _this.getTextWidth(c, element);
            }
            _this.charSize$.next(charSize);
        }));
    }
    Object.defineProperty(DejaTextMetricsService.prototype, "metricsElem", {
        /** Setter for base element */
        set: /**
         * Setter for base element
         * @param {?} elem
         * @return {?}
         */
        function (elem) {
            this.element$.next(elem);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Calcule la longeur (en pixels) d'une chaine de caractères
     *
     * @param text Le texte à mesurer
     * @param elem Le conteneur du texte
     *
     * @return la largeur du texte donné
     */
    /**
     * Calcule la longeur (en pixels) d'une chaine de caractères
     *
     * @param {?} text Le texte à mesurer
     * @param {?} elem Le conteneur du texte
     *
     * @return {?} la largeur du texte donné
     */
    DejaTextMetricsService.prototype.getTextWidth = /**
     * Calcule la longeur (en pixels) d'une chaine de caractères
     *
     * @param {?} text Le texte à mesurer
     * @param {?} elem Le conteneur du texte
     *
     * @return {?} la largeur du texte donné
     */
    function (text, elem) {
        this.computedStyles = window.getComputedStyle(elem);
        /** @type {?} */
        var font = this.computedStyles.fontSize + " " + this.computedStyles.fontFamily;
        /** @type {?} */
        var canvas = this.canvas || (this.canvas = document.createElement('canvas'));
        /** @type {?} */
        var context = canvas.getContext('2d');
        context.font = font;
        /** @type {?} */
        var metrics = context.measureText(text);
        return metrics.width * 1.1; // Correction for letter-spacing
    };
    /**
     * Retourne la largeur maximum d'un tableau de strings.
     *
     * @param texts les textes à comparer.
     * @param elem Le conteneur du texte
     *
     * @return la width du texte le plus long dans le tableau donné en param.
     */
    /**
     * Retourne la largeur maximum d'un tableau de strings.
     *
     * @param {?} texts les textes à comparer.
     * @param {?} elem Le conteneur du texte
     *
     * @return {?} la width du texte le plus long dans le tableau donné en param.
     */
    DejaTextMetricsService.prototype.getTextMaxWidth = /**
     * Retourne la largeur maximum d'un tableau de strings.
     *
     * @param {?} texts les textes à comparer.
     * @param {?} elem Le conteneur du texte
     *
     * @return {?} la width du texte le plus long dans le tableau donné en param.
     */
    function (texts, elem) {
        var _this = this;
        /** @type {?} */
        var maxWidth = 0;
        texts.forEach((/**
         * @param {?} text
         * @return {?}
         */
        function (text) {
            /** @type {?} */
            var width = _this.getTextWidth(text, elem);
            if (width > maxWidth) {
                maxWidth = width;
            }
        }));
        return maxWidth;
    };
    /**
     * Mesure la heuteur théorique d'un texte contenu dans un conteneur d'une taille donnée.
     *
     * @param maxWidth taille du conteneur
     * @param text texte à mesurer
     *
     * @return Hauteur théorique du conteneur.
     */
    /**
     * Mesure la heuteur théorique d'un texte contenu dans un conteneur d'une taille donnée.
     *
     * @param {?} maxWidth taille du conteneur
     * @param {?} text texte à mesurer
     *
     * @return {?} Hauteur théorique du conteneur.
     */
    DejaTextMetricsService.prototype.getTextHeight = /**
     * Mesure la heuteur théorique d'un texte contenu dans un conteneur d'une taille donnée.
     *
     * @param {?} maxWidth taille du conteneur
     * @param {?} text texte à mesurer
     *
     * @return {?} Hauteur théorique du conteneur.
     */
    function (maxWidth, text) {
        var _this = this;
        return this.getNumberOfLines(maxWidth, text).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["map"])((/**
         * @param {?} numberOfLines
         * @return {?}
         */
        function (numberOfLines) {
            /** @type {?} */
            var computedLineHeight = parseInt(_this.computedStyles.lineHeight.replace('px', ''), 10);
            /** @type {?} */
            var lineHeight = (!isNaN(computedLineHeight)) ?
                computedLineHeight :
                Math.floor(parseInt(_this.computedStyles.fontSize.replace('px', ''), 10) * 1.5);
            return lineHeight * +numberOfLines;
        })));
    };
    /**
     * Calcule le nombre de lignes qu'un texte va prendre en fonction de la largeur de son conteneur.
     *
     * @param maxWidth taille du conteneur
     * @param text texte à mesurer
     *
     * @return Nombre de lignes théoriques du conteneur.
     */
    /**
     * Calcule le nombre de lignes qu'un texte va prendre en fonction de la largeur de son conteneur.
     *
     * @private
     * @param {?} maxWidth taille du conteneur
     * @param {?} text texte à mesurer
     *
     * @return {?} Nombre de lignes théoriques du conteneur.
     */
    DejaTextMetricsService.prototype.getNumberOfLines = /**
     * Calcule le nombre de lignes qu'un texte va prendre en fonction de la largeur de son conteneur.
     *
     * @private
     * @param {?} maxWidth taille du conteneur
     * @param {?} text texte à mesurer
     *
     * @return {?} Nombre de lignes théoriques du conteneur.
     */
    function (maxWidth, text) {
        return this.charSize$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["filter"])((/**
         * @param {?} charSize
         * @return {?}
         */
        function (charSize) { return charSize !== null; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["map"])((/**
         * @param {?} charSize
         * @return {?}
         */
        function (charSize) {
            /** @type {?} */
            var tmpSize = 0;
            /** @type {?} */
            var numberOfLines = 1;
            /** @type {?} */
            var averageCharSize = 0;
            if (text.length > 0) {
                /** @type {?} */
                var arr = text.split(' ');
                /** @type {?} */
                var spaceWidth_1 = 0;
                /** @type {?} */
                var printableCharSizeArray = charSize.filter((/**
                 * @param {?} size
                 * @return {?}
                 */
                function (size) { return size > 0; }));
                averageCharSize = printableCharSizeArray.reduce((/**
                 * @param {?} a
                 * @param {?} b
                 * @return {?}
                 */
                function (a, b) { return a + b; }), 0) / printableCharSizeArray.length;
                arr.forEach((/**
                 * @param {?} txt
                 * @return {?}
                 */
                function (txt) {
                    /** @type {?} */
                    var w = 0;
                    for (var j = 0; j < txt.length; j++) {
                        /** @type {?} */
                        var charCode = txt.charCodeAt(j);
                        // Si le caractère fait partie de la table ascii qu'on a calculé dans this.getAllCharsize() on incrémente la taille du mot de sa taille.
                        // Sinon, on ajoute la moyenne des tailles calculées (qui correspond théoriquement à la taille moyenne d'un caractère)
                        w += (charSize[charCode]) ? charSize[charCode] : averageCharSize;
                    }
                    if ((tmpSize + w + spaceWidth_1) > maxWidth) {
                        tmpSize = w;
                        numberOfLines++;
                    }
                    else {
                        tmpSize += w + spaceWidth_1;
                    }
                    if (spaceWidth_1 === 0) {
                        spaceWidth_1 = charSize[32];
                    }
                }));
            }
            return numberOfLines;
        })));
    };
    DejaTextMetricsService.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_11__["Injectable"] }
    ];
    /** @nocollapse */
    DejaTextMetricsService.ctorParameters = function () { return []; };
    return DejaTextMetricsService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var DejaTextMetricsModule = /** @class */ (function () {
    function DejaTextMetricsModule() {
    }
    DejaTextMetricsModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_11__["NgModule"], args: [{
                    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_10__["CommonModule"]],
                    providers: [DejaTextMetricsService],
                },] }
    ];
    return DejaTextMetricsModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var DejaChildValidatorDirective = /** @class */ (function () {
    function DejaChildValidatorDirective() {
    }
    /**
     * @return {?}
     */
    DejaChildValidatorDirective.prototype.validate = /**
     * @return {?}
     */
    function () {
        return this.parentControl && this.parentControl.errors;
    };
    DejaChildValidatorDirective.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_11__["Directive"], args: [{
                    providers: [
                        {
                            provide: _angular_forms__WEBPACK_IMPORTED_MODULE_12__["NG_VALIDATORS"],
                            useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_11__["forwardRef"])((/**
                             * @return {?}
                             */
                            function () { return DejaChildValidatorDirective; })),
                            multi: true,
                        },
                    ],
                    selector: '[deja-child-validator]',
                },] }
    ];
    return DejaChildValidatorDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */
// Attention, spécifier ici que les messages génériques. Créez votre propre objet pour les messages spécifiques à votre page
var  
// Attention, spécifier ici que les messages génériques. Créez votre propre objet pour les messages spécifiques à votre page
ValidationMessages = /** @class */ (function () {
    function ValidationMessages() {
        this.messages = (/** @type {?} */ ({
            duplicatename: 'Ce nom existe déjà.',
            invalideDate: 'Date invalide',
            required: 'Ce champ est obligatoire.',
        }));
    }
    /**
     * @param {?} key
     * @return {?}
     */
    ValidationMessages.prototype.getMessage = /**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        return this.messages[key];
    };
    return ValidationMessages;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var DejaChildValidatorModule = /** @class */ (function () {
    function DejaChildValidatorModule() {
    }
    DejaChildValidatorModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_11__["NgModule"], args: [{
                    declarations: [
                        DejaChildValidatorDirective
                    ],
                    exports: [
                        DejaChildValidatorDirective
                    ],
                    imports: [
                        _angular_common__WEBPACK_IMPORTED_MODULE_10__["CommonModule"],
                        _angular_forms__WEBPACK_IMPORTED_MODULE_12__["FormsModule"],
                    ],
                },] }
    ];
    return DejaChildValidatorModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */
/** @enum {number} */
var KeyCodes = {
    Backspace: 8,
    Tab: 9,
    Enter: 13,
    Shift: 16,
    Ctrl: 17,
    Alt: 18,
    Pause: 19,
    CapsLock: 20,
    Escape: 27,
    Space: 32,
    PageUp: 33,
    PageDown: 34,
    End: 35,
    Home: 36,
    LeftArrow: 37,
    UpArrow: 38,
    RightArrow: 39,
    DownArrow: 40,
    Insert: 45,
    Delete: 46,
    Key0: 48,
    Key1: 49,
    Key2: 50,
    Key3: 51,
    Key4: 52,
    Key5: 53,
    Key6: 54,
    Key7: 55,
    Key8: 56,
    Key9: 57,
    KeyA: 65,
    KeyB: 66,
    KeyC: 67,
    KeyD: 68,
    KeyE: 69,
    KeyF: 70,
    KeyG: 71,
    KeyH: 72,
    KeyI: 73,
    KeyJ: 74,
    KeyK: 75,
    KeyL: 76,
    KeyM: 77,
    KeyN: 78,
    KeyO: 79,
    KeyP: 80,
    KeyQ: 81,
    KeyR: 82,
    KeyS: 83,
    KeyT: 84,
    KeyU: 85,
    KeyV: 86,
    KeyW: 87,
    KeyX: 88,
    KeyY: 89,
    KeyZ: 90,
    LeftMeta: 91,
    RightMeta: 92,
    Select: 93,
    Numpad0: 96,
    Numpad1: 97,
    Numpad2: 98,
    Numpad3: 99,
    Numpad4: 100,
    Numpad5: 101,
    Numpad6: 102,
    Numpad7: 103,
    Numpad8: 104,
    Numpad9: 105,
    Multiply: 106,
    Add: 107,
    Subtract: 109,
    Decimal: 110,
    Divide: 111,
    F1: 112,
    F2: 113,
    F3: 114,
    F4: 115,
    F5: 116,
    F6: 117,
    F7: 118,
    F8: 119,
    F9: 120,
    F10: 121,
    F11: 122,
    F12: 123,
    NumLock: 144,
    ScrollLock: 145,
    Semicolon: 186,
    Equals: 187,
    Comma: 188,
    Dash: 189,
    Period: 190,
    ForwardSlash: 191,
    GraveAccent: 192,
    OpenBracket: 219,
    BackSlash: 220,
    CloseBracket: 221,
    SingleQuote: 222,
};
KeyCodes[KeyCodes.Backspace] = 'Backspace';
KeyCodes[KeyCodes.Tab] = 'Tab';
KeyCodes[KeyCodes.Enter] = 'Enter';
KeyCodes[KeyCodes.Shift] = 'Shift';
KeyCodes[KeyCodes.Ctrl] = 'Ctrl';
KeyCodes[KeyCodes.Alt] = 'Alt';
KeyCodes[KeyCodes.Pause] = 'Pause';
KeyCodes[KeyCodes.CapsLock] = 'CapsLock';
KeyCodes[KeyCodes.Escape] = 'Escape';
KeyCodes[KeyCodes.Space] = 'Space';
KeyCodes[KeyCodes.PageUp] = 'PageUp';
KeyCodes[KeyCodes.PageDown] = 'PageDown';
KeyCodes[KeyCodes.End] = 'End';
KeyCodes[KeyCodes.Home] = 'Home';
KeyCodes[KeyCodes.LeftArrow] = 'LeftArrow';
KeyCodes[KeyCodes.UpArrow] = 'UpArrow';
KeyCodes[KeyCodes.RightArrow] = 'RightArrow';
KeyCodes[KeyCodes.DownArrow] = 'DownArrow';
KeyCodes[KeyCodes.Insert] = 'Insert';
KeyCodes[KeyCodes.Delete] = 'Delete';
KeyCodes[KeyCodes.Key0] = 'Key0';
KeyCodes[KeyCodes.Key1] = 'Key1';
KeyCodes[KeyCodes.Key2] = 'Key2';
KeyCodes[KeyCodes.Key3] = 'Key3';
KeyCodes[KeyCodes.Key4] = 'Key4';
KeyCodes[KeyCodes.Key5] = 'Key5';
KeyCodes[KeyCodes.Key6] = 'Key6';
KeyCodes[KeyCodes.Key7] = 'Key7';
KeyCodes[KeyCodes.Key8] = 'Key8';
KeyCodes[KeyCodes.Key9] = 'Key9';
KeyCodes[KeyCodes.KeyA] = 'KeyA';
KeyCodes[KeyCodes.KeyB] = 'KeyB';
KeyCodes[KeyCodes.KeyC] = 'KeyC';
KeyCodes[KeyCodes.KeyD] = 'KeyD';
KeyCodes[KeyCodes.KeyE] = 'KeyE';
KeyCodes[KeyCodes.KeyF] = 'KeyF';
KeyCodes[KeyCodes.KeyG] = 'KeyG';
KeyCodes[KeyCodes.KeyH] = 'KeyH';
KeyCodes[KeyCodes.KeyI] = 'KeyI';
KeyCodes[KeyCodes.KeyJ] = 'KeyJ';
KeyCodes[KeyCodes.KeyK] = 'KeyK';
KeyCodes[KeyCodes.KeyL] = 'KeyL';
KeyCodes[KeyCodes.KeyM] = 'KeyM';
KeyCodes[KeyCodes.KeyN] = 'KeyN';
KeyCodes[KeyCodes.KeyO] = 'KeyO';
KeyCodes[KeyCodes.KeyP] = 'KeyP';
KeyCodes[KeyCodes.KeyQ] = 'KeyQ';
KeyCodes[KeyCodes.KeyR] = 'KeyR';
KeyCodes[KeyCodes.KeyS] = 'KeyS';
KeyCodes[KeyCodes.KeyT] = 'KeyT';
KeyCodes[KeyCodes.KeyU] = 'KeyU';
KeyCodes[KeyCodes.KeyV] = 'KeyV';
KeyCodes[KeyCodes.KeyW] = 'KeyW';
KeyCodes[KeyCodes.KeyX] = 'KeyX';
KeyCodes[KeyCodes.KeyY] = 'KeyY';
KeyCodes[KeyCodes.KeyZ] = 'KeyZ';
KeyCodes[KeyCodes.LeftMeta] = 'LeftMeta';
KeyCodes[KeyCodes.RightMeta] = 'RightMeta';
KeyCodes[KeyCodes.Select] = 'Select';
KeyCodes[KeyCodes.Numpad0] = 'Numpad0';
KeyCodes[KeyCodes.Numpad1] = 'Numpad1';
KeyCodes[KeyCodes.Numpad2] = 'Numpad2';
KeyCodes[KeyCodes.Numpad3] = 'Numpad3';
KeyCodes[KeyCodes.Numpad4] = 'Numpad4';
KeyCodes[KeyCodes.Numpad5] = 'Numpad5';
KeyCodes[KeyCodes.Numpad6] = 'Numpad6';
KeyCodes[KeyCodes.Numpad7] = 'Numpad7';
KeyCodes[KeyCodes.Numpad8] = 'Numpad8';
KeyCodes[KeyCodes.Numpad9] = 'Numpad9';
KeyCodes[KeyCodes.Multiply] = 'Multiply';
KeyCodes[KeyCodes.Add] = 'Add';
KeyCodes[KeyCodes.Subtract] = 'Subtract';
KeyCodes[KeyCodes.Decimal] = 'Decimal';
KeyCodes[KeyCodes.Divide] = 'Divide';
KeyCodes[KeyCodes.F1] = 'F1';
KeyCodes[KeyCodes.F2] = 'F2';
KeyCodes[KeyCodes.F3] = 'F3';
KeyCodes[KeyCodes.F4] = 'F4';
KeyCodes[KeyCodes.F5] = 'F5';
KeyCodes[KeyCodes.F6] = 'F6';
KeyCodes[KeyCodes.F7] = 'F7';
KeyCodes[KeyCodes.F8] = 'F8';
KeyCodes[KeyCodes.F9] = 'F9';
KeyCodes[KeyCodes.F10] = 'F10';
KeyCodes[KeyCodes.F11] = 'F11';
KeyCodes[KeyCodes.F12] = 'F12';
KeyCodes[KeyCodes.NumLock] = 'NumLock';
KeyCodes[KeyCodes.ScrollLock] = 'ScrollLock';
KeyCodes[KeyCodes.Semicolon] = 'Semicolon';
KeyCodes[KeyCodes.Equals] = 'Equals';
KeyCodes[KeyCodes.Comma] = 'Comma';
KeyCodes[KeyCodes.Dash] = 'Dash';
KeyCodes[KeyCodes.Period] = 'Period';
KeyCodes[KeyCodes.ForwardSlash] = 'ForwardSlash';
KeyCodes[KeyCodes.GraveAccent] = 'GraveAccent';
KeyCodes[KeyCodes.OpenBracket] = 'OpenBracket';
KeyCodes[KeyCodes.BackSlash] = 'BackSlash';
KeyCodes[KeyCodes.CloseBracket] = 'CloseBracket';
KeyCodes[KeyCodes.SingleQuote] = 'SingleQuote';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */
/**
 * Classe de génération d'un guid.
 */
var  /**
 * Classe de génération d'un guid.
 */
UUID = /** @class */ (function () {
    function UUID() {
        /** @type {?} */
        var d = new Date().getTime();
        if (window.performance !== undefined) {
            if (typeof window.performance.now === 'function') {
                d += performance.now();
            }
        }
        this.uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (/**
         * @param {?} c
         * @return {?}
         */
        function (c) {
            // tslint:disable-next-line:no-bitwise
            /** @type {?} */
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            // tslint:disable-next-line:no-bitwise
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        }));
    }
    /** Le renoive le guid sous format string. */
    /**
     * Le renoive le guid sous format string.
     * @return {?}
     */
    UUID.prototype.toString = /**
     * Le renoive le guid sous format string.
     * @return {?}
     */
    function () {
        return this.uuid;
    };
    return UUID;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */



//# sourceMappingURL=deja-js-core.js.map

/***/ }),

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./circular-picker/circular-picker-demo.module": [
		"./src/app/circular-picker/circular-picker-demo.module.ts",
		"default~circular-picker-circular-picker-demo-module~color-selector-color-selector-demo-module~conten~548f8540",
		"default~circular-picker-circular-picker-demo-module~color-selector-color-selector-demo-module~conten~736e8798",
		"default~circular-picker-circular-picker-demo-module~color-selector-color-selector-demo-module~conten~35cd5166",
		"default~circular-picker-circular-picker-demo-module~color-selector-color-selector-demo-module~conten~ec00beff",
		"default~circular-picker-circular-picker-demo-module~color-selector-color-selector-demo-module~conten~eec3f76e",
		"default~circular-picker-circular-picker-demo-module~color-selector-color-selector-demo-module~conten~d99e4c73",
		"default~circular-picker-circular-picker-demo-module~color-selector-color-selector-demo-module~conten~394e55c4",
		"default~circular-picker-circular-picker-demo-module~color-selector-color-selector-demo-module~conten~e1a59b94",
		"common",
		"circular-picker-circular-picker-demo-module"
	],
	"./color-selector/color-selector-demo.module": [
		"./src/app/color-selector/color-selector-demo.module.ts",
		"default~circular-picker-circular-picker-demo-module~color-selector-color-selector-demo-module~conten~548f8540",
		"default~circular-picker-circular-picker-demo-module~color-selector-color-selector-demo-module~conten~736e8798",
		"default~circular-picker-circular-picker-demo-module~color-selector-color-selector-demo-module~conten~35cd5166",
		"default~circular-picker-circular-picker-demo-module~color-selector-color-selector-demo-module~conten~ec00beff",
		"default~circular-picker-circular-picker-demo-module~color-selector-color-selector-demo-module~conten~eec3f76e",
		"default~circular-picker-circular-picker-demo-module~color-selector-color-selector-demo-module~conten~d99e4c73",
		"default~circular-picker-circular-picker-demo-module~color-selector-color-selector-demo-module~conten~394e55c4",
		"default~circular-picker-circular-picker-demo-module~color-selector-color-selector-demo-module~conten~e1a59b94",
		"common",
		"color-selector-color-selector-demo-module"
	],
	"./content-editable/content-editable-demo.module": [
		"./src/app/content-editable/content-editable-demo.module.ts",
		"default~circular-picker-circular-picker-demo-module~color-selector-color-selector-demo-module~conten~548f8540",
		"default~circular-picker-circular-picker-demo-module~color-selector-color-selector-demo-module~conten~736e8798",
		"default~circular-picker-circular-picker-demo-module~color-selector-color-selector-demo-module~conten~35cd5166",
		"default~circular-picker-circular-picker-demo-module~color-selector-color-selector-demo-module~conten~ec00beff",
		"default~circular-picker-circular-picker-demo-module~color-selector-color-selector-demo-module~conten~eec3f76e",
		"default~circular-picker-circular-picker-demo-module~color-selector-color-selector-demo-module~conten~d99e4c73",
		"default~circular-picker-circular-picker-demo-module~color-selector-color-selector-demo-module~conten~394e55c4",
		"default~circular-picker-circular-picker-demo-module~color-selector-color-selector-demo-module~conten~e1a59b94",
		"common",
		"content-editable-content-editable-demo-module"
	],
	"./date-picker/date-picker-demo.module": [
		"./src/app/date-picker/date-picker-demo.module.ts",
		"default~circular-picker-circular-picker-demo-module~color-selector-color-selector-demo-module~conten~548f8540",
		"default~circular-picker-circular-picker-demo-module~color-selector-color-selector-demo-module~conten~736e8798",
		"default~circular-picker-circular-picker-demo-module~color-selector-color-selector-demo-module~conten~35cd5166",
		"default~circular-picker-circular-picker-demo-module~color-selector-color-selector-demo-module~conten~ec00beff",
		"default~circular-picker-circular-picker-demo-module~color-selector-color-selector-demo-module~conten~eec3f76e",
		"default~circular-picker-circular-picker-demo-module~color-selector-color-selector-demo-module~conten~d99e4c73",
		"default~circular-picker-circular-picker-demo-module~color-selector-color-selector-demo-module~conten~394e55c4",
		"default~circular-picker-circular-picker-demo-module~color-selector-color-selector-demo-module~conten~e1a59b94",
		"common",
		"date-picker-date-picker-demo-module"
	],
	"./editor/editor-demo.module": [
		"./src/app/editor/editor-demo.module.ts",
		"default~circular-picker-circular-picker-demo-module~color-selector-color-selector-demo-module~conten~548f8540",
		"default~editor-editor-demo-module~grid-grid-demo-module~range-range-demo-module~select-select-demo-m~5fc715fc",
		"common",
		"editor-editor-demo-module"
	],
	"./grid/grid-demo.module": [
		"./src/app/grid/grid-demo.module.ts",
		"default~circular-picker-circular-picker-demo-module~color-selector-color-selector-demo-module~conten~548f8540",
		"default~circular-picker-circular-picker-demo-module~color-selector-color-selector-demo-module~conten~35cd5166",
		"default~editor-editor-demo-module~grid-grid-demo-module~range-range-demo-module~select-select-demo-m~5fc715fc",
		"default~grid-grid-demo-module~message-box-message-box-demo-module~select-select-demo-module~tree-lis~b32a4a9e",
		"default~grid-grid-demo-module~monaco-editor-monaco-editor-demo-module~splitter-splitter-demo-module",
		"common",
		"grid-grid-demo-module"
	],
	"./home/home.module": [
		"./src/app/home/home.module.ts",
		"default~circular-picker-circular-picker-demo-module~color-selector-color-selector-demo-module~conten~548f8540",
		"common",
		"home-home-module"
	],
	"./message-box/message-box-demo.module": [
		"./src/app/message-box/message-box-demo.module.ts",
		"default~circular-picker-circular-picker-demo-module~color-selector-color-selector-demo-module~conten~548f8540",
		"default~circular-picker-circular-picker-demo-module~color-selector-color-selector-demo-module~conten~736e8798",
		"default~grid-grid-demo-module~message-box-message-box-demo-module~select-select-demo-module~tree-lis~b32a4a9e",
		"common",
		"message-box-message-box-demo-module"
	],
	"./monaco-editor/monaco-editor-demo.module": [
		"./src/app/monaco-editor/monaco-editor-demo.module.ts",
		"default~circular-picker-circular-picker-demo-module~color-selector-color-selector-demo-module~conten~548f8540",
		"default~grid-grid-demo-module~monaco-editor-monaco-editor-demo-module~splitter-splitter-demo-module",
		"common",
		"monaco-editor-monaco-editor-demo-module"
	],
	"./numeric-stepper/numeric-stepper-demo.module": [
		"./src/app/numeric-stepper/numeric-stepper-demo.module.ts",
		"default~circular-picker-circular-picker-demo-module~color-selector-color-selector-demo-module~conten~548f8540",
		"common",
		"numeric-stepper-numeric-stepper-demo-module"
	],
	"./overlay/overlay-demo.module": [
		"./src/app/overlay/overlay-demo.module.ts",
		"default~circular-picker-circular-picker-demo-module~color-selector-color-selector-demo-module~conten~548f8540",
		"default~circular-picker-circular-picker-demo-module~color-selector-color-selector-demo-module~conten~736e8798",
		"common",
		"overlay-overlay-demo-module"
	],
	"./popup/popup-demo.module": [
		"./src/app/popup/popup-demo.module.ts",
		"default~circular-picker-circular-picker-demo-module~color-selector-color-selector-demo-module~conten~548f8540",
		"default~circular-picker-circular-picker-demo-module~color-selector-color-selector-demo-module~conten~736e8798",
		"default~circular-picker-circular-picker-demo-module~color-selector-color-selector-demo-module~conten~eec3f76e",
		"default~popup-popup-demo-module~range-range-demo-module~snackbar-snackbar-demo-module~tiles-tiles-de~2235f62f",
		"common",
		"popup-popup-demo-module"
	],
	"./range/range-demo.module": [
		"./src/app/range/range-demo.module.ts",
		"default~circular-picker-circular-picker-demo-module~color-selector-color-selector-demo-module~conten~548f8540",
		"default~circular-picker-circular-picker-demo-module~color-selector-color-selector-demo-module~conten~736e8798",
		"default~circular-picker-circular-picker-demo-module~color-selector-color-selector-demo-module~conten~35cd5166",
		"default~circular-picker-circular-picker-demo-module~color-selector-color-selector-demo-module~conten~ec00beff",
		"default~circular-picker-circular-picker-demo-module~color-selector-color-selector-demo-module~conten~eec3f76e",
		"default~circular-picker-circular-picker-demo-module~color-selector-color-selector-demo-module~conten~d99e4c73",
		"default~circular-picker-circular-picker-demo-module~color-selector-color-selector-demo-module~conten~394e55c4",
		"default~circular-picker-circular-picker-demo-module~color-selector-color-selector-demo-module~conten~e1a59b94",
		"default~editor-editor-demo-module~grid-grid-demo-module~range-range-demo-module~select-select-demo-m~5fc715fc",
		"default~popup-popup-demo-module~range-range-demo-module~snackbar-snackbar-demo-module~tiles-tiles-de~2235f62f",
		"common",
		"range-range-demo-module"
	],
	"./select/select-demo.module": [
		"./src/app/select/select-demo.module.ts",
		"default~circular-picker-circular-picker-demo-module~color-selector-color-selector-demo-module~conten~548f8540",
		"default~circular-picker-circular-picker-demo-module~color-selector-color-selector-demo-module~conten~736e8798",
		"default~circular-picker-circular-picker-demo-module~color-selector-color-selector-demo-module~conten~394e55c4",
		"default~editor-editor-demo-module~grid-grid-demo-module~range-range-demo-module~select-select-demo-m~5fc715fc",
		"default~grid-grid-demo-module~message-box-message-box-demo-module~select-select-demo-module~tree-lis~b32a4a9e",
		"common",
		"select-select-demo-module"
	],
	"./sidenav/sidenav-demo.module": [
		"./src/app/sidenav/sidenav-demo.module.ts",
		"default~circular-picker-circular-picker-demo-module~color-selector-color-selector-demo-module~conten~736e8798",
		"default~circular-picker-circular-picker-demo-module~color-selector-color-selector-demo-module~conten~35cd5166",
		"default~circular-picker-circular-picker-demo-module~color-selector-color-selector-demo-module~conten~ec00beff",
		"default~circular-picker-circular-picker-demo-module~color-selector-color-selector-demo-module~conten~eec3f76e",
		"default~circular-picker-circular-picker-demo-module~color-selector-color-selector-demo-module~conten~d99e4c73",
		"default~circular-picker-circular-picker-demo-module~color-selector-color-selector-demo-module~conten~394e55c4",
		"default~circular-picker-circular-picker-demo-module~color-selector-color-selector-demo-module~conten~e1a59b94",
		"common",
		"sidenav-sidenav-demo-module"
	],
	"./snackbar/snackbar-demo.module": [
		"./src/app/snackbar/snackbar-demo.module.ts",
		"default~circular-picker-circular-picker-demo-module~color-selector-color-selector-demo-module~conten~548f8540",
		"default~popup-popup-demo-module~range-range-demo-module~snackbar-snackbar-demo-module~tiles-tiles-de~2235f62f",
		"common",
		"snackbar-snackbar-demo-module"
	],
	"./splitter/splitter-demo.module": [
		"./src/app/splitter/splitter-demo.module.ts",
		"default~circular-picker-circular-picker-demo-module~color-selector-color-selector-demo-module~conten~548f8540",
		"default~grid-grid-demo-module~monaco-editor-monaco-editor-demo-module~splitter-splitter-demo-module",
		"common",
		"splitter-splitter-demo-module"
	],
	"./tag/tag-demo.module": [
		"./src/app/tag/tag-demo.module.ts",
		"default~circular-picker-circular-picker-demo-module~color-selector-color-selector-demo-module~conten~548f8540",
		"common",
		"tag-tag-demo-module"
	],
	"./tiles/tiles-demo.module": [
		"./src/app/tiles/tiles-demo.module.ts",
		"default~circular-picker-circular-picker-demo-module~color-selector-color-selector-demo-module~conten~548f8540",
		"default~circular-picker-circular-picker-demo-module~color-selector-color-selector-demo-module~conten~ec00beff",
		"default~circular-picker-circular-picker-demo-module~color-selector-color-selector-demo-module~conten~d99e4c73",
		"default~popup-popup-demo-module~range-range-demo-module~snackbar-snackbar-demo-module~tiles-tiles-de~2235f62f",
		"common",
		"tiles-tiles-demo-module"
	],
	"./tree-list/tree-list-demo.module": [
		"./src/app/tree-list/tree-list-demo.module.ts",
		"default~circular-picker-circular-picker-demo-module~color-selector-color-selector-demo-module~conten~548f8540",
		"default~circular-picker-circular-picker-demo-module~color-selector-color-selector-demo-module~conten~35cd5166",
		"default~circular-picker-circular-picker-demo-module~color-selector-color-selector-demo-module~conten~ec00beff",
		"default~editor-editor-demo-module~grid-grid-demo-module~range-range-demo-module~select-select-demo-m~5fc715fc",
		"default~grid-grid-demo-module~message-box-message-box-demo-module~select-select-demo-module~tree-lis~b32a4a9e",
		"common",
		"tree-list-tree-list-demo-module"
	],
	"./viewport/viewport-demo.module": [
		"./src/app/viewport/viewport-demo.module.ts",
		"default~circular-picker-circular-picker-demo-module~color-selector-color-selector-demo-module~conten~548f8540",
		"default~editor-editor-demo-module~grid-grid-demo-module~range-range-demo-module~select-select-demo-m~5fc715fc",
		"common",
		"viewport-viewport-demo-module"
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids) {
		return Promise.resolve().then(function() {
			var e = new Error("Cannot find module '" + req + "'");
			e.code = 'MODULE_NOT_FOUND';
			throw e;
		});
	}
	return Promise.all(ids.slice(1).map(__webpack_require__.e)).then(function() {
		var id = ids[0];
		return __webpack_require__(id);
	});
}
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";
module.exports = webpackAsyncContext;

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<deja-sidenav headerText=\"DEJA-JS\" showToolbar=\"true\">\n    <deja-sidenav-menu slimScroll>\n        <mat-nav-list>\n            <mat-list-item title=\"Home\" routerLink=\"/home\" routerLinkActive=\"active\">\n                <mat-icon mat-list-icon>home</mat-icon>\n                <span mat-line>Home</span>\n            </mat-list-item>\n            <mat-list-item title=\"Guides\" routerLink=\"/guides\" routerLinkActive=\"active\">\n                <mat-icon mat-list-icon>settings</mat-icon>\n                <span mat-line>Guides</span>\n            </mat-list-item>\n            <a mat-list-item title=\"Documentation\" target=\"_blank\" href=\"https://dsi-hug.github.io/dejajs-doc/\">\n                <mat-icon mat-list-icon>help</mat-icon>\n                <span mat-line>Documentation</span>\n            </a>\n            <a mat-list-item title=\"Test coverage\" target=\"_blank\" href=\"https://dsi-hug.github.io/dejajs-test/\">\n                <mat-icon mat-list-icon>done_all</mat-icon>\n                <span mat-line>Test coverage</span>\n            </a>\n            <mat-divider></mat-divider>\n            <mat-list-item title=\"Circular Picker\" routerLink=\"/circular-picker\" routerLinkActive=\"active\">\n                <mat-icon mat-list-icon>access_time</mat-icon>\n                <span mat-line>Circular Picker</span>\n            </mat-list-item>\n            <mat-list-item title=\"Color Selector\" routerLink=\"/colorselector\" routerLinkActive=\"active\">\n                <mat-icon mat-list-icon>format_color_fill</mat-icon>\n                <span mat-line>Color Selector</span>\n            </mat-list-item>\n            <mat-list-item title=\"Content Editable\" routerLink=\"/contenteditableselector\" routerLinkActive=\"active\">\n                <mat-icon mat-list-icon>text_fields</mat-icon>\n                <span mat-line>Content Editable</span>\n            </mat-list-item>\n            <mat-list-item title=\"Date Picker\" routerLink=\"/date-picker\" routerLinkActive=\"active\">\n                <mat-icon mat-list-icon>date_range</mat-icon>\n                <span mat-line>Date Picker</span>\n            </mat-list-item>\n            <mat-list-item title=\"Editor\" routerLink=\"/editor\" routerLinkActive=\"active\">\n                <mat-icon mat-list-icon>edit</mat-icon>\n                <span mat-line>Editor</span>\n            </mat-list-item>\n            <!-- <mat-list-item title=\"Events\" routerLink=\"/events\" routerLinkActive=\"active\">\n                <mat-icon mat-list-icon>event</mat-icon>\n                <span mat-line>Events</span>\n            </mat-list-item> -->\n            <mat-list-item title=\"Grid\" routerLink=\"/grid\" routerLinkActive=\"active\">\n                <mat-icon mat-list-icon>grid_on</mat-icon>\n                <span mat-line>Grid</span>\n            </mat-list-item>\n            <mat-list-item title=\"Message Box\" routerLink=\"/message-box\" routerLinkActive=\"active\">\n                <mat-icon mat-list-icon>message</mat-icon>\n                <span mat-line>Message Box</span>\n            </mat-list-item>\n            <mat-list-item title=\"Monaco Editor\" routerLink=\"/monaco-editor\" routerLinkActive=\"active\">\n                <mat-icon mat-list-icon>code</mat-icon>\n                <span mat-line>Monaco Editor</span>\n            </mat-list-item>\n            <mat-list-item title=\"Numeric Stepper\" routerLink=\"/numeric-stepper\" routerLinkActive=\"active\">\n                <mat-icon mat-list-icon>filter_9_plus</mat-icon>\n                <span mat-line>Numeric Stepper</span>\n            </mat-list-item>\n            <mat-list-item title=\"Overlay\" routerLink=\"/overlay\" routerLinkActive=\"active\">\n                <mat-icon mat-list-icon>menu</mat-icon>\n                <span mat-line>Overlay</span>\n            </mat-list-item>\n            <mat-list-item title=\"Popup\" routerLink=\"/popup\" routerLinkActive=\"active\">\n                <mat-icon mat-list-icon>perm_media</mat-icon>\n                <span mat-line>Popup</span>\n            </mat-list-item>\n            <!-- <mat-list-item title=\"Progress Circle\" routerLink=\"/progress-circle\" routerLinkActive=\"active\">\n                <mat-icon mat-list-icon>loop</mat-icon>\n                <span mat-line>Progress Circle</span>\n            </mat-list-item> -->\n            <mat-list-item title=\"Range\" routerLink=\"/range\" routerLinkActive=\"active\">\n                <mat-icon mat-list-icon>repeat_one</mat-icon>\n                <span mat-line>Range</span>\n            </mat-list-item>\n            <!-- <mat-list-item title=\"Reactive Form\" routerLink=\"/reactive-form\" routerLinkActive=\"active\">\n                <mat-icon mat-list-icon>mode_edit</mat-icon>\n                <span mat-line>Reactive Form</span>\n            </mat-list-item> -->\n            <mat-list-item title=\"Sidenav\" routerLink=\"/sidenav\" routerLinkActive=\"active\">\n                <mat-icon mat-list-icon>menu</mat-icon>\n                <span mat-line>Sidenav</span>\n            </mat-list-item>\n            <mat-list-item title=\"Select\" routerLink=\"/select\" routerLinkActive=\"active\">\n                <mat-icon mat-list-icon>arrow_drop_down</mat-icon>\n                <span mat-line>Select</span>\n            </mat-list-item>\n            <mat-list-item title=\"Snackbar\" routerLink=\"/snackbar\" routerLinkActive=\"active\">\n                <mat-icon mat-list-icon>home</mat-icon>\n                <span mat-line>Snackbar</span>\n            </mat-list-item>\n            <mat-list-item title=\"Splitter\" routerLink=\"/splitter\" routerLinkActive=\"active\">\n                <mat-icon mat-list-icon>call_split</mat-icon>\n                <span mat-line>Splitter</span>\n            </mat-list-item>\n            <mat-list-item title=\"Tag\" routerLink=\"/tag\" routerLinkActive=\"active\">\n                <mat-icon mat-list-icon>bubble_chart</mat-icon>\n                <span mat-line>Tag</span>\n            </mat-list-item>\n            <mat-list-item title=\"Tiles\" routerLink=\"/tiles\" routerLinkActive=\"active\">\n                <mat-icon mat-list-icon>dashboard</mat-icon>\n                <span mat-line>Tiles</span>\n            </mat-list-item>\n            <mat-list-item title=\"Tree List\" routerLink=\"/tree-list\" routerLinkActive=\"active\">\n                <mat-icon mat-list-icon>list</mat-icon>\n                <span mat-line>Tree List</span>\n            </mat-list-item>\n            <mat-list-item title=\"Viewport\" routerLink=\"/viewport\" routerLinkActive=\"active\">\n                <mat-icon mat-list-icon>view_list</mat-icon>\n                <span mat-line>Viewport</span>\n            </mat-list-item>\n        </mat-nav-list>\n    </deja-sidenav-menu>\n\n    <deja-sidenav-header>\n        <mat-menu #colorMenu=\"matMenu\">\n            <mat-button-toggle-group [(ngModel)]=\"theme\" id=\"color-menu-toggle-group\" vertical>\n                <mat-button-toggle value=\"blue\">Blue</mat-button-toggle>\n                <mat-button-toggle value=\"teal\">Teal</mat-button-toggle>\n                <mat-button-toggle value=\"pink\">Pink (dark)</mat-button-toggle>\n                <mat-button-toggle value=\"amber\">Amber (dark)</mat-button-toggle>\n            </mat-button-toggle-group>\n        </mat-menu>\n        <button mat-icon-button>\n            <mat-icon [matMenuTriggerFor]=\"colorMenu\">format_color_fill</mat-icon>\n        </button>\n        <a mat-button href=\"https://github.com/DSI-HUG/dejajs-components\" target=\"_blank\">GITHUB</a>\n    </deja-sidenav-header>\n\n    <deja-sidenav-content>\n        <router-outlet></router-outlet>\n    </deja-sidenav-content>\n</deja-sidenav>\n"

/***/ }),

/***/ "./src/app/app.component.scss":
/*!************************************!*\
  !*** ./src/app/app.component.scss ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/* Theme for the ripple elements.*/\n/* stylelint-disable material/no-prefixes */\n/* stylelint-enable */\nhtml,\nbody {\n  height: 100%;\n  margin: 0;\n  padding: 0; }\nbody {\n  font-family: Roboto, 'Helvetica Neue', sans-serif; }\nbody * {\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale; }\nbody [mat-icon-button] {\n    overflow: hidden; }\nbody mat-nav-list {\n    flex-direction: column;\n    box-sizing: border-box;\n    display: flex;\n    flex: 1 1 auto; }\nbody mat-sidenav-container.demo-root {\n    height: 100%; }\nbody mat-sidenav-container.demo-root mat-sidenav {\n      min-width: 15%; }\nbody mat-sidenav-container.demo-root mat-sidenav [mat-button] {\n        width: 100%;\n        position: relative;\n        bottom: 0;\n        margin: 24px 0; }\nbody mat-sidenav-container.demo-root mat-content {\n      height: auto;\n      overflow: visible; }\nbody mat-card.demo-card {\n    padding: 0 !important;\n    margin: 1rem 0;\n    display: block; }\nbody mat-card.demo-card mat-card-content {\n      padding: 2rem;\n      display: block; }\nbody mat-card.demo-card mat-card-content.no-padding {\n        padding: 0; }\nbody h1 {\n    font-size: 20px; }\nbody #color-menu-toggle-group {\n    margin: -8px 0;\n    width: 100%; }\nbody deja-sidenav-menu {\n    box-sizing: border-box;\n    flex-direction: row;\n    display: flex; }\nbody deja-sidenav-content {\n    display: flex;\n    flex-direction: column;\n    flex: 1 1 auto; }\nbody deja-sidenav-content router-outlet {\n      display: none; }\nbody deja-sidenav-content > * {\n      padding: 1rem;\n      flex: 1 1 100%;\n      display: block; }\nbody .header .header-text {\n    margin-left: 1rem !important; }\nbody .header .header-icon {\n    width: 2rem !important;\n    height: 2rem !important;\n    content: url(\"/assets/img/logo/angular.svg\"); }\n#scrollable-content {\n  overflow: auto;\n  height: 100%; }\n#iframePopup {\n  display: flex;\n  align-items: center;\n  justify-content: space-around; }\n#iframePopup deja-iframe {\n    width: 80%;\n    height: 80%;\n    display: block; }\n#shortcut-list {\n  padding: 0; }\n#shortcut-list li {\n    margin: 0.5rem 0; }\n#shortcut-list .keyboard-key {\n    background: #eff0f2;\n    border-radius: 4px;\n    border-top: 1px solid #f5f5f5;\n    box-shadow: inset 0 0 25px #e8e8e8, 0 1px 0 #c3c3c3, 0 2px 0 #c9c9c9, 0 2px 3px #333;\n    color: #AAA;\n    font-size: 0.8em;\n    margin: 0 3px;\n    padding: 3px 8px;\n    text-align: center;\n    text-shadow: 0px 1px 0px #f5f5f5; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3RyYXZpcy9idWlsZC9EU0ktSFVHL2RlamFqcy1jb21wb25lbnRzL25vZGVfbW9kdWxlcy9AYW5ndWxhci9tYXRlcmlhbC9fdGhlbWluZy5zY3NzIiwiL2hvbWUvdHJhdmlzL2J1aWxkL0RTSS1IVUcvZGVqYWpzLWNvbXBvbmVudHMvc3JjL2FwcC9hcHAuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBeTFDQSxrQ0FBQTtBQWdoREEsMkNBQUE7QUF3Q0EscUJBQUE7QUMvNEZBOztFQUVDLFlBQVk7RUFDWixTQUFTO0VBQ1QsVUFBVSxFQUFBO0FBR1g7RUFDQyxpREFBaUQsRUFBQTtBQURsRDtJQUtFLG1DQUFtQztJQUNuQyxrQ0FBa0MsRUFBQTtBQU5wQztJQVVFLGdCQUFnQixFQUFBO0FBVmxCO0lBY0Usc0JBQXNCO0lBQ3RCLHNCQUFzQjtJQUN0QixhQUFhO0lBQ2IsY0FBYyxFQUFBO0FBakJoQjtJQXFCRSxZQUFZLEVBQUE7QUFyQmQ7TUF3QkcsY0FBYyxFQUFBO0FBeEJqQjtRQTJCSSxXQUFXO1FBQ1gsa0JBQWtCO1FBQ2xCLFNBQVM7UUFDVCxjQUFjLEVBQUE7QUE5QmxCO01BbUNHLFlBQVk7TUFDWixpQkFBaUIsRUFBQTtBQXBDcEI7SUF5Q0UscUJBQXFCO0lBQ3JCLGNBQWM7SUFDZCxjQUFjLEVBQUE7QUEzQ2hCO01BOENHLGFBQWE7TUFDYixjQUFjLEVBQUE7QUEvQ2pCO1FBa0RJLFVBQVUsRUFBQTtBQWxEZDtJQXdERSxlQUFlLEVBQUE7QUF4RGpCO0lBNERFLGNBQWM7SUFDZCxXQUFXLEVBQUE7QUE3RGI7SUFpRUUsc0JBQXNCO0lBQ3RCLG1CQUFtQjtJQUNuQixhQUFhLEVBQUE7QUFuRWY7SUF1RUUsYUFBYTtJQUNiLHNCQUFzQjtJQUN0QixjQUFjLEVBQUE7QUF6RWhCO01BNEVHLGFBQWEsRUFBQTtBQTVFaEI7TUFnRkcsYUFBYTtNQUNiLGNBQWM7TUFDZCxjQUFjLEVBQUE7QUFsRmpCO0lBd0ZHLDRCQUE0QixFQUFBO0FBeEYvQjtJQTRGRyxzQkFBc0I7SUFDdEIsdUJBQXVCO0lBQ3ZCLDRDQUE0QyxFQUFBO0FBTS9DO0VBQ0MsY0FBYztFQUNkLFlBQVksRUFBQTtBQUdiO0VBQ0MsYUFBYTtFQUNiLG1CQUFtQjtFQUNuQiw2QkFBNkIsRUFBQTtBQUg5QjtJQU1FLFVBQVU7SUFDVixXQUFXO0lBQ1gsY0FBYyxFQUFBO0FBSWhCO0VBQ0MsVUFBVSxFQUFBO0FBRFg7SUFJRSxnQkFBZ0IsRUFBQTtBQUpsQjtJQVFFLG1CQUFtQjtJQUNuQixrQkFBa0I7SUFDbEIsNkJBQTZCO0lBQzdCLG9GQUFvRjtJQUNwRixXQUFXO0lBQ1gsZ0JBQWdCO0lBQ2hCLGFBQWE7SUFDYixnQkFBZ0I7SUFDaEIsa0JBQWtCO0lBQ2xCLGdDQUFnQyxFQUFBIiwiZmlsZSI6InNyYy9hcHAvYXBwLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gSW1wb3J0IGFsbCB0aGUgdGhlbWluZyBmdW5jdGlvbmFsaXR5LlxuLy8gV2UgY2FuIHVzZSByZWxhdGl2ZSBpbXBvcnRzIGZvciBpbXBvcnRzIGZyb20gdGhlIGNkayBiZWNhdXNlIHdlIGJ1bmRsZSBldmVyeXRoaW5nXG4vLyB1cCBpbnRvIGEgc2luZ2xlIGZsYXQgc2NzcyBmaWxlIGZvciBtYXRlcmlhbC5cbi8vIFdlIHdhbnQgb3ZlcmxheXMgdG8gYWx3YXlzIGFwcGVhciBvdmVyIHVzZXIgY29udGVudCwgc28gc2V0IGEgYmFzZWxpbmVcbi8vIHZlcnkgaGlnaCB6LWluZGV4IGZvciB0aGUgb3ZlcmxheSBjb250YWluZXIsIHdoaWNoIGlzIHdoZXJlIHdlIGNyZWF0ZSB0aGUgbmV3XG4vLyBzdGFja2luZyBjb250ZXh0IGZvciBhbGwgb3ZlcmxheXMuXG4kY2RrLXotaW5kZXgtb3ZlcmxheS1jb250YWluZXI6IDEwMDA7XG4kY2RrLXotaW5kZXgtb3ZlcmxheTogMTAwMDtcbiRjZGstei1pbmRleC1vdmVybGF5LWJhY2tkcm9wOiAxMDAwO1xuXG4vLyBCYWNrZ3JvdW5kIGNvbG9yIGZvciBhbGwgb2YgdGhlIGJhY2tkcm9wc1xuJGNkay1vdmVybGF5LWRhcmstYmFja2Ryb3AtYmFja2dyb3VuZDogcmdiYSgwLCAwLCAwLCAwLjMyKTtcblxuLy8gRGVmYXVsdCBiYWNrZHJvcCBhbmltYXRpb24gaXMgYmFzZWQgb24gdGhlIE1hdGVyaWFsIERlc2lnbiBzd2lmdC1lYXNlLW91dC5cbiRiYWNrZHJvcC1hbmltYXRpb24tZHVyYXRpb246IDQwMG1zICFkZWZhdWx0O1xuJGJhY2tkcm9wLWFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb246IGN1YmljLWJlemllcigwLjI1LCAwLjgsIDAuMjUsIDEpICFkZWZhdWx0O1xuXG5cbkBtaXhpbiBjZGstb3ZlcmxheSgpIHtcbiAgLmNkay1vdmVybGF5LWNvbnRhaW5lciwgLmNkay1nbG9iYWwtb3ZlcmxheS13cmFwcGVyIHtcbiAgICAvLyBEaXNhYmxlIGV2ZW50cyBmcm9tIGJlaW5nIGNhcHR1cmVkIG9uIHRoZSBvdmVybGF5IGNvbnRhaW5lci5cbiAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcblxuICAgIC8vIFRoZSBjb250YWluZXIgc2hvdWxkIGJlIHRoZSBzaXplIG9mIHRoZSB2aWV3cG9ydC5cbiAgICB0b3A6IDA7XG4gICAgbGVmdDogMDtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gICAgd2lkdGg6IDEwMCU7XG4gIH1cblxuICAvLyBUaGUgb3ZlcmxheS1jb250YWluZXIgaXMgYW4gaW52aXNpYmxlIGVsZW1lbnQgd2hpY2ggY29udGFpbnMgYWxsIGluZGl2aWR1YWwgb3ZlcmxheXMuXG4gIC5jZGstb3ZlcmxheS1jb250YWluZXIge1xuICAgIHBvc2l0aW9uOiBmaXhlZDtcbiAgICB6LWluZGV4OiAkY2RrLXotaW5kZXgtb3ZlcmxheS1jb250YWluZXI7XG5cbiAgICAmOmVtcHR5IHtcbiAgICAgIC8vIEhpZGUgdGhlIGVsZW1lbnQgd2hlbiBpdCBkb2Vzbid0IGhhdmUgYW55IGNoaWxkIG5vZGVzLiBUaGlzIGRvZXNuJ3RcbiAgICAgIC8vIGluY2x1ZGUgb3ZlcmxheXMgdGhhdCBoYXZlIGJlZW4gZGV0YWNoZWQsIHJhdGhlciB0aGFuIGRpc3Bvc2VkLlxuICAgICAgZGlzcGxheTogbm9uZTtcbiAgICB9XG4gIH1cblxuICAvLyBXZSB1c2UgYW4gZXh0cmEgd3JhcHBlciBlbGVtZW50IGluIG9yZGVyIHRvIHVzZSBtYWtlIHRoZSBvdmVybGF5IGl0c2VsZiBhIGZsZXggaXRlbS5cbiAgLy8gVGhpcyBtYWtlcyBjZW50ZXJpbmcgdGhlIG92ZXJsYXkgZWFzeSB3aXRob3V0IHJ1bm5pbmcgaW50byB0aGUgc3VicGl4ZWwgcmVuZGVyaW5nXG4gIC8vIHByb2JsZW1zIHRpZWQgdG8gdXNpbmcgYHRyYW5zZm9ybWAgYW5kIHdpdGhvdXQgaW50ZXJmZXJpbmcgd2l0aCB0aGUgb3RoZXIgcG9zaXRpb25cbiAgLy8gc3RyYXRlZ2llcy5cbiAgLmNkay1nbG9iYWwtb3ZlcmxheS13cmFwcGVyIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB6LWluZGV4OiAkY2RrLXotaW5kZXgtb3ZlcmxheTtcbiAgfVxuXG4gIC8vIEEgc2luZ2xlIG92ZXJsYXkgcGFuZS5cbiAgLmNkay1vdmVybGF5LXBhbmUge1xuICAgIC8vIE5vdGU6IGl0J3MgaW1wb3J0YW50IGZvciB0aGlzIG9uZSB0byBzdGFydCBvZmYgYGFic29sdXRlYCxcbiAgICAvLyBpbiBvcmRlciBmb3IgdXMgdG8gYmUgYWJsZSB0byBtZWFzdXJlIGl0IGNvcnJlY3RseS5cbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgcG9pbnRlci1ldmVudHM6IGF1dG87XG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICB6LWluZGV4OiAkY2RrLXotaW5kZXgtb3ZlcmxheTtcblxuICAgIC8vIEZvciBjb25uZWN0ZWQtcG9zaXRpb24gb3ZlcmxheXMsIHdlIHNldCBgZGlzcGxheTogZmxleGAgaW5cbiAgICAvLyBvcmRlciB0byBmb3JjZSBgbWF4LXdpZHRoYCBhbmQgYG1heC1oZWlnaHRgIHRvIHRha2UgZWZmZWN0LlxuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgbWF4LXdpZHRoOiAxMDAlO1xuICAgIG1heC1oZWlnaHQ6IDEwMCU7XG4gIH1cblxuICAuY2RrLW92ZXJsYXktYmFja2Ryb3Age1xuICAgIC8vIFRPRE8oamVsYm91cm4pOiByZXVzZSBzaWRlbmF2IGZ1bGxzY3JlZW4gbWl4aW4uXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHRvcDogMDtcbiAgICBib3R0b206IDA7XG4gICAgbGVmdDogMDtcbiAgICByaWdodDogMDtcblxuICAgIHotaW5kZXg6ICRjZGstei1pbmRleC1vdmVybGF5LWJhY2tkcm9wO1xuICAgIHBvaW50ZXItZXZlbnRzOiBhdXRvO1xuICAgIC13ZWJraXQtdGFwLWhpZ2hsaWdodC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgdHJhbnNpdGlvbjogb3BhY2l0eSAkYmFja2Ryb3AtYW5pbWF0aW9uLWR1cmF0aW9uICRiYWNrZHJvcC1hbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uO1xuICAgIG9wYWNpdHk6IDA7XG5cbiAgICAmLmNkay1vdmVybGF5LWJhY2tkcm9wLXNob3dpbmcge1xuICAgICAgb3BhY2l0eTogMTtcblxuICAgICAgLy8gSW4gaGlnaCBjb250cmFzdCBtb2RlIHRoZSByZ2JhIGJhY2tncm91bmQgd2lsbCBiZWNvbWUgc29saWQgc28gd2UgbmVlZCB0byBmYWxsIGJhY2tcbiAgICAgIC8vIHRvIG1ha2luZyBpdCBvcGFxdWUgdXNpbmcgYG9wYWNpdHlgLiBOb3RlIHRoYXQgd2UgY2FuJ3QgdXNlIHRoZSBgY2RrLWhpZ2gtY29udHJhc3RgXG4gICAgICAvLyBtaXhpbiwgYmVjYXVzZSB3ZSBjYW4ndCBub3JtYWxpemUgdGhlIGltcG9ydCBwYXRoIHRvIHRoZSBfYTExeS5zY3NzIGJvdGggZm9yIHRoZVxuICAgICAgLy8gc291cmNlIGFuZCB3aGVuIHRoaXMgZmlsZSBpcyBkaXN0cmlidXRlZC4gU2VlICMxMDkwOC5cbiAgICAgIEBtZWRpYSBzY3JlZW4gYW5kICgtbXMtaGlnaC1jb250cmFzdDogYWN0aXZlKSB7XG4gICAgICAgIG9wYWNpdHk6IDAuNjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAuY2RrLW92ZXJsYXktZGFyay1iYWNrZHJvcCB7XG4gICAgYmFja2dyb3VuZDogJGNkay1vdmVybGF5LWRhcmstYmFja2Ryb3AtYmFja2dyb3VuZDtcbiAgfVxuXG4gIC5jZGstb3ZlcmxheS10cmFuc3BhcmVudC1iYWNrZHJvcCB7XG4gICAgLy8gTm90ZTogYXMgb2YgRmlyZWZveCA1NywgaGF2aW5nIHRoZSBiYWNrZHJvcCBiZSBgYmFja2dyb3VuZDogbm9uZWAgd2lsbCBwcmV2ZW50IGl0IGZyb21cbiAgICAvLyBjYXB0dXJpbmcgdGhlIHVzZXIncyBtb3VzZSBzY3JvbGwgZXZlbnRzLiBTaW5jZSB3ZSBhbHNvIGNhbid0IHVzZSBzb21ldGhpbmcgbGlrZVxuICAgIC8vIGByZ2JhKDAsIDAsIDAsIDApYCwgd2Ugd29yayBhcm91bmQgdGhlIGluY29uc2lzdGVuY3kgYnkgbm90IHNldHRpbmcgdGhlIGJhY2tncm91bmQgYXRcbiAgICAvLyBhbGwgYW5kIHVzaW5nIGBvcGFjaXR5YCB0byBtYWtlIHRoZSBlbGVtZW50IHRyYW5zcGFyZW50LlxuICAgICYsICYuY2RrLW92ZXJsYXktYmFja2Ryb3Atc2hvd2luZyB7XG4gICAgICBvcGFjaXR5OiAwO1xuICAgIH1cbiAgfVxuXG4gIC8vIE92ZXJsYXkgcGFyZW50IGVsZW1lbnQgdXNlZCB3aXRoIHRoZSBjb25uZWN0ZWQgcG9zaXRpb24gc3RyYXRlZ3kuIFVzZWQgdG8gY29uc3RyYWluIHRoZVxuICAvLyBvdmVybGF5IGVsZW1lbnQncyBzaXplIHRvIGZpdCB3aXRoaW4gdGhlIHZpZXdwb3J0LlxuICAuY2RrLW92ZXJsYXktY29ubmVjdGVkLXBvc2l0aW9uLWJvdW5kaW5nLWJveCB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHotaW5kZXg6ICRjZGstei1pbmRleC1vdmVybGF5O1xuXG4gICAgLy8gV2UgdXNlIGBkaXNwbGF5OiBmbGV4YCBvbiB0aGlzIGVsZW1lbnQgZXhjbHVzaXZlbHkgZm9yIGNlbnRlcmluZyBjb25uZWN0ZWQgb3ZlcmxheXMuXG4gICAgLy8gV2hlbiAqbm90KiBjZW50ZXJpbmcsIGEgdG9wL2xlZnQvYm90dG9tL3JpZ2h0IHdpbGwgYmUgc2V0IHdoaWNoIG92ZXJyaWRlcyB0aGUgbm9ybWFsXG4gICAgLy8gZmxleCBsYXlvdXQuXG4gICAgZGlzcGxheTogZmxleDtcblxuICAgIC8vIFdlIHVzZSB0aGUgYGNvbHVtbmAgZGlyZWN0aW9uIGhlcmUgdG8gYXZvaWQgc29tZSBmbGV4Ym94IGlzc3VlcyBpbiBFZGdlXG4gICAgLy8gd2hlbiB1c2luZyB0aGUgXCJncm93IGFmdGVyIG9wZW5cIiBvcHRpb25zLlxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG5cbiAgICAvLyBBZGQgc29tZSBkaW1lbnNpb25zIHNvIHRoZSBlbGVtZW50IGhhcyBhbiBgaW5uZXJUZXh0YCB3aGljaCBzb21lIHBlb3BsZSBkZXBlbmQgb24gaW4gdGVzdHMuXG4gICAgbWluLXdpZHRoOiAxcHg7XG4gICAgbWluLWhlaWdodDogMXB4O1xuICB9XG5cbiAgLy8gVXNlZCB3aGVuIGRpc2FibGluZyBnbG9iYWwgc2Nyb2xsaW5nLlxuICAuY2RrLWdsb2JhbC1zY3JvbGxibG9jayB7XG4gICAgcG9zaXRpb246IGZpeGVkO1xuXG4gICAgLy8gTmVjZXNzYXJ5IGZvciB0aGUgY29udGVudCBub3QgdG8gbG9zZSBpdHMgd2lkdGguIE5vdGUgdGhhdCB3ZSdyZSB1c2luZyAxMDAlLCBpbnN0ZWFkIG9mXG4gICAgLy8gMTAwdncsIGJlY2F1c2UgMTAwdncgaW5jbHVkZXMgdGhlIHdpZHRoIHBsdXMgdGhlIHNjcm9sbGJhciwgd2hlcmVhcyAxMDAlIGlzIHRoZSB3aWR0aFxuICAgIC8vIHRoYXQgdGhlIGVsZW1lbnQgaGFkIGJlZm9yZSB3ZSBtYWRlIGl0IGBmaXhlZGAuXG4gICAgd2lkdGg6IDEwMCU7XG5cbiAgICAvLyBOb3RlOiB0aGlzIHdpbGwgYWx3YXlzIGFkZCBhIHNjcm9sbGJhciB0byB3aGF0ZXZlciBlbGVtZW50IGl0IGlzIG9uLCB3aGljaCBjYW5cbiAgICAvLyBwb3RlbnRpYWxseSByZXN1bHQgaW4gZG91YmxlIHNjcm9sbGJhcnMuIEl0IHNob3VsZG4ndCBiZSBhbiBpc3N1ZSwgYmVjYXVzZSB3ZSB3b24ndFxuICAgIC8vIGJsb2NrIHNjcm9sbGluZyBvbiBhIHBhZ2UgdGhhdCBkb2Vzbid0IGhhdmUgYSBzY3JvbGxiYXIgaW4gdGhlIGZpcnN0IHBsYWNlLlxuICAgIG92ZXJmbG93LXk6IHNjcm9sbDtcbiAgfVxufVxuXG5AbWl4aW4gY2RrLWExMXkge1xuICAuY2RrLXZpc3VhbGx5LWhpZGRlbiB7XG4gICAgYm9yZGVyOiAwO1xuICAgIGNsaXA6IHJlY3QoMCAwIDAgMCk7XG4gICAgaGVpZ2h0OiAxcHg7XG4gICAgbWFyZ2luOiAtMXB4O1xuICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgcGFkZGluZzogMDtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgd2lkdGg6IDFweDtcblxuICAgIC8vIEF2b2lkIGJyb3dzZXJzIHJlbmRlcmluZyB0aGUgZm9jdXMgcmluZyBpbiBzb21lIGNhc2VzLlxuICAgIG91dGxpbmU6IDA7XG5cbiAgICAvLyBBdm9pZCBzb21lIGNhc2VzIHdoZXJlIHRoZSBicm93c2VyIHdpbGwgc3RpbGwgcmVuZGVyIHRoZSBuYXRpdmUgY29udHJvbHMgKHNlZSAjOTA0OSkuXG4gICAgLXdlYmtpdC1hcHBlYXJhbmNlOiBub25lO1xuICAgIC1tb3otYXBwZWFyYW5jZTogbm9uZTtcbiAgfVxufVxuXG4vLyBBcHBsaWVzIHN0eWxlcyBmb3IgdXNlcnMgaW4gaGlnaCBjb250cmFzdCBtb2RlLiBOb3RlIHRoYXQgdGhpcyBvbmx5IGFwcGxpZXNcbi8vIHRvIE1pY3Jvc29mdCBicm93c2Vycy4gQ2hyb21lIGNhbiBiZSBpbmNsdWRlZCBieSBjaGVja2luZyBmb3IgdGhlIGBodG1sW2hjXWBcbi8vIGF0dHJpYnV0ZSwgaG93ZXZlciBDaHJvbWUgaGFuZGxlcyBoaWdoIGNvbnRyYXN0IGRpZmZlcmVudGx5LlxuLy9cbi8vIEBwYXJhbSB0YXJnZXQgV2hpY2gga2luZCBvZiBoaWdoIGNvbnRyYXN0IHNldHRpbmcgdG8gdGFyZ2V0LiBEZWZhdWx0cyB0byBgYWN0aXZlYCwgY2FuIGJlXG4vLyAgICBgd2hpdGUtb24tYmxhY2tgIG9yIGBibGFjay1vbi13aGl0ZWAuXG5AbWl4aW4gY2RrLWhpZ2gtY29udHJhc3QoJHRhcmdldDogYWN0aXZlKSB7XG4gIEBtZWRpYSAoLW1zLWhpZ2gtY29udHJhc3Q6ICR0YXJnZXQpIHtcbiAgICBAY29udGVudDtcbiAgfVxufVxuXG4vLyBDb3JlIHN0eWxlcyB0aGF0IGVuYWJsZSBtb25pdG9yaW5nIGF1dG9maWxsIHN0YXRlIG9mIHRleHQgZmllbGRzLlxuQG1peGluIGNkay10ZXh0LWZpZWxkIHtcbiAgLy8gS2V5ZnJhbWVzIHRoYXQgYXBwbHkgbm8gc3R5bGVzLCBidXQgYWxsb3cgdXMgdG8gbW9uaXRvciB3aGVuIGFuIHRleHQgZmllbGQgYmVjb21lcyBhdXRvZmlsbGVkXG4gIC8vIGJ5IHdhdGNoaW5nIGZvciB0aGUgYW5pbWF0aW9uIGV2ZW50cyB0aGF0IGFyZSBmaXJlZCB3aGVuIHRoZXkgc3RhcnQuIE5vdGU6IHRoZSAvKiEqLyBjb21tZW50IGlzXG4gIC8vIG5lZWRlZCB0byBwcmV2ZW50IExpYlNhc3MgZnJvbSBzdHJpcHBpbmcgdGhlIGtleWZyYW1lcyBvdXQuXG4gIC8vIEJhc2VkIG9uOiBodHRwczovL21lZGl1bS5jb20vQGJydW5uL2RldGVjdGluZy1hdXRvZmlsbGVkLWZpZWxkcy1pbi1qYXZhc2NyaXB0LWFlZDU5OGQyNWRhN1xuICBAa2V5ZnJhbWVzIGNkay10ZXh0LWZpZWxkLWF1dG9maWxsLXN0YXJ0IHsvKiEqL31cbiAgQGtleWZyYW1lcyBjZGstdGV4dC1maWVsZC1hdXRvZmlsbC1lbmQgey8qISovfVxuXG4gIC5jZGstdGV4dC1maWVsZC1hdXRvZmlsbC1tb25pdG9yZWQ6LXdlYmtpdC1hdXRvZmlsbCB7XG4gICAgYW5pbWF0aW9uLW5hbWU6IGNkay10ZXh0LWZpZWxkLWF1dG9maWxsLXN0YXJ0O1xuICB9XG5cbiAgLmNkay10ZXh0LWZpZWxkLWF1dG9maWxsLW1vbml0b3JlZDpub3QoOi13ZWJraXQtYXV0b2ZpbGwpIHtcbiAgICBhbmltYXRpb24tbmFtZTogY2RrLXRleHQtZmllbGQtYXV0b2ZpbGwtZW5kO1xuICB9XG5cbiAgLy8gUmVtb3ZlIHRoZSByZXNpemUgaGFuZGxlIG9uIGF1dG9zaXppbmcgdGV4dGFyZWFzLCBiZWNhdXNlIHdoYXRldmVyIGhlaWdodFxuICAvLyB0aGUgdXNlciByZXNpemVkIHRvIHdpbGwgYmUgb3ZlcndyaXR0ZW4gb25jZSB0aGV5IHN0YXJ0IHR5cGluZyBhZ2Fpbi5cbiAgdGV4dGFyZWEuY2RrLXRleHRhcmVhLWF1dG9zaXplIHtcbiAgICByZXNpemU6IG5vbmU7XG4gIH1cblxuICAvLyBUaGlzIGNsYXNzIGlzIHRlbXBvcmFyaWx5IGFwcGxpZWQgdG8gdGhlIHRleHRhcmVhIHdoZW4gaXQgaXMgYmVpbmcgbWVhc3VyZWQuIEl0IGlzIGltbWVkaWF0ZWx5XG4gIC8vIHJlbW92ZWQgd2hlbiBtZWFzdXJpbmcgaXMgY29tcGxldGUuIFdlIHVzZSBgIWltcG9ydGFudGAgcnVsZXMgaGVyZSB0byBtYWtlIHN1cmUgdXNlci1zcGVjaWZpZWRcbiAgLy8gcnVsZXMgZG8gbm90IGludGVyZmVyZSB3aXRoIHRoZSBtZWFzdXJlbWVudC5cbiAgdGV4dGFyZWEuY2RrLXRleHRhcmVhLWF1dG9zaXplLW1lYXN1cmluZyB7XG4gICAgaGVpZ2h0OiBhdXRvICFpbXBvcnRhbnQ7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbiAhaW1wb3J0YW50O1xuICAgIC8vIEhhdmluZyAycHggdG9wIGFuZCBib3R0b20gcGFkZGluZyBzZWVtcyB0byBmaXggYSBidWcgd2hlcmUgQ2hyb21lIGdldHMgYW4gaW5jb3JyZWN0XG4gICAgLy8gbWVhc3VyZW1lbnQuIFdlIGp1c3QgaGF2ZSB0byBhY2NvdW50IGZvciBpdCBsYXRlciBhbmQgc3VidHJhY3QgaXQgb2ZmIHRoZSBmaW5hbCByZXN1bHQuXG4gICAgcGFkZGluZzogMnB4IDAgIWltcG9ydGFudDtcbiAgICBib3gtc2l6aW5nOiBjb250ZW50LWJveCAhaW1wb3J0YW50O1xuICB9XG59XG5cbi8vIFVzZWQgdG8gZ2VuZXJhdGUgVUlEcyBmb3Iga2V5ZnJhbWVzIHVzZWQgdG8gY2hhbmdlIHRoZSB0ZXh0IGZpZWxkIGF1dG9maWxsIHN0eWxlcy5cbiRjZGstdGV4dC1maWVsZC1hdXRvZmlsbC1jb2xvci1mcmFtZS1jb3VudDogMDtcblxuLy8gTWl4aW4gdXNlZCB0byBhcHBseSBjdXN0b20gYmFja2dyb3VuZCBhbmQgZm9yZWdyb3VuZCBjb2xvcnMgdG8gYW4gYXV0b2ZpbGxlZCB0ZXh0IGZpZWxkLlxuLy8gQmFzZWQgb246IGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzI3ODE1NDkvXG4vLyByZW1vdmluZy1pbnB1dC1iYWNrZ3JvdW5kLWNvbG91ci1mb3ItY2hyb21lLWF1dG9jb21wbGV0ZSNhbnN3ZXItMzc0MzIyNjBcbkBtaXhpbiBjZGstdGV4dC1maWVsZC1hdXRvZmlsbC1jb2xvcigkYmFja2dyb3VuZCwgJGZvcmVncm91bmQ6JycpIHtcbiAgQGtleWZyYW1lcyBjZGstdGV4dC1maWVsZC1hdXRvZmlsbC1jb2xvci0jeyRjZGstdGV4dC1maWVsZC1hdXRvZmlsbC1jb2xvci1mcmFtZS1jb3VudH0ge1xuICAgIHRvIHtcbiAgICAgIGJhY2tncm91bmQ6ICRiYWNrZ3JvdW5kO1xuICAgICAgQGlmICRmb3JlZ3JvdW5kICE9ICcnIHsgY29sb3I6ICRmb3JlZ3JvdW5kOyB9XG4gICAgfVxuICB9XG5cbiAgJjotd2Via2l0LWF1dG9maWxsIHtcbiAgICBhbmltYXRpb24tbmFtZTogY2RrLXRleHQtZmllbGQtYXV0b2ZpbGwtY29sb3ItI3skY2RrLXRleHQtZmllbGQtYXV0b2ZpbGwtY29sb3ItZnJhbWUtY291bnR9O1xuICAgIGFuaW1hdGlvbi1maWxsLW1vZGU6IGJvdGg7XG4gIH1cblxuICAmLmNkay10ZXh0LWZpZWxkLWF1dG9maWxsLW1vbml0b3JlZDotd2Via2l0LWF1dG9maWxsIHtcbiAgICBhbmltYXRpb24tbmFtZTogY2RrLXRleHQtZmllbGQtYXV0b2ZpbGwtc3RhcnQsXG4gICAgICAgICAgICAgICAgICAgIGNkay10ZXh0LWZpZWxkLWF1dG9maWxsLWNvbG9yLSN7JGNkay10ZXh0LWZpZWxkLWF1dG9maWxsLWNvbG9yLWZyYW1lLWNvdW50fTtcbiAgfVxuXG4gICRjZGstdGV4dC1maWVsZC1hdXRvZmlsbC1jb2xvci1mcmFtZS1jb3VudDpcbiAgICAgICRjZGstdGV4dC1maWVsZC1hdXRvZmlsbC1jb2xvci1mcmFtZS1jb3VudCArIDEgIWdsb2JhbDtcbn1cblxuXG4vLyBDb3JlIHN0eWxlcyB0aGF0IGNhbiBiZSB1c2VkIHRvIGFwcGx5IG1hdGVyaWFsIGRlc2lnbiB0cmVhdG1lbnRzIHRvIGFueSBlbGVtZW50LlxuLy8gTWVkaWEgcXVlcmllc1xuLy8gVE9ETyhqb3NlcGhwZXJyb3R0KTogQ2hhbmdlICRtYXQteHNtYWxsIGFuZCAkbWF0LXNtYWxsIHVzYWdlcyB0byByZWx5IG9uIEJyZWFrcG9pbnRPYnNlcnZlcixcbiRtYXQteHNtYWxsOiAnbWF4LXdpZHRoOiA1OTlweCc7XG4kbWF0LXNtYWxsOiAnbWF4LXdpZHRoOiA5NTlweCc7XG5cbi8vIFRPRE86IFJldmlzaXQgYWxsIHotaW5kaWNlcyBiZWZvcmUgYmV0YVxuLy8gei1pbmRleCBtYXN0ZXIgbGlzdFxuXG4kei1pbmRleC1mYWI6IDIwICFkZWZhdWx0O1xuJHotaW5kZXgtZHJhd2VyOiAxMDAgIWRlZmF1bHQ7XG5cbi8vIEdsb2JhbCBjb25zdGFudHNcbiRwaTogMy4xNDE1OTI2NTtcblxuLy8gUGFkZGluZyBiZXR3ZWVuIGlucHV0IHRvZ2dsZXMgYW5kIHRoZWlyIGxhYmVsc1xuJG1hdC10b2dnbGUtcGFkZGluZzogOHB4ICFkZWZhdWx0O1xuLy8gV2lkdGggYW5kIGhlaWdodCBvZiBpbnB1dCB0b2dnbGVzXG4kbWF0LXRvZ2dsZS1zaXplOiAyMHB4ICFkZWZhdWx0O1xuXG4vLyBFYXNpbmcgQ3VydmVzXG4vLyBUT0RPKGplbGJvdXJuKTogYWxsIG9mIHRoZXNlIG5lZWQgdG8gYmUgcmV2aXNpdGVkXG5cbi8vIFRoZSBkZWZhdWx0IGFuaW1hdGlvbiBjdXJ2ZXMgdXNlZCBieSBtYXRlcmlhbCBkZXNpZ24uXG4kbWF0LWxpbmVhci1vdXQtc2xvdy1pbi10aW1pbmctZnVuY3Rpb246IGN1YmljLWJlemllcigwLCAwLCAwLjIsIDAuMSkgIWRlZmF1bHQ7XG4kbWF0LWZhc3Qtb3V0LXNsb3ctaW4tdGltaW5nLWZ1bmN0aW9uOiBjdWJpYy1iZXppZXIoMC40LCAwLCAwLjIsIDEpICFkZWZhdWx0O1xuJG1hdC1mYXN0LW91dC1saW5lYXItaW4tdGltaW5nLWZ1bmN0aW9uOiBjdWJpYy1iZXppZXIoMC40LCAwLCAxLCAxKSAhZGVmYXVsdDtcblxuJGVhc2UtaW4tb3V0LWN1cnZlLWZ1bmN0aW9uOiBjdWJpYy1iZXppZXIoMC4zNSwgMCwgMC4yNSwgMSkgIWRlZmF1bHQ7XG5cbiRzd2lmdC1lYXNlLW91dC1kdXJhdGlvbjogNDAwbXMgIWRlZmF1bHQ7XG4kc3dpZnQtZWFzZS1vdXQtdGltaW5nLWZ1bmN0aW9uOiBjdWJpYy1iZXppZXIoMC4yNSwgMC44LCAwLjI1LCAxKSAhZGVmYXVsdDtcbiRzd2lmdC1lYXNlLW91dDogYWxsICRzd2lmdC1lYXNlLW91dC1kdXJhdGlvbiAkc3dpZnQtZWFzZS1vdXQtdGltaW5nLWZ1bmN0aW9uICFkZWZhdWx0O1xuXG4kc3dpZnQtZWFzZS1pbi1kdXJhdGlvbjogMzAwbXMgIWRlZmF1bHQ7XG4kc3dpZnQtZWFzZS1pbi10aW1pbmctZnVuY3Rpb246IGN1YmljLWJlemllcigwLjU1LCAwLCAwLjU1LCAwLjIpICFkZWZhdWx0O1xuJHN3aWZ0LWVhc2UtaW46IGFsbCAkc3dpZnQtZWFzZS1pbi1kdXJhdGlvbiAkc3dpZnQtZWFzZS1pbi10aW1pbmctZnVuY3Rpb24gIWRlZmF1bHQ7XG5cbiRzd2lmdC1lYXNlLWluLW91dC1kdXJhdGlvbjogNTAwbXMgIWRlZmF1bHQ7XG4kc3dpZnQtZWFzZS1pbi1vdXQtdGltaW5nLWZ1bmN0aW9uOiAkZWFzZS1pbi1vdXQtY3VydmUtZnVuY3Rpb24gIWRlZmF1bHQ7XG4kc3dpZnQtZWFzZS1pbi1vdXQ6IGFsbCAkc3dpZnQtZWFzZS1pbi1vdXQtZHVyYXRpb24gJHN3aWZ0LWVhc2UtaW4tb3V0LXRpbWluZy1mdW5jdGlvbiAhZGVmYXVsdDtcblxuJHN3aWZ0LWxpbmVhci1kdXJhdGlvbjogODBtcyAhZGVmYXVsdDtcbiRzd2lmdC1saW5lYXItdGltaW5nLWZ1bmN0aW9uOiBsaW5lYXIgIWRlZmF1bHQ7XG4kc3dpZnQtbGluZWFyOiBhbGwgJHN3aWZ0LWxpbmVhci1kdXJhdGlvbiAkc3dpZnQtbGluZWFyLXRpbWluZy1mdW5jdGlvbiAhZGVmYXVsdDtcblxuXG5cbi8vIEEgY29sbGVjdGlvbiBvZiBtaXhpbnMgYW5kIENTUyBjbGFzc2VzIHRoYXQgY2FuIGJlIHVzZWQgdG8gYXBwbHkgZWxldmF0aW9uIHRvIGEgbWF0ZXJpYWxcbi8vIGVsZW1lbnQuXG4vLyBTZWU6IGh0dHBzOi8vbWF0ZXJpYWwuaW8vZGVzaWduL2Vudmlyb25tZW50L2VsZXZhdGlvbi5odG1sXG4vLyBFeGFtcGxlczpcbi8vXG4vL1xuLy8gLm1hdC1mb28ge1xuLy8gICBAaW5jbHVkZSAkbWF0LWVsZXZhdGlvbigyKTtcbi8vXG4vLyAgICY6YWN0aXZlIHtcbi8vICAgICBAaW5jbHVkZSAkbWF0LWVsZXZhdGlvbig4KTtcbi8vICAgfVxuLy8gfVxuLy9cbi8vIDxkaXYgaWQ9XCJleHRlcm5hbC1jYXJkXCIgY2xhc3M9XCJtYXQtZWxldmF0aW9uLXoyXCI+PHA+U29tZSBjb250ZW50PC9wPjwvZGl2PlxuLy9cbi8vIEZvciBhbiBleHBsYW5hdGlvbiBvZiB0aGUgZGVzaWduIGJlaGluZCBob3cgZWxldmF0aW9uIGlzIGltcGxlbWVudGVkLCBzZWUgdGhlIGRlc2lnbiBkb2MgYXRcbi8vIGh0dHBzOi8vZ29vLmdsL0txMGs5Wi5cblxuLy8gQ29sb3JzIGZvciB1bWJyYSwgcGVudW1icmEsIGFuZCBhbWJpZW50IHNoYWRvd3MuIEFzIGRlc2NyaWJlZCBpbiB0aGUgZGVzaWduIGRvYywgZWFjaCBlbGV2YXRpb25cbi8vIGxldmVsIGlzIGNyZWF0ZWQgdXNpbmcgYSBzZXQgb2YgMyBzaGFkb3cgdmFsdWVzLCBvbmUgZm9yIHVtYnJhICh0aGUgc2hhZG93IHJlcHJlc2VudGluZyB0aGVcbi8vIHNwYWNlIGNvbXBsZXRlbHkgb2JzY3VyZWQgYnkgYW4gb2JqZWN0IHJlbGF0aXZlIHRvIGl0cyBsaWdodCBzb3VyY2UpLCBvbmUgZm9yIHBlbnVtYnJhICh0aGVcbi8vIHNwYWNlIHBhcnRpYWxseSBvYnNjdXJlZCBieSBhbiBvYmplY3QpLCBhbmQgb25lIGZvciBhbWJpZW50ICh0aGUgc3BhY2Ugd2hpY2ggY29udGFpbnMgdGhlIG9iamVjdFxuLy8gaXRzZWxmKS4gRm9yIGEgZnVydGhlciBleHBsYW5hdGlvbiBvZiB0aGVzZSB0ZXJtcyBhbmQgdGhlaXIgbWVhbmluZ3MsIHNlZVxuLy8gaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvVW1icmEsX3BlbnVtYnJhX2FuZF9hbnR1bWJyYS5cblxuLy8gTWFwcyBmb3IgdGhlIGRpZmZlcmVudCBzaGFkb3cgc2V0cyBhbmQgdGhlaXIgdmFsdWVzIHdpdGhpbiBlYWNoIHotc3BhY2UuIFRoZXNlIHZhbHVlcyB3ZXJlXG4vLyBjcmVhdGVkIGJ5IHRha2luZyBhIGZldyByZWZlcmVuY2Ugc2hhZG93IHNldHMgY3JlYXRlZCBieSBHb29nbGUncyBEZXNpZ25lcnMgYW5kIGludGVycG9sYXRpbmdcbi8vIGFsbCBvZiB0aGUgdmFsdWVzIGJldHdlZW4gdGhlbS5cblxuQGZ1bmN0aW9uIF9nZXQtdW1icmEtbWFwKCRjb2xvciwgJG9wYWNpdHkpIHtcbiAgJHNoYWRvdy1jb2xvcjogaWYodHlwZS1vZigkY29sb3IpID09IGNvbG9yLCByZ2JhKCRjb2xvciwgJG9wYWNpdHkgKiAwLjIpLCAkY29sb3IpO1xuXG4gIEByZXR1cm4gKFxuICAgIDA6ICcwcHggMHB4IDBweCAwcHggI3skc2hhZG93LWNvbG9yfScsXG4gICAgMTogJzBweCAycHggMXB4IC0xcHggI3skc2hhZG93LWNvbG9yfScsXG4gICAgMjogJzBweCAzcHggMXB4IC0ycHggI3skc2hhZG93LWNvbG9yfScsXG4gICAgMzogJzBweCAzcHggM3B4IC0ycHggI3skc2hhZG93LWNvbG9yfScsXG4gICAgNDogJzBweCAycHggNHB4IC0xcHggI3skc2hhZG93LWNvbG9yfScsXG4gICAgNTogJzBweCAzcHggNXB4IC0xcHggI3skc2hhZG93LWNvbG9yfScsXG4gICAgNjogJzBweCAzcHggNXB4IC0xcHggI3skc2hhZG93LWNvbG9yfScsXG4gICAgNzogJzBweCA0cHggNXB4IC0ycHggI3skc2hhZG93LWNvbG9yfScsXG4gICAgODogJzBweCA1cHggNXB4IC0zcHggI3skc2hhZG93LWNvbG9yfScsXG4gICAgOTogJzBweCA1cHggNnB4IC0zcHggI3skc2hhZG93LWNvbG9yfScsXG4gICAgMTA6ICcwcHggNnB4IDZweCAtM3B4ICN7JHNoYWRvdy1jb2xvcn0nLFxuICAgIDExOiAnMHB4IDZweCA3cHggLTRweCAjeyRzaGFkb3ctY29sb3J9JyxcbiAgICAxMjogJzBweCA3cHggOHB4IC00cHggI3skc2hhZG93LWNvbG9yfScsXG4gICAgMTM6ICcwcHggN3B4IDhweCAtNHB4ICN7JHNoYWRvdy1jb2xvcn0nLFxuICAgIDE0OiAnMHB4IDdweCA5cHggLTRweCAjeyRzaGFkb3ctY29sb3J9JyxcbiAgICAxNTogJzBweCA4cHggOXB4IC01cHggI3skc2hhZG93LWNvbG9yfScsXG4gICAgMTY6ICcwcHggOHB4IDEwcHggLTVweCAjeyRzaGFkb3ctY29sb3J9JyxcbiAgICAxNzogJzBweCA4cHggMTFweCAtNXB4ICN7JHNoYWRvdy1jb2xvcn0nLFxuICAgIDE4OiAnMHB4IDlweCAxMXB4IC01cHggI3skc2hhZG93LWNvbG9yfScsXG4gICAgMTk6ICcwcHggOXB4IDEycHggLTZweCAjeyRzaGFkb3ctY29sb3J9JyxcbiAgICAyMDogJzBweCAxMHB4IDEzcHggLTZweCAjeyRzaGFkb3ctY29sb3J9JyxcbiAgICAyMTogJzBweCAxMHB4IDEzcHggLTZweCAjeyRzaGFkb3ctY29sb3J9JyxcbiAgICAyMjogJzBweCAxMHB4IDE0cHggLTZweCAjeyRzaGFkb3ctY29sb3J9JyxcbiAgICAyMzogJzBweCAxMXB4IDE0cHggLTdweCAjeyRzaGFkb3ctY29sb3J9JyxcbiAgICAyNDogJzBweCAxMXB4IDE1cHggLTdweCAjeyRzaGFkb3ctY29sb3J9J1xuICApO1xufVxuXG5AZnVuY3Rpb24gX2dldC1wZW51bWJyYS1tYXAoJGNvbG9yLCAkb3BhY2l0eSkge1xuICAkc2hhZG93LWNvbG9yOiBpZih0eXBlLW9mKCRjb2xvcikgPT0gY29sb3IsIHJnYmEoJGNvbG9yLCAkb3BhY2l0eSAqIDAuMTQpLCAkY29sb3IpO1xuXG4gIEByZXR1cm4gKFxuICAgIDA6ICcwcHggMHB4IDBweCAwcHggI3skc2hhZG93LWNvbG9yfScsXG4gICAgMTogJzBweCAxcHggMXB4IDBweCAjeyRzaGFkb3ctY29sb3J9JyxcbiAgICAyOiAnMHB4IDJweCAycHggMHB4ICN7JHNoYWRvdy1jb2xvcn0nLFxuICAgIDM6ICcwcHggM3B4IDRweCAwcHggI3skc2hhZG93LWNvbG9yfScsXG4gICAgNDogJzBweCA0cHggNXB4IDBweCAjeyRzaGFkb3ctY29sb3J9JyxcbiAgICA1OiAnMHB4IDVweCA4cHggMHB4ICN7JHNoYWRvdy1jb2xvcn0nLFxuICAgIDY6ICcwcHggNnB4IDEwcHggMHB4ICN7JHNoYWRvdy1jb2xvcn0nLFxuICAgIDc6ICcwcHggN3B4IDEwcHggMXB4ICN7JHNoYWRvdy1jb2xvcn0nLFxuICAgIDg6ICcwcHggOHB4IDEwcHggMXB4ICN7JHNoYWRvdy1jb2xvcn0nLFxuICAgIDk6ICcwcHggOXB4IDEycHggMXB4ICN7JHNoYWRvdy1jb2xvcn0nLFxuICAgIDEwOiAnMHB4IDEwcHggMTRweCAxcHggI3skc2hhZG93LWNvbG9yfScsXG4gICAgMTE6ICcwcHggMTFweCAxNXB4IDFweCAjeyRzaGFkb3ctY29sb3J9JyxcbiAgICAxMjogJzBweCAxMnB4IDE3cHggMnB4ICN7JHNoYWRvdy1jb2xvcn0nLFxuICAgIDEzOiAnMHB4IDEzcHggMTlweCAycHggI3skc2hhZG93LWNvbG9yfScsXG4gICAgMTQ6ICcwcHggMTRweCAyMXB4IDJweCAjeyRzaGFkb3ctY29sb3J9JyxcbiAgICAxNTogJzBweCAxNXB4IDIycHggMnB4ICN7JHNoYWRvdy1jb2xvcn0nLFxuICAgIDE2OiAnMHB4IDE2cHggMjRweCAycHggI3skc2hhZG93LWNvbG9yfScsXG4gICAgMTc6ICcwcHggMTdweCAyNnB4IDJweCAjeyRzaGFkb3ctY29sb3J9JyxcbiAgICAxODogJzBweCAxOHB4IDI4cHggMnB4ICN7JHNoYWRvdy1jb2xvcn0nLFxuICAgIDE5OiAnMHB4IDE5cHggMjlweCAycHggI3skc2hhZG93LWNvbG9yfScsXG4gICAgMjA6ICcwcHggMjBweCAzMXB4IDNweCAjeyRzaGFkb3ctY29sb3J9JyxcbiAgICAyMTogJzBweCAyMXB4IDMzcHggM3B4ICN7JHNoYWRvdy1jb2xvcn0nLFxuICAgIDIyOiAnMHB4IDIycHggMzVweCAzcHggI3skc2hhZG93LWNvbG9yfScsXG4gICAgMjM6ICcwcHggMjNweCAzNnB4IDNweCAjeyRzaGFkb3ctY29sb3J9JyxcbiAgICAyNDogJzBweCAyNHB4IDM4cHggM3B4ICN7JHNoYWRvdy1jb2xvcn0nXG4gICk7XG59XG5cbkBmdW5jdGlvbiBfZ2V0LWFtYmllbnQtbWFwKCRjb2xvciwgJG9wYWNpdHkpIHtcbiAgJHNoYWRvdy1jb2xvcjogaWYodHlwZS1vZigkY29sb3IpID09IGNvbG9yLCByZ2JhKCRjb2xvciwgJG9wYWNpdHkgKiAwLjEyKSwgJGNvbG9yKTtcblxuICBAcmV0dXJuIChcbiAgICAwOiAnMHB4IDBweCAwcHggMHB4ICN7JHNoYWRvdy1jb2xvcn0nLFxuICAgIDE6ICcwcHggMXB4IDNweCAwcHggI3skc2hhZG93LWNvbG9yfScsXG4gICAgMjogJzBweCAxcHggNXB4IDBweCAjeyRzaGFkb3ctY29sb3J9JyxcbiAgICAzOiAnMHB4IDFweCA4cHggMHB4ICN7JHNoYWRvdy1jb2xvcn0nLFxuICAgIDQ6ICcwcHggMXB4IDEwcHggMHB4ICN7JHNoYWRvdy1jb2xvcn0nLFxuICAgIDU6ICcwcHggMXB4IDE0cHggMHB4ICN7JHNoYWRvdy1jb2xvcn0nLFxuICAgIDY6ICcwcHggMXB4IDE4cHggMHB4ICN7JHNoYWRvdy1jb2xvcn0nLFxuICAgIDc6ICcwcHggMnB4IDE2cHggMXB4ICN7JHNoYWRvdy1jb2xvcn0nLFxuICAgIDg6ICcwcHggM3B4IDE0cHggMnB4ICN7JHNoYWRvdy1jb2xvcn0nLFxuICAgIDk6ICcwcHggM3B4IDE2cHggMnB4ICN7JHNoYWRvdy1jb2xvcn0nLFxuICAgIDEwOiAnMHB4IDRweCAxOHB4IDNweCAjeyRzaGFkb3ctY29sb3J9JyxcbiAgICAxMTogJzBweCA0cHggMjBweCAzcHggI3skc2hhZG93LWNvbG9yfScsXG4gICAgMTI6ICcwcHggNXB4IDIycHggNHB4ICN7JHNoYWRvdy1jb2xvcn0nLFxuICAgIDEzOiAnMHB4IDVweCAyNHB4IDRweCAjeyRzaGFkb3ctY29sb3J9JyxcbiAgICAxNDogJzBweCA1cHggMjZweCA0cHggI3skc2hhZG93LWNvbG9yfScsXG4gICAgMTU6ICcwcHggNnB4IDI4cHggNXB4ICN7JHNoYWRvdy1jb2xvcn0nLFxuICAgIDE2OiAnMHB4IDZweCAzMHB4IDVweCAjeyRzaGFkb3ctY29sb3J9JyxcbiAgICAxNzogJzBweCA2cHggMzJweCA1cHggI3skc2hhZG93LWNvbG9yfScsXG4gICAgMTg6ICcwcHggN3B4IDM0cHggNnB4ICN7JHNoYWRvdy1jb2xvcn0nLFxuICAgIDE5OiAnMHB4IDdweCAzNnB4IDZweCAjeyRzaGFkb3ctY29sb3J9JyxcbiAgICAyMDogJzBweCA4cHggMzhweCA3cHggI3skc2hhZG93LWNvbG9yfScsXG4gICAgMjE6ICcwcHggOHB4IDQwcHggN3B4ICN7JHNoYWRvdy1jb2xvcn0nLFxuICAgIDIyOiAnMHB4IDhweCA0MnB4IDdweCAjeyRzaGFkb3ctY29sb3J9JyxcbiAgICAyMzogJzBweCA5cHggNDRweCA4cHggI3skc2hhZG93LWNvbG9yfScsXG4gICAgMjQ6ICcwcHggOXB4IDQ2cHggOHB4ICN7JHNoYWRvdy1jb2xvcn0nXG4gICk7XG59XG5cbi8vIFRoZSBkZWZhdWx0IGR1cmF0aW9uIHZhbHVlIGZvciBlbGV2YXRpb24gdHJhbnNpdGlvbnMuXG4kbWF0LWVsZXZhdGlvbi10cmFuc2l0aW9uLWR1cmF0aW9uOiAyODBtcyAhZGVmYXVsdDtcblxuLy8gVGhlIGRlZmF1bHQgZWFzaW5nIHZhbHVlIGZvciBlbGV2YXRpb24gdHJhbnNpdGlvbnMuXG4kbWF0LWVsZXZhdGlvbi10cmFuc2l0aW9uLXRpbWluZy1mdW5jdGlvbjogJG1hdC1mYXN0LW91dC1zbG93LWluLXRpbWluZy1mdW5jdGlvbjtcblxuLy8gVGhlIGRlZmF1bHQgY29sb3IgZm9yIGVsZXZhdGlvbiBzaGFkb3dzLlxuJG1hdC1lbGV2YXRpb24tY29sb3I6IGJsYWNrICFkZWZhdWx0O1xuXG4vLyBUaGUgZGVmYXVsdCBvcGFjaXR5IHNjYWxpbmcgdmFsdWUgZm9yIGVsZXZhdGlvbiBzaGFkb3dzLlxuJG1hdC1lbGV2YXRpb24tb3BhY2l0eTogMSAhZGVmYXVsdDtcblxuLy8gUHJlZml4IGZvciBlbGV2YXRpb24tcmVsYXRlZCBzZWxlY3RvcnMuXG4kX21hdC1lbGV2YXRpb24tcHJlZml4OiAnbWF0LWVsZXZhdGlvbi16JztcblxuLy8gQXBwbGllcyB0aGUgY29ycmVjdCBjc3MgcnVsZXMgdG8gYW4gZWxlbWVudCB0byBnaXZlIGl0IHRoZSBlbGV2YXRpb24gc3BlY2lmaWVkIGJ5ICR6VmFsdWUuXG4vLyBUaGUgJHpWYWx1ZSBtdXN0IGJlIGJldHdlZW4gMCBhbmQgMjQuXG5AbWl4aW4gbWF0LWVsZXZhdGlvbigkelZhbHVlLCAkY29sb3I6ICRtYXQtZWxldmF0aW9uLWNvbG9yLCAkb3BhY2l0eTogJG1hdC1lbGV2YXRpb24tb3BhY2l0eSkge1xuICBAaWYgdHlwZS1vZigkelZhbHVlKSAhPSBudW1iZXIgb3Igbm90IHVuaXRsZXNzKCR6VmFsdWUpIHtcbiAgICBAZXJyb3IgJyR6VmFsdWUgbXVzdCBiZSBhIHVuaXRsZXNzIG51bWJlcic7XG4gIH1cbiAgQGlmICR6VmFsdWUgPCAwIG9yICR6VmFsdWUgPiAyNCB7XG4gICAgQGVycm9yICckelZhbHVlIG11c3QgYmUgYmV0d2VlbiAwIGFuZCAyNCc7XG4gIH1cblxuICBib3gtc2hhZG93OiAje21hcC1nZXQoX2dldC11bWJyYS1tYXAoJGNvbG9yLCAkb3BhY2l0eSksICR6VmFsdWUpfSxcbiAgICAgICAgICAgICAgI3ttYXAtZ2V0KF9nZXQtcGVudW1icmEtbWFwKCRjb2xvciwgJG9wYWNpdHkpLCAkelZhbHVlKX0sXG4gICAgICAgICAgICAgICN7bWFwLWdldChfZ2V0LWFtYmllbnQtbWFwKCRjb2xvciwgJG9wYWNpdHkpLCAkelZhbHVlKX07XG59XG5cbkBtaXhpbiBfbWF0LXRoZW1lLWVsZXZhdGlvbigkelZhbHVlLCAkdGhlbWUsICRvcGFjaXR5OiAkbWF0LWVsZXZhdGlvbi1vcGFjaXR5KSB7XG4gICRmb3JlZ3JvdW5kOiBtYXAtZ2V0KCR0aGVtZSwgZm9yZWdyb3VuZCk7XG4gICRlbGV2YXRpb24tY29sb3I6IG1hcC1nZXQoJGZvcmVncm91bmQsIGVsZXZhdGlvbik7XG4gICRlbGV2YXRpb24tY29sb3Itb3ItZGVmYXVsdDogaWYoJGVsZXZhdGlvbi1jb2xvciA9PSBudWxsLCAkbWF0LWVsZXZhdGlvbi1jb2xvciwgJGVsZXZhdGlvbi1jb2xvcik7XG5cbiAgQGluY2x1ZGUgbWF0LWVsZXZhdGlvbigkelZhbHVlLCAkZWxldmF0aW9uLWNvbG9yLW9yLWRlZmF1bHQsICRvcGFjaXR5KTtcbn1cblxuLy8gQXBwbGllcyB0aGUgZWxldmF0aW9uIHRvIGFuIGVsZW1lbnQgaW4gYSBtYW5uZXIgdGhhdCBhbGxvd3Ncbi8vIGNvbnN1bWVycyB0byBvdmVycmlkZSBpdCB2aWEgdGhlIE1hdGVyaWFsIGVsZXZhdGlvbiBjbGFzc2VzLlxuQG1peGluIG1hdC1vdmVycmlkYWJsZS1lbGV2YXRpb24oXG4gICAgJHpWYWx1ZSxcbiAgICAkY29sb3I6ICRtYXQtZWxldmF0aW9uLWNvbG9yLFxuICAgICRvcGFjaXR5OiAkbWF0LWVsZXZhdGlvbi1vcGFjaXR5KSB7XG4gICY6bm90KFtjbGFzcyo9JyN7JF9tYXQtZWxldmF0aW9uLXByZWZpeH0nXSkge1xuICAgIEBpbmNsdWRlIG1hdC1lbGV2YXRpb24oJHpWYWx1ZSwgJGNvbG9yLCAkb3BhY2l0eSk7XG4gIH1cbn1cblxuQG1peGluIF9tYXQtdGhlbWUtb3ZlcnJpZGFibGUtZWxldmF0aW9uKCR6VmFsdWUsICR0aGVtZSwgJG9wYWNpdHk6ICRtYXQtZWxldmF0aW9uLW9wYWNpdHkpIHtcbiAgJGZvcmVncm91bmQ6IG1hcC1nZXQoJHRoZW1lLCBmb3JlZ3JvdW5kKTtcbiAgJGVsZXZhdGlvbi1jb2xvcjogbWFwLWdldCgkZm9yZWdyb3VuZCwgZWxldmF0aW9uKTtcbiAgJGVsZXZhdGlvbi1jb2xvci1vci1kZWZhdWx0OiBpZigkZWxldmF0aW9uLWNvbG9yID09IG51bGwsICRtYXQtZWxldmF0aW9uLWNvbG9yLCAkZWxldmF0aW9uLWNvbG9yKTtcblxuICBAaW5jbHVkZSBtYXQtb3ZlcnJpZGFibGUtZWxldmF0aW9uKCR6VmFsdWUsICRlbGV2YXRpb24tY29sb3Itb3ItZGVmYXVsdCwgJG9wYWNpdHkpO1xufVxuXG4vLyBSZXR1cm5zIGEgc3RyaW5nIHRoYXQgY2FuIGJlIHVzZWQgYXMgdGhlIHZhbHVlIGZvciBhIHRyYW5zaXRpb24gcHJvcGVydHkgZm9yIGVsZXZhdGlvbi5cbi8vIENhbGxpbmcgdGhpcyBmdW5jdGlvbiBkaXJlY3RseSBpcyB1c2VmdWwgaW4gc2l0dWF0aW9ucyB3aGVyZSBhIGNvbXBvbmVudCBuZWVkcyB0byB0cmFuc2l0aW9uXG4vLyBtb3JlIHRoYW4gb25lIHByb3BlcnR5LlxuLy9cbi8vIC5mb28ge1xuLy8gICB0cmFuc2l0aW9uOiBtYXQtZWxldmF0aW9uLXRyYW5zaXRpb24tcHJvcGVydHktdmFsdWUoKSwgb3BhY2l0eSAxMDBtcyBlYXNlO1xuLy8gfVxuQGZ1bmN0aW9uIG1hdC1lbGV2YXRpb24tdHJhbnNpdGlvbi1wcm9wZXJ0eS12YWx1ZShcbiAgICAkZHVyYXRpb246ICRtYXQtZWxldmF0aW9uLXRyYW5zaXRpb24tZHVyYXRpb24sXG4gICAgJGVhc2luZzogJG1hdC1lbGV2YXRpb24tdHJhbnNpdGlvbi10aW1pbmctZnVuY3Rpb24pIHtcbiAgQHJldHVybiBib3gtc2hhZG93ICN7JGR1cmF0aW9ufSAjeyRlYXNpbmd9O1xufVxuXG4vLyBBcHBsaWVzIHRoZSBjb3JyZWN0IGNzcyBydWxlcyBuZWVkZWQgdG8gaGF2ZSBhbiBlbGVtZW50IHRyYW5zaXRpb24gYmV0d2VlbiBlbGV2YXRpb25zLlxuLy8gVGhpcyBtaXhpbiBzaG91bGQgYmUgYXBwbGllZCB0byBlbGVtZW50cyB3aG9zZSBlbGV2YXRpb24gdmFsdWVzIHdpbGwgY2hhbmdlIGRlcGVuZGluZyBvbiB0aGVpclxuLy8gY29udGV4dCAoZS5nLiB3aGVuIGFjdGl2ZSBvciBkaXNhYmxlZCkuXG4vL1xuLy8gTk9URSh0cmF2aXNrYXVmbWFuKTogQm90aCB0aGlzIG1peGluIGFuZCB0aGUgYWJvdmUgZnVuY3Rpb24gdXNlIGRlZmF1bHQgcGFyYW1ldGVycyBzbyB0aGV5IGNhblxuLy8gYmUgdXNlZCBpbiB0aGUgc2FtZSB3YXkgYnkgY2xpZW50cy5cbkBtaXhpbiBtYXQtZWxldmF0aW9uLXRyYW5zaXRpb24oXG4gICAgJGR1cmF0aW9uOiAkbWF0LWVsZXZhdGlvbi10cmFuc2l0aW9uLWR1cmF0aW9uLFxuICAgICRlYXNpbmc6ICRtYXQtZWxldmF0aW9uLXRyYW5zaXRpb24tdGltaW5nLWZ1bmN0aW9uKSB7XG4gIHRyYW5zaXRpb246IG1hdC1lbGV2YXRpb24tdHJhbnNpdGlvbi1wcm9wZXJ0eS12YWx1ZSgkZHVyYXRpb24sICRlYXNpbmcpO1xufVxuXG4vLyBDb2xvciBwYWxldHRlcyBmcm9tIHRoZSBNYXRlcmlhbCBEZXNpZ24gc3BlYy5cbi8vIFNlZSBodHRwczovL21hdGVyaWFsLmlvL2Rlc2lnbi9jb2xvci9cbi8vXG4vLyBDb250cmFzdCBjb2xvcnMgYXJlIGhhcmQtY29kZWQgYmVjYXVzZSBpdCBpcyB0b28gZGlmZmljdWx0IChwcm9iYWJseSBpbXBvc3NpYmxlKSB0b1xuLy8gY2FsY3VsYXRlIHRoZW0uIFRoZXNlIGNvbnRyYXN0IGNvbG9ycyBhcmUgcHVsbGVkIGZyb20gdGhlIHB1YmxpYyBNYXRlcmlhbCBEZXNpZ24gc3BlYyBzd2F0Y2hlcy5cbi8vIFdoaWxlIHRoZSBjb250cmFzdCBjb2xvcnMgaW4gdGhlIHNwZWMgYXJlIG5vdCBwcmVzY3JpcHRpdmUsIHdlIHVzZSB0aGVtIGZvciBjb252ZW5pZW5jZS5cblxuXG4vLyBAZGVwcmVjYXRlZCByZW5hbWVkIHRvICRkYXJrLXByaW1hcnktdGV4dC5cbi8vIEBicmVha2luZy1jaGFuZ2UgOC4wLjBcbiRibGFjay04Ny1vcGFjaXR5OiByZ2JhKGJsYWNrLCAwLjg3KTtcbi8vIEBkZXByZWNhdGVkIHJlbmFtZWQgdG8gJGxpZ2h0LXByaW1hcnktdGV4dC5cbi8vIEBicmVha2luZy1jaGFuZ2UgOC4wLjBcbiR3aGl0ZS04Ny1vcGFjaXR5OiByZ2JhKHdoaXRlLCAwLjg3KTtcbi8vIEBkZXByZWNhdGVkIHVzZSAkZGFyay1bc2Vjb25kYXJ5LXRleHQsZGlzYWJsZWQtdGV4dCxkaXZpZGVycyxmb2N1c2VkXSBpbnN0ZWFkLlxuLy8gQGJyZWFraW5nLWNoYW5nZSA4LjAuMFxuJGJsYWNrLTEyLW9wYWNpdHk6IHJnYmEoYmxhY2ssIDAuMTIpO1xuLy8gQGRlcHJlY2F0ZWQgdXNlICRsaWdodC1bc2Vjb25kYXJ5LXRleHQsZGlzYWJsZWQtdGV4dCxkaXZpZGVycyxmb2N1c2VkXSBpbnN0ZWFkLlxuLy8gQGJyZWFraW5nLWNoYW5nZSA4LjAuMFxuJHdoaXRlLTEyLW9wYWNpdHk6IHJnYmEod2hpdGUsIDAuMTIpO1xuLy8gQGRlcHJlY2F0ZWQgdXNlICRkYXJrLVtzZWNvbmRhcnktdGV4dCxkaXNhYmxlZC10ZXh0LGRpdmlkZXJzLGZvY3VzZWRdIGluc3RlYWQuXG4vLyBAYnJlYWtpbmctY2hhbmdlIDguMC4wXG4kYmxhY2stNi1vcGFjaXR5OiByZ2JhKGJsYWNrLCAwLjA2KTtcbi8vIEBkZXByZWNhdGVkIHVzZSAkbGlnaHQtW3NlY29uZGFyeS10ZXh0LGRpc2FibGVkLXRleHQsZGl2aWRlcnMsZm9jdXNlZF0gaW5zdGVhZC5cbi8vIEBicmVha2luZy1jaGFuZ2UgOC4wLjBcbiR3aGl0ZS02LW9wYWNpdHk6IHJnYmEod2hpdGUsIDAuMDYpO1xuXG4kZGFyay1wcmltYXJ5LXRleHQ6IHJnYmEoYmxhY2ssIDAuODcpO1xuJGRhcmstc2Vjb25kYXJ5LXRleHQ6IHJnYmEoYmxhY2ssIDAuNTQpO1xuJGRhcmstZGlzYWJsZWQtdGV4dDogcmdiYShibGFjaywgMC4zOCk7XG4kZGFyay1kaXZpZGVyczogcmdiYShibGFjaywgMC4xMik7XG4kZGFyay1mb2N1c2VkOiByZ2JhKGJsYWNrLCAwLjEyKTtcbiRsaWdodC1wcmltYXJ5LXRleHQ6IHdoaXRlO1xuJGxpZ2h0LXNlY29uZGFyeS10ZXh0OiByZ2JhKHdoaXRlLCAwLjcpO1xuJGxpZ2h0LWRpc2FibGVkLXRleHQ6IHJnYmEod2hpdGUsIDAuNSk7XG4kbGlnaHQtZGl2aWRlcnM6IHJnYmEod2hpdGUsIDAuMTIpO1xuJGxpZ2h0LWZvY3VzZWQ6IHJnYmEod2hpdGUsIDAuMTIpO1xuXG4kbWF0LXJlZDogKFxuICA1MDogI2ZmZWJlZSxcbiAgMTAwOiAjZmZjZGQyLFxuICAyMDA6ICNlZjlhOWEsXG4gIDMwMDogI2U1NzM3MyxcbiAgNDAwOiAjZWY1MzUwLFxuICA1MDA6ICNmNDQzMzYsXG4gIDYwMDogI2U1MzkzNSxcbiAgNzAwOiAjZDMyZjJmLFxuICA4MDA6ICNjNjI4MjgsXG4gIDkwMDogI2I3MWMxYyxcbiAgQTEwMDogI2ZmOGE4MCxcbiAgQTIwMDogI2ZmNTI1MixcbiAgQTQwMDogI2ZmMTc0NCxcbiAgQTcwMDogI2Q1MDAwMCxcbiAgY29udHJhc3Q6IChcbiAgICA1MDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIDEwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIDIwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIDMwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIDQwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIDUwMDogJGxpZ2h0LXByaW1hcnktdGV4dCxcbiAgICA2MDA6ICRsaWdodC1wcmltYXJ5LXRleHQsXG4gICAgNzAwOiAkbGlnaHQtcHJpbWFyeS10ZXh0LFxuICAgIDgwMDogJGxpZ2h0LXByaW1hcnktdGV4dCxcbiAgICA5MDA6ICRsaWdodC1wcmltYXJ5LXRleHQsXG4gICAgQTEwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIEEyMDA6ICRsaWdodC1wcmltYXJ5LXRleHQsXG4gICAgQTQwMDogJGxpZ2h0LXByaW1hcnktdGV4dCxcbiAgICBBNzAwOiAkbGlnaHQtcHJpbWFyeS10ZXh0LFxuICApXG4pO1xuXG4kbWF0LXBpbms6IChcbiAgNTA6ICNmY2U0ZWMsXG4gIDEwMDogI2Y4YmJkMCxcbiAgMjAwOiAjZjQ4ZmIxLFxuICAzMDA6ICNmMDYyOTIsXG4gIDQwMDogI2VjNDA3YSxcbiAgNTAwOiAjZTkxZTYzLFxuICA2MDA6ICNkODFiNjAsXG4gIDcwMDogI2MyMTg1YixcbiAgODAwOiAjYWQxNDU3LFxuICA5MDA6ICM4ODBlNGYsXG4gIEExMDA6ICNmZjgwYWIsXG4gIEEyMDA6ICNmZjQwODEsXG4gIEE0MDA6ICNmNTAwNTcsXG4gIEE3MDA6ICNjNTExNjIsXG4gIGNvbnRyYXN0OiAoXG4gICAgNTA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICAxMDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICAyMDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICAzMDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICA0MDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICA1MDA6ICRsaWdodC1wcmltYXJ5LXRleHQsXG4gICAgNjAwOiAkbGlnaHQtcHJpbWFyeS10ZXh0LFxuICAgIDcwMDogJGxpZ2h0LXByaW1hcnktdGV4dCxcbiAgICA4MDA6ICRsaWdodC1wcmltYXJ5LXRleHQsXG4gICAgOTAwOiAkbGlnaHQtcHJpbWFyeS10ZXh0LFxuICAgIEExMDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICBBMjAwOiAkbGlnaHQtcHJpbWFyeS10ZXh0LFxuICAgIEE0MDA6ICRsaWdodC1wcmltYXJ5LXRleHQsXG4gICAgQTcwMDogJGxpZ2h0LXByaW1hcnktdGV4dCxcbiAgKVxuKTtcblxuJG1hdC1wdXJwbGU6IChcbiAgNTA6ICNmM2U1ZjUsXG4gIDEwMDogI2UxYmVlNyxcbiAgMjAwOiAjY2U5M2Q4LFxuICAzMDA6ICNiYTY4YzgsXG4gIDQwMDogI2FiNDdiYyxcbiAgNTAwOiAjOWMyN2IwLFxuICA2MDA6ICM4ZTI0YWEsXG4gIDcwMDogIzdiMWZhMixcbiAgODAwOiAjNmExYjlhLFxuICA5MDA6ICM0YTE0OGMsXG4gIEExMDA6ICNlYTgwZmMsXG4gIEEyMDA6ICNlMDQwZmIsXG4gIEE0MDA6ICNkNTAwZjksXG4gIEE3MDA6ICNhYTAwZmYsXG4gIGNvbnRyYXN0OiAoXG4gICAgNTA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICAxMDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICAyMDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICAzMDA6ICRsaWdodC1wcmltYXJ5LXRleHQsXG4gICAgNDAwOiAkbGlnaHQtcHJpbWFyeS10ZXh0LFxuICAgIDUwMDogJGxpZ2h0LXByaW1hcnktdGV4dCxcbiAgICA2MDA6ICRsaWdodC1wcmltYXJ5LXRleHQsXG4gICAgNzAwOiAkbGlnaHQtcHJpbWFyeS10ZXh0LFxuICAgIDgwMDogJGxpZ2h0LXByaW1hcnktdGV4dCxcbiAgICA5MDA6ICRsaWdodC1wcmltYXJ5LXRleHQsXG4gICAgQTEwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIEEyMDA6ICRsaWdodC1wcmltYXJ5LXRleHQsXG4gICAgQTQwMDogJGxpZ2h0LXByaW1hcnktdGV4dCxcbiAgICBBNzAwOiAkbGlnaHQtcHJpbWFyeS10ZXh0LFxuICApXG4pO1xuXG4kbWF0LWRlZXAtcHVycGxlOiAoXG4gIDUwOiAjZWRlN2Y2LFxuICAxMDA6ICNkMWM0ZTksXG4gIDIwMDogI2IzOWRkYixcbiAgMzAwOiAjOTU3NWNkLFxuICA0MDA6ICM3ZTU3YzIsXG4gIDUwMDogIzY3M2FiNyxcbiAgNjAwOiAjNWUzNWIxLFxuICA3MDA6ICM1MTJkYTgsXG4gIDgwMDogIzQ1MjdhMCxcbiAgOTAwOiAjMzExYjkyLFxuICBBMTAwOiAjYjM4OGZmLFxuICBBMjAwOiAjN2M0ZGZmLFxuICBBNDAwOiAjNjUxZmZmLFxuICBBNzAwOiAjNjIwMGVhLFxuICBjb250cmFzdDogKFxuICAgIDUwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgMTAwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgMjAwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgMzAwOiAkbGlnaHQtcHJpbWFyeS10ZXh0LFxuICAgIDQwMDogJGxpZ2h0LXByaW1hcnktdGV4dCxcbiAgICA1MDA6ICRsaWdodC1wcmltYXJ5LXRleHQsXG4gICAgNjAwOiAkbGlnaHQtcHJpbWFyeS10ZXh0LFxuICAgIDcwMDogJGxpZ2h0LXByaW1hcnktdGV4dCxcbiAgICA4MDA6ICRsaWdodC1wcmltYXJ5LXRleHQsXG4gICAgOTAwOiAkbGlnaHQtcHJpbWFyeS10ZXh0LFxuICAgIEExMDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICBBMjAwOiAkbGlnaHQtcHJpbWFyeS10ZXh0LFxuICAgIEE0MDA6ICRsaWdodC1wcmltYXJ5LXRleHQsXG4gICAgQTcwMDogJGxpZ2h0LXByaW1hcnktdGV4dCxcbiAgKVxuKTtcblxuJG1hdC1pbmRpZ286IChcbiAgNTA6ICNlOGVhZjYsXG4gIDEwMDogI2M1Y2FlOSxcbiAgMjAwOiAjOWZhOGRhLFxuICAzMDA6ICM3OTg2Y2IsXG4gIDQwMDogIzVjNmJjMCxcbiAgNTAwOiAjM2Y1MWI1LFxuICA2MDA6ICMzOTQ5YWIsXG4gIDcwMDogIzMwM2Y5ZixcbiAgODAwOiAjMjgzNTkzLFxuICA5MDA6ICMxYTIzN2UsXG4gIEExMDA6ICM4YzllZmYsXG4gIEEyMDA6ICM1MzZkZmUsXG4gIEE0MDA6ICMzZDVhZmUsXG4gIEE3MDA6ICMzMDRmZmUsXG4gIGNvbnRyYXN0OiAoXG4gICAgNTA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICAxMDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICAyMDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICAzMDA6ICRsaWdodC1wcmltYXJ5LXRleHQsXG4gICAgNDAwOiAkbGlnaHQtcHJpbWFyeS10ZXh0LFxuICAgIDUwMDogJGxpZ2h0LXByaW1hcnktdGV4dCxcbiAgICA2MDA6ICRsaWdodC1wcmltYXJ5LXRleHQsXG4gICAgNzAwOiAkbGlnaHQtcHJpbWFyeS10ZXh0LFxuICAgIDgwMDogJGxpZ2h0LXByaW1hcnktdGV4dCxcbiAgICA5MDA6ICRsaWdodC1wcmltYXJ5LXRleHQsXG4gICAgQTEwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIEEyMDA6ICRsaWdodC1wcmltYXJ5LXRleHQsXG4gICAgQTQwMDogJGxpZ2h0LXByaW1hcnktdGV4dCxcbiAgICBBNzAwOiAkbGlnaHQtcHJpbWFyeS10ZXh0LFxuICApXG4pO1xuXG4kbWF0LWJsdWU6IChcbiAgNTA6ICNlM2YyZmQsXG4gIDEwMDogI2JiZGVmYixcbiAgMjAwOiAjOTBjYWY5LFxuICAzMDA6ICM2NGI1ZjYsXG4gIDQwMDogIzQyYTVmNSxcbiAgNTAwOiAjMjE5NmYzLFxuICA2MDA6ICMxZTg4ZTUsXG4gIDcwMDogIzE5NzZkMixcbiAgODAwOiAjMTU2NWMwLFxuICA5MDA6ICMwZDQ3YTEsXG4gIEExMDA6ICM4MmIxZmYsXG4gIEEyMDA6ICM0NDhhZmYsXG4gIEE0MDA6ICMyOTc5ZmYsXG4gIEE3MDA6ICMyOTYyZmYsXG4gIGNvbnRyYXN0OiAoXG4gICAgNTA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICAxMDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICAyMDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICAzMDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICA0MDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICA1MDA6ICRsaWdodC1wcmltYXJ5LXRleHQsXG4gICAgNjAwOiAkbGlnaHQtcHJpbWFyeS10ZXh0LFxuICAgIDcwMDogJGxpZ2h0LXByaW1hcnktdGV4dCxcbiAgICA4MDA6ICRsaWdodC1wcmltYXJ5LXRleHQsXG4gICAgOTAwOiAkbGlnaHQtcHJpbWFyeS10ZXh0LFxuICAgIEExMDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICBBMjAwOiAkbGlnaHQtcHJpbWFyeS10ZXh0LFxuICAgIEE0MDA6ICRsaWdodC1wcmltYXJ5LXRleHQsXG4gICAgQTcwMDogJGxpZ2h0LXByaW1hcnktdGV4dCxcbiAgKVxuKTtcblxuJG1hdC1saWdodC1ibHVlOiAoXG4gIDUwOiAjZTFmNWZlLFxuICAxMDA6ICNiM2U1ZmMsXG4gIDIwMDogIzgxZDRmYSxcbiAgMzAwOiAjNGZjM2Y3LFxuICA0MDA6ICMyOWI2ZjYsXG4gIDUwMDogIzAzYTlmNCxcbiAgNjAwOiAjMDM5YmU1LFxuICA3MDA6ICMwMjg4ZDEsXG4gIDgwMDogIzAyNzdiZCxcbiAgOTAwOiAjMDE1NzliLFxuICBBMTAwOiAjODBkOGZmLFxuICBBMjAwOiAjNDBjNGZmLFxuICBBNDAwOiAjMDBiMGZmLFxuICBBNzAwOiAjMDA5MWVhLFxuICBjb250cmFzdDogKFxuICAgIDUwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgMTAwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgMjAwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgMzAwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgNDAwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgNTAwOiAkbGlnaHQtcHJpbWFyeS10ZXh0LFxuICAgIDYwMDogJGxpZ2h0LXByaW1hcnktdGV4dCxcbiAgICA3MDA6ICRsaWdodC1wcmltYXJ5LXRleHQsXG4gICAgODAwOiAkbGlnaHQtcHJpbWFyeS10ZXh0LFxuICAgIDkwMDogJGxpZ2h0LXByaW1hcnktdGV4dCxcbiAgICBBMTAwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgQTIwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIEE0MDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICBBNzAwOiAkbGlnaHQtcHJpbWFyeS10ZXh0LFxuICApXG4pO1xuXG4kbWF0LWN5YW46IChcbiAgNTA6ICNlMGY3ZmEsXG4gIDEwMDogI2IyZWJmMixcbiAgMjAwOiAjODBkZWVhLFxuICAzMDA6ICM0ZGQwZTEsXG4gIDQwMDogIzI2YzZkYSxcbiAgNTAwOiAjMDBiY2Q0LFxuICA2MDA6ICMwMGFjYzEsXG4gIDcwMDogIzAwOTdhNyxcbiAgODAwOiAjMDA4MzhmLFxuICA5MDA6ICMwMDYwNjQsXG4gIEExMDA6ICM4NGZmZmYsXG4gIEEyMDA6ICMxOGZmZmYsXG4gIEE0MDA6ICMwMGU1ZmYsXG4gIEE3MDA6ICMwMGI4ZDQsXG4gIGNvbnRyYXN0OiAoXG4gICAgNTA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICAxMDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICAyMDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICAzMDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICA0MDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICA1MDA6ICRsaWdodC1wcmltYXJ5LXRleHQsXG4gICAgNjAwOiAkbGlnaHQtcHJpbWFyeS10ZXh0LFxuICAgIDcwMDogJGxpZ2h0LXByaW1hcnktdGV4dCxcbiAgICA4MDA6ICRsaWdodC1wcmltYXJ5LXRleHQsXG4gICAgOTAwOiAkbGlnaHQtcHJpbWFyeS10ZXh0LFxuICAgIEExMDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICBBMjAwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgQTQwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIEE3MDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgKVxuKTtcblxuJG1hdC10ZWFsOiAoXG4gIDUwOiAjZTBmMmYxLFxuICAxMDA6ICNiMmRmZGIsXG4gIDIwMDogIzgwY2JjNCxcbiAgMzAwOiAjNGRiNmFjLFxuICA0MDA6ICMyNmE2OWEsXG4gIDUwMDogIzAwOTY4OCxcbiAgNjAwOiAjMDA4OTdiLFxuICA3MDA6ICMwMDc5NmIsXG4gIDgwMDogIzAwNjk1YyxcbiAgOTAwOiAjMDA0ZDQwLFxuICBBMTAwOiAjYTdmZmViLFxuICBBMjAwOiAjNjRmZmRhLFxuICBBNDAwOiAjMWRlOWI2LFxuICBBNzAwOiAjMDBiZmE1LFxuICBjb250cmFzdDogKFxuICAgIDUwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgMTAwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgMjAwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgMzAwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgNDAwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgNTAwOiAkbGlnaHQtcHJpbWFyeS10ZXh0LFxuICAgIDYwMDogJGxpZ2h0LXByaW1hcnktdGV4dCxcbiAgICA3MDA6ICRsaWdodC1wcmltYXJ5LXRleHQsXG4gICAgODAwOiAkbGlnaHQtcHJpbWFyeS10ZXh0LFxuICAgIDkwMDogJGxpZ2h0LXByaW1hcnktdGV4dCxcbiAgICBBMTAwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgQTIwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIEE0MDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICBBNzAwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gIClcbik7XG5cbiRtYXQtZ3JlZW46IChcbiAgNTA6ICNlOGY1ZTksXG4gIDEwMDogI2M4ZTZjOSxcbiAgMjAwOiAjYTVkNmE3LFxuICAzMDA6ICM4MWM3ODQsXG4gIDQwMDogIzY2YmI2YSxcbiAgNTAwOiAjNGNhZjUwLFxuICA2MDA6ICM0M2EwNDcsXG4gIDcwMDogIzM4OGUzYyxcbiAgODAwOiAjMmU3ZDMyLFxuICA5MDA6ICMxYjVlMjAsXG4gIEExMDA6ICNiOWY2Y2EsXG4gIEEyMDA6ICM2OWYwYWUsXG4gIEE0MDA6ICMwMGU2NzYsXG4gIEE3MDA6ICMwMGM4NTMsXG4gIGNvbnRyYXN0OiAoXG4gICAgNTA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICAxMDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICAyMDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICAzMDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICA0MDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICA1MDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICA2MDA6ICRsaWdodC1wcmltYXJ5LXRleHQsXG4gICAgNzAwOiAkbGlnaHQtcHJpbWFyeS10ZXh0LFxuICAgIDgwMDogJGxpZ2h0LXByaW1hcnktdGV4dCxcbiAgICA5MDA6ICRsaWdodC1wcmltYXJ5LXRleHQsXG4gICAgQTEwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIEEyMDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICBBNDAwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgQTcwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICApXG4pO1xuXG4kbWF0LWxpZ2h0LWdyZWVuOiAoXG4gIDUwOiAjZjFmOGU5LFxuICAxMDA6ICNkY2VkYzgsXG4gIDIwMDogI2M1ZTFhNSxcbiAgMzAwOiAjYWVkNTgxLFxuICA0MDA6ICM5Y2NjNjUsXG4gIDUwMDogIzhiYzM0YSxcbiAgNjAwOiAjN2NiMzQyLFxuICA3MDA6ICM2ODlmMzgsXG4gIDgwMDogIzU1OGIyZixcbiAgOTAwOiAjMzM2OTFlLFxuICBBMTAwOiAjY2NmZjkwLFxuICBBMjAwOiAjYjJmZjU5LFxuICBBNDAwOiAjNzZmZjAzLFxuICBBNzAwOiAjNjRkZDE3LFxuICBjb250cmFzdDogKFxuICAgIDUwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgMTAwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgMjAwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgMzAwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgNDAwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgNTAwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgNjAwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgNzAwOiAkbGlnaHQtcHJpbWFyeS10ZXh0LFxuICAgIDgwMDogJGxpZ2h0LXByaW1hcnktdGV4dCxcbiAgICA5MDA6ICRsaWdodC1wcmltYXJ5LXRleHQsXG4gICAgQTEwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIEEyMDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICBBNDAwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgQTcwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICApXG4pO1xuXG4kbWF0LWxpbWU6IChcbiAgNTA6ICNmOWZiZTcsXG4gIDEwMDogI2YwZjRjMyxcbiAgMjAwOiAjZTZlZTljLFxuICAzMDA6ICNkY2U3NzUsXG4gIDQwMDogI2Q0ZTE1NyxcbiAgNTAwOiAjY2RkYzM5LFxuICA2MDA6ICNjMGNhMzMsXG4gIDcwMDogI2FmYjQyYixcbiAgODAwOiAjOWU5ZDI0LFxuICA5MDA6ICM4Mjc3MTcsXG4gIEExMDA6ICNmNGZmODEsXG4gIEEyMDA6ICNlZWZmNDEsXG4gIEE0MDA6ICNjNmZmMDAsXG4gIEE3MDA6ICNhZWVhMDAsXG4gIGNvbnRyYXN0OiAoXG4gICAgNTA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICAxMDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICAyMDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICAzMDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICA0MDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICA1MDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICA2MDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICA3MDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICA4MDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICA5MDA6ICRsaWdodC1wcmltYXJ5LXRleHQsXG4gICAgQTEwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIEEyMDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICBBNDAwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgQTcwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICApXG4pO1xuXG4kbWF0LXllbGxvdzogKFxuICA1MDogI2ZmZmRlNyxcbiAgMTAwOiAjZmZmOWM0LFxuICAyMDA6ICNmZmY1OWQsXG4gIDMwMDogI2ZmZjE3NixcbiAgNDAwOiAjZmZlZTU4LFxuICA1MDA6ICNmZmViM2IsXG4gIDYwMDogI2ZkZDgzNSxcbiAgNzAwOiAjZmJjMDJkLFxuICA4MDA6ICNmOWE4MjUsXG4gIDkwMDogI2Y1N2YxNyxcbiAgQTEwMDogI2ZmZmY4ZCxcbiAgQTIwMDogI2ZmZmYwMCxcbiAgQTQwMDogI2ZmZWEwMCxcbiAgQTcwMDogI2ZmZDYwMCxcbiAgY29udHJhc3Q6IChcbiAgICA1MDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIDEwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIDIwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIDMwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIDQwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIDUwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIDYwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIDcwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIDgwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIDkwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIEExMDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICBBMjAwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgQTQwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIEE3MDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgKVxuKTtcblxuJG1hdC1hbWJlcjogKFxuICA1MDogI2ZmZjhlMSxcbiAgMTAwOiAjZmZlY2IzLFxuICAyMDA6ICNmZmUwODIsXG4gIDMwMDogI2ZmZDU0ZixcbiAgNDAwOiAjZmZjYTI4LFxuICA1MDA6ICNmZmMxMDcsXG4gIDYwMDogI2ZmYjMwMCxcbiAgNzAwOiAjZmZhMDAwLFxuICA4MDA6ICNmZjhmMDAsXG4gIDkwMDogI2ZmNmYwMCxcbiAgQTEwMDogI2ZmZTU3ZixcbiAgQTIwMDogI2ZmZDc0MCxcbiAgQTQwMDogI2ZmYzQwMCxcbiAgQTcwMDogI2ZmYWIwMCxcbiAgY29udHJhc3Q6IChcbiAgICA1MDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIDEwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIDIwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIDMwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIDQwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIDUwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIDYwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIDcwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIDgwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIDkwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIEExMDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICBBMjAwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgQTQwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIEE3MDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgKVxuKTtcblxuJG1hdC1vcmFuZ2U6IChcbiAgNTA6ICNmZmYzZTAsXG4gIDEwMDogI2ZmZTBiMixcbiAgMjAwOiAjZmZjYzgwLFxuICAzMDA6ICNmZmI3NGQsXG4gIDQwMDogI2ZmYTcyNixcbiAgNTAwOiAjZmY5ODAwLFxuICA2MDA6ICNmYjhjMDAsXG4gIDcwMDogI2Y1N2MwMCxcbiAgODAwOiAjZWY2YzAwLFxuICA5MDA6ICNlNjUxMDAsXG4gIEExMDA6ICNmZmQxODAsXG4gIEEyMDA6ICNmZmFiNDAsXG4gIEE0MDA6ICNmZjkxMDAsXG4gIEE3MDA6ICNmZjZkMDAsXG4gIGNvbnRyYXN0OiAoXG4gICAgNTA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICAxMDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICAyMDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICAzMDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICA0MDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICA1MDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICA2MDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICA3MDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICA4MDA6ICRsaWdodC1wcmltYXJ5LXRleHQsXG4gICAgOTAwOiAkbGlnaHQtcHJpbWFyeS10ZXh0LFxuICAgIEExMDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICBBMjAwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgQTQwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIEE3MDA6IGJsYWNrLFxuICApXG4pO1xuXG4kbWF0LWRlZXAtb3JhbmdlOiAoXG4gIDUwOiAjZmJlOWU3LFxuICAxMDA6ICNmZmNjYmMsXG4gIDIwMDogI2ZmYWI5MSxcbiAgMzAwOiAjZmY4YTY1LFxuICA0MDA6ICNmZjcwNDMsXG4gIDUwMDogI2ZmNTcyMixcbiAgNjAwOiAjZjQ1MTFlLFxuICA3MDA6ICNlNjRhMTksXG4gIDgwMDogI2Q4NDMxNSxcbiAgOTAwOiAjYmYzNjBjLFxuICBBMTAwOiAjZmY5ZTgwLFxuICBBMjAwOiAjZmY2ZTQwLFxuICBBNDAwOiAjZmYzZDAwLFxuICBBNzAwOiAjZGQyYzAwLFxuICBjb250cmFzdDogKFxuICAgIDUwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgMTAwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgMjAwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgMzAwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgNDAwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgNTAwOiAkbGlnaHQtcHJpbWFyeS10ZXh0LFxuICAgIDYwMDogJGxpZ2h0LXByaW1hcnktdGV4dCxcbiAgICA3MDA6ICRsaWdodC1wcmltYXJ5LXRleHQsXG4gICAgODAwOiAkbGlnaHQtcHJpbWFyeS10ZXh0LFxuICAgIDkwMDogJGxpZ2h0LXByaW1hcnktdGV4dCxcbiAgICBBMTAwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgQTIwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIEE0MDA6ICRsaWdodC1wcmltYXJ5LXRleHQsXG4gICAgQTcwMDogJGxpZ2h0LXByaW1hcnktdGV4dCxcbiAgKVxuKTtcblxuJG1hdC1icm93bjogKFxuICA1MDogI2VmZWJlOSxcbiAgMTAwOiAjZDdjY2M4LFxuICAyMDA6ICNiY2FhYTQsXG4gIDMwMDogI2ExODg3ZixcbiAgNDAwOiAjOGQ2ZTYzLFxuICA1MDA6ICM3OTU1NDgsXG4gIDYwMDogIzZkNGM0MSxcbiAgNzAwOiAjNWQ0MDM3LFxuICA4MDA6ICM0ZTM0MmUsXG4gIDkwMDogIzNlMjcyMyxcbiAgQTEwMDogI2Q3Y2NjOCxcbiAgQTIwMDogI2JjYWFhNCxcbiAgQTQwMDogIzhkNmU2MyxcbiAgQTcwMDogIzVkNDAzNyxcbiAgY29udHJhc3Q6IChcbiAgICA1MDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIDEwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIDIwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIDMwMDogJGxpZ2h0LXByaW1hcnktdGV4dCxcbiAgICA0MDA6ICRsaWdodC1wcmltYXJ5LXRleHQsXG4gICAgNTAwOiAkbGlnaHQtcHJpbWFyeS10ZXh0LFxuICAgIDYwMDogJGxpZ2h0LXByaW1hcnktdGV4dCxcbiAgICA3MDA6ICRsaWdodC1wcmltYXJ5LXRleHQsXG4gICAgODAwOiAkbGlnaHQtcHJpbWFyeS10ZXh0LFxuICAgIDkwMDogJGxpZ2h0LXByaW1hcnktdGV4dCxcbiAgICBBMTAwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgQTIwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIEE0MDA6ICRsaWdodC1wcmltYXJ5LXRleHQsXG4gICAgQTcwMDogJGxpZ2h0LXByaW1hcnktdGV4dCxcbiAgKVxuKTtcblxuJG1hdC1ncmV5OiAoXG4gIDUwOiAjZmFmYWZhLFxuICAxMDA6ICNmNWY1ZjUsXG4gIDIwMDogI2VlZWVlZSxcbiAgMzAwOiAjZTBlMGUwLFxuICA0MDA6ICNiZGJkYmQsXG4gIDUwMDogIzllOWU5ZSxcbiAgNjAwOiAjNzU3NTc1LFxuICA3MDA6ICM2MTYxNjEsXG4gIDgwMDogIzQyNDI0MixcbiAgOTAwOiAjMjEyMTIxLFxuICBBMTAwOiAjZmZmZmZmLFxuICBBMjAwOiAjZWVlZWVlLFxuICBBNDAwOiAjYmRiZGJkLFxuICBBNzAwOiAjNjE2MTYxLFxuICBjb250cmFzdDogKFxuICAgIDUwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgMTAwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgMjAwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgMzAwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgNDAwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgNTAwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgNjAwOiAkbGlnaHQtcHJpbWFyeS10ZXh0LFxuICAgIDcwMDogJGxpZ2h0LXByaW1hcnktdGV4dCxcbiAgICA4MDA6ICRsaWdodC1wcmltYXJ5LXRleHQsXG4gICAgOTAwOiAkbGlnaHQtcHJpbWFyeS10ZXh0LFxuICAgIEExMDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICBBMjAwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgQTQwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIEE3MDA6ICRsaWdodC1wcmltYXJ5LXRleHQsXG4gIClcbik7XG5cbi8vIEFsaWFzIGZvciBhbHRlcm5hdGUgc3BlbGxpbmcuXG4kbWF0LWdyYXk6ICRtYXQtZ3JleTtcblxuJG1hdC1ibHVlLWdyZXk6IChcbiAgNTA6ICNlY2VmZjEsXG4gIDEwMDogI2NmZDhkYyxcbiAgMjAwOiAjYjBiZWM1LFxuICAzMDA6ICM5MGE0YWUsXG4gIDQwMDogIzc4OTA5YyxcbiAgNTAwOiAjNjA3ZDhiLFxuICA2MDA6ICM1NDZlN2EsXG4gIDcwMDogIzQ1NWE2NCxcbiAgODAwOiAjMzc0NzRmLFxuICA5MDA6ICMyNjMyMzgsXG4gIEExMDA6ICNjZmQ4ZGMsXG4gIEEyMDA6ICNiMGJlYzUsXG4gIEE0MDA6ICM3ODkwOWMsXG4gIEE3MDA6ICM0NTVhNjQsXG4gIGNvbnRyYXN0OiAoXG4gICAgNTA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICAxMDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICAyMDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICAzMDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICA0MDA6ICRsaWdodC1wcmltYXJ5LXRleHQsXG4gICAgNTAwOiAkbGlnaHQtcHJpbWFyeS10ZXh0LFxuICAgIDYwMDogJGxpZ2h0LXByaW1hcnktdGV4dCxcbiAgICA3MDA6ICRsaWdodC1wcmltYXJ5LXRleHQsXG4gICAgODAwOiAkbGlnaHQtcHJpbWFyeS10ZXh0LFxuICAgIDkwMDogJGxpZ2h0LXByaW1hcnktdGV4dCxcbiAgICBBMTAwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgQTIwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIEE0MDA6ICRsaWdodC1wcmltYXJ5LXRleHQsXG4gICAgQTcwMDogJGxpZ2h0LXByaW1hcnktdGV4dCxcbiAgKVxuKTtcblxuLy8gQWxpYXMgZm9yIGFsdGVybmF0ZSBzcGVsbGluZy5cbiRtYXQtYmx1ZS1ncmF5OiAkbWF0LWJsdWUtZ3JleTtcblxuXG4vLyBCYWNrZ3JvdW5kIHBhbGV0dGUgZm9yIGxpZ2h0IHRoZW1lcy5cbiRtYXQtbGlnaHQtdGhlbWUtYmFja2dyb3VuZDogKFxuICBzdGF0dXMtYmFyOiBtYXBfZ2V0KCRtYXQtZ3JleSwgMzAwKSxcbiAgYXBwLWJhcjogICAgbWFwX2dldCgkbWF0LWdyZXksIDEwMCksXG4gIGJhY2tncm91bmQ6IG1hcF9nZXQoJG1hdC1ncmV5LCA1MCksXG4gIGhvdmVyOiAgICAgIHJnYmEoYmxhY2ssIDAuMDQpLCAvLyBUT0RPKGthcmEpOiBjaGVjayBzdHlsZSB3aXRoIE1hdGVyaWFsIERlc2lnbiBVWFxuICBjYXJkOiAgICAgICB3aGl0ZSxcbiAgZGlhbG9nOiAgICAgd2hpdGUsXG4gIGRpc2FibGVkLWJ1dHRvbjogcmdiYShibGFjaywgMC4xMiksXG4gIHJhaXNlZC1idXR0b246IHdoaXRlLFxuICBmb2N1c2VkLWJ1dHRvbjogJGRhcmstZm9jdXNlZCxcbiAgc2VsZWN0ZWQtYnV0dG9uOiBtYXBfZ2V0KCRtYXQtZ3JleSwgMzAwKSxcbiAgc2VsZWN0ZWQtZGlzYWJsZWQtYnV0dG9uOiBtYXBfZ2V0KCRtYXQtZ3JleSwgNDAwKSxcbiAgZGlzYWJsZWQtYnV0dG9uLXRvZ2dsZTogbWFwX2dldCgkbWF0LWdyZXksIDIwMCksXG4gIHVuc2VsZWN0ZWQtY2hpcDogbWFwX2dldCgkbWF0LWdyZXksIDMwMCksXG4gIGRpc2FibGVkLWxpc3Qtb3B0aW9uOiBtYXBfZ2V0KCRtYXQtZ3JleSwgMjAwKSxcbik7XG5cbi8vIEJhY2tncm91bmQgcGFsZXR0ZSBmb3IgZGFyayB0aGVtZXMuXG4kbWF0LWRhcmstdGhlbWUtYmFja2dyb3VuZDogKFxuICBzdGF0dXMtYmFyOiBibGFjayxcbiAgYXBwLWJhcjogICAgbWFwX2dldCgkbWF0LWdyZXksIDkwMCksXG4gIGJhY2tncm91bmQ6ICMzMDMwMzAsXG4gIGhvdmVyOiAgICAgIHJnYmEod2hpdGUsIDAuMDQpLCAvLyBUT0RPKGthcmEpOiBjaGVjayBzdHlsZSB3aXRoIE1hdGVyaWFsIERlc2lnbiBVWFxuICBjYXJkOiAgICAgICBtYXBfZ2V0KCRtYXQtZ3JleSwgODAwKSxcbiAgZGlhbG9nOiAgICAgbWFwX2dldCgkbWF0LWdyZXksIDgwMCksXG4gIGRpc2FibGVkLWJ1dHRvbjogcmdiYSh3aGl0ZSwgMC4xMiksXG4gIHJhaXNlZC1idXR0b246IG1hcC1nZXQoJG1hdC1ncmV5LCA4MDApLFxuICBmb2N1c2VkLWJ1dHRvbjogJGxpZ2h0LWZvY3VzZWQsXG4gIHNlbGVjdGVkLWJ1dHRvbjogbWFwX2dldCgkbWF0LWdyZXksIDkwMCksXG4gIHNlbGVjdGVkLWRpc2FibGVkLWJ1dHRvbjogbWFwX2dldCgkbWF0LWdyZXksIDgwMCksXG4gIGRpc2FibGVkLWJ1dHRvbi10b2dnbGU6IGJsYWNrLFxuICB1bnNlbGVjdGVkLWNoaXA6IG1hcF9nZXQoJG1hdC1ncmV5LCA3MDApLFxuICBkaXNhYmxlZC1saXN0LW9wdGlvbjogYmxhY2ssXG4pO1xuXG4vLyBGb3JlZ3JvdW5kIHBhbGV0dGUgZm9yIGxpZ2h0IHRoZW1lcy5cbiRtYXQtbGlnaHQtdGhlbWUtZm9yZWdyb3VuZDogKFxuICBiYXNlOiAgICAgICAgICAgICAgYmxhY2ssXG4gIGRpdmlkZXI6ICAgICAgICAgICAkZGFyay1kaXZpZGVycyxcbiAgZGl2aWRlcnM6ICAgICAgICAgICRkYXJrLWRpdmlkZXJzLFxuICBkaXNhYmxlZDogICAgICAgICAgJGRhcmstZGlzYWJsZWQtdGV4dCxcbiAgZGlzYWJsZWQtYnV0dG9uOiAgIHJnYmEoYmxhY2ssIDAuMjYpLFxuICBkaXNhYmxlZC10ZXh0OiAgICAgJGRhcmstZGlzYWJsZWQtdGV4dCxcbiAgZWxldmF0aW9uOiAgICAgICAgIGJsYWNrLFxuICBoaW50LXRleHQ6ICAgICAgICAgJGRhcmstZGlzYWJsZWQtdGV4dCxcbiAgc2Vjb25kYXJ5LXRleHQ6ICAgICRkYXJrLXNlY29uZGFyeS10ZXh0LFxuICBpY29uOiAgICAgICAgICAgICAgcmdiYShibGFjaywgMC41NCksXG4gIGljb25zOiAgICAgICAgICAgICByZ2JhKGJsYWNrLCAwLjU0KSxcbiAgdGV4dDogICAgICAgICAgICAgIHJnYmEoYmxhY2ssIDAuODcpLFxuICBzbGlkZXItbWluOiAgICAgICAgcmdiYShibGFjaywgMC44NyksXG4gIHNsaWRlci1vZmY6ICAgICAgICByZ2JhKGJsYWNrLCAwLjI2KSxcbiAgc2xpZGVyLW9mZi1hY3RpdmU6IHJnYmEoYmxhY2ssIDAuMzgpLFxuKTtcblxuLy8gRm9yZWdyb3VuZCBwYWxldHRlIGZvciBkYXJrIHRoZW1lcy5cbiRtYXQtZGFyay10aGVtZS1mb3JlZ3JvdW5kOiAoXG4gIGJhc2U6ICAgICAgICAgICAgICB3aGl0ZSxcbiAgZGl2aWRlcjogICAgICAgICAgICRsaWdodC1kaXZpZGVycyxcbiAgZGl2aWRlcnM6ICAgICAgICAgICRsaWdodC1kaXZpZGVycyxcbiAgZGlzYWJsZWQ6ICAgICAgICAgICRsaWdodC1kaXNhYmxlZC10ZXh0LFxuICBkaXNhYmxlZC1idXR0b246ICAgcmdiYSh3aGl0ZSwgMC4zKSxcbiAgZGlzYWJsZWQtdGV4dDogICAgICRsaWdodC1kaXNhYmxlZC10ZXh0LFxuICBlbGV2YXRpb246ICAgICAgICAgYmxhY2ssXG4gIGhpbnQtdGV4dDogICAgICAgICAkbGlnaHQtZGlzYWJsZWQtdGV4dCxcbiAgc2Vjb25kYXJ5LXRleHQ6ICAgICRsaWdodC1zZWNvbmRhcnktdGV4dCxcbiAgaWNvbjogICAgICAgICAgICAgIHdoaXRlLFxuICBpY29uczogICAgICAgICAgICAgd2hpdGUsXG4gIHRleHQ6ICAgICAgICAgICAgICB3aGl0ZSxcbiAgc2xpZGVyLW1pbjogICAgICAgIHdoaXRlLFxuICBzbGlkZXItb2ZmOiAgICAgICAgcmdiYSh3aGl0ZSwgMC4zKSxcbiAgc2xpZGVyLW9mZi1hY3RpdmU6IHJnYmEod2hpdGUsIDAuMyksXG4pO1xuXG5cblxuLy8gRm9yIGEgZ2l2ZW4gaHVlIGluIGEgcGFsZXR0ZSwgcmV0dXJuIHRoZSBjb250cmFzdCBjb2xvciBmcm9tIHRoZSBtYXAgb2YgY29udHJhc3QgcGFsZXR0ZXMuXG4vLyBAcGFyYW0gJGNvbG9yLW1hcFxuLy8gQHBhcmFtICRodWVcbkBmdW5jdGlvbiBtYXQtY29udHJhc3QoJHBhbGV0dGUsICRodWUpIHtcbiAgQHJldHVybiBtYXAtZ2V0KG1hcC1nZXQoJHBhbGV0dGUsIGNvbnRyYXN0KSwgJGh1ZSk7XG59XG5cblxuLy8gQ3JlYXRlcyBhIG1hcCBvZiBodWVzIHRvIGNvbG9ycyBmb3IgYSB0aGVtZS4gVGhpcyBpcyB1c2VkIHRvIGRlZmluZSBhIHRoZW1lIHBhbGV0dGUgaW4gdGVybXNcbi8vIG9mIHRoZSBNYXRlcmlhbCBEZXNpZ24gaHVlcy5cbi8vIEBwYXJhbSAkY29sb3ItbWFwXG4vLyBAcGFyYW0gJHByaW1hcnlcbi8vIEBwYXJhbSAkbGlnaHRlclxuQGZ1bmN0aW9uIG1hdC1wYWxldHRlKCRiYXNlLXBhbGV0dGUsICRkZWZhdWx0OiA1MDAsICRsaWdodGVyOiAxMDAsICRkYXJrZXI6IDcwMCkge1xuICAkcmVzdWx0OiBtYXBfbWVyZ2UoJGJhc2UtcGFsZXR0ZSwgKFxuICAgIGRlZmF1bHQ6IG1hcC1nZXQoJGJhc2UtcGFsZXR0ZSwgJGRlZmF1bHQpLFxuICAgIGxpZ2h0ZXI6IG1hcC1nZXQoJGJhc2UtcGFsZXR0ZSwgJGxpZ2h0ZXIpLFxuICAgIGRhcmtlcjogbWFwLWdldCgkYmFzZS1wYWxldHRlLCAkZGFya2VyKSxcblxuICAgIGRlZmF1bHQtY29udHJhc3Q6IG1hdC1jb250cmFzdCgkYmFzZS1wYWxldHRlLCAkZGVmYXVsdCksXG4gICAgbGlnaHRlci1jb250cmFzdDogbWF0LWNvbnRyYXN0KCRiYXNlLXBhbGV0dGUsICRsaWdodGVyKSxcbiAgICBkYXJrZXItY29udHJhc3Q6IG1hdC1jb250cmFzdCgkYmFzZS1wYWxldHRlLCAkZGFya2VyKVxuICApKTtcblxuICAvLyBGb3IgZWFjaCBodWUgaW4gdGhlIHBhbGV0dGUsIGFkZCBhIFwiLWNvbnRyYXN0XCIgY29sb3IgdG8gdGhlIG1hcC5cbiAgQGVhY2ggJGh1ZSwgJGNvbG9yIGluICRiYXNlLXBhbGV0dGUge1xuICAgICRyZXN1bHQ6IG1hcF9tZXJnZSgkcmVzdWx0LCAoXG4gICAgICAnI3skaHVlfS1jb250cmFzdCc6IG1hdC1jb250cmFzdCgkYmFzZS1wYWxldHRlLCAkaHVlKVxuICAgICkpO1xuICB9XG5cbiAgQHJldHVybiAkcmVzdWx0O1xufVxuXG5cbi8vIEdldHMgYSBjb2xvciBmcm9tIGEgdGhlbWUgcGFsZXR0ZSAodGhlIG91dHB1dCBvZiBtYXQtcGFsZXR0ZSkuXG4vLyBUaGUgaHVlIGNhbiBiZSBvbmUgb2YgdGhlIHN0YW5kYXJkIHZhbHVlcyAoNTAwLCBBNDAwLCBldGMuKSwgb25lIG9mIHRoZSB0aHJlZSBwcmVjb25maWd1cmVkXG4vLyBodWVzIChkZWZhdWx0LCBsaWdodGVyLCBkYXJrZXIpLCBvciBhbnkgb2YgdGhlIGFmb3JlbWVudGlvbmVkIHByZWZpeGVkIHdpdGggXCItY29udHJhc3RcIi5cbi8vXG4vLyBAcGFyYW0gJGNvbG9yLW1hcCBUaGUgdGhlbWUgcGFsZXR0ZSAob3V0cHV0IG9mIG1hdC1wYWxldHRlKS5cbi8vIEBwYXJhbSAkaHVlIFRoZSBodWUgZnJvbSB0aGUgcGFsZXR0ZSB0byB1c2UuIElmIHRoaXMgaXMgYSB2YWx1ZSBiZXR3ZWVuIDAgYW5kIDEsIGl0IHdpbGxcbi8vICAgICBiZSB0cmVhdGVkIGFzIG9wYWNpdHkuXG4vLyBAcGFyYW0gJG9wYWNpdHkgVGhlIGFscGhhIGNoYW5uZWwgdmFsdWUgZm9yIHRoZSBjb2xvci5cbkBmdW5jdGlvbiBtYXQtY29sb3IoJHBhbGV0dGUsICRodWU6IGRlZmF1bHQsICRvcGFjaXR5OiBudWxsKSB7XG4gIC8vIElmIGh1ZUtleSBpcyBhIG51bWJlciBiZXR3ZWVuIHplcm8gYW5kIG9uZSwgdGhlbiBpdCBhY3R1YWxseSBjb250YWlucyBhblxuICAvLyBvcGFjaXR5IHZhbHVlLCBzbyByZWNhbGwgdGhpcyBmdW5jdGlvbiB3aXRoIHRoZSBkZWZhdWx0IGh1ZSBhbmQgdGhhdCBnaXZlbiBvcGFjaXR5LlxuICBAaWYgdHlwZS1vZigkaHVlKSA9PSBudW1iZXIgYW5kICRodWUgPj0gMCBhbmQgJGh1ZSA8PSAxIHtcbiAgICBAcmV0dXJuIG1hdC1jb2xvcigkcGFsZXR0ZSwgZGVmYXVsdCwgJGh1ZSk7XG4gIH1cblxuICAkY29sb3I6IG1hcC1nZXQoJHBhbGV0dGUsICRodWUpO1xuXG4gIEBpZiAodHlwZS1vZigkY29sb3IpICE9IGNvbG9yKSB7XG4gICAgLy8gSWYgdGhlICRjb2xvciByZXNvbHZlZCB0byBzb21ldGhpbmcgZGlmZmVyZW50IGZyb20gYSBjb2xvciAoZS5nLiBhIENTUyB2YXJpYWJsZSksXG4gICAgLy8gd2UgY2FuJ3QgYXBwbHkgdGhlIG9wYWNpdHkgYW55d2F5IHNvIHdlIHJldHVybiB0aGUgdmFsdWUgYXMgaXMsIG90aGVyd2lzZSBTYXNzIGNhblxuICAgIC8vIHRocm93IGFuIGVycm9yIG9yIG91dHB1dCBzb21ldGhpbmcgaW52YWxpZC5cbiAgICBAcmV0dXJuICRjb2xvcjtcbiAgfVxuXG4gIEByZXR1cm4gcmdiYSgkY29sb3IsIGlmKCRvcGFjaXR5ID09IG51bGwsIG9wYWNpdHkoJGNvbG9yKSwgJG9wYWNpdHkpKTtcbn1cblxuXG4vLyBDcmVhdGVzIGEgY29udGFpbmVyIG9iamVjdCBmb3IgYSBsaWdodCB0aGVtZSB0byBiZSBnaXZlbiB0byBpbmRpdmlkdWFsIGNvbXBvbmVudCB0aGVtZSBtaXhpbnMuXG5AZnVuY3Rpb24gbWF0LWxpZ2h0LXRoZW1lKCRwcmltYXJ5LCAkYWNjZW50LCAkd2FybjogbWF0LXBhbGV0dGUoJG1hdC1yZWQpKSB7XG4gIEByZXR1cm4gKFxuICAgIHByaW1hcnk6ICRwcmltYXJ5LFxuICAgIGFjY2VudDogJGFjY2VudCxcbiAgICB3YXJuOiAkd2FybixcbiAgICBpcy1kYXJrOiBmYWxzZSxcbiAgICBmb3JlZ3JvdW5kOiAkbWF0LWxpZ2h0LXRoZW1lLWZvcmVncm91bmQsXG4gICAgYmFja2dyb3VuZDogJG1hdC1saWdodC10aGVtZS1iYWNrZ3JvdW5kLFxuICApO1xufVxuXG5cbi8vIENyZWF0ZXMgYSBjb250YWluZXIgb2JqZWN0IGZvciBhIGRhcmsgdGhlbWUgdG8gYmUgZ2l2ZW4gdG8gaW5kaXZpZHVhbCBjb21wb25lbnQgdGhlbWUgbWl4aW5zLlxuQGZ1bmN0aW9uIG1hdC1kYXJrLXRoZW1lKCRwcmltYXJ5LCAkYWNjZW50LCAkd2FybjogbWF0LXBhbGV0dGUoJG1hdC1yZWQpKSB7XG4gIEByZXR1cm4gKFxuICAgIHByaW1hcnk6ICRwcmltYXJ5LFxuICAgIGFjY2VudDogJGFjY2VudCxcbiAgICB3YXJuOiAkd2FybixcbiAgICBpcy1kYXJrOiB0cnVlLFxuICAgIGZvcmVncm91bmQ6ICRtYXQtZGFyay10aGVtZS1mb3JlZ3JvdW5kLFxuICAgIGJhY2tncm91bmQ6ICRtYXQtZGFyay10aGVtZS1iYWNrZ3JvdW5kLFxuICApO1xufVxuXG5cblxuJG1hdC1yaXBwbGUtY29sb3Itb3BhY2l0eTogMC4xO1xuXG5AbWl4aW4gbWF0LXJpcHBsZSgpIHtcblxuICAvLyBUaGUgaG9zdCBlbGVtZW50IG9mIGFuIG1hdC1yaXBwbGUgZGlyZWN0aXZlIHNob3VsZCBhbHdheXMgaGF2ZSBhIHBvc2l0aW9uIG9mIFwiYWJzb2x1dGVcIiBvclxuICAvLyBcInJlbGF0aXZlXCIgc28gdGhhdCB0aGUgcmlwcGxlcyBpbnNpZGUgYXJlIGNvcnJlY3RseSBwb3NpdGlvbmVkIHJlbGF0aXZlbHkgdG8gdGhlIGNvbnRhaW5lci5cbiAgLm1hdC1yaXBwbGUge1xuICAgIG92ZXJmbG93OiBoaWRkZW47XG5cbiAgICAvLyBCeSBkZWZhdWx0LCBldmVyeSByaXBwbGUgY29udGFpbmVyIHNob3VsZCBoYXZlIHBvc2l0aW9uOiByZWxhdGl2ZSBpbiBmYXZvciBvZiBjcmVhdGluZyBhblxuICAgIC8vIGVhc3kgQVBJIGZvciBkZXZlbG9wZXJzIHVzaW5nIHRoZSBNYXRSaXBwbGUgZGlyZWN0aXZlLlxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgfVxuXG4gIC5tYXQtcmlwcGxlLm1hdC1yaXBwbGUtdW5ib3VuZGVkIHtcbiAgICBvdmVyZmxvdzogdmlzaWJsZTtcbiAgfVxuXG4gIC5tYXQtcmlwcGxlLWVsZW1lbnQge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG5cbiAgICB0cmFuc2l0aW9uOiBvcGFjaXR5LCB0cmFuc2Zvcm0gMG1zIGN1YmljLWJlemllcigwLCAwLCAwLjIsIDEpO1xuICAgIHRyYW5zZm9ybTogc2NhbGUoMCk7XG5cbiAgICAvLyBJbiBoaWdoIGNvbnRyYXN0IG1vZGUgdGhlIHJpcHBsZSBpcyBvcGFxdWUsIGNhdXNpbmcgaXQgdG8gb2JzdHJ1Y3QgdGhlIGNvbnRlbnQuXG4gICAgQGluY2x1ZGUgY2RrLWhpZ2gtY29udHJhc3Qge1xuICAgICAgZGlzcGxheTogbm9uZTtcbiAgICB9XG4gIH1cbn1cblxuLyogVGhlbWUgZm9yIHRoZSByaXBwbGUgZWxlbWVudHMuKi9cbkBtaXhpbiBtYXQtcmlwcGxlLXRoZW1lKCR0aGVtZSkge1xuICAkZm9yZWdyb3VuZDogbWFwX2dldCgkdGhlbWUsIGZvcmVncm91bmQpO1xuICAkZm9yZWdyb3VuZC1iYXNlOiBtYXBfZ2V0KCRmb3JlZ3JvdW5kLCBiYXNlKTtcblxuICAubWF0LXJpcHBsZS1lbGVtZW50IHtcbiAgICAvLyBJZiB0aGUgcmlwcGxlIGNvbG9yIGlzIHJlc29sdmVzIHRvIGEgY29sb3IgKnR5cGUqLCB3ZSBjYW4gdXNlIGl0IGRpcmVjdGx5LCBvdGhlcndpc2VcbiAgICAvLyAoZS5nLiBpdCByZXNvbHZlcyB0byBhIENTUyB2YXJpYWJsZSkgd2UgZmFsbCBiYWNrIHRvIHVzaW5nIHRoZSBjb2xvciBhbmQgc2V0dGluZyBhbiBvcGFjaXR5LlxuICAgIEBpZiAodHlwZS1vZigkZm9yZWdyb3VuZC1iYXNlKSA9PSBjb2xvcikge1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgkZm9yZWdyb3VuZC1iYXNlLCAkbWF0LXJpcHBsZS1jb2xvci1vcGFjaXR5KTtcbiAgICB9XG4gICAgQGVsc2Uge1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogJGZvcmVncm91bmQtYmFzZTtcbiAgICAgIG9wYWNpdHk6ICRtYXQtcmlwcGxlLWNvbG9yLW9wYWNpdHk7XG4gICAgfVxuICB9XG59XG5cblxuXG4vLyBVdGlsaXR5IGZvciBmZXRjaGluZyBhIG5lc3RlZCB2YWx1ZSBmcm9tIGEgdHlwb2dyYXBoeSBjb25maWcuXG5AZnVuY3Rpb24gX21hdC1nZXQtdHlwZS12YWx1ZSgkY29uZmlnLCAkbGV2ZWwsICRuYW1lKSB7XG4gIEByZXR1cm4gbWFwLWdldChtYXAtZ2V0KCRjb25maWcsICRsZXZlbCksICRuYW1lKTtcbn1cblxuLy8gR2V0cyB0aGUgZm9udCBzaXplIGZvciBhIGxldmVsIGluc2lkZSBhIHR5cG9ncmFwaHkgY29uZmlnLlxuQGZ1bmN0aW9uIG1hdC1mb250LXNpemUoJGNvbmZpZywgJGxldmVsKSB7XG4gIEByZXR1cm4gX21hdC1nZXQtdHlwZS12YWx1ZSgkY29uZmlnLCAkbGV2ZWwsIGZvbnQtc2l6ZSk7XG59XG5cbi8vIEdldHMgdGhlIGxpbmUgaGVpZ2h0IGZvciBhIGxldmVsIGluc2lkZSBhIHR5cG9ncmFwaHkgY29uZmlnLlxuQGZ1bmN0aW9uIG1hdC1saW5lLWhlaWdodCgkY29uZmlnLCAkbGV2ZWwpIHtcbiAgQHJldHVybiBfbWF0LWdldC10eXBlLXZhbHVlKCRjb25maWcsICRsZXZlbCwgbGluZS1oZWlnaHQpO1xufVxuXG4vLyBHZXRzIHRoZSBmb250IHdlaWdodCBmb3IgYSBsZXZlbCBpbnNpZGUgYSB0eXBvZ3JhcGh5IGNvbmZpZy5cbkBmdW5jdGlvbiBtYXQtZm9udC13ZWlnaHQoJGNvbmZpZywgJGxldmVsKSB7XG4gIEByZXR1cm4gX21hdC1nZXQtdHlwZS12YWx1ZSgkY29uZmlnLCAkbGV2ZWwsIGZvbnQtd2VpZ2h0KTtcbn1cblxuLy8gR2V0cyB0aGUgbGV0dGVyIHNwYWNpbmcgZm9yIGEgbGV2ZWwgaW5zaWRlIGEgdHlwb2dyYXBoeSBjb25maWcuXG5AZnVuY3Rpb24gbWF0LWxldHRlci1zcGFjaW5nKCRjb25maWcsICRsZXZlbCkge1xuICBAcmV0dXJuIF9tYXQtZ2V0LXR5cGUtdmFsdWUoJGNvbmZpZywgJGxldmVsLCBsZXR0ZXItc3BhY2luZyk7XG59XG5cbi8vIEdldHMgdGhlIGZvbnQtZmFtaWx5IGZyb20gYSB0eXBvZ3JhcGh5IGNvbmZpZyBhbmQgcmVtb3ZlcyB0aGUgcXVvdGVzIGFyb3VuZCBpdC5cbkBmdW5jdGlvbiBtYXQtZm9udC1mYW1pbHkoJGNvbmZpZywgJGxldmVsOiBudWxsKSB7XG4gICRmb250LWZhbWlseTogbWFwLWdldCgkY29uZmlnLCBmb250LWZhbWlseSk7XG5cbiAgQGlmICRsZXZlbCAhPSBudWxsIHtcbiAgICAkZm9udC1mYW1pbHk6IF9tYXQtZ2V0LXR5cGUtdmFsdWUoJGNvbmZpZywgJGxldmVsLCBmb250LWZhbWlseSk7XG4gIH1cblxuICAvLyBHdWFyZCBhZ2FpbnN0IHVucXVvdGluZyBub24tc3RyaW5nIHZhbHVlcywgYmVjYXVzZSBpdCdzIGRlcHJlY2F0ZWQuXG4gIEByZXR1cm4gaWYodHlwZS1vZigkZm9udC1mYW1pbHkpID09IHN0cmluZywgdW5xdW90ZSgkZm9udC1mYW1pbHkpLCAkZm9udC1mYW1pbHkpO1xufVxuXG4vLyBPdXRwdXRzIHRoZSBzaG9ydGhhbmQgYGZvbnRgIENTUyBwcm9wZXJ0eSwgYmFzZWQgb24gYSBzZXQgb2YgdHlwb2dyYXBoeSB2YWx1ZXMuIEZhbGxzIGJhY2sgdG9cbi8vIHRoZSBpbmRpdmlkdWFsIHByb3BlcnRpZXMgaWYgYSB2YWx1ZSB0aGF0IGlzbid0IGFsbG93ZWQgaW4gdGhlIHNob3J0aGFuZCBpcyBwYXNzZWQgaW4uXG5AbWl4aW4gbWF0LXR5cG9ncmFwaHktZm9udC1zaG9ydGhhbmQoJGZvbnQtc2l6ZSwgJGZvbnQtd2VpZ2h0LCAkbGluZS1oZWlnaHQsICRmb250LWZhbWlseSkge1xuICAvLyBJZiBhbnkgb2YgdGhlIHZhbHVlcyBhcmUgc2V0IHRvIGBpbmhlcml0YCwgd2UgY2FuJ3QgdXNlIHRoZSBzaG9ydGhhbmRcbiAgLy8gc28gd2UgZmFsbCBiYWNrIHRvIHBhc3NpbmcgaW4gdGhlIGluZGl2aWR1YWwgcHJvcGVydGllcy5cbiAgQGlmICgkZm9udC1zaXplID09IGluaGVyaXQgb3JcbiAgICAgICAkZm9udC13ZWlnaHQgPT0gaW5oZXJpdCBvclxuICAgICAgICRsaW5lLWhlaWdodCA9PSBpbmhlcml0IG9yXG4gICAgICAgJGZvbnQtZmFtaWx5ID09IGluaGVyaXQgb3JcbiAgICAgICAkZm9udC1zaXplID09IG51bGwgb3JcbiAgICAgICAkZm9udC13ZWlnaHQgPT0gbnVsbCBvclxuICAgICAgICRsaW5lLWhlaWdodCA9PSBudWxsIG9yXG4gICAgICAgJGZvbnQtZmFtaWx5ID09IG51bGwpIHtcblxuICAgIGZvbnQtc2l6ZTogJGZvbnQtc2l6ZTtcbiAgICBmb250LXdlaWdodDogJGZvbnQtd2VpZ2h0O1xuICAgIGxpbmUtaGVpZ2h0OiAkbGluZS1oZWlnaHQ7XG4gICAgZm9udC1mYW1pbHk6ICRmb250LWZhbWlseTtcbiAgfVxuICBAZWxzZSB7XG4gICAgLy8gT3RoZXJ3aXNlIHVzZSB0aGUgc2hvcnRoYW5kIGBmb250YCwgYmVjYXVzZSBpdCdzIHRoZSBsZWFzdCBhbW91bnQgb2YgYnl0ZXMuIE5vdGVcbiAgICAvLyB0aGF0IHdlIG5lZWQgdG8gdXNlIGludGVycG9sYXRpb24gZm9yIGBmb250LXNpemUvbGluZS1oZWlnaHRgIGluIG9yZGVyIHRvIHByZXZlbnRcbiAgICAvLyBTYXNzIGZyb20gZGl2aWRpbmcgdGhlIHR3byB2YWx1ZXMuXG4gICAgZm9udDogJGZvbnQtd2VpZ2h0ICN7JGZvbnQtc2l6ZX0vI3skbGluZS1oZWlnaHR9ICRmb250LWZhbWlseTtcbiAgfVxufVxuXG4vLyBDb252ZXJ0cyBhIHR5cG9ncmFwaHkgbGV2ZWwgaW50byBDU1Mgc3R5bGVzLlxuQG1peGluIG1hdC10eXBvZ3JhcGh5LWxldmVsLXRvLXN0eWxlcygkY29uZmlnLCAkbGV2ZWwpIHtcbiAgJGZvbnQtc2l6ZTogbWF0LWZvbnQtc2l6ZSgkY29uZmlnLCAkbGV2ZWwpO1xuICAkZm9udC13ZWlnaHQ6IG1hdC1mb250LXdlaWdodCgkY29uZmlnLCAkbGV2ZWwpO1xuICAkbGluZS1oZWlnaHQ6IG1hdC1saW5lLWhlaWdodCgkY29uZmlnLCAkbGV2ZWwpO1xuICAkZm9udC1mYW1pbHk6IG1hdC1mb250LWZhbWlseSgkY29uZmlnLCAkbGV2ZWwpO1xuXG4gIEBpbmNsdWRlIG1hdC10eXBvZ3JhcGh5LWZvbnQtc2hvcnRoYW5kKCRmb250LXNpemUsICRmb250LXdlaWdodCwgJGxpbmUtaGVpZ2h0LCAkZm9udC1mYW1pbHkpO1xuICBsZXR0ZXItc3BhY2luZzogbWF0LWxldHRlci1zcGFjaW5nKCRjb25maWcsICRsZXZlbCk7XG59XG5cblxuQG1peGluIG1hdC1vcHRpb24tdGhlbWUoJHRoZW1lKSB7XG4gICRmb3JlZ3JvdW5kOiBtYXAtZ2V0KCR0aGVtZSwgZm9yZWdyb3VuZCk7XG4gICRiYWNrZ3JvdW5kOiBtYXAtZ2V0KCR0aGVtZSwgYmFja2dyb3VuZCk7XG4gICRwcmltYXJ5OiBtYXAtZ2V0KCR0aGVtZSwgcHJpbWFyeSk7XG4gICRhY2NlbnQ6IG1hcC1nZXQoJHRoZW1lLCBhY2NlbnQpO1xuICAkd2FybjogbWFwLWdldCgkdGhlbWUsIHdhcm4pO1xuXG4gIC5tYXQtb3B0aW9uIHtcbiAgICBjb2xvcjogbWF0LWNvbG9yKCRmb3JlZ3JvdW5kLCB0ZXh0KTtcblxuICAgICY6aG92ZXI6bm90KC5tYXQtb3B0aW9uLWRpc2FibGVkKSxcbiAgICAmOmZvY3VzOm5vdCgubWF0LW9wdGlvbi1kaXNhYmxlZCkge1xuICAgICAgYmFja2dyb3VuZDogbWF0LWNvbG9yKCRiYWNrZ3JvdW5kLCBob3Zlcik7XG4gICAgfVxuXG4gICAgLy8gSW4gbXVsdGlwbGUgbW9kZSB0aGVyZSBpcyBhIGNoZWNrYm94IHRvIHNob3cgdGhhdCB0aGUgb3B0aW9uIGlzIHNlbGVjdGVkLlxuICAgICYubWF0LXNlbGVjdGVkOm5vdCgubWF0LW9wdGlvbi1tdWx0aXBsZSk6bm90KC5tYXQtb3B0aW9uLWRpc2FibGVkKSB7XG4gICAgICBiYWNrZ3JvdW5kOiBtYXQtY29sb3IoJGJhY2tncm91bmQsIGhvdmVyKTtcbiAgICB9XG5cbiAgICAmLm1hdC1hY3RpdmUge1xuICAgICAgYmFja2dyb3VuZDogbWF0LWNvbG9yKCRiYWNrZ3JvdW5kLCBob3Zlcik7XG4gICAgICBjb2xvcjogbWF0LWNvbG9yKCRmb3JlZ3JvdW5kLCB0ZXh0KTtcbiAgICB9XG5cbiAgICAmLm1hdC1vcHRpb24tZGlzYWJsZWQge1xuICAgICAgY29sb3I6IG1hdC1jb2xvcigkZm9yZWdyb3VuZCwgaGludC10ZXh0KTtcbiAgICB9XG4gIH1cblxuICAubWF0LXByaW1hcnkgLm1hdC1vcHRpb24ubWF0LXNlbGVjdGVkOm5vdCgubWF0LW9wdGlvbi1kaXNhYmxlZCkge1xuICAgIGNvbG9yOiBtYXQtY29sb3IoJHByaW1hcnkpO1xuICB9XG5cbiAgLm1hdC1hY2NlbnQgLm1hdC1vcHRpb24ubWF0LXNlbGVjdGVkOm5vdCgubWF0LW9wdGlvbi1kaXNhYmxlZCkge1xuICAgIGNvbG9yOiBtYXQtY29sb3IoJGFjY2VudCk7XG4gIH1cblxuICAubWF0LXdhcm4gLm1hdC1vcHRpb24ubWF0LXNlbGVjdGVkOm5vdCgubWF0LW9wdGlvbi1kaXNhYmxlZCkge1xuICAgIGNvbG9yOiBtYXQtY29sb3IoJHdhcm4pO1xuICB9XG59XG5cbkBtaXhpbiBtYXQtb3B0aW9uLXR5cG9ncmFwaHkoJGNvbmZpZykge1xuICAubWF0LW9wdGlvbiB7XG4gICAgZm9udDoge1xuICAgICAgZmFtaWx5OiBtYXQtZm9udC1mYW1pbHkoJGNvbmZpZyk7XG4gICAgICBzaXplOiBtYXQtZm9udC1zaXplKCRjb25maWcsIHN1YmhlYWRpbmctMik7XG4gICAgfVxuICB9XG59XG5cblxuXG5cblxuQG1peGluIG1hdC1vcHRncm91cC10aGVtZSgkdGhlbWUpIHtcbiAgJGZvcmVncm91bmQ6IG1hcC1nZXQoJHRoZW1lLCBmb3JlZ3JvdW5kKTtcblxuICAubWF0LW9wdGdyb3VwLWxhYmVsIHtcbiAgICBjb2xvcjogbWF0LWNvbG9yKCRmb3JlZ3JvdW5kLCBzZWNvbmRhcnktdGV4dCk7XG4gIH1cblxuICAubWF0LW9wdGdyb3VwLWRpc2FibGVkIC5tYXQtb3B0Z3JvdXAtbGFiZWwge1xuICAgIGNvbG9yOiBtYXQtY29sb3IoJGZvcmVncm91bmQsIGhpbnQtdGV4dCk7XG4gIH1cbn1cblxuQG1peGluIG1hdC1vcHRncm91cC10eXBvZ3JhcGh5KCRjb25maWcpIHtcbiAgLm1hdC1vcHRncm91cC1sYWJlbCB7XG4gICAgQGluY2x1ZGUgbWF0LXR5cG9ncmFwaHktbGV2ZWwtdG8tc3R5bGVzKCRjb25maWcsIGJvZHktMik7XG4gIH1cbn1cblxuXG5cbkBtaXhpbiBtYXQtcHNldWRvLWNoZWNrYm94LXRoZW1lKCR0aGVtZSkge1xuICAkaXMtZGFyay10aGVtZTogbWFwLWdldCgkdGhlbWUsIGlzLWRhcmspO1xuICAkcHJpbWFyeTogbWFwLWdldCgkdGhlbWUsIHByaW1hcnkpO1xuICAkYWNjZW50OiBtYXAtZ2V0KCR0aGVtZSwgYWNjZW50KTtcbiAgJHdhcm46IG1hcC1nZXQoJHRoZW1lLCB3YXJuKTtcbiAgJGJhY2tncm91bmQ6IG1hcC1nZXQoJHRoZW1lLCBiYWNrZ3JvdW5kKTtcblxuICAvLyBOT1RFKHRyYXZpc2thdWZtYW4pOiBXaGlsZSB0aGUgc3BlYyBjYWxscyBmb3IgdHJhbnNsdWNlbnQgYmxhY2tzL3doaXRlcyBmb3IgZGlzYWJsZWQgY29sb3JzLFxuICAvLyB0aGlzIGRvZXMgbm90IHdvcmsgd2VsbCB3aXRoIGVsZW1lbnRzIGxheWVyZWQgb24gdG9wIG9mIG9uZSBhbm90aGVyLiBUbyBnZXQgYXJvdW5kIHRoaXMgd2VcbiAgLy8gYmxlbmQgdGhlIGNvbG9ycyB0b2dldGhlciBiYXNlZCBvbiB0aGUgYmFzZSBjb2xvciBhbmQgdGhlIHRoZW1lIGJhY2tncm91bmQuXG4gICR3aGl0ZS0zMHBjdC1vcGFjaXR5LW9uLWRhcms6ICM2ODY4Njg7XG4gICRibGFjay0yNnBjdC1vcGFjaXR5LW9uLWxpZ2h0OiAjYjBiMGIwO1xuICAkZGlzYWJsZWQtY29sb3I6IGlmKCRpcy1kYXJrLXRoZW1lLCAkd2hpdGUtMzBwY3Qtb3BhY2l0eS1vbi1kYXJrLCAkYmxhY2stMjZwY3Qtb3BhY2l0eS1vbi1saWdodCk7XG4gICRjb2xvcmVkLWJveC1zZWxlY3RvcjogJy5tYXQtcHNldWRvLWNoZWNrYm94LWNoZWNrZWQsIC5tYXQtcHNldWRvLWNoZWNrYm94LWluZGV0ZXJtaW5hdGUnO1xuXG4gIC5tYXQtcHNldWRvLWNoZWNrYm94IHtcbiAgICBjb2xvcjogbWF0LWNvbG9yKG1hcC1nZXQoJHRoZW1lLCBmb3JlZ3JvdW5kKSwgc2Vjb25kYXJ5LXRleHQpO1xuXG4gICAgJjo6YWZ0ZXIge1xuICAgICAgY29sb3I6IG1hdC1jb2xvcigkYmFja2dyb3VuZCwgYmFja2dyb3VuZCk7XG4gICAgfVxuICB9XG5cbiAgLy8gRGVmYXVsdCB0byB0aGUgYWNjZW50IGNvbG9yLiBOb3RlIHRoYXQgdGhlIHBzZXVkbyBjaGVja2JveGVzIGFyZSBtZWFudCB0byBpbmhlcml0IHRoZVxuICAvLyB0aGVtZSBmcm9tIHRoZWlyIHBhcmVudCwgcmF0aGVyIHRoYW4gaW1wbGVtZW50aW5nIHRoZWlyIG93biB0aGVtaW5nLCB3aGljaCBpcyB3aHkgd2VcbiAgLy8gZG9uJ3QgYXR0YWNoIHRvIHRoZSBgbWF0LSpgIGNsYXNzZXMuXG4gIC5tYXQtcHNldWRvLWNoZWNrYm94LWNoZWNrZWQsXG4gIC5tYXQtcHNldWRvLWNoZWNrYm94LWluZGV0ZXJtaW5hdGUsXG4gIC5tYXQtYWNjZW50IC5tYXQtcHNldWRvLWNoZWNrYm94LWNoZWNrZWQsXG4gIC5tYXQtYWNjZW50IC5tYXQtcHNldWRvLWNoZWNrYm94LWluZGV0ZXJtaW5hdGUge1xuICAgIGJhY2tncm91bmQ6IG1hdC1jb2xvcihtYXAtZ2V0KCR0aGVtZSwgYWNjZW50KSk7XG4gIH1cblxuICAubWF0LXByaW1hcnkgLm1hdC1wc2V1ZG8tY2hlY2tib3gtY2hlY2tlZCxcbiAgLm1hdC1wcmltYXJ5IC5tYXQtcHNldWRvLWNoZWNrYm94LWluZGV0ZXJtaW5hdGUge1xuICAgIGJhY2tncm91bmQ6IG1hdC1jb2xvcihtYXAtZ2V0KCR0aGVtZSwgcHJpbWFyeSkpO1xuICB9XG5cbiAgLm1hdC13YXJuIC5tYXQtcHNldWRvLWNoZWNrYm94LWNoZWNrZWQsXG4gIC5tYXQtd2FybiAubWF0LXBzZXVkby1jaGVja2JveC1pbmRldGVybWluYXRlIHtcbiAgICBiYWNrZ3JvdW5kOiBtYXQtY29sb3IobWFwLWdldCgkdGhlbWUsIHdhcm4pKTtcbiAgfVxuXG4gIC5tYXQtcHNldWRvLWNoZWNrYm94LWNoZWNrZWQsXG4gIC5tYXQtcHNldWRvLWNoZWNrYm94LWluZGV0ZXJtaW5hdGUge1xuICAgICYubWF0LXBzZXVkby1jaGVja2JveC1kaXNhYmxlZCB7XG4gICAgICBiYWNrZ3JvdW5kOiAkZGlzYWJsZWQtY29sb3I7XG4gICAgfVxuICB9XG59XG5cblxuXG4vLyBSZXByZXNlbnRzIGEgdHlwb2dyYXBoeSBsZXZlbCBmcm9tIHRoZSBNYXRlcmlhbCBkZXNpZ24gc3BlYy5cbkBmdW5jdGlvbiBtYXQtdHlwb2dyYXBoeS1sZXZlbChcbiAgJGZvbnQtc2l6ZSxcbiAgJGxpbmUtaGVpZ2h0OiAkZm9udC1zaXplLFxuICAkZm9udC13ZWlnaHQ6IDQwMCxcbiAgJGZvbnQtZmFtaWx5OiBudWxsLFxuICAkbGV0dGVyLXNwYWNpbmc6IG51bGwpIHtcblxuICBAcmV0dXJuIChcbiAgICBmb250LXNpemU6ICRmb250LXNpemUsXG4gICAgbGluZS1oZWlnaHQ6ICRsaW5lLWhlaWdodCxcbiAgICBmb250LXdlaWdodDogJGZvbnQtd2VpZ2h0LFxuICAgIGZvbnQtZmFtaWx5OiAkZm9udC1mYW1pbHksXG4gICAgbGV0dGVyLXNwYWNpbmc6ICRsZXR0ZXItc3BhY2luZ1xuICApO1xufVxuXG4vLyBSZXByZXNlbnRzIGEgY29sbGVjdGlvbiBvZiB0eXBvZ3JhcGh5IGxldmVscy5cbi8vIERlZmF1bHRzIGNvbWUgZnJvbSBodHRwczovL21hdGVyaWFsLmlvL2d1aWRlbGluZXMvc3R5bGUvdHlwb2dyYXBoeS5odG1sXG5AZnVuY3Rpb24gbWF0LXR5cG9ncmFwaHktY29uZmlnKFxuICAkZm9udC1mYW1pbHk6ICAgJ1JvYm90bywgXCJIZWx2ZXRpY2EgTmV1ZVwiLCBzYW5zLXNlcmlmJyxcbiAgJGRpc3BsYXktNDogICAgIG1hdC10eXBvZ3JhcGh5LWxldmVsKDExMnB4LCAxMTJweCwgMzAwKSxcbiAgJGRpc3BsYXktMzogICAgIG1hdC10eXBvZ3JhcGh5LWxldmVsKDU2cHgsIDU2cHgsIDQwMCksXG4gICRkaXNwbGF5LTI6ICAgICBtYXQtdHlwb2dyYXBoeS1sZXZlbCg0NXB4LCA0OHB4LCA0MDApLFxuICAkZGlzcGxheS0xOiAgICAgbWF0LXR5cG9ncmFwaHktbGV2ZWwoMzRweCwgNDBweCwgNDAwKSxcbiAgJGhlYWRsaW5lOiAgICAgIG1hdC10eXBvZ3JhcGh5LWxldmVsKDI0cHgsIDMycHgsIDQwMCksXG4gICR0aXRsZTogICAgICAgICBtYXQtdHlwb2dyYXBoeS1sZXZlbCgyMHB4LCAzMnB4LCA1MDApLFxuICAkc3ViaGVhZGluZy0yOiAgbWF0LXR5cG9ncmFwaHktbGV2ZWwoMTZweCwgMjhweCwgNDAwKSxcbiAgJHN1YmhlYWRpbmctMTogIG1hdC10eXBvZ3JhcGh5LWxldmVsKDE1cHgsIDI0cHgsIDQwMCksXG4gICRib2R5LTI6ICAgICAgICBtYXQtdHlwb2dyYXBoeS1sZXZlbCgxNHB4LCAyNHB4LCA1MDApLFxuICAkYm9keS0xOiAgICAgICAgbWF0LXR5cG9ncmFwaHktbGV2ZWwoMTRweCwgMjBweCwgNDAwKSxcbiAgJGNhcHRpb246ICAgICAgIG1hdC10eXBvZ3JhcGh5LWxldmVsKDEycHgsIDIwcHgsIDQwMCksXG4gICRidXR0b246ICAgICAgICBtYXQtdHlwb2dyYXBoeS1sZXZlbCgxNHB4LCAxNHB4LCA1MDApLFxuICAvLyBMaW5lLWhlaWdodCBtdXN0IGJlIHVuaXQtbGVzcyBmcmFjdGlvbiBvZiB0aGUgZm9udC1zaXplLlxuICAkaW5wdXQ6ICAgICAgICAgbWF0LXR5cG9ncmFwaHktbGV2ZWwoaW5oZXJpdCwgMS4xMjUsIDQwMClcbikge1xuXG4gIC8vIERlY2xhcmUgYW4gaW5pdGlhbCBtYXAgd2l0aCBhbGwgb2YgdGhlIGxldmVscy5cbiAgJGNvbmZpZzogKFxuICAgIGRpc3BsYXktNDogICAgICAkZGlzcGxheS00LFxuICAgIGRpc3BsYXktMzogICAgICAkZGlzcGxheS0zLFxuICAgIGRpc3BsYXktMjogICAgICAkZGlzcGxheS0yLFxuICAgIGRpc3BsYXktMTogICAgICAkZGlzcGxheS0xLFxuICAgIGhlYWRsaW5lOiAgICAgICAkaGVhZGxpbmUsXG4gICAgdGl0bGU6ICAgICAgICAgICR0aXRsZSxcbiAgICBzdWJoZWFkaW5nLTI6ICAgJHN1YmhlYWRpbmctMixcbiAgICBzdWJoZWFkaW5nLTE6ICAgJHN1YmhlYWRpbmctMSxcbiAgICBib2R5LTI6ICAgICAgICAgJGJvZHktMixcbiAgICBib2R5LTE6ICAgICAgICAgJGJvZHktMSxcbiAgICBjYXB0aW9uOiAgICAgICAgJGNhcHRpb24sXG4gICAgYnV0dG9uOiAgICAgICAgICRidXR0b24sXG4gICAgaW5wdXQ6ICAgICAgICAgICRpbnB1dCxcbiAgKTtcblxuICAvLyBMb29wIHRocm91Z2ggdGhlIGxldmVscyBhbmQgc2V0IHRoZSBgZm9udC1mYW1pbHlgIG9mIHRoZSBvbmVzIHRoYXQgZG9uJ3QgaGF2ZSBvbmUgdG8gdGhlIGJhc2UuXG4gIC8vIE5vdGUgdGhhdCBTYXNzIGNhbid0IG1vZGlmeSBtYXBzIGluIHBsYWNlLCB3aGljaCBtZWFucyB0aGF0IHdlIG5lZWQgdG8gbWVyZ2UgYW5kIHJlLWFzc2lnbi5cbiAgQGVhY2ggJGtleSwgJGxldmVsIGluICRjb25maWcge1xuICAgIEBpZiBtYXAtZ2V0KCRsZXZlbCwgZm9udC1mYW1pbHkpID09IG51bGwge1xuICAgICAgJG5ldy1sZXZlbDogbWFwLW1lcmdlKCRsZXZlbCwgKGZvbnQtZmFtaWx5OiAkZm9udC1mYW1pbHkpKTtcbiAgICAgICRjb25maWc6IG1hcC1tZXJnZSgkY29uZmlnLCAoJGtleTogJG5ldy1sZXZlbCkpO1xuICAgIH1cbiAgfVxuXG4gIC8vIEFkZCB0aGUgYmFzZSBmb250IGZhbWlseSB0byB0aGUgY29uZmlnLlxuICBAcmV0dXJuIG1hcC1tZXJnZSgkY29uZmlnLCAoZm9udC1mYW1pbHk6ICRmb250LWZhbWlseSkpO1xufVxuXG4vLyBBZGRzIHRoZSBiYXNlIHR5cG9ncmFwaHkgc3R5bGVzLCBiYXNlZCBvbiBhIGNvbmZpZy5cbkBtaXhpbiBtYXQtYmFzZS10eXBvZ3JhcGh5KCRjb25maWcsICRzZWxlY3RvcjogJy5tYXQtdHlwb2dyYXBoeScpIHtcbiAgLm1hdC1oMSwgLm1hdC1oZWFkbGluZSwgI3skc2VsZWN0b3J9IGgxIHtcbiAgICBAaW5jbHVkZSBtYXQtdHlwb2dyYXBoeS1sZXZlbC10by1zdHlsZXMoJGNvbmZpZywgaGVhZGxpbmUpO1xuICAgIG1hcmdpbjogMCAwIDE2cHg7XG4gIH1cblxuICAubWF0LWgyLCAubWF0LXRpdGxlLCAjeyRzZWxlY3Rvcn0gaDIge1xuICAgIEBpbmNsdWRlIG1hdC10eXBvZ3JhcGh5LWxldmVsLXRvLXN0eWxlcygkY29uZmlnLCB0aXRsZSk7XG4gICAgbWFyZ2luOiAwIDAgMTZweDtcbiAgfVxuXG4gIC5tYXQtaDMsIC5tYXQtc3ViaGVhZGluZy0yLCAjeyRzZWxlY3Rvcn0gaDMge1xuICAgIEBpbmNsdWRlIG1hdC10eXBvZ3JhcGh5LWxldmVsLXRvLXN0eWxlcygkY29uZmlnLCBzdWJoZWFkaW5nLTIpO1xuICAgIG1hcmdpbjogMCAwIDE2cHg7XG4gIH1cblxuICAubWF0LWg0LCAubWF0LXN1YmhlYWRpbmctMSwgI3skc2VsZWN0b3J9IGg0IHtcbiAgICBAaW5jbHVkZSBtYXQtdHlwb2dyYXBoeS1sZXZlbC10by1zdHlsZXMoJGNvbmZpZywgc3ViaGVhZGluZy0xKTtcbiAgICBtYXJnaW46IDAgMCAxNnB4O1xuICB9XG5cbiAgLy8gTm90ZTogdGhlIHNwZWMgZG9lc24ndCBoYXZlIGFueXRoaW5nIHRoYXQgd291bGQgY29ycmVzcG9uZCB0byBoNSBhbmQgaDYsIGJ1dCB3ZSBhZGQgdGhlc2UgZm9yXG4gIC8vIGNvbnNpc3RlbmN5LiBUaGUgZm9udCBzaXplcyBjb21lIGZyb20gdGhlIENocm9tZSB1c2VyIGFnZW50IHN0eWxlcyB3aGljaCBoYXZlIGg1IGF0IDAuODNlbVxuICAvLyBhbmQgaDYgYXQgMC42N2VtLlxuICAubWF0LWg1LCAjeyRzZWxlY3Rvcn0gaDUge1xuICAgIEBpbmNsdWRlIG1hdC10eXBvZ3JhcGh5LWZvbnQtc2hvcnRoYW5kKFxuICAgICAgbWF0LWZvbnQtc2l6ZSgkY29uZmlnLCBib2R5LTEpICogMC44MyxcbiAgICAgIG1hdC1mb250LXdlaWdodCgkY29uZmlnLCBib2R5LTEpLFxuICAgICAgbWF0LWxpbmUtaGVpZ2h0KCRjb25maWcsIGJvZHktMSksXG4gICAgICBtYXQtZm9udC1mYW1pbHkoJGNvbmZpZywgYm9keS0xKVxuICAgICk7XG5cbiAgICBtYXJnaW46IDAgMCAxMnB4O1xuICB9XG5cbiAgLm1hdC1oNiwgI3skc2VsZWN0b3J9IGg2IHtcbiAgICBAaW5jbHVkZSBtYXQtdHlwb2dyYXBoeS1mb250LXNob3J0aGFuZChcbiAgICAgIG1hdC1mb250LXNpemUoJGNvbmZpZywgYm9keS0xKSAqIDAuNjcsXG4gICAgICBtYXQtZm9udC13ZWlnaHQoJGNvbmZpZywgYm9keS0xKSxcbiAgICAgIG1hdC1saW5lLWhlaWdodCgkY29uZmlnLCBib2R5LTEpLFxuICAgICAgbWF0LWZvbnQtZmFtaWx5KCRjb25maWcsIGJvZHktMSlcbiAgICApO1xuXG4gICAgbWFyZ2luOiAwIDAgMTJweDtcbiAgfVxuXG4gIC5tYXQtYm9keS1zdHJvbmcsIC5tYXQtYm9keS0yIHtcbiAgICBAaW5jbHVkZSBtYXQtdHlwb2dyYXBoeS1sZXZlbC10by1zdHlsZXMoJGNvbmZpZywgYm9keS0yKTtcbiAgfVxuXG4gIC5tYXQtYm9keSwgLm1hdC1ib2R5LTEsICN7JHNlbGVjdG9yfSB7XG4gICAgQGluY2x1ZGUgbWF0LXR5cG9ncmFwaHktbGV2ZWwtdG8tc3R5bGVzKCRjb25maWcsIGJvZHktMSk7XG5cbiAgICBwIHtcbiAgICAgIG1hcmdpbjogMCAwIDEycHg7XG4gICAgfVxuICB9XG5cbiAgLm1hdC1zbWFsbCwgLm1hdC1jYXB0aW9uIHtcbiAgICBAaW5jbHVkZSBtYXQtdHlwb2dyYXBoeS1sZXZlbC10by1zdHlsZXMoJGNvbmZpZywgY2FwdGlvbik7XG4gIH1cblxuICAvLyBOb3RlOiBUaGUgc3BlYyBkb2Vzbid0IG1lbnRpb24gbGV0dGVyIHNwYWNpbmcuIFRoZSB2YWx1ZSBjb21lcyBmcm9tXG4gIC8vIGV5ZWJhbGxpbmcgaXQgdW50aWwgaXQgbG9va2VkIGV4YWN0bHkgbGlrZSB0aGUgc3BlYyBleGFtcGxlcy5cbiAgLm1hdC1kaXNwbGF5LTQsICN7JHNlbGVjdG9yfSAubWF0LWRpc3BsYXktNCB7XG4gICAgQGluY2x1ZGUgbWF0LXR5cG9ncmFwaHktbGV2ZWwtdG8tc3R5bGVzKCRjb25maWcsIGRpc3BsYXktNCk7XG4gICAgbWFyZ2luOiAwIDAgNTZweDtcbiAgICBsZXR0ZXItc3BhY2luZzogLTAuMDVlbTtcbiAgfVxuXG4gIC5tYXQtZGlzcGxheS0zLCAjeyRzZWxlY3Rvcn0gLm1hdC1kaXNwbGF5LTMge1xuICAgIEBpbmNsdWRlIG1hdC10eXBvZ3JhcGh5LWxldmVsLXRvLXN0eWxlcygkY29uZmlnLCBkaXNwbGF5LTMpO1xuICAgIG1hcmdpbjogMCAwIDY0cHg7XG4gICAgbGV0dGVyLXNwYWNpbmc6IC0wLjAyZW07XG4gIH1cblxuICAubWF0LWRpc3BsYXktMiwgI3skc2VsZWN0b3J9IC5tYXQtZGlzcGxheS0yIHtcbiAgICBAaW5jbHVkZSBtYXQtdHlwb2dyYXBoeS1sZXZlbC10by1zdHlsZXMoJGNvbmZpZywgZGlzcGxheS0yKTtcbiAgICBtYXJnaW46IDAgMCA2NHB4O1xuICAgIGxldHRlci1zcGFjaW5nOiAtMC4wMDVlbTtcbiAgfVxuXG4gIC5tYXQtZGlzcGxheS0xLCAjeyRzZWxlY3Rvcn0gLm1hdC1kaXNwbGF5LTEge1xuICAgIEBpbmNsdWRlIG1hdC10eXBvZ3JhcGh5LWxldmVsLXRvLXN0eWxlcygkY29uZmlnLCBkaXNwbGF5LTEpO1xuICAgIG1hcmdpbjogMCAwIDY0cHg7XG4gIH1cbn1cblxuXG5cblxuQG1peGluIG1hdC1hdXRvY29tcGxldGUtdGhlbWUoJHRoZW1lKSB7XG4gICRmb3JlZ3JvdW5kOiBtYXAtZ2V0KCR0aGVtZSwgZm9yZWdyb3VuZCk7XG4gICRiYWNrZ3JvdW5kOiBtYXAtZ2V0KCR0aGVtZSwgYmFja2dyb3VuZCk7XG5cbiAgLm1hdC1hdXRvY29tcGxldGUtcGFuZWwge1xuICAgIEBpbmNsdWRlIF9tYXQtdGhlbWUtb3ZlcnJpZGFibGUtZWxldmF0aW9uKDQsICR0aGVtZSk7XG4gICAgYmFja2dyb3VuZDogbWF0LWNvbG9yKCRiYWNrZ3JvdW5kLCBjYXJkKTtcbiAgICBjb2xvcjogbWF0LWNvbG9yKCRmb3JlZ3JvdW5kLCB0ZXh0KTtcblxuICAgIC8vIFNlbGVjdGVkIG9wdGlvbnMgaW4gYXV0b2NvbXBsZXRlcyBzaG91bGQgbm90IGJlIGdyYXksIGJ1dCB3ZVxuICAgIC8vIG9ubHkgd2FudCB0byBvdmVycmlkZSB0aGUgYmFja2dyb3VuZCBmb3Igc2VsZWN0ZWQgb3B0aW9ucyBpZlxuICAgIC8vIHRoZXkgYXJlICpub3QqIGluIGhvdmVyIG9yIGZvY3VzIHN0YXRlLiBUaGlzIGNoYW5nZSBoYXMgdG8gYmVcbiAgICAvLyBtYWRlIGhlcmUgYmVjYXVzZSBiYXNlIG9wdGlvbiBzdHlsZXMgYXJlIHNoYXJlZCBiZXR3ZWVuIHRoZVxuICAgIC8vIGF1dG9jb21wbGV0ZSBhbmQgdGhlIHNlbGVjdC5cbiAgICAubWF0LW9wdGlvbi5tYXQtc2VsZWN0ZWQ6bm90KC5tYXQtYWN0aXZlKTpub3QoOmhvdmVyKSB7XG4gICAgICBiYWNrZ3JvdW5kOiBtYXQtY29sb3IoJGJhY2tncm91bmQsIGNhcmQpO1xuXG4gICAgICAmOm5vdCgubWF0LW9wdGlvbi1kaXNhYmxlZCkge1xuICAgICAgICBjb2xvcjogbWF0LWNvbG9yKCRmb3JlZ3JvdW5kLCB0ZXh0KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxufVxuXG5AbWl4aW4gbWF0LWF1dG9jb21wbGV0ZS10eXBvZ3JhcGh5KCRjb25maWcpIHsgfVxuXG4vLyBUaGlzIGNvbnRhaW5zIGFsbCBvZiB0aGUgc3R5bGVzIGZvciB0aGUgYmFkZ2Vcbi8vIHJhdGhlciB0aGFuIGp1c3QgdGhlIGNvbG9yL3RoZW1lIGJlY2F1c2Ugb2Zcbi8vIG5vIHN0eWxlIHNoZWV0IHN1cHBvcnQgZm9yIGRpcmVjdGl2ZXMuXG5cblxuXG5cblxuJG1hdC1iYWRnZS1mb250LXNpemU6IDEycHg7XG4kbWF0LWJhZGdlLWZvbnQtd2VpZ2h0OiA2MDA7XG4kbWF0LWJhZGdlLWRlZmF1bHQtc2l6ZTogMjJweCAhZGVmYXVsdDtcbiRtYXQtYmFkZ2Utc21hbGwtc2l6ZTogJG1hdC1iYWRnZS1kZWZhdWx0LXNpemUgLSA2O1xuJG1hdC1iYWRnZS1sYXJnZS1zaXplOiAkbWF0LWJhZGdlLWRlZmF1bHQtc2l6ZSArIDY7XG5cbi8vIE1peGluIGZvciBidWlsZGluZyBvZmZzZXQgZ2l2ZW4gZGlmZmVyZW50IHNpemVzXG5AbWl4aW4gX21hdC1iYWRnZS1zaXplKCRzaXplKSB7XG4gIC5tYXQtYmFkZ2UtY29udGVudCB7XG4gICAgd2lkdGg6ICRzaXplO1xuICAgIGhlaWdodDogJHNpemU7XG4gICAgbGluZS1oZWlnaHQ6ICRzaXplO1xuICB9XG5cbiAgJi5tYXQtYmFkZ2UtYWJvdmUge1xuICAgIC5tYXQtYmFkZ2UtY29udGVudCB7XG4gICAgICB0b3A6IC0kc2l6ZSAvIDI7XG4gICAgfVxuICB9XG5cbiAgJi5tYXQtYmFkZ2UtYmVsb3cge1xuICAgIC5tYXQtYmFkZ2UtY29udGVudCB7XG4gICAgICBib3R0b206IC0kc2l6ZSAvIDI7XG4gICAgfVxuICB9XG5cbiAgJi5tYXQtYmFkZ2UtYmVmb3JlIHtcbiAgICAubWF0LWJhZGdlLWNvbnRlbnQge1xuICAgICAgbGVmdDogLSRzaXplO1xuICAgIH1cbiAgfVxuXG4gIFtkaXI9J3J0bCddICYubWF0LWJhZGdlLWJlZm9yZSB7XG4gICAgLm1hdC1iYWRnZS1jb250ZW50IHtcbiAgICAgIGxlZnQ6IGF1dG87XG4gICAgICByaWdodDogLSRzaXplO1xuICAgIH1cbiAgfVxuXG4gICYubWF0LWJhZGdlLWFmdGVyIHtcbiAgICAubWF0LWJhZGdlLWNvbnRlbnQge1xuICAgICAgcmlnaHQ6IC0kc2l6ZTtcbiAgICB9XG4gIH1cblxuICBbZGlyPSdydGwnXSAmLm1hdC1iYWRnZS1hZnRlciB7XG4gICAgLm1hdC1iYWRnZS1jb250ZW50IHtcbiAgICAgIHJpZ2h0OiBhdXRvO1xuICAgICAgbGVmdDogLSRzaXplO1xuICAgIH1cbiAgfVxuXG4gICYubWF0LWJhZGdlLW92ZXJsYXAge1xuICAgICYubWF0LWJhZGdlLWJlZm9yZSB7XG4gICAgICAubWF0LWJhZGdlLWNvbnRlbnQge1xuICAgICAgICBsZWZ0OiAtJHNpemUgLyAyO1xuICAgICAgfVxuICAgIH1cblxuICAgIFtkaXI9J3J0bCddICYubWF0LWJhZGdlLWJlZm9yZSB7XG4gICAgICAubWF0LWJhZGdlLWNvbnRlbnQge1xuICAgICAgICBsZWZ0OiBhdXRvO1xuICAgICAgICByaWdodDogLSRzaXplIC8gMjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAmLm1hdC1iYWRnZS1hZnRlciB7XG4gICAgICAubWF0LWJhZGdlLWNvbnRlbnQge1xuICAgICAgICByaWdodDogLSRzaXplIC8gMjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBbZGlyPSdydGwnXSAmLm1hdC1iYWRnZS1hZnRlciB7XG4gICAgICAubWF0LWJhZGdlLWNvbnRlbnQge1xuICAgICAgICByaWdodDogYXV0bztcbiAgICAgICAgbGVmdDogLSRzaXplIC8gMjtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuQG1peGluIG1hdC1iYWRnZS10aGVtZSgkdGhlbWUpIHtcbiAgJGFjY2VudDogbWFwLWdldCgkdGhlbWUsIGFjY2VudCk7XG4gICR3YXJuOiBtYXAtZ2V0KCR0aGVtZSwgd2Fybik7XG4gICRwcmltYXJ5OiBtYXAtZ2V0KCR0aGVtZSwgcHJpbWFyeSk7XG4gICRiYWNrZ3JvdW5kOiBtYXAtZ2V0KCR0aGVtZSwgYmFja2dyb3VuZCk7XG4gICRmb3JlZ3JvdW5kOiBtYXAtZ2V0KCR0aGVtZSwgZm9yZWdyb3VuZCk7XG5cbiAgLm1hdC1iYWRnZS1jb250ZW50IHtcbiAgICBjb2xvcjogbWF0LWNvbG9yKCRwcmltYXJ5LCBkZWZhdWx0LWNvbnRyYXN0KTtcbiAgICBiYWNrZ3JvdW5kOiBtYXQtY29sb3IoJHByaW1hcnkpO1xuXG4gICAgQGluY2x1ZGUgY2RrLWhpZ2gtY29udHJhc3Qge1xuICAgICAgb3V0bGluZTogc29saWQgMXB4O1xuICAgICAgYm9yZGVyLXJhZGl1czogMDtcbiAgICB9XG4gIH1cblxuICAubWF0LWJhZGdlLWFjY2VudCB7XG4gICAgLm1hdC1iYWRnZS1jb250ZW50IHtcbiAgICAgIGJhY2tncm91bmQ6IG1hdC1jb2xvcigkYWNjZW50KTtcbiAgICAgIGNvbG9yOiBtYXQtY29sb3IoJGFjY2VudCwgZGVmYXVsdC1jb250cmFzdCk7XG4gICAgfVxuICB9XG5cbiAgLm1hdC1iYWRnZS13YXJuIHtcbiAgICAubWF0LWJhZGdlLWNvbnRlbnQge1xuICAgICAgY29sb3I6IG1hdC1jb2xvcigkd2FybiwgZGVmYXVsdC1jb250cmFzdCk7XG4gICAgICBiYWNrZ3JvdW5kOiBtYXQtY29sb3IoJHdhcm4pO1xuICAgIH1cbiAgfVxuXG4gIC5tYXQtYmFkZ2Uge1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgfVxuXG4gIC5tYXQtYmFkZ2UtaGlkZGVuIHtcbiAgICAubWF0LWJhZGdlLWNvbnRlbnQge1xuICAgICAgZGlzcGxheTogbm9uZTtcbiAgICB9XG4gIH1cblxuICAubWF0LWJhZGdlLWRpc2FibGVkIHtcbiAgICAubWF0LWJhZGdlLWNvbnRlbnQge1xuICAgICAgJGFwcC1iYWNrZ3JvdW5kOiBtYXQtY29sb3IoJGJhY2tncm91bmQsICdiYWNrZ3JvdW5kJyk7XG4gICAgICAkYmFkZ2UtY29sb3I6IG1hdC1jb2xvcigkZm9yZWdyb3VuZCwgZGlzYWJsZWQtYnV0dG9uKTtcblxuICAgICAgLy8gVGhlIGRpc2FibGVkIGNvbG9yIHVzdWFsbHkgaGFzIHNvbWUga2luZCBvZiBvcGFjaXR5LCBidXQgYmVjYXVzZSB0aGUgYmFkZ2UgaXMgb3ZlcmxheWVkXG4gICAgICAvLyBvbiB0b3Agb2Ygc29tZXRoaW5nIGVsc2UsIGl0IHdvbid0IGxvb2sgZ29vZCBpZiBpdCdzIG9wYXF1ZS4gSWYgaXQgaXMgYSBjb2xvciAqdHlwZSosXG4gICAgICAvLyB3ZSBjb252ZXJ0IGl0IGludG8gYSBzb2xpZCBjb2xvciBieSB0YWtpbmcgdGhlIG9wYWNpdHkgZnJvbSB0aGUgcmdiYSB2YWx1ZSBhbmQgdXNpbmdcbiAgICAgIC8vIHRoZSB2YWx1ZSB0byBkZXRlcm1pbmUgdGhlIHBlcmNlbnRhZ2Ugb2YgdGhlIGJhY2tncm91bmQgdG8gcHV0IGludG8gZm9yZWdyb3VuZCB3aGVuXG4gICAgICAvLyBtaXhpbmcgdGhlIGNvbG9ycyB0b2dldGhlci5cbiAgICAgIEBpZiAodHlwZS1vZigkYmFkZ2UtY29sb3IpID09IGNvbG9yIGFuZCB0eXBlLW9mKCRhcHAtYmFja2dyb3VuZCkgPT0gY29sb3IpIHtcbiAgICAgICAgJGJhZGdlLW9wYWNpdHk6IG9wYWNpdHkoJGJhZGdlLWNvbG9yKTtcbiAgICAgICAgYmFja2dyb3VuZDogbWl4KCRhcHAtYmFja2dyb3VuZCwgcmdiYSgkYmFkZ2UtY29sb3IsIDEpLCAoMSAtICRiYWRnZS1vcGFjaXR5KSAqIDEwMCUpO1xuICAgICAgfVxuICAgICAgQGVsc2Uge1xuICAgICAgICBiYWNrZ3JvdW5kOiAkYmFkZ2UtY29sb3I7XG4gICAgICB9XG5cbiAgICAgIGNvbG9yOiBtYXQtY29sb3IoJGZvcmVncm91bmQsIGRpc2FibGVkLXRleHQpO1xuICAgIH1cbiAgfVxuXG4gIC5tYXQtYmFkZ2UtY29udGVudCB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgIHRyYW5zaXRpb246IHRyYW5zZm9ybSAyMDBtcyBlYXNlLWluLW91dDtcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDAuNik7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICAgIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xuICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICB9XG5cbiAgLy8gVGhlIGFjdGl2ZSBjbGFzcyBpcyBhZGRlZCBhZnRlciB0aGUgZWxlbWVudCBpcyBhZGRlZFxuICAvLyBzbyBpdCBjYW4gYW5pbWF0ZSBzY2FsZSB0byBkZWZhdWx0XG4gIC5tYXQtYmFkZ2UtY29udGVudC5tYXQtYmFkZ2UtYWN0aXZlIHtcbiAgICAvLyBTY2FsZSB0byBgbm9uZWAgaW5zdGVhZCBvZiBgMWAgdG8gYXZvaWQgYmx1cnJ5IHRleHQgaW4gc29tZSBicm93c2Vycy5cbiAgICB0cmFuc2Zvcm06IG5vbmU7XG4gIH1cblxuICAubWF0LWJhZGdlLXNtYWxsIHtcbiAgICBAaW5jbHVkZSBfbWF0LWJhZGdlLXNpemUoJG1hdC1iYWRnZS1zbWFsbC1zaXplKTtcbiAgfVxuICAubWF0LWJhZGdlLW1lZGl1bSB7XG4gICAgQGluY2x1ZGUgX21hdC1iYWRnZS1zaXplKCRtYXQtYmFkZ2UtZGVmYXVsdC1zaXplKTtcbiAgfVxuICAubWF0LWJhZGdlLWxhcmdlIHtcbiAgICBAaW5jbHVkZSBfbWF0LWJhZGdlLXNpemUoJG1hdC1iYWRnZS1sYXJnZS1zaXplKTtcbiAgfVxufVxuXG5AbWl4aW4gbWF0LWJhZGdlLXR5cG9ncmFwaHkoJGNvbmZpZykge1xuICAubWF0LWJhZGdlLWNvbnRlbnQge1xuICAgIGZvbnQtd2VpZ2h0OiAkbWF0LWJhZGdlLWZvbnQtd2VpZ2h0O1xuICAgIGZvbnQtc2l6ZTogJG1hdC1iYWRnZS1mb250LXNpemU7XG4gICAgZm9udC1mYW1pbHk6IG1hdC1mb250LWZhbWlseSgkY29uZmlnKTtcbiAgfVxuXG4gIC5tYXQtYmFkZ2Utc21hbGwgLm1hdC1iYWRnZS1jb250ZW50IHtcbiAgICBmb250LXNpemU6ICRtYXQtYmFkZ2UtZm9udC1zaXplIC8gMjtcbiAgfVxuXG4gIC5tYXQtYmFkZ2UtbGFyZ2UgLm1hdC1iYWRnZS1jb250ZW50IHtcbiAgICBmb250LXNpemU6ICRtYXQtYmFkZ2UtZm9udC1zaXplICogMjtcbiAgfVxufVxuXG5cblxuXG5cbkBtaXhpbiBtYXQtYm90dG9tLXNoZWV0LXRoZW1lKCR0aGVtZSkge1xuICAkYmFja2dyb3VuZDogbWFwLWdldCgkdGhlbWUsIGJhY2tncm91bmQpO1xuICAkZm9yZWdyb3VuZDogbWFwLWdldCgkdGhlbWUsIGZvcmVncm91bmQpO1xuXG4gIC5tYXQtYm90dG9tLXNoZWV0LWNvbnRhaW5lciB7XG4gICAgQGluY2x1ZGUgX21hdC10aGVtZS1lbGV2YXRpb24oMTYsICR0aGVtZSk7XG4gICAgYmFja2dyb3VuZDogbWF0LWNvbG9yKCRiYWNrZ3JvdW5kLCBkaWFsb2cpO1xuICAgIGNvbG9yOiBtYXQtY29sb3IoJGZvcmVncm91bmQsIHRleHQpO1xuICB9XG59XG5cbkBtaXhpbiBtYXQtYm90dG9tLXNoZWV0LXR5cG9ncmFwaHkoJGNvbmZpZykge1xuICAubWF0LWJvdHRvbS1zaGVldC1jb250YWluZXIge1xuICAgIEBpbmNsdWRlIG1hdC10eXBvZ3JhcGh5LWxldmVsLXRvLXN0eWxlcygkY29uZmlnLCBib2R5LTEpO1xuICB9XG59XG5cblxuXG5cblxuJF9tYXQtYnV0dG9uLXJpcHBsZS1vcGFjaXR5OiAwLjE7XG5cbi8vIEFwcGxpZXMgYSBmb2N1cyBzdHlsZSB0byBhbiBtYXQtYnV0dG9uIGVsZW1lbnQgZm9yIGVhY2ggb2YgdGhlIHN1cHBvcnRlZCBwYWxldHRlcy5cbkBtaXhpbiBfbWF0LWJ1dHRvbi1mb2N1cy1vdmVybGF5LWNvbG9yKCR0aGVtZSkge1xuICAkcHJpbWFyeTogbWFwLWdldCgkdGhlbWUsIHByaW1hcnkpO1xuICAkYWNjZW50OiBtYXAtZ2V0KCR0aGVtZSwgYWNjZW50KTtcbiAgJHdhcm46IG1hcC1nZXQoJHRoZW1lLCB3YXJuKTtcblxuICAmLm1hdC1wcmltYXJ5IC5tYXQtYnV0dG9uLWZvY3VzLW92ZXJsYXkge1xuICAgIGJhY2tncm91bmQtY29sb3I6IG1hdC1jb2xvcigkcHJpbWFyeSk7XG4gIH1cblxuICAmLm1hdC1hY2NlbnQgLm1hdC1idXR0b24tZm9jdXMtb3ZlcmxheSB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogbWF0LWNvbG9yKCRhY2NlbnQpO1xuICB9XG5cbiAgJi5tYXQtd2FybiAubWF0LWJ1dHRvbi1mb2N1cy1vdmVybGF5IHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBtYXQtY29sb3IoJHdhcm4pO1xuICB9XG5cbiAgJltkaXNhYmxlZF0gLm1hdC1idXR0b24tZm9jdXMtb3ZlcmxheSB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gIH1cbn1cblxuQG1peGluIF9tYXQtYnV0dG9uLXJpcHBsZS1jb2xvcigkdGhlbWUsICRodWUsICRvcGFjaXR5OiAkX21hdC1idXR0b24tcmlwcGxlLW9wYWNpdHkpIHtcbiAgJHByaW1hcnk6IG1hcC1nZXQoJHRoZW1lLCBwcmltYXJ5KTtcbiAgJGFjY2VudDogbWFwLWdldCgkdGhlbWUsIGFjY2VudCk7XG4gICR3YXJuOiBtYXAtZ2V0KCR0aGVtZSwgd2Fybik7XG5cbiAgJi5tYXQtcHJpbWFyeSAubWF0LXJpcHBsZS1lbGVtZW50IHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBtYXQtY29sb3IoJHByaW1hcnksICRodWUsICRvcGFjaXR5KTtcbiAgfVxuXG4gICYubWF0LWFjY2VudCAubWF0LXJpcHBsZS1lbGVtZW50IHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBtYXQtY29sb3IoJGFjY2VudCwgJGh1ZSwgJG9wYWNpdHkpO1xuICB9XG5cbiAgJi5tYXQtd2FybiAubWF0LXJpcHBsZS1lbGVtZW50IHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBtYXQtY29sb3IoJHdhcm4sICRodWUsICRvcGFjaXR5KTtcbiAgfVxufVxuXG4vLyBBcHBsaWVzIGEgcHJvcGVydHkgdG8gYW4gbWF0LWJ1dHRvbiBlbGVtZW50IGZvciBlYWNoIG9mIHRoZSBzdXBwb3J0ZWQgcGFsZXR0ZXMuXG5AbWl4aW4gX21hdC1idXR0b24tdGhlbWUtcHJvcGVydHkoJHRoZW1lLCAkcHJvcGVydHksICRodWUpIHtcbiAgJHByaW1hcnk6IG1hcC1nZXQoJHRoZW1lLCBwcmltYXJ5KTtcbiAgJGFjY2VudDogbWFwLWdldCgkdGhlbWUsIGFjY2VudCk7XG4gICR3YXJuOiBtYXAtZ2V0KCR0aGVtZSwgd2Fybik7XG4gICRiYWNrZ3JvdW5kOiBtYXAtZ2V0KCR0aGVtZSwgYmFja2dyb3VuZCk7XG4gICRmb3JlZ3JvdW5kOiBtYXAtZ2V0KCR0aGVtZSwgZm9yZWdyb3VuZCk7XG5cbiAgJi5tYXQtcHJpbWFyeSB7XG4gICAgI3skcHJvcGVydHl9OiBtYXQtY29sb3IoJHByaW1hcnksICRodWUpO1xuICB9XG4gICYubWF0LWFjY2VudCB7XG4gICAgI3skcHJvcGVydHl9OiBtYXQtY29sb3IoJGFjY2VudCwgJGh1ZSk7XG4gIH1cbiAgJi5tYXQtd2FybiB7XG4gICAgI3skcHJvcGVydHl9OiBtYXQtY29sb3IoJHdhcm4sICRodWUpO1xuICB9XG5cbiAgJi5tYXQtcHJpbWFyeSwgJi5tYXQtYWNjZW50LCAmLm1hdC13YXJuLCAmW2Rpc2FibGVkXSB7XG4gICAgJltkaXNhYmxlZF0ge1xuICAgICAgJHBhbGV0dGU6IGlmKCRwcm9wZXJ0eSA9PSAnY29sb3InLCAkZm9yZWdyb3VuZCwgJGJhY2tncm91bmQpO1xuICAgICAgI3skcHJvcGVydHl9OiBtYXQtY29sb3IoJHBhbGV0dGUsIGRpc2FibGVkLWJ1dHRvbik7XG4gICAgfVxuICB9XG59XG5cbkBtaXhpbiBtYXQtYnV0dG9uLXRoZW1lKCR0aGVtZSkge1xuICAkcHJpbWFyeTogbWFwLWdldCgkdGhlbWUsIHByaW1hcnkpO1xuICAkYWNjZW50OiBtYXAtZ2V0KCR0aGVtZSwgYWNjZW50KTtcbiAgJHdhcm46IG1hcC1nZXQoJHRoZW1lLCB3YXJuKTtcbiAgJGJhY2tncm91bmQ6IG1hcC1nZXQoJHRoZW1lLCBiYWNrZ3JvdW5kKTtcbiAgJGZvcmVncm91bmQ6IG1hcC1nZXQoJHRoZW1lLCBmb3JlZ3JvdW5kKTtcblxuICAubWF0LWJ1dHRvbiwgLm1hdC1pY29uLWJ1dHRvbiwgLm1hdC1zdHJva2VkLWJ1dHRvbiB7XG4gICAgLy8gQnV0dG9ucyB3aXRob3V0IGEgYmFja2dyb3VuZCBjb2xvciBzaG91bGQgaW5oZXJpdCB0aGUgZm9udCBjb2xvci4gVGhpcyBpcyBuZWNlc3NhcnkgdG9cbiAgICAvLyBlbnN1cmUgdGhhdCB0aGUgYnV0dG9uIGlzIHJlYWRhYmxlIG9uIGN1c3RvbSBiYWNrZ3JvdW5kIGNvbG9ycy4gSXQncyB3cm9uZyB0byBhbHdheXMgYXNzdW1lXG4gICAgLy8gdGhhdCB0aG9zZSBidXR0b25zIGFyZSBhbHdheXMgcGxhY2VkIGluc2lkZSBvZiBjb250YWluZXJzIHdpdGggdGhlIGRlZmF1bHQgYmFja2dyb3VuZFxuICAgIC8vIGNvbG9yIG9mIHRoZSB0aGVtZSAoZS5nLiB0aGVtZWQgdG9vbGJhcnMpLlxuICAgIGNvbG9yOiBpbmhlcml0O1xuICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuXG4gICAgQGluY2x1ZGUgX21hdC1idXR0b24tdGhlbWUtcHJvcGVydHkoJHRoZW1lLCAnY29sb3InLCBkZWZhdWx0KTtcbiAgICBAaW5jbHVkZSBfbWF0LWJ1dHRvbi1mb2N1cy1vdmVybGF5LWNvbG9yKCR0aGVtZSk7XG5cbiAgICAvLyBTZXR1cCB0aGUgcmlwcGxlIGNvbG9yIHRvIGJlIGJhc2VkIG9uIHRoZSB0ZXh0IGNvbG9yLiBUaGlzIGVuc3VyZXMgdGhhdCB0aGUgcmlwcGxlc1xuICAgIC8vIGFyZSBtYXRjaGluZyB3aXRoIHRoZSBjdXJyZW50IHRoZW1lIHBhbGV0dGUgYW5kIGFyZSBpbiBjb250cmFzdCB0byB0aGUgYmFja2dyb3VuZCBjb2xvclxuICAgIC8vIChlLmcgaW4gdGhlbWVkIHRvb2xiYXJzKS5cbiAgICAubWF0LXJpcHBsZS1lbGVtZW50IHtcbiAgICAgIG9wYWNpdHk6ICRfbWF0LWJ1dHRvbi1yaXBwbGUtb3BhY2l0eTtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IGN1cnJlbnRDb2xvcjtcbiAgICB9XG4gIH1cblxuICAubWF0LWJ1dHRvbi1mb2N1cy1vdmVybGF5IHtcbiAgICBiYWNrZ3JvdW5kOiBtYXBfZ2V0KCRmb3JlZ3JvdW5kLCBiYXNlKTtcbiAgfVxuXG4gIC8vIE5vdGU6IHRoaXMgbmVlZHMgYSBiaXQgZXh0cmEgc3BlY2lmaWNpdHksIGJlY2F1c2Ugd2UncmUgbm90IGd1YXJhbnRlZWQgdGhlIGluY2x1c2lvblxuICAvLyBvcmRlciBvZiB0aGUgdGhlbWUgc3R5bGVzIGFuZCB0aGUgYnV0dG9uIHJlc2V0IG1heSBlbmQgdXAgcmVzZXR0aW5nIHRoaXMgYXMgd2VsbC5cbiAgLm1hdC1zdHJva2VkLWJ1dHRvbjpub3QoW2Rpc2FibGVkXSkge1xuICAgIGJvcmRlci1jb2xvcjogbWF0LWNvbG9yKCRmb3JlZ3JvdW5kLCBkaXZpZGVyKTtcbiAgfVxuXG4gIC5tYXQtZmxhdC1idXR0b24sIC5tYXQtcmFpc2VkLWJ1dHRvbiwgLm1hdC1mYWIsIC5tYXQtbWluaS1mYWIge1xuICAgIC8vIERlZmF1bHQgZm9udCBhbmQgYmFja2dyb3VuZCBjb2xvciB3aGVuIG5vdCB1c2luZyBhbnkgY29sb3IgcGFsZXR0ZS5cbiAgICBjb2xvcjogbWF0LWNvbG9yKCRmb3JlZ3JvdW5kLCB0ZXh0KTtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBtYXQtY29sb3IoJGJhY2tncm91bmQsIHJhaXNlZC1idXR0b24pO1xuXG4gICAgQGluY2x1ZGUgX21hdC1idXR0b24tdGhlbWUtcHJvcGVydHkoJHRoZW1lLCAnY29sb3InLCBkZWZhdWx0LWNvbnRyYXN0KTtcbiAgICBAaW5jbHVkZSBfbWF0LWJ1dHRvbi10aGVtZS1wcm9wZXJ0eSgkdGhlbWUsICdiYWNrZ3JvdW5kLWNvbG9yJywgZGVmYXVsdCk7XG4gICAgQGluY2x1ZGUgX21hdC1idXR0b24tcmlwcGxlLWNvbG9yKCR0aGVtZSwgZGVmYXVsdC1jb250cmFzdCk7XG4gIH1cblxuICAubWF0LXN0cm9rZWQtYnV0dG9uLCAubWF0LWZsYXQtYnV0dG9uIHtcbiAgICBAaW5jbHVkZSBfbWF0LXRoZW1lLW92ZXJyaWRhYmxlLWVsZXZhdGlvbigwLCAkdGhlbWUpO1xuICB9XG5cbiAgLm1hdC1yYWlzZWQtYnV0dG9uIHtcbiAgICBAaW5jbHVkZSBfbWF0LXRoZW1lLW92ZXJyaWRhYmxlLWVsZXZhdGlvbigyLCAkdGhlbWUpO1xuXG4gICAgJjpub3QoW2Rpc2FibGVkXSk6YWN0aXZlIHtcbiAgICAgIEBpbmNsdWRlIF9tYXQtdGhlbWUtb3ZlcnJpZGFibGUtZWxldmF0aW9uKDgsICR0aGVtZSk7XG4gICAgfVxuXG4gICAgJltkaXNhYmxlZF0ge1xuICAgICAgQGluY2x1ZGUgX21hdC10aGVtZS1vdmVycmlkYWJsZS1lbGV2YXRpb24oMCwgJHRoZW1lKTtcbiAgICB9XG4gIH1cblxuICAubWF0LWZhYiwgLm1hdC1taW5pLWZhYiB7XG4gICAgQGluY2x1ZGUgX21hdC10aGVtZS1vdmVycmlkYWJsZS1lbGV2YXRpb24oNiwgJHRoZW1lKTtcblxuICAgICY6bm90KFtkaXNhYmxlZF0pOmFjdGl2ZSB7XG4gICAgICBAaW5jbHVkZSBfbWF0LXRoZW1lLW92ZXJyaWRhYmxlLWVsZXZhdGlvbigxMiwgJHRoZW1lKTtcbiAgICB9XG5cbiAgICAmW2Rpc2FibGVkXSB7XG4gICAgICBAaW5jbHVkZSBfbWF0LXRoZW1lLW92ZXJyaWRhYmxlLWVsZXZhdGlvbigwLCAkdGhlbWUpO1xuICAgIH1cbiAgfVxufVxuXG5AbWl4aW4gbWF0LWJ1dHRvbi10eXBvZ3JhcGh5KCRjb25maWcpIHtcbiAgLm1hdC1idXR0b24sIC5tYXQtcmFpc2VkLWJ1dHRvbiwgLm1hdC1pY29uLWJ1dHRvbiwgLm1hdC1zdHJva2VkLWJ1dHRvbixcbiAgLm1hdC1mbGF0LWJ1dHRvbiwgLm1hdC1mYWIsIC5tYXQtbWluaS1mYWIge1xuICAgIGZvbnQ6IHtcbiAgICAgIGZhbWlseTogbWF0LWZvbnQtZmFtaWx5KCRjb25maWcsIGJ1dHRvbik7XG4gICAgICBzaXplOiBtYXQtZm9udC1zaXplKCRjb25maWcsIGJ1dHRvbik7XG4gICAgICB3ZWlnaHQ6IG1hdC1mb250LXdlaWdodCgkY29uZmlnLCBidXR0b24pO1xuICAgIH1cbiAgfVxufVxuXG5cblxuXG5cblxuQG1peGluIG1hdC1idXR0b24tdG9nZ2xlLXRoZW1lKCR0aGVtZSkge1xuICAkZm9yZWdyb3VuZDogbWFwLWdldCgkdGhlbWUsIGZvcmVncm91bmQpO1xuICAkYmFja2dyb3VuZDogbWFwLWdldCgkdGhlbWUsIGJhY2tncm91bmQpO1xuICAkZGl2aWRlci1jb2xvcjogbWF0LWNvbG9yKCRmb3JlZ3JvdW5kLCBkaXZpZGVyKTtcblxuICAubWF0LWJ1dHRvbi10b2dnbGUtc3RhbmRhbG9uZSxcbiAgLm1hdC1idXR0b24tdG9nZ2xlLWdyb3VwIHtcbiAgICBAaW5jbHVkZSBfbWF0LXRoZW1lLWVsZXZhdGlvbigyLCAkdGhlbWUpO1xuICB9XG5cbiAgLm1hdC1idXR0b24tdG9nZ2xlLXN0YW5kYWxvbmUubWF0LWJ1dHRvbi10b2dnbGUtYXBwZWFyYW5jZS1zdGFuZGFyZCxcbiAgLm1hdC1idXR0b24tdG9nZ2xlLWdyb3VwLWFwcGVhcmFuY2Utc3RhbmRhcmQge1xuICAgIGJveC1zaGFkb3c6IG5vbmU7XG4gIH1cblxuICAubWF0LWJ1dHRvbi10b2dnbGUge1xuICAgIGNvbG9yOiBtYXQtY29sb3IoJGZvcmVncm91bmQsIGhpbnQtdGV4dCk7XG5cbiAgICAubWF0LWJ1dHRvbi10b2dnbGUtZm9jdXMtb3ZlcmxheSB7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiBtYXQtY29sb3IoJGJhY2tncm91bmQsIGZvY3VzZWQtYnV0dG9uKTtcbiAgICB9XG4gIH1cblxuICAubWF0LWJ1dHRvbi10b2dnbGUtYXBwZWFyYW5jZS1zdGFuZGFyZCB7XG4gICAgY29sb3I6IG1hdC1jb2xvcigkZm9yZWdyb3VuZCwgdGV4dCk7XG4gICAgYmFja2dyb3VuZDogbWF0LWNvbG9yKCRiYWNrZ3JvdW5kLCBjYXJkKTtcblxuICAgIC5tYXQtYnV0dG9uLXRvZ2dsZS1mb2N1cy1vdmVybGF5IHtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IG1hdC1jb2xvcigkYmFja2dyb3VuZCwgZm9jdXNlZC1idXR0b24sIDEpO1xuICAgIH1cbiAgfVxuXG4gIC5tYXQtYnV0dG9uLXRvZ2dsZS1ncm91cC1hcHBlYXJhbmNlLXN0YW5kYXJkIC5tYXQtYnV0dG9uLXRvZ2dsZSArIC5tYXQtYnV0dG9uLXRvZ2dsZSB7XG4gICAgYm9yZGVyLWxlZnQ6IHNvbGlkIDFweCAkZGl2aWRlci1jb2xvcjtcbiAgfVxuXG4gIFtkaXI9J3J0bCddIC5tYXQtYnV0dG9uLXRvZ2dsZS1ncm91cC1hcHBlYXJhbmNlLXN0YW5kYXJkIC5tYXQtYnV0dG9uLXRvZ2dsZSArIC5tYXQtYnV0dG9uLXRvZ2dsZSB7XG4gICAgYm9yZGVyLWxlZnQ6IG5vbmU7XG4gICAgYm9yZGVyLXJpZ2h0OiBzb2xpZCAxcHggJGRpdmlkZXItY29sb3I7XG4gIH1cblxuICAubWF0LWJ1dHRvbi10b2dnbGUtZ3JvdXAtYXBwZWFyYW5jZS1zdGFuZGFyZC5tYXQtYnV0dG9uLXRvZ2dsZS12ZXJ0aWNhbCB7XG4gICAgLm1hdC1idXR0b24tdG9nZ2xlICsgLm1hdC1idXR0b24tdG9nZ2xlIHtcbiAgICAgIGJvcmRlci1sZWZ0OiBub25lO1xuICAgICAgYm9yZGVyLXJpZ2h0OiBub25lO1xuICAgICAgYm9yZGVyLXRvcDogc29saWQgMXB4ICRkaXZpZGVyLWNvbG9yO1xuICAgIH1cbiAgfVxuXG4gIC5tYXQtYnV0dG9uLXRvZ2dsZS1jaGVja2VkIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBtYXQtY29sb3IoJGJhY2tncm91bmQsIHNlbGVjdGVkLWJ1dHRvbik7XG4gICAgY29sb3I6IG1hdC1jb2xvcigkZm9yZWdyb3VuZCwgc2Vjb25kYXJ5LXRleHQpO1xuXG4gICAgJi5tYXQtYnV0dG9uLXRvZ2dsZS1hcHBlYXJhbmNlLXN0YW5kYXJkIHtcbiAgICAgIGNvbG9yOiBtYXQtY29sb3IoJGZvcmVncm91bmQsIHRleHQpO1xuICAgIH1cbiAgfVxuXG4gIC5tYXQtYnV0dG9uLXRvZ2dsZS1kaXNhYmxlZCB7XG4gICAgY29sb3I6IG1hdC1jb2xvcigkZm9yZWdyb3VuZCwgZGlzYWJsZWQtYnV0dG9uKTtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBtYXQtY29sb3IoJGJhY2tncm91bmQsIGRpc2FibGVkLWJ1dHRvbi10b2dnbGUpO1xuXG4gICAgJi5tYXQtYnV0dG9uLXRvZ2dsZS1hcHBlYXJhbmNlLXN0YW5kYXJkIHtcbiAgICAgIGJhY2tncm91bmQ6IG1hdC1jb2xvcigkYmFja2dyb3VuZCwgY2FyZCk7XG4gICAgfVxuXG4gICAgJi5tYXQtYnV0dG9uLXRvZ2dsZS1jaGVja2VkIHtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IG1hdC1jb2xvcigkYmFja2dyb3VuZCwgc2VsZWN0ZWQtZGlzYWJsZWQtYnV0dG9uKTtcbiAgICB9XG4gIH1cblxuICAubWF0LWJ1dHRvbi10b2dnbGUtc3RhbmRhbG9uZS5tYXQtYnV0dG9uLXRvZ2dsZS1hcHBlYXJhbmNlLXN0YW5kYXJkLFxuICAubWF0LWJ1dHRvbi10b2dnbGUtZ3JvdXAtYXBwZWFyYW5jZS1zdGFuZGFyZCB7XG4gICAgYm9yZGVyOiBzb2xpZCAxcHggJGRpdmlkZXItY29sb3I7XG4gIH1cbn1cblxuQG1peGluIG1hdC1idXR0b24tdG9nZ2xlLXR5cG9ncmFwaHkoJGNvbmZpZykge1xuICAubWF0LWJ1dHRvbi10b2dnbGUge1xuICAgIGZvbnQtZmFtaWx5OiBtYXQtZm9udC1mYW1pbHkoJGNvbmZpZyk7XG4gIH1cbn1cblxuXG5cblxuXG5cblxuQG1peGluIG1hdC1jYXJkLXRoZW1lKCR0aGVtZSkge1xuICAkYmFja2dyb3VuZDogbWFwLWdldCgkdGhlbWUsIGJhY2tncm91bmQpO1xuICAkZm9yZWdyb3VuZDogbWFwLWdldCgkdGhlbWUsIGZvcmVncm91bmQpO1xuXG4gIC5tYXQtY2FyZCB7XG4gICAgQGluY2x1ZGUgX21hdC10aGVtZS1vdmVycmlkYWJsZS1lbGV2YXRpb24oMSwgJHRoZW1lKTtcbiAgICBiYWNrZ3JvdW5kOiBtYXQtY29sb3IoJGJhY2tncm91bmQsIGNhcmQpO1xuICAgIGNvbG9yOiBtYXQtY29sb3IoJGZvcmVncm91bmQsIHRleHQpO1xuXG4gICAgLy8gTmVlZHMgZXh0cmEgc3BlY2lmaWNpdHkgdG8gYmUgYWJsZSB0byBvdmVycmlkZSB0aGUgZWxldmF0aW9uIHNlbGVjdG9ycy5cbiAgICAmLm1hdC1jYXJkLWZsYXQge1xuICAgICAgQGluY2x1ZGUgX21hdC10aGVtZS1vdmVycmlkYWJsZS1lbGV2YXRpb24oMCwgJHRoZW1lKTtcbiAgICB9XG4gIH1cblxuICAubWF0LWNhcmQtc3VidGl0bGUge1xuICAgIGNvbG9yOiBtYXQtY29sb3IoJGZvcmVncm91bmQsIHNlY29uZGFyeS10ZXh0KTtcbiAgfVxufVxuXG5AbWl4aW4gbWF0LWNhcmQtdHlwb2dyYXBoeSgkY29uZmlnKSB7XG4gIC5tYXQtY2FyZCB7XG4gICAgZm9udC1mYW1pbHk6IG1hdC1mb250LWZhbWlseSgkY29uZmlnKTtcbiAgfVxuXG4gIC5tYXQtY2FyZC10aXRsZSB7XG4gICAgZm9udDoge1xuICAgICAgc2l6ZTogbWF0LWZvbnQtc2l6ZSgkY29uZmlnLCBoZWFkbGluZSk7XG4gICAgICB3ZWlnaHQ6IG1hdC1mb250LXdlaWdodCgkY29uZmlnLCB0aXRsZSk7XG4gICAgfVxuICB9XG5cbiAgLm1hdC1jYXJkLWhlYWRlciAubWF0LWNhcmQtdGl0bGUge1xuICAgIGZvbnQtc2l6ZTogbWF0LWZvbnQtc2l6ZSgkY29uZmlnLCB0aXRsZSk7XG4gIH1cblxuICAubWF0LWNhcmQtc3VidGl0bGUsXG4gIC5tYXQtY2FyZC1jb250ZW50IHtcbiAgICBmb250LXNpemU6IG1hdC1mb250LXNpemUoJGNvbmZpZywgYm9keS0xKTtcbiAgfVxufVxuXG5cblxuXG5cblxuQG1peGluIG1hdC1jaGVja2JveC10aGVtZSgkdGhlbWUpIHtcbiAgJGlzLWRhcmstdGhlbWU6IG1hcC1nZXQoJHRoZW1lLCBpcy1kYXJrKTtcbiAgJHByaW1hcnk6IG1hcC1nZXQoJHRoZW1lLCBwcmltYXJ5KTtcbiAgJGFjY2VudDogbWFwLWdldCgkdGhlbWUsIGFjY2VudCk7XG4gICR3YXJuOiBtYXAtZ2V0KCR0aGVtZSwgd2Fybik7XG4gICRiYWNrZ3JvdW5kOiBtYXAtZ2V0KCR0aGVtZSwgYmFja2dyb3VuZCk7XG4gICRmb3JlZ3JvdW5kOiBtYXAtZ2V0KCR0aGVtZSwgZm9yZWdyb3VuZCk7XG5cblxuICAvLyBUaGUgY29sb3Igb2YgdGhlIGNoZWNrYm94J3MgY2hlY2ttYXJrIC8gbWl4ZWRtYXJrLlxuICAkY2hlY2tib3gtbWFyay1jb2xvcjogbWF0LWNvbG9yKCRiYWNrZ3JvdW5kLCBiYWNrZ3JvdW5kKTtcblxuICAvLyBOT1RFKHRyYXZpc2thdWZtYW4pOiBXaGlsZSB0aGUgc3BlYyBjYWxscyBmb3IgdHJhbnNsdWNlbnQgYmxhY2tzL3doaXRlcyBmb3IgZGlzYWJsZWQgY29sb3JzLFxuICAvLyB0aGlzIGRvZXMgbm90IHdvcmsgd2VsbCB3aXRoIGVsZW1lbnRzIGxheWVyZWQgb24gdG9wIG9mIG9uZSBhbm90aGVyLiBUbyBnZXQgYXJvdW5kIHRoaXMgd2VcbiAgLy8gYmxlbmQgdGhlIGNvbG9ycyB0b2dldGhlciBiYXNlZCBvbiB0aGUgYmFzZSBjb2xvciBhbmQgdGhlIHRoZW1lIGJhY2tncm91bmQuXG4gICR3aGl0ZS0zMHBjdC1vcGFjaXR5LW9uLWRhcms6ICM2ODY4Njg7XG4gICRibGFjay0yNnBjdC1vcGFjaXR5LW9uLWxpZ2h0OiAjYjBiMGIwO1xuICAkZGlzYWJsZWQtY29sb3I6IGlmKCRpcy1kYXJrLXRoZW1lLCAkd2hpdGUtMzBwY3Qtb3BhY2l0eS1vbi1kYXJrLCAkYmxhY2stMjZwY3Qtb3BhY2l0eS1vbi1saWdodCk7XG5cbiAgLm1hdC1jaGVja2JveC1mcmFtZSB7XG4gICAgYm9yZGVyLWNvbG9yOiBtYXQtY29sb3IoJGZvcmVncm91bmQsIHNlY29uZGFyeS10ZXh0KTtcbiAgfVxuXG4gIC5tYXQtY2hlY2tib3gtY2hlY2ttYXJrIHtcbiAgICBmaWxsOiAkY2hlY2tib3gtbWFyay1jb2xvcjtcbiAgfVxuXG4gIC5tYXQtY2hlY2tib3gtY2hlY2ttYXJrLXBhdGgge1xuICAgIC8vICFpbXBvcnRhbnQgaXMgbmVlZGVkIGhlcmUgYmVjYXVzZSBhIHN0cm9rZSBtdXN0IGJlIHNldCBhcyBhblxuICAgIC8vIGF0dHJpYnV0ZSBvbiB0aGUgU1ZHIGluIG9yZGVyIGZvciBsaW5lIGFuaW1hdGlvbiB0byB3b3JrIHByb3Blcmx5LlxuICAgIHN0cm9rZTogJGNoZWNrYm94LW1hcmstY29sb3IgIWltcG9ydGFudDtcblxuICAgIEBpbmNsdWRlIGNkay1oaWdoLWNvbnRyYXN0KGJsYWNrLW9uLXdoaXRlKSB7XG4gICAgICAvLyBIYXZpbmcgdGhlIG9uZSBhYm92ZSBiZSAhaW1wb3J0YW50IGVuZHMgdXAgb3ZlcnJpZGluZyB0aGUgYnJvd3NlcidzIGF1dG9tYXRpY1xuICAgICAgLy8gY29sb3IgaW52ZXJzaW9uIHNvIHdlIG5lZWQgdG8gcmUtaW52ZXJ0IGl0IG91cnNlbHZlcyBmb3IgYmxhY2stb24td2hpdGUuXG4gICAgICBzdHJva2U6ICMwMDAgIWltcG9ydGFudDtcbiAgICB9XG4gIH1cblxuICAubWF0LWNoZWNrYm94LW1peGVkbWFyayB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogJGNoZWNrYm94LW1hcmstY29sb3I7XG4gIH1cblxuICAubWF0LWNoZWNrYm94LWluZGV0ZXJtaW5hdGUsIC5tYXQtY2hlY2tib3gtY2hlY2tlZCB7XG4gICAgJi5tYXQtcHJpbWFyeSAubWF0LWNoZWNrYm94LWJhY2tncm91bmQge1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogbWF0LWNvbG9yKCRwcmltYXJ5KTtcbiAgICB9XG5cbiAgICAmLm1hdC1hY2NlbnQgLm1hdC1jaGVja2JveC1iYWNrZ3JvdW5kIHtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IG1hdC1jb2xvcigkYWNjZW50KTtcbiAgICB9XG5cbiAgICAmLm1hdC13YXJuIC5tYXQtY2hlY2tib3gtYmFja2dyb3VuZCB7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiBtYXQtY29sb3IoJHdhcm4pO1xuICAgIH1cbiAgfVxuXG4gIC5tYXQtY2hlY2tib3gtZGlzYWJsZWQge1xuICAgICYubWF0LWNoZWNrYm94LWNoZWNrZWQsXG4gICAgJi5tYXQtY2hlY2tib3gtaW5kZXRlcm1pbmF0ZSB7XG4gICAgICAubWF0LWNoZWNrYm94LWJhY2tncm91bmQge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkZGlzYWJsZWQtY29sb3I7XG4gICAgICB9XG4gICAgfVxuXG4gICAgJjpub3QoLm1hdC1jaGVja2JveC1jaGVja2VkKSB7XG4gICAgICAubWF0LWNoZWNrYm94LWZyYW1lIHtcbiAgICAgICAgYm9yZGVyLWNvbG9yOiAkZGlzYWJsZWQtY29sb3I7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLm1hdC1jaGVja2JveC1sYWJlbCB7XG4gICAgICBjb2xvcjogbWF0LWNvbG9yKCRmb3JlZ3JvdW5kLCBzZWNvbmRhcnktdGV4dCk7XG4gICAgfVxuXG4gICAgQGluY2x1ZGUgY2RrLWhpZ2gtY29udHJhc3Qge1xuICAgICAgb3BhY2l0eTogMC41O1xuICAgIH1cbiAgfVxuXG4gIC8vIFRoaXMgb25lIGlzIG1vdmVkIGRvd24gaGVyZSBzbyBpdCBjYW4gdGFyZ2V0IGJvdGhcbiAgLy8gdGhlIHRoZW1lIGNvbG9ycyBhbmQgdGhlIGRpc2FibGVkIHN0YXRlLlxuICBAaW5jbHVkZSBjZGstaGlnaC1jb250cmFzdCB7XG4gICAgLm1hdC1jaGVja2JveC1iYWNrZ3JvdW5kIHtcbiAgICAgIC8vIE5lZWRzIHRvIGJlIHJlbW92ZWQgYmVjYXVzZSBpdCBoaWRlcyB0aGUgY2hlY2tib3ggb3V0bGluZS5cbiAgICAgIGJhY2tncm91bmQ6IG5vbmU7XG4gICAgfVxuICB9XG5cbiAgLm1hdC1jaGVja2JveDpub3QoLm1hdC1jaGVja2JveC1kaXNhYmxlZCkge1xuICAgICYubWF0LXByaW1hcnkgLm1hdC1jaGVja2JveC1yaXBwbGUgLm1hdC1yaXBwbGUtZWxlbWVudCB7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiBtYXQtY29sb3IoJHByaW1hcnkpO1xuICAgIH1cblxuICAgICYubWF0LWFjY2VudCAubWF0LWNoZWNrYm94LXJpcHBsZSAubWF0LXJpcHBsZS1lbGVtZW50IHtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IG1hdC1jb2xvcigkYWNjZW50KTtcbiAgICB9XG5cbiAgICAmLm1hdC13YXJuIC5tYXQtY2hlY2tib3gtcmlwcGxlIC5tYXQtcmlwcGxlLWVsZW1lbnQge1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogbWF0LWNvbG9yKCR3YXJuKTtcbiAgICB9XG4gIH1cbn1cblxuQG1peGluIG1hdC1jaGVja2JveC10eXBvZ3JhcGh5KCRjb25maWcpIHtcbiAgLm1hdC1jaGVja2JveCB7XG4gICAgZm9udC1mYW1pbHk6IG1hdC1mb250LWZhbWlseSgkY29uZmlnKTtcbiAgfVxuXG4gIC8vIFRPRE8oa2FyYSk6IFJlbW92ZSB0aGlzIHN0eWxlIHdoZW4gZml4aW5nIHZlcnRpY2FsIGJhc2VsaW5lXG4gIC5tYXQtY2hlY2tib3gtbGF5b3V0IC5tYXQtY2hlY2tib3gtbGFiZWwge1xuICAgIGxpbmUtaGVpZ2h0OiBtYXQtbGluZS1oZWlnaHQoJGNvbmZpZywgYm9keS0yKTtcbiAgfVxufVxuXG5cblxuXG5cblxuJG1hdC1jaGlwLXJlbW92ZS1mb250LXNpemU6IDE4cHg7XG5cbkBtaXhpbiBtYXQtY2hpcHMtY29sb3IoJGZvcmVncm91bmQsICRiYWNrZ3JvdW5kKSB7XG4gIGJhY2tncm91bmQtY29sb3I6ICRiYWNrZ3JvdW5kO1xuICBjb2xvcjogJGZvcmVncm91bmQ7XG5cbiAgLm1hdC1jaGlwLXJlbW92ZSB7XG4gICAgY29sb3I6ICRmb3JlZ3JvdW5kO1xuICAgIG9wYWNpdHk6IDAuNDtcbiAgfVxufVxuXG5AbWl4aW4gbWF0LWNoaXBzLXRoZW1lLWNvbG9yKCRwYWxldHRlKSB7XG4gIEBpbmNsdWRlIG1hdC1jaGlwcy1jb2xvcihtYXQtY29sb3IoJHBhbGV0dGUsIGRlZmF1bHQtY29udHJhc3QpLCBtYXQtY29sb3IoJHBhbGV0dGUpKTtcblxuICAubWF0LXJpcHBsZS1lbGVtZW50IHtcbiAgICBiYWNrZ3JvdW5kOiBtYXQtY29sb3IoJHBhbGV0dGUsIGRlZmF1bHQtY29udHJhc3QsIDAuMSk7XG4gIH1cbn1cblxuQG1peGluIG1hdC1jaGlwcy10aGVtZSgkdGhlbWUpIHtcbiAgJGlzLWRhcmstdGhlbWU6IG1hcC1nZXQoJHRoZW1lLCBpcy1kYXJrKTtcbiAgJHByaW1hcnk6IG1hcC1nZXQoJHRoZW1lLCBwcmltYXJ5KTtcbiAgJGFjY2VudDogbWFwLWdldCgkdGhlbWUsIGFjY2VudCk7XG4gICR3YXJuOiBtYXAtZ2V0KCR0aGVtZSwgd2Fybik7XG4gICRiYWNrZ3JvdW5kOiBtYXAtZ2V0KCR0aGVtZSwgYmFja2dyb3VuZCk7XG4gICRmb3JlZ3JvdW5kOiBtYXAtZ2V0KCR0aGVtZSwgZm9yZWdyb3VuZCk7XG5cbiAgJHVuc2VsZWN0ZWQtYmFja2dyb3VuZDogbWF0LWNvbG9yKCRiYWNrZ3JvdW5kLCB1bnNlbGVjdGVkLWNoaXApO1xuICAkdW5zZWxlY3RlZC1mb3JlZ3JvdW5kOiBtYXQtY29sb3IoJGZvcmVncm91bmQsIHRleHQpO1xuXG4gIC5tYXQtY2hpcC5tYXQtc3RhbmRhcmQtY2hpcCB7XG4gICAgQGluY2x1ZGUgbWF0LWNoaXBzLWNvbG9yKCR1bnNlbGVjdGVkLWZvcmVncm91bmQsICR1bnNlbGVjdGVkLWJhY2tncm91bmQpO1xuXG4gICAgJjpub3QoLm1hdC1jaGlwLWRpc2FibGVkKSB7XG4gICAgICAmOmFjdGl2ZSB7XG4gICAgICAgIEBpbmNsdWRlIF9tYXQtdGhlbWUtZWxldmF0aW9uKDMsICR0aGVtZSk7XG4gICAgICB9XG5cbiAgICAgIC5tYXQtY2hpcC1yZW1vdmU6aG92ZXIge1xuICAgICAgICBvcGFjaXR5OiAwLjU0O1xuICAgICAgfVxuICAgIH1cblxuICAgICYubWF0LWNoaXAtZGlzYWJsZWQge1xuICAgICAgb3BhY2l0eTogMC40O1xuICAgIH1cblxuICAgICY6OmFmdGVyIHtcbiAgICAgIGJhY2tncm91bmQ6IG1hcF9nZXQoJGZvcmVncm91bmQsIGJhc2UpO1xuICAgIH1cbiAgfVxuXG4gIC5tYXQtY2hpcC5tYXQtc3RhbmRhcmQtY2hpcC5tYXQtY2hpcC1zZWxlY3RlZCB7XG4gICAgJi5tYXQtcHJpbWFyeSB7XG4gICAgICBAaW5jbHVkZSBtYXQtY2hpcHMtdGhlbWUtY29sb3IoJHByaW1hcnkpO1xuICAgIH1cblxuICAgICYubWF0LXdhcm4ge1xuICAgICAgQGluY2x1ZGUgbWF0LWNoaXBzLXRoZW1lLWNvbG9yKCR3YXJuKTtcbiAgICB9XG5cbiAgICAmLm1hdC1hY2NlbnQge1xuICAgICAgQGluY2x1ZGUgbWF0LWNoaXBzLXRoZW1lLWNvbG9yKCRhY2NlbnQpO1xuICAgIH1cbiAgfVxufVxuXG5AbWl4aW4gbWF0LWNoaXBzLXR5cG9ncmFwaHkoJGNvbmZpZykge1xuICAubWF0LWNoaXAge1xuICAgIGZvbnQtc2l6ZTogbWF0LWZvbnQtc2l6ZSgkY29uZmlnLCBib2R5LTIpO1xuICAgIGZvbnQtd2VpZ2h0OiBtYXQtZm9udC13ZWlnaHQoJGNvbmZpZywgYm9keS0yKTtcblxuICAgIC5tYXQtY2hpcC10cmFpbGluZy1pY29uLm1hdC1pY29uLFxuICAgIC5tYXQtY2hpcC1yZW1vdmUubWF0LWljb24ge1xuICAgICAgZm9udC1zaXplOiAkbWF0LWNoaXAtcmVtb3ZlLWZvbnQtc2l6ZTtcbiAgICB9XG4gIH1cbn1cblxuXG5cblxuXG5AbWl4aW4gbWF0LXRhYmxlLXRoZW1lKCR0aGVtZSkge1xuICAkYmFja2dyb3VuZDogbWFwLWdldCgkdGhlbWUsIGJhY2tncm91bmQpO1xuICAkZm9yZWdyb3VuZDogbWFwLWdldCgkdGhlbWUsIGZvcmVncm91bmQpO1xuXG4gIC5tYXQtdGFibGUge1xuICAgIGJhY2tncm91bmQ6IG1hdC1jb2xvcigkYmFja2dyb3VuZCwgJ2NhcmQnKTtcbiAgfVxuXG4gIC5tYXQtdGFibGUgdGhlYWQsIC5tYXQtdGFibGUgdGJvZHksIC5tYXQtdGFibGUgdGZvb3QsXG4gIG1hdC1oZWFkZXItcm93LCBtYXQtcm93LCBtYXQtZm9vdGVyLXJvdyxcbiAgW21hdC1oZWFkZXItcm93XSwgW21hdC1yb3ddLCBbbWF0LWZvb3Rlci1yb3ddLFxuICAubWF0LXRhYmxlLXN0aWNreSB7XG4gICAgYmFja2dyb3VuZDogaW5oZXJpdDtcbiAgfVxuXG4gIG1hdC1yb3csIG1hdC1oZWFkZXItcm93LCBtYXQtZm9vdGVyLXJvdyxcbiAgdGgubWF0LWhlYWRlci1jZWxsLCB0ZC5tYXQtY2VsbCwgdGQubWF0LWZvb3Rlci1jZWxsIHtcbiAgICBib3JkZXItYm90dG9tLWNvbG9yOiBtYXQtY29sb3IoJGZvcmVncm91bmQsIGRpdmlkZXIpO1xuICB9XG5cbiAgLm1hdC1oZWFkZXItY2VsbCB7XG4gICAgY29sb3I6IG1hdC1jb2xvcigkZm9yZWdyb3VuZCwgc2Vjb25kYXJ5LXRleHQpO1xuICB9XG5cbiAgLm1hdC1jZWxsLCAubWF0LWZvb3Rlci1jZWxsIHtcbiAgICBjb2xvcjogbWF0LWNvbG9yKCRmb3JlZ3JvdW5kLCB0ZXh0KTtcbiAgfVxufVxuXG5AbWl4aW4gbWF0LXRhYmxlLXR5cG9ncmFwaHkoJGNvbmZpZykge1xuICAubWF0LXRhYmxlIHtcbiAgICBmb250LWZhbWlseTogbWF0LWZvbnQtZmFtaWx5KCRjb25maWcpO1xuICB9XG5cbiAgLm1hdC1oZWFkZXItY2VsbCB7XG4gICAgZm9udC1zaXplOiBtYXQtZm9udC1zaXplKCRjb25maWcsIGNhcHRpb24pO1xuICAgIGZvbnQtd2VpZ2h0OiBtYXQtZm9udC13ZWlnaHQoJGNvbmZpZywgYm9keS0yKTtcbiAgfVxuXG4gIC5tYXQtY2VsbCwgLm1hdC1mb290ZXItY2VsbCB7XG4gICAgZm9udC1zaXplOiBtYXQtZm9udC1zaXplKCRjb25maWcsIGJvZHktMSk7XG4gIH1cbn1cblxuXG5cblxuXG5cblxuJG1hdC1kYXRlcGlja2VyLXNlbGVjdGVkLXRvZGF5LWJveC1zaGFkb3ctd2lkdGg6IDFweDtcbiRtYXQtZGF0ZXBpY2tlci1zZWxlY3RlZC1mYWRlLWFtb3VudDogMC42O1xuJG1hdC1kYXRlcGlja2VyLXRvZGF5LWZhZGUtYW1vdW50OiAwLjI7XG4kbWF0LWNhbGVuZGFyLWJvZHktZm9udC1zaXplOiAxM3B4ICFkZWZhdWx0O1xuJG1hdC1jYWxlbmRhci13ZWVrZGF5LXRhYmxlLWZvbnQtc2l6ZTogMTFweCAhZGVmYXVsdDtcblxuQG1peGluIF9tYXQtZGF0ZXBpY2tlci1jb2xvcigkcGFsZXR0ZSkge1xuICAubWF0LWNhbGVuZGFyLWJvZHktc2VsZWN0ZWQge1xuICAgIGJhY2tncm91bmQtY29sb3I6IG1hdC1jb2xvcigkcGFsZXR0ZSk7XG4gICAgY29sb3I6IG1hdC1jb2xvcigkcGFsZXR0ZSwgZGVmYXVsdC1jb250cmFzdCk7XG4gIH1cblxuICAubWF0LWNhbGVuZGFyLWJvZHktZGlzYWJsZWQgPiAubWF0LWNhbGVuZGFyLWJvZHktc2VsZWN0ZWQge1xuICAgICRiYWNrZ3JvdW5kOiBtYXQtY29sb3IoJHBhbGV0dGUpO1xuXG4gICAgQGlmICh0eXBlLW9mKCRiYWNrZ3JvdW5kKSA9PSBjb2xvcikge1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogZmFkZS1vdXQoJGJhY2tncm91bmQsICRtYXQtZGF0ZXBpY2tlci1zZWxlY3RlZC1mYWRlLWFtb3VudCk7XG4gICAgfVxuICAgIEBlbHNlIHtcbiAgICAgIC8vIElmIHdlIGNvdWxkbid0IHJlc29sdmUgdG8gYmFja2dyb3VuZCB0byBhIGNvbG9yIChlLmcuIGl0J3MgYSBDU1MgdmFyaWFibGUpLFxuICAgICAgLy8gZmFsbCBiYWNrIHRvIGZhZGluZyB0aGUgY29udGVudCBvdXQgdmlhIGBvcGFjaXR5YC5cbiAgICAgIG9wYWNpdHk6ICRtYXQtZGF0ZXBpY2tlci10b2RheS1mYWRlLWFtb3VudDtcbiAgICB9XG4gIH1cblxuICAubWF0LWNhbGVuZGFyLWJvZHktdG9kYXkubWF0LWNhbGVuZGFyLWJvZHktc2VsZWN0ZWQge1xuICAgIGJveC1zaGFkb3c6IGluc2V0IDAgMCAwICRtYXQtZGF0ZXBpY2tlci1zZWxlY3RlZC10b2RheS1ib3gtc2hhZG93LXdpZHRoXG4gICAgICAgICAgICAgICAgbWF0LWNvbG9yKCRwYWxldHRlLCBkZWZhdWx0LWNvbnRyYXN0KTtcbiAgfVxufVxuXG5AbWl4aW4gbWF0LWRhdGVwaWNrZXItdGhlbWUoJHRoZW1lKSB7XG4gICRmb3JlZ3JvdW5kOiBtYXAtZ2V0KCR0aGVtZSwgZm9yZWdyb3VuZCk7XG4gICRiYWNrZ3JvdW5kOiBtYXAtZ2V0KCR0aGVtZSwgYmFja2dyb3VuZCk7XG5cbiAgLm1hdC1jYWxlbmRhci1hcnJvdyB7XG4gICAgYm9yZGVyLXRvcC1jb2xvcjogbWF0LWNvbG9yKCRmb3JlZ3JvdW5kLCBpY29uKTtcbiAgfVxuXG4gIC8vIFRoZSBwcmV2L25leHQgYnV0dG9ucyBuZWVkIGEgYml0IG1vcmUgc3BlY2lmaWNpdHkgdG9cbiAgLy8gYXZvaWQgYmVpbmcgb3ZlcndyaXR0ZW4gYnkgdGhlIC5tYXQtaWNvbi1idXR0b24uXG4gIC5tYXQtZGF0ZXBpY2tlci10b2dnbGUsXG4gIC5tYXQtZGF0ZXBpY2tlci1jb250ZW50IC5tYXQtY2FsZW5kYXItbmV4dC1idXR0b24sXG4gIC5tYXQtZGF0ZXBpY2tlci1jb250ZW50IC5tYXQtY2FsZW5kYXItcHJldmlvdXMtYnV0dG9uIHtcbiAgICBjb2xvcjogbWF0LWNvbG9yKCRmb3JlZ3JvdW5kLCBpY29uKTtcbiAgfVxuXG4gIC5tYXQtY2FsZW5kYXItdGFibGUtaGVhZGVyIHtcbiAgICBjb2xvcjogbWF0LWNvbG9yKCRmb3JlZ3JvdW5kLCBoaW50LXRleHQpO1xuICB9XG5cbiAgLm1hdC1jYWxlbmRhci10YWJsZS1oZWFkZXItZGl2aWRlcjo6YWZ0ZXIge1xuICAgIGJhY2tncm91bmQ6IG1hdC1jb2xvcigkZm9yZWdyb3VuZCwgZGl2aWRlcik7XG4gIH1cblxuICAubWF0LWNhbGVuZGFyLWJvZHktbGFiZWwge1xuICAgIGNvbG9yOiBtYXQtY29sb3IoJGZvcmVncm91bmQsIHNlY29uZGFyeS10ZXh0KTtcbiAgfVxuXG4gIC5tYXQtY2FsZW5kYXItYm9keS1jZWxsLWNvbnRlbnQge1xuICAgIGNvbG9yOiBtYXQtY29sb3IoJGZvcmVncm91bmQsIHRleHQpO1xuICAgIGJvcmRlci1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gIH1cblxuICAubWF0LWNhbGVuZGFyLWJvZHktZGlzYWJsZWQgPiAubWF0LWNhbGVuZGFyLWJvZHktY2VsbC1jb250ZW50Om5vdCgubWF0LWNhbGVuZGFyLWJvZHktc2VsZWN0ZWQpIHtcbiAgICBjb2xvcjogbWF0LWNvbG9yKCRmb3JlZ3JvdW5kLCBkaXNhYmxlZC10ZXh0KTtcbiAgfVxuXG4gIC5tYXQtY2FsZW5kYXItYm9keS1jZWxsOm5vdCgubWF0LWNhbGVuZGFyLWJvZHktZGlzYWJsZWQpOmhvdmVyLFxuICAuY2RrLWtleWJvYXJkLWZvY3VzZWQgLm1hdC1jYWxlbmRhci1ib2R5LWFjdGl2ZSxcbiAgLmNkay1wcm9ncmFtLWZvY3VzZWQgLm1hdC1jYWxlbmRhci1ib2R5LWFjdGl2ZSB7XG4gICAgJiA+IC5tYXQtY2FsZW5kYXItYm9keS1jZWxsLWNvbnRlbnQ6bm90KC5tYXQtY2FsZW5kYXItYm9keS1zZWxlY3RlZCkge1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogbWF0LWNvbG9yKCRiYWNrZ3JvdW5kLCBob3Zlcik7XG4gICAgfVxuICB9XG5cbiAgLm1hdC1jYWxlbmRhci1ib2R5LXRvZGF5Om5vdCgubWF0LWNhbGVuZGFyLWJvZHktc2VsZWN0ZWQpIHtcbiAgICAvLyBOb3RlOiB0aG91Z2ggaXQncyBub3QgdGV4dCwgdGhlIGJvcmRlciBpcyBhIGhpbnQgYWJvdXQgdGhlIGZhY3QgdGhhdCB0aGlzIGlzIHRvZGF5J3MgZGF0ZSxcbiAgICAvLyBzbyB3ZSB1c2UgdGhlIGhpbnQgY29sb3IuXG4gICAgYm9yZGVyLWNvbG9yOiBtYXQtY29sb3IoJGZvcmVncm91bmQsIGhpbnQtdGV4dCk7XG4gIH1cblxuICAubWF0LWNhbGVuZGFyLWJvZHktZGlzYWJsZWQgPiAubWF0LWNhbGVuZGFyLWJvZHktdG9kYXk6bm90KC5tYXQtY2FsZW5kYXItYm9keS1zZWxlY3RlZCkge1xuICAgICRjb2xvcjogbWF0LWNvbG9yKCRmb3JlZ3JvdW5kLCBoaW50LXRleHQpO1xuXG4gICAgQGlmICh0eXBlLW9mKCRjb2xvcikgPT0gY29sb3IpIHtcbiAgICAgIGJvcmRlci1jb2xvcjogZmFkZS1vdXQoJGNvbG9yLCAkbWF0LWRhdGVwaWNrZXItdG9kYXktZmFkZS1hbW91bnQpO1xuICAgIH1cbiAgICBAZWxzZSB7XG4gICAgICAvLyBJZiB0aGUgY29sb3IgZGlkbid0IHJlc29sdmUgdG8gYSBjb2xvciB2YWx1ZSwgYnV0IHNvbWV0aGluZyBsaWtlIGEgQ1NTIHZhcmlhYmxlLCB3ZSBjYW4ndFxuICAgICAgLy8gZmFkZSBpdCBvdXQgc28gd2UgZmFsbCBiYWNrIHRvIHJlZHVjaW5nIHRoZSBlbGVtZW50IG9wYWNpdHkuIE5vdGUgdGhhdCB3ZSBkb24ndCB1c2UgdGhlXG4gICAgICAvLyAkbWF0LWRhdGVwaWNrZXItdG9kYXktZmFkZS1hbW91bnQsIGJlY2F1c2UgaGludCB0ZXh0IHVzdWFsbHkgaGFzIHNvbWUgb3BhY2l0eSBhcHBsaWVkXG4gICAgICAvLyB0byBpdCBhbHJlYWR5IGFuZCB3ZSBkb24ndCB3YW50IHRoZW0gdG8gc3RhY2sgb24gdG9wIG9mIGVhY2ggb3RoZXIuXG4gICAgICBvcGFjaXR5OiAwLjU7XG4gICAgfVxuICB9XG5cbiAgQGluY2x1ZGUgX21hdC1kYXRlcGlja2VyLWNvbG9yKG1hcC1nZXQoJHRoZW1lLCBwcmltYXJ5KSk7XG5cbiAgLm1hdC1kYXRlcGlja2VyLWNvbnRlbnQge1xuICAgIEBpbmNsdWRlIF9tYXQtdGhlbWUtZWxldmF0aW9uKDQsICR0aGVtZSk7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogbWF0LWNvbG9yKCRiYWNrZ3JvdW5kLCBjYXJkKTtcbiAgICBjb2xvcjogbWF0LWNvbG9yKCRmb3JlZ3JvdW5kLCB0ZXh0KTtcblxuICAgICYubWF0LWFjY2VudCB7XG4gICAgICBAaW5jbHVkZSBfbWF0LWRhdGVwaWNrZXItY29sb3IobWFwLWdldCgkdGhlbWUsIGFjY2VudCkpO1xuICAgIH1cblxuICAgICYubWF0LXdhcm4ge1xuICAgICAgQGluY2x1ZGUgX21hdC1kYXRlcGlja2VyLWNvbG9yKG1hcC1nZXQoJHRoZW1lLCB3YXJuKSk7XG4gICAgfVxuICB9XG5cbiAgLm1hdC1kYXRlcGlja2VyLWNvbnRlbnQtdG91Y2gge1xuICAgIEBpbmNsdWRlIF9tYXQtdGhlbWUtZWxldmF0aW9uKDAsICR0aGVtZSk7XG4gIH1cblxuICAubWF0LWRhdGVwaWNrZXItdG9nZ2xlLWFjdGl2ZSB7XG4gICAgY29sb3I6IG1hdC1jb2xvcihtYXAtZ2V0KCR0aGVtZSwgcHJpbWFyeSkpO1xuXG4gICAgJi5tYXQtYWNjZW50IHtcbiAgICAgIGNvbG9yOiBtYXQtY29sb3IobWFwLWdldCgkdGhlbWUsIGFjY2VudCkpO1xuICAgIH1cblxuICAgICYubWF0LXdhcm4ge1xuICAgICAgY29sb3I6IG1hdC1jb2xvcihtYXAtZ2V0KCR0aGVtZSwgd2FybikpO1xuICAgIH1cbiAgfVxufVxuXG5AbWl4aW4gbWF0LWRhdGVwaWNrZXItdHlwb2dyYXBoeSgkY29uZmlnKSB7XG4gIC5tYXQtY2FsZW5kYXIge1xuICAgIGZvbnQtZmFtaWx5OiBtYXQtZm9udC1mYW1pbHkoJGNvbmZpZyk7XG4gIH1cblxuICAubWF0LWNhbGVuZGFyLWJvZHkge1xuICAgIGZvbnQtc2l6ZTogJG1hdC1jYWxlbmRhci1ib2R5LWZvbnQtc2l6ZTtcbiAgfVxuXG4gIC5tYXQtY2FsZW5kYXItYm9keS1sYWJlbCxcbiAgLm1hdC1jYWxlbmRhci1wZXJpb2QtYnV0dG9uIHtcbiAgICBmb250OiB7XG4gICAgICBzaXplOiBtYXQtZm9udC1zaXplKCRjb25maWcsIGJ1dHRvbik7XG4gICAgICB3ZWlnaHQ6IG1hdC1mb250LXdlaWdodCgkY29uZmlnLCBidXR0b24pO1xuICAgIH1cbiAgfVxuXG4gIC5tYXQtY2FsZW5kYXItdGFibGUtaGVhZGVyIHRoIHtcbiAgICBmb250OiB7XG4gICAgICBzaXplOiAkbWF0LWNhbGVuZGFyLXdlZWtkYXktdGFibGUtZm9udC1zaXplO1xuICAgICAgd2VpZ2h0OiBtYXQtZm9udC13ZWlnaHQoJGNvbmZpZywgYm9keS0xKTtcbiAgICB9XG4gIH1cbn1cblxuXG5cblxuXG5cblxuQG1peGluIG1hdC1kaWFsb2ctdGhlbWUoJHRoZW1lKSB7XG4gICRiYWNrZ3JvdW5kOiBtYXAtZ2V0KCR0aGVtZSwgYmFja2dyb3VuZCk7XG4gICRmb3JlZ3JvdW5kOiBtYXAtZ2V0KCR0aGVtZSwgZm9yZWdyb3VuZCk7XG5cbiAgLm1hdC1kaWFsb2ctY29udGFpbmVyIHtcbiAgICBAaW5jbHVkZSBfbWF0LXRoZW1lLWVsZXZhdGlvbigyNCwgJHRoZW1lKTtcbiAgICBiYWNrZ3JvdW5kOiBtYXQtY29sb3IoJGJhY2tncm91bmQsIGRpYWxvZyk7XG4gICAgY29sb3I6IG1hdC1jb2xvcigkZm9yZWdyb3VuZCwgdGV4dCk7XG4gIH1cbn1cblxuQG1peGluIG1hdC1kaWFsb2ctdHlwb2dyYXBoeSgkY29uZmlnKSB7XG4gIC5tYXQtZGlhbG9nLXRpdGxlIHtcbiAgICBAaW5jbHVkZSBtYXQtdHlwb2dyYXBoeS1sZXZlbC10by1zdHlsZXMoJGNvbmZpZywgdGl0bGUpO1xuICB9XG59XG5cblxuXG5cblxuXG5AbWl4aW4gbWF0LWV4cGFuc2lvbi1wYW5lbC10aGVtZSgkdGhlbWUpIHtcbiAgJGJhY2tncm91bmQ6IG1hcC1nZXQoJHRoZW1lLCBiYWNrZ3JvdW5kKTtcbiAgJGZvcmVncm91bmQ6IG1hcC1nZXQoJHRoZW1lLCBmb3JlZ3JvdW5kKTtcblxuICAubWF0LWV4cGFuc2lvbi1wYW5lbCB7XG4gICAgQGluY2x1ZGUgX21hdC10aGVtZS1vdmVycmlkYWJsZS1lbGV2YXRpb24oMiwgJHRoZW1lKTtcbiAgICBiYWNrZ3JvdW5kOiBtYXQtY29sb3IoJGJhY2tncm91bmQsIGNhcmQpO1xuICAgIGNvbG9yOiBtYXQtY29sb3IoJGZvcmVncm91bmQsIHRleHQpO1xuICB9XG5cbiAgLm1hdC1hY3Rpb24tcm93IHtcbiAgICBib3JkZXItdG9wLWNvbG9yOiBtYXQtY29sb3IoJGZvcmVncm91bmQsIGRpdmlkZXIpO1xuICB9XG5cbiAgLm1hdC1leHBhbnNpb24tcGFuZWw6bm90KC5tYXQtZXhwYW5kZWQpIC5tYXQtZXhwYW5zaW9uLXBhbmVsLWhlYWRlciB7XG4gICAgJjpub3QoW2FyaWEtZGlzYWJsZWQ9J3RydWUnXSkge1xuICAgICAgJi5jZGsta2V5Ym9hcmQtZm9jdXNlZCxcbiAgICAgICYuY2RrLXByb2dyYW0tZm9jdXNlZCxcbiAgICAgICY6aG92ZXIge1xuICAgICAgICBiYWNrZ3JvdW5kOiBtYXQtY29sb3IoJGJhY2tncm91bmQsIGhvdmVyKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBEaXNhYmxlIHRoZSBob3ZlciBvbiB0b3VjaCBkZXZpY2VzIHNpbmNlIGl0IGNhbiBhcHBlYXIgbGlrZSBpdCBpcyBzdHVjay4gV2UgY2FuJ3QgdXNlXG4gIC8vIGBAbWVkaWEgKGhvdmVyKWAgYWJvdmUsIGJlY2F1c2UgdGhlIGRlc2t0b3Agc3VwcG9ydCBicm93c2VyIHN1cHBvcnQgaXNuJ3QgZ3JlYXQuXG4gIEBtZWRpYSAoaG92ZXI6IG5vbmUpIHtcbiAgICAubWF0LWV4cGFuc2lvbi1wYW5lbDpub3QoLm1hdC1leHBhbmRlZCk6bm90KFthcmlhLWRpc2FibGVkPSd0cnVlJ10pXG4gICAgICAubWF0LWV4cGFuc2lvbi1wYW5lbC1oZWFkZXI6aG92ZXIge1xuICAgICAgYmFja2dyb3VuZDogbWF0LWNvbG9yKCRiYWNrZ3JvdW5kLCBjYXJkKTtcbiAgICB9XG4gIH1cblxuICAubWF0LWV4cGFuc2lvbi1wYW5lbC1oZWFkZXItdGl0bGUge1xuICAgIGNvbG9yOiBtYXQtY29sb3IoJGZvcmVncm91bmQsIHRleHQpO1xuICB9XG5cbiAgLm1hdC1leHBhbnNpb24tcGFuZWwtaGVhZGVyLWRlc2NyaXB0aW9uLFxuICAubWF0LWV4cGFuc2lvbi1pbmRpY2F0b3I6OmFmdGVyIHtcbiAgICBjb2xvcjogbWF0LWNvbG9yKCRmb3JlZ3JvdW5kLCBzZWNvbmRhcnktdGV4dCk7XG4gIH1cblxuICAubWF0LWV4cGFuc2lvbi1wYW5lbC1oZWFkZXJbYXJpYS1kaXNhYmxlZD0ndHJ1ZSddIHtcbiAgICBjb2xvcjogbWF0LWNvbG9yKCRmb3JlZ3JvdW5kLCBkaXNhYmxlZC1idXR0b24pO1xuXG4gICAgLm1hdC1leHBhbnNpb24tcGFuZWwtaGVhZGVyLXRpdGxlLFxuICAgIC5tYXQtZXhwYW5zaW9uLXBhbmVsLWhlYWRlci1kZXNjcmlwdGlvbiB7XG4gICAgICBjb2xvcjogaW5oZXJpdDtcbiAgICB9XG4gIH1cbn1cblxuQG1peGluIG1hdC1leHBhbnNpb24tcGFuZWwtdHlwb2dyYXBoeSgkY29uZmlnKSB7XG4gIC5tYXQtZXhwYW5zaW9uLXBhbmVsLWhlYWRlciB7XG4gICAgZm9udDoge1xuICAgICAgZmFtaWx5OiBtYXQtZm9udC1mYW1pbHkoJGNvbmZpZywgc3ViaGVhZGluZy0xKTtcbiAgICAgIHNpemU6IG1hdC1mb250LXNpemUoJGNvbmZpZywgc3ViaGVhZGluZy0xKTtcbiAgICAgIHdlaWdodDogbWF0LWZvbnQtd2VpZ2h0KCRjb25maWcsIHN1YmhlYWRpbmctMSk7XG4gICAgfVxuICB9XG5cbiAgLm1hdC1leHBhbnNpb24tcGFuZWwtY29udGVudCB7XG4gICAgQGluY2x1ZGUgbWF0LXR5cG9ncmFwaHktbGV2ZWwtdG8tc3R5bGVzKCRjb25maWcsIGJvZHktMSk7XG4gIH1cbn1cblxuXG5cblxuLy8gVGhpcyBtaXhpbiB3aWxsIGVuc3VyZSB0aGF0IGxpbmVzIHRoYXQgb3ZlcmZsb3cgdGhlIGNvbnRhaW5lciB3aWxsIGhpZGUgdGhlIG92ZXJmbG93IGFuZFxuLy8gdHJ1bmNhdGUgbmVhdGx5IHdpdGggYW4gZWxsaXBzaXMuXG5AbWl4aW4gbWF0LXRydW5jYXRlLWxpbmUoKSB7XG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xufVxuXG4vLyBNaXhpbiB0byBwcm92aWRlIGFsbCBtYXQtbGluZSBzdHlsZXMsIGNoYW5naW5nIHNlY29uZGFyeSBmb250IHNpemUgYmFzZWQgb24gd2hldGhlciB0aGUgbGlzdFxuLy8gaXMgaW4gZGVuc2UgbW9kZS5cbkBtaXhpbiBtYXQtbGluZS1iYXNlKCRzZWNvbmRhcnktZm9udC1zaXplKSB7XG4gIC5tYXQtbGluZSB7XG4gICAgQGluY2x1ZGUgbWF0LXRydW5jYXRlLWxpbmUoKTtcbiAgICBkaXNwbGF5OiBibG9jaztcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuXG4gICAgLy8gYWxsIGxpbmVzIGJ1dCB0aGUgdG9wIGxpbmUgc2hvdWxkIGhhdmUgc21hbGxlciB0ZXh0XG4gICAgJjpudGgtY2hpbGQobisyKSB7XG4gICAgICBmb250LXNpemU6ICRzZWNvbmRhcnktZm9udC1zaXplO1xuICAgIH1cbiAgfVxufVxuXG4vLyBUaGlzIG1peGluIG5vcm1hbGl6ZXMgZGVmYXVsdCBlbGVtZW50IHN0eWxlcywgZS5nLiBmb250IHdlaWdodCBmb3IgaGVhZGluZyB0ZXh0LlxuQG1peGluIG1hdC1ub3JtYWxpemUtdGV4dCgpIHtcbiAgJiA+ICoge1xuICAgIG1hcmdpbjogMDtcbiAgICBwYWRkaW5nOiAwO1xuICAgIGZvbnQtd2VpZ2h0OiBub3JtYWw7XG4gICAgZm9udC1zaXplOiBpbmhlcml0O1xuICB9XG59XG5cbi8vIFRoaXMgbWl4aW4gcHJvdmlkZXMgYmFzZSBzdHlsZXMgZm9yIHRoZSB3cmFwcGVyIGFyb3VuZCBtYXQtbGluZSBlbGVtZW50cyBpbiBhIGxpc3QuXG5AbWl4aW4gbWF0LWxpbmUtd3JhcHBlci1iYXNlKCkge1xuICBAaW5jbHVkZSBtYXQtbm9ybWFsaXplLXRleHQoKTtcblxuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICB3aWR0aDogMTAwJTtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcblxuICAvLyBNdXN0IHJlbW92ZSB3cmFwcGVyIHdoZW4gbGluZXMgYXJlIGVtcHR5IG9yIGl0IHRha2VzIHVwIGhvcml6b250YWxcbiAgLy8gc3BhY2UgYW5kIHB1c2hlcyBvdGhlciBlbGVtZW50cyB0byB0aGUgcmlnaHQuXG4gICY6ZW1wdHkge1xuICAgIGRpc3BsYXk6IG5vbmU7XG4gIH1cbn1cblxuXG5cbi8vIEluY2x1ZGUgdGhpcyBlbXB0eSBtaXhpbiBmb3IgY29uc2lzdGVuY3kgd2l0aCB0aGUgb3RoZXIgY29tcG9uZW50cy5cbkBtaXhpbiBtYXQtZ3JpZC1saXN0LXRoZW1lKCR0aGVtZSkgeyB9XG5cbkBtaXhpbiBtYXQtZ3JpZC1saXN0LXR5cG9ncmFwaHkoJGNvbmZpZykge1xuICAubWF0LWdyaWQtdGlsZS1oZWFkZXIsXG4gIC5tYXQtZ3JpZC10aWxlLWZvb3RlciB7XG4gICAgQGluY2x1ZGUgbWF0LWxpbmUtYmFzZShtYXQtZm9udC1zaXplKCRjb25maWcsIGNhcHRpb24pKTtcbiAgICBmb250LXNpemU6IG1hdC1mb250LXNpemUoJGNvbmZpZywgYm9keS0xKTtcbiAgfVxufVxuXG5cblxuXG4vLyBJbmNsdWRlIHRoaXMgZW1wdHkgbWl4aW4gZm9yIGNvbnNpc3RlbmN5IHdpdGggdGhlIG90aGVyIGNvbXBvbmVudHMuXG5AbWl4aW4gbWF0LWljb24tdGhlbWUoJHRoZW1lKSB7XG4gICRwcmltYXJ5OiBtYXAtZ2V0KCR0aGVtZSwgcHJpbWFyeSk7XG4gICRhY2NlbnQ6IG1hcC1nZXQoJHRoZW1lLCBhY2NlbnQpO1xuICAkd2FybjogbWFwLWdldCgkdGhlbWUsIHdhcm4pO1xuICAkYmFja2dyb3VuZDogbWFwLWdldCgkdGhlbWUsIGJhY2tncm91bmQpO1xuICAkZm9yZWdyb3VuZDogbWFwLWdldCgkdGhlbWUsIGZvcmVncm91bmQpO1xuXG4gIC5tYXQtaWNvbiB7XG4gICAgJi5tYXQtcHJpbWFyeSB7XG4gICAgICBjb2xvcjogbWF0LWNvbG9yKCRwcmltYXJ5KTtcbiAgICB9XG5cbiAgICAmLm1hdC1hY2NlbnQge1xuICAgICAgY29sb3I6IG1hdC1jb2xvcigkYWNjZW50KTtcbiAgICB9XG5cbiAgICAmLm1hdC13YXJuIHtcbiAgICAgIGNvbG9yOiBtYXQtY29sb3IoJHdhcm4pO1xuICAgIH1cbiAgfVxufVxuXG5AbWl4aW4gbWF0LWljb24tdHlwb2dyYXBoeSgkY29uZmlnKSB7IH1cblxuXG5cblxuXG4vLyBSZW5kZXJzIGEgZ3JhZGllbnQgZm9yIHNob3dpbmcgdGhlIGRhc2hlZCBsaW5lIHdoZW4gdGhlIGlucHV0IGlzIGRpc2FibGVkLlxuLy8gVW5saWtlIHVzaW5nIGEgYm9yZGVyLCBhIGdyYWRpZW50IGFsbG93cyB1cyB0byBhZGp1c3QgdGhlIHNwYWNpbmcgb2YgdGhlIGRvdHRlZCBsaW5lXG4vLyB0byBtYXRjaCB0aGUgTWF0ZXJpYWwgRGVzaWduIHNwZWMuXG5AbWl4aW4gbWF0LWNvbnRyb2wtZGlzYWJsZWQtdW5kZXJsaW5lKCRjb2xvcikge1xuICBiYWNrZ3JvdW5kLWltYWdlOiBsaW5lYXItZ3JhZGllbnQodG8gcmlnaHQsICRjb2xvciAwJSwgJGNvbG9yIDMzJSwgdHJhbnNwYXJlbnQgMCUpO1xuICBiYWNrZ3JvdW5kLXNpemU6IDRweCAxMDAlO1xuICBiYWNrZ3JvdW5kLXJlcGVhdDogcmVwZWF0LXg7XG59XG5cbi8vIEZpZ3VyZXMgb3V0IHRoZSBjb2xvciBvZiB0aGUgcGxhY2Vob2xkZXIgZm9yIGEgZm9ybSBjb250cm9sLlxuLy8gVXNlZCBwcmltYXJpbHkgdG8gcHJldmVudCB0aGUgdmFyaW91cyBmb3JtIGNvbnRyb2xzIGZyb21cbi8vIGJlY29taW5nIG91dCBvZiBzeW5jIHNpbmNlIHRoZXNlIGNvbG9ycyBhcmVuJ3QgaW4gYSBwYWxldHRlLlxuQGZ1bmN0aW9uIF9tYXQtY29udHJvbC1wbGFjZWhvbGRlci1jb2xvcigkdGhlbWUpIHtcbiAgJGZvcmVncm91bmQ6IG1hcC1nZXQoJHRoZW1lLCBmb3JlZ3JvdW5kKTtcbiAgJGlzLWRhcmstdGhlbWU6IG1hcC1nZXQoJHRoZW1lLCBpcy1kYXJrKTtcbiAgQHJldHVybiBtYXQtY29sb3IoJGZvcmVncm91bmQsIHNlY29uZGFyeS10ZXh0LCBpZigkaXMtZGFyay10aGVtZSwgMC41LCAwLjQyKSk7XG59XG5cblxuLyogc3R5bGVsaW50LWRpc2FibGUgbWF0ZXJpYWwvbm8tcHJlZml4ZXMgKi9cbkBtaXhpbiB1c2VyLXNlbGVjdCgkdmFsdWUpIHtcbiAgLXdlYmtpdC11c2VyLXNlbGVjdDogJHZhbHVlO1xuICAtbW96LXVzZXItc2VsZWN0OiAkdmFsdWU7XG4gIC1tcy11c2VyLXNlbGVjdDogJHZhbHVlO1xuICB1c2VyLXNlbGVjdDogJHZhbHVlO1xufVxuXG5AbWl4aW4gaW5wdXQtcGxhY2Vob2xkZXIge1xuICAmOjpwbGFjZWhvbGRlciB7XG4gICAgQGNvbnRlbnQ7XG4gIH1cblxuICAmOjotbW96LXBsYWNlaG9sZGVyIHtcbiAgICBAY29udGVudDtcbiAgfVxuXG4gICY6Oi13ZWJraXQtaW5wdXQtcGxhY2Vob2xkZXIge1xuICAgIEBjb250ZW50O1xuICB9XG5cbiAgJjotbXMtaW5wdXQtcGxhY2Vob2xkZXIge1xuICAgIEBjb250ZW50O1xuICB9XG59XG5cbkBtaXhpbiBjdXJzb3ItZ3JhYiB7XG4gIGN1cnNvcjogLXdlYmtpdC1ncmFiO1xuICBjdXJzb3I6IGdyYWI7XG59XG5cbkBtaXhpbiBjdXJzb3ItZ3JhYmJpbmcge1xuICBjdXJzb3I6IC13ZWJraXQtZ3JhYmJpbmc7XG4gIGN1cnNvcjogZ3JhYmJpbmc7XG59XG5cbkBtaXhpbiBiYWNrZmFjZS12aXNpYmlsaXR5KCR2YWx1ZSkge1xuICAtd2Via2l0LWJhY2tmYWNlLXZpc2liaWxpdHk6ICR2YWx1ZTtcbiAgYmFja2ZhY2UtdmlzaWJpbGl0eTogJHZhbHVlO1xufVxuLyogc3R5bGVsaW50LWVuYWJsZSAqL1xuXG5cblxuQG1peGluIG1hdC1pbnB1dC10aGVtZSgkdGhlbWUpIHtcbiAgJHByaW1hcnk6IG1hcC1nZXQoJHRoZW1lLCBwcmltYXJ5KTtcbiAgJGFjY2VudDogbWFwLWdldCgkdGhlbWUsIGFjY2VudCk7XG4gICR3YXJuOiBtYXAtZ2V0KCR0aGVtZSwgd2Fybik7XG4gICRmb3JlZ3JvdW5kOiBtYXAtZ2V0KCR0aGVtZSwgZm9yZWdyb3VuZCk7XG5cbiAgLm1hdC1mb3JtLWZpZWxkLXR5cGUtbWF0LW5hdGl2ZS1zZWxlY3QgLm1hdC1mb3JtLWZpZWxkLWluZml4OjphZnRlciB7XG4gICAgY29sb3I6IG1hdC1jb2xvcigkZm9yZWdyb3VuZCwgc2Vjb25kYXJ5LXRleHQpO1xuICB9XG5cbiAgLm1hdC1pbnB1dC1lbGVtZW50OmRpc2FibGVkLFxuICAubWF0LWZvcm0tZmllbGQtdHlwZS1tYXQtbmF0aXZlLXNlbGVjdC5tYXQtZm9ybS1maWVsZC1kaXNhYmxlZCAubWF0LWZvcm0tZmllbGQtaW5maXg6OmFmdGVyIHtcbiAgICBjb2xvcjogbWF0LWNvbG9yKCRmb3JlZ3JvdW5kLCBkaXNhYmxlZC10ZXh0KTtcbiAgfVxuXG4gIC5tYXQtaW5wdXQtZWxlbWVudCB7XG4gICAgY2FyZXQtY29sb3I6IG1hdC1jb2xvcigkcHJpbWFyeSk7XG5cbiAgICBAaW5jbHVkZSBpbnB1dC1wbGFjZWhvbGRlciB7XG4gICAgICBjb2xvcjogX21hdC1jb250cm9sLXBsYWNlaG9sZGVyLWNvbG9yKCR0aGVtZSk7XG4gICAgfVxuXG4gICAgLy8gT24gZGFyayB0aGVtZXMgd2Ugc2V0IHRoZSBuYXRpdmUgYHNlbGVjdGAgY29sb3IgdG8gc29tZSBzaGFkZSBvZiB3aGl0ZSxcbiAgICAvLyBob3dldmVyIHRoZSBjb2xvciBwcm9wYWdhdGVzIHRvIGFsbCBvZiB0aGUgYG9wdGlvbmAgZWxlbWVudHMsIHdoaWNoIGFyZVxuICAgIC8vIGFsd2F5cyBvbiBhIHdoaXRlIGJhY2tncm91bmQgaW5zaWRlIHRoZSBkcm9wZG93biwgY2F1c2luZyB0aGVtIHRvIGJsZW5kIGluLlxuICAgIC8vIFNpbmNlIHdlIGNhbid0IGNoYW5nZSBiYWNrZ3JvdW5kIG9mIHRoZSBkcm9wZG93biwgd2UgbmVlZCB0byBleHBsaWNpdGx5XG4gICAgLy8gcmVzZXQgdGhlIGNvbG9yIG9mIHRoZSBvcHRpb25zIHRvIHNvbWV0aGluZyBkYXJrLlxuICAgIEBpZiAobWFwLWdldCgkdGhlbWUsIGlzLWRhcmspKSB7XG4gICAgICBvcHRpb24ge1xuICAgICAgICBjb2xvcjogJGRhcmstcHJpbWFyeS10ZXh0O1xuICAgICAgfVxuXG4gICAgICBvcHRpb246ZGlzYWJsZWQge1xuICAgICAgICBjb2xvcjogJGRhcmstZGlzYWJsZWQtdGV4dDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAubWF0LWFjY2VudCAubWF0LWlucHV0LWVsZW1lbnQge1xuICAgIGNhcmV0LWNvbG9yOiBtYXQtY29sb3IoJGFjY2VudCk7XG4gIH1cblxuICAubWF0LXdhcm4gLm1hdC1pbnB1dC1lbGVtZW50LFxuICAubWF0LWZvcm0tZmllbGQtaW52YWxpZCAubWF0LWlucHV0LWVsZW1lbnQge1xuICAgIGNhcmV0LWNvbG9yOiBtYXQtY29sb3IoJHdhcm4pO1xuICB9XG5cbiAgLm1hdC1mb3JtLWZpZWxkLXR5cGUtbWF0LW5hdGl2ZS1zZWxlY3QubWF0LWZvcm0tZmllbGQtaW52YWxpZCAubWF0LWZvcm0tZmllbGQtaW5maXg6OmFmdGVyIHtcbiAgICBjb2xvcjogbWF0LWNvbG9yKCR3YXJuKTtcbiAgfVxufVxuXG5AbWl4aW4gbWF0LWlucHV0LXR5cG9ncmFwaHkoJGNvbmZpZykge1xuICAvLyBUaGUgdW5pdC1sZXNzIGxpbmUtaGVpZ2h0IGZyb20gdGhlIGZvbnQgY29uZmlnLlxuICAkbGluZS1oZWlnaHQ6IG1hdC1saW5lLWhlaWdodCgkY29uZmlnLCBpbnB1dCk7XG5cbiAgLy8gVGhlIGFtb3VudCBvZiBzcGFjZSBiZXR3ZWVuIHRoZSB0b3Agb2YgdGhlIGxpbmUgYW5kIHRoZSB0b3Agb2YgdGhlIGFjdHVhbCB0ZXh0XG4gIC8vIChhcyBhIGZyYWN0aW9uIG9mIHRoZSBmb250LXNpemUpLlxuICAkbGluZS1zcGFjaW5nOiAoJGxpbmUtaGVpZ2h0IC0gMSkgLyAyO1xuXG4gIC8vIDxpbnB1dD4gZWxlbWVudHMgc2VlbSB0byBoYXZlIHRoZWlyIGhlaWdodCBzZXQgc2xpZ2h0bHkgdG9vIGxhcmdlIG9uIFNhZmFyaSBjYXVzaW5nIHRoZSB0ZXh0IHRvXG4gIC8vIGJlIG1pc2FsaWduZWQgdy5yLnQuIHRoZSBwbGFjZWhvbGRlci4gQWRkaW5nIHRoaXMgbWFyZ2luIGNvcnJlY3RzIGl0LlxuICBpbnB1dC5tYXQtaW5wdXQtZWxlbWVudCB7XG4gICAgbWFyZ2luLXRvcDogLSRsaW5lLXNwYWNpbmcgKiAxZW07XG4gIH1cbn1cblxuXG5cblxuXG5cblxuQG1peGluIG1hdC1saXN0LXRoZW1lKCR0aGVtZSkge1xuICAkYmFja2dyb3VuZDogbWFwLWdldCgkdGhlbWUsIGJhY2tncm91bmQpO1xuICAkZm9yZWdyb3VuZDogbWFwLWdldCgkdGhlbWUsIGZvcmVncm91bmQpO1xuXG4gIC5tYXQtbGlzdC1iYXNlIHtcbiAgICAubWF0LWxpc3QtaXRlbSB7XG4gICAgICBjb2xvcjogbWF0LWNvbG9yKCRmb3JlZ3JvdW5kLCB0ZXh0KTtcbiAgICB9XG5cbiAgICAubWF0LWxpc3Qtb3B0aW9uIHtcbiAgICAgIGNvbG9yOiBtYXQtY29sb3IoJGZvcmVncm91bmQsIHRleHQpO1xuICAgIH1cblxuICAgIC5tYXQtc3ViaGVhZGVyIHtcbiAgICAgIGNvbG9yOiBtYXQtY29sb3IoJGZvcmVncm91bmQsIHNlY29uZGFyeS10ZXh0KTtcbiAgICB9XG4gIH1cblxuICAubWF0LWxpc3QtaXRlbS1kaXNhYmxlZCB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogbWF0LWNvbG9yKCRiYWNrZ3JvdW5kLCBkaXNhYmxlZC1saXN0LW9wdGlvbik7XG4gIH1cblxuICAubWF0LWxpc3Qtb3B0aW9uLFxuICAubWF0LW5hdi1saXN0IC5tYXQtbGlzdC1pdGVtIHtcbiAgICAmOmhvdmVyLCAmOmZvY3VzIHtcbiAgICAgIGJhY2tncm91bmQ6IG1hdC1jb2xvcigkYmFja2dyb3VuZCwgJ2hvdmVyJyk7XG4gICAgfVxuICB9XG59XG5cbkBtaXhpbiBtYXQtbGlzdC10eXBvZ3JhcGh5KCRjb25maWcpIHtcbiAgJGZvbnQtZmFtaWx5OiBtYXQtZm9udC1mYW1pbHkoJGNvbmZpZyk7XG5cbiAgLm1hdC1saXN0LWl0ZW0ge1xuICAgIGZvbnQtZmFtaWx5OiAkZm9udC1mYW1pbHk7XG4gIH1cblxuICAubWF0LWxpc3Qtb3B0aW9uIHtcbiAgICBmb250LWZhbWlseTogJGZvbnQtZmFtaWx5O1xuICB9XG5cbiAgLy8gRGVmYXVsdCBsaXN0XG4gIC5tYXQtbGlzdC1iYXNlIHtcbiAgICAubWF0LWxpc3QtaXRlbSB7XG4gICAgICBmb250LXNpemU6IG1hdC1mb250LXNpemUoJGNvbmZpZywgc3ViaGVhZGluZy0yKTtcbiAgICAgIEBpbmNsdWRlIG1hdC1saW5lLWJhc2UobWF0LWZvbnQtc2l6ZSgkY29uZmlnLCBib2R5LTEpKTtcbiAgICB9XG5cbiAgICAubWF0LWxpc3Qtb3B0aW9uIHtcbiAgICAgIGZvbnQtc2l6ZTogbWF0LWZvbnQtc2l6ZSgkY29uZmlnLCBzdWJoZWFkaW5nLTIpO1xuICAgICAgQGluY2x1ZGUgbWF0LWxpbmUtYmFzZShtYXQtZm9udC1zaXplKCRjb25maWcsIGJvZHktMSkpO1xuICAgIH1cblxuICAgIC5tYXQtc3ViaGVhZGVyIHtcbiAgICAgIGZvbnQtZmFtaWx5OiBtYXQtZm9udC1mYW1pbHkoJGNvbmZpZywgYm9keS0yKTtcbiAgICAgIGZvbnQtc2l6ZTogbWF0LWZvbnQtc2l6ZSgkY29uZmlnLCBib2R5LTIpO1xuICAgICAgZm9udC13ZWlnaHQ6IG1hdC1mb250LXdlaWdodCgkY29uZmlnLCBib2R5LTIpO1xuICAgIH1cbiAgfVxuXG4gIC8vIERlbnNlIGxpc3RcbiAgLm1hdC1saXN0LWJhc2VbZGVuc2VdIHtcbiAgICAubWF0LWxpc3QtaXRlbSB7XG4gICAgICBmb250LXNpemU6IG1hdC1mb250LXNpemUoJGNvbmZpZywgY2FwdGlvbik7XG4gICAgICBAaW5jbHVkZSBtYXQtbGluZS1iYXNlKG1hdC1mb250LXNpemUoJGNvbmZpZywgY2FwdGlvbikpO1xuICAgIH1cblxuICAgIC5tYXQtbGlzdC1vcHRpb24ge1xuICAgICAgZm9udC1zaXplOiBtYXQtZm9udC1zaXplKCRjb25maWcsIGNhcHRpb24pO1xuICAgICAgQGluY2x1ZGUgbWF0LWxpbmUtYmFzZShtYXQtZm9udC1zaXplKCRjb25maWcsIGNhcHRpb24pKTtcbiAgICB9XG5cbiAgICAubWF0LXN1YmhlYWRlciB7XG4gICAgICBmb250LWZhbWlseTogJGZvbnQtZmFtaWx5O1xuICAgICAgZm9udC1zaXplOiBtYXQtZm9udC1zaXplKCRjb25maWcsIGNhcHRpb24pO1xuICAgICAgZm9udC13ZWlnaHQ6IG1hdC1mb250LXdlaWdodCgkY29uZmlnLCBib2R5LTIpO1xuICAgIH1cbiAgfVxufVxuXG5cblxuXG5cblxuXG5AbWl4aW4gbWF0LW1lbnUtdGhlbWUoJHRoZW1lKSB7XG4gICRiYWNrZ3JvdW5kOiBtYXAtZ2V0KCR0aGVtZSwgYmFja2dyb3VuZCk7XG4gICRmb3JlZ3JvdW5kOiBtYXAtZ2V0KCR0aGVtZSwgZm9yZWdyb3VuZCk7XG5cbiAgLm1hdC1tZW51LXBhbmVsIHtcbiAgICBAaW5jbHVkZSBfbWF0LXRoZW1lLW92ZXJyaWRhYmxlLWVsZXZhdGlvbig0LCAkdGhlbWUpO1xuICAgIGJhY2tncm91bmQ6IG1hdC1jb2xvcigkYmFja2dyb3VuZCwgJ2NhcmQnKTtcbiAgfVxuXG4gIC5tYXQtbWVudS1pdGVtIHtcbiAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgICBjb2xvcjogbWF0LWNvbG9yKCRmb3JlZ3JvdW5kLCAndGV4dCcpO1xuXG4gICAgJltkaXNhYmxlZF0ge1xuICAgICAgJiwgJjo6YWZ0ZXIge1xuICAgICAgICBjb2xvcjogbWF0LWNvbG9yKCRmb3JlZ3JvdW5kLCAnZGlzYWJsZWQnKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAubWF0LW1lbnUtaXRlbSAubWF0LWljb24tbm8tY29sb3IsXG4gIC5tYXQtbWVudS1pdGVtLXN1Ym1lbnUtdHJpZ2dlcjo6YWZ0ZXIge1xuICAgIGNvbG9yOiBtYXQtY29sb3IoJGZvcmVncm91bmQsICdpY29uJyk7XG4gIH1cblxuICAubWF0LW1lbnUtaXRlbTpob3ZlcixcbiAgLm1hdC1tZW51LWl0ZW0uY2RrLXByb2dyYW0tZm9jdXNlZCxcbiAgLm1hdC1tZW51LWl0ZW0uY2RrLWtleWJvYXJkLWZvY3VzZWQsXG4gIC5tYXQtbWVudS1pdGVtLWhpZ2hsaWdodGVkIHtcbiAgICAmOm5vdChbZGlzYWJsZWRdKSB7XG4gICAgICBiYWNrZ3JvdW5kOiBtYXQtY29sb3IoJGJhY2tncm91bmQsICdob3ZlcicpO1xuICAgIH1cbiAgfVxufVxuXG5AbWl4aW4gbWF0LW1lbnUtdHlwb2dyYXBoeSgkY29uZmlnKSB7XG4gIC5tYXQtbWVudS1pdGVtIHtcbiAgICBmb250OiB7XG4gICAgICBmYW1pbHk6IG1hdC1mb250LWZhbWlseSgkY29uZmlnLCBib2R5LTEpO1xuICAgICAgc2l6ZTogbWF0LWZvbnQtc2l6ZSgkY29uZmlnLCBib2R5LTEpO1xuICAgICAgd2VpZ2h0OiBtYXQtZm9udC13ZWlnaHQoJGNvbmZpZywgYm9keS0xKTtcbiAgICB9XG4gIH1cbn1cblxuXG5cblxuXG5cbkBtaXhpbiBtYXQtcGFnaW5hdG9yLXRoZW1lKCR0aGVtZSkge1xuICAkZm9yZWdyb3VuZDogbWFwLWdldCgkdGhlbWUsIGZvcmVncm91bmQpO1xuICAkYmFja2dyb3VuZDogbWFwLWdldCgkdGhlbWUsIGJhY2tncm91bmQpO1xuXG4gIC5tYXQtcGFnaW5hdG9yIHtcbiAgICBiYWNrZ3JvdW5kOiBtYXQtY29sb3IoJGJhY2tncm91bmQsICdjYXJkJyk7XG4gIH1cblxuICAubWF0LXBhZ2luYXRvcixcbiAgLm1hdC1wYWdpbmF0b3ItcGFnZS1zaXplIC5tYXQtc2VsZWN0LXRyaWdnZXIge1xuICAgIGNvbG9yOiBtYXQtY29sb3IoJGZvcmVncm91bmQsIHNlY29uZGFyeS10ZXh0KTtcbiAgfVxuXG4gIC5tYXQtcGFnaW5hdG9yLWRlY3JlbWVudCxcbiAgLm1hdC1wYWdpbmF0b3ItaW5jcmVtZW50IHtcbiAgICBib3JkZXItdG9wOiAycHggc29saWQgbWF0LWNvbG9yKCRmb3JlZ3JvdW5kLCAnaWNvbicpO1xuICAgIGJvcmRlci1yaWdodDogMnB4IHNvbGlkIG1hdC1jb2xvcigkZm9yZWdyb3VuZCwgJ2ljb24nKTtcbiAgfVxuXG4gIC5tYXQtcGFnaW5hdG9yLWZpcnN0LFxuICAubWF0LXBhZ2luYXRvci1sYXN0IHtcbiAgICBib3JkZXItdG9wOiAycHggc29saWQgbWF0LWNvbG9yKCRmb3JlZ3JvdW5kLCAnaWNvbicpO1xuICB9XG5cbiAgLm1hdC1pY29uLWJ1dHRvbltkaXNhYmxlZF0ge1xuICAgIC5tYXQtcGFnaW5hdG9yLWRlY3JlbWVudCxcbiAgICAubWF0LXBhZ2luYXRvci1pbmNyZW1lbnQsXG4gICAgLm1hdC1wYWdpbmF0b3ItZmlyc3QsXG4gICAgLm1hdC1wYWdpbmF0b3ItbGFzdCB7XG4gICAgICBib3JkZXItY29sb3I6IG1hdC1jb2xvcigkZm9yZWdyb3VuZCwgJ2Rpc2FibGVkJyk7XG4gICAgfVxuICB9XG59XG5cbkBtaXhpbiBtYXQtcGFnaW5hdG9yLXR5cG9ncmFwaHkoJGNvbmZpZykge1xuICAubWF0LXBhZ2luYXRvcixcbiAgLm1hdC1wYWdpbmF0b3ItcGFnZS1zaXplIC5tYXQtc2VsZWN0LXRyaWdnZXIge1xuICAgIGZvbnQ6IHtcbiAgICAgIGZhbWlseTogbWF0LWZvbnQtZmFtaWx5KCRjb25maWcsIGNhcHRpb24pO1xuICAgICAgc2l6ZTogbWF0LWZvbnQtc2l6ZSgkY29uZmlnLCBjYXB0aW9uKTtcbiAgICB9XG4gIH1cbn1cblxuXG5cblxuXG5AbWl4aW4gbWF0LXByb2dyZXNzLWJhci10aGVtZSgkdGhlbWUpIHtcbiAgJHByaW1hcnk6IG1hcC1nZXQoJHRoZW1lLCBwcmltYXJ5KTtcbiAgJGFjY2VudDogbWFwLWdldCgkdGhlbWUsIGFjY2VudCk7XG4gICR3YXJuOiBtYXAtZ2V0KCR0aGVtZSwgd2Fybik7XG5cbiAgLm1hdC1wcm9ncmVzcy1iYXItYmFja2dyb3VuZCB7XG4gICAgZmlsbDogbWF0LWNvbG9yKCRwcmltYXJ5LCBsaWdodGVyKTtcbiAgfVxuXG4gIC5tYXQtcHJvZ3Jlc3MtYmFyLWJ1ZmZlciB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogbWF0LWNvbG9yKCRwcmltYXJ5LCBsaWdodGVyKTtcbiAgfVxuXG4gIC5tYXQtcHJvZ3Jlc3MtYmFyLWZpbGw6OmFmdGVyIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBtYXQtY29sb3IoJHByaW1hcnkpO1xuICB9XG5cbiAgLm1hdC1wcm9ncmVzcy1iYXIubWF0LWFjY2VudCB7XG4gICAgLm1hdC1wcm9ncmVzcy1iYXItYmFja2dyb3VuZCB7XG4gICAgICBmaWxsOiBtYXQtY29sb3IoJGFjY2VudCwgbGlnaHRlcik7XG4gICAgfVxuXG4gICAgLm1hdC1wcm9ncmVzcy1iYXItYnVmZmVyIHtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IG1hdC1jb2xvcigkYWNjZW50LCBsaWdodGVyKTtcbiAgICB9XG5cbiAgICAubWF0LXByb2dyZXNzLWJhci1maWxsOjphZnRlciB7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiBtYXQtY29sb3IoJGFjY2VudCk7XG4gICAgfVxuICB9XG5cbiAgLm1hdC1wcm9ncmVzcy1iYXIubWF0LXdhcm4ge1xuICAgIC5tYXQtcHJvZ3Jlc3MtYmFyLWJhY2tncm91bmQge1xuICAgICAgZmlsbDogbWF0LWNvbG9yKCR3YXJuLCBsaWdodGVyKTtcbiAgICB9XG5cbiAgICAubWF0LXByb2dyZXNzLWJhci1idWZmZXIge1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogbWF0LWNvbG9yKCR3YXJuLCBsaWdodGVyKTtcbiAgICB9XG5cbiAgICAubWF0LXByb2dyZXNzLWJhci1maWxsOjphZnRlciB7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiBtYXQtY29sb3IoJHdhcm4pO1xuICAgIH1cbiAgfVxufVxuXG5AbWl4aW4gbWF0LXByb2dyZXNzLWJhci10eXBvZ3JhcGh5KCRjb25maWcpIHsgfVxuXG5cblxuXG5cblxuQG1peGluIG1hdC1wcm9ncmVzcy1zcGlubmVyLXRoZW1lKCR0aGVtZSkge1xuICAkcHJpbWFyeTogbWFwLWdldCgkdGhlbWUsIHByaW1hcnkpO1xuICAkYWNjZW50OiBtYXAtZ2V0KCR0aGVtZSwgYWNjZW50KTtcbiAgJHdhcm46IG1hcC1nZXQoJHRoZW1lLCB3YXJuKTtcblxuICAubWF0LXByb2dyZXNzLXNwaW5uZXIsIC5tYXQtc3Bpbm5lciB7XG4gICAgY2lyY2xlIHtcbiAgICAgIHN0cm9rZTogbWF0LWNvbG9yKCRwcmltYXJ5KTtcbiAgICB9XG5cbiAgICAmLm1hdC1hY2NlbnQgY2lyY2xlIHtcbiAgICAgIHN0cm9rZTogbWF0LWNvbG9yKCRhY2NlbnQpO1xuICAgIH1cblxuICAgICYubWF0LXdhcm4gY2lyY2xlIHtcbiAgICAgIHN0cm9rZTogbWF0LWNvbG9yKCR3YXJuKTtcbiAgICB9XG4gIH1cbn1cblxuQG1peGluIG1hdC1wcm9ncmVzcy1zcGlubmVyLXR5cG9ncmFwaHkoJGNvbmZpZykgeyB9XG5cblxuXG5cblxuQG1peGluIF9tYXQtcmFkaW8tY29sb3IoJHBhbGV0dGUpIHtcbiAgJi5tYXQtcmFkaW8tY2hlY2tlZCAubWF0LXJhZGlvLW91dGVyLWNpcmNsZSB7XG4gICAgYm9yZGVyLWNvbG9yOiBtYXQtY29sb3IoJHBhbGV0dGUpO1xuICB9XG5cbiAgLm1hdC1yYWRpby1pbm5lci1jaXJjbGUsXG4gIC5tYXQtcmFkaW8tcmlwcGxlIC5tYXQtcmlwcGxlLWVsZW1lbnQ6bm90KC5tYXQtcmFkaW8tcGVyc2lzdGVudC1yaXBwbGUpLFxuICAmLm1hdC1yYWRpby1jaGVja2VkIC5tYXQtcmFkaW8tcGVyc2lzdGVudC1yaXBwbGUsXG4gICY6YWN0aXZlIC5tYXQtcmFkaW8tcGVyc2lzdGVudC1yaXBwbGUge1xuICAgIGJhY2tncm91bmQtY29sb3I6IG1hdC1jb2xvcigkcGFsZXR0ZSk7XG4gIH1cbn1cblxuQG1peGluIG1hdC1yYWRpby10aGVtZSgkdGhlbWUpIHtcbiAgJHByaW1hcnk6IG1hcC1nZXQoJHRoZW1lLCBwcmltYXJ5KTtcbiAgJGFjY2VudDogbWFwLWdldCgkdGhlbWUsIGFjY2VudCk7XG4gICR3YXJuOiBtYXAtZ2V0KCR0aGVtZSwgd2Fybik7XG4gICRiYWNrZ3JvdW5kOiBtYXAtZ2V0KCR0aGVtZSwgYmFja2dyb3VuZCk7XG4gICRmb3JlZ3JvdW5kOiBtYXAtZ2V0KCR0aGVtZSwgZm9yZWdyb3VuZCk7XG5cbiAgLm1hdC1yYWRpby1vdXRlci1jaXJjbGUge1xuICAgIGJvcmRlci1jb2xvcjogbWF0LWNvbG9yKCRmb3JlZ3JvdW5kLCBzZWNvbmRhcnktdGV4dCk7XG4gIH1cblxuICAubWF0LXJhZGlvLWJ1dHRvbiB7XG4gICAgJi5tYXQtcHJpbWFyeSB7XG4gICAgICBAaW5jbHVkZSBfbWF0LXJhZGlvLWNvbG9yKCRwcmltYXJ5KTtcbiAgICB9XG5cbiAgICAmLm1hdC1hY2NlbnQge1xuICAgICAgQGluY2x1ZGUgX21hdC1yYWRpby1jb2xvcigkYWNjZW50KTtcbiAgICB9XG5cbiAgICAmLm1hdC13YXJuIHtcbiAgICAgIEBpbmNsdWRlIF9tYXQtcmFkaW8tY29sb3IoJHdhcm4pO1xuICAgIH1cblxuICAgIC8vIFRoaXMgbmVlZHMgZXh0cmEgc3BlY2lmaWNpdHksIGJlY2F1c2UgdGhlIGNsYXNzZXMgYWJvdmUgYXJlIGNvbWJpbmVkXG4gICAgLy8gKGUuZy4gYC5tYXQtcmFkaW8tYnV0dG9uLm1hdC1hY2NlbnRgKSB3aGljaCBpbmNyZWFzZXMgdGhlaXIgc3BlY2lmaWNpdHkgYSBsb3QuXG4gICAgLy8gVE9ETzogY29uc2lkZXIgbWFraW5nIHRoZSBzZWxlY3RvcnMgaW50byBkZXNjZW5kYW50cyAoYC5tYXQtcHJpbWFyeSAubWF0LXJhZGlvLWJ1dHRvbmApLlxuICAgICYubWF0LXJhZGlvLWRpc2FibGVkIHtcbiAgICAgICYubWF0LXJhZGlvLWNoZWNrZWQgLm1hdC1yYWRpby1vdXRlci1jaXJjbGUsXG4gICAgICAubWF0LXJhZGlvLW91dGVyLWNpcmNsZSB7XG4gICAgICAgIGJvcmRlci1jb2xvcjogbWF0LWNvbG9yKCRmb3JlZ3JvdW5kLCBkaXNhYmxlZCk7XG4gICAgICB9XG5cbiAgICAgIC5tYXQtcmFkaW8tcmlwcGxlIC5tYXQtcmlwcGxlLWVsZW1lbnQsXG4gICAgICAubWF0LXJhZGlvLWlubmVyLWNpcmNsZSB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IG1hdC1jb2xvcigkZm9yZWdyb3VuZCwgZGlzYWJsZWQpO1xuICAgICAgfVxuXG4gICAgICAubWF0LXJhZGlvLWxhYmVsLWNvbnRlbnQge1xuICAgICAgICBjb2xvcjogbWF0LWNvbG9yKCRmb3JlZ3JvdW5kLCBkaXNhYmxlZCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gU3dpdGNoIHRoaXMgdG8gYSBzb2xpZCBjb2xvciBzaW5jZSB3ZSdyZSB1c2luZyBgb3BhY2l0eWBcbiAgICAvLyB0byBjb250cm9sIGhvdyBvcGFxdWUgdGhlIHJpcHBsZSBzaG91bGQgYmUuXG4gICAgLm1hdC1yaXBwbGUtZWxlbWVudCB7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiBtYXBfZ2V0KCRmb3JlZ3JvdW5kLCBiYXNlKTtcbiAgICB9XG4gIH1cbn1cblxuQG1peGluIG1hdC1yYWRpby10eXBvZ3JhcGh5KCRjb25maWcpIHtcbiAgLm1hdC1yYWRpby1idXR0b24ge1xuICAgIGZvbnQtZmFtaWx5OiBtYXQtZm9udC1mYW1pbHkoJGNvbmZpZyk7XG4gIH1cbn1cblxuXG5cblxuXG5cblxuXG5AbWl4aW4gbWF0LXNlbGVjdC10aGVtZSgkdGhlbWUpIHtcbiAgJGZvcmVncm91bmQ6IG1hcC1nZXQoJHRoZW1lLCBmb3JlZ3JvdW5kKTtcbiAgJGJhY2tncm91bmQ6IG1hcC1nZXQoJHRoZW1lLCBiYWNrZ3JvdW5kKTtcbiAgJHByaW1hcnk6IG1hcC1nZXQoJHRoZW1lLCBwcmltYXJ5KTtcbiAgJGFjY2VudDogbWFwLWdldCgkdGhlbWUsIGFjY2VudCk7XG4gICR3YXJuOiBtYXAtZ2V0KCR0aGVtZSwgd2Fybik7XG5cbiAgLm1hdC1zZWxlY3QtdmFsdWUge1xuICAgIGNvbG9yOiBtYXQtY29sb3IoJGZvcmVncm91bmQsIHRleHQpO1xuICB9XG5cbiAgLm1hdC1zZWxlY3QtcGxhY2Vob2xkZXIge1xuICAgIGNvbG9yOiBfbWF0LWNvbnRyb2wtcGxhY2Vob2xkZXItY29sb3IoJHRoZW1lKTtcbiAgfVxuXG4gIC5tYXQtc2VsZWN0LWRpc2FibGVkIC5tYXQtc2VsZWN0LXZhbHVlIHtcbiAgICBjb2xvcjogbWF0LWNvbG9yKCRmb3JlZ3JvdW5kLCBkaXNhYmxlZC10ZXh0KTtcbiAgfVxuXG4gIC5tYXQtc2VsZWN0LWFycm93IHtcbiAgICBjb2xvcjogbWF0LWNvbG9yKCRmb3JlZ3JvdW5kLCBzZWNvbmRhcnktdGV4dCk7XG4gIH1cblxuICAubWF0LXNlbGVjdC1wYW5lbCB7XG4gICAgYmFja2dyb3VuZDogbWF0LWNvbG9yKCRiYWNrZ3JvdW5kLCBjYXJkKTtcbiAgICBAaW5jbHVkZSBfbWF0LXRoZW1lLW92ZXJyaWRhYmxlLWVsZXZhdGlvbig0LCAkdGhlbWUpO1xuXG4gICAgLm1hdC1vcHRpb24ubWF0LXNlbGVjdGVkOm5vdCgubWF0LW9wdGlvbi1tdWx0aXBsZSkge1xuICAgICAgYmFja2dyb3VuZDogbWF0LWNvbG9yKCRiYWNrZ3JvdW5kLCBob3ZlciwgMC4xMik7XG4gICAgfVxuICB9XG5cbiAgLm1hdC1mb3JtLWZpZWxkIHtcbiAgICAmLm1hdC1mb2N1c2VkIHtcbiAgICAgICYubWF0LXByaW1hcnkgLm1hdC1zZWxlY3QtYXJyb3cge1xuICAgICAgICBjb2xvcjogbWF0LWNvbG9yKCRwcmltYXJ5KTtcbiAgICAgIH1cblxuICAgICAgJi5tYXQtYWNjZW50IC5tYXQtc2VsZWN0LWFycm93IHtcbiAgICAgICAgY29sb3I6IG1hdC1jb2xvcigkYWNjZW50KTtcbiAgICAgIH1cblxuICAgICAgJi5tYXQtd2FybiAubWF0LXNlbGVjdC1hcnJvdyB7XG4gICAgICAgIGNvbG9yOiBtYXQtY29sb3IoJHdhcm4pO1xuICAgICAgfVxuICAgIH1cblxuICAgIC5tYXQtc2VsZWN0Lm1hdC1zZWxlY3QtaW52YWxpZCAubWF0LXNlbGVjdC1hcnJvdyB7XG4gICAgICBjb2xvcjogbWF0LWNvbG9yKCR3YXJuKTtcbiAgICB9XG5cbiAgICAubWF0LXNlbGVjdC5tYXQtc2VsZWN0LWRpc2FibGVkIC5tYXQtc2VsZWN0LWFycm93IHtcbiAgICAgIGNvbG9yOiBtYXQtY29sb3IoJGZvcmVncm91bmQsIGRpc2FibGVkLXRleHQpO1xuICAgIH1cbiAgfVxufVxuXG5AbWl4aW4gbWF0LXNlbGVjdC10eXBvZ3JhcGh5KCRjb25maWcpIHtcbiAgLy8gVGhlIHVuaXQtbGVzcyBsaW5lLWhlaWdodCBmcm9tIHRoZSBmb250IGNvbmZpZy5cbiAgJGxpbmUtaGVpZ2h0OiBtYXQtbGluZS1oZWlnaHQoJGNvbmZpZywgaW5wdXQpO1xuXG4gIC5tYXQtc2VsZWN0IHtcbiAgICBmb250LWZhbWlseTogbWF0LWZvbnQtZmFtaWx5KCRjb25maWcpO1xuICB9XG5cbiAgLm1hdC1zZWxlY3QtdHJpZ2dlciB7XG4gICAgaGVpZ2h0OiAkbGluZS1oZWlnaHQgKiAxZW07XG4gIH1cbn1cblxuXG5cblxuXG5cbkBtaXhpbiBtYXQtc2lkZW5hdi10aGVtZSgkdGhlbWUpIHtcbiAgJHByaW1hcnk6IG1hcC1nZXQoJHRoZW1lLCBwcmltYXJ5KTtcbiAgJGFjY2VudDogbWFwLWdldCgkdGhlbWUsIGFjY2VudCk7XG4gICR3YXJuOiBtYXAtZ2V0KCR0aGVtZSwgd2Fybik7XG4gICRiYWNrZ3JvdW5kOiBtYXAtZ2V0KCR0aGVtZSwgYmFja2dyb3VuZCk7XG4gICRmb3JlZ3JvdW5kOiBtYXAtZ2V0KCR0aGVtZSwgZm9yZWdyb3VuZCk7XG5cbiAgJGRyYXdlci1iYWNrZ3JvdW5kLWNvbG9yOiBtYXQtY29sb3IoJGJhY2tncm91bmQsIGRpYWxvZyk7XG4gICRkcmF3ZXItY29udGFpbmVyLWJhY2tncm91bmQtY29sb3I6ICBtYXQtY29sb3IoJGJhY2tncm91bmQsIGJhY2tncm91bmQpO1xuICAkZHJhd2VyLXB1c2gtYmFja2dyb3VuZC1jb2xvcjogbWF0LWNvbG9yKCRiYWNrZ3JvdW5kLCBkaWFsb2cpO1xuICAkZHJhd2VyLXNpZGUtYm9yZGVyOiBzb2xpZCAxcHggbWF0LWNvbG9yKCRmb3JlZ3JvdW5kLCBkaXZpZGVyKTtcblxuICAubWF0LWRyYXdlci1jb250YWluZXIge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICRkcmF3ZXItY29udGFpbmVyLWJhY2tncm91bmQtY29sb3I7XG4gICAgY29sb3I6IG1hdC1jb2xvcigkZm9yZWdyb3VuZCwgdGV4dCk7XG4gIH1cblxuICAubWF0LWRyYXdlciB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogJGRyYXdlci1iYWNrZ3JvdW5kLWNvbG9yO1xuICAgIGNvbG9yOiBtYXQtY29sb3IoJGZvcmVncm91bmQsIHRleHQpO1xuXG4gICAgJi5tYXQtZHJhd2VyLXB1c2gge1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogJGRyYXdlci1wdXNoLWJhY2tncm91bmQtY29sb3I7XG4gICAgfVxuXG4gICAgJjpub3QoLm1hdC1kcmF3ZXItc2lkZSkge1xuICAgICAgLy8gVGhlIGVsZXZhdGlvbiBvZiB6LTE2IGlzIG5vdGVkIGluIHRoZSBkZXNpZ24gc3BlY2lmaWNhdGlvbnMuXG4gICAgICAvLyBTZWUgaHR0cHM6Ly9tYXRlcmlhbC5pby9kZXNpZ24vY29tcG9uZW50cy9uYXZpZ2F0aW9uLWRyYXdlci5odG1sXG4gICAgICBAaW5jbHVkZSBfbWF0LXRoZW1lLWVsZXZhdGlvbigxNiwgJHRoZW1lKTtcbiAgICB9XG4gIH1cblxuICAubWF0LWRyYXdlci1zaWRlIHtcbiAgICBib3JkZXItcmlnaHQ6ICRkcmF3ZXItc2lkZS1ib3JkZXI7XG5cbiAgICAmLm1hdC1kcmF3ZXItZW5kIHtcbiAgICAgIGJvcmRlci1sZWZ0OiAkZHJhd2VyLXNpZGUtYm9yZGVyO1xuICAgICAgYm9yZGVyLXJpZ2h0OiBub25lO1xuICAgIH1cbiAgfVxuXG4gIFtkaXI9J3J0bCddIC5tYXQtZHJhd2VyLXNpZGUge1xuICAgIGJvcmRlci1sZWZ0OiAkZHJhd2VyLXNpZGUtYm9yZGVyO1xuICAgIGJvcmRlci1yaWdodDogbm9uZTtcblxuICAgICYubWF0LWRyYXdlci1lbmQge1xuICAgICAgYm9yZGVyLWxlZnQ6IG5vbmU7XG4gICAgICBib3JkZXItcmlnaHQ6ICRkcmF3ZXItc2lkZS1ib3JkZXI7XG4gICAgfVxuICB9XG5cbiAgLm1hdC1kcmF3ZXItYmFja2Ryb3AubWF0LWRyYXdlci1zaG93biB7XG4gICAgJG9wYWNpdHk6IDAuNjtcbiAgICAkYmFja2Ryb3AtY29sb3I6IG1hdC1jb2xvcigkYmFja2dyb3VuZCwgY2FyZCwgJG9wYWNpdHkpO1xuXG4gICAgQGlmICh0eXBlLW9mKCRiYWNrZHJvcC1jb2xvcikgPT0gY29sb3IpIHtcbiAgICAgIC8vIFdlIHVzZSBpbnZlcnQoKSBoZXJlIHRvIGhhdmUgdGhlIGRhcmtlbiB0aGUgYmFja2dyb3VuZCBjb2xvciBleHBlY3RlZCB0byBiZSB1c2VkLiBJZiB0aGVcbiAgICAgIC8vIGJhY2tncm91bmQgaXMgbGlnaHQsIHdlIHVzZSBhIGRhcmsgYmFja2Ryb3AuIElmIHRoZSBiYWNrZ3JvdW5kIGlzIGRhcmssXG4gICAgICAvLyB3ZSB1c2UgYSBsaWdodCBiYWNrZHJvcC5cbiAgICAgIGJhY2tncm91bmQtY29sb3I6IGludmVydCgkYmFja2Ryb3AtY29sb3IpO1xuICAgIH1cbiAgICBAZWxzZSB7XG4gICAgICAvLyBJZiB3ZSBjb3VsZG4ndCByZXNvbHZlIHRoZSBiYWNrZHJvcCBjb2xvciB0byBhIGNvbG9yIHZhbHVlLCBmYWxsIGJhY2sgdG8gdXNpbmdcbiAgICAgIC8vIGBvcGFjaXR5YCB0byBtYWtlIGl0IG9wYXF1ZSBzaW5jZSBpdHMgZW5kIHZhbHVlIGNvdWxkIGJlIGEgc29saWQgY29sb3IuXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkYmFja2Ryb3AtY29sb3I7XG4gICAgICBvcGFjaXR5OiAkb3BhY2l0eTtcbiAgICB9XG4gIH1cbn1cblxuQG1peGluIG1hdC1zaWRlbmF2LXR5cG9ncmFwaHkoJGNvbmZpZykgeyB9XG5cblxuXG5cblxuXG5AbWl4aW4gX21hdC1zbGlkZS10b2dnbGUtY2hlY2tlZCgkcGFsZXR0ZSwgJHRodW1iLWNoZWNrZWQtaHVlKSB7XG4gICYubWF0LWNoZWNrZWQge1xuICAgIC5tYXQtc2xpZGUtdG9nZ2xlLXRodW1iIHtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IG1hdC1jb2xvcigkcGFsZXR0ZSwgJHRodW1iLWNoZWNrZWQtaHVlKTtcbiAgICB9XG5cbiAgICAubWF0LXNsaWRlLXRvZ2dsZS1iYXIge1xuICAgICAgLy8gT3BhY2l0eSBpcyBkZXRlcm1pbmVkIGZyb20gdGhlIHNwZWNzIGZvciB0aGUgc2VsZWN0aW9uIGNvbnRyb2xzLlxuICAgICAgLy8gU2VlOiBodHRwczovL21hdGVyaWFsLmlvL2Rlc2lnbi9jb21wb25lbnRzL3NlbGVjdGlvbi1jb250cm9scy5odG1sI3NwZWNzXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiBtYXQtY29sb3IoJHBhbGV0dGUsICR0aHVtYi1jaGVja2VkLWh1ZSwgMC41NCk7XG4gICAgfVxuXG4gICAgLm1hdC1yaXBwbGUtZWxlbWVudCB7XG4gICAgICAvLyBTZXQgbm8gb3BhY2l0eSBmb3IgdGhlIHJpcHBsZXMgYmVjYXVzZSB0aGUgcmlwcGxlIG9wYWNpdHkgd2lsbCBiZSBhZGp1c3RlZCBkeW5hbWljYWxseVxuICAgICAgLy8gYmFzZWQgb24gdGhlIHR5cGUgb2YgaW50ZXJhY3Rpb24gd2l0aCB0aGUgc2xpZGUtdG9nZ2xlIChlLmcuIGZvciBob3ZlciwgZm9jdXMpXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiBtYXQtY29sb3IoJHBhbGV0dGUsICR0aHVtYi1jaGVja2VkLWh1ZSk7XG4gICAgfVxuICB9XG59XG5cbkBtaXhpbiBtYXQtc2xpZGUtdG9nZ2xlLXRoZW1lKCR0aGVtZSkge1xuICAkaXMtZGFyazogbWFwX2dldCgkdGhlbWUsIGlzLWRhcmspO1xuICAkcHJpbWFyeTogbWFwLWdldCgkdGhlbWUsIHByaW1hcnkpO1xuICAkYWNjZW50OiBtYXAtZ2V0KCR0aGVtZSwgYWNjZW50KTtcbiAgJHdhcm46IG1hcC1nZXQoJHRoZW1lLCB3YXJuKTtcbiAgJGJhY2tncm91bmQ6IG1hcC1nZXQoJHRoZW1lLCBiYWNrZ3JvdW5kKTtcbiAgJGZvcmVncm91bmQ6IG1hcC1nZXQoJHRoZW1lLCBmb3JlZ3JvdW5kKTtcblxuICAvLyBDb2xvciBodWVzIGFyZSBiYXNlZCBvbiB0aGUgc3BlY3Mgd2hpY2ggYnJpZWZseSBzaG93IHRoZSBodWVzIHRoYXQgYXJlIGFwcGxpZWQgdG8gYSBzd2l0Y2guXG4gIC8vIFRoZSAyMDE4IHNwZWNzIG5vIGxvbmdlciBkZXNjcmliZSBob3cgZGFyayBzd2l0Y2hlcyBzaG91bGQgbG9vayBsaWtlLiBEdWUgdG8gdGhlIGxhY2sgb2ZcbiAgLy8gaW5mb3JtYXRpb24gZm9yIGRhcmsgdGhlbWVkIHN3aXRjaGVzLCB3ZSBwYXJ0aWFsbHkga2VlcCB0aGUgb2xkIGJlaGF2aW9yIHRoYXQgaXMgYmFzZWQgb25cbiAgLy8gdGhlIHByZXZpb3VzIHNwZWNpZmljYXRpb25zLiBGb3IgdGhlIGNoZWNrZWQgY29sb3Igd2UgYWx3YXlzIHVzZSB0aGUgYGRlZmF1bHRgIGh1ZSBiZWNhdXNlXG4gIC8vIHRoYXQgZm9sbG93cyBNREMgYW5kIGFsc28gbWFrZXMgaXQgZWFzaWVyIGZvciBwZW9wbGUgdG8gY3JlYXRlIGEgY3VzdG9tIHRoZW1lIHdpdGhvdXQgbmVlZGluZ1xuICAvLyB0byBzcGVjaWZ5IGVhY2ggaHVlIGluZGl2aWR1YWxseS5cbiAgJHRodW1iLXVuY2hlY2tlZC1odWU6IGlmKCRpcy1kYXJrLCA0MDAsIDUwKTtcbiAgJHRodW1iLWNoZWNrZWQtaHVlOiBkZWZhdWx0O1xuXG4gICRiYXItdW5jaGVja2VkLWNvbG9yOiBtYXQtY29sb3IoJGZvcmVncm91bmQsIGRpc2FibGVkKTtcbiAgJHJpcHBsZS11bmNoZWNrZWQtY29sb3I6IG1hdC1jb2xvcigkZm9yZWdyb3VuZCwgYmFzZSk7XG5cbiAgLm1hdC1zbGlkZS10b2dnbGUge1xuICAgIEBpbmNsdWRlIF9tYXQtc2xpZGUtdG9nZ2xlLWNoZWNrZWQoJGFjY2VudCwgJHRodW1iLWNoZWNrZWQtaHVlKTtcblxuICAgICYubWF0LXByaW1hcnkge1xuICAgICAgQGluY2x1ZGUgX21hdC1zbGlkZS10b2dnbGUtY2hlY2tlZCgkcHJpbWFyeSwgJHRodW1iLWNoZWNrZWQtaHVlKTtcbiAgICB9XG5cbiAgICAmLm1hdC13YXJuIHtcbiAgICAgIEBpbmNsdWRlIF9tYXQtc2xpZGUtdG9nZ2xlLWNoZWNrZWQoJHdhcm4sICR0aHVtYi1jaGVja2VkLWh1ZSk7XG4gICAgfVxuXG4gICAgJjpub3QoLm1hdC1jaGVja2VkKSAubWF0LXJpcHBsZS1lbGVtZW50IHtcbiAgICAgIC8vIFNldCBubyBvcGFjaXR5IGZvciB0aGUgcmlwcGxlcyBiZWNhdXNlIHRoZSByaXBwbGUgb3BhY2l0eSB3aWxsIGJlIGFkanVzdGVkIGR5bmFtaWNhbGx5XG4gICAgICAvLyBiYXNlZCBvbiB0aGUgdHlwZSBvZiBpbnRlcmFjdGlvbiB3aXRoIHRoZSBzbGlkZS10b2dnbGUgKGUuZy4gZm9yIGhvdmVyLCBmb2N1cylcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICRyaXBwbGUtdW5jaGVja2VkLWNvbG9yO1xuICAgIH1cbiAgfVxuXG4gIC5tYXQtc2xpZGUtdG9nZ2xlLXRodW1iIHtcbiAgICBAaW5jbHVkZSBfbWF0LXRoZW1lLWVsZXZhdGlvbigxLCAkdGhlbWUpO1xuICAgIGJhY2tncm91bmQtY29sb3I6IG1hdC1jb2xvcigkbWF0LWdyZXksICR0aHVtYi11bmNoZWNrZWQtaHVlKTtcbiAgfVxuXG4gIC5tYXQtc2xpZGUtdG9nZ2xlLWJhciB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogJGJhci11bmNoZWNrZWQtY29sb3I7XG4gIH1cbn1cblxuQG1peGluIG1hdC1zbGlkZS10b2dnbGUtdHlwb2dyYXBoeSgkY29uZmlnKSB7XG4gIC5tYXQtc2xpZGUtdG9nZ2xlLWNvbnRlbnQge1xuICAgIGZvbnQtZmFtaWx5OiBtYXQtZm9udC1mYW1pbHkoJGNvbmZpZyk7XG4gIH1cbn1cblxuXG5cblxuXG5AbWl4aW4gX21hdC1zbGlkZXItaW5uZXItY29udGVudC10aGVtZSgkcGFsZXR0ZSkge1xuICAubWF0LXNsaWRlci10cmFjay1maWxsLFxuICAubWF0LXNsaWRlci10aHVtYixcbiAgLm1hdC1zbGlkZXItdGh1bWItbGFiZWwge1xuICAgIGJhY2tncm91bmQtY29sb3I6IG1hdC1jb2xvcigkcGFsZXR0ZSk7XG4gIH1cblxuICAubWF0LXNsaWRlci10aHVtYi1sYWJlbC10ZXh0IHtcbiAgICBjb2xvcjogbWF0LWNvbG9yKCRwYWxldHRlLCBkZWZhdWx0LWNvbnRyYXN0KTtcbiAgfVxufVxuXG5AbWl4aW4gbWF0LXNsaWRlci10aGVtZSgkdGhlbWUpIHtcbiAgJHByaW1hcnk6IG1hcC1nZXQoJHRoZW1lLCBwcmltYXJ5KTtcbiAgJGFjY2VudDogbWFwLWdldCgkdGhlbWUsIGFjY2VudCk7XG4gICR3YXJuOiBtYXAtZ2V0KCR0aGVtZSwgd2Fybik7XG4gICRiYWNrZ3JvdW5kOiBtYXAtZ2V0KCR0aGVtZSwgYmFja2dyb3VuZCk7XG4gICRmb3JlZ3JvdW5kOiBtYXAtZ2V0KCR0aGVtZSwgZm9yZWdyb3VuZCk7XG5cbiAgJG1hdC1zbGlkZXItb2ZmLWNvbG9yOiBtYXQtY29sb3IoJGZvcmVncm91bmQsIHNsaWRlci1vZmYpO1xuICAkbWF0LXNsaWRlci1vZmYtZm9jdXNlZC1jb2xvcjogbWF0LWNvbG9yKCRmb3JlZ3JvdW5kLCBzbGlkZXItb2ZmLWFjdGl2ZSk7XG4gICRtYXQtc2xpZGVyLWRpc2FibGVkLWNvbG9yOiBtYXQtY29sb3IoJGZvcmVncm91bmQsIHNsaWRlci1vZmYpO1xuICAkbWF0LXNsaWRlci1sYWJlbGVkLW1pbi12YWx1ZS10aHVtYi1jb2xvcjogbWF0LWNvbG9yKCRmb3JlZ3JvdW5kLCBzbGlkZXItbWluKTtcbiAgJG1hdC1zbGlkZXItbGFiZWxlZC1taW4tdmFsdWUtdGh1bWItbGFiZWwtY29sb3I6IG1hdC1jb2xvcigkZm9yZWdyb3VuZCwgc2xpZGVyLW9mZik7XG4gICRtYXQtc2xpZGVyLWZvY3VzLXJpbmctY29sb3I6IG1hdC1jb2xvcigkYWNjZW50LCBkZWZhdWx0LCAwLjIpO1xuICAkbWF0LXNsaWRlci1mb2N1cy1yaW5nLW1pbi12YWx1ZS1jb2xvcjogbWF0LWNvbG9yKCRmb3JlZ3JvdW5kLCBiYXNlLCAwLjEyKTtcbiAgJG1hdC1zbGlkZXItdGljay1jb2xvcjogbWF0LWNvbG9yKCRmb3JlZ3JvdW5kLCBiYXNlLCAwLjcpO1xuICAkbWF0LXNsaWRlci10aWNrLXNpemU6IDJweDtcblxuICAubWF0LXNsaWRlci10cmFjay1iYWNrZ3JvdW5kIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkbWF0LXNsaWRlci1vZmYtY29sb3I7XG4gIH1cblxuICAubWF0LXByaW1hcnkge1xuICAgIEBpbmNsdWRlIF9tYXQtc2xpZGVyLWlubmVyLWNvbnRlbnQtdGhlbWUoJHByaW1hcnkpO1xuICB9XG5cbiAgLm1hdC1hY2NlbnQge1xuICAgIEBpbmNsdWRlIF9tYXQtc2xpZGVyLWlubmVyLWNvbnRlbnQtdGhlbWUoJGFjY2VudCk7XG4gIH1cblxuICAubWF0LXdhcm4ge1xuICAgIEBpbmNsdWRlIF9tYXQtc2xpZGVyLWlubmVyLWNvbnRlbnQtdGhlbWUoJHdhcm4pO1xuICB9XG5cbiAgLm1hdC1zbGlkZXItZm9jdXMtcmluZyB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogJG1hdC1zbGlkZXItZm9jdXMtcmluZy1jb2xvcjtcbiAgfVxuXG4gIC5tYXQtc2xpZGVyOmhvdmVyLFxuICAuY2RrLWZvY3VzZWQge1xuICAgIC5tYXQtc2xpZGVyLXRyYWNrLWJhY2tncm91bmQge1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogJG1hdC1zbGlkZXItb2ZmLWZvY3VzZWQtY29sb3I7XG4gICAgfVxuICB9XG5cbiAgLm1hdC1zbGlkZXItZGlzYWJsZWQge1xuICAgIC5tYXQtc2xpZGVyLXRyYWNrLWJhY2tncm91bmQsXG4gICAgLm1hdC1zbGlkZXItdHJhY2stZmlsbCxcbiAgICAubWF0LXNsaWRlci10aHVtYiB7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkbWF0LXNsaWRlci1kaXNhYmxlZC1jb2xvcjtcbiAgICB9XG5cbiAgICAmOmhvdmVyIHtcbiAgICAgIC5tYXQtc2xpZGVyLXRyYWNrLWJhY2tncm91bmQge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkbWF0LXNsaWRlci1kaXNhYmxlZC1jb2xvcjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAubWF0LXNsaWRlci1taW4tdmFsdWUge1xuICAgIC5tYXQtc2xpZGVyLWZvY3VzLXJpbmcge1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogJG1hdC1zbGlkZXItZm9jdXMtcmluZy1taW4tdmFsdWUtY29sb3I7XG4gICAgfVxuXG4gICAgJi5tYXQtc2xpZGVyLXRodW1iLWxhYmVsLXNob3dpbmcge1xuICAgICAgLm1hdC1zbGlkZXItdGh1bWIsXG4gICAgICAubWF0LXNsaWRlci10aHVtYi1sYWJlbCB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICRtYXQtc2xpZGVyLWxhYmVsZWQtbWluLXZhbHVlLXRodW1iLWNvbG9yO1xuICAgICAgfVxuXG4gICAgICAmLmNkay1mb2N1c2VkIHtcbiAgICAgICAgLm1hdC1zbGlkZXItdGh1bWIsXG4gICAgICAgIC5tYXQtc2xpZGVyLXRodW1iLWxhYmVsIHtcbiAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkbWF0LXNsaWRlci1sYWJlbGVkLW1pbi12YWx1ZS10aHVtYi1sYWJlbC1jb2xvcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgICY6bm90KC5tYXQtc2xpZGVyLXRodW1iLWxhYmVsLXNob3dpbmcpIHtcbiAgICAgIC5tYXQtc2xpZGVyLXRodW1iIHtcbiAgICAgICAgYm9yZGVyLWNvbG9yOiAkbWF0LXNsaWRlci1vZmYtY29sb3I7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgICAgfVxuXG4gICAgICAmOmhvdmVyLFxuICAgICAgJi5jZGstZm9jdXNlZCB7XG4gICAgICAgIC5tYXQtc2xpZGVyLXRodW1iIHtcbiAgICAgICAgICBib3JkZXItY29sb3I6ICRtYXQtc2xpZGVyLW9mZi1mb2N1c2VkLWNvbG9yO1xuICAgICAgICB9XG5cbiAgICAgICAgJi5tYXQtc2xpZGVyLWRpc2FibGVkIC5tYXQtc2xpZGVyLXRodW1iIHtcbiAgICAgICAgICBib3JkZXItY29sb3I6ICRtYXQtc2xpZGVyLWRpc2FibGVkLWNvbG9yO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLm1hdC1zbGlkZXItaGFzLXRpY2tzIC5tYXQtc2xpZGVyLXdyYXBwZXI6OmFmdGVyIHtcbiAgICBib3JkZXItY29sb3I6ICRtYXQtc2xpZGVyLXRpY2stY29sb3I7XG4gIH1cblxuICAubWF0LXNsaWRlci1ob3Jpem9udGFsIC5tYXQtc2xpZGVyLXRpY2tzIHtcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiByZXBlYXRpbmctbGluZWFyLWdyYWRpZW50KHRvIHJpZ2h0LCAkbWF0LXNsaWRlci10aWNrLWNvbG9yLFxuICAgICAgICAkbWF0LXNsaWRlci10aWNrLWNvbG9yICRtYXQtc2xpZGVyLXRpY2stc2l6ZSwgdHJhbnNwYXJlbnQgMCwgdHJhbnNwYXJlbnQpO1xuICAgIC8vIEZpcmVmb3ggZG9lc24ndCBkcmF3IHRoZSBncmFkaWVudCBjb3JyZWN0bHkgd2l0aCAndG8gcmlnaHQnXG4gICAgLy8gKHNlZSBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD0xMzE0MzE5KS5cbiAgICBiYWNrZ3JvdW5kLWltYWdlOiAtbW96LXJlcGVhdGluZy1saW5lYXItZ3JhZGllbnQoMC4wMDAxZGVnLCAkbWF0LXNsaWRlci10aWNrLWNvbG9yLFxuICAgICAgICAkbWF0LXNsaWRlci10aWNrLWNvbG9yICRtYXQtc2xpZGVyLXRpY2stc2l6ZSwgdHJhbnNwYXJlbnQgMCwgdHJhbnNwYXJlbnQpO1xuICB9XG5cbiAgLm1hdC1zbGlkZXItdmVydGljYWwgLm1hdC1zbGlkZXItdGlja3Mge1xuICAgIGJhY2tncm91bmQtaW1hZ2U6IHJlcGVhdGluZy1saW5lYXItZ3JhZGllbnQodG8gYm90dG9tLCAkbWF0LXNsaWRlci10aWNrLWNvbG9yLFxuICAgICAgICAkbWF0LXNsaWRlci10aWNrLWNvbG9yICRtYXQtc2xpZGVyLXRpY2stc2l6ZSwgdHJhbnNwYXJlbnQgMCwgdHJhbnNwYXJlbnQpO1xuICB9XG59XG5cbkBtaXhpbiBtYXQtc2xpZGVyLXR5cG9ncmFwaHkoJGNvbmZpZykge1xuICAubWF0LXNsaWRlci10aHVtYi1sYWJlbC10ZXh0IHtcbiAgICBmb250OiB7XG4gICAgICBmYW1pbHk6IG1hdC1mb250LWZhbWlseSgkY29uZmlnKTtcbiAgICAgIHNpemU6IG1hdC1mb250LXNpemUoJGNvbmZpZywgY2FwdGlvbik7XG4gICAgICB3ZWlnaHQ6IG1hdC1mb250LXdlaWdodCgkY29uZmlnLCBib2R5LTIpO1xuICAgIH1cbiAgfVxufVxuXG5cblxuXG5cbkBtaXhpbiBtYXQtc3RlcHBlci10aGVtZSgkdGhlbWUpIHtcbiAgJGZvcmVncm91bmQ6IG1hcC1nZXQoJHRoZW1lLCBmb3JlZ3JvdW5kKTtcbiAgJGJhY2tncm91bmQ6IG1hcC1nZXQoJHRoZW1lLCBiYWNrZ3JvdW5kKTtcbiAgJHByaW1hcnk6IG1hcC1nZXQoJHRoZW1lLCBwcmltYXJ5KTtcbiAgJHdhcm46IG1hcC1nZXQoJHRoZW1lLCB3YXJuKTtcblxuICAubWF0LXN0ZXAtaGVhZGVyIHtcbiAgICAmLmNkay1rZXlib2FyZC1mb2N1c2VkLFxuICAgICYuY2RrLXByb2dyYW0tZm9jdXNlZCxcbiAgICAmOmhvdmVyIHtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IG1hdC1jb2xvcigkYmFja2dyb3VuZCwgaG92ZXIpO1xuICAgIH1cblxuICAgIC8vIE9uIHRvdWNoIGRldmljZXMgdGhlIDpob3ZlciBzdGF0ZSB3aWxsIGxpbmdlciBvbiB0aGUgZWxlbWVudCBhZnRlciBhIHRhcC5cbiAgICAvLyBSZXNldCBpdCB2aWEgYEBtZWRpYWAgYWZ0ZXIgdGhlIGRlY2xhcmF0aW9uLCBiZWNhdXNlIHRoZSBtZWRpYSBxdWVyeSBpc24ndFxuICAgIC8vIHN1cHBvcnRlZCBieSBhbGwgYnJvd3NlcnMgeWV0LlxuICAgIEBtZWRpYSAoaG92ZXI6IG5vbmUpIHtcbiAgICAgICY6aG92ZXIge1xuICAgICAgICBiYWNrZ3JvdW5kOiBub25lO1xuICAgICAgfVxuICAgIH1cblxuICAgIC5tYXQtc3RlcC1sYWJlbCxcbiAgICAubWF0LXN0ZXAtb3B0aW9uYWwge1xuICAgICAgLy8gVE9ETyhqb3NlcGhwZXJyb3R0KTogVXBkYXRlIHRvIHVzaW5nIGEgY29ycmVjdGVkIGRpc2FibGVkLXRleHQgY29udHJhc3RcbiAgICAgIC8vIGluc3RlYWQgb2Ygc2Vjb25kYXJ5LXRleHQuXG4gICAgICBjb2xvcjogbWF0LWNvbG9yKCRmb3JlZ3JvdW5kLCBzZWNvbmRhcnktdGV4dCk7XG4gICAgfVxuXG4gICAgLm1hdC1zdGVwLWljb24ge1xuICAgICAgLy8gVE9ETyhqb3NlcGhwZXJyb3R0KTogVXBkYXRlIHRvIHVzaW5nIGEgY29ycmVjdGVkIGRpc2FibGVkLXRleHQgY29udHJhc3RcbiAgICAgIC8vIGluc3RlYWQgb2Ygc2Vjb25kYXJ5LXRleHQuXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiBtYXQtY29sb3IoJGZvcmVncm91bmQsIHNlY29uZGFyeS10ZXh0KTtcbiAgICAgIGNvbG9yOiBtYXQtY29sb3IoJHByaW1hcnksIGRlZmF1bHQtY29udHJhc3QpO1xuICAgIH1cblxuICAgIC5tYXQtc3RlcC1pY29uLXNlbGVjdGVkLFxuICAgIC5tYXQtc3RlcC1pY29uLXN0YXRlLWRvbmUsXG4gICAgLm1hdC1zdGVwLWljb24tc3RhdGUtZWRpdCB7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiBtYXQtY29sb3IoJHByaW1hcnkpO1xuICAgICAgY29sb3I6IG1hdC1jb2xvcigkcHJpbWFyeSwgZGVmYXVsdC1jb250cmFzdCk7XG4gICAgfVxuXG4gICAgLm1hdC1zdGVwLWljb24tc3RhdGUtZXJyb3Ige1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgICBjb2xvcjogbWF0LWNvbG9yKCR3YXJuKTtcbiAgICB9XG5cbiAgICAubWF0LXN0ZXAtbGFiZWwubWF0LXN0ZXAtbGFiZWwtYWN0aXZlIHtcbiAgICAgIGNvbG9yOiBtYXQtY29sb3IoJGZvcmVncm91bmQsIHRleHQpO1xuICAgIH1cblxuICAgIC5tYXQtc3RlcC1sYWJlbC5tYXQtc3RlcC1sYWJlbC1lcnJvciB7XG4gICAgICBjb2xvcjogbWF0LWNvbG9yKCR3YXJuKTtcbiAgICB9XG4gIH1cblxuICAubWF0LXN0ZXBwZXItaG9yaXpvbnRhbCwgLm1hdC1zdGVwcGVyLXZlcnRpY2FsIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBtYXQtY29sb3IoJGJhY2tncm91bmQsIGNhcmQpO1xuICB9XG5cbiAgLm1hdC1zdGVwcGVyLXZlcnRpY2FsLWxpbmU6OmJlZm9yZSB7XG4gICAgYm9yZGVyLWxlZnQtY29sb3I6IG1hdC1jb2xvcigkZm9yZWdyb3VuZCwgZGl2aWRlcik7XG4gIH1cblxuICAubWF0LWhvcml6b250YWwtc3RlcHBlci1oZWFkZXI6OmJlZm9yZSxcbiAgLm1hdC1ob3Jpem9udGFsLXN0ZXBwZXItaGVhZGVyOjphZnRlcixcbiAgLm1hdC1zdGVwcGVyLWhvcml6b250YWwtbGluZSB7XG4gICAgYm9yZGVyLXRvcC1jb2xvcjogbWF0LWNvbG9yKCRmb3JlZ3JvdW5kLCBkaXZpZGVyKTtcbiAgfVxufVxuXG5AbWl4aW4gbWF0LXN0ZXBwZXItdHlwb2dyYXBoeSgkY29uZmlnKSB7XG4gIC5tYXQtc3RlcHBlci12ZXJ0aWNhbCwgLm1hdC1zdGVwcGVyLWhvcml6b250YWwge1xuICAgIGZvbnQtZmFtaWx5OiBtYXQtZm9udC1mYW1pbHkoJGNvbmZpZyk7XG4gIH1cblxuICAubWF0LXN0ZXAtbGFiZWwge1xuICAgIGZvbnQ6IHtcbiAgICAgIHNpemU6IG1hdC1mb250LXNpemUoJGNvbmZpZywgYm9keS0xKTtcbiAgICAgIHdlaWdodDogbWF0LWZvbnQtd2VpZ2h0KCRjb25maWcsIGJvZHktMSk7XG4gICAgfTtcbiAgfVxuXG4gIC5tYXQtc3RlcC1zdWItbGFiZWwtZXJyb3Ige1xuICAgIGZvbnQtd2VpZ2h0OiBub3JtYWw7XG4gIH1cblxuICAubWF0LXN0ZXAtbGFiZWwtZXJyb3Ige1xuICAgIGZvbnQtc2l6ZTogbWF0LWZvbnQtc2l6ZSgkY29uZmlnLCBib2R5LTIpO1xuICB9XG5cbiAgLm1hdC1zdGVwLWxhYmVsLXNlbGVjdGVkIHtcbiAgICBmb250OiB7XG4gICAgICBzaXplOiBtYXQtZm9udC1zaXplKCRjb25maWcsIGJvZHktMik7XG4gICAgICB3ZWlnaHQ6IG1hdC1mb250LXdlaWdodCgkY29uZmlnLCBib2R5LTIpO1xuICAgIH07XG4gIH1cbn1cblxuQG1peGluIG1hdC1zb3J0LXRoZW1lKCR0aGVtZSkge1xuICAkYmFja2dyb3VuZDogbWFwLWdldCgkdGhlbWUsIGJhY2tncm91bmQpO1xuICAkZm9yZWdyb3VuZDogbWFwLWdldCgkdGhlbWUsIGZvcmVncm91bmQpO1xuXG4gIC5tYXQtc29ydC1oZWFkZXItYXJyb3cge1xuICAgICR0YWJsZS1iYWNrZ3JvdW5kOiBtYXQtY29sb3IoJGJhY2tncm91bmQsICdjYXJkJyk7XG4gICAgJHRleHQtY29sb3I6IG1hdC1jb2xvcigkZm9yZWdyb3VuZCwgc2Vjb25kYXJ5LXRleHQpO1xuXG4gICAgLy8gQmVjYXVzZSB0aGUgYXJyb3cgaXMgbWFkZSB1cCBvZiBtdWx0aXBsZSBlbGVtZW50cyB0aGF0IGFyZSBzdGFja2VkIG9uIHRvcCBvZiBlYWNoIG90aGVyLFxuICAgIC8vIHdlIGNhbid0IHVzZSB0aGUgc2VtaS10cmFzcGFyZW50IGNvbG9yIGZyb20gdGhlIHRoZW1lIGRpcmVjdGx5LiBJZiB0aGUgdmFsdWUgaXMgYSBjb2xvclxuICAgIC8vICp0eXBlKiwgd2UgY29udmVydCBpdCBpbnRvIGEgc29saWQgY29sb3IgYnkgdGFraW5nIHRoZSBvcGFjaXR5IGZyb20gdGhlIHJnYmEgdmFsdWUgYW5kXG4gICAgLy8gdXNpbmcgdGhlIHZhbHVlIHRvIGRldGVybWluZSB0aGUgcGVyY2VudGFnZSBvZiB0aGUgYmFja2dyb3VuZCB0byBwdXQgaW50byBmb3JlZ3JvdW5kXG4gICAgLy8gd2hlbiBtaXhpbmcgdGhlIGNvbG9ycyB0b2dldGhlci4gT3RoZXJ3aXNlLCBpZiBpdCByZXNvbHZlcyB0byBzb21ldGhpbmcgZGlmZmVyZW50XG4gICAgLy8gKGUuZy4gaXQgcmVzb2x2ZXMgdG8gYSBDU1MgdmFyaWFibGUpLCB3ZSB1c2UgdGhlIGNvbG9yIGRpcmVjdGx5LlxuICAgIEBpZiAodHlwZS1vZigkdGFibGUtYmFja2dyb3VuZCkgPT0gY29sb3IgYW5kIHR5cGUtb2YoJHRleHQtY29sb3IpID09IGNvbG9yKSB7XG4gICAgICAkdGV4dC1vcGFjaXR5OiBvcGFjaXR5KCR0ZXh0LWNvbG9yKTtcbiAgICAgIGNvbG9yOiBtaXgoJHRhYmxlLWJhY2tncm91bmQsIHJnYmEoJHRleHQtY29sb3IsIDEpLCAoMSAtICR0ZXh0LW9wYWNpdHkpICogMTAwJSk7XG4gICAgfVxuICAgIEBlbHNlIHtcbiAgICAgIGNvbG9yOiAkdGV4dC1jb2xvcjtcbiAgICB9XG4gIH1cbn1cblxuQG1peGluIG1hdC1zb3J0LXR5cG9ncmFwaHkoJGNvbmZpZykgeyB9XG5cblxuXG5cblxuQG1peGluIG1hdC10YWJzLXRoZW1lKCR0aGVtZSkge1xuICAkcHJpbWFyeTogbWFwLWdldCgkdGhlbWUsIHByaW1hcnkpO1xuICAkYWNjZW50OiBtYXAtZ2V0KCR0aGVtZSwgYWNjZW50KTtcbiAgJHdhcm46IG1hcC1nZXQoJHRoZW1lLCB3YXJuKTtcbiAgJGJhY2tncm91bmQ6IG1hcC1nZXQoJHRoZW1lLCBiYWNrZ3JvdW5kKTtcbiAgJGZvcmVncm91bmQ6IG1hcC1nZXQoJHRoZW1lLCBmb3JlZ3JvdW5kKTtcbiAgJGhlYWRlci1ib3JkZXI6IDFweCBzb2xpZCBtYXQtY29sb3IoJGZvcmVncm91bmQsIGRpdmlkZXIpO1xuXG4gIC5tYXQtdGFiLW5hdi1iYXIsXG4gIC5tYXQtdGFiLWhlYWRlciB7XG4gICAgYm9yZGVyLWJvdHRvbTogJGhlYWRlci1ib3JkZXI7XG4gIH1cblxuICAubWF0LXRhYi1ncm91cC1pbnZlcnRlZC1oZWFkZXIge1xuICAgIC5tYXQtdGFiLW5hdi1iYXIsXG4gICAgLm1hdC10YWItaGVhZGVyIHtcbiAgICAgIGJvcmRlci10b3A6ICRoZWFkZXItYm9yZGVyO1xuICAgICAgYm9yZGVyLWJvdHRvbTogbm9uZTtcbiAgICB9XG4gIH1cblxuICAubWF0LXRhYi1sYWJlbCwgLm1hdC10YWItbGluayB7XG4gICAgY29sb3I6IG1hdC1jb2xvcigkZm9yZWdyb3VuZCwgdGV4dCk7XG5cbiAgICAmLm1hdC10YWItZGlzYWJsZWQge1xuICAgICAgY29sb3I6IG1hdC1jb2xvcigkZm9yZWdyb3VuZCwgZGlzYWJsZWQtdGV4dCk7XG4gICAgfVxuICB9XG5cbiAgLm1hdC10YWItaGVhZGVyLXBhZ2luYXRpb24tY2hldnJvbiB7XG4gICAgYm9yZGVyLWNvbG9yOiBtYXQtY29sb3IoJGZvcmVncm91bmQsIHRleHQpO1xuICB9XG5cbiAgLm1hdC10YWItaGVhZGVyLXBhZ2luYXRpb24tZGlzYWJsZWQgLm1hdC10YWItaGVhZGVyLXBhZ2luYXRpb24tY2hldnJvbiB7XG4gICAgYm9yZGVyLWNvbG9yOiBtYXQtY29sb3IoJGZvcmVncm91bmQsIGRpc2FibGVkLXRleHQpO1xuICB9XG5cbiAgLy8gUmVtb3ZlIGhlYWRlciBib3JkZXIgd2hlbiB0aGVyZSBpcyBhIGJhY2tncm91bmQgY29sb3JcbiAgLm1hdC10YWItZ3JvdXBbY2xhc3MqPSdtYXQtYmFja2dyb3VuZC0nXSAubWF0LXRhYi1oZWFkZXIsXG4gIC5tYXQtdGFiLW5hdi1iYXJbY2xhc3MqPSdtYXQtYmFja2dyb3VuZC0nXSB7XG4gICAgYm9yZGVyLWJvdHRvbTogbm9uZTtcbiAgICBib3JkZXItdG9wOiBub25lO1xuICB9XG5cbiAgLm1hdC10YWItZ3JvdXAsIC5tYXQtdGFiLW5hdi1iYXIge1xuICAgICR0aGVtZS1jb2xvcnM6IChcbiAgICAgIHByaW1hcnk6ICRwcmltYXJ5LFxuICAgICAgYWNjZW50OiAkYWNjZW50LFxuICAgICAgd2FybjogJHdhcm5cbiAgICApO1xuXG4gICAgQGVhY2ggJG5hbWUsICRjb2xvciBpbiAkdGhlbWUtY29sb3JzIHtcbiAgICAgIC8vIFNldCB0aGUgZm9yZWdyb3VuZCBjb2xvciBvZiB0aGUgdGFic1xuICAgICAgJi5tYXQtI3skbmFtZX0ge1xuICAgICAgICBAaW5jbHVkZSBfbWF0LXRhYi1sYWJlbC1mb2N1cygkY29sb3IpO1xuICAgICAgICBAaW5jbHVkZSBfbWF0LWluay1iYXIoJGNvbG9yKTtcblxuICAgICAgICAvLyBPdmVycmlkZSBpbmsgYmFyIHdoZW4gYmFja2dyb3VuZCBjb2xvciBpcyB0aGUgc2FtZVxuICAgICAgICAmLm1hdC1iYWNrZ3JvdW5kLSN7JG5hbWV9IHtcbiAgICAgICAgICBAaW5jbHVkZSBfbWF0LWluay1iYXIoJGNvbG9yLCBkZWZhdWx0LWNvbnRyYXN0KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIEBlYWNoICRuYW1lLCAkY29sb3IgaW4gJHRoZW1lLWNvbG9ycyB7XG4gICAgICAvLyBTZXQgYmFja2dyb3VuZCBjb2xvciBvZiB0aGUgdGFicyBhbmQgb3ZlcnJpZGUgZm9jdXMgY29sb3JcbiAgICAgICYubWF0LWJhY2tncm91bmQtI3skbmFtZX0ge1xuICAgICAgICBAaW5jbHVkZSBfbWF0LXRhYi1sYWJlbC1mb2N1cygkY29sb3IpO1xuICAgICAgICBAaW5jbHVkZSBfbWF0LXRhYnMtYmFja2dyb3VuZCgkY29sb3IpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5AbWl4aW4gX21hdC1pbmstYmFyKCRjb2xvciwgJGh1ZTogZGVmYXVsdCkge1xuICAubWF0LWluay1iYXIge1xuICAgIGJhY2tncm91bmQtY29sb3I6IG1hdC1jb2xvcigkY29sb3IsICRodWUpO1xuICB9XG59XG5cbkBtaXhpbiBfbWF0LXRhYi1sYWJlbC1mb2N1cygkdGFiLWZvY3VzLWNvbG9yKSB7XG4gIC5tYXQtdGFiLWxhYmVsLFxuICAubWF0LXRhYi1saW5rIHtcbiAgICAmLmNkay1rZXlib2FyZC1mb2N1c2VkLFxuICAgICYuY2RrLXByb2dyYW0tZm9jdXNlZCB7XG4gICAgICAmOm5vdCgubWF0LXRhYi1kaXNhYmxlZCkge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiBtYXQtY29sb3IoJHRhYi1mb2N1cy1jb2xvciwgbGlnaHRlciwgMC4zKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuQG1peGluIF9tYXQtdGFicy1iYWNrZ3JvdW5kKCRiYWNrZ3JvdW5kLWNvbG9yKSB7XG4gIC8vIFNldCBiYWNrZ3JvdW5kIGNvbG9yIGZvciB0aGUgdGFiIGdyb3VwXG4gIC5tYXQtdGFiLWhlYWRlciwgLm1hdC10YWItbGlua3Mge1xuICAgIGJhY2tncm91bmQtY29sb3I6IG1hdC1jb2xvcigkYmFja2dyb3VuZC1jb2xvcik7XG4gIH1cblxuICAvLyBTZXQgbGFiZWxzIHRvIGNvbnRyYXN0IGFnYWluc3QgYmFja2dyb3VuZFxuICAubWF0LXRhYi1sYWJlbCwgLm1hdC10YWItbGluayB7XG4gICAgY29sb3I6IG1hdC1jb2xvcigkYmFja2dyb3VuZC1jb2xvciwgZGVmYXVsdC1jb250cmFzdCk7XG5cbiAgICAmLm1hdC10YWItZGlzYWJsZWQge1xuICAgICAgY29sb3I6IG1hdC1jb2xvcigkYmFja2dyb3VuZC1jb2xvciwgZGVmYXVsdC1jb250cmFzdCwgMC40KTtcbiAgICB9XG4gIH1cblxuICAvLyBTZXQgcGFnaW5hdGlvbiBjaGV2cm9ucyB0byBjb250cmFzdCBiYWNrZ3JvdW5kXG4gIC5tYXQtdGFiLWhlYWRlci1wYWdpbmF0aW9uLWNoZXZyb24ge1xuICAgIGJvcmRlci1jb2xvcjogbWF0LWNvbG9yKCRiYWNrZ3JvdW5kLWNvbG9yLCBkZWZhdWx0LWNvbnRyYXN0KTtcbiAgfVxuXG4gIC5tYXQtdGFiLWhlYWRlci1wYWdpbmF0aW9uLWRpc2FibGVkIC5tYXQtdGFiLWhlYWRlci1wYWdpbmF0aW9uLWNoZXZyb24ge1xuICAgIGJvcmRlci1jb2xvcjogbWF0LWNvbG9yKCRiYWNrZ3JvdW5kLWNvbG9yLCBkZWZhdWx0LWNvbnRyYXN0LCAwLjQpO1xuICB9XG5cbiAgLy8gU2V0IHJpcHBsZXMgY29sb3IgdG8gYmUgdGhlIGNvbnRyYXN0IGNvbG9yIG9mIHRoZSBuZXcgYmFja2dyb3VuZC4gT3RoZXJ3aXNlIHRoZSByaXBwbGVcbiAgLy8gY29sb3Igd2lsbCBiZSBiYXNlZCBvbiB0aGUgYXBwIGJhY2tncm91bmQgY29sb3IuXG4gIC5tYXQtcmlwcGxlLWVsZW1lbnQge1xuICAgIGJhY2tncm91bmQtY29sb3I6IG1hdC1jb2xvcigkYmFja2dyb3VuZC1jb2xvciwgZGVmYXVsdC1jb250cmFzdCwgMC4xMik7XG4gIH1cbn1cblxuQG1peGluIG1hdC10YWJzLXR5cG9ncmFwaHkoJGNvbmZpZykge1xuICAubWF0LXRhYi1ncm91cCB7XG4gICAgZm9udC1mYW1pbHk6IG1hdC1mb250LWZhbWlseSgkY29uZmlnKTtcbiAgfVxuXG4gIC5tYXQtdGFiLWxhYmVsLCAubWF0LXRhYi1saW5rIHtcbiAgICBmb250OiB7XG4gICAgICBmYW1pbHk6IG1hdC1mb250LWZhbWlseSgkY29uZmlnLCBidXR0b24pO1xuICAgICAgc2l6ZTogbWF0LWZvbnQtc2l6ZSgkY29uZmlnLCBidXR0b24pO1xuICAgICAgd2VpZ2h0OiBtYXQtZm9udC13ZWlnaHQoJGNvbmZpZywgYnV0dG9uKTtcbiAgICB9XG4gIH1cbn1cblxuXG5cblxuXG5cbkBtaXhpbiBfbWF0LXRvb2xiYXItY29sb3IoJHBhbGV0dGUpIHtcbiAgYmFja2dyb3VuZDogbWF0LWNvbG9yKCRwYWxldHRlKTtcbiAgY29sb3I6IG1hdC1jb2xvcigkcGFsZXR0ZSwgZGVmYXVsdC1jb250cmFzdCk7XG59XG5cbkBtaXhpbiBfbWF0LXRvb2xiYXItZm9ybS1maWVsZC1vdmVycmlkZXMge1xuICAubWF0LWZvcm0tZmllbGQtdW5kZXJsaW5lLFxuICAubWF0LWZvcm0tZmllbGQtcmlwcGxlLFxuICAubWF0LWZvY3VzZWQgLm1hdC1mb3JtLWZpZWxkLXJpcHBsZSB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogY3VycmVudENvbG9yO1xuICB9XG5cbiAgLm1hdC1mb3JtLWZpZWxkLWxhYmVsLFxuICAubWF0LWZvY3VzZWQgLm1hdC1mb3JtLWZpZWxkLWxhYmVsLFxuICAubWF0LXNlbGVjdC12YWx1ZSxcbiAgLm1hdC1zZWxlY3QtYXJyb3csXG4gIC5tYXQtZm9ybS1maWVsZC5tYXQtZm9jdXNlZCAubWF0LXNlbGVjdC1hcnJvdyB7XG4gICAgY29sb3I6IGluaGVyaXQ7XG4gIH1cblxuICAubWF0LWlucHV0LWVsZW1lbnQge1xuICAgIGNhcmV0LWNvbG9yOiBjdXJyZW50Q29sb3I7XG4gIH1cbn1cblxuQG1peGluIG1hdC10b29sYmFyLXRoZW1lKCR0aGVtZSkge1xuICAkcHJpbWFyeTogbWFwLWdldCgkdGhlbWUsIHByaW1hcnkpO1xuICAkYWNjZW50OiBtYXAtZ2V0KCR0aGVtZSwgYWNjZW50KTtcbiAgJHdhcm46IG1hcC1nZXQoJHRoZW1lLCB3YXJuKTtcbiAgJGJhY2tncm91bmQ6IG1hcC1nZXQoJHRoZW1lLCBiYWNrZ3JvdW5kKTtcbiAgJGZvcmVncm91bmQ6IG1hcC1nZXQoJHRoZW1lLCBmb3JlZ3JvdW5kKTtcblxuICAubWF0LXRvb2xiYXIge1xuICAgIGJhY2tncm91bmQ6IG1hdC1jb2xvcigkYmFja2dyb3VuZCwgYXBwLWJhcik7XG4gICAgY29sb3I6IG1hdC1jb2xvcigkZm9yZWdyb3VuZCwgdGV4dCk7XG5cbiAgICAmLm1hdC1wcmltYXJ5IHtcbiAgICAgIEBpbmNsdWRlIF9tYXQtdG9vbGJhci1jb2xvcigkcHJpbWFyeSk7XG4gICAgfVxuXG4gICAgJi5tYXQtYWNjZW50IHtcbiAgICAgIEBpbmNsdWRlIF9tYXQtdG9vbGJhci1jb2xvcigkYWNjZW50KTtcbiAgICB9XG5cbiAgICAmLm1hdC13YXJuIHtcbiAgICAgIEBpbmNsdWRlIF9tYXQtdG9vbGJhci1jb2xvcigkd2Fybik7XG4gICAgfVxuXG4gICAgQGluY2x1ZGUgX21hdC10b29sYmFyLWZvcm0tZmllbGQtb3ZlcnJpZGVzO1xuICB9XG59XG5cbkBtaXhpbiBtYXQtdG9vbGJhci10eXBvZ3JhcGh5KCRjb25maWcpIHtcbiAgLm1hdC10b29sYmFyLFxuICAubWF0LXRvb2xiYXIgaDEsXG4gIC5tYXQtdG9vbGJhciBoMixcbiAgLm1hdC10b29sYmFyIGgzLFxuICAubWF0LXRvb2xiYXIgaDQsXG4gIC5tYXQtdG9vbGJhciBoNSxcbiAgLm1hdC10b29sYmFyIGg2IHtcbiAgICBAaW5jbHVkZSBtYXQtdHlwb2dyYXBoeS1sZXZlbC10by1zdHlsZXMoJGNvbmZpZywgdGl0bGUpO1xuICAgIG1hcmdpbjogMDtcbiAgfVxufVxuXG5cblxuXG5cbiRtYXQtdG9vbHRpcC10YXJnZXQtaGVpZ2h0OiAyMnB4O1xuJG1hdC10b29sdGlwLWZvbnQtc2l6ZTogMTBweDtcbiRtYXQtdG9vbHRpcC12ZXJ0aWNhbC1wYWRkaW5nOiAoJG1hdC10b29sdGlwLXRhcmdldC1oZWlnaHQgLSAkbWF0LXRvb2x0aXAtZm9udC1zaXplKSAvIDI7XG5cbiRtYXQtdG9vbHRpcC1oYW5kc2V0LXRhcmdldC1oZWlnaHQ6IDMwcHg7XG4kbWF0LXRvb2x0aXAtaGFuZHNldC1mb250LXNpemU6IDE0cHg7XG4kbWF0LXRvb2x0aXAtaGFuZHNldC12ZXJ0aWNhbC1wYWRkaW5nOlxuICAgICgkbWF0LXRvb2x0aXAtaGFuZHNldC10YXJnZXQtaGVpZ2h0IC0gJG1hdC10b29sdGlwLWhhbmRzZXQtZm9udC1zaXplKSAvIDI7XG5cbkBtaXhpbiBtYXQtdG9vbHRpcC10aGVtZSgkdGhlbWUpIHtcbiAgLm1hdC10b29sdGlwIHtcbiAgICBiYWNrZ3JvdW5kOiBtYXQtY29sb3IoJG1hdC1ncmV5LCA3MDAsIDAuOSk7XG4gIH1cbn1cblxuQG1peGluIG1hdC10b29sdGlwLXR5cG9ncmFwaHkoJGNvbmZpZykge1xuICAubWF0LXRvb2x0aXAge1xuICAgIGZvbnQtZmFtaWx5OiBtYXQtZm9udC1mYW1pbHkoJGNvbmZpZyk7XG4gICAgZm9udC1zaXplOiAkbWF0LXRvb2x0aXAtZm9udC1zaXplO1xuICAgIHBhZGRpbmctdG9wOiAkbWF0LXRvb2x0aXAtdmVydGljYWwtcGFkZGluZztcbiAgICBwYWRkaW5nLWJvdHRvbTogJG1hdC10b29sdGlwLXZlcnRpY2FsLXBhZGRpbmc7XG4gIH1cblxuICAubWF0LXRvb2x0aXAtaGFuZHNldCB7XG4gICAgZm9udC1zaXplOiAkbWF0LXRvb2x0aXAtaGFuZHNldC1mb250LXNpemU7XG4gICAgcGFkZGluZy10b3A6ICRtYXQtdG9vbHRpcC1oYW5kc2V0LXZlcnRpY2FsLXBhZGRpbmc7XG4gICAgcGFkZGluZy1ib3R0b206ICRtYXQtdG9vbHRpcC1oYW5kc2V0LXZlcnRpY2FsLXBhZGRpbmc7XG4gIH1cbn1cblxuXG5cblxuXG5AbWl4aW4gbWF0LXNuYWNrLWJhci10aGVtZSgkdGhlbWUpIHtcbiAgJGlzLWRhcmstdGhlbWU6IG1hcC1nZXQoJHRoZW1lLCBpcy1kYXJrKTtcbiAgJGFjY2VudDogbWFwLWdldCgkdGhlbWUsIGFjY2VudCk7XG5cbiAgLm1hdC1zbmFjay1iYXItY29udGFpbmVyIHtcbiAgICAvLyBVc2UgdGhlIHByaW1hcnkgdGV4dCBvbiB0aGUgZGFyayB0aGVtZSwgZXZlbiB0aG91Z2ggdGhlIGxpZ2h0ZXIgb25lIHVzZXNcbiAgICAvLyBhIHNlY29uZGFyeSwgYmVjYXVzZSB0aGUgY29udHJhc3Qgb24gdGhlIGxpZ2h0IHByaW1hcnkgdGV4dCBpcyBwb29yLlxuICAgIGNvbG9yOiBpZigkaXMtZGFyay10aGVtZSwgJGRhcmstcHJpbWFyeS10ZXh0LCAkbGlnaHQtc2Vjb25kYXJ5LXRleHQpO1xuICAgIGJhY2tncm91bmQ6IGlmKCRpcy1kYXJrLXRoZW1lLCBtYXAtZ2V0KCRtYXQtZ3JleSwgNTApLCAjMzIzMjMyKTtcblxuICAgIEBpbmNsdWRlIF9tYXQtdGhlbWUtZWxldmF0aW9uKDYsICR0aGVtZSk7XG4gIH1cblxuICAubWF0LXNpbXBsZS1zbmFja2Jhci1hY3Rpb24ge1xuICAgIGNvbG9yOiBpZigkaXMtZGFyay10aGVtZSwgaW5oZXJpdCwgbWF0LWNvbG9yKCRhY2NlbnQpKTtcbiAgfVxufVxuXG5AbWl4aW4gbWF0LXNuYWNrLWJhci10eXBvZ3JhcGh5KCRjb25maWcpIHtcbiAgLm1hdC1zaW1wbGUtc25hY2tiYXIge1xuICAgIGZvbnQ6IHtcbiAgICAgIGZhbWlseTogbWF0LWZvbnQtZmFtaWx5KCRjb25maWcsIGJvZHktMSk7XG4gICAgICBzaXplOiBtYXQtZm9udC1zaXplKCRjb25maWcsIGJvZHktMSk7XG4gICAgfVxuICB9XG5cbiAgLm1hdC1zaW1wbGUtc25hY2tiYXItYWN0aW9uIHtcbiAgICBsaW5lLWhlaWdodDogMTtcbiAgICBmb250OiB7XG4gICAgICBmYW1pbHk6IGluaGVyaXQ7XG4gICAgICBzaXplOiBpbmhlcml0O1xuICAgICAgd2VpZ2h0OiBtYXQtZm9udC13ZWlnaHQoJGNvbmZpZywgYnV0dG9uKTtcbiAgICB9XG4gIH1cbn1cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG4vLyBUaGVtZSBzdHlsZXMgdGhhdCBvbmx5IGFwcGx5IHRvIHRoZSBmaWxsIGFwcGVhcmFuY2Ugb2YgdGhlIGZvcm0tZmllbGQuXG5cbkBtaXhpbiBtYXQtZm9ybS1maWVsZC1maWxsLXRoZW1lKCR0aGVtZSkge1xuICAkZm9yZWdyb3VuZDogbWFwLWdldCgkdGhlbWUsIGZvcmVncm91bmQpO1xuICAkaXMtZGFyay10aGVtZTogbWFwLWdldCgkdGhlbWUsIGlzLWRhcmspO1xuXG4gICRmaWxsLWJhY2tncm91bmQ6IG1hdC1jb2xvcigkZm9yZWdyb3VuZCwgYmFzZSwgaWYoJGlzLWRhcmstdGhlbWUsIDAuMSwgMC4wNCkpO1xuICAkZmlsbC1kaXNhYmxlZC1iYWNrZ3JvdW5kOiBtYXQtY29sb3IoJGZvcmVncm91bmQsIGJhc2UsIGlmKCRpcy1kYXJrLXRoZW1lLCAwLjA1LCAwLjAyKSk7XG4gICR1bmRlcmxpbmUtY29sb3I6IG1hdC1jb2xvcigkZm9yZWdyb3VuZCwgZGl2aWRlciwgaWYoJGlzLWRhcmstdGhlbWUsIDAuNSwgMC40MikpO1xuICAkbGFiZWwtZGlzYWJsZWQtY29sb3I6IG1hdC1jb2xvcigkZm9yZWdyb3VuZCwgZGlzYWJsZWQtdGV4dCk7XG5cbiAgLm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2UtZmlsbCB7XG4gICAgLm1hdC1mb3JtLWZpZWxkLWZsZXgge1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogJGZpbGwtYmFja2dyb3VuZDtcbiAgICB9XG5cbiAgICAmLm1hdC1mb3JtLWZpZWxkLWRpc2FibGVkIC5tYXQtZm9ybS1maWVsZC1mbGV4IHtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICRmaWxsLWRpc2FibGVkLWJhY2tncm91bmQ7XG4gICAgfVxuXG4gICAgLm1hdC1mb3JtLWZpZWxkLXVuZGVybGluZTo6YmVmb3JlIHtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICR1bmRlcmxpbmUtY29sb3I7XG4gICAgfVxuXG4gICAgJi5tYXQtZm9ybS1maWVsZC1kaXNhYmxlZCB7XG4gICAgICAubWF0LWZvcm0tZmllbGQtbGFiZWwge1xuICAgICAgICBjb2xvcjogJGxhYmVsLWRpc2FibGVkLWNvbG9yO1xuICAgICAgfVxuXG4gICAgICAubWF0LWZvcm0tZmllbGQtdW5kZXJsaW5lOjpiZWZvcmUge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLy8gVXNlZCB0byBtYWtlIGluc3RhbmNlcyBvZiB0aGUgX21hdC1mb3JtLWZpZWxkLWxhYmVsLWZsb2F0aW5nIG1peGluIG5lZ2xpZ2libHkgZGlmZmVyZW50LFxuLy8gYW5kIHByZXZlbnQgR29vZ2xlJ3MgQ1NTIE9wdGltaXplciBmcm9tIGNvbGxhcHNpbmcgdGhlIGRlY2xhcmF0aW9ucy4gVGhpcyBpcyBuZWVkZWQgYmVjYXVzZSBzb21lXG4vLyBvZiB0aGUgc2VsZWN0b3JzIGNvbnRhaW4gcHNldWRvLWNsYXNzZXMgbm90IHJlY29nbml6ZWQgaW4gYWxsIGJyb3dzZXJzLiBJZiBhIGJyb3dzZXIgZW5jb3VudGVyc1xuLy8gYW4gdW5rbm93biBwc2V1ZG8tY2xhc3MgaXQgd2lsbCBkaXNjYXJkIHRoZSBlbnRpcmUgcnVsZSBzZXQuXG4kbWF0LWZvcm0tZmllbGQtZmlsbC1kZWR1cGU6IDA7XG5cbi8vIEFwcGxpZXMgYSBmbG9hdGluZyBsYWJlbCBhYm92ZSB0aGUgZm9ybSBmaWVsZCBjb250cm9sIGl0c2VsZi5cbkBtaXhpbiBfbWF0LWZvcm0tZmllbGQtZmlsbC1sYWJlbC1mbG9hdGluZygkZm9udC1zY2FsZSwgJGluZml4LXBhZGRpbmcsICRpbmZpeC1tYXJnaW4tdG9wKSB7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtJGluZml4LW1hcmdpbi10b3AgLSAkaW5maXgtcGFkZGluZyArICRtYXQtZm9ybS1maWVsZC1maWxsLWRlZHVwZSlcbiAgICAgICAgICAgICBzY2FsZSgkZm9udC1zY2FsZSk7XG4gIHdpZHRoOiAxMDAlIC8gJGZvbnQtc2NhbGUgKyAkbWF0LWZvcm0tZmllbGQtZmlsbC1kZWR1cGU7XG5cbiAgJG1hdC1mb3JtLWZpZWxkLWZpbGwtZGVkdXBlOiAkbWF0LWZvcm0tZmllbGQtZmlsbC1kZWR1cGUgKyAwLjAwMDAxICFnbG9iYWw7XG59XG5cbkBtaXhpbiBtYXQtZm9ybS1maWVsZC1maWxsLXR5cG9ncmFwaHkoJGNvbmZpZykge1xuICAvLyBUaGUgdW5pdC1sZXNzIGxpbmUtaGVpZ2h0IGZyb20gdGhlIGZvbnQgY29uZmlnLlxuICAkbGluZS1oZWlnaHQ6IG1hdC1saW5lLWhlaWdodCgkY29uZmlnLCBpbnB1dCk7XG4gIC8vIFRoZSBhbW91bnQgdG8gc2NhbGUgdGhlIGZvbnQgZm9yIHRoZSBmbG9hdGluZyBsYWJlbCBhbmQgc3Vic2NyaXB0LlxuICAkc3Vic2NyaXB0LWZvbnQtc2NhbGU6IDAuNzU7XG4gIC8vIFRoZSBwYWRkaW5nIG9uIHRvcCBvZiB0aGUgaW5maXguXG4gICRpbmZpeC1wYWRkaW5nLXRvcDogMC4yNWVtO1xuICAvLyBUaGUgcGFkZGluZyBiZWxvdyB0aGUgaW5maXguXG4gICRpbmZpeC1wYWRkaW5nLWJvdHRvbTogMC43NWVtO1xuICAvLyBUaGUgbWFyZ2luIGFwcGxpZWQgdG8gdGhlIGZvcm0tZmllbGQtaW5maXggdG8gcmVzZXJ2ZSBzcGFjZSBmb3IgdGhlIGZsb2F0aW5nIGxhYmVsLlxuICAkaW5maXgtbWFyZ2luLXRvcDogMWVtICogJGxpbmUtaGVpZ2h0ICogJHN1YnNjcmlwdC1mb250LXNjYWxlO1xuICAvLyBUaGUgYW1vdW50IHdlIG9mZnNldCB0aGUgbGFiZWwgZnJvbSB0aGUgaW5wdXQgdGV4dCBpbiB0aGUgZmlsbCBhcHBlYXJhbmNlLlxuICAkZmlsbC1hcHBlYXJhbmNlLWxhYmVsLW9mZnNldDogLTAuNWVtO1xuXG4gIC5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLWZpbGwge1xuICAgIC5tYXQtZm9ybS1maWVsZC1pbmZpeCB7XG4gICAgICBwYWRkaW5nOiAkaW5maXgtcGFkZGluZy10b3AgMCAkaW5maXgtcGFkZGluZy1ib3R0b20gMDtcbiAgICB9XG5cbiAgICAubWF0LWZvcm0tZmllbGQtbGFiZWwge1xuICAgICAgdG9wOiAkaW5maXgtbWFyZ2luLXRvcCArICRpbmZpeC1wYWRkaW5nLXRvcDtcbiAgICAgIG1hcmdpbi10b3A6ICRmaWxsLWFwcGVhcmFuY2UtbGFiZWwtb2Zmc2V0O1xuICAgIH1cblxuICAgICYubWF0LWZvcm0tZmllbGQtY2FuLWZsb2F0IHtcbiAgICAgICYubWF0LWZvcm0tZmllbGQtc2hvdWxkLWZsb2F0IC5tYXQtZm9ybS1maWVsZC1sYWJlbCxcbiAgICAgIC5tYXQtaW5wdXQtc2VydmVyOmZvY3VzICsgLm1hdC1mb3JtLWZpZWxkLWxhYmVsLXdyYXBwZXIgLm1hdC1mb3JtLWZpZWxkLWxhYmVsIHtcbiAgICAgICAgQGluY2x1ZGUgX21hdC1mb3JtLWZpZWxkLWZpbGwtbGFiZWwtZmxvYXRpbmcoXG4gICAgICAgICAgICAgICAgJHN1YnNjcmlwdC1mb250LXNjYWxlLCAkaW5maXgtcGFkZGluZy10b3AgKyAkZmlsbC1hcHBlYXJhbmNlLWxhYmVsLW9mZnNldCxcbiAgICAgICAgICAgICAgICAkaW5maXgtbWFyZ2luLXRvcCk7XG4gICAgICB9XG5cbiAgICAgIC8vIFNlcnZlci1zaWRlIHJlbmRlcmVkIG1hdElucHV0IHdpdGggYSBsYWJlbCBhdHRyaWJ1dGUgYnV0IGxhYmVsIG5vdCBzaG93blxuICAgICAgLy8gKHVzZWQgYXMgYSBwdXJlIENTUyBzdGFuZC1pbiBmb3IgbWF0LWZvcm0tZmllbGQtc2hvdWxkLWZsb2F0KS5cbiAgICAgIC5tYXQtaW5wdXQtc2VydmVyW2xhYmVsXTpub3QoOmxhYmVsLXNob3duKSArIC5tYXQtZm9ybS1maWVsZC1sYWJlbC13cmFwcGVyXG4gICAgICAubWF0LWZvcm0tZmllbGQtbGFiZWwge1xuICAgICAgICBAaW5jbHVkZSBfbWF0LWZvcm0tZmllbGQtZmlsbC1sYWJlbC1mbG9hdGluZyhcbiAgICAgICAgICAgICAgICAkc3Vic2NyaXB0LWZvbnQtc2NhbGUsICRpbmZpeC1wYWRkaW5nLXRvcCArICRmaWxsLWFwcGVhcmFuY2UtbGFiZWwtb2Zmc2V0LFxuICAgICAgICAgICAgICAgICRpbmZpeC1tYXJnaW4tdG9wKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuXG5cblxuXG5cblxuLy8gVGhlbWUgc3R5bGVzIHRoYXQgb25seSBhcHBseSB0byB0aGUgbGVnYWN5IGFwcGVhcmFuY2Ugb2YgdGhlIGZvcm0tZmllbGQuXG5cbkBtaXhpbiBtYXQtZm9ybS1maWVsZC1sZWdhY3ktdGhlbWUoJHRoZW1lKSB7XG4gICRmb3JlZ3JvdW5kOiBtYXAtZ2V0KCR0aGVtZSwgZm9yZWdyb3VuZCk7XG4gICRpcy1kYXJrLXRoZW1lOiBtYXAtZ2V0KCR0aGVtZSwgaXMtZGFyayk7XG5cbiAgJGxhYmVsLWNvbG9yOiBtYXQtY29sb3IoJGZvcmVncm91bmQsIHNlY29uZGFyeS10ZXh0KTtcbiAgJHVuZGVybGluZS1jb2xvcjogbWF0LWNvbG9yKCRmb3JlZ3JvdW5kLCBkaXZpZGVyLCBpZigkaXMtZGFyay10aGVtZSwgMC43LCAwLjQyKSk7XG5cbiAgLm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2UtbGVnYWN5IHtcbiAgICAubWF0LWZvcm0tZmllbGQtbGFiZWwge1xuICAgICAgY29sb3I6ICRsYWJlbC1jb2xvcjtcbiAgICB9XG5cbiAgICAubWF0LWhpbnQge1xuICAgICAgY29sb3I6ICRsYWJlbC1jb2xvcjtcbiAgICB9XG5cbiAgICAubWF0LWZvcm0tZmllbGQtdW5kZXJsaW5lIHtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICR1bmRlcmxpbmUtY29sb3I7XG4gICAgfVxuXG4gICAgJi5tYXQtZm9ybS1maWVsZC1kaXNhYmxlZCAubWF0LWZvcm0tZmllbGQtdW5kZXJsaW5lIHtcbiAgICAgIEBpbmNsdWRlIG1hdC1jb250cm9sLWRpc2FibGVkLXVuZGVybGluZSgkdW5kZXJsaW5lLWNvbG9yKTtcbiAgICB9XG4gIH1cbn1cblxuLy8gVXNlZCB0byBtYWtlIGluc3RhbmNlcyBvZiB0aGUgX21hdC1mb3JtLWZpZWxkLWxhYmVsLWZsb2F0aW5nIG1peGluIG5lZ2xpZ2libHkgZGlmZmVyZW50LFxuLy8gYW5kIHByZXZlbnQgR29vZ2xlJ3MgQ1NTIE9wdGltaXplciBmcm9tIGNvbGxhcHNpbmcgdGhlIGRlY2xhcmF0aW9ucy4gVGhpcyBpcyBuZWVkZWQgYmVjYXVzZSBzb21lXG4vLyBvZiB0aGUgc2VsZWN0b3JzIGNvbnRhaW4gcHNldWRvLWNsYXNzZXMgbm90IHJlY29nbml6ZWQgaW4gYWxsIGJyb3dzZXJzLiBJZiBhIGJyb3dzZXIgZW5jb3VudGVyc1xuLy8gYW4gdW5rbm93biBwc2V1ZG8tY2xhc3MgaXQgd2lsbCBkaXNjYXJkIHRoZSBlbnRpcmUgcnVsZSBzZXQuXG4kbWF0LWZvcm0tZmllbGQtbGVnYWN5LWRlZHVwZTogMDtcblxuLy8gQXBwbGllcyBhIGZsb2F0aW5nIGxhYmVsIGFib3ZlIHRoZSBmb3JtIGZpZWxkIGNvbnRyb2wgaXRzZWxmLlxuQG1peGluIF9tYXQtZm9ybS1maWVsZC1sZWdhY3ktbGFiZWwtZmxvYXRpbmcoJGZvbnQtc2NhbGUsICRpbmZpeC1wYWRkaW5nLCAkaW5maXgtbWFyZ2luLXRvcCkge1xuICAvLyBXZSB1c2UgcGVyc3BlY3RpdmUgdG8gZml4IHRoZSB0ZXh0IGJsdXJyaW5lc3MgYXMgZGVzY3JpYmVkIGhlcmU6XG4gIC8vIGh0dHA6Ly93d3cudXNlcmFnZW50bWFuLmNvbS9ibG9nLzIwMTQvMDUvMDQvZml4aW5nLXR5cG9ncmFwaHktaW5zaWRlLW9mLTItZC1jc3MtdHJhbnNmb3Jtcy9cbiAgLy8gVGhpcyByZXN1bHRzIGluIGEgc21hbGwgaml0dGVyIGFmdGVyIHRoZSBsYWJlbCBmbG9hdHMgb24gRmlyZWZveCwgd2hpY2ggdGhlXG4gIC8vIHRyYW5zbGF0ZVogZml4ZXMuXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtJGluZml4LW1hcmdpbi10b3AgLSAkaW5maXgtcGFkZGluZykgc2NhbGUoJGZvbnQtc2NhbGUpIHBlcnNwZWN0aXZlKDEwMHB4KVxuICB0cmFuc2xhdGVaKDAuMDAxcHggKyAkbWF0LWZvcm0tZmllbGQtbGVnYWN5LWRlZHVwZSk7XG4gIC8vIFRoZSB0cmlja3MgYWJvdmUgdXNlZCB0byBzbW9vdGggb3V0IHRoZSBhbmltYXRpb24gb24gY2hyb21lIGFuZCBmaXJlZm94IGFjdHVhbGx5IG1ha2UgdGhpbmdzXG4gIC8vIHdvcnNlIG9uIElFLCBzbyB3ZSBkb24ndCBpbmNsdWRlIHRoZW0gaW4gdGhlIElFIHZlcnNpb24uXG4gIC1tcy10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLSRpbmZpeC1tYXJnaW4tdG9wIC0gJGluZml4LXBhZGRpbmcgKyAkbWF0LWZvcm0tZmllbGQtbGVnYWN5LWRlZHVwZSlcbiAgICAgICAgICAgICAgICAgIHNjYWxlKCRmb250LXNjYWxlKTtcblxuICB3aWR0aDogMTAwJSAvICRmb250LXNjYWxlICsgJG1hdC1mb3JtLWZpZWxkLWxlZ2FjeS1kZWR1cGU7XG5cbiAgJG1hdC1mb3JtLWZpZWxkLWxlZ2FjeS1kZWR1cGU6ICRtYXQtZm9ybS1maWVsZC1sZWdhY3ktZGVkdXBlICsgMC4wMDAwMSAhZ2xvYmFsO1xufVxuXG4vLyBTYW1lIGFzIG1peGluIGFib3ZlLCBidXQgb21pdHMgdGhlIHRyYW5zbGF0ZVogZm9yIHByaW50aW5nIHB1cnBvc2VzLlxuQG1peGluIF9tYXQtZm9ybS1maWVsZC1sZWdhY3ktbGFiZWwtZmxvYXRpbmctcHJpbnQoJGZvbnQtc2NhbGUsICRpbmZpeC1wYWRkaW5nLCAkaW5maXgtbWFyZ2luLXRvcCkge1xuICAvLyBUaGlzIHJlc3VsdHMgaW4gYSBzbWFsbCBqaXR0ZXIgYWZ0ZXIgdGhlIGxhYmVsIGZsb2F0cyBvbiBGaXJlZm94LCB3aGljaCB0aGVcbiAgLy8gdHJhbnNsYXRlWiBmaXhlcy5cbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0kaW5maXgtbWFyZ2luLXRvcCAtICRpbmZpeC1wYWRkaW5nICsgJG1hdC1mb3JtLWZpZWxkLWxlZ2FjeS1kZWR1cGUpXG4gICAgICAgICAgICAgICAgICBzY2FsZSgkZm9udC1zY2FsZSk7XG4gIC8vIFRoZSB0cmlja3MgYWJvdmUgdXNlZCB0byBzbW9vdGggb3V0IHRoZSBhbmltYXRpb24gb24gY2hyb21lIGFuZCBmaXJlZm94IGFjdHVhbGx5IG1ha2UgdGhpbmdzXG4gIC8vIHdvcnNlIG9uIElFLCBzbyB3ZSBkb24ndCBpbmNsdWRlIHRoZW0gaW4gdGhlIElFIHZlcnNpb24uXG4gICRtYXQtZm9ybS1maWVsZC1sZWdhY3ktZGVkdXBlOiAkbWF0LWZvcm0tZmllbGQtbGVnYWN5LWRlZHVwZSArIDAuMDAwMDEgIWdsb2JhbDtcbn1cblxuQG1peGluIG1hdC1mb3JtLWZpZWxkLWxlZ2FjeS10eXBvZ3JhcGh5KCRjb25maWcpIHtcbiAgLy8gVGhlIHVuaXQtbGVzcyBsaW5lLWhlaWdodCBmcm9tIHRoZSBmb250IGNvbmZpZy5cbiAgJGxpbmUtaGVpZ2h0OiBtYXQtbGluZS1oZWlnaHQoJGNvbmZpZywgaW5wdXQpO1xuICAvLyBUaGUgYW1vdW50IHRvIHNjYWxlIHRoZSBmb250IGZvciB0aGUgZmxvYXRpbmcgbGFiZWwgYW5kIHN1YnNjcmlwdC5cbiAgJHN1YnNjcmlwdC1mb250LXNjYWxlOiAwLjc1O1xuICAvLyBUaGUgYW1vdW50IG9mIHNwYWNlIGJldHdlZW4gdGhlIHRvcCBvZiB0aGUgbGluZSBhbmQgdGhlIHRvcCBvZiB0aGUgYWN0dWFsIHRleHRcbiAgLy8gKGFzIGEgZnJhY3Rpb24gb2YgdGhlIGZvbnQtc2l6ZSkuXG4gICRsaW5lLXNwYWNpbmc6ICgkbGluZS1oZWlnaHQgLSAxKSAvIDI7XG4gIC8vIFRoZSBwYWRkaW5nIG9uIHRoZSBpbmZpeC4gTW9ja3Mgc2hvdyBoYWxmIG9mIHRoZSB0ZXh0IHNpemUsIGJ1dCBzZWVtIHRvIG1lYXN1cmUgZnJvbSB0aGUgZWRnZVxuICAvLyBvZiB0aGUgdGV4dCBpdHNlbGYsIG5vdCB0aGUgZWRnZSBvZiB0aGUgbGluZTsgdGhlcmVmb3JlIHdlIHN1YnRyYWN0IG9mZiB0aGUgbGluZSBzcGFjaW5nLlxuICAkaW5maXgtcGFkZGluZzogMC41ZW0gLSAkbGluZS1zcGFjaW5nO1xuICAvLyBUaGUgbWFyZ2luIGFwcGxpZWQgdG8gdGhlIGZvcm0tZmllbGQtaW5maXggdG8gcmVzZXJ2ZSBzcGFjZSBmb3IgdGhlIGZsb2F0aW5nIGxhYmVsLlxuICAkaW5maXgtbWFyZ2luLXRvcDogMWVtICogJGxpbmUtaGVpZ2h0ICogJHN1YnNjcmlwdC1mb250LXNjYWxlO1xuICAvLyBUaGUgc3BhY2UgYmV0d2VlbiB0aGUgYm90dG9tIG9mIHRoZSAubWF0LWZvcm0tZmllbGQtZmxleCBhcmVhIGFuZCB0aGUgc3Vic2NyaXB0IHdyYXBwZXIuXG4gIC8vIE1vY2tzIHNob3cgaGFsZiBvZiB0aGUgdGV4dCBzaXplLCBidXQgdGhpcyBtYXJnaW4gaXMgYXBwbGllZCB0byBhbiBlbGVtZW50IHdpdGggdGhlIHN1YnNjcmlwdFxuICAvLyB0ZXh0IGZvbnQgc2l6ZSwgc28gd2UgbmVlZCB0byBkaXZpZGUgYnkgdGhlIHNjYWxlIGZhY3RvciB0byBtYWtlIGl0IGhhbGYgb2YgdGhlIG9yaWdpbmFsIHRleHRcbiAgLy8gc2l6ZS4gV2UgYWdhaW4gbmVlZCB0byBzdWJ0cmFjdCBvZmYgdGhlIGxpbmUgc3BhY2luZyBzaW5jZSB0aGUgbW9ja3MgbWVhc3VyZSB0byB0aGUgZWRnZSBvZiB0aGVcbiAgLy8gdGV4dCwgbm90IHRoZSAgZWRnZSBvZiB0aGUgbGluZS5cbiAgJHN1YnNjcmlwdC1tYXJnaW4tdG9wOiAwLjVlbSAvICRzdWJzY3JpcHQtZm9udC1zY2FsZSAtICgkbGluZS1zcGFjaW5nICogMik7XG4gIC8vIFRoZSBwYWRkaW5nIGFwcGxpZWQgdG8gdGhlIGZvcm0tZmllbGQtd3JhcHBlciB0byByZXNlcnZlIHNwYWNlIGZvciB0aGUgc3Vic2NyaXB0LCBzaW5jZSBpdCdzXG4gIC8vIGFic29sdXRlbHkgcG9zaXRpb25lZC4gVGhpcyBpcyBhIGNvbWJpbmF0aW9uIG9mIHRoZSBzdWJzY3JpcHQncyBtYXJnaW4gYW5kIGxpbmUtaGVpZ2h0LCBidXQgd2VcbiAgLy8gbmVlZCB0byBtdWx0aXBseSBieSB0aGUgc3Vic2NyaXB0IGZvbnQgc2NhbGUgZmFjdG9yIHNpbmNlIHRoZSB3cmFwcGVyIGhhcyBhIGxhcmdlciBmb250IHNpemUuXG4gICR3cmFwcGVyLXBhZGRpbmctYm90dG9tOiAoJHN1YnNjcmlwdC1tYXJnaW4tdG9wICsgJGxpbmUtaGVpZ2h0KSAqICRzdWJzY3JpcHQtZm9udC1zY2FsZTtcblxuICAubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1sZWdhY3kge1xuICAgIC5tYXQtZm9ybS1maWVsZC13cmFwcGVyIHtcbiAgICAgIHBhZGRpbmctYm90dG9tOiAkd3JhcHBlci1wYWRkaW5nLWJvdHRvbTtcbiAgICB9XG5cbiAgICAubWF0LWZvcm0tZmllbGQtaW5maXgge1xuICAgICAgcGFkZGluZzogJGluZml4LXBhZGRpbmcgMDtcbiAgICB9XG5cbiAgICAmLm1hdC1mb3JtLWZpZWxkLWNhbi1mbG9hdCB7XG4gICAgICAmLm1hdC1mb3JtLWZpZWxkLXNob3VsZC1mbG9hdCAubWF0LWZvcm0tZmllbGQtbGFiZWwsXG4gICAgICAubWF0LWlucHV0LXNlcnZlcjpmb2N1cyArIC5tYXQtZm9ybS1maWVsZC1sYWJlbC13cmFwcGVyIC5tYXQtZm9ybS1maWVsZC1sYWJlbCB7XG4gICAgICAgIEBpbmNsdWRlIF9tYXQtZm9ybS1maWVsZC1sZWdhY3ktbGFiZWwtZmxvYXRpbmcoXG4gICAgICAgICAgICAgICAgJHN1YnNjcmlwdC1mb250LXNjYWxlLCAkaW5maXgtcGFkZGluZywgJGluZml4LW1hcmdpbi10b3ApO1xuICAgICAgfVxuXG4gICAgICAvLyBAYnJlYWtpbmctY2hhbmdlIDguMC4wIHdpbGwgcmVseSBvbiBBdXRvZmlsbE1vbml0b3IgaW5zdGVhZC5cbiAgICAgIC5tYXQtZm9ybS1maWVsZC1hdXRvZmlsbC1jb250cm9sOi13ZWJraXQtYXV0b2ZpbGwgKyAubWF0LWZvcm0tZmllbGQtbGFiZWwtd3JhcHBlclxuICAgICAgLm1hdC1mb3JtLWZpZWxkLWxhYmVsIHtcbiAgICAgICAgQGluY2x1ZGUgX21hdC1mb3JtLWZpZWxkLWxlZ2FjeS1sYWJlbC1mbG9hdGluZyhcbiAgICAgICAgICAgICAgICAkc3Vic2NyaXB0LWZvbnQtc2NhbGUsICRpbmZpeC1wYWRkaW5nLCAkaW5maXgtbWFyZ2luLXRvcCk7XG4gICAgICB9XG5cbiAgICAgIC8vIFNlcnZlci1zaWRlIHJlbmRlcmVkIG1hdElucHV0IHdpdGggYSBsYWJlbCBhdHRyaWJ1dGUgYnV0IGxhYmVsIG5vdCBzaG93blxuICAgICAgLy8gKHVzZWQgYXMgYSBwdXJlIENTUyBzdGFuZC1pbiBmb3IgbWF0LWZvcm0tZmllbGQtc2hvdWxkLWZsb2F0KS5cbiAgICAgIC5tYXQtaW5wdXQtc2VydmVyW2xhYmVsXTpub3QoOmxhYmVsLXNob3duKSArIC5tYXQtZm9ybS1maWVsZC1sYWJlbC13cmFwcGVyXG4gICAgICAubWF0LWZvcm0tZmllbGQtbGFiZWwge1xuICAgICAgICBAaW5jbHVkZSBfbWF0LWZvcm0tZmllbGQtbGVnYWN5LWxhYmVsLWZsb2F0aW5nKFxuICAgICAgICAgICAgICAgICRzdWJzY3JpcHQtZm9udC1zY2FsZSwgJGluZml4LXBhZGRpbmcsICRpbmZpeC1tYXJnaW4tdG9wKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAubWF0LWZvcm0tZmllbGQtbGFiZWwge1xuICAgICAgdG9wOiAkaW5maXgtbWFyZ2luLXRvcCArICRpbmZpeC1wYWRkaW5nO1xuICAgIH1cblxuICAgIC5tYXQtZm9ybS1maWVsZC11bmRlcmxpbmUge1xuICAgICAgLy8gV2Ugd2FudCB0aGUgdW5kZXJsaW5lIHRvIHN0YXJ0IGF0IHRoZSBlbmQgb2YgdGhlIGNvbnRlbnQgYm94LCBub3QgdGhlIHBhZGRpbmcgYm94LFxuICAgICAgLy8gc28gd2UgbW92ZSBpdCB1cCBieSB0aGUgcGFkZGluZyBhbW91bnQuXG4gICAgICBib3R0b206ICR3cmFwcGVyLXBhZGRpbmctYm90dG9tO1xuICAgIH1cblxuICAgIC5tYXQtZm9ybS1maWVsZC1zdWJzY3JpcHQtd3JhcHBlciB7XG4gICAgICBtYXJnaW4tdG9wOiAkc3Vic2NyaXB0LW1hcmdpbi10b3A7XG5cbiAgICAgIC8vIFdlIHdhbnQgdGhlIHN1YnNjcmlwdCB0byBzdGFydCBhdCB0aGUgZW5kIG9mIHRoZSBjb250ZW50IGJveCwgbm90IHRoZSBwYWRkaW5nIGJveCxcbiAgICAgIC8vIHNvIHdlIG1vdmUgaXQgdXAgYnkgdGhlIHBhZGRpbmcgYW1vdW50IChhZGp1c3RlZCBmb3IgdGhlIHNtYWxsZXIgZm9udCBzaXplKTtcbiAgICAgIHRvcDogY2FsYygxMDAlIC0gI3skd3JhcHBlci1wYWRkaW5nLWJvdHRvbSAvICRzdWJzY3JpcHQtZm9udC1zY2FsZX0pO1xuICAgIH1cbiAgfVxuXG4gIC8vIHRyYW5zbGF0ZVogY2F1c2VzIHRoZSBsYWJlbCB0byBub3QgYXBwZWFyIHdoaWxlIHByaW50aW5nLCBzbyB3ZSBvdmVycmlkZSBpdCB0byBub3RcbiAgLy8gYXBwbHkgdHJhbnNsYXRlWiB3aGlsZSBwcmludGluZ1xuICBAbWVkaWEgcHJpbnQge1xuICAgIC5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLWxlZ2FjeSB7XG4gICAgICAmLm1hdC1mb3JtLWZpZWxkLWNhbi1mbG9hdCB7XG4gICAgICAgICYubWF0LWZvcm0tZmllbGQtc2hvdWxkLWZsb2F0IC5tYXQtZm9ybS1maWVsZC1sYWJlbCxcbiAgICAgICAgLm1hdC1pbnB1dC1zZXJ2ZXI6Zm9jdXMgKyAubWF0LWZvcm0tZmllbGQtbGFiZWwtd3JhcHBlciAubWF0LWZvcm0tZmllbGQtbGFiZWwge1xuICAgICAgICAgIEBpbmNsdWRlIF9tYXQtZm9ybS1maWVsZC1sZWdhY3ktbGFiZWwtZmxvYXRpbmctcHJpbnQoXG4gICAgICAgICAgICAgICAgICAkc3Vic2NyaXB0LWZvbnQtc2NhbGUsICRpbmZpeC1wYWRkaW5nLCAkaW5maXgtbWFyZ2luLXRvcCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBAYnJlYWtpbmctY2hhbmdlIDguMC4wIHdpbGwgcmVseSBvbiBBdXRvZmlsbE1vbml0b3IgaW5zdGVhZC5cbiAgICAgICAgLm1hdC1mb3JtLWZpZWxkLWF1dG9maWxsLWNvbnRyb2w6LXdlYmtpdC1hdXRvZmlsbCArIC5tYXQtZm9ybS1maWVsZC1sYWJlbC13cmFwcGVyXG4gICAgICAgIC5tYXQtZm9ybS1maWVsZC1sYWJlbCB7XG4gICAgICAgICAgQGluY2x1ZGUgX21hdC1mb3JtLWZpZWxkLWxlZ2FjeS1sYWJlbC1mbG9hdGluZy1wcmludChcbiAgICAgICAgICAgICAgICAgICRzdWJzY3JpcHQtZm9udC1zY2FsZSwgJGluZml4LXBhZGRpbmcsICRpbmZpeC1tYXJnaW4tdG9wKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFNlcnZlci1zaWRlIHJlbmRlcmVkIG1hdElucHV0IHdpdGggYSBsYWJlbCBhdHRyaWJ1dGUgYnV0IGxhYmVsIG5vdCBzaG93blxuICAgICAgICAvLyAodXNlZCBhcyBhIHB1cmUgQ1NTIHN0YW5kLWluIGZvciBtYXQtZm9ybS1maWVsZC1zaG91bGQtZmxvYXQpLlxuICAgICAgICAubWF0LWlucHV0LXNlcnZlcltsYWJlbF06bm90KDpsYWJlbC1zaG93bikgKyAubWF0LWZvcm0tZmllbGQtbGFiZWwtd3JhcHBlclxuICAgICAgICAubWF0LWZvcm0tZmllbGQtbGFiZWwge1xuICAgICAgICAgIEBpbmNsdWRlIF9tYXQtZm9ybS1maWVsZC1sZWdhY3ktbGFiZWwtZmxvYXRpbmctcHJpbnQoXG4gICAgICAgICAgICAgICAgICAkc3Vic2NyaXB0LWZvbnQtc2NhbGUsICRpbmZpeC1wYWRkaW5nLCAkaW5maXgtbWFyZ2luLXRvcCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuXG5cblxuXG5cblxuLy8gVGhlbWUgc3R5bGVzIHRoYXQgb25seSBhcHBseSB0byB0aGUgb3V0bGluZSBhcHBlYXJhbmNlIG9mIHRoZSBmb3JtLWZpZWxkLlxuXG5AbWl4aW4gbWF0LWZvcm0tZmllbGQtb3V0bGluZS10aGVtZSgkdGhlbWUpIHtcbiAgJHByaW1hcnk6IG1hcC1nZXQoJHRoZW1lLCBwcmltYXJ5KTtcbiAgJGFjY2VudDogbWFwLWdldCgkdGhlbWUsIGFjY2VudCk7XG4gICR3YXJuOiBtYXAtZ2V0KCR0aGVtZSwgd2Fybik7XG4gICRmb3JlZ3JvdW5kOiBtYXAtZ2V0KCR0aGVtZSwgZm9yZWdyb3VuZCk7XG4gICRpcy1kYXJrLXRoZW1lOiBtYXAtZ2V0KCR0aGVtZSwgaXMtZGFyayk7XG5cbiAgJGxhYmVsLWRpc2FibGVkLWNvbG9yOiBtYXQtY29sb3IoJGZvcmVncm91bmQsIGRpc2FibGVkLXRleHQpO1xuICAkb3V0bGluZS1jb2xvcjogbWF0LWNvbG9yKCRmb3JlZ3JvdW5kLCBkaXZpZGVyLCBpZigkaXMtZGFyay10aGVtZSwgMC4zLCAwLjEyKSk7XG4gICRvdXRsaW5lLWNvbG9yLWhvdmVyOiBtYXQtY29sb3IoJGZvcmVncm91bmQsIGRpdmlkZXIsIGlmKCRpcy1kYXJrLXRoZW1lLCAxLCAwLjg3KSk7XG4gICRvdXRsaW5lLWNvbG9yLXByaW1hcnk6IG1hdC1jb2xvcigkcHJpbWFyeSk7XG4gICRvdXRsaW5lLWNvbG9yLWFjY2VudDogbWF0LWNvbG9yKCRhY2NlbnQpO1xuICAkb3V0bGluZS1jb2xvci13YXJuOiBtYXQtY29sb3IoJHdhcm4pO1xuICAkb3V0bGluZS1jb2xvci1kaXNhYmxlZDogbWF0LWNvbG9yKCRmb3JlZ3JvdW5kLCBkaXZpZGVyLCBpZigkaXMtZGFyay10aGVtZSwgMC4xNSwgMC4wNikpO1xuXG4gIC5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLW91dGxpbmUge1xuICAgIC5tYXQtZm9ybS1maWVsZC1vdXRsaW5lIHtcbiAgICAgIGNvbG9yOiAkb3V0bGluZS1jb2xvcjtcbiAgICB9XG5cbiAgICAubWF0LWZvcm0tZmllbGQtb3V0bGluZS10aGljayB7XG4gICAgICBjb2xvcjogJG91dGxpbmUtY29sb3ItaG92ZXI7XG4gICAgfVxuXG4gICAgJi5tYXQtZm9jdXNlZCB7XG4gICAgICAubWF0LWZvcm0tZmllbGQtb3V0bGluZS10aGljayB7XG4gICAgICAgIGNvbG9yOiAkb3V0bGluZS1jb2xvci1wcmltYXJ5O1xuICAgICAgfVxuXG4gICAgICAmLm1hdC1hY2NlbnQgLm1hdC1mb3JtLWZpZWxkLW91dGxpbmUtdGhpY2sge1xuICAgICAgICBjb2xvcjogJG91dGxpbmUtY29sb3ItYWNjZW50O1xuICAgICAgfVxuXG4gICAgICAmLm1hdC13YXJuIC5tYXQtZm9ybS1maWVsZC1vdXRsaW5lLXRoaWNrIHtcbiAgICAgICAgY29sb3I6ICRvdXRsaW5lLWNvbG9yLXdhcm47XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gQ2xhc3MgcmVwZWF0ZWQgc28gdGhhdCBydWxlIGlzIHNwZWNpZmljIGVub3VnaCB0byBvdmVycmlkZSBmb2N1c2VkIGFjY2VudCBjb2xvciBjYXNlLlxuICAgICYubWF0LWZvcm0tZmllbGQtaW52YWxpZC5tYXQtZm9ybS1maWVsZC1pbnZhbGlkIHtcbiAgICAgIC5tYXQtZm9ybS1maWVsZC1vdXRsaW5lLXRoaWNrIHtcbiAgICAgICAgY29sb3I6ICRvdXRsaW5lLWNvbG9yLXdhcm47XG4gICAgICB9XG4gICAgfVxuXG4gICAgJi5tYXQtZm9ybS1maWVsZC1kaXNhYmxlZCB7XG4gICAgICAubWF0LWZvcm0tZmllbGQtbGFiZWwge1xuICAgICAgICBjb2xvcjogJGxhYmVsLWRpc2FibGVkLWNvbG9yO1xuICAgICAgfVxuXG4gICAgICAubWF0LWZvcm0tZmllbGQtb3V0bGluZSB7XG4gICAgICAgIGNvbG9yOiAkb3V0bGluZS1jb2xvci1kaXNhYmxlZDtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLy8gVXNlZCB0byBtYWtlIGluc3RhbmNlcyBvZiB0aGUgX21hdC1mb3JtLWZpZWxkLWxhYmVsLWZsb2F0aW5nIG1peGluIG5lZ2xpZ2libHkgZGlmZmVyZW50LFxuLy8gYW5kIHByZXZlbnQgR29vZ2xlJ3MgQ1NTIE9wdGltaXplciBmcm9tIGNvbGxhcHNpbmcgdGhlIGRlY2xhcmF0aW9ucy4gVGhpcyBpcyBuZWVkZWQgYmVjYXVzZSBzb21lXG4vLyBvZiB0aGUgc2VsZWN0b3JzIGNvbnRhaW4gcHNldWRvLWNsYXNzZXMgbm90IHJlY29nbml6ZWQgaW4gYWxsIGJyb3dzZXJzLiBJZiBhIGJyb3dzZXIgZW5jb3VudGVyc1xuLy8gYW4gdW5rbm93biBwc2V1ZG8tY2xhc3MgaXQgd2lsbCBkaXNjYXJkIHRoZSBlbnRpcmUgcnVsZSBzZXQuXG4kbWF0LWZvcm0tZmllbGQtb3V0bGluZS1kZWR1cGU6IDA7XG5cbi8vIEFwcGxpZXMgYSBmbG9hdGluZyBsYWJlbCBhYm92ZSB0aGUgZm9ybSBmaWVsZCBjb250cm9sIGl0c2VsZi5cbkBtaXhpbiBfbWF0LWZvcm0tZmllbGQtb3V0bGluZS1sYWJlbC1mbG9hdGluZygkZm9udC1zY2FsZSwgJGluZml4LXBhZGRpbmcsICRpbmZpeC1tYXJnaW4tdG9wKSB7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtJGluZml4LW1hcmdpbi10b3AgLSAkaW5maXgtcGFkZGluZyArICRtYXQtZm9ybS1maWVsZC1vdXRsaW5lLWRlZHVwZSlcbiAgc2NhbGUoJGZvbnQtc2NhbGUpO1xuICB3aWR0aDogMTAwJSAvICRmb250LXNjYWxlICsgJG1hdC1mb3JtLWZpZWxkLW91dGxpbmUtZGVkdXBlO1xuXG4gICRtYXQtZm9ybS1maWVsZC1vdXRsaW5lLWRlZHVwZTogJG1hdC1mb3JtLWZpZWxkLW91dGxpbmUtZGVkdXBlICsgMC4wMDAwMSAhZ2xvYmFsO1xufVxuXG5AbWl4aW4gbWF0LWZvcm0tZmllbGQtb3V0bGluZS10eXBvZ3JhcGh5KCRjb25maWcpIHtcbiAgLy8gVGhlIHVuaXQtbGVzcyBsaW5lLWhlaWdodCBmcm9tIHRoZSBmb250IGNvbmZpZy5cbiAgJGxpbmUtaGVpZ2h0OiBtYXQtbGluZS1oZWlnaHQoJGNvbmZpZywgaW5wdXQpO1xuICAvLyBUaGUgYW1vdW50IHRvIHNjYWxlIHRoZSBmb250IGZvciB0aGUgZmxvYXRpbmcgbGFiZWwgYW5kIHN1YnNjcmlwdC5cbiAgJHN1YnNjcmlwdC1mb250LXNjYWxlOiAwLjc1O1xuICAvLyBUaGUgcGFkZGluZyBhYm92ZSBhbmQgYmVsb3cgdGhlIGluZml4LlxuICAkaW5maXgtcGFkZGluZzogMWVtO1xuICAvLyBUaGUgbWFyZ2luIGFwcGxpZWQgdG8gdGhlIGZvcm0tZmllbGQtaW5maXggdG8gcmVzZXJ2ZSBzcGFjZSBmb3IgdGhlIGZsb2F0aW5nIGxhYmVsLlxuICAkaW5maXgtbWFyZ2luLXRvcDogMWVtICogJGxpbmUtaGVpZ2h0ICogJHN1YnNjcmlwdC1mb250LXNjYWxlO1xuICAvLyBUaGUgc3BhY2UgYmV0d2VlbiB0aGUgYm90dG9tIG9mIHRoZSAubWF0LWZvcm0tZmllbGQtZmxleCBhcmVhIGFuZCB0aGUgc3Vic2NyaXB0IHdyYXBwZXIuXG4gIC8vIE1vY2tzIHNob3cgaGFsZiBvZiB0aGUgdGV4dCBzaXplLCBidXQgdGhpcyBtYXJnaW4gaXMgYXBwbGllZCB0byBhbiBlbGVtZW50IHdpdGggdGhlIHN1YnNjcmlwdFxuICAvLyB0ZXh0IGZvbnQgc2l6ZSwgc28gd2UgbmVlZCB0byBkaXZpZGUgYnkgdGhlIHNjYWxlIGZhY3RvciB0byBtYWtlIGl0IGhhbGYgb2YgdGhlIG9yaWdpbmFsIHRleHRcbiAgLy8gc2l6ZS5cbiAgJHN1YnNjcmlwdC1tYXJnaW4tdG9wOiAwLjVlbSAvICRzdWJzY3JpcHQtZm9udC1zY2FsZTtcbiAgLy8gVGhlIHBhZGRpbmcgYXBwbGllZCB0byB0aGUgZm9ybS1maWVsZC13cmFwcGVyIHRvIHJlc2VydmUgc3BhY2UgZm9yIHRoZSBzdWJzY3JpcHQsIHNpbmNlIGl0J3NcbiAgLy8gYWJzb2x1dGVseSBwb3NpdGlvbmVkLiBUaGlzIGlzIGEgY29tYmluYXRpb24gb2YgdGhlIHN1YnNjcmlwdCdzIG1hcmdpbiBhbmQgbGluZS1oZWlnaHQsIGJ1dCB3ZVxuICAvLyBuZWVkIHRvIG11bHRpcGx5IGJ5IHRoZSBzdWJzY3JpcHQgZm9udCBzY2FsZSBmYWN0b3Igc2luY2UgdGhlIHdyYXBwZXIgaGFzIGEgbGFyZ2VyIGZvbnQgc2l6ZS5cbiAgJHdyYXBwZXItcGFkZGluZy1ib3R0b206ICgkc3Vic2NyaXB0LW1hcmdpbi10b3AgKyAkbGluZS1oZWlnaHQpICogJHN1YnNjcmlwdC1mb250LXNjYWxlO1xuICAvLyBUaGUgYW1vdW50IHdlIG9mZnNldCB0aGUgbGFiZWwgZnJvbSB0aGUgaW5wdXQgdGV4dCBpbiB0aGUgb3V0bGluZSBhcHBlYXJhbmNlLlxuICAkb3V0bGluZS1hcHBlYXJhbmNlLWxhYmVsLW9mZnNldDogLTAuMjVlbTtcblxuICAubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1vdXRsaW5lIHtcbiAgICAubWF0LWZvcm0tZmllbGQtaW5maXgge1xuICAgICAgcGFkZGluZzogJGluZml4LXBhZGRpbmcgMCAkaW5maXgtcGFkZGluZyAwO1xuICAgIH1cblxuICAgIC5tYXQtZm9ybS1maWVsZC1sYWJlbCB7XG4gICAgICB0b3A6ICRpbmZpeC1tYXJnaW4tdG9wICsgJGluZml4LXBhZGRpbmc7XG4gICAgICBtYXJnaW4tdG9wOiAkb3V0bGluZS1hcHBlYXJhbmNlLWxhYmVsLW9mZnNldDtcbiAgICB9XG5cbiAgICAmLm1hdC1mb3JtLWZpZWxkLWNhbi1mbG9hdCB7XG4gICAgICAmLm1hdC1mb3JtLWZpZWxkLXNob3VsZC1mbG9hdCAubWF0LWZvcm0tZmllbGQtbGFiZWwsXG4gICAgICAubWF0LWlucHV0LXNlcnZlcjpmb2N1cyArIC5tYXQtZm9ybS1maWVsZC1sYWJlbC13cmFwcGVyIC5tYXQtZm9ybS1maWVsZC1sYWJlbCB7XG4gICAgICAgIEBpbmNsdWRlIF9tYXQtZm9ybS1maWVsZC1vdXRsaW5lLWxhYmVsLWZsb2F0aW5nKFxuICAgICAgICAgICAgICAgICRzdWJzY3JpcHQtZm9udC1zY2FsZSwgJGluZml4LXBhZGRpbmcgKyAkb3V0bGluZS1hcHBlYXJhbmNlLWxhYmVsLW9mZnNldCxcbiAgICAgICAgICAgICAgICAkaW5maXgtbWFyZ2luLXRvcCk7XG4gICAgICB9XG5cbiAgICAgIC8vIFNlcnZlci1zaWRlIHJlbmRlcmVkIG1hdElucHV0IHdpdGggYSBsYWJlbCBhdHRyaWJ1dGUgYnV0IGxhYmVsIG5vdCBzaG93blxuICAgICAgLy8gKHVzZWQgYXMgYSBwdXJlIENTUyBzdGFuZC1pbiBmb3IgbWF0LWZvcm0tZmllbGQtc2hvdWxkLWZsb2F0KS5cbiAgICAgIC5tYXQtaW5wdXQtc2VydmVyW2xhYmVsXTpub3QoOmxhYmVsLXNob3duKSArIC5tYXQtZm9ybS1maWVsZC1sYWJlbC13cmFwcGVyXG4gICAgICAubWF0LWZvcm0tZmllbGQtbGFiZWwge1xuICAgICAgICBAaW5jbHVkZSBfbWF0LWZvcm0tZmllbGQtb3V0bGluZS1sYWJlbC1mbG9hdGluZyhcbiAgICAgICAgICAgICAgICAkc3Vic2NyaXB0LWZvbnQtc2NhbGUsICRpbmZpeC1wYWRkaW5nICsgJG91dGxpbmUtYXBwZWFyYW5jZS1sYWJlbC1vZmZzZXQsXG4gICAgICAgICAgICAgICAgJGluZml4LW1hcmdpbi10b3ApO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5cblxuXG5cblxuXG4vLyBUaGVtZSBzdHlsZXMgdGhhdCBvbmx5IGFwcGx5IHRvIHRoZSBzdGFuZGFyZCBhcHBlYXJhbmNlIG9mIHRoZSBmb3JtLWZpZWxkLlxuXG5AbWl4aW4gbWF0LWZvcm0tZmllbGQtc3RhbmRhcmQtdGhlbWUoJHRoZW1lKSB7XG4gICRmb3JlZ3JvdW5kOiBtYXAtZ2V0KCR0aGVtZSwgZm9yZWdyb3VuZCk7XG4gICRpcy1kYXJrLXRoZW1lOiBtYXAtZ2V0KCR0aGVtZSwgaXMtZGFyayk7XG5cbiAgJHVuZGVybGluZS1jb2xvcjogbWF0LWNvbG9yKCRmb3JlZ3JvdW5kLCBkaXZpZGVyLCBpZigkaXMtZGFyay10aGVtZSwgMC43LCAwLjQyKSk7XG5cbiAgLm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2Utc3RhbmRhcmQge1xuICAgIC5tYXQtZm9ybS1maWVsZC11bmRlcmxpbmUge1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogJHVuZGVybGluZS1jb2xvcjtcbiAgICB9XG5cbiAgICAmLm1hdC1mb3JtLWZpZWxkLWRpc2FibGVkIC5tYXQtZm9ybS1maWVsZC11bmRlcmxpbmUge1xuICAgICAgQGluY2x1ZGUgbWF0LWNvbnRyb2wtZGlzYWJsZWQtdW5kZXJsaW5lKCR1bmRlcmxpbmUtY29sb3IpO1xuICAgIH1cbiAgfVxufVxuXG5AbWl4aW4gbWF0LWZvcm0tZmllbGQtc3RhbmRhcmQtdHlwb2dyYXBoeSgkY29uZmlnKSB7fVxuXG5cbi8vIFRoZW1lIHN0eWxlcyB0aGF0IGFwcGx5IHRvIGFsbCBhcHBlYXJhbmNlcyBvZiB0aGUgZm9ybS1maWVsZC5cbkBtaXhpbiBtYXQtZm9ybS1maWVsZC10aGVtZSgkdGhlbWUpIHtcbiAgJHByaW1hcnk6IG1hcC1nZXQoJHRoZW1lLCBwcmltYXJ5KTtcbiAgJGFjY2VudDogbWFwLWdldCgkdGhlbWUsIGFjY2VudCk7XG4gICR3YXJuOiBtYXAtZ2V0KCR0aGVtZSwgd2Fybik7XG4gICRiYWNrZ3JvdW5kOiBtYXAtZ2V0KCR0aGVtZSwgYmFja2dyb3VuZCk7XG4gICRmb3JlZ3JvdW5kOiBtYXAtZ2V0KCR0aGVtZSwgZm9yZWdyb3VuZCk7XG4gICRpcy1kYXJrLXRoZW1lOiBtYXAtZ2V0KCR0aGVtZSwgaXMtZGFyayk7XG5cbiAgLy8gTGFiZWwgY29sb3JzLiBSZXF1aXJlZCBpcyB1c2VkIGZvciB0aGUgYCpgIHN0YXIgc2hvd24gaW4gdGhlIGxhYmVsLlxuICAkbGFiZWwtY29sb3I6IG1hdC1jb2xvcigkZm9yZWdyb3VuZCwgc2Vjb25kYXJ5LXRleHQsIGlmKCRpcy1kYXJrLXRoZW1lLCAwLjcsIDAuNikpO1xuICAkZm9jdXNlZC1sYWJlbC1jb2xvcjogbWF0LWNvbG9yKCRwcmltYXJ5KTtcbiAgJHJlcXVpcmVkLWxhYmVsLWNvbG9yOiBtYXQtY29sb3IoJGFjY2VudCk7XG5cbiAgLy8gVW5kZXJsaW5lIGNvbG9ycy5cbiAgJHVuZGVybGluZS1jb2xvci1iYXNlOiBtYXQtY29sb3IoJGZvcmVncm91bmQsIGRpdmlkZXIsIGlmKCRpcy1kYXJrLXRoZW1lLCAxLCAwLjg3KSk7XG4gICR1bmRlcmxpbmUtY29sb3ItYWNjZW50OiBtYXQtY29sb3IoJGFjY2VudCk7XG4gICR1bmRlcmxpbmUtY29sb3Itd2FybjogbWF0LWNvbG9yKCR3YXJuKTtcbiAgJHVuZGVybGluZS1mb2N1c2VkLWNvbG9yOiBtYXQtY29sb3IoJHByaW1hcnkpO1xuXG4gIC5tYXQtZm9ybS1maWVsZC1sYWJlbCB7XG4gICAgY29sb3I6ICRsYWJlbC1jb2xvcjtcbiAgfVxuXG4gIC5tYXQtaGludCB7XG4gICAgY29sb3I6ICRsYWJlbC1jb2xvcjtcbiAgfVxuXG4gIC5tYXQtZm9ybS1maWVsZC5tYXQtZm9jdXNlZCAubWF0LWZvcm0tZmllbGQtbGFiZWwge1xuICAgIGNvbG9yOiAkZm9jdXNlZC1sYWJlbC1jb2xvcjtcblxuICAgICYubWF0LWFjY2VudCB7XG4gICAgICBjb2xvcjogJHVuZGVybGluZS1jb2xvci1hY2NlbnQ7XG4gICAgfVxuXG4gICAgJi5tYXQtd2FybiB7XG4gICAgICBjb2xvcjogJHVuZGVybGluZS1jb2xvci13YXJuO1xuICAgIH1cbiAgfVxuXG4gIC5tYXQtZm9jdXNlZCAubWF0LWZvcm0tZmllbGQtcmVxdWlyZWQtbWFya2VyIHtcbiAgICBjb2xvcjogJHJlcXVpcmVkLWxhYmVsLWNvbG9yO1xuICB9XG5cbiAgLm1hdC1mb3JtLWZpZWxkLXJpcHBsZSB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogJHVuZGVybGluZS1jb2xvci1iYXNlO1xuICB9XG5cbiAgLm1hdC1mb3JtLWZpZWxkLm1hdC1mb2N1c2VkIHtcbiAgICAubWF0LWZvcm0tZmllbGQtcmlwcGxlIHtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICR1bmRlcmxpbmUtZm9jdXNlZC1jb2xvcjtcblxuICAgICAgJi5tYXQtYWNjZW50IHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJHVuZGVybGluZS1jb2xvci1hY2NlbnQ7XG4gICAgICB9XG5cbiAgICAgICYubWF0LXdhcm4ge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkdW5kZXJsaW5lLWNvbG9yLXdhcm47XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLm1hdC1mb3JtLWZpZWxkLXR5cGUtbWF0LW5hdGl2ZS1zZWxlY3QubWF0LWZvY3VzZWQ6bm90KC5tYXQtZm9ybS1maWVsZC1pbnZhbGlkKSB7XG4gICAgLm1hdC1mb3JtLWZpZWxkLWluZml4OjphZnRlciB7XG4gICAgICBjb2xvcjogJHVuZGVybGluZS1mb2N1c2VkLWNvbG9yO1xuICAgIH1cblxuICAgICYubWF0LWFjY2VudCAubWF0LWZvcm0tZmllbGQtaW5maXg6OmFmdGVyIHtcbiAgICAgIGNvbG9yOiAkdW5kZXJsaW5lLWNvbG9yLWFjY2VudDtcbiAgICB9XG5cbiAgICAmLm1hdC13YXJuIC5tYXQtZm9ybS1maWVsZC1pbmZpeDo6YWZ0ZXIge1xuICAgICAgY29sb3I6ICR1bmRlcmxpbmUtY29sb3Itd2FybjtcbiAgICB9XG4gIH1cblxuICAvLyBTdHlsaW5nIGZvciB0aGUgZXJyb3Igc3RhdGUgb2YgdGhlIGZvcm0gZmllbGQuIE5vdGUgdGhhdCB3aGlsZSB0aGUgc2FtZSBjYW4gYmVcbiAgLy8gYWNoaWV2ZWQgd2l0aCB0aGUgbmctKiBjbGFzc2VzLCB3ZSB1c2UgdGhpcyBhcHByb2FjaCBpbiBvcmRlciB0byBlbnN1cmUgdGhhdCB0aGUgc2FtZVxuICAvLyBsb2dpYyBpcyB1c2VkIHRvIHN0eWxlIHRoZSBlcnJvciBzdGF0ZSBhbmQgdG8gc2hvdyB0aGUgZXJyb3IgbWVzc2FnZXMuXG4gIC5tYXQtZm9ybS1maWVsZC5tYXQtZm9ybS1maWVsZC1pbnZhbGlkIHtcbiAgICAubWF0LWZvcm0tZmllbGQtbGFiZWwge1xuICAgICAgY29sb3I6ICR1bmRlcmxpbmUtY29sb3Itd2FybjtcblxuICAgICAgJi5tYXQtYWNjZW50LFxuICAgICAgLm1hdC1mb3JtLWZpZWxkLXJlcXVpcmVkLW1hcmtlciB7XG4gICAgICAgIGNvbG9yOiAkdW5kZXJsaW5lLWNvbG9yLXdhcm47XG4gICAgICB9XG4gICAgfVxuXG4gICAgLm1hdC1mb3JtLWZpZWxkLXJpcHBsZSxcbiAgICAubWF0LWZvcm0tZmllbGQtcmlwcGxlLm1hdC1hY2NlbnQge1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogJHVuZGVybGluZS1jb2xvci13YXJuO1xuICAgIH1cbiAgfVxuXG4gIC5tYXQtZXJyb3Ige1xuICAgIGNvbG9yOiAkdW5kZXJsaW5lLWNvbG9yLXdhcm47XG4gIH1cblxuICBAaW5jbHVkZSBtYXQtZm9ybS1maWVsZC1sZWdhY3ktdGhlbWUoJHRoZW1lKTtcbiAgQGluY2x1ZGUgbWF0LWZvcm0tZmllbGQtc3RhbmRhcmQtdGhlbWUoJHRoZW1lKTtcbiAgQGluY2x1ZGUgbWF0LWZvcm0tZmllbGQtZmlsbC10aGVtZSgkdGhlbWUpO1xuICBAaW5jbHVkZSBtYXQtZm9ybS1maWVsZC1vdXRsaW5lLXRoZW1lKCR0aGVtZSk7XG59XG5cbi8vIFVzZWQgdG8gbWFrZSBpbnN0YW5jZXMgb2YgdGhlIF9tYXQtZm9ybS1maWVsZC1sYWJlbC1mbG9hdGluZyBtaXhpbiBuZWdsaWdpYmx5IGRpZmZlcmVudCxcbi8vIGFuZCBwcmV2ZW50IEdvb2dsZSdzIENTUyBPcHRpbWl6ZXIgZnJvbSBjb2xsYXBzaW5nIHRoZSBkZWNsYXJhdGlvbnMuIFRoaXMgaXMgbmVlZGVkIGJlY2F1c2Ugc29tZVxuLy8gb2YgdGhlIHNlbGVjdG9ycyBjb250YWluIHBzZXVkby1jbGFzc2VzIG5vdCByZWNvZ25pemVkIGluIGFsbCBicm93c2Vycy4gSWYgYSBicm93c2VyIGVuY291bnRlcnNcbi8vIGFuIHVua25vd24gcHNldWRvLWNsYXNzIGl0IHdpbGwgZGlzY2FyZCB0aGUgZW50aXJlIHJ1bGUgc2V0LlxuJG1hdC1mb3JtLWZpZWxkLWRlZHVwZTogMDtcblxuLy8gQXBwbGllcyBhIGZsb2F0aW5nIGxhYmVsIGFib3ZlIHRoZSBmb3JtIGZpZWxkIGNvbnRyb2wgaXRzZWxmLlxuQG1peGluIF9tYXQtZm9ybS1maWVsZC1sYWJlbC1mbG9hdGluZygkZm9udC1zY2FsZSwgJGluZml4LXBhZGRpbmcsICRpbmZpeC1tYXJnaW4tdG9wKSB7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtJGluZml4LW1hcmdpbi10b3AgLSAkaW5maXgtcGFkZGluZyArICRtYXQtZm9ybS1maWVsZC1kZWR1cGUpXG4gICAgICAgICAgICAgc2NhbGUoJGZvbnQtc2NhbGUpO1xuICB3aWR0aDogMTAwJSAvICRmb250LXNjYWxlICsgJG1hdC1mb3JtLWZpZWxkLWRlZHVwZTtcblxuICAkbWF0LWZvcm0tZmllbGQtZGVkdXBlOiAkbWF0LWZvcm0tZmllbGQtZGVkdXBlICsgMC4wMDAwMSAhZ2xvYmFsO1xufVxuXG5AbWl4aW4gbWF0LWZvcm0tZmllbGQtdHlwb2dyYXBoeSgkY29uZmlnKSB7XG4gIC8vIFRoZSB1bml0LWxlc3MgbGluZS1oZWlnaHQgZnJvbSB0aGUgZm9udCBjb25maWcuXG4gICRsaW5lLWhlaWdodDogbWF0LWxpbmUtaGVpZ2h0KCRjb25maWcsIGlucHV0KTtcblxuICAvLyBUaGUgYW1vdW50IHRvIHNjYWxlIHRoZSBmb250IGZvciB0aGUgZmxvYXRpbmcgbGFiZWwgYW5kIHN1YnNjcmlwdC5cbiAgJHN1YnNjcmlwdC1mb250LXNjYWxlOiAwLjc1O1xuICAvLyBUaGUgYW1vdW50IHRvIHNjYWxlIHRoZSBmb250IGZvciB0aGUgcHJlZml4IGFuZCBzdWZmaXggaWNvbnMuXG4gICRwcmVmaXgtc3VmZml4LWljb24tZm9udC1zY2FsZTogMS41O1xuXG4gIC8vIFRoZSBwYWRkaW5nIG9uIHRoZSBpbmZpeC4gTW9ja3Mgc2hvdyBoYWxmIG9mIHRoZSB0ZXh0IHNpemUuXG4gICRpbmZpeC1wYWRkaW5nOiAwLjVlbTtcbiAgLy8gVGhlIG1hcmdpbiBhcHBsaWVkIHRvIHRoZSBmb3JtLWZpZWxkLWluZml4IHRvIHJlc2VydmUgc3BhY2UgZm9yIHRoZSBmbG9hdGluZyBsYWJlbC5cbiAgJGluZml4LW1hcmdpbi10b3A6IDFlbSAqICRsaW5lLWhlaWdodCAqICRzdWJzY3JpcHQtZm9udC1zY2FsZTtcbiAgLy8gRm9udCBzaXplIHRvIHVzZSBmb3IgdGhlIGxhYmVsIGFuZCBzdWJzY3JpcHQgdGV4dC5cbiAgJHN1YnNjcmlwdC1mb250LXNpemU6ICRzdWJzY3JpcHQtZm9udC1zY2FsZSAqIDEwMCU7XG4gIC8vIEZvbnQgc2l6ZSB0byB1c2UgZm9yIHRoZSBmb3IgdGhlIHByZWZpeCBhbmQgc3VmZml4IGljb25zLlxuICAkcHJlZml4LXN1ZmZpeC1pY29uLWZvbnQtc2l6ZTogJHByZWZpeC1zdWZmaXgtaWNvbi1mb250LXNjYWxlICogMTAwJTtcbiAgLy8gVGhlIHNwYWNlIGJldHdlZW4gdGhlIGJvdHRvbSBvZiB0aGUgLm1hdC1mb3JtLWZpZWxkLWZsZXggYXJlYSBhbmQgdGhlIHN1YnNjcmlwdCB3cmFwcGVyLlxuICAvLyBNb2NrcyBzaG93IGhhbGYgb2YgdGhlIHRleHQgc2l6ZSwgYnV0IHRoaXMgbWFyZ2luIGlzIGFwcGxpZWQgdG8gYW4gZWxlbWVudCB3aXRoIHRoZSBzdWJzY3JpcHRcbiAgLy8gdGV4dCBmb250IHNpemUsIHNvIHdlIG5lZWQgdG8gZGl2aWRlIGJ5IHRoZSBzY2FsZSBmYWN0b3IgdG8gbWFrZSBpdCBoYWxmIG9mIHRoZSBvcmlnaW5hbCB0ZXh0XG4gIC8vIHNpemUuXG4gICRzdWJzY3JpcHQtbWFyZ2luLXRvcDogMC41ZW0gLyAkc3Vic2NyaXB0LWZvbnQtc2NhbGU7XG4gIC8vIFRoZSBwYWRkaW5nIGFwcGxpZWQgdG8gdGhlIGZvcm0tZmllbGQtd3JhcHBlciB0byByZXNlcnZlIHNwYWNlIGZvciB0aGUgc3Vic2NyaXB0LCBzaW5jZSBpdCdzXG4gIC8vIGFic29sdXRlbHkgcG9zaXRpb25lZC4gVGhpcyBpcyBhIGNvbWJpbmF0aW9uIG9mIHRoZSBzdWJzY3JpcHQncyBtYXJnaW4gYW5kIGxpbmUtaGVpZ2h0LCBidXQgd2VcbiAgLy8gbmVlZCB0byBtdWx0aXBseSBieSB0aGUgc3Vic2NyaXB0IGZvbnQgc2NhbGUgZmFjdG9yIHNpbmNlIHRoZSB3cmFwcGVyIGhhcyBhIGxhcmdlciBmb250IHNpemUuXG4gICR3cmFwcGVyLXBhZGRpbmctYm90dG9tOiAoJHN1YnNjcmlwdC1tYXJnaW4tdG9wICsgJGxpbmUtaGVpZ2h0KSAqICRzdWJzY3JpcHQtZm9udC1zY2FsZTtcblxuICAubWF0LWZvcm0tZmllbGQge1xuICAgIEBpbmNsdWRlIG1hdC10eXBvZ3JhcGh5LWxldmVsLXRvLXN0eWxlcygkY29uZmlnLCBpbnB1dCk7XG4gIH1cblxuICAubWF0LWZvcm0tZmllbGQtd3JhcHBlciB7XG4gICAgcGFkZGluZy1ib3R0b206ICR3cmFwcGVyLXBhZGRpbmctYm90dG9tO1xuICB9XG5cbiAgLm1hdC1mb3JtLWZpZWxkLXByZWZpeCxcbiAgLm1hdC1mb3JtLWZpZWxkLXN1ZmZpeCB7XG4gICAgLy8gQWxsb3cgaWNvbnMgaW4gYSBwcmVmaXggb3Igc3VmZml4IHRvIGFkYXB0IHRvIHRoZSBjb3JyZWN0IHNpemUuXG4gICAgLm1hdC1pY29uIHtcbiAgICAgIGZvbnQtc2l6ZTogJHByZWZpeC1zdWZmaXgtaWNvbi1mb250LXNpemU7XG4gICAgICBsaW5lLWhlaWdodDogJGxpbmUtaGVpZ2h0O1xuICAgIH1cblxuICAgIC8vIEFsbG93IGljb24gYnV0dG9ucyBpbiBhIHByZWZpeCBvciBzdWZmaXggdG8gYWRhcHQgdG8gdGhlIGNvcnJlY3Qgc2l6ZS5cbiAgICAubWF0LWljb24tYnV0dG9uIHtcbiAgICAgIGhlaWdodDogJHByZWZpeC1zdWZmaXgtaWNvbi1mb250LXNjYWxlICogMWVtO1xuICAgICAgd2lkdGg6ICRwcmVmaXgtc3VmZml4LWljb24tZm9udC1zY2FsZSAqIDFlbTtcblxuICAgICAgLm1hdC1pY29uIHtcbiAgICAgICAgaGVpZ2h0OiAkbGluZS1oZWlnaHQgKiAxZW07XG4gICAgICAgIGxpbmUtaGVpZ2h0OiAkbGluZS1oZWlnaHQ7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLm1hdC1mb3JtLWZpZWxkLWluZml4IHtcbiAgICBwYWRkaW5nOiAkaW5maXgtcGFkZGluZyAwO1xuICAgIC8vIFRocm93cyBvZmYgdGhlIGJhc2VsaW5lIGlmIHdlIGRvIGl0IGFzIGEgcmVhbCBtYXJnaW4sIHNvIHdlIGRvIGl0IGFzIGEgYm9yZGVyIGluc3RlYWQuXG4gICAgYm9yZGVyLXRvcDogJGluZml4LW1hcmdpbi10b3Agc29saWQgdHJhbnNwYXJlbnQ7XG4gIH1cblxuICAubWF0LWZvcm0tZmllbGQtY2FuLWZsb2F0IHtcbiAgICAmLm1hdC1mb3JtLWZpZWxkLXNob3VsZC1mbG9hdCAubWF0LWZvcm0tZmllbGQtbGFiZWwsXG4gICAgLm1hdC1pbnB1dC1zZXJ2ZXI6Zm9jdXMgKyAubWF0LWZvcm0tZmllbGQtbGFiZWwtd3JhcHBlciAubWF0LWZvcm0tZmllbGQtbGFiZWwge1xuICAgICAgQGluY2x1ZGUgX21hdC1mb3JtLWZpZWxkLWxhYmVsLWZsb2F0aW5nKFxuICAgICAgICAgICAgICAkc3Vic2NyaXB0LWZvbnQtc2NhbGUsICRpbmZpeC1wYWRkaW5nLCAkaW5maXgtbWFyZ2luLXRvcCk7XG4gICAgfVxuXG4gICAgLy8gU2VydmVyLXNpZGUgcmVuZGVyZWQgbWF0SW5wdXQgd2l0aCBhIGxhYmVsIGF0dHJpYnV0ZSBidXQgbGFiZWwgbm90IHNob3duXG4gICAgLy8gKHVzZWQgYXMgYSBwdXJlIENTUyBzdGFuZC1pbiBmb3IgbWF0LWZvcm0tZmllbGQtc2hvdWxkLWZsb2F0KS5cbiAgICAubWF0LWlucHV0LXNlcnZlcltsYWJlbF06bm90KDpsYWJlbC1zaG93bikgKyAubWF0LWZvcm0tZmllbGQtbGFiZWwtd3JhcHBlclxuICAgICAgICAubWF0LWZvcm0tZmllbGQtbGFiZWwge1xuICAgICAgQGluY2x1ZGUgX21hdC1mb3JtLWZpZWxkLWxhYmVsLWZsb2F0aW5nKFxuICAgICAgICAgICAgICAkc3Vic2NyaXB0LWZvbnQtc2NhbGUsICRpbmZpeC1wYWRkaW5nLCAkaW5maXgtbWFyZ2luLXRvcCk7XG4gICAgfVxuICB9XG5cbiAgLm1hdC1mb3JtLWZpZWxkLWxhYmVsLXdyYXBwZXIge1xuICAgIHRvcDogLSRpbmZpeC1tYXJnaW4tdG9wO1xuICAgIHBhZGRpbmctdG9wOiAkaW5maXgtbWFyZ2luLXRvcDtcbiAgfVxuXG4gIC5tYXQtZm9ybS1maWVsZC1sYWJlbCB7XG4gICAgdG9wOiAkaW5maXgtbWFyZ2luLXRvcCArICRpbmZpeC1wYWRkaW5nO1xuICB9XG5cbiAgLm1hdC1mb3JtLWZpZWxkLXVuZGVybGluZSB7XG4gICAgLy8gV2Ugd2FudCB0aGUgdW5kZXJsaW5lIHRvIHN0YXJ0IGF0IHRoZSBlbmQgb2YgdGhlIGNvbnRlbnQgYm94LCBub3QgdGhlIHBhZGRpbmcgYm94LFxuICAgIC8vIHNvIHdlIG1vdmUgaXQgdXAgYnkgdGhlIHBhZGRpbmcgYW1vdW50LlxuICAgIGJvdHRvbTogJHdyYXBwZXItcGFkZGluZy1ib3R0b207XG4gIH1cblxuICAubWF0LWZvcm0tZmllbGQtc3Vic2NyaXB0LXdyYXBwZXIge1xuICAgIGZvbnQtc2l6ZTogJHN1YnNjcmlwdC1mb250LXNpemU7XG4gICAgbWFyZ2luLXRvcDogJHN1YnNjcmlwdC1tYXJnaW4tdG9wO1xuXG4gICAgLy8gV2Ugd2FudCB0aGUgc3Vic2NyaXB0IHRvIHN0YXJ0IGF0IHRoZSBlbmQgb2YgdGhlIGNvbnRlbnQgYm94LCBub3QgdGhlIHBhZGRpbmcgYm94LFxuICAgIC8vIHNvIHdlIG1vdmUgaXQgdXAgYnkgdGhlIHBhZGRpbmcgYW1vdW50IChhZGp1c3RlZCBmb3IgdGhlIHNtYWxsZXIgZm9udCBzaXplKTtcbiAgICB0b3A6IGNhbGMoMTAwJSAtICN7JHdyYXBwZXItcGFkZGluZy1ib3R0b20gLyAkc3Vic2NyaXB0LWZvbnQtc2NhbGV9KTtcbiAgfVxuXG4gIEBpbmNsdWRlIG1hdC1mb3JtLWZpZWxkLWxlZ2FjeS10eXBvZ3JhcGh5KCRjb25maWcpO1xuICBAaW5jbHVkZSBtYXQtZm9ybS1maWVsZC1zdGFuZGFyZC10eXBvZ3JhcGh5KCRjb25maWcpO1xuICBAaW5jbHVkZSBtYXQtZm9ybS1maWVsZC1maWxsLXR5cG9ncmFwaHkoJGNvbmZpZyk7XG4gIEBpbmNsdWRlIG1hdC1mb3JtLWZpZWxkLW91dGxpbmUtdHlwb2dyYXBoeSgkY29uZmlnKTtcbn1cblxuXG5cblxuXG5AbWl4aW4gbWF0LXRyZWUtdGhlbWUoJHRoZW1lKSB7XG4gICRiYWNrZ3JvdW5kOiBtYXAtZ2V0KCR0aGVtZSwgYmFja2dyb3VuZCk7XG4gICRmb3JlZ3JvdW5kOiBtYXAtZ2V0KCR0aGVtZSwgZm9yZWdyb3VuZCk7XG5cbiAgLm1hdC10cmVlIHtcbiAgICBiYWNrZ3JvdW5kOiBtYXQtY29sb3IoJGJhY2tncm91bmQsICdjYXJkJyk7XG4gIH1cblxuICAubWF0LXRyZWUtbm9kZSxcbiAgLm1hdC1uZXN0ZWQtdHJlZS1ub2RlIHtcbiAgICBjb2xvcjogbWF0LWNvbG9yKCRmb3JlZ3JvdW5kLCB0ZXh0KTtcbiAgfVxufVxuXG5AbWl4aW4gbWF0LXRyZWUtdHlwb2dyYXBoeSgkY29uZmlnKSB7XG4gIC5tYXQtdHJlZSB7XG4gICAgZm9udC1mYW1pbHk6IG1hdC1mb250LWZhbWlseSgkY29uZmlnKTtcbiAgfVxuXG4gIC5tYXQtdHJlZS1ub2RlLFxuICAubWF0LW5lc3RlZC10cmVlLW5vZGUge1xuICAgIGZvbnQtd2VpZ2h0OiBtYXQtZm9udC13ZWlnaHQoJGNvbmZpZywgYm9keS0xKTtcbiAgICBmb250LXNpemU6IG1hdC1mb250LXNpemUoJGNvbmZpZywgYm9keS0xKTtcbiAgfVxufVxuXG5cblxuLy8gSW5jbHVkZXMgYWxsIG9mIHRoZSB0eXBvZ3JhcGhpYyBzdHlsZXMuXG5AbWl4aW4gYW5ndWxhci1tYXRlcmlhbC10eXBvZ3JhcGh5KCRjb25maWc6IG51bGwpIHtcbiAgQGlmICRjb25maWcgPT0gbnVsbCB7XG4gICAgJGNvbmZpZzogbWF0LXR5cG9ncmFwaHktY29uZmlnKCk7XG4gIH1cblxuICBAaW5jbHVkZSBtYXQtYmFkZ2UtdHlwb2dyYXBoeSgkY29uZmlnKTtcbiAgQGluY2x1ZGUgbWF0LWJhc2UtdHlwb2dyYXBoeSgkY29uZmlnKTtcbiAgQGluY2x1ZGUgbWF0LWF1dG9jb21wbGV0ZS10eXBvZ3JhcGh5KCRjb25maWcpO1xuICBAaW5jbHVkZSBtYXQtYm90dG9tLXNoZWV0LXR5cG9ncmFwaHkoJGNvbmZpZyk7XG4gIEBpbmNsdWRlIG1hdC1idXR0b24tdHlwb2dyYXBoeSgkY29uZmlnKTtcbiAgQGluY2x1ZGUgbWF0LWJ1dHRvbi10b2dnbGUtdHlwb2dyYXBoeSgkY29uZmlnKTtcbiAgQGluY2x1ZGUgbWF0LWNhcmQtdHlwb2dyYXBoeSgkY29uZmlnKTtcbiAgQGluY2x1ZGUgbWF0LWNoZWNrYm94LXR5cG9ncmFwaHkoJGNvbmZpZyk7XG4gIEBpbmNsdWRlIG1hdC1jaGlwcy10eXBvZ3JhcGh5KCRjb25maWcpO1xuICBAaW5jbHVkZSBtYXQtdGFibGUtdHlwb2dyYXBoeSgkY29uZmlnKTtcbiAgQGluY2x1ZGUgbWF0LWRhdGVwaWNrZXItdHlwb2dyYXBoeSgkY29uZmlnKTtcbiAgQGluY2x1ZGUgbWF0LWRpYWxvZy10eXBvZ3JhcGh5KCRjb25maWcpO1xuICBAaW5jbHVkZSBtYXQtZXhwYW5zaW9uLXBhbmVsLXR5cG9ncmFwaHkoJGNvbmZpZyk7XG4gIEBpbmNsdWRlIG1hdC1mb3JtLWZpZWxkLXR5cG9ncmFwaHkoJGNvbmZpZyk7XG4gIEBpbmNsdWRlIG1hdC1ncmlkLWxpc3QtdHlwb2dyYXBoeSgkY29uZmlnKTtcbiAgQGluY2x1ZGUgbWF0LWljb24tdHlwb2dyYXBoeSgkY29uZmlnKTtcbiAgQGluY2x1ZGUgbWF0LWlucHV0LXR5cG9ncmFwaHkoJGNvbmZpZyk7XG4gIEBpbmNsdWRlIG1hdC1tZW51LXR5cG9ncmFwaHkoJGNvbmZpZyk7XG4gIEBpbmNsdWRlIG1hdC1wYWdpbmF0b3ItdHlwb2dyYXBoeSgkY29uZmlnKTtcbiAgQGluY2x1ZGUgbWF0LXByb2dyZXNzLWJhci10eXBvZ3JhcGh5KCRjb25maWcpO1xuICBAaW5jbHVkZSBtYXQtcHJvZ3Jlc3Mtc3Bpbm5lci10eXBvZ3JhcGh5KCRjb25maWcpO1xuICBAaW5jbHVkZSBtYXQtcmFkaW8tdHlwb2dyYXBoeSgkY29uZmlnKTtcbiAgQGluY2x1ZGUgbWF0LXNlbGVjdC10eXBvZ3JhcGh5KCRjb25maWcpO1xuICBAaW5jbHVkZSBtYXQtc2lkZW5hdi10eXBvZ3JhcGh5KCRjb25maWcpO1xuICBAaW5jbHVkZSBtYXQtc2xpZGUtdG9nZ2xlLXR5cG9ncmFwaHkoJGNvbmZpZyk7XG4gIEBpbmNsdWRlIG1hdC1zbGlkZXItdHlwb2dyYXBoeSgkY29uZmlnKTtcbiAgQGluY2x1ZGUgbWF0LXN0ZXBwZXItdHlwb2dyYXBoeSgkY29uZmlnKTtcbiAgQGluY2x1ZGUgbWF0LXNvcnQtdHlwb2dyYXBoeSgkY29uZmlnKTtcbiAgQGluY2x1ZGUgbWF0LXRhYnMtdHlwb2dyYXBoeSgkY29uZmlnKTtcbiAgQGluY2x1ZGUgbWF0LXRvb2xiYXItdHlwb2dyYXBoeSgkY29uZmlnKTtcbiAgQGluY2x1ZGUgbWF0LXRvb2x0aXAtdHlwb2dyYXBoeSgkY29uZmlnKTtcbiAgQGluY2x1ZGUgbWF0LWxpc3QtdHlwb2dyYXBoeSgkY29uZmlnKTtcbiAgQGluY2x1ZGUgbWF0LW9wdGlvbi10eXBvZ3JhcGh5KCRjb25maWcpO1xuICBAaW5jbHVkZSBtYXQtb3B0Z3JvdXAtdHlwb2dyYXBoeSgkY29uZmlnKTtcbiAgQGluY2x1ZGUgbWF0LXNuYWNrLWJhci10eXBvZ3JhcGh5KCRjb25maWcpO1xuICBAaW5jbHVkZSBtYXQtdHJlZS10eXBvZ3JhcGh5KCRjb25maWcpO1xufVxuXG5cbi8vIE1peGluIHRoYXQgcmVuZGVycyBhbGwgb2YgdGhlIGNvcmUgc3R5bGVzIHRoYXQgYXJlIG5vdCB0aGVtZS1kZXBlbmRlbnQuXG5AbWl4aW4gbWF0LWNvcmUoJHR5cG9ncmFwaHktY29uZmlnOiBudWxsKSB7XG4gIEBpbmNsdWRlIGFuZ3VsYXItbWF0ZXJpYWwtdHlwb2dyYXBoeSgkdHlwb2dyYXBoeS1jb25maWcpO1xuICBAaW5jbHVkZSBtYXQtcmlwcGxlKCk7XG4gIEBpbmNsdWRlIGNkay1hMTF5KCk7XG4gIEBpbmNsdWRlIGNkay1vdmVybGF5KCk7XG4gIEBpbmNsdWRlIGNkay10ZXh0LWZpZWxkKCk7XG59XG5cbi8vIE1peGluIHRoYXQgcmVuZGVycyBhbGwgb2YgdGhlIGNvcmUgc3R5bGVzIHRoYXQgZGVwZW5kIG9uIHRoZSB0aGVtZS5cbkBtaXhpbiBtYXQtY29yZS10aGVtZSgkdGhlbWUpIHtcbiAgQGluY2x1ZGUgbWF0LXJpcHBsZS10aGVtZSgkdGhlbWUpO1xuICBAaW5jbHVkZSBtYXQtb3B0aW9uLXRoZW1lKCR0aGVtZSk7XG4gIEBpbmNsdWRlIG1hdC1vcHRncm91cC10aGVtZSgkdGhlbWUpO1xuICBAaW5jbHVkZSBtYXQtcHNldWRvLWNoZWNrYm94LXRoZW1lKCR0aGVtZSk7XG5cbiAgLy8gUHJvdmlkZXMgZXh0ZXJuYWwgQ1NTIGNsYXNzZXMgZm9yIGVhY2ggZWxldmF0aW9uIHZhbHVlLiBFYWNoIENTUyBjbGFzcyBpcyBmb3JtYXR0ZWQgYXNcbiAgLy8gYG1hdC1lbGV2YXRpb24teiR6VmFsdWVgIHdoZXJlIGAkelZhbHVlYCBjb3JyZXNwb25kcyB0byB0aGUgei1zcGFjZSB0byB3aGljaCB0aGUgZWxlbWVudCBpc1xuICAvLyBlbGV2YXRlZC5cbiAgQGZvciAkelZhbHVlIGZyb20gMCB0aHJvdWdoIDI0IHtcbiAgICAuI3skX21hdC1lbGV2YXRpb24tcHJlZml4fSN7JHpWYWx1ZX0ge1xuICAgICAgQGluY2x1ZGUgX21hdC10aGVtZS1lbGV2YXRpb24oJHpWYWx1ZSwgJHRoZW1lKTtcbiAgICB9XG4gIH1cblxuICAvLyBXcmFwcGVyIGVsZW1lbnQgdGhhdCBwcm92aWRlcyB0aGUgdGhlbWUgYmFja2dyb3VuZCB3aGVuIHRoZSB1c2VyJ3MgY29udGVudCBpc24ndFxuICAvLyBpbnNpZGUgb2YgYSBgbWF0LXNpZGVuYXYtY29udGFpbmVyYC4gTm90ZSB0aGF0IHdlIG5lZWQgdG8gZXhjbHVkZSB0aGUgYW1wZXJzYW5kXG4gIC8vIHNlbGVjdG9yIGluIGNhc2UgdGhlIG1peGluIGlzIGluY2x1ZGVkIGF0IHRoZSB0b3AgbGV2ZWwuXG4gIC5tYXQtYXBwLWJhY2tncm91bmQje2lmKCYsICcsICYubWF0LWFwcC1iYWNrZ3JvdW5kJywgJycpfSB7XG4gICAgJGJhY2tncm91bmQ6IG1hcC1nZXQoJHRoZW1lLCBiYWNrZ3JvdW5kKTtcbiAgICAkZm9yZWdyb3VuZDogbWFwLWdldCgkdGhlbWUsIGZvcmVncm91bmQpO1xuXG4gICAgYmFja2dyb3VuZC1jb2xvcjogbWF0LWNvbG9yKCRiYWNrZ3JvdW5kLCBiYWNrZ3JvdW5kKTtcbiAgICBjb2xvcjogbWF0LWNvbG9yKCRmb3JlZ3JvdW5kLCB0ZXh0KTtcbiAgfVxuXG4gIC8vIE1hcmtlciB0aGF0IGlzIHVzZWQgdG8gZGV0ZXJtaW5lIHdoZXRoZXIgdGhlIHVzZXIgaGFzIGFkZGVkIGEgdGhlbWUgdG8gdGhlaXIgcGFnZS5cbiAgQGF0LXJvb3Qge1xuICAgIC5tYXQtdGhlbWUtbG9hZGVkLW1hcmtlciB7XG4gICAgICBkaXNwbGF5OiBub25lO1xuICAgIH1cbiAgfVxufVxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5AbWl4aW4gbWF0LWRpdmlkZXItdGhlbWUoJHRoZW1lKSB7XG4gICRmb3JlZ3JvdW5kOiBtYXAtZ2V0KCR0aGVtZSwgZm9yZWdyb3VuZCk7XG5cbiAgLm1hdC1kaXZpZGVyIHtcbiAgICBib3JkZXItdG9wLWNvbG9yOiBtYXQtY29sb3IoJGZvcmVncm91bmQsIGRpdmlkZXIpO1xuICB9XG5cbiAgLm1hdC1kaXZpZGVyLXZlcnRpY2FsIHtcbiAgICBib3JkZXItcmlnaHQtY29sb3I6IG1hdC1jb2xvcigkZm9yZWdyb3VuZCwgZGl2aWRlcik7XG4gIH1cbn1cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuLy8gQ3JlYXRlIGEgdGhlbWUuXG5AbWl4aW4gYW5ndWxhci1tYXRlcmlhbC10aGVtZSgkdGhlbWUpIHtcbiAgQGluY2x1ZGUgbWF0LWNvcmUtdGhlbWUoJHRoZW1lKTtcbiAgQGluY2x1ZGUgbWF0LWF1dG9jb21wbGV0ZS10aGVtZSgkdGhlbWUpO1xuICBAaW5jbHVkZSBtYXQtYmFkZ2UtdGhlbWUoJHRoZW1lKTtcbiAgQGluY2x1ZGUgbWF0LWJvdHRvbS1zaGVldC10aGVtZSgkdGhlbWUpO1xuICBAaW5jbHVkZSBtYXQtYnV0dG9uLXRoZW1lKCR0aGVtZSk7XG4gIEBpbmNsdWRlIG1hdC1idXR0b24tdG9nZ2xlLXRoZW1lKCR0aGVtZSk7XG4gIEBpbmNsdWRlIG1hdC1jYXJkLXRoZW1lKCR0aGVtZSk7XG4gIEBpbmNsdWRlIG1hdC1jaGVja2JveC10aGVtZSgkdGhlbWUpO1xuICBAaW5jbHVkZSBtYXQtY2hpcHMtdGhlbWUoJHRoZW1lKTtcbiAgQGluY2x1ZGUgbWF0LXRhYmxlLXRoZW1lKCR0aGVtZSk7XG4gIEBpbmNsdWRlIG1hdC1kYXRlcGlja2VyLXRoZW1lKCR0aGVtZSk7XG4gIEBpbmNsdWRlIG1hdC1kaWFsb2ctdGhlbWUoJHRoZW1lKTtcbiAgQGluY2x1ZGUgbWF0LWRpdmlkZXItdGhlbWUoJHRoZW1lKTtcbiAgQGluY2x1ZGUgbWF0LWV4cGFuc2lvbi1wYW5lbC10aGVtZSgkdGhlbWUpO1xuICBAaW5jbHVkZSBtYXQtZm9ybS1maWVsZC10aGVtZSgkdGhlbWUpO1xuICBAaW5jbHVkZSBtYXQtZ3JpZC1saXN0LXRoZW1lKCR0aGVtZSk7XG4gIEBpbmNsdWRlIG1hdC1pY29uLXRoZW1lKCR0aGVtZSk7XG4gIEBpbmNsdWRlIG1hdC1pbnB1dC10aGVtZSgkdGhlbWUpO1xuICBAaW5jbHVkZSBtYXQtbGlzdC10aGVtZSgkdGhlbWUpO1xuICBAaW5jbHVkZSBtYXQtbWVudS10aGVtZSgkdGhlbWUpO1xuICBAaW5jbHVkZSBtYXQtcGFnaW5hdG9yLXRoZW1lKCR0aGVtZSk7XG4gIEBpbmNsdWRlIG1hdC1wcm9ncmVzcy1iYXItdGhlbWUoJHRoZW1lKTtcbiAgQGluY2x1ZGUgbWF0LXByb2dyZXNzLXNwaW5uZXItdGhlbWUoJHRoZW1lKTtcbiAgQGluY2x1ZGUgbWF0LXJhZGlvLXRoZW1lKCR0aGVtZSk7XG4gIEBpbmNsdWRlIG1hdC1zZWxlY3QtdGhlbWUoJHRoZW1lKTtcbiAgQGluY2x1ZGUgbWF0LXNpZGVuYXYtdGhlbWUoJHRoZW1lKTtcbiAgQGluY2x1ZGUgbWF0LXNsaWRlLXRvZ2dsZS10aGVtZSgkdGhlbWUpO1xuICBAaW5jbHVkZSBtYXQtc2xpZGVyLXRoZW1lKCR0aGVtZSk7XG4gIEBpbmNsdWRlIG1hdC1zdGVwcGVyLXRoZW1lKCR0aGVtZSk7XG4gIEBpbmNsdWRlIG1hdC1zb3J0LXRoZW1lKCR0aGVtZSk7XG4gIEBpbmNsdWRlIG1hdC10YWJzLXRoZW1lKCR0aGVtZSk7XG4gIEBpbmNsdWRlIG1hdC10b29sYmFyLXRoZW1lKCR0aGVtZSk7XG4gIEBpbmNsdWRlIG1hdC10b29sdGlwLXRoZW1lKCR0aGVtZSk7XG4gIEBpbmNsdWRlIG1hdC10cmVlLXRoZW1lKCR0aGVtZSk7XG4gIEBpbmNsdWRlIG1hdC1zbmFjay1iYXItdGhlbWUoJHRoZW1lKTtcbn1cbiIsIkBpbXBvcnQgJ35AYW5ndWxhci9tYXRlcmlhbC90aGVtaW5nJztcblxuaHRtbCxcbmJvZHkge1xuXHRoZWlnaHQ6IDEwMCU7XG5cdG1hcmdpbjogMDtcblx0cGFkZGluZzogMDtcbn1cblxuYm9keSB7XG5cdGZvbnQtZmFtaWx5OiBSb2JvdG8sICdIZWx2ZXRpY2EgTmV1ZScsIHNhbnMtc2VyaWY7IC8vIEhlbHBzIGZvbnRzIG9uIE9TWCBsb29rcyBtb3JlIGNvbnNpc3RlbnQgd2l0aCBvdGhlciBzeXN0ZW1zXG5cblx0Ly8gSXNuJ3QgY3VycmVudGx5IGluIGJ1dHRvbiBzdHlsZXMgZHVlIHRvIHBlcmZvcm1hbmNlIGNvbmNlcm5zXG5cdCoge1xuXHRcdC13ZWJraXQtZm9udC1zbW9vdGhpbmc6IGFudGlhbGlhc2VkO1xuXHRcdC1tb3otb3N4LWZvbnQtc21vb3RoaW5nOiBncmF5c2NhbGU7XG5cdH1cblxuXHRbbWF0LWljb24tYnV0dG9uXSB7XG5cdFx0b3ZlcmZsb3c6IGhpZGRlbjtcblx0fVxuXG5cdG1hdC1uYXYtbGlzdCB7XG5cdFx0ZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcblx0XHRib3gtc2l6aW5nOiBib3JkZXItYm94O1xuXHRcdGRpc3BsYXk6IGZsZXg7XG5cdFx0ZmxleDogMSAxIGF1dG87XG5cdH1cblxuXHRtYXQtc2lkZW5hdi1jb250YWluZXIuZGVtby1yb290IHtcblx0XHRoZWlnaHQ6IDEwMCU7XG5cblx0XHRtYXQtc2lkZW5hdiB7XG5cdFx0XHRtaW4td2lkdGg6IDE1JTtcblxuXHRcdFx0W21hdC1idXR0b25dIHtcblx0XHRcdFx0d2lkdGg6IDEwMCU7XG5cdFx0XHRcdHBvc2l0aW9uOiByZWxhdGl2ZTtcblx0XHRcdFx0Ym90dG9tOiAwO1xuXHRcdFx0XHRtYXJnaW46IDI0cHggMDtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRtYXQtY29udGVudCB7XG5cdFx0XHRoZWlnaHQ6IGF1dG87XG5cdFx0XHRvdmVyZmxvdzogdmlzaWJsZTtcblx0XHR9XG5cdH1cblxuXHRtYXQtY2FyZC5kZW1vLWNhcmQge1xuXHRcdHBhZGRpbmc6IDAgIWltcG9ydGFudDtcblx0XHRtYXJnaW46IDFyZW0gMDtcblx0XHRkaXNwbGF5OiBibG9jaztcblxuXHRcdG1hdC1jYXJkLWNvbnRlbnQge1xuXHRcdFx0cGFkZGluZzogMnJlbTtcblx0XHRcdGRpc3BsYXk6IGJsb2NrO1xuXG5cdFx0XHQmLm5vLXBhZGRpbmcge1xuXHRcdFx0XHRwYWRkaW5nOiAwO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGgxIHtcblx0XHRmb250LXNpemU6IDIwcHg7XG5cdH1cblxuXHQjY29sb3ItbWVudS10b2dnbGUtZ3JvdXAge1xuXHRcdG1hcmdpbjogLThweCAwO1xuXHRcdHdpZHRoOiAxMDAlO1xuXHR9XG5cblx0ZGVqYS1zaWRlbmF2LW1lbnUge1xuXHRcdGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG5cdFx0ZmxleC1kaXJlY3Rpb246IHJvdztcblx0XHRkaXNwbGF5OiBmbGV4O1xuXHR9XG5cblx0ZGVqYS1zaWRlbmF2LWNvbnRlbnQge1xuXHRcdGRpc3BsYXk6IGZsZXg7XG5cdFx0ZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcblx0XHRmbGV4OiAxIDEgYXV0bztcblxuXHRcdHJvdXRlci1vdXRsZXQge1xuXHRcdFx0ZGlzcGxheTogbm9uZTtcblx0XHR9XG5cblx0XHQ+KiB7XG5cdFx0XHRwYWRkaW5nOiAxcmVtO1xuXHRcdFx0ZmxleDogMSAxIDEwMCU7XG5cdFx0XHRkaXNwbGF5OiBibG9jaztcblx0XHR9XG5cdH1cblxuXHQuaGVhZGVyIHtcblx0XHQuaGVhZGVyLXRleHQge1xuXHRcdFx0bWFyZ2luLWxlZnQ6IDFyZW0gIWltcG9ydGFudDtcblx0XHR9XG5cblx0XHQuaGVhZGVyLWljb24ge1xuXHRcdFx0d2lkdGg6IDJyZW0gIWltcG9ydGFudDtcblx0XHRcdGhlaWdodDogMnJlbSAhaW1wb3J0YW50O1xuXHRcdFx0Y29udGVudDogdXJsKCcvYXNzZXRzL2ltZy9sb2dvL2FuZ3VsYXIuc3ZnJyk7XG5cdFx0fVxuXHR9XG59XG5cbi8vIGF2b2lkIGlzc3VlIHdpdGggZGlzcGxheSBwb3J0IGNhbGN1bGF0aW9uIGJ5IHRoZSBzbmFja2JhclxuI3Njcm9sbGFibGUtY29udGVudCB7XG5cdG92ZXJmbG93OiBhdXRvO1xuXHRoZWlnaHQ6IDEwMCU7XG59XG5cbiNpZnJhbWVQb3B1cCB7XG5cdGRpc3BsYXk6IGZsZXg7XG5cdGFsaWduLWl0ZW1zOiBjZW50ZXI7XG5cdGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xuXG5cdGRlamEtaWZyYW1lIHtcblx0XHR3aWR0aDogODAlO1xuXHRcdGhlaWdodDogODAlO1xuXHRcdGRpc3BsYXk6IGJsb2NrO1xuXHR9XG59XG5cbiNzaG9ydGN1dC1saXN0IHtcblx0cGFkZGluZzogMDtcblxuXHRsaSB7XG5cdFx0bWFyZ2luOiAwLjVyZW0gMDtcblx0fVxuXG5cdC5rZXlib2FyZC1rZXkge1xuXHRcdGJhY2tncm91bmQ6ICNlZmYwZjI7XG5cdFx0Ym9yZGVyLXJhZGl1czogNHB4O1xuXHRcdGJvcmRlci10b3A6IDFweCBzb2xpZCAjZjVmNWY1O1xuXHRcdGJveC1zaGFkb3c6IGluc2V0IDAgMCAyNXB4ICNlOGU4ZTgsIDAgMXB4IDAgI2MzYzNjMywgMCAycHggMCAjYzljOWM5LCAwIDJweCAzcHggIzMzMztcblx0XHRjb2xvcjogI0FBQTtcblx0XHRmb250LXNpemU6IDAuOGVtO1xuXHRcdG1hcmdpbjogMCAzcHg7XG5cdFx0cGFkZGluZzogM3B4IDhweDtcblx0XHR0ZXh0LWFsaWduOiBjZW50ZXI7XG5cdFx0dGV4dC1zaGFkb3c6IDBweCAxcHggMHB4ICNmNWY1ZjU7XG5cdH1cbn0iXX0= */"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _deja_js_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @deja-js/core */ "./dist/deja-js/core/fesm5/deja-js-core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */





var AppComponent = /** @class */ (function () {
    function AppComponent(iconService) {
        var _this = this;
        this.isAlive = true;
        try {
            this._theme = localStorage.getItem('dejajs-demo-color');
        }
        catch (_e) {
            console.log('Fail to get your prefered color from the local storage.');
        }
        if (!this._theme) {
            this._theme = 'blue';
        }
        this.theme$ = new rxjs__WEBPACK_IMPORTED_MODULE_3__["BehaviorSubject"](this._theme);
        Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["from"])(this.theme$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["takeWhile"])(function () { return _this.isAlive; }))
            .subscribe(function (theme) { return document.body.setAttribute('theme', theme); });
        iconService.addSvgIcon('angular', 'assets/img/logo/angular.svg');
        // iconService.useMaterialIcons(false);
    }
    Object.defineProperty(AppComponent.prototype, "theme", {
        get: function () {
            return this._theme;
        },
        set: function (theme) {
            this._theme = theme;
            try {
                localStorage.setItem('dejajs-demo-color', theme);
            }
            catch (_e) {
                console.log('Fail to set your prefered color to the local storage.');
            }
            this.theme$.next(theme);
        },
        enumerable: true,
        configurable: true
    });
    AppComponent.prototype.ngOnDestroy = function () {
        this.isAlive = false;
    };
    AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectionStrategy"].OnPush,
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewEncapsulation"].None,
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.scss */ "./src/app/app.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_deja_js_core__WEBPACK_IMPORTED_MODULE_2__["IconService"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _deja_js_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @deja-js/core */ "./dist/deja-js/core/fesm5/deja-js-core.js");
/* harmony import */ var _deja_js_component_sidenav__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @deja-js/component/sidenav */ "./dist/deja-js/component/fesm5/deja-js-component-sidenav.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _app_routes__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./app.routes */ "./src/app/app.routes.ts");
/* harmony import */ var _services_countries_list_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./services/countries-list.service */ "./src/app/services/countries-list.service.ts");
/* harmony import */ var _services_countries_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./services/countries.service */ "./src/app/services/countries.service.ts");
/* harmony import */ var _services_folders_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./services/folders.service */ "./src/app/services/folders.service.ts");
/* harmony import */ var _services_news_service__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./services/news.service */ "./src/app/services/news.service.ts");
/* harmony import */ var _services_people_service__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./services/people.service */ "./src/app/services/people.service.ts");
/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

















var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_9__["AppComponent"]
            ],
            imports: [
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__["BrowserModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__["BrowserAnimationsModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClientModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatButtonModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatButtonToggleModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatIconModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatListModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatMenuModule"],
                _deja_js_core__WEBPACK_IMPORTED_MODULE_7__["DejaMaterialColorsModule"],
                _deja_js_component_sidenav__WEBPACK_IMPORTED_MODULE_8__["DejaSidenavModule"].forRoot(),
                _deja_js_core__WEBPACK_IMPORTED_MODULE_7__["DejaSlimScrollModule"],
                _deja_js_core__WEBPACK_IMPORTED_MODULE_7__["DejaClipboardModule"].forRoot(),
                _deja_js_core__WEBPACK_IMPORTED_MODULE_7__["IconModule"],
                _app_routes__WEBPACK_IMPORTED_MODULE_10__["routing"],
            ],
            providers: [
                _services_countries_list_service__WEBPACK_IMPORTED_MODULE_11__["CountriesListService"],
                _services_countries_service__WEBPACK_IMPORTED_MODULE_12__["CountriesService"],
                _services_folders_service__WEBPACK_IMPORTED_MODULE_13__["FoldersService"],
                _services_news_service__WEBPACK_IMPORTED_MODULE_14__["NewsService"],
                _services_people_service__WEBPACK_IMPORTED_MODULE_15__["PeopleService"],
            ],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_9__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/app.routes.ts":
/*!*******************************!*\
  !*** ./src/app/app.routes.ts ***!
  \*******************************/
/*! exports provided: appRoutingProviders, routing */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "appRoutingProviders", function() { return appRoutingProviders; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "routing", function() { return routing; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

var routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', loadChildren: './home/home.module#HomeModule', data: { title: 'Home' } },
    // { path: 'guides', loadChildren: './home-guides/home-guides.module#HomeGuidesModule', data: { title: 'Guides' } },
    // { path: 'accordion', loadChildren: './accordion/accordion-demo.module#DejaAccordionDemoModule', data: { title: 'Accordion' } },
    { path: 'circular-picker', loadChildren: './circular-picker/circular-picker-demo.module#DejaCircularPickerDemoModule', data: { title: 'Circular Picker' } },
    { path: 'colorselector', loadChildren: './color-selector/color-selector-demo.module#DejaColorSelectorDemoModule', data: { title: 'Color Selector' } },
    // { path: 'combo-list', loadChildren: './combo-list/combo-list-demo.module#DejaComboListDemoModule', data: { title: 'Combo List' } },
    { path: 'contenteditableselector', loadChildren: './content-editable/content-editable-demo.module#DejaContentEditableDemoModule', data: { title: 'Content Editable' } },
    { path: 'date-picker', loadChildren: './date-picker/date-picker-demo.module#DejaDatePickerDemoModule', data: { title: 'Date Picker' } },
    { path: 'editor', loadChildren: './editor/editor-demo.module#DejaEditorDemoModule', data: { title: 'Editor' } },
    // { path: 'events', loadChildren: './global-events/global-events-demo.module#DejaGlobalEventsDemoModule', data: { title: 'Events' } },
    { path: 'grid', loadChildren: './grid/grid-demo.module#DejaGridDemoModule', data: { title: 'Grid' } },
    { path: 'message-box', loadChildren: './message-box/message-box-demo.module#DejaMessageBoxDemoModule', data: { title: 'Message Box' } },
    { path: 'monaco-editor', loadChildren: './monaco-editor/monaco-editor-demo.module#MonacoEditorDemoModule', data: { title: 'Monaco Editor' } },
    { path: 'numeric-stepper', loadChildren: './numeric-stepper/numeric-stepper-demo.module#DejaNumericStepperDemoModule', data: { title: 'Numeric Stepper' } },
    { path: 'overlay', loadChildren: './overlay/overlay-demo.module#DejaOverlayDemoModule', data: { title: 'Overlay' } },
    { path: 'popup', loadChildren: './popup/popup-demo.module#DejaPopupDemoModule', data: { title: 'Popup' } },
    // { path: 'progress-circle', loadChildren: './progress-circle/progress-circle-demo.module#DejaProgressCircleDemoModule', data: { title: 'Progress Circle' } },
    { path: 'range', loadChildren: './range/range-demo.module#DejaRangeDemoModule', data: { title: 'Range' } },
    // { path: 'reactive-form', loadChildren: './reactive-form/reactive-form-demo.module#DejaReactiveFormDemoModule', data: { title: 'Reactive Form' } },
    { path: 'select', loadChildren: './select/select-demo.module#SelectDemoModule', data: { title: 'Select' } },
    { path: 'sidenav', loadChildren: './sidenav/sidenav-demo.module#DejaSidenavDemoModule', data: { title: 'Sidenav' } },
    { path: 'snackbar', loadChildren: './snackbar/snackbar-demo.module#DejaSnackbarDemoModule', data: { title: 'Snackbar' } },
    { path: 'splitter', loadChildren: './splitter/splitter-demo.module#DejaSplitterDemoModule', data: { title: 'Splitter' } },
    { path: 'tag', loadChildren: './tag/tag-demo.module#DejaTagDemoModule', data: { title: 'Tag' } },
    { path: 'tiles', loadChildren: './tiles/tiles-demo.module#DejaTilesDemoModule', data: { title: 'Tiles' } },
    { path: 'tree-list', loadChildren: './tree-list/tree-list-demo.module#DejaTreeListDemoModule', data: { title: 'Tree List' } },
    { path: 'viewport', loadChildren: './viewport/viewport-demo.module#DejaViewPortDemoModule', data: { title: 'Viewport' } },
    { path: '**', redirectTo: 'home', pathMatch: 'prefix' },
];
var appRoutingProviders = [];
var routing = _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forRoot(routes);


/***/ }),

/***/ "./src/app/common/news.model.ts":
/*!**************************************!*\
  !*** ./src/app/common/news.model.ts ***!
  \**************************************/
/*! exports provided: News, NewsSource, NewsSources, NewsArticles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "News", function() { return News; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NewsSource", function() { return NewsSource; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NewsSources", function() { return NewsSources; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NewsArticles", function() { return NewsArticles; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var json_object_mapper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! json-object-mapper */ "./node_modules/json-object-mapper/dist/ObjectMapper.js");
/* harmony import */ var json_object_mapper__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(json_object_mapper__WEBPACK_IMPORTED_MODULE_1__);
/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */


var News = /** @class */ (function () {
    function News() {
        this.author = void 0;
        this.title = void 0;
        this.description = void 0;
        this.url = void 0;
        this.urlToImage = void 0;
        this.publishedAt = void 0;
    }
    return News;
}());

var NewsSource = /** @class */ (function () {
    function NewsSource() {
        this.id = void 0;
        this.name = void 0;
        this.category = void 0;
        this.language = void 0;
        this.country = void 0;
        this.sortBysAvailable = void 0;
    }
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(json_object_mapper__WEBPACK_IMPORTED_MODULE_1__["JsonProperty"])({ type: String }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Array)
    ], NewsSource.prototype, "sortBysAvailable", void 0);
    return NewsSource;
}());

var NewsSources = /** @class */ (function () {
    function NewsSources() {
        this.status = void 0;
        this.sources = void 0;
    }
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(json_object_mapper__WEBPACK_IMPORTED_MODULE_1__["JsonProperty"])({ type: NewsSource }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Array)
    ], NewsSources.prototype, "sources", void 0);
    return NewsSources;
}());

var NewsArticles = /** @class */ (function () {
    function NewsArticles() {
        this.status = void 0;
        this.sources = void 0;
        this.articles = void 0;
    }
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(json_object_mapper__WEBPACK_IMPORTED_MODULE_1__["JsonProperty"])({ type: News }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Array)
    ], NewsArticles.prototype, "articles", void 0);
    return NewsArticles;
}());



/***/ }),

/***/ "./src/app/services/countries-list.service.ts":
/*!****************************************************!*\
  !*** ./src/app/services/countries-list.service.ts ***!
  \****************************************************/
/*! exports provided: CountriesListService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CountriesListService", function() { return CountriesListService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _deja_js_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @deja-js/core */ "./dist/deja-js/core/fesm5/deja-js-core.js");
/* harmony import */ var _countries_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./countries.service */ "./src/app/services/countries.service.ts");
/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */




var CountriesListService = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](CountriesListService, _super);
    function CountriesListService(countriesService) {
        var _this = _super.call(this) || this;
        _this.countriesService = countriesService;
        return _this;
    }
    // Override for lazy loading
    CountriesListService.prototype.getItemList$ = function (query) {
        return this.countriesService.getCountries$(query);
    };
    CountriesListService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_countries_service__WEBPACK_IMPORTED_MODULE_3__["CountriesService"]])
    ], CountriesListService);
    return CountriesListService;
}(_deja_js_core__WEBPACK_IMPORTED_MODULE_2__["ItemListService"]));



/***/ }),

/***/ "./src/app/services/countries.service.ts":
/*!***********************************************!*\
  !*** ./src/app/services/countries.service.ts ***!
  \***********************************************/
/*! exports provided: Country, CountriesService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Country", function() { return Country; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CountriesService", function() { return CountriesService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _deja_js_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @deja-js/core */ "./dist/deja-js/core/fesm5/deja-js-core.js");
/* harmony import */ var json_object_mapper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! json-object-mapper */ "./node_modules/json-object-mapper/dist/ObjectMapper.js");
/* harmony import */ var json_object_mapper__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(json_object_mapper__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */







var Country = /** @class */ (function () {
    function Country() {
        this.displayName = void 0;
        this.naqme = void 0;
        this.code = void 0;
        this.color = void 0;
    }
    return Country;
}());

var CountriesService = /** @class */ (function () {
    function CountriesService(httpClient, materialColors) {
        this.httpClient = httpClient;
        this.countriesDic = {};
        this.materialColors = materialColors.getPalet('700');
    }
    CountriesService.prototype.getCountryByIndex$ = function (index) {
        return this.getCountries$().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["map"])(function (countries) { return countries[index % countries.length]; }));
    };
    CountriesService.prototype.getCountryByCode$ = function (code) {
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_5__["of"])(this.countriesDic[code]);
    };
    CountriesService.prototype.getCountries$ = function (query, number) {
        var _this = this;
        var recordCount = number || 0;
        return this.httpClient.get('assets/datas/countries.json', {}).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["map"])(function (json) { return json_object_mapper__WEBPACK_IMPORTED_MODULE_4__["ObjectMapper"].deserializeArray(Country, json.data); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["map"])(function (countries) {
            var colorIndex = 0;
            countries.forEach(function (country) {
                country.displayName = country.naqme;
                country.color = _this.materialColors[colorIndex].toHex();
                _this.countriesDic[country.code] = country;
                if (++colorIndex >= _this.materialColors.length) {
                    colorIndex = 0;
                }
            });
            return countries;
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["publishLast"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["refCount"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["map"])(function (countries) {
            if (query) {
                var sr_1 = new RegExp("^" + query, 'i');
                var sc_1 = new RegExp("^(?!" + query + ").*(" + query + ")", 'i');
                var result_1 = countries.filter(function (z) { return sr_1.test(z.naqme); });
                countries.forEach(function (z) {
                    if (sc_1.test(z.naqme)) {
                        result_1.push(z);
                    }
                });
                return result_1;
            }
            else {
                return countries;
            }
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["map"])(function (countries) {
            var returnCountries = countries;
            if (recordCount) {
                while (recordCount > 0) {
                    returnCountries = returnCountries.concat(countries);
                    recordCount -= countries.length;
                }
            }
            return returnCountries;
        }));
    };
    CountriesService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"], _deja_js_core__WEBPACK_IMPORTED_MODULE_3__["MaterialColors"]])
    ], CountriesService);
    return CountriesService;
}());



/***/ }),

/***/ "./src/app/services/folders.service.ts":
/*!*********************************************!*\
  !*** ./src/app/services/folders.service.ts ***!
  \*********************************************/
/*! exports provided: Folder, FoldersService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Folder", function() { return Folder; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FoldersService", function() { return FoldersService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */


var Folder = /** @class */ (function () {
    function Folder(level, item) {
        this.label = "Level " + level + " - Item " + item;
        this.children = [];
    }
    return Folder;
}());

var FoldersService = /** @class */ (function () {
    function FoldersService() {
        this.folders = [];
        this.addLevel(1, this.folders);
    }
    FoldersService.prototype.getFolders = function () {
        return this.folders;
    };
    FoldersService.prototype.addLevel = function (level, children) {
        if (level > 15) {
            return;
        }
        var child = new Folder(level, 1);
        this.addLevel(level + 1, child.children);
        children.push(child);
    };
    FoldersService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], FoldersService);
    return FoldersService;
}());



/***/ }),

/***/ "./src/app/services/news.service.ts":
/*!******************************************!*\
  !*** ./src/app/services/news.service.ts ***!
  \******************************************/
/*! exports provided: NewsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NewsService", function() { return NewsService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var json_object_mapper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! json-object-mapper */ "./node_modules/json-object-mapper/dist/ObjectMapper.js");
/* harmony import */ var json_object_mapper__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(json_object_mapper__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _common_news_model__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../common/news.model */ "./src/app/common/news.model.ts");
/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */







var NewsService = /** @class */ (function () {
    function NewsService(httpClient) {
        this.httpClient = httpClient;
    }
    NewsService.prototype.getNews$ = function (recordCount) {
        var _this = this;
        return this.httpClient.get('https://newsapi.org/v1/sources?language=en').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["map"])(function (response) { return json_object_mapper__WEBPACK_IMPORTED_MODULE_3__["ObjectMapper"].deserialize(_common_news_model__WEBPACK_IMPORTED_MODULE_6__["NewsSources"], response); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["map"])(function (resp) {
            if (resp.status !== 'ok') {
                throw new Error('Fail to get news');
            }
            return resp.sources;
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["map"])(function (sources) { return sources.filter(function (source) { return source.category === 'technology' || source.category === 'gaming'; }); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["switchMap"])(function (sources) {
            var source = sources[Math.round(Math.random() * (sources.length - 1))];
            return _this.httpClient.get("https://newsapi.org/v1/articles?source=" + source.id + "&apiKey=228bc9410a2a4f608d2ad2e5626896f3");
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["map"])(function (response) { return json_object_mapper__WEBPACK_IMPORTED_MODULE_3__["ObjectMapper"].deserialize(_common_news_model__WEBPACK_IMPORTED_MODULE_6__["NewsArticles"], response); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["map"])(function (resp) {
            if (resp.status !== 'ok') {
                throw new Error('Fail to get news');
            }
            return resp.articles;
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["publishLast"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["refCount"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["map"])(function (news) {
            var returnNews = news;
            if (recordCount) {
                while (recordCount > 0) {
                    returnNews = returnNews.concat(lodash__WEBPACK_IMPORTED_MODULE_4__["cloneDeep"](news));
                    recordCount -= news.length;
                }
            }
            return returnNews;
        }));
    };
    NewsService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], NewsService);
    return NewsService;
}());



/***/ }),

/***/ "./src/app/services/people.service.ts":
/*!********************************************!*\
  !*** ./src/app/services/people.service.ts ***!
  \********************************************/
/*! exports provided: Friend, Person, PeopleService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Friend", function() { return Friend; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Person", function() { return Person; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PeopleService", function() { return PeopleService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _deja_js_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @deja-js/core */ "./dist/deja-js/core/fesm5/deja-js-core.js");
/* harmony import */ var json_object_mapper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! json-object-mapper */ "./node_modules/json-object-mapper/dist/ObjectMapper.js");
/* harmony import */ var json_object_mapper__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(json_object_mapper__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */







var Friend = /** @class */ (function () {
    function Friend() {
        this.id = void 0;
        this.name = void 0;
    }
    return Friend;
}());

var Person = /** @class */ (function () {
    function Person() {
        this._id = void 0;
        this.index = void 0;
        this.guid = void 0;
        this.isActive = void 0;
        this.balance = void 0;
        this.picture = void 0;
        this.age = void 0;
        this.eyeColor = void 0;
        this.name = void 0;
        this.gender = void 0;
        this.company = void 0;
        this.email = void 0;
        this.phone = void 0;
        this.address = void 0;
        this.about = void 0;
        this.registered = void 0;
        this.latitude = void 0;
        this.longitude = void 0;
        this.tags = void 0;
        this.color = void 0;
        this.friends = void 0;
        this.greeting = void 0;
        this.favoriteFruit = void 0;
    }
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(json_object_mapper__WEBPACK_IMPORTED_MODULE_4__["JsonProperty"])({ type: Date }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Date)
    ], Person.prototype, "registered", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(json_object_mapper__WEBPACK_IMPORTED_MODULE_4__["JsonProperty"])({ type: String }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Array)
    ], Person.prototype, "tags", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(json_object_mapper__WEBPACK_IMPORTED_MODULE_4__["JsonProperty"])({ type: Friend }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Array)
    ], Person.prototype, "friends", void 0);
    return Person;
}());

var PeopleService = /** @class */ (function () {
    function PeopleService(httpClient, materialColors) {
        this.httpClient = httpClient;
        this.peopleDic = {};
        this.materialColors = materialColors.getPalet('700');
    }
    PeopleService.prototype.getPeople$ = function (query, number) {
        var _this = this;
        var recordCount = number || 0;
        return this.httpClient.get('assets/datas/people.json', {}).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["map"])(function (json) { return json_object_mapper__WEBPACK_IMPORTED_MODULE_4__["ObjectMapper"].deserializeArray(Person, json); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["map"])(function (people) {
            var colorIndex = 0;
            people.forEach(function (person) {
                person.color = _this.materialColors[colorIndex].toHex();
                _this.peopleDic[person.guid] = person;
                if (++colorIndex >= _this.materialColors.length) {
                    colorIndex = 0;
                }
            });
            return people;
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["publishLast"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["refCount"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["map"])(function (people) {
            if (query) {
                var sr_1 = new RegExp("^" + query, 'i');
                var sc_1 = new RegExp("^(?!" + query + ").*(" + query + ")", 'i');
                var result_1 = people.filter(function (z) { return sr_1.test(z.name); });
                people.forEach(function (z) {
                    if (sc_1.test(z.name)) {
                        result_1.push(z);
                    }
                });
                return result_1;
            }
            else {
                return people;
            }
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["map"])(function (people) {
            var returnPeople = people;
            if (recordCount) {
                while (recordCount > 0) {
                    var clonedPeople = people.map(function (person) { return lodash__WEBPACK_IMPORTED_MODULE_5__["cloneDeep"](person); });
                    returnPeople = returnPeople.concat(clonedPeople.map(function (person) {
                        person.guid = (new _deja_js_core__WEBPACK_IMPORTED_MODULE_3__["UUID"]()).toString();
                        return person;
                    }));
                    recordCount -= people.length;
                }
            }
            return returnPeople;
        }));
    };
    PeopleService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"], _deja_js_core__WEBPACK_IMPORTED_MODULE_3__["MaterialColors"]])
    ], PeopleService);
    return PeopleService;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! hammerjs */ "./node_modules/hammerjs/hammer.js");
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(hammerjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");





if (_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_2__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_3__["AppModule"])
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/travis/build/DSI-HUG/dejajs-components/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map