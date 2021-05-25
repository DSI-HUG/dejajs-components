/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { Destroy } from '@deja-js/component/core';
import { timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'deja-numeric-stepper',
    styleUrls: ['./numeric-stepper.component.scss'],
    templateUrl: './numeric-stepper.component.html',
    encapsulation: ViewEncapsulation.None
})
export class DejaNumericStepperComponent extends Destroy implements OnInit {
    @Output() public readonly increment = new EventEmitter<void>();
    @Output() public readonly decrement = new EventEmitter<void>();

    public left: number = null;
    public width: number = null;
    public topUp: number = null;
    public topDown: number = null;

    public constructor(
        private elementRef: ElementRef<HTMLElement>,
        private changeDetectorRef: ChangeDetectorRef
    ) {
        super();
    }

    public ngOnInit(): void {
        timer(100).pipe(
            takeUntil(this.destroyed$)
        ).subscribe(() => {
            // Find form field
            const parentElement = this.elementRef.nativeElement.parentElement;
            let formFieldElement = parentElement;
            // eslint-disable-next-line no-loops/no-loops
            while (formFieldElement) {
                if (formFieldElement.tagName === 'MAT-FORM-FIELD') {
                    break;
                }
                formFieldElement = formFieldElement.parentElement;
            }

            if (formFieldElement) {
                formFieldElement.setAttribute('deja-numeric-stepper-form-field', '');
            }

            const formFieldBounds = formFieldElement.getBoundingClientRect();
            const bounds = this.elementRef.nativeElement.getBoundingClientRect();

            this.left = formFieldBounds.left - bounds.left;
            this.topUp = formFieldBounds.top - bounds.top - 28;
            this.topDown = formFieldBounds.bottom - bounds.top - 10;
            this.width = formFieldBounds.width;
            this.changeDetectorRef.markForCheck();
        });
    }
}
