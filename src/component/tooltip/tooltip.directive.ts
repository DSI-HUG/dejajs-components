/*
 * *
 *  @license
 *  Copyright Hôpital Universitaire de Genève All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/deja-js/blob/master/LICENSE
 * /
 *
 */

import { Directive, ElementRef, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { clearTimeout, setTimeout } from 'timers';
import { DejaTooltipService } from '.';
import { DejaTooltipComponent } from './tooltip.component';

@Directive({
    selector: '[deja-tooltip]',
})
export class DejaTooltipDirective implements OnInit {
    @Input('tooltip-model') public model: any;
    @Input('deja-tooltip') public name: string;
    @Output('tooltip-show') public show = new EventEmitter();

    private timeout: NodeJS.Timer;

    constructor(
        private elementRef: ElementRef,
        private tooltipService: DejaTooltipService,
    ) { }

    public ngOnInit() { }

    @HostListener('mouseenter', ['$event'])
    protected onMouseEnter(e: Event) {
        if (this.timeout) {
            clearTimeout(this.timeout);
            delete this.timeout;
        }
        
        this.timeout = setTimeout(() => {
            this.tooltipService.params[this.name] = {
                model: this.model,
                ownerElement: this.elementRef,
            };

            this.show.emit();
            delete this.timeout;
        }, 200);
    }

    @HostListener('mouseleave', ['$event'])
    protected onMouseLeave(e: Event) {
        if (this.timeout) {
            clearTimeout(this.timeout);
            delete this.timeout;
        }
    }
}
