/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, HostBinding, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { Destroy, KeyCodes } from '@deja-js/component/core';
import { combineLatest, fromEvent, Subject, timer } from 'rxjs';
import { debounceTime, delay, filter, map, shareReplay, switchMap, takeUntil, tap, withLatestFrom } from 'rxjs/operators';

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

    public disableUp = false;
    public disableDown = false;
    public clickArrow$ = new Subject<boolean>();

    private validateArrows$ = new Subject();

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

        const inputElement$ = formFieldElement$.pipe(
            map(formFieldElement => {
                const inputElements = formFieldElement.getElementsByTagName('INPUT');
                return inputElements?.[0] as HTMLInputElement || null;
            })
        );

        formFieldElement$.pipe(
            withLatestFrom(inputElement$),
            switchMap(([formFieldElement, inputElement]) => fromEvent<MouseEvent>(formFieldElement, 'mouseenter').pipe(
                switchMap(() => {
                    const formFieldBounds = formFieldElement.getBoundingClientRect();
                    const bounds = this.elementRef.nativeElement.getBoundingClientRect();

                    const inputBounds = inputElement?.getBoundingClientRect() || formFieldBounds;

                    this.validateArrows$.next();

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
            switchMap(formFieldElement => fromEvent<KeyboardEvent>(formFieldElement, 'keydown')),
            filter(event => event.code === KeyCodes.UpArrow || event.code === KeyCodes.DownArrow),
            takeUntil(this.destroyed$)
        ).subscribe(event => {
            this.clickArrow$.next(event.code === KeyCodes.UpArrow);
            event.preventDefault();
            return false;
        });

        combineLatest([inputElement$, this.validateArrows$]).pipe(
            debounceTime(1),
            filter(([inputElement]) => !!inputElement),
            takeUntil(this.destroyed$)
        ).subscribe(([inputElement]) => {
            const min = inputElement.min;
            if (min !== '' && !isNaN(+min)) {
                this.disableDown = +inputElement.value <= +min;
            }
            const max = inputElement.max;
            if (max !== '' && !isNaN(+max)) {
                this.disableUp = +inputElement.value >= +max;
            }
            this.changeDetectorRef.markForCheck();
        });

        this.clickArrow$.pipe(
            debounceTime(10),
            withLatestFrom(inputElement$),
            takeUntil(this.destroyed$)
        ).subscribe(([isUp, inputElement]) => {
            if (isUp && !this.disableUp) {
                if (inputElement && !!inputElement.stepUp && this.increment.observers.length === 0) {
                    inputElement.stepUp();
                } else {
                    this.increment.emit();
                }
                this.validateArrows$.next();
            }
            if (!isUp && !this.disableDown) {
                if (inputElement && !!inputElement.stepDown && this.decrement.observers.length === 0) {
                    inputElement.stepDown();
                } else {
                    this.decrement.emit();
                }
                this.validateArrows$.next();
            }
        });
    }
}
