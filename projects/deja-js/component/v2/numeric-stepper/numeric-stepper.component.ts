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
import { combineLatestWith, debounceTime, delay, filter, fromEvent, map, mergeWith, shareReplay, startWith, Subject, switchMap, takeUntil, tap, timer, withLatestFrom } from 'rxjs';

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
    public leftShadow: number = null;
    public topShadow: number = null;
    public widthShadow: number = null;
    public heightShadow: number = null;

    public disableUp = false;
    public disableDown = false;
    public clickArrow$ = new Subject<boolean>();

    private validateArrows$ = new Subject<void>();
    private _arrowIcons = false;
    private arrowSize = 32;
    private parentAppearance: string = null;

    public constructor(
        private elementRef: ElementRef<HTMLElement>,
        private changeDetectorRef: ChangeDetectorRef
    ) {
        super();
    }

    public ngOnInit(): void {
        const calcPositions = (linkedElements: { formFieldElement: HTMLElement; containerElement: HTMLElement; inputElement: HTMLInputElement }): void => {
            const containerBounds = linkedElements.containerElement?.getBoundingClientRect();
            const formFieldBounds = linkedElements.formFieldElement?.getBoundingClientRect();
            const inputBounds = linkedElements.inputElement.getBoundingClientRect() || formFieldBounds;

            const bounds = this.elementRef.nativeElement.getBoundingClientRect();

            this.validateArrows$.next();

            // Ensure delayed hover in case of the mouse leave accidentally
            linkedElements.formFieldElement.setAttribute('hover', '');

            if (this.layout === 'horizontal') {
                this.heightShadow = Math.min(48, containerBounds?.height || formFieldBounds.height) + 2;
                this.topShadow = (containerBounds?.top ?? inputBounds.top + (inputBounds.height - this.heightShadow) / 2 - 5) - bounds.top;
                this.leftDown = this.leftShadow = formFieldBounds.left - bounds.left - 28;
                this.leftUp = formFieldBounds.right - bounds.left;
                this.widthShadow = this.leftUp - this.leftDown + 28;

                if (this.parentAppearance === 'LEGACY' || this.parentAppearance === 'STANDARD') {
                    this.heightShadow -= 6;
                } else if (this.parentAppearance === 'FILL') {
                    this.heightShadow -= 2;
                }

                this.topUp = this.topDown = inputBounds.top + (inputBounds.height - this.arrowSize) / 2 - bounds.top;

            } else if (this.layout === 'horizontal-inlay') {
                this.heightShadow = Math.min(48, containerBounds?.height || formFieldBounds.height) + 4;
                this.topShadow = containerBounds?.top ?? (inputBounds.top + (inputBounds.height - this.heightShadow) / 2 - 5) - bounds.top;
                this.leftDown = this.leftShadow = formFieldBounds.left - bounds.left;
                this.leftUp = formFieldBounds.right - bounds.left - 28;
                this.widthShadow = this.leftUp - this.leftDown + 28;

                if (this.parentAppearance === 'LEGACY' || this.parentAppearance === 'STANDARD') {
                    const addedPadding = 6;
                    this.widthShadow += addedPadding * 2;
                    this.leftDown -= addedPadding;
                    this.leftUp += addedPadding;
                    this.heightShadow -= addedPadding;
                    this.leftShadow -= addedPadding;
                } else if (this.parentAppearance === 'FILL') {
                    this.heightShadow -= 2;
                }

                this.topUp = this.topDown = inputBounds.top + (inputBounds.height - this.arrowSize) / 2 - bounds.top;

            } else {
                this.heightShadow = 106;
                this.topShadow = inputBounds.top - bounds.top + (inputBounds.height - this.heightShadow) / 2;
                this.leftShadow = (containerBounds?.left ?? formFieldBounds.left) - bounds.left;
                this.topUp = this.topShadow;
                this.topDown = this.topShadow + this.heightShadow - this.arrowSize;
                this.widthShadow = containerBounds?.width || formFieldBounds.width;
                this.leftUp = this.leftDown = formFieldBounds.left + (formFieldBounds.width - this.arrowSize) / 2 - bounds.left;
            }

            this.changeDetectorRef.markForCheck();
        };

        const linkedElements$ = timer(100).pipe(
            map(() => {
                // Find form field
                let parentElement = this.elementRef.nativeElement.parentElement;
                let formFieldElement: HTMLElement;
                let containerElement: HTMLElement;
                let inputElement: HTMLInputElement;

                // eslint-disable-next-line no-loops/no-loops
                while (parentElement) {
                    if (parentElement.tagName === 'MAT-FORM-FIELD' || parentElement.hasAttribute('deja-numeric-stepper-form-field')) {
                        formFieldElement = parentElement;
                    }
                    if (parentElement.hasAttribute('deja-numeric-stepper-container')) {
                        containerElement = parentElement;
                    }
                    if (containerElement && formFieldElement) {
                        break;
                    }
                    parentElement = parentElement.parentElement;
                }

                if (formFieldElement) {
                    formFieldElement.setAttribute('deja-numeric-stepper-form-field', this.layout);
                    this.parentAppearance = formFieldElement.getAttribute('appearance')?.toUpperCase();
                }

                if (!formFieldElement) {
                    console.error('deja-numeric-stepper work only inside a mat-form-field or a [deja-numeric-stepper-form-field] element');
                } else {
                    inputElement = formFieldElement.getElementsByTagName('INPUT')?.[0] as HTMLInputElement || null;

                    if (!inputElement) {
                        console.error('deja-numeric-stepper work only inside a mat-form-field or a [deja-numeric-stepper-form-field] element containing an input element');
                    }
                }

                return { formFieldElement, containerElement, inputElement };
            }),
            filter(containerElements => containerElements.formFieldElement && !!containerElements.inputElement),
            shareReplay(1)
        );

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

                if (isNaN(+inputElement.value) || inputElement.value === null || inputElement.value === '') {
                    inputElement.value = (!isNaN(+inputElement.min) && inputElement.min) || '0';
                } else {
                    inputElement[fn]();
                }

                this.input.ngControl.control.setValue(+inputElement.value);
            }
            this.validateArrows$.next();
        };

        const step$ = this.clickArrow$.pipe(
            debounceTime(10),
            withLatestFrom(linkedElements$),
            tap(([isUp, linkedElements]) => {
                if (isUp && !this.disableUp) {
                    step(linkedElements.inputElement, 'increment', 'stepUp');
                }
                if (!isUp && !this.disableDown) {
                    step(linkedElements.inputElement, 'decrement', 'stepDown');
                }
            })
        );

        const valueChange$ = linkedElements$.pipe(
            switchMap(linkedElements => fromEvent<void>(linkedElements.inputElement, 'input').pipe(
                mergeWith(step$, fromEvent<void>(linkedElements.inputElement, 'paste'), fromEvent<void>(linkedElements.inputElement, 'keypress'))
            )),
            debounceTime(50),
            startWith(null as void)
        );

        linkedElements$.pipe(
            switchMap(linkedElements => fromEvent<MouseEvent>(linkedElements.containerElement || linkedElements.formFieldElement, 'mouseenter').pipe(
                switchMap(() => valueChange$),
                tap(() => calcPositions(linkedElements)),
                switchMap(() => fromEvent<MouseEvent>(linkedElements.containerElement || linkedElements.formFieldElement, 'mouseleave')),
                delay(400),
                tap(() => {
                    linkedElements.formFieldElement.removeAttribute('hover');
                })
            )),
            takeUntil(this.destroyed$)
        ).subscribe();

        linkedElements$.pipe(
            switchMap(linkedElements => fromEvent<KeyboardEvent>(linkedElements.formFieldElement, 'keydown')),
            filter(event => event.code === KeyCodes.UpArrow || event.code === KeyCodes.DownArrow),
            takeUntil(this.destroyed$)
        ).subscribe(event => {
            this.clickArrow$.next(event.code === KeyCodes.UpArrow);
            event.preventDefault();
            return false;
        });

        linkedElements$.pipe(
            combineLatestWith(this.validateArrows$),
            debounceTime(1),
            takeUntil(this.destroyed$)
        ).subscribe(([linkedElements]) => {
            const min = linkedElements.inputElement.min;
            if (min !== '' && !isNaN(+min)) {
                this.disableDown = +linkedElements.inputElement.value <= +min;
            }
            const max = linkedElements.inputElement.max;
            if (max !== '' && !isNaN(+max)) {
                this.disableUp = +linkedElements.inputElement.value >= +max;
            }
            this.changeDetectorRef.markForCheck();
        });

        step$.pipe(
            takeUntil(this.destroyed$)
        ).subscribe();
    }
}
