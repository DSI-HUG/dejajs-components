/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Color } from './color';
import { ColorEvent } from './color-event';

describe('ColorEvent', () => {
    const colorEvent = new ColorEvent(Color.parse('red'));

    it('should create the class', () => {
        expect(colorEvent.color.r).toBe(255);
        expect(colorEvent.color.g).toBe(0);
        expect(colorEvent.color.b).toBe(0);
    });
});
