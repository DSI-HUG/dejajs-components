/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, HostBinding, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Destroy, KeyCodes } from '@deja-js/component/core';
import { combineLatestWith, debounceTime, delay, filter, fromEvent, map, shareReplay, Subject, switchMap, takeUntil, tap, timer, withLatestFrom } from 'rxjs';

export type DejaNumericStepperLayout = 'vertical' | 'horizontal' | 'horizontal-inlay';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'deja-numeric-stepper',
    styleUrls: ['./numeric-stepper.component.scss'],
    templateUrl: './numeric-stepper.component.html',
    encapsulation: ViewEncapsulation.None
})
export class DejaNumericStepperComponent extends Destroy implements OnInit {
    private static TYPE_ERROR = 'Input element on the same mat-form-field must be type="number". With other input type, use increment or decrement events and implement your proper functions to change the value.';
    private static STEP_FN_ERROR = 'Input element on the same mat-form-field must implement stepDown/stepUp functions.';
    private static INPUT_ERROR = 'To use the automatic binding, you must specify the input field with a matInput reference. [input]="matInputRef"';

    @HostBinding('attr.layout') @Input()
    public layout: DejaNumericStepperLayout = 'vertical';

    @Output() public readonly increment = new EventEmitter<void>();
    @Output() public readonly decrement = new EventEmitter<void>();

    @Input() public input: MatFormFieldControl<unknown>;

    @Input()
    public set arrowIcons(value: BooleanInput) {
        this._arrowIcons = coerceBooleanProperty(value);
    }

    public get arrowIcons(): BooleanInput {
        return this._arrowIcons;
    }

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
    public buttonPaddingTop = 0;

    public disableUp = false;
    public disableDown = false;
    public clickArrow$ = new Subject<boolean>();

    private validateArrows$ = new Subject<void>();
    private _arrowIcons = false;
    private parentAppearance: string = null;

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
                    formFieldElement.setAttribute('deja-numeric-stepper-form-field', this.layout);
                    this.parentAppearance = formFieldElement.getAttribute('appearance')?.toUpperCase();
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
                        this.heightShadow = this.height = Math.min(48, formFieldBounds.height) + 2;
                        this.topShadow = this.topUp = this.topDown = inputBounds.top - bounds.top + (inputBounds.height - this.heightShadow) / 2 - 5;
                        this.leftDown = this.leftShadow = formFieldBounds.left - bounds.left - 28;
                        this.leftUp = formFieldBounds.right - bounds.left;
                        this.width = 32;
                        this.widthShadow = this.leftUp - this.leftDown + 28;
                        this.buttonPaddingTop = 10;

                        if (this.parentAppearance === 'LEGACY' || this.parentAppearance === 'STANDARD') {
                            this.heightShadow -= 6;
                            this.height = this.heightShadow;
                            this.buttonPaddingTop = 12;
                        } else if (this.parentAppearance === 'FILL') {
                            this.heightShadow -= 2;
                            this.height = this.heightShadow;
                        }

                    } else if (this.layout === 'horizontal-inlay') {
                        this.heightShadow = this.height = Math.min(48, formFieldBounds.height) + 4;
                        this.topShadow = this.topUp = this.topDown = (inputBounds.top - bounds.top + (inputBounds.height - this.heightShadow) / 2) - 5;
                        this.leftDown = this.leftShadow = formFieldBounds.left - bounds.left;
                        this.leftUp = formFieldBounds.right - bounds.left - 28;
                        this.width = 32;
                        this.widthShadow = this.leftUp - this.leftDown + 28;
                        this.buttonPaddingTop = 10;

                        if (this.parentAppearance === 'LEGACY' || this.parentAppearance === 'STANDARD') {
                            const addedPadding = 6;
                            this.widthShadow += addedPadding * 2;
                            this.leftDown -= addedPadding;
                            this.leftUp += addedPadding;
                            this.heightShadow -= addedPadding;
                            this.leftShadow -= addedPadding;
                            this.height = this.heightShadow;
                            this.buttonPaddingTop = 14;
                        } else if (this.parentAppearance === 'FILL') {
                            this.buttonPaddingTop = 8;
                            this.heightShadow -= 2;
                            this.height = this.heightShadow;
                        }

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

        inputElement$.pipe(
            combineLatestWith(this.validateArrows$),
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

        const step = (inputElement: HTMLInputElement, event: 'increment' | 'decrement', fn: 'stepUp' | 'stepDown'): void => {
            if (this[event].observed) {
                this[event].emit();
            } else {
                if (inputElement?.type !== 'number') {
                    throw new Error(DejaNumericStepperComponent.TYPE_ERROR);
                }

                if (!inputElement[fn]) {
                    throw new Error(DejaNumericStepperComponent.STEP_FN_ERROR);
                }

                if (!this.input?.ngControl?.control) {
                    throw new Error(DejaNumericStepperComponent.INPUT_ERROR);
                }

                inputElement[fn]();
                this.input.ngControl.control.setValue(inputElement.value);
            }
            this.validateArrows$.next();
        };

        this.clickArrow$.pipe(
            debounceTime(10),
            withLatestFrom(inputElement$),
            takeUntil(this.destroyed$)
        ).subscribe(([isUp, inputElement]) => {
            if (isUp && !this.disableUp) {
                step(inputElement, 'increment', 'stepUp');
            }
            if (!isUp && !this.disableDown) {
                step(inputElement, 'decrement', 'stepDown');
            }
        });
    }
}
