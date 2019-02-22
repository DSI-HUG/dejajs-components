(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["viewport-viewport-demo-module"],{

/***/ "./dist/deja-js/component/fesm5/deja-js-component-viewport.js":
/*!********************************************************************!*\
  !*** ./dist/deja-js/component/fesm5/deja-js-component-viewport.js ***!
  \********************************************************************/
/*! exports provided: DejaViewPortModule, DejaViewPortScrollStyle, DejaViewPortComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DejaViewPortModule", function() { return DejaViewPortModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DejaViewPortScrollStyle", function() { return DejaViewPortScrollStyle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DejaViewPortComponent", function() { return DejaViewPortComponent; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/icon */ "./node_modules/@angular/material/esm5/icon.es5.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _deja_js_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @deja-js/core */ "./dist/deja-js/core/fesm5/deja-js-core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");







/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {number} */
var DejaViewPortScrollStyle = {
    scrollbar: 0,
    buttons: 1,
};
DejaViewPortScrollStyle[DejaViewPortScrollStyle.scrollbar] = 'scrollbar';
DejaViewPortScrollStyle[DejaViewPortScrollStyle.buttons] = 'buttons';
var DejaViewPortComponent = /** @class */ (function () {
    function DejaViewPortComponent(changeDetectorRef, viewPort) {
        var _this = this;
        this.changeDetectorRef = changeDetectorRef;
        this.viewPort = viewPort;
        // Buttons mode only
        this.hasUpButton = false;
        this.hasDownButton = false;
        this._isHorizontal = false;
        this._hasButtons = false;
        this.isAlive = true;
        this.downButton$ = new rxjs__WEBPACK_IMPORTED_MODULE_4__["Subject"]();
        this.upButton$ = new rxjs__WEBPACK_IMPORTED_MODULE_4__["Subject"]();
        this.buttonsStep = 20;
        this.scrollPosition = 0;
        Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["fromEvent"])(window, 'resize').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["takeWhile"])((/**
         * @return {?}
         */
        function () { return _this.isAlive; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["debounceTime"])(5))
            .subscribe((/**
         * @return {?}
         */
        function () {
            _this.viewPort.deleteSizeCache();
            _this.viewPort.refresh();
            _this.changeDetectorRef.markForCheck();
        }));
        viewPort.viewPort$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["takeWhile"])((/**
         * @return {?}
         */
        function () { return _this.isAlive; })))
            .subscribe((/**
         * @param {?} viewPortResult
         * @return {?}
         */
        function (viewPortResult) {
            if (viewPort.mode !== _deja_js_core__WEBPACK_IMPORTED_MODULE_3__["ViewportMode"].disabled) {
                _this.vpItems = (/** @type {?} */ (viewPortResult.visibleItems));
                _this.vpStartIndex = viewPortResult.startIndex;
                _this.vpEndIndex = viewPortResult.endIndex;
            }
            else {
                _this.vpStartIndex = 0;
                _this.vpEndIndex = 0;
            }
            if (_this.hasButtons) {
                _this.startOffset = _this.scrollPos - viewPortResult.beforeSize;
                _this.beforeSize = null;
                _this.afterSize = null;
                _this.hasUpButton = _this.scrollPos > 0;
                _this.hasDownButton = _this.scrollPos + viewPortResult.listSize < viewPortResult.beforeSize + viewPortResult.viewPortSize + viewPortResult.afterSize;
            }
            else {
                _this.startOffset = 0;
                _this.beforeSize = viewPortResult.beforeSize || null;
                _this.afterSize = viewPortResult.afterSize || null;
                _this.hasUpButton = false;
                _this.hasDownButton = false;
            }
            /** @type {?} */
            var scroll = (/**
             * @param {?} vp
             * @return {?}
             */
            function (vp) {
                if (!_this.hasButtons) {
                    if (_this.element) {
                        if (_this._isHorizontal) {
                            _this.element.scrollLeft = vp.scrollPos;
                        }
                        else {
                            _this.element.scrollTop = vp.scrollPos;
                        }
                        _this.scrollPosition = vp.scrollPos;
                    }
                }
                else {
                    _this.scrollPos = vp.scrollPos;
                    _this.startOffset = _this.scrollPos - vp.beforeSize;
                }
                _this.changeDetectorRef.markForCheck();
            });
            if (viewPortResult.scrollPos !== undefined) {
                /** @type {?} */
                var length_1 = 0;
                if (_this.element) {
                    /** @type {?} */
                    var listItems = _this.element.getElementsByClassName('listitem');
                    length_1 = listItems.length;
                }
                /** @type {?} */
                var rebind = length_1 !== viewPortResult.visibleItems.length;
                if (!rebind) {
                    scroll(viewPortResult);
                }
                else {
                    _this.changeDetectorRef.markForCheck();
                    Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["timer"])(1).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["first"])())
                        .subscribe((/**
                     * @return {?}
                     */
                    function () { return scroll(viewPortResult); }));
                }
            }
            else {
                _this.changeDetectorRef.markForCheck();
            }
        }));
        Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["from"])(this.downButton$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["takeWhile"])((/**
         * @return {?}
         */
        function () { return _this.isAlive; })))
            .subscribe((/**
         * @param {?} downButton
         * @return {?}
         */
        function (downButton) {
            if (downButton) {
                if (!_this.mouseWheel$Sub) {
                    _this.mouseWheel$Sub = Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["fromEvent"])(_this.element, 'mousewheel')
                        .subscribe((/**
                     * @param {?} event
                     * @return {?}
                     */
                    function (event) {
                        _this.scrollPos = _this.scrollPos + event.deltaY;
                    }));
                }
            }
            else if (_this.mouseWheel$Sub) {
                _this.mouseWheel$Sub.unsubscribe();
                delete _this.mouseWheel$Sub;
                _this.scrollPos = 0;
            }
        }));
        /** @type {?} */
        var downButton$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["from"])(this.downButton$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["takeWhile"])((/**
         * @return {?}
         */
        function () { return _this.isAlive; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["map"])((/**
         * @param {?} downButton
         * @return {?}
         */
        function (downButton) {
            if (downButton) {
                if (!_this.downButton$Sub) {
                    /** @type {?} */
                    var mousedown$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["fromEvent"])(downButton, 'mousedown');
                    /** @type {?} */
                    var mouseup$_1 = Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["merge"])(Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["fromEvent"])(downButton, 'mouseup'), Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["fromEvent"])(downButton, 'mouseleave'));
                    _this.downButton$Sub = mousedown$.subscribe((/**
                     * @param {?} event
                     * @return {?}
                     */
                    function (event) {
                        mouseup$_1.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["first"])())
                            .subscribe((/**
                         * @param {?} upEvent
                         * @return {?}
                         */
                        function (upEvent) {
                            _this.scrollPos += upEvent.ctrlKey ? _this.clientSize : _this.buttonsStep;
                        }));
                        Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["timer"])(750).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["takeUntil"])(mouseup$_1))
                            .subscribe((/**
                         * @return {?}
                         */
                        function () {
                            Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["interval"])(50).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["takeUntil"])(mouseup$_1))
                                .subscribe((/**
                             * @return {?}
                             */
                            function () {
                                _this.scrollPos += event.ctrlKey ? _this.clientSize : _this.buttonsStep * 2;
                            }));
                        }));
                    }));
                    return true;
                }
            }
            else if (_this.downButton$Sub) {
                _this.downButton$Sub.unsubscribe();
                delete _this.downButton$Sub;
                return true;
            }
            return false;
        })));
        /** @type {?} */
        var upButton$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["from"])(this.upButton$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["takeWhile"])((/**
         * @return {?}
         */
        function () { return _this.isAlive; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["map"])((/**
         * @param {?} upButton
         * @return {?}
         */
        function (upButton) {
            if (upButton) {
                if (!_this.upButton$Sub) {
                    /** @type {?} */
                    var mousedown$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["fromEvent"])(upButton, 'mousedown');
                    /** @type {?} */
                    var mouseup$_2 = Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["merge"])(Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["fromEvent"])(upButton, 'mouseup'), Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["fromEvent"])(upButton, 'mouseleave'));
                    _this.upButton$Sub = mousedown$.subscribe((/**
                     * @param {?} event
                     * @return {?}
                     */
                    function (event) {
                        mouseup$_2.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["first"])())
                            .subscribe((/**
                         * @param {?} upEvent
                         * @return {?}
                         */
                        function (upEvent) {
                            _this.scrollPos -= upEvent.ctrlKey ? _this.clientSize : _this.buttonsStep;
                        }));
                        Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["timer"])(750).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["takeUntil"])(mouseup$_2))
                            .subscribe((/**
                         * @return {?}
                         */
                        function () {
                            Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["interval"])(50).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["takeUntil"])(mouseup$_2))
                                .subscribe((/**
                             * @return {?}
                             */
                            function () {
                                _this.scrollPos -= event.ctrlKey ? _this.clientSize : _this.buttonsStep * 2;
                            }));
                        }));
                    }));
                    return true;
                }
            }
            else if (_this.upButton$Sub) {
                _this.upButton$Sub.unsubscribe();
                delete _this.upButton$Sub;
                return true;
            }
            return false;
        })));
        Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["merge"])(downButton$, upButton$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["delay"])(10))
            .subscribe((/**
         * @param {?} needToRefresh
         * @return {?}
         */
        function (needToRefresh) {
            if (needToRefresh) {
                _this.viewPort.refresh();
            }
        }));
    }
    Object.defineProperty(DejaViewPortComponent.prototype, "hasButtons", {
        get: /**
         * @return {?}
         */
        function () {
            return this._hasButtons;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaViewPortComponent.prototype, "isHorizontal", {
        get: /**
         * @return {?}
         */
        function () {
            return this._isHorizontal;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaViewPortComponent.prototype, "downButton", {
        set: /**
         * @param {?} element
         * @return {?}
         */
        function (element) {
            this.downButton$.next((element && element.nativeElement) || null);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaViewPortComponent.prototype, "upButton", {
        set: /**
         * @param {?} element
         * @return {?}
         */
        function (element) {
            this.upButton$.next((element && element.nativeElement) || null);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaViewPortComponent.prototype, "models", {
        /** Set the list of models to render inside the viewport control */
        set: /**
         * Set the list of models to render inside the viewport control
         * @param {?} models
         * @return {?}
         */
        function (models) {
            this.items = models ? models.map((/**
             * @param {?} model
             * @return {?}
             */
            function (model) { return ((/** @type {?} */ ({
                model: model,
            }))); })) : [];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaViewPortComponent.prototype, "items", {
        /** Set the list of items to render inside the viewport control */
        set: /**
         * Set the list of items to render inside the viewport control
         * @param {?} items
         * @return {?}
         */
        function (items) {
            this._items = items || [];
            if (this.viewPort.mode === _deja_js_core__WEBPACK_IMPORTED_MODULE_3__["ViewportMode"].disabled) {
                this.vpItems = this._items;
            }
            this.viewPort.items$.next(this._items);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaViewPortComponent.prototype, "scrollingStyle", {
        /** Set the scrolling style
          * scrollbar: Classic scrollbars
          * buttons: A button before is placed at the top or at the left of the list, and a button after is placed at the right or the bottom of the list.
          */
        set: /**
         * Set the scrolling style
         * scrollbar: Classic scrollbars
         * buttons: A button before is placed at the top or at the left of the list, and a button after is placed at the right or the bottom of the list.
         * @param {?} value
         * @return {?}
         */
        function (value) {
            /** @type {?} */
            var scrollingStyle = typeof value === 'string' ? DejaViewPortScrollStyle[(/** @type {?} */ (value))] : value;
            this._hasButtons = scrollingStyle === DejaViewPortScrollStyle.buttons;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaViewPortComponent.prototype, "direction", {
        /** Set the direction of the items rendering
         * vertical: The item are displayed vertically
         * horizontal: The item are displayed horizontally
         */
        set: /**
         * Set the direction of the items rendering
         * vertical: The item are displayed vertically
         * horizontal: The item are displayed horizontally
         * @param {?} value
         * @return {?}
         */
        function (value) {
            /** @type {?} */
            var direction = typeof value === 'string' ? _deja_js_core__WEBPACK_IMPORTED_MODULE_3__["ViewportDirection"][(/** @type {?} */ (value))] : value;
            this.viewPort.direction$.next(direction);
            this._isHorizontal = direction === _deja_js_core__WEBPACK_IMPORTED_MODULE_3__["ViewportDirection"].horizontal;
            this.changeDetectorRef.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaViewPortComponent.prototype, "itemSize", {
        get: /**
         * @return {?}
         */
        function () {
            return this.viewPort.itemsSize;
        },
        /** Set the item size in fixed mode or the default item size before rendering in auto mode */
        set: /**
         * Set the item size in fixed mode or the default item size before rendering in auto mode
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value) {
                this.viewPort.itemsSize$.next(+value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaViewPortComponent.prototype, "wrapperElement", {
        set: /**
         * @param {?} element
         * @return {?}
         */
        function (element) {
            var _this = this;
            this.element = (/** @type {?} */ (element.nativeElement));
            this.viewPort.element$.next(this.element);
            Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["fromEvent"])(this.element, 'scroll').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["takeWhile"])((/**
             * @return {?}
             */
            function () { return _this.isAlive; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["map"])((/**
             * @param {?} event
             * @return {?}
             */
            function (event) { return (/** @type {?} */ (event.target)); })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["map"])((/**
             * @param {?} target
             * @return {?}
             */
            function (target) { return Math.round(_this._isHorizontal ? target.scrollLeft : target.scrollTop); })))
                .subscribe((/**
             * @param {?} scrollPos
             * @return {?}
             */
            function (scrollPos) {
                _this.viewPort.scrollPosition$.next(scrollPos);
            }));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaViewPortComponent.prototype, "itemTemplate", {
        get: /**
         * @return {?}
         */
        function () { return this.itemTemplateExternal || this.itemTemplateInternal; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaViewPortComponent.prototype, "clientSize", {
        get: /**
         * @private
         * @return {?}
         */
        function () {
            if (!this.element) {
                return 0;
            }
            return this._isHorizontal ? this.element.clientWidth : this.element.clientHeight;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaViewPortComponent.prototype, "scrollPos", {
        get: /**
         * @private
         * @return {?}
         */
        function () {
            return this.scrollPosition;
        },
        set: /**
         * @private
         * @param {?} value
         * @return {?}
         */
        function (value) {
            /** @type {?} */
            var scrollPos = Math.max(value, 0);
            this.scrollPosition = scrollPos;
            this.viewPort.scrollPosition$.next(scrollPos);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaViewPortComponent.prototype, "viewportMode", {
        get: /**
         * @return {?}
         */
        function () {
            return this.viewPort.mode;
        },
        /**
         * Définit la méthode de calcul de la taille des éléments. Les valuers acceptées sont
         * disabled: Tous les éléments sont rendus. (< 100 éléments)
         * fixed: Seul les éléments visibles sont rendus. La taille des éléments est constante et définie par itemsSize. (performances ++)
         * variable: Seul les éléments visibles sont rendus. La taille des éléments est variable et définie par item.size. (performances +-)
         * auto: Seul les éléments visibles sont rendus. La taille des éléments est calculée automatiquement (performances --)
         */
        set: /**
         * Définit la méthode de calcul de la taille des éléments. Les valuers acceptées sont
         * disabled: Tous les éléments sont rendus. (< 100 éléments)
         * fixed: Seul les éléments visibles sont rendus. La taille des éléments est constante et définie par itemsSize. (performances ++)
         * variable: Seul les éléments visibles sont rendus. La taille des éléments est variable et définie par item.size. (performances +-)
         * auto: Seul les éléments visibles sont rendus. La taille des éléments est calculée automatiquement (performances --)
         * @param {?} mode
         * @return {?}
         */
        function (mode) {
            this.viewPort.mode$.next(mode);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DejaViewPortComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.isAlive = false;
        if (this.downButton$Sub) {
            this.downButton$Sub.unsubscribe();
        }
        if (this.upButton$Sub) {
            this.upButton$Sub.unsubscribe();
        }
        if (this.mouseWheel$Sub) {
            this.mouseWheel$Sub.unsubscribe();
        }
    };
    /**
     * @return {?}
     */
    DejaViewPortComponent.prototype.refresh = /**
     * @return {?}
     */
    function () {
        this.changeDetectorRef.markForCheck();
    };
    /** Recalcule le viewport. */
    /**
     * Recalcule le viewport.
     * @param {?=} item
     * @param {?=} clearMeasuredHeight
     * @return {?}
     */
    DejaViewPortComponent.prototype.refreshViewPort = /**
     * Recalcule le viewport.
     * @param {?=} item
     * @param {?=} clearMeasuredHeight
     * @return {?}
     */
    function (item, clearMeasuredHeight) {
        /** @type {?} */
        var refreshParams = (/** @type {?} */ ({}));
        if (item) {
            refreshParams.items = [item];
        }
        if (clearMeasuredHeight) {
            refreshParams.clearMeasuredSize = clearMeasuredHeight;
        }
        this.viewPort.refresh(refreshParams);
        this.changeDetectorRef.markForCheck();
    };
    /**
     * @param {?} item
     * @return {?}
     */
    DejaViewPortComponent.prototype.ensureVisible = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        this.viewPort.ensureItem$.next(item);
    };
    /**
     * @param {?} item
     * @return {?}
     */
    DejaViewPortComponent.prototype.getCssSize = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        /** @type {?} */
        var itemSize = this.getItemSize(item);
        return itemSize ? itemSize + "px" : 'auto';
    };
    /**
     * @param {?} item
     * @return {?}
     */
    DejaViewPortComponent.prototype.getItemSize = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        if (this.viewPort.mode === _deja_js_core__WEBPACK_IMPORTED_MODULE_3__["ViewportMode"].disabled) {
            return null;
        }
        else if (this.viewPort.mode === _deja_js_core__WEBPACK_IMPORTED_MODULE_3__["ViewportMode"].fixed) {
            return this.itemSize;
        }
        else if (this.viewPort.mode === _deja_js_core__WEBPACK_IMPORTED_MODULE_3__["ViewportMode"].auto) {
            return item.size || null;
        }
        else {
            return (item.size && item.size > _deja_js_core__WEBPACK_IMPORTED_MODULE_3__["ViewPortService"].itemDefaultSize) ? item.size : this.itemSize;
        }
    };
    DejaViewPortComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"], args: [{
                    changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_2__["ChangeDetectionStrategy"].OnPush,
                    providers: [_deja_js_core__WEBPACK_IMPORTED_MODULE_3__["ViewPortService"]],
                    selector: 'deja-viewport',
                    template: "<div #up id=\"up\" *ngIf=\"hasButtons\"><mat-icon>keyboard_arrow_up</mat-icon></div>\n<div #wrapper id=\"viewport-wrapper\">\n\t<ng-container *ngIf=\"!isHorizontal\">\n\t\t<div *ngIf=\"beforeSize\" [style.height.px]=\"beforeSize\"></div>\n\t\t<div class=\"listitem\" *ngFor=\"let item of vpItems; let index = index\" [attr.flat]=\"vpStartIndex + index\" [style.height]=\"getCssSize(item)\" [style.margin-top.px]=\"startOffset && index === 0 ? -startOffset : null\">\n\t\t\t<ng-template [ngTemplateOutlet]=\"itemTemplate\" [ngTemplateOutletContext]=\"{ $implicit: item, index: vpStartIndex + index, size: getItemSize(item), model: item.model }\"></ng-template>\n\t\t</div>\n\t\t<div *ngIf=\"afterSize\" [style.height.px]=\"afterSize\"></div>\n\t</ng-container>\n\t<ng-container *ngIf=\"isHorizontal\">\n\t\t<div *ngIf=\"beforeSize\" [style.flex-basis.px]=\"beforeSize\"></div>\n\t\t<div class=\"listitem\" *ngFor=\"let item of vpItems; let index = index\" [attr.flat]=\"vpStartIndex + index\" [style.flex-basis]=\"getCssSize(item)\" [style.margin-left.px]=\"startOffset && index === 0 ? -startOffset : null\">\n\t\t\t<ng-template [ngTemplateOutlet]=\"itemTemplate\" [ngTemplateOutletContext]=\"{ $implicit: item, index: vpStartIndex + index, size: getItemSize(item), model: item.model }\"></ng-template>\n\t\t</div>\n\t\t<div *ngIf=\"afterSize\" [style.flex-basis.px]=\"afterSize\"></div>\n\t</ng-container>\n</div>\n<div #down id=\"down\" *ngIf=\"hasButtons\"><mat-icon>keyboard_arrow_down</mat-icon></div>",
                    styles: [":host{position:relative;display:flex;flex-direction:row;overflow:hidden}:host[hasUpBtn=false] #up{visibility:hidden}:host[hasDownBtn=false] #down{visibility:hidden}:host[buttons=false][horizontal=false] #viewport-wrapper{width:100%;overflow-y:auto}:host[buttons=false][horizontal=true] #viewport-wrapper{height:100%;overflow-x:auto}:host[buttons=true][horizontal=false]{flex-direction:column}:host #viewport-wrapper{position:relative;flex-grow:1;overflow:hidden}:host #viewport-wrapper>div{padding:0;margin:0}:host #down,:host #up{flex:0 0 auto;display:flex;justify-content:space-around;align-items:center;font-size:120%;cursor:pointer;z-index:1}:host[horizontal=false] #viewport-wrapper>div{width:100%}:host[horizontal=false] #down,:host[horizontal=false] #up{padding:.15rem 0}:host[horizontal=true] #viewport-wrapper{display:flex;justify-content:flex-start;align-items:stretch;flex-direction:row}:host[horizontal=true] #viewport-wrapper>div{height:100%;overflow:hidden;flex-grow:0;flex-shrink:0}:host[horizontal=true] #down,:host[horizontal=true] #up{padding:0 .15rem}:host[horizontal=true] #down .mat-icon,:host[horizontal=true] #up .mat-icon{-webkit-transform:rotate(270Deg);transform:rotate(270Deg)}"]
                }] }
    ];
    /** @nocollapse */
    DejaViewPortComponent.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["ChangeDetectorRef"] },
        { type: _deja_js_core__WEBPACK_IMPORTED_MODULE_3__["ViewPortService"] }
    ]; };
    DejaViewPortComponent.propDecorators = {
        hasUpButton: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["HostBinding"], args: ['attr.hasUpBtn',] }],
        hasDownButton: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["HostBinding"], args: ['attr.hasDownBtn',] }],
        _isHorizontal: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["HostBinding"], args: ['attr.horizontal',] }],
        _hasButtons: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["HostBinding"], args: ['attr.buttons',] }],
        itemTemplateExternal: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"] }],
        itemTemplateInternal: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["ContentChild"], args: ['itemTemplate',] }],
        downButton: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["ViewChild"], args: ['down',] }],
        upButton: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["ViewChild"], args: ['up',] }],
        models: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"] }],
        items: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"] }],
        scrollingStyle: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"] }],
        direction: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"] }],
        itemSize: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"] }],
        wrapperElement: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["ViewChild"], args: ['wrapper',] }],
        viewportMode: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"] }]
    };
    return DejaViewPortComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var DejaViewPortModule = /** @class */ (function () {
    function DejaViewPortModule() {
    }
    DejaViewPortModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"], args: [{
                    declarations: [
                        DejaViewPortComponent,
                    ],
                    exports: [
                        DejaViewPortComponent,
                    ],
                    imports: [
                        _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
                        _angular_material_icon__WEBPACK_IMPORTED_MODULE_1__["MatIconModule"],
                    ],
                },] }
    ];
    return DejaViewPortModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */



//# sourceMappingURL=deja-js-component-viewport.js.map

/***/ }),

/***/ "./src/app/viewport/viewport-demo.html":
/*!*********************************************!*\
  !*** ./src/app/viewport/viewport-demo.html ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-tab-group [selectedIndex]=\"tabIndex\" (selectedTabChange)=\"tabIndex = $event.index\">\n\t<!--<mat-tab label=\"OVERVIEW\">-->\n\t<!--<mat-card class=\"demo-card demo-basic\">-->\n\t<!--TODO-->\n\t<!--</mat-card>-->\n\t<!--</mat-tab>-->\n\t<mat-tab label=\"API REFERENCE\"> </mat-tab>\n\t<mat-tab label=\"EXAMPLES\"> </mat-tab>\n</mat-tab-group>\n\n<mat-card class=\"demo-card demo-basic\" *ngIf=\"tabIndex === 0\">\n\t<deja-markdown [url]=\"'https://raw.githubusercontent.com/DSI-HUG/dejajs-components/dev/src/component/viewport/readme.md'\"></deja-markdown>\n</mat-card>\n\n<mat-card class=\"demo-card demo-basic\" *ngIf=\"tabIndex === 1\">\n\t<mat-toolbar color=\"primary\">Viewport</mat-toolbar>\n\t<mat-card-content id=\"viewPortContainer\">\n\t\tSample with a big list of more than 3000 templates. Rendering can be horizontal or vertical. Only the visible templates are created on the dom. In this example, the size of the template is automatically calculated on the rendering, and the scroll bar is adapted during the scolling. This is the worst case for perfomances.\n\t\t<div fxLayout=\"row\" fxLayoutAlign=\"start center\" fxLayoutGap=\"3rem\">\n\t\t\t<mat-checkbox [(ngModel)]=\"isHorizontal\">Horizontal</mat-checkbox>\n\t\t\t<mat-checkbox [(ngModel)]=\"hasButtons\">Buttons Scrolling (Tips: press ctrl to increase the step)</mat-checkbox>\n\t\t\t<span fxLayout=\"row\" fxLayoutAlign=\"start center\" fxLayoutGap=\"1rem\">\n\t\t\t\t<span>Ensure index:</span>\n\t\t\t\t<mat-form-field fxFlex=\"0 0 3rem\">\n\t\t\t\t\t<input matInput type=\"number\" [(ngModel)]=\"ensureIndex\" autocomplete=\"off\">\n\t\t\t\t</mat-form-field>\n\t\t\t\t<button type=\"button\" mat-button (click)=\"viewport.ensureVisible(ensureIndex)\">Go</button>\n\t\t\t</span>\n\t\t</div>\n\t\t<deja-viewport #viewport [models]=\"news$ | async\" viewportMode=\"auto\" [direction]=\"isHorizontal ? 'horizontal': 'vertical'\" [scrollingStyle]=\"hasButtons ? 'buttons' : 'scrollbar'\">\n\t\t\t<ng-template #itemTemplate let-item let-size=\"size\">\n\t\t\t\t<news-card [item]=\"item.model\" (imageLoaded)=\"imageLoaded(item)\"></news-card>\n\t\t\t</ng-template>\n\t\t</deja-viewport>\n\t</mat-card-content>\n</mat-card>"

/***/ }),

/***/ "./src/app/viewport/viewport-demo.module.ts":
/*!**************************************************!*\
  !*** ./src/app/viewport/viewport-demo.module.ts ***!
  \**************************************************/
/*! exports provided: DejaViewPortDemoModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DejaViewPortDemoModule", function() { return DejaViewPortDemoModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/flex-layout */ "./node_modules/@angular/flex-layout/esm5/flex-layout.es5.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/card */ "./node_modules/@angular/material/esm5/card.es5.js");
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/toolbar */ "./node_modules/@angular/material/esm5/toolbar.es5.js");
/* harmony import */ var _deja_js_component_viewport__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @deja-js/component/viewport */ "./dist/deja-js/component/fesm5/deja-js-component-viewport.js");
/* harmony import */ var _component_markdown_index__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../component/markdown/index */ "./src/component/markdown/index.ts");
/* harmony import */ var _common_news_card_module__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../common/news-card.module */ "./src/app/common/news-card.module.ts");
/* harmony import */ var _viewport_demo__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./viewport-demo */ "./src/app/viewport/viewport-demo.ts");
/* harmony import */ var _viewport_demo_routes__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./viewport-demo.routes */ "./src/app/viewport/viewport-demo.routes.ts");
/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */













var DejaViewPortDemoModule = /** @class */ (function () {
    function DejaViewPortDemoModule() {
    }
    DejaViewPortDemoModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [_viewport_demo__WEBPACK_IMPORTED_MODULE_11__["DejaViewPortDemoComponent"]],
            exports: [_viewport_demo__WEBPACK_IMPORTED_MODULE_11__["DejaViewPortDemoComponent"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"],
                _angular_flex_layout__WEBPACK_IMPORTED_MODULE_3__["FlexLayoutModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatInputModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatButtonModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatCheckboxModule"],
                _angular_material_card__WEBPACK_IMPORTED_MODULE_6__["MatCardModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatTabsModule"],
                _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_7__["MatToolbarModule"],
                _deja_js_component_viewport__WEBPACK_IMPORTED_MODULE_8__["DejaViewPortModule"],
                _component_markdown_index__WEBPACK_IMPORTED_MODULE_9__["DejaMarkdownModule"],
                _common_news_card_module__WEBPACK_IMPORTED_MODULE_10__["NewsCardModule"],
                _viewport_demo_routes__WEBPACK_IMPORTED_MODULE_12__["routing"],
            ],
            providers: [],
        })
    ], DejaViewPortDemoModule);
    return DejaViewPortDemoModule;
}());



/***/ }),

/***/ "./src/app/viewport/viewport-demo.routes.ts":
/*!**************************************************!*\
  !*** ./src/app/viewport/viewport-demo.routes.ts ***!
  \**************************************************/
/*! exports provided: routing */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "routing", function() { return routing; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _viewport_demo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./viewport-demo */ "./src/app/viewport/viewport-demo.ts");
/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */


var routes = [
    { path: '', component: _viewport_demo__WEBPACK_IMPORTED_MODULE_1__["DejaViewPortDemoComponent"] },
    { path: '**', redirectTo: '', pathMatch: 'full' },
];
var routing = _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forChild(routes);


/***/ }),

/***/ "./src/app/viewport/viewport-demo.scss":
/*!*********************************************!*\
  !*** ./src/app/viewport/viewport-demo.scss ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host deja-viewport {\n  margin-top: 1rem; }\n  :host deja-viewport[horizontal=\"false\"] {\n    height: calc(100vh - 380px); }\n  :host deja-viewport[horizontal=\"false\"] .listitem {\n      box-shadow: inset 1px 0 0 #aaa, inset -1px 0 0 #aaa, inset 0 -1px 0 #aaa; }\n  :host deja-viewport[horizontal=\"false\"] .listitem:first-child {\n        box-shadow: inset 1px 0 0 #aaa, inset -1px 0 0 #aaa, inset 0 -1px 0 #aaa, inset 0 1px 0 #aaa; }\n  :host deja-viewport[horizontal=\"true\"] {\n    height: 25rem; }\n  :host deja-viewport[horizontal=\"true\"] .listitem {\n      box-shadow: inset -1px 0 0 #aaa, inset 0 -1px 0 #aaa, inset 0 1px 0 #aaa; }\n  :host deja-viewport[horizontal=\"true\"] .listitem:first-child {\n        box-shadow: inset 1px 0 0 #aaa, inset -1px 0 0 #aaa, inset 0 -1px 0 #aaa, inset 0 1px 0 #aaa; }\n  :host deja-viewport[horizontal=\"true\"] .listitem .news {\n        max-width: 45rem;\n        display: block; }\n  :host deja-viewport[horizontal=\"true\"] .listitem .news .logo {\n          max-width: 20rem !important; }\n  :host deja-viewport[horizontal=\"true\"] .listitem .news .text {\n          flex: 0 1 25rem !important; }\n  :host deja-viewport[horizontal=\"true\"] .listitem .news .text .footer {\n            flex-direction: column !important; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3RyYXZpcy9idWlsZC9EU0ktSFVHL2RlamFqcy1jb21wb25lbnRzL3NyYy9hcHAvdmlld3BvcnQvdmlld3BvcnQtZGVtby5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBRVEsZ0JBQWdCLEVBQUE7RUFGeEI7SUFJWSwyQkFBMkIsRUFBQTtFQUp2QztNQU1nQix3RUFBd0UsRUFBQTtFQU54RjtRQVFvQiw0RkFBNEYsRUFBQTtFQVJoSDtJQWFZLGFBQWEsRUFBQTtFQWJ6QjtNQWVnQix3RUFBd0UsRUFBQTtFQWZ4RjtRQWlCb0IsNEZBQTRGLEVBQUE7RUFqQmhIO1FBb0JvQixnQkFBZ0I7UUFDaEIsY0FBYyxFQUFBO0VBckJsQztVQXVCd0IsMkJBQTJCLEVBQUE7RUF2Qm5EO1VBMEJ3QiwwQkFBMEIsRUFBQTtFQTFCbEQ7WUE0QjRCLGlDQUFpQyxFQUFBIiwiZmlsZSI6InNyYy9hcHAvdmlld3BvcnQvdmlld3BvcnQtZGVtby5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiOmhvc3Qge1xuICAgIGRlamEtdmlld3BvcnQge1xuICAgICAgICBtYXJnaW4tdG9wOiAxcmVtO1xuICAgICAgICAmW2hvcml6b250YWw9XCJmYWxzZVwiXSB7XG4gICAgICAgICAgICBoZWlnaHQ6IGNhbGMoMTAwdmggLSAzODBweCk7XG4gICAgICAgICAgICAubGlzdGl0ZW0ge1xuICAgICAgICAgICAgICAgIGJveC1zaGFkb3c6IGluc2V0IDFweCAwIDAgI2FhYSwgaW5zZXQgLTFweCAwIDAgI2FhYSwgaW5zZXQgMCAtMXB4IDAgI2FhYTtcbiAgICAgICAgICAgICAgICAmOmZpcnN0LWNoaWxkIHtcbiAgICAgICAgICAgICAgICAgICAgYm94LXNoYWRvdzogaW5zZXQgMXB4IDAgMCAjYWFhLCBpbnNldCAtMXB4IDAgMCAjYWFhLCBpbnNldCAwIC0xcHggMCAjYWFhLCBpbnNldCAwIDFweCAwICNhYWE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgICZbaG9yaXpvbnRhbD1cInRydWVcIl0ge1xuICAgICAgICAgICAgaGVpZ2h0OiAyNXJlbTtcbiAgICAgICAgICAgIC5saXN0aXRlbSB7XG4gICAgICAgICAgICAgICAgYm94LXNoYWRvdzogaW5zZXQgLTFweCAwIDAgI2FhYSwgaW5zZXQgMCAtMXB4IDAgI2FhYSwgaW5zZXQgMCAxcHggMCAjYWFhO1xuICAgICAgICAgICAgICAgICY6Zmlyc3QtY2hpbGQge1xuICAgICAgICAgICAgICAgICAgICBib3gtc2hhZG93OiBpbnNldCAxcHggMCAwICNhYWEsIGluc2V0IC0xcHggMCAwICNhYWEsIGluc2V0IDAgLTFweCAwICNhYWEsIGluc2V0IDAgMXB4IDAgI2FhYTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLm5ld3Mge1xuICAgICAgICAgICAgICAgICAgICBtYXgtd2lkdGg6IDQ1cmVtO1xuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgICAgICAgICAgICAgLmxvZ28ge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWF4LXdpZHRoOiAyMHJlbSAhaW1wb3J0YW50O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC50ZXh0IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZsZXg6IDAgMSAyNXJlbSAhaW1wb3J0YW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgLmZvb3RlciB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbiAhaW1wb3J0YW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufSJdfQ== */"

/***/ }),

/***/ "./src/app/viewport/viewport-demo.ts":
/*!*******************************************!*\
  !*** ./src/app/viewport/viewport-demo.ts ***!
  \*******************************************/
/*! exports provided: DejaViewPortDemoComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DejaViewPortDemoComponent", function() { return DejaViewPortDemoComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _deja_js_component_viewport__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @deja-js/component/viewport */ "./dist/deja-js/component/fesm5/deja-js-component-viewport.js");
/* harmony import */ var _services_news_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/news.service */ "./src/app/services/news.service.ts");
/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */




var DejaViewPortDemoComponent = /** @class */ (function () {
    function DejaViewPortDemoComponent(newsService) {
        this.tabIndex = 1;
        this.isHorizontal = false;
        this.hasButtons = false;
        this.exampleValue = "\n    <deja-viewport [models]=\"news$ | async\" itemSize=\"120\">\n        <ng-template #itemTemplate let-item>\n            <div *ngIf=\"item\" class=\"news\" [attr.id]=\"id\">\n                <img [attr.src]=\"item.urlsToLogos.medium\" class=\"logo\">\n                <span class=\"text\">\n                    <span class=\"name\">{{ item.name }}</span>\n                    <span class=\"description\">{{ item.description }}</span>\n                    <div class=\"footer\">\n                        <a class=\"url\" [attr.href]=\"item.url\">{{ item.url }}</a>\n                        <span class=\"category\">{{ item.category }}</span>\n                        <span class=\"country\">{{ item.country }}</span>\n                        <span class=\"language\">{{ item.language }}</span>\n                    </div>\n                </span>\n            </div>\n        </ng-template>\n    </deja-viewport>";
        this.news$ = newsService.getNews$(50);
    }
    DejaViewPortDemoComponent.prototype.imageLoaded = function (item) {
        var itemExt = item;
        if (!itemExt.loaded) {
            itemExt.loaded = true;
            this.viewport.refreshViewPort(itemExt);
        }
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('viewport'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _deja_js_component_viewport__WEBPACK_IMPORTED_MODULE_2__["DejaViewPortComponent"])
    ], DejaViewPortDemoComponent.prototype, "viewport", void 0);
    DejaViewPortDemoComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'deja-viewport-demo',
            template: __webpack_require__(/*! ./viewport-demo.html */ "./src/app/viewport/viewport-demo.html"),
            styles: [__webpack_require__(/*! ./viewport-demo.scss */ "./src/app/viewport/viewport-demo.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_news_service__WEBPACK_IMPORTED_MODULE_3__["NewsService"]])
    ], DejaViewPortDemoComponent);
    return DejaViewPortDemoComponent;
}());



/***/ })

}]);
//# sourceMappingURL=viewport-viewport-demo-module.js.map