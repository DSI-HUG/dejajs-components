/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { AfterContentInit, Directive, HostListener, OnDestroy } from '@angular/core';
import { NgControl } from '@angular/forms';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/takeWhile';

@Directive({
    selector: '[pending-onfocus]',
})
export class PendingOnFocusDirective implements AfterContentInit, OnDestroy {
    private hasFocus = false;
    private isAlive = true;

    constructor(public formControl: NgControl) {

    }

    public ngAfterContentInit() {
        this.formControl.control.valueChanges
            .takeWhile(() => this.isAlive)
            .filter(() => this.hasFocus)
            .subscribe(() => this.formControl.control.markAsPending());
    }

    public ngOnDestroy() {
        this.isAlive = false;
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
