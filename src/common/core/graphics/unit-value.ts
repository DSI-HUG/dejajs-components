/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

export class UnitValue {
    public value: number;
    public unit: string;

    public static equals(s1: UnitValue, s2: UnitValue) {
        return s1.value === s2.value && s1.unit === s2.unit;
    }

    constructor(value?: number | string, unit?: string) {
        if (typeof value === 'string') {
            const match = value.match(/([0-9\.]+)(.*)/);
            this.value = match.length >= 2 && parseInt(match[1], 10);
            this.unit = match.length >= 3 &&  match[2];
        } else { 
            this.value = value;
            this.unit = unit;
        }
    }

    public clone() {
        return new UnitValue(this.value, this.unit);
    }

    public toString() { 
        return String(this.value) + this.unit;
    }

    public isInvalid() { 
        return this.value && isNaN(this.value);
    }
}
