/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */
import { Component, ContentChild, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';
import { Destroy } from '@deja-js/component/core';
import { KeyCodes } from '@deja-js/component/core/text';
import { filter, fromEvent, takeUntil } from 'rxjs';

/**
 * Simple dialog for Angular
 */
@Component({
    selector: 'deja-dialog',
    styleUrls: ['./dialog.component.scss'],
    templateUrl: './dialog.component.html'
})
export class DejaDialogComponent extends Destroy {
    /** Event emitted when dialog close action is called */
    @Output() public readonly closed = new EventEmitter();

    @ContentChild('okaction') private okButton: { _elementRef: ElementRef<HTMLElement> };
    @ContentChild('cancelaction') private cancelButton: { _elementRef: ElementRef<HTMLElement> };

    /**
     * Constructor
     */
    public constructor(elementRef: ElementRef) {
        super();

        const element = elementRef.nativeElement as HTMLElement;

        fromEvent<KeyboardEvent>(element.ownerDocument, 'keyup').pipe(
            filter(event => !!(event.code === KeyCodes.Enter && this.okButton?._elementRef) || !!(event.code === KeyCodes.Escape && this.cancelButton?._elementRef)),
            takeUntil(this.destroyed$)
        ).subscribe(event => {
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
    public close(event: MouseEvent): void {

        let close = true;

        let target = event.target as HTMLElement;
        const element = event.currentTarget as HTMLElement;

        // eslint-disable-next-line no-loops/no-loops
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
