/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */
import { Component, ElementRef, Input, Output } from '@angular/core';
import { KeyCodes } from '@deja-js/component/core';
import { filter, fromEvent, map, mergeWith, Observable, ReplaySubject } from 'rxjs';

export type DialogResponse = 'ok' | 'cancel' | 'ignore' | 'retry' | 'yes' | 'no';

export enum DialogButtons {
    OK = 0x1,
    CANCEL = 0x2,
    IGNORE = 0x4,
    RETRY = 0x8,
    YES = 0x10,
    NO = 0x20
}

/**
 * Simple dialog for Angular
 */
@Component({
    selector: 'deja-dialog',
    styleUrls: ['./dialog.component.scss'],
    templateUrl: './dialog.component.html'
})
export class DejaDialogComponent {
    @Output() public readonly close$: Observable<DialogResponse | undefined>;

    @Input() public title?: string;
    @Input() public text?: string;
    @Input() public buttons?: DialogButtons;
    @Input() public defaultResponse: DialogResponse = 'ok';

    protected buttonClicked$ = new ReplaySubject<DialogResponse>(1);

    /**
     * Constructor
     */
    public constructor(elementRef: ElementRef<HTMLElement>) {
        this.close$ = fromEvent<KeyboardEvent>(elementRef.nativeElement.ownerDocument, 'keyup').pipe(
            filter(event => this.defaultResponse && event.code === KeyCodes.Enter || event.code === KeyCodes.Escape),
            map(event => {
                if (event.code === KeyCodes.Enter) {
                    return this.defaultResponse;
                }

                return undefined;
            }),
            mergeWith(this.buttonClicked$)
        );
    }

    protected hasControl(key: 'OK' | 'CANCEL' | 'IGNORE' | 'RETRY' | 'YES' | 'NO'): boolean {
        // eslint-disable-next-line no-bitwise
        return !!this.buttons && (this.buttons & DialogButtons[key]) !== 0;
    }
}
