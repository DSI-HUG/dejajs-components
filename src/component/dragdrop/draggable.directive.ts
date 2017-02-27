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
import { UUID } from '../../common/core';
import { ClipboardService } from '../../common/core/clipboard/clipboard.service';

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
    private draginfokey = 'draginfos';
    private objectKey = 'object';
    private elementKey = 'element';
    private uuidKey = 'uuid';

    constructor(private elementRef: ElementRef, private clipboardService: ClipboardService) {
    }

    protected onDragStart(event: DragEvent) {
        const dragInfos = {} as { [key: string]: any };
        this.dragdropid = new UUID().toString();
        dragInfos[this.uuidKey] = this.dragdropid;

        const object = (this.context && this.context.object) || this.elementRef.nativeElement;
        dragInfos[this.objectKey] = object;
        dragInfos[this.elementKey] = this.elementRef.nativeElement;

        this.clipboardService.set(this.draginfokey, dragInfos);

        if (object) {
            object.dragged = true;
        }

        if (this.context && this.context.dragstartcallback) {
            const e = event as IDejaDragEvent;
            e.dragInfo = dragInfos;
            e.dragObject = this.context.object;
            e.dragElement = this.elementRef.nativeElement;
            this.context.dragstartcallback(e);

            if (e.defaultPrevented) {
                event.preventDefault();
            }
        }
    }

    protected onDragEnd(event: DragEvent) {
        const dragInfos = this.clipboardService.get(this.draginfokey) as { [key: string]: any };
        const object = dragInfos[this.objectKey];
        if (object) {
            delete object.dragged;
        }

        if (this.context && this.context.dragendcallback) {
            const e = event as IDejaDragEvent;
            e.dragInfo = dragInfos;
            e.dragObject = object;
            e.dragElement = dragInfos[this.elementKey];
            this.context.dragendcallback(e);

            if (e.defaultPrevented) {
                event.stopPropagation();
            }
        }

        this.clipboardService.clear();
        this.dragdropid = undefined;
    }
}

export interface IDejaDragEvent extends DragEvent {
    dragInfo: { [key: string]: any };
    dragObject: any;
    dragElement: HTMLElement;
}

export interface IDejaDragContext {
    object: any;
    dragstartcallback: (event: IDejaDragEvent) => void;
    dragendcallback: (event: IDejaDragEvent) => void;
}
