/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { IEditorLanguage } from './editor-language.model';
import { IEditorScrollbarOptions } from './editor-scrollbar-options';
import { IEditorTheme } from './editor-theme.component';
/**
 * Configuration options for the editor.
 */
export class IEditorOptions {
    /**
     * Enable experimental screen reader support.
     * Defaults to `true`.
     */
    public experimentalScreenReader?: boolean;
    /**
     * The aria label for the editor's textarea (when it is focused).
     */
    public ariaLabel?: string;
    /**
     * Render vertical lines at the specified columns.
     * Defaults to empty array.
     */
    public rulers?: number[];
    /**
     * A string containing the word separators used when doing word navigation.
     * Defaults to `~!@#$%^&*()-=+[{]}\\|;:\'",.<>/?
     */
    public wordSeparators?: string;
    /**
     * Enable Linux primary clipboard.
     * Defaults to true.
     */
    public selectionClipboard?: boolean;
    /**
     * Control the rendering of line numbers.
     * If it is a function, it will be invoked when rendering a line number and the return value will be rendered.
     * Otherwise, if it is a truey, line numbers will be rendered normally (equivalent of using an identity function).
     * Otherwise, line numbers will not be rendered.
     * Defaults to true.
     */
    public lineNumbers?: boolean;
    /**
     * Should the corresponding line be selected when clicking on the line number?
     * Defaults to true.
     */
    public selectOnLineNumbers?: boolean;
    /**
     * Control the width of line numbers, by reserving horizontal space for rendering at least an amount of digits.
     * Defaults to 5.
     */
    public lineNumbersMinChars?: number;
    /**
     * Enable the rendering of the glyph margin.
     * Defaults to false.
     */
    public glyphMargin?: boolean;
    /**
     * The width reserved for line decorations (in px).
     * Line decorations are placed between line numbers and the editor content.
     * Defaults to 10.
     */
    public lineDecorationsWidth?: number;
    /**
     * When revealing the cursor, a virtual padding (px) is added to the cursor, turning it into a rectangle.
     * This virtual padding ensures that the cursor gets revealed before hitting the edge of the viewport.
     * Defaults to 30 (px).
     */
    public revealHorizontalRightPadding?: number;
    /**
     * Render the editor selection with rounded borders.
     * Defaults to true.
     */
    public roundedSelection?: boolean;
    /**
     * Theme to be used for rendering. Consists of two parts, the UI theme and the syntax theme,
     * separated by a space.
     * The current available UI themes are: 'vs' (default), 'vs-dark', 'hc-black'
     * The syntax themes are contributed. The default is 'default-theme'
     */
    public theme?: IEditorTheme;
    /**
     * Should the editor be read only.
     * Defaults to false.
     */
    public readOnly?: boolean;
    /**
     * Control the behavior and rendering of the scrollbars.
     */
    public scrollbar?: IEditorScrollbarOptions;
    /**
     * The number of vertical lanes the overview ruler should render.
     * Defaults to 2.
     */
    public overviewRulerLanes?: number;
    /**
     * Control the cursor animation style, possible values are 'blink', 'smooth', 'phase', 'expand' and 'solid'.
     * Defaults to 'blink'.
     */
    public cursorBlinking?: string;
    /**
     * Zoom the font in the editor when using the mouse wheel in combination with holding Ctrl.
     * Defaults to false.
     */
    public mouseWheelZoom?: boolean;
    /**
     * Control the cursor style, either 'block' or 'line'.
     * Defaults to 'line'.
     */
    public cursorStyle?: string;
    /**
     * Enable font ligatures.
     * Defaults to false.
     */
    public fontLigatures?: boolean;
    /**
     * Disable the use of `translate3d`.
     * Defaults to false.
     */
    public disableTranslate3d?: boolean;
    /**
     * Should the cursor be hidden in the overview ruler.
     * Defaults to false.
     */
    public hideCursorInOverviewRuler?: boolean;
    /**
     * Enable that scrolling can go one screen size after the last line.
     * Defaults to true.
     */
    public scrollBeyondLastLine?: boolean;
    /**
     * Enable that the editor will install an interval to check if its container dom node size has changed.
     * Enabling this might have a severe performance impact.
     * Defaults to false.
     */
    public automaticLayout?: boolean;
    /**
     * Control the wrapping strategy of the editor.
     * Using -1 means no wrapping whatsoever.
     * Using 0 means viewport width wrapping (ajusts with the resizing of the editor).
     * Using a positive number means wrapping after a fixed number of characters.
     * Defaults to 300.
     */
    public wrappingColumn?: number;
    /**
     * Control the alternate style of viewport wrapping.
     * When set to true viewport wrapping is used only when the window width is less than the number of columns specified in the wrappingColumn property. Has no effect if wrappingColumn is not a positive number.
     * Defaults to false.
     */
    public wordWrap?: boolean;
    /**
     * Control indentation of wrapped lines. Can be: 'none', 'same' or 'indent'.
     * Defaults to 'none'.
     */
    public wrappingIndent?: string;
    /**
     * Configure word wrapping characters. A break will be introduced before these characters.
     * Defaults to '{([+'.
     */
    public wordWrapBreakBeforeCharacters?: string;
    /**
     * Configure word wrapping characters. A break will be introduced after these characters.
     * Defaults to ' \t})]?|&,;'.
     */
    public wordWrapBreakAfterCharacters?: string;
    /**
     * Configure word wrapping characters. A break will be introduced after these characters only if no `wordWrapBreakBeforeCharacters` or `wordWrapBreakAfterCharacters` were found.
     * Defaults to '.'.
     */
    public wordWrapBreakObtrusiveCharacters?: string;
    /**
     * Performance guard: Stop rendering a line after x characters.
     * Defaults to 10000 if wrappingColumn is -1. Defaults to -1 if wrappingColumn is >= 0.
     * Use -1 to never stop rendering
     */
    public stopRenderingLineAfter?: number;
    /**
     * Enable hover.
     * Defaults to true.
     */
    public hover?: boolean;
    /**
     * Enable custom contextmenu.
     * Defaults to true.
     */
    public contextmenu?: boolean;
    /**
     * A multiplier to be used on the `deltaX` and `deltaY` of mouse wheel scroll events.
     * Defaults to 1.
     */
    public mouseWheelScrollSensitivity?: number;
    /**
     * Enable quick suggestions (shadow suggestions)
     * Defaults to true.
     */
    public quickSuggestions?: boolean;
    /**
     * Quick suggestions show delay (in ms)
     * Defaults to 500 (ms)
     */
    public quickSuggestionsDelay?: number;
    /**
     * Enables parameter hints
     */
    public parameterHints?: boolean;
    /**
     * Render icons in suggestions box.
     * Defaults to true.
     */
    public iconsInSuggestions?: boolean;
    /**
     * Enable auto closing brackets.
     * Defaults to true.
     */
    public autoClosingBrackets?: boolean;
    /**
     * Enable format on type.
     * Defaults to false.
     */
    public formatOnType?: boolean;
    /**
     * Enable the suggestion box to pop-up on trigger characters.
     * Defaults to true.
     */
    public suggestOnTriggerCharacters?: boolean;
    /**
     * Accept suggestions on ENTER.
     * Defaults to true.
     */
    public acceptSuggestionOnEnter?: boolean;
    /**
     * Enable snippet suggestions. Default to 'true'.
     */
    public snippetSuggestions?: 'top' | 'bottom' | 'inline' | 'none';
    /**
     * Enable tab completion. Defaults to 'false'
     */
    public tabCompletion?: boolean;
    /**
     * Enable word based suggestions. Defaults to 'true'
     */
    public wordBasedSuggestions?: boolean;
    /**
     * Enable selection highlight.
     * Defaults to true.
     */
    public selectionHighlight?: boolean;
    /**
     * Show code lens
     * Defaults to true.
     */
    public codeLens?: boolean;
    /**
     * Enable code folding
     * Defaults to true.
     */
    public folding?: boolean;
    /**
     * Enable rendering of whitespace.
     * Defaults to none.
     */
    public renderWhitespace?: 'none' | 'boundary' | 'all';
    /**
     * Enable rendering of control characters.
     * Defaults to false.
     */
    public renderControlCharacters?: boolean;
    /**
     * Enable rendering of indent guides.
     * Defaults to false.
     */
    public renderIndentGuides?: boolean;
    /**
     * Enable rendering of current line highlight.
     * Defaults to true.
     */
    public renderLineHighlight?: boolean;
    /**
     * Inserting and deleting whitespace follows tab stops.
     */
    public useTabStops?: boolean;
    /**
     * The font family
     */
    public fontFamily?: string;
    /**
     * The font weight
     */
    public fontWeight?: 'normal' | 'bold' | 'bolder' | 'lighter' | 'initial' | 'inherit' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
    /**
     * The font size
     */
    public fontSize?: number;
    /**
     * The line height
     */
    public lineHeight?: number;
    /**
     * Enable format on paste.
     * Defaults to false.
     */
    formatOnPaste?: boolean;

    /**
     * Content to show
     */
    public value: string;
    /**
     * Language of content to show
     */
    public language: IEditorLanguage;
}
