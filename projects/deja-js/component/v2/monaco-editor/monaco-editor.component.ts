/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { BooleanInput, coerceBooleanProperty, coerceNumberProperty, NumberInput } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

import { MonacoEditorService } from './monaco-editor.service';
import { EditorOptions, FontWeight, Language, LineNumbers, RenderLineHighlight, RenderWhitespace, SnippetSuggestions } from './options/editor-options.model';
import { EditorScrollbarOptions } from './options/editor-scrollbar-options.model';

/**
 * Monaco Editor Component for Angular
 *
 * The Monaco Editor is the code editor that powers [VS Code](https://github.com/Microsoft/vscode), a good page describing the code editor's features is [here](https://code.visualstudio.com/docs/editor/editingevolved).
 */
@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'monaco-editor',
    templateUrl: './monaco-editor.component.html',
    styleUrls: [
        './monaco-editor.component.scss'
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MonacoEditorComponent implements ControlValueAccessor {
    @Output() public readonly valueChange = new EventEmitter<string>();

    @Input()
    public set isDiffEditor(value: BooleanInput) {
        this._isDiffEditor = coerceBooleanProperty(value);
    }

    public get isDiffEditor(): BooleanInput {
        return this._isDiffEditor;
    }

    /**
     * Enable experimental screen reader support.
     * Defaults to `true`.
     */
    @Input()
    public set experimentalScreenReader(value: BooleanInput) {
        this.updateOptions({ experimentalScreenReader: coerceBooleanProperty(value) } as EditorOptions);
    }

    public get experimentalScreenReader(): BooleanInput {
        return this.options.experimentalScreenReader;
    }

    /**
     * The aria label for the editor's textarea (when it is focused).
     */
    @Input()
    public set ariaLabel(value: string) {
        this.updateOptions({ ariaLabel: value } as EditorOptions);
    }

    public get ariaLabel(): string {
        return this.options.ariaLabel;
    }

    /**
     * Render vertical lines at the specified columns.
     * Defaults to empty array.
     */
    @Input()
    public set rulers(value: ReadonlyArray<number>) {
        this.updateOptions({ rulers: value } as EditorOptions);
    }

    public get rulers(): ReadonlyArray<number> {
        return this.options.rulers;
    }

    /**
     * A string containing the word separators used when doing word navigation.
     * Defaults to `~!@#$%^&*()-=+[{]}\\|;:\'",.<>/?
     */
    @Input()
    public set wordSeparators(value: string) {
        this.updateOptions({ wordSeparators: value } as EditorOptions);
    }

    public get wordSeparators(): string {
        return this.options.wordSeparators;
    }

    /**
     * Enable Linux primary clipboard.
     * Defaults to true.
     */
    @Input()
    public set selectionClipboard(value: BooleanInput) {
        this.updateOptions({ selectionClipboard: coerceBooleanProperty(value) } as EditorOptions);
    }

    public get selectionClipboard(): BooleanInput {
        return this.options.selectionClipboard;
    }

    /**
     * Control the rendering of line numbers.
     * If it is a function, it will be invoked when rendering a line number and the return value will be rendered.
     * Otherwise, if it is a truey, line numbers will be rendered normally (equivalent of using an identity function).
     * Otherwise, line numbers will not be rendered.
     * Defaults to true.
     */
    @Input()
    public set lineNumbers(value: LineNumbers) {
        this.updateOptions({ lineNumbers: value } as EditorOptions);
    }

    public get lineNumbers(): LineNumbers {
        return this.options.lineNumbers;
    }

    /**
     * Should the corresponding line be selected when clicking on the line number?
     * Defaults to true.
     */
    @Input()
    public set selectOnLineNumbers(value: BooleanInput) {
        this.updateOptions({ selectOnLineNumbers: coerceBooleanProperty(value) } as EditorOptions);
    }

    public get selectOnLineNumbers(): BooleanInput {
        return this.options.selectOnLineNumbers;
    }

    /**
     * Control the width of line numbers, by reserving horizontal space for rendering at least an amount of digits.
     * Defaults to 5.
     */
    @Input()
    public set lineNumbersMinChars(value: NumberInput) {
        this.updateOptions({ lineNumbersMinChars: coerceNumberProperty(value) } as EditorOptions);
    }

    public get lineNumbersMinChars(): NumberInput {
        return this.options.lineNumbersMinChars;
    }

    /**
     * Enable the rendering of the glyph margin.
     * Defaults to true in vscode and to false in monaco-editor.
     */
    @Input()
    public set glyphMargin(value: BooleanInput) {
        this.updateOptions({ glyphMargin: coerceBooleanProperty(value) } as EditorOptions);
    }

    public get glyphMargin(): BooleanInput {
        return this.options.glyphMargin;
    }

    /**
     * The width reserved for line decorations (in px).
     * Line decorations are placed between line numbers and the editor content.
     * You can pass in a string in the format floating point followed by "ch". e.g. 1.3ch.
     * Defaults to 10.
     */
    @Input()
    public set lineDecorationsWidth(value: NumberInput) {
        this.updateOptions({ lineDecorationsWidth: coerceNumberProperty(value) } as EditorOptions);
    }

    public get lineDecorationsWidth(): NumberInput {
        return this.options.lineDecorationsWidth;
    }

    /**
     * When revealing the cursor, a virtual padding (px) is added to the cursor, turning it into a rectangle.
     * This virtual padding ensures that the cursor gets revealed before hitting the edge of the viewport.
     * Defaults to 30 (px).
     */
    @Input()
    public set revealHorizontalRightPadding(value: NumberInput) {
        this.updateOptions({ revealHorizontalRightPadding: coerceNumberProperty(value) } as EditorOptions);
    }

    public get revealHorizontalRightPadding(): NumberInput {
        return this.options.revealHorizontalRightPadding;
    }

    /**
     * Render the editor selection with rounded borders.
     * Defaults to true.
     */
    @Input()
    public set roundedSelection(value: BooleanInput) {
        this.updateOptions({ roundedSelection: coerceBooleanProperty(value) } as EditorOptions);
    }

    public get roundedSelection(): BooleanInput {
        return this.options.roundedSelection;
    }

    /**
     * Theme to be used for rendering.
     * The current out-of-the-box available themes are: 'vs' (default), 'vs-dark', 'hc-black'.
     * You can create custom themes via `monaco.editor.defineTheme`.
     */
    @Input()
    public set theme(value: string) {
        this.updateOptions({ theme: value } as EditorOptions);
    }

    public get theme(): string {
        return this.options.theme;
    }

    /**
     * Should the editor be read only.
     * Defaults to false.
     */
    @Input()
    public set readOnly(value: BooleanInput) {
        this.updateOptions({ readOnly: coerceBooleanProperty(value) } as EditorOptions);
    }

    public get readOnly(): BooleanInput {
        return this.options.readOnly;
    }

    /**
     * Control the behavior and rendering of the scrollbars.
     */
    @Input()
    public set scrollbar(value: EditorScrollbarOptions) {
        this.updateOptions({ scrollbar: value } as EditorOptions);
    }

    public get scrollbar(): EditorScrollbarOptions {
        return this.options.scrollbar;
    }

    /**
     * Display overflow widgets as `fixed`.
     * Defaults to `false`.
     */
    @Input()
    public set fixedOverflowWidgets(value: BooleanInput) {
        this.updateOptions({ fixedOverflowWidgets: coerceBooleanProperty(value) } as EditorOptions);
    }

    public get fixedOverflowWidgets(): BooleanInput {
        return this.options.fixedOverflowWidgets;
    }

    /**
     * The number of vertical lanes the overview ruler should render.
     * Defaults to 2.
     */
    @Input()
    public set overviewRulerLanes(value: NumberInput) {
        this.updateOptions({ overviewRulerLanes: coerceNumberProperty(value) } as EditorOptions);
    }

    public get overviewRulerLanes(): NumberInput {
        return this.options.overviewRulerLanes;
    }

    /**
     * Control the cursor animation style, possible values are 'blink', 'smooth', 'phase', 'expand' and 'solid'.
     * Defaults to 'blink'.
     */
    @Input()
    public set cursorBlinking(value: string) {
        this.updateOptions({ cursorBlinking: value } as EditorOptions);
    }

    public get cursorBlinking(): string {
        return this.options.cursorBlinking;
    }

    /**
     * Zoom the font in the editor when using the mouse wheel in combination with holding Ctrl.
     * Defaults to false.
     */
    @Input()
    public set mouseWheelZoom(value: BooleanInput) {
        this.updateOptions({ mouseWheelZoom: coerceBooleanProperty(value) } as EditorOptions);
    }

    public get mouseWheelZoom(): BooleanInput {
        return this.options.mouseWheelZoom;
    }

    /**
     * Control the cursor style, either 'block' or 'line'.
     * Defaults to 'line'.
     */
    @Input()
    public set cursorStyle(value: string) {
        this.updateOptions({ cursorStyle: value } as EditorOptions);
    }

    public get cursorStyle(): string {
        return this.options.cursorStyle;
    }

    /**
     * Enable font ligatures.
     * Defaults to false.
     */
    @Input()
    public set fontLigatures(value: BooleanInput) {
        this.updateOptions({ fontLigatures: coerceBooleanProperty(value) } as EditorOptions);
    }

    public get fontLigatures(): BooleanInput {
        return this.options.fontLigatures;
    }

    /**
     * Disable the use of `translate3d`.
     * Defaults to false.
     */
    @Input()
    public set disableTranslate3d(value: BooleanInput) {
        this.updateOptions({ disableTranslate3d: coerceBooleanProperty(value) } as EditorOptions);
    }

    public get disableTranslate3d(): BooleanInput {
        return this.options.disableTranslate3d;
    }

    /**
     * Disable the optimizations for monospace fonts.
     * Defaults to false.
     */
    @Input()
    public set disableMonospaceOptimizations(value: BooleanInput) {
        this.updateOptions({ disableMonospaceOptimizations: coerceBooleanProperty(value) } as EditorOptions);
    }

    public get disableMonospaceOptimizations(): BooleanInput {
        return this.options.disableMonospaceOptimizations;
    }

    /**
     * Should the cursor be hidden in the overview ruler.
     * Defaults to false.
     */
    @Input()
    public set hideCursorInOverviewRuler(value: BooleanInput) {
        this.updateOptions({ hideCursorInOverviewRuler: coerceBooleanProperty(value) } as EditorOptions);
    }

    public get hideCursorInOverviewRuler(): BooleanInput {
        return this.options.hideCursorInOverviewRuler;
    }

    /**
     * Enable that scrolling can go one screen size after the last line.
     * Defaults to true.
     */
    @Input()
    public set scrollBeyondLastLine(value: BooleanInput) {
        this.updateOptions({ scrollBeyondLastLine: coerceBooleanProperty(value) } as EditorOptions);
    }

    public get scrollBeyondLastLine(): BooleanInput {
        return this.options.scrollBeyondLastLine;
    }

    /**
     * Enable that the editor will install an interval to check if its container dom node size has changed.
     * Enabling this might have a severe performance impact.
     * Defaults to false.
     */
    @Input()
    public set automaticLayout(value: BooleanInput) {
        this.updateOptions({ automaticLayout: coerceBooleanProperty(value) } as EditorOptions);
    }

    public get automaticLayout(): BooleanInput {
        return this.options.automaticLayout;
    }

    /**
     * Control the wrapping strategy of the editor.
     * Using -1 means no wrapping whatsoever.
     * Using 0 means viewport width wrapping (ajusts with the resizing of the editor).
     * Using a positive number means wrapping after a fixed number of characters.
     * Defaults to 300.
     */
    @Input()
    public set wrappingColumn(value: NumberInput) {
        this.updateOptions({ wrappingColumn: coerceNumberProperty(value) } as EditorOptions);
    }

    public get wrappingColumn(): NumberInput {
        return this.options.wrappingColumn;
    }

    /**
     * Control the alternate style of viewport wrapping.
     * When set to true viewport wrapping is used only when the window width is less than the number of columns specified in the wrappingColumn property. Has no effect if wrappingColumn is not a positive number.
     * Defaults to false.
     */
    @Input()
    public set wordWrap(value: BooleanInput) {
        this.updateOptions({ wordWrap: coerceBooleanProperty(value) } as EditorOptions);
    }

    public get wordWrap(): BooleanInput {
        return this.options.wordWrap;
    }

    /**
     * Control indentation of wrapped lines. Can be: 'none', 'same' or 'indent'.
     * Defaults to 'same' in vscode and to 'none' in monaco-editor.
     */
    @Input()
    public set wrappingIndent(value: string) {
        this.updateOptions({ wrappingIndent: value } as EditorOptions);
    }

    public get wrappingIndent(): string {
        return this.options.wrappingIndent;
    }

    /**
     * Configure word wrapping characters. A break will be introduced before these characters.
     * Defaults to '{([+'.
     */
    @Input()
    public set wordWrapBreakBeforeCharacters(value: string) {
        this.updateOptions({ wordWrapBreakBeforeCharacters: value } as EditorOptions);
    }

    public get wordWrapBreakBeforeCharacters(): string {
        return this.options.wordWrapBreakBeforeCharacters;
    }

    /**
     * Configure word wrapping characters. A break will be introduced after these characters.
     * Defaults to ' \t})]?|&,;'.
     */
    @Input()
    public set wordWrapBreakAfterCharacters(value: string) {
        this.updateOptions({ wordWrapBreakAfterCharacters: value } as EditorOptions);
    }

    public get wordWrapBreakAfterCharacters(): string {
        return this.options.wordWrapBreakAfterCharacters;
    }

    /**
     * Configure word wrapping characters. A break will be introduced after these characters only if no `wordWrapBreakBeforeCharacters` or `wordWrapBreakAfterCharacters` were found.
     * Defaults to '.'.
     */
    @Input()
    public set wordWrapBreakObtrusiveCharacters(value: string) {
        this.updateOptions({ wordWrapBreakObtrusiveCharacters: value } as EditorOptions);
    }

    public get wordWrapBreakObtrusiveCharacters(): string {
        return this.options.wordWrapBreakObtrusiveCharacters;
    }

    /**
     * Performance guard: Stop rendering a line after x characters.
     * Defaults to 10000 if wrappingColumn is -1. Defaults to -1 if wrappingColumn is >= 0.
     * Use -1 to never stop rendering
     */
    @Input()
    public set stopRenderingLineAfter(value: NumberInput) {
        this.updateOptions({ stopRenderingLineAfter: coerceNumberProperty(value) } as EditorOptions);
    }

    public get stopRenderingLineAfter(): NumberInput {
        return this.options.stopRenderingLineAfter;
    }

    /**
     * Enable hover.
     * Defaults to true.
     */
    @Input()
    public set hover(value: BooleanInput) {
        this.updateOptions({ hover: coerceBooleanProperty(value) } as EditorOptions);
    }

    public get hover(): BooleanInput {
        return this.options.hover;
    }

    /**
     * Enable custom contextmenu.
     * Defaults to true.
     */
    @Input()
    public set contextmenu(value: BooleanInput) {
        this.updateOptions({ contextmenu: coerceBooleanProperty(value) } as EditorOptions);
    }

    public get contextmenu(): BooleanInput {
        return this.options.contextmenu;
    }

    /**
     * A multiplier to be used on the `deltaX` and `deltaY` of mouse wheel scroll events.
     * Defaults to 1.
     */
    @Input()
    public set mouseWheelScrollSensitivity(value: NumberInput) {
        this.updateOptions({ mouseWheelScrollSensitivity: coerceNumberProperty(value) } as EditorOptions);
    }

    public get mouseWheelScrollSensitivity(): NumberInput {
        return this.options.mouseWheelScrollSensitivity;
    }

    /**
     * Enable quick suggestions (shadow suggestions)
     * Defaults to true.
     */
    @Input()
    public set quickSuggestions(value: BooleanInput) {
        this.updateOptions({ quickSuggestions: coerceBooleanProperty(value) } as EditorOptions);
    }

    public get quickSuggestions(): BooleanInput {
        return this.options.quickSuggestions;
    }

    /**
     * Quick suggestions show delay (in ms)
     * Defaults to 500 (ms)
     */
    @Input()
    public set quickSuggestionsDelay(value: NumberInput) {
        this.updateOptions({ quickSuggestionsDelay: coerceNumberProperty(value) } as EditorOptions);
    }

    public get quickSuggestionsDelay(): NumberInput {
        return this.options.quickSuggestionsDelay;
    }

    /**
     * Enables parameter hints
     */
    @Input()
    public set parameterHints(value: BooleanInput) {
        this.updateOptions({ parameterHints: coerceBooleanProperty(value) } as EditorOptions);
    }

    public get parameterHints(): BooleanInput {
        return this.options.parameterHints;
    }

    /**
     * Render icons in suggestions box.
     * Defaults to true.
     */
    @Input()
    public set iconsInSuggestions(value: BooleanInput) {
        this.updateOptions({ iconsInSuggestions: coerceBooleanProperty(value) } as EditorOptions);
    }

    public get iconsInSuggestions(): BooleanInput {
        return this.options.iconsInSuggestions;
    }

    /**
     * Enable auto closing brackets.
     * Defaults to true.
     */
    @Input()
    public set autoClosingBrackets(value: BooleanInput) {
        this.updateOptions({ autoClosingBrackets: coerceBooleanProperty(value) } as EditorOptions);
    }

    public get autoClosingBrackets(): BooleanInput {
        return this.options.autoClosingBrackets;
    }

    /**
     * Enable format on type.
     * Defaults to false.
     */
    @Input()
    public set formatOnType(value: BooleanInput) {
        this.updateOptions({ formatOnType: coerceBooleanProperty(value) } as EditorOptions);
    }

    public get formatOnType(): BooleanInput {
        return this.options.formatOnType;
    }

    /**
     * Enable format on paste.
     * Defaults to false.
     */
    @Input()
    public set formatOnPaste(value: BooleanInput) {
        this.updateOptions({ formatOnPaste: coerceBooleanProperty(value) } as EditorOptions);
    }

    public get formatOnPaste(): BooleanInput {
        return this.options.formatOnPaste;
    }

    /**
     * Enable the suggestion box to pop-up on trigger characters.
     * Defaults to true.
     */
    @Input()
    public set suggestOnTriggerCharacters(value: BooleanInput) {
        this.updateOptions({ suggestOnTriggerCharacters: coerceBooleanProperty(value) } as EditorOptions);
    }

    public get suggestOnTriggerCharacters(): BooleanInput {
        return this.options.suggestOnTriggerCharacters;
    }

    /**
     * Accept suggestions on ENTER.
     * Defaults to true.
     */
    @Input()
    public set acceptSuggestionOnEnter(value: BooleanInput) {
        this.updateOptions({ acceptSuggestionOnEnter: coerceBooleanProperty(value) } as EditorOptions);
    }

    public get acceptSuggestionOnEnter(): BooleanInput {
        return this.options.acceptSuggestionOnEnter;
    }

    /**
     * Accept suggestions on provider defined characters.
     * Defaults to true.
     */
    @Input()
    public set acceptSuggestionOnCommitCharacter(value: BooleanInput) {
        this.updateOptions({ acceptSuggestionOnCommitCharacter: coerceBooleanProperty(value) } as EditorOptions);
    }

    public get acceptSuggestionOnCommitCharacter(): BooleanInput {
        return this.options.acceptSuggestionOnCommitCharacter;
    }

    /**
     * Enable snippet suggestions. Default to 'true'.
     */
    @Input()
    public set snippetSuggestions(value: SnippetSuggestions) {
        this.updateOptions({ snippetSuggestions: value } as EditorOptions);
    }

    public get snippetSuggestions(): SnippetSuggestions {
        return this.options.snippetSuggestions;
    }

    /**
     * Copying without a selection copies the current line.
     */
    @Input()
    public set emptySelectionClipboard(value: BooleanInput) {
        this.updateOptions({ emptySelectionClipboard: coerceBooleanProperty(value) } as EditorOptions);
    }

    public get emptySelectionClipboard(): BooleanInput {
        return this.options.emptySelectionClipboard;
    }

    /**
     * Enable tab completion. Defaults to 'false'
     */
    @Input()
    public set tabCompletion(value: BooleanInput) {
        this.updateOptions({ tabCompletion: coerceBooleanProperty(value) } as EditorOptions);
    }

    public get tabCompletion(): BooleanInput {
        return this.options.tabCompletion;
    }

    /**
     * Enable word based suggestions. Defaults to 'true'
     */
    @Input()
    public set wordBasedSuggestions(value: BooleanInput) {
        this.updateOptions({ wordBasedSuggestions: coerceBooleanProperty(value) } as EditorOptions);
    }

    public get wordBasedSuggestions(): BooleanInput {
        return this.options.wordBasedSuggestions;
    }

    /**
     * The font size for the suggest widget.
     * Defaults to the editor font size.
     */
    @Input()
    public set suggestFontSize(value: NumberInput) {
        this.updateOptions({ suggestFontSize: coerceNumberProperty(value) } as EditorOptions);
    }

    public get suggestFontSize(): NumberInput {
        return this.options.suggestFontSize;
    }

    /**
     * The line height for the suggest widget.
     * Defaults to the editor line height.
     */
    @Input()
    public set suggestLineHeight(value: NumberInput) {
        this.updateOptions({ suggestLineHeight: coerceNumberProperty(value) } as EditorOptions);
    }

    public get suggestLineHeight(): NumberInput {
        return this.options.suggestLineHeight;
    }

    /**
     * Enable selection highlight.
     * Defaults to true.
     */
    @Input()
    public set selectionHighlight(value: BooleanInput) {
        this.updateOptions({ selectionHighlight: coerceBooleanProperty(value) } as EditorOptions);
    }

    public get selectionHighlight(): BooleanInput {
        return this.options.selectionHighlight;
    }

    /**
     * Show code lens
     * Defaults to true.
     */
    @Input()
    public set codeLens(value: BooleanInput) {
        this.updateOptions({ codeLens: coerceBooleanProperty(value) } as EditorOptions);
    }

    public get codeLens(): BooleanInput {
        return this.options.codeLens;
    }

    /**
     * Enable code folding
     * Defaults to true in vscode and to false in monaco-editor.
     */
    @Input()
    public set folding(value: BooleanInput) {
        this.updateOptions({ folding: coerceBooleanProperty(value) } as EditorOptions);
    }

    public get folding(): BooleanInput {
        return this.options.folding;
    }

    /**
     * Enable rendering of whitespace.
     * Defaults to none.
     */
    @Input()
    public set renderWhitespace(value: RenderWhitespace) {
        this.updateOptions({ renderWhitespace: value } as EditorOptions);
    }

    public get renderWhitespace(): RenderWhitespace {
        return this.options.renderWhitespace;
    }

    /**
     * Enable rendering of control characters.
     * Defaults to false.
     */
    @Input()
    public set renderControlCharacters(value: BooleanInput) {
        this.updateOptions({ renderControlCharacters: coerceBooleanProperty(value) } as EditorOptions);
    }

    public get renderControlCharacters(): BooleanInput {
        return this.options.renderControlCharacters;
    }

    /**
     * Enable rendering of indent guides.
     * Defaults to false.
     */
    @Input()
    public set renderIndentGuides(value: BooleanInput) {
        this.updateOptions({ renderIndentGuides: coerceBooleanProperty(value) } as EditorOptions);
    }

    public get renderIndentGuides(): BooleanInput {
        return this.options.renderIndentGuides;
    }

    /**
     * Enable rendering of current line highlight.
     * Defaults to all.
     */
    @Input()
    public set renderLineHighlight(value: RenderLineHighlight) {
        this.updateOptions({ renderLineHighlight: value } as EditorOptions);
    }

    public get renderLineHighlight(): RenderLineHighlight {
        return this.options.renderLineHighlight;
    }

    /**
     * Inserting and deleting whitespace follows tab stops.
     */
    @Input()
    public set useTabStops(value: BooleanInput) {
        this.updateOptions({ useTabStops: coerceBooleanProperty(value) } as EditorOptions);
    }

    public get useTabStops(): BooleanInput {
        return this.options.useTabStops;
    }

    /**
     * The font family
     */
    @Input()
    public set fontFamily(value: string) {
        this.updateOptions({ fontFamily: value } as EditorOptions);
    }

    public get fontFamily(): string {
        return this.options.fontFamily;
    }

    /**
     * The font weight
     */
    @Input()
    public set fontWeight(value: FontWeight) {
        this.updateOptions({ fontWeight: value } as EditorOptions);
    }

    public get fontWeight(): FontWeight {
        return this.options.fontWeight;
    }

    /**
     * The font size
     */
    @Input()
    public set fontSize(value: NumberInput) {
        this.updateOptions({ fontSize: coerceNumberProperty(value) } as EditorOptions);
    }

    public get fontSize(): NumberInput {
        return this.options.fontSize;
    }

    /**
     * The line height
     */
    @Input()
    public set lineHeight(value: NumberInput) {
        this.updateOptions({ lineHeight: coerceNumberProperty(value) } as EditorOptions);
    }

    public get lineHeight(): NumberInput {
        return this.options.lineHeight;
    }

    /**
    * Language of content to show
    */
    @Input()
    public set language(value: Language) {
        this.updateOptions({ language: value } as EditorOptions);
    }

    public get language(): Language {
        return this.options.language;
    }

    @Input()
    public set value(value: string) {
        this._value = value;
    }

    public get value(): string {
        return this._value;
    }

    @Input()
    public set valueToCompare(value: string) {
        this._valueToCompare = value;
    }

    public get valueToCompare(): string {
        return this._valueToCompare;
    }

    public options: EditorOptions;

    public monacoEditorService = inject(MonacoEditorService);
    public control = inject(NgControl, { optional: true, self: true });

    private _isDiffEditor: boolean;
    private _value: string;
    private _valueToCompare: string;

    public constructor() {
        this.options = {
            automaticLayout: true
        } as EditorOptions;
        if (this.control) {
            this.control.valueAccessor = this;
        }
    }

    public updateOptions(options: EditorOptions): void {
        this.options = { ...this.options, ...options };
    }

    public onValueChange(value: string): void {
        this.value = value;
        this.valueChange.next(value);
    }

    public onTouchedCallback = (): void => undefined;
    public onChangeCallback = (_: string): void => undefined;

    /** From ControlValueAccessor interface */
    public writeValue(value: string): void {
        this.value = value;
    }

    /** From ControlValueAccessor interface */
    public registerOnChange(fn: (_a: unknown) => void): void {
        this.onChangeCallback = fn;
    }

    /** From ControlValueAccessor interface */
    public registerOnTouched(fn: () => void): void {
        this.onTouchedCallback = fn;
    }
}
