/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Component, ElementRef, EventEmitter, Input, Optional, Output, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Color, ColorEvent } from '../../common/core/graphics/index';
import { MaterialColor } from '../../common/core/style';
import { DejaColorFab } from './index';

const noop = () => { };

/** Composant de selection d'une couleur. */
@Component({
    selector: 'deja-color-selector',
    styleUrls: [
        './color-selector.component.scss',
    ],
    templateUrl: './color-selector.component.html',
})
export class DejaColorSelectorComponent implements ControlValueAccessor {
    private static indexAttribute = 'index';

    /** Evénement déclenché lorsqu'une couleur est survolée par la souris. */
    @Output() public colorhover = new EventEmitter();

    // ngModel
    private _value: Color;
    protected onTouchedCallback: () => void = noop;
    protected onChangeCallback: (_: any) => void = noop;

    private _colors$ = new BehaviorSubject<Color[]>([]);

    private _colorFabs = [] as DejaColorFab[];
    private _subColorFabs = [] as DejaColorFab[];
    private _selectedBaseIndex = 0;
    private _selectedSubIndex: number;
    private _disabled = false;

    private colorFabs$: Observable<DejaColorFab[]>;
    private selectedBaseIndex$ = new BehaviorSubject<number>(0);

    private subColorFabs$: Observable<DejaColorFab[]>;
    private selectedSubIndex$ = new BehaviorSubject<number>(0);

    private hilightedBaseIndex: number;
    private hilightedBaseIndex$ = new Subject<number>();

    private hilightedSubIndex: number;
    private hilightedSubIndex$ = new Subject<number>();

    constructor(elementRef: ElementRef, @Self() @Optional() public _control: NgControl) {
        const element = elementRef.nativeElement as HTMLElement;

        if (this._control) {
            this._control.valueAccessor = this;
        }

        this.colorFabs$ = Observable.from(this._colors$)
            .map((colors) => colors.map((color, index) => new DejaColorFab(color, this._disabled, index === this._selectedBaseIndex)))
            .do((colorFabs) => this._colorFabs = colorFabs);

        const hilightedBaseIndex$ = Observable.from(this.hilightedBaseIndex$)
            .distinctUntilChanged()
            .debounce((colorIndex) => Observable.timer(colorIndex !== undefined ? 100 : 1000))
            .do((colorIndex) => {
                this.hilightedBaseIndex = colorIndex;
                if (colorIndex) {
                    const subColor = this._colorFabs && this._colorFabs[colorIndex] && this._colorFabs[colorIndex].color;
                    this.colorhover.emit(new ColorEvent(subColor));
                } else {
                    this.colorhover.emit(new ColorEvent(this.value));
                }
            })
            .map((colorIndex) => colorIndex !== undefined ? colorIndex : this._selectedBaseIndex || 0);

        const selectedBaseIndex$ = Observable.from(this.selectedBaseIndex$)
            .do((colorIndex) => this._selectedBaseIndex = colorIndex);

        this.subColorFabs$ = Observable.merge(hilightedBaseIndex$, selectedBaseIndex$)
            .distinctUntilChanged()
            .do((colorIndex) => {
                if (this._colorFabs) {
                    this._colorFabs.forEach((colorFab, index) => colorFab.active$.next(index === colorIndex));
                }
            })
            .debounceTime(100)
            .do(() => element.setAttribute('sub-tr', ''))
            .map((baseIndex) => this._colorFabs && this._colorFabs[baseIndex] && (this._colorFabs[baseIndex].color as MaterialColor).subColors)
            .map((colors) => colors && colors.map((color, index) => new DejaColorFab(color, this._disabled, index === this._selectedSubIndex)))
            .do((subColorFabs) => {
                this._subColorFabs = subColorFabs;
                Observable.timer(100).first().subscribe(() => {
                    element.removeAttribute('sub-tr');
                });
            });

        const hilightedSubIndex$ = Observable.from(this.hilightedSubIndex$)
            .distinctUntilChanged()
            .debounce((subColorIndex) => Observable.timer(subColorIndex !== undefined ? 200 : 1100))
            .do((subColorIndex) => {
                this.hilightedSubIndex = subColorIndex;
                if (subColorIndex !== undefined) {
                    const subColor = this._subColorFabs && this._subColorFabs[subColorIndex] && this._subColorFabs[subColorIndex].color;
                    this.colorhover.emit(new ColorEvent(subColor));
                } else {
                    this.colorhover.emit(new ColorEvent(this.value));
                }
            })
            .map((subColorIndex) => subColorIndex !== undefined ? subColorIndex : this._selectedSubIndex || 0);

        const selectedSubIndex$ = Observable.from(this.selectedSubIndex$)
            .distinctUntilChanged()
            .do((subColorIndex) => this._selectedSubIndex = subColorIndex);

        Observable.merge(hilightedSubIndex$, selectedSubIndex$)
            .subscribe((subColorIndex) => {
                if (this._subColorFabs) {
                    this._subColorFabs.forEach((colorFab, index) => colorFab.active$.next(index === subColorIndex));
                }
            });

        Observable.fromEvent(element, 'mousemove')
            .filter((_event) => !this._disabled)
            .subscribe((event: Event) => {
                const { id, attributes } = event.target as HTMLElement;
                const targetIndex = attributes[DejaColorSelectorComponent.indexAttribute];
                if (id === 'basecolor') {
                    this.hilightedBaseIndex$.next(+targetIndex.value);
                    this.hilightedSubIndex$.next(this.hilightedSubIndex);
                } else if (id === 'subcolor') {
                    this.hilightedBaseIndex$.next(this.hilightedBaseIndex);
                    this.hilightedSubIndex$.next(+targetIndex.value);
                } else {
                    this.hilightedBaseIndex$.next();
                    this.hilightedSubIndex$.next();
                }
            });

        Observable.fromEvent(element, 'click')
            .filter((_event) => !this._disabled)
            .subscribe((event: Event) => {
                const target = event.target as HTMLElement;
                if (target.id === 'basecolor' || target.id === 'subcolor') {
                    this.value = Color.parse(target.style.backgroundColor);
                }
            });
    }

    /** Retourne ou definit si le selecteur est desactivé. */
    @Input()
    public set disabled(value: boolean | string) {
        const disabled = (value != null && `${value}` !== 'false');
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
     * Definit les couleurs selectionables affichées.
     *
     * @param colors Structure hierarchique des couleurs selectionablea suivant le modele MaterialColor.
     */
    @Input()
    public set colors(colors: Color[]) {
        this._colors$.next(colors);
        this.selectedBaseIndex$.next(0);
    }

    public set selectedColor(color: Color) {
        if (this._colorFabs) {
            const find = this._colorFabs.find((colorFab, index) => {
                const baseColor = colorFab.color as MaterialColor;
                const subIndex = baseColor.subColors && baseColor.subColors.findIndex((subColor) => Color.equals(subColor, color));
                if (subIndex !== undefined && subIndex >= 0) {
                    this.selectedBaseIndex$.next(index);
                    Observable.timer(1).first().subscribe(() => this.selectedSubIndex$.next(subIndex));
                    // Break
                    return true;
                } else if (Color.equals(baseColor, color)) {
                    this.selectedBaseIndex$.next(index);
                    Observable.timer(1).first().subscribe(() => this.selectedSubIndex$.next(0));
                    // Break
                    return true;
                }
                // Continue
                return false;
            });
            if (!find) {
                this.selectedBaseIndex$.next(0);
                Observable.timer(1).first().subscribe(() => this.selectedSubIndex$.next(0));
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
    // ************* End of ControlValueAccessor Implementation **************
}
