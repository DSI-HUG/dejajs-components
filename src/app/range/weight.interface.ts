/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { IRange } from '@deja-js/component/range';

/**
 * IWeight interface
 * @export
 * @interface IWeight
 * @extends {IRange}
 */
export interface IWeight extends IRange {
    minWeight: number;
    maxWeight: number;
}

/**
 * IWeight class implementation
 * An example of non linear interpolation using logarithm
 * @export
 * @class Weight
 * @implements {IWeight}
 */
export class Weight implements IWeight {
    public min: number;
    public max: number;
    public $width: number;
    public constructor(public minWeight: number, public maxWeight: number) { }
}
