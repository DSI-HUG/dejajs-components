(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["range-range-demo-module"],{

/***/ "./dist/deja-js/component/fesm5/deja-js-component-range.js":
/*!*****************************************************************!*\
  !*** ./dist/deja-js/component/fesm5/deja-js-component-range.js ***!
  \*****************************************************************/
/*! exports provided: DejaRangeModule, Range, DejaRangeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DejaRangeModule", function() { return DejaRangeModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Range", function() { return Range; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DejaRangeComponent", function() { return DejaRangeComponent; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/cdk/coercion */ "./node_modules/@angular/cdk/esm5/coercion.es5.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");








/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * IRange class implementation
 */
var  /**
 * IRange class implementation
 */
Range = /** @class */ (function () {
    function Range(min, max, $width) {
        this.min = min;
        this.max = max;
        this.$width = $width;
    }
    return Range;
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
var DejaRangeComponent = /** @class */ (function () {
    function DejaRangeComponent(changeDetectorRef, elementRef, _control) {
        this.changeDetectorRef = changeDetectorRef;
        this.elementRef = elementRef;
        this._control = _control;
        // step can be either a numeric value, an array of accepted intervals or a function returning the next accepted interval
        this.step = 1;
        // index of the selected range
        this.selected = 0;
        // emit the selected range
        this.select = new _angular_core__WEBPACK_IMPORTED_MODULE_3__["EventEmitter"]();
        // error emitter, used to notify the outside when forbidden actions are performed
        this.errorFeedback = new _angular_core__WEBPACK_IMPORTED_MODULE_3__["EventEmitter"]();
        // minimum range percentage, used to avoid 2 separator being on the same visual space
        this.minimumRangePercentage = 0.01;
        this._readOnly = true;
        this._disabled = false;
        this._onChangeCallback = noop;
        this._onTouchCallback = noop;
        if (this._control) {
            this._control.valueAccessor = this;
        }
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    DejaRangeComponent.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) { this._onChangeCallback = fn; };
    /**
     * @param {?} fn
     * @return {?}
     */
    DejaRangeComponent.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) { this._onTouchCallback = fn; };
    Object.defineProperty(DejaRangeComponent.prototype, "ranges", {
        // inner model
        get: 
        // inner model
        /**
         * @return {?}
         */
        function () {
            return this._ranges || [];
        },
        set: /**
         * @param {?} ranges
         * @return {?}
         */
        function (ranges) {
            if (!!ranges) {
                this.writeValue(ranges);
                this._onChangeCallback(ranges);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaRangeComponent.prototype, "disabled", {
        get: /**
         * @return {?}
         */
        function () {
            return this._disabled;
        },
        // read / write mode
        set: 
        // read / write mode
        /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._disabled = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_2__["coerceBooleanProperty"])(value);
            this.changeDetectorRef.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaRangeComponent.prototype, "readOnly", {
        get: /**
         * @return {?}
         */
        function () {
            return this._readOnly || this.disabled;
        },
        // read / write mode
        set: 
        // read / write mode
        /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._readOnly = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_2__["coerceBooleanProperty"])(value);
        },
        enumerable: true,
        configurable: true
    });
    // ControlValueAccessor implementation
    // ControlValueAccessor implementation
    /**
     * @param {?} ranges
     * @return {?}
     */
    DejaRangeComponent.prototype.writeValue = 
    // ControlValueAccessor implementation
    /**
     * @param {?} ranges
     * @return {?}
     */
    function (ranges) {
        if (!!ranges && !!ranges.length) {
            /** @type {?} */
            var host = (/** @type {?} */ (this.elementRef.nativeElement.firstElementChild));
            /** @type {?} */
            var hostWidth_1 = host.getBoundingClientRect().width;
            /** @type {?} */
            var totalDifference_1 = ranges[ranges.length - 1].max - ranges[0].min;
            this._ranges = ranges.map((/**
             * @param {?} range
             * @param {?} index
             * @return {?}
             */
            function (range, index) {
                // calculate new width
                /** @type {?} */
                var difference = ranges[index].max - ranges[index].min;
                /** @type {?} */
                var modelPercent = totalDifference_1 / 100;
                /** @type {?} */
                var percent = difference / modelPercent;
                /** @type {?} */
                var viewValue = hostWidth_1 * percent / 100;
                range.$width = +viewValue.toFixed(2);
                return range;
            }));
            this.changeDetectorRef.markForCheck();
        }
    };
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    DejaRangeComponent.prototype.setDisabledState = /**
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        this.disabled = isDisabled;
    };
    // End of ControlValueAccessor implementation
    // End of ControlValueAccessor implementation
    /**
     * @return {?}
     */
    DejaRangeComponent.prototype.onResize = 
    // End of ControlValueAccessor implementation
    /**
     * @return {?}
     */
    function () {
        this.ranges = this.ranges.concat();
    };
    // add a new range, by splitting the selected one into 2 new ranges
    // add a new range, by splitting the selected one into 2 new ranges
    /**
     * @return {?}
     */
    DejaRangeComponent.prototype.add = 
    // add a new range, by splitting the selected one into 2 new ranges
    /**
     * @return {?}
     */
    function () {
        if (!this.readOnly) {
            if (typeof this.step === 'number') {
                /** @type {?} */
                var ranges = this.ranges;
                /** @type {?} */
                var index = this.selected;
                /** @type {?} */
                var selected = ranges[index];
                /** @type {?} */
                var difference = selected.max - selected.min;
                /** @type {?} */
                var totalDifference = ranges[ranges.length - 1].max - ranges[0].min;
                /** @type {?} */
                var minimumViewDifference = this.minimumRangePercentage * 2;
                /** @type {?} */
                var modelDifferencePercentage = difference / totalDifference;
                /** @type {?} */
                var isViewDifferenceEnough = modelDifferencePercentage > minimumViewDifference;
                /** @type {?} */
                var newMax = void 0;
                /** @type {?} */
                var newRange = void 0;
                /** @type {?} */
                var isModelDifferenceEnough = difference >= this.step * 2;
                if (isViewDifferenceEnough && isModelDifferenceEnough) {
                    newMax = selected.min + difference / 2;
                    newRange = new Range(selected.min, newMax);
                    selected.min = newMax;
                    // split array in half excluding the selected range
                    /** @type {?} */
                    var leftSide = ranges.slice(0, index);
                    /** @type {?} */
                    var rightSide = ranges.length - 1 > index ? ranges.slice(index + 1) : [];
                    // build new array with new range
                    /** @type {?} */
                    var newRanges_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__spread"])(leftSide, [newRange, selected], rightSide);
                    // step
                    /** @type {?} */
                    var newRangeIndex = newRanges_1.indexOf(newRange);
                    newRanges_1[newRangeIndex].max = this.toStep(newRanges_1, newRangeIndex, newRanges_1[newRangeIndex].max);
                    newRanges_1 = newRanges_1
                        .map((/**
                     * @param {?} range
                     * @param {?} _index
                     * @return {?}
                     */
                    function (range, _index) {
                        if (_index !== 0) {
                            range.min = newRanges_1[_index - 1].max;
                        }
                        return range;
                    }));
                    this.ranges = newRanges_1;
                }
                else {
                    this.errorFeedback.emit(new Error('Range is too small to be splitted'));
                }
            }
            else {
                throw new Error('Invalid step type, you have to implement the add function yourself for the fn & array.');
            }
        }
    };
    // remove the select range
    // remove the select range
    /**
     * @return {?}
     */
    DejaRangeComponent.prototype.remove = 
    // remove the select range
    /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this.readOnly && this.ranges.length > 2) {
            /** @type {?} */
            var ranges_1 = this.ranges
                .filter((/**
             * @param {?} _range
             * @param {?} index
             * @return {?}
             */
            function (_range, index) { return _this.selected !== index; }));
            this.ranges = ranges_1
                .map((/**
             * @param {?} range
             * @param {?} index
             * @return {?}
             */
            function (range, index) {
                if (index !== ranges_1.length - 1) {
                    range.max = ranges_1[index + 1].min;
                }
                return range;
            }));
        }
    };
    /** Force control to rebind */
    /**
     * Force control to rebind
     * @return {?}
     */
    DejaRangeComponent.prototype.refresh = /**
     * Force control to rebind
     * @return {?}
     */
    function () {
        this.changeDetectorRef.markForCheck();
    };
    // set the new selected index and emit a IRangeEvent
    // set the new selected index and emit a IRangeEvent
    /**
     * @param {?} e
     * @param {?} index
     * @return {?}
     */
    DejaRangeComponent.prototype.onSelect = 
    // set the new selected index and emit a IRangeEvent
    /**
     * @param {?} e
     * @param {?} index
     * @return {?}
     */
    function (e, index) {
        if (this.disabled) {
            return;
        }
        if (this.selected !== index) {
            /** @type {?} */
            var event_1 = (/** @type {?} */ (e));
            event_1.range = this.ranges[index];
            event_1.index = index;
            event_1.ranges = this.ranges;
            this.select.emit(event_1);
            this.selected = index;
        }
    };
    /**
     * @param {?} $event
     * @param {?} index
     * @return {?}
     */
    DejaRangeComponent.prototype.onMouseDown = /**
     * @param {?} $event
     * @param {?} index
     * @return {?}
     */
    function ($event, index) {
        var _this = this;
        if (!this.readOnly) {
            /** @type {?} */
            var xStart_1 = $event.pageX;
            /** @type {?} */
            var target = (/** @type {?} */ ($event.target));
            /** @type {?} */
            var ranges_2 = this.ranges;
            /** @type {?} */
            var range_1 = this.ranges[index];
            /** @type {?} */
            var rangeStart_1 = range_1.max;
            // get the block HTMLElement (contains range HTMLElement & separator HTMLElement)
            /** @type {?} */
            var parentElement = target.parentElement;
            while (!parentElement.classList.contains('block')) {
                parentElement = parentElement.parentElement;
            }
            /** @type {?} */
            var up$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_5__["fromEvent"])(document, 'mouseup');
            /** @type {?} */
            var leave$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_5__["fromEvent"])(document.body, 'mouseleave');
            /** @type {?} */
            var kill$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_5__["merge"])(up$, leave$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["first"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["tap"])((/**
             * @return {?}
             */
            function () {
                /** @type {?} */
                var host = (/** @type {?} */ (_this.elementRef.nativeElement.firstElementChild));
                host.ownerDocument.body.classList.remove('noselect');
                _this._onChangeCallback(_this._ranges);
            })));
            Object(rxjs__WEBPACK_IMPORTED_MODULE_5__["fromEvent"])(document, 'mousemove').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["takeUntil"])(kill$))
                .subscribe((/**
             * @param {?} event
             * @return {?}
             */
            function (event) {
                /** @type {?} */
                var x = event.pageX;
                /** @type {?} */
                var xDifference = -(xStart_1 - x);
                /** @type {?} */
                var nextRange = _this.ranges[index + 1];
                // compute total difference
                /** @type {?} */
                var totalDifference = ranges_2[ranges_2.length - 1].max - ranges_2[0].min;
                // calculate new width of the range, get host width
                /** @type {?} */
                var host = (/** @type {?} */ (_this.elementRef.nativeElement.firstElementChild));
                /** @type {?} */
                var hostWidth = host.getBoundingClientRect().width;
                // avoid drag
                host.ownerDocument.body.classList.add('noselect');
                // compute new model value
                /** @type {?} */
                var modelDifference = xDifference * totalDifference / hostWidth;
                /** @type {?} */
                var newMax = rangeStart_1 + modelDifference;
                /** @type {?} */
                var minDifference = _this.minimumRangePercentage * totalDifference;
                /** @type {?} */
                var min = range_1.min + minDifference;
                /** @type {?} */
                var max = nextRange.max - minDifference;
                newMax = Math.min(newMax, max);
                newMax = Math.max(newMax, min);
                /** @type {?} */
                var newStepped = _this.toStep(ranges_2, index, newMax);
                nextRange.min = range_1.max = newStepped;
                ranges_2[index] = range_1;
                ranges_2[index + 1] = nextRange;
                _this.writeValue(ranges_2);
            }));
        }
    };
    /**
     * @private
     * @param {?} ranges
     * @param {?} index
     * @param {?} newMax
     * @return {?}
     */
    DejaRangeComponent.prototype.toStep = /**
     * @private
     * @param {?} ranges
     * @param {?} index
     * @param {?} newMax
     * @return {?}
     */
    function (ranges, index, newMax) {
        /** @type {?} */
        var range = ranges[index];
        /** @type {?} */
        var maybeNextIndex = ranges.length - 1 > index ? index + 1 : index;
        /** @type {?} */
        var nextMax = ranges[maybeNextIndex].max;
        /** @type {?} */
        var previousMax = index !== 0 ? ranges[index - 1].max : 0;
        /** @type {?} */
        var totalDifference = ranges[ranges.length - 1].max - ranges[0].min;
        /** @type {?} */
        var minimumViewDifference = this.minimumRangePercentage * totalDifference;
        /** @type {?} */
        var viewMin = range.min + minimumViewDifference;
        /** @type {?} */
        var viewMax = nextMax - minimumViewDifference;
        if (typeof this.step === 'number') {
            /** @type {?} */
            var numericStep = (/** @type {?} */ (this.step));
            /** @type {?} */
            var precision = 100 / (numericStep * 100);
            /** @type {?} */
            var steppedValue = (Math.round(newMax * precision) / precision);
            /** @type {?} */
            var mantisseLength = numericStep
                .toString()
                .replace(/[0-9]+\./, '')
                .length;
            /** @type {?} */
            var fixedValue = +steppedValue.toFixed(mantisseLength);
            /** @type {?} */
            var modelMax = Math.min(fixedValue, nextMax - numericStep);
            /** @type {?} */
            var modelMin = Math.max(fixedValue, previousMax + numericStep);
            /** @type {?} */
            var min = viewMin < modelMin ? modelMin : viewMin;
            /** @type {?} */
            var max = viewMax > modelMax ? modelMax : viewMax;
            /** @type {?} */
            var bestValue = newMax > range.max ? max : min;
            return bestValue;
        }
        else if (typeof this.step === 'function') {
            /** @type {?} */
            var event_2 = (/** @type {?} */ ({}));
            event_2.range = this.ranges[index];
            event_2.index = index;
            event_2.ranges = this.ranges;
            event_2.newMax = newMax;
            return this.step(event_2);
        }
        else if (this.step instanceof Array) {
            /** @type {?} */
            var idealValue_1 = newMax;
            /** @type {?} */
            var bestDiff_1;
            this.step
                .filter((/**
             * @param {?} value
             * @return {?}
             */
            function (value) { return value <= viewMax && value >= viewMin; }))
                .forEach((/**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                /** @type {?} */
                var diff = Math.abs(value - newMax);
                if (bestDiff_1 === undefined || bestDiff_1 > diff) {
                    idealValue_1 = value;
                    bestDiff_1 = diff;
                }
            }));
            return idealValue_1;
        }
        else {
            throw new Error('Invalid step type.');
        }
    };
    DejaRangeComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"], args: [{
                    changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ChangeDetectionStrategy"].OnPush,
                    selector: 'deja-range',
                    template: "<section id=\"container\">\n\t<ng-template ngFor let-range let-index=\"index\" [ngForOf]=\"ranges\">\n\t\t<section class=\"block\" [style.width.px]=\"range.$width\">\n\t\t\t<span class=\"range\" (mousedown)=\"onSelect($event, index)\" [class.selected]=\"selected === index\">\n\t\t\t\t<span class=\"default-range\" *ngIf=\"!rangeTemplate\">{{range.min}} - {{range.max}}</span>\n\t\t\t\t<ng-template [ngTemplateOutlet]=\"rangeTemplate\" [ngTemplateOutletContext]=\"{ $implicit : range, index: index, ranges: ranges }\"></ng-template>\n\t\t\t</span>\n\t\t\t<span class=\"separator\" *ngIf=\"ranges.length > index + 1\" (mousedown)=\"onMouseDown($event, index)\">\n\t\t\t\t<span class=\"default-separator\" *ngIf=\"!separatorTemplate\">\n\t\t\t\t\t<span class=\"default-separator-item\"></span>\n\t\t\t\t</span>\n\t\t\t\t<ng-template [ngTemplateOutlet]=\"separatorTemplate\" [ngTemplateOutletContext]=\"{ $implicit : range, index: index, ranges: ranges }\"></ng-template>\n\t\t\t</span>\n\t\t</section>\n\t</ng-template>\n</section>",
                    styles: [":host{display:block}:host #container{width:100%;display:flex;box-shadow:0 2px 1px -1px rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 1px 3px 0 rgba(0,0,0,.12);height:32px}:host #container *{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}:host #container .block{display:inline-flex}:host #container .range{display:inline-flex;flex-grow:100;justify-content:center;width:7px;cursor:pointer}:host #container .separator{display:inline-flex;flex-basis:auto;justify-content:center;z-index:5;cursor:ew-resize}:host #container:hover{box-shadow:0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12)}:host #container .range .default-range{-ms-grid-row-align:center;align-self:center;font-size:10pt;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}:host #container .separator .default-separator{width:7px;height:25.6px;margin-top:3.2px;display:flex;justify-content:center}:host #container .separator .default-separator .default-separator-item{height:100%;width:1px}:host #container .range.selected{-webkit-animation-name:selected;animation-name:selected;-webkit-animation-duration:175ms;animation-duration:175ms;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-timing-function:ease-in-out;animation-timing-function:ease-in-out}:host #container .range:not(.selected){-webkit-animation-name:not-selected;animation-name:not-selected;-webkit-animation-duration:175ms;animation-duration:175ms;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-timing-function:ease-in-out;animation-timing-function:ease-in-out}"]
                }] }
    ];
    /** @nocollapse */
    DejaRangeComponent.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ChangeDetectorRef"] },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ElementRef"] },
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NgControl"], decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Self"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Optional"] }] }
    ]; };
    DejaRangeComponent.propDecorators = {
        step: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
        selected: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
        select: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Output"] }],
        errorFeedback: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Output"] }],
        rangeTemplate: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ContentChild"], args: ['rangeTemplate',] }],
        separatorTemplate: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ContentChild"], args: ['separatorTemplate',] }],
        disabled: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
        readOnly: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
        onResize: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["HostListener"], args: ['window:resize', [],] }]
    };
    return DejaRangeComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var DejaRangeModule = /** @class */ (function () {
    function DejaRangeModule() {
    }
    DejaRangeModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["NgModule"], args: [{
                    declarations: [DejaRangeComponent],
                    exports: [DejaRangeComponent],
                    imports: [
                        _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
                    ],
                },] }
    ];
    return DejaRangeModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */



//# sourceMappingURL=deja-js-component-range.js.map

/***/ }),

/***/ "./src/app/range/range-demo.html":
/*!***************************************!*\
  !*** ./src/app/range/range-demo.html ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-tab-group [selectedIndex]=\"tabIndex\" (selectedTabChange)=\"tabIndex = $event.index\">\n    <!--<mat-tab label=\"OVERVIEW\">-->\n        <!--<mat-card class=\"demo-card demo-basic\">-->\n            <!--TODO-->\n        <!--</mat-card>-->\n    <!--</mat-tab>-->\n    <mat-tab label=\"API REFERENCE\"></mat-tab>\n    <mat-tab label=\"EXAMPLES\"></mat-tab>\n</mat-tab-group>\n\n<mat-card class=\"demo-card demo-basic\" *ngIf=\"tabIndex === 0\">\n    <deja-markdown [url]=\"'https://raw.githubusercontent.com/DSI-HUG/dejajs-components/dev/src/component/range/readme.md'\"></deja-markdown>\n</mat-card>\n\n<div *ngIf=\"tabIndex === 1\">\n    <mat-card class=\"demo-card\">\n        <mat-toolbar color=\"primary\">Default template : Read Only</mat-toolbar>\n        <mat-card-content>\n            <deja-range [(ngModel)]=\"readOnlyRanges\"></deja-range>\n        </mat-card-content>\n    </mat-card>\n\n    <mat-card class=\"demo-card\">\n        <mat-toolbar color=\"primary\">Default template : Movable separator, with an array of accepted intervals</mat-toolbar>\n        <mat-card-content>\n            <deja-range [(ngModel)]=\"rangesWithInterval\"\n                        [readOnly]=\"false\"\n                        [selected]=\"1\"\n                        [step]=\"steps\">\n            </deja-range>\n        </mat-card-content>\n    </mat-card>\n\n    <mat-card class=\"demo-card\">\n        <mat-toolbar color=\"primary\">Default template : Movable separator, with a numeric step</mat-toolbar>\n        <mat-card-content>\n            <deja-range [(ngModel)]=\"ranges\"\n                        [readOnly]=\"false\"\n                        [step]=\"2.5\"\n                        #dejaRange\n                        (errorFeedback)=\"errorFeed.emit($event)\">\n            </deja-range>\n        </mat-card-content>\n\n        <mat-card-content fxLayoutAlign=\"center center\">\n            <button mat-raised-button>Simple</button>\n            <button mat-raised-button (click)=\"dejaRange.add(dejaRange.selected)\">Split selected range</button>\n            <button mat-raised-button (click)=\"dejaRange.remove(dejaRange.selected)\">Remove selected range</button>\n        </mat-card-content>\n    </mat-card>\n\n    <mat-card class=\"demo-card\">\n        <mat-toolbar color=\"primary\">Custom template : Movable separator, with a function based step, logarithmic interpolation bewtween the model (weight) and the inner model</mat-toolbar>\n        <mat-card-content>\n            <deja-range id=\"custom-range\"\n                        [(ngModel)]=\"weights\"\n                        (ngModelChange)=\"computeRangeFromWeight()\"\n                        [readOnly]=\"false\"\n                        [selected]=\"0\"\n                        [step]=\"stepFn\"\n                        (errorFeedback)=\"errorFeed.emit($event)\"\n                        #dejaWeight>\n\n                <ng-template #rangeTemplate let-range let-index=\"index\" let-ranges=\"ranges\">\n                    <span class=\"custom-range\">{{range.minWeight | number: '1.0-2'}} - {{range.maxWeight | number: '1.0-2'}} kg</span>\n                </ng-template>\n\n                <ng-template #separatorTemplate let-range let-index=\"index\" let-ranges=\"ranges\">\n                    <span class=\"custom-separator\">\n                        <svg class=\"triangle\">\n                            <polygon points=\"0,0 10,0 5,5\"></polygon>\n                        </svg>\n\n                        <svg class=\"line\">\n                            <rect x=\"4.5\" y=\"0\"></rect>\n                        </svg>\n\n                        <svg class=\"triangle\">\n                            <polygon points=\"0,5 5,0 10,5 \"></polygon>\n                        </svg>\n                    </span>\n                </ng-template>\n            </deja-range>\n        </mat-card-content>\n\n        <mat-card-content fxLayoutAlign=\"center center\">\n            <button mat-raised-button (click)=\"add(dejaWeight.selected)\">Split selected range</button>\n            <button mat-raised-button (click)=\"remove(dejaWeight.selected)\">Remove selected range</button>\n            <button id=\"decrease\" mat-raised-button (click)=\"decrease()\" [disabled]=\"weights[0]?.minWeight === 0\">Decrease minimum</button>\n            <button id=\"increase\" mat-raised-button (click)=\"increase()\">Increase maximum</button>\n        </mat-card-content>\n    </mat-card>\n\n    <!-- error feedback implementation example with snackbar-->\n    <ng-template ngFor let-error [ngForOf]=\"errors | async\">\n        <deja-snackbar *ngIf=\"error?.gate\" alignment=\"bottom right\" [duration]=\"5000\" (onAnimationDone)=\"error.gate = false\">\n            <deja-message-box type=\"warn\" horizontal>{{error.message}}</deja-message-box>\n        </deja-snackbar>\n    </ng-template>\n</div>"

/***/ }),

/***/ "./src/app/range/range-demo.module.ts":
/*!********************************************!*\
  !*** ./src/app/range/range-demo.module.ts ***!
  \********************************************/
/*! exports provided: DejaRangeDemoModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DejaRangeDemoModule", function() { return DejaRangeDemoModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/flex-layout */ "./node_modules/@angular/flex-layout/esm5/flex-layout.es5.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _deja_js_component_message_box__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @deja-js/component/message-box */ "./dist/deja-js/component/fesm5/deja-js-component-message-box.js");
/* harmony import */ var _deja_js_component_range__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @deja-js/component/range */ "./dist/deja-js/component/fesm5/deja-js-component-range.js");
/* harmony import */ var _deja_js_component_snackbar__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @deja-js/component/snackbar */ "./dist/deja-js/component/fesm5/deja-js-component-snackbar.js");
/* harmony import */ var _component_markdown_index__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../component/markdown/index */ "./src/component/markdown/index.ts");
/* harmony import */ var _range_demo__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./range-demo */ "./src/app/range/range-demo.ts");
/* harmony import */ var _range_demo_routes__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./range-demo.routes */ "./src/app/range/range-demo.routes.ts");
/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */












var DejaRangeDemoModule = /** @class */ (function () {
    function DejaRangeDemoModule() {
    }
    DejaRangeDemoModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [_range_demo__WEBPACK_IMPORTED_MODULE_10__["DejaRangeDemoComponent"]],
            exports: [_range_demo__WEBPACK_IMPORTED_MODULE_10__["DejaRangeDemoComponent"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"],
                _angular_flex_layout__WEBPACK_IMPORTED_MODULE_3__["FlexLayoutModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatCardModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatTabsModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatToolbarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatButtonModule"],
                _deja_js_component_range__WEBPACK_IMPORTED_MODULE_7__["DejaRangeModule"],
                _component_markdown_index__WEBPACK_IMPORTED_MODULE_9__["DejaMarkdownModule"],
                _deja_js_component_snackbar__WEBPACK_IMPORTED_MODULE_8__["DejaSnackbarModule"],
                _deja_js_component_message_box__WEBPACK_IMPORTED_MODULE_6__["DejaMessageBoxModule"],
                _range_demo_routes__WEBPACK_IMPORTED_MODULE_11__["routing"],
            ],
            providers: [],
        })
    ], DejaRangeDemoModule);
    return DejaRangeDemoModule;
}());



/***/ }),

/***/ "./src/app/range/range-demo.routes.ts":
/*!********************************************!*\
  !*** ./src/app/range/range-demo.routes.ts ***!
  \********************************************/
/*! exports provided: routing */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "routing", function() { return routing; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _range_demo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./range-demo */ "./src/app/range/range-demo.ts");
/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */


var routes = [
    { path: '', component: _range_demo__WEBPACK_IMPORTED_MODULE_1__["DejaRangeDemoComponent"] },
    { path: '**', redirectTo: '', pathMatch: 'full' },
];
var routing = _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forChild(routes);


/***/ }),

/***/ "./src/app/range/range-demo.scss":
/*!***************************************!*\
  !*** ./src/app/range/range-demo.scss ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  /* for demo purpose only*/\n  /* copy the styles below if you want to use custom demo as is*/ }\n  :host #custom-range-actions {\n    display: flex;\n    justify-content: space-around; }\n  :host h3 {\n    margin-top: 24px; }\n  :host #flex-container {\n    display: flex;\n    flex-direction: row;\n    /* !!! important or it won't work !*/\n    justify-content: flex-end; }\n  :host #flex-container section {\n      display: block;\n      flex-grow: 1;\n      flex-shrink: 0;\n      box-sizing: border-box;\n      margin: 1rem 1rem 1rem 1rem; }\n  :host #flex-container button {\n      flex-grow: 0;\n      flex-shrink: 1;\n      flex-basis: 36px;\n      box-sizing: border-box;\n      margin: 1rem 1rem 1rem 1rem; }\n  :host #custom-range {\n    /* change the height of the component using this variable only*/\n    flex-basis: max-content;\n    -ms-grid-row-align: center;\n    align-self: center;\n    height: 24px;\n    /* don't mess with the custom-seprator styling if you want to use the svg separator as is*/ }\n  :host #custom-range .custom-range {\n      display: flex;\n      align-self: center;\n      font-size: 10pt;\n      overflow: hidden;\n      white-space: nowrap;\n      text-overflow: ellipsis; }\n  :host #custom-range .custom-separator {\n      display: flex;\n      width: 10px;\n      flex-wrap: wrap; }\n  :host #custom-range .custom-separator svg.triangle {\n        margin-top: -5px;\n        width: 10px;\n        height: 5px; }\n  :host #custom-range .custom-separator svg.triangle polygon {\n          fill: #333; }\n  :host #custom-range .custom-separator svg.line {\n        height: 34px;\n        margin-top: -5px; }\n  :host #custom-range .custom-separator svg.line rect {\n          fill: #333;\n          height: 34px;\n          width: 1px; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3RyYXZpcy9idWlsZC9EU0ktSFVHL2RlamFqcy1jb21wb25lbnRzL3NyYy9hcHAvcmFuZ2UvcmFuZ2UtZGVtby5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0MseUJBQUE7RUE2Q0EsOERBQUEsRUFBK0Q7RUE5Q2hFO0lBS0UsYUFBYTtJQUViLDZCQUE2QixFQUFBO0VBUC9CO0lBVUUsZ0JBQWdCLEVBQUE7RUFWbEI7SUFlRSxhQUFhO0lBSWIsbUJBQW1CO0lBQ25CLG9DQUFBO0lBR0EseUJBQXlCLEVBQUE7RUF2QjNCO01BeUJHLGNBQWM7TUFHZCxZQUFZO01BRVosY0FBYztNQUNkLHNCQUFzQjtNQUN0QiwyQkFBMkIsRUFBQTtFQWhDOUI7TUFxQ0csWUFBWTtNQUVaLGNBQWM7TUFFZCxnQkFBZ0I7TUFDaEIsc0JBQXNCO01BQ3RCLDJCQUEyQixFQUFBO0VBM0M5QjtJQWdERSwrREFBQTtJQUdBLHVCQUF1QjtJQUV2QiwwQkFBMEI7SUFDMUIsa0JBQWtCO0lBQ2xCLFlBTmE7SUFrQmIsMEZBQUEsRUFBMkY7RUFuRTdGO01BMkRHLGFBQWE7TUFFYixrQkFBa0I7TUFDbEIsZUFBZTtNQUNmLGdCQUFnQjtNQUNoQixtQkFBbUI7TUFDbkIsdUJBQXVCLEVBQUE7RUFqRTFCO01BdUVHLGFBQWE7TUFDYixXQUFXO01BRVgsZUFBZSxFQUFBO0VBMUVsQjtRQWdGSSxnQkFBa0M7UUFDbEMsV0FBMkI7UUFDM0IsV0FQb0IsRUFBQTtFQTNFeEI7VUE4RUssVUFBVSxFQUFBO0VBOUVmO1FBcUZJLFlBQXNDO1FBQ3RDLGdCQUFrQyxFQUFBO0VBdEZ0QztVQXdGSyxVQUFVO1VBQ1YsWUFBc0M7VUFDdEMsVUFBVSxFQUFBIiwiZmlsZSI6InNyYy9hcHAvcmFuZ2UvcmFuZ2UtZGVtby5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiOmhvc3Qge1xuXHQvKiBmb3IgZGVtbyBwdXJwb3NlIG9ubHkqL1xuXHQjY3VzdG9tLXJhbmdlLWFjdGlvbnMge1xuXHRcdGRpc3BsYXk6IC13ZWJraXQtYm94O1xuXHRcdGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xuXHRcdGRpc3BsYXk6IGZsZXg7XG5cdFx0LW1zLWZsZXgtcGFjazogZGlzdHJpYnV0ZTtcblx0XHRqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcblx0fVxuXHRoMyB7XG5cdFx0bWFyZ2luLXRvcDogMjRweDtcblx0fVxuXHQjZmxleC1jb250YWluZXIge1xuXHRcdGRpc3BsYXk6IC13ZWJraXQtYm94O1xuXHRcdGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xuXHRcdGRpc3BsYXk6IGZsZXg7XG5cdFx0LXdlYmtpdC1ib3gtb3JpZW50OiBob3Jpem9udGFsO1xuXHRcdC13ZWJraXQtYm94LWRpcmVjdGlvbjogbm9ybWFsO1xuXHRcdC1tcy1mbGV4LWRpcmVjdGlvbjogcm93O1xuXHRcdGZsZXgtZGlyZWN0aW9uOiByb3c7XG5cdFx0LyogISEhIGltcG9ydGFudCBvciBpdCB3b24ndCB3b3JrICEqL1xuXHRcdC13ZWJraXQtYm94LXBhY2s6IGVuZDtcblx0XHQtbXMtZmxleC1wYWNrOiBlbmQ7XG5cdFx0anVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcblx0XHRzZWN0aW9uIHtcblx0XHRcdGRpc3BsYXk6IGJsb2NrO1xuXHRcdFx0LXdlYmtpdC1ib3gtZmxleDogMTtcblx0XHRcdC1tcy1mbGV4LXBvc2l0aXZlOiAxO1xuXHRcdFx0ZmxleC1ncm93OiAxO1xuXHRcdFx0LW1zLWZsZXgtbmVnYXRpdmU6IDA7XG5cdFx0XHRmbGV4LXNocmluazogMDtcblx0XHRcdGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG5cdFx0XHRtYXJnaW46IDFyZW0gMXJlbSAxcmVtIDFyZW07XG5cdFx0fVxuXHRcdGJ1dHRvbiB7XG5cdFx0XHQtd2Via2l0LWJveC1mbGV4OiAwO1xuXHRcdFx0LW1zLWZsZXgtcG9zaXRpdmU6IDA7XG5cdFx0XHRmbGV4LWdyb3c6IDA7XG5cdFx0XHQtbXMtZmxleC1uZWdhdGl2ZTogMTtcblx0XHRcdGZsZXgtc2hyaW5rOiAxO1xuXHRcdFx0LW1zLWZsZXgtcHJlZmVycmVkLXNpemU6IDM2cHg7XG5cdFx0XHRmbGV4LWJhc2lzOiAzNnB4O1xuXHRcdFx0Ym94LXNpemluZzogYm9yZGVyLWJveDtcblx0XHRcdG1hcmdpbjogMXJlbSAxcmVtIDFyZW0gMXJlbTtcblx0XHR9XG5cdH1cblx0LyogY29weSB0aGUgc3R5bGVzIGJlbG93IGlmIHlvdSB3YW50IHRvIHVzZSBjdXN0b20gZGVtbyBhcyBpcyovXG5cdCNjdXN0b20tcmFuZ2Uge1xuXHRcdC8qIGNoYW5nZSB0aGUgaGVpZ2h0IG9mIHRoZSBjb21wb25lbnQgdXNpbmcgdGhpcyB2YXJpYWJsZSBvbmx5Ki9cblx0XHQkaGVpZ2h0OiAyNHB4O1xuXHRcdC1tcy1mbGV4LXByZWZlcnJlZC1zaXplOiBtYXgtY29udGVudDtcblx0XHRmbGV4LWJhc2lzOiBtYXgtY29udGVudDtcblx0XHQtbXMtZmxleC1pdGVtLWFsaWduOiBjZW50ZXI7XG5cdFx0LW1zLWdyaWQtcm93LWFsaWduOiBjZW50ZXI7XG5cdFx0YWxpZ24tc2VsZjogY2VudGVyO1xuXHRcdGhlaWdodDogJGhlaWdodDtcblx0XHQuY3VzdG9tLXJhbmdlIHtcblx0XHRcdGRpc3BsYXk6IC13ZWJraXQtYm94O1xuXHRcdFx0ZGlzcGxheTogLW1zLWZsZXhib3g7XG5cdFx0XHRkaXNwbGF5OiBmbGV4O1xuXHRcdFx0LW1zLWZsZXgtaXRlbS1hbGlnbjogY2VudGVyO1xuXHRcdFx0YWxpZ24tc2VsZjogY2VudGVyO1xuXHRcdFx0Zm9udC1zaXplOiAxMHB0O1xuXHRcdFx0b3ZlcmZsb3c6IGhpZGRlbjtcblx0XHRcdHdoaXRlLXNwYWNlOiBub3dyYXA7XG5cdFx0XHR0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcblx0XHR9XG5cdFx0LyogZG9uJ3QgbWVzcyB3aXRoIHRoZSBjdXN0b20tc2VwcmF0b3Igc3R5bGluZyBpZiB5b3Ugd2FudCB0byB1c2UgdGhlIHN2ZyBzZXBhcmF0b3IgYXMgaXMqL1xuXHRcdC5jdXN0b20tc2VwYXJhdG9yIHtcblx0XHRcdGRpc3BsYXk6IC13ZWJraXQtYm94O1xuXHRcdFx0ZGlzcGxheTogLW1zLWZsZXhib3g7XG5cdFx0XHRkaXNwbGF5OiBmbGV4O1xuXHRcdFx0d2lkdGg6IDEwcHg7XG5cdFx0XHQtbXMtZmxleC13cmFwOiB3cmFwO1xuXHRcdFx0ZmxleC13cmFwOiB3cmFwO1xuXHRcdFx0JHRyaWFuZ2xlLWhlaWdodDogNXB4O1xuXHRcdFx0c3ZnLnRyaWFuZ2xlIHtcblx0XHRcdFx0cG9seWdvbiB7XG5cdFx0XHRcdFx0ZmlsbDogIzMzMztcblx0XHRcdFx0fVxuXHRcdFx0XHRtYXJnaW4tdG9wOiAwcHggLSAkdHJpYW5nbGUtaGVpZ2h0O1xuXHRcdFx0XHR3aWR0aDogJHRyaWFuZ2xlLWhlaWdodCAqIDI7XG5cdFx0XHRcdGhlaWdodDogJHRyaWFuZ2xlLWhlaWdodDtcblx0XHRcdH1cblx0XHRcdHN2Zy5saW5lIHtcblx0XHRcdFx0aGVpZ2h0OiAkaGVpZ2h0ICsgMiAqICR0cmlhbmdsZS1oZWlnaHQ7XG5cdFx0XHRcdG1hcmdpbi10b3A6IDBweCAtICR0cmlhbmdsZS1oZWlnaHQ7XG5cdFx0XHRcdHJlY3Qge1xuXHRcdFx0XHRcdGZpbGw6ICMzMzM7XG5cdFx0XHRcdFx0aGVpZ2h0OiAkaGVpZ2h0ICsgMiAqICR0cmlhbmdsZS1oZWlnaHQ7XG5cdFx0XHRcdFx0d2lkdGg6IDFweDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxufSJdfQ== */"

/***/ }),

/***/ "./src/app/range/range-demo.ts":
/*!*************************************!*\
  !*** ./src/app/range/range-demo.ts ***!
  \*************************************/
/*! exports provided: DejaRangeDemoComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DejaRangeDemoComponent", function() { return DejaRangeDemoComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _ranges_mock__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ranges.mock */ "./src/app/range/ranges.mock.ts");
/* harmony import */ var _weight_interface__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./weight.interface */ "./src/app/range/weight.interface.ts");

/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */





var DejaRangeDemoComponent = /** @class */ (function () {
    function DejaRangeDemoComponent() {
        this.tabIndex = 1;
        this.numericStep = 1;
        this.errorFeed = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.readOnlyRanges = _ranges_mock__WEBPACK_IMPORTED_MODULE_4__["readOnlyRanges"];
        this.rangesWithInterval = _ranges_mock__WEBPACK_IMPORTED_MODULE_4__["rangesWithInterval"];
        this.ranges = _ranges_mock__WEBPACK_IMPORTED_MODULE_4__["ranges"];
        this.weights = _ranges_mock__WEBPACK_IMPORTED_MODULE_4__["weights"];
        this.steps = _ranges_mock__WEBPACK_IMPORTED_MODULE_4__["steps"];
        this.computeRangeFromWeight();
        // error management
        this.errors = Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["from"])(this.errorFeed).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (error) { return ({
            gate: true,
            message: error.message,
        }); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["scan"])(function (acc, cur) { return acc.concat([cur]); }, []), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["defaultIfEmpty"])([]));
    }
    /**
     * compute next step for the weights (rounded to one)
     *
     * @protected
     * @param {IStepRangeEvent} event
     * @returns
     *
     * @memberOf DejaRangeDemoComponent
     */
    DejaRangeDemoComponent.prototype.stepFn = function (event) {
        var weight = event.ranges[event.index];
        var isLastWeight = event.ranges.length - 1 === event.index;
        var rangeDifference = event.newMax - weight.min;
        var weightDifference = Math.pow(Math.E, (rangeDifference)) / 4;
        var maxWeight = weight.minWeight + weightDifference;
        maxWeight = Math.round(maxWeight);
        maxWeight = Math.max(maxWeight, weight.minWeight + 1);
        if (!isLastWeight) {
            var nextWeight = event.ranges[event.index + 1];
            maxWeight = Math.min(maxWeight, nextWeight.maxWeight - 1);
            nextWeight.minWeight = maxWeight;
            weight.maxWeight = maxWeight;
        }
        var newRangeMax = weight.min + Math.log(4 * (maxWeight - weight.minWeight));
        return newRangeMax;
    };
    DejaRangeDemoComponent.prototype.remove = function (index) {
        if (this.weights.length >= 2) {
            var weight = this.weights
                .find(function (_w, i) { return index === i; });
            var wgts = this.weights
                .filter(function (_w, i) { return index !== i; });
            if (index > 0) {
                wgts[index - 1].maxWeight = weight.maxWeight;
            }
            this.weights = wgts;
            this.weightRef.selected = 0;
            this.computeRangeFromWeight();
        }
    };
    DejaRangeDemoComponent.prototype.add = function (index) {
        var weight = this.weights
            .find(function (_w, i) { return index === i; });
        var weightDifference = weight.maxWeight - weight.minWeight;
        if (weightDifference >= 2) {
            var leftWeight = new _weight_interface__WEBPACK_IMPORTED_MODULE_5__["Weight"](weight.minWeight, weight.minWeight + weightDifference / 2);
            weight.minWeight = weight.minWeight + weightDifference / 2;
            var leftWeights = index !== 0 ? this.weights.slice(0, index) : [];
            var rightWeights = index < this.weights.length ? this.weights.slice(index + 1) : [];
            this.weights = leftWeights.concat([leftWeight, weight], rightWeights);
            this.weightRef.selected = 0;
            this.computeRangeFromWeight();
        }
    };
    /**
     * increase the maximum of the biggest weight
     *
     * @private
     *
     * @memberOf DejaRangeDemoComponent
     */
    DejaRangeDemoComponent.prototype.increase = function () {
        this.weights[this.weights.length - 1].maxWeight++;
        this.computeRangeFromWeight();
    };
    /**
     * decrease the minimum of the smallest weight
     *
     * @private
     *
     * @memberOf DejaRangeDemoComponent
     */
    DejaRangeDemoComponent.prototype.decrease = function () {
        if (this.weights[0].minWeight > 0) {
            this.weights[0].minWeight--;
            this.computeRangeFromWeight();
        }
    };
    /**
     * compute range min and max from weight value
     *
     * @private
     *
     * @memberOf DejaRangeDemoComponent
     */
    DejaRangeDemoComponent.prototype.computeRangeFromWeight = function () {
        var min = 0;
        this.weights = this.weights
            .map(function (weight) {
            var weightDifference = weight.maxWeight - weight.minWeight;
            var rangeDifference = Math.log(4 * weightDifference);
            weight.min = min;
            weight.max = min + rangeDifference;
            min += rangeDifference;
            return weight;
        });
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"])
    ], DejaRangeDemoComponent.prototype, "errorFeed", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('dejaRange'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], DejaRangeDemoComponent.prototype, "rangeRef", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('dejaWeight'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], DejaRangeDemoComponent.prototype, "weightRef", void 0);
    DejaRangeDemoComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'deja-range-demo',
            template: __webpack_require__(/*! ./range-demo.html */ "./src/app/range/range-demo.html"),
            styles: [__webpack_require__(/*! ./range-demo.scss */ "./src/app/range/range-demo.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], DejaRangeDemoComponent);
    return DejaRangeDemoComponent;
}());



/***/ }),

/***/ "./src/app/range/ranges.mock.ts":
/*!**************************************!*\
  !*** ./src/app/range/ranges.mock.ts ***!
  \**************************************/
/*! exports provided: readOnlyRanges, ranges, rangesWithInterval, weights, steps */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "readOnlyRanges", function() { return readOnlyRanges; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ranges", function() { return ranges; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rangesWithInterval", function() { return rangesWithInterval; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "weights", function() { return weights; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "steps", function() { return steps; });
/* harmony import */ var _deja_js_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @deja-js/component */ "./dist/deja-js/component/fesm5/deja-js-component.js");
/* harmony import */ var _weight_interface__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./weight.interface */ "./src/app/range/weight.interface.ts");
/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */


var readOnlyRanges = [
    new _deja_js_component__WEBPACK_IMPORTED_MODULE_0__["Range"](4, 16),
    new _deja_js_component__WEBPACK_IMPORTED_MODULE_0__["Range"](16, 20),
    new _deja_js_component__WEBPACK_IMPORTED_MODULE_0__["Range"](20, 24),
    new _deja_js_component__WEBPACK_IMPORTED_MODULE_0__["Range"](24, 36),
];
var ranges = [
    new _deja_js_component__WEBPACK_IMPORTED_MODULE_0__["Range"](0, 12.5),
    new _deja_js_component__WEBPACK_IMPORTED_MODULE_0__["Range"](12.5, 25),
    new _deja_js_component__WEBPACK_IMPORTED_MODULE_0__["Range"](25, 30),
];
var rangesWithInterval = [
    new _deja_js_component__WEBPACK_IMPORTED_MODULE_0__["Range"](0, 12),
    new _deja_js_component__WEBPACK_IMPORTED_MODULE_0__["Range"](12, 20),
    new _deja_js_component__WEBPACK_IMPORTED_MODULE_0__["Range"](20, 24),
];
var weights = [
    new _weight_interface__WEBPACK_IMPORTED_MODULE_1__["Weight"](3, 4),
    new _weight_interface__WEBPACK_IMPORTED_MODULE_1__["Weight"](4, 6),
    new _weight_interface__WEBPACK_IMPORTED_MODULE_1__["Weight"](6, 9),
    new _weight_interface__WEBPACK_IMPORTED_MODULE_1__["Weight"](9, 12),
    new _weight_interface__WEBPACK_IMPORTED_MODULE_1__["Weight"](12, 16),
    new _weight_interface__WEBPACK_IMPORTED_MODULE_1__["Weight"](16, 20),
    new _weight_interface__WEBPACK_IMPORTED_MODULE_1__["Weight"](20, 25),
    new _weight_interface__WEBPACK_IMPORTED_MODULE_1__["Weight"](25, 32),
    new _weight_interface__WEBPACK_IMPORTED_MODULE_1__["Weight"](32, 40),
    new _weight_interface__WEBPACK_IMPORTED_MODULE_1__["Weight"](40, 200),
];
var steps = [
    1, 2, 4, 8, 16, 20, 22, 24,
];


/***/ }),

/***/ "./src/app/range/weight.interface.ts":
/*!*******************************************!*\
  !*** ./src/app/range/weight.interface.ts ***!
  \*******************************************/
/*! exports provided: Weight */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Weight", function() { return Weight; });
/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */
/**
 * IWeight class implementation
 * An example of non linear interpolation using logarithm
 * @export
 * @class Weight
 * @implements {IWeight}
 */
var Weight = /** @class */ (function () {
    function Weight(minWeight, maxWeight) {
        this.minWeight = minWeight;
        this.maxWeight = maxWeight;
    }
    return Weight;
}());



/***/ })

}]);
//# sourceMappingURL=range-range-demo-module.js.map