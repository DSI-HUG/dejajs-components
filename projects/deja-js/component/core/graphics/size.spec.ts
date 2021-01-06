/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Size } from './size';

describe('Size', () => {
    const size = new Size(20, 30);

    it('should create the class', () => {
        void expect(size instanceof Size).toBeTruthy();
        void expect(size.width).toBe(20);
        void expect(size.height).toBe(30);
    });

    it('should clone the size', () => {
        const cloned = size.clone();
        void expect(size === cloned).toBeFalsy();
        void expect(Size.equals(size, cloned)).toBeTruthy();
    });
});
