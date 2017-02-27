/*
 * *
 *  @license
 *  Copyright Hôpital Universitaire de Genève All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/deja-js/blob/master/LICENSE
 * /
 *
 */

import { Component, EventEmitter, HostBinding, Input, Output, ViewChild } from '@angular/core';
import { coerceBooleanProperty } from '@angular/material/core/coercion/boolean-property';
import { Observable, Subject } from 'rxjs/Rx';
import { DejaEditableDirective } from '../content-editable';
import { IDejaTile } from './';

@Component({
    selector: 'deja-tile-group',
    styleUrls: [
        './tile-group.component.scss',
    ],
    templateUrl: './tile-group.component.html',
})
export class DejaTileGroupComponent {
    @Input() public model: IDejaTile;
    @Output() public close = new EventEmitter();
    private edit$ = new Subject();

    @ViewChild(DejaEditableDirective) private title: DejaEditableDirective;
    @HostBinding('attr.design') private _designMode = false;

    constructor() {
        Observable.from(this.edit$)
            .debounceTime(100)
            .subscribe(() => this.title.edit());
    }

    @Input()
    public set designMode(value: boolean) {
        this._designMode = coerceBooleanProperty(value);
    }

    public get designMode() {
        return this._designMode;
    }
}
