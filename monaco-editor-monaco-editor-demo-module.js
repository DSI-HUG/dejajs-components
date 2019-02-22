(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["monaco-editor-monaco-editor-demo-module"],{

/***/ "./dist/deja-js/component/fesm5/deja-js-component-monaco-editor.js":
/*!*************************************************************************!*\
  !*** ./dist/deja-js/component/fesm5/deja-js-component-monaco-editor.js ***!
  \*************************************************************************/
/*! exports provided: DejaMonacoEditorModule, EditorOptions, EditorScrollbarOptions, DejaMonacoEditorComponent, ɵa */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DejaMonacoEditorModule", function() { return DejaMonacoEditorModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditorOptions", function() { return EditorOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditorScrollbarOptions", function() { return EditorScrollbarOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DejaMonacoEditorComponent", function() { return DejaMonacoEditorComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵa", function() { return MonacoEditorService; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _deja_js_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @deja-js/core */ "./dist/deja-js/core/fesm5/deja-js-core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");





/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Monaco Editor Service
 *
 * Service used by Monaco Editor Component to load only once instance of the Monaco Editor Library
 */
var MonacoEditorService = /** @class */ (function () {
    /**
     * Constructor
     */
    function MonacoEditorService() {
    }
    /**
     * Load the Monaco Editor Library
     *
     * @return Resolved promise when the library is loaded
     */
    /**
     * Load the Monaco Editor Library
     *
     * @return {?} Resolved promise when the library is loaded
     */
    MonacoEditorService.prototype.initMonacoLib = /**
     * Load the Monaco Editor Library
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
    MonacoEditorService.prototype.init = /**
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
            /** @type {?} */
            var baseElement = document.getElementsByTagName('base')[0] || (/** @type {?} */ ({}));
            /** @type {?} */
            var baseHref = baseElement.href;
            /** @type {?} */
            var basePath = ((/** @type {?} */ (window))).MONACOEDITOR_BASEPATH || baseHref + "assets/monaco/vs";
            /** @type {?} */
            var onGotAmdLoader = (/**
             * @return {?}
             */
            function () {
                // Load monaco
                ((/** @type {?} */ (window))).require.config({ paths: { 'vs': basePath } });
                ((/** @type {?} */ (window))).require(['vs/editor/editor.main'], (/**
                 * @return {?}
                 */
                function () {
                    resolve();
                }));
            });
            // Load AMD loader if necessary
            if (!((/** @type {?} */ (window))).require && !((/** @type {?} */ (window))).monaco) {
                /** @type {?} */
                var loaderScript = document.createElement('script');
                loaderScript.type = 'text/javascript';
                loaderScript.src = basePath + "/loader.js";
                loaderScript.addEventListener('load', onGotAmdLoader);
                document.body.appendChild(loaderScript);
            }
            else {
                onGotAmdLoader();
            }
        }));
    };
    MonacoEditorService.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Injectable"] }
    ];
    /** @nocollapse */
    MonacoEditorService.ctorParameters = function () { return []; };
    return MonacoEditorService;
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
/**
 * Configuration options for the editor.
 */
var  /**
 * Configuration options for the editor.
 */
EditorOptions = /** @class */ (function () {
    function EditorOptions() {
    }
    return EditorOptions;
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
/**
 * Configuration options for editor scrollbars
 */
var  /**
 * Configuration options for editor scrollbars
 */
EditorScrollbarOptions = /** @class */ (function () {
    function EditorScrollbarOptions() {
    }
    return EditorScrollbarOptions;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Monaco Editor Component for Angular
 *
 * The Monaco Editor is the code editor that powers [VS Code](https://github.com/Microsoft/vscode), a good page describing the code editor's features is [here](https://code.visualstudio.com/docs/editor/editingevolved).
 */
var DejaMonacoEditorComponent = /** @class */ (function () {
    /**
     * Constructor
     */
    function DejaMonacoEditorComponent(monacoEditorService, _control) {
        this.monacoEditorService = monacoEditorService;
        this._control = _control;
        /**
         * Event triggered when value change
         */
        this.valueChange = new _angular_core__WEBPACK_IMPORTED_MODULE_3__["EventEmitter"]();
        /**
         * Event triggered when valueToCompare change
         */
        this.valueToCompareChange = new _angular_core__WEBPACK_IMPORTED_MODULE_3__["EventEmitter"]();
        /**
         * Event triggered when editor is initialized
         */
        this.onInit = new _angular_core__WEBPACK_IMPORTED_MODULE_3__["EventEmitter"]();
        this._value = '';
        this._valueToCompare = '';
        this.onTouchedCallback = (/**
         * @return {?}
         */
        function () { });
        this.onChangeCallback = (/**
         * @param {?} _
         * @return {?}
         */
        function (_) { });
        if (this._control) {
            this._control.valueAccessor = this;
        }
    }
    Object.defineProperty(DejaMonacoEditorComponent.prototype, "language", {
        /**
         * Content language
         */
        set: /**
         * Content language
         * @param {?} val
         * @return {?}
         */
        function (val) {
            if (val) {
                this._language = val;
                if (this._editor) {
                    this.ngAfterViewInit();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaMonacoEditorComponent.prototype, "valueToCompare", {
        // @Input() public language: 'bat' | 'c' | 'cpp' | 'csharp' | 'css' | 'dockerfile' | 'fsharp' | 'go' | 'handlebars' | 'html' | 'ini' | 'jade' | 'javascript' | 'json' | 'less' | 'lua' | 'markdown' | 'objective-c' | 'php' | 'csharp' | 'plaintext' | 'postiats' | 'powershell' | 'python' | 'r' | 'razor' | 'ruby' | 'scss' | 'sql' | 'swift' | 'typescript' | 'vb' | 'xml' | 'yaml';
        /**
         * Value to compare with the Value input
         * Used only when `isDiffEditor` is set to `true`
         */
        set: 
        // @Input() public language: 'bat' | 'c' | 'cpp' | 'csharp' | 'css' | 'dockerfile' | 'fsharp' | 'go' | 'handlebars' | 'html' | 'ini' | 'jade' | 'javascript' | 'json' | 'less' | 'lua' | 'markdown' | 'objective-c' | 'php' | 'csharp' | 'plaintext' | 'postiats' | 'powershell' | 'python' | 'r' | 'razor' | 'ruby' | 'scss' | 'sql' | 'swift' | 'typescript' | 'vb' | 'xml' | 'yaml';
        /**
         * Value to compare with the Value input
         * Used only when `isDiffEditor` is set to `true`
         * @param {?} v
         * @return {?}
         */
        function (v) {
            if (v !== this._valueToCompare) {
                this._valueToCompare = v;
                if (this._valueToCompare === undefined || !this._valueToCompare || !this._editor) {
                    return;
                }
                if (this._editor.getEditorType() !== 'vs.editor.ICodeEditor') {
                    this.getModifiedModel().setValue(this._valueToCompare);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DejaMonacoEditorComponent.prototype, "value", {
        /**
         * Value to show in the editor
         */
        set: /**
         * Value to show in the editor
         * @param {?} v
         * @return {?}
         */
        function (v) {
            if (v !== this._value) {
                this._value = v;
                if (!this._editor) {
                    return;
                }
                if (this._value === undefined || !this._value) {
                    this._value = '';
                }
                this.getOriginalModel().setValue(this._value);
                this.onChangeCallback(this._value);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Load Monaco Editor library
     */
    /**
     * Load Monaco Editor library
     * @return {?}
     */
    DejaMonacoEditorComponent.prototype.ngAfterViewInit = /**
     * Load Monaco Editor library
     * @return {?}
     */
    function () {
        var _this = this;
        this.monacoEditorService.initMonacoLib().then((/**
         * @return {?}
         */
        function () {
            _this.initEditor();
        }));
    };
    /**
     * Lifecycle hook that is called when a directive, pipe or service is destroyed.
     */
    /**
     * Lifecycle hook that is called when a directive, pipe or service is destroyed.
     * @return {?}
     */
    DejaMonacoEditorComponent.prototype.ngOnDestroy = /**
     * Lifecycle hook that is called when a directive, pipe or service is destroyed.
     * @return {?}
     */
    function () {
        this.dispose();
    };
    /**
     * Lifecycle hook that is called when any data-bound property of a directive changes.
     */
    /**
     * Lifecycle hook that is called when any data-bound property of a directive changes.
     * @return {?}
     */
    DejaMonacoEditorComponent.prototype.ngOnChanges = /**
     * Lifecycle hook that is called when any data-bound property of a directive changes.
     * @return {?}
     */
    function () {
        if (this._editor) {
            this._editor.updateOptions(this.getOptions());
        }
    };
    /** From ControlValueAccessor interface */
    /**
     * From ControlValueAccessor interface
     * @param {?} value
     * @return {?}
     */
    DejaMonacoEditorComponent.prototype.writeValue = /**
     * From ControlValueAccessor interface
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.value = value;
    };
    /** From ControlValueAccessor interface */
    /**
     * From ControlValueAccessor interface
     * @param {?} fn
     * @return {?}
     */
    DejaMonacoEditorComponent.prototype.registerOnChange = /**
     * From ControlValueAccessor interface
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onChangeCallback = fn;
    };
    /** From ControlValueAccessor interface */
    /**
     * From ControlValueAccessor interface
     * @param {?} fn
     * @return {?}
     */
    DejaMonacoEditorComponent.prototype.registerOnTouched = /**
     * From ControlValueAccessor interface
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onTouchedCallback = fn;
    };
    /**
     * Destroy the monaco component
     */
    /**
     * Destroy the monaco component
     * @return {?}
     */
    DejaMonacoEditorComponent.prototype.dispose = /**
     * Destroy the monaco component
     * @return {?}
     */
    function () {
        /** @type {?} */
        var myDiv = this.editorContent.nativeElement;
        if (this._editor) {
            // this._editor.dispose();
            while (myDiv.hasChildNodes()) {
                myDiv.removeChild(myDiv.firstChild);
            }
            this._editor = null;
        }
    };
    /**
     * Triggered when windows is resized
     * Resize the component
     */
    /**
     * Triggered when windows is resized
     * Resize the component
     * @return {?}
     */
    DejaMonacoEditorComponent.prototype.onResize = /**
     * Triggered when windows is resized
     * Resize the component
     * @return {?}
     */
    function () {
        // Manually set monaco size because MonacoEditor doesn't work with Flexbox css
        /** @type {?} */
        var myDiv = this.editorContent.nativeElement;
        myDiv.setAttribute('style', "height: 100%; width: 100%;");
        if (this._editor) {
            this._editor.layout();
        }
    };
    /**
     * Init the component
     */
    /**
     * Init the component
     * @private
     * @return {?}
     */
    DejaMonacoEditorComponent.prototype.initEditor = /**
     * Init the component
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var myDiv = this.editorContent.nativeElement;
        /** @type {?} */
        var options = this.getOptions();
        this.dispose();
        if (!this.isDiffEditor) {
            this._editor = this.initSimpleEditor(myDiv, options);
        }
        else {
            this._editor = this.initDiffEditor(myDiv, options);
        }
        this.onResize();
        // Trigger on change event for simple editor
        this.getOriginalModel().onDidChangeContent((/**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var newVal = _this.getOriginalModel().getValue();
            if (_this._value !== newVal) {
                _this.updateValue(newVal);
            }
        }));
        // Trigger on change event for diff editor
        if (this.getModifiedModel()) {
            this.getModifiedModel().onDidChangeContent((/**
             * @return {?}
             */
            function () {
                /** @type {?} */
                var newVal = _this.getModifiedModel().getValue();
                if (_this._valueToCompare !== newVal) {
                    _this.updateValueToCompare(newVal);
                }
            }));
        }
        this.onInit.next(this._editor);
    };
    /**
     * Create a simple editor text
     * @param div
     * @param options
     * @return instance of monaco
     */
    /**
     * Create a simple editor text
     * @private
     * @param {?} div
     * @param {?} options
     * @return {?} instance of monaco
     */
    DejaMonacoEditorComponent.prototype.initSimpleEditor = /**
     * Create a simple editor text
     * @private
     * @param {?} div
     * @param {?} options
     * @return {?} instance of monaco
     */
    function (div, options) {
        return monaco.editor.create(div, options);
    };
    /**
     * Create a diff editor to compare two string (_value and _valueToCompare)
     * @param div
     * @return instance of monaco
     */
    /**
     * Create a diff editor to compare two string (_value and _valueToCompare)
     * @private
     * @param {?} div
     * @param {?} options
     * @return {?} instance of monaco
     */
    DejaMonacoEditorComponent.prototype.initDiffEditor = /**
     * Create a diff editor to compare two string (_value and _valueToCompare)
     * @private
     * @param {?} div
     * @param {?} options
     * @return {?} instance of monaco
     */
    function (div, options) {
        /** @type {?} */
        var originalModel = monaco.editor.createModel(this._value, this.language);
        /** @type {?} */
        var modifiedModel = monaco.editor.createModel(this._valueToCompare, this.language);
        /** @type {?} */
        var diffEditor = monaco.editor.createDiffEditor(div, options);
        diffEditor.setModel({
            modified: modifiedModel,
            original: originalModel,
        });
        return diffEditor;
    };
    /**
     * @private
     * @return {?}
     */
    DejaMonacoEditorComponent.prototype.getOptions = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var options = new EditorOptions();
        options.experimentalScreenReader = this.experimentalScreenReader;
        options.ariaLabel = this.ariaLabel;
        options.rulers = this.rulers;
        options.wordSeparators = this.wordSeparators;
        options.selectionClipboard = this.selectionClipboard;
        options.lineNumbers = this.lineNumbers;
        options.selectOnLineNumbers = this.selectOnLineNumbers;
        options.lineNumbersMinChars = this.lineNumbersMinChars;
        options.glyphMargin = this.glyphMargin;
        options.lineDecorationsWidth = this.lineDecorationsWidth;
        options.revealHorizontalRightPadding = this.revealHorizontalRightPadding;
        options.roundedSelection = this.roundedSelection;
        options.theme = this.theme;
        options.readOnly = this.readOnly;
        options.scrollbar = this.scrollbar;
        options.overviewRulerLanes = this.overviewRulerLanes;
        options.cursorBlinking = this.cursorBlinking;
        options.mouseWheelZoom = this.mouseWheelZoom;
        options.cursorStyle = this.cursorStyle;
        options.mouseWheelZoom = this.mouseWheelZoom;
        options.fontLigatures = this.fontLigatures;
        options.disableTranslate3d = this.disableTranslate3d;
        options.hideCursorInOverviewRuler = this.hideCursorInOverviewRuler;
        options.scrollBeyondLastLine = this.scrollBeyondLastLine;
        options.automaticLayout = this.automaticLayout;
        options.wrappingColumn = this.wrappingColumn;
        options.wordWrap = this.wordWrap;
        options.wrappingIndent = this.wrappingIndent;
        options.wordWrapBreakBeforeCharacters = this.wordWrapBreakBeforeCharacters;
        options.wordWrapBreakAfterCharacters = this.wordWrapBreakAfterCharacters;
        options.wordWrapBreakObtrusiveCharacters = this.wordWrapBreakObtrusiveCharacters;
        options.stopRenderingLineAfter = this.stopRenderingLineAfter;
        options.hover = this.hover;
        options.contextmenu = this.contextmenu;
        options.mouseWheelScrollSensitivity = this.mouseWheelScrollSensitivity;
        options.quickSuggestions = this.quickSuggestions;
        options.quickSuggestionsDelay = this.quickSuggestionsDelay;
        options.parameterHints = this.parameterHints;
        options.iconsInSuggestions = this.iconsInSuggestions;
        options.autoClosingBrackets = this.autoClosingBrackets;
        options.formatOnType = this.formatOnType;
        options.suggestOnTriggerCharacters = this.suggestOnTriggerCharacters;
        options.acceptSuggestionOnEnter = this.acceptSuggestionOnEnter;
        options.snippetSuggestions = this.snippetSuggestions;
        options.tabCompletion = this.tabCompletion;
        options.wordBasedSuggestions = this.wordBasedSuggestions;
        options.selectionHighlight = this.selectionHighlight;
        options.codeLens = this.codeLens;
        options.folding = this.folding;
        options.renderWhitespace = this.renderWhitespace;
        options.renderControlCharacters = this.renderControlCharacters;
        options.renderIndentGuides = this.renderIndentGuides;
        options.renderLineHighlight = this.renderLineHighlight;
        options.useTabStops = this.useTabStops;
        options.fontFamily = this.fontFamily;
        options.fontWeight = this.fontWeight;
        options.fontSize = this.fontSize;
        options.lineHeight = this.lineHeight;
        options.formatOnPaste = this.formatOnPaste;
        options.value = this._value;
        options.language = this._language;
        Object.keys(options).forEach((/**
         * @param {?} key
         * @return {?}
         */
        function (key) { return ((/** @type {?} */ (options)))[key] === undefined && delete ((/** @type {?} */ (options)))[key]; })); // Remove all undefined properties
        return options;
    };
    /**
     * UpdateValue
     *
     * @param value
     */
    /**
     * UpdateValue
     *
     * @private
     * @param {?} value
     * @return {?}
     */
    DejaMonacoEditorComponent.prototype.updateValue = /**
     * UpdateValue
     *
     * @private
     * @param {?} value
     * @return {?}
     */
    function (value) {
        // this.value = value;
        this._value = value;
        this.valueChange.emit(value);
        this.onChangeCallback(value);
    };
    /**
     * UpdateValue
     *
     * @param value
     */
    /**
     * UpdateValue
     *
     * @private
     * @param {?} value
     * @return {?}
     */
    DejaMonacoEditorComponent.prototype.updateValueToCompare = /**
     * UpdateValue
     *
     * @private
     * @param {?} value
     * @return {?}
     */
    function (value) {
        // this.valueToCompare = value;
        this._valueToCompare = value;
        this.valueToCompareChange.emit(value);
    };
    /**
     * @private
     * @return {?}
     */
    DejaMonacoEditorComponent.prototype.getOriginalModel = /**
     * @private
     * @return {?}
     */
    function () {
        if (this._editor) {
            /** @type {?} */
            var model = this._editor.getModel();
            return model.original ? model.original : model;
        }
    };
    /**
     * @private
     * @return {?}
     */
    DejaMonacoEditorComponent.prototype.getModifiedModel = /**
     * @private
     * @return {?}
     */
    function () {
        if (this._editor) {
            /** @type {?} */
            var model = this._editor.getModel();
            return model.modified ? model.modified : null;
        }
    };
    DejaMonacoEditorComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"], args: [{
                    encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ViewEncapsulation"].None,
                    selector: 'deja-monaco-editor',
                    template: "<div #editor resize-listener (sizeChanged)=\"onResize()\" class='monaco-editor'></div>",
                    styles: ["deja-monaco-editor{width:100%;display:flex;flex:1 1 auto}deja-monaco-editor .monaco-editor{flex:1 1 auto}"]
                }] }
    ];
    /** @nocollapse */
    DejaMonacoEditorComponent.ctorParameters = function () { return [
        { type: MonacoEditorService },
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgControl"], decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Self"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Optional"] }] }
    ]; };
    DejaMonacoEditorComponent.propDecorators = {
        experimentalScreenReader: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
        ariaLabel: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
        rulers: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
        wordSeparators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
        selectionClipboard: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
        lineNumbers: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
        selectOnLineNumbers: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
        lineNumbersMinChars: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
        glyphMargin: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
        lineDecorationsWidth: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
        revealHorizontalRightPadding: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
        roundedSelection: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
        theme: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
        readOnly: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
        scrollbar: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
        fixedOverflowWidgets: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
        overviewRulerLanes: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
        cursorBlinking: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
        mouseWheelZoom: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
        cursorStyle: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
        fontLigatures: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
        disableTranslate3d: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
        disableMonospaceOptimizations: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
        hideCursorInOverviewRuler: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
        scrollBeyondLastLine: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
        automaticLayout: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
        wrappingColumn: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
        wordWrap: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
        wrappingIndent: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
        wordWrapBreakBeforeCharacters: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
        wordWrapBreakAfterCharacters: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
        wordWrapBreakObtrusiveCharacters: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
        stopRenderingLineAfter: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
        hover: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
        contextmenu: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
        mouseWheelScrollSensitivity: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
        quickSuggestions: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
        quickSuggestionsDelay: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
        parameterHints: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
        iconsInSuggestions: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
        autoClosingBrackets: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
        formatOnType: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
        formatOnPaste: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
        suggestOnTriggerCharacters: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
        acceptSuggestionOnEnter: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
        acceptSuggestionOnCommitCharacter: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
        snippetSuggestions: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
        emptySelectionClipboard: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
        tabCompletion: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
        wordBasedSuggestions: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
        suggestFontSize: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
        suggestLineHeight: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
        selectionHighlight: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
        codeLens: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
        folding: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
        renderWhitespace: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
        renderControlCharacters: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
        renderIndentGuides: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
        renderLineHighlight: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
        useTabStops: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
        fontFamily: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
        fontWeight: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
        fontSize: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
        lineHeight: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
        isDiffEditor: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
        language: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
        valueToCompare: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
        value: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"] }],
        valueChange: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Output"] }],
        valueToCompareChange: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Output"] }],
        onInit: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Output"] }],
        editorContent: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ViewChild"], args: ['editor',] }],
        onResize: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["HostListener"], args: ['window:resize', [],] }]
    };
    return DejaMonacoEditorComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var DejaMonacoEditorModule = /** @class */ (function () {
    function DejaMonacoEditorModule() {
    }
    DejaMonacoEditorModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["NgModule"], args: [{
                    declarations: [DejaMonacoEditorComponent],
                    exports: [DejaMonacoEditorComponent],
                    imports: [
                        _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
                        _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                        _deja_js_core__WEBPACK_IMPORTED_MODULE_1__["ResizeListenerModule"]
                    ],
                    providers: [MonacoEditorService],
                },] }
    ];
    return DejaMonacoEditorModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */



//# sourceMappingURL=deja-js-component-monaco-editor.js.map

/***/ }),

/***/ "./src/app/monaco-editor/monaco-editor-demo.component.html":
/*!*****************************************************************!*\
  !*** ./src/app/monaco-editor/monaco-editor-demo.component.html ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-tab-group [selectedIndex]=\"tabIndex\" (selectedTabChange)=\"tabIndex = $event.index\">>\n    <!--<mat-tab label=\"OVERVIEW\">-->\n    <!--<mat-card class=\"demo-card demo-basic\">-->\n    <!--TODO-->\n    <!--</mat-card>-->\n    <!--</mat-tab>-->\n    <mat-tab label=\"API REFERENCE\"></mat-tab>\n    <mat-tab label=\"EXAMPLES\"></mat-tab>\n    <mat-tab label=\"AUTO RESIZE\"></mat-tab>\n</mat-tab-group>\n\n<mat-card class=\"demo-card demo-basic\" *ngIf=\"tabIndex === 0\">\n    <deja-markdown [url]=\"'https://raw.githubusercontent.com/DSI-HUG/dejajs-components/dev/src/component/monaco-editor/readme.md'\"></deja-markdown>\n</mat-card>\n\n<div *ngIf=\"tabIndex === 1\">\n      <mat-card class=\"demo-card demo-basic\">\n        <mat-toolbar color=\"primary\">\n            Modification d'un fichier XML\n            <span flex></span>\n            <mat-checkbox [(ngModel)]=\"readOnly\">Read only</mat-checkbox>\n        </mat-toolbar>\n        <mat-card-content>\n            <div class=\"viewer\">\n                <deja-monaco-editor [(value)]=\"xmlContent\" language=\"xml\" [readOnly]=\"readOnly\" [folding]=\"true\" theme=\"vs\" (valueChange)=\"onValueChange()\"></deja-monaco-editor>\n            </div>\n        </mat-card-content>\n    </mat-card>\n\n    <mat-card class=\"demo-card demo-basic\">\n        <mat-toolbar color=\"primary\">Comparaison d'un fichier XML</mat-toolbar>\n        <mat-card-content>\n            <div class=\"viewer\">\n                <deja-monaco-editor [(value)]=\"xmlContent\" [(valueToCompare)]=\"xmlContentToCompare\" [isDiffEditor]=\"true\" [folding]=\"true\" language=\"xml\" (valueToCompareChange)=\"onValueToCompareChange()\"></deja-monaco-editor>\n            </div>\n        </mat-card-content>\n    </mat-card>\n\n    <mat-card class=\"demo-card demo-basic\">\n        <mat-toolbar color=\"primary\">Modification d'un fichier JSON</mat-toolbar>\n        <mat-card-content>\n            <div class=\"viewer\">\n                <deja-monaco-editor [(value)]=\"jsonContent\" [folding]=\"true\" language=\"json\"></deja-monaco-editor>\n            </div>\n        </mat-card-content>\n    </mat-card>\n\n    <mat-card class=\"demo-card demo-basic\">\n        <mat-toolbar color=\"primary\">Comparaison d'un fichier JSON</mat-toolbar>\n        <mat-card-content>\n            <div class=\"viewer\">\n                <deja-monaco-editor [(value)]=\"jsonContent\" [valueToCompare]=\"jsonContentToCompare\" [isDiffEditor]=\"true\" [folding]=\"true\" language=\"json\"></deja-monaco-editor>\n            </div>\n        </mat-card-content>\n    </mat-card>  \n</div>\n\n<div *ngIf=\"tabIndex === 2\">\n     <mat-card class=\"demo-card demo-basic\">\n        <mat-toolbar color=\"primary\">\n            Resize auto\n        </mat-toolbar>\n        <mat-card-content style=\"height: 500px;\">\n            <deja-splitter direction=\"vertical\">\n                <split-area [size]=\"75\">\n                    <deja-splitter direction=\"horizontal\">\n                        <split-area [size]=\"75\">\n                            <deja-monaco-editor style=\"height: 100%;\" [(value)]=\"xmlContent\" language=\"xml\" [readOnly]=\"readOnly\" [folding]=\"true\" theme=\"vs\" (valueChange)=\"onValueChange()\"></deja-monaco-editor>\n                        </split-area>\n                        <split-area>\n                            <p>Sed ut perspiciatis unde omnis iste natus erro...</p>\n                        </split-area>\n                    </deja-splitter>\n                </split-area>\n                <split-area>\n                    <p>Sed ut perspiciatis unde omnis iste natus erro...</p>\n                </split-area>\n            </deja-splitter>\n        </mat-card-content>\n    </mat-card> \n\n     <mat-card class=\"demo-card demo-basic\">\n        <mat-toolbar color=\"primary\">\n            Modification du text et du language\n        </mat-toolbar>\n        <mat-card-content>\n            <mat-form-field>\n                <mat-select placeholder=\"Language\" [ngModel]=\"dynamicLanguage\" (ngModelChange)=\"updateLanguage($event)\">\n                    <mat-option value=\"xml\">XML</mat-option>\n                    <mat-option value=\"json\">JSON</mat-option>\n                </mat-select>\n            </mat-form-field>\n\n            <div class=\"viewer\">\n                <deja-monaco-editor [(value)]=\"dynamicContent\" [folding]=\"true\" [language]=\"dynamicLanguage\"></deja-monaco-editor>\n            </div>\n        </mat-card-content>\n    </mat-card> \n</div>"

/***/ }),

/***/ "./src/app/monaco-editor/monaco-editor-demo.component.scss":
/*!*****************************************************************!*\
  !*** ./src/app/monaco-editor/monaco-editor-demo.component.scss ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host .viewer {\n  height: 500px;\n  display: flex;\n  flex: 1 1 100%; }\n  :host .viewer deja-monaco-editor {\n    display: flex;\n    flex: 1 1 100%; }\n  :host span[flex] {\n  flex: 1 1 auto; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3RyYXZpcy9idWlsZC9EU0ktSFVHL2RlamFqcy1jb21wb25lbnRzL3NyYy9hcHAvbW9uYWNvLWVkaXRvci9tb25hY28tZWRpdG9yLWRlbW8uY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFFUSxhQUFhO0VBQ2IsYUFBYTtFQUNiLGNBQWMsRUFBQTtFQUp0QjtJQU9ZLGFBQWE7SUFDYixjQUFjLEVBQUE7RUFSMUI7RUFhWSxjQUFjLEVBQUEiLCJmaWxlIjoic3JjL2FwcC9tb25hY28tZWRpdG9yL21vbmFjby1lZGl0b3ItZGVtby5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIjpob3N0IHtcbiAgICAudmlld2VyIHtcbiAgICAgICAgaGVpZ2h0OiA1MDBweDtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgZmxleDogMSAxIDEwMCU7XG5cbiAgICAgICAgZGVqYS1tb25hY28tZWRpdG9yIHtcbiAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgICBmbGV4OiAxIDEgMTAwJTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNwYW5bZmxleF0ge1xuICAgICAgICAgICAgZmxleDogMSAxIGF1dG87XG4gICAgfVxufSJdfQ== */"

/***/ }),

/***/ "./src/app/monaco-editor/monaco-editor-demo.component.ts":
/*!***************************************************************!*\
  !*** ./src/app/monaco-editor/monaco-editor-demo.component.ts ***!
  \***************************************************************/
/*! exports provided: DejaMonacoEditorDemoComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DejaMonacoEditorDemoComponent", function() { return DejaMonacoEditorDemoComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _monaco_editor_demo_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./monaco-editor-demo.service */ "./src/app/monaco-editor/monaco-editor-demo.service.ts");
/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */



var DejaMonacoEditorDemoComponent = /** @class */ (function () {
    function DejaMonacoEditorDemoComponent(fileService) {
        this.fileService = fileService;
        this.tabIndex = 1;
    }
    DejaMonacoEditorDemoComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.fileService.getFile$('xmlFile.xml').subscribe(function (val) { return _this.xmlContent = val; });
        this.fileService.getFile$('xmlFileToCompare.xml').subscribe(function (val) { return _this.xmlContentToCompare = val; });
        this.fileService.getFile$('jsonFile.json').subscribe(function (val) { return _this.jsonContent = val; });
        this.fileService.getFile$('jsonFileToCompare.json').subscribe(function (val) { return _this.jsonContentToCompare = val; });
        this.updateLanguage('xml');
    };
    DejaMonacoEditorDemoComponent.prototype.onValueChange = function () {
        // console.log('Value changed');
    };
    DejaMonacoEditorDemoComponent.prototype.onValueToCompareChange = function () {
        // console.log('ValueToCompare changed');
    };
    DejaMonacoEditorDemoComponent.prototype.updateLanguage = function (lang) {
        switch (lang) {
            case 'json':
                this.dynamicLanguage = lang;
                this.dynamicContent = this.jsonContent;
                break;
            default:
                this.dynamicLanguage = 'xml';
                this.dynamicContent = this.xmlContent;
                break;
        }
    };
    DejaMonacoEditorDemoComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            providers: [_monaco_editor_demo_service__WEBPACK_IMPORTED_MODULE_2__["MonacoEditorDemoService"]],
            selector: 'deja-monaco-editor-demo',
            template: __webpack_require__(/*! ./monaco-editor-demo.component.html */ "./src/app/monaco-editor/monaco-editor-demo.component.html"),
            styles: [__webpack_require__(/*! ./monaco-editor-demo.component.scss */ "./src/app/monaco-editor/monaco-editor-demo.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_monaco_editor_demo_service__WEBPACK_IMPORTED_MODULE_2__["MonacoEditorDemoService"]])
    ], DejaMonacoEditorDemoComponent);
    return DejaMonacoEditorDemoComponent;
}());



/***/ }),

/***/ "./src/app/monaco-editor/monaco-editor-demo.module.ts":
/*!************************************************************!*\
  !*** ./src/app/monaco-editor/monaco-editor-demo.module.ts ***!
  \************************************************************/
/*! exports provided: MonacoEditorDemoModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MonacoEditorDemoModule", function() { return MonacoEditorDemoModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/card */ "./node_modules/@angular/material/esm5/card.es5.js");
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/select */ "./node_modules/@angular/material/esm5/select.es5.js");
/* harmony import */ var _angular_material_tabs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/tabs */ "./node_modules/@angular/material/esm5/tabs.es5.js");
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/toolbar */ "./node_modules/@angular/material/esm5/toolbar.es5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _deja_js_component_monaco_editor__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @deja-js/component/monaco-editor */ "./dist/deja-js/component/fesm5/deja-js-component-monaco-editor.js");
/* harmony import */ var _deja_js_component_splitter__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @deja-js/component/splitter */ "./dist/deja-js/component/fesm5/deja-js-component-splitter.js");
/* harmony import */ var _component_markdown_index__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../component/markdown/index */ "./src/component/markdown/index.ts");
/* harmony import */ var _monaco_editor_demo_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./monaco-editor-demo.component */ "./src/app/monaco-editor/monaco-editor-demo.component.ts");
/* harmony import */ var _monaco_editor_demo_service__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./monaco-editor-demo.service */ "./src/app/monaco-editor/monaco-editor-demo.service.ts");
/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */















var routes = [
    { path: '', component: _monaco_editor_demo_component__WEBPACK_IMPORTED_MODULE_13__["DejaMonacoEditorDemoComponent"] },
];
var MonacoEditorDemoModule = /** @class */ (function () {
    function MonacoEditorDemoModule() {
    }
    MonacoEditorDemoModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            imports: [
                _deja_js_component_monaco_editor__WEBPACK_IMPORTED_MODULE_10__["DejaMonacoEditorModule"],
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _angular_material_card__WEBPACK_IMPORTED_MODULE_5__["MatCardModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatCheckboxModule"],
                _angular_material_select__WEBPACK_IMPORTED_MODULE_6__["MatSelectModule"],
                _angular_material_tabs__WEBPACK_IMPORTED_MODULE_7__["MatTabsModule"],
                _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_8__["MatToolbarModule"],
                _deja_js_component_splitter__WEBPACK_IMPORTED_MODULE_11__["DejaSplitterModule"],
                _component_markdown_index__WEBPACK_IMPORTED_MODULE_12__["DejaMarkdownModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_9__["RouterModule"].forChild(routes),
            ],
            declarations: [_monaco_editor_demo_component__WEBPACK_IMPORTED_MODULE_13__["DejaMonacoEditorDemoComponent"]],
            providers: [
                _monaco_editor_demo_service__WEBPACK_IMPORTED_MODULE_14__["MonacoEditorDemoService"]
            ],
        })
    ], MonacoEditorDemoModule);
    return MonacoEditorDemoModule;
}());



/***/ }),

/***/ "./src/app/monaco-editor/monaco-editor-demo.service.ts":
/*!*************************************************************!*\
  !*** ./src/app/monaco-editor/monaco-editor-demo.service.ts ***!
  \*************************************************************/
/*! exports provided: MonacoEditorDemoService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MonacoEditorDemoService", function() { return MonacoEditorDemoService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */




var MonacoEditorDemoService = /** @class */ (function () {
    function MonacoEditorDemoService(httpClient) {
        this.httpClient = httpClient;
    }
    MonacoEditorDemoService.prototype.getFile$ = function (filename) {
        return this.httpClient.get("assets/datas/monaco/" + filename, { observe: 'body', responseType: 'text' }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (response) { return response; }));
    };
    MonacoEditorDemoService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], MonacoEditorDemoService);
    return MonacoEditorDemoService;
}());



/***/ })

}]);
//# sourceMappingURL=monaco-editor-monaco-editor-demo-module.js.map