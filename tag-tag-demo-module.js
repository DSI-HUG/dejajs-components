(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["tag-tag-demo-module"],{

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

/***/ "./dist/deja-js/component/fesm5/deja-js-component-tag.js":
/*!***************************************************************!*\
  !*** ./dist/deja-js/component/fesm5/deja-js-component-tag.js ***!
  \***************************************************************/
/*! exports provided: DejaTagModule, DejaTagComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DejaTagModule", function() { return DejaTagModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DejaTagComponent", function() { return DejaTagComponent; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/icon */ "./node_modules/@angular/material/esm5/icon.es5.js");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/input */ "./node_modules/@angular/material/esm5/input.es5.js");
/* harmony import */ var _deja_js_component_chips__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @deja-js/component/chips */ "./dist/deja-js/component/fesm5/deja-js-component-chips.js");
/* harmony import */ var _angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/cdk/coercion */ "./node_modules/@angular/cdk/esm5/coercion.es5.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _deja_js_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @deja-js/core */ "./dist/deja-js/core/fesm5/deja-js-core.js");









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
 * Deja Tag Component for Angular
 *
 * This component allow you to manage element into an array of string
 */
var DejaTagComponent = /** @class */ (function () {
    function DejaTagComponent(_control) {
        this._control = _control;
        /**
         * Current value into the input
         */
        this.text = '';
        /**
         * Current value of the array of string
         */
        this.items = [];
        this._disabled = null;
        // NgModel implementation
        this.onTouchedCallback = noop;
        this.onChangeCallback = noop;
        this.onValidatorChangeCallback = noop;
        if (this._control) {
            this._control.valueAccessor = this;
        }
    }
    Object.defineProperty(DejaTagComponent.prototype, "disabled", {
        /**
         * Get disable value
         */
        get: /**
         * Get disable value
         * @return {?}
         */
        function () {
            return this._control ? this._control.disabled : this._disabled;
        },
        /** Allow to disabled the component */
        set: /**
         * Allow to disabled the component
         * @param {?} value
         * @return {?}
         */
        function (value) {
            /** @type {?} */
            var disabled = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_4__["coerceBooleanProperty"])(value);
            this._disabled = disabled || null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaTagComponent.prototype, "value", {
        // ************* ControlValueAccessor Implementation **************
        get: 
        // ************* ControlValueAccessor Implementation **************
        /**
         * @return {?}
         */
        function () {
            return this.items;
        },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            this.writeValue(val);
            this.onChangeCallback(val);
            this.onTouchedCallback();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} value
     * @return {?}
     */
    DejaTagComponent.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.items = value ? value : [];
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    DejaTagComponent.prototype.registerOnChange = /**
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
    DejaTagComponent.prototype.registerOnTouched = /**
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
    DejaTagComponent.prototype.setDisabledState = /**
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        this.disabled = isDisabled;
    };
    // ************* End of ControlValueAccessor Implementation **************
    /**
     * Trigerred when user press key into the component
     */
    // ************* End of ControlValueAccessor Implementation **************
    /**
     * Trigerred when user press key into the component
     * @param {?} e
     * @return {?}
     */
    DejaTagComponent.prototype.onKeyDown = 
    // ************* End of ControlValueAccessor Implementation **************
    /**
     * Trigerred when user press key into the component
     * @param {?} e
     * @return {?}
     */
    function (e) {
        if (e.keyCode === _deja_js_core__WEBPACK_IMPORTED_MODULE_7__["KeyCodes"].Enter) {
            /** @type {?} */
            var target = (/** @type {?} */ (e.target));
            this.onAddItem(target.value);
        }
    };
    /**
     * Add item into the the list
     * @param val : Value of the text to add
     */
    /**
     * Add item into the the list
     * @param {?} val : Value of the text to add
     * @return {?}
     */
    DejaTagComponent.prototype.onAddItem = /**
     * Add item into the the list
     * @param {?} val : Value of the text to add
     * @return {?}
     */
    function (val) {
        if (val) {
            this.items.push(val);
            this.value = this.items;
            this.text = '';
        }
    };
    DejaTagComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_5__["Component"], args: [{
                    selector: 'deja-tag',
                    template: "<deja-chips [items]=\"items\" [disabled]=\"disabled\"></deja-chips>\n<mat-form-field>\n    <input matInput [(ngModel)]=\"text\" matInput (keydown)=\"onKeyDown($event)\" [placeholder]=\"placeholder\" [disabled]=\"disabled\" autocomplete=\"off\">\n    <div (click)=\"onAddItem(text)\" matSuffix><mat-icon class=\"matSuffix\">add</mat-icon></div>\n</mat-form-field>",
                    styles: [":host .mat-form-field{display:block;width:100%}:host .mat-form-field i:hover{cursor:pointer}"]
                }] }
    ];
    /** @nocollapse */
    DejaTagComponent.ctorParameters = function () { return [
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_6__["NgControl"], decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_5__["Self"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_5__["Optional"] }] }
    ]; };
    DejaTagComponent.propDecorators = {
        placeholder: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_5__["Input"] }],
        disabled: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_5__["Input"] }],
        _disabled: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_5__["HostBinding"], args: ['attr.disabled',] }]
    };
    return DejaTagComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var DejaTagModule = /** @class */ (function () {
    function DejaTagModule() {
    }
    DejaTagModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_5__["NgModule"], args: [{
                    declarations: [DejaTagComponent],
                    exports: [DejaTagComponent],
                    imports: [
                        _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
                        _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormsModule"],
                        _angular_material_icon__WEBPACK_IMPORTED_MODULE_1__["MatIconModule"],
                        _angular_material_input__WEBPACK_IMPORTED_MODULE_2__["MatInputModule"],
                        _deja_js_component_chips__WEBPACK_IMPORTED_MODULE_3__["DejaChipsModule"],
                    ],
                    providers: [],
                },] }
    ];
    return DejaTagModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */



//# sourceMappingURL=deja-js-component-tag.js.map

/***/ }),

/***/ "./src/app/tag/tag-demo.component.html":
/*!*********************************************!*\
  !*** ./src/app/tag/tag-demo.component.html ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-tab-group [selectedIndex]=\"tabIndex\" (selectedTabChange)=\"tabIndex = $event.index\">\n    <mat-tab label=\"API REFERENCE\"></mat-tab>\n    <mat-tab label=\"EXAMPLES\"></mat-tab>\n</mat-tab-group>\n\n<mat-card class=\"demo-card demo-basic\" *ngIf=\"tabIndex === 0\">\n    TODO\n</mat-card>\n<mat-card class=\"demo-card demo-basic\" *ngIf=\"tabIndex === 1\">\n    <mat-toolbar color=\"primary\">Tag Component</mat-toolbar>\n    <mat-card-content>\n        <deja-tag [(ngModel)]=\"values\" placeholder=\"Add tags\"></deja-tag>\n\n        <div>\n            Model : \n            <pre>{{values | json}}</pre>\n        </div>\n    </mat-card-content>\n</mat-card>"

/***/ }),

/***/ "./src/app/tag/tag-demo.component.ts":
/*!*******************************************!*\
  !*** ./src/app/tag/tag-demo.component.ts ***!
  \*******************************************/
/*! exports provided: DejaTagDemoComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DejaTagDemoComponent", function() { return DejaTagDemoComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");

/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

var DejaTagDemoComponent = /** @class */ (function () {
    function DejaTagDemoComponent() {
        this.tabIndex = 1;
        this.values = ['HTML5', 'ANGULAR'];
    }
    DejaTagDemoComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'tag-demo',
            template: __webpack_require__(/*! ./tag-demo.component.html */ "./src/app/tag/tag-demo.component.html")
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], DejaTagDemoComponent);
    return DejaTagDemoComponent;
}());



/***/ }),

/***/ "./src/app/tag/tag-demo.module.ts":
/*!****************************************!*\
  !*** ./src/app/tag/tag-demo.module.ts ***!
  \****************************************/
/*! exports provided: DejaTagDemoModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DejaTagDemoModule", function() { return DejaTagDemoModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/card */ "./node_modules/@angular/material/esm5/card.es5.js");
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/toolbar */ "./node_modules/@angular/material/esm5/toolbar.es5.js");
/* harmony import */ var _deja_js_component_tag__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @deja-js/component/tag */ "./dist/deja-js/component/fesm5/deja-js-component-tag.js");
/* harmony import */ var _component_markdown_index__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../component/markdown/index */ "./src/component/markdown/index.ts");
/* harmony import */ var _tag_demo_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./tag-demo.component */ "./src/app/tag/tag-demo.component.ts");
/* harmony import */ var _tag_demo_routes__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./tag-demo.routes */ "./src/app/tag/tag-demo.routes.ts");
/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */











var DejaTagDemoModule = /** @class */ (function () {
    function DejaTagDemoModule() {
    }
    DejaTagDemoModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [_tag_demo_component__WEBPACK_IMPORTED_MODULE_9__["DejaTagDemoComponent"]],
            exports: [_tag_demo_component__WEBPACK_IMPORTED_MODULE_9__["DejaTagDemoComponent"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _angular_material_card__WEBPACK_IMPORTED_MODULE_5__["MatCardModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatTabsModule"],
                _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_6__["MatToolbarModule"],
                _deja_js_component_tag__WEBPACK_IMPORTED_MODULE_7__["DejaTagModule"],
                _component_markdown_index__WEBPACK_IMPORTED_MODULE_8__["DejaMarkdownModule"],
                _tag_demo_routes__WEBPACK_IMPORTED_MODULE_10__["routing"],
            ],
            providers: [],
        })
    ], DejaTagDemoModule);
    return DejaTagDemoModule;
}());



/***/ }),

/***/ "./src/app/tag/tag-demo.routes.ts":
/*!****************************************!*\
  !*** ./src/app/tag/tag-demo.routes.ts ***!
  \****************************************/
/*! exports provided: routing */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "routing", function() { return routing; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _tag_demo_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tag-demo.component */ "./src/app/tag/tag-demo.component.ts");
/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */


var routes = [
    { path: '', component: _tag_demo_component__WEBPACK_IMPORTED_MODULE_1__["DejaTagDemoComponent"] },
    { path: '**', redirectTo: '', pathMatch: 'full' },
];
var routing = _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forChild(routes);


/***/ })

}]);
//# sourceMappingURL=tag-tag-demo-module.js.map