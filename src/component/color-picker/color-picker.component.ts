/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ConnectionPositionPair, OriginConnectionPosition, OverlayConnectionPosition, OverlayOrigin } from '@angular/cdk/overlay';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, HostBinding, Input, OnDestroy, OnInit, Optional, Output, Self, ViewEncapsulation } from '@angular/core';
import { ObservableMedia } from '@angular/flex-layout';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Color } from '../../common/core/graphics/color';
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

    /**
 * This position config ensures that the top "start" corner of the overlay
 * is aligned with with the top "start" of the origin by default (overlapping
 * the trigger completely). If the panel cannot fit below the trigger, it
 * will fall back to a position above the trigger.
 */
    private _positions = [
        {
            originX: 'start',
            originY: 'bottom',
            overlayX: 'start',
            overlayY: 'top',
        },
        {
            originX: 'start',
            originY: 'top',
            overlayX: 'start',
            overlayY: 'bottom',
        },
        {
            originX: 'start',
            originY: 'top',
            overlayX: 'end',
            overlayY: 'bottom',
        },
    ] as ConnectionPositionPair[];

    @Input()
    public set positions(value: ConnectionPositionPair[] | string) {
        if (typeof value === 'string') {
            const values = value.split(',');
            this._positions = [];
            values.forEach(pos => {
                const poss = pos.split(' ');
                if (poss.length !== 4) {
                    throw new Error(`Invalid positions property for DejaMenuComponent. String entry must be of type 'positions="start top end bottom"'`);
                }

                const originPosition = {
                    originX: poss[0],
                    originY: poss[1],
                } as OriginConnectionPosition;

                const overlayPosition = {
                    overlayX: poss[2],
                    overlayY: poss[3],
                } as OverlayConnectionPosition;

                this._positions.push(new ConnectionPositionPair(originPosition, overlayPosition));
            });
        } else {
            this._positions = value;
        }
    }

    public get positions() {
        if (!this.isMobile) {
            return this._positions;
        }

        const originPosition = {
            originX: 'start',
            originY: 'top',
        } as OriginConnectionPosition;

        const overlayPosition = {
            overlayX: 'start',
            overlayY: 'top',
        } as OverlayConnectionPosition;

        return [new ConnectionPositionPair(originPosition, overlayPosition)];
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
