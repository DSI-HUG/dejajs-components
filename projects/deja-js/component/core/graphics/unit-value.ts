/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { NumberInput } from '@angular/cdk/coercion';

export class UnitValue {
    public value: number;
    public unit: string;

    public constructor(value?: NumberInput, unit?: string) {
        if (typeof value === 'string') {
            // eslint-disable-next-line @typescript-eslint/prefer-regexp-exec
            const match = value.match(/([0-9.]+)(.*)/);
            this.value = match && match.length >= 2 && parseInt(match[1], 10);
            this.unit = match && match.length >= 3 && match[2];
        } else {
            this.value = value;
            this.unit = unit;
        }
    }

    public static equals(s1: UnitValue, s2: UnitValue): boolean {
        return s1.value === s2.value && s1.unit === s2.unit;
    }

    public clone(): UnitValue {
        return new UnitValue(this.value, this.unit);
    }

    public toString(): string {
        return String(this.value) + this.unit;
    }

    public isInvalid(): boolean {
        return this.value === undefined || this.value === null || isNaN(this.value);
    }
}
