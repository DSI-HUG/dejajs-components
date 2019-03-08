(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["grid-grid-demo-module"],{

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

/***/ "./dist/deja-js/component/fesm5/deja-js-component-data-grid.js":
/*!*********************************************************************!*\
  !*** ./dist/deja-js/component/fesm5/deja-js-component-data-grid.js ***!
  \*********************************************************************/
/*! exports provided: DejaGridModule, IDejaGridColumnLayout, DejaGridColumnsLayoutInfos, DejaGridRowEvent, DejaGridRowsEvent, IDejaGridParentRow, DejaGridGroupAreaComponent, DejaGridHeaderComponent, DejaGridParentRowComponent, DejaGridRowComponent, DejaGridComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DejaGridModule", function() { return DejaGridModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IDejaGridColumnLayout", function() { return IDejaGridColumnLayout; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DejaGridColumnsLayoutInfos", function() { return DejaGridColumnsLayoutInfos; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DejaGridRowEvent", function() { return DejaGridRowEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DejaGridRowsEvent", function() { return DejaGridRowsEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IDejaGridParentRow", function() { return IDejaGridParentRow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DejaGridGroupAreaComponent", function() { return DejaGridGroupAreaComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DejaGridHeaderComponent", function() { return DejaGridHeaderComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DejaGridParentRowComponent", function() { return DejaGridParentRowComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DejaGridRowComponent", function() { return DejaGridRowComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DejaGridComponent", function() { return DejaGridComponent; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _deja_js_component_chips__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @deja-js/component/chips */ "./dist/deja-js/component/fesm5/deja-js-component-chips.js");
/* harmony import */ var _deja_js_component_dragdrop__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @deja-js/component/dragdrop */ "./dist/deja-js/component/fesm5/deja-js-component-dragdrop.js");
/* harmony import */ var _angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/cdk/coercion */ "./node_modules/@angular/cdk/esm5/coercion.es5.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _deja_js_component_tree_list__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @deja-js/component/tree-list */ "./dist/deja-js/component/fesm5/deja-js-component-tree-list.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _deja_js_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @deja-js/core */ "./dist/deja-js/core/fesm5/deja-js-core.js");













/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Zone de regroupement des colonnes dans laquelle les colonnes peuvent être drag and droppée
 */
var DejaGridGroupAreaComponent = /** @class */ (function () {
    function DejaGridGroupAreaComponent(changeDetectorRef, clipboardService) {
        this.changeDetectorRef = changeDetectorRef;
        this.clipboardService = clipboardService;
        /**
         * Cet évenement est levé lorsque le model de groupe est modifié
         */
        this.groupsChanged = new _angular_core__WEBPACK_IMPORTED_MODULE_6__["EventEmitter"]();
        /**
         * Cet évenement est levé lorsqu'un group est supprimé du model
         */
        this.groupRemoved = new _angular_core__WEBPACK_IMPORTED_MODULE_6__["EventEmitter"]();
        this._groups = (/** @type {?} */ ([]));
        this.columnGroupKey = 'deja-grid-column';
        this.groupGroupKey = 'deja-grid-group';
    }
    Object.defineProperty(DejaGridGroupAreaComponent.prototype, "groups", {
        /** Revoie le modèle de groupe qui représente l'ensemble des colonnes déposées dans le composant */
        get: /**
         * Revoie le modèle de groupe qui représente l'ensemble des colonnes déposées dans le composant
         * @return {?}
         */
        function () {
            return this._groups;
        },
        set: /**
         * @param {?} columns
         * @return {?}
         */
        function (columns) {
            this._groups = columns || [];
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} group
     * @return {?}
     */
    DejaGridGroupAreaComponent.prototype.getDragContext = /**
     * @param {?} group
     * @return {?}
     */
    function (group) {
        var _this = this;
        if (!this.clipboardService) {
            return null;
        }
        // console.log(`getDragContext ` + group.name + ' ' + Date.now());
        return {
            dragendcallback: (/**
             * @param {?} event
             * @return {?}
             */
            function (event) {
                if (!event.dragInfo.hasOwnProperty(_this.columnGroupKey)) {
                    return;
                }
            }),
            dragstartcallback: (/**
             * @param {?} event
             * @return {?}
             */
            function (event) {
                event.dragInfo[_this.groupGroupKey] = group;
            }),
        };
    };
    /**
     * @return {?}
     */
    DejaGridGroupAreaComponent.prototype.getDropContext = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this.clipboardService) {
            return null;
        }
        /** @type {?} */
        var raiseEvent = (/**
         * @param {?} group
         * @return {?}
         */
        function (group) {
            /** @type {?} */
            var e = (/** @type {?} */ ({
                column: group,
                columns: _this.groups,
                originalEvent: event,
            }));
            _this.groupsChanged.emit(e);
            event.preventDefault();
        });
        /** @type {?} */
        var dragcallback = (/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            if (event.dragInfo.hasOwnProperty(_this.columnGroupKey)) {
                /** @type {?} */
                var sourceColumn_1 = (/** @type {?} */ (event.dragInfo[_this.columnGroupKey]));
                if (!_this.groups.find((/**
                 * @param {?} column
                 * @return {?}
                 */
                function (column) { return column === sourceColumn_1; }))) {
                    event.preventDefault();
                }
            }
            else if (event.dragInfo.hasOwnProperty(_this.groupGroupKey)) {
                /** @type {?} */
                var targetElement = _this.getGroupElementFromHTMLElement((/** @type {?} */ (event.target)));
                /** @type {?} */
                var attrIndex = (targetElement && targetElement.getAttribute('index')) || null;
                /** @type {?} */
                var targetIndex = attrIndex !== null ? +attrIndex : null;
                if (targetIndex === null) {
                    return;
                }
                /** @type {?} */
                var sourceColumn_2 = (/** @type {?} */ (event.dragInfo[_this.groupGroupKey]));
                /** @type {?} */
                var sourceIndex = _this.groups.findIndex((/**
                 * @param {?} column
                 * @return {?}
                 */
                function (column) { return column === sourceColumn_2; }));
                // Dead zones
                if (sourceIndex === targetIndex) {
                    event.preventDefault();
                    return;
                }
                _this.groups.splice(sourceIndex, 1);
                _this.groups.splice(targetIndex, 0, sourceColumn_2);
                raiseEvent(sourceColumn_2);
                _this.changeDetectorRef.markForCheck();
                event.preventDefault();
            }
            else {
                return;
            }
        });
        return {
            dragentercallback: dragcallback,
            dragovercallback: dragcallback,
            dropcallback: (/**
             * @param {?} event
             * @return {?}
             */
            function (event) {
                if (event.dragInfo.hasOwnProperty(_this.columnGroupKey)) {
                    /** @type {?} */
                    var sourceColumn = (/** @type {?} */ (event.dragInfo[_this.columnGroupKey]));
                    /** @type {?} */
                    var targetElement = _this.getGroupElementFromHTMLElement((/** @type {?} */ (event.target)));
                    /** @type {?} */
                    var attrIndex = (targetElement && targetElement.getAttribute('index')) || null;
                    /** @type {?} */
                    var targetIndex = attrIndex !== null ? +attrIndex : null;
                    if (targetIndex !== null) {
                        /** @type {?} */
                        var targetBounds = targetElement.getBoundingClientRect();
                        if (event.x <= targetBounds.left + targetBounds.width / 2) {
                            _this.groups.splice(targetIndex, 0, sourceColumn);
                        }
                        else if (targetIndex < _this.groups.length - 1) {
                            _this.groups.splice(targetIndex + 1, 0, sourceColumn);
                        }
                        else {
                            _this.groups.push(sourceColumn);
                        }
                    }
                    else {
                        _this.groups.push(sourceColumn);
                    }
                    raiseEvent(sourceColumn);
                }
                else if (event.dragInfo.hasOwnProperty(_this.groupGroupKey)) {
                    /** @type {?} */
                    var sourceColumn = (/** @type {?} */ (event.dragInfo[_this.groupGroupKey]));
                    raiseEvent(sourceColumn);
                }
                _this.changeDetectorRef.markForCheck();
            }),
        };
    };
    /**
     * @param {?} event
     * @return {?}
     */
    DejaGridGroupAreaComponent.prototype.removeGroup = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.groupRemoved.emit(event);
        event.stopPropagation();
        return false;
    };
    /**
     * @private
     * @param {?} element
     * @return {?}
     */
    DejaGridGroupAreaComponent.prototype.getGroupElementFromHTMLElement = /**
     * @private
     * @param {?} element
     * @return {?}
     */
    function (element) {
        /** @type {?} */
        var parentElement = element;
        while (parentElement && !parentElement.hasAttribute('groupname')) {
            element = parentElement;
            parentElement = parentElement.parentElement;
        }
        if (!parentElement) {
            return undefined;
        }
        return parentElement;
    };
    DejaGridGroupAreaComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Component"], args: [{
                    changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_6__["ChangeDetectionStrategy"].OnPush,
                    selector: 'deja-grid-grouparea',
                    template: "<div #groupAreaElement id=\"deja-grid-grouparea\" [deja-droppable]=\"getDropContext()\">\n\t<label id=\"placeholder\" *ngIf=\"groups.length === 0\">Drag one column here to group by this column</label>\n\t<deja-chips [items]=\"groups\" (close)=\"removeGroup($event)\">\n\t\t<ng-template #itemTemplate let-item let-index=\"index\"><span class=\"label\" [attr.groupname]=\"item.name\" [attr.index]=\"index\" [deja-draggable]=\"getDragContext(item)\">{{ item.label }}</span></ng-template>\n\t</deja-chips>\n</div>",
                    styles: [":host #deja-grid-grouparea{padding:.5rem;margin-bottom:1rem;display:flex;flex-wrap:wrap}:host #deja-grid-grouparea .label{padding:.35rem}"]
                }] }
    ];
    /** @nocollapse */
    DejaGridGroupAreaComponent.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["ChangeDetectorRef"] },
        { type: _deja_js_core__WEBPACK_IMPORTED_MODULE_11__["DejaClipboardService"], decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Optional"] }] }
    ]; };
    DejaGridGroupAreaComponent.propDecorators = {
        groupsChanged: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Output"] }],
        groupRemoved: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Output"] }],
        groups: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }]
    };
    return DejaGridGroupAreaComponent;
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
var IDejaGridColumnLayout = /** @class */ (function () {
    function IDejaGridColumnLayout() {
    }
    return IDejaGridColumnLayout;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var DejaGridHeaderComponent = /** @class */ (function () {
    function DejaGridHeaderComponent(elementRef, changeDetectorRef, clipboardService) {
        var _this = this;
        this.changeDetectorRef = changeDetectorRef;
        this.clipboardService = clipboardService;
        /**
         * Cet évenement est levé lorsque la taille d'une colonne est modifiée
         */
        this.columnSizeChanged = new _angular_core__WEBPACK_IMPORTED_MODULE_6__["EventEmitter"]();
        /**
         * Cet évenement est levé lorsque la position des colonnes est modifiée
         */
        this.columnLayoutChanged = new _angular_core__WEBPACK_IMPORTED_MODULE_6__["EventEmitter"]();
        /**
         * Cet évenement est levé lorsqu'une entête de colonne est cliquée
         */
        this.columnHeaderClicked = new _angular_core__WEBPACK_IMPORTED_MODULE_6__["EventEmitter"]();
        /**
         * Cet évenement est levé lorsqu'une colonne est drag and dropée
         */
        this.columnDragEnd = new _angular_core__WEBPACK_IMPORTED_MODULE_6__["EventEmitter"]();
        this._columnsDraggable = false;
        this._columnsSortable = false;
        this._columnsSizable = false;
        this._columnLayout = (/** @type {?} */ ({}));
        this.backupColumnOrder = (/** @type {?} */ ([]));
        this.columnGroupKey = 'deja-grid-column';
        this.isAlive = true;
        /** @type {?} */
        var element = (/** @type {?} */ (elementRef.nativeElement));
        Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["fromEvent"])(element, 'mousedown').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["takeWhile"])((/**
         * @return {?}
         */
        function () { return _this.isAlive; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["filter"])((/**
         * @param {?} event
         * @return {?}
         */
        function (event) { return event.buttons === 1; })))
            .subscribe((/**
         * @param {?} downEvent
         * @return {?}
         */
        function (downEvent) {
            /** @type {?} */
            var target = (/** @type {?} */ (downEvent.target));
            /** @type {?} */
            var column = _this.getColumnFromHTMLElement((/** @type {?} */ (downEvent.target)));
            if (target.hasAttribute('separator')) {
                if (_this.columnsSizable && column.sizeable !== false) {
                    // Size clicked column
                    _this._sizedColumn = column;
                    /** @type {?} */
                    var sizedOrigin_1 = downEvent.screenX;
                    /** @type {?} */
                    var kill$_1 = new rxjs__WEBPACK_IMPORTED_MODULE_8__["Subject"]();
                    /** @type {?} */
                    var mouseUp$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["fromEvent"])(element.ownerDocument, 'mouseup');
                    mouseUp$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["first"])()).subscribe((/**
                     * @return {?}
                     */
                    function () {
                        /** @type {?} */
                        var e = (/** @type {?} */ ({
                            column: null,
                        }));
                        _this.columnSizeChanged.emit(e);
                        _this.changeDetectorRef.markForCheck();
                        _this._sizedColumn = undefined;
                    }));
                    Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["fromEvent"])(element.ownerDocument, 'mousemove').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["takeUntil"])(Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["merge"])(mouseUp$, kill$_1)))
                        .subscribe((/**
                     * @param {?} moveEvent
                     * @return {?}
                     */
                    function (moveEvent) {
                        if (moveEvent.buttons === 1) {
                            /** @type {?} */
                            var e = (/** @type {?} */ ({
                                column: _this._sizedColumn,
                                offsetWidth: moveEvent.screenX - sizedOrigin_1,
                                originalEvent: moveEvent,
                            }));
                            _this.columnSizeChanged.emit(e);
                            _this.changeDetectorRef.markForCheck();
                        }
                        else {
                            // Mouse up
                            kill$_1.next();
                        }
                    }));
                    downEvent.stopPropagation();
                    return false;
                }
            }
            else {
                /** @type {?} */
                var clickedColumn_1 = column;
                Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["fromEvent"])(element, 'mouseup').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["first"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["timeout"])(1000))
                    .subscribe((/**
                 * @param {?} upEvent
                 * @return {?}
                 */
                function (upEvent) {
                    /** @type {?} */
                    var columnElement = _this.getColumnElementFromHTMLElement((/** @type {?} */ (upEvent.target)));
                    if ((columnElement && columnElement.getAttribute('colname')) === clickedColumn_1.name) {
                        /** @type {?} */
                        var index = +columnElement.getAttribute('index');
                        /** @type {?} */
                        var e = (/** @type {?} */ ({
                            column: clickedColumn_1,
                            originalEvent: upEvent,
                            index: index,
                        }));
                        _this.columnHeaderClicked.emit(e);
                        _this.changeDetectorRef.markForCheck();
                    }
                }), (/**
                 * @param {?} _error
                 * @return {?}
                 */
                function (_error) { }));
            }
        }));
    }
    Object.defineProperty(DejaGridHeaderComponent.prototype, "columnsDraggable", {
        /** Retourne si toutes les colonnes peuvent être draggable vers un autre composant.
         * Si une valeur spécifique à une colonne est spécifiée dans le modèle de la colonne, cette dernière sera prioritaire.
         */
        get: /**
         * Retourne si toutes les colonnes peuvent être draggable vers un autre composant.
         * Si une valeur spécifique à une colonne est spécifiée dans le modèle de la colonne, cette dernière sera prioritaire.
         * @return {?}
         */
        function () {
            return this._columnsDraggable;
        },
        /** Définit si toutes les colonnes peuvent être draggable vers un autre composant.
         * Si une valeur spécifique à une colonne est spécifiée dans le modèle de la colonne, cette dernière sera prioritaire.
         */
        set: /**
         * Définit si toutes les colonnes peuvent être draggable vers un autre composant.
         * Si une valeur spécifique à une colonne est spécifiée dans le modèle de la colonne, cette dernière sera prioritaire.
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._columnsDraggable = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_5__["coerceBooleanProperty"])(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaGridHeaderComponent.prototype, "columnsSortable", {
        /** Retourne si toutes les colonnes peuvent être déplacées parmis les autres colonnes.
         * Si une valeur spécifique à une colonne est spécifiée dans le modèle de la colonne, cette dernière sera prioritaire.
         */
        get: /**
         * Retourne si toutes les colonnes peuvent être déplacées parmis les autres colonnes.
         * Si une valeur spécifique à une colonne est spécifiée dans le modèle de la colonne, cette dernière sera prioritaire.
         * @return {?}
         */
        function () {
            return this._columnsSortable;
        },
        /** Définit si toutes les colonnes peuvent être déplacées parmis les autres colonnes.
         * Si une valeur spécifique à une colonne est spécifiée dans le modèle de la colonne, cette dernière sera prioritaire.
         */
        set: /**
         * Définit si toutes les colonnes peuvent être déplacées parmis les autres colonnes.
         * Si une valeur spécifique à une colonne est spécifiée dans le modèle de la colonne, cette dernière sera prioritaire.
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._columnsSortable = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_5__["coerceBooleanProperty"])(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaGridHeaderComponent.prototype, "sizedColumn", {
        get: /**
         * @return {?}
         */
        function () {
            return this._sizedColumn;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaGridHeaderComponent.prototype, "columnsSizable", {
        /** Retourne si toutes les colonnes peuvent être redimensionées
         * Si une valeur spécifique à une colonne est spécifiée dans le modèle de la colonne, cette dernière sera prioritaire.
         */
        get: /**
         * Retourne si toutes les colonnes peuvent être redimensionées
         * Si une valeur spécifique à une colonne est spécifiée dans le modèle de la colonne, cette dernière sera prioritaire.
         * @return {?}
         */
        function () {
            return this._columnsSizable;
        },
        /** Définit si toutes les colonnes peuvent être redimensionées
         * Si une valeur spécifique à une colonne est spécifiée dans le modèle de la colonne, cette dernière sera prioritaire.
         */
        set: /**
         * Définit si toutes les colonnes peuvent être redimensionées
         * Si une valeur spécifique à une colonne est spécifiée dans le modèle de la colonne, cette dernière sera prioritaire.
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._columnsSizable = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_5__["coerceBooleanProperty"])(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaGridHeaderComponent.prototype, "columnLayout", {
        /** Retourne la structire de colonnes associée aux entêtes */
        get: /**
         * Retourne la structire de colonnes associée aux entêtes
         * @return {?}
         */
        function () {
            return this._columnLayout;
        },
        set: /**
         * @param {?} layout
         * @return {?}
         */
        function (layout) {
            this._columnLayout = layout || {
                columns: [],
                scrollLeft: 0,
                vpAfterWidth: 0,
                vpBeforeWidth: 0,
                refresh$: new rxjs__WEBPACK_IMPORTED_MODULE_8__["Subject"](),
            };
            this.changeDetectorRef.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaGridHeaderComponent.prototype, "columnHeaderTemplate", {
        get: /**
         * @return {?}
         */
        function () {
            return this.columnHeaderTemplateExternal || this.columnHeaderTemplateInternal;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DejaGridHeaderComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.isAlive = false;
    };
    /**
     * @return {?}
     */
    DejaGridHeaderComponent.prototype.refresh = /**
     * @return {?}
     */
    function () {
        this.changeDetectorRef.markForCheck();
    };
    /**
     * @param {?} column
     * @return {?}
     */
    DejaGridHeaderComponent.prototype.getDragContext = /**
     * @param {?} column
     * @return {?}
     */
    function (column) {
        var _this = this;
        if (!this.clipboardService || (!this.columnsDraggable && !this.columnsSortable) || column.draggable === false) {
            return null;
        }
        // console.log(`getDragContext ` + column.name + ' ' + Date.now());
        return {
            dragendcallback: (/**
             * @param {?} event
             * @return {?}
             */
            function (event) {
                if (!event.dragInfo.hasOwnProperty(_this.columnGroupKey)) {
                    return;
                }
                column.dragged = false;
                _this.backupColumnOrder = [];
                _this.columnDragEnd.emit();
                _this.changeDetectorRef.markForCheck();
            }),
            dragstartcallback: (/**
             * @param {?} event
             * @return {?}
             */
            function (event) {
                if (!_this._sizedColumn) {
                    event.dragInfo[_this.columnGroupKey] = column;
                    column.dragged = true;
                    // Backup column layout
                    _this.backupColumnOrder = _this._columnLayout.columns.map((/**
                     * @param {?} col
                     * @return {?}
                     */
                    function (col) { return col; }));
                }
                else {
                    event.preventDefault();
                }
            }),
        };
    };
    /**
     * @return {?}
     */
    DejaGridHeaderComponent.prototype.getDropContext = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this.clipboardService) {
            return null;
        }
        /** @type {?} */
        var dragCallback = (/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            if (!_this.columnsSortable || !event.dragInfo.hasOwnProperty(_this.columnGroupKey)) {
                return;
            }
            /** @type {?} */
            var targetElement = _this.getColumnElementFromHTMLElement((/** @type {?} */ (event.target)));
            /** @type {?} */
            var targetBounds = targetElement && targetElement.getBoundingClientRect();
            /** @type {?} */
            var targetIndex = targetElement && +targetElement.getAttribute('index');
            if (targetIndex === undefined) {
                return;
            }
            /** @type {?} */
            var sourceColumn = (/** @type {?} */ (event.dragInfo[_this.columnGroupKey]));
            /** @type {?} */
            var sourceIndex = _this._columnLayout.columns.findIndex((/**
             * @param {?} og
             * @return {?}
             */
            function (og) { return og === sourceColumn; }));
            // Dead zones
            if (sourceIndex === targetIndex) {
                event.preventDefault();
                return;
            }
            else if (targetIndex === sourceIndex + 1) {
                if (event.x <= targetBounds.left + targetBounds.width / 2) {
                    event.preventDefault();
                    return;
                }
            }
            else if (targetIndex === sourceIndex - 1) {
                if (event.x >= targetBounds.left + targetBounds.width / 2) {
                    event.preventDefault();
                    return;
                }
            }
            /** @type {?} */
            var e = (/** @type {?} */ ({
                column: sourceColumn,
                index: sourceIndex,
                originalEvent: event,
                target: _this._columnLayout.columns[targetIndex],
                targetIndex: targetIndex,
            }));
            _this.columnLayoutChanged.emit(e);
            event.preventDefault();
        });
        return {
            dragleavecallback: (/**
             * @return {?}
             */
            function () {
                if (_this.backupColumnOrder.length) {
                    // Restore original column layout
                    _this._columnLayout.columns = _this.backupColumnOrder.map((/**
                     * @param {?} col
                     * @return {?}
                     */
                    function (col) { return col; }));
                }
            }),
            dragentercallback: dragCallback,
            dragovercallback: dragCallback,
            dropcallback: dragCallback,
        };
    };
    /**
     * @private
     * @param {?} element
     * @return {?}
     */
    DejaGridHeaderComponent.prototype.getColumnElementFromHTMLElement = /**
     * @private
     * @param {?} element
     * @return {?}
     */
    function (element) {
        /** @type {?} */
        var parentElement = element;
        while (parentElement && !parentElement.hasAttribute('colname')) {
            element = parentElement;
            parentElement = parentElement.parentElement;
        }
        if (!parentElement) {
            return undefined;
        }
        return parentElement;
    };
    /**
     * @private
     * @param {?} element
     * @return {?}
     */
    DejaGridHeaderComponent.prototype.getColumnFromHTMLElement = /**
     * @private
     * @param {?} element
     * @return {?}
     */
    function (element) {
        /** @type {?} */
        var columnElement = this.getColumnElementFromHTMLElement(element);
        /** @type {?} */
        var colName = columnElement && columnElement.getAttribute('colname');
        return colName && this._columnLayout.columns.find((/**
         * @param {?} column
         * @return {?}
         */
        function (column) { return column.name === colName; }));
    };
    DejaGridHeaderComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Component"], args: [{
                    changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_6__["ChangeDetectionStrategy"].OnPush,
                    selector: 'deja-grid-header',
                    template: "<div #headerElement id=\"deja-grid-header\" [style.left.px]=\"columnLayout.scrollLeft\" [class.onsizer]=\"(sizedColumn && true) || null\" [deja-droppable]=\"getDropContext()\" continous-dragover [attr.sizable]=\"columnsSizable || null\">\n\t<div *ngIf=\"columnLayout.vpBeforeWidth\" [style.flex-basis.px]=\"columnLayout.vpBeforeWidth\"></div>\n\t<div *ngFor=\"let column of columnLayout.columns; let index=index\" [deja-draggable]=\"getDragContext(column)\" [attr.index]=\"index\" [attr.colname]=\"column.name\" [attr.sizeable]=\"column.sizeable === false ? false : null\" [class.dragged]=\"column.dragged\" class=\"column-header-wrapper\" [style.flex-basis.px]=\"column.w\">\n\t\t<div *ngIf=\"!columnHeaderTemplate\" [attr.sorting]=\"column.sorting || null\" class=\"column-header\">{{ column.label }}</div>\n\t\t<ng-template [ngTemplateOutlet]=\"columnHeaderTemplate\" *ngIf=\"columnHeaderTemplate\" [ngTemplateOutletContext]=\"{ $implicit: column }\"></ng-template>\n\t\t<deja-sort-indicator *ngIf=\"sortInfos && sortInfos.name === column.name\" [sort-infos]=\"sortInfos\"></deja-sort-indicator>\n\t\t<div separator></div>\n\t\t<div class=\"sort-waiter\" *ngIf=\"column.sorting\">\n\t\t\t<mat-icon fontSet=\"deja-icons\" fontIcon=\"cached\"></mat-icon>\n\t\t</div>\n\t</div>\n\t<div *ngIf=\"columnLayout.vpAfterWidth\" [style.flex-basis.px]=\"columnLayout.vpAfterWidth\"></div>\n</div>",
                    styles: [":host{display:block}:host #deja-grid-header{display:flex;flex-direction:row;align-items:center;overflow:visible;position:relative}:host #deja-grid-header>div{padding:0!important;margin:0!important;flex-grow:0;flex-shrink:0;height:100%}:host #deja-grid-header>div.column-header-wrapper{display:flex;align-items:center;overflow:hidden}:host #deja-grid-header>div.column-header-wrapper .sort-waiter{position:absolute;display:flex;align-items:center;justify-content:center;width:100%;height:100%}:host #deja-grid-header>div.column-header-wrapper .sort-waiter [fontIcon]{-webkit-animation:1s linear .5s infinite spin;animation:1s linear .5s infinite spin}:host #deja-grid-header>div.column-header-wrapper [separator]{flex:0 0 4px;padding:.5rem 0;margin-right:.3rem;cursor:ew-resize}:host #deja-grid-header>div.column-header-wrapper .column-header{flex:1 1 auto;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;padding:.5rem .1rem;display:block}:host #deja-grid-header>div.column-header-wrapper .column-header[sorting]{opacity:.2}:host #deja-grid-header>div.column-header-wrapper deja-sort-indicator{opacity:.6;flex:0 0 auto}:host #deja-grid-header>div[sizable] .column-header-wrapper:not([sizeable=false]) [separator]{cursor:ew-resize}"]
                }] }
    ];
    /** @nocollapse */
    DejaGridHeaderComponent.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["ElementRef"] },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["ChangeDetectorRef"] },
        { type: _deja_js_core__WEBPACK_IMPORTED_MODULE_11__["DejaClipboardService"], decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Optional"] }] }
    ]; };
    DejaGridHeaderComponent.propDecorators = {
        columnHeaderTemplateExternal: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        sortInfos: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        columnSizeChanged: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Output"] }],
        columnLayoutChanged: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Output"] }],
        columnHeaderClicked: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Output"] }],
        columnDragEnd: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Output"] }],
        columnHeaderTemplateInternal: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["ContentChild"], args: ['columnHeaderTemplate',] }],
        columnsDraggable: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        columnsSortable: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        columnsSizable: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        columnLayout: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }]
    };
    return DejaGridHeaderComponent;
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
var IDejaGridParentRow = /** @class */ (function () {
    function IDejaGridParentRow() {
    }
    return IDejaGridParentRow;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Composant représentant une ligne parente d'une structure de ligne hierarchique
 */
var DejaGridParentRowComponent = /** @class */ (function () {
    function DejaGridParentRowComponent(changeDetectorRef) {
        this.changeDetectorRef = changeDetectorRef;
        this._columnLayout = (/** @type {?} */ ({}));
    }
    Object.defineProperty(DejaGridParentRowComponent.prototype, "columnLayoutOfColumn0", {
        get: /**
         * @return {?}
         */
        function () {
            return this._columnLayout.column0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaGridParentRowComponent.prototype, "columnLayoutOfColumns", {
        get: /**
         * @return {?}
         */
        function () {
            return this._columnLayout.columns;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaGridParentRowComponent.prototype, "columns", {
        /** Définit la structure de colonnes a appliquer sur cette ligne */
        set: /**
         * Définit la structure de colonnes a appliquer sur cette ligne
         * @param {?} columns
         * @return {?}
         */
        function (columns) {
            var _this = this;
            /** @type {?} */
            var left = 0;
            this._columnLayout.columns = [];
            columns.forEach((/**
             * @param {?} column
             * @return {?}
             */
            function (column) {
                if (_this.getCellText(_this.row, column.name)) {
                    if (_this._columnLayout.column0 === 0) {
                        _this._columnLayout.column0 = left;
                    }
                    _this._columnLayout.columns.push({
                        column: column,
                        left: left,
                    });
                }
                left += column.w;
            }));
            this._columnLayout.column0 = left;
            this.changeDetectorRef.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaGridParentRowComponent.prototype, "cellTemplate", {
        get: /**
         * @return {?}
         */
        function () {
            return this.cellTemplateExternal || this.cellTemplateInternal;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaGridParentRowComponent.prototype, "parentTitleTemplate", {
        get: /**
         * @return {?}
         */
        function () {
            return this.parentTitleTemplateExternal || this.parentTitleTemplateInternal;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} row
     * @param {?} textField
     * @return {?}
     */
    DejaGridParentRowComponent.prototype.getCellText = /**
     * @param {?} row
     * @param {?} textField
     * @return {?}
     */
    function (row, textField) {
        return _deja_js_core__WEBPACK_IMPORTED_MODULE_11__["ItemListService"].getItemText(row, textField);
    };
    DejaGridParentRowComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Component"], args: [{
                    changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_6__["ChangeDetectionStrategy"].OnPush,
                    selector: 'deja-grid-parent-row',
                    template: "<div *ngIf=\"columnLayoutOfColumn0\" [style.width.px]=\"columnLayoutOfColumn0\" id=\"parent-title\" class=\"cell-wrapper\">\n\t<div *ngIf=\"!parentTitleTemplate\" class=\"cell\">{{ row.toString() }}</div>\n\t<ng-template [ngTemplateOutlet]=\"parentTitleTemplate\" *ngIf=\"parentTitleTemplate\"  [ngTemplateOutletContext]=\"{ $implicit: row }\"></ng-template>\n</div>\n<span *ngFor=\"let colinfo of columnLayoutOfColumns; let index=index\" class=\"cell-wrapper\" [attr.colindex]=\"index\" [attr.colname]=\"colinfo.column.name\" [class.dragged]=\"colinfo.column.dragged\" [style.left.px]=\"colinfo.left\" [style.width.px]=\"colinfo.column.w\">\n\t<div *ngIf=\"!cellTemplate || !colinfo.column.useCellTemplate\" class=\"cell\">{{ getCellText(row, colinfo.column.name) }}</div>\n\t<ng-template [ngTemplateOutlet]=\"cellTemplate\" *ngIf=\"cellTemplate && colinfo.column.useCellTemplate\" [ngTemplateOutletContext]=\"{ $implicit: row, flatIndex: flatIndex, column: colinfo.column }\"></ng-template>\n</span>",
                    styles: [":host{display:flex;flex-direction:row;align-items:center;overflow:hidden;flex-grow:0;flex-shrink:0}:host>div{padding:0!important;margin:0!important;flex-grow:0;flex-shrink:0;height:100%}:host>div.cell-wrapper{display:flex;align-items:center;overflow:hidden;height:100%}:host>div.cell-wrapper:hover{background-color:rgba(0,0,0,.08)}:host>div.cell-wrapper.dragged{background-color:rgba(0,0,0,.08)}:host>div.cell-wrapper .cell{flex:1 1 auto;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;margin:.25rem;display:block}"]
                }] }
    ];
    /** @nocollapse */
    DejaGridParentRowComponent.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["ChangeDetectorRef"] }
    ]; };
    DejaGridParentRowComponent.propDecorators = {
        row: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        cellTemplateExternal: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        parentTitleTemplateExternal: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        flatIndex: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        parentTitleTemplateInternal: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["ContentChild"], args: ['parentTitleTemplate',] }],
        cellTemplateInternal: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["ContentChild"], args: ['cellTemplate',] }],
        columns: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }]
    };
    return DejaGridParentRowComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Composant représentant une ligne de la grille
 */
var DejaGridRowComponent = /** @class */ (function () {
    function DejaGridRowComponent(changeDetectorRef) {
        this.changeDetectorRef = changeDetectorRef;
        this._columnLayout = (/** @type {?} */ ({}));
    }
    Object.defineProperty(DejaGridRowComponent.prototype, "columnLayout", {
        get: /**
         * @return {?}
         */
        function () {
            return this._columnLayout;
        },
        set: /**
         * @param {?} layout
         * @return {?}
         */
        function (layout) {
            var _this = this;
            if (this.refresh$sub) {
                this.refresh$sub.unsubscribe();
                this.refresh$sub = undefined;
            }
            this._columnLayout = layout || {
                columns: [],
                scrollLeft: 0,
                vpAfterWidth: 0,
                vpBeforeWidth: 0,
                refresh$: undefined,
            };
            if (this._columnLayout.refresh$) {
                this.refresh$sub = Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["from"])(this._columnLayout.refresh$)
                    .subscribe((/**
                 * @return {?}
                 */
                function () { return _this.changeDetectorRef.markForCheck(); }));
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaGridRowComponent.prototype, "cellTemplate", {
        get: /**
         * @return {?}
         */
        function () {
            return this.cellTemplateExternal || this.cellTemplateInternal;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DejaGridRowComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this.refresh$sub) {
            this.refresh$sub.unsubscribe();
        }
    };
    /**
     * @param {?} row
     * @param {?} textField
     * @return {?}
     */
    DejaGridRowComponent.prototype.getCellText = /**
     * @param {?} row
     * @param {?} textField
     * @return {?}
     */
    function (row, textField) {
        return _deja_js_core__WEBPACK_IMPORTED_MODULE_11__["ItemListService"].getItemText(row, textField);
    };
    DejaGridRowComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Component"], args: [{
                    changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_6__["ChangeDetectionStrategy"].OnPush,
                    selector: 'deja-grid-row',
                    template: "<div *ngIf=\"columnLayout.vpBeforeWidth\" [style.flex-basis.px]=\"columnLayout.vpBeforeWidth\"></div>\n<div *ngFor=\"let column of columnLayout.columns; let index=index\" [attr.colindex]=\"index\" [attr.colname]=\"column.name\" [class.dragged]=\"column.dragged\" [attr.current]=\"column.isCurrent || null\" class=\"cell-wrapper\" [style.flex-basis.px]=\"column.w\">\n\t<span *ngIf=\"!cellTemplate || !column.useCellTemplate\" class=\"cell\">{{ getCellText(row, column.name) }}</span>\n\t<ng-template [ngTemplateOutlet]=\"cellTemplate\" *ngIf=\"cellTemplate && column.useCellTemplate\" [ngTemplateOutletContext]=\"{ $implicit: row, flatIndex: flatIndex, column: column }\"></ng-template>\n</div>\n<div *ngIf=\"columnLayout.vpAfterWidth\" [style.flex-basis.px]=\"columnLayout.vpAfterWidth\"></div>",
                    styles: [":host{display:flex;flex-direction:row;align-items:center;overflow:hidden;flex-grow:0;flex-shrink:0}:host>div{padding:0!important;margin:0!important;flex-grow:0;flex-shrink:0;height:100%}:host>div.cell-wrapper{display:flex;align-items:center;overflow:hidden;height:100%}:host>div.cell-wrapper:hover{background-color:rgba(0,0,0,.08)}:host>div.cell-wrapper.dragged{background-color:rgba(0,0,0,.08)}:host>div.cell-wrapper .cell{flex:1 1 auto;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;margin:.25rem;display:block}"]
                }] }
    ];
    /** @nocollapse */
    DejaGridRowComponent.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["ChangeDetectorRef"] }
    ]; };
    DejaGridRowComponent.propDecorators = {
        row: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        cellTemplateExternal: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        flatIndex: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        cellTemplateInternal: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["ContentChild"], args: ['cellTemplate',] }],
        columnLayout: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }]
    };
    return DejaGridRowComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var DejaGridColumnsLayoutInfos = /** @class */ (function () {
    function DejaGridColumnsLayoutInfos(columns) {
        var _this = this;
        this.columnsWidth = {};
        this.percentColumns = [];
        this.fixedColumns = [];
        this.responsiveColumns = [];
        this.totalFixedWidth = 0;
        this.totalPercentWidth = 0;
        columns.forEach((/**
         * @param {?} column
         * @return {?}
         */
        function (column) {
            /** @type {?} */
            var width = new _deja_js_core__WEBPACK_IMPORTED_MODULE_11__["UnitValue"](column.width);
            if (width.value === undefined) {
                width = new _deja_js_core__WEBPACK_IMPORTED_MODULE_11__["UnitValue"](10, '%');
            }
            if (width.isInvalid()) {
                throw new Error('Invalid column width unit can be for example: 11px or 23%');
            }
            if (width.unit && width.unit !== 'px' && width.unit !== '%') {
                throw new Error('Column width unit can be only px or %');
            }
            if (width.unit === '%') {
                _this.percentColumns.push(column);
                _this.totalPercentWidth += width.value;
            }
            else {
                _this.fixedColumns.push(column);
                _this.totalFixedWidth += width.value;
            }
            if (typeof column.responsive === 'number' || column.responsive === true) {
                _this.responsiveColumns.push(column);
            }
            _this.columnsWidth[column.name] = width;
        }));
        this.responsiveColumns.sort((/**
         * @param {?} c1
         * @param {?} c2
         * @return {?}
         */
        function (c1, c2) {
            if (c1.responsive === true) {
                return 1;
            }
            else if (c2.responsive === true) {
                return -1;
            }
            else {
                return +c1.responsive - +c2.responsive;
            }
        }));
    }
    return DejaGridColumnsLayoutInfos;
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
 * @deprecated use ag-grid instead
 */
var DejaGridComponent = /** @class */ (function () {
    function DejaGridComponent(changeDetectorRef, elementRef, clipboardService) {
        var _this = this;
        this.changeDetectorRef = changeDetectorRef;
        this.elementRef = elementRef;
        this.clipboardService = clipboardService;
        /**
         * Permet de définir la longueur minimale de caractères dans le champ de recherche avant que la recherche ou le filtrage soient effectués
         */
        // tslint:disable-next-line:no-input-rename
        this.minSearchLength = 0;
        /**
         * Correspond au ngModel du champ de filtrage ou recherche
         */
        this.query = '';
        /**
         * Hauteur maximum avant que le composant affiche une scrollbar
         * spécifier une grande valeur pour ne jamais afficher de scrollbar
         * Spécifier 0 pour que le composant determine sa hauteur à partir du container
         */
        this.maxHeight = 0;
        /**
         * Définit le nombre de lignes à sauter en cas de pression sur les touches PageUp ou PageDown
         */
        this.pageSize = 0;
        /**
         * Définit la hauteur d'une ligne pour le calcul du viewport en pixels
         */
        this.viewPortRowHeight = _deja_js_core__WEBPACK_IMPORTED_MODULE_11__["ViewPortService"].itemDefaultSize;
        /**
         * Les trois valeurs acceptés en paramètre se trouvent dans l'enum ViewportMode (disabled, fixed, variable ou auto)
         * Attention, une désactivation du viewport dégrade considérablement les performances de la liste et ne doit pas être activée si la liste
         * est suceptible de contenir beaucoup d'éléments.
         */
        this.viewportMode = _deja_js_core__WEBPACK_IMPORTED_MODULE_11__["ViewportMode"].fixed;
        /**
         * Définit la largeur minimum que peut prendre une colonne en cas de redimensionement.
         */
        this.columnsMinWidth = 15;
        /**
         * Exécuté lorsque le déplacement d'une ligne est terminée.
         */
        this.itemDragEnd = new _angular_core__WEBPACK_IMPORTED_MODULE_6__["EventEmitter"]();
        /**
         * Exécuté lorsque le déplacement d'une ligne commence.
         */
        this.itemDragStart = new _angular_core__WEBPACK_IMPORTED_MODULE_6__["EventEmitter"]();
        /**
         * Exécuté lorsque l'utilisateur sélectionne ou désélectionne une ligne.
         */
        this.selectedChange = new _angular_core__WEBPACK_IMPORTED_MODULE_6__["EventEmitter"]();
        /**
         * Cet évenement est levé lorsque la position des colonnes est modifiée
         */
        this.columnLayoutChanged = new _angular_core__WEBPACK_IMPORTED_MODULE_6__["EventEmitter"]();
        /**
         * Cet évenement est levé lorsque la taille d'une colonne est modifiée
         */
        this.columnSizeChanged = new _angular_core__WEBPACK_IMPORTED_MODULE_6__["EventEmitter"]();
        /**
         * Exécuté lorsque le calcul du viewPort est executé.
         */
        this.viewPortChanged = new _angular_core__WEBPACK_IMPORTED_MODULE_6__["EventEmitter"]();
        /**
         * Exécuté lorsque le sorting à changé.
         */
        this.sortChanged = new _angular_core__WEBPACK_IMPORTED_MODULE_6__["EventEmitter"]();
        /**
         * Exécuté lorsque le grouping à changé.
         */
        this.groupChanged = new _angular_core__WEBPACK_IMPORTED_MODULE_6__["EventEmitter"]();
        /**
         * retourne la largeur calculée des lignes
         */
        this.rowsWidth = null;
        this._columnLayout = (/** @type {?} */ ({
            scrollLeft: 0,
            vpBeforeWidth: 0,
            vpAfterWidth: 0,
            columns: [],
            refresh$: new rxjs__WEBPACK_IMPORTED_MODULE_8__["Subject"](),
        }));
        this.lastScrollLeft = 0;
        this.printColumnLayout$ = new rxjs__WEBPACK_IMPORTED_MODULE_8__["Subject"]();
        this.disableUserSelection$ = new rxjs__WEBPACK_IMPORTED_MODULE_8__["Subject"]();
        this._noHorizontalScroll = false;
        this.isAlive = true;
        this.hasPercentageColumns = false;
        this._sortable = false;
        this._searchArea = false;
        this._groupArea = false;
        this._rowsDraggable = false;
        this._rowsSortable = false;
        this._columnsDraggable = false;
        this._columnsSortable = false;
        this._columnsSizable = false;
        this._multiSelect = false;
        this.noColumnsSpecified = false;
        this.columnGroups$ = new rxjs__WEBPACK_IMPORTED_MODULE_8__["Subject"]();
        this.columns$ = new rxjs__WEBPACK_IMPORTED_MODULE_8__["ReplaySubject"](1);
        this._columnGroups = (/** @type {?} */ ([]));
        /** @type {?} */
        var element = (/** @type {?} */ (this.elementRef.nativeElement));
        this.clearColumnLayout();
        Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["combineLatest"])(this.columns$, this.columnGroups$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["takeWhile"])((/**
         * @return {?}
         */
        function () { return _this.isAlive; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["map"])((/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_10__["__read"])(_a, 2), columns = _b[0], columnGroups = _b[1];
            if (typeof columnGroups === 'string') {
                /** @type {?} */
                var groups = columnGroups.split(',').map((/**
                 * @param {?} v
                 * @return {?}
                 */
                function (v) { return v.trim(); }));
                return _this._columnGroups = groups.map((/**
                 * @param {?} group
                 * @return {?}
                 */
                function (group) { return columns.find((/**
                 * @param {?} column
                 * @return {?}
                 */
                function (column) { return column.name === group; })); }));
            }
            else {
                return _this._columnGroups = columnGroups;
            }
        })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["map"])((/**
         * @param {?} columnGroups
         * @return {?}
         */
        function (columnGroups) {
            /** @type {?} */
            var groupInfos = (/** @type {?} */ ([]));
            /** @type {?} */
            var sortInfos = _this.treeListComponent.sortInfos;
            columnGroups.forEach((/**
             * @param {?} column
             * @return {?}
             */
            function (column) {
                /** @type {?} */
                var groupInfo = (/** @type {?} */ ({}));
                if (sortInfos && sortInfos.name === column.name) {
                    groupInfo.sortInfos = sortInfos;
                }
                groupInfo.groupByField = column.groupByField || column.name;
                groupInfo.groupTextField = column.groupTextField || column.name;
                groupInfos.push(groupInfo);
            }));
            return groupInfos;
        })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["switchMap"])((/**
         * @param {?} groupInfos
         * @return {?}
         */
        function (groupInfos) { return _this.treeListComponent.group$(groupInfos).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["map"])((/**
         * @return {?}
         */
        function () { return groupInfos; }))); })))
            .subscribe((/**
         * @param {?} groupInfos
         * @return {?}
         */
        function (groupInfos) {
            _this.groupChanged.emit(groupInfos);
            _this.changeDetectorRef.markForCheck();
        }));
        Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["from"])(this.columns$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["takeWhile"])((/**
         * @return {?}
         */
        function () { return _this.isAlive; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["tap"])((/**
         * @param {?} columns
         * @return {?}
         */
        function (columns) { return _this._columns = columns; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["debounceTime"])(1))
            .subscribe((/**
         * @return {?}
         */
        function () { return _this.calcColumnsLayout(); }));
        Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["from"])(this.printColumnLayout$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["takeWhile"])((/**
         * @return {?}
         */
        function () { return _this.isAlive; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["debounceTime"])(1000))
            .subscribe((/**
         * @return {?}
         */
        function () {
            console.log('');
            console.log('Auto columns layout:');
            console.log(JSON.stringify(_this._columns, null, 4));
            console.log('');
        }));
        Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["from"])(this.disableUserSelection$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["takeWhile"])((/**
         * @return {?}
         */
        function () { return _this.isAlive; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["tap"])((/**
         * @return {?}
         */
        function () { return element.setAttribute('disableselection', ''); })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["debounceTime"])(1000))
            .subscribe((/**
         * @return {?}
         */
        function () { return element.removeAttribute('disableselection'); }));
        Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["fromEvent"])(window, 'resize').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["takeWhile"])((/**
         * @return {?}
         */
        function () { return _this.isAlive; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["filter"])((/**
         * @return {?}
         */
        function () { return _this.hasPercentageColumns; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["debounceTime"])(5))
            .subscribe((/**
         * @return {?}
         */
        function () {
            _this.calcColumnsLayout();
        }));
        Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["fromEvent"])(element, 'keydown').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["takeWhile"])((/**
         * @return {?}
         */
        function () { return _this.isAlive; })))
            .subscribe((/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            /** @type {?} */
            var findPrev = (/**
             * @param {?} index
             * @return {?}
             */
            function (index) {
                if (index === -1) {
                    index = _this.columns.length;
                }
                while (--index >= 0) {
                    /** @type {?} */
                    var column = _this.columns[index];
                    if (column.w > 0) {
                        return column;
                    }
                }
                return _this.currentColumn;
            });
            /** @type {?} */
            var findNext = (/**
             * @param {?} index
             * @return {?}
             */
            function (index) {
                while (++index < _this.columns.length) {
                    /** @type {?} */
                    var column = _this.columns[index];
                    if (column.w > 0) {
                        return column;
                    }
                }
                return _this.currentColumn;
            });
            /** @type {?} */
            var keyCode = event.keyCode || ((/** @type {?} */ (_deja_js_core__WEBPACK_IMPORTED_MODULE_11__["KeyCodes"])))[event.code];
            switch (keyCode) {
                case _deja_js_core__WEBPACK_IMPORTED_MODULE_11__["KeyCodes"].LeftArrow:
                    _this.currentColumn = _this.columns && findPrev(_this.columns.findIndex((/**
                     * @param {?} c
                     * @return {?}
                     */
                    function (c) { return c.isCurrent; })));
                    event.preventDefault();
                    return false;
                case _deja_js_core__WEBPACK_IMPORTED_MODULE_11__["KeyCodes"].RightArrow:
                    _this.currentColumn = _this.columns && findNext(_this.columns.findIndex((/**
                     * @param {?} c
                     * @return {?}
                     */
                    function (c) { return c.isCurrent; })));
                    event.preventDefault();
                    return false;
                default:
                    return true;
            }
        }));
        Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["fromEvent"])(element, 'mousedown').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["takeWhile"])((/**
         * @return {?}
         */
        function () { return _this.isAlive; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["filter"])((/**
         * @param {?} downEvent
         * @return {?}
         */
        function (downEvent) { return downEvent.buttons === 1; })))
            .subscribe((/**
         * @param {?} downEvent
         * @return {?}
         */
        function (downEvent) {
            /** @type {?} */
            var clickedColumn = _this.getColumnFromHTMLElement((/** @type {?} */ (downEvent.target)));
            Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["fromEvent"])(element, 'mouseup').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["first"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["filter"])((/**
             * @return {?}
             */
            function () { return !!clickedColumn; })))
                .subscribe((/**
             * @param {?} upEvent
             * @return {?}
             */
            function (upEvent) {
                /** @type {?} */
                var columnElement = _this.getColumnElementFromHTMLElement((/** @type {?} */ (upEvent.target)));
                if ((columnElement && columnElement.getAttribute('colname')) === clickedColumn.name) {
                    _this.currentColumn = clickedColumn;
                }
            }));
        }));
    }
    Object.defineProperty(DejaGridComponent.prototype, "sortable", {
        get: /**
         * @return {?}
         */
        function () {
            return this._sortable;
        },
        /** Permet de trier le tableau au clic sur l'entête de la colonne */
        set: /**
         * Permet de trier le tableau au clic sur l'entête de la colonne
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._sortable = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_5__["coerceBooleanProperty"])(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaGridComponent.prototype, "columnGroups", {
        get: /**
         * @return {?}
         */
        function () {
            return this._columnGroups;
        },
        /** Définit les options de regroupement utilisateur de la grille. Plusieurs champs peuvent etre spécifiés dans le HTML en utilisant la , comme séparateur (Ex: columnGroups="color, name") */
        set: /**
         * Définit les options de regroupement utilisateur de la grille. Plusieurs champs peuvent etre spécifiés dans le HTML en utilisant la , comme séparateur (Ex: columnGroups="color, name")
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.columnGroups$.next(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaGridComponent.prototype, "noHorizontalScroll", {
        get: /**
         * @return {?}
         */
        function () {
            return this._noHorizontalScroll;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaGridComponent.prototype, "searchArea", {
        get: /**
         * @return {?}
         */
        function () {
            return this._searchArea;
        },
        /** Affiche un barre de recherche au dessus du tableau. */
        set: /**
         * Affiche un barre de recherche au dessus du tableau.
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._searchArea = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_5__["coerceBooleanProperty"])(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaGridComponent.prototype, "groupArea", {
        get: /**
         * @return {?}
         */
        function () {
            return this._groupArea;
        },
        /** Affiche une zone de regroupement des colonnes par drag and drop. */
        set: /**
         * Affiche une zone de regroupement des colonnes par drag and drop.
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._groupArea = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_5__["coerceBooleanProperty"])(value);
            if (this._columnsSortable && !this.clipboardService) {
                throw new Error('To use the DejaGrid.groupArea feature, please import and provide the DejaClipboardService in your application.');
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaGridComponent.prototype, "rowsDraggable", {
        get: /**
         * @return {?}
         */
        function () {
            return this._rowsDraggable;
        },
        /** Rend les lignes du tableau draggable vers un autre composant (ne pas confondre avec la propriété `sortable`) */
        set: /**
         * Rend les lignes du tableau draggable vers un autre composant (ne pas confondre avec la propriété `sortable`)
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._rowsDraggable = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_5__["coerceBooleanProperty"])(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaGridComponent.prototype, "rowsSortable", {
        get: /**
         * @return {?}
         */
        function () {
            return this._rowsSortable;
        },
        /** Rend les lignes du tableau triables par drag-and-drop */
        set: /**
         * Rend les lignes du tableau triables par drag-and-drop
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._rowsSortable = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_5__["coerceBooleanProperty"])(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaGridComponent.prototype, "columnsDraggable", {
        get: /**
         * @return {?}
         */
        function () {
            return this._columnsDraggable;
        },
        /** Définit si toutes les colonnes peuvent être draggable vers un autre composant. */
        set: /**
         * Définit si toutes les colonnes peuvent être draggable vers un autre composant.
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._columnsDraggable = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_5__["coerceBooleanProperty"])(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaGridComponent.prototype, "columnsSortable", {
        get: /**
         * @return {?}
         */
        function () {
            return this._columnsSortable;
        },
        /** Définit si toutes les colonnes peuvent être déplacées parmis les autres colonnes. */
        set: /**
         * Définit si toutes les colonnes peuvent être déplacées parmis les autres colonnes.
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._columnsSortable = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_5__["coerceBooleanProperty"])(value);
            if (this._columnsSortable && !this.clipboardService) {
                throw new Error('To use the DejaGrid.columnsSortable feature, please import and provide the DejaClipboardService in your application.');
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaGridComponent.prototype, "columnsSizable", {
        get: /**
         * @return {?}
         */
        function () {
            return this._columnsSizable;
        },
        /** Permet de redimensionner manuellement les colonnes du tableau. */
        set: /**
         * Permet de redimensionner manuellement les colonnes du tableau.
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._columnsSizable = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_5__["coerceBooleanProperty"])(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaGridComponent.prototype, "multiSelect", {
        get: /**
         * @return {?}
         */
        function () {
            return this._multiSelect;
        },
        /** Permet la sélection multiple des ligne de la grille (avec la touche shift ou ctrl) */
        set: /**
         * Permet la sélection multiple des ligne de la grille (avec la touche shift ou ctrl)
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._multiSelect = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_5__["coerceBooleanProperty"])(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaGridComponent.prototype, "columns", {
        /** Retourne la structure des colonnes de la grille. */
        get: /**
         * Retourne la structure des colonnes de la grille.
         * @return {?}
         */
        function () {
            return this._columns;
        },
        /** Définit la structure des colonnes de la grille. */
        set: /**
         * Définit la structure des colonnes de la grille.
         * @param {?} columns
         * @return {?}
         */
        function (columns) {
            this.columns$.next(columns);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaGridComponent.prototype, "rows", {
        /** Retourne le modèle affiché dans les lignes de la grille. */
        get: /**
         * Retourne le modèle affiché dans les lignes de la grille.
         * @return {?}
         */
        function () {
            return this._rows;
        },
        /** Définit le modèle affiché dans les lignes de la grille. */
        set: /**
         * Définit le modèle affiché dans les lignes de la grille.
         * @param {?} rows
         * @return {?}
         */
        function (rows) {
            var _this = this;
            this._rows = rows;
            if (this._rows && !this._columns) {
                if (this._rows instanceof Array) {
                    this.calcColumnsLayout(this._rows);
                }
                else {
                    /** @type {?} */
                    var observable = (/** @type {?} */ (this._rows));
                    if (!observable.subscribe) {
                        /** @type {?} */
                        var promise = (/** @type {?} */ (this._rows));
                        observable = Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["from"])(promise);
                    }
                    this.viewPortChanged.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["filter"])((/**
                     * @param {?} vp
                     * @return {?}
                     */
                    function (vp) { return vp && vp.items && vp.items.length > 0; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["first"])())
                        .subscribe((/**
                     * @param {?} vp
                     * @return {?}
                     */
                    function (vp) { return _this.calcColumnsLayout(vp.items); }));
                }
            }
            this.changeDetectorRef.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaGridComponent.prototype, "currentColumn", {
        /** Retourne la colonne en surbrillance. */
        get: /**
         * Retourne la colonne en surbrillance.
         * @return {?}
         */
        function () {
            return this.columns.find((/**
             * @param {?} c
             * @return {?}
             */
            function (c) { return c.isCurrent; }));
        },
        /** Définit la colonne en surbrillance. */
        set: /**
         * Définit la colonne en surbrillance.
         * @param {?} column
         * @return {?}
         */
        function (column) {
            this.columns.forEach((/**
             * @param {?} c
             * @return {?}
             */
            function (c) { return c.isCurrent = false; }));
            if (column) {
                column.isCurrent = true;
                this.ensureColumnVisible(column);
            }
            if (this._columnLayout) {
                this._columnLayout.refresh$.next();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaGridComponent.prototype, "itemListService", {
        /** Retourne le service de liste utilisé par ce composant. */
        get: /**
         * Retourne le service de liste utilisé par ce composant.
         * @return {?}
         */
        function () {
            return this._itemListService || this.treeListComponent.itemListService;
        },
        /** Definit le service de liste utilisé par ce composant. Ce srevice permet de controller dynamiquement la liste, ou de faire du lazyloading. */
        set: /**
         * Definit le service de liste utilisé par ce composant. Ce srevice permet de controller dynamiquement la liste, ou de faire du lazyloading.
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._itemListService = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaGridComponent.prototype, "depthMax", {
        /** Retourne une valeur indiquant le nombre de niveau hierarchiques affichés par la grille. */
        get: /**
         * Retourne une valeur indiquant le nombre de niveau hierarchiques affichés par la grille.
         * @return {?}
         */
        function () {
            return this.treeListComponent.depthMax;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaGridComponent.prototype, "viewPort", {
        /** Retourne le service de viewport utilisé pour la grille */
        get: /**
         * Retourne le service de viewport utilisé pour la grille
         * @return {?}
         */
        function () {
            return this.treeListComponent.viewPort;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaGridComponent.prototype, "searchPrefixTemplate", {
        get: /**
         * @return {?}
         */
        function () {
            return this.searchPrefixTemplateExternal || this.searchPrefixTemplateInternal;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaGridComponent.prototype, "searchSuffixTemplate", {
        get: /**
         * @return {?}
         */
        function () {
            return this.searchSuffixTemplateExternal || this.searchSuffixTemplateInternal;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaGridComponent.prototype, "rowTemplate", {
        get: /**
         * @return {?}
         */
        function () {
            return this.rowTemplateExternal || this.rowTemplateInternal;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaGridComponent.prototype, "parentRowTemplate", {
        get: /**
         * @return {?}
         */
        function () {
            return this.parentRowTemplateExternal || this.parentRowTemplateInternal;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaGridComponent.prototype, "cellTemplate", {
        get: /**
         * @return {?}
         */
        function () {
            return this._cellTemplate;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaGridComponent.prototype, "parentTitleTemplate", {
        get: /**
         * @return {?}
         */
        function () {
            return this._parentTitleTemplate;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaGridComponent.prototype, "columnsHeaderTemplate", {
        get: /**
         * @return {?}
         */
        function () {
            return this.headerTemplateExternal || this.headerTemplateInternal;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaGridComponent.prototype, "columnHeaderTemplate", {
        get: /**
         * @return {?}
         */
        function () {
            return this.columnHeaderTemplateExternal || this._columnHeaderTemplate;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaGridComponent.prototype, "columnLayout", {
        get: /**
         * @return {?}
         */
        function () {
            return this._columnLayout;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DejaGridComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.isAlive = false;
    };
    Object.defineProperty(DejaGridComponent.prototype, "value", {
        // get accessor
        get: 
        // get accessor
        /**
         * @return {?}
         */
        function () {
            return this.rows;
        },
        // set accessor including call the onchange callback
        set: 
        // set accessor including call the onchange callback
        /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.rows = value;
        },
        enumerable: true,
        configurable: true
    });
    /** Nettoye les caches et réaffiche le viewport. */
    /**
     * Nettoye les caches et réaffiche le viewport.
     * @return {?}
     */
    DejaGridComponent.prototype.refresh = /**
     * Nettoye les caches et réaffiche le viewport.
     * @return {?}
     */
    function () {
        if (this.treeListComponent) {
            this.treeListComponent.refresh();
        }
        if (this.columnLayout) {
            if (this.hasPercentageColumns) {
                this.calcColumnsLayout();
            }
            else {
                this.columnLayout.refresh$.next();
            }
        }
        this.changeDetectorRef.markForCheck();
    };
    /** Recalcule le viewport. */
    /**
     * Recalcule le viewport.
     * @param {?=} item
     * @return {?}
     */
    DejaGridComponent.prototype.refreshViewPort = /**
     * Recalcule le viewport.
     * @param {?=} item
     * @return {?}
     */
    function (item) {
        this.treeListComponent.refreshViewPort(item);
    };
    /** Efface la hauteur calculée des lignes en mode automatique */
    /**
     * Efface la hauteur calculée des lignes en mode automatique
     * @return {?}
     */
    DejaGridComponent.prototype.clearRowsHeight = /**
     * Efface la hauteur calculée des lignes en mode automatique
     * @return {?}
     */
    function () {
        if (this.treeListComponent) {
            this.treeListComponent.clearRowsHeight();
        }
    };
    /** Efface le viewport */
    /**
     * Efface le viewport
     * @return {?}
     */
    DejaGridComponent.prototype.clearViewPort = /**
     * Efface le viewport
     * @return {?}
     */
    function () {
        if (this.treeListComponent) {
            this.treeListComponent.clearViewPort();
        }
    };
    /** Calcul la position de la scrollbar horizontale pour que la colonne spéfiée soit dans la zone visible. */
    /**
     * Calcul la position de la scrollbar horizontale pour que la colonne spéfiée soit dans la zone visible.
     * @param {?} column
     * @return {?}
     */
    DejaGridComponent.prototype.ensureColumnVisible = /**
     * Calcul la position de la scrollbar horizontale pour que la colonne spéfiée soit dans la zone visible.
     * @param {?} column
     * @return {?}
     */
    function (column) {
        if (column === undefined || !this.columns || this.columns.length === 0 || this._noHorizontalScroll) {
            return;
        }
        /** @type {?} */
        var listElement = this.treeListComponent.listElement;
        /** @type {?} */
        var scrollPos = listElement.scrollLeft;
        /** @type {?} */
        var prevWidth = 0;
        this.columns.find((/**
         * @param {?} c
         * @return {?}
         */
        function (c) {
            if (column === c) {
                return true;
            }
            prevWidth += c.w;
        }));
        if (prevWidth < scrollPos) {
            listElement.scrollLeft = prevWidth;
        }
        else if (scrollPos < prevWidth + column.w - listElement.clientWidth) {
            listElement.scrollLeft = prevWidth + column.w - listElement.clientWidth;
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    DejaGridComponent.prototype.scroll = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.lastScrollLeft !== event.scrollLeft) {
            this.lastScrollLeft = event.scrollLeft;
            this.calcColumnsLayout();
        }
    };
    /** Trie la liste par le champs spécifié. */
    /**
     * Trie la liste par le champs spécifié.
     * @param {?=} name
     * @return {?}
     */
    DejaGridComponent.prototype.sort = /**
     * Trie la liste par le champs spécifié.
     * @param {?=} name
     * @return {?}
     */
    function (name) {
        this.treeListComponent.sort(name);
    };
    /** Trie la liste par le champs spécifié. */
    /**
     * Trie la liste par le champs spécifié.
     * @param {?=} name
     * @return {?}
     */
    DejaGridComponent.prototype.sort$ = /**
     * Trie la liste par le champs spécifié.
     * @param {?=} name
     * @return {?}
     */
    function (name) {
        return this.treeListComponent.sort$(name);
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
    DejaGridComponent.prototype.group$ = /**
     * Groupe les éléments en fonction du modèle de groupe spécifié
     * @param {?} groups
     * @return {?} Observable résolu par la fonction.
     */
    function (groups) {
        return this.treeListComponent.group$(groups);
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
    DejaGridComponent.prototype.ungroup$ = /**
     * Retire les groupe correspondants au modèle de groupe spécifié
     * @param {?} groupInfo
     * @return {?} Observable résolu par la fonction.
     */
    function (groupInfo) {
        return this.treeListComponent.ungroup$(groupInfo);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    DejaGridComponent.prototype.onColumnHeaderClicked = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var _this = this;
        if (this.treeListComponent && !this.sortable || event.column.sortable === false) {
            return;
        }
        /** @type {?} */
        var hideSpinner = (/**
         * @return {?}
         */
        function () {
            event.column.sorting = false;
            _this.changeDetectorRef.markForCheck();
            _this.header.refresh();
        });
        event.column.sorting = true;
        this.changeDetectorRef.markForCheck();
        Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["timer"])(1).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["first"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["switchMap"])((/**
         * @return {?}
         */
        function () { return _this.sort$(event.column.name); })))
            .subscribe((/**
         * @return {?}
         */
        function () {
            hideSpinner();
            _this.sortChanged.emit(_this.treeListComponent.sortInfos);
        }), (/**
         * @param {?} error
         * @return {?}
         */
        function (error) {
            hideSpinner();
            throw error.toString();
        }));
    };
    /**
     * @return {?}
     */
    DejaGridComponent.prototype.onColumnDragEnd = /**
     * @return {?}
     */
    function () {
        this.columnLayout.refresh$.next();
    };
    /**
     * @param {?} e
     * @return {?}
     */
    DejaGridComponent.prototype.onColumnLayoutChanged = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        this.columns.splice(e.index, 1);
        if (!!e.target) {
            this.columns.splice(e.targetIndex, 0, e.column);
        }
        else {
            this.columns.push(e.column);
        }
        this.calcColumnsLayout();
        this.ensureColumnVisible(e.column);
        this.columnLayoutChanged.emit(e);
        this.changeDetectorRef.markForCheck();
    };
    /**
     * @param {?} e
     * @return {?}
     */
    DejaGridComponent.prototype.onColumnSizeChanged = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        if (!this.columnsLayoutInfos) {
            return;
        }
        if (!this.sizingLayoutInfos) {
            this.sizingLayoutInfos = this.columnsLayoutInfos;
        }
        if (!e.column) {
            // End of sizing process
            delete this.sizingLayoutInfos;
            return;
        }
        /** @type {?} */
        var originalWidth = this.sizingLayoutInfos.columnsWidth[e.column.name];
        /** @type {?} */
        var minimumWidth = e.column.minWidth || this.columnsMinWidth;
        if (originalWidth.unit === '%') {
            /** @type {?} */
            var listElement = this.treeListComponent.listElement;
            /** @type {?} */
            var containerWidth = listElement.clientWidth;
            // Calcul de la place restante pour les colonnes en pourcent
            /** @type {?} */
            var availableWidth = containerWidth - this.sizingLayoutInfos.totalFixedWidth;
            // Calcul de l'offset en %
            /** @type {?} */
            var percentOffsetWidth = e.offsetWidth * this.sizingLayoutInfos.totalPercentWidth / availableWidth;
            /** @type {?} */
            var percentMinWidth = minimumWidth * 100 / containerWidth;
            e.column.width = Math.max(percentMinWidth, originalWidth.value + percentOffsetWidth * 2) + "%";
        }
        else {
            e.column.width = Math.max(minimumWidth, originalWidth.value + e.offsetWidth) + "px";
        }
        this.calcColumnsLayout();
        // Disable text selection during drag and drop
        this.disableUserSelection$.next();
        this.ensureSizingVisible(e.column);
        this.columnSizeChanged.emit(e);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    DejaGridComponent.prototype.onGroupRemoved = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var column = event.item;
        /** @type {?} */
        var groupInfo = (/** @type {?} */ ({
            groupByField: column.groupByField || column.name,
            groupTextField: column.groupTextField || column.name,
        }));
        this.treeListComponent.ungroup$(groupInfo).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["first"])())
            .subscribe(noop);
    };
    /**
     * @param {?} e
     * @return {?}
     */
    DejaGridComponent.prototype.onGroupsChanged = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        this.columnGroups$.next(e.columns);
    };
    /**
     * @param {?=} rows
     * @return {?}
     */
    DejaGridComponent.prototype.calcColumnsLayout = /**
     * @param {?=} rows
     * @return {?}
     */
    function (rows) {
        var _this = this;
        this.noColumnsSpecified = false;
        if (!this._columns || !this._columns.length) {
            if (rows && rows.length) {
                /** @type {?} */
                var searchFirstLastLevelRow_1 = (/**
                 * @param {?} items
                 * @return {?}
                 */
                function (items) {
                    return items.find((/**
                     * @param {?} row
                     * @return {?}
                     */
                    function (row) {
                        if (row.$items) {
                            // IItemTree
                            /** @type {?} */
                            var srow = searchFirstLastLevelRow_1(row.$items);
                            if (srow) {
                                return !!srow;
                            }
                        }
                        else {
                            // IItemBase
                            return !!row;
                        }
                    }));
                });
                /** @type {?} */
                var treeRow = searchFirstLastLevelRow_1(rows);
                if (treeRow) {
                    this.noColumnsSpecified = true;
                    this._columns = Object.keys(treeRow).map((/**
                     * @param {?} key
                     * @return {?}
                     */
                    function (key) {
                        return (/** @type {?} */ ({
                            label: key,
                            name: key,
                            width: '130px',
                        }));
                    }));
                }
            }
        }
        if (this.noColumnsSpecified) {
            this.printColumnLayout$.next();
        }
        this.clearColumnLayout();
        if (!this._columns || !this._columns.length) {
            if (this.header) {
                this.header.refresh();
            }
            this._columnLayout.refresh$.next();
            return;
        }
        /** @type {?} */
        var listElement = this.treeListComponent && this.treeListComponent.listElement;
        if (!listElement) {
            return;
        }
        this._columnLayout.scrollLeft = -this.lastScrollLeft;
        /** @type {?} */
        var viewLeft = -this.lastScrollLeft;
        /** @type {?} */
        var containerWidth = listElement.clientWidth;
        // Calc total fixed width
        this.columnsLayoutInfos = new DejaGridColumnsLayoutInfos(this._columns);
        // Reset width
        this._columns.forEach((/**
         * @param {?} column
         * @return {?}
         */
        function (column) { return delete column.w; }));
        /** @type {?} */
        var calcColumnsWidth = (/**
         * @return {?}
         */
        function () {
            // Taille totale des colonnes visibles en pixel
            /** @type {?} */
            var totalFixedWidth = 0;
            // Attribution des colonnes en pixels
            _this.columnsLayoutInfos.fixedColumns.filter((/**
             * @param {?} column
             * @return {?}
             */
            function (column) { return column.w !== 0; })).forEach((/**
             * @param {?} column
             * @return {?}
             */
            function (column) {
                /** @type {?} */
                var width = _this.columnsLayoutInfos.columnsWidth[column.name];
                /** @type {?} */
                var minimumWidth = column.minWidth || _this.columnsMinWidth;
                column.w = Math.max(minimumWidth, width.value);
                totalFixedWidth += column.w;
            }));
            // Calcul de la place restante pour les colonnes en pourcent
            _this.columnsLayoutInfos.totalFixedWidth = totalFixedWidth;
            // Filtrer les colonnes visibles en pourcent
            /** @type {?} */
            var percentColumns = _this.columnsLayoutInfos.percentColumns.filter((/**
             * @param {?} column
             * @return {?}
             */
            function (column) { return column.w !== 0; }));
            // Calcul de la taille retsante pour l'attribution des pourcents une fois les tailles minimum enlevées
            /** @type {?} */
            var availableWidthForPercent = containerWidth - totalFixedWidth;
            percentColumns.forEach((/**
             * @param {?} column
             * @return {?}
             */
            function (column) { return availableWidthForPercent -= (column.minWidth || _this.columnsMinWidth); }));
            /** @type {?} */
            var availableWidth = availableWidthForPercent;
            // Attribution des colonnes en pourcent
            percentColumns.forEach((/**
             * @param {?} column
             * @return {?}
             */
            function (column) {
                /** @type {?} */
                var width = _this.columnsLayoutInfos.columnsWidth[column.name];
                /** @type {?} */
                var minimumWidth = column.minWidth || _this.columnsMinWidth;
                /** @type {?} */
                var pixelWidth = minimumWidth;
                if (availableWidthForPercent > 0) {
                    /** @type {?} */
                    var aditionalWidth = Math.floor(availableWidthForPercent * width.value / _this.columnsLayoutInfos.totalPercentWidth);
                    availableWidth -= aditionalWidth;
                    pixelWidth += aditionalWidth;
                }
                column.w = pixelWidth;
            }));
            return availableWidth;
        });
        /** @type {?} */
        var rest = calcColumnsWidth();
        if (rest < 0 && this.columnsLayoutInfos.responsiveColumns.length) {
            // Remove responsive columns
            this.columnsLayoutInfos.responsiveColumns.find((/**
             * @param {?} column
             * @return {?}
             */
            function (column) {
                rest += column.w;
                column.w = 0; // Hide column
                return rest >= 0;
            }));
            rest = calcColumnsWidth();
        }
        this._noHorizontalScroll = rest >= 0;
        // Register to page resize only if percentage columns are defined
        this.hasPercentageColumns = this.columnsLayoutInfos && this.columnsLayoutInfos.percentColumns.length > 0;
        this._columnLayout.vpBeforeWidth = 0;
        this._columnLayout.vpAfterWidth = 0;
        /** @type {?} */
        var totalWidth = 0;
        this._columns.filter((/**
         * @param {?} column
         * @return {?}
         */
        function (column) { return column.w > 0; })).forEach((/**
         * @param {?} column
         * @return {?}
         */
        function (column) {
            totalWidth += column.w;
            if (viewLeft > containerWidth) {
                _this._columnLayout.vpAfterWidth += column.w;
                viewLeft += column.w;
            }
            else {
                viewLeft += column.w;
                if (viewLeft < 0) {
                    _this._columnLayout.vpBeforeWidth += column.w;
                }
                else {
                    _this._columnLayout.columns.push(column);
                }
            }
        }));
        this.rowsWidth = totalWidth > containerWidth ? totalWidth : containerWidth;
        if (this.header) {
            this.header.refresh();
        }
        this._columnLayout.refresh$.next();
    };
    /**
     * @private
     * @param {?} column
     * @return {?}
     */
    DejaGridComponent.prototype.ensureSizingVisible = /**
     * @private
     * @param {?} column
     * @return {?}
     */
    function (column) {
        if (column === undefined || !this.columns || this.columns.length === 0 || this._noHorizontalScroll) {
            return;
        }
        /** @type {?} */
        var listElement = this.treeListComponent.listElement;
        /** @type {?} */
        var scrollPos = listElement.scrollLeft;
        /** @type {?} */
        var prevWidth = 0;
        this.columns.find((/**
         * @param {?} c
         * @return {?}
         */
        function (c) {
            if (column === c) {
                return true;
            }
            prevWidth += c.w;
        }));
        if (prevWidth + column.w < scrollPos) {
            listElement.scrollLeft = prevWidth + column.w;
        }
        else if (scrollPos < prevWidth + column.w - listElement.clientWidth) {
            listElement.scrollLeft = prevWidth + column.w - listElement.clientWidth;
        }
    };
    /**
     * @private
     * @return {?}
     */
    DejaGridComponent.prototype.clearColumnLayout = /**
     * @private
     * @return {?}
     */
    function () {
        this._columnLayout.scrollLeft = 0;
        this._columnLayout.vpAfterWidth = 0;
        this._columnLayout.vpBeforeWidth = 0;
        this._columnLayout.columns = [];
    };
    /**
     * @private
     * @param {?} element
     * @return {?}
     */
    DejaGridComponent.prototype.getColumnElementFromHTMLElement = /**
     * @private
     * @param {?} element
     * @return {?}
     */
    function (element) {
        /** @type {?} */
        var parentElement = element;
        while (parentElement && !parentElement.hasAttribute('colname')) {
            element = parentElement;
            parentElement = parentElement.parentElement;
        }
        if (!parentElement) {
            return undefined;
        }
        return parentElement;
    };
    /**
     * @private
     * @param {?} element
     * @return {?}
     */
    DejaGridComponent.prototype.getColumnFromHTMLElement = /**
     * @private
     * @param {?} element
     * @return {?}
     */
    function (element) {
        /** @type {?} */
        var columnElement = this.getColumnElementFromHTMLElement(element);
        /** @type {?} */
        var colname = columnElement && columnElement.getAttribute('colname');
        return colname && this._columnLayout.columns.find((/**
         * @param {?} column
         * @return {?}
         */
        function (column) { return column.name === colname; }));
    };
    DejaGridComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Component"], args: [{
                    changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_6__["ChangeDetectionStrategy"].OnPush,
                    encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_6__["ViewEncapsulation"].None,
                    selector: 'deja-grid',
                    template: "<deja-grid-grouparea *ngIf=\"groupArea\" [groups]=\"columnGroups\" (groupsChanged)=\"onGroupsChanged($event)\" (groupRemoved)=\"onGroupRemoved($event)\"></deja-grid-grouparea>\n<deja-tree-list id=\"treelist\" #treelist [selectedItems]=\"selectedItems\" [selectedItem]=\"selectedItem\" [selectedModels]=\"selectedModels\" [selectedModel]=\"selectedModel\" [itemsWidth]=\"rowsWidth\" [textField]=\"textField\"\n    [waiter]=\"waiter\" [valueField]=\"valueField\" [itemsDraggable]=\"rowsDraggable\" [sortable]=\"rowsSortable\" [min-search-length]=\"minSearchLength\" [searchArea]=\"searchArea\" [query]=\"query\" [maxHeight]=\"maxHeight\" [pageSize]=\"pageSize\" [hintLabel]=\"hintLabel\"\n    [sortable]=\"sortableRows\" [multiSelect]=\"multiSelect\" [itemListService]=\"itemListService\" [sortingService]=\"sortingService\" [groupingService]=\"groupingService\" [nodataholder]=\"nodataholder\" [placeholder]=\"placeholder\" [viewPortRowHeight]=\"viewPortRowHeight\"\n    [viewportMode]=\"viewportMode\" [currentItem]=\"currentRow\" [childrenField]=\"childrenField\" [searchField]=\"searchField\" [items]=\"rows\" (itemDragEnd)=\"itemDragEnd.emit($event)\" [parentItemTemplateExternal]=\"parentRowTemplate\" [itemTemplateExternal]=\"rowTemplate\"\n    [headerTemplateExternal]=\"columnsHeaderTemplate\" [searchPrefixTemplateExternal]=\"searchPrefixTemplate\" [searchSuffixTemplateExternal]=\"searchSuffixTemplate\" (itemDragStart)=\"itemDragStart.emit($event)\" (selectedChange)=\"selectedChange.emit($event)\" (viewPortChanged)=\"viewPortChanged.emit($event)\"\n    (scroll)=\"scroll($event)\" [attr.nohscroll]=\"noHorizontalScroll || null\" [loadingItems]=\"loadingRows\" [selectingItem]=\"selectingRow\" [unselectingItem]=\"unselectingRow\" [expandingItem]=\"expandingRow\" [collapsingItem]=\"collapsingRow\">\n    <ng-template #parentItemTemplate let-item let-flatindex=\"flatindex \" let-query=\"query\">\n        <deja-grid-parent-row *ngIf=\"!parentRowTemplate\" [row]=\"item\" [flatIndex]=\"flatindex\" [columns]=\"columns\" [parentTitleTemplateExternal]=\"parentTitleTemplate\" [cellTemplateExternal]=\"cellTemplate\" [style.width.px]=\"rowsWidth\"></deja-grid-parent-row>\n    </ng-template>\n    <ng-template #itemTemplate let-item let-flatindex=\"flatindex \" let-query=\"query\">\n        <deja-grid-row *ngIf=\"!rowTemplate\" [row]=\"item\" [flatIndex]=\"flatindex\" [columnLayout]=\"columnLayout\" [cellTemplateExternal]=\"cellTemplate\" [style.width.px]=\"rowsWidth\"></deja-grid-row>\n    </ng-template>\n    <ng-template #headerTemplate>\n        <deja-grid-header *ngIf=\"!columnsHeaderTemplate && columnLayout && columnLayout.columns && columnLayout.columns.length\" #gridHeaderElement [sortInfos]=\"treelist.sortInfos\" (columnDragEnd)=\"onColumnDragEnd()\" [columnLayout]=\"columnLayout\" [columnsDraggable]=\"columnsDraggable || groupArea\"\n            [columnsSortable]=\"columnsSortable\" [columnsSizable]=\"columnsSizable\" [columnHeaderTemplateExternal]=\"columnHeaderTemplate\" (columnLayoutChanged)=\"onColumnLayoutChanged($event)\" (columnSizeChanged)=\"onColumnSizeChanged($event)\" (columnHeaderClicked)=\"onColumnHeaderClicked($event)\"></deja-grid-header>\n    </ng-template>\n</deja-tree-list>",
                    styles: ["deja-grid{display:flex;flex-direction:column;align-content:stretch;max-width:100%;overflow:hidden}deja-grid:not([viewportmode=auto]) .deja-listcontainer>div.listitem deja-grid-parent-row,deja-grid:not([viewportmode=auto]) .deja-listcontainer>div.listitem deja-grid-row{height:100%}deja-grid #deja-grid-grouparea{flex:0 0 auto}deja-grid #treelist{flex:1 1 auto}deja-grid #treelist .deja-listcontainer>div.listitem{padding:0}deja-grid #treelist .deja-listcontainer>div.listitem[current=true]{box-shadow:none}deja-grid #treelist .deja-listcontainer>div.listitem[current=true] .cell-wrapper[current=true]{box-shadow:inset 0 0 0 1px rgba(0,0,0,.3)}deja-grid #treelist .deja-listcontainer>div.listitem deja-grid-parent-row,deja-grid #treelist .deja-listcontainer>div.listitem deja-grid-row{width:100%}deja-grid #treelist .deja-listcontainer[depth-max]>div.listitem{padding:0}deja-grid #treelist .deja-listcontainer[depth-max]>div.listitem[depth] deja-grid-parent-row>.cell-wrapper:nth-child(1) .cell,deja-grid #treelist .deja-listcontainer[depth-max]>div.listitem[depth] deja-grid-row>.cell-wrapper:nth-child(1) .cell{padding-left:2.25rem}deja-grid #treelist .deja-listcontainer[depth-max]>div.listitem[depth=\"0\"] deja-grid-parent-row>.cell-wrapper:nth-child(1) .cell,deja-grid #treelist .deja-listcontainer[depth-max]>div.listitem[depth=\"0\"] deja-grid-row>.cell-wrapper:nth-child(1) .cell{padding-left:0}deja-grid #treelist .deja-listcontainer[depth-max]>div.listitem[depth=\"1\"] deja-grid-parent-row>.cell-wrapper:nth-child(1) .cell,deja-grid #treelist .deja-listcontainer[depth-max]>div.listitem[depth=\"1\"] deja-grid-row>.cell-wrapper:nth-child(1) .cell{padding-left:.45rem}deja-grid #treelist .deja-listcontainer[depth-max]>div.listitem[depth=\"2\"] deja-grid-parent-row>.cell-wrapper:nth-child(1) .cell,deja-grid #treelist .deja-listcontainer[depth-max]>div.listitem[depth=\"2\"] deja-grid-row>.cell-wrapper:nth-child(1) .cell{padding-left:.9rem}deja-grid #treelist .deja-listcontainer[depth-max]>div.listitem[depth=\"3\"] deja-grid-parent-row>.cell-wrapper:nth-child(1) .cell,deja-grid #treelist .deja-listcontainer[depth-max]>div.listitem[depth=\"3\"] deja-grid-row>.cell-wrapper:nth-child(1) .cell{padding-left:1.35rem}deja-grid #treelist .deja-listcontainer[depth-max]>div.listitem[depth=\"4\"] deja-grid-parent-row>.cell-wrapper:nth-child(1) .cell,deja-grid #treelist .deja-listcontainer[depth-max]>div.listitem[depth=\"4\"] deja-grid-row>.cell-wrapper:nth-child(1) .cell{padding-left:1.8rem}deja-grid #treelist .deja-listcontainer[depth-max=\"1\"]>div.listitem[depth=\"1\"] deja-grid-parent-row>.cell-wrapper:nth-child(1) .cell,deja-grid #treelist .deja-listcontainer[depth-max=\"1\"]>div.listitem[depth=\"1\"] deja-grid-row>.cell-wrapper:nth-child(1) .cell{padding-left:1rem}deja-grid #treelist .deja-listcontainer[depth-max=\"2\"]>div.listitem[depth=\"1\"] deja-grid-parent-row>.cell-wrapper:nth-child(1) .cell,deja-grid #treelist .deja-listcontainer[depth-max=\"2\"]>div.listitem[depth=\"1\"] deja-grid-row>.cell-wrapper:nth-child(1) .cell{padding-left:.7rem}deja-grid #treelist .deja-listcontainer[depth-max=\"2\"]>div.listitem[depth=\"2\"] deja-grid-parent-row>.cell-wrapper:nth-child(1) .cell,deja-grid #treelist .deja-listcontainer[depth-max=\"2\"]>div.listitem[depth=\"2\"] deja-grid-row>.cell-wrapper:nth-child(1) .cell{padding-left:1.4rem}deja-grid #treelist .deja-listcontainer[depth-max=\"3\"]>div.listitem[depth=\"1\"] deja-grid-parent-row>.cell-wrapper:nth-child(1) .cell,deja-grid #treelist .deja-listcontainer[depth-max=\"3\"]>div.listitem[depth=\"1\"] deja-grid-row>.cell-wrapper:nth-child(1) .cell{padding-left:.6rem}deja-grid #treelist .deja-listcontainer[depth-max=\"3\"]>div.listitem[depth=\"2\"] deja-grid-parent-row>.cell-wrapper:nth-child(1) .cell,deja-grid #treelist .deja-listcontainer[depth-max=\"3\"]>div.listitem[depth=\"2\"] deja-grid-row>.cell-wrapper:nth-child(1) .cell{padding-left:1.2rem}deja-grid #treelist .deja-listcontainer[depth-max=\"3\"]>div.listitem[depth=\"3\"] deja-grid-parent-row>.cell-wrapper:nth-child(1) .cell,deja-grid #treelist .deja-listcontainer[depth-max=\"3\"]>div.listitem[depth=\"3\"] deja-grid-row>.cell-wrapper:nth-child(1) .cell{padding-left:1.8rem}deja-grid #treelist .deja-listcontainer[depth-max=\"4\"]>div.listitem[depth=\"1\"] deja-grid-parent-row>.cell-wrapper:nth-child(1) .cell,deja-grid #treelist .deja-listcontainer[depth-max=\"4\"]>div.listitem[depth=\"1\"] deja-grid-row>.cell-wrapper:nth-child(1) .cell{padding-left:.5rem}deja-grid #treelist .deja-listcontainer[depth-max=\"4\"]>div.listitem[depth=\"2\"] deja-grid-parent-row>.cell-wrapper:nth-child(1) .cell,deja-grid #treelist .deja-listcontainer[depth-max=\"4\"]>div.listitem[depth=\"2\"] deja-grid-row>.cell-wrapper:nth-child(1) .cell{padding-left:1rem}deja-grid #treelist .deja-listcontainer[depth-max=\"4\"]>div.listitem[depth=\"3\"] deja-grid-parent-row>.cell-wrapper:nth-child(1) .cell,deja-grid #treelist .deja-listcontainer[depth-max=\"4\"]>div.listitem[depth=\"3\"] deja-grid-row>.cell-wrapper:nth-child(1) .cell{padding-left:1.5rem}deja-grid #treelist .deja-listcontainer[depth-max=\"4\"]>div.listitem[depth=\"4\"] deja-grid-parent-row>.cell-wrapper:nth-child(1) .cell,deja-grid #treelist .deja-listcontainer[depth-max=\"4\"]>div.listitem[depth=\"4\"] deja-grid-row>.cell-wrapper:nth-child(1) .cell{padding-left:2rem}deja-grid #treelist[nohscroll] .deja-listcontainer{overflow-x:hidden}deja-grid[disableselection]{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}"]
                }] }
    ];
    /** @nocollapse */
    DejaGridComponent.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["ChangeDetectorRef"] },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["ElementRef"] },
        { type: _deja_js_core__WEBPACK_IMPORTED_MODULE_11__["DejaClipboardService"], decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Optional"] }] }
    ]; };
    DejaGridComponent.propDecorators = {
        placeholder: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        nodataholder: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        minSearchLength: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"], args: ['min-search-length',] }],
        query: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        maxHeight: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        pageSize: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        hintLabel: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        viewPortRowHeight: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        viewportMode: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        childrenField: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        textField: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        waiter: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        valueField: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        searchField: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        currentRow: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        selectedItems: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        selectedItem: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        selectedModels: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        selectedModel: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        sortingService: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        groupingService: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        columnsMinWidth: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        rowTemplateExternal: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        parentRowTemplateExternal: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        headerTemplateExternal: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        columnHeaderTemplateExternal: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        searchPrefixTemplateExternal: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        searchSuffixTemplateExternal: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        loadingRows: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        selectingRow: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        unselectingRow: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        expandingRow: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        collapsingRow: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        itemDragEnd: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Output"] }],
        itemDragStart: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Output"] }],
        selectedChange: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Output"] }],
        columnLayoutChanged: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Output"] }],
        columnSizeChanged: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Output"] }],
        viewPortChanged: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Output"] }],
        sortChanged: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Output"] }],
        groupChanged: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Output"] }],
        rowTemplateInternal: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["ContentChild"], args: ['rowTemplate',] }],
        parentRowTemplateInternal: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["ContentChild"], args: ['parentRowTemplate',] }],
        _cellTemplate: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["ContentChild"], args: ['cellTemplate',] }],
        _parentTitleTemplate: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["ContentChild"], args: ['parentTitleTemplate',] }],
        _columnHeaderTemplate: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["ContentChild"], args: ['columnHeaderTemplate',] }],
        headerTemplateInternal: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["ContentChild"], args: ['headerTemplate',] }],
        searchPrefixTemplateInternal: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["ContentChild"], args: ['searchPrefixTemplate',] }],
        searchSuffixTemplateInternal: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["ContentChild"], args: ['searchSuffixTemplate',] }],
        header: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["ViewChild"], args: [DejaGridHeaderComponent,] }],
        treeListComponent: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["ViewChild"], args: [_deja_js_component_tree_list__WEBPACK_IMPORTED_MODULE_7__["DejaTreeListComponent"],] }],
        sortable: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        searchArea: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        groupArea: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        rowsDraggable: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        rowsSortable: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        columnsDraggable: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        columnsSortable: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        columnsSizable: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        multiSelect: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        columns: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        rows: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        currentColumn: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        itemListService: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        columnGroups: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }]
    };
    return DejaGridComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var DejaGridRowEvent = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_10__["__extends"])(DejaGridRowEvent, _super);
    function DejaGridRowEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return DejaGridRowEvent;
}(_deja_js_core__WEBPACK_IMPORTED_MODULE_11__["DejaItemEvent"]));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var DejaGridRowsEvent = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_10__["__extends"])(DejaGridRowsEvent, _super);
    function DejaGridRowsEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return DejaGridRowsEvent;
}(_deja_js_core__WEBPACK_IMPORTED_MODULE_11__["DejaItemsEvent"]));

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
var DejaGridModule = /** @class */ (function () {
    function DejaGridModule() {
    }
    DejaGridModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["NgModule"], args: [{
                    declarations: [
                        DejaGridComponent,
                        DejaGridRowComponent,
                        DejaGridParentRowComponent,
                        DejaGridHeaderComponent,
                        DejaGridGroupAreaComponent,
                    ],
                    exports: [
                        DejaGridComponent,
                        DejaGridRowComponent,
                        DejaGridParentRowComponent,
                        DejaGridHeaderComponent,
                        DejaGridGroupAreaComponent,
                    ],
                    imports: [
                        _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
                        _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormsModule"],
                        _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatIconModule"],
                        _deja_js_component_tree_list__WEBPACK_IMPORTED_MODULE_7__["DejaTreeListModule"],
                        _deja_js_component_dragdrop__WEBPACK_IMPORTED_MODULE_4__["DejaDragDropModule"],
                        _deja_js_core__WEBPACK_IMPORTED_MODULE_11__["DejaSortingModule"],
                        _deja_js_component_chips__WEBPACK_IMPORTED_MODULE_3__["DejaChipsModule"],
                    ],
                },] }
    ];
    return DejaGridModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */



//# sourceMappingURL=deja-js-component-data-grid.js.map

/***/ }),

/***/ "./src/app/grid/grid-demo.html":
/*!*************************************!*\
  !*** ./src/app/grid/grid-demo.html ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-tab-group [selectedIndex]=\"tabIndex\" (selectedTabChange)=\"tabIndex = $event.index\">\n\t<mat-tab label=\"API REFERENCE\"></mat-tab>\n\t<mat-tab label=\"SIMPLE EXAMPLES\"></mat-tab>\n\t<mat-tab label=\"ADVANCED EXAMPLES\"></mat-tab>\n\t<mat-tab label=\"COLUMNS MODES\"></mat-tab>\n\t<mat-tab label=\"TEMPLATING\"></mat-tab>\n\t<mat-tab label=\"PRE-SELECTIONS\"></mat-tab>\n\t<mat-tab label=\"PRE-EVENTS AND ON_DEMAND\"></mat-tab>\n\t<mat-tab label=\"PERFORMANCES\"></mat-tab>\n</mat-tab-group>\n\n<deja-dialog *ngIf=\"dialogVisible\">\n\t<deja-message-box type=\"primary\" title=\"Confirm Box\">\n\t\tPlease confirm your operation!\n\t\t<ng-template #actionsTemplate>\n\t\t\t<button id=\"cancelbtn\" mat-raised-button (click)=\"dialogResponse$.next('cancel')\">Cancel</button>\n\t\t\t<button id=\"okbtn\" mat-raised-button color=\"primary\" (click)=\"dialogResponse$.next('ok')\">Ok</button>\n\t\t</ng-template>\n\t</deja-message-box>\n</deja-dialog>\n\n<mat-card class=\"demo-card\" *ngIf=\"tabIndex === 0\">\n\t<deja-markdown [url]=\"'https://raw.githubusercontent.com/DSI-HUG/dejajs-components/dev/projects/deja-js/component/data-grid/readme.md'\"></deja-markdown>\n</mat-card>\n\n<div *ngIf=\"tabIndex === 1\">\n\t<mat-card class=\"demo-card demo-basic\">\n\t\t<mat-toolbar color=\"primary\">Simple Usage</mat-toolbar>\n\t\t<mat-card-content fxLayout=\"column\">\n\t\t\t<deja-grid searchArea columnsSortable columnsSizable sortable maxHeight=\"auto\" [rows]=\"peopleRows\" [columns]=\"peopleColumns\" nodataholder=\"No datas\" placeholder=\"Filter by name\" searchField=\"name\" valueField=\"guid\"></deja-grid>\n\t\t</mat-card-content>\n\t</mat-card>\n\t<mat-card class=\"demo-card demo-basic\">\n\t\t<mat-toolbar color=\"primary\">Keyboard Navigation and Multi Selection</mat-toolbar>\n\t\t<mat-card-content class=\"listContainer\">\n\t\t\t<div>deja-grid has some keyboard navigation feature</div>\n\t\t\t<div fxLayout=\"row\">\n\t\t\t\t<span fxFlex=\"0 0 45%\" fxLayout=\"column\">\n\t\t\t\t\t<deja-grid fxFlex=\"0 0 500px\" columnsSortable multiSelect columnsSizable sortable [rows]=\"peopleForMultiselect$\" [columns]=\"peopleColumns\" nodataholder=\"No datas\" placeholder=\"Filter by name\" searchField=\"name\" valueField=\"guid\"></deja-grid>\n\t\t\t\t</span>\n\t\t\t\t<ul fxFlex=\"0 0 45%\" fxFlexOffset=\"5%\" id=\"shortcut-list\">\n\t\t\t\t\t<li>Press\n\t\t\t\t\t\t<span class=\"keyboard-key\">↑</span> to select the previous row</li>\n\t\t\t\t\t<li>Press\n\t\t\t\t\t\t<span class=\"keyboard-key\">↓</span> to select the next row</li>\n\t\t\t\t\t<li>Press\n\t\t\t\t\t\t<span class=\"keyboard-key\">←</span> to select the previous cell</li>\n\t\t\t\t\t<li>Press\n\t\t\t\t\t\t<span class=\"keyboard-key\">→</span> to select the next cell</li>\n\t\t\t\t\t<li>Press\n\t\t\t\t\t\t<span class=\"keyboard-key\">Ctrl</span>\n\t\t\t\t\t\t<span class=\"keyboard-key\">↑</span> to change the current row to the previous</li>\n\t\t\t\t\t<li>Press\n\t\t\t\t\t\t<span class=\"keyboard-key\">Ctrl</span>\n\t\t\t\t\t\t<span class=\"keyboard-key\">↓</span> to change the current row to the next</li>\n\t\t\t\t\t<li>Press\n\t\t\t\t\t\t<span class=\"keyboard-key\">Shift</span>\n\t\t\t\t\t\t<span class=\"keyboard-key\">↑</span> to change the current row to the previous</li>\n\t\t\t\t\t<li>Press\n\t\t\t\t\t\t<span class=\"keyboard-key\">Shift</span>\n\t\t\t\t\t\t<span class=\"keyboard-key\">↓</span> to change the current row to the next</li>\n\t\t\t\t\t<li>Press\n\t\t\t\t\t\t<span class=\"keyboard-key\">Ctrl</span>\n\t\t\t\t\t\t<span class=\"keyboard-key\">Space</span> to add/remove the current row to the selection</li>\n\t\t\t\t\t<li>Press\n\t\t\t\t\t\t<span class=\"keyboard-key\">Shift</span>\n\t\t\t\t\t\t<span class=\"keyboard-key\">↑</span> to select a range orf rows</li>\n\t\t\t\t\t<li>Press\n\t\t\t\t\t\t<span class=\"keyboard-key\">Shift</span>\n\t\t\t\t\t\t<span class=\"keyboard-key\">↓</span> to select a range orf rows</li>\n\t\t\t\t\t<li>Press\n\t\t\t\t\t\t<span class=\"keyboard-key\">PageUp</span> to select the next page row</li>\n\t\t\t\t\t<li>Press\n\t\t\t\t\t\t<span class=\"keyboard-key\">PageDown</span> to select the previous page row</li>\n\t\t\t\t\t<li>Press\n\t\t\t\t\t\t<span class=\"keyboard-key\">Home</span> to select the first row</li>\n\t\t\t\t\t<li>Press\n\t\t\t\t\t\t<span class=\"keyboard-key\">End</span> to select the last row</li>\n\t\t\t\t\t<li>Press\n\t\t\t\t\t\t<span class=\"keyboard-key\">Space</span> to collapse/expand a group header or to select/unselect the current row</li>\n\t\t\t\t\t<li>Press\n\t\t\t\t\t\t<span class=\"keyboard-key\">A</span>..\n\t\t\t\t\t\t<span class=\"keyboard-key\">Z</span>\n\t\t\t\t\t\t<span class=\"keyboard-key\">0</span>..\n\t\t\t\t\t\t<span class=\"keyboard-key\">9</span> to select the next row started with the pressed key</li>\n\t\t\t\t</ul>\n\t\t\t</div>\n\t\t</mat-card-content>\n\t</mat-card>\n</div>\n\n<div *ngIf=\"tabIndex === 2\">\n\t<mat-card class=\"deja-grid-demo demo-card demo-basic\">\n\t\t<mat-toolbar color=\"primary\">Grouping Client Side</mat-toolbar>\n\t\t<mat-card-content fxLayout=\"column\" class=\"listContainer\">\n\t\t\t<div>To allow the user grouping just add the groupArea directive</div>\n\t\t\t<deja-grid fxFlex=\"0 0 600px\" groupArea columnsSortable multiSelect columnsSizable sortable columnGroups=\"eyeColor\" [rows]=\"people$\" [columns]=\"peopleColumnsEx\" nodataholder=\"No datas\" placeholder=\"Filter by name\" searchField=\"name\" valueField=\"guid\">\n\t\t\t\t<ng-template #cellTemplate let-row let-column=\"column\">\n\t\t\t\t\t<span *ngIf=\"column.name==='color'\" class=\"color\" [style.background-color]=\"row[column.name]\"></span>\n\t\t\t\t</ng-template>\n\t\t\t</deja-grid>\n\t\t</mat-card-content>\n\t\t<mat-toolbar color=\"primary\">Grouping Server Side and Drag Drop</mat-toolbar>\n\t\t<mat-card-content>\n\t\t\t<div>Grouping example</div>\n\t\t\t<div fxLayout=\"row\">\n\t\t\t\t<span fxFlex=\"0 0 45%\" fxLayout=\"column\">\n\t\t\t\t\t<deja-grid #gg fxFlex=\"0 0 600px\" columnsSortable multiSelect columnsSizable sortable [rows]=\"groupedByGenderPeople$\" [columns]=\"peopleColumns\" nodataholder=\"No datas\" placeholder=\"Filter by name\" searchField=\"name\" valueField=\"guid\">\n\t\t\t\t\t\t<ng-template #rowTemplate let-row>\n\t\t\t\t\t\t\t<deja-grid-row [row]=\"row\" [columnLayout]=\"gg.columnLayout\" [style.width.px]=\"gg.rowsWidth\" [deja-draggable]=\"getDragContext(row)\"></deja-grid-row>\n\t\t\t\t\t\t</ng-template>\n\t\t\t\t\t</deja-grid>\n\t\t\t\t</span>\n\t\t\t\t<span fxFlex=\"0 0 45%\" fxFlexOffset=\"5%\" id=\"dropArea\">\n\t\t\t\t\t<div>You can drag and drop items the the area bellow (That will display a JSON representation of the dropped model) :</div>\n\t\t\t\t\t<div #dropArea [deja-droppable]=\"getDropContext(dropArea)\" style=\"border:1px solid red;min-height:150px;\">\n\t\t\t\t\t\t<pre>{{draggedPerson | json}}</pre>\n\t\t\t\t\t</div>\n\t\t\t\t</span>\n\t\t\t</div>\n\t\t</mat-card-content>\n\t\t<mat-toolbar color=\"primary\">Variable Rows Height and Deep Model</mat-toolbar>\n\t\t<mat-card-content fxLayout=\"column\" class=\"listContainer\">\n\t\t\t<deja-grid id=\"variable\" #variable maxHeight=\"auto\" searchArea columnsSortable multiSelect columnsSizable sortable [rows]=\"variableHeightPeopleRows$\" [columns]=\"variableHeightPeopleColumns\" viewportMode=\"auto\" viewPortRowHeight=\"25\" nodataholder=\"No datas\" searchField=\"p1.p2.person.name\" valueField=\"p1.p2.person.guid\" (columnSizeChanged)=\"onColumnSizeChanged($event, variable)\"></deja-grid>\n\t\t</mat-card-content>\n\t</mat-card>\n</div>\n\n<div *ngIf=\"tabIndex === 3\">\n\t<mat-card class=\"deja-grid-demo demo-card demo-basic\">\n\t\t<mat-toolbar color=\"primary\">Sizeable Columns</mat-toolbar>\n\t\t<mat-card-content class=\"listContainer\">\n\t\t\t<div>The horizontal scrollbar will be adjusted to match the total with of the columns</div>\n\t\t\t<deja-splitter direction=\"horizontal\">\n\t\t\t\t<split-area [size]=\"60\">\n\t\t\t\t\t<deja-grid columnsSizable [rows]=\"people$\" [columns]=\"peopleColumns\" nodataholder=\"No datas\" valueField=\"guid\"> </deja-grid>\n\t\t\t\t</split-area>\n\t\t\t\t<split-area [size]=\"40\">\n\t\t\t\t</split-area>\n\t\t\t</deja-splitter>\n\t\t</mat-card-content>\n\t\t<mat-toolbar color=\"primary\">Percent Columns</mat-toolbar>\n\t\t<mat-card-content fxLayout=\"column\" class=\"listContainer\">\n\t\t\t<div>The columns having a width defined as a percentage will resize to fill the remaining space. If their size reaches their minimum width a horizontal scrollbar will appear.</div>\n\t\t\t<deja-splitter direction=\"horizontal\" (dragProgress)=\"grdclm2.calcColumnsLayout()\">\n\t\t\t\t<split-area [size]=\"60\">\n\t\t\t\t\t<deja-grid #grdclm2 columnsSizable [rows]=\"people$\" [columns]=\"percentPeopleColumns\" nodataholder=\"No datas\" valueField=\"guid\"> </deja-grid>\n\t\t\t\t</split-area>\n\t\t\t\t<split-area [size]=\"40\">\n\t\t\t\t</split-area>\n\t\t\t</deja-splitter>\n\t\t</mat-card-content>\n\t\t<mat-toolbar color=\"primary\">Responsives Columns</mat-toolbar>\n\t\t<mat-card-content fxLayout=\"column\" class=\"listContainer\">\n\t\t\t<div>The columns having a width defined as a percentage will resize to fill the remaining space. If their size reaches their minimum width, then the columns having a responsive property will be hidden, starting with the lowest responsive value.</div>\n\t\t\t<deja-splitter direction=\"horizontal\" (dragProgress)=\"grdclm3.calcColumnsLayout()\">\n\t\t\t\t<split-area [size]=\"60\">\n\t\t\t\t\t<deja-grid #grdclm3 columnsSizable [rows]=\"people$\" [columns]=\"responsivePeopleColumns\" nodataholder=\"No datas\" valueField=\"guid\"> </deja-grid>\n\t\t\t\t</split-area>\n\t\t\t\t<split-area [size]=\"40\">\n\t\t\t\t</split-area>\n\t\t\t</deja-splitter>\n\t\t</mat-card-content>\n\t\t<mat-toolbar color=\"primary\">Columns not Specified</mat-toolbar>\n\t\t<mat-card-content fxLayout=\"column\" class=\"listContainer\">\n\t\t\t<div>The columns are not specified. The grid will create columns based on the line model given. At that moment, the dynamic column model will be displayed in the browser console so that it can be copied and included in the code.</div>\n\t\t\t<deja-grid columnsSizable maxHeight=\"auto\" [rows]=\"people$\" nodataholder=\"No datas\" valueField=\"guid\"> </deja-grid>\n\t\t</mat-card-content>\n\t</mat-card>\n</div>\n\n<div *ngIf=\"tabIndex === 4\">\n\t<mat-card class=\"deja-grid-demo demo-card demo-basic\">\n\t\t<mat-toolbar color=\"primary\">Templating Examples</mat-toolbar>\n\t\t<mat-card-content class=\"listContainer\">\n\t\t\t<h1>Cells Template</h1>\n\t\t\t<deja-grid id=\"news\" #news sortable columnsSizable multiSelect maxHeight=\"auto\" [rows]=\"news$ | async\" [columns]=\"newsColumns\" viewportMode=\"auto\" nodataholder=\"Pas de données\" (columnSizeChanged)=\"onColumnSizeChanged($event, news)\">\n\t\t\t\t<ng-template #cellTemplate let-row let-column=\"column\">\n\t\t\t\t\t<img *ngIf=\"column.name==='urlToImage'\" [attr.src]=\"row[column.name]\" class=\"logo\" (load)=\"imageLoaded(row, news)\">\n\t\t\t\t</ng-template>\n\t\t\t</deja-grid>\n\t\t\t<div fxLayout=\"row\">\n\t\t\t\t<span fxFlex=\"0 0 45%\" fxLayout=\"column\">\n\t\t\t\t\t<h1>Parent Row Templating</h1>\n\t\t\t\t\t<deja-grid searchArea columnsSortable columnsSizable sortable maxHeight=\"auto\" [rows]=\"groupedByEyesColorPeople$\" [columns]=\"peopleColumns\" nodataholder=\"No datas\" placeholder=\"Filter by name\" searchField=\"name\" valueField=\"guid\">\n\t\t\t\t\t\t<ng-template #parentRowTemplate let-row>\n\t\t\t\t\t\t\t<mat-icon id=\"placeholder-icon\">visibility</mat-icon>&nbsp;\n\t\t\t\t\t\t\t<span>{{ getParentRowDecr(row) }}</span>\n\t\t\t\t\t\t</ng-template>\n\t\t\t\t\t</deja-grid>\n\t\t\t\t</span>\n\t\t\t\t<span fxFlex=\"0 0 45%\" fxFlexOffset=\"5%\" fxLayout=\"column\">\n\t\t\t\t\t<h1>Search Prefix and Suffix Templates</h1>\n\t\t\t\t\t<deja-grid searchArea columnsSortable columnsSizable sortable maxHeight=\"auto\" [rows]=\"people$\" [columns]=\"peopleColumns\" nodataholder=\"No datas\" placeholder=\"Filter by name\" searchField=\"name\" valueField=\"guid\">\n\t\t\t\t\t\t<ng-template #searchPrefixTemplate>\n\t\t\t\t\t\t\t<mat-icon (click)=\"onFilterTemplateClicked('Prefix')\">public</mat-icon>\n\t\t\t\t\t\t</ng-template>\n\t\t\t\t\t\t<ng-template #searchSuffixTemplate>\n\t\t\t\t\t\t\t<mat-icon (click)=\"onFilterTemplateClicked('Suffix')\">more_vert</mat-icon>\n\t\t\t\t\t\t</ng-template>\n\t\t\t\t\t</deja-grid>\n\t\t\t\t</span>\n\t\t\t</div>\n\t\t</mat-card-content>\n\t</mat-card>\n</div>\n\n<div *ngIf=\"tabIndex === 5\">\n\t<mat-card class=\"deja-grid-demo demo-card demo-basic\">\n\t\t<mat-toolbar color=\"primary\">Pre-Selections from html inputs</mat-toolbar>\n\t\t<mat-card-content class=\"listContainer\">\n\t\t\t<span fxLayout=\"row\">\n\t\t\t\t<div fxFlex=\"0 0 45%\">Preselection with the inputs</div>\n\t\t\t\t<div fxFlex=\"0 0 45%\" fxFlexOffset=\"5%\">Preselections with the input selectedModels</div>\n\t\t\t</span>\n\t\t\t<span fxLayout=\"row\">\n\t\t\t\t<deja-grid fxFlex=\"0 0 45%\" selectedItem=\"mango\" maxHeight=\"auto\" [rows]=\"fructs\" [columns]=\"fructsColumns\" valueField=\"value\">\n\t\t\t\t\t<ng-template #cellTemplate let-row let-column=\"column\">\n\t\t\t\t\t\t<span *ngIf=\"column.name==='color'\" class=\"color\" [style.background-color]=\"row[column.name]\"></span>\n\t\t\t\t\t</ng-template>\n\t\t\t\t</deja-grid>\n\t\t\t\t<deja-grid fxFlex=\"0 0 45%\" fxFlexOffset=\"5%\" multiSelect=\"true\" selectedItems=\"mango, peach, cranberries\" maxHeight=\"auto\" [rows]=\"fructsForMultiSelection\" [columns]=\"fructsColumns\" valueField=\"value\">\n\t\t\t\t\t<ng-template #cellTemplate let-row let-column=\"column\">\n\t\t\t\t\t\t<span *ngIf=\"column.name==='color'\" class=\"color\" [style.background-color]=\"row[column.name]\"></span>\n\t\t\t\t\t</ng-template>\n\t\t\t\t</deja-grid>\n\t\t\t</span>\n\t\t</mat-card-content>\n\t\t<mat-toolbar color=\"primary\">Pre-Selections from javascript</mat-toolbar>\n\t\t<mat-card-content class=\"listContainer\">\n\t\t\t<div>The collection fructItemsWithPreSelection has a pre-selected item</div>\n\t\t\t<span fxLayout=\"row\">\n\t\t\t\t<deja-grid fxFlex=\"0 0 45%\" maxHeight=\"auto\" [rows]=\"fructsWithPreSelection\" [columns]=\"fructsColumns\">\n\t\t\t\t\t<ng-template #cellTemplate let-row let-column=\"column\">\n\t\t\t\t\t\t<span *ngIf=\"column.name==='color'\" class=\"color\" [style.background-color]=\"row[column.name]\"></span>\n\t\t\t\t\t</ng-template>\n\t\t\t\t</deja-grid>\n\t\t\t</span>\n\t\t</mat-card-content>\n\t</mat-card>\n</div>\n\n<div *ngIf=\"tabIndex === 6\">\n\t<mat-card class=\"deja-grid-demo demo-card demo-basic\">\n\t\t<mat-toolbar color=\"primary\">Pre-events and on-demand</mat-toolbar>\n\t\t<mat-card-content class=\"listContainer\">\n\t\t\t<h1>On Demand Loading </h1>\n\t\t\t<div>The rows are loaded from the loading event</div>\n\t\t\t<deja-grid #ondemand maxHeight=\"auto\" textField=\"name\" valueField=\"guid\" [loadingRows]=\"loadingRows()\" [columns]=\"peopleColumns\"></deja-grid>\n\t\t\t<h1>Confirm Selection</h1>\n\t\t\t<div>A dialog will confirm the selection of an row</div>\n\t\t\t<deja-grid multiSelect maxHeight=\"auto\" textField=\"name\" valueField=\"guid\" [selectingRow]=\"confirmDialog()\" [rows]=\"people$\" [columns]=\"peopleColumns\"> </deja-grid>\n\t\t\t<h1>Confirm Expand and Collapse </h1>\n\t\t\t<div>A dialog will confirm the expand and collapse or an row if the children are not loaded. The children will be loaded asynchronously after the row expansion.</div>\n\t\t\t<deja-grid #onexpand maxHeight=\"auto\" textField=\"name\" valueField=\"guid\" childrenField=\"rows\" [rows]=\"onDemandGroupedPeople\" [expandingRow]=\"expandingRows()\" [collapsingRow]=\"collapsingRows()\" [columns]=\"peopleColumns\">\n\t\t\t\t<ng-template #rowTemplate let-item let-query=\"query\" let-flatindex=\"flatindex\">\n\t\t\t\t\t<deja-grid-row *ngIf=\"!item.displayName\" [row]=\"item.model\" [flatIndex]=\"flatindex\" [columnLayout]=\"onexpand.columnLayout\" [style.width.px]=\"rowsWidth\"></deja-grid-row>\n\t\t\t\t\t<span class=\"loading\" *ngIf=\"item.displayName\" [style.width.px]=\"rowsWidth\">{{item.displayName}}</span>\n\t\t\t\t</ng-template>\n\t\t\t\t<ng-template #parentRowTemplate let-item let-query=\"query\" let-flatindex=\"flatindex\">\n\t\t\t\t\t<span class=\"color\" [style.background-color]=\"item.color\"></span> {{item.color}}\n\t\t\t\t</ng-template>\n\t\t\t</deja-grid>\n\t\t</mat-card-content>\n\t</mat-card>\n</div>\n\n<div *ngIf=\"tabIndex === 7\">\n\t<mat-card class=\"deja-grid-demo demo-card demo-basic\">\n\t\t<mat-toolbar color=\"primary\">Performance Examples</mat-toolbar>\n\t\t<mat-card-content class=\"listContainer\">\n\t\t\t<h1>10K rows with Item Template </h1>\n\t\t\t<div>An exemple with 100000 fixed size rows</div>\n\t\t\t<span fxLayout=\"columns\">\n\t\t\t\t<deja-grid id=\"news\" #bigNews sortable columnsSizable multiSelect [rows]=\"bigNews$\" [columns]=\"newsColumns\" viewportMode=\"auto\" nodataholder=\"Pas de données\" (columnSizeChanged)=\"onColumnSizeChanged($event, bigNews)\">\n\t\t\t\t\t<ng-template #cellTemplate let-row let-column=\"column\">\n\t\t\t\t\t\t<img *ngIf=\"column.name==='urlToImage'\" [attr.src]=\"row[column.name]\" class=\"logo\" (load)=\"imageLoaded(row, bigNews)\">\n\t\t\t\t\t</ng-template>\n\t\t\t\t</deja-grid>\n\t\t\t</span>\n\n\t\t\t<h1>Fixed size rows 100K items</h1>\n\t\t\t<div>An exemple with 100000 fixed size rows</div>\n\t\t\t<span fxLayout=\"row\">\n\t\t\t\t<deja-grid #bigPeople fxFlex=\"0 0 65%\" columnsSortable multiSelect columnsSizable sortable maxHeight=\"auto\" [rows]=\"bigPeople$\" [columns]=\"peopleColumnsEx\" nodataholder=\"No datas\" placeholder=\"Filter by name\" searchField=\"name\" valueField=\"guid\">\n\t\t\t\t\t<ng-template #cellTemplate let-row let-column=\"column\">\n\t\t\t\t\t\t<span *ngIf=\"column.name==='color'\" class=\"color\" [style.background-color]=\"row[column.name]\"></span>\n\t\t\t\t\t</ng-template>\n\t\t\t\t</deja-grid>\n\t\t\t\t<span fxFlex=\"0 0 30%\" fxFlexOffset=\"5%\" fxFlexOffset=\"5%\">\n\t\t\t\t\t<h4 id=\"vptitle\">Viewport Infos:</h4>\n\t\t\t\t\t<div *ngFor=\"let info of viewPortInfos\">\n\t\t\t\t\t\t<span class=\"vpinfoname\">{{info.name}}</span>\n\t\t\t\t\t\t<span>{{info.value}}</span>\n\t\t\t\t\t</div>\n\t\t\t\t</span>\n\t\t\t</span>\n\t\t</mat-card-content>\n\t</mat-card>\n</div>"

/***/ }),

/***/ "./src/app/grid/grid-demo.module.ts":
/*!******************************************!*\
  !*** ./src/app/grid/grid-demo.module.ts ***!
  \******************************************/
/*! exports provided: DejaGridDemoModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DejaGridDemoModule", function() { return DejaGridDemoModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/card */ "./node_modules/@angular/material/esm5/card.es5.js");
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/toolbar */ "./node_modules/@angular/material/esm5/toolbar.es5.js");
/* harmony import */ var _deja_js_component_dialog__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @deja-js/component/dialog */ "./dist/deja-js/component/fesm5/deja-js-component-dialog.js");
/* harmony import */ var _deja_js_component_dragdrop__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @deja-js/component/dragdrop */ "./dist/deja-js/component/fesm5/deja-js-component-dragdrop.js");
/* harmony import */ var _deja_js_component_data_grid__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @deja-js/component/data-grid */ "./dist/deja-js/component/fesm5/deja-js-component-data-grid.js");
/* harmony import */ var _deja_js_component_message_box__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @deja-js/component/message-box */ "./dist/deja-js/component/fesm5/deja-js-component-message-box.js");
/* harmony import */ var _deja_js_component_splitter__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @deja-js/component/splitter */ "./dist/deja-js/component/fesm5/deja-js-component-splitter.js");
/* harmony import */ var _deja_js_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @deja-js/core */ "./dist/deja-js/core/fesm5/deja-js-core.js");
/* harmony import */ var _component_markdown_index__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../component/markdown/index */ "./src/component/markdown/index.ts");
/* harmony import */ var _grid_demo__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./grid-demo */ "./src/app/grid/grid-demo.ts");
/* harmony import */ var _grid_demo_routes__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./grid-demo.routes */ "./src/app/grid/grid-demo.routes.ts");
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/flex-layout */ "./node_modules/@angular/flex-layout/esm5/flex-layout.es5.js");
/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

















var DejaGridDemoModule = /** @class */ (function () {
    function DejaGridDemoModule() {
    }
    DejaGridDemoModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [_grid_demo__WEBPACK_IMPORTED_MODULE_14__["DejaGridDemoComponent"]],
            exports: [_grid_demo__WEBPACK_IMPORTED_MODULE_14__["DejaGridDemoComponent"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _angular_flex_layout__WEBPACK_IMPORTED_MODULE_16__["FlexLayoutModule"],
                _angular_material_card__WEBPACK_IMPORTED_MODULE_5__["MatCardModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatIconModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatTabsModule"],
                _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_6__["MatToolbarModule"],
                _deja_js_component_dialog__WEBPACK_IMPORTED_MODULE_7__["DejaDialogModule"],
                _deja_js_component_dragdrop__WEBPACK_IMPORTED_MODULE_8__["DejaDragDropModule"],
                _deja_js_component_data_grid__WEBPACK_IMPORTED_MODULE_9__["DejaGridModule"],
                _component_markdown_index__WEBPACK_IMPORTED_MODULE_13__["DejaMarkdownModule"],
                _deja_js_component_message_box__WEBPACK_IMPORTED_MODULE_10__["DejaMessageBoxModule"],
                _deja_js_component_splitter__WEBPACK_IMPORTED_MODULE_11__["DejaSplitterModule"],
                _grid_demo_routes__WEBPACK_IMPORTED_MODULE_15__["routing"],
            ],
            providers: [
                _deja_js_core__WEBPACK_IMPORTED_MODULE_12__["GroupingService"]
            ],
        })
    ], DejaGridDemoModule);
    return DejaGridDemoModule;
}());



/***/ }),

/***/ "./src/app/grid/grid-demo.routes.ts":
/*!******************************************!*\
  !*** ./src/app/grid/grid-demo.routes.ts ***!
  \******************************************/
/*! exports provided: routing */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "routing", function() { return routing; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _grid_demo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./grid-demo */ "./src/app/grid/grid-demo.ts");
/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */


var routes = [
    { path: '', component: _grid_demo__WEBPACK_IMPORTED_MODULE_1__["DejaGridDemoComponent"] },
    { path: '**', redirectTo: '', pathMatch: 'full' },
];
var routing = _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forChild(routes);


/***/ }),

/***/ "./src/app/grid/grid-demo.scss":
/*!*************************************!*\
  !*** ./src/app/grid/grid-demo.scss ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "grid-demo .demo-card deja-grid {\n  min-height: 8rem;\n  max-height: 600px;\n  width: 97%; }\n  grid-demo .demo-card deja-grid .listitem .color {\n    border-radius: 50%;\n    width: 1.5rem;\n    height: 1.5rem;\n    margin: 0.35rem; }\n  grid-demo .demo-card deja-grid .listitem .loading {\n    margin: 0.35rem; }\n  grid-demo .demo-card deja-grid [matPrefix] {\n    cursor: default;\n    padding: 0 4px; }\n  grid-demo .demo-card deja-grid [matSuffix] {\n    padding: 0 4px;\n    display: flex;\n    justify-content: flex-end;\n    cursor: pointer; }\n  grid-demo .demo-card .listContainer {\n  display: flex;\n  flex-direction: column;\n  overflow: hidden; }\n  grid-demo .demo-card .listContainer deja-grid {\n    flex: 1 1 auto;\n    margin: 1rem 0; }\n  grid-demo .demo-card .listContainer deja-grid .listitem.odd deja-grid-row {\n      background-color: rgba(0, 0, 0, 0.07); }\n  grid-demo .demo-card #news .cell-wrapper[colname=\"urlToImage\"] .logo,\ngrid-demo .demo-card #variable .cell-wrapper[colname=\"urlToImage\"] .logo {\n  max-width: 100%;\n  max-height: 100%;\n  width: auto;\n  height: auto;\n  -o-object-fit: contain;\n     object-fit: contain; }\n  grid-demo .demo-card #news .cell-wrapper[colname=\"description\"] .cell, grid-demo .demo-card #news .cell-wrapper[colname=\"address\"] .cell, grid-demo .demo-card #news .cell-wrapper[colname=\"about\"] .cell, grid-demo .demo-card #news .cell-wrapper[colname=\"p1.p2.person.address\"] .cell, grid-demo .demo-card #news .cell-wrapper[colname=\"p1.p2.person.about\"] .cell,\ngrid-demo .demo-card #variable .cell-wrapper[colname=\"description\"] .cell,\ngrid-demo .demo-card #variable .cell-wrapper[colname=\"address\"] .cell,\ngrid-demo .demo-card #variable .cell-wrapper[colname=\"about\"] .cell,\ngrid-demo .demo-card #variable .cell-wrapper[colname=\"p1.p2.person.address\"] .cell,\ngrid-demo .demo-card #variable .cell-wrapper[colname=\"p1.p2.person.about\"] .cell {\n  white-space: normal; }\n  grid-demo .demo-card #dropArea {\n  overflow: hidden; }\n  grid-demo .demo-card deja-splitter split-area deja-grid {\n  padding: 0 1rem;\n  height: 400px; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3RyYXZpcy9idWlsZC9EU0ktSFVHL2RlamFqcy1jb21wb25lbnRzL3NyYy9hcHAvZ3JpZC9ncmlkLWRlbW8uc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUdHLGdCQUFnQjtFQUNoQixpQkFBaUI7RUFDakIsVUFBVSxFQUFBO0VBTGI7SUFRSyxrQkFBa0I7SUFDbEIsYUFBYTtJQUNiLGNBQWM7SUFDZCxlQUFlLEVBQUE7RUFYcEI7SUFjSyxlQUFlLEVBQUE7RUFkcEI7SUFrQkksZUFBZTtJQUNmLGNBQWMsRUFBQTtFQW5CbEI7SUFzQkksY0FBYztJQUNkLGFBQWE7SUFDYix5QkFBeUI7SUFDekIsZUFBZSxFQUFBO0VBekJuQjtFQTZCRyxhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLGdCQUFnQixFQUFBO0VBL0JuQjtJQWlDSSxjQUFjO0lBQ2QsY0FBYyxFQUFBO0VBbENsQjtNQXNDTyxxQ0FBMkIsRUFBQTtFQXRDbEM7O0VBaURNLGVBQWU7RUFDZixnQkFBZ0I7RUFDaEIsV0FBVztFQUNYLFlBQVk7RUFDWixzQkFBbUI7S0FBbkIsbUJBQW1CLEVBQUE7RUFyRHpCOzs7Ozs7RUE4RE0sbUJBQW1CLEVBQUE7RUE5RHpCO0VBb0VHLGdCQUFnQixFQUFBO0VBcEVuQjtFQXlFSyxlQUFlO0VBQ2YsYUFBYSxFQUFBIiwiZmlsZSI6InNyYy9hcHAvZ3JpZC9ncmlkLWRlbW8uc2NzcyIsInNvdXJjZXNDb250ZW50IjpbImdyaWQtZGVtbyB7XG5cdC5kZW1vLWNhcmQge1xuXHRcdGRlamEtZ3JpZCB7XG5cdFx0XHRtaW4taGVpZ2h0OiA4cmVtO1xuXHRcdFx0bWF4LWhlaWdodDogNjAwcHg7XG5cdFx0XHR3aWR0aDogOTclO1xuXHRcdFx0Lmxpc3RpdGVtIHtcblx0XHRcdFx0LmNvbG9yIHtcblx0XHRcdFx0XHRib3JkZXItcmFkaXVzOiA1MCU7XG5cdFx0XHRcdFx0d2lkdGg6IDEuNXJlbTtcblx0XHRcdFx0XHRoZWlnaHQ6IDEuNXJlbTtcblx0XHRcdFx0XHRtYXJnaW46IDAuMzVyZW07XG5cdFx0XHRcdH1cblx0XHRcdFx0LmxvYWRpbmcge1xuXHRcdFx0XHRcdG1hcmdpbjogMC4zNXJlbTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0W21hdFByZWZpeF0ge1xuXHRcdFx0XHRjdXJzb3I6IGRlZmF1bHQ7XG5cdFx0XHRcdHBhZGRpbmc6IDAgNHB4O1xuXHRcdFx0fVxuXHRcdFx0W21hdFN1ZmZpeF0ge1xuXHRcdFx0XHRwYWRkaW5nOiAwIDRweDtcblx0XHRcdFx0ZGlzcGxheTogZmxleDtcblx0XHRcdFx0anVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcblx0XHRcdFx0Y3Vyc29yOiBwb2ludGVyO1xuXHRcdFx0fVxuXHRcdH1cblx0XHQubGlzdENvbnRhaW5lciB7XG5cdFx0XHRkaXNwbGF5OiBmbGV4O1xuXHRcdFx0ZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcblx0XHRcdG92ZXJmbG93OiBoaWRkZW47XG5cdFx0XHRkZWphLWdyaWQge1xuXHRcdFx0XHRmbGV4OiAxIDEgYXV0bztcblx0XHRcdFx0bWFyZ2luOiAxcmVtIDA7XG5cdFx0XHRcdC5saXN0aXRlbSB7XG5cdFx0XHRcdFx0Ji5vZGQge1xuXHRcdFx0XHRcdFx0ZGVqYS1ncmlkLXJvdyB7XG5cdFx0XHRcdFx0XHRcdGJhY2tncm91bmQtY29sb3I6IHJnYmEoIzAwMCwgMC4wNyk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdCNuZXdzLFxuXHRcdCN2YXJpYWJsZSB7XG5cdFx0XHQuY2VsbC13cmFwcGVyIHtcblx0XHRcdFx0Jltjb2xuYW1lPVwidXJsVG9JbWFnZVwiXSB7XG5cdFx0XHRcdFx0LmxvZ28ge1xuXHRcdFx0XHRcdFx0bWF4LXdpZHRoOiAxMDAlO1xuXHRcdFx0XHRcdFx0bWF4LWhlaWdodDogMTAwJTtcblx0XHRcdFx0XHRcdHdpZHRoOiBhdXRvO1xuXHRcdFx0XHRcdFx0aGVpZ2h0OiBhdXRvO1xuXHRcdFx0XHRcdFx0b2JqZWN0LWZpdDogY29udGFpbjtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0Jltjb2xuYW1lPVwiZGVzY3JpcHRpb25cIl0sXG5cdFx0XHRcdCZbY29sbmFtZT1cImFkZHJlc3NcIl0sXG5cdFx0XHRcdCZbY29sbmFtZT1cImFib3V0XCJdLFxuXHRcdFx0XHQmW2NvbG5hbWU9XCJwMS5wMi5wZXJzb24uYWRkcmVzc1wiXSxcblx0XHRcdFx0Jltjb2xuYW1lPVwicDEucDIucGVyc29uLmFib3V0XCJdIHtcblx0XHRcdFx0XHQuY2VsbCB7XG5cdFx0XHRcdFx0XHR3aGl0ZS1zcGFjZTogbm9ybWFsO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHQjZHJvcEFyZWEge1xuXHRcdFx0b3ZlcmZsb3c6IGhpZGRlbjtcblx0XHR9XG5cdFx0ZGVqYS1zcGxpdHRlciB7XG5cdFx0XHRzcGxpdC1hcmVhIHtcblx0XHRcdFx0ZGVqYS1ncmlkIHtcblx0XHRcdFx0XHRwYWRkaW5nOiAwIDFyZW07XG5cdFx0XHRcdFx0aGVpZ2h0OiA0MDBweDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxufSJdfQ== */"

/***/ }),

/***/ "./src/app/grid/grid-demo.ts":
/*!***********************************!*\
  !*** ./src/app/grid/grid-demo.ts ***!
  \***********************************/
/*! exports provided: DejaGridDemoComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DejaGridDemoComponent", function() { return DejaGridDemoComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _deja_js_component_data_grid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @deja-js/component/data-grid */ "./dist/deja-js/component/fesm5/deja-js-component-data-grid.js");
/* harmony import */ var _deja_js_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @deja-js/core */ "./dist/deja-js/core/fesm5/deja-js-core.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _services_news_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../services/news.service */ "./src/app/services/news.service.ts");
/* harmony import */ var _services_people_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../services/people.service */ "./src/app/services/people.service.ts");
/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */









var DejaGridDemoComponent = /** @class */ (function () {
    function DejaGridDemoComponent(changeDetectorRef, peopleService, newsService, groupingService) {
        var _this = this;
        this.changeDetectorRef = changeDetectorRef;
        this.peopleService = peopleService;
        this.tabIndex = 1;
        this.dialogResponse$ = new rxjs__WEBPACK_IMPORTED_MODULE_5__["Subject"]();
        this.columnGroups = [];
        this.peopleRows = [];
        this._dialogVisible = false;
        this.fructs = [
            {
                name: 'Peach',
                value: 'peach',
                color: '#FF6F00',
                Potassium: '285 mg',
                Phosphorus: '30 mg',
                Magnesium: '14 mg',
                Calcium: '9 mg',
                Iron: '0.38 mg',
                Selenium: '0.1 mcg',
                Manganese: '0.091 mg',
                Copper: '0.102 mg',
                Zinc: '0.26 mg',
                VitaminA: '489 IU',
                VitaminB1: '0.036 mg',
                VitaminB2: '0.047 mg',
                Niacin: '1.209 mg',
                Folate: '6 mcg',
                PantothenicAcid: '0.229 mg',
                VitaminB6: '0.037 mg',
                VitaminC: '9.9 mg',
                VitaminE: '1.09 mg',
                VitaminK: '3.9 mcg',
            },
            {
                name: 'Banana',
                value: 'banana',
                color: '#FFEB3B',
                Potassium: '422 mg',
                Phosphorus: '26 mg',
                Magnesium: '32 mg',
                Calcium: '6 mg',
                Sodium: '1 mg',
                Iron: '0.31 mg',
                Selenium: '1.2 mcg',
                Manganese: '0.319 mg',
                Copper: '0.092 mg',
                Zinc: '0.18 mg',
                VitaminA: '76 IU',
                VitaminB1: '0.037 mg',
                VitaminB2: '0.086 mg',
                Niacin: '0.785 mg',
                Folate: '24 mcg',
                PantothenicAcid: '0.394 mg',
                VitaminB6: '0.433 mg',
                VitaminC: '10.3 mg',
                VitaminE: '0.12 mg',
                VitaminK: '0.6 mcg',
            },
            {
                name: 'Cantaloupe',
                value: 'cantaloupe',
                color: '#AED581',
                Potassium: '184 mg',
                Phosphorus: '10 mg',
                Magnesium: '8 mg',
                Calcium: '6 mg',
                Sodium: '11 mg',
                Iron: '0.14 mg',
                Selenium: '0.3 mcg',
                Manganese: '0.028 mg',
                Copper: '0.028 mg',
                Zinc: '0.12 mg',
                VitaminA: '2334 IU',
                VitaminB1: '0.028 mg',
                VitaminB2: '0.013 mg',
                Niacin: '0.506 mg',
                Folate: '14 mcg',
                PantothenicAcid: '0.072 mg',
                VitaminB6: '0.05 mg',
                VitaminC: '25.3 mg',
                VitaminE: '0.03 mg',
                VitaminK: '1.7 mcg    ',
            },
            {
                name: 'Cherries',
                value: 'cherries',
                color: '#880E4F',
                Potassium: '306 mg',
                Phosphorus: '29 mg',
                Magnesium: '15 mg',
                Calcium: '18 mg',
                Iron: '0.5 mg',
                Zinc: '0.1 mg',
                Manganese: '0.097 mg',
                Copper: '0.083 mg    ',
                VitaminA: '88 IU',
                VitaminB1: '0.037 mg',
                VitaminB2: '0.046 mg',
                Niacin: '0.213 mg',
                Folate: '6 mcg',
                PantothenicAcid: '0.275 mg',
                VitaminB6: '0.068 mg',
                VitaminC: '9.7 mg',
                VitaminE: '0.1 mg',
                VitaminK: '2.9 mcg',
            },
            {
                name: 'Chinese Pears',
                value: 'chinesepears',
                color: '#F5F5F5',
                Potassium: '333 mg',
                Phosphorus: '30 mg',
                Magnesium: '22 mg',
                Calcium: '11 mg',
                Selenium: '0.3 mcg',
                Manganese: '0.165 mg',
                Copper: '0.138 mg',
                Zinc: '0.06 mg',
                VitaminA: '0 mg',
                VitaminB1: '0.025 mg',
                VitaminB2: '0.028 mg',
                Niacin: '0.602 mg',
                Folate: '22 mcg',
                PantothenicAcid: '0.193 mg',
                VitaminB6: '0.06 mg',
                VitaminC: '10.4 mg',
                VitaminE: '0.33 mg',
                VitaminK: '12.4 mcg',
            },
            {
                name: 'Cranberries',
                value: 'cranberries',
                color: '#C2185B',
                Potassium: '85 mg',
                Phosphorus: '13 mg',
                Magnesium: '6 mg',
                Calcium: '8 mg',
                Sodium: '2 mg',
                Iron: '0.25 mg',
                Selenium: '0.1 mcg',
                Manganese: '0.36 mg',
                Copper: '0.061 mg',
                Zinc: '0.1 mg',
                VitaminA: '60 IU',
                VitaminB1: '0.012 mg',
                VitaminB2: '0.02 mg',
                Niacin: '0.101 mg',
                Folate: '1 mcg',
                PantothenicAcid: '0.295 mg',
                VitaminB6: '0.057 mg',
                VitaminC: '13.3 mg',
                VitaminE: '1.2 mg',
                VitaminK: '5.1 mcg',
            },
            {
                name: 'Guava',
                value: 'guava',
                color: '#FFCA28',
                Potassium: '688 mg',
                Phosphorus: '66 mg',
                Magnesium: '36 mg',
                Calcium: '30 mg',
                Sodium: '3 mg',
                Iron: '0.43 mg',
                Selenium: '1 mcg',
                Manganese: '0.247 mg',
                Copper: '0.38 mg',
                Zinc: '0.38 mg',
                VitaminA: '1030 IU',
                VitaminB1: '0.111 mg',
                VitaminB2: '0.066 mg',
                Niacin: '1.789 mg',
                Folate: '81 mcg',
                PantothenicAcid: '0.744 mg',
                VitaminB6: '0.181 mg',
                VitaminC: '376.7 mg',
                VitaminE: '1.2 mg',
                VitaminK: '4.3 mcg',
            },
            {
                name: 'Grapes',
                value: 'grapes',
                color: '#303F9F',
                Potassium: '288 mg',
                Phosphorus: '30 mg',
                Magnesium: '11 mg',
                Calcium: '15 mg',
                Sodium: '3 mg',
                Iron: '0.54 mg',
                Selenium: '0.2 mcg',
                Manganese: '0.107 mg',
                Copper: '0.192 mg',
                Zinc: '0.11 mg',
                VitaminA: '100 IU',
                VitaminB1: '0.104 mg',
                VitaminB2: '0.106 mg',
                Niacin: '0.284 mg',
                Folate: '3 mcg',
                PantothenicAcid: '0.076 mg',
                VitaminB6: '0.13 mg',
                VitaminC: '16.3 mg',
                VitaminE: '0.29 mg',
                VitaminK: '22 mcg',
            },
            {
                name: 'Lemon',
                value: 'lemon',
                color: '#FFF176',
                Potassium: '116 mg',
                Phosphorus: '13 mg',
                Magnesium: '7 mg',
                Calcium: '22 mg',
                Sodium: '2 mg',
                Iron: '0.5 mg',
                Selenium: '0.3 mcg',
                Manganese: '0.025 mg',
                Copper: '0.031 mg',
                Zinc: '0.05 mg',
                VitaminA: '18 IU',
                VitaminB1: '0.034 mg',
                VitaminB2: '0.017 mg',
                Niacin: '0.084 mg',
                Folate: '9 mcg',
                PantothenicAcid: '0.16 mg',
                VitaminB6: '0.067 mg',
                VitaminC: '44.5 mg',
                VitaminE: '0.13 mg',
            },
            {
                name: 'Mango',
                value: 'mango',
                color: '#FBC02D',
                Potassium: '323 mg',
                Phosphorus: '23 mg',
                Magnesium: '19 mg',
                Calcium: '21 mg',
                Sodium: '4 mg',
                Iron: '0.27 mg',
                Selenium: '1.2 mcg',
                Manganese: '0.056 mg',
                Copper: '0.228 mg',
                Zinc: '0.08 mg',
                VitaminA: '1584 IU',
                VitaminB1: '0.12 mg',
                VitaminB2: '0.118 mg',
                Niacin: '1.209 mg',
                Folate: '29 mcg',
                PantothenicAcid: '0.331 mg',
                VitaminB6: '0.227 mg',
                VitaminC: '57.3 mg',
                VitaminE: '2.32 mg',
                VitaminK: '8.7 mcg',
            },
            {
                name: 'Pineapple',
                value: 'pineapple',
                color: '#FDD835',
                Potassium: '180 mg',
                Phosphorus: '13 mg',
                Magnesium: '20 mg',
                Calcium: '21 mg',
                Sodium: '2 mg',
                Iron: '0.48 mg',
                Selenium: '0.2 mcg',
                Manganese: '1.53 mg',
                Copper: '0.181 mg',
                Zinc: '0.2 mg',
                VitaminA: '96 IU',
                VitaminB1: '0.13 mg',
                VitaminB2: '0.053 mg',
                Niacin: '0.825 mg',
                Folate: '30 mcg',
                PantothenicAcid: '0.351 mg',
                VitaminB6: '0.185 mg',
                VitaminC: '78.9 mg',
                VitaminE: '0.03 mg',
                VitaminK: '1.2 mcg',
            },
            {
                name: 'Watermelon',
                value: 'watermelon',
                color: '#E91E63',
                Potassium: '320 mg',
                Phosphorus: '31 mg',
                Magnesium: '29 mg',
                Calcium: '20 mg',
                Sodium: '3 mg',
                Iron: '0.69 mg',
                Selenium: '1.1 mcg',
                Manganese: '0.109 mg',
                Copper: '0.12 mg',
                Zinc: '0.29 mg',
                VitaminA: '1627 IU',
                VitaminB1: '0.094 mg',
                VitaminB2: '0.06 mg',
                Niacin: '0.509 mg',
                Folate: '9 mcg',
                PantothenicAcid: '0.632 mg',
                VitaminB6: '0.129 mg',
                VitaminC: '23.2 mg',
                VitaminE: '0.14 mg',
                VitaminK: '0.3 mcg',
            },
        ];
        this.fructsColumns = [
            {
                label: 'Color',
                name: 'color',
                width: '64px',
                useCellTemplate: true,
            },
            {
                label: 'Name',
                name: 'name',
                width: '130px',
            },
            {
                label: 'Vitamin A',
                name: 'VitaminA',
            },
            {
                label: 'Vitamin B1',
                name: 'VitaminB1',
            },
            {
                label: 'Vitamin B2',
                name: 'VitaminB2',
            },
            {
                label: 'Vitamin C',
                name: 'VitaminC',
            },
        ];
        this.peopleColumns = [
            {
                label: 'Name',
                name: 'name',
                width: '130px',
            },
            {
                label: 'Gender',
                name: 'gender',
                width: '70px',
            },
            {
                label: 'Company',
                name: 'company',
                width: '85px',
            },
            {
                label: 'Email',
                name: 'email',
                width: '210px',
            },
            {
                label: 'Phone',
                name: 'phone',
                width: '130px',
            },
            {
                label: 'Eyes Color',
                name: 'eyeColor',
                width: '85px',
            },
            {
                label: 'Address',
                name: 'address',
                width: '360px',
            },
            {
                label: 'About',
                name: 'about',
                width: '1000px',
            },
        ];
        this.newsColumns = [
            {
                label: 'Logo',
                name: 'urlToImage',
                minWidth: 64,
                sizeable: true,
                useCellTemplate: true,
                width: '150px',
            },
            {
                label: 'title',
                name: 'title',
                sizeable: true,
                useCellTemplate: false,
                width: '180px',
            },
            {
                label: 'description',
                name: 'description',
                minWidth: 64,
                sizeable: true,
                width: '450px',
            },
            {
                label: 'url',
                name: 'url',
                width: '200px',
            },
            {
                label: 'category',
                name: 'category',
                width: '100px',
            },
            {
                label: 'language',
                name: 'language',
                width: '64px',
            },
            {
                label: 'country',
                name: 'country',
                width: '64px',
            },
        ];
        this.percentPeopleColumns = [
            {
                label: 'Name',
                name: 'name',
                width: '130px',
                sizeable: false,
            },
            {
                label: 'Gender',
                name: 'gender',
                width: '70px',
                sizeable: true,
            },
            {
                label: 'Company',
                name: 'company',
                width: '4.5%',
            },
            {
                label: 'Email',
                name: 'email',
                width: '6%',
            },
            {
                label: 'Phone',
                name: 'phone',
                width: '7%',
            },
            {
                label: 'Eyes Color',
                name: 'eyeColor',
                width: '4.5%',
            },
            {
                label: 'Address',
                name: 'address',
                width: '19%',
            },
            {
                label: 'About',
                name: 'about',
                width: '54%',
            },
        ];
        this.responsivePeopleColumns = [
            {
                label: 'Name',
                name: 'name',
                width: '130px',
                sizeable: false,
                minWidth: 64,
            },
            {
                label: 'Gender',
                name: 'gender',
                width: '70px',
                sizeable: true,
                responsive: 1,
            },
            {
                label: 'Company',
                name: 'company',
                width: '4.5%',
                minWidth: 64,
                responsive: 3,
            },
            {
                label: 'Email',
                name: 'email',
                width: '6%',
                minWidth: 64,
            },
            {
                label: 'Phone',
                name: 'phone',
                width: '7%',
                minWidth: 64,
            },
            {
                label: 'Eyes Color',
                name: 'eyeColor',
                width: '4.5%',
                minWidth: 64,
                responsive: 3,
            },
            {
                label: 'Address',
                name: 'address',
                width: '19%',
                minWidth: 64,
                responsive: 2,
            },
            {
                label: 'About',
                name: 'about',
                width: '54%',
                minWidth: 64,
                responsive: 4,
            },
        ];
        this.news$ = newsService.getNews$(50);
        this.bigNews$ = newsService.getNews$(10000);
        this.people$ = peopleService.getPeople$();
        this.bigPeople$ = peopleService.getPeople$(undefined, 100000);
        this.peopleForMultiselect$ = peopleService.getPeople$().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["map"])(function (people) { return lodash__WEBPACK_IMPORTED_MODULE_4__["cloneDeep"](people); }));
        this.groupedByGenderPeople$ = peopleService.getPeople$().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["switchMap"])(function (people) { return groupingService.group$(people, {
            groupByField: 'gender',
        }); }));
        this.groupedByEyesColorPeople$ = peopleService.getPeople$().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["switchMap"])(function (people) { return groupingService.group$(people, {
            groupByField: 'eyeColor',
        }); }));
        peopleService.getPeople$().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["tap"])(function (items) { return _this.peopleRows = items; }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["switchMap"])(function (people) { return groupingService.group$(people, {
            groupByField: 'color',
        }); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["first"])())
            .subscribe(function (items) { return _this.groupedByColorPeople = items; });
        this.peopleColumnsEx = [{
                label: 'Color',
                name: 'color',
                width: '64px',
                useCellTemplate: true,
            }].concat(this.peopleColumns);
        this.variableHeightPeopleColumns = this.peopleColumns.map(function (column) { return ({
            label: column.label,
            width: column.width,
            name: "p1.p2.person." + column.name,
            sizeable: column.name === 'address' || column.name === 'about',
        }); });
        var addressCol = this.variableHeightPeopleColumns.find(function (column) { return column.name === 'p1.p2.person.address'; });
        addressCol.sizeable = true;
        addressCol.width = '250px';
        var aboutCol = this.variableHeightPeopleColumns.find(function (column) { return column.name === 'p1.p2.person.about'; });
        aboutCol.sizeable = true;
        aboutCol.width = '400px';
        this.variableHeightPeopleRows$ = peopleService.getPeople$().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["map"])(function (people) { return lodash__WEBPACK_IMPORTED_MODULE_4__["cloneDeep"](people); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["switchMap"])(function (people) { return people; }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["map"])(function (person) { return ({
            p1: {
                p2: {
                    person: person,
                },
            },
        }); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["reduce"])(function (acc, cur) { return acc.concat([cur]); }, []));
        this.peopleService.getPeople$().subscribe(function (value) {
            var onDemandResult = [];
            var map = {};
            value.map(function (person) {
                var groupName = "Group" + person.color;
                if (!map[groupName]) {
                    map[groupName] = [];
                    onDemandResult.push({
                        color: person.color,
                        collapsible: true,
                        collapsed: true,
                        groupName: groupName,
                        rows: [{
                                displayName: 'loading...',
                                selectable: false,
                            }],
                        displayName: groupName,
                        selectable: false,
                        loaded: false,
                    });
                }
                map[groupName].push({
                    model: person,
                });
            });
            _this.onDemandGroupedPeople = onDemandResult;
        });
        this.fructsForMultiSelection = this.fructs
            .map(function (fruct) { return lodash__WEBPACK_IMPORTED_MODULE_4__["cloneDeep"](fruct); });
        this.fructsWithPreSelection = this.fructs
            .map(function (fruct) {
            var f = lodash__WEBPACK_IMPORTED_MODULE_4__["cloneDeep"](fruct);
            f.selected = fruct.value === 'banana';
            return f;
        });
    }
    Object.defineProperty(DejaGridDemoComponent.prototype, "dialogVisible", {
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
    Object.defineProperty(DejaGridDemoComponent.prototype, "bigCountriesList", {
        set: function (grid) {
            var _this = this;
            if (this.viewPortInfos$) {
                this.viewPortInfos$.unsubscribe();
                this.viewPortInfos = [];
                delete this.viewPortInfos$;
            }
            this.viewPortInfos$ = grid && grid.viewPort.viewPort$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["debounceTime"])(1))
                .subscribe(function (viewPort) {
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
    DejaGridDemoComponent.prototype.onColumnSizeChanged = function (e, grid) {
        switch (e.column.name) {
            case 'description':
            case 'urlToImage':
            case 'address':
            case 'about':
            case 'p1.p2.person.address':
            case 'p1.p2.person.about':
                grid.clearRowsHeight();
                grid.refreshViewPort();
                break;
            default:
        }
    };
    DejaGridDemoComponent.prototype.imageLoaded = function (item, grid) {
        var itemExt = item;
        if (!itemExt.loaded) {
            itemExt.loaded = true;
            grid.refreshViewPort(itemExt);
        }
    };
    DejaGridDemoComponent.prototype.loadingRows = function () {
        var self = this;
        return function (_query, _selectedItems) { return self.peopleService.getPeople$().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["delay"])(3000)); };
    };
    DejaGridDemoComponent.prototype.collapsingRows = function () {
        var self = this;
        return function (row) {
            var group = row;
            return group.loaded ? Object(rxjs__WEBPACK_IMPORTED_MODULE_5__["of"])(row) : self.confirmDialog()(row);
        };
    };
    DejaGridDemoComponent.prototype.expandingRows = function () {
        var _this = this;
        var self = this;
        return function (row) {
            var group = row;
            if (group.loaded) {
                return Object(rxjs__WEBPACK_IMPORTED_MODULE_5__["of"])(row);
            }
            else {
                return self.confirmDialog()(row).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["switchMap"])(function (itm) {
                    if (!itm) {
                        return Object(rxjs__WEBPACK_IMPORTED_MODULE_5__["of"])(null);
                    }
                    Object(rxjs__WEBPACK_IMPORTED_MODULE_5__["of"])(group).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["delay"])(2000), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["first"])())
                        .subscribe(function (grp) {
                        // Simulate asynchronous load
                        var original = _this.groupedByColorPeople.find(function (c) { return c.toString() === grp.color; });
                        grp.rows = original.items.map(function (person) { return ({ model: person }); });
                        grp.loaded = true;
                        grp.className = 'loaded';
                        _this.onExpandGrid.refresh();
                    });
                    return Object(rxjs__WEBPACK_IMPORTED_MODULE_5__["of"])(itm);
                }));
            }
        };
    };
    DejaGridDemoComponent.prototype.confirmDialog = function () {
        var _this = this;
        var self = this;
        return function (row) {
            self.dialogVisible = true;
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_5__["from"])(_this.dialogResponse$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["first"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["map"])(function (response) {
                self.dialogVisible = false;
                return response === 'ok' ? row : null;
            }));
        };
    };
    DejaGridDemoComponent.prototype.onFilterTemplateClicked = function (where) {
        alert(where + " clicked");
    };
    DejaGridDemoComponent.prototype.getParentRowDecr = function (row) {
        return row.toString();
    };
    DejaGridDemoComponent.prototype.getDragContext = function (row) {
        return {
            object: row,
        };
    };
    DejaGridDemoComponent.prototype.getDropContext = function () {
        var _this = this;
        var drag = function (event) {
            if (event.dragInfo && event.dragInfo.element && event.dragInfo.element.tagName === 'DEJA-GRID-ROW') {
                event.preventDefault();
            }
        };
        return {
            dragentercallback: drag,
            dragovercallback: drag,
            dropcallback: function (event) {
                _this.draggedPerson = event.dragInfo.object;
                _this.changeDetectorRef.markForCheck();
            },
        };
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('onexpand'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _deja_js_component_data_grid__WEBPACK_IMPORTED_MODULE_2__["DejaGridComponent"])
    ], DejaGridDemoComponent.prototype, "onExpandGrid", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('bigPeople'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _deja_js_component_data_grid__WEBPACK_IMPORTED_MODULE_2__["DejaGridComponent"]),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_deja_js_component_data_grid__WEBPACK_IMPORTED_MODULE_2__["DejaGridComponent"]])
    ], DejaGridDemoComponent.prototype, "bigCountriesList", null);
    DejaGridDemoComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewEncapsulation"].None,
            selector: 'grid-demo',
            template: __webpack_require__(/*! ./grid-demo.html */ "./src/app/grid/grid-demo.html"),
            styles: [__webpack_require__(/*! ./grid-demo.scss */ "./src/app/grid/grid-demo.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"], _services_people_service__WEBPACK_IMPORTED_MODULE_8__["PeopleService"], _services_news_service__WEBPACK_IMPORTED_MODULE_7__["NewsService"], _deja_js_core__WEBPACK_IMPORTED_MODULE_3__["GroupingService"]])
    ], DejaGridDemoComponent);
    return DejaGridDemoComponent;
}());



/***/ })

}]);
//# sourceMappingURL=grid-grid-demo-module.js.map