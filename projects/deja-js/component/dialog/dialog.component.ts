/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */
import { Component, ContentChild, ElementRef, EventEmitter, HostListener, OnDestroy, Output } from '@angular/core';
import { KeyCodes } from '@deja-js/core';
import { fromEvent as observableFromEvent } from 'rxjs';
import { filter, takeWhile } from 'rxjs/operators';

/**
 * Simple dialog for Angular
 */
@Component({
    selector: 'deja-dialog',
    styleUrls: ['./dialog.component.scss'],
    templateUrl: './dialog.component.html',
})
export class DejaDialogComponent implements OnDestroy {
    /** Event emitted when dialog close action is called */
    @Output() public closed = new EventEmitter();

    @ContentChild('okaction') private okButton: any;
    @ContentChild('cancelaction') private cancelButton: any;

    private isAlive = true;

    /**
     * Constructor
     */
    constructor(elementRef: ElementRef) {
        const element = elementRef.nativeElement as HTMLElement;

        observableFromEvent(element.ownerDocument, 'keyup').pipe(
            takeWhile(() => this.isAlive),
            filter((event: KeyboardEvent) => !!(event.keyCode === KeyCodes.Enter && this.okButton && this.okButton._elementRef) || !!(event.keyCode === KeyCodes.Escape && this.cancelButton && this.cancelButton._elementRef)))
            .subscribe((event: KeyboardEvent) => {
                if (event.keyCode === KeyCodes.Enter) {
                    this.okButton._elementRef.nativeElement.click();
                }
                if (event.keyCode === KeyCodes.Escape) {
                    this.cancelButton._elementRef.nativeElement.click();
                }
            });
    }

    /** Unsubscribe to all observables when component is destroyed */
    public ngOnDestroy() {
        this.isAlive = false;
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
