/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, HostBinding, inject, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { MatLegacyFormFieldControl as MatFormFieldControl } from '@angular/material/legacy-form-field';
import { Destroy, filterMap, KeyCodes } from '@deja-js/component/core';
import { combineLatestWith, debounceTime, delay, filter, fromEvent, map, mergeWith, ReplaySubject, shareReplay, startWith, Subject, switchMap, takeUntil, tap, timer, withLatestFrom } from 'rxjs';

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

    @Output()
    public readonly increment = new EventEmitter<void>();

    @Output()
    public readonly decrement = new EventEmitter<void>();

    @Input()
    public input?: MatFormFieldControl<unknown>;

    @Input()
    public set arrowIcons(value: BooleanInput) {
        this._arrowIcons = coerceBooleanProperty(value);
    }

    public get arrowIcons(): BooleanInput {
        return this._arrowIcons;
    }

    @Input()
    public set showOnInit(value: BooleanInput) {
        this._showOnInit = coerceBooleanProperty(value);
    }

    public get showOnInit(): BooleanInput {
        return this._showOnInit;
    }

    @HostBinding('attr.hover')
    protected hover: boolean | null = null;

    public leftUp?: number;
    public leftDown?: number;
    public topUp?: number;
    public topDown?: number;
    public leftShadow?: number;
    public topShadow?: number;
    public widthShadow?: number;
    public heightShadow?: number;

    public disableUp = false;
    public disableDown = false;
    public clickArrow$ = new Subject<boolean>();
    public show$ = new ReplaySubject<void>(1);

    private validateArrows$ = new Subject<void>();
    private _arrowIcons = false;
    private _showOnInit = false;
    private arrowSize = 32;
    private parentAppearance: string | undefined;

    private elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
    private changeDetectorRef = inject(ChangeDetectorRef);

    public ngOnInit(): void {
        const calcPositions = (formFieldElement: HTMLElement, containerElement: HTMLElement | undefined, inputElement: HTMLInputElement): void => {
            const containerBounds = containerElement?.getBoundingClientRect();
            const formFieldBounds = formFieldElement?.getBoundingClientRect();
            const inputBounds = inputElement.getBoundingClientRect() || formFieldBounds;

            const bounds = this.elementRef.nativeElement.getBoundingClientRect();

            this.validateArrows$.next();

            // Ensure delayed hover in case of the mouse leave accidentally
            formFieldElement.setAttribute('hover', '');

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
                this.heightShadow = 90;
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
                let formFieldElement: HTMLElement | undefined;
                let containerElement: HTMLElement | undefined;
                let inputElement: HTMLInputElement | undefined;

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

                return [formFieldElement, containerElement, inputElement] as const;
            }),
            filterMap(([formFieldElement, _containerElement, inputElement]) => formFieldElement && inputElement && [formFieldElement, _containerElement, inputElement] as const || undefined),
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

                inputElement[fn]();
                this.input.ngControl.control.setValue(+inputElement.value);
            }
            this.validateArrows$.next();
        };

        const step$ = this.clickArrow$.pipe(
            debounceTime(10),
            withLatestFrom(linkedElements$),
            tap(([isUp, [_formFieldElement, _containerElement, inputElement]]) => {
                if (isUp && !this.disableUp) {
                    step(inputElement, 'increment', 'stepUp');
                }
                if (!isUp && !this.disableDown) {
                    step(inputElement, 'decrement', 'stepDown');
                }
            }),
            shareReplay({ bufferSize: 1, refCount: false })
        );

        const valueChange$ = linkedElements$.pipe(
            switchMap(([_formFieldElement, _containerElement, inputElement]) => fromEvent<void>(inputElement, 'input').pipe(
                mergeWith(step$, fromEvent<void>(inputElement, 'paste'), fromEvent<void>(inputElement, 'keypress'))
            )),
            debounceTime(50),
            startWith(undefined)
        );

        linkedElements$.pipe(
            switchMap(([formFieldElement, containerElement, inputElement]) => fromEvent<MouseEvent>(containerElement || formFieldElement, 'mouseenter').pipe(
                switchMap(() => valueChange$),
                mergeWith(this.show$.pipe(
                    delay(200)
                )),
                tap(() => calcPositions(formFieldElement, containerElement, inputElement)),
                switchMap(() => fromEvent<MouseEvent>(containerElement || formFieldElement, 'mouseleave')),
                delay(400),
                tap(() => {
                    formFieldElement.removeAttribute('hover');
                })
            )),
            takeUntil(this.destroyed$)
        ).subscribe();

        linkedElements$.pipe(
            switchMap(([formFieldElement]) => fromEvent<KeyboardEvent>(formFieldElement, 'keydown')),
            filter(event => event.code === String(KeyCodes.UpArrow) || event.code === String(KeyCodes.DownArrow)),
            takeUntil(this.destroyed$)
        ).subscribe(event => {
            this.clickArrow$.next(event.code === String(KeyCodes.UpArrow));
            event.preventDefault();
            return false;
        });

        linkedElements$.pipe(
            combineLatestWith(this.validateArrows$),
            debounceTime(1),
            takeUntil(this.destroyed$)
        ).subscribe(([[_formFieldElement, _containerElement, inputElement]]) => {
            if (inputElement.disabled) {
                this.disableDown = true;
                this.disableUp = true;
            } else {
                const min = inputElement.min;
                this.disableDown = min !== '' && !isNaN(+min) && +inputElement.value <= +min;

                const max = inputElement.max;
                this.disableUp = max !== '' && !isNaN(+max) && +inputElement.value >= +max;
            }

            this.changeDetectorRef.markForCheck();
        });

        step$.pipe(
            takeUntil(this.destroyed$)
        ).subscribe();

        if (this.showOnInit) {
            this.show$.next();
        }
    }
}
