/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { NumberInput } from '@angular/cdk/coercion';

import { EditorScrollbarOptions } from './editor-scrollbar-options.model';

export type LineNumbers = 'on' | 'off' | 'relative' | ((lineNumber: number) => string);
export type SnippetSuggestions = 'top' | 'bottom' | 'inline' | 'none';
export type RenderWhitespace = 'none' | 'boundary' | 'all';
export type RenderLineHighlight = 'none' | 'gutter' | 'line' | 'all';
export type FontWeight = 'normal' | 'bold' | 'bolder' | 'lighter' | 'initial' | 'inherit' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
export type Language = 'bat' | 'c' | 'cpp' | 'csharp' | 'css' | 'dockerfile' | 'fsharp' | 'go' | 'graphql' | 'handlebars' | 'html' | 'ini' | 'jade' | 'javascript' | 'json' | 'less' | 'lua' | 'markdown' | 'objective-c' | 'php' | 'plaintext' | 'postiats' | 'powershell' | 'python' | 'r' | 'razor' | 'ruby' | 'scss' | 'sql' | 'swift' | 'typescript' | 'vb' | 'xml' | 'yaml' | '';

/**
 * Configuration options for the editor.
 */
export interface EditorOptions {
    /**
     * Enable experimental screen reader support.
     * Defaults to `true`.
     */
    experimentalScreenReader?: boolean;
    /**
     * The aria label for the editor's textarea (when it is focused).
     */
    ariaLabel?: string;
    /**
     * Render vertical lines at the specified columns.
     * Defaults to empty array.
     */
    rulers?: ReadonlyArray<number>;
    /**
     * A string containing the word separators used when doing word navigation.
     * Defaults to `~!@#$%^&*()-=+[{]}\\|;:\'",.<>/?
     */
    wordSeparators?: string;
    /**
     * Enable Linux primary clipboard.
     * Defaults to true.
     */
    selectionClipboard?: boolean;
    /**
     * Control the rendering of line numbers.
     * If it is a function, it will be invoked when rendering a line number and the return value will be rendered.
     * Otherwise, if it is a truey, line numbers will be rendered normally (equivalent of using an identity function).
     * Otherwise, line numbers will not be rendered.
     * Defaults to true.
     */
    lineNumbers?: LineNumbers;
    /**
     * Should the corresponding line be selected when clicking on the line number?
     * Defaults to true.
     */
    selectOnLineNumbers?: boolean;
    /**
     * Control the width of line numbers, by reserving horizontal space for rendering at least an amount of digits.
     * Defaults to 5.
     */
    lineNumbersMinChars?: number;
    /**
     * Enable the rendering of the glyph margin.
     * Defaults to true in vscode and to false in monaco-editor.
     */
    glyphMargin?: boolean;
    /**
     * The width reserved for line decorations (in px).
     * Line decorations are placed between line numbers and the editor content.
     * You can pass in a string in the format floating point followed by "ch". e.g. 1.3ch.
     * Defaults to 10.
     */
    lineDecorationsWidth?: NumberInput;
    /**
     * When revealing the cursor, a virtual padding (px) is added to the cursor, turning it into a rectangle.
     * This virtual padding ensures that the cursor gets revealed before hitting the edge of the viewport.
     * Defaults to 30 (px).
     */
    revealHorizontalRightPadding?: number;
    /**
     * Render the editor selection with rounded borders.
     * Defaults to true.
     */
    roundedSelection?: boolean;
    /**
     * Theme to be used for rendering.
     * The current out-of-the-box available themes are: 'vs' (default), 'vs-dark', 'hc-black'.
     * You can create custom themes via `monaco.editor.defineTheme`.
     */
    theme?: string;
    /**
     * Should the editor be read only.
     * Defaults to false.
     */
    readOnly?: boolean;
    /**
     * Control the behavior and rendering of the scrollbars.
     */
    scrollbar?: EditorScrollbarOptions;
    /**
     * Display overflow widgets as `fixed`.
     * Defaults to `false`.
     */
    fixedOverflowWidgets?: boolean;
    /**
     * The number of vertical lanes the overview ruler should render.
     * Defaults to 2.
     */
    overviewRulerLanes?: number;
    /**
     * Control the cursor animation style, possible values are 'blink', 'smooth', 'phase', 'expand' and 'solid'.
     * Defaults to 'blink'.
     */
    cursorBlinking?: string;
    /**
     * Zoom the font in the editor when using the mouse wheel in combination with holding Ctrl.
     * Defaults to false.
     */
    mouseWheelZoom?: boolean;
    /**
     * Control the cursor style, either 'block' or 'line'.
     * Defaults to 'line'.
     */
    cursorStyle?: string;
    /**
     * Enable font ligatures.
     * Defaults to false.
     */
    fontLigatures?: boolean;
    /**
     * Disable the use of `translate3d`.
     * Defaults to false.
     */
    disableTranslate3d?: boolean;
    /**
     * Disable the optimizations for monospace fonts.
     * Defaults to false.
     */
    disableMonospaceOptimizations?: boolean;
    /**
     * Should the cursor be hidden in the overview ruler.
     * Defaults to false.
     */
    hideCursorInOverviewRuler?: boolean;
    /**
     * Enable that scrolling can go one screen size after the last line.
     * Defaults to true.
     */
    scrollBeyondLastLine?: boolean;
    /**
     * Enable that the editor will install an interval to check if its container dom node size has changed.
     * Enabling this might have a severe performance impact.
     * Defaults to false.
     */
    automaticLayout?: boolean;
    /**
     * Control the wrapping strategy of the editor.
     * Using -1 means no wrapping whatsoever.
     * Using 0 means viewport width wrapping (ajusts with the resizing of the editor).
     * Using a positive number means wrapping after a fixed number of characters.
     * Defaults to 300.
     */
    wrappingColumn?: number;
    /**
     * Control the alternate style of viewport wrapping.
     * When set to true viewport wrapping is used only when the window width is less than the number of columns specified in the wrappingColumn property. Has no effect if wrappingColumn is not a positive number.
     * Defaults to false.
     */
    wordWrap?: boolean;
    /**
     * Control indentation of wrapped lines. Can be: 'none', 'same' or 'indent'.
     * Defaults to 'same' in vscode and to 'none' in monaco-editor.
     */
    wrappingIndent?: string;
    /**
     * Configure word wrapping characters. A break will be introduced before these characters.
     * Defaults to '{([+'.
     */
    wordWrapBreakBeforeCharacters?: string;
    /**
     * Configure word wrapping characters. A break will be introduced after these characters.
     * Defaults to ' \t})]?|&,;'.
     */
    wordWrapBreakAfterCharacters?: string;
    /**
     * Configure word wrapping characters. A break will be introduced after these characters only if no `wordWrapBreakBeforeCharacters` or `wordWrapBreakAfterCharacters` were found.
     * Defaults to '.'.
     */
    wordWrapBreakObtrusiveCharacters?: string;
    /**
     * Performance guard: Stop rendering a line after x characters.
     * Defaults to 10000 if wrappingColumn is -1. Defaults to -1 if wrappingColumn is >= 0.
     * Use -1 to never stop rendering
     */
    stopRenderingLineAfter?: number;
    /**
     * Enable hover.
     * Defaults to true.
     */
    hover?: boolean;
    /**
     * Enable custom contextmenu.
     * Defaults to true.
     */
    contextmenu?: boolean;
    /**
     * A multiplier to be used on the `deltaX` and `deltaY` of mouse wheel scroll events.
     * Defaults to 1.
     */
    mouseWheelScrollSensitivity?: number;
    /**
     * Enable quick suggestions (shadow suggestions)
     * Defaults to true.
     */
    quickSuggestions?: boolean;
    /**
     * Quick suggestions show delay (in ms)
     * Defaults to 500 (ms)
     */
    quickSuggestionsDelay?: number;
    /**
     * Enables parameter hints
     */
    parameterHints?: boolean;
    /**
     * Render icons in suggestions box.
     * Defaults to true.
     */
    iconsInSuggestions?: boolean;
    /**
     * Enable auto closing brackets.
     * Defaults to true.
     */
    autoClosingBrackets?: boolean;
    /**
     * Enable format on type.
     * Defaults to false.
     */
    formatOnType?: boolean;
    /**
     * Enable format on paste.
     * Defaults to false.
     */
    formatOnPaste?: boolean;
    /**
     * Enable the suggestion box to pop-up on trigger characters.
     * Defaults to true.
     */
    suggestOnTriggerCharacters?: boolean;
    /**
     * Accept suggestions on ENTER.
     * Defaults to true.
     */
    acceptSuggestionOnEnter?: boolean;
    /**
     * Accept suggestions on provider defined characters.
     * Defaults to true.
     */
    acceptSuggestionOnCommitCharacter?: boolean;
    /**
     * Enable snippet suggestions. Default to 'true'.
     */
    snippetSuggestions?: SnippetSuggestions;
    /**
     * Copying without a selection copies the current line.
     */
    emptySelectionClipboard?: boolean;
    /**
     * Enable tab completion. Defaults to 'false'
     */
    tabCompletion?: boolean;
    /**
     * Enable word based suggestions. Defaults to 'true'
     */
    wordBasedSuggestions?: boolean;
    /**
     * The font size for the suggest widget.
     * Defaults to the editor font size.
     */
    suggestFontSize?: number;
    /**
     * The line height for the suggest widget.
     * Defaults to the editor line height.
     */
    suggestLineHeight?: number;
    /**
     * Enable selection highlight.
     * Defaults to true.
     */
    selectionHighlight?: boolean;
    /**
     * Show code lens
     * Defaults to true.
     */
    codeLens?: boolean;
    /**
     * Enable code folding
     * Defaults to true in vscode and to false in monaco-editor.
     */
    folding?: boolean;
    /**
     * Enable rendering of whitespace.
     * Defaults to none.
     */
    renderWhitespace?: RenderWhitespace;
    /**
     * Enable rendering of control characters.
     * Defaults to false.
     */
    renderControlCharacters?: boolean;
    /**
     * Enable rendering of indent guides.
     * Defaults to false.
     */
    renderIndentGuides?: boolean;
    /**
     * Enable rendering of current line highlight.
     * Defaults to all.
     */
    renderLineHighlight?: RenderLineHighlight;
    /**
     * Inserting and deleting whitespace follows tab stops.
     */
    useTabStops?: boolean;
    /**
     * The font family
     */
    fontFamily?: string;
    /**
     * The font weight
     */
    fontWeight?: FontWeight;
    /**
     * The font size
     */
    fontSize?: number;
    /**
     * The line height
     */
    lineHeight?: number;
    /**
     * Content to show
     */
    value: string;
    /**
     * Language of content to show
     */
    language?: Language;
}
