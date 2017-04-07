/*
 * *
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 * /
 *
 */

import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs/Rx';

export enum ViewportMode {
    NoViewport,
    ConstantRowHeight,
    VariableRowHeight,
    AutoRowHeight,
}

/** Service de gestion du viewport d'une liste.
 * Ce service permet la gestion du viewport verticalement ou horizontalement.
 */
@Injectable()
export class ViewPortService {
    public viewPort$: Observable<IViewPort>;

    public mode$ = new ReplaySubject<ViewportMode | string>();
    public items$ = new ReplaySubject<IViewPortItem[]>();
    public maxSize$ = new ReplaySubject<number>();
    public element$ = new ReplaySubject<HTMLElement>();

    public viewPortResult$ = new ReplaySubject<IViewPort>();

    private _mode: ViewportMode = ViewportMode.ConstantRowHeight;

    public get mode() {
        return this._mode;
    }
    constructor() {
        Observable.from(this.mode$)
            .map((mode) => typeof mode === 'string' ? ViewportMode[mode] : mode)
            .subscribe((mode: ViewportMode) => this._mode = mode);

        this.viewPort$ = Observable.from(this.viewPortResult$);
    }
}

export interface IViewPort {
    beforeSize: number;
    afterSize: number;
    items: IViewPortItem[];
    startIndex: number;
    endIndex: number;
    startOffset: number;
}

export interface IViewPortItem {
    size?: number;
}
