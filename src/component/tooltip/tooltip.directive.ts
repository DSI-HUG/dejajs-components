import { Directive, ElementRef, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { clearTimeout, setTimeout } from 'timers';
import { DejaTooltipService } from '.';

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
    protected onMouseEnter() {
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
    protected onMouseLeave() {
        if (this.timeout) {
            clearTimeout(this.timeout);
            delete this.timeout;
        }
    }
}
