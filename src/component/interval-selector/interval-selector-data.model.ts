/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

/**
 * data structure used to pass the model and the intervalId information to the DejaIntervalSelectorComponent component.
 *
 */
export class IntervalSelectorData {

    constructor(public intervalId: string, public model: any) {
    }
}
