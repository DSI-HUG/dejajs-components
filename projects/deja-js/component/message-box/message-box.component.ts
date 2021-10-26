/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, ContentChild, EventEmitter, Input, OnInit, Output, TemplateRef, ViewEncapsulation } from '@angular/core';

export type DejaMessageBoxType = 'info' | 'primary' | 'success' | 'warn' | 'danger';

export interface DejaMessageBoxAction {
    text?: string;
    type?: DejaMessageBoxType;
    icon?: string;
    action: () => unknown;
}

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'deja-message-box',
    styleUrls: ['./message-box.component.scss'],
    templateUrl: './message-box.component.html'
})
export class DejaMessageBoxComponent implements OnInit {
    // eslint-disable-next-line @angular-eslint/no-output-native
    @Output() public readonly close = new EventEmitter();

    @Input() public type: DejaMessageBoxType;
    @Input() public title: string;
    @Input() public icon: string;
    @Input() public actions: Array<DejaMessageBoxAction>;
    /** Event Emmited when the close action is called */
    @ContentChild('actionsTemplate') public actionsTemplate: TemplateRef<unknown>;

    private _horizontal: boolean;

    @Input()
    public set horizontal(value: BooleanInput) {
        this._horizontal = coerceBooleanProperty(value);
    }

    public get horizontal(): BooleanInput {
        return this._horizontal;
    }

    private _showCloseIcon = false;
    @Input()
    public set showCloseIcon(value: BooleanInput) {
        this._showCloseIcon = coerceBooleanProperty(value);
    }

    public get showCloseIcon(): BooleanInput {
        return this._showCloseIcon;
    }

    public ngOnInit(): void {
        if (!this.icon && this.type) {
            this.icon = this.getIconFromType(this.type);
        }

        if (this.actions) {
            this.actions.forEach(action => {
                if (!action.icon && action.type) {
                    action.icon = this.getIconFromType(action.type);
                }
            });
        }
    }

    public onClose(): void {
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
