/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { OverlayOrigin } from '@angular/cdk/overlay';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, HostBinding, Input, OnDestroy, OnInit, Optional, Output, Self, ViewEncapsulation } from '@angular/core';
import { ObservableMedia } from '@angular/flex-layout';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Color } from '../../common/core/graphics/color';
import { DejaConnectionPositionPair } from '../../common/core/overlay/connection-position-pair';
import { MaterialColor } from '../../common/core/style';

const noop = () => { };

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    selector: 'deja-color-picker',
    styleUrls: [
        './color-picker.component.scss',
    ],
    templateUrl: './color-picker.component.html',
})
export class DejaColorPickerComponent implements ControlValueAccessor, OnInit, OnDestroy {
    /** Retourne ou definit les couleurs selectionables affichées. */
    @Input() public colors: MaterialColor[];

    /** Retourne ou definit si la partie déroulante est visible. */
    @Input() public isOpen = false;

    /** Déclenché lorsqu'une couleur est survolée par la souris. */
    @Output() public colorhover = new EventEmitter();

    /** Internal use */
    public overlayOrigin: OverlayOrigin;

    protected onTouchedCallback: () => void = noop;
    protected onChangeCallback: (_: any) => void = noop;

    private _small = false;
    private _value: Color;
    private contentInitialized$ = new Subject();
    private isMobile = false;
    private isAlive = true;
    @HostBinding('attr.disabled') private _disabled = null;

    private _positions = DejaConnectionPositionPair.default;

    @Input()
    public set positions(value: DejaConnectionPositionPair[] | string) {
        this._positions = typeof value === 'string' ? DejaConnectionPositionPair.parse(value) : value;
    }

    public get positions() {
        return !this.isMobile ? this._positions : DejaConnectionPositionPair.parse('start top start top');
    }

    public get width() {
        return !this.isMobile ? null : '100%';
    }

    constructor(private elementRef: ElementRef, @Self() @Optional() public _control: NgControl, private changeDetectorRef: ChangeDetectorRef, media: ObservableMedia) {
        if (this._control) {
            this._control.valueAccessor = this;
        }

        Observable.merge(this.contentInitialized$, media.asObservable())
            .takeWhile(() => this.isAlive)
            .subscribe(() => {
                this.isMobile = media.isActive('xs') || media.isActive('sm');
                this.changeDetectorRef.markForCheck();
            });
    }

    public ngOnDestroy() {
        this.isAlive = false;
    }

    public ngOnInit() {
        this.contentInitialized$.next();
    }

    /** Retourne ou définit la taille du bouton. */
    @Input()
    public set small(value: boolean | string) {
        this._small = coerceBooleanProperty(value);
    }

    public get small() {
        return this._small;
    }

    /** Retourne ou definit si le selecteur est desactivé. */
    @Input()
    public set disabled(value: boolean | string) {
        this._disabled = coerceBooleanProperty(value);
    }

    public get disabled() {
        return this._disabled;
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

    /** Affiche le color picker. */
    public show(event: MouseEvent) {
        if (this.disabled) {
            return false;
        }

        this.overlayOrigin = new OverlayOrigin(new ElementRef((this.isMobile && document.body) || (event && event.target) || this.elementRef.nativeElement));
        this.isOpen = true;
        this.changeDetectorRef.markForCheck();
        return false;
    }

    /** Ferme le color picker. */
    public close() {
        this.isOpen = false;
    }

    protected onColorChange(color: Color) {
        this.isOpen = false;
        this.value = color;
    }
}
