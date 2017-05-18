/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { Color } from '../../common/core/graphics/index';

export class DejaColorFab {
    public color$: Subject<Color>;
    public active$: Subject<boolean>;
    public disabled$: Subject<boolean>;

    constructor(private _color: Color, private _disabled: boolean, private _active: boolean) {
        this.color$ = new BehaviorSubject<Color>(_color);
        this.disabled$ = new BehaviorSubject<boolean>(_disabled);
        this.active$ = new BehaviorSubject<boolean>(_active);
    }

    public set color(value: Color) {
        this.color$.next(value);
    }

    public get color() {
        return this._color;
    }

    public set disabled(value: boolean) {
        this.disabled$.next(value);
    }

    public get disabled() {
        return this._disabled;
    }

    public set active(value: boolean) {
        this.active$.next(value);
    }

    public get active() {
        return this._active;
    }
}
