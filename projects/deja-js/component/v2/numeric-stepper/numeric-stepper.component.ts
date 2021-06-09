/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, HostBinding, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { Destroy, KeyCodes } from '@deja-js/component/core';
import { fromEvent, timer } from 'rxjs';
import { delay, map, shareReplay, switchMap, takeUntil, tap } from 'rxjs/operators';

export type DejaNumericStepperLayout = 'vertical' | 'horizontal';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'deja-numeric-stepper',
    styleUrls: ['./numeric-stepper.component.scss'],
    templateUrl: './numeric-stepper.component.html',
    encapsulation: ViewEncapsulation.None
})
export class DejaNumericStepperComponent extends Destroy implements OnInit {
    @HostBinding('attr.layout') @Input() public layout: DejaNumericStepperLayout = 'vertical';
    @Output() public readonly increment = new EventEmitter<void>();
    @Output() public readonly decrement = new EventEmitter<void>();

    @HostBinding('attr.hover')
    protected hover = null as boolean;

    public leftUp: number = null;
    public leftDown: number = null;
    public topUp: number = null;
    public topDown: number = null;
    public width: number = null;
    public height: number = null;
    public leftShadow: number = null;
    public topShadow: number = null;
    public widthShadow: number = null;
    public heightShadow: number = null;

    public constructor(
        private elementRef: ElementRef<HTMLElement>,
        private changeDetectorRef: ChangeDetectorRef
    ) {
        super();
    }

    public ngOnInit(): void {
        const formFieldElement$ = timer(100).pipe(
            map(() => {
                // Find form field
                const parentElement = this.elementRef.nativeElement.parentElement;
                let formFieldElement = parentElement;
                // eslint-disable-next-line no-loops/no-loops
                while (formFieldElement) {
                    if (formFieldElement.tagName === 'MAT-FORM-FIELD' || formFieldElement.hasAttribute('deja-numeric-stepper-form-field')) {
                        break;
                    }
                    formFieldElement = formFieldElement.parentElement;
                }

                if (formFieldElement) {
                    formFieldElement.setAttribute('deja-numeric-stepper-form-field', '');
                }

                return formFieldElement;
            }),
            shareReplay(1)
        );

        formFieldElement$.pipe(
            switchMap(formFieldElement => fromEvent<MouseEvent>(formFieldElement, 'mouseenter').pipe(
                switchMap(() => {
                    const formFieldBounds = formFieldElement.getBoundingClientRect();
                    const bounds = this.elementRef.nativeElement.getBoundingClientRect();
                    const inputElements = formFieldElement.getElementsByTagName('INPUT');
                    const inputBounds = inputElements?.[0]?.getBoundingClientRect() || formFieldBounds;

                    // Ensure delayed hover in case of the mouse leave accidentally
                    formFieldElement.setAttribute('hover', '');

                    if (this.layout === 'horizontal') {
                        this.heightShadow = this.height = Math.min(48, formFieldBounds.height);
                        this.topShadow = this.topUp = this.topDown = inputBounds.top - bounds.top + (inputBounds.height - this.heightShadow) / 2;
                        this.leftDown = this.leftShadow = formFieldBounds.left - bounds.left - 28;
                        this.leftUp = formFieldBounds.right - bounds.left;
                        this.width = 32;
                        this.widthShadow = this.leftUp - this.leftDown + 32;

                    } else {
                        this.heightShadow = 106;
                        this.height = 32;
                        this.topShadow = inputBounds.top - bounds.top + (inputBounds.height - this.heightShadow) / 2;
                        this.leftUp = this.leftDown = this.leftShadow = formFieldBounds.left - bounds.left;
                        this.topUp = this.topShadow;
                        this.topDown = this.topShadow + this.heightShadow - this.height;
                        this.width = this.widthShadow = formFieldBounds.width;
                    }

                    this.changeDetectorRef.markForCheck();

                    return fromEvent<MouseEvent>(formFieldElement, 'mouseleave');
                }),
                delay(400),
                tap(() => {
                    formFieldElement.removeAttribute('hover');
                })
            )),
            takeUntil(this.destroyed$)
        ).subscribe();

        formFieldElement$.pipe(
            switchMap(formFieldElement => fromEvent<KeyboardEvent>(formFieldElement, 'keydown').pipe(
                map(event => {
                    if (event.code === KeyCodes.UpArrow) {
                        this.increment.emit();
                        event.preventDefault();
                        return false;
                    } else if (event.code === KeyCodes.DownArrow) {
                        this.decrement.emit();
                        event.preventDefault();
                        return false;
                    }

                    return undefined;
                })
            )),
            takeUntil(this.destroyed$)
        ).subscribe();
    }
}
