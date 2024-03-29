/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, ElementRef, EventEmitter, Input, OnDestroy, Optional, Output, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { Color, MaterialColor } from '@deja-js/component/core/graphics';
import { BehaviorSubject, combineLatestWith, debounce, debounceTime, delay, distinctUntilChanged, filter, fromEvent, map, mergeWith, Observable, Subject, take, takeUntil, tap, timer } from 'rxjs';

import { DejaColorFab } from './color-fab.class';


export interface IColorEvent extends CustomEvent {
    color: Color;
}

/** Composant de selection d'une couleur. */
@Component({
    selector: 'deja-color-selector',
    styleUrls: [
        './color-selector.component.scss'
    ],
    templateUrl: './color-selector.component.html'
})
export class DejaColorSelectorComponent implements ControlValueAccessor, OnDestroy {
    private static INDEX_ATTRIBUTE = 'index';

    /** Evénement déclenché lorsqu'une couleur est survolée par la souris. */
    @Output() public readonly colorhover = new EventEmitter<IColorEvent>();

    public _resetcolor: Color;

    protected destroyed$ = new Subject<void>();

    private _value: Color;

    private _colors$ = new BehaviorSubject<Color[]>([]);

    private _resetcolor$ = new BehaviorSubject<Color>(null);

    private _colorFabs = [] as DejaColorFab[];
    private _subColorFabs = [] as DejaColorFab[];
    private _selectedBaseIndex = 0;
    private _selectedSubIndex: number;
    private _disabled = false;

    private _colorFabs$: Observable<DejaColorFab[]>;
    private selectedBaseIndex$ = new BehaviorSubject<number>(0);

    private _subColorFabs$: Observable<DejaColorFab[]>;
    private selectedSubIndex$ = new BehaviorSubject<number>(0);

    private hilightedBaseIndex: number;
    private hilightedBaseIndex$ = new Subject<number>();

    private hilightedSubIndex: number;
    private hilightedSubIndex$ = new Subject<number>();

    public get subColorFabs(): DejaColorFab[] {
        return this._subColorFabs;
    }

    public get subColorFabs$(): Observable<DejaColorFab[]> {
        return this._subColorFabs$;
    }

    public get colorFabs$(): Observable<DejaColorFab[]> {
        return this._colorFabs$;
    }

    @Input() public set resetcolor(value: string | Color) {
        if (value === '') {
            value = new Color();
        }
        const color = value && (typeof value === 'string' ? Color.parse(value) : value);
        this._resetcolor$.next(color || null);
    }

    public constructor(elementRef: ElementRef, @Self() @Optional() public control: NgControl) {
        const element = elementRef.nativeElement as HTMLElement;

        if (this.control) {
            this.control.valueAccessor = this;
        }

        this._colorFabs$ = this._colors$.pipe(
            map(colors => colors.map((color, index) => new DejaColorFab(color, this._disabled, index === this._selectedBaseIndex))),
            tap(colorFabs => this._colorFabs = colorFabs));

        this._colors$.pipe(
            combineLatestWith(this._resetcolor$),
            takeUntil(this.destroyed$)
        ).subscribe(([colors, resetcolor]) => {
            if (!colors || !colors.length || !resetcolor) {
                this._resetcolor = undefined;
                return;
            }

            const allColors = colors.reduce((acc, color) => {
                const materialColor = color as MaterialColor;
                if (materialColor.subColors) {
                    acc = [...acc, ...materialColor.subColors];
                } else {
                    acc.push(color);
                }
                return acc;
            }, [] as Color[]);

            let bestColor: Color;
            allColors.reduce((bestDiff, color) => {
                // The best formula we found for our eye
                const diff = 0.3 * Math.abs(color.r - resetcolor.r) + 0.4 * Math.abs(color.g - resetcolor.g) + 0.25 * Math.abs(color.b - resetcolor.b);
                if (diff < bestDiff) {
                    bestColor = color;
                    return diff;
                }
                return bestDiff;
            }, 3 * 255);

            this._resetcolor = bestColor;
        });

        const hilightedBaseIndex$ = this.hilightedBaseIndex$.pipe(
            distinctUntilChanged(),
            debounce(colorIndex => timer(colorIndex !== undefined ? 100 : 1000)),
            tap(colorIndex => {
                this.hilightedBaseIndex = colorIndex;
                const event = new CustomEvent('ColorEvent', {}) as IColorEvent;
                event.color = colorIndex ? this._colorFabs?.[colorIndex]?.color : this.value;
                this.colorhover.emit(event);
            }),
            map(colorIndex => colorIndex !== undefined ? colorIndex : this._selectedBaseIndex || 0)
        );

        const selectedBaseIndex$ = this.selectedBaseIndex$.pipe(
            tap(colorIndex => this._selectedBaseIndex = colorIndex)
        );

        this._subColorFabs$ = hilightedBaseIndex$.pipe(
            mergeWith(selectedBaseIndex$),
            distinctUntilChanged(),
            tap(colorIndex => {
                if (this._colorFabs) {
                    this._colorFabs.forEach((colorFab, index) => colorFab.active = index === colorIndex);
                }
            }),
            debounceTime(100),
            tap(() => element.setAttribute('sub-tr', '')),
            map(baseIndex => this._colorFabs?.[baseIndex] && (this._colorFabs[baseIndex].color as MaterialColor).subColors),
            map(colors => colors?.map((color, index) => new DejaColorFab(color, this._disabled, index === this._selectedSubIndex))),
            tap(subColorFabs => this._subColorFabs = subColorFabs)
        );

        this._subColorFabs$.pipe(
            delay(100),
            takeUntil(this.destroyed$)
        ).subscribe(() => element.removeAttribute('sub-tr'));

        const hilightedSubIndex$ = this.hilightedSubIndex$.pipe(
            distinctUntilChanged(),
            debounce(subColorIndex => timer(subColorIndex !== undefined ? 200 : 1100)),
            tap(subColorIndex => {
                this.hilightedSubIndex = subColorIndex;
                const event = new CustomEvent('ColorEvent', {}) as IColorEvent;
                event.color = subColorIndex !== undefined ? this._subColorFabs?.[subColorIndex]?.color : this.value;
                this.colorhover.emit(event);
            }),
            map(subColorIndex => subColorIndex !== undefined ? subColorIndex : this._selectedSubIndex || 0)
        );

        const selectedSubIndex$ = this.selectedSubIndex$.pipe(
            distinctUntilChanged(),
            tap(subColorIndex => this._selectedSubIndex = subColorIndex)
        );

        hilightedSubIndex$.pipe(
            mergeWith(selectedSubIndex$),
            filter(() => !!this._subColorFabs),
            takeUntil(this.destroyed$)
        ).subscribe(subColorIndex => this._subColorFabs.forEach((colorFab, index) => colorFab.active = index === subColorIndex));

        fromEvent<MouseEvent>(element, 'mousemove').pipe(
            filter(() => !this._disabled),
            takeUntil(this.destroyed$)
        ).subscribe(event => {
            const target = event.target as HTMLElement;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
            const targetIndex = (<any>target.attributes)[DejaColorSelectorComponent.INDEX_ATTRIBUTE];
            if (target.hasAttribute('basecolor')) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                this.hilightedBaseIndex$.next(+targetIndex.value);
                this.hilightedSubIndex$.next(this.hilightedSubIndex);
            } else if (target.hasAttribute('subcolor')) {
                this.hilightedBaseIndex$.next(this.hilightedBaseIndex);
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                this.hilightedSubIndex$.next(+targetIndex.value);
            } else {
                this.hilightedBaseIndex$.next(undefined);
                this.hilightedSubIndex$.next(undefined);
            }
        });

        fromEvent<Event>(element, 'click').pipe(
            filter(() => !this._disabled),
            takeUntil(this.destroyed$)
        ).subscribe(event => {
            const target = event.target as HTMLElement;
            if (target.hasAttribute('basecolor') || target.hasAttribute('subcolor')) {
                this.value = Color.parse(target.style.backgroundColor);
            }
        });
    }

    /** Retourne ou definit si le selecteur est desactivé. */
    @Input()
    public set disabled(value: BooleanInput) {
        const disabled = coerceBooleanProperty(value);
        if (this._colorFabs) {
            this._colorFabs.forEach(colorFab => colorFab.disabled = disabled);
        }
        if (this._subColorFabs) {
            this._subColorFabs.forEach(colorFab => colorFab.disabled = disabled);
        }
        this._disabled = disabled || null;
    }

    public get disabled(): BooleanInput {
        return this._disabled;
    }

    /**
     * Retourne la meilleure couleur d'affichage pour une couleur donnée
     */
    public getBestTextColor(value: string): string {
        const backColor = Color.fromHex(value);
        return backColor.bestTextColor.toHex();
    }

    public resetDefaultColor(): void {
        this.value = this._resetcolor;
    }

    /**
     * Definit les couleurs selectionables affichées.
     *
     * @param colors Structure hierarchique des couleurs selectionablea suivant le modele MaterialColor.
     */
    @Input()
    public set colors(colors: Color[]) {
        this._colors$.next(colors || []);
        this.selectedBaseIndex$.next(0);
    }

    public set selectedColor(color: Color) {
        const selectSubIndex = (index: number): void => {
            timer(1).pipe(
                take(1),
                takeUntil(this.destroyed$)
            ).subscribe(() => this.selectedSubIndex$.next(index));
        };

        if (this._colorFabs) {
            const find = this._colorFabs.find((colorFab, index) => {
                const baseColor = colorFab.color as MaterialColor;
                const subIndex = baseColor.subColors?.findIndex(subColor => Color.equals(subColor, color));
                if (subIndex !== undefined && subIndex >= 0) {
                    this.selectedBaseIndex$.next(index);
                    selectSubIndex(subIndex);
                    // Break
                    return true;
                } else if (Color.equals(baseColor, color)) {
                    this.selectedBaseIndex$.next(index);
                    selectSubIndex(0);
                    // Break
                    return true;
                }
                // Continue
                return false;
            });

            if (!find) {
                this.selectedBaseIndex$.next(0);
                selectSubIndex(0);
            }
        }
    }

    // ************* ControlValueAccessor Implementation **************
    // set accessor including call the onchange callback
    public set value(value: Color) {
        if (!Color.equals(value, this._value)) {
            this.writeValue(value);
            this.onChangeCallback(value);
        }
    }

    // get accessor
    public get value(): Color {
        return this._value;
    }

    // From ControlValueAccessor interface
    public writeValue(value: Color): void {
        this._value = value;
        this.selectedColor = value;
    }

    // From ControlValueAccessor interface
    public registerOnChange(fn: (_a: unknown) => void): void {
        this.onChangeCallback = fn;
    }

    // From ControlValueAccessor interface
    public registerOnTouched(fn: () => void): void {
        this.onTouchedCallback = fn;
    }

    public setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }
    // ************* End of ControlValueAccessor Implementation **************

    // ngModel
    public onTouchedCallback = (): void => undefined;
    public onChangeCallback = (_a: unknown): void => undefined;

    public ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.unsubscribe();
    }
}
