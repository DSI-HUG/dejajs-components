(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~circular-picker-circular-picker-demo-module~color-selector-color-selector-demo-module~conten~eec3f76e"],{

/***/ "./dist/deja-js/component/fesm5/deja-js-component-color-selector.js":
/*!**************************************************************************!*\
  !*** ./dist/deja-js/component/fesm5/deja-js-component-color-selector.js ***!
  \**************************************************************************/
/*! exports provided: DejaColorSelectorModule, DejaColorFab, DejaColorFabComponent, DejaColorSelectorComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DejaColorSelectorModule", function() { return DejaColorSelectorModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DejaColorFab", function() { return DejaColorFab; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DejaColorFabComponent", function() { return DejaColorFabComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DejaColorSelectorComponent", function() { return DejaColorSelectorComponent; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/cdk/coercion */ "./node_modules/@angular/cdk/esm5/coercion.es5.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _deja_js_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @deja-js/core */ "./dist/deja-js/core/fesm5/deja-js-core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");










/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var DejaColorFab = /** @class */ (function () {
    function DejaColorFab(_color, _disabled, _active) {
        if (_disabled === void 0) { _disabled = false; }
        if (_active === void 0) { _active = false; }
        this._color = _color;
        this._disabled = _disabled;
        this._active = _active;
        this.color$ = new rxjs__WEBPACK_IMPORTED_MODULE_7__["BehaviorSubject"](_color);
        this.disabled$ = new rxjs__WEBPACK_IMPORTED_MODULE_7__["BehaviorSubject"](_disabled);
        this.active$ = new rxjs__WEBPACK_IMPORTED_MODULE_7__["BehaviorSubject"](_active);
    }
    Object.defineProperty(DejaColorFab.prototype, "color", {
        get: /**
         * @return {?}
         */
        function () {
            return this._color;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.color$.next(this._color = value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaColorFab.prototype, "disabled", {
        get: /**
         * @return {?}
         */
        function () {
            return this._disabled;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.disabled$.next(this._disabled = value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaColorFab.prototype, "active", {
        get: /**
         * @return {?}
         */
        function () {
            return this._active;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.active$.next(this._active = value);
        },
        enumerable: true,
        configurable: true
    });
    return DejaColorFab;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var DejaColorFabComponent = /** @class */ (function () {
    function DejaColorFabComponent(el) {
        this.subscriptions = (/** @type {?} */ ([]));
        this.element = (/** @type {?} */ (el.nativeElement));
    }
    Object.defineProperty(DejaColorFabComponent.prototype, "color", {
        set: /**
         * @param {?} colorFab
         * @return {?}
         */
        function (colorFab) {
            var _this = this;
            this._colorFab = colorFab;
            if (colorFab) {
                /** @type {?} */
                var toogleAttribute_1 = (/**
                 * @param {?} attribute
                 * @param {?} value
                 * @return {?}
                 */
                function (attribute, value) {
                    if (value) {
                        _this.element.setAttribute(attribute, value.toString());
                    }
                    else {
                        _this.element.removeAttribute(attribute);
                    }
                });
                this.subscriptions.push(Object(rxjs__WEBPACK_IMPORTED_MODULE_7__["from"])(colorFab.active$)
                    .subscribe((/**
                 * @param {?} value
                 * @return {?}
                 */
                function (value) { return toogleAttribute_1('active', value); })));
                this.subscriptions.push(Object(rxjs__WEBPACK_IMPORTED_MODULE_7__["combineLatest"])(colorFab.color$, colorFab.disabled$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
                 * @param {?} __0
                 * @return {?}
                 */
                function (_a) {
                    var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_2__["__read"])(_a, 2), color = _b[0], disabled = _b[1];
                    return color && disabled ? color.grayScale : color;
                })))
                    .subscribe((/**
                 * @param {?} color
                 * @return {?}
                 */
                function (color) { return _this.element.style.backgroundColor = color ? color.toHex() : ''; })));
            }
            else {
                this.subscriptions.forEach((/**
                 * @param {?} subscription
                 * @return {?}
                 */
                function (subscription) { return subscription.unsubscribe(); }));
                this.subscriptions = [];
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaColorFabComponent.prototype, "tile", {
        get: /**
         * @return {?}
         */
        function () {
            return this._colorFab;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DejaColorFabComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.subscriptions.forEach((/**
         * @param {?} subscription
         * @return {?}
         */
        function (subscription) { return subscription.unsubscribe(); }));
    };
    DejaColorFabComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["Component"], args: [{
                    selector: 'deja-color-fab',
                    template: '<ng-content></ng-content>',
                    styles: [":host{border-radius:50%;cursor:pointer;transition:.2s linear;width:2.5rem;height:2.5rem;display:flex;align-items:center;justify-content:space-around;margin:.45rem}:host[small]{width:1.65rem;height:1.65rem;margin:.3rem}:host[active]{-webkit-transform:scale(1.4,1.4);transform:scale(1.4,1.4);transition:transform .2s linear!important;transition:transform .2s linear,-webkit-transform .2s linear!important}"]
                }] }
    ];
    /** @nocollapse */
    DejaColorFabComponent.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["ElementRef"] }
    ]; };
    DejaColorFabComponent.propDecorators = {
        color: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["Input"] }]
    };
    return DejaColorFabComponent;
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
 * Composant de selection d'une couleur.
 */
var DejaColorSelectorComponent = /** @class */ (function () {
    function DejaColorSelectorComponent(elementRef, _control) {
        var _this = this;
        this._control = _control;
        /**
         * Evénement déclenché lorsqu'une couleur est survolée par la souris.
         */
        this.colorhover = new _angular_core__WEBPACK_IMPORTED_MODULE_4__["EventEmitter"]();
        // ngModel
        this.onTouchedCallback = noop;
        this.onChangeCallback = noop;
        this._colors$ = new rxjs__WEBPACK_IMPORTED_MODULE_7__["BehaviorSubject"]([]);
        this._resetcolor$ = new rxjs__WEBPACK_IMPORTED_MODULE_7__["BehaviorSubject"](null);
        this._colorFabs = (/** @type {?} */ ([]));
        this._subColorFabs = (/** @type {?} */ ([]));
        this._selectedBaseIndex = 0;
        this._disabled = false;
        this.selectedBaseIndex$ = new rxjs__WEBPACK_IMPORTED_MODULE_7__["BehaviorSubject"](0);
        this.selectedSubIndex$ = new rxjs__WEBPACK_IMPORTED_MODULE_7__["BehaviorSubject"](0);
        this.hilightedBaseIndex$ = new rxjs__WEBPACK_IMPORTED_MODULE_7__["Subject"]();
        this.hilightedSubIndex$ = new rxjs__WEBPACK_IMPORTED_MODULE_7__["Subject"]();
        this.isAlive = true;
        /** @type {?} */
        var element = (/** @type {?} */ (elementRef.nativeElement));
        if (this._control) {
            this._control.valueAccessor = this;
        }
        this._colorFabs$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_7__["from"])(this._colors$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} colors
         * @return {?}
         */
        function (colors) { return colors.map((/**
         * @param {?} color
         * @param {?} index
         * @return {?}
         */
        function (color, index) { return new DejaColorFab(color, _this._disabled, index === _this._selectedBaseIndex); })); })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["tap"])((/**
         * @param {?} colorFabs
         * @return {?}
         */
        function (colorFabs) { return _this._colorFabs = colorFabs; })));
        Object(rxjs__WEBPACK_IMPORTED_MODULE_7__["combineLatest"])(this._colors$, this._resetcolor$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["takeWhile"])((/**
         * @return {?}
         */
        function () { return _this.isAlive; })))
            .subscribe((/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_2__["__read"])(_a, 2), colors = _b[0], resetcolor = _b[1];
            if (!colors || !colors.length || !resetcolor) {
                _this._resetcolor = undefined;
                return;
            }
            /** @type {?} */
            var allColors = colors.reduce((/**
             * @param {?} acc
             * @param {?} color
             * @return {?}
             */
            function (acc, color) {
                /** @type {?} */
                var materialColor = (/** @type {?} */ (color));
                if (materialColor.subColors) {
                    acc = Object(tslib__WEBPACK_IMPORTED_MODULE_2__["__spread"])(acc, materialColor.subColors);
                }
                else {
                    acc.push(color);
                }
                return acc;
            }), []);
            /** @type {?} */
            var bestColor;
            allColors.reduce((/**
             * @param {?} bestDiff
             * @param {?} color
             * @return {?}
             */
            function (bestDiff, color) {
                // The best formula we found for our eye
                /** @type {?} */
                var diff = 0.3 * Math.abs(color.r - resetcolor.r) + 0.4 * Math.abs(color.g - resetcolor.g) + 0.25 * Math.abs(color.b - resetcolor.b);
                if (diff < bestDiff) {
                    bestColor = color;
                    return bestDiff = diff;
                }
                return bestDiff;
            }), 3 * 255);
            _this._resetcolor = bestColor;
        }));
        /** @type {?} */
        var hilightedBaseIndex$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_7__["from"])(this.hilightedBaseIndex$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["distinctUntilChanged"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["debounce"])((/**
         * @param {?} colorIndex
         * @return {?}
         */
        function (colorIndex) { return Object(rxjs__WEBPACK_IMPORTED_MODULE_7__["timer"])(colorIndex !== undefined ? 100 : 1000); })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["tap"])((/**
         * @param {?} colorIndex
         * @return {?}
         */
        function (colorIndex) {
            _this.hilightedBaseIndex = colorIndex;
            /** @type {?} */
            var event = (/** @type {?} */ (new CustomEvent('ColorEvent', {})));
            event.color = colorIndex ? _this._colorFabs && _this._colorFabs[colorIndex] && _this._colorFabs[colorIndex].color : _this.value;
            _this.colorhover.emit(event);
        })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} colorIndex
         * @return {?}
         */
        function (colorIndex) { return colorIndex !== undefined ? colorIndex : _this._selectedBaseIndex || 0; })));
        /** @type {?} */
        var selectedBaseIndex$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_7__["from"])(this.selectedBaseIndex$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["tap"])((/**
         * @param {?} colorIndex
         * @return {?}
         */
        function (colorIndex) { return _this._selectedBaseIndex = colorIndex; })));
        this._subColorFabs$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_7__["merge"])(hilightedBaseIndex$, selectedBaseIndex$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["distinctUntilChanged"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["tap"])((/**
         * @param {?} colorIndex
         * @return {?}
         */
        function (colorIndex) {
            if (_this._colorFabs) {
                _this._colorFabs.forEach((/**
                 * @param {?} colorFab
                 * @param {?} index
                 * @return {?}
                 */
                function (colorFab, index) { return colorFab.active = index === colorIndex; }));
            }
        })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["debounceTime"])(100), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["tap"])((/**
         * @return {?}
         */
        function () { return element.setAttribute('sub-tr', ''); })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} baseIndex
         * @return {?}
         */
        function (baseIndex) { return _this._colorFabs && _this._colorFabs[baseIndex] && ((/** @type {?} */ (_this._colorFabs[baseIndex].color))).subColors; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} colors
         * @return {?}
         */
        function (colors) { return colors && colors.map((/**
         * @param {?} color
         * @param {?} index
         * @return {?}
         */
        function (color, index) { return new DejaColorFab(color, _this._disabled, index === _this._selectedSubIndex); })); })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["tap"])((/**
         * @param {?} subColorFabs
         * @return {?}
         */
        function (subColorFabs) {
            _this._subColorFabs = subColorFabs;
            Object(rxjs__WEBPACK_IMPORTED_MODULE_7__["timer"])(100).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["first"])()).subscribe((/**
             * @return {?}
             */
            function () {
                element.removeAttribute('sub-tr');
            }));
        })));
        /** @type {?} */
        var hilightedSubIndex$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_7__["from"])(this.hilightedSubIndex$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["distinctUntilChanged"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["debounce"])((/**
         * @param {?} subColorIndex
         * @return {?}
         */
        function (subColorIndex) { return Object(rxjs__WEBPACK_IMPORTED_MODULE_7__["timer"])(subColorIndex !== undefined ? 200 : 1100); })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["tap"])((/**
         * @param {?} subColorIndex
         * @return {?}
         */
        function (subColorIndex) {
            _this.hilightedSubIndex = subColorIndex;
            /** @type {?} */
            var event = (/** @type {?} */ (new CustomEvent('ColorEvent', {})));
            event.color = subColorIndex !== undefined ? _this._subColorFabs && _this._subColorFabs[subColorIndex] && _this._subColorFabs[subColorIndex].color : _this.value;
            _this.colorhover.emit(event);
        })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} subColorIndex
         * @return {?}
         */
        function (subColorIndex) { return subColorIndex !== undefined ? subColorIndex : _this._selectedSubIndex || 0; })));
        /** @type {?} */
        var selectedSubIndex$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_7__["from"])(this.selectedSubIndex$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["distinctUntilChanged"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["tap"])((/**
         * @param {?} subColorIndex
         * @return {?}
         */
        function (subColorIndex) { return _this._selectedSubIndex = subColorIndex; })));
        Object(rxjs__WEBPACK_IMPORTED_MODULE_7__["merge"])(hilightedSubIndex$, selectedSubIndex$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["takeWhile"])((/**
         * @return {?}
         */
        function () { return _this.isAlive; })))
            .subscribe((/**
         * @param {?} subColorIndex
         * @return {?}
         */
        function (subColorIndex) {
            if (_this._subColorFabs) {
                _this._subColorFabs.forEach((/**
                 * @param {?} colorFab
                 * @param {?} index
                 * @return {?}
                 */
                function (colorFab, index) { return colorFab.active = index === subColorIndex; }));
            }
        }));
        Object(rxjs__WEBPACK_IMPORTED_MODULE_7__["fromEvent"])(element, 'mousemove').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["takeWhile"])((/**
         * @return {?}
         */
        function () { return _this.isAlive; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["filter"])((/**
         * @param {?} _event
         * @return {?}
         */
        function (_event) { return !_this._disabled; })))
            .subscribe((/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            /** @type {?} */
            var target = (/** @type {?} */ (event.target));
            /** @type {?} */
            var targetIndex = ((/** @type {?} */ (target.attributes)))[DejaColorSelectorComponent.indexAttribute];
            if (target.hasAttribute('basecolor')) {
                _this.hilightedBaseIndex$.next(+targetIndex.value);
                _this.hilightedSubIndex$.next(_this.hilightedSubIndex);
            }
            else if (target.hasAttribute('subcolor')) {
                _this.hilightedBaseIndex$.next(_this.hilightedBaseIndex);
                _this.hilightedSubIndex$.next(+targetIndex.value);
            }
            else {
                _this.hilightedBaseIndex$.next();
                _this.hilightedSubIndex$.next();
            }
        }));
        Object(rxjs__WEBPACK_IMPORTED_MODULE_7__["fromEvent"])(element, 'click').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["takeWhile"])((/**
         * @return {?}
         */
        function () { return _this.isAlive; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["filter"])((/**
         * @param {?} _event
         * @return {?}
         */
        function (_event) { return !_this._disabled; })))
            .subscribe((/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            /** @type {?} */
            var target = (/** @type {?} */ (event.target));
            if (target.hasAttribute('basecolor') || target.hasAttribute('subcolor')) {
                _this.value = _deja_js_core__WEBPACK_IMPORTED_MODULE_6__["Color"].parse(target.style.backgroundColor);
            }
        }));
    }
    Object.defineProperty(DejaColorSelectorComponent.prototype, "subColorFabs", {
        get: /**
         * @return {?}
         */
        function () {
            return this._subColorFabs;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaColorSelectorComponent.prototype, "subColorFabs$", {
        get: /**
         * @return {?}
         */
        function () {
            return this._subColorFabs$;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaColorSelectorComponent.prototype, "colorFabs$", {
        get: /**
         * @return {?}
         */
        function () {
            return this._colorFabs$;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaColorSelectorComponent.prototype, "resetcolor", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value === '') {
                value = new _deja_js_core__WEBPACK_IMPORTED_MODULE_6__["Color"]();
            }
            /** @type {?} */
            var color = value && (typeof value === 'string' ? _deja_js_core__WEBPACK_IMPORTED_MODULE_6__["Color"].parse(value) : value);
            this._resetcolor$.next(color || null);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaColorSelectorComponent.prototype, "disabled", {
        get: /**
         * @return {?}
         */
        function () {
            return this._disabled;
        },
        /** Retourne ou definit si le selecteur est desactivé. */
        set: /**
         * Retourne ou definit si le selecteur est desactivé.
         * @param {?} value
         * @return {?}
         */
        function (value) {
            /** @type {?} */
            var disabled = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_3__["coerceBooleanProperty"])(value);
            if (this._colorFabs) {
                this._colorFabs.forEach((/**
                 * @param {?} colorFab
                 * @return {?}
                 */
                function (colorFab) { return colorFab.disabled = disabled; }));
            }
            if (this._subColorFabs) {
                this._subColorFabs.forEach((/**
                 * @param {?} colorFab
                 * @return {?}
                 */
                function (colorFab) { return colorFab.disabled = disabled; }));
            }
            this._disabled = disabled || null;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Retourne la meilleure couleur d'affichage pour une couleur donnée
     */
    /**
     * Retourne la meilleure couleur d'affichage pour une couleur donnée
     * @param {?} value
     * @return {?}
     */
    DejaColorSelectorComponent.prototype.getBestTextColor = /**
     * Retourne la meilleure couleur d'affichage pour une couleur donnée
     * @param {?} value
     * @return {?}
     */
    function (value) {
        /** @type {?} */
        var backColor = _deja_js_core__WEBPACK_IMPORTED_MODULE_6__["Color"].fromHex(value);
        return backColor.bestTextColor.toHex();
    };
    /**
     * @return {?}
     */
    DejaColorSelectorComponent.prototype.resetDefaultColor = /**
     * @return {?}
     */
    function () {
        this.value = this._resetcolor;
    };
    Object.defineProperty(DejaColorSelectorComponent.prototype, "colors", {
        /**
         * Definit les couleurs selectionables affichées.
         *
         * @param colors Structure hierarchique des couleurs selectionablea suivant le modele MaterialColor.
         */
        set: /**
         * Definit les couleurs selectionables affichées.
         *
         * @param {?} colors Structure hierarchique des couleurs selectionablea suivant le modele MaterialColor.
         * @return {?}
         */
        function (colors) {
            this._colors$.next(colors || []);
            this.selectedBaseIndex$.next(0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaColorSelectorComponent.prototype, "selectedColor", {
        set: /**
         * @param {?} color
         * @return {?}
         */
        function (color) {
            var _this = this;
            if (this._colorFabs) {
                /** @type {?} */
                var find = this._colorFabs.find((/**
                 * @param {?} colorFab
                 * @param {?} index
                 * @return {?}
                 */
                function (colorFab, index) {
                    /** @type {?} */
                    var baseColor = (/** @type {?} */ (colorFab.color));
                    /** @type {?} */
                    var subIndex = baseColor.subColors && baseColor.subColors.findIndex((/**
                     * @param {?} subColor
                     * @return {?}
                     */
                    function (subColor) { return _deja_js_core__WEBPACK_IMPORTED_MODULE_6__["Color"].equals(subColor, color); }));
                    if (subIndex !== undefined && subIndex >= 0) {
                        _this.selectedBaseIndex$.next(index);
                        Object(rxjs__WEBPACK_IMPORTED_MODULE_7__["timer"])(1).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["first"])()).subscribe((/**
                         * @return {?}
                         */
                        function () { return _this.selectedSubIndex$.next(subIndex); }));
                        // Break
                        return true;
                    }
                    else if (_deja_js_core__WEBPACK_IMPORTED_MODULE_6__["Color"].equals(baseColor, color)) {
                        _this.selectedBaseIndex$.next(index);
                        Object(rxjs__WEBPACK_IMPORTED_MODULE_7__["timer"])(1).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["first"])()).subscribe((/**
                         * @return {?}
                         */
                        function () { return _this.selectedSubIndex$.next(0); }));
                        // Break
                        return true;
                    }
                    // Continue
                    return false;
                }));
                if (!find) {
                    this.selectedBaseIndex$.next(0);
                    Object(rxjs__WEBPACK_IMPORTED_MODULE_7__["timer"])(1).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["first"])()).subscribe((/**
                     * @return {?}
                     */
                    function () { return _this.selectedSubIndex$.next(0); }));
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaColorSelectorComponent.prototype, "value", {
        // get accessor
        get: 
        // get accessor
        /**
         * @return {?}
         */
        function () {
            return this._value;
        },
        // ************* ControlValueAccessor Implementation **************
        // set accessor including call the onchange callback
        set: 
        // ************* ControlValueAccessor Implementation **************
        // set accessor including call the onchange callback
        /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (!_deja_js_core__WEBPACK_IMPORTED_MODULE_6__["Color"].equals(value, this._value)) {
                this.writeValue(value);
                this.onChangeCallback(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    // From ControlValueAccessor interface
    // From ControlValueAccessor interface
    /**
     * @param {?} value
     * @return {?}
     */
    DejaColorSelectorComponent.prototype.writeValue = 
    // From ControlValueAccessor interface
    /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this._value = value;
        this.selectedColor = value;
    };
    // From ControlValueAccessor interface
    // From ControlValueAccessor interface
    /**
     * @param {?} fn
     * @return {?}
     */
    DejaColorSelectorComponent.prototype.registerOnChange = 
    // From ControlValueAccessor interface
    /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onChangeCallback = fn;
    };
    // From ControlValueAccessor interface
    // From ControlValueAccessor interface
    /**
     * @param {?} fn
     * @return {?}
     */
    DejaColorSelectorComponent.prototype.registerOnTouched = 
    // From ControlValueAccessor interface
    /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onTouchedCallback = fn;
    };
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    DejaColorSelectorComponent.prototype.setDisabledState = /**
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        this.disabled = isDisabled;
    };
    // ************* End of ControlValueAccessor Implementation **************
    // ************* End of ControlValueAccessor Implementation **************
    /**
     * @return {?}
     */
    DejaColorSelectorComponent.prototype.ngOnDestroy = 
    // ************* End of ControlValueAccessor Implementation **************
    /**
     * @return {?}
     */
    function () {
        this.isAlive = false;
    };
    DejaColorSelectorComponent.indexAttribute = 'index';
    DejaColorSelectorComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["Component"], args: [{
                    selector: 'deja-color-selector',
                    template: "<div class=\"colors-wrapper\" id=\"basecolors\">\n\t<deja-color-fab basecolor small *ngFor=\"let clrfab of colorFabs$ | async; let index=index\" [attr.index]=\"index\" [color]=\"clrfab\"></deja-color-fab>\n</div>\n<div class=\"colors-wrapper\" id=\"subcolors\">\n\t<deja-color-fab subcolor *ngFor=\"let clrfab of subColorFabs$ | async; let index=index\" [attr.index]=\"index\" [style.transition-duration]=\"(100*index)+'ms'\" [color]=\"clrfab\"></deja-color-fab>\n</div>\n<div id=\"reset\" *ngIf=\"!!_resetcolor\" (click)=\"resetDefaultColor()\" [style.background-color]=\"_resetcolor.toHex()\">\n\t<mat-icon [style.color]=\"getBestTextColor(_resetcolor.toHex())\">undo</mat-icon>\n</div>",
                    styles: [":host{display:flex;flex-direction:column}:host .colors-wrapper{display:flex;flex-direction:row;align-items:center;justify-content:center;flex-wrap:wrap;margin:1rem .5rem}:host .colors-wrapper deja-color-fab{float:left}:host .colors-wrapper #subcolors deja-color-fab{opacity:1}:host[sub-tr] #subcolors.colors-wrapper deja-color-fab{opacity:0;-webkit-transform:scale(0,0);transform:scale(0,0)}:host #reset{padding:.5rem 0;cursor:pointer;text-align:center}"]
                }] }
    ];
    /** @nocollapse */
    DejaColorSelectorComponent.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["ElementRef"] },
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NgControl"], decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["Self"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["Optional"] }] }
    ]; };
    DejaColorSelectorComponent.propDecorators = {
        colorhover: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["Output"] }],
        resetcolor: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["Input"] }],
        disabled: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["Input"] }],
        colors: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["Input"] }]
    };
    return DejaColorSelectorComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var DejaColorSelectorModule = /** @class */ (function () {
    function DejaColorSelectorModule() {
    }
    DejaColorSelectorModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["NgModule"], args: [{
                    declarations: [DejaColorSelectorComponent, DejaColorFabComponent],
                    exports: [DejaColorSelectorComponent, DejaColorFabComponent],
                    imports: [
                        _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
                        _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormsModule"],
                        _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatIconModule"],
                        _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatButtonModule"]
                    ],
                },] }
    ];
    return DejaColorSelectorModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */



//# sourceMappingURL=deja-js-component-color-selector.js.map

/***/ })

}]);
//# sourceMappingURL=default~circular-picker-circular-picker-demo-module~color-selector-color-selector-demo-module~conten~eec3f76e.js.map