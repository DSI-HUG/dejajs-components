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

import {
    Component, ElementRef, EventEmitter, forwardRef, HostListener, Input,
    OnChanges, OnInit, Output, SimpleChanges,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { Observable, Subscription } from 'rxjs/Rx';
import { ValueAccessor } from "../../common/core/ngmodel/value-accessor";
import { ScaleService } from "./index";

const DejaScaleComponentValueAccessor = {
    multi: true,
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DejaScaleComponent),
};

export interface IZoomStep {
    value: string | number;
    label: string | number;
}

export interface IScale {
    value: string | number;
    label: string | number;
    zoomSteps?: IZoomStep[];
}

@Component({
    providers: [DejaScaleComponentValueAccessor],
    selector: 'deja-scale',
    styleUrls: ['./scale.component.scss'],
    templateUrl: './scale.component.html',
})
export class DejaScaleComponent extends ValueAccessor implements OnInit, OnChanges {

    @Input() public zoomEnabled = false as boolean;
    @Input() public zoomFactor = 20 as number;
    @Input() public zoomSteps = 2 as number;
    @Input() public zoomMarkerWidth = 20 as number;
    @Input() public zoomMarkerHeight = 20 as number;
    @Input() public zoomLabelXPos = "1rem" as string;
    @Input() public zoomLabelYPos = "0.25rem" as string;
    @Input() public labelFrequency = 5 as number;
    @Input() public labelXPos = "0rem" as string;
    @Input() public labelYPos = "1rem" as string;
    @Input() public horizontal = true as boolean;
    @Input() public steps = 100 as number;
    @Input() public min = 0 as number;
    @Input() public max = 100 as number;
    @Input() public labels: IScale[];
    @Output() public selectedValue = new EventEmitter<string>();
    public stepWidth: string;
    public stepHeight: string;
    public zoomStepWidth: string;
    public zoomStepHeight: string;
    public zoomStepHeightNumber: number;
    public zoomStepWidthNumber: number;

    private _mouseMoveObs: Subscription;
    private _markers = [] as IScale[];
    private _zoomSteps = [] as IZoomStep[];
    private _onInit = false as boolean;
    @Input() private toDelete: boolean;

    constructor(private _elementRef: ElementRef, private _service: ScaleService) {
        super();
    }

    public ngOnInit() {
        this.initScaleValues();
        this.setZoomSteps();
        this.setMarkers();
        this._onInit = true;
    }

    public getScale() {
        return this._markers;
    }

    public zoomStepXPos(index: number) {
        let x = this.zoomStepWidthNumber * index;
        return this.horizontal ? x + "%" : 0;
    }

    public zoomStepYPos(index: number) {
        let y = this.zoomStepHeightNumber * index;
        return this.horizontal ? 0 : y + "%";
    }

    public ngOnChanges(changes: SimpleChanges) {
        if (!this._onInit) {
            return;
        }

        if (changes['horizontal']) {
            this.initScaleValues();
        } else if (changes['max']) {
            this.setZoomSteps();
            this.setMarkers();
        } else if (changes['min']) {
            this.setZoomSteps();
            this.setMarkers();
        } else if (changes['steps']) {
            this.initScaleValues();
            this.setZoomSteps();
            this.setMarkers();
        } else if (changes['labels']) {
            this.setMarkers();
        } else if (changes['zoomEnabled']) {
            this.initScaleValues();
            this.setZoomSteps();
        } else if (changes['zoomSteps']) {
            this.initScaleValues();
            this.setZoomSteps();
            this.setMarkers();
        } else if (changes['zoomLabelXPos'] || changes['zoomLabelYPos']) {
            this.setMarkers();
        }
    }

    @HostListener('mousedown', ['$event'])
    protected onMouseDown(event: MouseEvent) {
        // ??? check this
        if (event.buttons !== 1) {
            return;
        }
        // verify if mousedown in  reduced zone to avoid setting mouseMove on whole component
        if (this.toDelete) {
            // Enable mouse observers
            this.mouseMove = true;
        }
    }

    @HostListener('mouseup', ['$event'])
    protected onMouseUp($event) {
        this.selectedValue.emit(this._service.getStepValueByEvent($event));
    }

    private set mouseMove(value: boolean) {
        let elem = this._elementRef.nativeElement as HTMLElement;
        if (value) {
            if (this._mouseMoveObs) {
                return;
            }

            this._mouseMoveObs = Observable.fromEvent(elem.ownerDocument, 'mousemove').subscribe((event: MouseEvent) => {
                if (event.buttons !== 1) {
                    // Mouse up
                    this.mouseMove = false;
                    return;
                }
            });
        } else if (this._mouseMoveObs) {
            this._mouseMoveObs.unsubscribe();
            delete this._mouseMoveObs;
        }
    }

    private getStepHeight() {
        return this.horizontal ? "0%" : (100 / (this.steps + 1)) + "%";
    }

    private getStepWidth() {
        return this.horizontal ? (100 / (this.steps + 1)) + "%" : "0%";
    }

    private getZoomStepHeightNumber() {
        return this.horizontal ? this.zoomMarkerHeight : (100 / (this.zoomSteps));

    }

    private getZoomStepWidthNumber() {
        return this.horizontal ? (100 / (this.zoomSteps)) : this.zoomMarkerWidth;
    }

    private initScaleValues() {
        this.stepHeight = this.getStepHeight();
        this.stepWidth = this.getStepWidth();
        // zoom SVGs nested, definition of viewport not possible in css (chrome)
        this.zoomStepHeightNumber = this.getZoomStepHeightNumber();
        this.zoomStepHeight = this.zoomStepHeightNumber + (this.horizontal ? "" : "%");
        this.zoomStepWidthNumber = this.getZoomStepWidthNumber();
        this.zoomStepWidth = this.zoomStepWidthNumber + (this.horizontal ? "%" : "");

    }

    private setMarkers() {

        this._markers.splice(0);

        if (this.model) {

        } else if (this.labels) {
            this._markers = this.labels;
        } else {

            let labelStep = (this.max - this.min) / this.steps as number;

            for (let i = 0; i <= this.steps; i++) {
                let label = this.min + i * labelStep;
                this._markers.push({ label: label, value: label, zoomSteps: this.getZoomStepsByValue(label) });
            }

        }
    }

    private getZoomStepsByValue(value: number) {
        let zoomStepsByValue = [] as IZoomStep[];
        this._zoomSteps.forEach((zoomStep: IZoomStep) => {
            let label = Number(zoomStep.value) + value;
            zoomStepsByValue.push({ label: label, value: label });
        });
        return zoomStepsByValue;
    }

    private setZoomSteps() {

        this._zoomSteps.splice(0);

        if (this.model || this.labels) {

        } else if (this.zoomSteps) {

            let step = (this.max - this.min) / this.steps;
            let zoomStep = step / this.zoomSteps;

            for (let i = 0; i < this.zoomSteps; i++) {
                let label = i * zoomStep;
                this._zoomSteps.push({ label: label, value: label });
            }

        }

    }

}
