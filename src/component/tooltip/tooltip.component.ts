/*
 * *
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 * /
 *
 */

import { Component, ContentChild, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';

import { clearTimeout, setTimeout } from 'timers';

import { DejaDropDownComponent, Position, Rect } from '../../';
import { ITooltipParams } from './index';
import { DejaTooltipService } from './tooltip.service';

@Component({
    selector: 'deja-tooltip',
    templateUrl: 'tooltip.component.html',
})
export class DejaTooltipComponent implements OnInit {

    @ViewChild('dropdown') public dropdown: DejaDropDownComponent;
    @ContentChild('tooltipTemplate') public tooltipTemplate;
    @Input() public name: string;
    @Output() public hide = new EventEmitter();

    public params: ITooltipParams;
    private hideTimeout: NodeJS.Timer;
    private model: any;

    constructor(private tooltipService: DejaTooltipService) { }

    public ngOnInit() {
        if (!this.name) {
            throw (new Error('Name is required'));
        }
        this.params = this.tooltipService.params[this.name];

        let promise = this.params.model as Promise<any>;
        if (promise.then) {
            promise.then((model) => {
                this.model = model;
            }).catch(() => {
                this.hide.emit();
            });
        } else {
            this.model = this.params.model;
        }
    }

    @HostListener('document:mousemove', ['$event'])
    protected onMouseMove(e: MouseEvent) {
        let deleteTimeout = () => {
            if (this.hideTimeout) {
                clearTimeout(this.hideTimeout);
                delete this.hideTimeout;
            }
        };
        let containerElement = this.dropdown.dropdownElement;
        let containerBounds = new Rect(containerElement.getBoundingClientRect());

        let ownerElement = (this.params.ownerElement as ElementRef).nativeElement || this.params.ownerElement;
        let ownerRect = new Rect(ownerElement.getBoundingClientRect());

        let eventPosition = new Position(e.x, e.y);
        deleteTimeout();
        if (!containerBounds.containsPoint(eventPosition) && !ownerRect.containsPoint(eventPosition)) {
            this.hideTimeout = setTimeout(() => {
                delete this.hideTimeout;
                this.hide.emit();
            }, 50);
        }
    }
}
