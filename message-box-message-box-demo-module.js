(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["message-box-message-box-demo-module"],{

/***/ "./dist/deja-js/component/fesm5/deja-js-component-tooltip.js":
/*!*******************************************************************!*\
  !*** ./dist/deja-js/component/fesm5/deja-js-component-tooltip.js ***!
  \*******************************************************************/
/*! exports provided: DejaTooltipModule, DejaTooltipService, DejaTooltipDirective, DejaTooltipComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DejaTooltipModule", function() { return DejaTooltipModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DejaTooltipService", function() { return DejaTooltipService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DejaTooltipDirective", function() { return DejaTooltipDirective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DejaTooltipComponent", function() { return DejaTooltipComponent; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _deja_js_component_overlay__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @deja-js/component/overlay */ "./dist/deja-js/component/fesm5/deja-js-component-overlay.js");
/* harmony import */ var _angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/cdk/coercion */ "./node_modules/@angular/cdk/esm5/coercion.es5.js");
/* harmony import */ var _deja_js_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @deja-js/core */ "./dist/deja-js/core/fesm5/deja-js-core.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");








/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Service to pass some params through tooltip module
 */
var DejaTooltipService = /** @class */ (function () {
    function DejaTooltipService() {
        /**
         * Tooltip params
         */
        this.params = (/** @type {?} */ ({}));
    }
    DejaTooltipService.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["Injectable"] }
    ];
    return DejaTooltipService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Customizable tooltip component for Angular
 */
var DejaTooltipComponent = /** @class */ (function () {
    /**
     * Constructor
     * Subscribe to mouseover to know when tooltip must disappear.
     */
    function DejaTooltipComponent(elementRef, tooltipService) {
        var _this = this;
        this.tooltipService = tooltipService;
        /**
         * This position config ensures that the top "start" corner of the overlay
         * is aligned with with the top "start" of the origin by default (overlapping
         * the trigger completely). If the panel cannot fit below the trigger, it
         * will fall back to a position above the trigger.
         */
        this._positions = (/** @type {?} */ ([
            {
                originX: 'center',
                originY: 'bottom',
                overlayX: 'center',
                overlayY: 'top',
            },
            {
                originX: 'center',
                originY: 'top',
                overlayX: 'center',
                overlayY: 'bottom',
            },
            {
                originX: 'start',
                originY: 'bottom',
                overlayX: 'start',
                overlayY: 'top',
            },
            {
                originX: 'start',
                originY: 'top',
                overlayX: 'start',
                overlayY: 'bottom',
            },
            {
                originX: 'end',
                originY: 'bottom',
                overlayX: 'end',
                overlayY: 'top',
            },
            {
                originX: 'end',
                originY: 'top',
                overlayX: 'end',
                overlayY: 'bottom',
            },
        ]));
        /**
         * Event Emmited when hide action is called
         */
        this.hide = new _angular_core__WEBPACK_IMPORTED_MODULE_4__["EventEmitter"]();
        this.overlayVisible = false;
        this._closeOnMoveOver = false;
        /** @type {?} */
        var element = (/** @type {?} */ (elementRef.nativeElement));
        /** @type {?} */
        var hide$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_5__["from"])(this.hide).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["tap"])((/**
         * @return {?}
         */
        function () { return _this._model = undefined; })));
        Object(rxjs__WEBPACK_IMPORTED_MODULE_5__["fromEvent"])(element.ownerDocument, 'mousemove').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["takeUntil"])(hide$), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["debounceTime"])(100), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["map"])((/**
         * @param {?} event
         * @return {?}
         */
        function (event) { return new _deja_js_core__WEBPACK_IMPORTED_MODULE_3__["Position"](event.pageX, event.pageY); })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["filter"])((/**
         * @param {?} position
         * @return {?}
         */
        function (position) {
            if (_this._closeOnMoveOver) {
                return true;
            }
            /** @type {?} */
            var containerElement = document.elementFromPoint(position.left, position.top);
            /** @type {?} */
            var parentElement = containerElement;
            while (parentElement) {
                if (parentElement.className === 'cdk-overlay-pane') {
                    return false;
                }
                parentElement = parentElement.parentElement;
            }
            return true;
        })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["filter"])((/**
         * @param {?} position
         * @return {?}
         */
        function (position) {
            if (_this._closeOnMoveOver) {
                return true;
            }
            /** @type {?} */
            var ownerElement = ((/** @type {?} */ (_this.params.ownerElement))).nativeElement || _this.params.ownerElement;
            /** @type {?} */
            var ownerRect = new _deja_js_core__WEBPACK_IMPORTED_MODULE_3__["Rect"](ownerElement.getBoundingClientRect());
            return !ownerRect.containsPoint(position);
        })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["delay"])(300))
            .subscribe((/**
         * @return {?}
         */
        function () {
            _this.hide.emit();
            _this.overlayVisible = false;
        }));
    }
    Object.defineProperty(DejaTooltipComponent.prototype, "closeOnMoveOver", {
        get: /**
         * @return {?}
         */
        function () {
            return this._closeOnMoveOver;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._closeOnMoveOver = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_2__["coerceBooleanProperty"])(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaTooltipComponent.prototype, "positions", {
        get: /**
         * @return {?}
         */
        function () {
            return this._positions;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._positions = typeof value === 'string' ? _deja_js_core__WEBPACK_IMPORTED_MODULE_3__["DejaConnectionPositionPair"].parse(value) : value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaTooltipComponent.prototype, "model", {
        get: /**
         * @return {?}
         */
        function () {
            return this._model;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Init tooltip configuration
     * Check if ng-template model passed through param is an observable or a promise and resolve it before set.
     */
    /**
     * Init tooltip configuration
     * Check if ng-template model passed through param is an observable or a promise and resolve it before set.
     * @return {?}
     */
    DejaTooltipComponent.prototype.ngOnInit = /**
     * Init tooltip configuration
     * Check if ng-template model passed through param is an observable or a promise and resolve it before set.
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this.name) {
            throw (new Error('Name is required'));
        }
        this.params = this.tooltipService.params[this.name];
        this.ownerElement = ((/** @type {?} */ (this.params.ownerElement))).nativeElement || this.params.ownerElement;
        /** @type {?} */
        var model$ = (/** @type {?} */ (this.params.model));
        if (!model$) {
            this._model = undefined;
            this.overlayVisible = true;
        }
        else if (model$.subscribe) {
            model$.subscribe((/**
             * @param {?} model
             * @return {?}
             */
            function (model) {
                _this._model = model;
                _this.overlayVisible = true;
            }), (/**
             * @return {?}
             */
            function () {
                _this.hide.emit();
                _this.overlayVisible = false;
            }));
        }
        else {
            /** @type {?} */
            var promise = (/** @type {?} */ (this.params.model));
            if (promise.then) {
                promise
                    .then((/**
                 * @param {?} model
                 * @return {?}
                 */
                function (model) {
                    _this._model = model;
                    _this.overlayVisible = true;
                }))
                    .catch((/**
                 * @return {?}
                 */
                function () {
                    _this.hide.emit();
                    _this.overlayVisible = false;
                }));
            }
            else {
                this._model = this.params.model;
                this.overlayVisible = true;
            }
        }
    };
    DejaTooltipComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["Component"], args: [{
                    encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_4__["ViewEncapsulation"].None,
                    selector: 'deja-tooltip',
                    template: "<deja-overlay [overlayOffsetX]=\"0\" [overlayOffsetY]=\"10\" [ownerElement]=\"ownerElement\" [isVisible]=\"overlayVisible\" [positions]=\"positions\" hasBackdrop=\"false\">\n    <ng-template *ngIf=\"!!tooltipTemplate\" [ngTemplateOutlet]=\"tooltipTemplate\" [ngTemplateOutletContext]=\"{ $implicit: model }\"></ng-template>\n    <ng-container *ngIf=\"!tooltipTemplate\"><ng-content></ng-content></ng-container>\n</deja-overlay>\n<!--\n<ng-template #overlay cdk-connected-overlay [cdkConnectedOverlayOffsetY]=\"10\" [cdkConnectedOverlayOffsetX]=\"0\" [cdkConnectedOverlayOpen]=\"overlayVisible\" (detach)=\"overlayVisible=false\" [cdkConnectedOverlayOrigin]=\"overlayOrigin\" [cdkConnectedOverlayPositions]=\"positions\">\n</ng-template>\n-->\n",
                    styles: [".deja-overlay-container #tooltip{font-size:.8rem;border:1px solid #888;padding:.5rem}"]
                }] }
    ];
    /** @nocollapse */
    DejaTooltipComponent.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["ElementRef"] },
        { type: DejaTooltipService }
    ]; };
    DejaTooltipComponent.propDecorators = {
        name: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["Input"] }],
        hide: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["Output"] }],
        tooltipTemplate: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["ContentChild"], args: ['tooltipTemplate',] }],
        closeOnMoveOver: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["Input"] }],
        positions: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["Input"] }]
    };
    return DejaTooltipComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var DejaTooltipDirective = /** @class */ (function () {
    function DejaTooltipDirective(elementRef, tooltipService) {
        var _this = this;
        this.delay = 600;
        // tslint:disable-next-line:no-output-rename
        this.show = new _angular_core__WEBPACK_IMPORTED_MODULE_4__["EventEmitter"]();
        /** @type {?} */
        var element = (/** @type {?} */ (elementRef.nativeElement));
        /** @type {?} */
        var leave$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_5__["fromEvent"])(element, 'mouseleave');
        Object(rxjs__WEBPACK_IMPORTED_MODULE_5__["fromEvent"])(element, 'mouseenter').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["switchMap"])((/**
         * @param {?} e
         * @return {?}
         */
        function (e) { return Object(rxjs__WEBPACK_IMPORTED_MODULE_5__["of"])(e).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["delay"])(_this.delay), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["takeUntil"])(leave$)); })))
            .subscribe((/**
         * @return {?}
         */
        function () {
            tooltipService.params[_this.name] = {
                model: _this.model,
                ownerElement: elementRef,
                positions: _this.positions,
            };
            _this.show.emit();
        }));
    }
    DejaTooltipDirective.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["Directive"], args: [{
                    selector: '[deja-tooltip]',
                },] }
    ];
    /** @nocollapse */
    DejaTooltipDirective.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["ElementRef"] },
        { type: DejaTooltipService }
    ]; };
    DejaTooltipDirective.propDecorators = {
        delay: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["Input"], args: ['tooltip-delay',] }],
        model: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["Input"], args: ['tooltip-model',] }],
        name: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["Input"], args: ['deja-tooltip',] }],
        positions: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["Input"], args: ['tooltip-positions',] }],
        show: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["Output"], args: ['tooltip-show',] }]
    };
    return DejaTooltipDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var DejaTooltipModule = /** @class */ (function () {
    function DejaTooltipModule() {
    }
    DejaTooltipModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["NgModule"], args: [{
                    declarations: [
                        DejaTooltipComponent,
                        DejaTooltipDirective,
                    ],
                    exports: [
                        DejaTooltipComponent,
                        DejaTooltipDirective,
                    ],
                    imports: [
                        _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
                        _deja_js_component_overlay__WEBPACK_IMPORTED_MODULE_1__["DejaOverlayModule"],
                        _deja_js_core__WEBPACK_IMPORTED_MODULE_3__["MediaModule"],
                    ],
                    providers: [
                        DejaTooltipService,
                    ],
                },] }
    ];
    return DejaTooltipModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */



//# sourceMappingURL=deja-js-component-tooltip.js.map

/***/ }),

/***/ "./src/app/message-box/message-box-demo.html":
/*!***************************************************!*\
  !*** ./src/app/message-box/message-box-demo.html ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-tab-group [selectedIndex]=\"tabIndex\" (selectedTabChange)=\"tabIndex = $event.index\">\n\t<!--<mat-tab label=\"OVERVIEW\">-->\n\t<!--<mat-card class=\"demo-card demo-basic\">-->\n\t<!--TODO-->\n\t<!--</mat-card>-->\n\t<!--</mat-tab>-->\n\t<mat-tab label=\"API REFERENCE\"></mat-tab>\n\t<mat-tab label=\"EXAMPLES\"> </mat-tab>\n</mat-tab-group>\n\n<mat-card class=\"demo-card demo-basic\" *ngIf=\"tabIndex === 0\">\n\t<deja-markdown [url]=\"'https://raw.githubusercontent.com/DSI-HUG/dejajs-components/dev/projects/deja-js/component/message-box/readme.md'\"></deja-markdown>\n</mat-card>\n\n<div *ngIf=\"tabIndex === 1\" class=\"example\">\n\t<deja-dialog *ngIf=\"dialogTitle\" (closed)=\"dialogTitle = null\">\n\t\t<deja-message-box type=\"primary\" title=\"Title\" showCloseIcon=\"true\" (close)=\"dialogTitle = null\">\n\t\t\t<span [innerHtml]=\"dialogTitle\"></span>\n\t\t\t<ng-template #actionsTemplate>\n\t\t\t\t<button mat-raised-button (click)=\"dialogTitle = null\">\n\t\t\t\t\tCancel\n\t\t\t\t</button>\n\t\t\t\t<button mat-raised-button color=\"primary\" (click)=\"dialogTitle = null\">\n\t\t\t\t\tOk\n\t\t\t\t</button>\n\t\t\t</ng-template>\n\t\t</deja-message-box>\n\t</deja-dialog>\n\n\t<deja-message-box type=\"primary\" title=\"Title\">\n\t\tDu texte dans la <b>message box</b>\n\t</deja-message-box>\n\n\t<div style=\"margin:1rem;\"></div>\n\n\t<deja-tooltip name=\"test-tt\" *ngIf=\"tooltipVisible\" (hide)=\"tooltipVisible = false\">\n\t\t<ng-template #tooltipTemplate let-model>\n\t\t\t<div id=\"tooltip\">\n\t\t\t\t{{model.text}}\n\t\t\t</div>\n\t\t</ng-template>\n\t</deja-tooltip>\n\n\t<deja-message-box type=\"success\" title=\"Title\" [actions]=\"actions\">\n\t\t<span deja-tooltip=\"test-tt\" [tooltip-model]=\"toolTipModel\" (tooltip-show)=\"tooltipVisible = true\">Un message \"success\"</span>\n\t</deja-message-box>\n\n\t<div style=\"margin:1rem;\"></div>\n\n\t<deja-message-box type=\"warn\" horizontal title=\"Title\" [actions]=\"closeAction\">\n\t\tUn message \"warn\" <b>horizontal</b>\n\t</deja-message-box>\n\n\t<div style=\"margin:1rem;\"></div>\n\n\t<deja-message-box type=\"danger\" horizontal title=\"Title\">\n\t\tUn message \"danger\" <b>horizontal</b> avec une action au format template\n\t\t<ng-template #actionsTemplate>\n\t\t\t<button mat-mini-fab [color]=\"'blank'\" class=\"action-button\">\n\t\t\t\t<mat-icon>clear</mat-icon>\n\t\t\t</button>\n\t\t</ng-template>\n\t</deja-message-box>\n\n\t<div style=\"margin:1rem;\"></div>\n\n\t<deja-message-box horizontal>\n\t\tUn message horizontal sans type ni titre\n\t</deja-message-box>\n</div>"

/***/ }),

/***/ "./src/app/message-box/message-box-demo.module.ts":
/*!********************************************************!*\
  !*** ./src/app/message-box/message-box-demo.module.ts ***!
  \********************************************************/
/*! exports provided: DejaMessageBoxDemoModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DejaMessageBoxDemoModule", function() { return DejaMessageBoxDemoModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/card */ "./node_modules/@angular/material/esm5/card.es5.js");
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/toolbar */ "./node_modules/@angular/material/esm5/toolbar.es5.js");
/* harmony import */ var _deja_js_component_dialog__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @deja-js/component/dialog */ "./dist/deja-js/component/fesm5/deja-js-component-dialog.js");
/* harmony import */ var _deja_js_component_message_box__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @deja-js/component/message-box */ "./dist/deja-js/component/fesm5/deja-js-component-message-box.js");
/* harmony import */ var _deja_js_component_tooltip__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @deja-js/component/tooltip */ "./dist/deja-js/component/fesm5/deja-js-component-tooltip.js");
/* harmony import */ var _component_markdown_index__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../component/markdown/index */ "./src/component/markdown/index.ts");
/* harmony import */ var _message_box_demo__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./message-box-demo */ "./src/app/message-box/message-box-demo.ts");
/* harmony import */ var _message_box_demo_routes__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./message-box-demo.routes */ "./src/app/message-box/message-box-demo.routes.ts");
/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */













var DejaMessageBoxDemoModule = /** @class */ (function () {
    function DejaMessageBoxDemoModule() {
    }
    DejaMessageBoxDemoModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [_message_box_demo__WEBPACK_IMPORTED_MODULE_11__["DejaMessageBoxDemoComponent"]],
            exports: [_message_box_demo__WEBPACK_IMPORTED_MODULE_11__["DejaMessageBoxDemoComponent"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatButtonModule"],
                _angular_material_card__WEBPACK_IMPORTED_MODULE_5__["MatCardModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatTabsModule"],
                _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_6__["MatToolbarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatIconModule"],
                _deja_js_component_dialog__WEBPACK_IMPORTED_MODULE_7__["DejaDialogModule"],
                _deja_js_component_message_box__WEBPACK_IMPORTED_MODULE_8__["DejaMessageBoxModule"],
                _component_markdown_index__WEBPACK_IMPORTED_MODULE_10__["DejaMarkdownModule"],
                _deja_js_component_tooltip__WEBPACK_IMPORTED_MODULE_9__["DejaTooltipModule"],
                _message_box_demo_routes__WEBPACK_IMPORTED_MODULE_12__["routing"],
            ],
            providers: [],
        })
    ], DejaMessageBoxDemoModule);
    return DejaMessageBoxDemoModule;
}());



/***/ }),

/***/ "./src/app/message-box/message-box-demo.routes.ts":
/*!********************************************************!*\
  !*** ./src/app/message-box/message-box-demo.routes.ts ***!
  \********************************************************/
/*! exports provided: routing */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "routing", function() { return routing; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _message_box_demo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./message-box-demo */ "./src/app/message-box/message-box-demo.ts");
/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */


var routes = [
    { path: '', component: _message_box_demo__WEBPACK_IMPORTED_MODULE_1__["DejaMessageBoxDemoComponent"] },
    { path: '**', redirectTo: '', pathMatch: 'full' },
];
var routing = _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forChild(routes);


/***/ }),

/***/ "./src/app/message-box/message-box-demo.scss":
/*!***************************************************!*\
  !*** ./src/app/message-box/message-box-demo.scss ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host .example {\n  margin-top: 2rem; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3RyYXZpcy9idWlsZC9EU0ktSFVHL2RlamFqcy1jb21wb25lbnRzL3NyYy9hcHAvbWVzc2FnZS1ib3gvbWVzc2FnZS1ib3gtZGVtby5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBRVEsZ0JBQWdCLEVBQUEiLCJmaWxlIjoic3JjL2FwcC9tZXNzYWdlLWJveC9tZXNzYWdlLWJveC1kZW1vLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyI6aG9zdCB7ICAgIFxuICAgIC5leGFtcGxlIHtcbiAgICAgICAgbWFyZ2luLXRvcDogMnJlbTtcbiAgICB9XG59Il19 */"

/***/ }),

/***/ "./src/app/message-box/message-box-demo.ts":
/*!*************************************************!*\
  !*** ./src/app/message-box/message-box-demo.ts ***!
  \*************************************************/
/*! exports provided: DejaMessageBoxDemoComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DejaMessageBoxDemoComponent", function() { return DejaMessageBoxDemoComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */


var DejaMessageBoxDemoComponent = /** @class */ (function () {
    function DejaMessageBoxDemoComponent() {
        var _this = this;
        this.tabIndex = 1;
        this.toolTipModel = {
            text: 'Je suis un deja-tooltip'
        };
        this.tooltipVisible = false;
        this.actions = [
            {
                action: function () {
                    _this.dialogTitle = '<b>I am a deja-dialog !</b><br/> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sit amet felis id nisl maximus interdum. Morbi mollis sapien sapien. Vivamus lacinia elementum eros';
                },
                text: 'Cliquez moi pour ouvrir une deja-dialog',
                type: 'primary',
            },
            {
                action: function () { return alert('test action'); },
                text: 'test sans icon',
            },
            {
                action: function () { return alert('test action'); },
                type: 'danger',
            },
        ];
        this.closeAction = [
            {
                action: function () { return alert('test action'); },
                icon: 'clear',
            },
        ];
    }
    DejaMessageBoxDemoComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'message-box-demo',
            template: __webpack_require__(/*! ./message-box-demo.html */ "./src/app/message-box/message-box-demo.html"),
            styles: [__webpack_require__(/*! ./message-box-demo.scss */ "./src/app/message-box/message-box-demo.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], DejaMessageBoxDemoComponent);
    return DejaMessageBoxDemoComponent;
}());



/***/ })

}]);
//# sourceMappingURL=message-box-message-box-demo-module.js.map