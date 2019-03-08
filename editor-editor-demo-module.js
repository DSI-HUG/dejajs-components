(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["editor-editor-demo-module"],{

/***/ "./dist/deja-js/component/fesm5/deja-js-component-editor.js":
/*!******************************************************************!*\
  !*** ./dist/deja-js/component/fesm5/deja-js-component-editor.js ***!
  \******************************************************************/
/*! exports provided: DejaEditorModule, DejaEditorComponent, StringUtils, DejaMatEditorModule, DejaEditorSelectorDirective, ɵa */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DejaEditorModule", function() { return DejaEditorModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DejaEditorComponent", function() { return DejaEditorComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StringUtils", function() { return StringUtils; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DejaMatEditorModule", function() { return DejaMatEditorModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DejaEditorSelectorDirective", function() { return DejaEditorSelectorDirective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵa", function() { return DejaEditorService; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/cdk/coercion */ "./node_modules/@angular/cdk/esm5/coercion.es5.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");








/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Monaco Editor Service
 *
 * Service used by Monaco Editor Component to load only once instance of the Monaco Editor Library
 */
var DejaEditorService = /** @class */ (function () {
    function DejaEditorService() {
    }
    /**
     * Load the CKEditor Editor Library
     *
     * @return Resolved promise when the library is loaded
     */
    /**
     * Load the CKEditor Editor Library
     *
     * @return {?} Resolved promise when the library is loaded
     */
    DejaEditorService.prototype.initDejaEditorLib = /**
     * Load the CKEditor Editor Library
     *
     * @return {?} Resolved promise when the library is loaded
     */
    function () {
        if (!this._loading) {
            this.init();
        }
        return this._loader;
    };
    /**
     * @private
     * @return {?}
     */
    DejaEditorService.prototype.init = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this._loader = new Promise((/**
         * @param {?} resolve
         * @return {?}
         */
        function (resolve) {
            _this._loading = true;
            // Load AMD loader if necessary
            if (!((/** @type {?} */ (window))).ckeditor) {
                /** @type {?} */
                var baseElement = document.getElementsByTagName('base')[0] || (/** @type {?} */ ({}));
                /** @type {?} */
                var baseHref = baseElement.href;
                /** @type {?} */
                var basePath = ((/** @type {?} */ (window))).CKEDITOR_BASEPATH || baseHref + "assets/ckeditor/";
                /** @type {?} */
                var loaderScript = document.createElement('script');
                document.head.appendChild(loaderScript);
                loaderScript.type = 'text/javascript';
                loaderScript.src = basePath + "ckeditor.js";
                loaderScript.addEventListener('load', resolve);
            }
        }));
    };
    DejaEditorService.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Injectable"] }
    ];
    return DejaEditorService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * CKEditor component
 * Usage :
 *  <ckeditor [(ngModel)]="data" [config]="{...}" debounce="500"></ckeditor>
 */
var DejaEditorComponent = /** @class */ (function () {
    /**
     * Constructor
     */
    function DejaEditorComponent(zone, _changeDetectorRef, _initializer) {
        this.zone = zone;
        this._changeDetectorRef = _changeDetectorRef;
        this._initializer = _initializer;
        this.change = new _angular_core__WEBPACK_IMPORTED_MODULE_3__["EventEmitter"]();
        this.ready = new _angular_core__WEBPACK_IMPORTED_MODULE_3__["EventEmitter"]();
        this.blur = new _angular_core__WEBPACK_IMPORTED_MODULE_3__["EventEmitter"]();
        this.focus = new _angular_core__WEBPACK_IMPORTED_MODULE_3__["EventEmitter"]();
        this.disabled = new _angular_core__WEBPACK_IMPORTED_MODULE_3__["EventEmitter"]();
        this._inline = true;
        this._value = '';
    }
    Object.defineProperty(DejaEditorComponent.prototype, "readonly", {
        get: /**
         * @return {?}
         */
        function () {
            return this._readonly;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._readonly = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_2__["coerceBooleanProperty"])(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaEditorComponent.prototype, "inline", {
        get: /**
         * @return {?}
         */
        function () {
            return this._inline;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._inline = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_2__["coerceBooleanProperty"])(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaEditorComponent.prototype, "value", {
        get: /**
         * @return {?}
         */
        function () {
            return this._value;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            if (v !== this._value) {
                this._value = v;
                this.onChange(v);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} changes
     * @return {?}
     */
    DejaEditorComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes.readonly && this.instance) {
            this.instance.setReadOnly(changes.readonly.currentValue);
        }
    };
    /**
     * On component destroy
     */
    /**
     * On component destroy
     * @return {?}
     */
    DejaEditorComponent.prototype.ngOnDestroy = /**
     * On component destroy
     * @return {?}
     */
    function () {
        this.focus.complete();
        this.blur.complete();
        this.change.complete();
        this.ready.complete();
        this.disabled.complete();
        if (this.instance) {
            this.instance.focusManager.blur(true);
            this.instance.destroy();
            this.instance = null;
        }
    };
    /**
     * On component view init
     */
    /**
     * On component view init
     * @return {?}
     */
    DejaEditorComponent.prototype.ngAfterViewInit = /**
     * On component view init
     * @return {?}
     */
    function () {
        var _this = this;
        this._initializer.initDejaEditorLib().then((/**
         * @return {?}
         */
        function () {
            _this.ckeditorInit(_this.config || {});
            // Effectively display the editor even if parents component ChangeDetectionStrategy is OnPush
            setTimeout((/**
             * @return {?}
             */
            function () { return _this._changeDetectorRef.markForCheck(); }));
        }));
    };
    /**
     * Value update process
     */
    /**
     * Value update process
     * @param {?} value
     * @return {?}
     */
    DejaEditorComponent.prototype.updateValue = /**
     * Value update process
     * @param {?} value
     * @return {?}
     */
    function (value) {
        var _this = this;
        this.zone.run((/**
         * @return {?}
         */
        function () {
            if (!value) {
                value = null;
            }
            if (_this.value !== value) {
                _this.value = value;
                _this.onChange(value);
                _this.change.emit(value);
            }
        }));
    };
    /**
     * @return {?}
     */
    DejaEditorComponent.prototype.textAreaChange = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.zone.run((/**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var value = _this.host.nativeElement.value;
            _this.onChange(value);
            _this.change.emit(value);
        }));
    };
    /**
     * CKEditor init
     */
    /**
     * CKEditor init
     * @param {?} config
     * @return {?}
     */
    DejaEditorComponent.prototype.ckeditorInit = /**
     * CKEditor init
     * @param {?} config
     * @return {?}
     */
    function (config) {
        var _this = this;
        if (typeof CKEDITOR === 'undefined') {
            console.warn('CKEditor 4.x is missing (http://ckeditor.com/)');
        }
        else {
            // Check textarea exists
            if (this.instance) {
                return;
            }
            if (this.readonly) {
                config.readOnly = this.readonly;
            }
            /** @type {?} */
            var keyEvents_1 = config.on && config.on.key;
            if (!config.on) {
                config.on = {};
            }
            config.on.key = (/**
             * @param {?} event
             * @return {?}
             */
            function (event) {
                // Override CTRL+A event. Native one cause editor switch on first try
                if (event.data.keyCode === 1114177) {
                    // CTRL + A
                    event.cancel();
                    event.stop();
                    _this.instance.document.$.execCommand('SelectAll');
                }
                if (keyEvents_1) {
                    keyEvents_1(event);
                }
            });
            // CKEditor replace textarea
            if (this.inline) {
                this.instance = CKEDITOR.inline(this.host.nativeElement, config);
            }
            else {
                this.instance = CKEDITOR.replace(this.host.nativeElement, config);
            }
            // Set initial value
            this.instance.setData(this.value);
            // listen for instanceReady event
            this.instance.on('instanceReady', (/**
             * @param {?} evt
             * @return {?}
             */
            function (evt) {
                // send the evt to the EventEmitter
                _this.ready.emit(evt);
            }));
            // CKEditor change event
            this.instance.on('change', (/**
             * @return {?}
             */
            function () {
                /** @type {?} */
                var value = _this.instance.getData();
                // Debounce update
                if (_this.debounce) {
                    if (_this.debounceTimeout) {
                        clearTimeout(_this.debounceTimeout);
                    }
                    _this.debounceTimeout = setTimeout((/**
                     * @return {?}
                     */
                    function () {
                        _this.updateValue(value);
                        _this.debounceTimeout = null;
                    }), parseInt(_this.debounce, null));
                    // Live update
                }
                else {
                    _this.updateValue(value);
                }
            }));
            // CKEditor blur event
            this.instance.on('blur', (/**
             * @param {?} evt
             * @return {?}
             */
            function (evt) {
                _this.blur.emit(evt);
                _this.onTouched();
            }));
            // CKEditor focus event
            this.instance.on('focus', (/**
             * @param {?} evt
             * @return {?}
             */
            function (evt) {
                if (!_this.readonly) {
                    _this.focus.emit(evt);
                }
            }));
        }
    };
    /**
     * Implements ControlValueAccessor
     */
    /**
     * Implements ControlValueAccessor
     * @param {?} value
     * @return {?}
     */
    DejaEditorComponent.prototype.writeValue = /**
     * Implements ControlValueAccessor
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this._value = value;
        if (this.instance) {
            this.instance.setData(value);
        }
        else {
            this.host.nativeElement.value = value;
        }
    };
    /**
     * @param {?} _
     * @return {?}
     */
    DejaEditorComponent.prototype.onChange = /**
     * @param {?} _
     * @return {?}
     */
    function (_) { };
    /**
     * @return {?}
     */
    DejaEditorComponent.prototype.onTouched = /**
     * @return {?}
     */
    function () { };
    /**
     * @param {?} fn
     * @return {?}
     */
    DejaEditorComponent.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onChange = fn;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    DejaEditorComponent.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onTouched = fn;
    };
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    DejaEditorComponent.prototype.setDisabledState = /**
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        this.readonly = isDisabled;
        this.disabled.next(isDisabled);
        if (this.instance) {
            this.instance.setReadOnly(isDisabled);
        }
    };
    /**
     * Return the word at cursor position.
     *  - If the cursor is at the end of a word, it return that word.
     *  - If the cursor is at the begining of a word, it return that word.
     *  - If the cursor is in the middle of a word, it return that word.
     *  - If there are no word nearly the cursor, return null
     */
    /**
     * Return the word at cursor position.
     *  - If the cursor is at the end of a word, it return that word.
     *  - If the cursor is at the begining of a word, it return that word.
     *  - If the cursor is in the middle of a word, it return that word.
     *  - If there are no word nearly the cursor, return null
     * @return {?}
     */
    DejaEditorComponent.prototype.getWordAtCursor = /**
     * Return the word at cursor position.
     *  - If the cursor is at the end of a word, it return that word.
     *  - If the cursor is at the begining of a word, it return that word.
     *  - If the cursor is in the middle of a word, it return that word.
     *  - If there are no word nearly the cursor, return null
     * @return {?}
     */
    function () {
        /** @type {?} */
        var range = this.instance.getSelection().getRanges(true)[0];
        /** @type {?} */
        var word = this._firstTextNode(range);
        return (word && word.toReplace) || null;
    };
    /**
     * @return {?}
     */
    DejaEditorComponent.prototype.hasActiveSelection = /**
     * @return {?}
     */
    function () {
        return !!this.getSelectedText();
    };
    /**
     * @return {?}
     */
    DejaEditorComponent.prototype.getSelectedText = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var selection = this.instance.getSelection();
        return selection.getSelectedText();
    };
    /**
     * Replace the content of the editor.
     *  - If there is an active selection, replace this selection
     *  - If the editor is empty, simply insert the text
     *  - If the cursor is near a word, replace this word with the text
     *  - If there is no selection, no word near the cursor, simply insert the text at the cursor position
     * @param replace the string to replace with
     */
    /**
     * Replace the content of the editor.
     *  - If there is an active selection, replace this selection
     *  - If the editor is empty, simply insert the text
     *  - If the cursor is near a word, replace this word with the text
     *  - If there is no selection, no word near the cursor, simply insert the text at the cursor position
     * @param {?} replace the string to replace with
     * @return {?}
     */
    DejaEditorComponent.prototype.replace = /**
     * Replace the content of the editor.
     *  - If there is an active selection, replace this selection
     *  - If the editor is empty, simply insert the text
     *  - If the cursor is near a word, replace this word with the text
     *  - If there is no selection, no word near the cursor, simply insert the text at the cursor position
     * @param {?} replace the string to replace with
     * @return {?}
     */
    function (replace) {
        if (!replace) {
            return;
        }
        /** @type {?} */
        var selection = this.getSelectedText();
        if (selection) {
            // Focus is used during the CKEDITOR insertText process and cause deselection of the selected text
            // So we temporarily deactivate it
            /** @type {?} */
            var focus_1 = this.instance.focus;
            this.instance.focus = (/**
             * @return {?}
             */
            function () { });
            this.instance.insertText(replace);
            this.instance.focus = focus_1;
            return;
        }
        /** @type {?} */
        var range = this.instance.getSelection().getRanges(true)[0];
        if (!range) {
            this.instance.insertText(replace);
            return;
        }
        /** @type {?} */
        var text = this._firstTextNode(range);
        if (text) {
            this._replaceWord(text, replace);
        }
        else {
            this.instance.insertText(replace);
        }
        this.setFocus();
    };
    /**
     * @return {?}
     */
    DejaEditorComponent.prototype.setFocus = /**
     * @return {?}
     */
    function () {
        if (this.instance) {
            this.instance.focus();
        }
        else {
            this.host.nativeElement.focus();
        }
    };
    /**
     * @private
     * @param {?} node
     * @param {?=} reverse
     * @return {?}
     */
    DejaEditorComponent.prototype._hasTextNodeAsChild = /**
     * @private
     * @param {?} node
     * @param {?=} reverse
     * @return {?}
     */
    function (node, reverse) {
        if (reverse === void 0) { reverse = false; }
        var e_1, _a;
        /** @type {?} */
        var children = node.getChildren().toArray();
        if (reverse) {
            for (var i = children.length - 1; i >= 0; i--) {
                /** @type {?} */
                var child = children[i];
                if (child.type === CKEDITOR.NODE_TEXT) {
                    return child;
                }
                else {
                    /** @type {?} */
                    var inChild = this._hasTextNodeAsChild(child);
                    if (inChild) {
                        return inChild;
                    }
                }
            }
        }
        else {
            try {
                for (var children_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__values"])(children), children_1_1 = children_1.next(); !children_1_1.done; children_1_1 = children_1.next()) {
                    var child = children_1_1.value;
                    if (child.type === CKEDITOR.NODE_TEXT) {
                        return child;
                    }
                    else {
                        /** @type {?} */
                        var inChild = this._hasTextNodeAsChild(child);
                        if (inChild) {
                            return inChild;
                        }
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (children_1_1 && !children_1_1.done && (_a = children_1.return)) _a.call(children_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        return null;
    };
    /**
     * @private
     * @param {?} textNode
     * @param {?=} reverse
     * @return {?}
     */
    DejaEditorComponent.prototype._mergeTextNodeAroundWithDirection = /**
     * @private
     * @param {?} textNode
     * @param {?=} reverse
     * @return {?}
     */
    function (textNode, reverse) {
        if (reverse === void 0) { reverse = false; }
        /** @type {?} */
        var toRemove = [];
        /** @type {?} */
        var newText = textNode.getText();
        /** @type {?} */
        var x = textNode;
        while ((x = reverse ? x.getPrevious() : x.getNext)) {
            if (x.type !== CKEDITOR.NODE_TEXT ||
                x
                    .getText()
                    .charAt(reverse ? x.getText().length - 1 : 0)
                    .match(/[\s,;.:!?]/)) {
                break;
            }
            if (reverse) {
                newText = x.getText() + newText;
            }
            else {
                newText += x.getText();
            }
            toRemove.push(x);
        }
        if (toRemove.length > 0) {
            textNode.setText(newText);
            toRemove.forEach((/**
             * @param {?} node
             * @return {?}
             */
            function (node) { return node.remove(); }));
        }
    };
    /**
     * @private
     * @param {?} textNode
     * @return {?}
     */
    DejaEditorComponent.prototype._mergeTextNodeAround = /**
     * @private
     * @param {?} textNode
     * @return {?}
     */
    function (textNode) {
        this._mergeTextNodeAroundWithDirection(textNode, true);
        this._mergeTextNodeAroundWithDirection(textNode);
        return textNode;
    };
    /**
     * @private
     * @param {?} node
     * @param {?=} reverse
     * @return {?}
     */
    DejaEditorComponent.prototype._firstNonEmptyTextNode = /**
     * @private
     * @param {?} node
     * @param {?=} reverse
     * @return {?}
     */
    function (node, reverse) {
        if (reverse === void 0) { reverse = false; }
        /** @type {?} */
        var x = node;
        while ((x = reverse ? x.getPrevious() : x.getNext())) {
            if (x.type === CKEDITOR.NODE_TEXT) {
                if (x.getText() !== '') {
                    return x;
                }
            }
            else {
                return x;
            }
        }
    };
    /**
     * @private
     * @param {?} text
     * @return {?}
     */
    DejaEditorComponent.prototype._trim = /**
     * @private
     * @param {?} text
     * @return {?}
     */
    function (text) {
        if (text) {
            text = text.replace(/[\u200b\u00A0]/g, '').trim();
        }
        return text;
    };
    /**
     * @private
     * @param {?} text
     * @param {?=} reverse
     * @return {?}
     */
    DejaEditorComponent.prototype._extractFirstWord = /**
     * @private
     * @param {?} text
     * @param {?=} reverse
     * @return {?}
     */
    function (text, reverse) {
        if (reverse === void 0) { reverse = false; }
        if (!text) {
            return text;
        }
        if (text.indexOf(' ') !== -1) {
            /** @type {?} */
            var spaceSplit = text.split(' ');
            return this._trim(spaceSplit[reverse ? spaceSplit.length - 1 : 0]);
        }
        else {
            return this._trim(text);
        }
    };
    /**
     * @private
     * @param {?} selectedNode
     * @param {?=} reverse
     * @param {?=} firstNodeIsText
     * @return {?}
     */
    DejaEditorComponent.prototype._firstTextNodeResult = /**
     * @private
     * @param {?} selectedNode
     * @param {?=} reverse
     * @param {?=} firstNodeIsText
     * @return {?}
     */
    function (selectedNode, reverse, firstNodeIsText) {
        if (reverse === void 0) { reverse = false; }
        if (firstNodeIsText === void 0) { firstNodeIsText = false; }
        if (this._trim(selectedNode.getText())) {
            /** @type {?} */
            var node = this._mergeTextNodeAround(selectedNode);
            return {
                textNode: node,
                firstNodeIsText: firstNodeIsText,
                toReplace: this._extractFirstWord(node.getText(), reverse)
            };
        }
        return null;
    };
    /**
     * @private
     * @param {?} range
     * @param {?=} reverse
     * @return {?}
     */
    DejaEditorComponent.prototype._firstTextNodeWithDirection = /**
     * @private
     * @param {?} range
     * @param {?=} reverse
     * @return {?}
     */
    function (range, reverse) {
        if (reverse === void 0) { reverse = false; }
        /** @type {?} */
        var startContainer = range.startContainer;
        if (reverse && startContainer.type === CKEDITOR.NODE_TEXT) {
            return this._firstTextNodeResult(startContainer, reverse, true);
        }
        /** @type {?} */
        var startNode = startContainer.type === CKEDITOR.NODE_TEXT
            ? reverse
                ? this._firstNonEmptyTextNode(startContainer, true)
                : this._firstNonEmptyTextNode(startContainer)
            : startContainer.getChildren().getItem(range.startOffset - 1);
        if (startNode) {
            if (startNode.type === CKEDITOR.NODE_TEXT) {
                return this._firstTextNodeResult(startNode, reverse);
            }
            /** @type {?} */
            var x = this._hasTextNodeAsChild(startNode, reverse);
            if (x) {
                return this._firstTextNodeResult(x, reverse);
            }
            x = startNode;
            while ((x = reverse ? x.getPrevious() : x.getNext())) {
                if (x.type === CKEDITOR.NODE_TEXT) {
                    return this._firstTextNodeResult(x, reverse);
                }
                /** @type {?} */
                var textNode = this._hasTextNodeAsChild(x, reverse);
                if (textNode) {
                    return this._firstTextNodeResult(textNode, reverse);
                }
            }
        }
        return null;
    };
    /**
     * @private
     * @param {?} range
     * @return {?}
     */
    DejaEditorComponent.prototype._firstTextNode = /**
     * @private
     * @param {?} range
     * @return {?}
     */
    function (range) {
        /** @type {?} */
        var textNode = this._firstTextNodeWithDirection(range, true);
        if (!textNode) {
            textNode = this._firstTextNodeWithDirection(range);
        }
        return textNode;
    };
    /**
     * @private
     * @param {?} node
     * @param {?} replace
     * @return {?}
     */
    DejaEditorComponent.prototype._replaceWord = /**
     * @private
     * @param {?} node
     * @param {?} replace
     * @return {?}
     */
    function (node, replace) {
        /** @type {?} */
        var split = node.textNode.getText().split(node.toReplace);
        node.textNode.setText(split[0]);
        /** @type {?} */
        var newElement = CKEDITOR.dom.element.createFromHtml("<span>" + CKEDITOR.tools.transformPlainTextToHtml(replace, CKEDITOR.ENTER_BR) + "</span>");
        newElement.insertAfter(node.textNode);
        if (split.length === 2 && split[1]) {
            /** @type {?} */
            var end = new CKEDITOR.dom.text(split[1]);
            end.insertAfter(newElement);
        }
        this.instance.getSelection().selectElement(node.textNode);
        /** @type {?} */
        var tmpRange = this.instance.getSelection().getRanges()[0];
        tmpRange.setStartAfter(node.textNode);
        tmpRange.select();
    };
    DejaEditorComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"], args: [{
                    selector: 'deja-editor',
                    providers: [
                        {
                            provide: _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NG_VALUE_ACCESSOR"],
                            useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["forwardRef"])((/**
                             * @return {?}
                             */
                            function () { return DejaEditorComponent; })),
                            multi: true
                        }
                    ],
                    template: "<textarea #host (onchange)=\"textAreaChange()\" style=\"visibility: hidden\"></textarea>\n",
                    changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ChangeDetectionStrategy"].OnPush,
                    encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ViewEncapsulation"].None,
                    styles: ["deja-editor{line-height:normal}deja-editor .cke_textarea_inline>p{margin:0}deja-editor .cke_textarea_inline:focus{outline:0}"]
                }] }
    ];
    /** @nocollapse */
    DejaEditorComponent.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["NgZone"] },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ChangeDetectorRef"] },
        { type: DejaEditorService }
    ]; };
    DejaEditorComponent.propDecorators = {
        config: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
        debounce: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
        change: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Output"] }],
        ready: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Output"] }],
        blur: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Output"] }],
        focus: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Output"] }],
        disabled: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Output"] }],
        host: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ViewChild"], args: ['host',] }],
        readonly: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
        inline: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
        value: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }]
    };
    return DejaEditorComponent;
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
var StringUtils = /** @class */ (function () {
    function StringUtils() {
    }
    /**
     * @param {?} from
     * @param {?} cursorPosition
     * @return {?}
     */
    StringUtils.getLastWord = /**
     * @param {?} from
     * @param {?} cursorPosition
     * @return {?}
     */
    function (from, cursorPosition) {
        if (!from) {
            return null;
        }
        if (from.length > cursorPosition) {
            from =
                from.substr(0, cursorPosition) +
                    from.substr(cursorPosition).split(/[\s,;.:]/)[0];
        }
        if (!from) {
            return null;
        }
        if (from.match(/[\s,.!?;:]$/)) {
            return null;
        }
        /** @type {?} */
        var stringArray = from.split(/[\s,.!?;:]/);
        return stringArray[stringArray.length - 1];
    };
    /**
     * @param {?} from
     * @param {?} newValue
     * @param {?} cursorStartPosition
     * @param {?} cursorEndPosition
     * @return {?}
     */
    StringUtils.insert = /**
     * @param {?} from
     * @param {?} newValue
     * @param {?} cursorStartPosition
     * @param {?} cursorEndPosition
     * @return {?}
     */
    function (from, newValue, cursorStartPosition, cursorEndPosition) {
        if (cursorStartPosition === cursorEndPosition) {
            /** @type {?} */
            var result = {
                value: from.substring(0, cursorStartPosition === 0 ? 0 : cursorStartPosition + 1) + newValue,
                newStartPosition: 0,
                newEndPosition: 0
            };
            result.newStartPosition = result.value.length;
            result.newEndPosition = result.value.length;
            return result;
        }
        else {
            /** @type {?} */
            var result = {
                value: from.substring(0, cursorStartPosition),
                newStartPosition: 0,
                newEndPosition: 0
            };
            result.newStartPosition = result.value.length;
            result.value += newValue;
            result.newEndPosition = result.value.length;
            result.value = result.value + from.substring(cursorEndPosition);
            return result;
        }
    };
    /**
     * @param {?} from
     * @param {?} lastValue
     * @param {?} newValue
     * @param {?} cursorStartPosition
     * @param {?} cursorEndPosition
     * @return {?}
     */
    StringUtils.replace = /**
     * @param {?} from
     * @param {?} lastValue
     * @param {?} newValue
     * @param {?} cursorStartPosition
     * @param {?} cursorEndPosition
     * @return {?}
     */
    function (from, lastValue, newValue, cursorStartPosition, cursorEndPosition) {
        if (cursorStartPosition === cursorEndPosition) {
            /** @type {?} */
            var position = cursorStartPosition;
            if (from.charAt(position).match(/[\s,;.:]/)) {
                position--;
            }
            while (!from.charAt(position).match(/[\s,;.:]/) && position > 0) {
                position--;
            }
            /** @type {?} */
            var result = {
                value: from.substring(0, position === 0 ? 0 : position + 1) +
                    newValue,
                newStartPosition: 0,
                newEndPosition: 0
            };
            result.newStartPosition = result.value.length;
            result.newEndPosition = result.value.length;
            result.value =
                result.value +
                    from.substring((position === 0 ? 0 : position + 1) +
                        (lastValue ? lastValue.length : 0));
            return result;
        }
        else {
            /** @type {?} */
            var result = {
                value: from.substring(0, cursorStartPosition),
                newStartPosition: 0,
                newEndPosition: 0
            };
            result.newStartPosition = result.value.length;
            result.value += newValue;
            result.newEndPosition = result.value.length;
            result.value = result.value + from.substring(cursorEndPosition);
            return result;
        }
    };
    /**
     * @param {?} from
     * @param {?} cursorStartPosition
     * @param {?} cursorEndPosition
     * @return {?}
     */
    StringUtils.removeLastWord = /**
     * @param {?} from
     * @param {?} cursorStartPosition
     * @param {?} cursorEndPosition
     * @return {?}
     */
    function (from, cursorStartPosition, cursorEndPosition) {
        if (cursorStartPosition === cursorEndPosition) {
            /** @type {?} */
            var position = cursorStartPosition;
            while (!from.charAt(position).match(/[\s,;.:]/) && position > 0) {
                position--;
            }
            /** @type {?} */
            var endPosition = cursorEndPosition + 1;
            while (!from.charAt(endPosition).match(/[\s,;.:]/) &&
                endPosition < from.length) {
                endPosition++;
            }
            /** @type {?} */
            var result = {
                startValue: from.substring(0, position === 0 ? 0 : position + 1),
                endValue: from.substring(endPosition)
            };
            return result;
        }
        else {
            /** @type {?} */
            var result = {
                startValue: from.substring(0, cursorStartPosition),
                endValue: from.substring(cursorEndPosition)
            };
            return result;
        }
    };
    return StringUtils;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * CKEditorModule
 */
var DejaEditorModule = /** @class */ (function () {
    function DejaEditorModule() {
    }
    DejaEditorModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["NgModule"], args: [{
                    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"]],
                    declarations: [DejaEditorComponent],
                    exports: [DejaEditorComponent],
                    providers: [DejaEditorService]
                },] }
    ];
    return DejaEditorModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var nextUniqueId = 0;
var DejaEditorSelectorDirective = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__extends"])(DejaEditorSelectorDirective, _super);
    function DejaEditorSelectorDirective(_editor, ngControl, _parentForm, _parentFormGroup, _defaultErrorStateMatcher, _hostElement) {
        var _this = _super.call(this, _defaultErrorStateMatcher, _parentForm, _parentFormGroup, ngControl) || this;
        _this._editor = _editor;
        _this.ngControl = ngControl;
        _this._hostElement = _hostElement;
        _this._uid = "mat-input-" + nextUniqueId++;
        _this.stateChanges = new rxjs__WEBPACK_IMPORTED_MODULE_6__["Subject"]();
        _this._required = false;
        _this._disabled = false;
        _this.describedBy = '';
        _this.controlType = 'app-editor';
        return _this;
    }
    Object.defineProperty(DejaEditorSelectorDirective.prototype, "id", {
        get: /**
         * @return {?}
         */
        function () {
            return this._id;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._id = value || this._uid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaEditorSelectorDirective.prototype, "required", {
        get: /**
         * @return {?}
         */
        function () {
            return this._required;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._required = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_2__["coerceBooleanProperty"])(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaEditorSelectorDirective.prototype, "disabled", {
        get: /**
         * @return {?}
         */
        function () {
            if (this.ngControl && this.ngControl.disabled !== null) {
                return this.ngControl.disabled;
            }
            return this._disabled;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._disabled = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_2__["coerceBooleanProperty"])(value);
            // Browsers may not fire the blur event if the input is disabled too quickly.
            // Reset from here to ensure that the element doesn't become stuck.
            if (this.focused) {
                this.focused = false;
                this.stateChanges.next();
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DejaEditorSelectorDirective.prototype.onContainerClick = /**
     * @return {?}
     */
    function () {
        this._editor.setFocus();
    };
    /**
     * @param {?} ids
     * @return {?}
     */
    DejaEditorSelectorDirective.prototype.setDescribedByIds = /**
     * @param {?} ids
     * @return {?}
     */
    function (ids) {
        this.describedBy = ids.join(' ');
    };
    /**
     * @return {?}
     */
    DejaEditorSelectorDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this._editor.focus.subscribe((/**
         * @return {?}
         */
        function () {
            _this.focused = true;
            _this.stateChanges.next();
        }));
        this._editor.blur.subscribe((/**
         * @return {?}
         */
        function () {
            _this.focused = false;
            _this.stateChanges.next();
        }));
        this._editor.change.subscribe((/**
         * @return {?}
         */
        function () {
            _this.stateChanges.next();
        }));
        this._generatePlaceholder();
    };
    /**
     * @return {?}
     */
    DejaEditorSelectorDirective.prototype.ngDoCheck = /**
     * @return {?}
     */
    function () {
        if (this.ngControl) {
            this.updateErrorState();
        }
    };
    /**
     * @return {?}
     */
    DejaEditorSelectorDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.stateChanges.complete();
    };
    Object.defineProperty(DejaEditorSelectorDirective.prototype, "empty", {
        get: /**
         * @return {?}
         */
        function () {
            return !this._editor.value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaEditorSelectorDirective.prototype, "shouldLabelFloat", {
        get: /**
         * @return {?}
         */
        function () {
            if (this.focused || !this.empty) {
                if (this.empty) {
                    this._attachPlaceholder();
                }
                else {
                    this._detachPlaceholder();
                }
                return true;
            }
            else {
                this._detachPlaceholder();
                return false;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     * @return {?}
     */
    DejaEditorSelectorDirective.prototype._attachPlaceholder = /**
     * @private
     * @return {?}
     */
    function () {
        if (this._placeholder && !this._placeholder.parentElement) {
            this._hostElement.nativeElement.appendChild(this._placeholder);
        }
    };
    /**
     * @private
     * @return {?}
     */
    DejaEditorSelectorDirective.prototype._detachPlaceholder = /**
     * @private
     * @return {?}
     */
    function () {
        if (this._placeholder && this._placeholder.parentElement) {
            this._placeholder.remove();
        }
    };
    /**
     * @private
     * @return {?}
     */
    DejaEditorSelectorDirective.prototype._generatePlaceholder = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.placeholder) {
            this._placeholder = document.createElement('div');
            this._placeholder.style.position = 'absolute';
            this._placeholder.style.position = 'absolute';
            this._placeholder.style.left = '0';
            this._placeholder.style.boxSizing = 'content-box';
            this._placeholder.style.width = '100%';
            this._placeholder.style.height = '100%';
            this._placeholder.style.overflow = 'hidden';
            this._placeholder.style.pointerEvents = 'none';
            this._placeholder.style.top = '-0.84375em';
            this._placeholder.style.paddingTop = '0.84375em';
            /** @type {?} */
            var placeholderChildren = document.createElement('div');
            placeholderChildren.style.color = 'rgba(0,0,0,0.54)';
            placeholderChildren.style.top = '1.28125em';
            placeholderChildren.style.position = 'absolute';
            /** @type {?} */
            var placeholderText = document.createTextNode(this.placeholder);
            placeholderChildren.appendChild(placeholderText);
            this._placeholder.appendChild(placeholderChildren);
        }
    };
    DejaEditorSelectorDirective.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Directive"], args: [{
                    selector: 'deja-editor',
                    providers: [
                        {
                            provide: _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatFormFieldControl"],
                            useExisting: DejaEditorSelectorDirective
                        }
                    ]
                },] }
    ];
    /** @nocollapse */
    DejaEditorSelectorDirective.ctorParameters = function () { return [
        { type: DejaEditorComponent, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Self"] }] },
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NgControl"], decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Optional"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Self"] }] },
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NgForm"], decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Optional"] }] },
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormGroupDirective"], decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Optional"] }] },
        { type: _angular_material__WEBPACK_IMPORTED_MODULE_5__["ErrorStateMatcher"] },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ElementRef"], decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Host"] }] }
    ]; };
    DejaEditorSelectorDirective.propDecorators = {
        id: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
        placeholder: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
        required: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
        disabled: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
        describedBy: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["HostBinding"], args: ['attr.aria-describedby',] }]
    };
    return DejaEditorSelectorDirective;
}(_angular_material__WEBPACK_IMPORTED_MODULE_5__["_MatInputMixinBase"]));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var DejaMatEditorModule = /** @class */ (function () {
    function DejaMatEditorModule() {
    }
    DejaMatEditorModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["NgModule"], args: [{
                    imports: [DejaEditorModule, _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatFormFieldModule"]],
                    declarations: [DejaEditorSelectorDirective],
                    exports: [DejaEditorSelectorDirective, DejaEditorComponent]
                },] }
    ];
    return DejaMatEditorModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */



//# sourceMappingURL=deja-js-component-editor.js.map

/***/ }),

/***/ "./src/app/editor/editor-demo.component.html":
/*!***************************************************!*\
  !*** ./src/app/editor/editor-demo.component.html ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-tab-group [selectedIndex]=\"tabIndex\" (selectedTabChange)=\"tabIndex = $event.index\">\n  <mat-tab label=\"API REFERENCE\"></mat-tab>\n  <mat-tab label=\"EXAMPLES\"></mat-tab>\n</mat-tab-group>\n\n<mat-card class=\"demo-card demo-basic\" *ngIf=\"tabIndex === 0\">\n  <deja-markdown [url]=\"'https://raw.githubusercontent.com/DSI-HUG/dejajs-components/dev/projects/deja-js/component/editor/readme.md'\"></deja-markdown>\n</mat-card>\n\n<div *ngIf=\"tabIndex === 1\">\n  <mat-card class=\"demo-card\">\n      <mat-toolbar color=\"primary\">Inline CKEditor with material skin</mat-toolbar>\n      <mat-card-content>\n          <div fxLayout>\n              <div fxFlex=\"1 1 0\">\n                  <h3>Editor :</h3>\n                  <mat-form-field>\n                    <deja-editor [(ngModel)]=\"matText\" [config]=\"editorConfig\"></deja-editor>\n                  </mat-form-field>\n              </div>\n              <div fxFlex=\"1 1 0\">\n                  <h3>Result :</h3>\n                  <div [innerHTML]=\"matText\"></div>\n              </div>\n          </div>\n      </mat-card-content>\n  </mat-card>\n\n  <mat-card class=\"demo-card\">\n    <mat-toolbar color=\"primary\">Default CKEditor</mat-toolbar>\n    <mat-card-content>\n      <div fxLayout>\n        <div fxFlex=\"1 1 0\">\n          <h3>Editor :</h3>\n          <deja-editor class=\"inline\" [(ngModel)]=\"matText\" [config]=\"editorConfig\" [inline]=\"false\"></deja-editor>\n        </div>\n        <div fxFlex=\"1 1 0\">\n          <h3>Result :</h3>\n          <div [innerHTML]=\"matText\"></div>\n        </div>\n      </div>\n    </mat-card-content>\n  </mat-card>\n\n  <mat-card class=\"demo-card\">\n      <mat-toolbar color=\"primary\">Replace</mat-toolbar>\n      <mat-card-content>\n        <div fxLayout>\n          <div fxFlex=\"1 1 0\">\n            <h3>Editor :</h3>\n            <deja-editor class=\"inline\" [config]=\"editorConfig\" [inline]=\"false\" #replaceEditor></deja-editor>\n          </div>\n          <div fxFlex=\"1 1 0\">\n            <h3>Actions :</h3>\n            <div>\n              <mat-form-field>\n                <input matInput [(ngModel)]=\"replaceWith\">\n              </mat-form-field>\n              <button mat-raised-button (click)=\"replace()\">Replace</button>\n            </div>\n          </div>\n        </div>\n      </mat-card-content>\n    </mat-card>\n\n</div>\n"

/***/ }),

/***/ "./src/app/editor/editor-demo.component.scss":
/*!***************************************************!*\
  !*** ./src/app/editor/editor-demo.component.scss ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "mat-form-field {\n  width: 90%; }\n\ndeja-editor.inline {\n  width: 90%;\n  display: block; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3RyYXZpcy9idWlsZC9EU0ktSFVHL2RlamFqcy1jb21wb25lbnRzL3NyYy9hcHAvZWRpdG9yL2VkaXRvci1kZW1vLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsVUFBVSxFQUFBOztBQUdaO0VBQ0UsVUFBVTtFQUNWLGNBQWMsRUFBQSIsImZpbGUiOiJzcmMvYXBwL2VkaXRvci9lZGl0b3ItZGVtby5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIm1hdC1mb3JtLWZpZWxkIHtcbiAgd2lkdGg6IDkwJTtcbn1cblxuZGVqYS1lZGl0b3IuaW5saW5lIHtcbiAgd2lkdGg6IDkwJTtcbiAgZGlzcGxheTogYmxvY2s7XG59XG4iXX0= */"

/***/ }),

/***/ "./src/app/editor/editor-demo.component.ts":
/*!*************************************************!*\
  !*** ./src/app/editor/editor-demo.component.ts ***!
  \*************************************************/
/*! exports provided: DejaEditorDemoComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DejaEditorDemoComponent", function() { return DejaEditorDemoComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _deja_js_component_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @deja-js/component/editor */ "./dist/deja-js/component/fesm5/deja-js-component-editor.js");
/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */



var DejaEditorDemoComponent = /** @class */ (function () {
    function DejaEditorDemoComponent() {
        this.tabIndex = 1;
        this.editorConfig = {};
    }
    DejaEditorDemoComponent.prototype.ngOnInit = function () {
        this.matText = "<b>Inline Editor</b> <ul><li>First item</li><li>Second item</li><ul>";
        // https://docs.ckeditor.com/ckeditor4/latest/api/CKEDITOR_config.html
        this.editorConfig.extraPlugins = 'colorbutton,autogrow';
        this.editorConfig.on = {
            instanceReady: function (ev) {
                this.dataProcessor.writer.indentationChars = '';
                this.dataProcessor.writer.lineBreakChars = '';
            }
        };
        this.editorConfig.title = '';
        this.editorConfig.disableNativeSpellChecker = true;
        this.editorConfig.scayt_autoStartup = true;
        this.editorConfig.scayt_sLang = 'fr_FR';
        this.editorConfig.wsc_lang = 'fr_FR';
        this.editorConfig.scayt_disableOptionsStorage = 'all';
        this.editorConfig.language = 'fr';
        this.editorConfig.enterMode = 3; // CKEDITOR.ENTER_DIV;
        this.editorConfig.contentsCss = [
            // Default css for editor iFrame
            'assets/ckeditor/contents.css'
        ];
        this.editorConfig.autoGrow_onStartup = true;
        this.editorConfig.coreStyles_bold = { element: 'b', overrides: 'strong' };
        this.editorConfig.coreStyles_italic = { element: 'i', overrides: 'em' };
    };
    DejaEditorDemoComponent.prototype.replace = function () {
        this.replaceEditor.replace(this.replaceWith);
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('replaceEditor'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _deja_js_component_editor__WEBPACK_IMPORTED_MODULE_2__["DejaEditorComponent"])
    ], DejaEditorDemoComponent.prototype, "replaceEditor", void 0);
    DejaEditorDemoComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'deja-editor-demo',
            template: __webpack_require__(/*! ./editor-demo.component.html */ "./src/app/editor/editor-demo.component.html"),
            styles: [__webpack_require__(/*! ./editor-demo.component.scss */ "./src/app/editor/editor-demo.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], DejaEditorDemoComponent);
    return DejaEditorDemoComponent;
}());



/***/ }),

/***/ "./src/app/editor/editor-demo.module.ts":
/*!**********************************************!*\
  !*** ./src/app/editor/editor-demo.module.ts ***!
  \**********************************************/
/*! exports provided: DejaEditorDemoModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DejaEditorDemoModule", function() { return DejaEditorDemoModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/flex-layout */ "./node_modules/@angular/flex-layout/esm5/flex-layout.es5.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/card */ "./node_modules/@angular/material/esm5/card.es5.js");
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/toolbar */ "./node_modules/@angular/material/esm5/toolbar.es5.js");
/* harmony import */ var _deja_js_component_editor__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @deja-js/component/editor */ "./dist/deja-js/component/fesm5/deja-js-component-editor.js");
/* harmony import */ var _component_markdown__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../component/markdown */ "./src/component/markdown/index.ts");
/* harmony import */ var _editor_demo_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./editor-demo.component */ "./src/app/editor/editor-demo.component.ts");
/* harmony import */ var _editor_demo_routes__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./editor-demo.routes */ "./src/app/editor/editor-demo.routes.ts");

/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */











var DejaEditorDemoModule = /** @class */ (function () {
    function DejaEditorDemoModule() {
    }
    DejaEditorDemoModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [_editor_demo_component__WEBPACK_IMPORTED_MODULE_10__["DejaEditorDemoComponent"]],
            exports: [_editor_demo_component__WEBPACK_IMPORTED_MODULE_10__["DejaEditorDemoComponent"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"],
                _angular_flex_layout__WEBPACK_IMPORTED_MODULE_3__["FlexLayoutModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatButtonModule"],
                _angular_material_card__WEBPACK_IMPORTED_MODULE_6__["MatCardModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatFormFieldModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatInputModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatTabsModule"],
                _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_7__["MatToolbarModule"],
                _deja_js_component_editor__WEBPACK_IMPORTED_MODULE_8__["DejaMatEditorModule"],
                _component_markdown__WEBPACK_IMPORTED_MODULE_9__["DejaMarkdownModule"],
                _editor_demo_routes__WEBPACK_IMPORTED_MODULE_11__["routing"],
            ],
            providers: [],
        })
    ], DejaEditorDemoModule);
    return DejaEditorDemoModule;
}());



/***/ }),

/***/ "./src/app/editor/editor-demo.routes.ts":
/*!**********************************************!*\
  !*** ./src/app/editor/editor-demo.routes.ts ***!
  \**********************************************/
/*! exports provided: routing */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "routing", function() { return routing; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _editor_demo_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./editor-demo.component */ "./src/app/editor/editor-demo.component.ts");
/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */


var routes = [
    { path: '', component: _editor_demo_component__WEBPACK_IMPORTED_MODULE_1__["DejaEditorDemoComponent"] },
    { path: '**', redirectTo: '', pathMatch: 'full' },
];
var routing = _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forChild(routes);


/***/ })

}]);
//# sourceMappingURL=editor-editor-demo-module.js.map