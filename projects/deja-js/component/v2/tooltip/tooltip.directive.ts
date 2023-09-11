/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Directive, ElementRef, inject, Input } from '@angular/core';
import { Destroy } from '@deja-js/component/core';
import { filter, fromEvent, Observable, of, switchMap, take, takeUntil, timer } from 'rxjs';

@Directive({
    selector: '[app-tooltip]'
})
export class TooltipDirective extends Destroy {
    // eslint-disable-next-line @angular-eslint/no-input-rename
    @Input('tooltip-delay')
    public delay = 300;

    @Input('app-tooltip')
    public openTooltip$?: (element: HTMLElement) => Observable<void>;

    private elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

    public constructor() {
        super();

        const triggerElement = this.elementRef.nativeElement;

        const leave$ = fromEvent<MouseEvent>(triggerElement, 'mouseleave');

        fromEvent<MouseEvent>(triggerElement, 'mouseenter').pipe(
            switchMap(() => timer(this.delay).pipe(
                take(1),
                filter(() => !!this.openTooltip$),
                switchMap(() => this.openTooltip$?.(triggerElement) || of(undefined)),
                takeUntil(leave$)
            )),
            takeUntil(this.destroyed$)
        ).subscribe();
    }
}
