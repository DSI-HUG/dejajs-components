(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["select-select-demo-module"],{

/***/ "./dist/deja-js/component/fesm5/deja-js-component-loaders.js":
/*!*******************************************************************!*\
  !*** ./dist/deja-js/component/fesm5/deja-js-component-loaders.js ***!
  \*******************************************************************/
/*! exports provided: DejaListLoaderModule, DejaListLoaderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DejaListLoaderModule", function() { return DejaListLoaderModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DejaListLoaderComponent", function() { return DejaListLoaderComponent; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");



/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var DejaListLoaderComponent = /** @class */ (function () {
    function DejaListLoaderComponent() {
    }
    DejaListLoaderComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"], args: [{
                    selector: 'deja-list-loader',
                    template: "<div class=\"spinner\">\n    <div class=\"bounce1\"></div>\n    <div class=\"bounce2\"></div>\n    <div class=\"bounce3\"></div>\n</div>\n",
                    styles: [":host .spinner{margin:40px auto 0;width:70px;text-align:center}:host .spinner>div{width:10px;height:10px;border-radius:100%;display:inline-block;-webkit-animation:1.4s ease-in-out infinite both sk-bouncedelay;animation:1.4s ease-in-out infinite both sk-bouncedelay}:host .spinner .bounce1{-webkit-animation-delay:-.32s;animation-delay:-.32s}:host .spinner .bounce2{-webkit-animation-delay:-.16s;animation-delay:-.16s}@-webkit-keyframes sk-bouncedelay{0%,100%,80%{-webkit-transform:scale(0)}40%{-webkit-transform:scale(1)}}@keyframes sk-bouncedelay{0%,100%,80%{-webkit-transform:scale(0);transform:scale(0)}40%{-webkit-transform:scale(1);transform:scale(1)}}"]
                }] }
    ];
    return DejaListLoaderComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var DejaListLoaderModule = /** @class */ (function () {
    function DejaListLoaderModule() {
    }
    DejaListLoaderModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"], args: [{
                    declarations: [DejaListLoaderComponent],
                    exports: [DejaListLoaderComponent],
                    imports: [
                        _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
                    ],
                },] }
    ];
    return DejaListLoaderModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */



//# sourceMappingURL=deja-js-component-loaders.js.map

/***/ }),

/***/ "./dist/deja-js/component/fesm5/deja-js-component-select.js":
/*!******************************************************************!*\
  !*** ./dist/deja-js/component/fesm5/deja-js-component-select.js ***!
  \******************************************************************/
/*! exports provided: DejaSelectModule, DejaSelectComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DejaSelectModule", function() { return DejaSelectModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DejaSelectComponent", function() { return DejaSelectComponent; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _deja_js_component_chips__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @deja-js/component/chips */ "./dist/deja-js/component/fesm5/deja-js-component-chips.js");
/* harmony import */ var _deja_js_component_loaders__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @deja-js/component/loaders */ "./dist/deja-js/component/fesm5/deja-js-component-loaders.js");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/cdk/a11y */ "./node_modules/@angular/cdk/esm5/a11y.es5.js");
/* harmony import */ var _angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/cdk/coercion */ "./node_modules/@angular/cdk/esm5/coercion.es5.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/core */ "./node_modules/@angular/material/esm5/core.es5.js");
/* harmony import */ var _deja_js_component_overlay__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @deja-js/component/overlay */ "./dist/deja-js/component/fesm5/deja-js-component-overlay.js");
/* harmony import */ var _deja_js_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @deja-js/core */ "./dist/deja-js/core/fesm5/deja-js-core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");















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
 * Combo box avec une liste basée sur la treelist
 */
var DejaSelectComponent = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_3__["__extends"])(DejaSelectComponent, _super);
    function DejaSelectComponent(changeDetectorRef, viewPort, fm, elementRef, ngControl, _parentForm, _parentFormGroup, mediaService, _defaultErrorStateMatcher) {
        var _this = _super.call(this, changeDetectorRef, viewPort) || this;
        _this.viewPort = viewPort;
        _this.fm = fm;
        _this.elementRef = elementRef;
        _this.ngControl = ngControl;
        _this._parentForm = _parentForm;
        _this._parentFormGroup = _parentFormGroup;
        _this._defaultErrorStateMatcher = _defaultErrorStateMatcher;
        _this.id = "deja-select-" + DejaSelectComponent.nextId++;
        _this.describedBy = '';
        _this.controlType = 'deja-select';
        _this.errorState = false;
        _this.stateChanges = new rxjs__WEBPACK_IMPORTED_MODULE_12__["Subject"]();
        /**
         * Offset de position horizontal de la zone de dropdown
         */
        _this.overlayOffsetX = 0;
        /**
         * Offset de position vertical de la zone de dropdown
         */
        _this.overlayOffsetY = 0;
        /**
         * Exécuté lorsque le calcul du viewPort est terminé.
         */
        _this.viewPortChanged = new _angular_core__WEBPACK_IMPORTED_MODULE_6__["EventEmitter"]();
        /**
         * Exécuté lorsque l'utilisateur sélectionne ou désélectionne une ligne.
         */
        _this.selectedChange = new _angular_core__WEBPACK_IMPORTED_MODULE_6__["EventEmitter"]();
        /**
         * For test only.
         */
        _this.dropDownVisibleChange = new _angular_core__WEBPACK_IMPORTED_MODULE_6__["EventEmitter"]();
        _this.dropDownMaxHeight = null;
        // NgModel implementation
        _this.onTouchedCallback = noop;
        _this.onChangeCallback = noop;
        _this.onValidatorChangeCallback = noop;
        _this._keyboardNavigation = false;
        _this._waiter = false;
        _this.isMobile = false;
        _this._disabled = null;
        _this._type = 'select';
        _this.dropDownQuery = '';
        _this.filterExpression = '';
        _this._dropdownVisible = false;
        _this.lastScrollPosition = 0;
        _this._selectionClearable = false;
        _this._query = '';
        _this._required = false;
        _this._focused = false;
        _this._readonly = null;
        _this.clearFilterExpression$ = new rxjs__WEBPACK_IMPORTED_MODULE_12__["BehaviorSubject"](null);
        _this.filterListComplete$ = new rxjs__WEBPACK_IMPORTED_MODULE_12__["Subject"]();
        _this.storeScrollPosition$ = new rxjs__WEBPACK_IMPORTED_MODULE_12__["Subject"]();
        _this.hideDropDown$ = new rxjs__WEBPACK_IMPORTED_MODULE_12__["Subject"]();
        _this.showDropDown$ = new rxjs__WEBPACK_IMPORTED_MODULE_12__["Subject"]();
        _this.filter$ = new rxjs__WEBPACK_IMPORTED_MODULE_12__["Subject"]();
        _this.query$ = new rxjs__WEBPACK_IMPORTED_MODULE_12__["BehaviorSubject"]('');
        _this.writeValue$ = new rxjs__WEBPACK_IMPORTED_MODULE_12__["Subject"]();
        _this.contentInitialized$ = new rxjs__WEBPACK_IMPORTED_MODULE_12__["Subject"]();
        _this.keyboardNavigation$ = new rxjs__WEBPACK_IMPORTED_MODULE_12__["Subject"]();
        _this.delaySearchTrigger$ = new rxjs__WEBPACK_IMPORTED_MODULE_12__["BehaviorSubject"](250);
        _this._positions = _deja_js_core__WEBPACK_IMPORTED_MODULE_11__["DejaConnectionPositionPair"].default;
        _this.overlayOwnerElement = _this.elementRef.nativeElement;
        if (_this.ngControl) {
            _this.ngControl.valueAccessor = _this;
        }
        _this.fm.monitor(elementRef.nativeElement, true).subscribe((/**
         * @param {?} origin
         * @return {?}
         */
        function (origin) {
            _this._focused = !!origin;
            _this.stateChanges.next();
        }));
        /** @type {?} */
        var setDropDownVisible = (/**
         * @param {?} state
         * @return {?}
         */
        function (state) {
            if (state !== _this._dropdownVisible) {
                _this._dropdownVisible = state;
                _this.changeDetectorRef.markForCheck();
                _this.dropDownVisibleChange.emit(state);
            }
        });
        mediaService.isMobile$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_13__["takeWhile"])((/**
         * @return {?}
         */
        function () { return _this._isAlive; })))
            .subscribe((/**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            _this.isMobile = value;
            _this.changeDetectorRef.markForCheck();
        }));
        if (_this._parentForm) {
            _this._parentForm.ngSubmit.subscribe((/**
             * @return {?}
             */
            function () {
                _this.changeDetectorRef.markForCheck();
            }));
        }
        if (_this._parentFormGroup) {
            _this._parentFormGroup.ngSubmit.subscribe((/**
             * @return {?}
             */
            function () {
                _this.changeDetectorRef.markForCheck();
            }));
        }
        Object(rxjs__WEBPACK_IMPORTED_MODULE_12__["from"])(_this.clearFilterExpression$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_13__["takeWhile"])((/**
         * @return {?}
         */
        function () { return _this._isAlive; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_13__["debounceTime"])(750))
            .subscribe((/**
         * @return {?}
         */
        function () { return _this.filterExpression = ''; }));
        Object(rxjs__WEBPACK_IMPORTED_MODULE_12__["combineLatest"])(_this.delaySearchTrigger$, _this.filterListComplete$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_13__["takeWhile"])((/**
         * @return {?}
         */
        function () { return _this._isAlive; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_13__["debounce"])((/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_3__["__read"])(_a, 1), delaySearchTrigger = _b[0];
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_12__["timer"])(delaySearchTrigger);
        })))
            .subscribe((/**
         * @return {?}
         */
        function () {
            _this._itemList = [];
            _this.reshowDropDown();
        }));
        Object(rxjs__WEBPACK_IMPORTED_MODULE_12__["from"])(_this.storeScrollPosition$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_13__["takeWhile"])((/**
         * @return {?}
         */
        function () { return _this._isAlive; })))
            .subscribe((/**
         * @param {?} scrollPos
         * @return {?}
         */
        function (scrollPos) {
            _this.viewPort.scrollPosition$.next(scrollPos);
            _this.lastScrollPosition = scrollPos;
        }));
        Object(rxjs__WEBPACK_IMPORTED_MODULE_12__["from"])(_this.hideDropDown$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_13__["takeWhile"])((/**
         * @return {?}
         */
        function () { return _this._isAlive; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_13__["filter"])((/**
         * @return {?}
         */
        function () { return _this.dropdownVisible; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_13__["delayWhen"])((/**
         * @param {?} time
         * @return {?}
         */
        function (time) { return Object(rxjs__WEBPACK_IMPORTED_MODULE_12__["timer"])(time || 0); })))
            .subscribe((/**
         * @return {?}
         */
        function () {
            delete _this.selectingItemIndex;
            setDropDownVisible(false);
            _this.viewPort.element$.next(null);
            _this.changeDetectorRef.markForCheck();
        }));
        Object(rxjs__WEBPACK_IMPORTED_MODULE_12__["from"])(_this.showDropDown$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_13__["takeWhile"])((/**
         * @return {?}
         */
        function () { return _this._isAlive; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_13__["debounceTime"])(50), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_13__["filter"])((/**
         * @return {?}
         */
        function () { return (_this.query || '').length >= _this.minSearchlength && !_this._readonly; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_13__["tap"])((/**
         * @return {?}
         */
        function () {
            // Set overlay origin element
            /** @type {?} */
            var originElement = (_this.isMobile && document.body) || _this.htmlInputElement || _this.elementRef.nativeElement;
            // Calc max height
            if (_this.isMobile) {
                _this.dropDownMaxHeight = document.body.clientHeight;
            }
            else if (_this.maxHeight) {
                _this.dropDownMaxHeight = _this.maxHeight;
            }
            else {
                /** @type {?} */
                var originRect = originElement.getBoundingClientRect();
                /** @type {?} */
                var maxHeight = document.body.clientHeight;
                _this.dropDownMaxHeight = Math.max(originRect.top, maxHeight - originRect.bottom, 25) - 25;
            }
            // Ensure dropDowsQuery if autocomplete and minSearchLength
            if (!_this.dropDownQuery && _this.isModeAutocomplete && _this.minSearchlength > 0 && _this.query && _this.query.length > _this.minSearchlength) {
                _this.dropDownQuery = _this.query;
            }
            // Display overlay
            setDropDownVisible(true);
            _this.changeDetectorRef.markForCheck();
        })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_13__["delay"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_13__["filter"])((/**
         * @return {?}
         */
        function () { return _this.dropdownVisible; })), // Show canceled by the hide$ observable if !dropdownVisible
        Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_13__["switchMap"])((/**
         * @return {?}
         */
        function () { return _this.calcViewList$(); })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_13__["tap"])((/**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var selectedItems = _this.getSelectedItems();
            /** @type {?} */
            var firstItem = selectedItems && selectedItems[0];
            /** @type {?} */
            var index = firstItem ? _this.getItemIndex(firstItem) : -1;
            if (index >= 0) {
                // Ensure selection
                _this.setSelectedItems(selectedItems);
                _this.currentItemIndex = index;
                _this.ensureItemVisible(index);
            }
            else {
                // Restore scroll Position
                _this.ensureItemVisible(null);
                _this.listElement.scrollTop = _this.lastScrollPosition;
            }
        })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_13__["delay"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_13__["filter"])((/**
         * @return {?}
         */
        function () { return _this.dropdownVisible; })), // Show canceled by the hide$ observable if !dropdownVisible
        Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_13__["tap"])((/**
         * @return {?}
         */
        function () {
            _this.viewPort.element$.next(_this.listElement);
        })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_13__["delay"])(1)).subscribe((/**
         * @return {?}
         */
        function () {
            // View port calculated
            _this.overlay.updatePosition();
        }));
        Object(rxjs__WEBPACK_IMPORTED_MODULE_12__["from"])(_this.keyboardNavigation$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_13__["takeWhile"])((/**
         * @return {?}
         */
        function () { return _this._isAlive; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_13__["tap"])((/**
         * @return {?}
         */
        function () { return _this._keyboardNavigation = true; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_13__["debounceTime"])(1000))
            .subscribe((/**
         * @return {?}
         */
        function () {
            _this._keyboardNavigation = false;
            _this.changeDetectorRef.markForCheck();
        }));
        Object(rxjs__WEBPACK_IMPORTED_MODULE_12__["from"])(_this.query$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_13__["takeWhile"])((/**
         * @return {?}
         */
        function () { return _this._isAlive; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_13__["tap"])((/**
         * @param {?} query
         * @return {?}
         */
        function (query) { return _this._query = query; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_13__["filter"])((/**
         * @return {?}
         */
        function () { return !!_this.input; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_13__["delay"])(1))
            .subscribe((/**
         * @return {?}
         */
        function () {
            // **** Force place holder to refresh to escape input angular material issue ****
            _this.changeDetectorRef.markForCheck();
        }));
        Object(rxjs__WEBPACK_IMPORTED_MODULE_12__["combineLatest"])(_this.writeValue$, _this.contentInitialized$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_13__["takeWhile"])((/**
         * @return {?}
         */
        function () { return _this._isAlive; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_13__["map"])((/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_3__["__read"])(_a, 1), value = _b[0];
            return value;
        })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_13__["tap"])((/**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (_this.modelIsValue === undefined) {
                if (value instanceof Array) {
                    /** @type {?} */
                    var av = value || [];
                    /** @type {?} */
                    var modelType = av.length && typeof av[0];
                    _this.modelIsValue = modelType && modelType === 'string' || modelType === 'number';
                }
                else {
                    /** @type {?} */
                    var modelType = typeof value;
                    _this.modelIsValue = value === '' || modelType === 'string' || modelType === 'number';
                }
            }
            if (_this.modelIsValue) {
                _this.query = '';
            }
            return value;
        })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_13__["map"])((/**
         * @param {?} value
         * @return {?}
         */
        function (value) { return _this.getVirtualSelectedEntities(value); })))
            .subscribe((/**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (!value) {
                if (_this.selectedItems && _this.selectedItems.length) {
                    _this.removeSelection();
                }
                return;
            }
            if (_this._multiSelect) {
                _this.query = '';
                _super.prototype.setSelectedModels.call(_this, value);
                _super.prototype.getItemListService.call(_this).ensureSelection();
                _this.changeDetectorRef.markForCheck();
            }
            else {
                /** @type {?} */
                var v = value instanceof Array ? [value[0]] : [value];
                /** @type {?} */
                var item_1 = _super.prototype.mapToIItemBase.call(_this, v)[0];
                _this.unselectAll$().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_13__["switchMap"])((/**
                 * @return {?}
                 */
                function () { return item_1 ? _this.toggleSelect$([item_1], true) : []; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_13__["map"])((/**
                 * @return {?}
                 */
                function () { return _super.prototype.getItemListService.call(_this).ensureSelection(); })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_13__["tap"])((/**
                 * @return {?}
                 */
                function () { return _this.ensureSelection(); })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_13__["first"])())
                    .subscribe((/**
                 * @return {?}
                 */
                function () { return _this.changeDetectorRef.markForCheck(); }));
            }
        }));
        _this._viewPortChanged = _this.viewPortChanged;
        _this.maxHeight = 0;
        return _this;
    }
    Object.defineProperty(DejaSelectComponent.prototype, "shouldLabelFloat", {
        get: /**
         * @return {?}
         */
        function () {
            return this.focused || !this.empty;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaSelectComponent.prototype, "positions", {
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
            this._positions = typeof value === 'string' ? _deja_js_core__WEBPACK_IMPORTED_MODULE_11__["DejaConnectionPositionPair"].parse(value) : value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaSelectComponent.prototype, "dropDownWidth", {
        get: /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var element = this.elementRef && (/** @type {?} */ (this.elementRef.nativeElement));
            return this._dropDownWidth || element.clientWidth;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._dropDownWidth = value && (typeof value === 'string' ? value : value + "px");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaSelectComponent.prototype, "keyboardNavigation", {
        get: /**
         * @return {?}
         */
        function () {
            return this._keyboardNavigation;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaSelectComponent.prototype, "required", {
        get: /**
         * @return {?}
         */
        function () {
            return this._required;
        },
        set: /**
         * @param {?} req
         * @return {?}
         */
        function (req) {
            this._required = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_5__["coerceBooleanProperty"])(req);
            this.stateChanges.next();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaSelectComponent.prototype, "placeholder", {
        /**
         * Placeholder of the input
         */
        get: /**
         * Placeholder of the input
         * @return {?}
         */
        function () {
            return this._placeholder;
        },
        set: /**
         * @param {?} plh
         * @return {?}
         */
        function (plh) {
            this._placeholder = plh;
            this.stateChanges.next();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaSelectComponent.prototype, "empty", {
        get: /**
         * @return {?}
         */
        function () {
            return !this.value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaSelectComponent.prototype, "focused", {
        get: /**
         * @return {?}
         */
        function () {
            return this._focused;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaSelectComponent.prototype, "options", {
        set: /**
         * @param {?} options
         * @return {?}
         */
        function (options) {
            if (!this.items && options && options.length) {
                /** @type {?} */
                var selectedModels_1 = (/** @type {?} */ ([]));
                this.valueField = 'value';
                this.textField = 'text';
                /** @type {?} */
                var models = options.map((/**
                 * @param {?} option
                 * @return {?}
                 */
                function (option) {
                    /** @type {?} */
                    var model = {
                        text: option.text,
                        value: option.value,
                    };
                    if (option.selected) {
                        selectedModels_1.push(model);
                    }
                    return model;
                }));
                this.models = models;
                if (selectedModels_1.length) {
                    this.selectedModels = selectedModels_1;
                }
                if (models.length > 100) {
                    // tslint:disable-next-line:no-debugger
                    console.error('Select options with more than 100 items can have performance options. Please bind directly the items in code behind with items or models input.');
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaSelectComponent.prototype, "query", {
        get: /**
         * @return {?}
         */
        function () {
            return this._query;
        },
        /** Correspond au model du champ de filtrage ou recherche */
        set: /**
         * Correspond au model du champ de filtrage ou recherche
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.query$.next(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaSelectComponent.prototype, "delaySearchTrigger", {
        /** Temps d'attente en ms avant que la recherche dans la liste soit lancée lorsque l'utilisateur tape dans le select */
        set: /**
         * Temps d'attente en ms avant que la recherche dans la liste soit lancée lorsque l'utilisateur tape dans le select
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.delaySearchTrigger$.next(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaSelectComponent.prototype, "minSearchlength", {
        get: /**
         * @return {?}
         */
        function () {
            return this._minSearchLength;
        },
        /** Définit la longueur minimale de caractères dans le champ de recherche avant que la recherche ou le filtrage soient effectués */
        set: /**
         * Définit la longueur minimale de caractères dans le champ de recherche avant que la recherche ou le filtrage soient effectués
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._minSearchLength = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaSelectComponent.prototype, "disabled", {
        get: /**
         * @return {?}
         */
        function () {
            return this.ngControl ? this.ngControl.disabled : this._disabled;
        },
        /** Permet de désactiver le select */
        set: /**
         * Permet de désactiver le select
         * @param {?} value
         * @return {?}
         */
        function (value) {
            /** @type {?} */
            var disabled = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_5__["coerceBooleanProperty"])(value);
            this._disabled = disabled || null;
            this.changeDetectorRef.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaSelectComponent.prototype, "selectionClearable", {
        get: /**
         * @return {?}
         */
        function () {
            return this._selectionClearable;
        },
        /** Indique ou détermine si le bouton pour effacer la selection doit être affiché */
        set: /**
         * Indique ou détermine si le bouton pour effacer la selection doit être affiché
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._selectionClearable = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_5__["coerceBooleanProperty"])(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaSelectComponent.prototype, "hideSelected", {
        /** Renvoie une valeur indiquant si les éléments selectionés doivent être masqué de la liste déroulante. */
        get: /**
         * Renvoie une valeur indiquant si les éléments selectionés doivent être masqué de la liste déroulante.
         * @return {?}
         */
        function () {
            return this._hideSelected;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.setHideSelected(Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_5__["coerceBooleanProperty"])(value));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaSelectComponent.prototype, "currentItem", {
        /** Définit la ligne courant ou ligne active */
        set: /**
         * Définit la ligne courant ou ligne active
         * @param {?} item
         * @return {?}
         */
        function (item) {
            _super.prototype.setCurrentItem.call(this, item);
            if (item) {
                this.ensureItemVisible(item);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaSelectComponent.prototype, "pageSize", {
        /** Retourne le nombre de lignes à sauter en cas de pression sur les touches PageUp ou PageDown */
        get: /**
         * Retourne le nombre de lignes à sauter en cas de pression sur les touches PageUp ou PageDown
         * @return {?}
         */
        function () {
            if (this._pageSize === 0) {
                /** @type {?} */
                var vpRowHeight = this.getViewPortRowHeight();
                /** @type {?} */
                var containerElement = this.listElement;
                /** @type {?} */
                var containerHeight = containerElement && containerElement.clientHeight || this.dropDownMaxHeight;
                return Math.floor(containerHeight / vpRowHeight);
            }
            return this._pageSize;
        },
        /** Définit le nombre de lignes à sauter en cas de pression sur les touches PageUp ou PageDown */
        set: /**
         * Définit le nombre de lignes à sauter en cas de pression sur les touches PageUp ou PageDown
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._pageSize = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_5__["coerceNumberProperty"])(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaSelectComponent.prototype, "hintLabel", {
        /** Retourne un texte de conseil en cas d'erreur de validation ou autre */
        get: /**
         * Retourne un texte de conseil en cas d'erreur de validation ou autre
         * @return {?}
         */
        function () {
            return this._hintLabel;
        },
        /** Définit un texte de conseil en cas d'erreur de validation ou autre */
        set: /**
         * Définit un texte de conseil en cas d'erreur de validation ou autre
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.setHintLabel(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaSelectComponent.prototype, "viewPortRowHeight", {
        /** Définit la hauteur d'une ligne pour le calcul du viewport en pixels (la valeur par défaut sera utilisée si aucune valeur n'est définie). */
        set: /**
         * Définit la hauteur d'une ligne pour le calcul du viewport en pixels (la valeur par défaut sera utilisée si aucune valeur n'est définie).
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.setViewPortRowHeight(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaSelectComponent.prototype, "viewportMode", {
        /**
         * Les trois valeurs acceptés en paramètre se trouvent dans l'enum ViewportMode (disabled, fixed, variable, auto)
         * Attention, une désactivation du viewport dégrade considérablement les performances de la liste et ne doit pas être activée si la liste
         * est suceptible de contenir beaucoup d'éléments.
         */
        set: /**
         * Les trois valeurs acceptés en paramètre se trouvent dans l'enum ViewportMode (disabled, fixed, variable, auto)
         * Attention, une désactivation du viewport dégrade considérablement les performances de la liste et ne doit pas être activée si la liste
         * est suceptible de contenir beaucoup d'éléments.
         * @param {?} mode
         * @return {?}
         */
        function (mode) {
            this.setViewportMode(mode);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaSelectComponent.prototype, "childrenField", {
        /** Définit le champ utilisé pour la liste des enfants d'un parent */
        get: /**
         * Définit le champ utilisé pour la liste des enfants d'un parent
         * @return {?}
         */
        function () {
            return this._childrenField;
        },
        /** Retourne le champ utilisé pour la liste des enfants d'un parent */
        set: /**
         * Retourne le champ utilisé pour la liste des enfants d'un parent
         * @param {?} value
         * @return {?}
         */
        function (value) {
            _super.prototype.setChildrenField.call(this, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaSelectComponent.prototype, "textField", {
        /** Retourne le champ à utiliser comme valeur d'affichage. */
        get: /**
         * Retourne le champ à utiliser comme valeur d'affichage.
         * @return {?}
         */
        function () {
            return _super.prototype.getTextField.call(this);
        },
        /** Définit le champ à utiliser comme valeur d'affichage. */
        set: /**
         * Définit le champ à utiliser comme valeur d'affichage.
         * @param {?} value
         * @return {?}
         */
        function (value) {
            _super.prototype.setTextField.call(this, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaSelectComponent.prototype, "valueField", {
        /** Retourne le champ à utiliser comme valeur de comparaison. */
        get: /**
         * Retourne le champ à utiliser comme valeur de comparaison.
         * @return {?}
         */
        function () {
            return _super.prototype.getValueField.call(this);
        },
        /** Définit le champ à utiliser comme valeur de comparaison. */
        set: /**
         * Définit le champ à utiliser comme valeur de comparaison.
         * @param {?} value
         * @return {?}
         */
        function (value) {
            _super.prototype.setValueField.call(this, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaSelectComponent.prototype, "searchField", {
        /** Retourne le champ à utiliser comme champ de recherche.
         * Ce champ peut indiquer, un champ contenant une valeur, un texte indexé, ou une fonction.
         */
        get: /**
         * Retourne le champ à utiliser comme champ de recherche.
         * Ce champ peut indiquer, un champ contenant une valeur, un texte indexé, ou une fonction.
         * @return {?}
         */
        function () {
            return this._searchField;
        },
        /** Définit le champ à utiliser comme champ de recherche.
         * Ce champ peut indiquer, un champ contenant une valeur, un texte indexé, ou une fonction.
         */
        set: /**
         * Définit le champ à utiliser comme champ de recherche.
         * Ce champ peut indiquer, un champ contenant une valeur, un texte indexé, ou une fonction.
         * @param {?} value
         * @return {?}
         */
        function (value) {
            _super.prototype.setSearchField.call(this, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaSelectComponent.prototype, "type", {
        get: /**
         * @return {?}
         */
        function () {
            return this._type;
        },
        set: /**
         * @param {?} type
         * @return {?}
         */
        function (type) {
            if (type !== 'autocomplete' && type !== 'multiselect' && type !== 'select') {
                throw new Error('Invalid type property for DejaSelectComponent. Type can be select, autocomplete or multiselect.');
            }
            this._type = type;
            this.setMultiSelect(this._type === 'multiselect');
            this.changeDetectorRef.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaSelectComponent.prototype, "loadingItems", {
        /**
         * Set an observable called before the list will be displayed
         */
        set: /**
         * Set an observable called before the list will be displayed
         * @param {?} fn
         * @return {?}
         */
        function (fn) {
            _super.prototype.setLoadingItems.call(this, fn);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaSelectComponent.prototype, "selectingItem", {
        /**
         * Set a promise or an observable called before an item selection
         */
        set: /**
         * Set a promise or an observable called before an item selection
         * @param {?} fn
         * @return {?}
         */
        function (fn) {
            _super.prototype.setSelectingItem.call(this, fn);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaSelectComponent.prototype, "unselectingItem", {
        /**
         * Set a promise or an observable called before an item deselection
         */
        set: /**
         * Set a promise or an observable called before an item deselection
         * @param {?} fn
         * @return {?}
         */
        function (fn) {
            _super.prototype.setUnselectingItem.call(this, fn);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaSelectComponent.prototype, "expandingItem", {
        /**
         * Set a promise or an observable called before an item expand
         */
        set: /**
         * Set a promise or an observable called before an item expand
         * @param {?} fn
         * @return {?}
         */
        function (fn) {
            _super.prototype.setExpandingItem.call(this, fn);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaSelectComponent.prototype, "collapsingItem", {
        /**
         * Set a promise or an observable called before an item collapse
         */
        set: /**
         * Set a promise or an observable called before an item collapse
         * @param {?} fn
         * @return {?}
         */
        function (fn) {
            _super.prototype.setCollapsingItem.call(this, fn);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaSelectComponent.prototype, "isModeSelect", {
        /** Retourne si le select est en mode select, donc en lecture seule. */
        get: /**
         * Retourne si le select est en mode select, donc en lecture seule.
         * @return {?}
         */
        function () {
            return this._type === 'select';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaSelectComponent.prototype, "isModeAutocomplete", {
        /** Retourne si le select est en mode autocomplete */
        get: /**
         * Retourne si le select est en mode autocomplete
         * @return {?}
         */
        function () {
            return this._type === 'autocomplete';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaSelectComponent.prototype, "selectedItems", {
        /** Retourne la liste des éléments selectionés en mode multiselect */
        get: /**
         * Retourne la liste des éléments selectionés en mode multiselect
         * @return {?}
         */
        function () {
            return _super.prototype.getSelectedItems.call(this);
        },
        /** Définit la liste des éléments selectionés en mode multiselect */
        set: /**
         * Définit la liste des éléments selectionés en mode multiselect
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.setSelectedItems(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaSelectComponent.prototype, "selectedItem", {
        /** Retourne l'élément selectioné en mode single select */
        get: /**
         * Retourne l'élément selectioné en mode single select
         * @return {?}
         */
        function () {
            /** @type {?} */
            var selectedItem = _super.prototype.getSelectedItems.call(this);
            return selectedItem && selectedItem[0];
        },
        /** Définit l'éléments selectioné en mode single select */
        set: /**
         * Définit l'éléments selectioné en mode single select
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.setSelectedItems(value !== undefined && value !== null ? [value] : []);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaSelectComponent.prototype, "selectedModel", {
        /** Retourne le model selectioné en mode single select */
        get: /**
         * Retourne le model selectioné en mode single select
         * @return {?}
         */
        function () {
            /** @type {?} */
            var selectedModel = _super.prototype.getSelectedModels.call(this);
            return selectedModel && selectedModel[0];
        },
        /** Définit le model selectioné en mode single select */
        set: /**
         * Définit le model selectioné en mode single select
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.writeValue(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaSelectComponent.prototype, "selectedModels", {
        /** Retourne la liste des models selectionés en mode multiselect */
        get: /**
         * Retourne la liste des models selectionés en mode multiselect
         * @return {?}
         */
        function () {
            return _super.prototype.getSelectedModels.call(this);
        },
        /** Définit la liste des models selectionés en mode multiselect */
        set: /**
         * Définit la liste des models selectionés en mode multiselect
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.writeValue(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaSelectComponent.prototype, "itemListService", {
        /** Retourne le service de liste utilisé par ce composant. Ce service permet de controller dynamiquement la liste, ou de faire du lazyloading. */
        get: /**
         * Retourne le service de liste utilisé par ce composant. Ce service permet de controller dynamiquement la liste, ou de faire du lazyloading.
         * @return {?}
         */
        function () {
            return this.getItemListService();
        },
        /** Definit le service de liste utilisé par ce composant. Ce service permet de controller dynamiquement la liste, ou de faire du lazyloading. */
        set: /**
         * Definit le service de liste utilisé par ce composant. Ce service permet de controller dynamiquement la liste, ou de faire du lazyloading.
         * @param {?} itemListService
         * @return {?}
         */
        function (itemListService) {
            this.setItemListService(itemListService);
            if (itemListService && itemListService.lastQuery) {
                this.query = itemListService.lastQuery.toString();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaSelectComponent.prototype, "sortingService", {
        /** Definit le service utilisé pour le tri de la liste */
        set: /**
         * Definit le service utilisé pour le tri de la liste
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.setSortingService(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaSelectComponent.prototype, "groupingService", {
        /** Definit le service utilisé pour le regroupement de la liste */
        set: /**
         * Definit le service utilisé pour le regroupement de la liste
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.setGroupingService(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaSelectComponent.prototype, "waiter", {
        /** Retourne si le waiter doit être affiché dans le select. */
        get: /**
         * Retourne si le waiter doit être affiché dans le select.
         * @return {?}
         */
        function () { return this._waiter; },
        /** Definit si le waiter doit être affiché dans le select. */
        set: /**
         * Definit si le waiter doit être affiché dans le select.
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._waiter = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaSelectComponent.prototype, "items", {
        /** Définit la liste des éléments au format IItemBase */
        set: /**
         * Définit la liste des éléments au format IItemBase
         * @param {?} items
         * @return {?}
         */
        function (items) {
            var _this = this;
            _super.prototype.setItems$.call(this, items).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_13__["first"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_13__["tap"])((/**
             * @return {?}
             */
            function () { return _this.ensureSelection(); })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_13__["switchMap"])((/**
             * @return {?}
             */
            function () { return _this.calcViewList$(); })))
                .subscribe(noop);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaSelectComponent.prototype, "models", {
        /** Définit la liste des éléments (tout type d'objet métier) */
        set: /**
         * Définit la liste des éléments (tout type d'objet métier)
         * @param {?} items
         * @return {?}
         */
        function (items) {
            var _this = this;
            _super.prototype.setModels$.call(this, items).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_13__["first"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_13__["tap"])((/**
             * @return {?}
             */
            function () { return _this.ensureSelection(); })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_13__["switchMap"])((/**
             * @return {?}
             */
            function () { return _this.calcViewList$(); })))
                .subscribe(noop);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaSelectComponent.prototype, "depthMax", {
        /** Retourne le nombre de niveau pour une liste hierarchique */
        get: /**
         * Retourne le nombre de niveau pour une liste hierarchique
         * @return {?}
         */
        function () { return this._depthMax; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaSelectComponent.prototype, "maxHeight", {
        /** Retourne la hauteur maximum avant que le composant affiche une scrollbar
         * spécifier une grande valeur pour ne jamais afficher de scrollbar
         * Spécifier 0 pour que le composant determine sa hauteur à partir du container
         */
        get: /**
         * Retourne la hauteur maximum avant que le composant affiche une scrollbar
         * spécifier une grande valeur pour ne jamais afficher de scrollbar
         * Spécifier 0 pour que le composant determine sa hauteur à partir du container
         * @return {?}
         */
        function () {
            return this.getMaxHeight();
        },
        /** Définit la hauteur maximum avant que le composant affiche une scrollbar
         * spécifier une grande valeur pour ne jamais afficher de scrollbar
         * Spécifier 0 pour que le composant determine sa hauteur à partir du container
         */
        set: /**
         * Définit la hauteur maximum avant que le composant affiche une scrollbar
         * spécifier une grande valeur pour ne jamais afficher de scrollbar
         * Spécifier 0 pour que le composant determine sa hauteur à partir du container
         * @param {?} value
         * @return {?}
         */
        function (value) {
            _super.prototype.setMaxHeight.call(this, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaSelectComponent.prototype, "readonly", {
        /** Retourne une valeur indiquant si le composant est en lecture seule */
        get: /**
         * Retourne une valeur indiquant si le composant est en lecture seule
         * @return {?}
         */
        function () {
            return this._readonly;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            /** @type {?} */
            var readonly = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_5__["coerceBooleanProperty"])(value);
            this._readonly = readonly || null;
            this.changeDetectorRef.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaSelectComponent.prototype, "inputValidatorDirective", {
        set: /**
         * @protected
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value) {
                value.parentControl = this.ngControl;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaSelectComponent.prototype, "currentItemIndex", {
        get: /**
         * @private
         * @return {?}
         */
        function () {
            return this.getCurrentItemIndex();
        },
        set: /**
         * @private
         * @param {?} value
         * @return {?}
         */
        function (value) {
            _super.prototype.setCurrentItemIndex.call(this, value);
            this.changeDetectorRef.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaSelectComponent.prototype, "itemTemplate", {
        get: /**
         * @return {?}
         */
        function () {
            return this.itemTemplateExternal || this.itemTemplateInternal;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaSelectComponent.prototype, "parentItemTemplate", {
        get: /**
         * @return {?}
         */
        function () {
            return this.parentItemTemplateExternal || this.parentItemTemplateInternal;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaSelectComponent.prototype, "htmlInputElement", {
        get: /**
         * @private
         * @return {?}
         */
        function () {
            return this.inputElement && (/** @type {?} */ (this.inputElement.nativeElement));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaSelectComponent.prototype, "loaderTemplate", {
        get: /**
         * @return {?}
         */
        function () {
            return this.loaderTemplateExternal || this.loaderTemplateInternal;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaSelectComponent.prototype, "dropdownVisible", {
        get: /**
         * @return {?}
         */
        function () {
            return this._dropdownVisible;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaSelectComponent.prototype, "value", {
        // ************* ControlValueAccessor Implementation **************
        get: 
        // ************* ControlValueAccessor Implementation **************
        /**
         * @return {?}
         */
        function () {
            return this._multiSelect ? this.selectedItems : this.selectedItem;
        },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            this.writeValue(val);
            this.onChangeCallback(val);
            this.onTouchedCallback();
            this.stateChanges.next();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} value
     * @return {?}
     */
    DejaSelectComponent.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.writeValue$.next(value);
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    DejaSelectComponent.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onChangeCallback = fn;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    DejaSelectComponent.prototype.registerOnTouched = /**
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
    DejaSelectComponent.prototype.setDisabledState = /**
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
    DejaSelectComponent.prototype.ngDoCheck = 
    // ************* End of ControlValueAccessor Implementation **************
    /**
     * @return {?}
     */
    function () {
        if (this.ngControl) {
            this.updateErrorState();
        }
    };
    /**
     * @return {?}
     */
    DejaSelectComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.stateChanges.complete();
        this.fm.stopMonitoring(this.elementRef.nativeElement);
    };
    /**
     * @return {?}
     */
    DejaSelectComponent.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.contentInitialized$.next(true);
        if (this.ngControl) {
            this.ngControl.valueChanges.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_13__["filter"])((/**
             * @return {?}
             */
            function () { return !!_this.input; })))
                .subscribe((/**
             * @return {?}
             */
            function () {
                if (_this.ngControl.touched) {
                    _this.input.ngControl.control.markAsTouched();
                }
                _this.input.ngControl.control.updateValueAndValidity();
            }));
        }
        this.overlayOwnerElement = (/** @type {?} */ (this.elementRef.nativeElement));
        if (this.overlayOwnerElement.parentElement.className.indexOf('mat-form-field-infix') >= 0) {
            this.overlayOwnerElement = this.overlayOwnerElement.parentElement;
        }
    };
    /**
     * @return {?}
     */
    DejaSelectComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        Object(rxjs__WEBPACK_IMPORTED_MODULE_12__["fromEvent"])(this.htmlInputElement, 'click').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_13__["takeWhile"])((/**
         * @return {?}
         */
        function () { return _this._isAlive; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_13__["filter"])((/**
         * @return {?}
         */
        function () { return !_this.dropdownVisible && !_this.disabled; })))
            .subscribe((/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            if (_this.isModeSelect) {
                _this.showDropDown();
            }
            else {
                _this.htmlInputElement.select();
                _this.filter$.next(event);
            }
        }));
        Object(rxjs__WEBPACK_IMPORTED_MODULE_12__["fromEvent"])(this.htmlInputElement, 'focus').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_13__["takeWhile"])((/**
         * @return {?}
         */
        function () { return _this._isAlive; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_13__["filter"])((/**
         * @return {?}
         */
        function () { return !_this.dropdownVisible && !_this.disabled; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_13__["delay"])(10), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_13__["filter"])((/**
         * @return {?}
         */
        function () { return _this.htmlInputElement === document.activeElement; })))
            .subscribe((/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            if (_this.isModeSelect) {
                _this.showDropDown();
            }
            else {
                // Autocomplete
                _this.filter$.next(event);
            }
        }));
        Object(rxjs__WEBPACK_IMPORTED_MODULE_12__["fromEvent"])(this.htmlInputElement, 'blur').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_13__["takeWhile"])((/**
         * @return {?}
         */
        function () { return _this._isAlive; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_13__["filter"])((/**
         * @return {?}
         */
        function () { return _this.selectingItemIndex === undefined; })))
            .subscribe((/**
         * @return {?}
         */
        function () {
            _this.onTouchedCallback();
            _this.hideDropDown$.next(10);
        }));
        Object(rxjs__WEBPACK_IMPORTED_MODULE_12__["merge"])(Object(rxjs__WEBPACK_IMPORTED_MODULE_12__["fromEvent"])(this.htmlInputElement, 'keydown'), Object(rxjs__WEBPACK_IMPORTED_MODULE_12__["fromEvent"])(this.elementRef.nativeElement, 'keydown')).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_13__["takeWhile"])((/**
         * @return {?}
         */
        function () { return _this._isAlive; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_13__["filter"])((/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            if (event.defaultPrevented) {
                return false;
            }
            /** @type {?} */
            var keyCode = event.keyCode || ((/** @type {?} */ (_deja_js_core__WEBPACK_IMPORTED_MODULE_11__["KeyCodes"])))[event.code];
            return keyCode === _deja_js_core__WEBPACK_IMPORTED_MODULE_11__["KeyCodes"].Home ||
                keyCode === _deja_js_core__WEBPACK_IMPORTED_MODULE_11__["KeyCodes"].End ||
                keyCode === _deja_js_core__WEBPACK_IMPORTED_MODULE_11__["KeyCodes"].PageUp ||
                keyCode === _deja_js_core__WEBPACK_IMPORTED_MODULE_11__["KeyCodes"].PageDown ||
                keyCode === _deja_js_core__WEBPACK_IMPORTED_MODULE_11__["KeyCodes"].UpArrow ||
                keyCode === _deja_js_core__WEBPACK_IMPORTED_MODULE_11__["KeyCodes"].DownArrow ||
                keyCode === _deja_js_core__WEBPACK_IMPORTED_MODULE_11__["KeyCodes"].Space ||
                keyCode === _deja_js_core__WEBPACK_IMPORTED_MODULE_11__["KeyCodes"].Enter;
        })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_13__["switchMap"])((/**
         * @param {?} event
         * @return {?}
         */
        function (event) { return _this.ensureListCaches$().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_13__["map"])((/**
         * @return {?}
         */
        function () { return event; }))); })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_13__["map"])((/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            // Set and get current index for keyboard features only
            /** @type {?} */
            var setCurrentIndex = (/**
             * @param {?} index
             * @param {?=} item
             * @return {?}
             */
            function (index, item) {
                _this.currentItemIndex = index;
                if (_this.dropdownVisible) {
                    _this.ensureItemVisible(_this.currentItemIndex);
                    _this.viewPort.refresh();
                }
                if (!_this._multiSelect) {
                    item = item || _super.prototype.getCurrentItem.call(_this);
                    _this.select(item, false);
                }
            });
            /** @type {?} */
            var keyCode = event.keyCode || ((/** @type {?} */ (_deja_js_core__WEBPACK_IMPORTED_MODULE_11__["KeyCodes"])))[event.code];
            switch (keyCode) {
                case _deja_js_core__WEBPACK_IMPORTED_MODULE_11__["KeyCodes"].Home:
                    if (event.altKey || _this._multiSelect && !_this.dropdownVisible) {
                        _this.toggleDropDown();
                    }
                    else {
                        setCurrentIndex(0);
                    }
                    return false;
                case _deja_js_core__WEBPACK_IMPORTED_MODULE_11__["KeyCodes"].End:
                    if (event.altKey || _this._multiSelect && !_this.dropdownVisible) {
                        _this.toggleDropDown();
                    }
                    else {
                        setCurrentIndex(Math.max(0, _this.rowsCount - 1));
                    }
                    return false;
                case _deja_js_core__WEBPACK_IMPORTED_MODULE_11__["KeyCodes"].PageUp:
                    if (event.altKey || _this._multiSelect && !_this.dropdownVisible) {
                        _this.toggleDropDown();
                    }
                    else {
                        /** @type {?} */
                        var index = Math.max(0, _this.currentItemIndex - _this._pageSize);
                        setCurrentIndex(index);
                    }
                    return false;
                case _deja_js_core__WEBPACK_IMPORTED_MODULE_11__["KeyCodes"].PageDown:
                    if (event.altKey || _this._multiSelect && !_this.dropdownVisible) {
                        _this.toggleDropDown();
                    }
                    else {
                        /** @type {?} */
                        var index = Math.min(_this.rowsCount - 1, _this.currentItemIndex + _this._pageSize);
                        setCurrentIndex(index);
                    }
                    return false;
                case _deja_js_core__WEBPACK_IMPORTED_MODULE_11__["KeyCodes"].UpArrow:
                    if (event.altKey || _this._multiSelect && !_this.dropdownVisible) {
                        _this.toggleDropDown();
                    }
                    else {
                        /** @type {?} */
                        var index = Math.max(0, _this.currentItemIndex - 1);
                        setCurrentIndex(index);
                    }
                    return false;
                case _deja_js_core__WEBPACK_IMPORTED_MODULE_11__["KeyCodes"].DownArrow:
                    if (event.altKey || _this._multiSelect && !_this.dropdownVisible) {
                        _this.toggleDropDown();
                    }
                    else {
                        /** @type {?} */
                        var index = Math.min(_this.rowsCount - 1, _this.currentItemIndex + 1);
                        setCurrentIndex(index);
                    }
                    return false;
                case _deja_js_core__WEBPACK_IMPORTED_MODULE_11__["KeyCodes"].Space:
                    if (_this.dropdownVisible) {
                        /** @type {?} */
                        var item = (/** @type {?} */ (_this._itemList[_this.currentItemIndex - _this.vpStartRow]));
                        if (_this.isCollapsible(item)) {
                            _this.keyboardNavigation$.next();
                            _this.toggleCollapse$(_this.currentItemIndex, !item.collapsed).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_13__["first"])()).subscribe(noop);
                            return false;
                        }
                    }
                    if (!_this.isModeSelect) {
                        return true;
                    }
                // Do not break or return here
                // tslint:disable-next-line:no-switch-case-fall-through
                case _deja_js_core__WEBPACK_IMPORTED_MODULE_11__["KeyCodes"].Enter:
                    if (_this.dropdownVisible) {
                        /** @type {?} */
                        var item = _this._itemList[_this.currentItemIndex - _this.vpStartRow];
                        _this.select(item);
                    }
                    return false;
                default:
                    return true;
            }
        })))
            .subscribe((/**
         * @param {?} continuePropagation
         * @return {?}
         */
        function (continuePropagation) {
            if (!continuePropagation) {
                _this.keyboardNavigation$.next();
                _this.changeDetectorRef.markForCheck();
                event.preventDefault();
                return false;
            }
        }));
        /** @type {?} */
        var keyUp$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_12__["fromEvent"])(this.htmlInputElement, 'keyup').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_13__["filter"])((/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            /** @type {?} */
            var keyCode = event.keyCode || ((/** @type {?} */ (_deja_js_core__WEBPACK_IMPORTED_MODULE_11__["KeyCodes"])))[event.code];
            return keyCode >= _deja_js_core__WEBPACK_IMPORTED_MODULE_11__["KeyCodes"].Key0 ||
                keyCode === _deja_js_core__WEBPACK_IMPORTED_MODULE_11__["KeyCodes"].Backspace ||
                keyCode === _deja_js_core__WEBPACK_IMPORTED_MODULE_11__["KeyCodes"].Space ||
                keyCode === _deja_js_core__WEBPACK_IMPORTED_MODULE_11__["KeyCodes"].Delete;
        })));
        Object(rxjs__WEBPACK_IMPORTED_MODULE_12__["merge"])(keyUp$, this.filter$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_13__["takeWhile"])((/**
         * @return {?}
         */
        function () { return _this._isAlive; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_13__["tap"])((/**
         * @return {?}
         */
        function () {
            if ((_this.query || '').length < _this.minSearchlength) {
                _this._itemList = [];
                _this.hideDropDown();
                return;
            }
        })))
            .subscribe((/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            // Set and get current index for keyboard features only
            /** @type {?} */
            var setCurrentIndex = (/**
             * @param {?} index
             * @param {?=} item
             * @return {?}
             */
            function (index, item) {
                _this.currentItemIndex = index;
                if (_this.dropdownVisible) {
                    _this.ensureItemVisible(_this.currentItemIndex);
                }
                if (!_this._multiSelect) {
                    item = item || _super.prototype.getCurrentItem.call(_this);
                    _this.select(item, false);
                }
            });
            // console.log('select.component, keycode:' + event.keyCode);
            _this.keyboardNavigation$.next();
            if (_this.isModeSelect) {
                // Select, search on the list
                if ((/[a-zA-Z0-9]/).test(event.key)) {
                    // Valid char
                    _this.clearFilterExpression$.next(null);
                    // Search next
                    _this.filterExpression += event.key;
                    /** @type {?} */
                    var rg_1 = new RegExp("^" + _this.filterExpression, 'i');
                    _this.findNextMatch$((/**
                     * @param {?} item
                     * @return {?}
                     */
                    function (item) {
                        if (item && _this.isSelectable(item)) {
                            /** @type {?} */
                            var label = _this.getTextValue(item);
                            if (rg_1.test(label)) {
                                return true;
                            }
                        }
                        return false;
                    }), _this.currentItemIndex).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_13__["first"])())
                        .subscribe((/**
                     * @param {?} result
                     * @return {?}
                     */
                    function (result) {
                        if (result.index >= 0) {
                            setCurrentIndex(result.index, result.item);
                        }
                    }));
                }
            }
            else {
                // Autocomplete, filter the list
                _this.filterListComplete$.next();
            }
        }));
    };
    /**
     * @param {?} ids
     * @return {?}
     */
    DejaSelectComponent.prototype.setDescribedByIds = /**
     * @param {?} ids
     * @return {?}
     */
    function (ids) {
        this.describedBy = ids.join(' ');
    };
    /**
     * @param {?} event
     * @return {?}
     */
    DejaSelectComponent.prototype.onContainerClick = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (((/** @type {?} */ (event.target))).tagName.toLowerCase() !== 'input') {
            this.elementRef.nativeElement.querySelector('input').focus();
        }
    };
    /** Change l'état d'expansion de toute les lignes parentes */
    /**
     * Change l'état d'expansion de toute les lignes parentes
     * @param {?=} collapsed
     * @return {?}
     */
    DejaSelectComponent.prototype.toggleAll$ = /**
     * Change l'état d'expansion de toute les lignes parentes
     * @param {?=} collapsed
     * @return {?}
     */
    function (collapsed) {
        var _this = this;
        return _super.prototype.toggleAll$.call(this, collapsed).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_13__["switchMap"])((/**
         * @param {?} items
         * @return {?}
         */
        function (items) { return _this.calcViewList$().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_13__["first"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_13__["map"])((/**
         * @return {?}
         */
        function () { return items; }))); })));
    };
    /** Change l'état d'expansion de toute les lignes parentes */
    /**
     * Change l'état d'expansion de toute les lignes parentes
     * @param {?=} collapsed
     * @return {?}
     */
    DejaSelectComponent.prototype.toggleAll = /**
     * Change l'état d'expansion de toute les lignes parentes
     * @param {?=} collapsed
     * @return {?}
     */
    function (collapsed) {
        this.toggleAll$(collapsed).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_13__["first"])()).subscribe(noop);
    };
    /** Change l'état d'expansion de la ligne spécifiée
     * @param index  Index sur la liste des éléments visibles de l'élément à changer.
     * @param collapse  Etat de l'élément. True pour réduire l'élément.
     * @return Observable résolu par la fonction.
     */
    /**
     * Change l'état d'expansion de la ligne spécifiée
     * @param {?} index  Index sur la liste des éléments visibles de l'élément à changer.
     * @param {?} collapsed
     * @return {?} Observable résolu par la fonction.
     */
    DejaSelectComponent.prototype.toggleCollapse$ = /**
     * Change l'état d'expansion de la ligne spécifiée
     * @param {?} index  Index sur la liste des éléments visibles de l'élément à changer.
     * @param {?} collapsed
     * @return {?} Observable résolu par la fonction.
     */
    function (index, collapsed) {
        var _this = this;
        return _super.prototype.toggleCollapse$.call(this, index, collapsed).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_13__["tap"])((/**
         * @return {?}
         */
        function () {
            if (_this.dropdownVisible) {
                _this.reshowDropDown();
            }
        })));
    };
    /** Change l'état d'expansion de la ligne spécifiée
     * @param index  Index sur la liste des éléments visibles de l'élément à changer.
     * @param collapse  Etat de l'élément. True pour réduire l'élément.
     */
    /**
     * Change l'état d'expansion de la ligne spécifiée
     * @param {?} index  Index sur la liste des éléments visibles de l'élément à changer.
     * @param {?} collapsed
     * @return {?}
     */
    DejaSelectComponent.prototype.toggleCollapse = /**
     * Change l'état d'expansion de la ligne spécifiée
     * @param {?} index  Index sur la liste des éléments visibles de l'élément à changer.
     * @param {?} collapsed
     * @return {?}
     */
    function (index, collapsed) {
        this.toggleCollapse$(index, collapsed).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_13__["first"])()).subscribe(noop);
    };
    /**
     * @param {?} value
     * @return {?}
     */
    DejaSelectComponent.prototype.queryChanged = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        var _this = this;
        this.query = value;
        if (!this.isModeSelect) {
            // Autocomplete or multiselect only
            this.dropDownQuery = this.query;
            if (this.isModeAutocomplete) {
                this.unselectAll$().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_13__["first"])())
                    .subscribe((/**
                 * @return {?}
                 */
                function () { return _this.onModelChange(); }));
            }
        }
    };
    /**
     * @return {?}
     */
    DejaSelectComponent.prototype.hideDropDown = /**
     * @return {?}
     */
    function () {
        this.hideDropDown$.next();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    DejaSelectComponent.prototype.scroll = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var element = (/** @type {?} */ (event.target));
        this.storeScrollPosition$.next(element.scrollTop);
    };
    /**
     * @param {?} e
     * @return {?}
     */
    DejaSelectComponent.prototype.mousedown = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        var _this = this;
        if (this.mouseUp$sub) {
            this.mouseUp$sub.unsubscribe();
            this.mouseUp$sub = undefined;
        }
        this.selectingItemIndex = this.getItemIndexFromHTMLElement((/** @type {?} */ (e.target)));
        this.mouseUp$sub = Object(rxjs__WEBPACK_IMPORTED_MODULE_12__["fromEvent"])(this.listElement, 'mouseup')
            .subscribe((/**
         * @param {?} upEvent
         * @return {?}
         */
        function (upEvent) {
            /** @type {?} */
            var itemIndex = _this.getItemIndexFromHTMLElement((/** @type {?} */ (upEvent.target)));
            if (itemIndex === undefined || _this.selectingItemIndex === undefined || itemIndex !== _this.selectingItemIndex) {
                return;
            }
            /** @type {?} */
            var item = (/** @type {?} */ (_this._itemList[itemIndex - _this.vpStartRow]));
            if (!item || upEvent.button !== 0) {
                // Right click menu
                return;
            }
            /** @type {?} */
            var isExpandButton = (/**
             * @param {?} target
             * @return {?}
             */
            function (target) {
                return target.id === 'expandbtn' || target.parentElement.id === 'expandbtn';
            });
            if (_this.isCollapsible(item) && (isExpandButton((/** @type {?} */ (e.target))) || !_this.isSelectable(item))) {
                if (upEvent.button === 0) {
                    _this.toggleCollapse$(itemIndex, !item.collapsed).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_13__["first"])()).subscribe(noop);
                }
            }
            else if (!item.selected) {
                _this.select(item);
            }
        }));
    };
    /**
     * @param {?} item
     * @return {?}
     */
    DejaSelectComponent.prototype.getItemClass = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        /** @type {?} */
        var classNames = (/** @type {?} */ (['listitem']));
        if (item.className) {
            classNames.push(item.className);
        }
        return classNames.join(' ');
    };
    /**
     * @return {?}
     */
    DejaSelectComponent.prototype.updateErrorState = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var oldState = this.errorState;
        /** @type {?} */
        var parent = this._parentFormGroup || this._parentForm;
        /** @type {?} */
        var matcher = this.errorStateMatcher || this._defaultErrorStateMatcher;
        /** @type {?} */
        var control = this.ngControl ? (/** @type {?} */ (this.ngControl.control)) : null;
        /** @type {?} */
        var newState = matcher.isErrorState(control, parent);
        if (newState !== oldState) {
            this.errorState = newState;
            this.stateChanges.next();
        }
    };
    /**
     * @return {?}
     */
    DejaSelectComponent.prototype.clearSelection = /**
     * @return {?}
     */
    function () {
        this.removeSelection();
    };
    /**
     * @param {?=} event
     * @return {?}
     */
    DejaSelectComponent.prototype.onCloseClicked = /**
     * @param {?=} event
     * @return {?}
     */
    function (event) {
        if (this.ngControl) {
            this.ngControl.control.markAsTouched();
        }
        this.removeSelection(event && event.item);
    };
    /**
     * @return {?}
     */
    DejaSelectComponent.prototype.onOpenClicked = /**
     * @return {?}
     */
    function () {
        if (this.dropdownVisible || this.disabled) {
            return;
        }
        if (this.isModeSelect) {
            this.showDropDown();
        }
        else {
            this.htmlInputElement.select();
            this.filter$.next(event);
        }
    };
    /**
     * @protected
     * @param {?=} item
     * @return {?}
     */
    DejaSelectComponent.prototype.removeSelection = /**
     * @protected
     * @param {?=} item
     * @return {?}
     */
    function (item) {
        var _this = this;
        if (!this._multiSelect) {
            this.query = '';
            this.dropDownQuery = '';
            this.setSelectedItems(undefined);
            this.onModelChange();
            delete this.selectingItemIndex;
        }
        else if (item) {
            this.toggleSelect$([item], false).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_13__["first"])())
                .subscribe((/**
             * @param {?} selectedItems
             * @return {?}
             */
            function (selectedItems) {
                /** @type {?} */
                var selected = Object(tslib__WEBPACK_IMPORTED_MODULE_3__["__spread"])(selectedItems);
                _this.setSelectedItems(selected);
                _this.onModelChange(selected);
            }));
        }
        else {
            this.unselectAll$().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_13__["first"])())
                .subscribe((/**
             * @return {?}
             */
            function () { return _this.onModelChange(); }));
        }
        if (event) {
            event.stopPropagation();
            return false;
        }
    };
    /**
     * @protected
     * @return {?}
     */
    DejaSelectComponent.prototype.calcViewList$ = /**
     * @protected
     * @return {?}
     */
    function () {
        var _this = this;
        return _super.prototype.calcViewList$.call(this, this.dropDownQuery).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_13__["tap"])((/**
         * @return {?}
         */
        function () { return _this.changeDetectorRef.markForCheck(); })));
    };
    /**
     * @protected
     * @param {?} item
     * @return {?}
     */
    DejaSelectComponent.prototype.ensureItemVisible = /**
     * @protected
     * @param {?} item
     * @return {?}
     */
    function (item) {
        _super.prototype.ensureItemVisible.call(this, item);
    };
    /**
     * @private
     * @param {?=} items
     * @return {?}
     */
    DejaSelectComponent.prototype.onModelChange = /**
     * @private
     * @param {?=} items
     * @return {?}
     */
    function (items) {
        /** @type {?} */
        var outputEmitter = null;
        /** @type {?} */
        var output = null;
        if (items) {
            if (Array.isArray(items)) {
                /** @type {?} */
                var models = items.map((/**
                 * @param {?} itm
                 * @return {?}
                 */
                function (itm) { return itm.model !== undefined ? itm.model : itm; }));
                outputEmitter = (/** @type {?} */ ({
                    items: items,
                    models: models,
                }));
                if (this.modelIsValue) {
                    /** @type {?} */
                    var valueField_1 = this.getValueField();
                    if (models.find((/**
                     * @param {?} m
                     * @return {?}
                     */
                    function (m) { return !!m[valueField_1]; }))) {
                        output = models.map((/**
                         * @param {?} m
                         * @return {?}
                         */
                        function (m) { return m[valueField_1] !== undefined ? m[valueField_1] : m; }));
                    }
                }
                else {
                    output = models;
                }
            }
            else {
                /** @type {?} */
                var model = items.model;
                outputEmitter = (/** @type {?} */ ({
                    item: items,
                    model: model,
                }));
                if (this.modelIsValue) {
                    /** @type {?} */
                    var valueField = this.getValueField();
                    output = model[valueField] !== undefined ? model[valueField] : model;
                }
                else {
                    output = items.model !== undefined ? items.model : items;
                }
            }
        }
        this.onChangeCallback(output);
        if (outputEmitter) {
            this.selectedChange.emit(outputEmitter);
        }
    };
    /**
     * @private
     * @param {?} item
     * @param {?=} hideDropDown
     * @return {?}
     */
    DejaSelectComponent.prototype.select = /**
     * @private
     * @param {?} item
     * @param {?=} hideDropDown
     * @return {?}
     */
    function (item, hideDropDown) {
        var _this = this;
        if (!this.isSelectable(item)) {
            return;
        }
        if (!item) {
            // this.query = '';
            // this.dropDownQuery = '';
            // this.setSelectedItems(undefined);
            // this.onModelChange();
            return;
        }
        if (this._multiSelect) {
            this.toggleSelect$([item], true).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_13__["first"])())
                .subscribe((/**
             * @param {?} selectedItems
             * @return {?}
             */
            function (selectedItems) {
                /** @type {?} */
                var selected = selectedItems ? Object(tslib__WEBPACK_IMPORTED_MODULE_3__["__spread"])(selectedItems) : [];
                _this.setSelectedItems(selected);
                _this.onModelChange(selected);
                _this.query = '';
                _this.dropDownQuery = '';
            }));
        }
        else {
            this.query = this.getTextValue(item);
            this.setSelectedItems([item]);
            this.onModelChange(item);
        }
        this.htmlInputElement.focus();
        if (hideDropDown !== false) {
            this.hideDropDown();
        }
    };
    /**
     * @return {?}
     */
    DejaSelectComponent.prototype.toggleDropDown = /**
     * @return {?}
     */
    function () {
        if (this.dropdownVisible) {
            this.hideDropDown();
        }
        else {
            this.showDropDown();
        }
    };
    /**
     * @return {?}
     */
    DejaSelectComponent.prototype.showDropDown = /**
     * @return {?}
     */
    function () {
        this.showDropDown$.next();
    };
    /**
     * @private
     * @return {?}
     */
    DejaSelectComponent.prototype.reshowDropDown = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this.dropdownVisible) {
            return this.showDropDown();
        }
        delete this.selectingItemIndex;
        // Restore scroll Position
        /** @type {?} */
        var listElement = this.listElement;
        if (listElement) {
            listElement.scrollTop = this.lastScrollPosition;
        }
        this.calcViewList$().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_13__["tap"])((/**
         * @return {?}
         */
        function () { return _this.refreshViewPort(); })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_13__["combineLatest"])(this.viewPortChanged), // Wait for viewport calculation
        Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_13__["first"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_13__["delay"])(1)) // Ensure viewport binding
            .subscribe((/**
         * @return {?}
         */
        function () {
            // View port calculated
            _this.overlay.updatePosition();
            // Ensure selection
            /** @type {?} */
            var item = _this.getSelectedItems()[0];
            /** @type {?} */
            var index = item && _this.getItemIndex(item);
            if (index >= 0) {
                _this.currentItemIndex = index;
                _this.ensureItemVisible(index);
            }
        }));
    };
    /**
     * @private
     * @return {?}
     */
    DejaSelectComponent.prototype.ensureSelection = /**
     * @private
     * @return {?}
     */
    function () {
        if (this._multiSelect) ;
        else {
            this.query = this.selectedItems.length ? this.getTextValue(this.selectedItems[0]) : '';
        }
    };
    DejaSelectComponent.nextId = 0;
    DejaSelectComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Component"], args: [{
                    changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_6__["ChangeDetectionStrategy"].OnPush,
                    encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_6__["ViewEncapsulation"].None,
                    providers: [
                        _deja_js_core__WEBPACK_IMPORTED_MODULE_11__["ViewPortService"],
                        { provide: _angular_material__WEBPACK_IMPORTED_MODULE_8__["MatFormFieldControl"], useExisting: DejaSelectComponent }
                    ],
                    selector: 'deja-select',
                    template: "<input [placeholder]=\"placeholder\" *ngIf=\"!isMultiSelect\" matInput [disabled]=\"disabled\" [ngModel]=\"query\" #inputElement deja-child-validator type=\"text\" [readonly]=\"isModeSelect || readonly\" (ngModelChange)=\"queryChanged($event)\" autocomplete=\"off\">\n<div *ngIf=\"!disabled && !isMultiSelect\" class=\"actions-suffix\">\n\t<mat-icon (click)=\"onCloseClicked()\" id=\"clear-button\" *ngIf=\"selectionClearable && selectedItems.length > 0\">clear</mat-icon>\n\t<mat-icon (click)=\"onOpenClicked()\" id=\"drop-down-button\">arrow_drop_down</mat-icon>\n</div>\n<deja-chips *ngIf=\"isMultiSelect\" [items]=\"selectedItems\" [readonly]=\"readonly\" [disabled]=\"disabled\" (close)=\"onCloseClicked($event)\" [itemTemplateExternal]=\"selectedTemplate\" [textField]=\"textField\">\n\t<ng-template #insertTemplate>\n\t\t<input [placeholder]=\"placeholder\" matInput [disabled]=\"disabled\" [ngModel]=\"query\" #inputElement deja-child-validator type=\"text\" [readonly]=\"isModeSelect || readonly\" (ngModelChange)=\"queryChanged($event)\" autocomplete=\"off\">\n\t\t<div *ngIf=\"!disabled\" class=\"actions-suffix\">\n\t\t\t<mat-icon id=\"drop-down-button\" (click)=\"onOpenClicked()\">arrow_drop_down</mat-icon>\n\t\t</div>\n\t</ng-template>\n</deja-chips>\n<deja-overlay #dejaOverlay [ownerElement]=\"overlayOwnerElement\" [isVisible]=\"dropdownVisible\" (closed)=\"hideDropDown()\" [positions]=\"positions\" [overlayOffsetY]=\"overlayOffsetY\" [overlayOffsetX]=\"overlayOffsetX\" [width]=\"dropDownWidth\" widthForMobile=\"100%\" (closed)=\"hideDropDown()\">\n\t<div [id]=\"listElementId\" class=\"deja-listcontainer\" [attr.itemscount]=\"itemList && itemList.length\" [attr.depth-max]=\"depthMax || null\" [attr.keynav]=\"keyboardNavigation\" [attr.vprowheight]=\"getViewPortRowHeight()\" (mousedown)=\"mousedown($event)\" (scroll)=\"scroll($event)\" [style.max-height.px]=\"dropDownMaxHeight\">\n\t\t<div id=\"nodata-holder\" *ngIf=\"(!treeItemList || treeItemList.length === 0) && !waiter\">{{ nodataholder }}</div>\n\t\t<div *ngIf=\"vpBeforeHeight\" [style.height.px]=\"vpBeforeHeight\"></div>\n\t\t<div *ngFor=\"let item of treeItemList; let index = index\" #listitem [attr.class]=\"getItemClass(item)\" [class.hide]=\"item.collapsing || item.expanding\" [class.parent]=\"item.depth < depthMax\" [class.collapsed]=\"item.collapsed\" [class.selected]=\"item.selected\" [attr.current]=\"(isMultiSelect && vpStartRow+index === getCurrentItemIndex()) || null\" [class.unselectable]=\"item.selectable === false\" [attr.depth]=\"depthMax ? item.depth : null\" [attr.id]=\"item.id || null\" [attr.flat]=\"vpStartRow + index\" [style.height.px]=\"getItemHeight(item)\" [class.odd]=\"(item.depth === depthMax && item.odd) || null\">\n\t\t\t<span id=\"expandbtn\">\n\t\t\t\t<mat-icon *ngIf=\"item.$items && item.$items.length\">arrow_drop_down</mat-icon>\n\t\t\t</span>\n\t\t\t<ng-container *ngIf=\"(!item.$items || !parentItemTemplate) && (item.$items || !itemTemplate)\">{{ getTextValue(item) }}</ng-container>\n\t\t\t<ng-container *ngIf=\"item.$items && parentItemTemplate\">\n\t\t\t\t<ng-template [ngTemplateOutlet]=\"parentItemTemplate\" [ngTemplateOutletContext]=\"{ $implicit: item, query: query, flatindex: vpStartRow+index }\"></ng-template>\n\t\t\t</ng-container>\n\t\t\t<ng-container *ngIf=\"!item.$items && itemTemplate\">\n\t\t\t\t<ng-template [ngTemplateOutlet]=\"itemTemplate\" [ngTemplateOutletContext]=\"{ $implicit: item, query: query, flatindex: vpStartRow+index }\"></ng-template>\n\t\t\t</ng-container>\n\t\t</div>\n\t\t<div *ngIf=\"vpAfterHeight\" [style.height.px]=\"vpAfterHeight\"></div>\n\t\t<deja-list-loader id=\"loader\" *ngIf=\"waiter && !loaderTemplate\"></deja-list-loader>\n\t\t<ng-container *ngIf=\"waiter && loaderTemplate\">\n\t\t\t<ng-template [ngTemplateOutlet]=\"loaderTemplate\"></ng-template>\n\t\t</ng-container>\n\t</div>\n</deja-overlay>\n<div *ngIf=\"hintLabel != ''\" class=\"mat-hint\">{{hintLabel}}</div>",
                    styles: ["deja-select{width:100%;white-space:initial;display:flex;align-items:center;min-height:1rem}deja-select>input{flex:1 1 100%}deja-select deja-chips{width:100%}deja-select deja-chips .insert-item{display:flex;align-items:center;height:1.2rem}deja-select .actions-suffix{flex:0 0 auto;text-align:right;overflow:visible;display:flex;align-items:center;height:0}deja-select .actions-suffix #clear-button,deja-select .actions-suffix #drop-down-button{font-size:1.2rem;opacity:.35}deja-select .actions-suffix #clear-button:hover,deja-select .actions-suffix #drop-down-button:hover{opacity:1;cursor:pointer}@-webkit-keyframes load{0%{left:-35%;right:100%}100%,60%{left:100%;right:-90%}}@keyframes load{0%{left:-35%;right:100%}100%,60%{left:100%;right:-90%}}@-webkit-keyframes load-short{0%{left:-200%;right:100%}100%,60%{left:107%;right:-8%}}@keyframes load-short{0%{left:-200%;right:100%}100%,60%{left:107%;right:-8%}}.deja-overlay-container .deja-listcontainer{width:100%;text-align:left;overflow-y:auto;padding:0;margin:0;position:relative}.deja-overlay-container .deja-listcontainer div.listitem{white-space:nowrap}.deja-overlay-container .deja-listcontainer div.listitem>deja-bold-query{flex:1 1 100%;overflow:hidden}.deja-overlay-container .deja-listcontainer div.listitem>deja-bold-query div{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;position:relative;width:100%}.deja-overlay-container .deja-listcontainer #expandbtn{min-width:24px}.deja-overlay-container .deja-listcontainer[valign=bottom]{border-top:none}.deja-overlay-container .deja-listcontainer [current=true]{box-shadow:none}.deja-overlay-container .deja-listcontainer[keynav=false] div.listitem:not(.unselectable):hover{cursor:pointer}.deja-overlay-container .deja-listcontainer #nodata-holder{margin:.5rem}.deja-overlay-container .deja-listcontainer #loader .spinner{margin:10px auto}.deja-overlay-container .deja-listcontainer[vprowheight=\"0\"]>div.listitem{padding:.35rem .1rem}.deja-overlay-container .deja-listcontainer>div.listitem{opacity:1;margin:0;transition-timing-function:linear;transition-duration:.3s;transition-property:max-height,opacity;display:flex;align-items:center}.deja-overlay-container .deja-listcontainer>div.listitem.hide{opacity:0!important;max-height:0!important;transition-timing-function:ease-out}.deja-overlay-container .deja-listcontainer>div.listitem #expandbtn{width:24px;cursor:pointer}.deja-overlay-container .deja-listcontainer>div.listitem.parent.collapsed #expandbtn>.mat-icon{-webkit-transform:rotate(-90deg);transform:rotate(-90deg)}.deja-overlay-container .deja-listcontainer [depth=\"0\"]{padding-left:0}.deja-overlay-container .deja-listcontainer [depth=\"1\"]{padding-left:1rem}.deja-overlay-container .deja-listcontainer [depth=\"2\"]{padding-left:2rem}.deja-overlay-container .deja-listcontainer [depth=\"3\"]{padding-left:3rem}.deja-overlay-container .deja-listcontainer [depth=\"4\"]{padding-left:4rem}.deja-overlay-container .deja-listcontainer [depth=\"5\"]{padding-left:5rem}.deja-overlay-container .deja-listcontainer [depth=\"6\"]{padding-left:6rem}.deja-overlay-container .deja-listcontainer [depth=\"7\"]{padding-left:7rem}.deja-overlay-container .deja-listcontainer [depth=\"8\"]{padding-left:8rem}.deja-overlay-container .deja-listcontainer [depth=\"9\"]{padding-left:9rem}.deja-overlay-container .deja-listcontainer [depth=\"10\"]{padding-left:10rem}.deja-overlay-container .deja-listcontainer [depth=\"11\"]{padding-left:11rem}.deja-overlay-container .deja-listcontainer [depth=\"12\"]{padding-left:12rem}.deja-overlay-container .deja-listcontainer [depth=\"13\"]{padding-left:13rem}.deja-overlay-container .deja-listcontainer [depth=\"14\"]{padding-left:14rem}.deja-overlay-container .deja-listcontainer [depth=\"15\"]{padding-left:15rem}.deja-overlay-container .deja-listcontainer [depth=\"16\"]{padding-left:16rem}.deja-overlay-container .deja-listcontainer [depth=\"17\"]{padding-left:17rem}.deja-overlay-container .deja-listcontainer [depth=\"18\"]{padding-left:18rem}.deja-overlay-container .deja-listcontainer [depth=\"19\"]{padding-left:19rem}.deja-overlay-container .deja-listcontainer [depth=\"20\"]{padding-left:20rem}.deja-overlay-container .deja-listcontainer [depth=\"21\"]{padding-left:21rem}.deja-overlay-container .deja-listcontainer [depth=\"22\"]{padding-left:22rem}.deja-overlay-container .deja-listcontainer [depth=\"23\"]{padding-left:23rem}.deja-overlay-container .deja-listcontainer [depth=\"24\"]{padding-left:24rem}.deja-overlay-container .deja-listcontainer [depth=\"25\"]{padding-left:25rem}.deja-overlay-container .deja-listcontainer [depth=\"26\"]{padding-left:26rem}.deja-overlay-container .deja-listcontainer [depth=\"27\"]{padding-left:27rem}.deja-overlay-container .deja-listcontainer [depth=\"28\"]{padding-left:28rem}.deja-overlay-container .deja-listcontainer [depth=\"29\"]{padding-left:29rem}.deja-overlay-container .deja-listcontainer [depth=\"30\"]{padding-left:30rem}.deja-overlay-container .deja-listcontainer [depth=\"31\"]{padding-left:31rem}.deja-overlay-container .deja-listcontainer [depth=\"32\"]{padding-left:32rem}.deja-overlay-container .deja-listcontainer [depth=\"33\"]{padding-left:33rem}.deja-overlay-container .deja-listcontainer [depth=\"34\"]{padding-left:34rem}.deja-overlay-container .deja-listcontainer [depth=\"35\"]{padding-left:35rem}.deja-overlay-container .deja-listcontainer [depth=\"36\"]{padding-left:36rem}.deja-overlay-container .deja-listcontainer [depth=\"37\"]{padding-left:37rem}.deja-overlay-container .deja-listcontainer [depth=\"38\"]{padding-left:38rem}.deja-overlay-container .deja-listcontainer [depth=\"39\"]{padding-left:39rem}.deja-overlay-container .deja-listcontainer [depth=\"40\"]{padding-left:40rem}.deja-overlay-container .deja-listcontainer [depth=\"41\"]{padding-left:41rem}.deja-overlay-container .deja-listcontainer [depth=\"42\"]{padding-left:42rem}.deja-overlay-container .deja-listcontainer [depth=\"43\"]{padding-left:43rem}.deja-overlay-container .deja-listcontainer [depth=\"44\"]{padding-left:44rem}.deja-overlay-container .deja-listcontainer [depth=\"45\"]{padding-left:45rem}.deja-overlay-container .deja-listcontainer [depth=\"46\"]{padding-left:46rem}.deja-overlay-container .deja-listcontainer [depth=\"47\"]{padding-left:47rem}.deja-overlay-container .deja-listcontainer [depth=\"48\"]{padding-left:48rem}.deja-overlay-container .deja-listcontainer [depth=\"49\"]{padding-left:49rem}.deja-overlay-container .deja-listcontainer [depth=\"50\"]{padding-left:50rem}"]
                }] }
    ];
    /** @nocollapse */
    DejaSelectComponent.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["ChangeDetectorRef"] },
        { type: _deja_js_core__WEBPACK_IMPORTED_MODULE_11__["ViewPortService"] },
        { type: _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_4__["FocusMonitor"] },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["ElementRef"] },
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_7__["NgControl"], decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Self"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Optional"] }] },
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_7__["NgForm"], decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Optional"] }] },
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormGroupDirective"], decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Optional"] }] },
        { type: _deja_js_core__WEBPACK_IMPORTED_MODULE_11__["MediaService"] },
        { type: _angular_material_core__WEBPACK_IMPORTED_MODULE_9__["ErrorStateMatcher"] }
    ]; };
    DejaSelectComponent.propDecorators = {
        id: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["HostBinding"] }],
        shouldLabelFloat: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["HostBinding"], args: ['class.floating',] }],
        describedBy: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["HostBinding"], args: ['attr.aria-describedby',] }],
        nodataholder: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        overlayOffsetX: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        overlayOffsetY: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        itemTemplateExternal: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        parentItemTemplateExternal: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        loaderTemplateExternal: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        modelIsValue: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        viewPortChanged: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Output"] }],
        selectedChange: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Output"] }],
        dropDownVisibleChange: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Output"] }],
        itemTemplateInternal: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["ContentChild"], args: ['itemTemplate',] }],
        parentItemTemplateInternal: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["ContentChild"], args: ['parentItemTemplate',] }],
        selectedTemplate: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["ContentChild"], args: ['selectedTemplate',] }],
        loaderTemplateInternal: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["ContentChild"], args: ['loaderTemplate',] }],
        _waiter: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["HostBinding"], args: ['attr.wait',] }],
        inputElement: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["ViewChild"], args: ['inputElement',] }],
        input: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["ViewChild"], args: [_angular_material__WEBPACK_IMPORTED_MODULE_8__["MatInput"],] }],
        _disabled: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["HostBinding"], args: ['attr.disabled',] }],
        _readonly: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["HostBinding"], args: ['attr.readonly',] }],
        overlay: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["ViewChild"], args: [_deja_js_component_overlay__WEBPACK_IMPORTED_MODULE_10__["DejaOverlayComponent"],] }],
        positions: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        dropDownWidth: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        required: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        placeholder: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        options: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["ContentChildren"], args: [_deja_js_core__WEBPACK_IMPORTED_MODULE_11__["DejaItemComponent"],] }],
        query: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        delaySearchTrigger: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"], args: ['delay-search-trigger',] }],
        minSearchlength: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"], args: ['min-search-length',] }],
        disabled: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        selectionClearable: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        hideSelected: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        currentItem: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        pageSize: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        hintLabel: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        viewPortRowHeight: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        viewportMode: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        childrenField: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        textField: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        valueField: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        searchField: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        type: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        loadingItems: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        selectingItem: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        unselectingItem: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        expandingItem: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        collapsingItem: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        selectedItems: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        selectedItem: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        selectedModel: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        selectedModels: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        itemListService: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        sortingService: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        groupingService: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        waiter: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        items: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        models: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        maxHeight: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        readonly: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        inputValidatorDirective: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["ViewChild"], args: [_deja_js_core__WEBPACK_IMPORTED_MODULE_11__["DejaChildValidatorDirective"],] }]
    };
    return DejaSelectComponent;
}(_deja_js_core__WEBPACK_IMPORTED_MODULE_11__["ItemListBase"]));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var DejaSelectModule = /** @class */ (function () {
    function DejaSelectModule() {
    }
    DejaSelectModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["NgModule"], args: [{
                    declarations: [
                        DejaSelectComponent,
                    ],
                    exports: [
                        DejaSelectComponent,
                    ],
                    imports: [
                        _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
                        _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormsModule"],
                        _deja_js_core__WEBPACK_IMPORTED_MODULE_11__["MediaModule"],
                        _deja_js_component_overlay__WEBPACK_IMPORTED_MODULE_10__["DejaOverlayModule"],
                        _angular_material__WEBPACK_IMPORTED_MODULE_8__["MatIconModule"],
                        _angular_material__WEBPACK_IMPORTED_MODULE_8__["MatInputModule"],
                        _deja_js_core__WEBPACK_IMPORTED_MODULE_11__["DejaChildValidatorModule"],
                        _deja_js_component_chips__WEBPACK_IMPORTED_MODULE_1__["DejaChipsModule"],
                        _deja_js_core__WEBPACK_IMPORTED_MODULE_11__["DejaItemModule"],
                        _deja_js_component_loaders__WEBPACK_IMPORTED_MODULE_2__["DejaListLoaderModule"],
                    ],
                },] }
    ];
    return DejaSelectModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */



//# sourceMappingURL=deja-js-component-select.js.map

/***/ }),

/***/ "./dist/deja-js/component/fesm5/deja-js-component-templates.js":
/*!*********************************************************************!*\
  !*** ./dist/deja-js/component/fesm5/deja-js-component-templates.js ***!
  \*********************************************************************/
/*! exports provided: DejaBoldQueryModule, DejaBoldQueryComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DejaBoldQueryModule", function() { return DejaBoldQueryModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DejaBoldQueryComponent", function() { return DejaBoldQueryComponent; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _deja_js_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @deja-js/core */ "./dist/deja-js/core/fesm5/deja-js-core.js");
/* harmony import */ var _deja_js_core_util__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @deja-js/core/util */ "./dist/deja-js/core/fesm5/deja-js-core-util.js");






/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var DejaBoldQueryComponent = /** @class */ (function () {
    function DejaBoldQueryComponent() {
        this._regexpOptions = 'i';
        this._firstOccurenceOnly = false;
        this._firstOccurencePerWordOnly = false;
        this._atTheBeginningOfWordOnly = false;
        this._highlightClassName = 'highlight | yellowBackgroundColorHighlight';
    }
    Object.defineProperty(DejaBoldQueryComponent.prototype, "content", {
        get: /**
         * @return {?}
         */
        function () {
            return this._content;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaBoldQueryComponent.prototype, "query", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            value = _deja_js_core__WEBPACK_IMPORTED_MODULE_3__["Diacritics"].remove(value);
            if (this._query !== value) {
                this._query = value;
                this.refresh();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaBoldQueryComponent.prototype, "value", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._value = value;
            this.refresh();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaBoldQueryComponent.prototype, "regexpOption", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._regexpOptions = value;
            this.refresh();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaBoldQueryComponent.prototype, "firstOccurenceOnly", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._firstOccurenceOnly = value;
            this.refresh();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaBoldQueryComponent.prototype, "firstOccurencePerWordOnly", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._firstOccurencePerWordOnly = value;
            this.refresh();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaBoldQueryComponent.prototype, "atTheBeginningOfWordOnly", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._atTheBeginningOfWordOnly = value;
            this.refresh();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaBoldQueryComponent.prototype, "highlightClassName", {
        get: /**
         * @return {?}
         */
        function () {
            return this._highlightClassName;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._highlightClassName = value;
            if (!this._highlightClassName) {
                this._highlightClassName = 'highlight';
            }
            this.refresh();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     * @return {?}
     */
    DejaBoldQueryComponent.prototype.refresh = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        if (this._value && this._query && this._query.length > 0) {
            /** @type {?} */
            var regexpPattern = this._atTheBeginningOfWordOnly ? ("\\b" + _deja_js_core_util__WEBPACK_IMPORTED_MODULE_4__["RegExpUtils"].escapeRegExp(this._query)) : _deja_js_core_util__WEBPACK_IMPORTED_MODULE_4__["RegExpUtils"].escapeRegExp(this._query);
            /** @type {?} */
            var sc = new RegExp(regexpPattern, this._regexpOptions);
            /** @type {?} */
            var value_1 = (/** @type {?} */ (this._value.toString()));
            /** @type {?} */
            var search = _deja_js_core__WEBPACK_IMPORTED_MODULE_3__["Diacritics"].remove(value_1);
            /** @type {?} */
            var splitted = search.split(sc);
            /** @type {?} */
            var position_1 = 0;
            /** @type {?} */
            var queryLength_1 = this._query.length;
            /** @type {?} */
            var contents_1 = (/** @type {?} */ ([]));
            /** @type {?} */
            var firstOccurence_1 = true;
            /** @type {?} */
            var nbOccurence_1 = 0;
            splitted.forEach((/**
             * @param {?} text
             * @return {?}
             */
            function (text) {
                if (text) {
                    contents_1.push(value_1.slice(position_1, position_1 + text.length));
                    position_1 += text.length;
                }
                if (position_1 + queryLength_1 <= value_1.length) {
                    nbOccurence_1 += 1;
                    /** @type {?} */
                    var skipHighlight = false;
                    if (_this._firstOccurencePerWordOnly && nbOccurence_1 > 1) {
                        /** @type {?} */
                        var words = text.split(/[^a-zA-Z\d]/g);
                        if (words.length === 1) {
                            skipHighlight = true;
                        }
                    }
                    if (!skipHighlight && (!_this._firstOccurenceOnly || firstOccurence_1)) {
                        contents_1.push("<span class=\"" + _this._highlightClassName + "\">");
                    }
                    contents_1.push(value_1.slice(position_1, position_1 + queryLength_1));
                    if (!skipHighlight && (!_this._firstOccurenceOnly || firstOccurence_1)) {
                        contents_1.push('</span>');
                    }
                    position_1 += queryLength_1;
                }
                firstOccurence_1 = false;
            }));
            this._content = contents_1.join('');
        }
        else {
            this._content = this._value;
        }
    };
    DejaBoldQueryComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"], args: [{
                    encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_2__["ViewEncapsulation"].None,
                    selector: 'deja-bold-query',
                    template: "<div [innerHTML]=\"content\"></div>",
                    styles: ["deja-bold-query .highlight{font-weight:700}deja-bold-query .yellowBackgroundColorHighlight{font-weight:inherit;background-color:#ff0;color:#111}"]
                }] }
    ];
    DejaBoldQueryComponent.propDecorators = {
        query: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"] }],
        value: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"] }],
        regexpOption: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"] }],
        firstOccurenceOnly: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"] }],
        firstOccurencePerWordOnly: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"] }],
        atTheBeginningOfWordOnly: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"] }],
        highlightClassName: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"] }]
    };
    return DejaBoldQueryComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var DejaBoldQueryModule = /** @class */ (function () {
    function DejaBoldQueryModule() {
    }
    DejaBoldQueryModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"], args: [{
                    declarations: [
                        DejaBoldQueryComponent,
                    ],
                    exports: [DejaBoldQueryComponent],
                    imports: [
                        _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
                        _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormsModule"],
                    ],
                },] }
    ];
    return DejaBoldQueryModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */



//# sourceMappingURL=deja-js-component-templates.js.map

/***/ }),

/***/ "./src/app/select/select-demo.html":
/*!*****************************************!*\
  !*** ./src/app/select/select-demo.html ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-tab-group [selectedIndex]=\"tabIndex\" (selectedTabChange)=\"tabIndex = $event.index\">\n\t<!--<mat-tab label=\"OVERVIEW\">-->\n\t<!--<mat-card class=\"demo-card demo-basic\">-->\n\t<!--TODO-->\n\t<!--</mat-card>-->\n\t<!--</mat-tab>-->\n\t<mat-tab label=\"API REFERENCE\"></mat-tab>\n\t<mat-tab label=\"SIMPLE EXAMPLES\"></mat-tab>\n\t<mat-tab label=\"ADVANCED EXAMPLES\"></mat-tab>\n\t<mat-tab label=\"TEMPLATING\"></mat-tab>\n\t<mat-tab label=\"PRE-EVENTS AND ON_DEMAND\"></mat-tab>\n\t<mat-tab label=\"PERFORMANCES\"></mat-tab>\n\t<mat-tab label=\"REACTIVE FORM\"></mat-tab>\n</mat-tab-group>\n\n<deja-dialog *ngIf=\"dialogVisible\">\n\t<deja-message-box type=\"primary\" title=\"Confirm\">\n\t\tPlease confirm your operation!\n\t\t<ng-template #actionsTemplate>\n\t\t\t<button id=\"cancelbtn\" mat-raised-button (click)=\"dialogResponse$.next('cancel')\">Cancel</button>\n\t\t\t<button id=\"okbtn\" mat-raised-button color=\"primary\" (click)=\"dialogResponse$.next('ok')\">Ok</button>\n\t\t</ng-template>\n\t</deja-message-box>\n</deja-dialog>\n\n<mat-card class=\"demo-card demo-basic\" *ngIf=\"tabIndex === 0\">\n\t<deja-markdown [url]=\"'https://raw.githubusercontent.com/DSI-HUG/dejajs-components/dev/projects/deja-js/component/select/readme.md'\"></deja-markdown>\n</mat-card>\n\n<div *ngIf=\"tabIndex === 1\">\n\t<mat-card class=\"deja-select-demo demo-card demo-basic\">\n\t\t<mat-toolbar color=\"primary\">Simple Usage</mat-toolbar>\n\t\t<mat-card-content>\n\t\t\t<div>Just passing an array of objects</div>\n\t\t\t<div fxLayout=\"row\">\n\t\t\t\t<span fxFlex=\"0 0 45%\" fxLayout=\"column\">\n\t\t\t\t\t<mat-form-field fxFlex=\"0 0 auto\" appearance=\"standard\">\n\t\t\t\t\t\t<mat-label>Select Mode</mat-label>\n\t\t\t\t\t\t<deja-select #select [(ngModel)]=\"businessCountry\" textField=\"naqme\" valueField=\"code\" [models]=\"countries\"></deja-select>\n\t\t\t\t\t</mat-form-field>\n\t\t\t\t\t<mat-form-field fxFlex=\"0 0 auto\" appearance=\"fill\">\n\t\t\t\t\t\t<mat-label>Autocomplete</mat-label>\n\t\t\t\t\t\t<deja-select placeholder=\"\" type=\"autocomplete\" [(ngModel)]=\"businessCountry\" textField=\"naqme\" valueField=\"code\" [models]=\"countries\"></deja-select>\n\t\t\t\t\t</mat-form-field>\n\t\t\t\t</span>\n\t\t\t\t<span fxFlex=\"0 0 45%\" fxFlexOffset=\"5%\">\n\t\t\t\t\t<button (click)=\"select.showDropDown()\">showDropDown</button>\n\t\t\t\t\t<h4>Selected country model :</h4>\n\t\t\t\t\t<pre>{{businessCountry | json}}</pre>\n\t\t\t\t</span>\n\t\t\t</div>\n\t\t</mat-card-content>\n\t</mat-card>\n\t<mat-card class=\"deja-select-demo demo-card demo-basic\">\n\t\t<mat-toolbar color=\"primary\">Keyboard Navigation</mat-toolbar>\n\t\t<mat-card-content>\n\t\t\t<div>deja-select has some keyboard navigation feature</div>\n\t\t\t<div fxLayout=\"row\">\n\t\t\t\t<span fxFlex=\"0 0 45%\" fxLayout=\"column\">\n\t\t\t\t\t<mat-form-field fxFlex=\"0 0 auto\" appearance=\"outline\">\n\t\t\t\t\t\t<mat-label>Test Keyboard Navigation</mat-label>\n\t\t\t\t\t\t<deja-select placeholder=\"Select a country\" [(ngModel)]=\"businessCountry\" textField=\"naqme\" valueField=\"code\" [models]=\"countries\"></deja-select>\n\t\t\t\t\t</mat-form-field>\n\t\t\t\t</span>\n\t\t\t\t<ul fxFlex=\"0 0 50%\" fxFlexOffset=\"5%\" id=\"shortcut-list\">\n\t\t\t\t\t<li>Press\n\t\t\t\t\t\t<span class=\"keyboard-key\">↑</span> to select the previous item</li>\n\t\t\t\t\t<li>Press\n\t\t\t\t\t\t<span class=\"keyboard-key\">↓</span> to select the next item</li>\n\t\t\t\t\t<li>Press\n\t\t\t\t\t\t<span class=\"keyboard-key\">Alt</span> +\n\t\t\t\t\t\t<span class=\"keyboard-key\">↑</span> to toogle the dropdown</li>\n\t\t\t\t\t<li>Press\n\t\t\t\t\t\t<span class=\"keyboard-key\">Alt</span> +\n\t\t\t\t\t\t<span class=\"keyboard-key\">↓</span> to toogle the dropdown</li>\n\t\t\t\t\t<li>Press\n\t\t\t\t\t\t<span class=\"keyboard-key\">PageUp</span> to select the next page item</li>\n\t\t\t\t\t<li>Press\n\t\t\t\t\t\t<span class=\"keyboard-key\">PageDown</span> to select the previous page item</li>\n\t\t\t\t\t<li>Press\n\t\t\t\t\t\t<span class=\"keyboard-key\">Home</span> to select the first item</li>\n\t\t\t\t\t<li>Press\n\t\t\t\t\t\t<span class=\"keyboard-key\">End</span> to select the last item</li>\n\t\t\t\t\t<li>Press\n\t\t\t\t\t\t<span class=\"keyboard-key\">Space</span> to collapse or expand a group header</li>\n\t\t\t\t\t<li>Press\n\t\t\t\t\t\t<span class=\"keyboard-key\">Enter</span> to select the current item and close the dropdown</li>\n\t\t\t\t\t<li>Press\n\t\t\t\t\t\t<span class=\"keyboard-key\">A</span>..\n\t\t\t\t\t\t<span class=\"keyboard-key\">Z</span>\n\t\t\t\t\t\t<span class=\"keyboard-key\">0</span>..\n\t\t\t\t\t\t<span class=\"keyboard-key\">9</span> to select the next item started with the pressed key</li>\n\t\t\t\t</ul>\n\t\t\t</div>\n\t\t</mat-card-content>\n\t</mat-card>\n\t<mat-card class=\"deja-select-demo demo-card demo-basic\">\n\t\t<mat-toolbar color=\"primary\">Select with options</mat-toolbar>\n\t\t<mat-card-content>\n\t\t\t<div>These selects has a list coming from html options</div>\n\t\t\t<span fxLayout=\"row\" fxLayoutAlign=\"start end\">\n\t\t\t\t<mat-form-field fxFlex=\"0 0 45%\" class=\"demo-half-width\" appearance=\"standard\">\n\t\t\t\t\t<deja-select placeholder=\"Options content\" [(ngModel)]=\"fruct\" modelIsValue=\"true\">\n\t\t\t\t\t\t<deja-item value=\"Apricots\" text=\"My preferred fruct is Apricots\"></deja-item>\n\t\t\t\t\t\t<deja-item value=\"Banana\" text=\"My preferred fruct is Banana\"></deja-item>\n\t\t\t\t\t\t<deja-item value=\"Cantaloupe\" text=\"My preferred fruct is Cantaloupe\"></deja-item>\n\t\t\t\t\t\t<deja-item value=\"Cherries\" text=\"My preferred fruct is Cherries\"></deja-item>\n\t\t\t\t\t\t<deja-item value=\"Coconut\" text=\"My preferred fruct is Coconut\"></deja-item>\n\t\t\t\t\t\t<deja-item value=\"Cranberries\" text=\"My preferred fruct is Cranberries\"></deja-item>\n\t\t\t\t\t\t<deja-item value=\"Durian\" text=\"My preferred fruct is Durian\"></deja-item>\n\t\t\t\t\t\t<deja-item value=\"Grapes\" text=\"My preferred fruct is Grapes\"></deja-item>\n\t\t\t\t\t\t<deja-item value=\"Lemon\" text=\"My preferred fruct is Lemon\"></deja-item>\n\t\t\t\t\t\t<deja-item value=\"Mango\" text=\"My preferred fruct is Mango\"></deja-item>\n\t\t\t\t\t\t<deja-item value=\"Pineapple\" text=\"My preferred fruct is Pineapple\"></deja-item>\n\t\t\t\t\t\t<deja-item value=\"Watermelon\" text=\"My preferred fruct is Watermelon\"></deja-item>\n\t\t\t\t\t</deja-select>\n\t\t\t\t</mat-form-field>\n\t\t\t\t<mat-form-field fxFlex=\"0 0 45%\" fxFlexOffset=\"5%\" class=\"demo-half-width\" appearance=\"standard\">\n\t\t\t\t\t<deja-select viewportMode=\"variable\" placeholder=\"Options content\" type=\"multiselect\" selectedModels=\"Mango, Apricots, Coconut\">\n\t\t\t\t\t\t<deja-item value=\"Apricots\" text=\"Apricots\"></deja-item>\n\t\t\t\t\t\t<deja-item value=\"Banana\" text=\"Banana\"></deja-item>\n\t\t\t\t\t\t<deja-item value=\"Cantaloupe\" text=\"Cantaloupe\"></deja-item>\n\t\t\t\t\t\t<deja-item value=\"Cherries\" text=\"Cherries\"></deja-item>\n\t\t\t\t\t\t<deja-item value=\"Coconut\" text=\"Coconut\"></deja-item>\n\t\t\t\t\t\t<deja-item value=\"Cranberries\" text=\"Cranberries\"></deja-item>\n\t\t\t\t\t\t<deja-item value=\"Durian\" text=\"Durian\"></deja-item>\n\t\t\t\t\t\t<deja-item value=\"Grapes\" text=\"Grapes\"></deja-item>\n\t\t\t\t\t\t<deja-item value=\"Lemon\" text=\"Lemon\"></deja-item>\n\t\t\t\t\t\t<deja-item value=\"Mango\" text=\"Mango\"></deja-item>\n\t\t\t\t\t\t<deja-item value=\"Pineapple\" text=\"Pineapple\"></deja-item>\n\t\t\t\t\t\t<deja-item value=\"Watermelon\" text=\"Watermelon\"></deja-item>\n\t\t\t\t\t</deja-select>\n\t\t\t\t</mat-form-field>\n\t\t\t</span>\n\t\t</mat-card-content>\n\t</mat-card>\n\t<mat-card class=\"deja-select-demo demo-card demo-basic\">\n\t\t<mat-toolbar color=\"primary\">String Array Model</mat-toolbar>\n\t\t<mat-card-content>\n\t\t\t<span fxLayout=\"row\" fxLayoutAlign=\"start center\">\n\t\t\t\t<mat-form-field class=\"demo-half-width\" appearance=\"standard\">\n\t\t\t\t\t<deja-select placeholder=\"String Array Model\" selectionClearable [(ngModel)]=\"fruct\" modelIsValue=\"true\">\n\t\t\t\t\t\t<deja-item [value]=\"f\" [text]=\"f\" *ngFor=\"let f of fructs\"></deja-item>\n\t\t\t\t\t</deja-select>\n\t\t\t\t</mat-form-field>\n\t\t\t\t<span fxFlex=\"0 0 50%\" fxFlexOffset=\"5%\">Selected fruct model is: {{ fruct }}</span>\n\t\t\t</span>\n\t\t</mat-card-content>\n\t</mat-card>\n\t<mat-card class=\"deja-select-demo demo-card demo-basic\">\n\t\t<mat-toolbar color=\"primary\">Clearable content</mat-toolbar>\n\t\t<mat-card-content>\n\t\t\t<div>Add the selectionClearable attribute to enable the clear button</div>\n\t\t\t<mat-form-field class=\"demo-half-width\" appearance=\"standard\">\n\t\t\t\t<deja-select placeholder=\"Clearable content\" selectionClearable [(ngModel)]=\"businessCountry\" textField=\"naqme\" valueField=\"code\" [models]=\"countries\"></deja-select>\n\t\t\t</mat-form-field>\n\t\t</mat-card-content>\n\t</mat-card>\n\t<mat-card class=\"deja-select-demo demo-card demo-basic\">\n\t\t<mat-toolbar color=\"primary\">Disabled select</mat-toolbar>\n\t\t<mat-card-content>\n\t\t\t<div>\n\t\t\t\t<mat-checkbox [(ngModel)]=\"disabled\" color=\"primary\">Check me to disable select below</mat-checkbox>\n\t\t\t</div>\n\t\t\t<mat-form-field class=\"demo-half-width\" appearance=\"standard\">\n\t\t\t\t<deja-select placeholder=\"Disabled select\" [disabled]=\"disabled\" selectionClearable [(ngModel)]=\"businessCountry\" textField=\"naqme\" valueField=\"code\" [models]=\"countries\"></deja-select>\n\t\t\t</mat-form-field>\n\t\t</mat-card-content>\n\t</mat-card>\n</div>\n\n<div *ngIf=\"tabIndex === 2\">\n\t<mat-card class=\"deja-select-demo demo-card demo-basic\">\n\t\t<mat-toolbar color=\"primary\">Multiselect</mat-toolbar>\n\t\t<mat-card-content>\n\t\t\t<div>Multiselect example</div>\n\t\t\t<div fxLayout=\"column\">\n\t\t\t\t<div fxLayout=\"row\">\n\t\t\t\t\t<span fxFlex=\"0 0 45%\" fxLayout=\"column\">\n\t\t\t\t\t\t<mat-form-field fxFlex=\"0 0 auto\" appearance=\"outline\">\n\t\t\t\t\t\t\t<mat-label>Selection hidden</mat-label>\n\t\t\t\t\t\t\t<deja-select hideSelected type=\"multiselect\" textField=\"naqme\" valueField=\"code\" [(ngModel)]=\"multiselectModel\" [items]=\"countriesForMultiselect\"> </deja-select>\n\t\t\t\t\t\t</mat-form-field>\n\t\t\t\t\t</span>\n\t\t\t\t\t<span fxFlex=\"0 0 45%\" fxFlexOffset=\"5%\">\n\t\t\t\t\t\t<h4>Selected country model :</h4>\n\t\t\t\t\t\t<ul>\n\t\t\t\t\t\t\t<li *ngFor=\"let item of multiselectModel\">\n\t\t\t\t\t\t\t\t<span>{{ item.naqme }}</span>\n\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t</ul>\n\t\t\t\t\t</span>\n\t\t\t\t</div>\n\t\t\t\t<div fxLayout=\"row\">\n\t\t\t\t\t<span fxFlex=\"0 0 45%\" fxLayout=\"column\">\n\t\t\t\t\t\t<mat-form-field fxFlex=\"0 0 auto\" appearance=\"outline\">\n\t\t\t\t\t\t\t<mat-label>Selection visible and below</mat-label>\n\t\t\t\t\t\t\t<deja-select [readonly]=\"readonlyMultiSelect\" [disabled]=\"disableMultiSelect\" type=\"multiselect\" textField=\"naqme\" valueField=\"code\" [(ngModel)]=\"multiselectModel\" [items]=\"countriesForMultiselect\"> </deja-select>\n\t\t\t\t\t\t</mat-form-field>\n\t\t\t\t\t</span>\n\t\t\t\t\t<span fxFlex=\"0 0 45%\" fxFlexOffset=\"5%\">\n\t\t\t\t\t\t<section fxFlex=\"1 0 auto\" fxLayout=\"row\">\n\t\t\t\t\t\t\t<section fxLayout=\"column\">\n\t\t\t\t\t\t\t\t<span>Read only : </span>\n\t\t\t\t\t\t\t\t<span class=\"disable-check\">Disable : </span>\n\t\t\t\t\t\t\t</section>\n\t\t\t\t\t\t\t<section fxLayout=\"column\" fxFlexOffset=\"5%\">\n\t\t\t\t\t\t\t\t<mat-checkbox [(ngModel)]=\"readonlyMultiSelect\" [color]=\"'primary'\"></mat-checkbox>\n\t\t\t\t\t\t\t\t<mat-checkbox class=\"disable-check\" [(ngModel)]=\"disableMultiSelect\" [color]=\"'primary'\"></mat-checkbox>\n\t\t\t\t\t\t\t</section>\n\t\t\t\t\t\t</section>\n\t\t\t\t\t</span>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</mat-card-content>\n\t\t<mat-toolbar color=\"primary\">Grouping</mat-toolbar>\n\t\t<mat-card-content>\n\t\t\t<div>Grouping example</div>\n\t\t\t<mat-form-field class=\"demo-half-width\" appearance=\"standard\">\n\t\t\t\t<deja-select textField=\"naqme\" valueField=\"code\" [items]=\"groupedCountries\"></deja-select>\n\t\t\t</mat-form-field>\n\t\t</mat-card-content>\n\t\t<mat-toolbar color=\"primary\">Autocomplete</mat-toolbar>\n\t\t<mat-card-content>\n\t\t\t<div>Autocomplete 2 characters minimum</div>\n\t\t\t<mat-form-field class=\"demo-half-width\" appearance=\"standard\">\n\t\t\t\t<deja-select type=\"autocomplete\" [itemListService]=\"countriesListService\" textField=\"naqme\" valueField=\"code\" min-search-length=\"2\"></deja-select>\n\t\t\t</mat-form-field>\n\t\t</mat-card-content>\n\t</mat-card>\n</div>\n\n<div *ngIf=\"tabIndex === 3\">\n\t<mat-card class=\"deja-select-demo demo-card demo-basic\">\n\t\t<mat-toolbar color=\"primary\">Templating Examples</mat-toolbar>\n\t\t<mat-card-content>\n\t\t\t<h1>Item Template</h1>\n\t\t\t<div>An exemple with auto sized item template</div>\n\t\t\t<mat-form-field appearance=\"standard\">\n\t\t\t\t<deja-select #news type=\"select\" viewportMode=\"auto\" textField=\"title\" searchField=\"description\" [models]=\"news$\">\n\t\t\t\t\t<ng-template #itemTemplate let-item let-flatindex=\"flatindex\">\n\t\t\t\t\t\t<news-card [item]=\"item.model\" (imageLoaded)=\"imageLoaded(item)\"></news-card>\n\t\t\t\t\t</ng-template>\n\t\t\t\t</deja-select>\n\t\t\t</mat-form-field>\n\t\t\t<h1>Selected Template</h1>\n\t\t\t<div>Multi select with template for selected items</div>\n\t\t\t<mat-form-field appearance=\"standard\">\n\t\t\t\t<deja-select hideSelected type=\"multiselect\" textField=\"naqme\" valueField=\"code\" placeholder=\"Select one or more countries\" [(ngModel)]=\"multiselectModel\" [items]=\"countriesForMultiselect\">\n\t\t\t\t\t<ng-template #selectedTemplate let-item>\n\t\t\t\t\t\t<span id=\"flight\">\n\t\t\t\t\t\t\t<i *ngIf=\"item.code !== 'CH'\" class=\"material-icons\">flight_land</i>\n\t\t\t\t\t\t\t<i *ngIf=\"item.code === 'CH'\" class=\"material-icons\">flight_takeoff</i>\n\t\t\t\t\t\t\t<span>{{ item.naqme + ' - ' + item.code }}</span>\n\t\t\t\t\t\t</span>\n\t\t\t\t\t</ng-template>\n\t\t\t\t</deja-select>\n\t\t\t</mat-form-field>\n\t\t\t<h1>Place Holder and Group Template</h1>\n\t\t\t<div>Select with a place holder template containing an icon</div>\n\t\t\t<span fxLayout=\"row\">\n\t\t\t\t<mat-form-field fxFlex=\"0 0 45%\" appearance=\"standard\">\n\t\t\t\t\t<deja-select type=\"autocomplete\" textField=\"naqme\" valueField=\"code\" [items]=\"countries\">\n\t\t\t\t\t\t<ng-template #placeHolderTemplate>\n\t\t\t\t\t\t\t<mat-icon id=\"placeholder-icon\">public</mat-icon>\n\t\t\t\t\t\t\tPlace Holder Template\n\t\t\t\t\t\t</ng-template>\n\t\t\t\t\t</deja-select>\n\t\t\t\t</mat-form-field>\n\t\t\t\t<mat-form-field fxFlex=\"0 0 45%\" fxFlexOffset=\"5%\" appearance=\"standard\">\n\t\t\t\t\t<deja-select type=\"autocomplete\" placeholder=\"Group Template\" textField=\"naqme\" [items]=\"groupedCountries\">\n\t\t\t\t\t\t<ng-template #parentItemTemplate let-item>\n\t\t\t\t\t\t\t<mat-icon id=\"placeholder-icon\">public</mat-icon>&nbsp;\n\t\t\t\t\t\t\t<span>{{ item.groupName }}</span>\n\t\t\t\t\t\t</ng-template>\n\t\t\t\t\t</deja-select>\n\t\t\t\t</mat-form-field>\n\t\t\t</span>\n\t\t\t<h1>Hint and Suffix Templates</h1>\n\t\t\t<span fxLayout=\"row\">\n\t\t\t\t<mat-form-field fxFlex=\"0 0 45%\" appearance=\"standard\">\n\t\t\t\t\t<deja-select placeholder=\"Hint template select\" textField=\"naqme\" valueField=\"code\" [items]=\"countries\">\n\t\t\t\t\t\t<ng-template #hintTemplate>\n\t\t\t\t\t\t\t<span class=\"validation-error\">\n\t\t\t\t\t\t\t\tHint template. Can be used for the validations errors for exemple!\n\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t</ng-template>\n\t\t\t\t\t</deja-select>\n\t\t\t\t</mat-form-field>\n\t\t\t\t<mat-form-field fxFlex=\"0 0 45%\" fxFlexOffset=\"5%\" appearance=\"standard\">\n\t\t\t\t\t<deja-select placeholder=\"Suffix template selelct\" textField=\"naqme\" valueField=\"code\" [items]=\"countries\">\n\t\t\t\t\t\t<ng-template #suffixTemplate>\n\t\t\t\t\t\t\t<mat-icon id=\"placeholder-icon\">public</mat-icon>\n\t\t\t\t\t\t</ng-template>\n\t\t\t\t\t</deja-select>\n\t\t\t\t</mat-form-field>\n\t\t\t</span>\n\t\t\t<h1>Query Bold Template</h1>\n\t\t\t<span>\n\t\t\t\t<label>Highlight options:</label>\n\t\t\t</span>\n\t\t\t<div fxLayout=\"column\">\n\t\t\t\t<mat-checkbox [(ngModel)]=\"firstOccurenceOnly\" color=\"primary\">First occurence only ( [firstOccurenceOnly]='{{firstOccurenceOnly}}' )</mat-checkbox>\n\t\t\t\t<mat-checkbox [(ngModel)]=\"firstOccurencePerWordOnly\" color=\"primary\">First occurence per word only ( [firstOccurencePerWordOnly]='{{firstOccurencePerWordOnly}}' )</mat-checkbox>\n\t\t\t\t<mat-checkbox [(ngModel)]=\"atTheBeginningOfWordOnly\" color=\"primary\">At the beginning of word only ( [atTheBeginningOfWordOnly]='{{atTheBeginningOfWordOnly}}' )</mat-checkbox>\n\t\t\t\t<mat-checkbox [(ngModel)]=\"yellowBackgroundColorHighlight\" color=\"primary\">Highlight class name ( [highlightClassName]={{yellowBackgroundColorHighlight?'yellowBackgroundColorHighlight':'highlight'}})</mat-checkbox>\n\t\t\t</div>\n\t\t\t<div fxLayout=\"row\">\n\t\t\t\t<mat-form-field fxFlex=\"0 0 45%\" appearance=\"standard\">\n\t\t\t\t\t<deja-select placeholder=\"Bold query template select\" type=\"autocomplete\" textField=\"naqme\" valueField=\"code\" [items]=\"countries\">\n\t\t\t\t\t\t<ng-template #itemTemplate let-query=\"query\" let-item>\n\t\t\t\t\t\t\t<deja-bold-query [query]=\"query\" [value]=\"item.naqme+item.naqme+item.naqme+item.naqme+item.naqme\" [firstOccurenceOnly]=\"firstOccurenceOnly\" [firstOccurencePerWordOnly]=\"firstOccurencePerWordOnly\" [atTheBeginningOfWordOnly]=\"atTheBeginningOfWordOnly\" [highlightClassName]=\"yellowBackgroundColorHighlight?'yellowBackgroundColorHighlight':'highlight'\"></deja-bold-query>\n\t\t\t\t\t\t</ng-template>\n\t\t\t\t\t</deja-select>\n\t\t\t\t</mat-form-field>\n\t\t\t</div>\n\t\t</mat-card-content>\n\t</mat-card>\n</div>\n\n<div *ngIf=\"tabIndex === 4\">\n\t<mat-card class=\"deja-select-demo demo-card demo-basic\">\n\t\t<mat-toolbar color=\"primary\">Pre-Events and on Demand</mat-toolbar>\n\t\t<mat-card-content>\n\t\t\t<h1>On Demand Loading </h1>\n\t\t\t<div>The items are loaded after the drop down is opened</div>\n\t\t\t<mat-form-field class=\"demo-half-width\" appearance=\"standard\">\n\t\t\t\t<deja-select #ondemand textField=\"naqme\" valueField=\"code\" [loadingItems]=\"loadingItems()\" [placeholder]=\"onDemandPlaceHolder\"></deja-select>\n\t\t\t</mat-form-field>\n\t\t\t<h1>Confirm Selection and Unselection </h1>\n\t\t\t<div>A dialog will confirm the selection or the unselection of an item</div>\n\t\t\t<mat-form-field class=\"demo-half-width\" appearance=\"standard\">\n\t\t\t\t<deja-select hideSelected type=\"multiselect\" textField=\"naqme\" valueField=\"code\" placeholder=\"Selection hidden\" [(ngModel)]=\"multiselectModel\" [items]=\"countriesForMultiselect\" [selectingItem]=\"confirmDialog()\" [unselectingItem]=\"confirmDialogWithPromise()\"> </deja-select>\n\t\t\t</mat-form-field>\n\t\t\t<h1>Confirm Expand and Collapse </h1>\n\t\t\t<div>A dialog will confirm the expand and collapse or an item if the children are not loaded. The children will be loaded asynchronously after the item expansion.</div>\n\t\t\t<mat-form-field class=\"demo-half-width\" appearance=\"standard\">\n\t\t\t\t<deja-select #onexpand textField=\"naqme\" valueField=\"code\" [items]=\"onDemandGroupedCountries\" [expandingItem]=\"expandingItems()\" [collapsingItem]=\"collapsingItems()\">\n\t\t\t\t\t<ng-template #parentItemTemplate let-item>\n\t\t\t\t\t\t<span>{{ item.groupName }}</span>\n\t\t\t\t\t</ng-template>\n\t\t\t\t</deja-select>\n\t\t\t</mat-form-field>\n\t\t</mat-card-content>\n\t</mat-card>\n</div>\n\n<div *ngIf=\"tabIndex === 5\">\n\t<mat-card class=\"deja-select-demo demo-card demo-basic\">\n\t\t<mat-toolbar color=\"primary\">Performance Examples</mat-toolbar>\n\t\t<mat-card-content>\n\t\t\t<h1>10K items with Item Template </h1>\n\t\t\t<div>An exemple with 10000 auto sized templatized items</div>\n\t\t\t<mat-form-field appearance=\"standard\">\n\t\t\t\t<deja-select #news placeholder=\"10000 items select\" type=\"select\" viewportMode=\"auto\" textField=\"title\" searchField=\"description\" [models]=\"bigNews$\">\n\t\t\t\t\t<ng-template #itemTemplate let-item let-flatindex=\"flatindex\">\n\t\t\t\t\t\t<news-card [item]=\"item.model\" (imageLoaded)=\"imageLoaded(item)\"></news-card>\n\t\t\t\t\t</ng-template>\n\t\t\t\t</deja-select>\n\t\t\t</mat-form-field>\n\t\t\t<h1>Fixed size rows 100K items</h1>\n\t\t\t<div>An exemple with 100000 fixed size items</div>\n\t\t\t<span fxLayout=\"row\">\n\t\t\t\t<mat-form-field fxFlex=\"0 0 45%\" appearance=\"standard\">\n\t\t\t\t\t<deja-select #bigCountries type=\"autocomplete\" placeholder=\"100000 items select\" [items]=\"bigCountries$\" textField=\"naqme\" valueField=\"code\"></deja-select>\n\t\t\t\t</mat-form-field>\n\t\t\t\t<span fxFlex=\"0 0 45%\" fxFlexOffset=\"5%\">\n\t\t\t\t\t<h4 id=\"vptitle\">Viewport Infos:</h4>\n\t\t\t\t\t<div *ngFor=\"let info of viewPortInfos\">\n\t\t\t\t\t\t<span class=\"vpinfoname\">{{info.name}}</span>\n\t\t\t\t\t\t<span>{{info.value}}</span>\n\t\t\t\t\t</div>\n\t\t\t\t</span>\n\t\t\t</span>\n\t\t</mat-card-content>\n\t</mat-card>\n</div>\n\n<div *ngIf=\"tabIndex === 6\">\n\t<mat-card class=\"deja-select-demo demo-card demo-basic\">\n\t\t<mat-toolbar color=\"primary\">Minimal case</mat-toolbar>\n\t\t<mat-card-content>\n\n\t\t\t<form novalidate [formGroup]=\"fruitForm\">\n\t\t\t\t<div class=\"demo-half-width react-form-elem\">\n\t\t\t\t\t<h3>Select: </h3>\n\t\t\t\t\t<mat-form-field appearance=\"standard\">\n\t\t\t\t\t\t<deja-select placeholder=\"Fruit\" selectionClearable formControlName=\"fruitName\">\n\t\t\t\t\t\t\t<deja-item value=\"apple\" text=\"apple\"></deja-item>\n\t\t\t\t\t\t\t<deja-item value=\"banana\" text=\"banana\"></deja-item>\n\t\t\t\t\t\t\t<deja-item value=\"gruyère\" text=\"gruyère\"></deja-item>\n\t\t\t\t\t\t</deja-select>\n\t\t\t\t\t</mat-form-field>\n\t\t\t\t\t<mat-error align=\"end\">{{fruitForm.get('fruitName').errors ? fruitForm.get('fruitName').errors[0] : ''}}</mat-error>\n\t\t\t\t</div>\n\t\t\t</form>\n\n\t\t\t<div class=\"react-form-elem\">\n\t\t\t\t<h3>Your selection: </h3>\n\t\t\t\t<span>{{fruitForm.get('fruitName').value}}</span>\n\t\t\t</div>\n\n\t\t\t<div class=\"react-form-elem\">\n\t\t\t\t<h3>Code: </h3>\n\t\t\t\t<deja-markdown [url]=\"'assets/snippets/select-reactive-form.md'\"></deja-markdown>\n\t\t\t</div>\n\n\t\t</mat-card-content>\n\t</mat-card>\n\t<mat-card class=\"deja-select-demo demo-card demo-basic\">\n\t\t<mat-toolbar color=\"primary\">With models as an array of strings</mat-toolbar>\n\t\t<mat-card-content>\n\n\t\t\t<form novalidate [formGroup]=\"fruitFormModels\">\n\t\t\t\t<div class=\"demo-half-width react-form-elem\">\n\t\t\t\t\t<h3>Select: </h3>\n\t\t\t\t\t<mat-form-field appearance=\"standard\">\n\t\t\t\t\t\t<deja-select placeholder=\"Fruit\" selectionClearable [models]=\"fruits$\" formControlName=\"fruitName\"></deja-select>\n\t\t\t\t\t</mat-form-field>\n\t\t\t\t</div>\n\t\t\t</form>\n\n\t\t\t<div class=\"react-form-elem\">\n\t\t\t\t<h3>Your selection: </h3>\n\t\t\t\t<span>{{fruitFormModels.get('fruitName').value}}</span>\n\t\t\t</div>\n\n\t\t\t<div class=\"react-form-elem\">\n\t\t\t\t<h3>Code: </h3>\n\t\t\t\t<deja-markdown [url]=\"'assets/snippets/select-reactive-form-models.md'\"></deja-markdown>\n\t\t\t</div>\n\n\t\t</mat-card-content>\n\t</mat-card>\n</div>"

/***/ }),

/***/ "./src/app/select/select-demo.module.ts":
/*!**********************************************!*\
  !*** ./src/app/select/select-demo.module.ts ***!
  \**********************************************/
/*! exports provided: SelectDemoModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelectDemoModule", function() { return SelectDemoModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/flex-layout */ "./node_modules/@angular/flex-layout/esm5/flex-layout.es5.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_material_tabs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/tabs */ "./node_modules/@angular/material/esm5/tabs.es5.js");
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/toolbar */ "./node_modules/@angular/material/esm5/toolbar.es5.js");
/* harmony import */ var _deja_js_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @deja-js/core */ "./dist/deja-js/core/fesm5/deja-js-core.js");
/* harmony import */ var _deja_js_component_dialog__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @deja-js/component/dialog */ "./dist/deja-js/component/fesm5/deja-js-component-dialog.js");
/* harmony import */ var _deja_js_component_message_box__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @deja-js/component/message-box */ "./dist/deja-js/component/fesm5/deja-js-component-message-box.js");
/* harmony import */ var _deja_js_component_select__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @deja-js/component/select */ "./dist/deja-js/component/fesm5/deja-js-component-select.js");
/* harmony import */ var _deja_js_component_templates__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @deja-js/component/templates */ "./dist/deja-js/component/fesm5/deja-js-component-templates.js");
/* harmony import */ var _component_markdown_index__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../component/markdown/index */ "./src/component/markdown/index.ts");
/* harmony import */ var _common_news_card_module__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../common/news-card.module */ "./src/app/common/news-card.module.ts");
/* harmony import */ var _select_demo__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./select-demo */ "./src/app/select/select-demo.ts");
/* harmony import */ var _select_demo_routes__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./select-demo.routes */ "./src/app/select/select-demo.routes.ts");
/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

















var SelectDemoModule = /** @class */ (function () {
    function SelectDemoModule() {
    }
    SelectDemoModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [
                _select_demo__WEBPACK_IMPORTED_MODULE_15__["SelectDemoComponent"],
            ],
            exports: [_select_demo__WEBPACK_IMPORTED_MODULE_15__["SelectDemoComponent"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"],
                _angular_flex_layout__WEBPACK_IMPORTED_MODULE_3__["FlexLayoutModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ReactiveFormsModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatFormFieldModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatIconModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatCardModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatCheckboxModule"],
                _angular_material_tabs__WEBPACK_IMPORTED_MODULE_6__["MatTabsModule"],
                _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_7__["MatToolbarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatInputModule"],
                _deja_js_component_select__WEBPACK_IMPORTED_MODULE_11__["DejaSelectModule"],
                _component_markdown_index__WEBPACK_IMPORTED_MODULE_13__["DejaMarkdownModule"],
                _deja_js_component_message_box__WEBPACK_IMPORTED_MODULE_10__["DejaMessageBoxModule"],
                _deja_js_component_dialog__WEBPACK_IMPORTED_MODULE_9__["DejaDialogModule"],
                _deja_js_core__WEBPACK_IMPORTED_MODULE_8__["DejaItemModule"],
                _deja_js_component_templates__WEBPACK_IMPORTED_MODULE_12__["DejaBoldQueryModule"],
                _common_news_card_module__WEBPACK_IMPORTED_MODULE_14__["NewsCardModule"],
                _select_demo_routes__WEBPACK_IMPORTED_MODULE_16__["routing"],
            ],
            providers: [],
        })
    ], SelectDemoModule);
    return SelectDemoModule;
}());



/***/ }),

/***/ "./src/app/select/select-demo.routes.ts":
/*!**********************************************!*\
  !*** ./src/app/select/select-demo.routes.ts ***!
  \**********************************************/
/*! exports provided: routing */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "routing", function() { return routing; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _select_demo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./select-demo */ "./src/app/select/select-demo.ts");
/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */


var routes = [
    { path: '', component: _select_demo__WEBPACK_IMPORTED_MODULE_1__["SelectDemoComponent"] },
    { path: '**', redirectTo: '', pathMatch: 'full' },
];
var routing = _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forChild(routes);


/***/ }),

/***/ "./src/app/select/select-demo.scss":
/*!*****************************************!*\
  !*** ./src/app/select/select-demo.scss ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host .demo-card {\n  margin: 16px; }\n  :host .demo-card mat-card-content {\n    padding: 16px;\n    display: flex;\n    flex-direction: column; }\n  :host .demo-card mat-card-content mat-form-field {\n      flex-basis: auto;\n      flex-grow: 0;\n      flex-shrink: 0;\n      position: relative;\n      margin-top: 0.7rem; }\n  :host .demo-basic {\n  padding: 0; }\n  :host .demo-full-width {\n  width: 100%; }\n  :host .demo-half-width {\n  width: 45%; }\n  :host .demo-icons {\n  font-size: 100%;\n  height: inherit;\n  vertical-align: top;\n  width: inherit; }\n  :host #flight {\n  display: flex;\n  align-items: center; }\n  :host news-card {\n  width: 100%; }\n  :host news-card .text {\n    overflow-x: hidden; }\n  :host .vpinfoname {\n  display: inline-block;\n  width: 7rem; }\n  :host .disable-check {\n  margin-top: .5rem; }\n  :host .react-form-elem {\n  min-height: 5rem; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3RyYXZpcy9idWlsZC9EU0ktSFVHL2RlamFqcy1jb21wb25lbnRzL3NyYy9hcHAvc2VsZWN0L3NlbGVjdC1kZW1vLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFFRSxZQUFZLEVBQUE7RUFGZDtJQUlHLGFBQWE7SUFDYixhQUFhO0lBQ0osc0JBQXNCLEVBQUE7RUFObEM7TUFRSSxnQkFBZ0I7TUFDaEIsWUFBWTtNQUNaLGNBQWM7TUFDZCxrQkFBa0I7TUFDbEIsa0JBQWtCLEVBQUE7RUFadEI7RUFpQkUsVUFBVSxFQUFBO0VBakJaO0VBb0JFLFdBQVcsRUFBQTtFQXBCYjtFQXVCRSxVQUFVLEVBQUE7RUF2Qlo7RUEwQkUsZUFBZTtFQUNmLGVBQWU7RUFDZixtQkFBbUI7RUFDbkIsY0FBYyxFQUFBO0VBN0JoQjtFQWdDRSxhQUFhO0VBQ2IsbUJBQW1CLEVBQUE7RUFqQ3JCO0VBb0NRLFdBQVcsRUFBQTtFQXBDbkI7SUFzQ1ksa0JBQWtCLEVBQUE7RUF0QzlCO0VBMENRLHFCQUFxQjtFQUNyQixXQUFXLEVBQUE7RUEzQ25CO0VBOENRLGlCQUFpQixFQUFBO0VBOUN6QjtFQWlERSxnQkFBZ0IsRUFBQSIsImZpbGUiOiJzcmMvYXBwL3NlbGVjdC9zZWxlY3QtZGVtby5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiOmhvc3Qge1xuXHQuZGVtby1jYXJkIHtcblx0XHRtYXJnaW46IDE2cHg7XG5cdFx0bWF0LWNhcmQtY29udGVudCB7XG5cdFx0XHRwYWRkaW5nOiAxNnB4O1xuXHRcdFx0ZGlzcGxheTogZmxleDtcbiAgICAgICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgICAgICAgICBtYXQtZm9ybS1maWVsZCB7XG5cdFx0XHRcdGZsZXgtYmFzaXM6IGF1dG87XG5cdFx0XHRcdGZsZXgtZ3JvdzogMDtcblx0XHRcdFx0ZmxleC1zaHJpbms6IDA7XG5cdFx0XHRcdHBvc2l0aW9uOiByZWxhdGl2ZTtcblx0XHRcdFx0bWFyZ2luLXRvcDogMC43cmVtO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHQuZGVtby1iYXNpYyB7XG5cdFx0cGFkZGluZzogMDtcblx0fVxuXHQuZGVtby1mdWxsLXdpZHRoIHtcblx0XHR3aWR0aDogMTAwJTtcblx0fVxuXHQuZGVtby1oYWxmLXdpZHRoIHtcblx0XHR3aWR0aDogNDUlO1xuXHR9XG5cdC5kZW1vLWljb25zIHtcblx0XHRmb250LXNpemU6IDEwMCU7XG5cdFx0aGVpZ2h0OiBpbmhlcml0O1xuXHRcdHZlcnRpY2FsLWFsaWduOiB0b3A7XG5cdFx0d2lkdGg6IGluaGVyaXQ7XG5cdH1cblx0I2ZsaWdodCB7XG5cdFx0ZGlzcGxheTogZmxleDtcblx0XHRhbGlnbi1pdGVtczogY2VudGVyO1xuXHR9XG4gICAgbmV3cy1jYXJkIHtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgIC50ZXh0IHtcbiAgICAgICAgICAgIG92ZXJmbG93LXg6IGhpZGRlbjtcbiAgICAgICAgfVxuICAgIH1cbiAgICAudnBpbmZvbmFtZSB7XG4gICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICAgICAgd2lkdGg6IDdyZW07ICAgIFxuICAgIH1cbiAgICAuZGlzYWJsZS1jaGVjayB7XG4gICAgICAgIG1hcmdpbi10b3A6IC41cmVtO1xuXHR9XG5cdC5yZWFjdC1mb3JtLWVsZW17XG5cdFx0bWluLWhlaWdodDogNXJlbTtcblx0fVxufSJdfQ== */"

/***/ }),

/***/ "./src/app/select/select-demo.ts":
/*!***************************************!*\
  !*** ./src/app/select/select-demo.ts ***!
  \***************************************/
/*! exports provided: SelectDemoComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelectDemoComponent", function() { return SelectDemoComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _deja_js_component_select__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @deja-js/component/select */ "./dist/deja-js/component/fesm5/deja-js-component-select.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _services_countries_list_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../services/countries-list.service */ "./src/app/services/countries-list.service.ts");
/* harmony import */ var _services_countries_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../services/countries.service */ "./src/app/services/countries.service.ts");
/* harmony import */ var _services_news_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../services/news.service */ "./src/app/services/news.service.ts");
/* harmony import */ var _validators__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./validators */ "./src/app/select/validators.ts");
/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */










var SelectDemoComponent = /** @class */ (function () {
    function SelectDemoComponent(changeDetectorRef, countriesService, countriesListService, newsService, _fb) {
        var _this = this;
        this.changeDetectorRef = changeDetectorRef;
        this.countriesService = countriesService;
        this.countriesListService = countriesListService;
        this._fb = _fb;
        this.fruct = '';
        this.fructs = [];
        this.tabIndex = 1;
        this.dialogResponse$ = new rxjs__WEBPACK_IMPORTED_MODULE_4__["Subject"]();
        this.readonlyMultiSelect = false;
        this.disableMultiSelect = false;
        this._dialogVisible = false;
        this.onDemandPlaceHolder = 'Open to load';
        this.subscriptions = [];
        this.yellowBackgroundColorHighlight = true;
        this.firstOccurenceOnly = false;
        this.firstOccurencePerWordOnly = false;
        this.atTheBeginningOfWordOnly = false;
        this.multiselectModel = JSON.parse('[{"naqme":"ÅlandIslands","code":"AX","displayName":"ÅlandIslands","depth":0,"odd":true,"selected":true},{"naqme":"AmericanSamoa","code":"AS","displayName":"AmericanSamoa","depth":0,"odd":false,"selected":true},{"naqme":"Argentina","code":"AR","displayName":"Argentina","depth":0,"odd":false,"selected":true},{"naqme":"ChristmasIsland","code":"CX","displayName":"ChristmasIsland","depth":0,"odd":false,"selected":true},{"naqme":"Egypt","code":"EG","displayName":"Egypt","depth":0,"odd":true,"selected":true},{"naqme":"Dominica","code":"DM","displayName":"Dominica","depth":0,"odd":false,"selected":true}]');
        this.news$ = newsService.getNews$(50);
        this.bigNews$ = newsService.getNews$(10000);
        this.bigCountries$ = countriesService.getCountries$(null, 100000);
        this.country = new _services_countries_service__WEBPACK_IMPORTED_MODULE_7__["Country"]();
        this.country.code = 'CH';
        this.country.displayName = 'Switzerland';
        this.country.naqme = 'Switzerland';
        this.country.color = 'rgb(211, 47, 47)';
        this.countries = this.countriesService.getCountries$();
        this.fructs = [
            'Apricots',
            'Banana',
            'Cantaloupe',
            'Cherries',
            'Coconut',
            'Cranberries',
            'Durian',
            'Grapes',
            'Lemon',
            'Mango',
            'Pineapple',
            'Watermelon',
        ];
        this.fruits$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["of"])(this.fructs);
        this.subscriptions.push(this.countries.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["tap"])(function (value) { return _this.countriesForMultiselect = value; }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["delay"])(1))
            .subscribe(function () {
            _this.multiselectModel = JSON.parse('[{"naqme":"ÅlandIslands","code":"AX","displayName":"ÅlandIslands","depth":0,"odd":true,"selected":true},{"naqme":"AmericanSamoa","code":"AS","displayName":"AmericanSamoa","depth":0,"odd":false,"selected":true},{"naqme":"Argentina","code":"AR","displayName":"Argentina","depth":0,"odd":false,"selected":true},{"naqme":"ChristmasIsland","code":"CX","displayName":"ChristmasIsland","depth":0,"odd":false,"selected":true},{"naqme":"Egypt","code":"EG","displayName":"Egypt","depth":0,"odd":true,"selected":true},{"naqme":"Dominica","code":"DM","displayName":"Dominica","depth":0,"odd":false,"selected":true}]');
        }));
        this.subscriptions.push(this.countries
            .subscribe(function (value) {
            var result = [];
            var onDemandResult = [];
            var map = {};
            result.push({
                collapsible: true,
                collapsed: true,
                groupName: 'EmptyGroup',
                items: [],
                displayName: 'Empty Group',
                selectable: false,
            });
            value.map(function (country) {
                var groupName = "Group" + country.naqme[0];
                if (!map[groupName]) {
                    map[groupName] = [];
                    result.push({
                        collapsible: true,
                        groupName: groupName,
                        items: map[groupName],
                        naqme: groupName,
                        selectable: true,
                    });
                    onDemandResult.push({
                        collapsible: true,
                        collapsed: true,
                        groupName: groupName,
                        items: [{
                                displayName: 'loading...',
                                selectable: false,
                            }],
                        naqme: groupName,
                        selectable: false,
                        loaded: false,
                    });
                }
                map[groupName].push({ model: country });
            });
            _this.groupedCountries = result;
            _this.onDemandGroupedCountries = onDemandResult;
        }));
        this.fruitForm = this._fb.group({
            fruitName: ['', [_validators__WEBPACK_IMPORTED_MODULE_9__["cheeseValidator"]]],
        });
        this.fruitFormModels = this._fb.group({
            fruitName: [''],
        });
    }
    Object.defineProperty(SelectDemoComponent.prototype, "dialogVisible", {
        get: function () {
            return this._dialogVisible;
        },
        set: function (value) {
            this._dialogVisible = value;
            this.changeDetectorRef.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    SelectDemoComponent.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (subscription) { return subscription.unsubscribe(); });
    };
    SelectDemoComponent.prototype.loadingItems = function () {
        var self = this;
        return function (_query, _selectedItems) {
            self.onDemandSelect.waiter = true;
            self.onDemandPlaceHolder = 'loading...';
            return self.countriesService.getCountries$().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["delay"])(3000), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["tap"])(function () {
                self.onDemandSelect.waiter = false;
                self.onDemandPlaceHolder = 'Selected a country';
            }));
        };
    };
    SelectDemoComponent.prototype.collapsingItems = function () {
        var self = this;
        return function (item) {
            var country = item;
            return country.loaded ? Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["of"])(item) : self.confirmDialog()(item);
        };
    };
    SelectDemoComponent.prototype.expandingItems = function () {
        var _this = this;
        var self = this;
        return function (item) {
            var group = item;
            if (group.loaded) {
                return Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["of"])(item);
            }
            else {
                if (confirm('Please confirm your operation!')) {
                    Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["of"])(group).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["delay"])(2000), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["first"])())
                        .subscribe(function (grp) {
                        // Simulate asynchronous load
                        var original = _this.groupedCountries.find(function (c) { return c.displayName === grp.displayName; });
                        grp.items = original.items;
                        grp.loaded = true;
                        _this.onExpandSelect.refresh();
                    });
                    return Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["of"])(item);
                }
                else {
                    return Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["of"])(null);
                }
            }
        };
    };
    SelectDemoComponent.prototype.confirmDialogWithPromise = function () {
        var self = this;
        return function (item) {
            return self.confirmDialog()(item).toPromise();
        };
    };
    SelectDemoComponent.prototype.confirmDialog = function () {
        var _this = this;
        var self = this;
        return function (item) {
            self.dialogVisible = true;
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["from"])(_this.dialogResponse$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["first"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["map"])(function (response) {
                self.dialogVisible = false;
                return response === 'ok' ? item : null;
            }));
        };
    };
    Object.defineProperty(SelectDemoComponent.prototype, "bigCountriesSelect", {
        set: function (select) {
            var _this = this;
            if (this.viewPortInfos$) {
                this.viewPortInfos$.unsubscribe();
                this.viewPortInfos = [];
                delete this.viewPortInfos$;
            }
            this.viewPortInfos$ = select && select.viewPort.viewPort$.subscribe(function (viewPort) {
                _this.viewPortInfos = [
                    { name: 'beforeSize', value: String(viewPort.beforeSize), },
                    { name: 'startIndex', value: String(viewPort.startIndex), },
                    { name: 'viewPortSize', value: String(viewPort.viewPortSize), },
                    { name: 'visibleCount', value: String(viewPort.visibleItems && viewPort.visibleItems.length), },
                    { name: 'endIndex', value: String(viewPort.endIndex), },
                    { name: 'afterSize', value: String(viewPort.afterSize), },
                    { name: 'itemsCount', value: String(viewPort.items && viewPort.items.length), }
                ];
            });
        },
        enumerable: true,
        configurable: true
    });
    SelectDemoComponent.prototype.imageLoaded = function (item) {
        var itemExt = item;
        if (!itemExt.loaded) {
            itemExt.loaded = true;
            this.newsSelect.refreshViewPort(itemExt);
        }
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('news'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _deja_js_component_select__WEBPACK_IMPORTED_MODULE_3__["DejaSelectComponent"])
    ], SelectDemoComponent.prototype, "newsSelect", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('ondemand'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _deja_js_component_select__WEBPACK_IMPORTED_MODULE_3__["DejaSelectComponent"])
    ], SelectDemoComponent.prototype, "onDemandSelect", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('onexpand'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _deja_js_component_select__WEBPACK_IMPORTED_MODULE_3__["DejaSelectComponent"])
    ], SelectDemoComponent.prototype, "onExpandSelect", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('bigCountries'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _deja_js_component_select__WEBPACK_IMPORTED_MODULE_3__["DejaSelectComponent"]),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_deja_js_component_select__WEBPACK_IMPORTED_MODULE_3__["DejaSelectComponent"]])
    ], SelectDemoComponent.prototype, "bigCountriesSelect", null);
    SelectDemoComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'deja-select-demo',
            template: __webpack_require__(/*! ./select-demo.html */ "./src/app/select/select-demo.html"),
            styles: [__webpack_require__(/*! ./select-demo.scss */ "./src/app/select/select-demo.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"], _services_countries_service__WEBPACK_IMPORTED_MODULE_7__["CountriesService"], _services_countries_list_service__WEBPACK_IMPORTED_MODULE_6__["CountriesListService"], _services_news_service__WEBPACK_IMPORTED_MODULE_8__["NewsService"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"]])
    ], SelectDemoComponent);
    return SelectDemoComponent;
}());



/***/ }),

/***/ "./src/app/select/validators.ts":
/*!**************************************!*\
  !*** ./src/app/select/validators.ts ***!
  \**************************************/
/*! exports provided: cheeseValidator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cheeseValidator", function() { return cheeseValidator; });
/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */
var cheeseValidator = function (control) {
    var val = control.value;
    if (val === 'gruyère') {
        return [val + " is not a fruit"];
    }
};


/***/ })

}]);
//# sourceMappingURL=select-select-demo-module.js.map