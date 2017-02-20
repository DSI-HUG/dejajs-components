/*
 * *
 *  @license
 *  Copyright Hôpital Universitaire de Genève All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/deja-js/blob/master/LICENSE
 * /
 *
 */

import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { coerceBooleanProperty } from '@angular/material/core/coercion/boolean-property';
import { BehaviorSubject, Observable } from 'rxjs/Rx';
import { Color, ColorEvent } from '../../common/core/graphics/index';
import { MaterialColor } from '../../common/core/style';

const noop = () => { };

const ColorSelectorComponentAccessor = {
    multi: true,
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DejaColorSelectorComponent),
};

/** Composant de selection d'une couleur. */
@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        ColorSelectorComponentAccessor,
    ],
    selector: 'deja-color-selector',
    styleUrls: [
        './color-selector.component.scss',
    ],
    templateUrl: './color-selector.component.html',
})
export class DejaColorSelectorComponent implements ControlValueAccessor {
    private static colorAttribute = 'color';
    private static indexAttribute = 'index';

    /** Evénement déclenché lorsqu'une couleur est survolée par la souris. */
    @Output() public colorhover = new EventEmitter();

    protected onTouchedCallback: () => void = noop;
    protected onChangeCallback: (_: any) => void = noop;

    // ngModel
    private _value: Color;

    private _disabled = new BehaviorSubject<boolean>(null);
    private _varActive = new BehaviorSubject<boolean>(true);

    private selectedColor = new BehaviorSubject<Color>(null);
    private selectedBaseIndex: number;
    private selectedSubIndex: number;
    private _colors = new BehaviorSubject<MaterialColor[]>([]);
    private colors$: Observable<MaterialColor[]>;
    private subColors$: Observable<MaterialColor[]>;
    private activeBaseIndex = new BehaviorSubject<number>(0);

    constructor(private elementRef: ElementRef) {
        this.colors$ = Observable.from(this._colors);

        this.subColors$ = Observable.from(this.activeBaseIndex)
            .map((index) => {
                const colors$ = Observable.of(index)
                    .first()
                    .switchMap((i) => this.colors$.map((colors) => colors[i]).first())
                    .filter((color) => !!color)
                    .map((colors) => colors.subColors);

                if (index === this.selectedBaseIndex) {
                    return colors$;
                } else {
                    this.selectedBaseIndex = index;
                    return colors$
                        .do(() => this._varActive.next(false))
                        .debounceTime(100)
                        .do(() => {
                            Observable.timer(200).first().subscribe(() => {
                                this._varActive.next(true);
                            });
                        });
                }
            })
            .switchMap((colors) => colors);

        Observable.from(this.selectedColor)
            .subscribe((color) => {
                this.colors$
                    .first()
                    .subscribe((colors) => {
                        const selectedColor = colors.find((baseColor, baseIndex) => {
                            return !!baseColor.subColors.find((subColor, subIndex) => {
                                if (Color.equals(subColor, color)) {
                                    this.selectedSubIndex = subIndex;
                                    this.activeBaseIndex.next(baseIndex);
                                    return true;
                                }
                            });
                        });
                        if (!selectedColor) {
                            this.selectedSubIndex = undefined;
                            this.activeBaseIndex.next(0);
                        }
                        return !!selectedColor;
                    });
            });

        Observable.fromEvent(this.elementRef.nativeElement, 'mousemove')
            .switchMap((event: Event) => this._disabled.map((disabled) => disabled ? null : event).first())
            .filter((event: Event) => !!event)
            .map((event: Event) => {
                const { id, attributes } = event.target as HTMLElement;
                const targetColor = attributes[DejaColorSelectorComponent.colorAttribute];
                const targetIndex = attributes[DejaColorSelectorComponent.indexAttribute];
                let timeout: number;
                let baseIndex: number;
                if (id === 'basecolor') {
                    timeout = 100;
                    baseIndex = +targetIndex.value;
                } else if (id === 'subcolor') {
                    timeout = 10;
                } else {
                    timeout = 1000;
                    baseIndex = this.selectedBaseIndex;
                }
                return [timeout, targetColor, baseIndex, event];
            })
            .debounce(([timeout, _targetColor, _baseIndex, _event]) => Observable.timer(timeout))
            .do(([_timeout, targetColor, baseIndex, event]) => {
                if (baseIndex !== undefined) {
                    this.activeBaseIndex.next(baseIndex);
                }

                if (!targetColor) {
                    targetColor = this._value;
                }

                const e = new ColorEvent(event);
                e.initColorEvent('colorevent', true, false, targetColor && Color.fromHex(targetColor.value));
                this.colorhover.emit(e);
            })
            .subscribe(console.log);

        Observable.fromEvent(this.elementRef.nativeElement, 'click')
            .switchMap((event: Event) => this._disabled.map((disabled) => disabled ? null : event).first())
            .filter((event) => !!event)
            .subscribe((event) => {
                const target = event.target as HTMLElement;
                if (target.id === 'basecolor' || target.id === 'subcolor') {
                    // this.hoveredBaseIndex = undefined;
                    this.value = Color.fromHex(target.attributes[DejaColorSelectorComponent.colorAttribute].value);
                }
            });
    }

    /** Retourne ou definit si le selecteur est desactivé. */
    @Input()
    public set disabled(value: boolean) {
        this._disabled.next(coerceBooleanProperty(value) || null);
    }

    /**
     * Definit les couleurs selectionables affichées.
     *
     * @param colors    Structure hierarchique des couleurs selectionablea suivant le modele MaterialColor.
     */
    @Input()
    public set colors(colors: MaterialColor[]) {
        this._colors.next(colors);
        this.activeBaseIndex.next(0);
    }

    // ************* ControlValueAccessor Implementation **************
    // set accessor including call the onchange callback
    public set value(value: any) {
        if (!Color.equals(value, this._value)) {
            this.writeValue(value);
            this.onChangeCallback(value);
        }
    }

    // get accessor
    public get value(): any {
        return this._value;
    }

    // From ControlValueAccessor interface
    public writeValue(value: any) {
        this.selectedColor.next(value);
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
