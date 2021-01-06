/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component } from '@angular/core';
import { Input } from '@angular/core';

@Component({
    selector: 'deja-item',
    template: ''
})
export class DejaItemComponent {
    @Input() public value: string;
    @Input() public text: string;

    @Input()
    public set selected(value: BooleanInput) {
        this._selected = coerceBooleanProperty(value);
    }

    public get selected(): BooleanInput {
        return this._selected;
    }

    private _selected: boolean;
}
