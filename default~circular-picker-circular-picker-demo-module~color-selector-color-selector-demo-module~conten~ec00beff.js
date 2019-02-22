(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~circular-picker-circular-picker-demo-module~color-selector-color-selector-demo-module~conten~ec00beff"],{

/***/ "./dist/deja-js/component/fesm5/deja-js-component-mouse-dragdrop.js":
/*!**************************************************************************!*\
  !*** ./dist/deja-js/component/fesm5/deja-js-component-mouse-dragdrop.js ***!
  \**************************************************************************/
/*! exports provided: DejaMouseDragDropModule, DejaMouseDragDropService, DejaMouseDraggableDirective, DejaMouseDroppableDirective, DejaMouseDragDropCursorComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DejaMouseDragDropModule", function() { return DejaMouseDragDropModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DejaMouseDragDropService", function() { return DejaMouseDragDropService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DejaMouseDraggableDirective", function() { return DejaMouseDraggableDirective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DejaMouseDroppableDirective", function() { return DejaMouseDroppableDirective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DejaMouseDragDropCursorComponent", function() { return DejaMouseDragDropCursorComponent; });
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _deja_js_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @deja-js/core */ "./dist/deja-js/core/fesm5/deja-js-core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");






/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var DejaMouseDragDropService = /** @class */ (function () {
    function DejaMouseDragDropService() {
        var _this = this;
        this._context = (/** @type {?} */ ({}));
        this._isDragging = false;
        this.dragCursor$ = new rxjs__WEBPACK_IMPORTED_MODULE_3__["BehaviorSubject"](undefined);
        this.dropCursor$ = new rxjs__WEBPACK_IMPORTED_MODULE_3__["Subject"]();
        this.dragging$ = new rxjs__WEBPACK_IMPORTED_MODULE_3__["BehaviorSubject"](false);
        this.dragging$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])((/**
         * @param {?} value
         * @return {?}
         */
        function (value) { return _this._isDragging = value; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["filter"])((/**
         * @param {?} value
         * @return {?}
         */
        function (value) { return !value; })))
            .subscribe((/**
         * @return {?}
         */
        function () { return _this._context = {}; }));
    }
    Object.defineProperty(DejaMouseDragDropService.prototype, "isDragging", {
        get: /**
         * @return {?}
         */
        function () {
            return this._isDragging;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaMouseDragDropService.prototype, "context", {
        get: /**
         * @return {?}
         */
        function () {
            return this._context;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._context = value;
        },
        enumerable: true,
        configurable: true
    });
    DejaMouseDragDropService.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"] }
    ];
    /** @nocollapse */
    DejaMouseDragDropService.ctorParameters = function () { return []; };
    return DejaMouseDragDropService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var DejaMouseDragDropCursorComponent = /** @class */ (function () {
    function DejaMouseDragDropCursorComponent(elementRef, dragDropService) {
        var _this = this;
        this.dragDropService = dragDropService;
        this.position$ = new rxjs__WEBPACK_IMPORTED_MODULE_3__["BehaviorSubject"](undefined);
        this.cursor$ = new rxjs__WEBPACK_IMPORTED_MODULE_3__["BehaviorSubject"](undefined);
        this.isAlive = true;
        /** @type {?} */
        var element = (/** @type {?} */ (elementRef.nativeElement));
        Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["from"])(this.position$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["takeWhile"])((/**
         * @return {?}
         */
        function () { return _this.isAlive; })))
            .subscribe((/**
         * @param {?} pos
         * @return {?}
         */
        function (pos) {
            element.style.left = pos ? pos.left + "px" : '-1000px';
            element.style.top = pos ? pos.top + "px" : '-1000px';
        }));
        /** @type {?} */
        var cursor$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["from"])(this.cursor$);
        // Hide
        cursor$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["takeWhile"])((/**
         * @return {?}
         */
        function () { return _this.isAlive; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["filter"])((/**
         * @param {?} dragCursor
         * @return {?}
         */
        function (dragCursor) { return !dragCursor; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])((/**
         * @param {?} dragCursor
         * @return {?}
         */
        function (dragCursor) {
            if (_this._currentCursor && _this.contentElement && _this.iconElement) {
                _this.contentElement.style.opacity = '0';
                _this.iconElement.style.opacity = '0';
            }
            _this._currentCursor = dragCursor;
        })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["delay"])(300))
            .subscribe((/**
         * @return {?}
         */
        function () {
            _this.position$.next(null);
            element.style.display = 'none';
        }));
        // Show
        cursor$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["takeWhile"])((/**
         * @return {?}
         */
        function () { return _this.isAlive; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["filter"])((/**
         * @param {?} dragCursor
         * @return {?}
         */
        function (dragCursor) { return !!dragCursor; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])((/**
         * @param {?} dragCursor
         * @return {?}
         */
        function (dragCursor) {
            element.style.display = '';
            if (_this.contentElement && _this.iconElement) {
                _this.contentElement.style.opacity = '0';
                _this.iconElement.style.opacity = '0';
            }
            _this._currentCursor = dragCursor;
        })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["filter"])((/**
         * @param {?} dragCursor
         * @return {?}
         */
        function (dragCursor) { return !dragCursor.className || dragCursor.className !== 'hidden'; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])((/**
         * @param {?} dragCursor
         * @return {?}
         */
        function (dragCursor) {
            if (!!dragCursor.html) {
                element.className = dragCursor.className;
                if (_this.contentElement && _this.iconElement) {
                    _this.contentElement.innerHTML = dragCursor.html;
                    _this.contentElement.style.width = (dragCursor.width || 48) + "px";
                    _this.contentElement.style.height = (dragCursor.height || 48) + "px";
                }
            }
            else {
                if (_this.iconElement) {
                    _this.iconElement.style.opacity = '1';
                }
            }
        })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["delay"])(1))
            .subscribe((/**
         * @param {?} dragCursor
         * @return {?}
         */
        function (dragCursor) {
            if (!!dragCursor.html && _this.contentElement) {
                _this.contentElement.style.opacity = '1';
            }
        }));
        Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["from"])(this.dragDropService.dragCursor$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["takeWhile"])((/**
         * @return {?}
         */
        function () { return _this.isAlive; })))
            .subscribe((/**
         * @param {?} dragCursor
         * @return {?}
         */
        function (dragCursor) {
            if (!!dragCursor !== !!_this._dragCursor) {
                _this._dragCursor = dragCursor;
            }
            if (_this._dropCursor && _this._dragCursor) {
                dragCursor.className = _this._dropCursor.className || _this._dragCursor.className;
                dragCursor.html = _this._dropCursor.html || _this._dragCursor.html;
                dragCursor.width = _this._dropCursor.width || _this._dragCursor.width;
                dragCursor.height = _this._dropCursor.height || _this._dragCursor.height;
            }
            if (!!dragCursor !== !!_this._currentCursor || (dragCursor && !!dragCursor.html !== !!_this._currentCursor.html)) {
                // Update Content
                _this.cursor$.next(dragCursor);
            }
            else if (dragCursor) {
                // Update only Position
                _this.position$.next(dragCursor.position);
            }
        }));
        Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["from"])(this.dragDropService.dropCursor$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["takeWhile"])((/**
         * @return {?}
         */
        function () { return _this.isAlive; })))
            .subscribe((/**
         * @param {?} dropCursor
         * @return {?}
         */
        function (dropCursor) {
            _this._dropCursor = dropCursor;
        }));
    }
    Object.defineProperty(DejaMouseDragDropCursorComponent.prototype, "iconElement", {
        get: /**
         * @private
         * @return {?}
         */
        function () {
            return (/** @type {?} */ (this.icon.nativeElement));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaMouseDragDropCursorComponent.prototype, "contentElement", {
        get: /**
         * @private
         * @return {?}
         */
        function () {
            return (/** @type {?} */ (this.content.nativeElement));
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DejaMouseDragDropCursorComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.isAlive = false;
    };
    DejaMouseDragDropCursorComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"], args: [{
                    encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewEncapsulation"].None,
                    selector: 'deja-mouse-dragdrop-cursor',
                    template: "<div id=\"block\" #block>\n    <mat-icon #block>block</mat-icon>\n</div>\n<div #content id=\"content\"></div>\n",
                    styles: ["deja-mouse-dragdrop-cursor{position:fixed;width:0;height:0;overflow:visible;z-index:10000;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;display:flex;align-items:center;justify-content:space-around}deja-mouse-dragdrop-cursor #block{position:absolute;top:0;left:0;width:3rem;height:3rem;display:flex;align-items:center;justify-content:space-around;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);transition-property:opacity;transition-timing-function:linear;transition-duration:.3s;cursor:default}deja-mouse-dragdrop-cursor #content{position:absolute;top:0;left:0;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);transition-property:opacity;transition-timing-function:linear;transition-duration:.3s;cursor:default}"]
                }] }
    ];
    /** @nocollapse */
    DejaMouseDragDropCursorComponent.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"] },
        { type: DejaMouseDragDropService }
    ]; };
    DejaMouseDragDropCursorComponent.propDecorators = {
        icon: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"], args: ['block',] }],
        content: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"], args: ['content',] }]
    };
    return DejaMouseDragDropCursorComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var DejaMouseDraggableDirective = /** @class */ (function () {
    function DejaMouseDraggableDirective(elementRef, dragDropService) {
        var _this = this;
        this.isAlive = true;
        /** @type {?} */
        var element = (/** @type {?} */ (elementRef.nativeElement));
        /** @type {?} */
        var leave$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["fromEvent"])(element, 'mouseleave');
        /** @type {?} */
        var mouseUp$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["fromEvent"])(element.ownerDocument, 'mouseup');
        Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["fromEvent"])(element, 'mouseenter').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["takeWhile"])((/**
         * @return {?}
         */
        function () { return _this.isAlive; })))
            .subscribe((/**
         * @return {?}
         */
        function () {
            Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["fromEvent"])(element, 'mousedown').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["takeUntil"])(leave$), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["filter"])((/**
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
                var moveUp$ = new rxjs__WEBPACK_IMPORTED_MODULE_3__["Subject"]();
                /** @type {?} */
                var target;
                /** @type {?} */
                var match = (/**
                 * @param {?} el
                 * @return {?}
                 */
                function (el) {
                    return el.tagName === _this.context.target.toUpperCase() || el.id === _this.context.target.substr(1) || el.hasAttribute(_this.context.target.substring(1, _this.context.target.length - 1));
                });
                /** @type {?} */
                var startDrag = (/**
                 * @return {?}
                 */
                function () {
                    /** @type {?} */
                    var kill$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["merge"])(mouseUp$, moveUp$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["first"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])((/**
                     * @return {?}
                     */
                    function () {
                        dragDropService.dragCursor$.next(undefined);
                        dragDropService.dragging$.next(false);
                    })));
                    Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["fromEvent"])(element.ownerDocument, 'mousemove').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["takeUntil"])(kill$))
                        .subscribe((/**
                     * @param {?} ev
                     * @return {?}
                     */
                    function (ev) {
                        if (target && ev.buttons === 1) {
                            /** @type {?} */
                            var bounds = new _deja_js_core__WEBPACK_IMPORTED_MODULE_2__["Rect"](element.getBoundingClientRect());
                            /** @type {?} */
                            var position = new _deja_js_core__WEBPACK_IMPORTED_MODULE_2__["Position"](ev.pageX, ev.pageY);
                            /** @type {?} */
                            var html = bounds.containsPoint(position) ? target.innerHTML : undefined;
                            // Post cursor infos to service
                            dragDropService.dragCursor$.next((/** @type {?} */ ({
                                position: position,
                                html: html,
                                width: target.offsetWidth,
                                height: target.offsetHeight,
                                className: _this.context.className,
                                originalEvent: ev,
                            })));
                        }
                        else {
                            moveUp$.next();
                        }
                        ev.preventDefault();
                        return false;
                    }));
                    dragDropService.dragging$.next(true);
                });
                if (_this.context) {
                    if (_this.context.target) {
                        target = (/** @type {?} */ (event.target));
                        while (target && !match(target)) {
                            target = target.parentElement;
                        }
                    }
                    else {
                        target = element;
                    }
                    if (target && _this.context.dragStart) {
                        /** @type {?} */
                        var dragContext = _this.context.dragStart(target);
                        if (dragContext) {
                            if (dragContext.subscribe) {
                                /** @type {?} */
                                var context = (/** @type {?} */ (dragContext));
                                // Observable
                                context.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["first"])()).subscribe((/**
                                 * @param {?} ddctx
                                 * @return {?}
                                 */
                                function (ddctx) {
                                    dragDropService.context = ddctx;
                                    if (ddctx) {
                                        startDrag();
                                    }
                                }));
                                return;
                            }
                            else {
                                dragDropService.context = dragContext;
                                startDrag();
                            }
                        }
                    }
                }
            }));
        }));
    }
    Object.defineProperty(DejaMouseDraggableDirective.prototype, "context", {
        get: /**
         * @return {?}
         */
        function () {
            return this._context;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._context = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DejaMouseDraggableDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.isAlive = false;
    };
    DejaMouseDraggableDirective.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"], args: [{
                    selector: '[deja-mouse-draggable]',
                },] }
    ];
    /** @nocollapse */
    DejaMouseDraggableDirective.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"] },
        { type: DejaMouseDragDropService }
    ]; };
    DejaMouseDraggableDirective.propDecorators = {
        context: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"], args: ['deja-mouse-draggable',] }]
    };
    return DejaMouseDraggableDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var DejaMouseDroppableDirective = /** @class */ (function () {
    function DejaMouseDroppableDirective(elementRef, dragDropService) {
        var _this = this;
        this.isAlive = true;
        /** @type {?} */
        var element = (/** @type {?} */ (elementRef.nativeElement));
        /** @type {?} */
        var dragging$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["from"])(dragDropService.dragging$);
        /** @type {?} */
        var kill$ = dragging$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["filter"])((/**
         * @param {?} value
         * @return {?}
         */
        function (value) { return !value; })));
        dragging$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["takeWhile"])((/**
         * @return {?}
         */
        function () { return _this.isAlive; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["filter"])((/**
         * @param {?} value
         * @return {?}
         */
        function (value) { return value; })))
            .subscribe((/**
         * @return {?}
         */
        function () {
            kill$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["first"])())
                .subscribe((/**
             * @return {?}
             */
            function () {
                if (_this._dragContext) {
                    if (_this.context && _this.context.drop) {
                        _this.context.drop(_this._dragContext);
                    }
                    _this._dragContext = undefined;
                }
                dragDropService.dropCursor$.next(undefined);
            }));
            Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["from"])(dragDropService.dragCursor$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["takeUntil"])(kill$))
                .subscribe((/**
             * @param {?} dragCursor
             * @return {?}
             */
            function (dragCursor) {
                /** @type {?} */
                var bounds = new _deja_js_core__WEBPACK_IMPORTED_MODULE_2__["Rect"](element.getBoundingClientRect());
                if (_this.context && dragCursor) {
                    var _a = dragCursor.originalEvent, pageX = _a.pageX, pageY = _a.pageY;
                    if (bounds.containsPoint(new _deja_js_core__WEBPACK_IMPORTED_MODULE_2__["Position"](pageX, pageY))) {
                        if (!_this._dragContext) {
                            _this._dragContext = dragDropService.context;
                            if (_this.context.dragEnter) {
                                /** @type {?} */
                                var dropContext = _this.context.dragEnter(_this._dragContext, dragCursor);
                                if (dropContext) {
                                    /** @type {?} */
                                    var dropContextObs = (/** @type {?} */ (dropContext));
                                    if (dropContextObs.subscribe) {
                                        // Observable
                                        dropContextObs.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["first"])())
                                            .subscribe((/**
                                         * @param {?} cursor
                                         * @return {?}
                                         */
                                        function (cursor) {
                                            dragDropService.dropCursor$.next(cursor);
                                        }));
                                        return;
                                    }
                                    else {
                                        dragDropService.dropCursor$.next((/** @type {?} */ (dropContext)));
                                    }
                                }
                            }
                        }
                        else if (_this.context.dragOver) {
                            /** @type {?} */
                            var overContext = _this.context.dragOver(_this._dragContext, dragCursor);
                            if (overContext) {
                                dragDropService.dropCursor$.next(overContext);
                            }
                        }
                    }
                    else if (_this._dragContext) {
                        if (_this.context && _this.context.dragLeave) {
                            _this.context.dragLeave(_this._dragContext);
                        }
                        _this._dragContext = undefined;
                        dragDropService.dropCursor$.next(undefined);
                    }
                }
            }));
        }));
    }
    Object.defineProperty(DejaMouseDroppableDirective.prototype, "context", {
        get: /**
         * @return {?}
         */
        function () {
            return this._context;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._context = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DejaMouseDroppableDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.isAlive = false;
    };
    DejaMouseDroppableDirective.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"], args: [{
                    selector: '[deja-mouse-droppable]',
                },] }
    ];
    /** @nocollapse */
    DejaMouseDroppableDirective.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"] },
        { type: DejaMouseDragDropService }
    ]; };
    DejaMouseDroppableDirective.propDecorators = {
        context: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"], args: ['deja-mouse-droppable',] }]
    };
    return DejaMouseDroppableDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var DejaMouseDragDropModule = /** @class */ (function () {
    function DejaMouseDragDropModule() {
    }
    /**
     * @return {?}
     */
    DejaMouseDragDropModule.forRoot = /**
     * @return {?}
     */
    function () {
        return {
            ngModule: DejaMouseDragDropModule,
            providers: [DejaMouseDragDropService],
        };
    };
    DejaMouseDragDropModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"], args: [{
                    declarations: [
                        DejaMouseDraggableDirective,
                        DejaMouseDroppableDirective,
                        DejaMouseDragDropCursorComponent
                    ],
                    imports: [
                        _angular_material__WEBPACK_IMPORTED_MODULE_0__["MatIconModule"],
                    ],
                    exports: [
                        DejaMouseDraggableDirective,
                        DejaMouseDroppableDirective,
                        DejaMouseDragDropCursorComponent
                    ],
                    providers: [],
                },] }
    ];
    return DejaMouseDragDropModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */



//# sourceMappingURL=deja-js-component-mouse-dragdrop.js.map

/***/ })

}]);
//# sourceMappingURL=default~circular-picker-circular-picker-demo-module~color-selector-color-selector-demo-module~conten~ec00beff.js.map