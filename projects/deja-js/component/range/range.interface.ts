/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

/**
 * IRange interface
 */
export interface IRange {
    min: number;
    max: number;
    trackBy?: unknown;
    $width?: number;
}

/**
 * IRange Generic Event
 */
export interface IRangeEvent extends Event {
    range: IRange;
    ranges: IRange[];
    index: number;
}

/**
 * IRange Step Event
 */
export interface IStepRangeEvent extends IRangeEvent {
    newMax: number;
}

/**
 * IRange class implementation
 */
export class Range implements IRange {
    public constructor(public min: number, public max: number, public $width?: number, public trackBy?: unknown) { }
}
