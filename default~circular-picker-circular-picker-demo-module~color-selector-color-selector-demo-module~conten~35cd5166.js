(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~circular-picker-circular-picker-demo-module~color-selector-color-selector-demo-module~conten~35cd5166"],{

/***/ "./dist/deja-js/component/fesm5/deja-js-component-dragdrop.js":
/*!********************************************************************!*\
  !*** ./dist/deja-js/component/fesm5/deja-js-component-dragdrop.js ***!
  \********************************************************************/
/*! exports provided: DejaDragDropModule, DejaDraggableDirective, DejaDroppableDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DejaDragDropModule", function() { return DejaDragDropModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DejaDraggableDirective", function() { return DejaDraggableDirective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DejaDroppableDirective", function() { return DejaDroppableDirective; });
/* harmony import */ var _angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/cdk/coercion */ "./node_modules/@angular/cdk/esm5/coercion.es5.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _deja_js_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @deja-js/core */ "./dist/deja-js/core/fesm5/deja-js-core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");






/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var DejaDraggableDirective = /** @class */ (function () {
    function DejaDraggableDirective(elementRef, clipboardService) {
        var _this = this;
        this.clipboardService = clipboardService;
        this.draggable = null;
        this.draginfokey = 'draginfos';
        this.objectKey = 'object';
        this.elementKey = 'element';
        this.uuidKey = 'uuid';
        this.isAlive = true;
        /** @type {?} */
        var element = (/** @type {?} */ (elementRef.nativeElement));
        Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["fromEvent"])(element, 'dragstart').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["takeWhile"])((/**
         * @return {?}
         */
        function () { return _this.isAlive; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["filter"])((/**
         * @return {?}
         */
        function () { return !!_this.context; })))
            .subscribe((/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            if (!clipboardService) {
                throw new Error('To use the DejaDraggableDirective, please import and provide the DejaClipboardService in your application.');
            }
            // console.log('dragstart');
            /** @type {?} */
            var dragInfos = (/** @type {?} */ ({}));
            _this.dragdropid = new _deja_js_core__WEBPACK_IMPORTED_MODULE_2__["UUID"]().toString();
            dragInfos[_this.uuidKey] = _this.dragdropid;
            /** @type {?} */
            var object = (_this.context && _this.context.object) || element;
            dragInfos[_this.objectKey] = object;
            dragInfos[_this.elementKey] = element;
            _this.clipboardService.set(_this.draginfokey, dragInfos);
            /** @type {?} */
            var data = 'notavailable';
            if (object) {
                object.dragged = true;
                data = JSON.stringify(data);
            }
            if (_this.context && _this.context.dragstartcallback) {
                /** @type {?} */
                var e = (/** @type {?} */ (event));
                e.dragInfo = dragInfos;
                e.dragObject = _this.context.object;
                e.dragElement = element;
                _this.context.dragstartcallback(e);
                event.dataTransfer.setData('text/plain', data);
                if (e.defaultPrevented) {
                    event.preventDefault();
                }
            }
            Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["fromEvent"])(element, 'dragend').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["takeWhile"])((/**
             * @return {?}
             */
            function () { return _this.isAlive; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["first"])())
                .subscribe((/**
             * @param {?} evt
             * @return {?}
             */
            function (evt) {
                // console.log('dragend');
                /** @type {?} */
                var dragEndInfos = (/** @type {?} */ (_this.clipboardService.get(_this.draginfokey)));
                /** @type {?} */
                var obj = dragEndInfos && dragEndInfos[_this.objectKey];
                if (obj) {
                    delete obj.dragged;
                }
                if (_this.context && _this.context.dragendcallback && dragEndInfos) {
                    /** @type {?} */
                    var e = (/** @type {?} */ (evt));
                    e.dragInfo = dragEndInfos;
                    e.dragObject = obj;
                    e.dragElement = dragEndInfos[_this.elementKey];
                    _this.context.dragendcallback(e);
                    if (e.defaultPrevented) {
                        evt.stopPropagation();
                    }
                }
                _this.clipboardService.clear();
                _this.dragdropid = undefined;
            }));
        }));
    }
    Object.defineProperty(DejaDraggableDirective.prototype, "context", {
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
            this.draggable = !!value ? true : null;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DejaDraggableDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.isAlive = false;
    };
    DejaDraggableDirective.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"], args: [{
                    selector: '[deja-draggable]',
                },] }
    ];
    /** @nocollapse */
    DejaDraggableDirective.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"] },
        { type: _deja_js_core__WEBPACK_IMPORTED_MODULE_2__["DejaClipboardService"], decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Optional"] }] }
    ]; };
    DejaDraggableDirective.propDecorators = {
        draggable: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["HostBinding"], args: ['attr.draggable',] }],
        dragdropid: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["HostBinding"], args: ['attr.dragdropid',] }],
        context: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"], args: ['deja-draggable',] }]
    };
    return DejaDraggableDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var DejaDroppableDirective = /** @class */ (function () {
    function DejaDroppableDirective(elementRef, clipboardService) {
        var _this = this;
        this.clipboardService = clipboardService;
        this.droppable = null;
        this.draginfokey = 'draginfos';
        this.objectKey = 'object';
        this.droppedKey = 'dropped';
        this.elementKey = 'element';
        this._allEvents = false;
        this.isAlive = true;
        /** @type {?} */
        var inDrag = false;
        /** @type {?} */
        var element = (/** @type {?} */ (elementRef.nativeElement));
        /** @type {?} */
        var dragDrop$ = new rxjs__WEBPACK_IMPORTED_MODULE_3__["Subject"]();
        /** @type {?} */
        var kill$ = new rxjs__WEBPACK_IMPORTED_MODULE_3__["Subject"]();
        /** @type {?} */
        var dragEnd$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["from"])(kill$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])((/**
         * @return {?}
         */
        function () { return inDrag = false; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["filter"])((/**
         * @param {?} value
         * @return {?}
         */
        function (value) { return !value; })));
        Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["from"])(dragDrop$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["takeWhile"])((/**
         * @return {?}
         */
        function () { return _this.isAlive; })))
            .subscribe((/**
         * @param {?} dragEvent
         * @return {?}
         */
        function (dragEvent) {
            if (dragEvent.type === 'dragenter') {
                if (inDrag) {
                    return;
                }
                inDrag = true;
                // console.log('DejaDragEnter');
                if (_this.context.dragentercallback) {
                    /** @type {?} */
                    var dragInfos_1 = (/** @type {?} */ (_this.clipboardService.get(_this.draginfokey)));
                    /** @type {?} */
                    var e = (/** @type {?} */ (dragEvent));
                    e.dragInfo = dragInfos_1;
                    e.dragObject = ((/** @type {?} */ (dragEvent)))[_this.objectKey];
                    e.dragElement = element;
                    e.itsMe = ((/** @type {?} */ (dragEvent)))[_this.elementKey] === element;
                    _this.context.dragentercallback(e);
                    if (e.defaultPrevented) {
                        dragEvent.preventDefault();
                        dragEvent.dataTransfer.dropEffect = 'copy';
                    }
                    else {
                        dragEvent.dataTransfer.dropEffect = 'none';
                    }
                    Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["fromEvent"])(element, 'drop').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["takeUntil"])(dragEnd$))
                        .subscribe((/**
                     * @param {?} dropEvent
                     * @return {?}
                     */
                    function (dropEvent) {
                        // console.log('DejaDrop');
                        if (_this.context.dropcallback) {
                            if (dragInfos_1) {
                                /** @type {?} */
                                var evt = (/** @type {?} */ (dropEvent));
                                evt.dragInfo = dragInfos_1;
                                evt.dragObject = dragInfos_1[_this.objectKey];
                                evt.dragElement = element;
                                evt.itsMe = dragInfos_1[_this.elementKey] === element;
                                _this.context.dropcallback(evt);
                                if (evt.defaultPrevented) {
                                    evt.dragInfo[_this.droppedKey] = true;
                                    dropEvent.preventDefault();
                                    dragEvent.dataTransfer.dropEffect = 'copy';
                                }
                                else {
                                    dragEvent.dataTransfer.dropEffect = 'none';
                                }
                            }
                        }
                        kill$.next();
                        return;
                    }));
                    Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["fromEvent"])(element, 'dragover').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["takeUntil"])(dragEnd$))
                        .subscribe((/**
                     * @param {?} overEvent
                     * @return {?}
                     */
                    function (overEvent) {
                        // console.log('DejaDragOver');
                        if (!_this._allEvents && _this.lastTarget && _this.lastTarget === overEvent.target) {
                            if (_this.lastAccept) {
                                overEvent.preventDefault();
                                dragEvent.dataTransfer.dropEffect = 'copy';
                            }
                            else {
                                dragEvent.dataTransfer.dropEffect = 'none';
                            }
                            return;
                        }
                        if (_this.context.dragovercallback) {
                            if (dragInfos_1) {
                                /** @type {?} */
                                var evt = (/** @type {?} */ (overEvent));
                                evt.dragInfo = dragInfos_1;
                                evt.dragObject = dragInfos_1[_this.objectKey];
                                evt.dragElement = element;
                                evt.itsMe = dragInfos_1[_this.elementKey] === element;
                                _this.context.dragovercallback(evt);
                                _this.lastTarget = overEvent.target;
                                _this.lastAccept = evt.defaultPrevented;
                                if (evt.defaultPrevented) {
                                    overEvent.preventDefault();
                                    dragEvent.dataTransfer.dropEffect = 'copy';
                                }
                                else {
                                    dragEvent.dataTransfer.dropEffect = 'none';
                                }
                            }
                        }
                    }));
                }
            }
            else {
                // console.log('DejaDragLeave');
                if (_this.context.dragleavecallback) {
                    /** @type {?} */
                    var e = new CustomEvent('DejaDragLeave', { cancelable: true });
                    _this.context.dragleavecallback(e);
                    if (e.defaultPrevented) {
                        dragEvent.preventDefault();
                    }
                }
                kill$.next();
            }
        }));
        Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["fromEvent"])(element, 'dragenter').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["takeWhile"])((/**
         * @return {?}
         */
        function () { return _this.isAlive; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["filter"])((/**
         * @return {?}
         */
        function () { return !!_this.context; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["filter"])((/**
         * @return {?}
         */
        function () { return !!_this.clipboardService.get(_this.draginfokey); })))
            .subscribe((/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            if (!clipboardService) {
                throw new Error('To use the DejaDroppableDirective, please import and provide the DejaClipboardService in your application.');
            }
            dragDrop$.next(event);
        }));
        Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["fromEvent"])(element, 'dragleave').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["takeWhile"])((/**
         * @return {?}
         */
        function () { return _this.isAlive; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["filter"])((/**
         * @return {?}
         */
        function () { return !!_this.context; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["filter"])((/**
         * @return {?}
         */
        function () { return !!_this.clipboardService.get(_this.draginfokey); })))
            .subscribe((/**
         * @param {?} leaveEvent
         * @return {?}
         */
        function (leaveEvent) {
            // console.log('dragleave ' + (leaveEvent.target as HTMLElement).tagName);
            /** @type {?} */
            var bounds = element.getBoundingClientRect();
            /** @type {?} */
            var inside = leaveEvent.x >= bounds.left && leaveEvent.x <= bounds.right && leaveEvent.y >= bounds.top && leaveEvent.y <= bounds.bottom;
            if (!inside) {
                dragDrop$.next(leaveEvent);
            }
        }));
    }
    Object.defineProperty(DejaDroppableDirective.prototype, "allEvents", {
        /**
         * @deprecated
         */
        set: /**
         * @deprecated
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._allEvents = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_0__["coerceBooleanProperty"])(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaDroppableDirective.prototype, "context", {
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
            this.droppable = !!value ? true : null;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DejaDroppableDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.isAlive = true;
    };
    DejaDroppableDirective.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"], args: [{
                    selector: '[deja-droppable]',
                },] }
    ];
    /** @nocollapse */
    DejaDroppableDirective.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"] },
        { type: _deja_js_core__WEBPACK_IMPORTED_MODULE_2__["DejaClipboardService"], decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Optional"] }] }
    ]; };
    DejaDroppableDirective.propDecorators = {
        allEvents: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"], args: ['continous-dragover',] }],
        droppable: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["HostBinding"], args: ['attr.droppable',] }],
        context: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"], args: ['deja-droppable',] }]
    };
    return DejaDroppableDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var DejaDragDropModule = /** @class */ (function () {
    function DejaDragDropModule() {
    }
    DejaDragDropModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"], args: [{
                    declarations: [DejaDraggableDirective, DejaDroppableDirective],
                    exports: [DejaDraggableDirective, DejaDroppableDirective],
                },] }
    ];
    return DejaDragDropModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */



//# sourceMappingURL=deja-js-component-dragdrop.js.map

/***/ }),

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

/***/ "./dist/deja-js/component/fesm5/deja-js-component-tree-list.js":
/*!*********************************************************************!*\
  !*** ./dist/deja-js/component/fesm5/deja-js-component-tree-list.js ***!
  \*********************************************************************/
/*! exports provided: DejaTreeListModule, DejaTreeListScrollEvent, DejaTreeListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DejaTreeListModule", function() { return DejaTreeListModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DejaTreeListScrollEvent", function() { return DejaTreeListScrollEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DejaTreeListComponent", function() { return DejaTreeListComponent; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _deja_js_component_dragdrop__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @deja-js/component/dragdrop */ "./dist/deja-js/component/fesm5/deja-js-component-dragdrop.js");
/* harmony import */ var _deja_js_component_loaders__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @deja-js/component/loaders */ "./dist/deja-js/component/fesm5/deja-js-component-loaders.js");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/cdk/coercion */ "./node_modules/@angular/cdk/esm5/coercion.es5.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _deja_js_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @deja-js/core */ "./dist/deja-js/core/fesm5/deja-js-core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");












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
 * Composant de liste évoluée avec gestion de viewport et templating
 */
var DejaTreeListComponent = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_4__["__extends"])(DejaTreeListComponent, _super);
    function DejaTreeListComponent(changeDetectorRef, viewPort, elementRef, _control, clipboardService) {
        var _this = _super.call(this, changeDetectorRef, viewPort) || this;
        _this.viewPort = viewPort;
        _this.elementRef = elementRef;
        _this._control = _control;
        _this.clipboardService = clipboardService;
        /**
         * Correspond au ngModel du champ de filtrage ou recherche
         */
        _this.query = '';
        /**
         * Largeur des éléments par defaut si différent de 100%
         */
        _this.itemsWidth = null;
        /**
         * Exécuté lorsque le déplacement d'une ligne est terminée.
         */
        _this.itemDragEnd = new _angular_core__WEBPACK_IMPORTED_MODULE_6__["EventEmitter"]();
        /**
         * Exécuté lorsque le déplacement d'une ligne commence.
         */
        _this.itemDragStart = new _angular_core__WEBPACK_IMPORTED_MODULE_6__["EventEmitter"]();
        /**
         * Exécuté lorsque la scrollbar change de position.
         */
        _this.scroll = new _angular_core__WEBPACK_IMPORTED_MODULE_6__["EventEmitter"]();
        /**
         * Exécuté lorsque l'utilisateur sélectionne ou désélectionne une ligne.
         */
        _this.selectedChange = new _angular_core__WEBPACK_IMPORTED_MODULE_6__["EventEmitter"]();
        /**
         * Exécuté lorsque le calcul du viewPort est executé.
         */
        _this.viewPortChanged = new _angular_core__WEBPACK_IMPORTED_MODULE_6__["EventEmitter"]();
        // NgModel implementation
        _this.onTouchedCallback = noop;
        _this.onChangeCallback = noop;
        _this._keyboardNavigation = false;
        _this.rangeStartIndex = 0;
        _this.filterExpression = '';
        _this._searchArea = false;
        _this._sortable = false;
        _this._itemsDraggable = false;
        _this.hasCustomService = false;
        _this.hasLoadingEvent = false;
        _this._modelIsValue = false;
        _this._disabled = null;
        _this.keyboardNavigation$ = new rxjs__WEBPACK_IMPORTED_MODULE_9__["Subject"]();
        _this.clearFilterExpression$ = new rxjs__WEBPACK_IMPORTED_MODULE_9__["BehaviorSubject"](null);
        _this.writeValue$ = new rxjs__WEBPACK_IMPORTED_MODULE_9__["Subject"]();
        _this.selectItems$ = new rxjs__WEBPACK_IMPORTED_MODULE_9__["Subject"]();
        _this.contentInitialized$ = new rxjs__WEBPACK_IMPORTED_MODULE_9__["Subject"]();
        _this.setQuery$ = new rxjs__WEBPACK_IMPORTED_MODULE_9__["Subject"]();
        if (_this._control) {
            _this._control.valueAccessor = _this;
        }
        Object(rxjs__WEBPACK_IMPORTED_MODULE_9__["from"])(_this.clearFilterExpression$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["takeWhile"])((/**
         * @return {?}
         */
        function () { return _this._isAlive; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["debounceTime"])(400))
            .subscribe((/**
         * @return {?}
         */
        function () { return _this.filterExpression = ''; }));
        Object(rxjs__WEBPACK_IMPORTED_MODULE_9__["from"])(_this.keyboardNavigation$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["takeWhile"])((/**
         * @return {?}
         */
        function () { return _this._isAlive; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["tap"])((/**
         * @return {?}
         */
        function () { return _this._keyboardNavigation = true; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["debounceTime"])(1000))
            .subscribe((/**
         * @return {?}
         */
        function () {
            _this._keyboardNavigation = false;
            _this.changeDetectorRef.markForCheck();
        }));
        Object(rxjs__WEBPACK_IMPORTED_MODULE_9__["fromEvent"])(window, 'resize').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["takeWhile"])((/**
         * @return {?}
         */
        function () { return _this._isAlive; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["debounceTime"])(5))
            .subscribe((/**
         * @return {?}
         */
        function () {
            _this.viewPort.deleteSizeCache();
            _this.viewPort.refresh();
            _this.changeDetectorRef.markForCheck();
        }));
        Object(rxjs__WEBPACK_IMPORTED_MODULE_9__["from"])(_this.setQuery$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["takeWhile"])((/**
         * @return {?}
         */
        function () { return _this._isAlive; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["debounceTime"])(250), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["tap"])((/**
         * @param {?} query
         * @return {?}
         */
        function (query) {
            _this.query = query;
            _this.setCurrentItem(undefined);
        })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["switchMap"])((/**
         * @return {?}
         */
        function () { return _this.calcViewList$(); })))
            .subscribe(noop);
        /** @type {?} */
        var selectItems$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_9__["combineLatest"])(_this.selectItems$, _this.contentInitialized$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["map"])((/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_4__["__read"])(_a, 1), value = _b[0];
            return value;
        })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["map"])((/**
         * @param {?} value
         * @return {?}
         */
        function (value) { return _this.getVirtualSelectedEntities(value); })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["map"])((/**
         * @param {?} value
         * @return {?}
         */
        function (value) { return (value instanceof Array && value) || (value && [value]) || []; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["tap"])((/**
         * @param {?} values
         * @return {?}
         */
        function (values) { return _super.prototype.setSelectedItems.call(_this, values); })));
        /** @type {?} */
        var selectModels$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_9__["combineLatest"])(_this.writeValue$, _this.contentInitialized$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["map"])((/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_4__["__read"])(_a, 1), value = _b[0];
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
        })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["map"])((/**
         * @param {?} value
         * @return {?}
         */
        function (value) { return _this.getVirtualSelectedEntities(value); })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["tap"])((/**
         * @param {?} value
         * @return {?}
         */
        function (value) { return _super.prototype.setSelectedModels.call(_this, !value || _this._multiSelect || value instanceof Array ? value : [value]); })));
        Object(rxjs__WEBPACK_IMPORTED_MODULE_9__["merge"])(selectModels$, selectItems$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["takeWhile"])((/**
         * @return {?}
         */
        function () { return _this._isAlive; })))
            .subscribe((/**
         * @return {?}
         */
        function () {
            _super.prototype.getItemListService.call(_this).ensureSelection();
            _this.changeDetectorRef.markForCheck();
        }));
        _this._viewPortChanged = _this.viewPortChanged;
        _this.maxHeight = 0;
        return _this;
    }
    Object.defineProperty(DejaTreeListComponent.prototype, "listElememtRef", {
        set: /**
         * @param {?} elem
         * @return {?}
         */
        function (elem) {
            this.listElement = elem.nativeElement;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DejaTreeListComponent.prototype.keyboardNavigation = /**
     * @return {?}
     */
    function () {
        return this._keyboardNavigation;
    };
    Object.defineProperty(DejaTreeListComponent.prototype, "minSearchlength", {
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
            this._minSearchLength = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_5__["coerceNumberProperty"])(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaTreeListComponent.prototype, "searchArea", {
        get: /**
         * @return {?}
         */
        function () {
            return this._searchArea || this.minSearchlength > 0;
        },
        /** Affiche un barre de recherche au dessus de la liste. */
        set: /**
         * Affiche un barre de recherche au dessus de la liste.
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._searchArea = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_5__["coerceBooleanProperty"])(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaTreeListComponent.prototype, "modelIsValue", {
        get: /**
         * @return {?}
         */
        function () {
            return this._modelIsValue;
        },
        /** Définit une valeur indiquant si en reactive form le model renvoyé doit être un obeject oue une valeur */
        set: /**
         * Définit une valeur indiquant si en reactive form le model renvoyé doit être un obeject oue une valeur
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._modelIsValue = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_5__["coerceBooleanProperty"])(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaTreeListComponent.prototype, "sortable", {
        get: /**
         * @return {?}
         */
        function () {
            return this._sortable;
        },
        /** Retourne ou définit une valeur indiquant si les lignes de la liste peuvent être déplacées manuelement par l'utilisateur */
        set: /**
         * Retourne ou définit une valeur indiquant si les lignes de la liste peuvent être déplacées manuelement par l'utilisateur
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._sortable = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_5__["coerceBooleanProperty"])(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaTreeListComponent.prototype, "itemsDraggable", {
        get: /**
         * @return {?}
         */
        function () {
            return this._itemsDraggable;
        },
        /** Retourne ou définit une valeur indiquant si les lignes peuvent être déplacées vers un autre composant */
        set: /**
         * Retourne ou définit une valeur indiquant si les lignes peuvent être déplacées vers un autre composant
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._itemsDraggable = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_5__["coerceBooleanProperty"])(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaTreeListComponent.prototype, "pageSize", {
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
                var containerHeight = this.maxHeight || this.listElement.clientHeight;
                return Math.floor(containerHeight / vpRowHeight);
            }
            return this._pageSize;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._pageSize = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_5__["coerceNumberProperty"])(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaTreeListComponent.prototype, "hintLabel", {
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
    Object.defineProperty(DejaTreeListComponent.prototype, "viewPortRowHeight", {
        /** Définit la hauteur d'une ligne pour le calcul du viewport en pixels (la valeur par défaut sera utilisée si aucune valeur n'est setté). */
        set: /**
         * Définit la hauteur d'une ligne pour le calcul du viewport en pixels (la valeur par défaut sera utilisée si aucune valeur n'est setté).
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.setViewPortRowHeight(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaTreeListComponent.prototype, "viewportMode", {
        /**
         * Les valeurs acceptées en paramètre se trouvent dans l'enum ViewportMode (disabled, constant, variable ou auto)
         * Attention, une désactivation du viewport dégrade considérablement les performances de la liste et ne doit pas être activée si la liste
         * est suceptible de contenir beaucoup d'éléments.
         */
        set: /**
         * Les valeurs acceptées en paramètre se trouvent dans l'enum ViewportMode (disabled, constant, variable ou auto)
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
    Object.defineProperty(DejaTreeListComponent.prototype, "childrenField", {
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
    Object.defineProperty(DejaTreeListComponent.prototype, "textField", {
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
    Object.defineProperty(DejaTreeListComponent.prototype, "valueField", {
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
    Object.defineProperty(DejaTreeListComponent.prototype, "searchField", {
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
    Object.defineProperty(DejaTreeListComponent.prototype, "maxHeight", {
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
    Object.defineProperty(DejaTreeListComponent.prototype, "currentItem", {
        /** Retourne la ligne courant ou ligne active */
        get: /**
         * Retourne la ligne courant ou ligne active
         * @return {?}
         */
        function () {
            return _super.prototype.getCurrentItem.call(this);
        },
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
    Object.defineProperty(DejaTreeListComponent.prototype, "depthMax", {
        /** Retourne le nombre de niveau pour une liste hierarchique */
        get: /**
         * Retourne le nombre de niveau pour une liste hierarchique
         * @return {?}
         */
        function () {
            return this._depthMax;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaTreeListComponent.prototype, "multiSelect", {
        /** Retourne une valeur indiquant si plusieurs lignes peuvent être sélectionées. */
        get: /**
         * Retourne une valeur indiquant si plusieurs lignes peuvent être sélectionées.
         * @return {?}
         */
        function () {
            return this._multiSelect;
        },
        /** Définit une valeur indiquant si plusieurs lignes peuvent être sélectionées. */
        set: /**
         * Définit une valeur indiquant si plusieurs lignes peuvent être sélectionées.
         * @param {?} value
         * @return {?}
         */
        function (value) {
            _super.prototype.setMultiSelect.call(this, Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_5__["coerceBooleanProperty"])(value));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaTreeListComponent.prototype, "selectedItems", {
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
            if (value !== undefined) {
                this.selectItems$.next(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaTreeListComponent.prototype, "selectedItem", {
        /** Retourne l'éléments selectioné en mode single select */
        get: /**
         * Retourne l'éléments selectioné en mode single select
         * @return {?}
         */
        function () {
            /** @type {?} */
            var selectedItem = _super.prototype.getSelectedItems.call(this);
            return selectedItem && selectedItem[0];
        },
        /** Définit l'élément selectioné en mode single select */
        set: /**
         * Définit l'élément selectioné en mode single select
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value !== undefined) {
                this.selectItems$.next(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaTreeListComponent.prototype, "selectedModel", {
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
            if (value !== undefined) {
                this.writeValue(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaTreeListComponent.prototype, "selectedModels", {
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
            if (value !== undefined) {
                this.writeValue(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaTreeListComponent.prototype, "itemListService", {
        /** Retourne le service de liste utilisé par ce composant. Ce srevice permet de controller dynamiquement la liste, ou de faire du lazyloading. */
        get: /**
         * Retourne le service de liste utilisé par ce composant. Ce srevice permet de controller dynamiquement la liste, ou de faire du lazyloading.
         * @return {?}
         */
        function () {
            return this.getItemListService();
        },
        /** Definit le service de liste utilisé par ce composant. Ce srevice permet de controller dynamiquement la liste, ou de faire du lazyloading. */
        set: /**
         * Definit le service de liste utilisé par ce composant. Ce srevice permet de controller dynamiquement la liste, ou de faire du lazyloading.
         * @param {?} itemListService
         * @return {?}
         */
        function (itemListService) {
            if (itemListService !== undefined) {
                this.hasCustomService = true;
                this.setItemListService(itemListService);
                if (itemListService && itemListService.lastQuery) {
                    this.query = itemListService.lastQuery.toString();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaTreeListComponent.prototype, "sortingService", {
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
    Object.defineProperty(DejaTreeListComponent.prototype, "groupingService", {
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
    Object.defineProperty(DejaTreeListComponent.prototype, "items", {
        /** Définit la liste des éléments */
        set: /**
         * Définit la liste des éléments
         * @param {?} items
         * @return {?}
         */
        function (items) {
            var _this = this;
            delete this.hintLabel;
            _super.prototype.setItems$.call(this, items).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["switchMap"])((/**
             * @param {?} itms
             * @return {?}
             */
            function (itms) {
                if (_this.minSearchlength > 0 && !_this.query) {
                    // Waiting for query
                    _this._itemList = [];
                    _this.changeDetectorRef.markForCheck();
                    return Object(rxjs__WEBPACK_IMPORTED_MODULE_9__["of"])(itms);
                }
                else {
                    return _this.calcViewList$().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["map"])((/**
                     * @return {?}
                     */
                    function () { return itms; })));
                }
            })))
                .subscribe(noop);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaTreeListComponent.prototype, "loadingItems", {
        /**
         * Set a observable called before the list will be displayed
         */
        set: /**
         * Set a observable called before the list will be displayed
         * @param {?} fn
         * @return {?}
         */
        function (fn) {
            this.hasLoadingEvent = !!fn;
            _super.prototype.setLoadingItems.call(this, fn);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaTreeListComponent.prototype, "selectingItem", {
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
    Object.defineProperty(DejaTreeListComponent.prototype, "unselectingItem", {
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
    Object.defineProperty(DejaTreeListComponent.prototype, "expandingItem", {
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
    Object.defineProperty(DejaTreeListComponent.prototype, "collapsingItem", {
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
    Object.defineProperty(DejaTreeListComponent.prototype, "models", {
        /** Définit la liste des éléments (tout type d'objet métier) */
        set: /**
         * Définit la liste des éléments (tout type d'objet métier)
         * @param {?} items
         * @return {?}
         */
        function (items) {
            var _this = this;
            _super.prototype.setModels$.call(this, items).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["first"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["switchMap"])((/**
             * @return {?}
             */
            function () { return _this.calcViewList$(); })))
                .subscribe(noop);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaTreeListComponent.prototype, "disabled", {
        get: /**
         * @return {?}
         */
        function () {
            return this._disabled;
        },
        /** Permet de désactiver la liste */
        set: /**
         * Permet de désactiver la liste
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
    Object.defineProperty(DejaTreeListComponent.prototype, "waiter", {
        /** Retourne si le waiter doit être affiché dans la liste. */
        get: /**
         * Retourne si le waiter doit être affiché dans la liste.
         * @return {?}
         */
        function () { return this._waiter; },
        /** Definit si le waiter doit être affiché dans la liste. */
        set: /**
         * Definit si le waiter doit être affiché dans la liste.
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value !== undefined) {
                this._waiter = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaTreeListComponent.prototype, "inputValidatorDirective", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value) {
                value.parentControl = this._control;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaTreeListComponent.prototype, "currentItemIndex", {
        get: /**
         * @return {?}
         */
        function () {
            return this.getCurrentItemIndex();
        },
        set: /**
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
    Object.defineProperty(DejaTreeListComponent.prototype, "itemTemplate", {
        get: /**
         * @return {?}
         */
        function () {
            return this.itemTemplateExternal || this.itemTemplateInternal;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaTreeListComponent.prototype, "parentItemTemplate", {
        get: /**
         * @return {?}
         */
        function () {
            return this.parentItemTemplateExternal || this.parentItemTemplateInternal;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaTreeListComponent.prototype, "loaderTemplate", {
        get: /**
         * @return {?}
         */
        function () {
            return this.loaderTemplateExternal || this.loaderTemplateInternal;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaTreeListComponent.prototype, "headerTemplate", {
        get: /**
         * @return {?}
         */
        function () {
            return this.headerTemplateExternal || this.headerTemplateInternal;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaTreeListComponent.prototype, "searchPrefixTemplate", {
        get: /**
         * @return {?}
         */
        function () {
            return this.searchPrefixTemplateExternal || this.searchPrefixTemplateInternal;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaTreeListComponent.prototype, "searchSuffixTemplate", {
        get: /**
         * @return {?}
         */
        function () {
            return this.searchSuffixTemplateExternal || this.searchSuffixTemplateInternal;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaTreeListComponent.prototype, "value", {
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
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} value
     * @return {?}
     */
    DejaTreeListComponent.prototype.writeValue = /**
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
    DejaTreeListComponent.prototype.registerOnChange = /**
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
    DejaTreeListComponent.prototype.registerOnTouched = /**
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
    DejaTreeListComponent.prototype.setDisabledState = /**
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        this.disabled = isDisabled;
    };
    // ************* End of ControlValueAccessor Implementation **************
    /** Change l'état d'expansion de toute les lignes parentes */
    // ************* End of ControlValueAccessor Implementation **************
    /**
     * Change l'état d'expansion de toute les lignes parentes
     * @param {?=} collapsed
     * @return {?}
     */
    DejaTreeListComponent.prototype.toggleAll$ = 
    // ************* End of ControlValueAccessor Implementation **************
    /**
     * Change l'état d'expansion de toute les lignes parentes
     * @param {?=} collapsed
     * @return {?}
     */
    function (collapsed) {
        var _this = this;
        return _super.prototype.toggleAll$.call(this, collapsed).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["switchMap"])((/**
         * @param {?} items
         * @return {?}
         */
        function (items) { return _this.calcViewList$().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["first"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["map"])((/**
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
    DejaTreeListComponent.prototype.toggleAll = /**
     * Change l'état d'expansion de toute les lignes parentes
     * @param {?=} collapsed
     * @return {?}
     */
    function (collapsed) {
        this.toggleAll$(collapsed).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["first"])()).subscribe(noop);
    };
    /** Positionne a scrollbar pour assurer que l'élément spécifié soit visible */
    /**
     * Positionne a scrollbar pour assurer que l'élément spécifié soit visible
     * @param {?} item
     * @return {?}
     */
    DejaTreeListComponent.prototype.ensureItemVisible = /**
     * Positionne a scrollbar pour assurer que l'élément spécifié soit visible
     * @param {?} item
     * @return {?}
     */
    function (item) {
        _super.prototype.ensureItemVisible.call(this, item);
    };
    /** Efface le contenu de la liste */
    /**
     * Efface le contenu de la liste
     * @return {?}
     */
    DejaTreeListComponent.prototype.clearViewPort = /**
     * Efface le contenu de la liste
     * @return {?}
     */
    function () {
        _super.prototype.clearViewPort.call(this);
    };
    /**
     * @return {?}
     */
    DejaTreeListComponent.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        if (!this.items && this.options && this.options.length) {
            /** @type {?} */
            var selectedModels_1 = (/** @type {?} */ ([]));
            this.valueField = 'value';
            this.textField = 'text';
            /** @type {?} */
            var models = this.options.map((/**
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
                debugger;
                console.error('Select options with more than 100 items can have performance options. Please bind directly the items in code behind with items or models input.');
            }
        }
        this.contentInitialized$.next(true);
    };
    /**
     * @return {?}
     */
    DejaTreeListComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        // FIXME Issue angular/issues/6005
        // see http://stackoverflow.com/questions/34364880/expression-has-changed-after-it-was-checked
        if (this._itemList.length === 0 && (this.hasCustomService || this.hasLoadingEvent)) {
            Object(rxjs__WEBPACK_IMPORTED_MODULE_9__["timer"])(1).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["first"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["switchMap"])((/**
             * @return {?}
             */
            function () { return _this.calcViewList$(); })))
                .subscribe(noop);
        }
        Object(rxjs__WEBPACK_IMPORTED_MODULE_9__["fromEvent"])(this.listElement, 'scroll').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["takeWhile"])((/**
         * @return {?}
         */
        function () { return _this._isAlive; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["map"])((/**
         * @param {?} event
         * @return {?}
         */
        function (event) { return [event, event.target.scrollTop, event.target.scrollLeft]; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["map"])((/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_4__["__read"])(_a, 3), event = _b[0], scrollTop = _b[1], scrollLeft = _b[2];
            /** @type {?} */
            var e = (/** @type {?} */ ({
                originalEvent: event,
                scrollLeft: scrollLeft,
                scrollTop: scrollTop,
            }));
            _this.scroll.emit(e);
            return scrollTop;
        })))
            .subscribe((/**
         * @param {?} scrollPos
         * @return {?}
         */
        function (scrollPos) { return _this.viewPort.scrollPosition$.next(scrollPos); }));
        /** @type {?} */
        var keyDown$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_9__["fromEvent"])(this.listElement, 'keydown');
        if (this.input) {
            /** @type {?} */
            var inputKeyDown$ = (/** @type {?} */ (Object(rxjs__WEBPACK_IMPORTED_MODULE_9__["fromEvent"])(this.input.nativeElement, 'keydown')));
            keyDown$ = keyDown$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["merge"])(inputKeyDown$));
        }
        keyDown$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["takeWhile"])((/**
         * @return {?}
         */
        function () { return _this._isAlive; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["filter"])((/**
         * @return {?}
         */
        function () { return !_this.disabled; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["filter"])((/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            /** @type {?} */
            var keyCode = event.keyCode || ((/** @type {?} */ (_deja_js_core__WEBPACK_IMPORTED_MODULE_8__["KeyCodes"])))[event.code];
            return keyCode === _deja_js_core__WEBPACK_IMPORTED_MODULE_8__["KeyCodes"].Home ||
                keyCode === _deja_js_core__WEBPACK_IMPORTED_MODULE_8__["KeyCodes"].End ||
                keyCode === _deja_js_core__WEBPACK_IMPORTED_MODULE_8__["KeyCodes"].PageUp ||
                keyCode === _deja_js_core__WEBPACK_IMPORTED_MODULE_8__["KeyCodes"].PageDown ||
                keyCode === _deja_js_core__WEBPACK_IMPORTED_MODULE_8__["KeyCodes"].UpArrow ||
                keyCode === _deja_js_core__WEBPACK_IMPORTED_MODULE_8__["KeyCodes"].DownArrow ||
                keyCode === _deja_js_core__WEBPACK_IMPORTED_MODULE_8__["KeyCodes"].Space ||
                keyCode === _deja_js_core__WEBPACK_IMPORTED_MODULE_8__["KeyCodes"].Enter;
        })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["switchMap"])((/**
         * @param {?} event
         * @return {?}
         */
        function (event) { return _this.ensureListCaches$().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["map"])((/**
         * @return {?}
         */
        function () { return event; }))); })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["map"])((/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            if (!_this.rowsCount) {
                return true;
            }
            // Set current item from index for keyboard features only
            /** @type {?} */
            var setCurrentIndex = (/**
             * @param {?} index
             * @return {?}
             */
            function (index) {
                _this.currentItemIndex = index;
                _this.ensureItemVisible(_this.currentItemIndex);
                _this.viewPort.refresh();
            });
            /** @type {?} */
            var currentIndex = _this.rangeStartIndex >= 0 ? _this.rangeStartIndex : _this.rangeStartIndex = _this.currentItemIndex;
            /** @type {?} */
            var keyCode = event.keyCode || ((/** @type {?} */ (_deja_js_core__WEBPACK_IMPORTED_MODULE_8__["KeyCodes"])))[event.code];
            switch (keyCode) {
                case _deja_js_core__WEBPACK_IMPORTED_MODULE_8__["KeyCodes"].Home:
                    if (event.shiftKey) {
                        _this.selectRange$(currentIndex, 0).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["first"])()).subscribe(noop);
                    }
                    else if (!event.ctrlKey) {
                        _this.rangeStartIndex = 0;
                        _this.selectRange$(_this.rangeStartIndex).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["first"])()).subscribe(noop);
                    }
                    setCurrentIndex(0);
                    return false;
                case _deja_js_core__WEBPACK_IMPORTED_MODULE_8__["KeyCodes"].End:
                    if (event.shiftKey) {
                        _this.selectRange$(currentIndex, _this.rowsCount - 1).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["first"])()).subscribe(noop);
                    }
                    else if (!event.ctrlKey) {
                        _this.rangeStartIndex = _this.rowsCount - 1;
                        _this.selectRange$(_this.rangeStartIndex).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["first"])()).subscribe(noop);
                    }
                    setCurrentIndex(_this.rowsCount - 1);
                    return false;
                case _deja_js_core__WEBPACK_IMPORTED_MODULE_8__["KeyCodes"].PageUp:
                    /** @type {?} */
                    var upindex = Math.max(0, _this.currentItemIndex - _this._pageSize);
                    if (event.shiftKey) {
                        _this.selectRange$(currentIndex, upindex).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["first"])()).subscribe(noop);
                    }
                    else if (!event.ctrlKey) {
                        _this.rangeStartIndex = upindex;
                        _this.selectRange$(_this.rangeStartIndex).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["first"])()).subscribe(noop);
                    }
                    setCurrentIndex(upindex);
                    return false;
                case _deja_js_core__WEBPACK_IMPORTED_MODULE_8__["KeyCodes"].PageDown:
                    /** @type {?} */
                    var dindex = Math.min(_this.rowsCount - 1, _this.currentItemIndex + _this._pageSize);
                    if (event.shiftKey) {
                        _this.selectRange$(currentIndex, dindex).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["first"])()).subscribe(noop);
                    }
                    else if (!event.ctrlKey) {
                        _this.rangeStartIndex = dindex;
                        _this.selectRange$(_this.rangeStartIndex).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["first"])()).subscribe(noop);
                    }
                    setCurrentIndex(dindex);
                    return false;
                case _deja_js_core__WEBPACK_IMPORTED_MODULE_8__["KeyCodes"].UpArrow:
                    /** @type {?} */
                    var uaindex = Math.max(0, _this.currentItemIndex - 1);
                    if (uaindex !== -1) {
                        if (event.shiftKey) {
                            _this.selectRange$(currentIndex, uaindex).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["first"])()).subscribe(noop);
                        }
                        else if (!event.ctrlKey) {
                            _this.rangeStartIndex = uaindex;
                            _this.selectRange$(_this.rangeStartIndex).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["first"])()).subscribe(noop);
                        }
                        setCurrentIndex(uaindex);
                    }
                    return false;
                case _deja_js_core__WEBPACK_IMPORTED_MODULE_8__["KeyCodes"].DownArrow:
                    /** @type {?} */
                    var daindex = Math.min(_this.rowsCount - 1, _this.currentItemIndex + 1);
                    if (daindex !== -1) {
                        if (event.shiftKey) {
                            _this.selectRange$(currentIndex, daindex).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["first"])()).subscribe(noop);
                        }
                        else if (!event.ctrlKey) {
                            _this.rangeStartIndex = daindex;
                            _this.selectRange$(_this.rangeStartIndex).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["first"])()).subscribe(noop);
                        }
                        setCurrentIndex(daindex);
                    }
                    return false;
                case _deja_js_core__WEBPACK_IMPORTED_MODULE_8__["KeyCodes"].Space:
                    /** @type {?} */
                    var target = (/** @type {?} */ (event.target));
                    if (target.tagName === 'INPUT' && !event.ctrlKey && !event.shiftKey) {
                        return true;
                    }
                    /** @type {?} */
                    var sitem_1 = (/** @type {?} */ (_this.currentItem));
                    if (sitem_1) {
                        if (_this.isCollapsible(sitem_1)) {
                            _this.toggleCollapse$(currentIndex, !sitem_1.collapsed).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["first"])()).subscribe(noop);
                        }
                        else if (sitem_1.selected) {
                            _this.toggleSelect$([sitem_1], false).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["first"])()).subscribe(noop);
                        }
                        else if (_this.multiSelect && event.ctrlKey) {
                            _this.toggleSelect$([sitem_1], !sitem_1.selected).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["first"])()).subscribe(noop);
                        }
                        else {
                            _this.unselectAll$().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["switchMap"])((/**
                             * @return {?}
                             */
                            function () { return _this.toggleSelect$([sitem_1], true); })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["first"])())
                                .subscribe(noop);
                        }
                    }
                    return false;
                case _deja_js_core__WEBPACK_IMPORTED_MODULE_8__["KeyCodes"].Enter:
                    /** @type {?} */
                    var eitem_1 = (/** @type {?} */ (_this.currentItem));
                    if (eitem_1) {
                        if (_this.isCollapsible(eitem_1)) {
                            _this.toggleCollapse$(currentIndex, !eitem_1.collapsed).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["first"])()).subscribe(noop);
                        }
                        else if (_this.isSelectable(eitem_1)) {
                            _this.unselectAll$().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["switchMap"])((/**
                             * @return {?}
                             */
                            function () { return _this.toggleSelect$([eitem_1], true); })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["first"])())
                                .subscribe(noop);
                        }
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
        var keyUp$ = (/** @type {?} */ (Object(rxjs__WEBPACK_IMPORTED_MODULE_9__["fromEvent"])(this.listElement, 'keyup')));
        if (this.input) {
            /** @type {?} */
            var inputKeyup$ = (/** @type {?} */ (Object(rxjs__WEBPACK_IMPORTED_MODULE_9__["fromEvent"])(this.input.nativeElement, 'keyup')));
            /** @type {?} */
            var inputDrop$ = (/** @type {?} */ (Object(rxjs__WEBPACK_IMPORTED_MODULE_9__["fromEvent"])(this.input.nativeElement, 'drop')));
            keyUp$ = keyUp$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["merge"])(inputKeyup$, inputDrop$));
        }
        // Ensure list cache
        keyUp$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["takeWhile"])((/**
         * @return {?}
         */
        function () { return _this._isAlive; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["filter"])((/**
         * @return {?}
         */
        function () { return !_this.disabled; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["tap"])((/**
         * @return {?}
         */
        function () {
            if ((_this.query || '').length < _this.minSearchlength) {
                _this._itemList = [];
                return;
            }
        })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["filter"])((/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            /** @type {?} */
            var keyCode = event.keyCode || ((/** @type {?} */ (_deja_js_core__WEBPACK_IMPORTED_MODULE_8__["KeyCodes"])))[event.code];
            return keyCode >= _deja_js_core__WEBPACK_IMPORTED_MODULE_8__["KeyCodes"].Key0 ||
                keyCode === _deja_js_core__WEBPACK_IMPORTED_MODULE_8__["KeyCodes"].Backspace ||
                keyCode === _deja_js_core__WEBPACK_IMPORTED_MODULE_8__["KeyCodes"].Space ||
                keyCode === _deja_js_core__WEBPACK_IMPORTED_MODULE_8__["KeyCodes"].Delete;
        })))
            .subscribe((/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            // Set current item from index for keyboard features only
            /** @type {?} */
            var setCurrentIndex = (/**
             * @param {?} index
             * @return {?}
             */
            function (index) {
                _this.currentItemIndex = index;
                _this.ensureItemVisible(_this.currentItemIndex);
            });
            if (!_this.searchArea) {
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
                        event.preventDefault();
                        return false;
                    }), _this.currentItemIndex).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["first"])())
                        .subscribe((/**
                     * @param {?} result
                     * @return {?}
                     */
                    function (result) {
                        if (result.index >= 0) {
                            setCurrentIndex(result.index);
                        }
                    }));
                }
            }
            else {
                // Autocomplete, filter the list
                _this.keyboardNavigation$.next();
            }
        }));
        this.viewPort.element$.next(this.listElement);
    };
    /**
     * @param {?} e
     * @return {?}
     */
    DejaTreeListComponent.prototype.mousedown = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        var _this = this;
        if (this.mouseUp$sub) {
            this.mouseUp$sub.unsubscribe();
            this.mouseUp$sub = undefined;
        }
        if (this.disabled) {
            return undefined;
        }
        /** @type {?} */
        var target = (/** @type {?} */ (e.target));
        /** @type {?} */
        var itemIndex = this.getItemIndexFromHTMLElement(target);
        if (itemIndex === undefined) {
            return undefined;
        }
        /** @type {?} */
        var isExpandButton = (/**
         * @param {?} el
         * @return {?}
         */
        function (el) {
            return el.id === 'expandbtn' || el.parentElement.id === 'expandbtn';
        });
        /** @type {?} */
        var item = this._itemList[itemIndex - this.vpStartRow];
        this.clickedItem = item;
        if ((!isExpandButton(target) || !this.isCollapsible(item)) && this.isSelectable(item) && (!e.ctrlKey || !this.multiSelect) && (e.button === 0 || !item.selected)) {
            if (e.shiftKey && this.multiSelect) {
                // Select all from current to clicked
                this.selectRange$(itemIndex, this.currentItemIndex).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["first"])())
                    .subscribe((/**
                 * @return {?}
                 */
                function () { return _this.changeDetectorRef.markForCheck(); }));
                return false;
            }
            else if (!e.ctrlKey) {
                if (!this.multiSelect && item.selected) {
                    return undefined;
                }
                this.unselectAll$().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["first"])()).subscribe((/**
                 * @return {?}
                 */
                function () {
                    _this.currentItemIndex = itemIndex;
                    _this.toggleSelect$([item], true).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["first"])())
                        .subscribe((/**
                     * @return {?}
                     */
                    function () { return _this.changeDetectorRef.markForCheck(); }));
                }));
            }
        }
        this.mouseUp$sub = Object(rxjs__WEBPACK_IMPORTED_MODULE_9__["fromEvent"])(this.listElement, 'mouseup').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["first"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["filter"])((/**
         * @return {?}
         */
        function () { return !_this.disabled; })))
            .subscribe((/**
         * @param {?} upevt
         * @return {?}
         */
        function (upevt) {
            // Because .first()
            _this.mouseUp$sub = undefined;
            /** @type {?} */
            var upTarget = (/** @type {?} */ (upevt.target));
            /** @type {?} */
            var upIndex = _this.getItemIndexFromHTMLElement(upTarget);
            if (upIndex === undefined) {
                return;
            }
            /** @type {?} */
            var upItem = _this._itemList[upIndex - _this.vpStartRow];
            if (_this.clickedItem && upItem !== _this.clickedItem) {
                return;
            }
            if (upevt.shiftKey) {
                return;
            }
            if (upevt.button !== 0) {
                // Right click menu
                return;
            }
            if (_this.isCollapsible(upItem) && (isExpandButton(upTarget) || !_this.isSelectable(upItem))) {
                /** @type {?} */
                var treeItem = (/** @type {?} */ (upItem));
                _this.toggleCollapse$(upIndex, !treeItem.collapsed).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["first"])()).subscribe((/**
                 * @return {?}
                 */
                function () {
                    _this.currentItemIndex = upIndex;
                }));
            }
            else if (upevt.ctrlKey) {
                if (_this.multiSelect) {
                    _this.toggleSelect$([upItem], !upItem.selected).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["first"])())
                        .subscribe((/**
                     * @return {?}
                     */
                    function () {
                        _this.currentItemIndex = upIndex;
                        _this.changeDetectorRef.markForCheck();
                    }));
                }
                else {
                    /** @type {?} */
                    var o = _this.selectedItem && _this.selectedItem !== upItem ? _this.toggleSelect$([_this.selectedItem], false).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["switchMap"])((/**
                     * @return {?}
                     */
                    function () { return _this.toggleSelect$([upItem], true); }))) : _this.toggleSelect$([upItem], !upItem.selected);
                    o.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["first"])())
                        .subscribe((/**
                     * @return {?}
                     */
                    function () {
                        _this.currentItemIndex = upIndex;
                        _this.changeDetectorRef.markForCheck();
                    }));
                }
            }
            _this.rangeStartIndex = -1;
        }));
    };
    /**
     * @param {?} index
     * @return {?}
     */
    DejaTreeListComponent.prototype.getDragContext = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        var _this = this;
        if (!this.clipboardService || (!this.sortable && !this.itemsDraggable)) {
            return null;
        }
        return {
            dragendcallback: (/**
             * @param {?} event
             * @return {?}
             */
            function (event) {
                _this.itemDragEnd.emit(event);
                delete _this._ddStartIndex;
                delete _this._ddTargetIndex;
                _this.calcViewList$().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["first"])()).subscribe(noop); // Comment this line to debug dragdrop
            }),
            dragstartcallback: (/**
             * @param {?} event
             * @return {?}
             */
            function (event) {
                /** @type {?} */
                var targetIndex = _this.getItemIndexFromHTMLElement((/** @type {?} */ (event.target)));
                if (targetIndex === undefined) {
                    return;
                }
                _this._ddStartIndex = index;
                event.dragObject = _this._itemList[targetIndex - _this.vpStartRow];
                _this.itemDragStart.emit(event);
            }),
            object: {
                index: index,
            },
        };
    };
    /**
     * @return {?}
     */
    DejaTreeListComponent.prototype.getDropContext = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this.clipboardService || !this.sortable) {
            return null;
        }
        /** @type {?} */
        var dragcallback = (/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            if (_this._ddStartIndex === undefined) {
                return;
            }
            /** @type {?} */
            var targetIndex = _this.getItemIndexFromHTMLElement((/** @type {?} */ (event.target)));
            if (targetIndex === undefined) {
                return;
            }
            // Faire calculer le target final en fonction de la hierarchie par le service
            _this.calcDragTargetIndex$(_this._ddStartIndex, targetIndex).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["switchMap"])((/**
             * @param {?} finalTarget
             * @return {?}
             */
            function (finalTarget) {
                if (finalTarget !== undefined && finalTarget !== _this._ddTargetIndex) {
                    _this._ddTargetIndex = finalTarget;
                    return _this.calcViewList$().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["first"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["map"])((/**
                     * @return {?}
                     */
                    function () { return finalTarget; })));
                }
                else {
                    return Object(rxjs__WEBPACK_IMPORTED_MODULE_9__["of"])(finalTarget);
                }
            })))
                .subscribe(noop);
            event.preventDefault();
            return;
        });
        return {
            dragentercallback: dragcallback,
            dragovercallback: dragcallback,
            dropcallback: (/**
             * @param {?} event
             * @return {?}
             */
            function (event) {
                delete _this._ddStartIndex;
                delete _this._ddTargetIndex;
                _this.drop$().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["switchMap"])((/**
                 * @return {?}
                 */
                function () { return _this.calcViewList$().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["first"])()); })))
                    .subscribe(noop);
                event.preventDefault();
            }),
        };
    };
    /**
     * @param {?} event
     * @return {?}
     */
    DejaTreeListComponent.prototype.dragLeave = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var listRect = this.listElement.getBoundingClientRect();
        /** @type {?} */
        var listBounds = _deja_js_core__WEBPACK_IMPORTED_MODULE_8__["Rect"].fromLTRB(listRect.left, listRect.top, listRect.right, listRect.bottom);
        if (!listBounds.containsPoint(new _deja_js_core__WEBPACK_IMPORTED_MODULE_8__["Position"](event.pageX, event.pageY))) {
            this._ddTargetIndex = this._ddStartIndex;
            this.calcViewList$().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["first"])()).subscribe(noop);
        }
    };
    /**
     * @return {?}
     */
    DejaTreeListComponent.prototype.onSelectionChange = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var outputEmitter = null;
        /** @type {?} */
        var output = null;
        if (this.multiSelect) {
            /** @type {?} */
            var models = this.selectedModels;
            outputEmitter = (/** @type {?} */ ({
                items: this.selectedItems,
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
            var model = this.selectedModel;
            outputEmitter = (/** @type {?} */ ({
                item: this.selectedItems[0],
                model: model,
            }));
            if (this.modelIsValue) {
                /** @type {?} */
                var valueField = this.getValueField();
                output = model[valueField] !== undefined ? model[valueField] : model;
            }
            else {
                output = model;
            }
        }
        this.onChangeCallback(output);
        this.selectedChange.emit(outputEmitter);
    };
    /**
     * @param {?} indexFrom
     * @param {?=} indexTo
     * @return {?}
     */
    DejaTreeListComponent.prototype.selectRange$ = /**
     * @param {?} indexFrom
     * @param {?=} indexTo
     * @return {?}
     */
    function (indexFrom, indexTo) {
        var _this = this;
        return _super.prototype.selectRange$.call(this, indexFrom, indexTo).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["tap"])((/**
         * @param {?} selectedCount
         * @return {?}
         */
        function (selectedCount) {
            if (selectedCount) {
                // Raise event
                _this.onSelectionChange();
            }
            return selectedCount;
        })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["tap"])((/**
         * @return {?}
         */
        function () { return _this.changeDetectorRef.markForCheck(); })));
    };
    /**
     * @param {?} items
     * @param {?} state
     * @return {?}
     */
    DejaTreeListComponent.prototype.toggleSelect$ = /**
     * @param {?} items
     * @param {?} state
     * @return {?}
     */
    function (items, state) {
        var _this = this;
        if (!this._multiSelect && !items[0].selected === !state) {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_9__["of"])(items);
        }
        else {
            return _super.prototype.toggleSelect$.call(this, items, state).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["tap"])((/**
             * @return {?}
             */
            function () {
                // Raise event
                _this.onSelectionChange();
            })));
        }
    };
    /**
     * @return {?}
     */
    DejaTreeListComponent.prototype.calcViewList$ = /**
     * @return {?}
     */
    function () {
        var _this = this;
        return _super.prototype.calcViewList$.call(this, this.query).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["tap"])((/**
         * @return {?}
         */
        function () { return _this.changeDetectorRef.markForCheck(); })));
    };
    /**
     * @param {?} item
     * @return {?}
     */
    DejaTreeListComponent.prototype.getItemClass = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        /** @type {?} */
        var classNames = (/** @type {?} */ (['listitem']));
        if (item.className) {
            classNames.push(item.className);
        }
        if (item.collapsing || item.expanding) {
            classNames.push('hide');
        }
        if (item.depth < this.depthMax) {
            classNames.push('parent');
        }
        if (item.collapsed) {
            classNames.push('collapsed');
        }
        if (item.selected) {
            classNames.push('selected');
        }
        if (item.selectable === false) {
            classNames.push('unselectable');
        }
        if (item.depth === this._depthMax && item.odd) {
            classNames.push('odd');
        }
        return classNames.join(' ');
    };
    DejaTreeListComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Component"], args: [{
                    changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_6__["ChangeDetectionStrategy"].OnPush,
                    encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_6__["ViewEncapsulation"].None,
                    providers: [_deja_js_core__WEBPACK_IMPORTED_MODULE_8__["ViewPortService"]],
                    selector: 'deja-tree-list',
                    template: "<div id=\"header\" *ngIf=\"searchArea\">\n    <mat-form-field deja-child-validator id=\"input\" *ngIf=\"searchArea\">\n        <input #inputelement type=\"text\" matInput tabindex=\"0\" [ngModel]=\"query\" [placeholder]=\"placeholder\" [disabled]=\"disabled\" (input)=\"setQuery$.next(model && model.value)\" #model=\"ngModel\">\n        <span *ngIf=\"searchPrefixTemplate\" matPrefix>\n\t\t\t<ng-template [ngTemplateOutlet]=\"searchPrefixTemplate\"></ng-template>\n\t\t</span>\n        <span *ngIf=\"searchSuffixTemplate\" matSuffix>\n\t\t\t<ng-template [ngTemplateOutlet]=\"searchSuffixTemplate\"></ng-template>\n\t\t</span>\n    </mat-form-field>\n</div>\n<div id=\"listheader\" *ngIf=\"headerTemplate\">\n    <ng-template [ngTemplateOutlet]=\"headerTemplate\"></ng-template>\n</div>\n<div [id]=\"listElementId\" #listElement class=\"deja-listcontainer\" [attr.itemscount]=\"itemList && itemList.length\" [attr.depth-max]=\"depthMax || null\" [attr.vp-rowheight]=\"getViewPortRowHeight()\" [style.max-height.px]=\"maxHeight || null\" tabindex=\"1\" [class.hasheader]=\"headerTemplate\" [class.dragover]=\"ddStartIndex !== undefined ? ddStartIndex : null\" [attr.keynav]=\"keyboardNavigation()\" (dragleave)=\"sortable ? dragLeave($event): null\" (mousedown)=\"mousedown($event)\" [deja-droppable]=\"getDropContext()\">\n    <div id=\"nodata-holder\" *ngIf=\"(!itemList || itemList.length === 0) && !waiter\">{{ nodataholder }}</div>\n    <div id=\"error-hint\" *ngIf=\"hintLabel\">{{ hintLabel }}</div>\n    <div *ngIf=\"vpBeforeHeight && !waiter\" [style.height.px]=\"vpBeforeHeight\"></div>\n    <ng-container *ngIf=\"!waiter\">\n        <div *ngFor=\"let item of treeItemList; let index = index\" #listitem [attr.class]=\"getItemClass(item)\" [attr.current]=\"(vpStartRow+index === currentItemIndex) || null\" [attr.depth]=\"depthMax ? item.depth : null\" [attr.id]=\"item.id || null\" [attr.flat]=\"vpStartRow + index\" [deja-draggable]=\"getDragContext(vpStartRow + index)\" [style.width.px]=\"itemsWidth\" [style.height.px]=\"getItemHeight(item)\">\n            <span id=\"expandbtn\">\n                <mat-icon *ngIf=\"item.$items?.length\">arrow_drop_down</mat-icon>\n            </span>\n            \n            <ng-container *ngIf=\"(!item.$items || !parentItemTemplate) && (item.$items || !itemTemplate)\">{{ getTextValue(item) }}</ng-container>\n            <ng-container class=\"item-content\" *ngIf=\"item.$items && parentItemTemplate\">\n                <ng-template [ngTemplateOutlet]=\"parentItemTemplate\" [ngTemplateOutletContext]=\"{ $implicit: item, query: query, flatindex: vpStartRow+index }\"></ng-template>\n            </ng-container>\n            <ng-container class=\"item-content\" *ngIf=\"!item.$items && itemTemplate\">\n                <ng-template [ngTemplateOutlet]=\"itemTemplate\" [ngTemplateOutletContext]=\"{ $implicit: item, query: query, flatindex: vpStartRow+index }\"></ng-template>\n            </ng-container>\n        </div>\n    </ng-container>\n    <div *ngIf=\"vpAfterHeight && !waiter\" [style.height.px]=\"vpAfterHeight\"></div>\n    <deja-list-loader id=\"loader\" *ngIf=\"waiter && !loaderTemplate\"></deja-list-loader>\n    <ng-container *ngIf=\"waiter && loaderTemplate\">\n        <ng-template [ngTemplateOutlet]=\"loaderTemplate\"></ng-template>\n    </ng-container>\n</div>",
                    styles: ["deja-tree-list{display:flex;position:relative;flex-direction:column;align-content:stretch;overflow:hidden}deja-tree-list.ng-invalid #input .mat-form-field-wrapper .mat-form-field-underline .mat-form-field-ripple{opacity:1;-webkit-transform:scaleY(1);transform:scaleY(1)}deja-tree-list #input{outline:0}deja-tree-list #header{flex:0 0 auto;align-items:center;display:flex}deja-tree-list #header #input{flex:1 1 auto}deja-tree-list #header button{flex:0 0 auto;margin:16px .5rem 16px 0}deja-tree-list #listheader{flex:0 0 auto;overflow:hidden;box-sizing:border-box}deja-tree-list .deja-listcontainer{flex:1 1 auto;outline:0;overflow:auto;padding:0;margin:0;position:relative}deja-tree-list .deja-listcontainer.hasheader{border-top:0}deja-tree-list .deja-listcontainer[keynav=false]:not(.dragover) div.listitem:not(.unselectable):hover{cursor:pointer}deja-tree-list .deja-listcontainer[valign=bottom]{border-top:none}deja-tree-list .deja-listcontainer #error-hint,deja-tree-list .deja-listcontainer #nodata-holder{margin:.5rem}deja-tree-list #loader{position:absolute;left:0;right:0}deja-tree-list .deja-listcontainer[vprowheight=\"0\"]>div.listitem{padding:.35rem .1rem}deja-tree-list .deja-listcontainer>div.listitem{opacity:1;margin:0;transition-timing-function:linear;transition-duration:.3s;transition-property:max-height,opacity;display:flex;align-items:center}deja-tree-list .deja-listcontainer>div.listitem.hide{opacity:0!important;max-height:0!important;transition-timing-function:ease-out}deja-tree-list .deja-listcontainer>div.listitem #expandbtn{width:24px;cursor:pointer}deja-tree-list .deja-listcontainer>div.listitem.parent.collapsed #expandbtn>.mat-icon{-webkit-transform:rotate(-90deg);transform:rotate(-90deg)}deja-tree-list .deja-listcontainer [depth=\"0\"]{padding-left:0}deja-tree-list .deja-listcontainer [depth=\"1\"]{padding-left:1rem}deja-tree-list .deja-listcontainer [depth=\"2\"]{padding-left:2rem}deja-tree-list .deja-listcontainer [depth=\"3\"]{padding-left:3rem}deja-tree-list .deja-listcontainer [depth=\"4\"]{padding-left:4rem}deja-tree-list .deja-listcontainer [depth=\"5\"]{padding-left:5rem}deja-tree-list .deja-listcontainer [depth=\"6\"]{padding-left:6rem}deja-tree-list .deja-listcontainer [depth=\"7\"]{padding-left:7rem}deja-tree-list .deja-listcontainer [depth=\"8\"]{padding-left:8rem}deja-tree-list .deja-listcontainer [depth=\"9\"]{padding-left:9rem}deja-tree-list .deja-listcontainer [depth=\"10\"]{padding-left:10rem}deja-tree-list .deja-listcontainer [depth=\"11\"]{padding-left:11rem}deja-tree-list .deja-listcontainer [depth=\"12\"]{padding-left:12rem}deja-tree-list .deja-listcontainer [depth=\"13\"]{padding-left:13rem}deja-tree-list .deja-listcontainer [depth=\"14\"]{padding-left:14rem}deja-tree-list .deja-listcontainer [depth=\"15\"]{padding-left:15rem}deja-tree-list .deja-listcontainer [depth=\"16\"]{padding-left:16rem}deja-tree-list .deja-listcontainer [depth=\"17\"]{padding-left:17rem}deja-tree-list .deja-listcontainer [depth=\"18\"]{padding-left:18rem}deja-tree-list .deja-listcontainer [depth=\"19\"]{padding-left:19rem}deja-tree-list .deja-listcontainer [depth=\"20\"]{padding-left:20rem}deja-tree-list .deja-listcontainer [depth=\"21\"]{padding-left:21rem}deja-tree-list .deja-listcontainer [depth=\"22\"]{padding-left:22rem}deja-tree-list .deja-listcontainer [depth=\"23\"]{padding-left:23rem}deja-tree-list .deja-listcontainer [depth=\"24\"]{padding-left:24rem}deja-tree-list .deja-listcontainer [depth=\"25\"]{padding-left:25rem}deja-tree-list .deja-listcontainer [depth=\"26\"]{padding-left:26rem}deja-tree-list .deja-listcontainer [depth=\"27\"]{padding-left:27rem}deja-tree-list .deja-listcontainer [depth=\"28\"]{padding-left:28rem}deja-tree-list .deja-listcontainer [depth=\"29\"]{padding-left:29rem}deja-tree-list .deja-listcontainer [depth=\"30\"]{padding-left:30rem}deja-tree-list .deja-listcontainer [depth=\"31\"]{padding-left:31rem}deja-tree-list .deja-listcontainer [depth=\"32\"]{padding-left:32rem}deja-tree-list .deja-listcontainer [depth=\"33\"]{padding-left:33rem}deja-tree-list .deja-listcontainer [depth=\"34\"]{padding-left:34rem}deja-tree-list .deja-listcontainer [depth=\"35\"]{padding-left:35rem}deja-tree-list .deja-listcontainer [depth=\"36\"]{padding-left:36rem}deja-tree-list .deja-listcontainer [depth=\"37\"]{padding-left:37rem}deja-tree-list .deja-listcontainer [depth=\"38\"]{padding-left:38rem}deja-tree-list .deja-listcontainer [depth=\"39\"]{padding-left:39rem}deja-tree-list .deja-listcontainer [depth=\"40\"]{padding-left:40rem}deja-tree-list .deja-listcontainer [depth=\"41\"]{padding-left:41rem}deja-tree-list .deja-listcontainer [depth=\"42\"]{padding-left:42rem}deja-tree-list .deja-listcontainer [depth=\"43\"]{padding-left:43rem}deja-tree-list .deja-listcontainer [depth=\"44\"]{padding-left:44rem}deja-tree-list .deja-listcontainer [depth=\"45\"]{padding-left:45rem}deja-tree-list .deja-listcontainer [depth=\"46\"]{padding-left:46rem}deja-tree-list .deja-listcontainer [depth=\"47\"]{padding-left:47rem}deja-tree-list .deja-listcontainer [depth=\"48\"]{padding-left:48rem}deja-tree-list .deja-listcontainer [depth=\"49\"]{padding-left:49rem}deja-tree-list .deja-listcontainer [depth=\"50\"]{padding-left:50rem}"]
                }] }
    ];
    /** @nocollapse */
    DejaTreeListComponent.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["ChangeDetectorRef"] },
        { type: _deja_js_core__WEBPACK_IMPORTED_MODULE_8__["ViewPortService"] },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["ElementRef"] },
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_7__["NgControl"], decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Self"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Optional"] }] },
        { type: _deja_js_core__WEBPACK_IMPORTED_MODULE_8__["DejaClipboardService"], decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Optional"] }] }
    ]; };
    DejaTreeListComponent.propDecorators = {
        placeholder: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        nodataholder: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        query: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        itemTemplateExternal: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        parentItemTemplateExternal: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        loaderTemplateExternal: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        headerTemplateExternal: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        searchPrefixTemplateExternal: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        searchSuffixTemplateExternal: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        itemsWidth: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        itemDragEnd: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Output"] }],
        itemDragStart: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Output"] }],
        scroll: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Output"] }],
        selectedChange: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Output"] }],
        viewPortChanged: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Output"] }],
        input: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["ViewChild"], args: ['inputelement',] }],
        itemTemplateInternal: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["ContentChild"], args: ['itemTemplate',] }],
        parentItemTemplateInternal: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["ContentChild"], args: ['parentItemTemplate',] }],
        loaderTemplateInternal: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["ContentChild"], args: ['loaderTemplate',] }],
        headerTemplateInternal: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["ContentChild"], args: ['headerTemplate',] }],
        searchPrefixTemplateInternal: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["ContentChild"], args: ['searchPrefixTemplate',] }],
        searchSuffixTemplateInternal: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["ContentChild"], args: ['searchSuffixTemplate',] }],
        options: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["ContentChildren"], args: [_deja_js_core__WEBPACK_IMPORTED_MODULE_8__["DejaItemComponent"],] }],
        _disabled: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["HostBinding"], args: ['attr.disabled',] }],
        listElememtRef: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["ViewChild"], args: ['listElement',] }],
        minSearchlength: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"], args: ['min-search-length',] }],
        searchArea: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        modelIsValue: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        sortable: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        itemsDraggable: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        pageSize: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        hintLabel: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        viewPortRowHeight: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        viewportMode: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        childrenField: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        textField: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        valueField: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        searchField: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        maxHeight: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        currentItem: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        multiSelect: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        selectedItems: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        selectedItem: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        selectedModel: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        selectedModels: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        itemListService: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        sortingService: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        groupingService: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        items: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        loadingItems: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        selectingItem: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        unselectingItem: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        expandingItem: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        collapsingItem: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        models: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        disabled: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        waiter: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["Input"] }],
        inputValidatorDirective: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["ViewChild"], args: [_deja_js_core__WEBPACK_IMPORTED_MODULE_8__["DejaChildValidatorDirective"],] }]
    };
    return DejaTreeListComponent;
}(_deja_js_core__WEBPACK_IMPORTED_MODULE_8__["ItemListBase"]));

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
var DejaTreeListScrollEvent = /** @class */ (function () {
    function DejaTreeListScrollEvent() {
    }
    return DejaTreeListScrollEvent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var DejaTreeListModule = /** @class */ (function () {
    function DejaTreeListModule() {
    }
    DejaTreeListModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_6__["NgModule"], args: [{
                    declarations: [
                        DejaTreeListComponent,
                    ],
                    exports: [
                        DejaTreeListComponent,
                    ],
                    imports: [
                        _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
                        _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormsModule"],
                        _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatButtonModule"],
                        _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatInputModule"],
                        _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatCheckboxModule"],
                        _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatIconModule"],
                        _deja_js_core__WEBPACK_IMPORTED_MODULE_8__["DejaChildValidatorModule"],
                        _deja_js_component_loaders__WEBPACK_IMPORTED_MODULE_3__["DejaListLoaderModule"],
                        _deja_js_component_dragdrop__WEBPACK_IMPORTED_MODULE_2__["DejaDragDropModule"],
                        _deja_js_core__WEBPACK_IMPORTED_MODULE_8__["DejaTextMetricsModule"],
                        _deja_js_core__WEBPACK_IMPORTED_MODULE_8__["DejaItemModule"],
                    ],
                },] }
    ];
    return DejaTreeListModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */



//# sourceMappingURL=deja-js-component-tree-list.js.map

/***/ })

}]);
//# sourceMappingURL=default~circular-picker-circular-picker-demo-module~color-selector-color-selector-demo-module~conten~35cd5166.js.map