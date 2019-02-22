(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~popup-popup-demo-module~range-range-demo-module~snackbar-snackbar-demo-module~tiles-tiles-de~2235f62f"],{

/***/ "./dist/deja-js/component/fesm5/deja-js-component-message-box.js":
/*!***********************************************************************!*\
  !*** ./dist/deja-js/component/fesm5/deja-js-component-message-box.js ***!
  \***********************************************************************/
/*! exports provided: DejaMessageBoxModule, DejaMessageBoxComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DejaMessageBoxModule", function() { return DejaMessageBoxModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DejaMessageBoxComponent", function() { return DejaMessageBoxComponent; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/cdk/coercion */ "./node_modules/@angular/cdk/esm5/coercion.es5.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");





/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var DejaMessageBoxComponent = /** @class */ (function () {
    function DejaMessageBoxComponent() {
        /**
         * Event Emmited when the close action is called
         */
        this.close = new _angular_core__WEBPACK_IMPORTED_MODULE_3__["EventEmitter"]();
        this._showCloseIcon = false;
    }
    Object.defineProperty(DejaMessageBoxComponent.prototype, "horizontal", {
        get: /**
         * @return {?}
         */
        function () {
            return this._horizontal;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._horizontal = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_2__["coerceBooleanProperty"])(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaMessageBoxComponent.prototype, "showCloseIcon", {
        get: /**
         * @return {?}
         */
        function () {
            return this._showCloseIcon;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._showCloseIcon = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_2__["coerceBooleanProperty"])(value);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DejaMessageBoxComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this.icon && this.type) {
            this.icon = this.getIconFromType(this.type);
        }
        if (this.actions) {
            this.actions.forEach((/**
             * @param {?} action
             * @return {?}
             */
            function (action) {
                if (!action.icon && action.type) {
                    action.icon = _this.getIconFromType(action.type);
                }
            }));
        }
    };
    /**
     * @return {?}
     */
    DejaMessageBoxComponent.prototype.onClose = /**
     * @return {?}
     */
    function () {
        this.close.emit();
    };
    /**
     * @private
     * @param {?} type
     * @return {?}
     */
    DejaMessageBoxComponent.prototype.getIconFromType = /**
     * @private
     * @param {?} type
     * @return {?}
     */
    function (type) {
        switch (type) {
            case 'info':
            case 'primary':
                type = 'primary';
                return 'info_outline';
            case 'success':
                return 'done';
            case 'warn':
                return 'warning_outline';
            case 'danger':
                return 'error_outline';
            default:
                return null;
        }
    };
    DejaMessageBoxComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"], args: [{
                    encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ViewEncapsulation"].None,
                    selector: 'deja-message-box',
                    template: "<mat-card id=\"msgbox\" class=\"{{type}}\">\n    <mat-card-title *ngIf=\"icon || showCloseIcon\">\n        <mat-icon id=\"icon\" *ngIf=\"icon\">{{icon}}</mat-icon>\n        <span id=\"title\" *ngIf=\"!horizontal\">{{title}}</span>\n        <div class=\"header-actions\">\n            <button *ngIf=\"showCloseIcon\" mat-mini-fab type=\"button\" class=\"close\" (click)=\"onClose()\">\n                <mat-icon>close</mat-icon>\n            </button>\n        </div>\n    </mat-card-title>\n    <mat-card-content>\n        <h2 id=\"title\" *ngIf=\"horizontal && title\">{{title}}</h2>\n        <ng-content></ng-content>\n    </mat-card-content>\n    <mat-card-actions *ngIf=\"actions\">\n        <span *ngFor=\"let action of actions\">\n            <button mat-raised-button type=\"button\" *ngIf=\"action.icon && action.text\" (click)=\"action.action()\" class=\"with-icon\" [attr.data-icon]=\"action.icon\" [color]=\"action.type\">\n                {{action.text}}\n            </button>\n            <button mat-raised-button type=\"button\" *ngIf=\"!action.icon && action.text\" (click)=\"action.action()\" [color]=\"action.type\">\n                {{action.text}}\n            </button>\n            <button mat-mini-fab type=\"button\" *ngIf=\"action.icon && !action.text\" [color]=\"action.type || 'blank'\" [class.action-button]=\"!action.type\" (click)=\"action.action()\">\n                <mat-icon *ngIf=\"action.icon\">{{action.icon}}</mat-icon>\n            </button>\n        </span>\n    </mat-card-actions>\n    <mat-card-actions *ngIf=\"!actions && actionsTemplate\">\n\t\t<ng-template [ngTemplateOutlet]=\"actionsTemplate\"></ng-template>\n\t</mat-card-actions>\n</mat-card>\n",
                    styles: ["deja-message-box{display:block}deja-message-box #msgbox{border-style:solid;border-width:1px;margin:0;padding:0;display:block}deja-message-box #msgbox .mat-card-title{align-items:center;box-shadow:0 1px 4px 0 rgba(0,0,0,.2);display:flex;margin:0;padding:.8rem}deja-message-box #msgbox .mat-card-title #icon{margin-right:.5rem}deja-message-box #msgbox .mat-card-title .header-actions{margin-left:auto}deja-message-box #msgbox .mat-card-title .header-actions button.mat-mini-fab{background:0 0;border:none;box-shadow:none}deja-message-box #msgbox .mat-card-content{margin:0;padding:.75rem;overflow:hidden}deja-message-box #msgbox .mat-card-content h2{font-size:1.3rem;margin:0;font-weight:300;line-height:2rem;text-overflow:ellipsis;overflow:hidden;white-space:nowrap}deja-message-box #msgbox .mat-card-actions{align-items:center;display:flex;justify-content:flex-end;margin:0;padding:.2rem}deja-message-box #msgbox .mat-card-actions button{margin-left:.2rem}deja-message-box #msgbox .mat-card-actions button.mat-blank[mat-fab]:not([disabled]),deja-message-box #msgbox .mat-card-actions button.mat-blank[mat-mini-fab]:not([disabled]),deja-message-box #msgbox .mat-card-actions button.mat-blank[mat-raised-button]:not([disabled]){box-shadow:none}deja-message-box #msgbox .mat-card-actions button.mat-blank[mat-fab].action-button,deja-message-box #msgbox .mat-card-actions button.mat-blank[mat-mini-fab].action-button,deja-message-box #msgbox .mat-card-actions button.mat-blank[mat-raised-button].action-button{align-items:stretch;display:flex;height:1rem;margin:0;padding:0;right:0;width:1rem}deja-message-box #msgbox .mat-card-actions button.mat-blank[mat-fab].action-button .mat-button-wrapper,deja-message-box #msgbox .mat-card-actions button.mat-blank[mat-mini-fab].action-button .mat-button-wrapper,deja-message-box #msgbox .mat-card-actions button.mat-blank[mat-raised-button].action-button .mat-button-wrapper{height:1rem;width:1rem}deja-message-box #msgbox .mat-card-actions button.mat-blank[mat-fab].action-button .mat-button-wrapper .mat-icon,deja-message-box #msgbox .mat-card-actions button.mat-blank[mat-mini-fab].action-button .mat-button-wrapper .mat-icon,deja-message-box #msgbox .mat-card-actions button.mat-blank[mat-raised-button].action-button .mat-button-wrapper .mat-icon{font-size:1rem;height:1rem;line-height:1rem;padding:0;position:absolute;right:0;top:0;width:1rem}deja-message-box[horizontal] #msgbox{align-items:stretch;display:flex;flex-direction:row;padding:0;position:relative}deja-message-box[horizontal] #msgbox .mat-card-title{align-items:center;display:flex;flex:0 0 auto;justify-content:center;margin:0;text-align:center}deja-message-box[horizontal] #msgbox .mat-card-title #icon{margin:0}deja-message-box[horizontal] #msgbox .mat-card-content{-ms-grid-row-align:center;align-self:center;flex:1 1 auto;padding:.75rem}deja-message-box[horizontal] #msgbox .mat-card-actions{margin:0;padding:0;position:absolute;right:.2rem;top:.3rem}"]
                }] }
    ];
    /** @nocollapse */
    DejaMessageBoxComponent.ctorParameters = function () { return []; };
    DejaMessageBoxComponent.propDecorators = {
        type: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
        title: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
        icon: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
        actions: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
        close: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Output"] }],
        actionsTemplate: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ContentChild"], args: ['actionsTemplate',] }],
        horizontal: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
        showCloseIcon: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }]
    };
    return DejaMessageBoxComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var DejaMessageBoxModule = /** @class */ (function () {
    function DejaMessageBoxModule() {
    }
    DejaMessageBoxModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["NgModule"], args: [{
                    declarations: [
                        DejaMessageBoxComponent,
                    ],
                    exports: [
                        DejaMessageBoxComponent,
                    ],
                    imports: [
                        _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
                        _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatCardModule"],
                        _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatIconModule"],
                        _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatButtonModule"],
                    ],
                },] }
    ];
    return DejaMessageBoxModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */



//# sourceMappingURL=deja-js-component-message-box.js.map

/***/ }),

/***/ "./dist/deja-js/component/fesm5/deja-js-component-snackbar.js":
/*!********************************************************************!*\
  !*** ./dist/deja-js/component/fesm5/deja-js-component-snackbar.js ***!
  \********************************************************************/
/*! exports provided: DejaSnackbarModule, DejaSnackbarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DejaSnackbarModule", function() { return DejaSnackbarModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DejaSnackbarComponent", function() { return DejaSnackbarComponent; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");





/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var DejaSnackbarComponent = /** @class */ (function () {
    /**
     * Creates an instance of DejaSnackbarComponent.
     *
     * @param elementRef
     * @param renderer
     */
    function DejaSnackbarComponent(elementRef) {
        var _this = this;
        this.elementRef = elementRef;
        /**
             * inner container
             */
        // @ViewChild('container') public host;
        /**
         * specify delay for the enter animation
         */
        this.delay = 0;
        /**
         * specify lifetime of the snackbar on the screen
         */
        this.duration = 0;
        /**
         * callback used to negate the boolean responsible for the presence of the snackbar on the dom (see demo)
         */
        this.onAnimationDone = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        /**
         * vertical space between snackbar
         */
        this.marginTop = 6;
        /**
         * snackbar creation timestamp, used for calculation, forthe adapt animation
         */
        this.timestamp = +new Date();
        /**
         * enter animation duration
         */
        this.enterAnimationDuration = 350;
        /**
         * leave animation duration
         */
        this.leaveAnimationDuration = 175;
        /**
         * adapt animation duration
         */
        this.adaptAnimationDuration = 225;
        this.animate$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        if (!DejaSnackbarComponent.instances) {
            DejaSnackbarComponent.instances = [];
        }
        DejaSnackbarComponent.instances.push(this);
        /** @type {?} */
        var applyParams = (/**
         * @param {?} styles
         * @return {?}
         */
        function (styles) {
            Object.keys(styles)
                .forEach((/**
             * @param {?} key
             * @return {?}
             */
            function (key) {
                ((/** @type {?} */ (_this.host.style)))[key] = ((/** @type {?} */ (styles)))[key];
            }));
        });
        this.animate$sub = Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["from"])(this.animate$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])((/**
         * @param {?} animation
         * @return {?}
         */
        function (animation) { return applyParams(animation.before); })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["delay"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])((/**
         * @param {?} animation
         * @return {?}
         */
        function (animation) {
            _this.host.style.transitionDuration = animation.duration + "ms";
            _this.host.style.transitionTimingFunction = animation.easing;
            _this.host.style.transitionProperty = Object.keys(animation.before).join(',');
        })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["debounce"])((/**
         * @param {?} animation
         * @return {?}
         */
        function (animation) { return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["timer"])(animation.delay || 1); })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])((/**
         * @param {?} animation
         * @return {?}
         */
        function (animation) { return applyParams(animation.after); })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["debounce"])((/**
         * @param {?} animation
         * @return {?}
         */
        function (animation) { return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["timer"])(animation.duration); })))
            .subscribe((/**
         * @return {?}
         */
        function () {
            _this.host.style.transitionDuration = '';
            _this.host.style.transitionTimingFunction = '';
            _this.host.style.transitionProperty = '';
        }));
    }
    Object.defineProperty(DejaSnackbarComponent.prototype, "alignment", {
        /**
         * alignents setter
         */
        set: /**
         * alignents setter
         * @param {?} value
         * @return {?}
         */
        function (value) {
            var _this = this;
            this.alignents = {
                bottom: false,
                left: false,
                right: false,
                top: false,
            };
            // set alignents
            if (value) {
                value
                    .split(/\s+/g)
                    .map((/**
                 * @param {?} align
                 * @return {?}
                 */
                function (align) { return _this.alignents[align] = true; }));
            }
            // filter incompatible alignments
            this.alignents.bottom = this.alignents.top && this.alignents.bottom ? false : this.alignents.bottom;
            this.alignents.left = this.alignents.right && this.alignents.left ? false : this.alignents.left;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * used to recalculate the position of the snackbar on the X axis when resizing / changing from landscape to portrait and vice versa
     *
     * @param event
     */
    /**
     * used to recalculate the position of the snackbar on the X axis when resizing / changing from landscape to portrait and vice versa
     *
     * @return {?}
     */
    DejaSnackbarComponent.prototype.onResize = /**
     * used to recalculate the position of the snackbar on the X axis when resizing / changing from landscape to portrait and vice versa
     *
     * @return {?}
     */
    function () {
        this.setNewWidth();
    };
    /**
     * onInit hook
     */
    /**
     * onInit hook
     * @return {?}
     */
    DejaSnackbarComponent.prototype.ngOnInit = /**
     * onInit hook
     * @return {?}
     */
    function () {
        var _this = this;
        // Choose animation depending on alignment
        /** @type {?} */
        var anchors = (/** @type {?} */ ([]));
        Object.keys(this.alignents).forEach((/**
         * @param {?} key
         * @return {?}
         */
        function (key) {
            if (_this.alignents[key]) {
                anchors.push(key);
            }
        }));
        anchors.sort((/**
         * @param {?} x
         * @param {?} y
         * @return {?}
         */
        function (x, y) { return x > y ? 1 : -1; }));
        /** @type {?} */
        var anchor = anchors.reduce((/**
         * @param {?} acc
         * @param {?} curr
         * @return {?}
         */
        function (acc, curr) {
            if (acc === '') {
                acc += curr;
            }
            else {
                acc += "-" + curr;
            }
            return acc;
        }), '');
        this.anchor = anchor;
    };
    /**
     * afterviewInit hook
     */
    /**
     * afterviewInit hook
     * @return {?}
     */
    DejaSnackbarComponent.prototype.ngAfterViewInit = /**
     * afterviewInit hook
     * @return {?}
     */
    function () {
        var _this = this;
        this.host = (/** @type {?} */ (this.elementRef.nativeElement));
        if (!this.outerContainerElement) {
            // Set default outer container if none specified
            this.outerContainerElement = (/** @type {?} */ (this.host.ownerDocument.body));
        }
        else {
            // Otherwise, set inner container position to absolute for correct placement of snackbars
            this.host.classList.add('absolute');
        }
        this.height = this.host.getBoundingClientRect().height;
        this.setPosition();
        this.launchEnterAnimation();
        // if a duration has been been specified, launch the 'leave' animation after snackbar's lifetime flow, then emit amination done
        Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["timer"])(this.duration + this.delay).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["first"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])((/**
         * @return {?}
         */
        function () {
            if (!!_this.duration) {
                _this.launchLeaveAnimation();
            }
        })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["delay"])(this.leaveAnimationDuration))
            .subscribe((/**
         * @return {?}
         */
        function () { return _this.onAnimationDone.emit(); }));
    };
    /**
     * onDestroy hook
     */
    /**
     * onDestroy hook
     * @return {?}
     */
    DejaSnackbarComponent.prototype.ngOnDestroy = /**
     * onDestroy hook
     * @return {?}
     */
    function () {
        var _this = this;
        // check if snackbars have to move (if they were created after the one deleted)
        if (!!DejaSnackbarComponent.instances.length) {
            DejaSnackbarComponent.instances
                .filter((/**
             * @param {?} instance
             * @return {?}
             */
            function (instance) { return _this.outerContainerElement === instance.outerContainerElement; }))
                .filter((/**
             * @param {?} instance
             * @return {?}
             */
            function (instance) { return _this.anchor === instance.anchor; }))
                .forEach((/**
             * @param {?} instance
             * @return {?}
             */
            function (instance) {
                if (instance.timestamp > _this.timestamp) {
                    instance.launchAdaptAnimation(_this.height);
                }
            }));
        }
        // remove the soon to be destroyed snackbar from the instances array
        DejaSnackbarComponent.instances = DejaSnackbarComponent.instances
            .filter((/**
         * @param {?} instance
         * @return {?}
         */
        function (instance) { return _this !== instance; }));
        this.animate$sub.unsubscribe();
    };
    /**
     * emit animation done
     *
     * @param event
     */
    /**
     * emit animation done
     *
     * @protected
     * @param {?} event
     * @return {?}
     */
    DejaSnackbarComponent.prototype.animationDone = /**
     * emit animation done
     *
     * @protected
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.onAnimationDone.emit(event);
    };
    /**
     * @protected
     * @return {?}
     */
    DejaSnackbarComponent.prototype.increaseElevation = /**
     * @protected
     * @return {?}
     */
    function () {
        /** @type {?} */
        var zIndex = window.getComputedStyle(this.host).zIndex;
        this.host.style.zIndex = (+zIndex + 1).toString();
    };
    /**
     * @protected
     * @return {?}
     */
    DejaSnackbarComponent.prototype.decreaseElevation = /**
     * @protected
     * @return {?}
     */
    function () {
        /** @type {?} */
        var zIndex = window.getComputedStyle(this.host).zIndex;
        this.host.style.zIndex = (+zIndex - 1).toString();
    };
    /**
     * compute cumulated height of all snackbars, precedent instance height, width and height of the innerContainer
     *
     * @return cumulated height of all snackbars, precedent instance height, width and height of the innerContainer
     */
    /**
     * compute cumulated height of all snackbars, precedent instance height, width and height of the innerContainer
     *
     * @private
     * @return {?} cumulated height of all snackbars, precedent instance height, width and height of the innerContainer
     */
    DejaSnackbarComponent.prototype.computePosition = /**
     * compute cumulated height of all snackbars, precedent instance height, width and height of the innerContainer
     *
     * @private
     * @return {?} cumulated height of all snackbars, precedent instance height, width and height of the innerContainer
     */
    function () {
        var _this = this;
        // Inner container
        /** @type {?} */
        var innerContainerElementBounds = this.host.getBoundingClientRect();
        /** @type {?} */
        var innerContainerWidth = innerContainerElementBounds.width;
        /** @type {?} */
        var innerContainerHeight = innerContainerElementBounds.height;
        // Instances sharing the same outer container and the same anchor
        /** @type {?} */
        var instancesInSameZone = DejaSnackbarComponent.instances
            .filter((/**
         * @param {?} instance
         * @return {?}
         */
        function (instance) { return _this.outerContainerElement === instance.outerContainerElement; }))
            .filter((/**
         * @param {?} instance
         * @return {?}
         */
        function (instance) { return _this.anchor === instance.anchor; }))
            .filter((/**
         * @param {?} instance
         * @return {?}
         */
        function (instance) { return _this !== instance; }));
        /** @type {?} */
        var precedentInstanceHeight = 0;
        if (!!instancesInSameZone) {
            /** @type {?} */
            var precedentInstance = instancesInSameZone[instancesInSameZone.length - 1];
            if (!!precedentInstance) {
                /** @type {?} */
                var innerContainerElement = (/** @type {?} */ (precedentInstance.elementRef.nativeElement));
                precedentInstanceHeight = innerContainerElement.getBoundingClientRect().height;
            }
        }
        // computed height of inner containers, sharing the same outer container and the same anchor
        /** @type {?} */
        var computedHeight = instancesInSameZone
            .map((/**
         * @param {?} instance
         * @return {?}
         */
        function (instance) {
            /** @type {?} */
            var innerContainerElement = (/** @type {?} */ (instance.elementRef.nativeElement));
            return innerContainerElement.getBoundingClientRect().height;
        }))
            .reduce((/**
         * @param {?} acc
         * @param {?} curr
         * @return {?}
         */
        function (acc, curr) {
            acc += curr + _this.marginTop;
            return acc;
        }), 0);
        return {
            innerContainerWidth: innerContainerWidth,
            innerContainerHeight: innerContainerHeight,
            precedentInstanceHeight: precedentInstanceHeight,
            computedHeight: computedHeight,
        };
    };
    /**
     * set the final position of the snackbar
     */
    /**
     * set the final position of the snackbar
     * @private
     * @return {?}
     */
    DejaSnackbarComponent.prototype.setPosition = /**
     * set the final position of the snackbar
     * @private
     * @return {?}
     */
    function () {
        var _a = this.computePosition(), innerContainerWidth = _a.innerContainerWidth, innerContainerHeight = _a.innerContainerHeight, computedHeight = _a.computedHeight;
        if (this.anchor === 'left') {
            this.host.style.left = 2 + "%";
            this.host.style.bottom = "calc(" + 33 + "% + " + computedHeight + "px)";
        }
        if (this.anchor === 'right') {
            this.host.style.left = "calc(" + 98 + "% - " + innerContainerWidth + "px)";
            this.host.style.bottom = "calc(" + 33 + "% + " + computedHeight + "px)";
        }
        if (this.anchor === 'top') {
            this.host.style.left = "calc(" + 50 + "% - " + innerContainerWidth / 2 + "px )";
            this.host.style.bottom = "calc(" + 92 + "% - " + innerContainerHeight + "px)";
        }
        if (this.anchor === 'bottom') {
            this.host.style.left = "calc(" + 50 + "% - " + innerContainerWidth / 2 + "px )";
            this.host.style.bottom = "calc(" + 2 + "% + " + computedHeight + "px)";
        }
        if (this.anchor === 'bottom-left') {
            this.host.style.left = 2 + "%";
            this.host.style.bottom = "calc(" + 2 + "% + " + computedHeight + "px)";
        }
        if (this.anchor === 'bottom-right') {
            this.host.style.left = "calc(" + 98 + "% - " + innerContainerWidth + "px)";
            this.host.style.bottom = "calc(" + 2 + "% + " + computedHeight + "px)";
        }
        if (this.anchor === 'left-top') {
            this.host.style.left = 2 + "%";
            this.host.style.bottom = "calc(" + 92 + "% - " + innerContainerHeight + "px - " + computedHeight + "px)";
        }
        if (this.anchor === 'right-top') {
            this.host.style.left = "calc(" + 98 + "% - " + innerContainerWidth + "px)";
            this.host.style.bottom = "calc(" + 92 + "% - " + innerContainerHeight + "px - " + computedHeight + "px)";
        }
    };
    /**
     * recalculate X position for the snackbar (see @HostListener)
     */
    /**
     * recalculate X position for the snackbar (see \@HostListener)
     * @private
     * @return {?}
     */
    DejaSnackbarComponent.prototype.setNewWidth = /**
     * recalculate X position for the snackbar (see \@HostListener)
     * @private
     * @return {?}
     */
    function () {
        var innerContainerWidth = this.computePosition().innerContainerWidth;
        if (this.anchor === 'top' || this.anchor === 'bottom') {
            this.elementRef.nativeElement.style.left = "calc(" + 50 + "% - " + innerContainerWidth / 2 + "px )";
        }
    };
    /**
     * launch adapt animation (snackbar disposal trigger this method)
     * important note:
     * matrix retrieval is used instead of translate Y because using translateY in enter and adapt animation seems
     * to cause unexpected behavior (understand bug)
     * there is also a known bug, if you close a snackbar which share anchor and container with an other one created at the same moment
     * adaptation of the position will not be performed correctly, see demo for more information about how to avoid this behavior
     *
     * @param height
     */
    /**
     * launch adapt animation (snackbar disposal trigger this method)
     * important note:
     * matrix retrieval is used instead of translate Y because using translateY in enter and adapt animation seems
     * to cause unexpected behavior (understand bug)
     * there is also a known bug, if you close a snackbar which share anchor and container with an other one created at the same moment
     * adaptation of the position will not be performed correctly, see demo for more information about how to avoid this behavior
     *
     * @private
     * @param {?} height
     * @return {?}
     */
    DejaSnackbarComponent.prototype.launchAdaptAnimation = /**
     * launch adapt animation (snackbar disposal trigger this method)
     * important note:
     * matrix retrieval is used instead of translate Y because using translateY in enter and adapt animation seems
     * to cause unexpected behavior (understand bug)
     * there is also a known bug, if you close a snackbar which share anchor and container with an other one created at the same moment
     * adaptation of the position will not be performed correctly, see demo for more information about how to avoid this behavior
     *
     * @private
     * @param {?} height
     * @return {?}
     */
    function (height) {
        /** @type {?} */
        var direction = 1;
        if (this.alignents.top) {
            direction = -1;
        }
        /** @type {?} */
        var transform = window.getComputedStyle(this.host).transform;
        /** @type {?} */
        var sixth = parseFloat(transform
            .split(',')
            .slice(-1)
            .pop());
        this.animate$.next((/** @type {?} */ ({
            before: {
                transform: "" + transform,
            },
            after: {
                transform: "matrix(1,0,0,1,0," + (sixth + ((height + this.marginTop) * direction)) + ")",
            },
            duration: this.adaptAnimationDuration,
            easing: 'ease',
        })));
    };
    /**
     * launch enter animation (snackbar instanciation trigger this method)
     */
    /**
     * launch enter animation (snackbar instanciation trigger this method)
     * @private
     * @return {?}
     */
    DejaSnackbarComponent.prototype.launchEnterAnimation = /**
     * launch enter animation (snackbar instanciation trigger this method)
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var direction = -1;
        if (this.alignents.top) {
            direction = 1;
        }
        this.animate$.next((/** @type {?} */ ({
            before: {
                opacity: '0',
                transform: "translateY(" + direction * 200 + "%)",
            },
            after: {
                opacity: '1',
                transform: "translateY(0)",
            },
            delay: this.delay,
            duration: this.enterAnimationDuration,
            easing: 'ease',
        })));
    };
    /**
     * launch leave animation (snackbar lifetime flow trigger this animation)
     */
    /**
     * launch leave animation (snackbar lifetime flow trigger this animation)
     * @private
     * @return {?}
     */
    DejaSnackbarComponent.prototype.launchLeaveAnimation = /**
     * launch leave animation (snackbar lifetime flow trigger this animation)
     * @private
     * @return {?}
     */
    function () {
        this.animate$.next((/** @type {?} */ ({
            before: {
                opacity: '1',
            },
            after: {
                opacity: '0',
            },
            duration: this.leaveAnimationDuration,
            easing: 'ease',
        })));
    };
    /**
     * all snackbar instances
     */
    DejaSnackbarComponent.instances = [];
    DejaSnackbarComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"], args: [{
                    selector: 'deja-snackbar',
                    template: "<ng-content></ng-content>",
                    styles: [":host{position:absolute;bottom:0;left:0;display:block;box-sizing:border-box;z-index:25}:host.absolute{position:absolute!important}"]
                }] }
    ];
    /** @nocollapse */
    DejaSnackbarComponent.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"] }
    ]; };
    DejaSnackbarComponent.propDecorators = {
        delay: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        duration: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        outerContainerElement: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        onAnimationDone: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] }],
        alignment: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        onResize: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"], args: ['window:resize', [],] }]
    };
    return DejaSnackbarComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var DejaSnackbarModule = /** @class */ (function () {
    function DejaSnackbarModule() {
    }
    DejaSnackbarModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"], args: [{
                    declarations: [DejaSnackbarComponent],
                    exports: [DejaSnackbarComponent],
                    imports: [
                        _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
                    ],
                },] }
    ];
    return DejaSnackbarModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */



//# sourceMappingURL=deja-js-component-snackbar.js.map

/***/ })

}]);
//# sourceMappingURL=default~popup-popup-demo-module~range-range-demo-module~snackbar-snackbar-demo-module~tiles-tiles-de~2235f62f.js.map