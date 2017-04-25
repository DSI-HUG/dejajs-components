/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Component, ContentChild, Input, OnInit } from '@angular/core';

@Component({
    selector: 'deja-message-box',
    styleUrls: ['./message-box.component.scss'],
    templateUrl: './message-box.component.html',
})
export class DejaMessageBoxComponent implements OnInit {
    @Input() public type: 'info' | 'primary' | 'success' | 'warn' | 'danger';
    @Input() public title: string;
    @Input() public icon: string;
    @Input() public actions: Array<{text?: string, type?: 'info' | 'primary' | 'success' | 'warn' | 'danger', icon?: string, action: () => any}>;
    @ContentChild('actionsTemplate') protected actionsTemplate;

    private _horizontal: boolean;

    @Input()
    public set horizontal(value: boolean | string) {
        this._horizontal = value != null && `${value}` !== 'false';
    }

    public get horizontal() {
        return this._horizontal;
    }

    constructor() { }

    public ngOnInit() {
        if (!this.icon && this.type) {
            this.icon = this.getIconFromType(this.type);
        }

        if (this.actions) {
            this.actions.forEach((action) => {
                if (!action.icon && action.type) {
                    action.icon = this.getIconFromType(action.type);
                }
            });
        }
    }

    private getIconFromType(type: 'info' | 'primary' | 'success' | 'warn' | 'danger'): string {
        switch (type) {
            case 'info':
            case 'primary':
                type = 'primary';
                return 'info_outline';
            case 'success':
                return 'check';
            case 'warn':
                return 'warning';
            case 'danger':
                return 'error_outline';
            default:
                return null;
        }
    }
}
