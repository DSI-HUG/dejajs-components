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

import { Directive, ElementRef, Input } from '@angular/core';
import { DragDropService, IDejaDragEvent, IDejaDragInfos } from './';

@Directive({
    host: {
        '(dragleave)': 'context ? onDragLeave($event) : null',
        '(dragover)': 'context ? onDragOver($event) : null',
        '(drop)': 'context ? onDrop($event) : null',
        '[attr.droppable]': 'context ? true : null',
    },
    selector: '[deja-droppable]',
})
export class DejaDroppableDirective {
    @Input('deja-droppable') public context: IDejaDropContext;

    private objectKey = 'object';
    private droppedKey = 'dropped';
    private elementKey = 'element';
    private lastTarget: EventTarget;
    private lastAccept: boolean;

    constructor(private elementRef: ElementRef, private dragDropService: DragDropService) { }

    protected onDragOver(event: Event) {
        if (this.lastTarget && this.lastTarget === event.target) {
            if (this.lastAccept) { 
                event.preventDefault();
            }
            return;
        }

        if (this.context && this.context.dragovercallback) {
            let dragInfos = this.dragDropService.dragInfos as IDejaDragInfos;
            let e = event as IDejaDropEvent;
            e.dragInfo = dragInfos;
            e.dragObject = dragInfos[this.objectKey];
            e.dragElement = this.elementRef.nativeElement;
            e.itsMe = dragInfos[this.elementKey] === this.elementRef.nativeElement;

            this.context.dragovercallback(e);
            this.lastTarget = event.target;
            this.lastAccept = e.defaultPrevented;
            if (e.defaultPrevented) {
                event.preventDefault();
            }
        }
    }

    protected onDrop(event) {
        if (this.context && this.context.dropcallback) {
            let dragInfos = this.dragDropService.dragInfos as IDejaDragInfos;
            let e = event as IDejaDropEvent;
            e.dragInfo = dragInfos;
            e.dragObject = dragInfos[this.objectKey];
            e.dragElement = this.elementRef.nativeElement;
            e.itsMe = dragInfos[this.elementKey] === this.elementRef.nativeElement;

            this.context.dropcallback(e);
            if (e.defaultPrevented) {
                e.dragInfo[this.droppedKey] = true;
                event.preventDefault();
            }
        }
    }

    protected onDragLeave(event) {

        if (this.context && this.context.dragleavecallback) {
            let element = this.elementRef.nativeElement as HTMLElement;
            let bounds = element.getBoundingClientRect();
            let inside = event.x >= bounds.left && event.x <= bounds.right && event.y >= bounds.top && event.y <= bounds.bottom;
            if (!inside) {
                let dragInfos = this.dragDropService.dragInfos as IDejaDragInfos;
                let e = event as IDejaDropEvent;
                e.dragInfo = dragInfos;
                e.dragObject = dragInfos[this.objectKey];
                e.dragElement = this.elementRef.nativeElement;
                e.itsMe = dragInfos[this.elementKey] === this.elementRef.nativeElement;

                this.context.dragleavecallback(e);
                if (e.defaultPrevented) {
                    event.preventDefault();
                }
            }
        }
    }
}

export interface IDejaDropEvent extends IDejaDragEvent {
    itsMe: boolean;
}

export interface IDejaDropContext { 
    dropcallback: (event: IDejaDropEvent) => void;
    dragovercallback: (event: IDejaDropEvent) => void;
    dragleavecallback: (event: IDejaDropEvent) => void;
}
