/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Component, ElementRef, EventEmitter, HostBinding, Input, Optional, Output, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { Color } from '../../common/core/graphics/index';
import { MaterialColor } from '../../common/core/style';

const noop = () => { };

@Component({
    selector: 'deja-color-picker',
    styleUrls: [
        './color-picker.component.scss',
    ],
    templateUrl: './color-picker.component.html',
})
export class DejaColorPickerComponent implements ControlValueAccessor {
    /** Retourne ou definit les couleurs selectionables affichées. */
    @Input() public colors: MaterialColor[];

    /** Retourne ou definit une référence sur le conteneur de la partie déroulante. Pare default le body sera seelctioné. */
    @Input() public dropdownContainerId: string;

    /** Retourne ou définit l'alignement de la partie déroulante par rapport au bouton. Les valeurs admissibles sont left right top bottom et peuvent être combinées. */
    @Input() public dropdownAlignment = 'left bottom';

    /** Retourne ou definit si la partie déroulante est visible. */
    @Input() public isOpen = false;

    /** Déclenché lorsqu'une couleur est survolée par la souris. */
    @Output() public colorhover = new EventEmitter();

    protected onTouchedCallback: () => void = noop;
    protected onChangeCallback: (_: any) => void = noop;

    private _small = false;
    @HostBinding('attr.disabled') private _disabled = null;
    private _value: Color;

    get containerElement() {
        return this.dropdownContainerId && this.elementRef.nativeElement.ownerDocument.getElementById(this.dropdownContainerId);
    }

    constructor(private elementRef: ElementRef, @Self() @Optional() public _control: NgControl) {
        if (this._control) {
            this._control.valueAccessor = this;
        }
    }

    /** Retourne ou définit la taille du bouton. */
    @Input()
    public set small(value: boolean | string) {
        this._small = value != null && `${value}` !== 'false';
    }

    public get small() {
        return this._small;
    }

    /** Retourne ou definit si le selecteur est desactivé. */
    @Input()
    public set disabled(value: boolean | string) {
        this._disabled = value != null && `${value}` !== 'false';
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

    protected onClick(event: Event) {
        if (this.disabled) {
            return;
        }

        const target = event.currentTarget as HTMLElement;
        if (target.id !== 'colorbtn' || target.ownerDocument.activeElement.id !== 'colorbtn') {
            return;
        }

        this.isOpen = !this.isOpen;
        return false;
    }

    protected onColorChange(color: Color) {
        this.isOpen = false;
        this.value = color;
    }
}
