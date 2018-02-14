/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { coerceBooleanProperty } from '@angular/cdk/coercion';
import {
    ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, HostBinding, Input, Optional, Output, Self, ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { Color } from '../../common/core/graphics/color';
import { DejaConnectionPositionPair } from '../../common/core/overlay/connection-position-pair';
import { DejaOverlayComponent } from '../overlay/overlay.component';

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
export class DejaColorPickerComponent implements ControlValueAccessor {
    /** Retourne ou definit les couleurs selectionables affichées. */
    @Input() public colors: Color[];

    /** Retourne ou definit si la partie déroulante est visible. */
    @Input() public isOpen = false;

    @Input() public resetcolor: string = null;

    /** Déclenché lorsqu'une couleur est survolée par la souris. */
    @Output() public colorhover = new EventEmitter();

    /** Internal use */
    public ownerElement: HTMLElement;

    protected onTouchedCallback: () => void = noop;
    protected onChangeCallback: (_: any) => void = noop;

    private _small = false;
    private _value: Color;
    @HostBinding('attr.disabled') private _disabled: boolean = null;

    /** Overlay pane containing the options. */
    @ViewChild(DejaOverlayComponent) private dejaOverlayCmp: DejaOverlayComponent;

    private _positions = DejaConnectionPositionPair.default;

    @Input()
    public set positions(value: DejaConnectionPositionPair[] | string) {
        this._positions = typeof value === 'string' ? DejaConnectionPositionPair.parse(value) : value;
    }

    public get positions() {
        return this._positions;
    }

    constructor(elementRef: ElementRef, @Self() @Optional() public _control: NgControl, private changeDetectorRef: ChangeDetectorRef) {
        if (this._control) {
            this._control.valueAccessor = this;
        }
        this.ownerElement = elementRef.nativeElement;
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
        this.changeDetectorRef.markForCheck();
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
        this.changeDetectorRef.markForCheck();
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

    /** Affiche le color picker. */
    public show(event: MouseEvent) {
        if (this.disabled) {
            return false;
        }

        this.dejaOverlayCmp.show(event);
        this.isOpen = true;
        this.changeDetectorRef.markForCheck();
        return false;
    }

    /** Ferme le color picker. */
    public close() {
        this.isOpen = false;
    }

    public onColorChange(color: Color) {
        this.isOpen = false;
        this.value = color;
    }
}
