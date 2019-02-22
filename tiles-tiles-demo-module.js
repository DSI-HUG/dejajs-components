(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["tiles-tiles-demo-module"],{

/***/ "./dist/deja-js/component/fesm5/deja-js-component-tiles.js":
/*!*****************************************************************!*\
  !*** ./dist/deja-js/component/fesm5/deja-js-component-tiles.js ***!
  \*****************************************************************/
/*! exports provided: DejaTilesModule, DejaTileGroupComponent, DejaTile, DejaTileComponent, DejaTilePositionDirective, DejaTilesLayoutProvider, DejaTilesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DejaTilesModule", function() { return DejaTilesModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DejaTileGroupComponent", function() { return DejaTileGroupComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DejaTile", function() { return DejaTile; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DejaTileComponent", function() { return DejaTileComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DejaTilePositionDirective", function() { return DejaTilePositionDirective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DejaTilesLayoutProvider", function() { return DejaTilesLayoutProvider; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DejaTilesComponent", function() { return DejaTilesComponent; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _deja_js_component_mouse_dragdrop__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @deja-js/component/mouse-dragdrop */ "./dist/deja-js/component/fesm5/deja-js-component-mouse-dragdrop.js");
/* harmony import */ var _deja_js_component_content_editable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @deja-js/component/content-editable */ "./dist/deja-js/component/fesm5/deja-js-component-content-editable.js");
/* harmony import */ var _angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/cdk/coercion */ "./node_modules/@angular/cdk/esm5/coercion.es5.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _deja_js_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @deja-js/core */ "./dist/deja-js/core/fesm5/deja-js-core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");












/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var DejaTileGroupComponent = /** @class */ (function () {
    function DejaTileGroupComponent(changeDetectorRef) {
        var _this = this;
        this.changeDetectorRef = changeDetectorRef;
        this.close = new _angular_core__WEBPACK_IMPORTED_MODULE_7__["EventEmitter"]();
        this.titleChanged = new _angular_core__WEBPACK_IMPORTED_MODULE_7__["EventEmitter"]();
        this.backgroundColor = DejaTileGroupComponent.defaultColor;
        this.foregroundColor = null;
        this.edit$ = new rxjs__WEBPACK_IMPORTED_MODULE_9__["Subject"]();
        this.isAlive = true;
        this._designMode = false;
        Object(rxjs__WEBPACK_IMPORTED_MODULE_9__["from"])(this.edit$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["takeWhile"])((/**
         * @return {?}
         */
        function () { return _this.isAlive; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["filter"])((/**
         * @return {?}
         */
        function () { return _this._designMode; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["debounceTime"])(100))
            .subscribe((/**
         * @return {?}
         */
        function () { return _this.title.edit(true); }));
    }
    Object.defineProperty(DejaTileGroupComponent.prototype, "color", {
        set: /**
         * @param {?} color
         * @return {?}
         */
        function (color) {
            this.backgroundColor = color || DejaTileGroupComponent.defaultColor;
            this.foregroundColor = _deja_js_core__WEBPACK_IMPORTED_MODULE_8__["Color"].parse(this.backgroundColor).bestTextColor.toHex();
            this.changeDetectorRef.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaTileGroupComponent.prototype, "designMode", {
        get: /**
         * @return {?}
         */
        function () {
            return this._designMode;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._designMode = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_4__["coerceBooleanProperty"])(value);
            this.changeDetectorRef.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DejaTileGroupComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.isAlive = false;
    };
    DejaTileGroupComponent.defaultColor = 'rgb(38, 50, 56)';
    DejaTileGroupComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_7__["Component"], args: [{
                    changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_7__["ChangeDetectionStrategy"].OnPush,
                    encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_7__["ViewEncapsulation"].None,
                    selector: 'deja-tile-group',
                    template: "<span [deja-editable] id=\"title\" multiline=\"true\" [(ngModel)]=\"model.templateModel.title\" (ngModelChange)=\"titleChanged.emit($event)\" [mandatory]=\"true\"></span>\n<mat-icon *ngIf=\"designMode\" id=\"edit-button\" (click)=\"edit$.next()\">edit</mat-icon>\n<mat-icon *ngIf=\"designMode\" id=\"close-button\" (click)=\"close.emit($event)\">close</mat-icon>\n",
                    styles: ["deja-tile-group{display:flex;justify-content:space-between;align-items:center;box-sizing:border-box;padding:0 .5rem}deja-tile-group[selected=true]{box-shadow:inset 0 0 0 3px rgba(0,0,0,.6)}deja-tile-group #title{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;flex-grow:1;flex-basis:auto;outline:0}deja-tile-group #title a{color:inherit!important}deja-tile-group #title[contenteditable=true]{cursor:text}deja-tile-group [fontIcon]{font-size:1rem;z-index:3;cursor:pointer;flex-basis:1rem;flex-grow:0;flex-shrink:0}deja-tile-group [fontIcon] path{fill:#777!important}deja-tile-group [fontIcon]:hover{background-color:rgba(255,255,255,.2);color:#222}deja-tile-group #close-button,deja-tile-group #edit-button{margin:.3rem;flex:0 0 auto}"]
                }] }
    ];
    /** @nocollapse */
    DejaTileGroupComponent.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_7__["ChangeDetectorRef"] }
    ]; };
    DejaTileGroupComponent.propDecorators = {
        model: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_7__["Input"] }],
        close: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_7__["Output"] }],
        titleChanged: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_7__["Output"] }],
        backgroundColor: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_7__["HostBinding"], args: ['style.background-color',] }],
        foregroundColor: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_7__["HostBinding"], args: ['style.color',] }],
        title: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_7__["ViewChild"], args: [_deja_js_component_content_editable__WEBPACK_IMPORTED_MODULE_3__["DejaEditableDirective"],] }],
        _designMode: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_7__["HostBinding"], args: ['attr.designMode',] }],
        color: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_7__["Input"] }],
        designMode: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_7__["Input"] }]
    };
    return DejaTileGroupComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var DejaTilePositionDirective = /** @class */ (function () {
    function DejaTilePositionDirective(el) {
        this.element = (/** @type {?} */ (el.nativeElement));
        this.element.style.display = 'none';
    }
    Object.defineProperty(DejaTilePositionDirective.prototype, "bounds", {
        set: /**
         * @param {?} rect
         * @return {?}
         */
        function (rect) {
            if (rect) {
                var left = rect.left, top_1 = rect.top, width = rect.width, height = rect.height;
                this.element.style.left = left + "px";
                this.element.style.top = top_1 + "px";
                this.element.style.width = width + "px";
                this.element.style.height = height + "px";
                this.element.style.display = 'block';
            }
            else {
                this.element.style.display = 'none';
            }
        },
        enumerable: true,
        configurable: true
    });
    DejaTilePositionDirective.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_7__["Directive"], args: [{
                    selector: '[deja-tile-position]',
                },] }
    ];
    /** @nocollapse */
    DejaTilePositionDirective.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_7__["ElementRef"] }
    ]; };
    DejaTilePositionDirective.propDecorators = {
        bounds: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_7__["Input"] }]
    };
    return DejaTilePositionDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var DejaTile = /** @class */ (function () {
    function DejaTile(tile) {
        this.tile = tile;
        this.cutted$ = new rxjs__WEBPACK_IMPORTED_MODULE_9__["BehaviorSubject"](false);
        this.dragging$ = new rxjs__WEBPACK_IMPORTED_MODULE_9__["BehaviorSubject"](false);
        this.dropping$ = new rxjs__WEBPACK_IMPORTED_MODULE_9__["BehaviorSubject"](false);
        this.pressed$ = new rxjs__WEBPACK_IMPORTED_MODULE_9__["BehaviorSubject"](false);
        this.selected$ = new rxjs__WEBPACK_IMPORTED_MODULE_9__["BehaviorSubject"](false);
        this.expanded$ = new rxjs__WEBPACK_IMPORTED_MODULE_9__["BehaviorSubject"](false);
        this.hidden$ = new rxjs__WEBPACK_IMPORTED_MODULE_9__["ReplaySubject"](1);
        this.pending$ = new rxjs__WEBPACK_IMPORTED_MODULE_9__["BehaviorSubject"](false);
        this.deleted$ = new rxjs__WEBPACK_IMPORTED_MODULE_9__["Subject"]();
        this.pixelBounds$ = new rxjs__WEBPACK_IMPORTED_MODULE_9__["BehaviorSubject"](null);
        this.isTemporary = false;
        this.fading = false;
        this.refresh$ = new rxjs__WEBPACK_IMPORTED_MODULE_9__["Subject"]();
        this._isCutted = false;
        this._isDragging = false;
        this._isDropping = false;
        this._isPressed = false;
        this._isSelected = false;
        this._isExpanded = false;
        this._isHidden = false;
        this._isPending = false;
        this._model = tile;
        this._id = tile.id;
        this._percentBounds = tile.bounds;
        this._color = tile.color;
        if (tile.effects) {
            this.isCutted = tile.effects.cutted;
            this.isSelected = tile.effects.selected;
            this._isPending = tile.effects.pending;
            this.fading = tile.effects.fading;
        }
        if (!this._id) {
            this._id = "#" + DejaTile.currentId++;
        }
        // console.log(`Creating tile ${this._id}`);
    }
    Object.defineProperty(DejaTile.prototype, "model", {
        get: /**
         * @return {?}
         */
        function () {
            return this._model;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaTile.prototype, "color", {
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
            this._color = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaTile.prototype, "pixelBounds", {
        get: /**
         * @return {?}
         */
        function () {
            return this._pixelBounds;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (!_deja_js_core__WEBPACK_IMPORTED_MODULE_8__["Rect"].equals(this._pixelBounds, value)) {
                this._pixelBounds = value;
                this.pixelBounds$.next(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaTile.prototype, "isCutted", {
        get: /**
         * @return {?}
         */
        function () {
            return this._isCutted;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (this._isCutted !== value) {
                this._isCutted = value;
                this.cutted$.next(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaTile.prototype, "isDragging", {
        get: /**
         * @return {?}
         */
        function () {
            return this._isDragging;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (this._isDragging !== value) {
                this._isDragging = value;
                this.dragging$.next(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaTile.prototype, "isDropping", {
        get: /**
         * @return {?}
         */
        function () {
            return this._isDropping;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (this._isDropping !== value) {
                this._isDropping = value;
                this.dropping$.next(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaTile.prototype, "isPressed", {
        get: /**
         * @return {?}
         */
        function () {
            return this._isPressed;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (this._isPressed !== value) {
                this._isPressed = value;
                this.pressed$.next(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaTile.prototype, "isSelected", {
        get: /**
         * @return {?}
         */
        function () {
            return this._isSelected;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (this._isSelected !== value) {
                this._isSelected = value;
                this.selected$.next(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaTile.prototype, "isExpanded", {
        get: /**
         * @return {?}
         */
        function () {
            return this._isExpanded;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (this._isExpanded !== value) {
                this._isExpanded = value;
                this.expanded$.next(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaTile.prototype, "isHidden", {
        get: /**
         * @return {?}
         */
        function () {
            return this._isHidden;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (this._isHidden !== value) {
                this._isHidden = value;
                this.hidden$.next(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaTile.prototype, "isPending", {
        get: /**
         * @return {?}
         */
        function () {
            return this._isPending;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (this._isPending !== value) {
                this._isPending = value;
                this.pending$.next(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaTile.prototype, "id", {
        get: /**
         * @return {?}
         */
        function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaTile.prototype, "type", {
        get: /**
         * @return {?}
         */
        function () {
            return this.tile.type;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaTile.prototype, "percentBounds", {
        get: /**
         * @return {?}
         */
        function () {
            return this._percentBounds;
        },
        set: /**
         * @param {?} bounds
         * @return {?}
         */
        function (bounds) {
            this._percentBounds = bounds;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaTile.prototype, "templateModel", {
        get: /**
         * @return {?}
         */
        function () {
            return this.tile.templateModel;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DejaTile.prototype.makeId = /**
     * @return {?}
     */
    function () {
        this._id = "#" + DejaTile.currentId++;
    };
    /**
     * @return {?}
     */
    DejaTile.prototype.refreshBounds = /**
     * @return {?}
     */
    function () {
        this.percentBounds = this.model.bounds;
    };
    /**
     * @param {?} tile
     * @return {?}
     */
    DejaTile.prototype.equalsTo = /**
     * @param {?} tile
     * @return {?}
     */
    function (tile) {
        if (this.model.id) {
            return this.model.id === tile.id;
        }
        else {
            return this.model === tile;
        }
    };
    /**
     * @return {?}
     */
    DejaTile.prototype.clone = /**
     * @return {?}
     */
    function () {
        return new DejaTile(this.toTileModel());
    };
    /**
     * @return {?}
     */
    DejaTile.prototype.delete = /**
     * @return {?}
     */
    function () {
        this.deleted$.next();
    };
    /**
     * @return {?}
     */
    DejaTile.prototype.toTileModel = /**
     * @return {?}
     */
    function () {
        return (/** @type {?} */ ({
            id: this.id,
            type: this.type,
            bounds: this.percentBounds,
            color: this._color,
            templateModel: this.templateModel,
            effects: {
                pending: this.isPending || undefined,
                cutted: this.isCutted || undefined,
                selected: this.isSelected || undefined,
            }
        }));
    };
    /**
     * @return {?}
     */
    DejaTile.prototype.refresh = /**
     * @return {?}
     */
    function () {
        this.refresh$.next();
    };
    DejaTile.currentId = 0;
    return DejaTile;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var DejaTileComponent = /** @class */ (function () {
    function DejaTileComponent(el, changeDetectorRef) {
        this.changeDetectorRef = changeDetectorRef;
        this.modelChanged = new _angular_core__WEBPACK_IMPORTED_MODULE_7__["EventEmitter"]();
        this.close = new _angular_core__WEBPACK_IMPORTED_MODULE_7__["EventEmitter"]();
        this.progressDiameter = 100;
        this.isAlive = true;
        this.element = (/** @type {?} */ (el.nativeElement));
        this.element.setAttribute('hidden', '0');
    }
    Object.defineProperty(DejaTileComponent.prototype, "tile", {
        get: /**
         * @return {?}
         */
        function () {
            return this._tile;
        },
        set: /**
         * @param {?} tile
         * @return {?}
         */
        function (tile) {
            var _this = this;
            this._tile = tile;
            if (tile) {
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
                if (tile.fading) {
                    this.element.setAttribute('fading', '0');
                    this.changeDetectorRef.markForCheck();
                }
                Object(rxjs__WEBPACK_IMPORTED_MODULE_9__["from"])(tile.pixelBounds$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["filter"])((/**
                 * @param {?} bounds
                 * @return {?}
                 */
                function (bounds) { return !!bounds; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["first"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["takeWhile"])((/**
                 * @return {?}
                 */
                function () { return _this.isAlive && !!_this._tile; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["filter"])((/**
                 * @return {?}
                 */
                function () { return tile.fading; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["tap"])((/**
                 * @return {?}
                 */
                function () {
                    _this.element.setAttribute('fading', '1');
                    _this.changeDetectorRef.markForCheck();
                })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["delay"])(200))
                    .subscribe((/**
                 * @return {?}
                 */
                function () {
                    _this.element.removeAttribute('fading');
                    _this.changeDetectorRef.markForCheck();
                }));
                Object(rxjs__WEBPACK_IMPORTED_MODULE_9__["from"])(tile.pixelBounds$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["takeWhile"])((/**
                 * @return {?}
                 */
                function () { return _this.isAlive && !!_this._tile; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["filter"])((/**
                 * @param {?} bounds
                 * @return {?}
                 */
                function (bounds) { return !!bounds; })))
                    .subscribe((/**
                 * @param {?} bounds
                 * @return {?}
                 */
                function (bounds) {
                    if (!tile.isHidden) {
                        _this.element.removeAttribute('hidden');
                    }
                    _this.element.style.left = bounds.left + "px";
                    _this.element.style.top = bounds.top + "px";
                    _this.element.style.width = bounds.width + "px";
                    _this.element.style.height = bounds.height + "px";
                    _this.progressDiameter = Math.min(100, Math.round(Math.max(bounds.width * 0.4, bounds.height * 0.4)));
                    _this.changeDetectorRef.markForCheck();
                }));
                Object(rxjs__WEBPACK_IMPORTED_MODULE_9__["from"])(tile.pressed$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["takeWhile"])((/**
                 * @return {?}
                 */
                function () { return _this.isAlive && !!_this._tile; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["tap"])((/**
                 * @param {?} value
                 * @return {?}
                 */
                function (value) { return toogleAttribute_1('pressed', value); })))
                    .subscribe((/**
                 * @return {?}
                 */
                function () { return _this.changeDetectorRef.markForCheck(); }));
                Object(rxjs__WEBPACK_IMPORTED_MODULE_9__["from"])(tile.selected$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["takeWhile"])((/**
                 * @return {?}
                 */
                function () { return _this.isAlive && !!_this._tile; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["tap"])((/**
                 * @param {?} value
                 * @return {?}
                 */
                function (value) { return toogleAttribute_1('selected', value); })))
                    .subscribe((/**
                 * @return {?}
                 */
                function () { return _this.changeDetectorRef.markForCheck(); }));
                Object(rxjs__WEBPACK_IMPORTED_MODULE_9__["from"])(tile.dragging$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["takeWhile"])((/**
                 * @return {?}
                 */
                function () { return _this.isAlive && !!_this._tile; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["tap"])((/**
                 * @param {?} value
                 * @return {?}
                 */
                function (value) { return toogleAttribute_1('drag', value); })))
                    .subscribe((/**
                 * @return {?}
                 */
                function () { return _this.changeDetectorRef.markForCheck(); }));
                Object(rxjs__WEBPACK_IMPORTED_MODULE_9__["from"])(tile.dropping$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["takeWhile"])((/**
                 * @return {?}
                 */
                function () { return _this.isAlive && !!_this._tile; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["tap"])((/**
                 * @param {?} value
                 * @return {?}
                 */
                function (value) { return toogleAttribute_1('drop', value); })))
                    .subscribe((/**
                 * @return {?}
                 */
                function () { return _this.changeDetectorRef.markForCheck(); }));
                Object(rxjs__WEBPACK_IMPORTED_MODULE_9__["from"])(tile.cutted$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["takeWhile"])((/**
                 * @return {?}
                 */
                function () { return _this.isAlive && !!_this._tile; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["tap"])((/**
                 * @param {?} value
                 * @return {?}
                 */
                function (value) { return toogleAttribute_1('cutted', value); })))
                    .subscribe((/**
                 * @return {?}
                 */
                function () { return _this.changeDetectorRef.markForCheck(); }));
                Object(rxjs__WEBPACK_IMPORTED_MODULE_9__["from"])(tile.expanded$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["takeWhile"])((/**
                 * @return {?}
                 */
                function () { return _this.isAlive && !!_this._tile; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["tap"])((/**
                 * @param {?} value
                 * @return {?}
                 */
                function (value) { return toogleAttribute_1('expanded', value); })))
                    .subscribe((/**
                 * @return {?}
                 */
                function () { return _this.changeDetectorRef.markForCheck(); }));
                Object(rxjs__WEBPACK_IMPORTED_MODULE_9__["from"])(tile.deleted$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["takeWhile"])((/**
                 * @return {?}
                 */
                function () { return _this.isAlive && !!_this._tile; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["tap"])((/**
                 * @return {?}
                 */
                function () { return _this.element.remove(); })))
                    .subscribe((/**
                 * @return {?}
                 */
                function () { return _this.changeDetectorRef.markForCheck(); }));
                /** @type {?} */
                var tooogleHide$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_9__["from"])(tile.hidden$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["tap"])((/**
                 * @param {?} value
                 * @return {?}
                 */
                function (value) { return toogleAttribute_1('hidden', value ? '1' : '2'); })));
                // Hide
                tooogleHide$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["takeWhile"])((/**
                 * @return {?}
                 */
                function () { return _this.isAlive && !!_this._tile; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["debounceTime"])(1000), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["filter"])((/**
                 * @param {?} value
                 * @return {?}
                 */
                function (value) { return value; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["tap"])((/**
                 * @return {?}
                 */
                function () { return _this.element.setAttribute('hidden', '0'); })))
                    .subscribe((/**
                 * @return {?}
                 */
                function () { return _this.changeDetectorRef.markForCheck(); }));
                // Show
                tooogleHide$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["takeWhile"])((/**
                 * @return {?}
                 */
                function () { return _this.isAlive && !!_this._tile; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["debounceTime"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["filter"])((/**
                 * @param {?} value
                 * @return {?}
                 */
                function (value) { return !value; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["tap"])((/**
                 * @return {?}
                 */
                function () { return _this.element.removeAttribute('hidden'); })))
                    .subscribe((/**
                 * @return {?}
                 */
                function () { return _this.changeDetectorRef.markForCheck(); }));
                // Refresh
                Object(rxjs__WEBPACK_IMPORTED_MODULE_9__["from"])(tile.refresh$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["takeWhile"])((/**
                 * @return {?}
                 */
                function () { return _this.isAlive && !!_this._tile; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["debounceTime"])(1))
                    .subscribe((/**
                 * @return {?}
                 */
                function () { return _this.changeDetectorRef.markForCheck(); }));
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DejaTileComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.isAlive = false;
    };
    /**
     * @return {?}
     */
    DejaTileComponent.prototype.onTitleChanged = /**
     * @return {?}
     */
    function () {
        this.modelChanged.emit();
    };
    DejaTileComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_7__["Component"], args: [{
                    changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_7__["ChangeDetectionStrategy"].OnPush,
                    selector: 'deja-tile',
                    template: "<deja-tile-group class=\"noselect\" *ngIf=\"tile.type==='group'\" [model]=\"tile\" [designMode]=\"designMode\" (titleChanged)=\"onTitleChanged()\" [color]=\"tile.color\" (close)=\"close.emit($event)\"></deja-tile-group>\n<ng-template *ngIf=\"tile.type!=='group'\" [ngTemplateOutlet]=\"template\" [ngTemplateOutletContext]=\"{ $implicit: tile, designMode: designMode }\"></ng-template>\n<mat-progress-spinner *ngIf=\"tile && tile.pending$ | async\" mode=\"indeterminate\" [diameter]=\"progressDiameter\" class=\"accent\"></mat-progress-spinner>\n\n\n",
                    styles: [":host{display:block;position:absolute;transition-property:left,top,opacity;transition-duration:.5s;transition-timing-function:ease;opacity:1}:host[expanded]{transition-property:height}:host[cutted]{opacity:.5}:host[drag],:host[drop]{opacity:.9;z-index:100}:host[drag]{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;transition:none}:host[fading=\"0\"]{opacity:0;transition:none}:host[fading=\"1\"]{opacity:0}:host[hidden=\"0\"]{visibility:hidden;transition:none}:host[hidden=\"1\"]{opacity:0;transition:opacity 1s ease-in-out}:host[hidden=\"2\"]{visibility:visible;opacity:0;transition:none}:host deja-tile-group{height:100%;width:100%}:host deja-tile-group .mat-icon{display:flex;align-items:center;justify-content:center}:host mat-progress-spinner{position:absolute;z-index:1;right:.2rem;bottom:.2rem;-webkit-transform:translate(-60%,-60%);transform:translate(-60%,-60%)}"]
                }] }
    ];
    /** @nocollapse */
    DejaTileComponent.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_7__["ElementRef"] },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_7__["ChangeDetectorRef"] }
    ]; };
    DejaTileComponent.propDecorators = {
        template: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_7__["Input"] }],
        designMode: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_7__["Input"] }],
        modelChanged: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_7__["Output"] }],
        close: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_7__["Output"] }],
        tile: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_7__["Input"] }]
    };
    return DejaTileComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var DejaTilesLayoutProvider = /** @class */ (function () {
    function DejaTilesLayoutProvider(clipboardService) {
        var _this = this;
        this.clipboardService = clipboardService;
        this.refreshTiles$ = new rxjs__WEBPACK_IMPORTED_MODULE_9__["Subject"]();
        this.ensureVisible$ = new rxjs__WEBPACK_IMPORTED_MODULE_9__["Subject"]();
        this.ensureBounds$ = new rxjs__WEBPACK_IMPORTED_MODULE_9__["Subject"]();
        this.dragging$ = new rxjs__WEBPACK_IMPORTED_MODULE_9__["BehaviorSubject"](false);
        this.dragSelection$ = new rxjs__WEBPACK_IMPORTED_MODULE_9__["Subject"]();
        this.dragDropInfos$ = new rxjs__WEBPACK_IMPORTED_MODULE_9__["Subject"]();
        this.selectionRect$ = new rxjs__WEBPACK_IMPORTED_MODULE_9__["Subject"]();
        this.dragover$ = new rxjs__WEBPACK_IMPORTED_MODULE_9__["Subject"]();
        this.dragleave$ = new rxjs__WEBPACK_IMPORTED_MODULE_9__["Subject"]();
        this.deleteTiles$ = new rxjs__WEBPACK_IMPORTED_MODULE_9__["Subject"]();
        this.designMode = false;
        this.layoutCompleted = new rxjs__WEBPACK_IMPORTED_MODULE_9__["Subject"]();
        this.layoutChanged = new rxjs__WEBPACK_IMPORTED_MODULE_9__["Subject"]();
        this.modelChanged = new rxjs__WEBPACK_IMPORTED_MODULE_9__["Subject"]();
        this.selectionChanged = new rxjs__WEBPACK_IMPORTED_MODULE_9__["Subject"]();
        this.contentAdding = new rxjs__WEBPACK_IMPORTED_MODULE_9__["Subject"]();
        this.contentRemoving = new rxjs__WEBPACK_IMPORTED_MODULE_9__["Subject"]();
        this._tileMinWidth = 10;
        this._tileMinWidthUnit = '%';
        this._tileMaxWidth = 100;
        this._tileMaxWidthUnit = '%';
        this._tileMinHeight = 10;
        this._tileMinHeightUnit = '%';
        this._tileMaxHeight = 100;
        this._tileMaxHeightUnit = '%';
        this._maxWidth = 100;
        this._maxWidthUnit = '%';
        this.tilesDic = (/** @type {?} */ ({}));
        this._targetBounds = (/** @type {?} */ ({}));
        this.destination = (/** @type {?} */ ({}));
        this.dragPageOffset = (/** @type {?} */ ({}));
        this.dragOriginalPosition = (/** @type {?} */ ({}));
        this.isAlive = true;
        this.selectedIds = (/** @type {?} */ ([]));
        Object(rxjs__WEBPACK_IMPORTED_MODULE_9__["from"])(this.refreshTiles$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["debounceTime"])(30), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["takeWhile"])((/**
         * @return {?}
         */
        function () { return _this.isAlive; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["tap"])((/**
         * @return {?}
         */
        function () {
            _this.container.style.width = '';
            _this.container.style.height = '';
        })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["delay"])(10), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["takeWhile"])((/**
         * @return {?}
         */
        function () { return _this.isAlive; })))
            .subscribe((/**
         * @param {?} params
         * @return {?}
         */
        function (params) {
            /** @type {?} */
            var placeAtTheEnd = (/** @type {?} */ ([]));
            /** @type {?} */
            var containerBounds = _this.container.getBoundingClientRect();
            if ((params && params.resetWidth) || !_this.hundredPercentWith) {
                _this.hundredPercentWith = containerBounds.width;
            }
            /** @type {?} */
            var height = containerBounds.height - 20;
            /** @type {?} */
            var width = containerBounds.width - 20;
            /** @type {?} */
            var maxWidth = 0;
            /** @type {?} */
            var maxHeight = 0;
            /** @type {?} */
            var tiles = _this.tiles || [];
            /** @type {?} */
            var selectedTileIds = (/** @type {?} */ ([]));
            tiles.forEach((/**
             * @param {?} tile
             * @return {?}
             */
            function (tile) {
                if (tile.percentBounds && !tile.percentBounds.isEmpty()) {
                    /** @type {?} */
                    var bounds = _this.getPixelBounds(tile.percentBounds);
                    if (bounds.bottom > maxWidth) {
                        maxWidth = bounds.bottom;
                    }
                    if (bounds.right > maxHeight) {
                        maxHeight = bounds.right;
                    }
                    if (!tile.isDragging) {
                        tile.pixelBounds = bounds;
                    }
                }
                else {
                    placeAtTheEnd.push(tile);
                }
                if (tile.isSelected && !tile.isHidden) {
                    selectedTileIds.push(tile.id);
                }
            }));
            /** @type {?} */
            var top = maxHeight;
            /** @type {?} */
            var left = 0;
            placeAtTheEnd.forEach((/**
             * @param {?} tile
             * @return {?}
             */
            function (tile) {
                tile.percentBounds = tile.percentBounds || new _deja_js_core__WEBPACK_IMPORTED_MODULE_8__["Rect"](_this.getPercentSize(left), _this.getPercentSize(top), 3 * _this.getTileMinPercentWidth(), 3 * _this.getTileMinPercentHeight());
                /** @type {?} */
                var pixelBounds = _this.getPixelBounds(tile.percentBounds);
                if (pixelBounds.right > width) {
                    top = maxHeight;
                    left = 0;
                    tile.percentBounds.left = 0;
                    tile.percentBounds.top = _this.getPercentSize(top);
                    pixelBounds = _this.getPixelBounds(tile.percentBounds);
                }
                if (pixelBounds.bottom > maxHeight) {
                    maxHeight = pixelBounds.bottom;
                }
                tile.pixelBounds = _this.getPixelBounds(tile.percentBounds);
                left += pixelBounds.width;
            }));
            if (_this.dragTarget) {
                /** @type {?} */
                var dragBounds = _this.getPixelBounds(_this.dragTarget);
                if (height <= dragBounds.bottom) {
                    height = dragBounds.bottom + dragBounds.height;
                }
                if (width <= dragBounds.right) {
                    width = dragBounds.right + dragBounds.width;
                }
            }
            /** @type {?} */
            var minHeight = _this.getPixelSize(2 * _this._tileMinHeight, _this._tileMinHeightUnit);
            if (height < minHeight) {
                height = minHeight;
            }
            _this.container.style.width = width + "px";
            _this.container.style.height = height + "px";
            if (params) {
                if (params.ensureVisible) {
                    _this.ensureVisible$.next(params.ensureVisible);
                }
                if (params.ensureBounds) {
                    _this.ensureBounds$.next(params.ensureBounds);
                }
            }
            _this.selectedTiles = selectedTileIds;
            /** @type {?} */
            var event = (/** @type {?} */ (new CustomEvent('DejaTilesEvent', { cancelable: false })));
            if (placeAtTheEnd.length > 0) {
                event.tiles = placeAtTheEnd.map((/**
                 * @param {?} tile
                 * @return {?}
                 */
                function (tile) { return tile.toTileModel(); }));
                _this.layoutChanged.next(event);
            }
            event.tiles = tiles.map((/**
             * @param {?} tile
             * @return {?}
             */
            function (tile) { return tile.toTileModel(); }));
            _this.layoutCompleted.next(event);
        }));
        /** @type {?} */
        var ensureTile$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_9__["from"])(this.ensureVisible$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["delay"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["map"])((/**
         * @param {?} id
         * @return {?}
         */
        function (id) { return _this.tilesDic[id]; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["filter"])((/**
         * @param {?} tile
         * @return {?}
         */
        function (tile) { return !!tile; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["map"])((/**
         * @param {?} tile
         * @return {?}
         */
        function (tile) { return tile.percentBounds; })));
        Object(rxjs__WEBPACK_IMPORTED_MODULE_9__["merge"])(this.ensureBounds$, ensureTile$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["takeWhile"])((/**
         * @return {?}
         */
        function () { return _this.isAlive; })))
            .subscribe((/**
         * @param {?} percentBounds
         * @return {?}
         */
        function (percentBounds) {
            var _a = _this.getPixelBounds(percentBounds), left = _a.left, right = _a.right, top = _a.top, bottom = _a.bottom;
            /** @type {?} */
            var findScrollContainer = (/**
             * @param {?} container
             * @return {?}
             */
            function (container) {
                while (container && container.tagName !== 'DEJA-TILES') {
                    container = container.parentElement;
                }
                return container;
            });
            /** @type {?} */
            var scrollContainer = findScrollContainer(_this.container);
            if (!scrollContainer) {
                return;
            }
            /** @type {?} */
            var containerBounds = _this.container.getBoundingClientRect();
            /** @type {?} */
            var scrollBounds = scrollContainer.getBoundingClientRect();
            if (left + containerBounds.left < scrollBounds.bottom) {
                scrollContainer.scrollLeft += left + containerBounds.left - scrollBounds.bottom;
            }
            else if (right + containerBounds.left > scrollBounds.right) {
                scrollContainer.scrollLeft += right + containerBounds.left - scrollBounds.right;
            }
            if (top + containerBounds.top < scrollBounds.top) {
                scrollContainer.scrollTop += top + containerBounds.top - scrollBounds.top;
            }
            else if (bottom + containerBounds.top > scrollBounds.bottom) {
                scrollContainer.scrollTop += bottom + containerBounds.top - scrollBounds.bottom;
            }
        }));
        Object(rxjs__WEBPACK_IMPORTED_MODULE_9__["from"])(this.dragSelection$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["takeWhile"])((/**
         * @return {?}
         */
        function () { return _this.isAlive; })))
            .subscribe((/**
         * @param {?} dragSelection
         * @return {?}
         */
        function (dragSelection) {
            /** @type {?} */
            var mouseUp$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_9__["fromEvent"])(_this._container.ownerDocument, 'mouseup').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["tap"])((/**
             * @return {?}
             */
            function () { return _this.selectionRect$.next(null); })));
            Object(rxjs__WEBPACK_IMPORTED_MODULE_9__["fromEvent"])(_this._container, 'mousemove').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["takeUntil"])(mouseUp$), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["filter"])((/**
             * @param {?} event
             * @return {?}
             */
            function (event) { return event.buttons === 1; })))
                .subscribe((/**
             * @param {?} event
             * @return {?}
             */
            function (event) {
                /** @type {?} */
                var containerBounds = _this._container.getBoundingClientRect();
                // Select all tiles between start position and current position
                dragSelection.selectedRect = _deja_js_core__WEBPACK_IMPORTED_MODULE_8__["Rect"].fromPoints(dragSelection.startPosition, new _deja_js_core__WEBPACK_IMPORTED_MODULE_8__["Position"](event.pageX - containerBounds.left, event.pageY - containerBounds.top));
                _this.selectionRect$.next(dragSelection.selectedRect);
                /** @type {?} */
                var selection = _this.HitTest(dragSelection.selectedRect);
                _this.selectedTiles = selection.map((/**
                 * @param {?} tile
                 * @return {?}
                 */
                function (tile) { return tile.id; }));
            }));
        }));
        /** @type {?} */
        var leave$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_9__["from"])(this.dragleave$);
        Object(rxjs__WEBPACK_IMPORTED_MODULE_9__["from"])(this.dragDropInfos$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["takeWhile"])((/**
         * @return {?}
         */
        function () { return _this.isAlive; })))
            .subscribe((/**
         * @param {?} dragDropInfos
         * @return {?}
         */
        function (dragDropInfos) {
            if (!dragDropInfos || !dragDropInfos.tiles || !dragDropInfos.tiles.length) {
                return;
            }
            /** @type {?} */
            var mousemove$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_9__["fromEvent"])(_this._container, 'mousemove');
            /** @type {?} */
            var mouseUp$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_9__["fromEvent"])(_this._container.ownerDocument, 'mouseup');
            /** @type {?} */
            var keyUp$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_9__["fromEvent"])(_this._container.ownerDocument, 'keyup');
            /** @type {?} */
            var escape$ = keyUp$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["filter"])((/**
             * @param {?} event
             * @return {?}
             */
            function (event) { return event.keyCode === _deja_js_core__WEBPACK_IMPORTED_MODULE_8__["KeyCodes"].Escape; })));
            /** @type {?} */
            var cancel$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_9__["merge"])(leave$, mousemove$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["filter"])((/**
             * @param {?} event
             * @return {?}
             */
            function (event) { return event.buttons !== 1; }))), escape$);
            /** @type {?} */
            var kill$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_9__["merge"])(mouseUp$, cancel$);
            /** @type {?} */
            var mouseUp$sub;
            /** @type {?} */
            var cancel$sub = cancel$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["tap"])((/**
             * @return {?}
             */
            function () { return mouseUp$sub.unsubscribe(); })))
                .subscribe((/**
             * @return {?}
             */
            function () {
                _this.removeTemporaryTile();
                _this.cancelDrag(dragDropInfos.tiles);
            }));
            mouseUp$sub = mouseUp$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["tap"])((/**
             * @return {?}
             */
            function () { return cancel$sub.unsubscribe(); })))
                .subscribe((/**
             * @return {?}
             */
            function () { return _this.drop(dragDropInfos.tiles); }));
            /** @type {?} */
            var dragover$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_9__["from"])(_this.dragover$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["map"])((/**
             * @param {?} cursor
             * @return {?}
             */
            function (cursor) { return cursor.originalEvent; })));
            Object(rxjs__WEBPACK_IMPORTED_MODULE_9__["merge"])(mousemove$, dragover$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["takeUntil"])(kill$))
                .subscribe((/**
             * @param {?} event
             * @return {?}
             */
            function (event) {
                /** @type {?} */
                var containerBounds = _this._container.getBoundingClientRect();
                /** @type {?} */
                var x = event.pageX - containerBounds.left;
                /** @type {?} */
                var y = event.pageY - containerBounds.top;
                if (!dragDropInfos.enabled) {
                    if (Math.abs(dragDropInfos.startX - x) >= 10 || Math.abs(dragDropInfos.startY - y) >= 10) {
                        // Allow drag and drop of new tiles from outside the component
                        if (dragDropInfos.tiles.length === 1 && !_this.tiles.find((/**
                         * @param {?} t
                         * @return {?}
                         */
                        function (t) { return t === dragDropInfos.tiles[0]; }))) {
                            /** @type {?} */
                            var tempTile = dragDropInfos.tiles[0];
                            // Clear current selection
                            _this.selectedTiles = [tempTile.id];
                            /** @type {?} */
                            var bounds = tempTile.percentBounds;
                            if (!bounds || bounds.isEmpty()) {
                                bounds = new _deja_js_core__WEBPACK_IMPORTED_MODULE_8__["Rect"](0, 0, 15, 15);
                            }
                            /** @type {?} */
                            var idealBounds = _this.getFreePlace(new _deja_js_core__WEBPACK_IMPORTED_MODULE_8__["Rect"](_this.getPercentSize(x) - bounds.width / 2, _this.getPercentSize(y) - bounds.height / 2, bounds.width, bounds.height));
                            dragDropInfos.startX = idealBounds.left - bounds.width / 2;
                            dragDropInfos.startY = idealBounds.top - bounds.height / 2;
                            tempTile.percentBounds = idealBounds;
                            tempTile.dragging$.next(true);
                            _this._cursor = 'move';
                            _this.tiles.push(tempTile);
                            _this.tilesDic[tempTile.id] = tempTile;
                            // Start tile drag and drop
                            _this.dragging$.next(true);
                            dragDropInfos.enabled = true;
                            _this.startDrag(dragDropInfos.tiles, _this.getPixelSize(idealBounds.left + idealBounds.width / 2), _this.getPixelSize(idealBounds.top + idealBounds.height / 2));
                        }
                        else {
                            // Start tile drag and drop
                            _this.dragging$.next(true);
                            dragDropInfos.enabled = true;
                            _this.startDrag(dragDropInfos.tiles, x, y);
                        }
                    }
                }
                else {
                    _this.drag(dragDropInfos.tiles, x, y);
                }
            }));
        }));
        // Delete stream for clipboard
        Object(rxjs__WEBPACK_IMPORTED_MODULE_9__["from"])(this.deleteTiles$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["takeWhile"])((/**
         * @return {?}
         */
        function () { return _this.isAlive; })))
            .subscribe((/**
         * @param {?} tilesToDelete
         * @return {?}
         */
        function (tilesToDelete) { return _this.deleteTiles(tilesToDelete); }));
    }
    Object.defineProperty(DejaTilesLayoutProvider.prototype, "container", {
        get: /**
         * @return {?}
         */
        function () {
            return this._container;
        },
        set: /**
         * @param {?} container
         * @return {?}
         */
        function (container) {
            var _this = this;
            this._container = container;
            if (this._container) {
                /** @type {?} */
                var leave$_1 = Object(rxjs__WEBPACK_IMPORTED_MODULE_9__["fromEvent"])(container, 'mouseleave');
                /** @type {?} */
                var mouseUp$_1 = Object(rxjs__WEBPACK_IMPORTED_MODULE_9__["fromEvent"])(container.ownerDocument, 'mouseup');
                Object(rxjs__WEBPACK_IMPORTED_MODULE_9__["fromEvent"])(container, 'mouseenter').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["takeWhile"])((/**
                 * @return {?}
                 */
                function () { return _this.isAlive; })))
                    .subscribe((/**
                 * @return {?}
                 */
                function () {
                    // Cursor provider
                    if (_this.designMode) {
                        Object(rxjs__WEBPACK_IMPORTED_MODULE_9__["fromEvent"])(container, 'mousemove').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["debounceTime"])(10), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["takeUntil"])(leave$_1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["filter"])((/**
                         * @param {?} event
                         * @return {?}
                         */
                        function (event) { return event.buttons === 0; })))
                            .subscribe((/**
                         * @param {?} event
                         * @return {?}
                         */
                        function (event) {
                            _this._cursor = _this.getCursorFromHTMLElement(event.pageX, event.pageY, (/** @type {?} */ (event.target)));
                            _this.container.style.cursor = _this._cursor;
                        }));
                    }
                    else {
                        _this.container.style.cursor = '';
                    }
                    /** @type {?} */
                    var mouseDown$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_9__["fromEvent"])(container, 'mousedown').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["filter"])((/**
                     * @param {?} event
                     * @return {?}
                     */
                    function (event) { return event.buttons === 1; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["map"])((/**
                     * @param {?} event
                     * @return {?}
                     */
                    function (event) { return ({ event: event, target: (/** @type {?} */ (event.target)), clickedTile: _this.getTileComponentFromHTMLElement((/** @type {?} */ (event.target))) }); })));
                    // Pressed and selected tile observers
                    mouseDown$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["takeUntil"])(leave$_1))
                        .subscribe((/**
                     * @param {?} __0
                     * @return {?}
                     */
                    function (_a) {
                        var event = _a.event, target = _a.target, clickedTile = _a.clickedTile;
                        if (_this.currentTile) {
                            _this.currentTile.isPressed = false;
                        }
                        _this.currentTile = clickedTile;
                        if (_this.currentTile) {
                            _this.currentTile.isPressed = true;
                            if (event.ctrlKey) ;
                            else {
                                if (!_this.currentTile.isSelected || _this._cursor !== 'move') {
                                    _this.selectedTiles = [_this.currentTile.id];
                                }
                                if (_this.designMode) {
                                    /** @type {?} */
                                    var containerBounds = _this._container.getBoundingClientRect();
                                    /** @type {?} */
                                    var x = event.pageX - containerBounds.left;
                                    /** @type {?} */
                                    var y = event.pageY - containerBounds.top;
                                    _this.dragDropInfos$.next((/** @type {?} */ ({
                                        enabled: false,
                                        startX: x,
                                        startY: y,
                                        tiles: _this.tiles.filter((/**
                                         * @param {?} tile
                                         * @return {?}
                                         */
                                        function (tile) { return tile.isSelected; })),
                                    })));
                                }
                            }
                            Object(rxjs__WEBPACK_IMPORTED_MODULE_9__["merge"])(mouseUp$_1, leave$_1).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["first"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["filter"])((/**
                             * @return {?}
                             */
                            function () { return !!_this.currentTile; })))
                                .subscribe((/**
                             * @param {?} e
                             * @return {?}
                             */
                            function (e) {
                                if (_this.currentTile.isPressed) {
                                    _this.currentTile.isPressed = false;
                                    // Multi-selection
                                    if (e.ctrlKey) {
                                        _this.currentTile.isSelected = !_this.currentTile.isSelected;
                                        _this.selectedTiles = _this.tiles
                                            .filter((/**
                                         * @param {?} tile
                                         * @return {?}
                                         */
                                        function (tile) { return tile.isSelected; }))
                                            .map((/**
                                         * @param {?} tile
                                         * @return {?}
                                         */
                                        function (tile) { return tile.id; }));
                                    }
                                }
                                _this.currentTile = undefined;
                            }));
                        }
                        else {
                            if (target === _this.container || target.parentElement === _this.container) {
                                if (event.buttons === 1) {
                                    // Start drag selection
                                    /** @type {?} */
                                    var containerBounds = _this._container.getBoundingClientRect();
                                    _this.dragSelection$.next((/** @type {?} */ ({ startPosition: new _deja_js_core__WEBPACK_IMPORTED_MODULE_8__["Position"](event.pageX - containerBounds.left, event.pageY - containerBounds.top), selectedRect: new _deja_js_core__WEBPACK_IMPORTED_MODULE_8__["Rect"](), })));
                                }
                                // Unselect all tiles
                                if (_this.currentTile) {
                                    _this.currentTile.isPressed = false;
                                }
                                _this.selectedTiles = [];
                            }
                        }
                    }));
                }));
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaTilesLayoutProvider.prototype, "tiles", {
        get: /**
         * @return {?}
         */
        function () {
            return this._tiles || (this._tiles = []);
        },
        set: /**
         * @param {?} tiles
         * @return {?}
         */
        function (tiles) {
            this._tiles = tiles;
            this.tilesDic = this.tiles.reduce((/**
             * @param {?} dic
             * @param {?} t
             * @return {?}
             */
            function (dic, t) {
                dic[t.id] = t;
                return dic;
            }), (/** @type {?} */ ({})));
            this.refreshTiles$.next({ resetWidth: true });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaTilesLayoutProvider.prototype, "selectedTiles", {
        set: /**
         * @param {?} selectedIds
         * @return {?}
         */
        function (selectedIds) {
            /** @type {?} */
            var selectedTiles = (/** @type {?} */ ([]));
            /** @type {?} */
            var raiseEvent = false;
            /** @type {?} */
            var idsDic = selectedIds.reduce((/**
             * @param {?} dic
             * @param {?} id
             * @return {?}
             */
            function (dic, id) {
                dic[id] = true;
                return dic;
            }), (/** @type {?} */ ({})));
            /** @type {?} */
            var previousIdsDic = this.selectedIds.reduce((/**
             * @param {?} dic
             * @param {?} id
             * @return {?}
             */
            function (dic, id) {
                dic[id] = true;
                return dic;
            }), (/** @type {?} */ ({})));
            if (this.tiles && this.tiles.length) {
                this.tiles.forEach((/**
                 * @param {?} tile
                 * @return {?}
                 */
                function (tile) {
                    if (idsDic[tile.id] !== previousIdsDic[tile.id]) {
                        raiseEvent = true;
                    }
                    tile.isSelected = idsDic[tile.id];
                    if (tile.isSelected) {
                        selectedTiles.push(tile);
                    }
                }));
            }
            else {
                raiseEvent = this.selectedIds.length > 0;
            }
            this.selectedIds = selectedIds;
            if (raiseEvent) {
                /** @type {?} */
                var event_1 = (/** @type {?} */ (new CustomEvent('DejaTilesAddEvent', { cancelable: false })));
                event_1.tiles = selectedTiles;
                this.selectionChanged.next(event_1);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaTilesLayoutProvider.prototype, "tileMinWidth", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.extractValueAndUnit('_tileMinWidth', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaTilesLayoutProvider.prototype, "tileMaxWidth", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.extractValueAndUnit('_tileMaxWidth', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaTilesLayoutProvider.prototype, "tileMinHeight", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.extractValueAndUnit('_tileMinHeight', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaTilesLayoutProvider.prototype, "tileMaxHeight", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.extractValueAndUnit('_tileMaxHeight', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaTilesLayoutProvider.prototype, "maxWidth", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.extractValueAndUnit('_maxWidth', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaTilesLayoutProvider.prototype, "targetBounds", {
        get: /**
         * @private
         * @return {?}
         */
        function () {
            return this._targetBounds;
        },
        set: /**
         * @private
         * @param {?} targetBounds
         * @return {?}
         */
        function (targetBounds) {
            this._targetBounds = targetBounds;
            if (targetBounds) {
                this.selectionRect$.next(new _deja_js_core__WEBPACK_IMPORTED_MODULE_8__["Rect"]({
                    height: this.getPixelSize(targetBounds.height || 0),
                    left: this.getPixelSize(targetBounds.left || 0),
                    top: this.getPixelSize(targetBounds.top || 0),
                    width: this.getPixelSize(targetBounds.width || 0),
                }));
            }
            else {
                this.selectionRect$.next(undefined);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DejaTilesLayoutProvider.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.isAlive = false;
        this._container = undefined;
    };
    /**
     * @return {?}
     */
    DejaTilesLayoutProvider.prototype.copySelection = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var selectedTiles = this.tiles.filter((/**
         * @param {?} tile
         * @return {?}
         */
        function (tile) { return tile.isSelected; }));
        if (selectedTiles.length) {
            this.copyTiles(selectedTiles, false);
        }
        return selectedTiles;
    };
    /**
     * @return {?}
     */
    DejaTilesLayoutProvider.prototype.cutSelection = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var selectedTiles = this.tiles.filter((/**
         * @param {?} tile
         * @return {?}
         */
        function (tile) { return tile.isSelected; }));
        if (selectedTiles.length) {
            this.copyTiles(selectedTiles, true);
        }
        return selectedTiles;
    };
    /**
     * @return {?}
     */
    DejaTilesLayoutProvider.prototype.deleteSelection = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var selectedTiles = this.tiles.filter((/**
         * @param {?} tile
         * @return {?}
         */
        function (tile) { return tile.isSelected; }));
        if (selectedTiles.length) {
            this.removeTiles(selectedTiles.map((/**
             * @param {?} tile
             * @return {?}
             */
            function (tile) { return tile.id; })));
        }
        return selectedTiles;
    };
    /**
     * @return {?}
     */
    DejaTilesLayoutProvider.prototype.paste = /**
     * @return {?}
     */
    function () {
        if (!this.clipboardService || !this.clipboardService.isAvailable('tiles')) {
            return [];
        }
        /** @type {?} */
        var sourceTiles = (/** @type {?} */ (this.clipboardService.get('tiles')));
        // Unselect all tiles
        this.tiles.forEach((/**
         * @param {?} tile
         * @return {?}
         */
        function (tile) { return tile.isSelected = false; }));
        // Get max rectangle
        /** @type {?} */
        var bounds;
        sourceTiles.forEach((/**
         * @param {?} tile
         * @return {?}
         */
        function (tile) {
            bounds = bounds ? _deja_js_core__WEBPACK_IMPORTED_MODULE_8__["Rect"].union(bounds, tile.percentBounds) : new _deja_js_core__WEBPACK_IMPORTED_MODULE_8__["Rect"](tile.percentBounds);
        }));
        /** @type {?} */
        var targetBounds = this.getFreePlace(new _deja_js_core__WEBPACK_IMPORTED_MODULE_8__["Rect"](0, 0, bounds.width, bounds.height));
        /** @type {?} */
        var newTiles = sourceTiles.map((/**
         * @param {?} tile
         * @return {?}
         */
        function (tile) {
            /** @type {?} */
            var newTile = new DejaTile((/** @type {?} */ ({
                type: tile.type,
                bounds: new _deja_js_core__WEBPACK_IMPORTED_MODULE_8__["Rect"](targetBounds.left + tile.percentBounds.left - bounds.left, targetBounds.top + tile.percentBounds.top - bounds.top, tile.percentBounds.width, tile.percentBounds.height),
                templateModel: tile.templateModel,
                color: tile.color,
            })));
            newTile.isSelected = true;
            return newTile;
        }));
        this.addTiles(newTiles);
        return newTiles;
    };
    /**
     * @param {?} element
     * @return {?}
     */
    DejaTilesLayoutProvider.prototype.getTileElementFromHTMLElement = /**
     * @param {?} element
     * @return {?}
     */
    function (element) {
        /** @type {?} */
        var tileElement = element;
        while (tileElement && tileElement.tagName !== 'DEJA-TILE') {
            tileElement = tileElement.parentElement;
            if (tileElement === this.container) {
                return undefined;
            }
        }
        return tileElement;
    };
    /**
     * @param {?} element
     * @return {?}
     */
    DejaTilesLayoutProvider.prototype.getTileComponentFromHTMLElement = /**
     * @param {?} element
     * @return {?}
     */
    function (element) {
        /** @type {?} */
        var tileElement = this.getTileElementFromHTMLElement(element);
        return tileElement && this.tilesDic[tileElement.id];
    };
    /**
     * @param {?} tilesToDelete
     * @return {?}
     */
    DejaTilesLayoutProvider.prototype.deleteTiles = /**
     * @param {?} tilesToDelete
     * @return {?}
     */
    function (tilesToDelete) {
        var _this = this;
        if (!tilesToDelete || tilesToDelete.length === 0) {
            return;
        }
        // For event after removed finished
        /** @type {?} */
        var event = (/** @type {?} */ (new CustomEvent('DejaTilesModelEvent', { cancelable: false })));
        event.removed = tilesToDelete.map((/**
         * @param {?} tile
         * @return {?}
         */
        function (tile) { return tile.toTileModel(); }));
        tilesToDelete.forEach((/**
         * @param {?} tile
         * @return {?}
         */
        function (tile) {
            delete _this.tilesDic[tile.id];
            tile.delete();
        }));
        /** @type {?} */
        var index = this.tiles.length;
        while (--index >= 0) {
            /** @type {?} */
            var tile = this.tiles[index];
            if (!this.tilesDic[tile.id]) {
                this.tiles.splice(index, 1);
            }
        }
        this.refreshTiles$.next({ resetWidth: true });
        event.tiles = this.tiles.map((/**
         * @param {?} tile
         * @return {?}
         */
        function (tile) { return tile.toTileModel(); }));
        this.modelChanged.next(event);
    };
    /**
     * @param {?} tileIdsToRemove
     * @return {?}
     */
    DejaTilesLayoutProvider.prototype.removeTiles = /**
     * @param {?} tileIdsToRemove
     * @return {?}
     */
    function (tileIdsToRemove) {
        var _this = this;
        if (!tileIdsToRemove || tileIdsToRemove.length === 0) {
            return;
        }
        /** @type {?} */
        var tilesToRemove = tileIdsToRemove.map((/**
         * @param {?} id
         * @return {?}
         */
        function (id) { return _this.tilesDic[id]; }));
        // Delete selected tiles components
        tilesToRemove.forEach((/**
         * @param {?} tile
         * @return {?}
         */
        function (tile) {
            tile.isHidden = true;
        }));
        /** @type {?} */
        var event = (/** @type {?} */ (new CustomEvent('DejaTilesRemoveEvent', { cancelable: true })));
        event.tiles = this.tiles.map((/**
         * @param {?} tile
         * @return {?}
         */
        function (tile) { return tile.toTileModel(); }));
        event.removed = tilesToRemove.map((/**
         * @param {?} tile
         * @return {?}
         */
        function (tile) { return tile.toTileModel(); }));
        event.cancel$ = new rxjs__WEBPACK_IMPORTED_MODULE_9__["Subject"]();
        /** @type {?} */
        var cancelSubscription = event.cancel$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["first"])())
            .subscribe((/**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value) {
                tilesToRemove.forEach((/**
                 * @param {?} tile
                 * @return {?}
                 */
                function (tile) { return tile.isHidden = false; }));
            }
            else {
                _this.deleteTiles(tilesToRemove);
            }
        }));
        // Forward event
        this.contentRemoving.next(event);
        // Remove immediately
        if (!event.defaultPrevented) {
            cancelSubscription.unsubscribe();
            this.deleteTiles(tilesToRemove);
        }
    };
    /**
     * @param {?} tiles
     * @return {?}
     */
    DejaTilesLayoutProvider.prototype.createTiles = /**
     * @param {?} tiles
     * @return {?}
     */
    function (tiles) {
        if (!tiles || tiles.length === 0) {
            return;
        }
        this.addTiles(tiles.map((/**
         * @param {?} tile
         * @return {?}
         */
        function (tile) { return new DejaTile(tile); })));
    };
    /**
     * @param {?} idealBounds
     * @return {?}
     */
    DejaTilesLayoutProvider.prototype.getFreePlace = /**
     * @param {?} idealBounds
     * @return {?}
     */
    function (idealBounds) {
        /** @type {?} */
        var freePlaces = (/** @type {?} */ ([]));
        /** @type {?} */
        var maxHeight = 0;
        this.tiles.forEach((/**
         * @param {?} t
         * @return {?}
         */
        function (t) {
            if (t.percentBounds.bottom > maxHeight) {
                maxHeight = t.percentBounds.bottom;
            }
        }));
        for (var x = 0; x <= this._maxWidth - idealBounds.width; x += this._tileMinWidth) {
            var _loop_1 = function (y) {
                /** @type {?} */
                var currentBounds = new _deja_js_core__WEBPACK_IMPORTED_MODULE_8__["Rect"](x, y, idealBounds.width, idealBounds.height);
                if (this_1.tiles.filter((/**
                 * @param {?} t
                 * @return {?}
                 */
                function (t) { return t.percentBounds.intersectWith(currentBounds); })).length === 0) {
                    freePlaces.push(currentBounds);
                }
            };
            var this_1 = this;
            for (var y = 0; y <= maxHeight - idealBounds.height; y += this._tileMinHeight) {
                _loop_1(y);
            }
        }
        if (freePlaces.length > 0) {
            // add at the nearest free place
            freePlaces.sort((/**
             * @param {?} bounds1
             * @param {?} bounds2
             * @return {?}
             */
            function (bounds1, bounds2) {
                /** @type {?} */
                var calcDistance = (/**
                 * @param {?} bounds
                 * @return {?}
                 */
                function (bounds) { return Math.min(Math.abs(bounds.left - idealBounds.left), Math.abs(bounds.right - idealBounds.right)) + 200 * Math.min(Math.abs(bounds.top - idealBounds.top), Math.abs(bounds.bottom - idealBounds.bottom)); });
                return calcDistance(bounds1) - calcDistance(bounds2);
            }));
            return freePlaces[0];
        }
        // Add at the end
        return new _deja_js_core__WEBPACK_IMPORTED_MODULE_8__["Rect"](0, maxHeight, idealBounds.width, idealBounds.height);
    };
    /**
     * @param {?} id
     * @param {?} bounds
     * @return {?}
     */
    DejaTilesLayoutProvider.prototype.moveTile = /**
     * @param {?} id
     * @param {?} bounds
     * @return {?}
     */
    function (id, bounds) {
        /** @type {?} */
        var tile = this.tiles.find((/**
         * @param {?} t
         * @return {?}
         */
        function (t) { return t.id === id; }));
        if (tile) {
            tile.percentBounds = bounds;
            this.refreshTiles$.next();
        }
    };
    /**
     * @param {?} pixelBounds
     * @return {?}
     */
    DejaTilesLayoutProvider.prototype.HitTest = /**
     * @param {?} pixelBounds
     * @return {?}
     */
    function (pixelBounds) {
        /** @type {?} */
        var percentBounds = new _deja_js_core__WEBPACK_IMPORTED_MODULE_8__["Rect"](this.getPercentSize(pixelBounds.left), this.getPercentSize(pixelBounds.top), this.getPercentSize(pixelBounds.width), this.getPercentSize(pixelBounds.height));
        return this.tiles.filter((/**
         * @param {?} t
         * @return {?}
         */
        function (t) { return t.percentBounds.intersectWith(percentBounds); }));
    };
    /**
     * @param {?} value
     * @return {?}
     */
    DejaTilesLayoutProvider.prototype.getPercentSize = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return Math.round(value * 100 / this.hundredPercentWith);
    };
    // Drag and drop from outside provider
    // Drag and drop from outside provider
    /**
     * @param {?} dragContext
     * @param {?} dragCursor
     * @return {?}
     */
    DejaTilesLayoutProvider.prototype.dragEnter = 
    // Drag and drop from outside provider
    /**
     * @param {?} dragContext
     * @param {?} dragCursor
     * @return {?}
     */
    function (dragContext, dragCursor) {
        if (!this.designMode || !this._container) {
            return false;
        }
        /** @type {?} */
        var tile = (/** @type {?} */ (dragContext.IDejaTile));
        if (!tile) {
            return false;
        }
        /** @type {?} */
        var containerBounds = this._container.getBoundingClientRect();
        var _a = dragCursor.originalEvent, pageX = _a.pageX, pageY = _a.pageY;
        /** @type {?} */
        var x = pageX - containerBounds.left;
        /** @type {?} */
        var y = pageY - containerBounds.top;
        // Create a temporary tile for drag and drop
        tile.id = '#temp';
        /** @type {?} */
        var tempTile = new DejaTile(tile);
        tempTile.isTemporary = true;
        this.dragDropInfos$.next((/** @type {?} */ ({
            enabled: false,
            startX: x,
            startY: y,
            tiles: [tempTile],
        })));
        return true;
    };
    /**
     * @param {?} tiles
     * @param {?} pageX
     * @param {?} pageY
     * @return {?}
     */
    DejaTilesLayoutProvider.prototype.startDrag = /**
     * @param {?} tiles
     * @param {?} pageX
     * @param {?} pageY
     * @return {?}
     */
    function (tiles, pageX, pageY) {
        var _this = this;
        // Save layout
        /** @type {?} */
        var savedLayout = this.saveLayout();
        // Bring all tiles together
        /** @type {?} */
        var targetBounds;
        tiles.forEach((/**
         * @param {?} tile
         * @return {?}
         */
        function (tile) {
            targetBounds = targetBounds ? _deja_js_core__WEBPACK_IMPORTED_MODULE_8__["Rect"].union(targetBounds, tile.percentBounds) : tile.percentBounds;
            tile.isDragging = true;
        }));
        this.dragRelativePosition = {};
        tiles.forEach((/**
         * @param {?} tile
         * @return {?}
         */
        function (tile) { _this.dragRelativePosition[tile.id] = new _deja_js_core__WEBPACK_IMPORTED_MODULE_8__["Position"](tile.percentBounds.left - targetBounds.left, tile.percentBounds.top - targetBounds.top); }));
        this.dragPageOffset = new _deja_js_core__WEBPACK_IMPORTED_MODULE_8__["Position"](pageX, pageY);
        this.dragOriginalPosition = new _deja_js_core__WEBPACK_IMPORTED_MODULE_8__["Position"](targetBounds.left, targetBounds.top);
        this.targetBounds = savedLayout.targetBounds = savedLayout.validBounds = targetBounds;
        this.originalLayout = savedLayout;
        this.validLayout = undefined;
    };
    /**
     * @param {?} tile
     * @param {?} pixelHeight
     * @return {?}
     */
    DejaTilesLayoutProvider.prototype.expandTile = /**
     * @param {?} tile
     * @param {?} pixelHeight
     * @return {?}
     */
    function (tile, pixelHeight) {
        // Save layout
        /** @type {?} */
        var t = tile.id ? this.tilesDic[tile.id] : this.tiles.find((/**
         * @param {?} tt
         * @return {?}
         */
        function (tt) { return tt.equalsTo(tile); }));
        if (this.beforeSizeLayout) {
            this.restoreLayout(this.beforeSizeLayout);
        }
        else {
            this.beforeSizeLayout = this.saveLayout();
        }
        this.expandedTile = t;
        t.isExpanded = true;
        /** @type {?} */
        var percentHeight = Math.ceil(pixelHeight * 100 / this.hundredPercentWith);
        /** @type {?} */
        var bottom = t.percentBounds.top + percentHeight;
        this.size(t, new _deja_js_core__WEBPACK_IMPORTED_MODULE_8__["Position"](0, this.getPixelSize(bottom)), _deja_js_core__WEBPACK_IMPORTED_MODULE_8__["Directions"].bottom);
    };
    /**
     * @return {?}
     */
    DejaTilesLayoutProvider.prototype.cancelExpand = /**
     * @return {?}
     */
    function () {
        if (this.beforeSizeLayout) {
            this.expandedTile.isExpanded = false;
            this.restoreLayout(this.beforeSizeLayout);
            this.refreshTiles$.next();
            this.beforeSizeLayout = undefined;
        }
    };
    /**
     * @param {?} tiles
     * @return {?}
     */
    DejaTilesLayoutProvider.prototype.cancelDrag = /**
     * @param {?} tiles
     * @return {?}
     */
    function (tiles) {
        if (this.moveTimOut) {
            this.moveTimOut.unsubscribe();
            this.moveTimOut = undefined;
        }
        Object(rxjs__WEBPACK_IMPORTED_MODULE_9__["from"])(tiles).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["filter"])((/**
         * @param {?} tile
         * @return {?}
         */
        function (tile) { return !!tile; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["tap"])((/**
         * @param {?} tile
         * @return {?}
         */
        function (tile) {
            tile.isDragging = false;
            tile.isDropping = true;
        })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["delay"])(1000))
            .subscribe((/**
         * @param {?} tile
         * @return {?}
         */
        function (tile) { tile.isDropping = false; }));
        // Restore original layout
        if (this.originalLayout) {
            this.restoreLayout(this.originalLayout);
        }
        this.endDrag();
    };
    /**
     * @param {?} tiles
     * @return {?}
     */
    DejaTilesLayoutProvider.prototype.drop = /**
     * @param {?} tiles
     * @return {?}
     */
    function (tiles) {
        var _this = this;
        /** @type {?} */
        var changed;
        if (this.moveTimOut) {
            this.moveTimOut.unsubscribe();
            this.moveTimOut = undefined;
        }
        if (this.validLayout) {
            this.restoreLayout(this.validLayout);
            if (this._cursor !== 'move') {
                // Only one tile can be resized at time
                /** @type {?} */
                var tile = tiles[0];
                tile.percentBounds = new _deja_js_core__WEBPACK_IMPORTED_MODULE_8__["Rect"](this.validLayout.validBounds);
                tile.isDragging = false;
            }
            else {
                Object(rxjs__WEBPACK_IMPORTED_MODULE_9__["from"])(tiles).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["filter"])((/**
                 * @param {?} tile
                 * @return {?}
                 */
                function (tile) { return !!tile; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["tap"])((/**
                 * @param {?} tile
                 * @return {?}
                 */
                function (tile) {
                    /** @type {?} */
                    var left = _this.validLayout.validBounds.left + _this.dragRelativePosition[tile.id].left;
                    /** @type {?} */
                    var top = _this.validLayout.validBounds.top + _this.dragRelativePosition[tile.id].top;
                    tile.percentBounds = new _deja_js_core__WEBPACK_IMPORTED_MODULE_8__["Rect"](left, top, tile.percentBounds.width, tile.percentBounds.height);
                    tile.isDragging = false;
                    tile.isDropping = true;
                    if (tile.id === '#temp') {
                        tile.makeId();
                        _this.tilesDic[tile.id] = tile;
                        delete _this.tilesDic['#temp'];
                        _this.addTiles([tile]);
                    }
                })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["delay"])(1000))
                    .subscribe((/**
                 * @param {?} tile
                 * @return {?}
                 */
                function (tile) { tile.isDropping = false; }));
            }
            changed = this.tiles.filter((/**
             * @param {?} t
             * @return {?}
             */
            function (t) { return !_deja_js_core__WEBPACK_IMPORTED_MODULE_8__["Rect"].equals(t.percentBounds, _this.originalLayout[t.id] && _this.originalLayout[t.id].bounds); }));
            this.endDrag();
        }
        else {
            this.removeTemporaryTile();
            this.cancelDrag(tiles);
        }
        if (changed) {
            /** @type {?} */
            var event_2 = (/** @type {?} */ (new CustomEvent('DejaTilesEvent', { cancelable: true })));
            event_2.tiles = this.tiles.map((/**
             * @param {?} tile
             * @return {?}
             */
            function (tile) { return tile.toTileModel(); }));
            this.layoutChanged.next(event_2);
        }
        return changed;
    };
    /**
     * @return {?}
     */
    DejaTilesLayoutProvider.prototype.endDrag = /**
     * @return {?}
     */
    function () {
        this.originalLayout = undefined;
        this.validLayout = undefined;
        this.targetBounds = undefined;
        this.dragging$.next(false);
        this.dragDropInfos$.next(null);
        this.dragTarget = undefined;
        this.copyTiles(null);
        this.refreshTiles$.next();
    };
    /**
     * @param {?} tiles
     * @param {?} pageX
     * @param {?} pageY
     * @return {?}
     */
    DejaTilesLayoutProvider.prototype.drag = /**
     * @param {?} tiles
     * @param {?} pageX
     * @param {?} pageY
     * @return {?}
     */
    function (tiles, pageX, pageY) {
        var _this = this;
        // Search related coords
        /** @type {?} */
        var offset = new _deja_js_core__WEBPACK_IMPORTED_MODULE_8__["Position"](pageX - this.dragPageOffset.left, pageY - this.dragPageOffset.top);
        /** @type {?} */
        var offsetLeft = offset.left + this.getPixelSize(this.dragOriginalPosition.left);
        /** @type {?} */
        var offsetTop = offset.top + this.getPixelSize(this.dragOriginalPosition.top);
        /** @type {?} */
        var sizeMin = this.getTileMinPixelSize();
        /** @type {?} */
        var sizeMax = this.getTileMaxPixelSize();
        if (this._cursor !== 'move') {
            // Only one tile can be resized at time
            /** @type {?} */
            var tile = tiles[0];
            /** @type {?} */
            var bounds = this.getPixelBounds(tile.percentBounds);
            /** @type {?} */
            var offsetRight = offsetLeft + bounds.width;
            /** @type {?} */
            var offsetBottom = offsetTop + bounds.height;
            /** @type {?} */
            var right = bounds.right;
            /** @type {?} */
            var bottom = bounds.bottom;
            switch (this._cursor) {
                case 'nw-resize':
                    bounds.left = Math.max(Math.min(offsetLeft, bounds.right - sizeMin.width), bounds.right - sizeMax.width);
                    bounds.right = right;
                    bounds.top = Math.max(Math.min(offsetTop, bounds.bottom - sizeMin.height), bounds.bottom - sizeMax.height);
                    bounds.bottom = bottom;
                    this.size(tile, new _deja_js_core__WEBPACK_IMPORTED_MODULE_8__["Position"](offsetLeft, offsetTop), _deja_js_core__WEBPACK_IMPORTED_MODULE_8__["Directions"].left + _deja_js_core__WEBPACK_IMPORTED_MODULE_8__["Directions"].top);
                    break;
                case 'sw-resize':
                    bounds.left = Math.max(Math.min(offsetLeft, bounds.right - sizeMin.width), bounds.right - sizeMax.width);
                    bounds.right = right;
                    bounds.bottom = Math.max(Math.min(offsetBottom, bounds.top + sizeMax.height), bounds.top + sizeMin.height);
                    this.size(tile, new _deja_js_core__WEBPACK_IMPORTED_MODULE_8__["Position"](offsetLeft, offsetBottom), _deja_js_core__WEBPACK_IMPORTED_MODULE_8__["Directions"].left + _deja_js_core__WEBPACK_IMPORTED_MODULE_8__["Directions"].bottom);
                    break;
                case 'w-resize':
                    bounds.left = Math.max(Math.min(offsetLeft, bounds.right - sizeMin.width), bounds.right - sizeMax.width);
                    bounds.right = right;
                    this.size(tile, new _deja_js_core__WEBPACK_IMPORTED_MODULE_8__["Position"](offsetLeft, 0), _deja_js_core__WEBPACK_IMPORTED_MODULE_8__["Directions"].left);
                    break;
                case 'ne-resize':
                    bounds.right = Math.max(Math.min(offsetRight, bounds.left + sizeMax.width), bounds.left + sizeMin.width);
                    bounds.top = Math.max(Math.min(offsetTop, bounds.bottom - sizeMin.height), bounds.bottom - sizeMax.height);
                    bounds.bottom = bottom;
                    this.size(tile, new _deja_js_core__WEBPACK_IMPORTED_MODULE_8__["Position"](offsetRight, offsetTop), _deja_js_core__WEBPACK_IMPORTED_MODULE_8__["Directions"].right + _deja_js_core__WEBPACK_IMPORTED_MODULE_8__["Directions"].top);
                    break;
                case 'se-resize':
                    bounds.right = Math.max(Math.min(offsetRight, bounds.left + sizeMax.width), bounds.left + sizeMin.width);
                    bounds.bottom = Math.max(Math.min(offsetBottom, bounds.top + sizeMax.height), bounds.top + sizeMin.height);
                    this.size(tile, new _deja_js_core__WEBPACK_IMPORTED_MODULE_8__["Position"](offsetRight, offsetBottom), _deja_js_core__WEBPACK_IMPORTED_MODULE_8__["Directions"].right + _deja_js_core__WEBPACK_IMPORTED_MODULE_8__["Directions"].bottom);
                    break;
                case 'e-resize':
                    bounds.right = Math.max(Math.min(offsetRight, bounds.left + sizeMax.width), bounds.left + sizeMin.width);
                    this.size(tile, new _deja_js_core__WEBPACK_IMPORTED_MODULE_8__["Position"](offsetRight, 0), _deja_js_core__WEBPACK_IMPORTED_MODULE_8__["Directions"].right);
                    break;
                case 'n-resize':
                    bounds.top = Math.max(Math.min(offsetTop, bounds.bottom - sizeMin.height), bounds.bottom - sizeMax.height);
                    bounds.bottom = bottom;
                    this.size(tile, new _deja_js_core__WEBPACK_IMPORTED_MODULE_8__["Position"](0, offsetTop), _deja_js_core__WEBPACK_IMPORTED_MODULE_8__["Directions"].top);
                    break;
                case 's-resize':
                    bounds.bottom = Math.max(Math.min(offsetBottom, bounds.top + sizeMax.height), bounds.top + sizeMin.height);
                    this.size(tile, new _deja_js_core__WEBPACK_IMPORTED_MODULE_8__["Position"](0, offsetBottom), _deja_js_core__WEBPACK_IMPORTED_MODULE_8__["Directions"].bottom);
                    break;
                default:
                    throw new Error('Invalid direction');
            }
            tile.pixelBounds = bounds;
        }
        else {
            tiles.forEach((/**
             * @param {?} tile
             * @return {?}
             */
            function (tile) { tile.pixelBounds = new _deja_js_core__WEBPACK_IMPORTED_MODULE_8__["Rect"](offsetLeft + _this.getPixelSize(_this.dragRelativePosition[tile.id].left), offsetTop + _this.getPixelSize(_this.dragRelativePosition[tile.id].top), _this.getPixelSize(tile.percentBounds.width), _this.getPixelSize(tile.percentBounds.height)); }));
            // Assign new drag and drop rectangle
            this.dragTarget = new _deja_js_core__WEBPACK_IMPORTED_MODULE_8__["Rect"](this.getPercentSize(offsetLeft), this.getPercentSize(offsetTop), this.targetBounds.width, this.targetBounds.height);
            this.move();
        }
    };
    /**
     * @param {?} newTiles
     * @return {?}
     */
    DejaTilesLayoutProvider.prototype.addTiles = /**
     * @param {?} newTiles
     * @return {?}
     */
    function (newTiles) {
        var _this = this;
        if (!newTiles || newTiles.length === 0) {
            return;
        }
        newTiles.forEach((/**
         * @param {?} newTile
         * @return {?}
         */
        function (newTile) {
            if (!_this.tiles.find((/**
             * @param {?} t
             * @return {?}
             */
            function (t) { return t.id === newTile.id; }))) {
                newTile.percentBounds = _this.getFreePlace(newTile.percentBounds);
                _this.tiles.push(newTile);
                _this.tilesDic[newTile.id] = newTile;
            }
        }));
        /** @type {?} */
        var event = (/** @type {?} */ (new CustomEvent('DejaTilesAddEvent', { cancelable: true })));
        event.tiles = this.tiles.map((/**
         * @param {?} tile
         * @return {?}
         */
        function (tile) { return tile.toTileModel(); }));
        event.added = newTiles.map((/**
         * @param {?} tile
         * @return {?}
         */
        function (tile) { return tile.toTileModel(); }));
        event.cancel$ = new rxjs__WEBPACK_IMPORTED_MODULE_9__["Subject"]();
        // Delete provider if cut operation
        /** @type {?} */
        var deleteSourceProvider$ = this.clipboardService && (/** @type {?} */ (this.clipboardService.get('tiles-provider')));
        // Hide originals if cut
        /** @type {?} */
        var sourceTiles;
        if (deleteSourceProvider$) {
            sourceTiles = (/** @type {?} */ (this.clipboardService.get('tiles')));
            sourceTiles.forEach((/**
             * @param {?} tile
             * @return {?}
             */
            function (tile) {
                tile.isHidden = true;
            }));
        }
        /** @type {?} */
        var deleteSourceTiles = (/**
         * @return {?}
         */
        function () {
            if (sourceTiles) {
                deleteSourceProvider$.next(sourceTiles);
                _this.clipboardService.clear();
            }
        });
        newTiles.forEach((/**
         * @param {?} tile
         * @return {?}
         */
        function (tile) {
            tile.isPending = true;
        }));
        /** @type {?} */
        var validateNewTiles = (/**
         * @param {?} tiles
         * @return {?}
         */
        function (tiles) {
            tiles.forEach((/**
             * @param {?} tile
             * @return {?}
             */
            function (tile) {
                tile.isPending = false;
            }));
            // Remove original tiles if cut operation
            deleteSourceTiles();
            /** @type {?} */
            var e = (/** @type {?} */ (new CustomEvent('DejaTilesModelEvent', { cancelable: false })));
            e.tiles = _this.tiles.map((/**
             * @param {?} tile
             * @return {?}
             */
            function (tile) { return tile.toTileModel(); }));
            e.added = tiles.map((/**
             * @param {?} tile
             * @return {?}
             */
            function (tile) { return tile.toTileModel(); }));
            _this.modelChanged.next(e);
        });
        /** @type {?} */
        var cancelSubscription = event.cancel$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["first"])())
            .subscribe((/**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value) {
                // Canceled, hide and remove added after effect
                Object(rxjs__WEBPACK_IMPORTED_MODULE_9__["from"])(newTiles).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["tap"])((/**
                 * @param {?} tile
                 * @return {?}
                 */
                function (tile) { return tile.isHidden = true; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["delay"])(1000), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["reduce"])((/**
                 * @param {?} acc
                 * @param {?} cur
                 * @return {?}
                 */
                function (acc, cur) { return Object(tslib__WEBPACK_IMPORTED_MODULE_6__["__spread"])(acc, [cur]); }), []), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["first"])())
                    .subscribe((/**
                 * @param {?} tiles
                 * @return {?}
                 */
                function (tiles) { return _this.deleteTiles(tiles); }));
                // Reshow original tiles if cut operation
                if (sourceTiles) {
                    sourceTiles.forEach((/**
                     * @param {?} tile
                     * @return {?}
                     */
                    function (tile) {
                        tile.isHidden = false;
                        tile.isCutted = true;
                    }));
                }
            }
            else {
                validateNewTiles(newTiles);
            }
        }));
        // Get total rectangle
        /** @type {?} */
        var bounds;
        newTiles.forEach((/**
         * @param {?} tile
         * @return {?}
         */
        function (tile) {
            bounds = bounds ? _deja_js_core__WEBPACK_IMPORTED_MODULE_8__["Rect"].union(bounds, tile.percentBounds) : new _deja_js_core__WEBPACK_IMPORTED_MODULE_8__["Rect"](tile.percentBounds);
        }));
        this.refreshTiles$.next({ ensureBounds: bounds });
        this.contentAdding.next(event);
        if (!event.defaultPrevented) {
            // Add immediately
            cancelSubscription.unsubscribe();
            validateNewTiles(newTiles);
        }
    };
    /**
     * @private
     * @param {?} tile
     * @param {?} pixelPos
     * @param {?} directions
     * @return {?}
     */
    DejaTilesLayoutProvider.prototype.size = /**
     * @private
     * @param {?} tile
     * @param {?} pixelPos
     * @param {?} directions
     * @return {?}
     */
    function (tile, pixelPos, directions) {
        // Calc new tile bounds
        /** @type {?} */
        var percentPos = new _deja_js_core__WEBPACK_IMPORTED_MODULE_8__["Position"](this.getPercentSize(pixelPos.left), this.getPercentSize(pixelPos.top));
        /** @type {?} */
        var dragBounds = tile.percentBounds.clone();
        /** @type {?} */
        var newTargetBounds = tile.percentBounds.clone();
        /** @type {?} */
        var minWidth;
        /** @type {?} */
        var minHeight;
        /** @type {?} */
        var maxWidth;
        /** @type {?} */
        var maxHeight;
        // tslint:disable-next-line:no-bitwise
        if (directions & _deja_js_core__WEBPACK_IMPORTED_MODULE_8__["Directions"].left) {
            minWidth = this.getTileMinPercentWidth();
            maxWidth = this.getTileMaxPercentWidth();
            /** @type {?} */
            var dLeft = percentPos.left;
            /** @type {?} */
            var tLeft = dragBounds.left < dLeft ? minWidth * Math.ceil(dLeft / minWidth) : minWidth * Math.floor(dLeft / minWidth);
            /** @type {?} */
            var tWidth = Math.min(maxWidth, Math.max(minWidth, newTargetBounds.right - tLeft));
            dragBounds.width = dragBounds.right - dLeft;
            dragBounds.left = dLeft;
            newTargetBounds.left = newTargetBounds.right - tWidth;
            newTargetBounds.width = tWidth;
        }
        // tslint:disable-next-line:no-bitwise
        if (directions & _deja_js_core__WEBPACK_IMPORTED_MODULE_8__["Directions"].right) {
            minWidth = minWidth || this.getTileMinPercentWidth();
            maxWidth = maxWidth || this.getTileMaxPercentWidth();
            /** @type {?} */
            var dRight = percentPos.left;
            /** @type {?} */
            var tRight = dragBounds.right < dRight ? minWidth * Math.ceil(dRight / minWidth) : minWidth * Math.floor(dRight / minWidth);
            dragBounds.width = dRight - dragBounds.left;
            newTargetBounds.width = Math.min(maxWidth, Math.max(minWidth, tRight - newTargetBounds.left));
        }
        // tslint:disable-next-line:no-bitwise
        if (directions & _deja_js_core__WEBPACK_IMPORTED_MODULE_8__["Directions"].top) {
            minHeight = this.getTileMinPercentHeight();
            maxHeight = this.getTileMaxPercentHeight();
            /** @type {?} */
            var dTop = percentPos.top;
            /** @type {?} */
            var tTop = dragBounds.top < dTop ? minHeight * Math.ceil(dTop / minHeight) : minHeight * Math.floor(dTop / minHeight);
            /** @type {?} */
            var tHeight = Math.min(maxHeight, Math.max(minHeight, newTargetBounds.bottom - tTop));
            dragBounds.height = dragBounds.bottom - dTop;
            dragBounds.top = dTop;
            newTargetBounds.top = newTargetBounds.bottom - tHeight;
            newTargetBounds.height = tHeight;
        }
        // tslint:disable-next-line:no-bitwise
        if (directions & _deja_js_core__WEBPACK_IMPORTED_MODULE_8__["Directions"].bottom) {
            minHeight = minHeight || this.getTileMinPercentHeight();
            maxHeight = maxHeight || this.getTileMaxPercentHeight();
            /** @type {?} */
            var dBottom = percentPos.top;
            /** @type {?} */
            var tBottom = dragBounds.bottom < dBottom ? minHeight * Math.ceil(dBottom / minHeight) : minHeight * Math.floor(dBottom / minHeight);
            dragBounds.height = dBottom - dragBounds.top;
            newTargetBounds.height = Math.min(maxHeight, Math.max(minHeight, tBottom - newTargetBounds.top));
        }
        if (_deja_js_core__WEBPACK_IMPORTED_MODULE_8__["Rect"].equals(newTargetBounds, this.destination)) {
            // Nothing change, wait for timers
            return;
        }
        // Restore a previous layout if exists for this position
        if (tile.isExpanded) {
            /** @type {?} */
            var ensureBounds = this.ensureTarget(newTargetBounds, dragBounds, directions);
            tile.percentBounds = ensureBounds;
            this.refreshTiles$.next();
        }
        else {
            // Restore the original layout before moving something
            this.restoreLayout(this.originalLayout);
            this.destination = newTargetBounds.clone();
            // Check if location is free without pushing tiles
            /** @type {?} */
            var result = this.tiles.find((/**
             * @param {?} t
             * @return {?}
             */
            function (t) { return !t.isDragging && t.percentBounds.intersectWith(newTargetBounds); }));
            if (!result) {
                this.targetBounds = newTargetBounds;
                // Save layout
                this.validLayout = this.saveLayout();
                this.validLayout.targetBounds = this.validLayout.validBounds = newTargetBounds;
                this.refreshTiles$.next();
            }
            else {
                // Location must be freed
                if (newTargetBounds) {
                    // Ensure new destination
                    /** @type {?} */
                    var ensureBounds = this.ensureTarget(newTargetBounds, dragBounds, directions);
                    if (ensureBounds) {
                        this.targetBounds = ensureBounds;
                        this.validLayout = this.saveLayout();
                        this.validLayout.targetBounds = newTargetBounds;
                        this.validLayout.validBounds = ensureBounds;
                        this.refreshTiles$.next();
                    }
                }
            }
        }
    };
    /**
     * @private
     * @return {?}
     */
    DejaTilesLayoutProvider.prototype.move = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var minWidth = this.getTileMinPercentWidth();
        /** @type {?} */
        var minHeight = this.getTileMinPercentHeight();
        // Search a new target
        /** @type {?} */
        var newTargetBounds = this.ensureContainer(new _deja_js_core__WEBPACK_IMPORTED_MODULE_8__["Rect"](minWidth * Math.round(this.dragTarget.left / minWidth), minHeight * Math.round(this.dragTarget.top / minHeight), this.dragTarget.width, this.dragTarget.height));
        if (this.lastTargetBounds && Math.abs(newTargetBounds.left - this.lastTargetBounds.left) < minWidth && Math.abs(newTargetBounds.top - this.lastTargetBounds.top) < minHeight) {
            // Nothing change, wait for timers
            return;
        }
        this.lastTargetBounds = newTargetBounds;
        if (this.moveTimOut) {
            this.moveTimOut.unsubscribe();
            this.moveTimOut = undefined;
        }
        // Restore the original layout before moving something
        this.restoreLayout(this.originalLayout);
        // Check if location is free without pushing tiles
        /** @type {?} */
        var result = this.tiles.find((/**
         * @param {?} tile
         * @return {?}
         */
        function (tile) { return !tile.isDragging && tile.percentBounds.intersectWith(newTargetBounds); }));
        if (!result) {
            this.targetBounds = newTargetBounds.clone();
            this.destination = newTargetBounds.clone();
            // Save layout
            this.validLayout = this.saveLayout();
            this.validLayout.targetBounds = this.validLayout.validBounds = newTargetBounds;
            this.refreshTiles$.next();
        }
        else {
            // Location must be freed, timer
            this.moveTimOut = Object(rxjs__WEBPACK_IMPORTED_MODULE_9__["timer"])(500).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["first"])())
                .subscribe((/**
             * @return {?}
             */
            function () {
                // console.log('moveTimer timer');
                _this.moveTimOut = undefined;
                _this.destination = newTargetBounds.clone();
                if (newTargetBounds) {
                    // Ensure new destination
                    /** @type {?} */
                    var ensureBounds = _this.ensureTarget(newTargetBounds, _this.dragTarget, _deja_js_core__WEBPACK_IMPORTED_MODULE_8__["Directions"].all);
                    if (ensureBounds) {
                        _this.targetBounds = ensureBounds;
                        _this.validLayout = _this.saveLayout();
                        _this.validLayout.targetBounds = newTargetBounds;
                        _this.validLayout.validBounds = ensureBounds;
                        _this.refreshTiles$.next();
                    }
                }
            }));
        }
    };
    // Ensure that the specified bounds are inside the tiles area. Return the corrected rectangle.
    // Ensure that the specified bounds are inside the tiles area. Return the corrected rectangle.
    /**
     * @private
     * @param {?} percentBounds
     * @return {?}
     */
    DejaTilesLayoutProvider.prototype.ensureContainer = 
    // Ensure that the specified bounds are inside the tiles area. Return the corrected rectangle.
    /**
     * @private
     * @param {?} percentBounds
     * @return {?}
     */
    function (percentBounds) {
        if (percentBounds.left < 0) {
            percentBounds = percentBounds.offset(-percentBounds.left, 0);
        }
        if (percentBounds.top < 0) {
            percentBounds = percentBounds.offset(0, -percentBounds.top);
        }
        /** @type {?} */
        var maxPercentWidth = this.getMaxPercentWidth();
        if (maxPercentWidth && percentBounds.right > maxPercentWidth) {
            percentBounds = percentBounds.offset(maxPercentWidth - percentBounds.right, 0);
        }
        /** @type {?} */
        var maxPercentHeight = this.getMaxPercentHeight();
        if (maxPercentHeight && percentBounds.bottom > maxPercentHeight) {
            percentBounds = percentBounds.offset(0, maxPercentHeight - percentBounds.bottom);
        }
        return percentBounds;
    };
    // Ensure that a tile can be dropped at the specified bounds. Return the corrected rectangle.
    // Ensure that a tile can be dropped at the specified bounds. Return the corrected rectangle.
    /**
     * @private
     * @param {?} bounds
     * @param {?=} effectiveBounds
     * @param {?=} directions
     * @param {?=} originalBounds
     * @return {?}
     */
    DejaTilesLayoutProvider.prototype.ensureTarget = 
    // Ensure that a tile can be dropped at the specified bounds. Return the corrected rectangle.
    /**
     * @private
     * @param {?} bounds
     * @param {?=} effectiveBounds
     * @param {?=} directions
     * @param {?=} originalBounds
     * @return {?}
     */
    function (bounds, effectiveBounds, directions, originalBounds) {
        if (!effectiveBounds) {
            effectiveBounds = bounds;
        }
        // Backup bounds
        if (!originalBounds) {
            originalBounds = bounds.clone();
        }
        if (!directions) {
            directions = _deja_js_core__WEBPACK_IMPORTED_MODULE_8__["Directions"].all;
        }
        else {
            // We always can escape to the bottom in case of
            // tslint:disable-next-line:no-bitwise
            directions |= _deja_js_core__WEBPACK_IMPORTED_MODULE_8__["Directions"].bottom;
        }
        /** @type {?} */
        var leftTilesToPush = (/** @type {?} */ ([]));
        /** @type {?} */
        var rightTilesToPush = (/** @type {?} */ ([]));
        /** @type {?} */
        var topTilesToPush = (/** @type {?} */ ([]));
        /** @type {?} */
        var bottomTilesToPush = (/** @type {?} */ ([]));
        // tslint:disable-next-line:prefer-for-of
        for (var id in this.tilesDic) {
            if (this.tilesDic[id]) {
                /** @type {?} */
                var tile = this.tilesDic[id];
                if (!tile.isDragging && !tile.isExpanded) {
                    if (tile.percentBounds.intersectWith(bounds)) {
                        /** @type {?} */
                        var swapTargetRect = new _deja_js_core__WEBPACK_IMPORTED_MODULE_8__["Rect"](this.dragOriginalPosition.left, this.dragOriginalPosition.top, bounds.width, bounds.height);
                        if (tile.percentBounds.left === effectiveBounds.left && tile.percentBounds.top === effectiveBounds.top && tile.percentBounds.width === effectiveBounds.width && tile.percentBounds.height === effectiveBounds.height && effectiveBounds.adjacent(swapTargetRect)) {
                            // swap
                            tile.percentBounds = swapTargetRect;
                            return bounds;
                        }
                        else {
                            /** @type {?} */
                            var hol = tile.percentBounds.left - effectiveBounds.left;
                            // Ce qui depasse a gauche
                            /** @type {?} */
                            var hor = effectiveBounds.right - tile.percentBounds.right;
                            // Ce qui depasse a droite
                            /** @type {?} */
                            var vot = tile.percentBounds.top - effectiveBounds.top;
                            // Ce qui depasse en haut
                            /** @type {?} */
                            var vob = effectiveBounds.bottom - tile.percentBounds.bottom;
                            // Ce qui depasse en bas
                            /** @type {?} */
                            var hoe = Math.max(0, Math.min(tile.percentBounds.right, effectiveBounds.right) - Math.max(tile.percentBounds.left, effectiveBounds.left)) / Math.min(tile.percentBounds.width, effectiveBounds.width);
                            /** @type {?} */
                            var voe = Math.max(0, Math.min(tile.percentBounds.bottom, effectiveBounds.bottom) - Math.max(tile.percentBounds.top, effectiveBounds.top)) / Math.min(tile.percentBounds.height, effectiveBounds.height);
                            // Calc preferred direction
                            /** @type {?} */
                            var preferredDirection = void 0;
                            // tslint:disable-next-line:no-bitwise
                            if (voe >= hoe && directions & _deja_js_core__WEBPACK_IMPORTED_MODULE_8__["Directions"].horizontal) {
                                // horizontal
                                // tslint:disable-next-line:no-bitwise
                                preferredDirection = hor >= hol && (directions & _deja_js_core__WEBPACK_IMPORTED_MODULE_8__["Directions"].left) ? _deja_js_core__WEBPACK_IMPORTED_MODULE_8__["Directions"].left : _deja_js_core__WEBPACK_IMPORTED_MODULE_8__["Directions"].right;
                            }
                            else {
                                // vertical
                                // tslint:disable-next-line:no-bitwise
                                preferredDirection = vob >= vot && (directions & _deja_js_core__WEBPACK_IMPORTED_MODULE_8__["Directions"].top) ? _deja_js_core__WEBPACK_IMPORTED_MODULE_8__["Directions"].top : _deja_js_core__WEBPACK_IMPORTED_MODULE_8__["Directions"].bottom;
                            }
                            switch (preferredDirection) {
                                case _deja_js_core__WEBPACK_IMPORTED_MODULE_8__["Directions"].left:
                                    leftTilesToPush.push(tile);
                                    break;
                                case _deja_js_core__WEBPACK_IMPORTED_MODULE_8__["Directions"].top:
                                    topTilesToPush.push(tile);
                                    break;
                                case _deja_js_core__WEBPACK_IMPORTED_MODULE_8__["Directions"].right:
                                    rightTilesToPush.push(tile);
                                    break;
                                default:
                                    bottomTilesToPush.push(tile);
                                    break;
                            }
                        }
                    }
                }
            }
        }
        // try first horizontal move
        /** @type {?} */
        var remain = 0;
        if (leftTilesToPush.length) {
            remain = this.pushHorizontal(bounds, -1, leftTilesToPush);
            if (remain) {
                bounds = this.ensureContainer(bounds.offset(remain, 0));
                // tslint:disable-next-line:no-bitwise
                return this.ensureTarget(bounds, effectiveBounds, directions & ~_deja_js_core__WEBPACK_IMPORTED_MODULE_8__["Directions"].left, originalBounds);
            }
        }
        // Now try right
        if (rightTilesToPush.length) {
            remain = this.pushHorizontal(bounds, 1, rightTilesToPush);
        }
        if (remain > 0) {
            // No horizontal place, restore original position
            this.restoreLayout(this.originalLayout);
            // tslint:disable-next-line:no-bitwise
            return this.ensureTarget(originalBounds, effectiveBounds, directions & _deja_js_core__WEBPACK_IMPORTED_MODULE_8__["Directions"].vertical);
        }
        else {
            // Try top
            if (topTilesToPush.length) {
                remain = this.pushVertical(bounds, -1, topTilesToPush);
                if (remain) {
                    bounds = this.ensureContainer(bounds.offset(0, remain));
                    return this.ensureTarget(bounds, effectiveBounds, _deja_js_core__WEBPACK_IMPORTED_MODULE_8__["Directions"].bottom);
                }
            }
            // And finally bottom
            remain = this.pushVertical(bounds, 1, bottomTilesToPush);
            if (remain) {
                // Destination is not available, keep tile at the original place
                return null;
            }
        }
        return bounds;
    };
    /**
     * @private
     * @return {?}
     */
    DejaTilesLayoutProvider.prototype.saveLayout = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var layout = (/** @type {?} */ ({}));
        layout.height = this.getTileMinPercentHeight();
        this.tiles.forEach((/**
         * @param {?} tile
         * @return {?}
         */
        function (tile) {
            /** @type {?} */
            var y = _this.getPixelSize(tile.percentBounds.top || 0);
            /** @type {?} */
            var h = _this.getPixelSize(tile.percentBounds.height || _this._tileMinHeight);
            if (y + h > layout.height) {
                layout.height = y + h;
            }
            layout[tile.id] = (/** @type {?} */ ({
                bounds: tile.percentBounds.clone(),
                id: tile.id,
            }));
        }));
        return layout;
    };
    /**
     * @private
     * @param {?} rect
     * @return {?}
     */
    DejaTilesLayoutProvider.prototype.getPixelBounds = /**
     * @private
     * @param {?} rect
     * @return {?}
     */
    function (rect) { return _deja_js_core__WEBPACK_IMPORTED_MODULE_8__["Rect"].fromLTRB(Math.round(rect.left * this.hundredPercentWith / 100), Math.round(rect.top * this.hundredPercentWith / 100), Math.round(rect.right * this.hundredPercentWith / 100), Math.round(rect.bottom * this.hundredPercentWith / 100)); };
    /**
     * @private
     * @param {?} value
     * @param {?=} unit
     * @return {?}
     */
    DejaTilesLayoutProvider.prototype.getPixelSize = /**
     * @private
     * @param {?} value
     * @param {?=} unit
     * @return {?}
     */
    function (value, unit) {
        if (!unit || unit === '%') {
            return Math.round(value * this.hundredPercentWith / 100);
        }
        else {
            return value;
        }
    };
    /**
     * @private
     * @param {?} prop
     * @return {?}
     */
    DejaTilesLayoutProvider.prototype.getSizePercentLimit = /**
     * @private
     * @param {?} prop
     * @return {?}
     */
    function (prop) {
        /** @type {?} */
        var self = (/** @type {?} */ (this));
        /** @type {?} */
        var unit = self[prop + "Unit"];
        if (!unit || unit === 'px') {
            return this.getPercentSize(self[prop]);
        }
        else {
            return self[prop];
        }
    };
    /**
     * @private
     * @param {?} prop
     * @return {?}
     */
    DejaTilesLayoutProvider.prototype.getSizePixelLimit = /**
     * @private
     * @param {?} prop
     * @return {?}
     */
    function (prop) {
        /** @type {?} */
        var self = (/** @type {?} */ (this));
        /** @type {?} */
        var unit = self[prop + "Unit"];
        if (!unit || unit === 'px') {
            return self[prop];
        }
        else {
            return this.getPixelSize(self[prop]);
        }
    };
    /**
     * @private
     * @return {?}
     */
    DejaTilesLayoutProvider.prototype.getTileMinPixelSize = /**
     * @private
     * @return {?}
     */
    function () {
        return new _deja_js_core__WEBPACK_IMPORTED_MODULE_8__["Size"](this.getSizePixelLimit('_tileMinWidth'), this.getSizePixelLimit('_tileMinHeight'));
    };
    /**
     * @private
     * @return {?}
     */
    DejaTilesLayoutProvider.prototype.getTileMaxPixelSize = /**
     * @private
     * @return {?}
     */
    function () {
        return new _deja_js_core__WEBPACK_IMPORTED_MODULE_8__["Size"](this.getSizePixelLimit('_tileMaxWidth'), this.getSizePixelLimit('_tileMaxHeight'));
    };
    /**
     * @private
     * @return {?}
     */
    DejaTilesLayoutProvider.prototype.getTileMinPercentWidth = /**
     * @private
     * @return {?}
     */
    function () {
        return Math.max(1, this.getSizePercentLimit('_tileMinWidth'));
    };
    /**
     * @private
     * @return {?}
     */
    DejaTilesLayoutProvider.prototype.getTileMaxPercentWidth = /**
     * @private
     * @return {?}
     */
    function () {
        return Math.max(5, this.getSizePercentLimit('_tileMaxWidth'));
    };
    /**
     * @private
     * @return {?}
     */
    DejaTilesLayoutProvider.prototype.getTileMinPercentHeight = /**
     * @private
     * @return {?}
     */
    function () {
        return Math.max(1, this.getSizePercentLimit('_tileMinHeight'));
    };
    /**
     * @private
     * @return {?}
     */
    DejaTilesLayoutProvider.prototype.getTileMaxPercentHeight = /**
     * @private
     * @return {?}
     */
    function () {
        return Math.max(5, this.getSizePercentLimit('_tileMaxHeight'));
    };
    /**
     * @private
     * @return {?}
     */
    DejaTilesLayoutProvider.prototype.getMaxPercentWidth = /**
     * @private
     * @return {?}
     */
    function () {
        return Math.max(5, this.getSizePercentLimit('_maxWidth'));
    };
    /**
     * @private
     * @return {?}
     */
    DejaTilesLayoutProvider.prototype.getMaxPercentHeight = /**
     * @private
     * @return {?}
     */
    function () {
        return Math.max(5, this.getSizePercentLimit('_maxHeight'));
    };
    /**
     * @private
     * @param {?} x
     * @param {?} y
     * @param {?} element
     * @return {?}
     */
    DejaTilesLayoutProvider.prototype.getCursorFromHTMLElement = /**
     * @private
     * @param {?} x
     * @param {?} y
     * @param {?} element
     * @return {?}
     */
    function (x, y, element) {
        /** @type {?} */
        var tileElement = this.getTileElementFromHTMLElement(element);
        if (!tileElement) {
            return null;
        }
        /** @type {?} */
        var bounds = tileElement.getBoundingClientRect();
        if (x < bounds.left + 10) {
            if (y < bounds.top + 10) {
                return 'nw-resize';
            }
            else if (y > bounds.bottom - 10) {
                return 'sw-resize';
            }
            else {
                return 'w-resize';
            }
        }
        else if (x > bounds.right - 10) {
            if (y < bounds.top + 10) {
                return 'ne-resize';
            }
            else if (y > bounds.bottom - 10) {
                return 'se-resize';
            }
            else {
                return 'e-resize';
            }
        }
        else {
            if (y < bounds.top + 10) {
                return 'n-resize';
            }
            else if (y > bounds.bottom - 10) {
                return 's-resize';
            }
            else {
                return 'move';
            }
        }
    };
    /**
     * @private
     * @param {?} prop
     * @param {?} value
     * @return {?}
     */
    DejaTilesLayoutProvider.prototype.extractValueAndUnit = /**
     * @private
     * @param {?} prop
     * @param {?} value
     * @return {?}
     */
    function (prop, value) {
        /** @type {?} */
        var regexp = /(\d+)(.*)/i;
        /** @type {?} */
        var matches = regexp.exec(value);
        if (matches && matches.length >= 1) {
            /** @type {?} */
            var self_1 = (/** @type {?} */ (this));
            self_1[prop] = parseInt(matches[1], 10);
            if (matches.length >= 2) {
                self_1[prop + "Unit"] = matches[2];
            }
            else {
                self_1[prop + "Unit"] = 'px';
            }
        }
    };
    /**
     * @private
     * @param {?} layout
     * @return {?}
     */
    DejaTilesLayoutProvider.prototype.restoreLayout = /**
     * @private
     * @param {?} layout
     * @return {?}
     */
    function (layout) {
        this.tiles.forEach((/**
         * @param {?} tile
         * @return {?}
         */
        function (tile) {
            /** @type {?} */
            var config = (/** @type {?} */ (layout[tile.id]));
            tile.percentBounds = config.bounds.clone();
        }));
    };
    /**
     * @private
     * @param {?} direction
     * @param {?} tiles
     * @param {?} offset
     * @param {?=} blackList
     * @return {?}
     */
    DejaTilesLayoutProvider.prototype.calcHorizontalOverflow = /**
     * @private
     * @param {?} direction
     * @param {?} tiles
     * @param {?} offset
     * @param {?=} blackList
     * @return {?}
     */
    function (direction, tiles, offset, blackList) {
        var _this = this;
        /** @type {?} */
        var overflow = 0;
        blackList = blackList || {};
        tiles.forEach((/**
         * @param {?} t
         * @return {?}
         */
        function (t) {
            if (!blackList[t.id]) {
                blackList[t.id] = t.id;
                /** @type {?} */
                var tryBounds_1 = t.percentBounds.offset(direction * offset, 0);
                /** @type {?} */
                var rightOffset = 0;
                /** @type {?} */
                var maxWidth = _this.getMaxPercentWidth();
                if (tryBounds_1.left < 0) {
                    rightOffset = -tryBounds_1.left;
                }
                else if (maxWidth && tryBounds_1.right > maxWidth) {
                    rightOffset = tryBounds_1.right - maxWidth;
                }
                /** @type {?} */
                var adjacentTiles = _this.tiles.filter((/**
                 * @param {?} tile
                 * @return {?}
                 */
                function (tile) { return !tile.isDragging && !tile.equalsTo(t) && tile.percentBounds.intersectWith(tryBounds_1); }));
                if (adjacentTiles.length) {
                    rightOffset += _this.calcHorizontalOverflow(direction, adjacentTiles, offset, blackList);
                }
                if (rightOffset > overflow) {
                    overflow = rightOffset;
                }
            }
        }));
        return overflow;
    };
    /**
     * @private
     * @param {?} direction
     * @param {?} tiles
     * @param {?} offset
     * @param {?} targetBounds
     * @return {?}
     */
    DejaTilesLayoutProvider.prototype.moveHorizontal = /**
     * @private
     * @param {?} direction
     * @param {?} tiles
     * @param {?} offset
     * @param {?} targetBounds
     * @return {?}
     */
    function (direction, tiles, offset, targetBounds) {
        var _this = this;
        tiles.forEach((/**
         * @param {?} t
         * @return {?}
         */
        function (t) {
            if (!targetBounds[t.id]) {
                // Offset tile
                /** @type {?} */
                var newBounds_1 = targetBounds[t.id] = t.percentBounds.offset(direction * offset, 0);
                /** @type {?} */
                var adjacentTiles = _this.tiles.filter((/**
                 * @param {?} tile
                 * @return {?}
                 */
                function (tile) { return !tile.isDragging && !tile.equalsTo(t) && tile.percentBounds.intersectWith(newBounds_1); }));
                if (adjacentTiles.length) {
                    _this.moveHorizontal(direction, adjacentTiles, offset, targetBounds);
                }
            }
        }));
    };
    /**
     * @private
     * @param {?} bounds
     * @param {?} direction
     * @param {?=} tiles
     * @param {?=} offset
     * @return {?}
     */
    DejaTilesLayoutProvider.prototype.pushHorizontal = /**
     * @private
     * @param {?} bounds
     * @param {?} direction
     * @param {?=} tiles
     * @param {?=} offset
     * @return {?}
     */
    function (bounds, direction, tiles, offset) {
        /** @type {?} */
        var overflow = 0;
        /** @type {?} */
        var targetBounds = (/** @type {?} */ ({}));
        if (!offset) {
            offset = 0;
            tiles.forEach((/**
             * @param {?} t
             * @return {?}
             */
            function (t) {
                /** @type {?} */
                var ho = direction > 0 ? Math.max(0, bounds.right - t.percentBounds.left) : Math.max(0, t.percentBounds.right - bounds.left);
                if (ho > offset) {
                    offset = ho;
                }
            }));
        }
        if (offset > 0) {
            // Calc overflow space if all specified tiles are moved
            overflow = this.calcHorizontalOverflow(direction, tiles, offset);
            offset -= overflow;
            if (offset > 0) {
                this.moveHorizontal(direction, tiles, offset, targetBounds);
                //  bounds array to tiles
                this.tiles.forEach((/**
                 * @param {?} t
                 * @return {?}
                 */
                function (t) {
                    if (targetBounds[t.id]) {
                        t.percentBounds = targetBounds[t.id];
                    }
                }));
            }
        }
        return overflow;
    };
    /**
     * @private
     * @param {?} direction
     * @param {?} tiles
     * @param {?} offset
     * @param {?=} blackList
     * @return {?}
     */
    DejaTilesLayoutProvider.prototype.calcVerticalOverflow = /**
     * @private
     * @param {?} direction
     * @param {?} tiles
     * @param {?} offset
     * @param {?=} blackList
     * @return {?}
     */
    function (direction, tiles, offset, blackList) {
        var _this = this;
        /** @type {?} */
        var overflow = 0;
        blackList = blackList || {};
        tiles.forEach((/**
         * @param {?} t
         * @return {?}
         */
        function (t) {
            if (!blackList[t.id]) {
                blackList[t.id] = t.id;
                // Offset tile
                /** @type {?} */
                var tryBounds_2 = t.percentBounds.offset(0, direction * offset);
                /** @type {?} */
                var rightOffset = 0;
                /** @type {?} */
                var maxHeight = _this.getMaxPercentHeight();
                if (tryBounds_2.top < 0) {
                    rightOffset = -tryBounds_2.top;
                }
                else if (maxHeight && tryBounds_2.bottom > maxHeight) {
                    rightOffset = tryBounds_2.bottom - maxHeight;
                }
                /** @type {?} */
                var adjacentTiles = _this.tiles.filter((/**
                 * @param {?} tile
                 * @return {?}
                 */
                function (tile) { return !tile.isDragging && !tile.equalsTo(t) && tile.percentBounds.intersectWith(tryBounds_2); }));
                if (adjacentTiles.length) {
                    rightOffset += _this.calcVerticalOverflow(direction, adjacentTiles, offset, blackList);
                }
                if (rightOffset > overflow) {
                    overflow = rightOffset;
                }
            }
        }));
        return overflow;
    };
    /**
     * @private
     * @param {?} direction
     * @param {?} tiles
     * @param {?} offset
     * @param {?} targetBounds
     * @return {?}
     */
    DejaTilesLayoutProvider.prototype.moveVertical = /**
     * @private
     * @param {?} direction
     * @param {?} tiles
     * @param {?} offset
     * @param {?} targetBounds
     * @return {?}
     */
    function (direction, tiles, offset, targetBounds) {
        var _this = this;
        tiles.forEach((/**
         * @param {?} t
         * @return {?}
         */
        function (t) {
            if (!targetBounds[t.id]) {
                // Offset tile
                /** @type {?} */
                var newBounds_2 = targetBounds[t.id] = t.percentBounds.offset(0, direction * offset);
                /** @type {?} */
                var adjacentTiles = _this.tiles.filter((/**
                 * @param {?} tile
                 * @return {?}
                 */
                function (tile) { return !tile.isDragging && !tile.equalsTo(t) && tile.percentBounds.intersectWith(newBounds_2); }));
                if (adjacentTiles.length) {
                    _this.moveVertical(direction, adjacentTiles, offset, targetBounds);
                }
            }
        }));
    };
    /**
     * @private
     * @param {?} bounds
     * @param {?} direction
     * @param {?} tiles
     * @param {?=} offset
     * @return {?}
     */
    DejaTilesLayoutProvider.prototype.pushVertical = /**
     * @private
     * @param {?} bounds
     * @param {?} direction
     * @param {?} tiles
     * @param {?=} offset
     * @return {?}
     */
    function (bounds, direction, tiles, offset) {
        /** @type {?} */
        var overflow = 0;
        /** @type {?} */
        var targetBounds = (/** @type {?} */ ({}));
        if (!offset) {
            offset = 0;
            tiles.forEach((/**
             * @param {?} t
             * @return {?}
             */
            function (t) {
                /** @type {?} */
                var vo = direction > 0 ? Math.max(0, bounds.bottom - t.percentBounds.top) : Math.max(0, t.percentBounds.bottom - bounds.top);
                if (vo > offset) {
                    offset = vo;
                }
            }));
        }
        if (offset > 0) {
            // Calc overflow space if all specified tiles are moved
            overflow = this.calcVerticalOverflow(direction, tiles, offset);
            offset -= overflow;
            if (offset > 0) {
                this.moveVertical(direction, tiles, offset, targetBounds);
                //  bounds array to tiles
                this.tiles.forEach((/**
                 * @param {?} t
                 * @return {?}
                 */
                function (t) {
                    if (targetBounds[t.id]) {
                        t.percentBounds = targetBounds[t.id];
                    }
                }));
            }
        }
        return overflow;
    };
    /**
     * @private
     * @param {?} tiles
     * @param {?=} isCut
     * @return {?}
     */
    DejaTilesLayoutProvider.prototype.copyTiles = /**
     * @private
     * @param {?} tiles
     * @param {?=} isCut
     * @return {?}
     */
    function (tiles, isCut) {
        if (!this.clipboardService) {
            if (!tiles) {
                return;
            }
            throw new Error('DejaClipboardService must be imported by your application to use the copyTiles methode of DejaTilesComponent.');
        }
        /** @type {?} */
        var tt = (/** @type {?} */ (this.clipboardService.get('tiles')));
        if (tt) {
            tt.forEach((/**
             * @param {?} tile
             * @return {?}
             */
            function (tile) { return tile.isCutted = false; }));
        }
        this.clipboardService.set('tiles', tiles);
        if (isCut) {
            tiles.forEach((/**
             * @param {?} tile
             * @return {?}
             */
            function (tile) { return tile.isCutted = true; }));
            this.clipboardService.set('tiles-provider', this.deleteTiles$);
        }
        else {
            this.clipboardService.set('tiles-provider', undefined);
        }
    };
    /**
     * @private
     * @return {?}
     */
    DejaTilesLayoutProvider.prototype.removeTemporaryTile = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var index = this.tiles.length;
        while (--index >= 0) {
            /** @type {?} */
            var tile = this.tiles[index];
            if (tile.id === '#temp') {
                this.tiles.splice(index, 1);
            }
        }
        delete this.tilesDic['#temp'];
    };
    DejaTilesLayoutProvider.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_7__["Injectable"] }
    ];
    /** @nocollapse */
    DejaTilesLayoutProvider.ctorParameters = function () { return [
        { type: _deja_js_core__WEBPACK_IMPORTED_MODULE_8__["DejaClipboardService"], decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_7__["Optional"] }] }
    ]; };
    return DejaTilesLayoutProvider;
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
var DejaTilesComponent = /** @class */ (function () {
    function DejaTilesComponent(el, changeDetectorRef, layoutProvider, _control) {
        var _this = this;
        this.changeDetectorRef = changeDetectorRef;
        this.layoutProvider = layoutProvider;
        this._control = _control;
        /**
         * Raised when the selected items has changed
         */
        this.selectionChanged = new _angular_core__WEBPACK_IMPORTED_MODULE_7__["EventEmitter"]();
        /**
         * Raised when the layout has changed with a drag and drop
         */
        this.layoutChanged = new _angular_core__WEBPACK_IMPORTED_MODULE_7__["EventEmitter"]();
        /**
         * Raised when the layout is completed and all tiles are binded
         */
        this.layoutCompleted = new _angular_core__WEBPACK_IMPORTED_MODULE_7__["EventEmitter"]();
        /**
         * Raised before some tiles will be added to the data model with a paste
         */
        this.contentAdding = new _angular_core__WEBPACK_IMPORTED_MODULE_7__["EventEmitter"]();
        /**
         * Raised before some tiles will be removed from the data model with a delete
         */
        this.contentRemoving = new _angular_core__WEBPACK_IMPORTED_MODULE_7__["EventEmitter"]();
        /**
         * Raised when some tiles model has changed
         */
        this.modelChanged = new _angular_core__WEBPACK_IMPORTED_MODULE_7__["EventEmitter"]();
        /**
         * Raised when some tiles are copied in the clipboard service. Can result from a copy or paste operation on the tiles.
         */
        this.contentCopied = new _angular_core__WEBPACK_IMPORTED_MODULE_7__["EventEmitter"]();
        /**
         * Tab index of the focusable element
         */
        this.tabIndex = 0;
        // NgModel implementation
        this.onTouchedCallback = noop;
        this.onChangeCallback = noop;
        this._models = (/** @type {?} */ ([]));
        this.isAlive = true;
        this.hasFocus = false;
        if (this._control) {
            this._control.valueAccessor = this;
        }
        /** @type {?} */
        var element = (/** @type {?} */ (el.nativeElement));
        Object(rxjs__WEBPACK_IMPORTED_MODULE_9__["from"])(this.layoutProvider.selectionChanged).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["takeWhile"])((/**
         * @return {?}
         */
        function () { return _this.isAlive; })))
            .subscribe((/**
         * @param {?} e
         * @return {?}
         */
        function (e) { return _this.selectionChanged.emit(e); }));
        Object(rxjs__WEBPACK_IMPORTED_MODULE_9__["from"])(this.layoutProvider.contentAdding).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["takeWhile"])((/**
         * @return {?}
         */
        function () { return _this.isAlive; })))
            .subscribe((/**
         * @param {?} e
         * @return {?}
         */
        function (e) { return _this.contentAdding.emit(e); }));
        Object(rxjs__WEBPACK_IMPORTED_MODULE_9__["from"])(this.layoutProvider.contentRemoving).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["takeWhile"])((/**
         * @return {?}
         */
        function () { return _this.isAlive; })))
            .subscribe((/**
         * @param {?} e
         * @return {?}
         */
        function (e) { return _this.contentRemoving.emit(e); }));
        Object(rxjs__WEBPACK_IMPORTED_MODULE_9__["from"])(this.layoutProvider.modelChanged).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["takeWhile"])((/**
         * @return {?}
         */
        function () { return _this.isAlive; })))
            .subscribe((/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            _this.modelChanged.emit(event);
            _this.onChangeCallback(event.tiles);
        }));
        Object(rxjs__WEBPACK_IMPORTED_MODULE_9__["from"])(this.layoutProvider.layoutChanged).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["takeWhile"])((/**
         * @return {?}
         */
        function () { return _this.isAlive; })))
            .subscribe((/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            _this.layoutChanged.emit(event);
            _this.onChangeCallback(event.tiles);
        }));
        Object(rxjs__WEBPACK_IMPORTED_MODULE_9__["from"])(this.layoutProvider.layoutCompleted).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["takeWhile"])((/**
         * @return {?}
         */
        function () { return _this.isAlive; })))
            .subscribe((/**
         * @param {?} event
         * @return {?}
         */
        function (event) { return _this.layoutCompleted.emit(event); }));
        this.keyup$ = (/** @type {?} */ (Object(rxjs__WEBPACK_IMPORTED_MODULE_9__["fromEvent"])(element.ownerDocument, 'keyup')));
        Object(rxjs__WEBPACK_IMPORTED_MODULE_9__["fromEvent"])(window, 'resize').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["takeWhile"])((/**
         * @return {?}
         */
        function () { return _this.isAlive; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["debounceTime"])(5))
            .subscribe((/**
         * @return {?}
         */
        function () { return _this.refresh({ resetWidth: true }); }));
    }
    Object.defineProperty(DejaTilesComponent.prototype, "tiles", {
        get: /**
         * @return {?}
         */
        function () {
            return this.layoutProvider.tiles;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaTilesComponent.prototype, "selectionRect$", {
        // provide a public access
        get: 
        // provide a public access
        /**
         * @return {?}
         */
        function () {
            return this.layoutProvider.selectionRect$;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaTilesComponent.prototype, "tileminwidth", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.layoutProvider.tileMinWidth = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaTilesComponent.prototype, "tilemaxwidth", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.layoutProvider.tileMaxWidth = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaTilesComponent.prototype, "tileminheight", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.layoutProvider.tileMinHeight = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaTilesComponent.prototype, "tilemaxheight", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.layoutProvider.tileMaxHeight = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaTilesComponent.prototype, "maxwidth", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.layoutProvider.maxWidth = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaTilesComponent.prototype, "designMode", {
        get: /**
         * @return {?}
         */
        function () {
            return this.layoutProvider.designMode;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.layoutProvider.designMode = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_4__["coerceBooleanProperty"])(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaTilesComponent.prototype, "models", {
        set: /**
         * @param {?} models
         * @return {?}
         */
        function (models) {
            this.writeValue(models);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaTilesComponent.prototype, "canDelete", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            var _this = this;
            if (Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_4__["coerceBooleanProperty"])(value) && !this.delete$sub) {
                this.delete$sub = this.keyup$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["filter"])((/**
                 * @return {?}
                 */
                function () { return _this.layoutProvider.designMode; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["filter"])((/**
                 * @param {?} event
                 * @return {?}
                 */
                function (event) {
                    /** @type {?} */
                    var keyCode = event.keyCode || ((/** @type {?} */ (_deja_js_core__WEBPACK_IMPORTED_MODULE_8__["KeyCodes"])))[event.code];
                    return keyCode === _deja_js_core__WEBPACK_IMPORTED_MODULE_8__["KeyCodes"].Delete && _this.hasFocus;
                })))
                    .subscribe((/**
                 * @return {?}
                 */
                function () { return _this.layoutProvider.deleteSelection(); }));
            }
            else if (this.delete$sub) {
                this.delete$sub.unsubscribe();
                this.delete$sub = undefined;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaTilesComponent.prototype, "canCopy", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            var _this = this;
            if (Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_4__["coerceBooleanProperty"])(value) && !this.copy$sub) {
                this.copy$sub = this.keyup$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["filter"])((/**
                 * @param {?} event
                 * @return {?}
                 */
                function (event) {
                    /** @type {?} */
                    var keyCode = event.keyCode || ((/** @type {?} */ (_deja_js_core__WEBPACK_IMPORTED_MODULE_8__["KeyCodes"])))[event.code];
                    return keyCode === _deja_js_core__WEBPACK_IMPORTED_MODULE_8__["KeyCodes"].KeyC && event.ctrlKey && _this.hasFocus;
                })))
                    .subscribe((/**
                 * @return {?}
                 */
                function () {
                    _this.copySelection();
                }));
            }
            else if (this.copy$sub) {
                this.copy$sub.unsubscribe();
                this.copy$sub = undefined;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaTilesComponent.prototype, "canCut", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            var _this = this;
            if (Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_4__["coerceBooleanProperty"])(value) && !this.cut$sub) {
                this.cut$sub = this.keyup$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["filter"])((/**
                 * @return {?}
                 */
                function () { return _this.layoutProvider.designMode; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["filter"])((/**
                 * @param {?} event
                 * @return {?}
                 */
                function (event) {
                    /** @type {?} */
                    var keyCode = event.keyCode || ((/** @type {?} */ (_deja_js_core__WEBPACK_IMPORTED_MODULE_8__["KeyCodes"])))[event.code];
                    return keyCode === _deja_js_core__WEBPACK_IMPORTED_MODULE_8__["KeyCodes"].KeyX && event.ctrlKey && _this.hasFocus;
                })))
                    .subscribe((/**
                 * @return {?}
                 */
                function () {
                    _this.cutSelection();
                }));
            }
            else if (this.cut$sub) {
                this.cut$sub.unsubscribe();
                this.cut$sub = undefined;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaTilesComponent.prototype, "canPaste", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            var _this = this;
            if (Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_4__["coerceBooleanProperty"])(value) && !this.paste$sub) {
                this.paste$sub = this.keyup$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["filter"])((/**
                 * @return {?}
                 */
                function () { return _this.layoutProvider.designMode; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["filter"])((/**
                 * @param {?} event
                 * @return {?}
                 */
                function (event) {
                    /** @type {?} */
                    var keyCode = event.keyCode || ((/** @type {?} */ (_deja_js_core__WEBPACK_IMPORTED_MODULE_8__["KeyCodes"])))[event.code];
                    return keyCode === _deja_js_core__WEBPACK_IMPORTED_MODULE_8__["KeyCodes"].KeyV && event.ctrlKey && _this.hasFocus;
                })))
                    .subscribe((/**
                 * @return {?}
                 */
                function () { return _this.paste(); }));
            }
            else if (this.paste$sub) {
                this.paste$sub.unsubscribe();
                this.paste$sub = undefined;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaTilesComponent.prototype, "selectedTiles", {
        set: /**
         * @param {?} selectedTiles
         * @return {?}
         */
        function (selectedTiles) {
            this.layoutProvider.selectedTiles = selectedTiles.map((/**
             * @param {?} tile
             * @return {?}
             */
            function (tile) { return typeof tile === 'string' ? tile : ((/** @type {?} */ (tile))).id; }));
        },
        enumerable: true,
        configurable: true
    });
    // ************* ControlValueAccessor Implementation **************
    // ************* ControlValueAccessor Implementation **************
    /**
     * @param {?} models
     * @return {?}
     */
    DejaTilesComponent.prototype.writeValue = 
    // ************* ControlValueAccessor Implementation **************
    /**
     * @param {?} models
     * @return {?}
     */
    function (models) {
        this._models = models || [];
        /** @type {?} */
        var tiles = this._models.map((/**
         * @param {?} tile
         * @return {?}
         */
        function (tile) { return new DejaTile(tile); }));
        this.layoutProvider.tiles = tiles;
        this.changeDetectorRef.markForCheck();
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    DejaTilesComponent.prototype.registerOnChange = /**
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
    DejaTilesComponent.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onTouchedCallback = fn;
    };
    // ************* End of ControlValueAccessor Implementation **************
    // ************* End of ControlValueAccessor Implementation **************
    /**
     * @return {?}
     */
    DejaTilesComponent.prototype.ngAfterViewInit = 
    // ************* End of ControlValueAccessor Implementation **************
    /**
     * @return {?}
     */
    function () {
        this.layoutProvider.container = this.tilesContainer.nativeElement;
        this.refresh({ resetWidth: true });
    };
    /**
     * @return {?}
     */
    DejaTilesComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.layoutProvider.ngOnDestroy();
        this.canCopy = false;
        this.canCut = false;
        this.canDelete = false;
        this.canPaste = false;
        this.isAlive = false;
    };
    /**
     * @return {?}
     */
    DejaTilesComponent.prototype.copySelection = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var tiles = this.layoutProvider.copySelection();
        if (tiles && tiles.length) {
            /** @type {?} */
            var event_1 = (/** @type {?} */ (new CustomEvent('DejaTilesCopied', { cancelable: true })));
            event_1.tiles = tiles.map((/**
             * @param {?} tile
             * @return {?}
             */
            function (tile) { return tile.toTileModel(); }));
            this.contentCopied.emit(event_1);
        }
    };
    /**
     * @return {?}
     */
    DejaTilesComponent.prototype.cutSelection = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var tiles = this.layoutProvider.cutSelection();
        if (tiles && tiles.length) {
            /** @type {?} */
            var event_2 = (/** @type {?} */ (new CustomEvent('DejaTilesCutted', { cancelable: true })));
            event_2.tiles = tiles.map((/**
             * @param {?} tile
             * @return {?}
             */
            function (tile) { return tile.toTileModel(); }));
            this.contentCopied.emit(event_2);
        }
    };
    /**
     * @return {?}
     */
    DejaTilesComponent.prototype.deleteSelection = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var tiles = this.layoutProvider.deleteSelection();
        this.changeDetectorRef.markForCheck();
        return tiles;
    };
    /**
     * @return {?}
     */
    DejaTilesComponent.prototype.paste = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var tiles = this.layoutProvider.paste();
        this.changeDetectorRef.markForCheck();
        return tiles;
    };
    /**
     * @param {?} id
     * @return {?}
     */
    DejaTilesComponent.prototype.ensureVisible = /**
     * @param {?} id
     * @return {?}
     */
    function (id) {
        this.layoutProvider.ensureVisible$.next(id);
    };
    /**
     * @param {?} tile
     * @param {?} pixelHeight
     * @return {?}
     */
    DejaTilesComponent.prototype.expandTile = /**
     * @param {?} tile
     * @param {?} pixelHeight
     * @return {?}
     */
    function (tile, pixelHeight) {
        this.layoutProvider.expandTile(tile, pixelHeight);
    };
    /**
     * @return {?}
     */
    DejaTilesComponent.prototype.cancelExpand = /**
     * @return {?}
     */
    function () {
        this.layoutProvider.cancelExpand();
    };
    /**
     * @param {?=} params
     * @return {?}
     */
    DejaTilesComponent.prototype.refresh = /**
     * @param {?=} params
     * @return {?}
     */
    function (params) {
        this.layoutProvider.refreshTiles$.next(params);
    };
    /**
     * @param {?} tiles
     * @return {?}
     */
    DejaTilesComponent.prototype.addTiles = /**
     * @param {?} tiles
     * @return {?}
     */
    function (tiles) {
        this.layoutProvider.addTiles(tiles.map((/**
         * @param {?} tile
         * @return {?}
         */
        function (tile) { return new DejaTile(tile); })));
    };
    /**
     * @param {?} tileIds
     * @return {?}
     */
    DejaTilesComponent.prototype.removeTiles = /**
     * @param {?} tileIds
     * @return {?}
     */
    function (tileIds) {
        this.layoutProvider.removeTiles(tileIds);
    };
    /**
     * @param {?=} title
     * @param {?=} bounds
     * @return {?}
     */
    DejaTilesComponent.prototype.addGroup = /**
     * @param {?=} title
     * @param {?=} bounds
     * @return {?}
     */
    function (title, bounds) {
        /** @type {?} */
        var tile = (/** @type {?} */ ({
            type: 'group',
            bounds: bounds || this.getFreePlace(0, 0, 15, 5),
            color: DejaTileGroupComponent.defaultColor,
            templateModel: {
                title: title || 'New Group',
            },
        }));
        this.layoutProvider.createTiles([tile]);
        return tile;
    };
    /**
     * @param {?=} pageX
     * @param {?=} pageY
     * @param {?=} width
     * @param {?=} height
     * @return {?}
     */
    DejaTilesComponent.prototype.getFreePlace = /**
     * @param {?=} pageX
     * @param {?=} pageY
     * @param {?=} width
     * @param {?=} height
     * @return {?}
     */
    function (pageX, pageY, width, height) {
        if (!this._models || this._models.length === 0) {
            return new _deja_js_core__WEBPACK_IMPORTED_MODULE_8__["Rect"](0, 0, width, height);
        }
        // Check if we drag on a tile
        /** @type {?} */
        var containerElement = (/** @type {?} */ (this.tilesContainer.nativeElement));
        /** @type {?} */
        var containerBounds = containerElement.getBoundingClientRect();
        /** @type {?} */
        var x = pageX ? (pageX - containerBounds.left) : 0;
        /** @type {?} */
        var y = pageY ? (pageY - containerBounds.top) : 0;
        /** @type {?} */
        var percentBounds = new _deja_js_core__WEBPACK_IMPORTED_MODULE_8__["Rect"](this.layoutProvider.getPercentSize(x), this.layoutProvider.getPercentSize(y), width, height);
        return this.layoutProvider.getFreePlace(percentBounds);
    };
    /**
     * @param {?} id
     * @param {?} bounds
     * @return {?}
     */
    DejaTilesComponent.prototype.moveTile = /**
     * @param {?} id
     * @param {?} bounds
     * @return {?}
     */
    function (id, bounds) {
        this.layoutProvider.moveTile(id, bounds);
    };
    /**
     * @return {?}
     */
    DejaTilesComponent.prototype.getDropContext = /**
     * @return {?}
     */
    function () {
        var _this = this;
        return (/** @type {?} */ ({
            dragEnter: (/**
             * @param {?} dragContext
             * @param {?} dragCursor
             * @return {?}
             */
            function (dragContext, dragCursor) {
                return _this.layoutProvider.dragEnter(dragContext, dragCursor) && (/** @type {?} */ ({
                    className: 'hidden',
                }));
            }),
            dragOver: (/**
             * @param {?} _dragContext
             * @param {?} dragCursor
             * @return {?}
             */
            function (_dragContext, dragCursor) {
                _this.layoutProvider.dragover$.next(dragCursor);
            }),
            dragLeave: (/**
             * @param {?} _dragContext
             * @return {?}
             */
            function (_dragContext) {
                _this.layoutProvider.dragleave$.next();
            }),
        }));
    };
    /**
     * @param {?} tile
     * @return {?}
     */
    DejaTilesComponent.prototype.onTileClosed = /**
     * @param {?} tile
     * @return {?}
     */
    function (tile) {
        this.layoutProvider.removeTiles([tile.id]);
    };
    /**
     * @return {?}
     */
    DejaTilesComponent.prototype.onTileModelChanged = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var event = (/** @type {?} */ (new CustomEvent('DejaTilesModelEvent', { cancelable: false })));
        event.tiles = this.layoutProvider.tiles.map((/**
         * @param {?} t
         * @return {?}
         */
        function (t) { return t.toTileModel(); }));
        this.modelChanged.emit(event);
    };
    /**
     * @return {?}
     */
    DejaTilesComponent.prototype.onFocus = /**
     * @return {?}
     */
    function () {
        this.hasFocus = true;
    };
    /**
     * @return {?}
     */
    DejaTilesComponent.prototype.onBlur = /**
     * @return {?}
     */
    function () {
        this.hasFocus = false;
    };
    DejaTilesComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_7__["Component"], args: [{
                    changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_7__["ChangeDetectionStrategy"].OnPush,
                    providers: [DejaTilesLayoutProvider],
                    selector: 'deja-tiles',
                    template: "<div #tilesContainer id=\"tiles\" [class.design]=\"designMode\" [deja-mouse-droppable]=\"getDropContext()\" [attr.tabindex]=\"tabIndex\" (focus)=\"onFocus()\" (blur)=\"onBlur()\">\n    <deja-tile *ngFor=\"let tile of tiles; let index = index;\" [id]=\"tile.id\" [tile]=\"tile\" [designMode]=\"designMode\" [attr.tile-index]=\"index\" [template]=\"tileTemplate\" (close)=\"onTileClosed(tile)\" (modelChanged)=\"onTileModelChanged()\"></deja-tile>\n    <div deja-tile-position [bounds]=\"selectionRect$ | async\"></div>\n</div>",
                    styles: [":host{position:relative;overflow:auto;margin:0!important}:host #tiles{display:block;left:0;top:0;width:100%;height:100%;position:absolute;padding:0!important;margin:0!important}:host #tiles #tile:hover{z-index:200}:host [deja-tile-position]{position:absolute;z-index:11;background-color:rgba(0,0,0,.25)}:host[drag]{background-color:rgba(0,0,0,.15)}:host[drag] [deja-tile-position]{transition-property:left,top,width,height;transition-duration:.35s;transition-timing-function:ease}"]
                }] }
    ];
    /** @nocollapse */
    DejaTilesComponent.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_7__["ElementRef"] },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_7__["ChangeDetectorRef"] },
        { type: DejaTilesLayoutProvider },
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NgControl"], decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_7__["Self"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_7__["Optional"] }] }
    ]; };
    DejaTilesComponent.propDecorators = {
        selectionChanged: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_7__["Output"] }],
        layoutChanged: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_7__["Output"] }],
        layoutCompleted: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_7__["Output"] }],
        contentAdding: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_7__["Output"] }],
        contentRemoving: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_7__["Output"] }],
        modelChanged: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_7__["Output"] }],
        contentCopied: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_7__["Output"] }],
        tabIndex: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_7__["Input"] }],
        tileTemplate: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_7__["ContentChild"], args: ['tileTemplate',] }],
        tilesContainer: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_7__["ViewChild"], args: ['tilesContainer',] }],
        tileminwidth: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_7__["Input"] }],
        tilemaxwidth: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_7__["Input"] }],
        tileminheight: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_7__["Input"] }],
        tilemaxheight: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_7__["Input"] }],
        maxwidth: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_7__["Input"] }],
        designMode: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_7__["Input"] }],
        models: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_7__["Input"] }],
        canDelete: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_7__["Input"] }],
        canCopy: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_7__["Input"] }],
        canCut: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_7__["Input"] }],
        canPaste: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_7__["Input"] }],
        selectedTiles: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_7__["Input"] }]
    };
    return DejaTilesComponent;
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
var DejaTilesModule = /** @class */ (function () {
    function DejaTilesModule() {
    }
    DejaTilesModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_7__["NgModule"], args: [{
                    declarations: [DejaTileComponent, DejaTilesComponent, DejaTileGroupComponent, DejaTilePositionDirective],
                    exports: [DejaTileComponent, DejaTilesComponent, DejaTileGroupComponent],
                    imports: [
                        _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
                        _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormsModule"],
                        _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatProgressSpinnerModule"],
                        _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatIconModule"],
                        _deja_js_component_mouse_dragdrop__WEBPACK_IMPORTED_MODULE_2__["DejaMouseDragDropModule"],
                        _deja_js_component_content_editable__WEBPACK_IMPORTED_MODULE_3__["DejaEditableModule"],
                    ],
                    providers: [
                        _deja_js_component_mouse_dragdrop__WEBPACK_IMPORTED_MODULE_2__["DejaMouseDragDropService"],
                    ]
                },] }
    ];
    return DejaTilesModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */



//# sourceMappingURL=deja-js-component-tiles.js.map

/***/ }),

/***/ "./src/app/tiles/tiles-demo.html":
/*!***************************************!*\
  !*** ./src/app/tiles/tiles-demo.html ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-tab-group [selectedIndex]=\"tabIndex\" (selectedTabChange)=\"tabIndex = $event.index\">\n    <!--<mat-tab label=\"OVERVIEW\">-->\n    <!--<mat-card class=\"demo-card demo-basic\">-->\n    <!--TODO-->\n    <!--</mat-card>-->\n    <!--</mat-tab>-->\n    <mat-tab label=\"API REFERENCE\"></mat-tab>\n    <mat-tab label=\"EXAMPLES\"></mat-tab>\n</mat-tab-group>\n\n<mat-card class=\"demo-card demo-basic\" *ngIf=\"tabIndex === 0\">\n    <deja-markdown [url]=\"'https://raw.githubusercontent.com/DSI-HUG/dejajs-components/dev/src/component/tiles/readme.txt'\"></deja-markdown>\n</mat-card>\n\n<ng-template ngFor let-message [ngForOf]=\"messages$ | async\">\n    <deja-snackbar alignment=\"bottom right\" *ngIf=\"message.gate\" [duration]=\"8000\" (onAnimationDone)=\"message.cancel(false)\">\n        <deja-message-box type=\"{{message.type}}\" title=\"{{message.title}}\">\n            {{message.content}}\n            <ng-template #actionsTemplate>\n                <button mat-raised-button (click)=\"message.cancel(false)\" color=\"primary\">\n                    Ok\n                </button>\n                <button mat-raised-button (click)=\"message.cancel(true)\">\n                    Annuler\n                </button>\n            </ng-template>\n        </deja-message-box>\n    </deja-snackbar>\n</ng-template>\n<mat-card class=\"demo-card demo-basic\" *ngIf=\"tabIndex === 1\">\n    <mat-toolbar color=\"primary\">Tiles Demo</mat-toolbar>\n    <mat-card-content id=\"actions\">\n        <mat-checkbox [(ngModel)]=\"designMode\">Design Mode</mat-checkbox>\n        <button mat-raised-button (click)=\"tiles2.addGroup()\" color=\"primary\">\n            Add Group\n        </button>\n    </mat-card-content>\n    <mat-card-content>\n        <span #dropArea id=\"droparea\" [deja-mouse-droppable]=\"getDropContext(dropArea)\">\n            Drop Area\n        </span>\n    </mat-card-content>\n    <mat-card-content>\n        <deja-tiles #tiles1 id=\"tiles1\" [models]=\"tiles1$ | async\" [deja-mouse-draggable]=\"getDragContext()\" (contentAdding)=\"onContentAdding($event)\" (contentRemoving)=\"onContentRemoving($event)\" maxwidth=\"100%\" tileminwidth=\"5%\" tileminheight=\"5%\" tilemaxheight=\"50%\" tilemaxwidth=\"50%\">\n            <ng-template #tileTemplate let-tile let-pressed=\"pressed\" let-selected=\"selected\">\n                <span class=\"tile-content noselect\" [style.background-color]=\"tile.templateModel.color\">{{ tile.templateModel.naqme }} ({{ tile.id }})\n                    <span id=\"selected\">Selected</span>\n                <span id=\"pressed\">Pressed</span>\n                </span>\n            </ng-template>\n        </deja-tiles>\n    </mat-card-content>\n    <mat-card-content>\n        <deja-tiles #tiles2 id=\"tiles2\" [models]=\"tiles2$ | async\" (contentAdding)=\"onContentAdding($event)\" (contentRemoving)=\"onContentRemoving($event)\" canDelete canCopy canCut canPaste [designMode]=\"designMode\" maxwidth=\"100%\" tileminwidth=\"5%\" tileminheight=\"5%\" tilemaxheight=\"50%\" tilemaxwidth=\"50%\">\n            <ng-template #tileTemplate let-tile let-pressed=\"pressed\" let-selected=\"selected\">\n                <span class=\"tile-content noselect\" [style.background-color]=\"tile.templateModel.color\">{{ tile.templateModel.naqme }} ({{ tile.id }})\n                    <span id=\"selected\">Selected</span>\n                <span id=\"pressed\">Pressed</span>\n                </span>\n            </ng-template>\n        </deja-tiles>\n    </mat-card-content>\n</mat-card>\n\n<deja-mouse-dragdrop-cursor></deja-mouse-dragdrop-cursor>"

/***/ }),

/***/ "./src/app/tiles/tiles-demo.module.ts":
/*!********************************************!*\
  !*** ./src/app/tiles/tiles-demo.module.ts ***!
  \********************************************/
/*! exports provided: DejaTilesDemoModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DejaTilesDemoModule", function() { return DejaTilesDemoModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/card */ "./node_modules/@angular/material/esm5/card.es5.js");
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/toolbar */ "./node_modules/@angular/material/esm5/toolbar.es5.js");
/* harmony import */ var _deja_js_component_message_box__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @deja-js/component/message-box */ "./dist/deja-js/component/fesm5/deja-js-component-message-box.js");
/* harmony import */ var _deja_js_component_mouse_dragdrop__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @deja-js/component/mouse-dragdrop */ "./dist/deja-js/component/fesm5/deja-js-component-mouse-dragdrop.js");
/* harmony import */ var _deja_js_component_snackbar__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @deja-js/component/snackbar */ "./dist/deja-js/component/fesm5/deja-js-component-snackbar.js");
/* harmony import */ var _deja_js_component_tiles__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @deja-js/component/tiles */ "./dist/deja-js/component/fesm5/deja-js-component-tiles.js");
/* harmony import */ var _component_markdown_index__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../component/markdown/index */ "./src/component/markdown/index.ts");
/* harmony import */ var _tiles_demo__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./tiles-demo */ "./src/app/tiles/tiles-demo.ts");
/* harmony import */ var _tiles_demo_routes__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./tiles-demo.routes */ "./src/app/tiles/tiles-demo.routes.ts");
/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */














var DejaTilesDemoModule = /** @class */ (function () {
    function DejaTilesDemoModule() {
    }
    DejaTilesDemoModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [_tiles_demo__WEBPACK_IMPORTED_MODULE_12__["DejaTilesDemoComponent"]],
            exports: [_tiles_demo__WEBPACK_IMPORTED_MODULE_12__["DejaTilesDemoComponent"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _angular_material_card__WEBPACK_IMPORTED_MODULE_5__["MatCardModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatTabsModule"],
                _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_6__["MatToolbarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatButtonModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatCheckboxModule"],
                _deja_js_component_tiles__WEBPACK_IMPORTED_MODULE_10__["DejaTilesModule"],
                _component_markdown_index__WEBPACK_IMPORTED_MODULE_11__["DejaMarkdownModule"],
                _deja_js_component_snackbar__WEBPACK_IMPORTED_MODULE_9__["DejaSnackbarModule"],
                _deja_js_component_mouse_dragdrop__WEBPACK_IMPORTED_MODULE_8__["DejaMouseDragDropModule"],
                _deja_js_component_message_box__WEBPACK_IMPORTED_MODULE_7__["DejaMessageBoxModule"],
                _tiles_demo_routes__WEBPACK_IMPORTED_MODULE_13__["routing"],
            ],
            providers: [],
        })
    ], DejaTilesDemoModule);
    return DejaTilesDemoModule;
}());



/***/ }),

/***/ "./src/app/tiles/tiles-demo.routes.ts":
/*!********************************************!*\
  !*** ./src/app/tiles/tiles-demo.routes.ts ***!
  \********************************************/
/*! exports provided: routing */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "routing", function() { return routing; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _tiles_demo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tiles-demo */ "./src/app/tiles/tiles-demo.ts");
/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */


var routes = [
    { path: '', component: _tiles_demo__WEBPACK_IMPORTED_MODULE_1__["DejaTilesDemoComponent"] },
    { path: '**', redirectTo: '', pathMatch: 'full' },
];
var routing = _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forChild(routes);


/***/ }),

/***/ "./src/app/tiles/tiles-demo.scss":
/*!***************************************!*\
  !*** ./src/app/tiles/tiles-demo.scss ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "deja-tiles-demo .demo-basic {\n  padding: 0; }\n\ndeja-tiles-demo .demo-full-width {\n  width: 100%; }\n\ndeja-tiles-demo .demo-icons {\n  font-size: 100%;\n  height: inherit;\n  vertical-align: top;\n  width: inherit; }\n\ndeja-tiles-demo .demo-card {\n  margin: 16px; }\n\ndeja-tiles-demo .demo-card mat-card-content {\n    display: flex;\n    flex-direction: column;\n    margin: 2rem; }\n\ndeja-tiles-demo #actions {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: space-between; }\n\ndeja-tiles-demo #droparea {\n  height: 5rem;\n  background-color: #f57c00;\n  width: 50%;\n  display: block; }\n\ndeja-tiles-demo #tiles1 {\n  height: 370px;\n  display: block; }\n\ndeja-tiles-demo #tiles2 {\n  height: 1000px;\n  display: block; }\n\ndeja-tiles-demo deja-tile #selected {\n  display: none; }\n\ndeja-tiles-demo deja-tile #pressed {\n  display: none; }\n\ndeja-tiles-demo deja-tile[selected] #selected {\n  display: block; }\n\ndeja-tiles-demo deja-tile[pressed] #pressed {\n  display: block; }\n\ndeja-tiles-demo deja-tile .tile-content {\n  width: 100%;\n  height: 100%;\n  display: block; }\n\n@media screen and (min-width: 1401px) {\n  deja-tiles-demo deja-tiles {\n    font-size: 100%; } }\n\n@media screen and (max-width: 1400px) {\n  deja-tiles-demo deja-tiles {\n    font-size: 90%; } }\n\n@media screen and (max-width: 1200px) {\n  deja-tiles-demo deja-tiles {\n    font-size: 85%; } }\n\n@media screen and (max-width: 768px) {\n  deja-tiles-demo deja-tiles {\n    font-size: 80%; } }\n\n@media screen and (max-width: 640px) {\n  deja-tiles-demo deja-tiles {\n    font-size: 70%; } }\n\n@media screen and (max-width: 320px) {\n  deja-tiles-demo deja-tiles {\n    font-size: 60%; } }\n\n.deja-tile-cursor .tile-content {\n  width: 100%;\n  height: 100%;\n  display: block;\n  opacity: 0.8; }\n\n.country-target-cursor .tile-content {\n  background-color: sandybrown !important;\n  width: 100%;\n  height: 100%;\n  display: block;\n  opacity: 0.8; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3RyYXZpcy9idWlsZC9EU0ktSFVHL2RlamFqcy1jb21wb25lbnRzL3NyYy9hcHAvdGlsZXMvdGlsZXMtZGVtby5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBRUUsVUFBVSxFQUFBOztBQUZaO0VBS0UsV0FBVyxFQUFBOztBQUxiO0VBUUUsZUFBZTtFQUNmLGVBQWU7RUFDZixtQkFBbUI7RUFDbkIsY0FBYyxFQUFBOztBQVhoQjtFQWNFLFlBQVksRUFBQTs7QUFkZDtJQWdCRyxhQUFhO0lBQ2Isc0JBQXNCO0lBQ3RCLFlBQVksRUFBQTs7QUFsQmY7RUFzQkUsYUFBYTtFQUNiLG1CQUFtQjtFQUNuQixtQkFBbUI7RUFDbkIsOEJBQThCLEVBQUE7O0FBekJoQztFQTRCRSxZQUFZO0VBQ1oseUJBQWtDO0VBQzVCLFVBQVU7RUFDVixjQUFjLEVBQUE7O0FBL0J0QjtFQWtDRSxhQUFhO0VBQ2IsY0FBYyxFQUFBOztBQW5DaEI7RUFzQ0UsY0FBYztFQUNkLGNBQWMsRUFBQTs7QUF2Q2hCO0VBMkNHLGFBQWEsRUFBQTs7QUEzQ2hCO0VBOENHLGFBQWEsRUFBQTs7QUE5Q2hCO0VBa0RJLGNBQWMsRUFBQTs7QUFsRGxCO0VBdURJLGNBQWMsRUFBQTs7QUF2RGxCO0VBMkRHLFdBQVc7RUFDWCxZQUFZO0VBQ1osY0FBYyxFQUFBOztBQUloQjtFQWpFRDtJQW1FRyxlQUFlLEVBQUEsRUFDZjs7QUFFRjtFQXRFRDtJQXdFRyxjQUFjLEVBQUEsRUFDZDs7QUFFRjtFQTNFRDtJQTZFRyxjQUFjLEVBQUEsRUFDZDs7QUFFRjtFQWhGRDtJQWtGRyxjQUFjLEVBQUEsRUFDZDs7QUFFRjtFQXJGRDtJQXVGRyxjQUFjLEVBQUEsRUFDZDs7QUFFRjtFQTFGRDtJQTRGRyxjQUFjLEVBQUEsRUFDZDs7QUFJSDtFQUVFLFdBQVc7RUFDWCxZQUFZO0VBQ1osY0FBYztFQUNkLFlBQVksRUFBQTs7QUFJZDtFQUVFLHVDQUF1QztFQUN2QyxXQUFXO0VBQ1gsWUFBWTtFQUNaLGNBQWM7RUFDZCxZQUFZLEVBQUEiLCJmaWxlIjoic3JjL2FwcC90aWxlcy90aWxlcy1kZW1vLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJkZWphLXRpbGVzLWRlbW8ge1xuXHQuZGVtby1iYXNpYyB7XG5cdFx0cGFkZGluZzogMDtcblx0fVxuXHQuZGVtby1mdWxsLXdpZHRoIHtcblx0XHR3aWR0aDogMTAwJTtcblx0fVxuXHQuZGVtby1pY29ucyB7XG5cdFx0Zm9udC1zaXplOiAxMDAlO1xuXHRcdGhlaWdodDogaW5oZXJpdDtcblx0XHR2ZXJ0aWNhbC1hbGlnbjogdG9wO1xuXHRcdHdpZHRoOiBpbmhlcml0O1xuXHR9XG5cdC5kZW1vLWNhcmQge1xuXHRcdG1hcmdpbjogMTZweDtcblx0XHRtYXQtY2FyZC1jb250ZW50IHtcblx0XHRcdGRpc3BsYXk6IGZsZXg7XG5cdFx0XHRmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuXHRcdFx0bWFyZ2luOiAycmVtO1xuXHRcdH1cblx0fVxuXHQjYWN0aW9ucyB7XG5cdFx0ZGlzcGxheTogZmxleDtcblx0XHRmbGV4LWRpcmVjdGlvbjogcm93O1xuXHRcdGFsaWduLWl0ZW1zOiBjZW50ZXI7XG5cdFx0anVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuXHR9XG5cdCNkcm9wYXJlYSB7XG5cdFx0aGVpZ2h0OiA1cmVtO1xuXHRcdGJhY2tncm91bmQtY29sb3I6IHJnYigyNDUsIDEyNCwgMCk7XG4gICAgICAgIHdpZHRoOiA1MCU7XG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuXHR9XG5cdCN0aWxlczEge1xuXHRcdGhlaWdodDogMzcwcHg7XG5cdFx0ZGlzcGxheTogYmxvY2s7XG5cdH1cblx0I3RpbGVzMiB7XG5cdFx0aGVpZ2h0OiAxMDAwcHg7XG5cdFx0ZGlzcGxheTogYmxvY2s7XG5cdH1cblx0ZGVqYS10aWxlIHtcblx0XHQjc2VsZWN0ZWQge1xuXHRcdFx0ZGlzcGxheTogbm9uZTtcblx0XHR9XG5cdFx0I3ByZXNzZWQge1xuXHRcdFx0ZGlzcGxheTogbm9uZTtcblx0XHR9XG5cdFx0JltzZWxlY3RlZF0ge1xuXHRcdFx0I3NlbGVjdGVkIHtcblx0XHRcdFx0ZGlzcGxheTogYmxvY2s7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdCZbcHJlc3NlZF0ge1xuXHRcdFx0I3ByZXNzZWQge1xuXHRcdFx0XHRkaXNwbGF5OiBibG9jaztcblx0XHRcdH1cblx0XHR9XG5cdFx0LnRpbGUtY29udGVudCB7XG5cdFx0XHR3aWR0aDogMTAwJTtcblx0XHRcdGhlaWdodDogMTAwJTtcblx0XHRcdGRpc3BsYXk6IGJsb2NrO1xuXHRcdH1cblx0fVxuXG5cdEBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDE0MDFweCkge1xuXHRcdGRlamEtdGlsZXMge1xuXHRcdFx0Zm9udC1zaXplOiAxMDAlO1xuXHRcdH1cblx0fVxuXHRAbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiAxNDAwcHgpIHtcblx0XHRkZWphLXRpbGVzIHtcblx0XHRcdGZvbnQtc2l6ZTogOTAlO1xuXHRcdH1cblx0fVxuXHRAbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiAxMjAwcHgpIHtcblx0XHRkZWphLXRpbGVzIHtcblx0XHRcdGZvbnQtc2l6ZTogODUlO1xuXHRcdH1cblx0fVxuXHRAbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA3NjhweCkge1xuXHRcdGRlamEtdGlsZXMge1xuXHRcdFx0Zm9udC1zaXplOiA4MCU7XG5cdFx0fVxuXHR9XG5cdEBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDY0MHB4KSB7XG5cdFx0ZGVqYS10aWxlcyB7XG5cdFx0XHRmb250LXNpemU6IDcwJTtcblx0XHR9XG5cdH1cblx0QG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogMzIwcHgpIHtcblx0XHRkZWphLXRpbGVzIHtcblx0XHRcdGZvbnQtc2l6ZTogNjAlO1xuXHRcdH1cblx0fVxufVxuXG4uZGVqYS10aWxlLWN1cnNvciB7XG5cdC50aWxlLWNvbnRlbnQge1xuXHRcdHdpZHRoOiAxMDAlO1xuXHRcdGhlaWdodDogMTAwJTtcblx0XHRkaXNwbGF5OiBibG9jaztcblx0XHRvcGFjaXR5OiAwLjg7XG5cdH1cbn1cblxuLmNvdW50cnktdGFyZ2V0LWN1cnNvciB7XG5cdC50aWxlLWNvbnRlbnQge1xuXHRcdGJhY2tncm91bmQtY29sb3I6IHNhbmR5YnJvd24gIWltcG9ydGFudDtcblx0XHR3aWR0aDogMTAwJTtcblx0XHRoZWlnaHQ6IDEwMCU7XG5cdFx0ZGlzcGxheTogYmxvY2s7XG5cdFx0b3BhY2l0eTogMC44O1xuXHR9XG59Il19 */"

/***/ }),

/***/ "./src/app/tiles/tiles-demo.ts":
/*!*************************************!*\
  !*** ./src/app/tiles/tiles-demo.ts ***!
  \*************************************/
/*! exports provided: DejaTilesDemoComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DejaTilesDemoComponent", function() { return DejaTilesDemoComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _deja_js_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @deja-js/core */ "./dist/deja-js/core/fesm5/deja-js-core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _services_countries_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../services/countries.service */ "./src/app/services/countries.service.ts");
/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */






var DejaTilesDemoComponent = /** @class */ (function () {
    function DejaTilesDemoComponent(countriesService) {
        this.countriesService = countriesService;
        this.tabIndex = 1;
        this.designMode = false;
        this.message$ = new rxjs__WEBPACK_IMPORTED_MODULE_3__["Subject"]();
        this.messages$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["from"])(this.message$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["scan"])(function (acc, curr) { return acc.concat([curr]); }, []), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["defaultIfEmpty"])([]));
    }
    DejaTilesDemoComponent.prototype.ngOnInit = function () {
        var x1 = 0;
        var y1 = 0;
        var x2 = 0;
        var y2 = 0;
        var tiles$ = this.countriesService.getCountries$().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["switchMap"])(function (countries) { return countries; }));
        this.tiles1$ = tiles$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["take"])(12), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (country) {
            var tile = {
                bounds: new _deja_js_core__WEBPACK_IMPORTED_MODULE_2__["Rect"](x1, y1, 15, 15),
                id: country.code,
                templateModel: country,
            };
            x1 += 15;
            if (x1 + 15 > 100) {
                x1 = 0;
                y1 += 15;
            }
            return tile;
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["reduce"])(function (acc, cur) { return acc.concat([cur]); }, []));
        this.tiles2$ = tiles$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (country) {
            var tile = {
                bounds: new _deja_js_core__WEBPACK_IMPORTED_MODULE_2__["Rect"](x2, y2, 15, 15),
                id: country.code,
                templateModel: country,
            };
            x2 += 15;
            if (x2 + 15 > 100) {
                x2 = 0;
                y2 += 15;
            }
            return tile;
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["reduce"])(function (acc, cur) { return acc.concat([cur]); }, []));
    };
    DejaTilesDemoComponent.prototype.getDragContext = function () {
        var _this = this;
        return {
            target: 'deja-tile',
            className: 'deja-tile-cursor',
            dragStart: function (target) {
                return _this.countriesService.getCountryByCode$(target.id).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (country) {
                    return {
                        country: country,
                        IDejaTile: {
                            id: country.code,
                            type: country.displayName,
                            bounds: new _deja_js_core__WEBPACK_IMPORTED_MODULE_2__["Rect"](0, 0, 15, 15),
                            templateModel: country,
                        },
                    };
                }));
            },
        };
    };
    DejaTilesDemoComponent.prototype.getDropContext = function (dropArea) {
        return {
            dragEnter: function (_dragContext) {
                return {
                    width: 200,
                    height: 60,
                    className: 'country-target-cursor',
                };
            },
            drop: function (dragContext) {
                var country = dragContext.country;
                dropArea.innerText = "The dropped country is " + country.naqme + " - the code is: " + country.code;
            },
        };
    };
    DejaTilesDemoComponent.prototype.onContentAdding = function (event) {
        this.message$.next({
            title: 'Tiles added',
            content: event.added.length + " tiles added.",
            type: 'warn',
            gate: true,
            cancel: function (value) {
                this.gate = false;
                event.cancel$.next(value);
            },
        });
        // Wait for message box validating the added tiles
        event.preventDefault();
    };
    DejaTilesDemoComponent.prototype.onContentRemoving = function (event) {
        this.message$.next({
            title: 'Tiles deleted',
            content: event.removed.length + " tiles deleted.",
            type: 'warn',
            gate: true,
            cancel: function (value) {
                this.gate = false;
                event.cancel$.next(value);
            },
        });
        // Wait for message box answer before destruction of the tiles
        event.preventDefault();
    };
    DejaTilesDemoComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewEncapsulation"].None,
            selector: 'deja-tiles-demo',
            template: __webpack_require__(/*! ./tiles-demo.html */ "./src/app/tiles/tiles-demo.html"),
            styles: [__webpack_require__(/*! ./tiles-demo.scss */ "./src/app/tiles/tiles-demo.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_countries_service__WEBPACK_IMPORTED_MODULE_5__["CountriesService"]])
    ], DejaTilesDemoComponent);
    return DejaTilesDemoComponent;
}());



/***/ })

}]);
//# sourceMappingURL=tiles-tiles-demo-module.js.map