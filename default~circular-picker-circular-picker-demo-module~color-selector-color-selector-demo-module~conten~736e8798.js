(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~circular-picker-circular-picker-demo-module~color-selector-color-selector-demo-module~conten~736e8798"],{

/***/ "./dist/deja-js/component/fesm5/deja-js-component-overlay.js":
/*!*******************************************************************!*\
  !*** ./dist/deja-js/component/fesm5/deja-js-component-overlay.js ***!
  \*******************************************************************/
/*! exports provided: DejaOverlayModule, DejaOverlayComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DejaOverlayModule", function() { return DejaOverlayModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DejaOverlayComponent", function() { return DejaOverlayComponent; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/cdk/coercion */ "./node_modules/@angular/cdk/esm5/coercion.es5.js");
/* harmony import */ var _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/cdk/overlay */ "./node_modules/@angular/cdk/esm5/overlay.es5.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _deja_js_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @deja-js/core */ "./dist/deja-js/core/fesm5/deja-js-core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");








/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// providers: [ MediaService ],
var DejaOverlayComponent = /** @class */ (function () {
    function DejaOverlayComponent(changeDetectorRef, elementRef, overlayContainer, mediaService) {
        var _this = this;
        this.changeDetectorRef = changeDetectorRef;
        this.elementRef = elementRef;
        this.overlayContainer = overlayContainer;
        /**
         * Renvoie une valeur qui indique si le dialog est affiché.
         */
        this._isVisible = false;
        this.overlayBackdropClass = 'cdk-overlay-transparent-backdrop';
        this._hasBackdrop = true;
        this._width = null;
        this._widthForMobile = '100%';
        /**
         * Déclenché lorsque la visibilité du dialog change.
         */
        this.visibleChange = new _angular_core__WEBPACK_IMPORTED_MODULE_3__["EventEmitter"]();
        /**
         * Déclenché lorsque l'overlay est fermé.
         */
        this.closed = new _angular_core__WEBPACK_IMPORTED_MODULE_3__["EventEmitter"]();
        this.overlayOffsetX = 0;
        this.overlayOffsetY = 0;
        this._positions = _deja_js_core__WEBPACK_IMPORTED_MODULE_4__["DejaConnectionPositionPair"].default;
        this._isMobile = false;
        this.isAlive = true;
        /** @type {?} */
        var containerElement = (/** @type {?} */ (this.overlayContainer.getContainerElement()));
        containerElement.classList.add('deja-overlay-container');
        containerElement.addEventListener('contextmenu', (/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            event.preventDefault();
            return false;
        }));
        mediaService.isMobile$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["takeWhile"])((/**
         * @return {?}
         */
        function () { return _this.isAlive; })))
            .subscribe((/**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            _this.isMobile = value;
            _this.changeDetectorRef.markForCheck();
        }));
    }
    Object.defineProperty(DejaOverlayComponent.prototype, "isVisible", {
        get: /**
         * @return {?}
         */
        function () {
            return this._isVisible;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            /** @type {?} */
            var isVisible = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_1__["coerceBooleanProperty"])(value);
            if (this._isVisible !== isVisible) {
                this._isVisible = isVisible;
                this.changeDetectorRef.markForCheck();
                this.visibleChange.emit(this.isVisible);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaOverlayComponent.prototype, "overlayContainerClass", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            /** @type {?} */
            var containerElement = (/** @type {?} */ (this.overlayContainer.getContainerElement()));
            containerElement.classList.add(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaOverlayComponent.prototype, "hasBackdrop", {
        get: /**
         * @return {?}
         */
        function () {
            return this._hasBackdrop;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._hasBackdrop = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_1__["coerceBooleanProperty"])(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaOverlayComponent.prototype, "ownerElement", {
        /** Renvoie ou définit l'élement sur lequel le menu devra s'aligner */
        set: /**
         * Renvoie ou définit l'élement sur lequel le menu devra s'aligner
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._ownerElement = value;
            this.updateOriginOverlay();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaOverlayComponent.prototype, "positions", {
        get: /**
         * @return {?}
         */
        function () {
            if (!this.isMobile) {
                return this._positions;
            }
            else if (this._positionsForMobile) {
                return this._positionsForMobile;
            }
            else {
                return _deja_js_core__WEBPACK_IMPORTED_MODULE_4__["DejaConnectionPositionPair"].parse('start top start top');
            }
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._positions = typeof value === 'string' ? _deja_js_core__WEBPACK_IMPORTED_MODULE_4__["DejaConnectionPositionPair"].parse(value) : value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaOverlayComponent.prototype, "positionsForMobile", {
        /** Si pas null, sera utilisé quand isMobile est vrai. Si null et si isMobile est vrai,
         *  alors c'est la valeur 'start top start top' qui est utilisée.
         * */
        set: /**
         * Si pas null, sera utilisé quand isMobile est vrai. Si null et si isMobile est vrai,
         *  alors c'est la valeur 'start top start top' qui est utilisée.
         *
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._positionsForMobile = typeof value === 'string' ? _deja_js_core__WEBPACK_IMPORTED_MODULE_4__["DejaConnectionPositionPair"].parse(value) : value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaOverlayComponent.prototype, "isMobile", {
        get: /**
         * @return {?}
         */
        function () {
            return this._isMobile;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._isMobile = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_1__["coerceBooleanProperty"])(value);
            this.updateOriginOverlay();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaOverlayComponent.prototype, "width", {
        get: /**
         * @return {?}
         */
        function () {
            return this._width;
        },
        set: /**
         * @param {?} width
         * @return {?}
         */
        function (width) {
            this._width = width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaOverlayComponent.prototype, "widthForMobile", {
        get: /**
         * @return {?}
         */
        function () {
            return this._widthForMobile;
        },
        set: /**
         * @param {?} widthForMobile
         * @return {?}
         */
        function (widthForMobile) {
            this._widthForMobile = widthForMobile;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaOverlayComponent.prototype, "overlayWidth", {
        get: /**
         * @return {?}
         */
        function () {
            if (!this.isMobile) {
                return this._width;
            }
            else {
                return this._widthForMobile;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DejaOverlayComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.isAlive = false;
    };
    /**
     * @return {?}
     */
    DejaOverlayComponent.prototype.updatePosition = /**
     * @return {?}
     */
    function () {
        if (this.overlay && this.overlay.overlayRef) {
            this.overlay.overlayRef.updatePosition();
        }
    };
    /** Affiche le dialog. */
    /**
     * Affiche le dialog.
     * @param {?} eventOrOffsetX
     * @param {?=} offsetY
     * @return {?}
     */
    DejaOverlayComponent.prototype.show = /**
     * Affiche le dialog.
     * @param {?} eventOrOffsetX
     * @param {?=} offsetY
     * @return {?}
     */
    function (eventOrOffsetX, offsetY) {
        var _this = this;
        this.overlayOffsetX = offsetY !== undefined ? +eventOrOffsetX : 0;
        this.overlayOffsetY = offsetY || 0;
        /** @type {?} */
        var e = (/** @type {?} */ (eventOrOffsetX));
        /** @type {?} */
        var target = e && e.target;
        this.overlayOrigin = new _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_2__["CdkOverlayOrigin"](new _angular_core__WEBPACK_IMPORTED_MODULE_3__["ElementRef"]((this.isMobile && document.body) || target || this.ownerElement || this.elementRef.nativeElement));
        this.isVisible = true;
        this.changeDetectorRef.markForCheck();
        Object(rxjs__WEBPACK_IMPORTED_MODULE_5__["timer"])(1).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["first"])())
            .subscribe((/**
         * @return {?}
         */
        function () {
            _this.updatePosition();
        }));
    };
    /** Ferme le dialog. */
    /**
     * Ferme le dialog.
     * @return {?}
     */
    DejaOverlayComponent.prototype.close = /**
     * Ferme le dialog.
     * @return {?}
     */
    function () {
        this.isVisible = false;
        this.closed.emit(true);
        this.changeDetectorRef.markForCheck();
    };
    /**
     * @private
     * @return {?}
     */
    DejaOverlayComponent.prototype.updateOriginOverlay = /**
     * @private
     * @return {?}
     */
    function () {
        this.overlayOrigin = new _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_2__["CdkOverlayOrigin"](new _angular_core__WEBPACK_IMPORTED_MODULE_3__["ElementRef"]((this.isMobile && document.body) || this._ownerElement || this.elementRef.nativeElement));
    };
    DejaOverlayComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"], args: [{
                    changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ChangeDetectionStrategy"].OnPush,
                    encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ViewEncapsulation"].None,
                    selector: 'deja-overlay',
                    template: "<ng-template #overlayCmp cdk-connected-overlay [cdkConnectedOverlayHasBackdrop]=\"hasBackdrop || null\" [cdkConnectedOverlayBackdropClass]=\"overlayBackdropClass\" [cdkConnectedOverlayOpen]=\"isVisible\" [cdkConnectedOverlayOffsetY]=\"overlayOffsetY\" [cdkConnectedOverlayOffsetX]=\"overlayOffsetX\" [cdkConnectedOverlayOrigin]=\"overlayOrigin\" (backdropClick)=\"close()\" (detach)=\"close()\" [cdkConnectedOverlayPositions]=\"positions\" [cdkConnectedOverlayWidth]=\"overlayWidth\">\n    <ng-content></ng-content>\n</ng-template>\n",
                    styles: ["@media print{.deja-overlay-container{display:none}}"]
                }] }
    ];
    /** @nocollapse */
    DejaOverlayComponent.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ChangeDetectorRef"] },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ElementRef"] },
        { type: _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_2__["OverlayContainer"] },
        { type: _deja_js_core__WEBPACK_IMPORTED_MODULE_4__["MediaService"] }
    ]; };
    DejaOverlayComponent.propDecorators = {
        isVisible: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
        overlayBackdropClass: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
        overlayContainerClass: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
        hasBackdrop: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
        ownerElement: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
        visibleChange: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Output"] }],
        closed: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Output"] }],
        overlayOffsetX: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
        overlayOffsetY: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
        overlay: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ViewChild"], args: [_angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_2__["CdkConnectedOverlay"],] }],
        positions: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
        positionsForMobile: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
        isMobile: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
        width: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
        widthForMobile: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }]
    };
    return DejaOverlayComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var DejaOverlayModule = /** @class */ (function () {
    function DejaOverlayModule() {
    }
    DejaOverlayModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["NgModule"], args: [{
                    declarations: [DejaOverlayComponent],
                    exports: [DejaOverlayComponent],
                    imports: [
                        _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
                        _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_2__["OverlayModule"],
                        _deja_js_core__WEBPACK_IMPORTED_MODULE_4__["MediaModule"],
                    ],
                },] }
    ];
    return DejaOverlayModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */



//# sourceMappingURL=deja-js-component-overlay.js.map

/***/ })

}]);
//# sourceMappingURL=default~circular-picker-circular-picker-demo-module~color-selector-color-selector-demo-module~conten~736e8798.js.map