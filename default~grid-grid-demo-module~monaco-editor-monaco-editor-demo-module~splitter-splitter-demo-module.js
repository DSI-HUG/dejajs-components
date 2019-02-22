(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~grid-grid-demo-module~monaco-editor-monaco-editor-demo-module~splitter-splitter-demo-module"],{

/***/ "./dist/deja-js/component/fesm5/deja-js-component-splitter.js":
/*!********************************************************************!*\
  !*** ./dist/deja-js/component/fesm5/deja-js-component-splitter.js ***!
  \********************************************************************/
/*! exports provided: DejaSplitterModule, ɵb, ɵc, ɵa */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DejaSplitterModule", function() { return DejaSplitterModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵb", function() { return SplitAreaDirective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵc", function() { return SplitGutterDirective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵa", function() { return DejaSplitterComponent; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/cdk/coercion */ "./node_modules/@angular/cdk/esm5/coercion.es5.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");




/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var gutterSize = 'gutterSize';
/** @type {?} */
var disabled = 'disabled';
/**
 * Splitter Component for Angular
 *
 * The splitter component allows to split horizontally or vertically, a container in N resizable part.
 */
var DejaSplitterComponent = /** @class */ (function () {
    /**
     * Constructor
     */
    function DejaSplitterComponent(cdRef, elementRef, renderer) {
        this.cdRef = cdRef;
        this.elementRef = elementRef;
        this.renderer = renderer;
        /**
         * Direction of the split
         * Can be `horizontal` or `vertical`
         */
        this.direction = 'horizontal';
        /**
         * Separator width
         */
        this.gutterSize = 10;
        /**
         * Disable the component
         */
        this.disabled = false;
        /**
         * Event triggered when the user start to drag the cursor
         */
        this.dragStart = new _angular_core__WEBPACK_IMPORTED_MODULE_2__["EventEmitter"](false);
        /**
         * Event triggered during the cursor's drag
         */
        this.dragProgress = new _angular_core__WEBPACK_IMPORTED_MODULE_2__["EventEmitter"](false);
        /**
         * Event triggered when the user stop to drag the cursor
         */
        this.dragEnd = new _angular_core__WEBPACK_IMPORTED_MODULE_2__["EventEmitter"](false);
        this._areas = [];
        this.isDragging = false;
        this.containerSize = 0;
        this.areaASize = 0;
        this.areaBSize = 0;
        this.eventsDragFct = [];
    }
    Object.defineProperty(DejaSplitterComponent.prototype, "styleFlexDirection", {
        /**
         * Host Binding
         */
        get: /**
         * Host Binding
         * @return {?}
         */
        function () {
            return this.direction === 'horizontal' ? 'row' : 'column';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaSplitterComponent.prototype, "styleWidth", {
        /**
         * Host Binding
         */
        get: /**
         * Host Binding
         * @return {?}
         */
        function () {
            return (this.width && !isNaN(this.width) && this.width > 0) ? this.width + "px" : '100%';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaSplitterComponent.prototype, "styleHeight", {
        /**
         * Host Binding
         */
        get: /**
         * Host Binding
         * @return {?}
         */
        function () {
            return (this.height && !isNaN(this.height) && this.height > 0) ? this.height + "px" : '100%';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaSplitterComponent.prototype, "nbGutters", {
        get: /**
         * @private
         * @return {?}
         */
        function () {
            return this._areas.length - 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaSplitterComponent.prototype, "areas", {
        get: /**
         * @return {?}
         */
        function () {
            return this._areas;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Lifecycle hook that is called when any data-bound property of a directive changes.
     */
    /**
     * Lifecycle hook that is called when any data-bound property of a directive changes.
     * @param {?} changes
     * @return {?}
     */
    DejaSplitterComponent.prototype.ngOnChanges = /**
     * Lifecycle hook that is called when any data-bound property of a directive changes.
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes[gutterSize] || changes[disabled]) {
            this.refresh();
        }
    };
    /**
     * Lifecycle hook that is called when a directive, pipe or service is destroyed.
     */
    /**
     * Lifecycle hook that is called when a directive, pipe or service is destroyed.
     * @return {?}
     */
    DejaSplitterComponent.prototype.ngOnDestroy = /**
     * Lifecycle hook that is called when a directive, pipe or service is destroyed.
     * @return {?}
     */
    function () {
        this.stopDragging();
    };
    /**
     * Add a new area into the component
     * @param component Area to add
     * @param orderUser Position of the new area into the component
     * @param sizeUser Size of the new area
     * @param minPixel Min size of the new area
     */
    /**
     * Add a new area into the component
     * @param {?} component Area to add
     * @param {?} orderUser Position of the new area into the component
     * @param {?} sizeUser Size of the new area
     * @param {?} minPixel Min size of the new area
     * @return {?}
     */
    DejaSplitterComponent.prototype.addArea = /**
     * Add a new area into the component
     * @param {?} component Area to add
     * @param {?} orderUser Position of the new area into the component
     * @param {?} sizeUser Size of the new area
     * @param {?} minPixel Min size of the new area
     * @return {?}
     */
    function (component, orderUser, sizeUser, minPixel) {
        this._areas.push({
            component: component,
            orderUser: orderUser,
            order: -1,
            sizeUser: sizeUser,
            size: -1,
            minPixel: minPixel,
        });
        this.refresh();
    };
    /**
     * Update an existing area into the component
     * @param component Area to update
     * @param orderUser Position of the area into the component
     * @param sizeUser Size of the area
     * @param minPixel  Min size of the area
     */
    /**
     * Update an existing area into the component
     * @param {?} component Area to update
     * @param {?} orderUser Position of the area into the component
     * @param {?} sizeUser Size of the area
     * @param {?} minPixel  Min size of the area
     * @return {?}
     */
    DejaSplitterComponent.prototype.updateArea = /**
     * Update an existing area into the component
     * @param {?} component Area to update
     * @param {?} orderUser Position of the area into the component
     * @param {?} sizeUser Size of the area
     * @param {?} minPixel  Min size of the area
     * @return {?}
     */
    function (component, orderUser, sizeUser, minPixel) {
        /** @type {?} */
        var item = this._areas.find((/**
         * @param {?} a
         * @return {?}
         */
        function (a) { return a.component === component; }));
        if (item) {
            item.orderUser = orderUser;
            item.sizeUser = sizeUser;
            item.minPixel = minPixel;
            this.refresh();
        }
    };
    /**
     * Delete an existing area into the component
     * @param area Area to delete
     */
    /**
     * Delete an existing area into the component
     * @param {?} area Area to delete
     * @return {?}
     */
    DejaSplitterComponent.prototype.removeArea = /**
     * Delete an existing area into the component
     * @param {?} area Area to delete
     * @return {?}
     */
    function (area) {
        /** @type {?} */
        var item = this._areas.find((/**
         * @param {?} a
         * @return {?}
         */
        function (a) { return a.component === area; }));
        if (item) {
            /** @type {?} */
            var index = this._areas.indexOf(item);
            this._areas.splice(index, 1);
            this._areas.forEach((/**
             * @param {?} a
             * @param {?} i
             * @return {?}
             */
            function (a, i) { return a.order = i * 2; }));
            this.refresh();
        }
    };
    /**
     * Function called when the user start to drag the cursor
     * @param startEvent drag event
     * @param gutterOrder separator number
     */
    /**
     * Function called when the user start to drag the cursor
     * @param {?} startEvent drag event
     * @param {?} gutterOrder separator number
     * @return {?}
     */
    DejaSplitterComponent.prototype.startDragging = /**
     * Function called when the user start to drag the cursor
     * @param {?} startEvent drag event
     * @param {?} gutterOrder separator number
     * @return {?}
     */
    function (startEvent, gutterOrder) {
        var _this = this;
        startEvent.preventDefault();
        if (this.disabled) {
            return;
        }
        /** @type {?} */
        var areaA = this._areas.find((/**
         * @param {?} a
         * @return {?}
         */
        function (a) { return a.order === gutterOrder - 1; }));
        /** @type {?} */
        var areaB = this._areas.find((/**
         * @param {?} a
         * @return {?}
         */
        function (a) { return a.order === gutterOrder + 1; }));
        if (!areaA || !areaB) {
            return;
        }
        /** @type {?} */
        var prop = (this.direction === 'horizontal') ? 'offsetWidth' : 'offsetHeight';
        this.containerSize = this.elementRef.nativeElement[prop];
        this.areaASize = this.containerSize * areaA.size / 100;
        this.areaBSize = this.containerSize * areaB.size / 100;
        /** @type {?} */
        var start = {
            x: startEvent.screenX,
            y: startEvent.screenY,
        };
        this.eventsDragFct.push(this.renderer.listenGlobal('document', 'mousemove', (/**
         * @param {?} e
         * @return {?}
         */
        function (e) { return _this.dragEvent(e, start, areaA, areaB); })));
        this.eventsDragFct.push(this.renderer.listenGlobal('document', 'touchmove', (/**
         * @param {?} e
         * @return {?}
         */
        function (e) { return _this.dragEvent(e, start, areaA, areaB); })));
        this.eventsDragFct.push(this.renderer.listenGlobal('document', 'mouseup', (/**
         * @return {?}
         */
        function () { return _this.stopDragging(); })));
        this.eventsDragFct.push(this.renderer.listenGlobal('document', 'touchend', (/**
         * @return {?}
         */
        function () { return _this.stopDragging(); })));
        this.eventsDragFct.push(this.renderer.listenGlobal('document', 'touchcancel', (/**
         * @return {?}
         */
        function () { return _this.stopDragging(); })));
        areaA.component.lockEvents();
        areaB.component.lockEvents();
        this.isDragging = true;
        this.notify('start');
    };
    /**
     * @return {?}
     */
    DejaSplitterComponent.prototype.refresh = /**
     * @return {?}
     */
    function () {
        this.stopDragging();
        // ORDERS: Set css 'order' property depending on user input or added order
        /** @type {?} */
        var nbCorrectOrder = this._areas.filter((/**
         * @param {?} a
         * @return {?}
         */
        function (a) { return a.orderUser !== null && !isNaN(a.orderUser); })).length;
        if (nbCorrectOrder === this._areas.length) {
            this._areas.sort((/**
             * @param {?} a
             * @param {?} b
             * @return {?}
             */
            function (a, b) { return +a.orderUser - +b.orderUser; }));
        }
        this._areas.forEach((/**
         * @param {?} a
         * @param {?} i
         * @return {?}
         */
        function (a, i) {
            a.order = i * 2;
            a.component.setStyle('order', a.order);
        }));
        // SIZES: Set css 'flex-basis' property depending on user input or equal sizes
        /** @type {?} */
        var totalSize = this._areas.map((/**
         * @param {?} a
         * @return {?}
         */
        function (a) { return a.sizeUser; })).reduce((/**
         * @param {?} acc
         * @param {?} s
         * @return {?}
         */
        function (acc, s) { return acc + s; }), 0);
        /** @type {?} */
        var toBeDefined = this._areas.filter((/**
         * @param {?} a
         * @return {?}
         */
        function (a) { return !a.sizeUser || isNaN(a.sizeUser); }));
        if ((totalSize < 99.99 || totalSize > 100.01) && this._areas.length > 1) {
            if (toBeDefined.length === 0) {
                // Map to 100%
                this._areas.forEach((/**
                 * @param {?} a
                 * @return {?}
                 */
                function (a) {
                    /** @type {?} */
                    var adjustedSize = Number(a.sizeUser) * 100 / totalSize;
                    a.size = adjustedSize;
                }));
            }
            else if (totalSize < 99.99) {
                // Share the remaining size to the undefined areas
                /** @type {?} */
                var remain_1 = (100 - totalSize);
                /** @type {?} */
                var toBeDefinedLength_1 = toBeDefined.length;
                toBeDefined.forEach((/**
                 * @param {?} a
                 * @return {?}
                 */
                function (a) {
                    /** @type {?} */
                    var size = remain_1 / toBeDefinedLength_1--;
                    a.size = size;
                    remain_1 -= size;
                }));
                this._areas
                    .filter((/**
                 * @param {?} a
                 * @return {?}
                 */
                function (a) { return a.sizeUser && !isNaN(a.sizeUser); }))
                    .forEach((/**
                 * @param {?} a
                 * @return {?}
                 */
                function (a) { return a.size = Number(a.sizeUser); }));
            }
            else {
                /** @type {?} */
                var size_1 = Number((100 / this._areas.length).toFixed(3));
                this._areas.forEach((/**
                 * @param {?} a
                 * @return {?}
                 */
                function (a) { return a.size = size_1; }));
            }
        }
        else if (totalSize === 0 && this._areas.length === 1) {
            this._areas[0].size = 100;
        }
        else {
            this._areas.forEach((/**
             * @param {?} a
             * @return {?}
             */
            function (a) { return a.size = Number(a.sizeUser); }));
        }
        this.refreshStyleSizes();
        this.cdRef.markForCheck();
    };
    /**
     * @private
     * @return {?}
     */
    DejaSplitterComponent.prototype.refreshStyleSizes = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var f = this.gutterSize * this.nbGutters / this._areas.length;
        this._areas.forEach((/**
         * @param {?} a
         * @return {?}
         */
        function (a) { return a.component.setStyle('flex-basis', "calc( " + a.size + "% - " + f + "px )"); }));
    };
    /**
     * @private
     * @param {?} event
     * @param {?} start
     * @param {?} areaA
     * @param {?} areaB
     * @return {?}
     */
    DejaSplitterComponent.prototype.dragEvent = /**
     * @private
     * @param {?} event
     * @param {?} start
     * @param {?} areaA
     * @param {?} areaB
     * @return {?}
     */
    function (event, start, areaA, areaB) {
        if (!this.isDragging) {
            return;
        }
        /** @type {?} */
        var end = {
            x: event.screenX,
            y: event.screenY,
        };
        this.drag(start, end, areaA, areaB);
    };
    /**
     * @private
     * @param {?} start
     * @param {?} end
     * @param {?} areaA
     * @param {?} areaB
     * @return {?}
     */
    DejaSplitterComponent.prototype.drag = /**
     * @private
     * @param {?} start
     * @param {?} end
     * @param {?} areaA
     * @param {?} areaB
     * @return {?}
     */
    function (start, end, areaA, areaB) {
        /** @type {?} */
        var offsetPixel = (this.direction === 'horizontal') ? (start.x - end.x) : (start.y - end.y);
        /** @type {?} */
        var newSizePixelA = this.areaASize - offsetPixel;
        /** @type {?} */
        var newSizePixelB = this.areaBSize + offsetPixel;
        /** @type {?} */
        var minPercentA = areaA.minPixel ? (areaA.minPixel + 5) / this.containerSize * 100 : 0;
        /** @type {?} */
        var minPercentB = areaB.minPixel ? (areaB.minPixel + 5) / this.containerSize * 100 : 0;
        /** @type {?} */
        var newSizePercentA = newSizePixelA / this.containerSize * 100;
        /** @type {?} */
        var newSizePercentB = newSizePixelB / this.containerSize * 100;
        if (newSizePercentA <= minPercentA) {
            newSizePercentA = minPercentA;
            newSizePercentB = areaA.size + areaB.size - minPercentA;
        }
        else if (newSizePercentB <= minPercentB) {
            newSizePercentB = minPercentB;
            newSizePercentA = areaA.size + areaB.size - minPercentB;
        }
        else {
            newSizePercentA = Number(newSizePercentA.toFixed(3));
            newSizePercentB = Number((areaA.size + areaB.size - newSizePercentA).toFixed(3));
        }
        areaA.size = newSizePercentA;
        areaB.size = newSizePercentB;
        this.refreshStyleSizes();
        this.notify('progress');
    };
    /**
     * @private
     * @return {?}
     */
    DejaSplitterComponent.prototype.stopDragging = /**
     * @private
     * @return {?}
     */
    function () {
        if (!this.isDragging) {
            return;
        }
        this._areas.forEach((/**
         * @param {?} a
         * @return {?}
         */
        function (a) { return a.component.unlockEvents(); }));
        while (this.eventsDragFct.length > 0) {
            /** @type {?} */
            var fct = this.eventsDragFct.pop();
            if (fct) {
                fct();
            }
        }
        this.containerSize = 0;
        this.areaASize = 0;
        this.areaBSize = 0;
        this.isDragging = false;
        this.notify('end');
    };
    /**
     * @private
     * @param {?} type
     * @return {?}
     */
    DejaSplitterComponent.prototype.notify = /**
     * @private
     * @param {?} type
     * @return {?}
     */
    function (type) {
        /** @type {?} */
        var data = this._areas.map((/**
         * @param {?} a
         * @return {?}
         */
        function (a) { return a.size; }));
        switch (type) {
            case 'start':
                return this.dragStart.emit(data);
            case 'progress':
                return this.dragProgress.emit(data);
            case 'end':
                return this.dragEnd.emit(data);
            default:
                return null;
        }
    };
    DejaSplitterComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"], args: [{
                    changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_2__["ChangeDetectionStrategy"].OnPush,
                    encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_2__["ViewEncapsulation"].None,
                    selector: 'deja-splitter',
                    template: "<ng-content></ng-content>\n<ng-template ngFor let-area [ngForOf]=\"areas\" let-index=\"index\" let-last=\"last\">\n    <split-gutter *ngIf=\"last === false\"\n                  [order]=\"index*2+1\"\n                  [direction]=\"direction\"\n                  [size]=\"gutterSize\"\n                  [disabled]=\"disabled\"\n                  (mousedown)=\"startDragging($event, index*2+1)\"\n                  (touchstart)=\"startDragging($event, index*2+1)\">\n\n    </split-gutter>\n</ng-template>",
                    styles: ["deja-splitter{display:flex;flex-wrap:nowrap;justify-content:flex-start}deja-splitter split-gutter{flex:0 0 10px;background-position:50%;background-repeat:no-repeat}deja-splitter split-area{flex-grow:0;flex-shrink:0;height:100%;overflow:hidden}"]
                }] }
    ];
    /** @nocollapse */
    DejaSplitterComponent.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["ChangeDetectorRef"] },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["ElementRef"] },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Renderer"] }
    ]; };
    DejaSplitterComponent.propDecorators = {
        direction: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"] }],
        width: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"] }],
        height: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"] }],
        gutterSize: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"] }],
        disabled: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"] }],
        dragStart: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Output"] }],
        dragProgress: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Output"] }],
        dragEnd: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Output"] }],
        styleFlexDirection: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["HostBinding"], args: ['style.flex-direction',] }],
        styleWidth: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["HostBinding"], args: ['style.width',] }],
        styleHeight: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["HostBinding"], args: ['style.height',] }]
    };
    return DejaSplitterComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Directive representing a panel in a Splitter Component
 */
var SplitAreaDirective = /** @class */ (function () {
    /**
     * Constructor
     */
    function SplitAreaDirective(elementRef, renderer, split) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.split = split;
        this._order = null;
        this._size = null;
        this._minSizePixel = 0;
        this.eventsLockFct = [];
    }
    Object.defineProperty(SplitAreaDirective.prototype, "order", {
        /**
         * Order position of the current area
         */
        set: /**
         * Order position of the current area
         * @param {?} value
         * @return {?}
         */
        function (value) {
            /** @type {?} */
            var v = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_1__["coerceNumberProperty"])(value);
            this._order = !isNaN(v) ? v : null;
            this.split.updateArea(this, this._order, this._size, this._minSizePixel);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitAreaDirective.prototype, "size", {
        /**
         * Size in percent of the current area
         */
        set: /**
         * Size in percent of the current area
         * @param {?} value
         * @return {?}
         */
        function (value) {
            /** @type {?} */
            var v = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_1__["coerceNumberProperty"])(value);
            this._size = !isNaN(v) ? v : null;
            this.split.updateArea(this, this._order, this._size, this._minSizePixel);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitAreaDirective.prototype, "minSizePixel", {
        /**
         * Min size in percent of the current area
         */
        set: /**
         * Min size in percent of the current area
         * @param {?} value
         * @return {?}
         */
        function (value) {
            /** @type {?} */
            var v = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_1__["coerceNumberProperty"])(value);
            this._minSizePixel = (!isNaN(v) && v > 0) ? v : 0;
            this.split.updateArea(this, this._order, this._size, this._minSizePixel);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Lifecycle hook that is called after data-bound properties of a directive are initialized.
     */
    /**
     * Lifecycle hook that is called after data-bound properties of a directive are initialized.
     * @return {?}
     */
    SplitAreaDirective.prototype.ngOnInit = /**
     * Lifecycle hook that is called after data-bound properties of a directive are initialized.
     * @return {?}
     */
    function () {
        this.split.addArea(this, this._order, this._size, this._minSizePixel);
    };
    /**
     * Lock the events
     */
    /**
     * Lock the events
     * @return {?}
     */
    SplitAreaDirective.prototype.lockEvents = /**
     * Lock the events
     * @return {?}
     */
    function () {
        this.eventsLockFct.push(this.renderer.listen(this.elementRef.nativeElement, 'selectstart', (/**
         * @return {?}
         */
        function () { return false; })));
        this.eventsLockFct.push(this.renderer.listen(this.elementRef.nativeElement, 'dragstart', (/**
         * @return {?}
         */
        function () { return false; })));
    };
    /**
     * Unlock the events
     */
    /**
     * Unlock the events
     * @return {?}
     */
    SplitAreaDirective.prototype.unlockEvents = /**
     * Unlock the events
     * @return {?}
     */
    function () {
        while (this.eventsLockFct.length > 0) {
            /** @type {?} */
            var fct = this.eventsLockFct.pop();
            if (fct) {
                fct();
            }
        }
    };
    /**
     * Set a style for the current area
     * @param key style key
     * @param value style value
     */
    /**
     * Set a style for the current area
     * @param {?} key style key
     * @param {?} value style value
     * @return {?}
     */
    SplitAreaDirective.prototype.setStyle = /**
     * Set a style for the current area
     * @param {?} key style key
     * @param {?} value style value
     * @return {?}
     */
    function (key, value) {
        this.renderer.setElementStyle(this.elementRef.nativeElement, key, value);
    };
    /**
     * Lifecycle hook that is called when a directive, pipe or service is destroyed.
     */
    /**
     * Lifecycle hook that is called when a directive, pipe or service is destroyed.
     * @return {?}
     */
    SplitAreaDirective.prototype.ngOnDestroy = /**
     * Lifecycle hook that is called when a directive, pipe or service is destroyed.
     * @return {?}
     */
    function () {
        this.split.removeArea(this);
    };
    SplitAreaDirective.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Directive"], args: [{
                    selector: 'split-area',
                },] }
    ];
    /** @nocollapse */
    SplitAreaDirective.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["ElementRef"] },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Renderer"] },
        { type: DejaSplitterComponent }
    ]; };
    SplitAreaDirective.propDecorators = {
        order: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"] }],
        size: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"] }],
        minSizePixel: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"] }]
    };
    return SplitAreaDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Separator for the spltter component
 */
var SplitGutterDirective = /** @class */ (function () {
    /**
     * Constructor
     */
    function SplitGutterDirective(elementRef, renderer) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this._disabled = false;
    }
    Object.defineProperty(SplitGutterDirective.prototype, "order", {
        /**
         * Order of the seperator
         */
        set: /**
         * Order of the seperator
         * @param {?} v
         * @return {?}
         */
        function (v) {
            this.setStyle('order', Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_1__["coerceNumberProperty"])(v));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitGutterDirective.prototype, "direction", {
        /**
         * Direction of the separator
         * Can be `horizontal` or `vertical`
         */
        set: /**
         * Direction of the separator
         * Can be `horizontal` or `vertical`
         * @param {?} v
         * @return {?}
         */
        function (v) {
            this._direction = v;
            this.refreshStyle();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitGutterDirective.prototype, "size", {
        /**
         * Separator size in pixel
         */
        set: /**
         * Separator size in pixel
         * @param {?} v
         * @return {?}
         */
        function (v) {
            if (!v) {
                this.setStyle('flex-basis', '');
            }
            else if (typeof v === 'string') {
                this.setStyle('flex-basis', Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_1__["coerceNumberProperty"])(v) + "px");
            }
            else {
                this.setStyle('flex-basis', v + "px");
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitGutterDirective.prototype, "disabled", {
        /**
         * Disable the separator
         * By default `false`
         */
        set: /**
         * Disable the separator
         * By default `false`
         * @param {?} v
         * @return {?}
         */
        function (v) {
            this._disabled = v;
            this.refreshStyle();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     * @return {?}
     */
    SplitGutterDirective.prototype.refreshStyle = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var state = this._disabled === true ? 'disabled' : this._direction;
        this.setStyle('cursor', this.getCursor(state));
        this.setStyle('background-image', "url(\"" + this.getImage(state) + "\")");
        // Add a content in css, to allow the gutter to take the full wize
        if (state === 'horizontal') {
            this.setStyle('content', " ");
        }
    };
    /**
     * @private
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    SplitGutterDirective.prototype.setStyle = /**
     * @private
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    function (key, value) {
        this.renderer.setElementStyle(this.elementRef.nativeElement, key, value);
    };
    /**
     * @private
     * @param {?} state
     * @return {?}
     */
    SplitGutterDirective.prototype.getCursor = /**
     * @private
     * @param {?} state
     * @return {?}
     */
    function (state) {
        switch (state) {
            case 'disabled':
                return 'default';
            case 'vertical':
                return 'row-resize';
            case 'horizontal':
                return 'col-resize';
            default:
                return null;
        }
    };
    /**
     * @private
     * @param {?} state
     * @return {?}
     */
    SplitGutterDirective.prototype.getImage = /**
     * @private
     * @param {?} state
     * @return {?}
     */
    function (state) {
        switch (state) {
            case 'disabled':
                return '';
            case 'vertical':
                return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAFCAMAAABl/6zIAAAABlBMVEUAAADMzMzIT8AyAAAAAXRSTlMAQObYZgAAABRJREFUeAFjYGRkwIMJSeMHlBkOABP7AEGzSuPKAAAAAElFTkSuQmCC';
            case 'horizontal':
                return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAeCAYAAADkftS9AAAAIklEQVQoU2M4c+bMfxAGAgYYmwGrIIiDjrELjpo5aiZeMwF+yNnOs5KSvgAAAABJRU5ErkJggg==';
            default:
                return null;
        }
    };
    SplitGutterDirective.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Directive"], args: [{
                    selector: 'split-gutter',
                },] }
    ];
    /** @nocollapse */
    SplitGutterDirective.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["ElementRef"] },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Renderer"] }
    ]; };
    SplitGutterDirective.propDecorators = {
        order: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"] }],
        direction: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"] }],
        size: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"] }],
        disabled: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"] }]
    };
    return SplitGutterDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var DejaSplitterModule = /** @class */ (function () {
    function DejaSplitterModule() {
    }
    DejaSplitterModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"], args: [{
                    declarations: [
                        DejaSplitterComponent,
                        SplitAreaDirective,
                        SplitGutterDirective,
                    ],
                    exports: [
                        DejaSplitterComponent,
                        SplitAreaDirective,
                        SplitGutterDirective,
                    ],
                    imports: [
                        _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
                    ],
                },] }
    ];
    return DejaSplitterModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */



//# sourceMappingURL=deja-js-component-splitter.js.map

/***/ })

}]);
//# sourceMappingURL=default~grid-grid-demo-module~monaco-editor-monaco-editor-demo-module~splitter-splitter-demo-module.js.map