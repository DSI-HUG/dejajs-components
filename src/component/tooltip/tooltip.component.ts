/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Component, ContentChild, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import 'rxjs/add/observable/fromEvent';
import { Observable } from 'rxjs/Observable';
import { Position } from '../../common/core/graphics/position';
import { Rect } from '../../common/core/graphics/rect';
import { DejaDropDownComponent } from '../dropdown/dropdown.component';
import { DejaTooltipService, ITooltipParams } from './tooltip.service';

/**
 * Customizable tooltip component for Angular2
 */
@Component({
    selector: 'deja-tooltip',
    templateUrl: 'tooltip.component.html',
    styleUrls: [
        './tooltip.component.scss',
    ],
})
export class DejaTooltipComponent implements OnInit {
    /** Element where tooltip can't overflow. Default is body. */
    @Input() public containerElement: ElementRef | HTMLElement;
    /** Tooltip name. Mandatory, and need to be unic */
    @Input() public name: string;
    /** Event Emmited when hide action is called */
    @Output() public hide = new EventEmitter();
    /** Reference to dropdown component inside this */
    @ViewChild('dropdown') public dropdown: DejaDropDownComponent;
    /** Template for tooltip content */
    @ContentChild('tooltipTemplate') public tooltipTemplate;

    /** Parameters of the tooltip */
    public params: ITooltipParams;
    private _model: any;

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
                const containerElement = this.dropdown.dropdownElement;
                const containerBounds = new Rect(containerElement.getBoundingClientRect());
                return !containerBounds.containsPoint(position);
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
