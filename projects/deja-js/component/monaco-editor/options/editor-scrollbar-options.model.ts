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
export class EditorScrollbarOptions {
    /**
     * The size of arrows (if displayed).
     * Defaults to 11.
     */
    public arrowSize?: number;
    /**
     * Render vertical scrollbar.
     * Accepted values: 'auto', 'visible', 'hidden'.
     * Defaults to 'auto'.
     */
    public vertical?: string;
    /**
     * Render horizontal scrollbar.
     * Accepted values: 'auto', 'visible', 'hidden'.
     * Defaults to 'auto'.
     */
    public horizontal?: string;
    /**
     * Cast horizontal and vertical shadows when the content is scrolled.
     * Defaults to true.
     */
    public useShadows?: boolean;
    /**
     * Render arrows at the top and bottom of the vertical scrollbar.
     * Defaults to false.
     */
    public verticalHasArrows?: boolean;
    /**
     * Render arrows at the left and right of the horizontal scrollbar.
     * Defaults to false.
     */
    public horizontalHasArrows?: boolean;
    /**
     * Listen to mouse wheel events and react to them by scrolling.
     * Defaults to true.
     */
    public handleMouseWheel?: boolean;
    /**
     * Height in pixels for the horizontal scrollbar.
     * Defaults to 10 (px).
     */
    public horizontalScrollbarSize?: number;
    /**
     * Width in pixels for the vertical scrollbar.
     * Defaults to 10 (px).
     */
    public verticalScrollbarSize?: number;
    /**
     * Width in pixels for the vertical slider.
     * Defaults to `verticalScrollbarSize`.
     */
    public verticalSliderSize?: number;
    /**
     * Height in pixels for the horizontal slider.
     * Defaults to `horizontalScrollbarSize`.
     */
    public horizontalSliderSize?: number;
}
