/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectorRef, Component, ElementRef, inject, Input, Output } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { filterMap } from '@deja-js/component/core';
import { Color, MaterialColor } from '@deja-js/component/core/graphics';
import { combineLatestWith, debounceTime, delay, EMPTY, filter, fromEvent, map, mergeWith, Observable, of, ReplaySubject, shareReplay, switchMap, take, timer } from 'rxjs';


export interface ColorEvent extends CustomEvent {
    color: Color;
}

const indexAttribute = 'index';

/** Composant de selection d'une couleur. */
@Component({
    selector: 'deja-color-selector',
    styleUrls: [
        './color-selector.component.scss'
    ],
    templateUrl: './color-selector.component.html'
})
export class DejaColorSelectorComponent implements ControlValueAccessor {

    /** Evénement déclenché lorsqu'une couleur est survolée par la souris. */
    @Output() public readonly colorHover$: Observable<ColorEvent>;

    protected subColors$: Observable<ReadonlyArray<Color> | undefined>;
    protected hilightedBaseIndex$: Observable<number>;
    protected hilightedSubIndex$: Observable<number>;
    protected selectedBaseIndex$: Observable<number>;
    protected selectedSubIndex$: Observable<number>;
    protected subColorsTransition$: Observable<boolean | null>;

    private _value?: Color;
    private _colors = new Array<Color>() as ReadonlyArray<Color>;
    private _disabled = false;
    private selectColor$ = new ReplaySubject<Color>(1);

    private elementRef = inject<ElementRef<HTMLElement>>(ElementRef<HTMLElement>);
    private control = inject(NgControl, { optional: true, self: true });
    private changeDetectorRef = inject(ChangeDetectorRef);

    public constructor() {
        const element = this.elementRef.nativeElement;

        if (this.control) {
            this.control.valueAccessor = this;
        }

        const clickedIndexes$ = fromEvent<Event>(element, 'click').pipe(
            filter(() => !this._disabled),
            filterMap(event => {
                const target = event.target as HTMLElement;
                const baseColorAttr = target.hasAttribute('basecolor');
                const subColorAttr = target.hasAttribute('subcolor');
                const indexAttr = target.getAttribute(indexAttribute);
                if (indexAttr !== null && indexAttr !== undefined && (baseColorAttr || subColorAttr)) {
                    this.value = Color.parse(target.style.backgroundColor);
                    return baseColorAttr ? [+indexAttr, 4] as const : [undefined, +indexAttr] as const;
                }
                return undefined;
            }),
            shareReplay({ refCount: false, bufferSize: 1 })
        ) as Observable<readonly [number | undefined, number]>;

        const selectedIndexes$ = this.selectColor$.pipe(
            map(selectedColor => {
                let subIndex = 4;
                const baseIndex = this._colors.findIndex(color => {
                    const baseColor = color as MaterialColor;
                    const si = baseColor.subColors?.findIndex(subColor => Color.equals(subColor, selectedColor));
                    if (si !== undefined && si >= 0) {
                        subIndex = si;
                        return true;
                    } else if (Color.equals(baseColor, selectedColor)) {
                        return true;
                    }
                    // Continue
                    return false;
                });

                return [baseIndex && baseIndex >= 0 ? baseIndex : 0, subIndex] as const;
            }),
            mergeWith(clickedIndexes$),
            shareReplay({ refCount: false, bufferSize: 1 })
        );

        this.selectedBaseIndex$ = selectedIndexes$.pipe(
            filterMap(([baseIndex]) => baseIndex),
            shareReplay({ refCount: false, bufferSize: 1 })
        );

        this.selectedSubIndex$ = selectedIndexes$.pipe(
            map(([_, subIndex]) => subIndex),
            shareReplay({ refCount: false, bufferSize: 1 })
        );

        const mousemove$ = fromEvent<MouseEvent>(element, 'mousemove').pipe(
            filter(() => !this._disabled),
            shareReplay({ refCount: false, bufferSize: 1 })
        );

        this.hilightedBaseIndex$ = mousemove$.pipe(
            switchMap(event => {
                const target = event.target as HTMLElement;
                const targetIndex = target.getAttribute(indexAttribute) || 0;
                if (target.hasAttribute('basecolor')) {
                    return of(+targetIndex);
                } else if (target.hasAttribute('subcolor')) {
                    return EMPTY;
                } else {
                    return timer(1000).pipe(
                        switchMap(() => this.selectedBaseIndex$),
                        take(1)
                    );
                }
            }),
            mergeWith(this.selectedBaseIndex$),
            shareReplay({ refCount: false, bufferSize: 1 })
        );

        this.hilightedSubIndex$ = mousemove$.pipe(
            switchMap(event => {
                const target = event.target as HTMLElement;
                const targetIndex = target.getAttribute(indexAttribute);
                if (target.hasAttribute('subcolor') && targetIndex !== null && targetIndex !== undefined) {
                    return of(+targetIndex);
                } else {
                    return timer(1000).pipe(
                        switchMap(() => this.selectedSubIndex$),
                        take(1)
                    );
                }
            }),
            mergeWith(this.selectedSubIndex$),
            shareReplay({ refCount: false, bufferSize: 1 })
        );

        this.subColors$ = this.hilightedBaseIndex$.pipe(
            mergeWith(this.selectedBaseIndex$),
            debounceTime(100),
            map(baseIndex => (this.colors?.[baseIndex] as MaterialColor)?.subColors),
            shareReplay({ refCount: false, bufferSize: 1 })
        );

        const cancelTransition$ = this.subColors$.pipe(
            delay(100),
            map(() => null as boolean | null)
        );

        this.subColorsTransition$ = this.subColors$.pipe(
            map(() => true),
            mergeWith(cancelTransition$),
            shareReplay({ refCount: false, bufferSize: 1 })
        );

        this.colorHover$ = this.hilightedSubIndex$.pipe(
            combineLatestWith(this.subColors$, this.hilightedBaseIndex$),
            filterMap(([subIndex, subColors]) => {
                const color = subColors?.[subIndex];
                return { color } as ColorEvent;
            }),
            shareReplay({ refCount: false, bufferSize: 1 })
        );
    }

    /** Retourne ou definit si le selecteur est desactivé. */
    @Input()
    public set disabled(value: BooleanInput) {
        this._disabled = coerceBooleanProperty(value);
        this.changeDetectorRef.markForCheck();
    }

    public get disabled(): BooleanInput {
        return this._disabled;
    }

    /**
     * Definit les couleurs selectionables affichées.
     *
     * @param colors Structure hierarchique des couleurs selectionablea suivant le modele MaterialColor.
     */
    @Input()
    public set colors(colors: ReadonlyArray<Color> | undefined) {
        this._colors = colors && [...colors] || new Array<Color>();
        if (this._value) {
            this.selectColor$.next(this._value);
        }
    }

    public get colors(): ReadonlyArray<Color> | undefined {
        return this._colors;
    }

    // ************* ControlValueAccessor Implementation **************
    // set accessor including call the onchange callback
    public set value(value: Color | undefined) {
        if (!Color.equals(value, this._value)) {
            this.writeValue(value);
            this.onChangeCallback(value);
        }
    }

    // get accessor
    public get value(): Color | undefined {
        return this._value;
    }

    // From ControlValueAccessor interface
    public writeValue(value: Color | undefined): void {
        this._value = value;
        if (value) {
            this.selectColor$.next(value);
        }
        this.changeDetectorRef.markForCheck();
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
}
