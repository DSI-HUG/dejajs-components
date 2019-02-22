(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~circular-picker-circular-picker-demo-module~color-selector-color-selector-demo-module~conten~394e55c4"],{

/***/ "./dist/deja-js/component/fesm5/deja-js-component-chips.js":
/*!*****************************************************************!*\
  !*** ./dist/deja-js/component/fesm5/deja-js-component-chips.js ***!
  \*****************************************************************/
/*! exports provided: DejaChipsModule, DejaChipsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DejaChipsModule", function() { return DejaChipsModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DejaChipsComponent", function() { return DejaChipsComponent; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/cdk/coercion */ "./node_modules/@angular/cdk/esm5/coercion.es5.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");






/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var noop = (/**
 * @return {?}
 */
function () { });
var DejaChipsComponent = /** @class */ (function () {
    function DejaChipsComponent(_control) {
        this._control = _control;
        /**
         * Lecture seule
         */
        this.readonly = false;
        this.close = new _angular_core__WEBPACK_IMPORTED_MODULE_3__["EventEmitter"]();
        this.onTouchedCallback = noop;
        this.onChangeCallback = noop;
        this._disabled = null;
        if (this._control) {
            this._control.valueAccessor = this;
        }
    }
    Object.defineProperty(DejaChipsComponent.prototype, "disabled", {
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
            this._disabled = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_2__["coerceBooleanProperty"])(value) || null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaChipsComponent.prototype, "items", {
        get: /**
         * @return {?}
         */
        function () {
            return this._items;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.writeValue(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaChipsComponent.prototype, "value", {
        // get accessor
        get: 
        // get accessor
        /**
         * @return {?}
         */
        function () {
            return this._items;
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
            this.writeValue(value);
            this.onChangeCallback(value);
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
    DejaChipsComponent.prototype.writeValue = 
    // From ControlValueAccessor interface
    /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this._items = value;
    };
    // From ControlValueAccessor interface
    // From ControlValueAccessor interface
    /**
     * @param {?} fn
     * @return {?}
     */
    DejaChipsComponent.prototype.registerOnChange = 
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
    DejaChipsComponent.prototype.registerOnTouched = 
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
    DejaChipsComponent.prototype.setDisabledState = /**
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        this.disabled = isDisabled;
    };
    Object.defineProperty(DejaChipsComponent.prototype, "itemTemplate", {
        // ************* End of ControlValueAccessor Implementation **************
        get: 
        // ************* End of ControlValueAccessor Implementation **************
        /**
         * @return {?}
         */
        function () {
            return this.itemTemplateExternal || this.itemTemplateInternal;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaChipsComponent.prototype, "insertTemplate", {
        get: /**
         * @return {?}
         */
        function () {
            return this.insertTemplateExternal || this.insertTemplateInternal;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} value
     * @return {?}
     */
    DejaChipsComponent.prototype.getTextValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (!value) {
            return '';
        }
        else {
            if (this.textField && value.model && value.model[this.textField] !== undefined) {
                return value.model[this.textField];
            }
            else if (this.textField && value[this.textField] !== undefined) {
                return value[this.textField];
            }
            else if (value.displayName) {
                return typeof value.displayName === 'string' ? value.displayName : value.displayName();
            }
            else if (typeof value.toString === 'function') {
                return value.toString();
            }
        }
    };
    /**
     * @param {?} item
     * @param {?} index
     * @return {?}
     */
    DejaChipsComponent.prototype.onClose = /**
     * @param {?} item
     * @param {?} index
     * @return {?}
     */
    function (item, index) {
        /** @type {?} */
        var event = (/** @type {?} */ (new CustomEvent('DejaChipsCloseEvent', {})));
        event.item = item;
        event.index = index;
        this.items.splice(index, 1);
        this.onChangeCallback(this.items);
        this.close.emit(event);
    };
    DejaChipsComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"], args: [{
                    selector: 'deja-chips',
                    template: "<span class=\"chips-item\" *ngFor=\"let item of items; let index = index\">\n\t<span *ngIf=\"!itemTemplate\">{{ getTextValue(item) }}</span>\n\t<span *ngIf=\"itemTemplate\">\n\t\t<ng-template [ngTemplateOutlet]=\"itemTemplate\" [ngTemplateOutletContext]=\"{ $implicit: item, index: index }\"></ng-template>\n\t</span>\n\t<mat-icon id=\"close-button\" *ngIf=\"!readonly && !disabled\" (click)=\"onClose(item, index)\">close</mat-icon>\n</span>\n<span class=\"insert-item\" *ngIf=\"insertTemplate\">\n\t<ng-template [ngTemplateOutlet]=\"insertTemplate\" [ngTemplateOutletContext]=\"{ }\"></ng-template>\n</span>",
                    styles: [":host{margin:0;padding:0;overflow:hidden;display:flex;flex-wrap:wrap;align-items:center}:host[disabled]>span.chips-item>span{font-style:italic}:host>span.insert-item{flex:1 1 auto}:host>span.chips-item{margin:.1rem;padding:.38rem;flex:0 0 auto;border-radius:.88rem;display:flex;align-items:center;text-decoration:none;transition:.3s;cursor:default}:host>span.chips-item #close-button{zoom:72%;z-index:3;cursor:pointer}"]
                }] }
    ];
    /** @nocollapse */
    DejaChipsComponent.ctorParameters = function () { return [
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NgControl"], decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Self"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Optional"] }] }
    ]; };
    DejaChipsComponent.propDecorators = {
        _items: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
        textField: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
        itemTemplateExternal: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
        insertTemplateExternal: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
        readonly: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
        close: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Output"] }],
        _disabled: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["HostBinding"], args: ['attr.disabled',] }],
        itemTemplateInternal: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ContentChild"], args: ['itemTemplate',] }],
        insertTemplateInternal: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ContentChild"], args: ['insertTemplate',] }],
        disabled: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
        items: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }]
    };
    return DejaChipsComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var DejaChipsModule = /** @class */ (function () {
    function DejaChipsModule() {
    }
    DejaChipsModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["NgModule"], args: [{
                    declarations: [DejaChipsComponent],
                    exports: [DejaChipsComponent],
                    imports: [
                        _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
                        _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"],
                        _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatIconModule"],
                    ],
                },] }
    ];
    return DejaChipsModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */



//# sourceMappingURL=deja-js-component-chips.js.map

/***/ }),

/***/ "./dist/deja-js/core/fesm5/deja-js-core-util.js":
/*!******************************************************!*\
  !*** ./dist/deja-js/core/fesm5/deja-js-core-util.js ***!
  \******************************************************/
/*! exports provided: HtmlUtils, RegExpUtils, DateUtils */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HtmlUtils", function() { return HtmlUtils; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegExpUtils", function() { return RegExpUtils; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DateUtils", function() { return DateUtils; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");


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
var HtmlUtils = /** @class */ (function () {
    function HtmlUtils() {
    }
    /**
     * @param {?} jsonObjParameters
     * @return {?}
     */
    HtmlUtils.getEncodedURIComponent = /**
     * @param {?} jsonObjParameters
     * @return {?}
     */
    function (jsonObjParameters) {
        if (jsonObjParameters) {
            /** @type {?} */
            var params = [];
            for (var p in jsonObjParameters) {
                if (jsonObjParameters.hasOwnProperty(p)) {
                    params.push(encodeURIComponent(p) + "=" + encodeURIComponent(jsonObjParameters[p]));
                }
            }
            return params.join('&');
        }
        return '';
    };
    return HtmlUtils;
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
var RegExpUtils = /** @class */ (function () {
    function RegExpUtils() {
    }
    /**
     * escape all regexp special chars.
     *
     * @param value
     * @returns the regexp special chars escaped string
     */
    /**
     * escape all regexp special chars.
     *
     * @param {?} value
     * @return {?} the regexp special chars escaped string
     */
    RegExpUtils.escapeRegExp = /**
     * escape all regexp special chars.
     *
     * @param {?} value
     * @return {?} the regexp special chars escaped string
     */
    function (value) {
        if (!value) {
            return value;
        }
        return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
    };
    return RegExpUtils;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Date conversion for DPI standards
 */
var DateUtils = /** @class */ (function () {
    function DateUtils() {
    }
    /**
     * Fromat a javascript date object to a 'yyyy-MM-dd HH:mm:ss' String Format
     * @param date
     */
    /**
     * Fromat a javascript date object to a 'yyyy-MM-dd HH:mm:ss' String Format
     * @param {?} date
     * @return {?}
     */
    DateUtils.formatSystem = /**
     * Fromat a javascript date object to a 'yyyy-MM-dd HH:mm:ss' String Format
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return DateUtils.datePipe.transform(date, DateUtils.SYSTEM_DATE_FORMAT);
    };
    DateUtils.SYSTEM_DATE_FORMAT = 'yyyy-MM-dd HH:mm:ss';
    DateUtils.datePipe = new _angular_common__WEBPACK_IMPORTED_MODULE_0__["DatePipe"]('fr-CH');
    return DateUtils;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */



//# sourceMappingURL=deja-js-core-util.js.map

/***/ })

}]);
//# sourceMappingURL=default~circular-picker-circular-picker-demo-module~color-selector-color-selector-demo-module~conten~394e55c4.js.map