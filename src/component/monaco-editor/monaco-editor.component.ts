/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Input, OnChanges, OnDestroy, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { isUndefined } from 'util';
import { MonacoEditorService } from './monaco-editor.service';
import { IEditorLanguage } from './options/editor-language.model';
import { IEditorOptions } from './options/editor-options.model';
import { IEditorScrollbarOptions } from './options/editor-scrollbar-options';
import { IEditorTheme } from './options/editor-theme.component';

declare const monaco: any;

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'deja-monaco-editor',
    styleUrls: [
        './monaco-editor.scss',
    ],
    template: `<div #editor class='monaco-editor'></div>`,
})
export class DejaMonacoEditorComponent implements OnDestroy, AfterViewInit, OnChanges {
    @Input() public experimentalScreenReader?: boolean;
    @Input() public ariaLabel?: string;
    @Input() public rulers?: number[];
    @Input() public wordSeparators?: string;
    @Input() public selectionClipboard?: boolean;
    @Input() public lineNumbers?: boolean;
    @Input() public selectOnLineNumbers?: boolean;
    @Input() public lineNumbersMinChars?: number;
    @Input() public glyphMargin?: boolean;
    @Input() public lineDecorationsWidth?: number;
    @Input() public revealHorizontalRightPadding?: number;
    @Input() public roundedSelection?: boolean;
    @Input() public theme?: IEditorTheme;
    @Input() public readOnly?: boolean;
    @Input() public scrollbar?: IEditorScrollbarOptions;
    @Input() public overviewRulerLanes?: number;
    @Input() public cursorBlinking?: string;
    @Input() public mouseWheelZoom?: boolean;
    @Input() public cursorStyle?: string;
    @Input() public fontLigatures?: boolean;
    @Input() public disableTranslate3d?: boolean;
    @Input() public hideCursorInOverviewRuler?: boolean;
    @Input() public scrollBeyondLastLine?: boolean;
    @Input() public automaticLayout?: boolean;
    @Input() public wrappingColumn?: number;
    @Input() public wordWrap?: boolean;
    @Input() public wrappingIndent?: string;
    @Input() public wordWrapBreakBeforeCharacters?: string;
    @Input() public wordWrapBreakAfterCharacters?: string;
    @Input() public wordWrapBreakObtrusiveCharacters?: string;
    @Input() public stopRenderingLineAfter?: number;
    @Input() public hover?: boolean;
    @Input() public contextmenu?: boolean;
    @Input() public mouseWheelScrollSensitivity?: number;
    @Input() public quickSuggestions?: boolean;
    @Input() public quickSuggestionsDelay?: number;
    @Input() public parameterHints?: boolean;
    @Input() public iconsInSuggestions?: boolean;
    @Input() public autoClosingBrackets?: boolean;
    @Input() public formatOnType?: boolean;
    @Input() public suggestOnTriggerCharacters?: boolean;
    @Input() public acceptSuggestionOnEnter?: boolean;
    @Input() public snippetSuggestions?: 'top' | 'bottom' | 'inline' | 'none';
    @Input() public tabCompletion?: boolean;
    @Input() public wordBasedSuggestions?: boolean;
    @Input() public selectionHighlight?: boolean;
    @Input() public codeLens?: boolean;
    @Input() public folding?: boolean;
    @Input() public renderWhitespace?: 'none' | 'boundary' | 'all';
    @Input() public renderControlCharacters?: boolean;
    @Input() public renderIndentGuides?: boolean;
    @Input() public renderLineHighlight?: boolean;
    @Input() public useTabStops?: boolean;
    @Input() public fontFamily?: string;
    @Input() public fontWeight?: 'normal' | 'bold' | 'bolder' | 'lighter' | 'initial' | 'inherit' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
    @Input() public fontSize?: number;
    @Input() public lineHeight?: number;
    @Input() public formatOnPaste?: boolean;

    @Input() public language: IEditorLanguage;

    @Input() public isDiffEditor: boolean;
    @Input() public monacoLibPath = 'vs';

    @Input() set valueToCompare(v: string) {
        if (v !== this._valueToCompare) {
            this._valueToCompare = v;

            if (isUndefined(this._valueToCompare) || !this._editor) {
                return;
            }

            if (this._editor.getEditorType() !== 'vs.editor.ICodeEditor') {
                this.getModifiedModel().setValue(this._valueToCompare);
            }
        }
    }

    @Input() set value(v: string) {
        if (v !== this._value) {
            this._value = v;

            if (!this._editor) {
                return;
            }

            if (isUndefined(this._value)) {
                this._value = '';
            }

            this.getOriginalModel().setValue(this._value);
        }
    }

    @Output() public valueChange = new EventEmitter();
    @Output() public valueToCompareChange = new EventEmitter();

    @ViewChild('editor') private editorContent: ElementRef;

    private _editor: any;
    private _value = '';
    private _valueToCompare = '';

    constructor(public monacoEditorService: MonacoEditorService) {
    }

    /**
     * load Monaco lib
     */
    public ngAfterViewInit() {
        this.monacoEditorService.initMonacoLib(this.monacoLibPath).then(() => {
            this.initMonaco();
        });
    }

    /**
     * Upon destruction of the component we make sure to dispose both the editor and the extra libs that we might've loaded
     */
    public ngOnDestroy() {
        this.dispose();
    }

    public ngOnChanges() {
        if (this._editor) {
            this._editor.updateOptions(this.getOptions());
        }
    }

    /**
     * Destroy the monaco componenent
     */
    public dispose() {
        const myDiv: HTMLDivElement = this.editorContent.nativeElement;
        if (this._editor) {
            this._editor.dispose();
            while (myDiv.hasChildNodes()) {
                myDiv.removeChild(myDiv.firstChild);
            }
            this._editor = null;
        }
    }

    /**
     * Triggered when windows is resized
     * @param event
     */
    @HostListener('window:resize', ['$event'])
    protected onResize() {
        // Manually set monaco size because MonacoEditor doesn't work with Flexbox css
        const myDiv: HTMLDivElement = this.editorContent.nativeElement;
        myDiv.setAttribute('style', `height: ${myDiv.parentElement.offsetHeight}px; width:100%;`);
    }

    /**
     * Init editor
     * Is called once monaco library is available
     */
    private initMonaco() {
        this.initEditor();
    }

    private initEditor() {
        const myDiv: HTMLDivElement = this.editorContent.nativeElement;
        const options = this.getOptions();
        this.dispose();

        if (!this.isDiffEditor) {
            this._editor = this.initSimpleEditor(myDiv, options);
        } else {
            this._editor = this.initDiffEditor(myDiv, options);
        }

        // Manually set monaco size because MonacoEditor doesn't work with Flexbox css
        myDiv.setAttribute('style', `height: ${myDiv.parentElement.offsetHeight}px; width:100%;`);

        // Trigger on change event for simple editor
        this.getOriginalModel().onDidChangeContent(() => {
            const newVal: string = this.getOriginalModel().getValue();
            if (this._value !== newVal) {
                this.updateValue(newVal);
            }
        });

        // Trigger on change event for diff editor
        if (this.getModifiedModel()) {
            this.getModifiedModel().onDidChangeContent(() => {
                const newVal: string = this.getModifiedModel().getValue();
                if (this._valueToCompare !== newVal) {
                    this.updateValueToCompare(newVal);
                }
            });
        }
    }

    /**
     * Create a simple editor text
     * @param div
     * @param options
     * @returns {IStandaloneCodeEditor}
     */
    private initSimpleEditor(div: HTMLDivElement, options: any) {
        return monaco.editor.create(div, options);
    }

    /**
     * Create a diff editor to compare two string (_value and _valueToCompare)
     * @param div
     * @returns {IStandaloneDiffEditor}
     */
    private initDiffEditor(div: HTMLDivElement, options: any) {
        const originalModel = monaco.editor.createModel(this._value, this.language);
        const modifiedModel = monaco.editor.createModel(this._valueToCompare, this.language);

        const diffEditor = monaco.editor.createDiffEditor(div, options);
        diffEditor.setModel({
            modified: modifiedModel,
            original: originalModel,
        });

        return diffEditor;
    }

    private getOptions(): IEditorOptions {
        const options: IEditorOptions = new IEditorOptions();
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
        options.language = this.language;

        Object.keys(options).forEach((key) => options[key] === undefined && delete options[key]); // Remove all undefined properties
        return options;
    }

    /**
     * UpdateValue
     *
     * @param value
     */
    private updateValue(value: string) {
        // this.value = value;
        this._value = value;
        this.valueChange.emit(value);
    }

    /**
     * UpdateValue
     *
     * @param value
     */
    private updateValueToCompare(value: string) {
        // this.valueToCompare = value;
        this._valueToCompare = value;
        this.valueToCompareChange.emit(value);
    }

    private getOriginalModel() {
        if (this._editor) {
            const model = this._editor.getModel();
            return model.original ? model.original : model;
        }
    }

    private getModifiedModel() {
        if (this._editor) {
            const model = this._editor.getModel();
            return model.modified ? model.modified : null;
        }
    }
}
