/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { AfterContentInit, Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
    selector: '[pending-onfocus]',
})
export class PendingOnFocusDirective implements AfterContentInit {
    private hasFocus = false;

    constructor(public formControl: NgControl) {

    }

    public ngAfterContentInit() {
        this.formControl.control.valueChanges
            .filter(() => this.hasFocus)
            .subscribe(() => this.formControl.control.markAsPending());
    }

    @HostListener('focus')
    protected onFocus() {
        this.hasFocus = true;
    }

    @HostListener('blur')
    protected onBlur() {
        this.hasFocus = false;
        this.formControl.control.updateValueAndValidity();
    }
}
