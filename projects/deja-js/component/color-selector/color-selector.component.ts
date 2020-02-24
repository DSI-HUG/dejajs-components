/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, ElementRef, EventEmitter, Input, OnDestroy, Optional, Output, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { Color, MaterialColor } from '@deja-js/core';
import { BehaviorSubject, combineLatest, from, fromEvent, merge, Observable, Subject, timer } from 'rxjs';
import { debounce, debounceTime, delay, distinctUntilChanged, filter, first, map, takeUntil, tap } from 'rxjs/operators';
import { DejaColorFab } from './color-fab.class';

export interface IColorEvent extends CustomEvent {
    color: Color;
}

/** Composant de selection d'une couleur. */
@Component({
    selector: 'deja-color-selector',
    styleUrls: [
        './color-selector.component.scss',
    ],
    templateUrl: './color-selector.component.html',
})
export class DejaColorSelectorComponent implements ControlValueAccessor, OnDestroy {
    private static indexAttribute = 'index';

    /** Evénement déclenché lorsqu'une couleur est survolée par la souris. */
    @Output() public colorhover = new EventEmitter<IColorEvent>();

    public _resetcolor: Color;

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

    protected destroyed$ = new Subject();

    public get subColorFabs() {
        return this._subColorFabs;
    }

    public get subColorFabs$() {
        return this._subColorFabs$;
    }

    public get colorFabs$() {
        return this._colorFabs$;
    }

    @Input() public set resetcolor(value: string | Color) {
        if (value === '') { value = new Color(); }
        const color = value && (typeof value === 'string' ? Color.parse(value) : value);
        this._resetcolor$.next(color || null);
    }

    // ngModel
    public onTouchedCallback = (_a: any) => { };
    public onChangeCallback = (_a: any) => { };

    constructor(elementRef: ElementRef, @Self() @Optional() public _control: NgControl) {
        const element = elementRef.nativeElement as HTMLElement;

        if (this._control) {
            this._control.valueAccessor = this;
        }

        this._colorFabs$ = from(this._colors$).pipe(
            map((colors) => colors.map((color, index) => new DejaColorFab(color, this._disabled, index === this._selectedBaseIndex))),
            tap((colorFabs) => this._colorFabs = colorFabs));

        combineLatest(this._colors$, this._resetcolor$).pipe(
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
            }, []);

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

        const hilightedBaseIndex$ = from(this.hilightedBaseIndex$).pipe(
            distinctUntilChanged(),
            debounce((colorIndex) => timer(colorIndex !== undefined ? 100 : 1000)),
            tap((colorIndex) => {
                this.hilightedBaseIndex = colorIndex;
                const event = new CustomEvent('ColorEvent', {}) as IColorEvent;
                event.color = colorIndex ? this._colorFabs && this._colorFabs[colorIndex] && this._colorFabs[colorIndex].color : this.value;
                this.colorhover.emit(event);
            }),
            map((colorIndex) => colorIndex !== undefined ? colorIndex : this._selectedBaseIndex || 0)
        );

        const selectedBaseIndex$ = from(this.selectedBaseIndex$).pipe(
            tap((colorIndex) => this._selectedBaseIndex = colorIndex)
        );

        this._subColorFabs$ = merge(hilightedBaseIndex$, selectedBaseIndex$).pipe(
            distinctUntilChanged(),
            tap((colorIndex) => {
                if (this._colorFabs) {
                    this._colorFabs.forEach((colorFab, index) => colorFab.active = index === colorIndex);
                }
            }),
            debounceTime(100),
            tap(() => element.setAttribute('sub-tr', '')),
            map((baseIndex) => this._colorFabs && this._colorFabs[baseIndex] && (this._colorFabs[baseIndex].color as MaterialColor).subColors),
            map((colors) => colors?.map((color, index) => new DejaColorFab(color, this._disabled, index === this._selectedSubIndex))),
            tap((subColorFabs) => this._subColorFabs = subColorFabs)
        );

        this._subColorFabs$.pipe(
            delay(100),
            takeUntil(this.destroyed$)
        ).subscribe(() => element.removeAttribute('sub-tr'));

        const hilightedSubIndex$ = from(this.hilightedSubIndex$).pipe(
            distinctUntilChanged(),
            debounce((subColorIndex) => timer(subColorIndex !== undefined ? 200 : 1100)),
            tap((subColorIndex) => {
                this.hilightedSubIndex = subColorIndex;
                const event = new CustomEvent('ColorEvent', {}) as IColorEvent;
                event.color = subColorIndex !== undefined ? this._subColorFabs && this._subColorFabs[subColorIndex] && this._subColorFabs[subColorIndex].color : this.value;
                this.colorhover.emit(event);
            }),
            map((subColorIndex) => subColorIndex !== undefined ? subColorIndex : this._selectedSubIndex || 0)
        );

        const selectedSubIndex$ = from(this.selectedSubIndex$).pipe(
            distinctUntilChanged(),
            tap((subColorIndex) => this._selectedSubIndex = subColorIndex)
        );

        merge(hilightedSubIndex$, selectedSubIndex$).pipe(
            filter(() => !!this._subColorFabs),
            takeUntil(this.destroyed$)
        ).subscribe((subColorIndex) => this._subColorFabs.forEach((colorFab, index) => colorFab.active = index === subColorIndex));

        fromEvent(element, 'mousemove').pipe(
            filter(() => !this._disabled),
            takeUntil(this.destroyed$)
        ).subscribe(event => {
            const target = event.target as HTMLElement;
            const targetIndex = (<any>target.attributes)[DejaColorSelectorComponent.indexAttribute];
            if (target.hasAttribute('basecolor')) {
                this.hilightedBaseIndex$.next(+targetIndex.value);
                this.hilightedSubIndex$.next(this.hilightedSubIndex);
            } else if (target.hasAttribute('subcolor')) {
                this.hilightedBaseIndex$.next(this.hilightedBaseIndex);
                this.hilightedSubIndex$.next(+targetIndex.value);
            } else {
                this.hilightedBaseIndex$.next();
                this.hilightedSubIndex$.next();
            }
        });

        fromEvent(element, 'click').pipe(
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
    public set disabled(value: boolean | string) {
        const disabled = coerceBooleanProperty(value);
        if (this._colorFabs) {
            this._colorFabs.forEach((colorFab) => colorFab.disabled = disabled);
        }
        if (this._subColorFabs) {
            this._subColorFabs.forEach((colorFab) => colorFab.disabled = disabled);
        }
        this._disabled = disabled || null;
    }

    public get disabled() {
        return this._disabled;
    }

    /**
     * Retourne la meilleure couleur d'affichage pour une couleur donnée
     */
    public getBestTextColor(value: string) {
        const backColor = Color.fromHex(value);
        return backColor.bestTextColor.toHex();
    }

    public resetDefaultColor() {
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
        const selectSubIndex = (index: number) => {
            timer(1).pipe(
                first(),
                takeUntil(this.destroyed$)
            ).subscribe(() => this.selectedSubIndex$.next(index));
        };

        if (this._colorFabs) {
            const find = this._colorFabs.find((colorFab, index) => {
                const baseColor = colorFab.color as MaterialColor;
                const subIndex = baseColor.subColors?.findIndex((subColor) => Color.equals(subColor, color));
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
    public writeValue(value: Color) {
        this._value = value;
        this.selectedColor = value;
    }

    // From ControlValueAccessor interface
    public registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }

    // From ControlValueAccessor interface
    public registerOnTouched(fn: any) {
        this.onTouchedCallback = fn;
    }

    public setDisabledState(isDisabled: boolean) {
        this.disabled = isDisabled;
    }
    // ************* End of ControlValueAccessor Implementation **************

    public ngOnDestroy() {
        this.destroyed$.next();
        this.destroyed$.unsubscribe();
    }
}
