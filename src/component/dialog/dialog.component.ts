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

import { Component, EventEmitter, HostListener, Output } from '@angular/core';

@Component({
    selector: 'deja-dialog',
    styleUrls: ['./dialog.component.scss'],
    templateUrl: './dialog.component.html',
})
export class DejaDialogComponent {
    @Output() public closed = new EventEmitter();

    constructor() { }

    @HostListener('click', ['$event'])
    public close(event: MouseEvent) {
        event.preventDefault();

        let close = true;

        let target = event.target as HTMLElement; 
        const element = event.currentTarget as HTMLElement;
        
        while(target.parentElement && target !== element) {
            if(target.className === 'dialog') {
                close = false;
            } 
            target = target.parentElement;
        }

        if(close) {
            this.closed.emit();
        }
    }
}
