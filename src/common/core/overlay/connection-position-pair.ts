/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { ConnectionPositionPair, OriginConnectionPosition, OverlayConnectionPosition } from '@angular/cdk/overlay';

export class DejaConnectionPositionPair extends ConnectionPositionPair {
    public static parse(value: string) {
        const values = value.trim().split(',');
        const positions = [] as ConnectionPositionPair[];
        values.forEach(pos => {
            const poss = pos.trim().split(' ');
            if (poss.length !== 4) {
                throw new Error(`Invalid positions property for DejaMenuComponent. String entry must be of type 'positions="start top end bottom"'`);
            }

            const originPosition = {
                originX: poss[0],
                originY: poss[1],
            } as OriginConnectionPosition;

            const overlayPosition = {
                overlayX: poss[2],
                overlayY: poss[3],
            } as OverlayConnectionPosition;

            positions.push(new DejaConnectionPositionPair(originPosition, overlayPosition));
        });

        return positions;
    }

    public static get default() {
        return DejaConnectionPositionPair.parse('start bottom start top,start top start bottom, start top end bottom');
    }
}
