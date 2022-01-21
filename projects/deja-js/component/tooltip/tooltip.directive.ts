/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Directive, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { DejaConnectionPositionPair, Destroy } from '@deja-js/component/core';
import { fromEvent, of } from 'rxjs';
import { delay, switchMap, takeUntil } from 'rxjs/operators';

import { DejaTooltipService } from './tooltip.service';

@Directive({
    selector: '[deja-tooltip]'
})
export class DejaTooltipDirective extends Destroy {
    // eslint-disable-next-line @angular-eslint/no-input-rename
    @Input('tooltip-delay') public delay = 600;
    // eslint-disable-next-line @angular-eslint/no-input-rename
    @Input('tooltip-model') public model: unknown;
    @Input('deja-tooltip') public name: string;
    // eslint-disable-next-line @angular-eslint/no-input-rename
    @Input('tooltip-positions') public positions: DejaConnectionPositionPair | string;
    // eslint-disable-next-line @angular-eslint/no-output-rename, @angular-eslint/no-output-native
    @Output('tooltip-show') public readonly show = new EventEmitter();

    public constructor(elementRef: ElementRef, tooltipService: DejaTooltipService) {
        super();

        const element = elementRef.nativeElement as HTMLElement;

        const leave$ = fromEvent(element, 'mouseleave');

        fromEvent(element, 'mouseenter').pipe(
            switchMap(e => of(e).pipe(
                delay(this.delay),
                takeUntil(leave$)
            )),
            takeUntil(this.destroyed$)
        ).subscribe(() => {
            tooltipService.params[this.name] = {
                model: this.model,
                ownerElement: elementRef,
                positions: this.positions
            };

            this.show.emit();
        });
    }
}
