/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Directive, ElementRef, Input } from '@angular/core';
import { Destroy } from '@deja-js/component/core';
import { fromEvent, Observable, switchMap, take, takeUntil, timer } from 'rxjs';

import { TooltipService } from './tooltip.service';


@Directive({
    selector: '[app-tooltip]'
})
export class TooltipDirective extends Destroy {
    // eslint-disable-next-line @angular-eslint/no-input-rename
    @Input('tooltip-delay') public delay = 600;

    @Input('app-tooltip') public openTooltip$: Observable<unknown>;

    public constructor(elementRef: ElementRef) {
        super();

        const triggerElement = elementRef.nativeElement as HTMLElement;

        const leave$ = fromEvent<MouseEvent>(triggerElement, 'mouseleave');

        fromEvent<MouseEvent>(triggerElement, 'mouseenter').pipe(
            switchMap(() => timer(this.delay).pipe(
                take(1),
                switchMap(() => {
                    TooltipService.CURRENT_TRIGGER_ELEMENT = triggerElement;
                    return this.openTooltip$;
                }),
                takeUntil(leave$)
            )),
            takeUntil(this.destroyed$)
        ).subscribe();
    }
}
