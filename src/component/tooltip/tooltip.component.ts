/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { ConnectionPositionPair, OriginConnectionPosition, OverlayConnectionPosition, OverlayOrigin } from '@angular/cdk/overlay';
import { Component, ContentChild, ElementRef, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import 'rxjs/add/observable/fromEvent';
import { Observable } from 'rxjs/Observable';
import { Position } from '../../common/core/graphics/position';
import { Rect } from '../../common/core/graphics/rect';
import { DejaTooltipService, ITooltipParams } from './tooltip.service';

/**
 * Customizable tooltip component for Angular2
 */
@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'deja-tooltip',
    templateUrl: 'tooltip.component.html',
    styleUrls: [
        './tooltip.component.scss',
    ],
})
export class DejaTooltipComponent implements OnInit {
    /** Tooltip name. Mandatory, and need to be unic */
    @Input() public name: string;
    /** Event Emmited when hide action is called */
    @Output() public hide = new EventEmitter();
    /** Template for tooltip content */
    @ContentChild('tooltipTemplate') public tooltipTemplate;

    /** Parameters of the tooltip */
    public params: ITooltipParams;
    public overlayOrigin: OverlayOrigin;
    private _model: any;

    /**
     * This position config ensures that the top "start" corner of the overlay
     * is aligned with with the top "start" of the origin by default (overlapping
     * the trigger completely). If the panel cannot fit below the trigger, it
     * will fall back to a position above the trigger.
     */
    private _positions = [
        {
            originX: 'center',
            originY: 'bottom',
            overlayX: 'center',
            overlayY: 'top',
        },
        {
            originX: 'center',
            originY: 'top',
            overlayX: 'center',
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
        return this._positions;
    }

    public get model() {
        return this._model;
    }

    /**
     * Constructor
     * Subscribe to mouseover to know when tooltip must disappear.
     */
    constructor(elementRef: ElementRef, private tooltipService: DejaTooltipService) {
        const element = elementRef.nativeElement as HTMLElement;

        const hide$ = Observable.from(this.hide)
            .do(() => this._model = undefined);

        Observable.fromEvent(element.ownerDocument, 'mousemove')
            .takeUntil(hide$)
            .debounceTime(20)
            .filter(() => this._model)
            .map((event: MouseEvent) => new Position(event.pageX, event.pageY))
            .filter((position) => {
                const containerElement = document.elementFromPoint(position.left, position.top);
                let parentElement = containerElement;
                while (parentElement) {
                    if (parentElement.className === 'cdk-overlay-pane') {
                        return false;
                    }
                    parentElement = parentElement.parentElement;
                }
                return true;
            })
            .filter((position) => {
                const ownerElement = (this.params.ownerElement as ElementRef).nativeElement || this.params.ownerElement;
                const ownerRect = new Rect(ownerElement.getBoundingClientRect());
                return !ownerRect.containsPoint(position);
            })
            .delay(300)
            .subscribe(() => this.hide.emit());
    }

    /**
     * Init tooltip configuration
     * Check if ng-template model passed through param is an observable or a promise and resolve it before set.
     */
    public ngOnInit() {
        if (!this.name) {
            throw (new Error('Name is required'));
        }
        this.params = this.tooltipService.params[this.name];

        const ownerElement = (this.params.ownerElement as ElementRef).nativeElement || this.params.ownerElement;
        this.overlayOrigin = new OverlayOrigin(new ElementRef(ownerElement));

        const model$ = this.params.model as Observable<any>;
        if (!model$) {
            this._model = undefined;
        } else if (model$.subscribe) {
            model$.subscribe((model) => this._model = model, () => this.hide.emit());
        } else {
            const promise = this.params.model as Promise<any>;
            if (promise.then) {
                promise
                    .then((model) => this._model = model)
                    .catch(() => this.hide.emit());
            } else {
                this._model = this.params.model;
            }
        }
    }
}
