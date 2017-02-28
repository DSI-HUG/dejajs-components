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

import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { coerceBooleanProperty } from '@angular/material/core/coercion/boolean-property';
import { setTimeout } from 'timers';
import { Color } from '../../common/core/graphics/color';
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
    @Output() public onClose = new EventEmitter();
    @Output() public onEdit = new EventEmitter();

    @Input() public set color(color: string) {
        let colorObj = Color.fromHex(color);
        if (colorObj.isEmpty()) {
            return;
        }
        this.backcolor = colorObj.toHex();
        this.forecolor = colorObj.bestTextColor.toHex();
    }

    @ViewChild(DejaEditableDirective) private title: DejaEditableDirective;

    private backcolor = '#3B4250';
    private forecolor = '#fff';
    private _designMode = false;

    constructor() {
    }

    @Input()
    public set designMode(value: boolean) {
        this._designMode = coerceBooleanProperty(value);
    }

    public get designMode() {
        return this._designMode;
    }

    protected edit() {
        setTimeout(() => {
            this.title.edit();
        }, 100);
    }
}
