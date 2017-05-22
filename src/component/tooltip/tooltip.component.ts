/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Component, ContentChild, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Position } from '../../common/core/graphics/position';
import { Rect } from '../../common/core/graphics/rect';
import { DejaDropDownComponent } from '../dropdown/dropdown.component';
import { DejaTooltipService, ITooltipParams } from './tooltip.service';

@Component({
    selector: 'deja-tooltip',
    templateUrl: 'tooltip.component.html',
    styleUrls: [
        './tooltip.component.scss',
    ],
})
export class DejaTooltipComponent implements OnInit {
    @Input() public containerElement: ElementRef | HTMLElement;
    @Input() public name: string;
    @Output() public hide = new EventEmitter();
    @ViewChild('dropdown') public dropdown: DejaDropDownComponent;
    @ContentChild('tooltipTemplate') public tooltipTemplate;

    public params: ITooltipParams;
    private model: any;

    constructor(elementRef: ElementRef, private tooltipService: DejaTooltipService) {
        const element = elementRef.nativeElement as HTMLElement;

        const hide$ = Observable.from(this.hide)
            .do(() => this.model = undefined);

        Observable.fromEvent(element.ownerDocument, 'mousemove')
            .takeUntil(hide$)
            .debounceTime(20)
            .filter(() => this.model)
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

    public ngOnInit() {
        if (!this.name) {
            throw (new Error('Name is required'));
        }
        this.params = this.tooltipService.params[this.name];

        const model$ = this.params.model as Observable<any>;
        if (model$.subscribe) {
            model$.subscribe((model) => this.model = model, () => this.hide.emit());
        } else {
            const promise = this.params.model as Promise<any>;
            if (promise.then) {
                promise
                    .then((model) => this.model = model)
                    .catch(() => this.hide.emit());
            } else {
                this.model = this.params.model;
            }
        }
    }
}
