/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ElementRef, Input, OnDestroy, OnInit, Optional, Self, ViewChild } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { Circle, Position } from '@deja-js/core';
import { fromEvent as observableFromEvent, merge as observableMerge, Subject, Subscription } from 'rxjs';
import { debounceTime, filter, first, sampleTime, takeUntil, tap } from 'rxjs/operators';

const noop = () => { };

export enum ClockwiseFactorEnum {
    clockwise = -1,
    counterClockwise = 1,
}

export interface ICircularValue {
    position: Position;
    value: number;
}

/**
 * Circular-picker component for Angular
 */
@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'deja-circular-picker',
    styleUrls: ['./circular-picker.component.scss'],
    templateUrl: './circular-picker.component.html',
})
export class DejaCircularPickerComponent implements OnInit, ControlValueAccessor, OnDestroy {
    /** ClockwiseFactor allows user to choose rotation direction of picker */
    @Input() public clockwiseFactor: ClockwiseFactorEnum = ClockwiseFactorEnum.clockwise;
    /** Diameter of circular picker in pixels. Default 310px */
    @Input() public fullDiameter = 310;
    /** Diameter of labels on circular picker */
    @Input() public labelsDiameter = 43;

    /** Ranges of circular picker */
    @Input() public ranges: ICircularRange[];

    /** Template for labels inside picker. Use it to customize labels */
    @ContentChild('labelTemplate') public labelTemplate: any;
    /** template for cursor inside picker. Use it to customize labels */
    @ContentChild('cursorTemplate') public cursorTemplate: any;

    private _outerLabels = false;

    /**
     * Allows user to choose labels position. If outerLabels is true, labels will come outside the circular picker
     *
     * With outerLabels = true, and ranges.length > 1, labels will go outwards.
     * With outerLabels = false, and ranges.length > 1, labels will go inwards.
     */
    @Input()
    public set outerLabels(value: boolean | string) {
        this._outerLabels = coerceBooleanProperty(value) || null;
    }

    public get outerLabels() {
        return this._outerLabels;
    }

    /** disabled property setter. Can be string or empty so you can use it like : <circular-picker disabled></circular-picker> */
    @Input()
    public set disabled(value: boolean | string) {
        this._disabled = coerceBooleanProperty(value);
        this.changeDetectorRef.markForCheck();
    }

    /** To get disabled attribute. */
    public get disabled() {
        return this._disabled;
    }

    public onTouchedCallback: () => void = noop;
    public onChangeCallback: (_: any) => void = noop;

    private _disabled = false;

    private _value: number;
    private TwoPI = Math.PI * 2;

    private _radius = 0;
    private configs: IConfig[] = [];
    private selectedConfig: IConfig;

    private _circularValues: ICircularValue[] = [];

    private _cursor: ICircularValue;
    private _cursorHand: {
        width: number;
        angle: number;
    };
    private cursorElement: HTMLElement;

    private clickedTime: number;

    private mousedown$sub: Subscription;

    @ViewChild('picker', { static: true }) private picker: ElementRef;

    public get cursorHand() {
        return this._cursorHand;
    }

    public get cursor() {
        return this._cursor;
    }

    public get radius() {
        return this._radius;
    }

    public get circularValues() {
        return this._circularValues;
    }

    /**
     * Constructor.
     * Create MouseDown & mouseMove Observables needed inside this control.
     */
    constructor(elementRef: ElementRef, private changeDetectorRef: ChangeDetectorRef, @Self() @Optional() public _control: NgControl) {
        const element = elementRef.nativeElement as HTMLElement;

        if (this._control) {
            this._control.valueAccessor = this;
        }

        this.mousedown$sub = observableFromEvent(element, 'mousedown').pipe(
            filter(() => !this.disabled),
            filter((event: MouseEvent) => event.buttons === 1),
            debounceTime(100))
            .subscribe((mouseEvent: MouseEvent) => {
                this.clickedTime = Date.now();
                const cursorElement = this.getHTMLElement(mouseEvent.target as HTMLElement, 'cursor');
                const valueElement = this.getHTMLElement(mouseEvent.target as HTMLElement, 'value');
                if (cursorElement) {
                    this.cursorElement = cursorElement;
                } else if (valueElement) {
                    this.value = +valueElement.getAttribute('value');
                }

                if (cursorElement || valueElement) {
                    const kill$ = new Subject();

                    if (!element.ownerDocument.body.className.match(/noselect/)) {
                        element.ownerDocument.body.classList.add('noselect');
                    }

                    const cancelMouse$ = observableMerge(kill$, observableFromEvent(element.ownerDocument, 'mouseup')).pipe(
                        first(),
                        tap(() => {
                            delete this.cursorElement;
                            delete this.clickedTime;
                            element.ownerDocument.body.className = element.ownerDocument.body.className.replace(/\bnoselect\b/, '');
                        }));

                    const pickerElem = this.picker.nativeElement as HTMLElement;
                    const clientRect = pickerElem.getBoundingClientRect();

                    observableFromEvent(element.ownerDocument, 'mousemove').pipe(
                        takeUntil(cancelMouse$),
                        sampleTime(10))
                        .subscribe((event: MouseEvent) => {
                            if (event.buttons !== 1) {
                                kill$.next();
                                return;
                            }

                            let circle = Circle.fromOuterRect(clientRect);
                            let contains = false;
                            if (this.outerLabels) {
                                circle = circle.inflate(this.labelsDiameter);

                                for (const conf of this.configs) {
                                    contains = circle.containsPoint(new Position(event.pageX, event.pageY));
                                    if (contains) {
                                        this.selectedConfig = conf;
                                        break;
                                    } else {
                                        circle = circle.inflate(this.labelsDiameter);
                                    }
                                }
                            } else {
                                const x = this.labelsDiameter * (this.configs.length - 1);
                                circle = circle.inflate(-x);
                                for (let i = this.configs.length; i > 0; i--) {
                                    contains = circle.containsPoint(new Position(event.pageX, event.pageY));
                                    if (contains) {
                                        this.selectedConfig = this.configs[i - 1];
                                        break;
                                    } else {
                                        circle = circle.inflate(this.labelsDiameter);
                                    }
                                }
                            }

                            const newValue = this.pointToValue(event.pageX - clientRect.left, event.pageY - clientRect.top, this.selectedConfig);
                            if (newValue !== this.value) {
                                this.value = newValue;
                            }
                        });
                }
            });

    }

    /** Unsubscribe to Observables when component is destroyed */
    public ngOnDestroy() {
        this.mousedown$sub.unsubscribe();
    }

    /**
     * Init circular-picker configuration
     */
    public ngOnInit() {
        /* max - width */
        const diameter = this.fullDiameter - this.labelsDiameter; // Material standard button size
        this._radius = diameter / 2;

        this.ranges.forEach((range) => {
            range.interval = (range.interval) ? range.interval : 1;
            range.labelInterval = (range.labelInterval) ? range.labelInterval : 1;
            range.beginOffset = (range.beginOffset) ? range.beginOffset : Math.PI / 2;
            this.configs.push({
                range: range,
                stepAngle: this.TwoPI / Math.floor((range.max - range.min + 1) / range.interval),
                steps: Math.floor((range.max - range.min + 1) / range.interval),
            });
        });

        this.selectedConfig = this.configs[0];

        this.bind();
        this.updateCursor();
    }

    // ************* ControlValueAccessor Implementation **************
    /** set accessor including call the onchange callback */
    public set value(v: number) {
        if (v !== this._value) {
            this.writeValue(v);
            this.onChangeCallback(v);
        }
    }

    /** get accessor */
    public get value(): number {
        return this._value;
    }

    /** From ControlValueAccessor interface */
    public writeValue(value: number) {
        if (value !== this._value) {
            this._value = value;
            this.updateCursor();
        }
    }

    /** From ControlValueAccessor interface */
    public registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }

    /** From ControlValueAccessor interface */
    public registerOnTouched(fn: any) {
        this.onTouchedCallback = fn;
    }

    public setDisabledState(isDisabled: boolean) {
        this.disabled = isDisabled;
    }
    // ************* End of ControlValueAccessor Implementation **************

    /**
     * Take a point in parameter and return corresponding value
     *
     * @param x xPos of point
     * @param y yPos of point
     * @param config config where the point is located
     *
     * @return value
     */
    protected pointToValue(x: number, y: number, config: IConfig) {
        const angleAtPoint: number = this.pointToAngle(x - this._radius, y - this._radius, config);
        let circleSegmentIndexAtPoint: number = config.steps - Math.ceil(angleAtPoint / config.stepAngle);
        // By having pointToAngle() to compute using a half step below the actual angle,
        // we can use Math.ceil() to get the upper circleSegmentIndex. We're working in
        // counter-clockwise direction, thus we finally get a -1 index when we're just
        // below the first circle segment. We can now simply wrap it to the 0 index,
        // resulting in the user-expected behavior.
        if (circleSegmentIndexAtPoint < 0) {
            circleSegmentIndexAtPoint = config.steps;
        }
        return config.range.min + circleSegmentIndexAtPoint * config.range.interval;
    }

    /**
     * Take velue and returns its position
     * @param value value to check
     * @param radiusOffset Radius to ckeck (if outerLabels are on, the radius offset = fullDiameter + labelsDiameter)
     * @param config the config where to check
     *
     * @return the position of value
     */
    protected valueToPoint(value: number, radiusOffset: number, config: IConfig): Position {
        const position = new Position();
        const valueAngle: number = this.valueToAngle(value, config);

        position.left = this._radius + (this._radius + radiusOffset) * Math.cos(valueAngle);
        position.top = this._radius - (this._radius + radiusOffset) * Math.sin(valueAngle); // y axis is reversed in display

        return position;
    }

    private pointToAngle(x: number, y: number, config: IConfig): number {
        return (
            -Math.atan2(y, x)		    // Math.atan2() returns between -Ï€ and +Ï€, but in inverted trigonometrical order...
            - config.range.beginOffset	// Correct the configured offset to compute in 'natural' trigonometrical circle
            - (config.stepAngle / 2)	// Remove half a step angle to match value from both sides
            + this.TwoPI			    // We want the returned value to be between 0 and 2Ï€ => (x + 2Ï€) % 2Ï€
        ) % this.TwoPI;
    }

    private valueToAngle(value: number, config: IConfig): number {
        const circleSegmentIndex: number = Math.floor((value - config.range.min) / config.range.interval);
        return (circleSegmentIndex * config.stepAngle * this.clockwiseFactor) + config.range.beginOffset;
    }

    private bind() {
        this._circularValues = [];
        this.configs.forEach((config: IConfig, configNumber: number) => {
            for (let i = config.range.min; i <= config.range.max; i += (config.range.labelInterval * config.range.interval)) {
                const val = { value: i } as ICircularValue;
                const labelRadius = this.labelsDiameter / 2;
                const configOffset = this.labelsDiameter * configNumber;
                const labelPosition = this.valueToPoint(i, (this.outerLabels ? labelRadius + configOffset : -labelRadius - configOffset), config);

                val.position = new Position((labelPosition.left - labelRadius), (labelPosition.top - labelRadius));
                this._circularValues.push(val);
            }
        });
    }

    private updateCursor() {
        if (!this._circularValues || !this._circularValues.length) {
            return;
        }
        if (this._value === undefined || this._value === null) {
            this._value = this._circularValues[0].value;
        }
        this.selectedConfig = this.configs.find((conf: IConfig) => {
            if (this._value >= conf.range.min && this._value <= conf.range.max) {
                return true;
            }
        });
        if (!this.selectedConfig) {
            this.selectedConfig = this.configs[0];
        }
        const selectedConfigIndex = this.configs.indexOf(this.selectedConfig);
        let cursorCenter: Position;
        const cursorRadius: number = this.labelsDiameter / 2;

        cursorCenter = this.valueToPoint(this._value, (this.outerLabels ? cursorRadius + (this.labelsDiameter * selectedConfigIndex) : -cursorRadius - (this.labelsDiameter * selectedConfigIndex)), this.selectedConfig);
        this._cursor = {
            position: new Position((cursorCenter.left - cursorRadius), (cursorCenter.top - cursorRadius)),
            value: this._value,
        };

        this._cursorHand = {
            angle: this.valueToAngle(this._value, this.selectedConfig),
            width: (this.outerLabels) ? this._radius + (this.labelsDiameter * selectedConfigIndex) : this._radius - this.labelsDiameter - (this.labelsDiameter * selectedConfigIndex),
        };

        this.changeDetectorRef.markForCheck();
    }

    private getHTMLElement(element: HTMLElement, attr: string): HTMLElement {
        let parentElement = element;

        while (parentElement && !parentElement.hasAttribute(attr)) {
            element = parentElement;
            parentElement = parentElement.parentElement;
        }

        if (!parentElement) {
            return undefined;
        }

        return parentElement;
    }
}

export interface IConfig {
    range: ICircularRange;
    steps: number;
    stepAngle: number;
}

export interface ICircularRange {
    min: number;
    max: number;
    interval?: number;
    labelInterval?: number; // x*interval
    beginOffset?: number;
}
