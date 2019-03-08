(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["numeric-stepper-numeric-stepper-demo-module"],{

/***/ "./dist/deja-js/component/fesm5/deja-js-component-numeric-stepper.js":
/*!***************************************************************************!*\
  !*** ./dist/deja-js/component/fesm5/deja-js-component-numeric-stepper.js ***!
  \***************************************************************************/
/*! exports provided: DejaNumericStepperModule, createCounterRangeValidator, DejaNumericStepperComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DejaNumericStepperModule", function() { return DejaNumericStepperModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createCounterRangeValidator", function() { return createCounterRangeValidator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DejaNumericStepperComponent", function() { return DejaNumericStepperComponent; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/cdk/a11y */ "./node_modules/@angular/cdk/esm5/a11y.es5.js");
/* harmony import */ var _angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/cdk/coercion */ "./node_modules/@angular/cdk/esm5/coercion.es5.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _deja_js_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @deja-js/core */ "./dist/deja-js/core/fesm5/deja-js-core.js");










/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var createCounterRangeValidator = (/**
 * @param {?} maxValue
 * @param {?} minValue
 * @return {?}
 */
function (maxValue, minValue) {
    return (/**
     * @param {?} c
     * @return {?}
     */
    function (c) {
        /** @type {?} */
        var err = {
            rangeError: {
                given: c.value,
                max: maxValue,
                min: minValue
            }
        };
        if (c.value === null || c.value === undefined) {
            return null;
        }
        return ((maxValue && c.value > maxValue) || (minValue && c.value < minValue)) ? err : null;
    });
});
var DejaNumericStepperComponent = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__extends"])(DejaNumericStepperComponent, _super);
    function DejaNumericStepperComponent(dejaTextMetricsService, elementRef, changeDetectorRef, ngControl, fm, _parentForm, _parentFormGroup, _defaultErrorStateMatcher) {
        var _this = _super.call(this, _defaultErrorStateMatcher, _parentForm, _parentFormGroup, ngControl) || this;
        _this.dejaTextMetricsService = dejaTextMetricsService;
        _this.elementRef = elementRef;
        _this.changeDetectorRef = changeDetectorRef;
        _this.ngControl = ngControl;
        _this.fm = fm;
        _this.id = "deja-numeric-stepper-" + DejaNumericStepperComponent.nextId++;
        _this.describedBy = '';
        _this.controlType = 'deja-numeric-stepper';
        _this.errorState = false;
        _this.size = 0;
        _this.stateChanges = new rxjs__WEBPACK_IMPORTED_MODULE_7__["Subject"]();
        _this.focused = false;
        /**
         * Step for stepper : default 1
         */
        _this.step = 1;
        /**
         * Output to get the event when the value is modified (no validation)
         */
        _this.textChange = new _angular_core__WEBPACK_IMPORTED_MODULE_4__["EventEmitter"]();
        _this._required = false;
        _this._disabled = null;
        // NgModel implementation
        _this.onTouchedCallback = (/**
         * @return {?}
         */
        function () { });
        _this.onChangeCallback = (/**
         * @return {?}
         */
        function () { });
        _this.onValidatorChangeCallback = (/**
         * @return {?}
         */
        function () { });
        if (_this.ngControl) {
            _this.ngControl.valueAccessor = _this;
        }
        _this.fm.monitor(elementRef.nativeElement, true).subscribe((/**
         * @param {?} origin
         * @return {?}
         */
        function (origin) {
            _this.focused = !!origin;
            if (!_this.focused) {
                _this.onTouchedCallback();
            }
            _this.stateChanges.next();
        }));
        return _this;
    }
    Object.defineProperty(DejaNumericStepperComponent.prototype, "shouldLabelFloat", {
        get: /**
         * @return {?}
         */
        function () {
            return this.focused || !this.empty || this.alwaysDisplayUnit;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaNumericStepperComponent.prototype, "inputValidatorDirective", {
        set: /**
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
    Object.defineProperty(DejaNumericStepperComponent.prototype, "placeholder", {
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
    Object.defineProperty(DejaNumericStepperComponent.prototype, "alwaysDisplayUnit", {
        /** unit always visible */
        get: /**
         * unit always visible
         * @return {?}
         */
        function () {
            return this._alwaysDisplayUnit;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._alwaysDisplayUnit = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_3__["coerceBooleanProperty"])(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaNumericStepperComponent.prototype, "empty", {
        get: /**
         * @return {?}
         */
        function () {
            return !this._value && this._value !== 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaNumericStepperComponent.prototype, "disabled", {
        /**
         * Get disable value
         */
        get: /**
         * Get disable value
         * @return {?}
         */
        function () {
            return this.ngControl ? this.ngControl.disabled : this._disabled;
        },
        /** Allow to disabled the component */
        set: /**
         * Allow to disabled the component
         * @param {?} value
         * @return {?}
         */
        function (value) {
            /** @type {?} */
            var disabled = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_3__["coerceBooleanProperty"])(value);
            this._disabled = disabled || null;
            this.changeDetectorRef.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaNumericStepperComponent.prototype, "required", {
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
            this._required = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_3__["coerceBooleanProperty"])(req);
            this.stateChanges.next();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} changes
     * @return {?}
     */
    DejaNumericStepperComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes.min || changes.max) {
            this.validateFn = createCounterRangeValidator(this.max, this.min);
            if (this.ngControl && this.ngControl.control) {
                this.ngControl.control.setValidators(this.validateFn);
            }
        }
    };
    /**
     * @return {?}
     */
    DejaNumericStepperComponent.prototype.ngDoCheck = /**
     * @return {?}
     */
    function () {
        if (this.ngControl) {
            // We need to re-evaluate this on every change detection cycle, because there are some
            // error triggers that we can't subscribe to (e.g. parent form submissions). This means
            // that whatever logic is in here has to be super lean or we risk destroying the performance.
            this.updateErrorState();
        }
    };
    /**
     * @param {?} c
     * @return {?}
     */
    DejaNumericStepperComponent.prototype.validate = /**
     * @param {?} c
     * @return {?}
     */
    function (c) {
        return this.validateFn(c);
    };
    /**
     * @return {?}
     */
    DejaNumericStepperComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.stateChanges.complete();
        this.fm.stopMonitoring(this.elementRef.nativeElement);
    };
    /**
     * @param {?} ids
     * @return {?}
     */
    DejaNumericStepperComponent.prototype.setDescribedByIds = /**
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
    DejaNumericStepperComponent.prototype.onContainerClick = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (((/** @type {?} */ (event.target))).tagName.toLowerCase() !== 'input') {
            this.elementRef.nativeElement.querySelector('input').focus();
        }
    };
    Object.defineProperty(DejaNumericStepperComponent.prototype, "value", {
        // ************* ControlValueAccessor Implementation **************
        get: 
        // ************* ControlValueAccessor Implementation **************
        /**
         * @return {?}
         */
        function () {
            return this._value;
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
    DejaNumericStepperComponent.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (value === null || value === undefined) {
            this._value = value;
        }
        else {
            this._value = isNaN(value) ? null : +value;
        }
        this.checkSize(value);
        this.changeDetectorRef.markForCheck();
        this.textChange.emit(value);
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    DejaNumericStepperComponent.prototype.registerOnChange = /**
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
    DejaNumericStepperComponent.prototype.registerOnTouched = /**
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
    DejaNumericStepperComponent.prototype.setDisabledState = /**
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        this.disabled = isDisabled;
    };
    // ************* End of ControlValueAccessor Implementation **************
    // ************* End of ControlValueAccessor Implementation **************
    /**
     * @param {?=} value
     * @return {?}
     */
    DejaNumericStepperComponent.prototype.checkSize = 
    // ************* End of ControlValueAccessor Implementation **************
    /**
     * @param {?=} value
     * @return {?}
     */
    function (value) {
        this.size = this.dejaTextMetricsService.getTextWidth((value || this.value || 0).toString(), this.elementRef.nativeElement);
    };
    DejaNumericStepperComponent.nextId = 0;
    DejaNumericStepperComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["Component"], args: [{
                    changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_4__["ChangeDetectionStrategy"].OnPush,
                    providers: [{ provide: _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatFormFieldControl"], useExisting: DejaNumericStepperComponent }],
                    selector: 'deja-numeric-stepper',
                    template: "<input deja-child-validator matInput [class.off-limits]=\"value < min || value > max\" [disabled]=\"disabled\" #inputStepper type=\"number\" [(ngModel)]=\"value\" [min]=\"min\" [max]=\"max\" [step]=\"step\" [style.width.px]=\"size\" />\n<span class=\"unit\" *ngIf=\"unit && shouldLabelFloat\">{{ unit }}</span>\n\n<span class=\"steppers\">\n    <button [disabled]=\"disabled || value === min\" (click)=\"value = (value || 0) - step\" type=\"button\" tabindex=\"-1\">remove_circle_outline</button>\n    <button [disabled]=\"disabled || value === max\" (click)=\"value = (value || 0) + step\" type=\"button\" tabindex=\"-1\">add_circle_outline</button>\n</span>\n",
                    styles: [":host{display:flex;padding-right:3rem;position:relative}:host input{border:none;background:0 0;font:inherit;min-width:2px;outline:0;padding:0 2px 0 0;text-align:center}:host .unit{color:rgba(0,0,0,.55)}:host input::-webkit-inner-spin-button,:host input::-webkit-outer-spin-button{-webkit-appearance:none!important;margin:0!important;-moz-appearance:textfield!important}:host .steppers{flex:0 0 auto;display:flex;flex-direction:row;position:absolute;align-items:center;right:0;bottom:0;top:0}:host .steppers>span{font-family:'Material Icons';font-size:1.2rem}:host .steppers button{background:0 0;border:none;box-shadow:none;cursor:pointer;font-family:'Material Icons';font-size:1.5rem;justify-content:center;line-height:initial;min-width:initial;outline:0;padding:0;transition:color .2s}:host[disabled] .steppers button{cursor:not-allowed}"]
                }] }
    ];
    /** @nocollapse */
    DejaNumericStepperComponent.ctorParameters = function () { return [
        { type: _deja_js_core__WEBPACK_IMPORTED_MODULE_8__["DejaTextMetricsService"] },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["ElementRef"] },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["ChangeDetectorRef"] },
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NgControl"], decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["Self"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["Optional"] }] },
        { type: _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_2__["FocusMonitor"] },
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NgForm"], decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["Optional"] }] },
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormGroupDirective"], decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["Optional"] }] },
        { type: _angular_material__WEBPACK_IMPORTED_MODULE_6__["ErrorStateMatcher"] }
    ]; };
    DejaNumericStepperComponent.propDecorators = {
        id: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["HostBinding"] }],
        shouldLabelFloat: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["HostBinding"], args: ['class.floating',] }],
        describedBy: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["HostBinding"], args: ['attr.aria-describedby',] }],
        max: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["Input"] }],
        min: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["Input"] }],
        step: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["Input"] }],
        unit: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["Input"] }],
        inputValidatorDirective: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["ViewChild"], args: [_deja_js_core__WEBPACK_IMPORTED_MODULE_8__["DejaChildValidatorDirective"],] }],
        placeholder: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["Input"] }],
        alwaysDisplayUnit: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["Input"] }],
        textChange: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["Output"] }],
        disabled: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["Input"] }],
        required: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["Input"] }],
        _disabled: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["HostBinding"], args: ['attr.disabled',] }]
    };
    return DejaNumericStepperComponent;
}(_angular_material__WEBPACK_IMPORTED_MODULE_6__["_MatInputMixinBase"]));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var DejaNumericStepperModule = /** @class */ (function () {
    function DejaNumericStepperModule() {
    }
    DejaNumericStepperModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["NgModule"], args: [{
                    imports: [
                        _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
                        _deja_js_core__WEBPACK_IMPORTED_MODULE_8__["DejaChildValidatorModule"],
                        _deja_js_core__WEBPACK_IMPORTED_MODULE_8__["DejaTextMetricsModule"],
                        _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormsModule"],
                        _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatButtonModule"],
                        _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatFormFieldModule"],
                        _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatIconModule"],
                        _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatInputModule"],
                    ],
                    exports: [
                        DejaNumericStepperComponent,
                    ],
                    declarations: [
                        DejaNumericStepperComponent,
                    ],
                },] }
    ];
    return DejaNumericStepperModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */



//# sourceMappingURL=deja-js-component-numeric-stepper.js.map

/***/ }),

/***/ "./src/app/numeric-stepper/numeric-stepper-demo.component.html":
/*!*********************************************************************!*\
  !*** ./src/app/numeric-stepper/numeric-stepper-demo.component.html ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-tab-group [selectedIndex]=\"tabIndex\" (selectedTabChange)=\"tabIndex = $event.index\">\n\t<mat-tab label=\"API REFERENCE\"></mat-tab>\n\t<mat-tab label=\"EXAMPLES\"></mat-tab>\n</mat-tab-group>\n\n<mat-card class=\"demo-card demo-basic\" *ngIf=\"tabIndex === 0\">\n\t<deja-markdown [url]=\"'https://raw.githubusercontent.com/DSI-HUG/dejajs-components/dev/projects/deja-js/component/numeric-stepper/readme.md'\"></deja-markdown>\n</mat-card>\n\n<div *ngIf=\"tabIndex === 1\">\n\t<mat-card class=\"demo-card\">\n\t\t<mat-toolbar color=\"primary\">Numeric Stepper</mat-toolbar>\n\t\t<mat-card-content>\n\t\t\t<mat-form-field appearance=\"standard\">\n\t\t\t\t<mat-label>With unit standard</mat-label>\n\t\t\t\t<deja-numeric-stepper placeholder=\"With unit\" [min]=\"1\" [max]=\"10\" unit=\"kms\"></deja-numeric-stepper>\n\t\t\t</mat-form-field>\n\t\t\t<mat-form-field appearance=\"fill\">\n\t\t\t\t<mat-label>With unit fill</mat-label>\n\t\t\t\t<deja-numeric-stepper placeholder=\"With unit always displayed\" [min]=\"1\" [max]=\"10\" unit=\"kms\" alwaysDisplayUnit></deja-numeric-stepper>\n\t\t\t</mat-form-field>\n\t\t\t<mat-form-field appearance=\"outline\">\n\t\t\t\t<mat-label>With unit outline</mat-label>\n\t\t\t\t<deja-numeric-stepper placeholder=\"With unit\" [min]=\"1\" [max]=\"10\" unit=\"kms\"></deja-numeric-stepper>\n\t\t\t</mat-form-field>\n\t\t\t<mat-form-field appearance=\"outline\">\n\t\t\t\t<mat-label>Without unit</mat-label>\n\t\t\t\t<deja-numeric-stepper placeholder=\"Without unit\" [min]=\"1\" [max]=\"10\" [ngModel]=\"5\"></deja-numeric-stepper>\n\t\t\t</mat-form-field>\n\t\t\t<mat-form-field appearance=\"outline\">\n\t\t\t\t<mat-label>Disabled</mat-label>\n\t\t\t\t<deja-numeric-stepper placeholder=\"Disabled\" [min]=\"1\" [max]=\"10\" unit=\"kms\" disabled></deja-numeric-stepper>\n\t\t\t</mat-form-field>\n\t\t\t<deja-numeric-stepper placeholder=\"With unit\" [min]=\"1\" [max]=\"10\" unit=\"kms\"></deja-numeric-stepper>\n\t\t</mat-card-content>\n\t</mat-card>\n</div>"

/***/ }),

/***/ "./src/app/numeric-stepper/numeric-stepper-demo.component.ts":
/*!*******************************************************************!*\
  !*** ./src/app/numeric-stepper/numeric-stepper-demo.component.ts ***!
  \*******************************************************************/
/*! exports provided: DejaNumericStepperDemoComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DejaNumericStepperDemoComponent", function() { return DejaNumericStepperDemoComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */


var DejaNumericStepperDemoComponent = /** @class */ (function () {
    function DejaNumericStepperDemoComponent() {
        this.tabIndex = 1;
    }
    DejaNumericStepperDemoComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'deja-numeric-stepper-demo',
            template: __webpack_require__(/*! ./numeric-stepper-demo.component.html */ "./src/app/numeric-stepper/numeric-stepper-demo.component.html"),
            styles: ["\n    :host mat-card mat-card-content {\n        display: flex;\n        flex-direction: column;\n        align-items: flex-start;\n    }\n    "]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], DejaNumericStepperDemoComponent);
    return DejaNumericStepperDemoComponent;
}());



/***/ }),

/***/ "./src/app/numeric-stepper/numeric-stepper-demo.module.ts":
/*!****************************************************************!*\
  !*** ./src/app/numeric-stepper/numeric-stepper-demo.module.ts ***!
  \****************************************************************/
/*! exports provided: DejaNumericStepperDemoModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DejaNumericStepperDemoModule", function() { return DejaNumericStepperDemoModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/card */ "./node_modules/@angular/material/esm5/card.es5.js");
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/toolbar */ "./node_modules/@angular/material/esm5/toolbar.es5.js");
/* harmony import */ var _deja_js_component_numeric_stepper__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @deja-js/component/numeric-stepper */ "./dist/deja-js/component/fesm5/deja-js-component-numeric-stepper.js");
/* harmony import */ var _component_markdown_index__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../component/markdown/index */ "./src/component/markdown/index.ts");
/* harmony import */ var _numeric_stepper_demo_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./numeric-stepper-demo.component */ "./src/app/numeric-stepper/numeric-stepper-demo.component.ts");
/* harmony import */ var _numeric_stepper_demo_routes__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./numeric-stepper-demo.routes */ "./src/app/numeric-stepper/numeric-stepper-demo.routes.ts");
/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */











var DejaNumericStepperDemoModule = /** @class */ (function () {
    function DejaNumericStepperDemoModule() {
    }
    DejaNumericStepperDemoModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [_numeric_stepper_demo_component__WEBPACK_IMPORTED_MODULE_9__["DejaNumericStepperDemoComponent"]],
            exports: [_numeric_stepper_demo_component__WEBPACK_IMPORTED_MODULE_9__["DejaNumericStepperDemoComponent"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _angular_material_card__WEBPACK_IMPORTED_MODULE_5__["MatCardModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatTabsModule"],
                _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_6__["MatToolbarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatFormFieldModule"],
                _deja_js_component_numeric_stepper__WEBPACK_IMPORTED_MODULE_7__["DejaNumericStepperModule"],
                _component_markdown_index__WEBPACK_IMPORTED_MODULE_8__["DejaMarkdownModule"],
                _numeric_stepper_demo_routes__WEBPACK_IMPORTED_MODULE_10__["routing"],
            ],
            providers: [],
        })
    ], DejaNumericStepperDemoModule);
    return DejaNumericStepperDemoModule;
}());



/***/ }),

/***/ "./src/app/numeric-stepper/numeric-stepper-demo.routes.ts":
/*!****************************************************************!*\
  !*** ./src/app/numeric-stepper/numeric-stepper-demo.routes.ts ***!
  \****************************************************************/
/*! exports provided: routing */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "routing", function() { return routing; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _numeric_stepper_demo_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./numeric-stepper-demo.component */ "./src/app/numeric-stepper/numeric-stepper-demo.component.ts");
/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */


var routes = [
    { path: '', component: _numeric_stepper_demo_component__WEBPACK_IMPORTED_MODULE_1__["DejaNumericStepperDemoComponent"] },
    { path: '**', redirectTo: '', pathMatch: 'full' },
];
var routing = _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forChild(routes);


/***/ })

}]);
//# sourceMappingURL=numeric-stepper-numeric-stepper-demo-module.js.map