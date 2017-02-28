/*
 * *
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/deja-js/blob/master/LICENSE
 * /
 *
 */

import { Directive, ElementRef, Input } from '@angular/core';
import { UUID } from '../../common/core';
import { DragDropService } from './dragdrop.service';
import { IDejaDragInfos } from './index';

@Directive({
    host: {
        '(dragend)': 'context !== null ? onDragEnd($event) : null',
        '(dragstart)': 'context !== null ? onDragStart($event) : null',
        '[attr.dragdropid]': 'dragdropid',
        '[attr.draggable]': 'context !== null ? true : null',
    },
    selector: '[deja-draggable]',
})
export class DejaDraggableDirective {
    @Input('deja-draggable') public context: IDejaDragContext;

    private dragdropid;
    private objectKey = 'object';
    private elementKey = 'element';
    private uuidKey = 'uuid';

    constructor(private elementRef: ElementRef, private dragDropService: DragDropService) {
    }

    protected onDragStart(event: DragEvent) {
        this.dragdropid = new UUID().toString();
        this.dragDropService.dragInfos[this.uuidKey] = this.dragdropid;

        let object = (this.context && this.context.object) || this.elementRef.nativeElement;
        this.dragDropService.dragInfos[this.objectKey] = object;
        this.dragDropService.dragInfos[this.elementKey] = this.elementRef.nativeElement;

        if (object) {
            object.dragged = true;
        }

        if (this.context && this.context.dragstartcallback) {
            let e = event as IDejaDragEvent;
            e.dragInfo = this.dragDropService.dragInfos;
            e.dragObject = this.context.object;
            e.dragElement = this.elementRef.nativeElement;
            this.context.dragstartcallback(e);

            if (e.defaultPrevented) {
                event.preventDefault();
            }
        }
    }

    protected onDragEnd(event: DragEvent) {
        let object = this.dragDropService.dragInfos[this.objectKey];
        if (object) {
            delete object.dragged;
        }

        if (this.context && this.context.dragendcallback) {
            let e = event as IDejaDragEvent;
            e.dragInfo = this.dragDropService.dragInfos;
            e.dragObject = object;
            e.dragElement = this.dragDropService.dragInfos[this.elementKey];
            this.context.dragendcallback(e);

            if (e.defaultPrevented) {
                event.stopPropagation();
            }
        }

        this.dragDropService.clearDragInfos();
        this.dragdropid = undefined;
    }
}

export interface IDejaDragEvent extends DragEvent {
    dragInfo: IDejaDragInfos;
    dragObject: any;
    dragElement: HTMLElement;
}

export interface IDejaDragContext {
    object: any;
    dragstartcallback: (event: IDejaDragEvent) => void;
    dragendcallback: (event: IDejaDragEvent) => void;
}
