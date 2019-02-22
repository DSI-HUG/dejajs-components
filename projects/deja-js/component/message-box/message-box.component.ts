/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { coerceBooleanProperty } from '@angular/cdk/coercion';
import {Component, ContentChild, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'deja-message-box',
    styleUrls: ['./message-box.component.scss'],
    templateUrl: './message-box.component.html',
})
export class DejaMessageBoxComponent implements OnInit {
    @Input() public type: 'info' | 'primary' | 'success' | 'warn' | 'danger';
    @Input() public title: string;
    @Input() public icon: string;
    @Input() public actions: Array<{text?: string; type?: 'info' | 'primary' | 'success' | 'warn' | 'danger'; icon?: string; action(): any}>;
    /** Event Emmited when the close action is called */
    @Output() public close = new EventEmitter();
    @ContentChild('actionsTemplate') public actionsTemplate: any;

    private _horizontal: boolean;

    @Input()
    public set horizontal(value: boolean | string) {
        this._horizontal = coerceBooleanProperty(value);
    }

    public get horizontal() {
        return this._horizontal;
    }

    private _showCloseIcon = false;
    @Input()
    public set showCloseIcon(value: boolean | string) {
        this._showCloseIcon = coerceBooleanProperty(value);
    }

    public get showCloseIcon() {
        return this._showCloseIcon;
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

    public onClose() {
        this.close.emit();
    }

    private getIconFromType(type: 'info' | 'primary' | 'success' | 'warn' | 'danger'): string {
        switch (type) {
            case 'info':
            case 'primary':
                type = 'primary';
                return 'info_outline';
            case 'success':
                return 'done';
            case 'warn':
                return 'warning_outline';
            case 'danger':
                return 'error_outline';
            default:
                return null;
        }
    }
}
