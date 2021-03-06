/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { Component } from '@angular/core';
import { ElementRef } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { HostBinding } from '@angular/core';
import { Input } from '@angular/core';
import { Optional } from '@angular/core';
import { Output } from '@angular/core';
import { Self } from '@angular/core';
import { ViewChild } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { NgControl } from '@angular/forms';
import { Color } from '@deja-js/component/core';
import { DejaConnectionPositionPair } from '@deja-js/component/core';
import { DejaOverlayComponent } from '@deja-js/component/overlay';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    selector: 'deja-color-picker',
    styleUrls: [
        './color-picker.component.scss'
    ],
    templateUrl: './color-picker.component.html'
})
export class DejaColorPickerComponent implements ControlValueAccessor {
    @HostBinding('attr.disabled') public _disabled: boolean = null;

    /** Retourne ou definit les couleurs selectionables affichées. */
    @Input() public colors: Color[];

    @Input() public resetcolor: string = null;

    /** Déclenché lorsqu'une couleur est survolée par la souris. */
    @Output() public readonly colorhover = new EventEmitter();

    /** Overlay pane containing the options. */
    @ViewChild(DejaOverlayComponent, { static: true }) private dejaOverlayCmp: DejaOverlayComponent;

    /** Internal use */
    public ownerElement: HTMLElement;

    private _small = false;
    private _value: Color;

    private _isOpen = false;

    /** Retourne ou definit si la partie déroulante est visible. */
    @Input()
    public set isOpen(value: BooleanInput) {
        this._isOpen = coerceBooleanProperty(value) || null;
    }

    public get isOpen(): BooleanInput {
        return this._isOpen;
    }

    private _positions = DejaConnectionPositionPair.default;

    @Input()
    public set positions(value: DejaConnectionPositionPair[] | string) {
        this._positions = typeof value === 'string' ? DejaConnectionPositionPair.parse(value) : value;
    }

    public get positions(): DejaConnectionPositionPair[] | string {
        return this._positions;
    }

    public constructor(elementRef: ElementRef, @Self() @Optional() public control: NgControl, private changeDetectorRef: ChangeDetectorRef) {
        if (this.control) {
            this.control.valueAccessor = this;
        }
        this.ownerElement = elementRef.nativeElement;
    }

    /** Retourne ou définit la taille du bouton. */
    @Input()
    public set small(value: BooleanInput) {
        this._small = coerceBooleanProperty(value);
    }

    public get small(): BooleanInput {
        return this._small;
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

    /** Affiche le color picker. */
    public show(event: MouseEvent): boolean {
        if (!this.disabled) {
            this.dejaOverlayCmp.show(event);
            this.isOpen = true;
            this.changeDetectorRef.markForCheck();
        }
        return false;
    }

    /** Ferme le color picker. */
    public close(): void {
        this.isOpen = false;
    }

    public onColorChange(color: Color): void {
        this.isOpen = false;
        this.value = color;
    }

    public getStyle(): { 'background-color': string } {
        const backgroundColor = this.value?.toHex();
        return backgroundColor ? { 'background-color': backgroundColor } : null;
    }

    protected onTouchedCallback = (): void => undefined;
    protected onChangeCallback = (_a: unknown): void => undefined;

}
