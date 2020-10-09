/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Color } from '@deja-js/core';
import { BehaviorSubject, Subject } from 'rxjs';

export class DejaColorFab {
    public color$: Subject<Color>;
    public active$: Subject<boolean>;
    public disabled$: Subject<boolean>;

    // eslint-disable-next-line @typescript-eslint/naming-convention
    public constructor(private _color: Color, private _disabled = false, private _active = false) {
        this.color$ = new BehaviorSubject<Color>(_color);
        this.disabled$ = new BehaviorSubject<boolean>(_disabled);
        this.active$ = new BehaviorSubject<boolean>(_active);
    }

    public set color(value: Color) {
        this.color$.next(this._color = value);
    }

    public get color() {
        return this._color;
    }

    public set disabled(value: boolean) {
        this.disabled$.next(this._disabled = value);
    }

    public get disabled() {
        return this._disabled;
    }

    public set active(value: boolean) {
        this.active$.next(this._active = value);
    }

    public get active() {
        return this._active;
    }
}
