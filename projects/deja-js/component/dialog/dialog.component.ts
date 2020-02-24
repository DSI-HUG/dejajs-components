/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */
import { Component, ContentChild, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';
import { Destroy, KeyCodes } from '@deja-js/core';
import { fromEvent } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

/**
 * Simple dialog for Angular
 */
@Component({
    selector: 'deja-dialog',
    styleUrls: ['./dialog.component.scss'],
    templateUrl: './dialog.component.html',
})
export class DejaDialogComponent extends Destroy {
    /** Event emitted when dialog close action is called */
    @Output() public closed = new EventEmitter();

    @ContentChild('okaction') private okButton: any;
    @ContentChild('cancelaction') private cancelButton: any;

    /**
     * Constructor
     */
    constructor(elementRef: ElementRef) {
        super();

        const element = elementRef.nativeElement as HTMLElement;

        fromEvent(element.ownerDocument, 'keyup').pipe(
            filter((event: KeyboardEvent) => !!(event.code === KeyCodes.Enter && this.okButton?._elementRef) || !!(event.code === KeyCodes.Escape && this.cancelButton?._elementRef)),
            takeUntil(this.destroyed$)
        ).subscribe((event: KeyboardEvent) => {
            if (event.code === KeyCodes.Enter) {
                this.okButton._elementRef.nativeElement.click();
            } else if (event.code === KeyCodes.Escape) {
                this.cancelButton._elementRef.nativeElement.click();
            }
        });
    }

    /**
     * Listen on click on dialogComponent.
     * If click is not inside the dialog, close action is called.
     *
     * @param event
     */
    @HostListener('click', ['$event'])
    public close(event: MouseEvent) {

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
            event.preventDefault();
        }
    }
}
