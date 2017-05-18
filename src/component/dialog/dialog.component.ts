import { ElementRef } from '@angular/core';
/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Component, ContentChild, EventEmitter, HostListener, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { KeyCodes } from '../../common/core/keycodes.enum';

@Component({
    selector: 'deja-dialog',
    styleUrls: ['./dialog.component.scss'],
    templateUrl: './dialog.component.html',
})
export class DejaDialogComponent {
    @Output() public closed = new EventEmitter();

    @ContentChild('okaction') private okButton;
    @ContentChild('cancelaction') private cancelButton;

    constructor(elementRef: ElementRef) {
        const element = elementRef.nativeElement as HTMLElement;

        Observable.fromEvent(element.ownerDocument, 'keyup')
            .filter((event: KeyboardEvent) => !!(event.keyCode === KeyCodes.Enter && this.okButton && this.okButton._elementRef) || !!(event.keyCode === KeyCodes.Escape && this.cancelButton && this.cancelButton._elementRef))
            .subscribe((event: KeyboardEvent) => {
                if (event.keyCode === KeyCodes.Enter) {
                    this.okButton._elementRef.nativeElement.click();
                }
                if (event.keyCode === KeyCodes.Escape) {
                    this.cancelButton._elementRef.nativeElement.click();
                }
            });
    }

    @HostListener('click', ['$event'])
    public close(event: MouseEvent) {
        event.preventDefault();

        let close = true;

        let target = event.target as HTMLElement;
        const element = event.currentTarget as HTMLElement;

        while (target.parentElement && target !== element) {
            if (target.className === 'dialog') {
                close = false;
            }
            target = target.parentElement;
        }

        if (close) {
            this.closed.emit();
        }
    }
}
