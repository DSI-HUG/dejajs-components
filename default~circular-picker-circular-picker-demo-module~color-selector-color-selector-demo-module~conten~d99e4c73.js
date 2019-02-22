(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~circular-picker-circular-picker-demo-module~color-selector-color-selector-demo-module~conten~d99e4c73"],{

/***/ "./dist/deja-js/component/fesm5/deja-js-component-content-editable.js":
/*!****************************************************************************!*\
  !*** ./dist/deja-js/component/fesm5/deja-js-component-content-editable.js ***!
  \****************************************************************************/
/*! exports provided: DejaEditableModule, DejaEditableDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DejaEditableModule", function() { return DejaEditableModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DejaEditableDirective", function() { return DejaEditableDirective; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/cdk/coercion */ "./node_modules/@angular/cdk/esm5/coercion.es5.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _deja_js_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @deja-js/core */ "./dist/deja-js/core/fesm5/deja-js-core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");









/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var noop = (/**
 * @return {?}
 */
function () { });
var DejaEditableDirective = /** @class */ (function () {
    function DejaEditableDirective(elementRef, _control) {
        var _this = this;
        this._control = _control;
        this.onTouchedCallback = noop;
        this.onChangeCallback = noop;
        this._inEdition = false;
        this._editMode = false;
        this._mandatory = false;
        this._multiline = false;
        this.edit$ = new rxjs__WEBPACK_IMPORTED_MODULE_6__["BehaviorSubject"]([false, false]);
        this.isAlive = true;
        this._disabled = null;
        if (this._control) {
            this._control.valueAccessor = this;
        }
        this.element = (/** @type {?} */ (elementRef.nativeElement));
        Object(rxjs__WEBPACK_IMPORTED_MODULE_6__["fromEvent"])(this.element, 'mousedown').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["takeWhile"])((/**
         * @return {?}
         */
        function () { return _this.isAlive; })))
            .subscribe((/**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            if (_this.inEdition || _this.disabled) {
                e.cancelBubble = true;
                return false;
            }
            else if (_this.editMode) {
                _this.edit$.next([true, true]);
                e.cancelBubble = true;
                return false;
            }
        }));
        /** @type {?} */
        var inEdition$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_6__["from"])(this.edit$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["filter"])((/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__read"])(_a, 1), value = _b[0];
            return value !== _this._inEdition;
        })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["map"])((/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__read"])(_a, 2), value = _b[0], selectOnFocus = _b[1];
            if (selectOnFocus !== false) {
                Object(rxjs__WEBPACK_IMPORTED_MODULE_6__["timer"])(10).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["first"])())
                    .subscribe((/**
                 * @return {?}
                 */
                function () {
                    _this.selectAll();
                    _this.focus();
                }));
            }
            return value;
        })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["tap"])((/**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            _this._inEdition = value;
            if (value) {
                _this.element.setAttribute('contenteditable', 'true');
            }
            else {
                _this.element.removeAttribute('contenteditable');
            }
            _this.refreshView();
        })));
        /** @type {?} */
        var kill$ = inEdition$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["filter"])((/**
         * @param {?} value
         * @return {?}
         */
        function (value) { return !value; })));
        inEdition$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["filter"])((/**
         * @param {?} value
         * @return {?}
         */
        function (value) { return value; })))
            .subscribe((/**
         * @return {?}
         */
        function () {
            Object(rxjs__WEBPACK_IMPORTED_MODULE_6__["fromEvent"])(_this.element.ownerDocument, 'mousedown').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["first"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["takeUntil"])(kill$), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["filter"])((/**
             * @param {?} event
             * @return {?}
             */
            function (event) { return !_this.isChildElement((/** @type {?} */ (event.target))); })))
                .subscribe((/**
             * @return {?}
             */
            function () {
                /** @type {?} */
                var text = _this.element.innerText.replace(/\n/g, '<br />').replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
                _this.onTouchedCallback();
                if (text || !_this.mandatory) {
                    _this.value = text;
                }
                _this.inEdition = false;
            }));
            Object(rxjs__WEBPACK_IMPORTED_MODULE_6__["fromEvent"])(_this.element, 'keydown').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["first"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["takeUntil"])(kill$))
                .subscribe((/**
             * @param {?} e
             * @return {?}
             */
            function (e) {
                e.cancelBubble = true;
                e.stopPropagation();
                if (e.keyCode === _deja_js_core__WEBPACK_IMPORTED_MODULE_5__["KeyCodes"].Enter && !_this.multiline) {
                    /** @type {?} */
                    var text = _this.element.innerText;
                    if (text || !_this.mandatory) {
                        _this.value = text;
                    }
                    _this.inEdition = false;
                    return false;
                }
                else if (e.keyCode === _deja_js_core__WEBPACK_IMPORTED_MODULE_5__["KeyCodes"].Escape) {
                    _this.inEdition = false;
                    return false;
                }
                return false;
            }));
        }));
    }
    Object.defineProperty(DejaEditableDirective.prototype, "mandatory", {
        /** Retourne une valeur indiquant si le contenu édité est obligatoire. Si la valeur est 'true' la sortie du mode édition ne sera pas possible tant qu'un contenu n'est pas ajouté. */
        get: /**
         * Retourne une valeur indiquant si le contenu édité est obligatoire. Si la valeur est 'true' la sortie du mode édition ne sera pas possible tant qu'un contenu n'est pas ajouté.
         * @return {?}
         */
        function () {
            return this._mandatory;
        },
        /** Définit une valeur indiquant si le contenu édité est obligatoire. Si la valeur est 'true' la sortie du mode édition ne sera pas possible tant qu'un contenu n'est pas ajouté. */
        set: /**
         * Définit une valeur indiquant si le contenu édité est obligatoire. Si la valeur est 'true' la sortie du mode édition ne sera pas possible tant qu'un contenu n'est pas ajouté.
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._mandatory = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_2__["coerceBooleanProperty"])(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaEditableDirective.prototype, "multiline", {
        /** Retourne une valeur indiquant si le contenu édité est multiligne */
        get: /**
         * Retourne une valeur indiquant si le contenu édité est multiligne
         * @return {?}
         */
        function () {
            return this._multiline;
        },
        /** Définit une valeur indiquant si le contenu édité est multiligne */
        set: /**
         * Définit une valeur indiquant si le contenu édité est multiligne
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._multiline = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_2__["coerceBooleanProperty"])(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaEditableDirective.prototype, "disabled", {
        get: /**
         * @return {?}
         */
        function () {
            return (this._control && this._control.disabled) || this._disabled;
        },
        /** Permet de désactiver le controle */
        set: /**
         * Permet de désactiver le controle
         * @param {?} value
         * @return {?}
         */
        function (value) {
            /** @type {?} */
            var disabled = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_2__["coerceBooleanProperty"])(value);
            this._disabled = disabled || null;
            if (this.disabled) {
                this.edit$.next([false, false]);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaEditableDirective.prototype, "editMode", {
        /** Retourne une valeur indiquant si l'édition est activée. */
        get: /**
         * Retourne une valeur indiquant si l'édition est activée.
         * @return {?}
         */
        function () {
            return this._editMode;
        },
        /** Définit une valeur indiquant si l'édition est activée. */
        set: /**
         * Définit une valeur indiquant si l'édition est activée.
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._editMode = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_2__["coerceBooleanProperty"])(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaEditableDirective.prototype, "inEdition", {
        /** Retourne une valeur indiquant si l'élément est en édition. */
        get: /**
         * Retourne une valeur indiquant si l'élément est en édition.
         * @return {?}
         */
        function () {
            return this._inEdition;
        },
        /** Définit une valeur indiquant si l'élément est en édition. */
        set: /**
         * Définit une valeur indiquant si l'élément est en édition.
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (this.disabled) {
                return;
            }
            this.edit$.next([Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_2__["coerceBooleanProperty"])(value), false]);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaEditableDirective.prototype, "value", {
        // get accessor
        get: 
        // get accessor
        /**
         * @return {?}
         */
        function () {
            return this.model;
        },
        // ************* ControlValueAccessor Implementation **************
        // set accessor including call the onchange callback
        set: 
        // ************* ControlValueAccessor Implementation **************
        // set accessor including call the onchange callback
        /**
         * @param {?} model
         * @return {?}
         */
        function (model) {
            if (model !== this.model) {
                this.writeValue(model);
                this.onChangeCallback(model);
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
    DejaEditableDirective.prototype.writeValue = 
    // From ControlValueAccessor interface
    /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.model = value;
        this.refreshView();
    };
    // From ControlValueAccessor interface
    // From ControlValueAccessor interface
    /**
     * @param {?} fn
     * @return {?}
     */
    DejaEditableDirective.prototype.registerOnChange = 
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
    DejaEditableDirective.prototype.registerOnTouched = 
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
    DejaEditableDirective.prototype.setDisabledState = /**
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
    DejaEditableDirective.prototype.ngOnInit = 
    // ************* End of ControlValueAccessor Implementation **************
    /**
     * @return {?}
     */
    function () {
        this.model = this.element.innerHTML;
    };
    /**
     * @return {?}
     */
    DejaEditableDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.isAlive = false;
    };
    /** Donne le focus à la zone d'édition. */
    /**
     * Donne le focus à la zone d'édition.
     * @return {?}
     */
    DejaEditableDirective.prototype.focus = /**
     * Donne le focus à la zone d'édition.
     * @return {?}
     */
    function () {
        this.element.focus();
    };
    /** Place toute la zone d'édition en selectioné. */
    /**
     * Place toute la zone d'édition en selectioné.
     * @return {?}
     */
    DejaEditableDirective.prototype.selectAll = /**
     * Place toute la zone d'édition en selectioné.
     * @return {?}
     */
    function () {
        /** @type {?} */
        var range = document.createRange();
        range.selectNodeContents(this.element);
        /** @type {?} */
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    };
    /** Active la zone d'édition. */
    /**
     * Active la zone d'édition.
     * @param {?=} selectOnFocus
     * @return {?}
     */
    DejaEditableDirective.prototype.edit = /**
     * Active la zone d'édition.
     * @param {?=} selectOnFocus
     * @return {?}
     */
    function (selectOnFocus) {
        this.edit$.next([!this.disabled, selectOnFocus]);
    };
    /**
     * @private
     * @param {?} element
     * @return {?}
     */
    DejaEditableDirective.prototype.isChildElement = /**
     * @private
     * @param {?} element
     * @return {?}
     */
    function (element) {
        /** @type {?} */
        var parentElement = element;
        while (parentElement && parentElement !== this.element) {
            parentElement = parentElement.parentElement;
        }
        return parentElement === this.element;
    };
    /**
     * @private
     * @return {?}
     */
    DejaEditableDirective.prototype.refreshView = /**
     * @private
     * @return {?}
     */
    function () {
        if (!this.model) {
            return;
        }
        if (this.inEdition) {
            this.element.innerText = this.model.replace(/<br\s*[\/]?>/gi, '\n');
        }
        else {
            this.element.innerHTML = this.model.replace(/\n/g, '<br />');
        }
    };
    DejaEditableDirective.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Directive"], args: [{
                    selector: '[deja-editable]',
                },] }
    ];
    /** @nocollapse */
    DejaEditableDirective.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ElementRef"] },
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NgControl"], decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Self"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Optional"] }] }
    ]; };
    DejaEditableDirective.propDecorators = {
        _disabled: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["HostBinding"], args: ['attr.disabled',] }],
        mandatory: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
        multiline: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
        disabled: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
        editMode: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"], args: ['deja-editable',] }],
        inEdition: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }]
    };
    return DejaEditableDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var DejaEditableModule = /** @class */ (function () {
    function DejaEditableModule() {
    }
    DejaEditableModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["NgModule"], args: [{
                    declarations: [DejaEditableDirective],
                    exports: [DejaEditableDirective],
                    imports: [
                        _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
                        _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"],
                    ],
                },] }
    ];
    return DejaEditableModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */



//# sourceMappingURL=deja-js-component-content-editable.js.map

/***/ })

}]);
//# sourceMappingURL=default~circular-picker-circular-picker-demo-module~color-selector-color-selector-demo-module~conten~d99e4c73.js.map