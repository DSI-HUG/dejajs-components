/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/takeWhile';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Subject } from 'rxjs/Subject';
import { MonacoEditorService } from './monaco-editor.service';
import { EditorOptions } from './options/editor-options.model';
import { EditorScrollbarOptions } from './options/editor-scrollbar-options.model';

/**
 * Monaco Editor Component for Angular
 *
 * The Monaco Editor is the code editor that powers [VS Code](https://github.com/Microsoft/vscode), a good page describing the code editor's features is [here](https://code.visualstudio.com/docs/editor/editingevolved).
 */
@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'deja-monaco-editor',
    styleUrls: [
        './monaco-editor.component.scss',
    ],
    template: `<div #editor class='monaco-editor'></div>`,
})
export class DejaMonacoEditorComponent implements OnDestroy, OnChanges, AfterViewInit {
    /**
     * Enable experimental screen reader support.
     * Defaults to `true`.
     */
    @Input() public experimentalScreenReader?: boolean;
    /**
     * The aria label for the editor's textarea (when it is focused).
     */
    @Input() public ariaLabel?: string;
    /**
     * Render vertical lines at the specified columns.
     * Defaults to empty array.
     */
    @Input() public rulers?: number[];
    /**
     * A string containing the word separators used when doing word navigation.
     * Defaults to `~!@#$%^&*()-=+[{]}\\|;:\'",.<>/?
     */
    @Input() public wordSeparators?: string;
    /**
     * Enable Linux primary clipboard.
     * Defaults to `true`.
     */
    @Input() public selectionClipboard?: boolean;
    /**
     * Control the rendering of line numbers.
     * If it is a function, it will be invoked when rendering a line number and the return value will be rendered.
     * Otherwise, if it is a truey, line numbers will be rendered normally (equivalent of using an identity function).
     * Otherwise, line numbers will not be rendered.
     * Defaults to `true`.
     */
    @Input() public lineNumbers?: 'on' | 'off' | 'relative' | ((lineNumber: number) => string);
    /**
     * Should the corresponding line be selected when clicking on the line number?
     * Defaults to `true`.
     */
    @Input() public selectOnLineNumbers?: boolean;
    /**
     * Control the width of line numbers, by reserving horizontal space for rendering at least an amount of digits.
     * Defaults to 5.
     */
    @Input() public lineNumbersMinChars?: number;
    /**
     * Enable the rendering of the glyph margin.
     * Defaults to true in vscode and to false in monaco-editor.
     */
    @Input() public glyphMargin?: boolean;
    /**
     * The width reserved for line decorations (in px).
     * Line decorations are placed between line numbers and the editor content.
     * You can pass in a string in the format floating point followed by "ch". e.g. 1.3ch.
     * Defaults to 10.
     */
    @Input() public lineDecorationsWidth?: number;
    /**
     * When revealing the cursor, a virtual padding (px) is added to the cursor, turning it into a rectangle.
     * This virtual padding ensures that the cursor gets revealed before hitting the edge of the viewport.
     * Defaults to 30 (px).
     */
    @Input() public revealHorizontalRightPadding?: number;
    /**
     * Render the editor selection with rounded borders.
     * Defaults to true.
     */
    @Input() public roundedSelection?: boolean;
    /**
     * Theme to be used for rendering.
     * The current out-of-the-box available themes are: 'vs' (default), 'vs-dark', 'hc-black'.
     * You can create custom themes via `monaco.editor.defineTheme`.
     */
    @Input() public theme?: string;
    /**
     * Should the editor be read only.
     * Defaults to false.
     */
    @Input() public readOnly?: boolean;
    /**
     * Control the behavior and rendering of the scrollbars.
     */
    @Input() public scrollbar?: EditorScrollbarOptions;
    /**
     * Display overflow widgets as `fixed`.
     * Defaults to `false`.
     */
    @Input() public fixedOverflowWidgets?: boolean;
    /**
     * The number of vertical lanes the overview ruler should render.
     * Defaults to 2.
     */
    @Input() public overviewRulerLanes?: number;
    /**
     * Control the cursor animation style, possible values are 'blink', 'smooth', 'phase', 'expand' and 'solid'.
     * Defaults to 'blink'.
     */
    @Input() public cursorBlinking?: string;
    /**
     * Zoom the font in the editor when using the mouse wheel in combination with holding Ctrl.
     * Defaults to false.
     */
    @Input() public mouseWheelZoom?: boolean;
    /**
     * Control the cursor style, either 'block' or 'line'.
     * Defaults to 'line'.
     */
    @Input() public cursorStyle?: string;
    /**
     * Enable font ligatures.
     * Defaults to false.
     */
    @Input() public fontLigatures?: boolean;
    /**
     * Disable the use of `translate3d`.
     * Defaults to false.
     */
    @Input() public disableTranslate3d?: boolean;
    /**
     * Disable the optimizations for monospace fonts.
     * Defaults to false.
     */
    @Input() public disableMonospaceOptimizations?: boolean;
    /**
     * Should the cursor be hidden in the overview ruler.
     * Defaults to false.
     */
    @Input() public hideCursorInOverviewRuler?: boolean;
    /**
     * Enable that scrolling can go one screen size after the last line.
     * Defaults to true.
     */
    @Input() public scrollBeyondLastLine?: boolean;
    /**
     * Enable that the editor will install an interval to check if its container dom node size has changed.
     * Enabling this might have a severe performance impact.
     * Defaults to false.
     */
    @Input() public automaticLayout?: boolean;
    /**
     * Control the wrapping strategy of the editor.
     * Using -1 means no wrapping whatsoever.
     * Using 0 means viewport width wrapping (ajusts with the resizing of the editor).
     * Using a positive number means wrapping after a fixed number of characters.
     * Defaults to 300.
     */
    @Input() public wrappingColumn?: number;
    /**
     * Control the alternate style of viewport wrapping.
     * When set to true viewport wrapping is used only when the window width is less than the number of columns specified in the wrappingColumn property. Has no effect if wrappingColumn is not a positive number.
     * Defaults to false.
     */
    @Input() public wordWrap?: boolean;
    /**
     * Control indentation of wrapped lines. Can be: 'none', 'same' or 'indent'.
     * Defaults to 'same' in vscode and to 'none' in monaco-editor.
     */
    @Input() public wrappingIndent?: string;
    /**
     * Configure word wrapping characters. A break will be introduced before these characters.
     * Defaults to '{([+'.
     */
    @Input() public wordWrapBreakBeforeCharacters?: string;
    /**
     * Configure word wrapping characters. A break will be introduced after these characters.
     * Defaults to ' \t})]?|&,;'.
     */
    @Input() public wordWrapBreakAfterCharacters?: string;
    /**
     * Configure word wrapping characters. A break will be introduced after these characters only if no `wordWrapBreakBeforeCharacters` or `wordWrapBreakAfterCharacters` were found.
     * Defaults to '.'.
     */
    @Input() public wordWrapBreakObtrusiveCharacters?: string;
    /**
     * Performance guard: Stop rendering a line after x characters.
     * Defaults to 10000 if wrappingColumn is -1. Defaults to -1 if wrappingColumn is >= 0.
     * Use -1 to never stop rendering
     */
    @Input() public stopRenderingLineAfter?: number;
    /**
     * Enable hover.
     * Defaults to true.
     */
    @Input() public hover?: boolean;
    /**
     * Enable custom contextmenu.
     * Defaults to true.
     */
    @Input() public contextmenu?: boolean;
    /**
     * A multiplier to be used on the `deltaX` and `deltaY` of mouse wheel scroll events.
     * Defaults to 1.
     */
    @Input() public mouseWheelScrollSensitivity?: number;
    /**
     * Enable quick suggestions (shadow suggestions)
     * Defaults to true.
     */
    @Input() public quickSuggestions?: boolean;
    /**
     * Quick suggestions show delay (in ms)
     * Defaults to 500 (ms)
     */
    @Input() public quickSuggestionsDelay?: number;
    /**
     * Enables parameter hints
     */
    @Input() public parameterHints?: boolean;
    /**
     * Render icons in suggestions box.
     * Defaults to true.
     */
    @Input() public iconsInSuggestions?: boolean;
    /**
     * Enable auto closing brackets.
     * Defaults to true.
     */
    @Input() public autoClosingBrackets?: boolean;
    /**
     * Enable format on type.
     * Defaults to false.
     */
    @Input() public formatOnType?: boolean;
    /**
     * Enable format on paste.
     * Defaults to false.
     */
    @Input() public formatOnPaste?: boolean;
    /**
     * Enable the suggestion box to pop-up on trigger characters.
     * Defaults to true.
     */
    @Input() public suggestOnTriggerCharacters?: boolean;
    /**
     * Accept suggestions on ENTER.
     * Defaults to true.
     */
    @Input() public acceptSuggestionOnEnter?: boolean;
    /**
     * Accept suggestions on provider defined characters.
     * Defaults to true.
     */
    @Input() public acceptSuggestionOnCommitCharacter?: boolean;
    /**
     * Enable snippet suggestions. Default to 'true'.
     */
    @Input() public snippetSuggestions?: 'top' | 'bottom' | 'inline' | 'none';
    /**
     * Copying without a selection copies the current line.
     */
    @Input() public emptySelectionClipboard?: boolean;
    /**
     * Enable tab completion. Defaults to 'false'
     */
    @Input() public tabCompletion?: boolean;
    /**
     * Enable word based suggestions. Defaults to 'true'
     */
    @Input() public wordBasedSuggestions?: boolean;
    /**
     * The font size for the suggest widget.
     * Defaults to the editor font size.
     */
    @Input() public suggestFontSize?: number;
    /**
     * The line height for the suggest widget.
     * Defaults to the editor line height.
     */
    @Input() public suggestLineHeight?: number;
    /**
     * Enable selection highlight.
     * Defaults to true.
     */
    @Input() public selectionHighlight?: boolean;
    /**
     * Show code lens
     * Defaults to true.
     */
    @Input() public codeLens?: boolean;
    /**
     * Enable code folding
     * Defaults to true in vscode and to false in monaco-editor.
     */
    @Input() public folding?: boolean;
    /**
     * Enable rendering of whitespace.
     * Defaults to none.
     */
    @Input() public renderWhitespace?: 'none' | 'boundary' | 'all';
    /**
     * Enable rendering of control characters.
     * Defaults to false.
     */
    @Input() public renderControlCharacters?: boolean;
    /**
     * Enable rendering of indent guides.
     * Defaults to false.
     */
    @Input() public renderIndentGuides?: boolean;
    /**
     * Enable rendering of current line highlight.
     * Defaults to all.
     */
    @Input() public renderLineHighlight?: 'none' | 'gutter' | 'line' | 'all';
    /**
     * Inserting and deleting whitespace follows tab stops.
     */
    @Input() public useTabStops?: boolean;
    /**
     * The font family
     */
    @Input() public fontFamily?: string;
    /**
     * The font weight
     */
    @Input() public fontWeight?: 'normal' | 'bold' | 'bolder' | 'lighter' | 'initial' | 'inherit' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
    /**
     * The font size
     */
    @Input() public fontSize?: number;
    /**
     * The line height
     */
    @Input() public lineHeight?: number;
    /**
     * Enable the diff editor mode
     */
    @Input() public set isDiffEditor(value: boolean) {
        this._isDiffEditor$.next(value);
    }

    /**
     * Content language
     */
    @Input() public set language(value: 'bat' | 'c' | 'cpp' | 'csharp' | 'css' | 'dockerfile' | 'fsharp' | 'go' | 'handlebars' | 'html' | 'ini' | 'jade' | 'javascript' | 'json' | 'less' | 'lua' | 'markdown' | 'objective-c' | 'php' | 'csharp' | 'plaintext' | 'postiats' | 'powershell' | 'python' | 'r' | 'razor' | 'ruby' | 'scss' | 'sql' | 'swift' | 'typescript' | 'vb' | 'xml' | 'yaml') {
        this._language$.next(value);
    }

    /**
     * Value to compare with the Value input
     * Used only when `isDiffEditor` is set to `true`
     */
    @Input() set valueToCompare(v: string) {
        this._valueToCompare$.next(v);
    }

    /**
     * Value to show in the editor
     */
    @Input() set value(v: string) {
        this._value$.next(v);
    }

    /**
     * Event triggered when the value is loaded
     */
    @Output() public loaded = new EventEmitter<string>();

    /**
     * Event triggered when value change
     */
    @Output() public valueChange = new EventEmitter<string>();

    /**
     * Event triggered when valueToCompare change
     */
    @Output() public valueToCompareChange = new EventEmitter();

    public originalModel$ = new ReplaySubject<any>(1);
    public modifiedModel$ = new ReplaySubject<any>(1);

    public originalModelSub: any;
    public modifiedModelSub: any;

    @ViewChild('editor')
    public set editorContent(value: ElementRef) {
        if (value) {
            this.editorElement$.next(value.nativeElement);
        }
    }

    private editorElement$ = new Subject<HTMLDivElement>();
    private editor$ = new ReplaySubject<any>(1);
    private isAlive = true;
    private _value$ = new BehaviorSubject<string>('');
    private _valueToCompare$ = new BehaviorSubject<string>('');
    private _language$ = new Subject<string>();
    private _isDiffEditor$ = new BehaviorSubject<boolean>(false);
    private options$ = new Subject<EditorOptions>();
    private contentInitialized$ = new Subject();

    /**
     * Constructor
     */
    constructor(monacoEditorService: MonacoEditorService) {
        const setElementSize = (element: HTMLDivElement) => {
            element.setAttribute('style', `height: ${element.parentElement.offsetHeight}px; width:100%;`);
        };

        const value$ = Observable.from(this._value$).distinctUntilChanged();
        const original$ = Observable.combineLatest(this.originalModel$, value$);

        const valueToCompare$ = Observable.from(this._valueToCompare$).distinctUntilChanged();
        const modified$ = Observable.combineLatest(this.modifiedModel$, valueToCompare$);

        original$
            .takeWhile(() => this.isAlive)
            .subscribe(([model, value]) => {
                if (this.originalModelSub) {
                    this.originalModelSub.dispose();
                    delete this.originalModelSub;
                }

                let first = true;
                this.originalModelSub = model.onDidChangeContent(() => {
                    const v = model.getValue();
                    if (first) {
                        this.loaded.emit(v);
                        first = false;
                    } else if (v !== value) {
                        console.log(value);
                        this.valueChange.emit(v);
                    }
                    value = v;
                });

                model.setValue(value);
            });

        modified$
            .takeWhile(() => this.isAlive)
            .subscribe(([model, value]) => {
                if (this.modifiedModelSub) {
                    this.modifiedModelSub.dispose();
                    delete this.modifiedModelSub;
                }
                model.setValue(value);
                this.modifiedModelSub = model.onDidChangeContent(() => {
                    const v = model.getValue();
                    if (v !== value) {
                        console.log(value);
                        this.valueToCompareChange.emit(v);
                    }
                    value = v;
                });
            });

        Observable.combineLatest(this.editorElement$, this.editor$, Observable.fromEvent(window, 'resize'))
            .takeWhile(() => this.isAlive)
            .debounceTime(5)
            .subscribe(([element, editor]) => {
                setElementSize(element);
                editor.layout();
            });

        Observable.combineLatest(this.editor$, this.options$)
            .takeWhile(() => this.isAlive)
            .filter(([editor]) => !!editor)
            .subscribe(([editor, options]) => editor.updateOptions(options));

        Observable.combineLatest(this.editor$, this._language$, this._isDiffEditor$, monacoEditorService.monacoApi$)
            .takeWhile(() => this.isAlive)
            .subscribe(([editor, language, isDiffEditor, monacoApi]) => {
                const originalModel = monacoApi.editor.createModel('', language);

                if (isDiffEditor) {
                    const modifiedModel = monacoApi.editor.createModel('', language);

                    editor.setModel({
                        modified: modifiedModel,
                        original: originalModel,
                    });

                    this.originalModel$.next(originalModel);
                    this.modifiedModel$.next(modifiedModel);
                } else {
                    editor.setModel(originalModel);
                    this.originalModel$.next(originalModel);
                }
            });

        Observable.combineLatest(this.editorElement$, this._isDiffEditor$, monacoEditorService.monacoApi$, this.contentInitialized$)
            .takeWhile(() => this.isAlive)
            .subscribe(([element, isDiffEditor, monacoApi]) => {
                const options = this.getOptions();
                const editor = isDiffEditor ? monacoApi.editor.createDiffEditor(element, options) : monacoApi.editor.create(element, options);
                this.editor$.next(editor);
                setElementSize(element);
            });
    }

    /**
     * Lifecycle hook that is called when a directive, pipe or service is destroyed.
     */
    public ngOnDestroy() {
        this.dispose();
    }

    /**
     * Lifecycle hook that is called when any data-bound property of a directive changes.
     */
    public ngOnChanges() {
        this.options$.next(this.getOptions());
    }

    public ngAfterViewInit() {
        this.contentInitialized$.next();
    }

    /**
     * Destroy the monaco component
     */
    public dispose() {
        if (this.modifiedModelSub) {
            this.modifiedModelSub.dispose();

        }
        if (this.originalModelSub) {
            this.originalModelSub.dispose();
        }

        this.editor$.subscribe((editor) => {
            editor.dispose();
        });

        this.editorElement$.subscribe((editorElement) => {
            while (editorElement.hasChildNodes()) {
                editorElement.removeChild(editorElement.firstChild);
            }
        });

        this.isAlive = false;
    }

    /**
     * Format the document
     */
    public format() {
        Observable.from(this.editor$)
            .first()
            .filter((editor) => !!editor)
            .subscribe((editor) => editor.trigger('', 'editor.action.formatDocument'));
    }

    private getOptions(): EditorOptions {
        const options: EditorOptions = new EditorOptions();
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
        options.value = '';

        Object.keys(options).forEach((key) => options[key] === undefined && delete options[key]); // Remove all undefined properties
        return options;
    }
}
