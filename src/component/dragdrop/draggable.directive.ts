/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Directive, ElementRef, HostBinding, Input, Optional } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { DejaClipboardService } from '../../common/core/clipboard/clipboard.service';
import { UUID } from '../../common/core/UUID';

@Directive({
    selector: '[deja-draggable]',
})
export class DejaDraggableDirective {
    @HostBinding('attr.dragdropid') private dragdropid;
    @HostBinding('attr.draggable') private draggable = null;
    private draginfokey = 'draginfos';
    private objectKey = 'object';
    private elementKey = 'element';
    private uuidKey = 'uuid';
    private _context: IDejaDragContext;

    @Input('deja-draggable')
    public set context(value: IDejaDragContext) {
        this._context = value;
        this.draggable = !!value ? true : null;
    }

    public get context() {
        return this._context;
    }

    constructor(elementRef: ElementRef, @Optional() private clipboardService: DejaClipboardService) {
        const element = elementRef.nativeElement as HTMLElement;

        Observable.fromEvent(element, 'dragstart')
            .filter(() => !!this.context)
            .subscribe((event: DragEvent) => {
                if (!clipboardService) {
                    throw new Error('To use the DejaDraggableDirective, please import and provide the DejaClipboardService in your application.');
                }

                // console.log('dragstart');
                const dragInfos = {} as { [key: string]: any };
                this.dragdropid = new UUID().toString();
                dragInfos[this.uuidKey] = this.dragdropid;

                const object = (this.context && this.context.object) || element;
                dragInfos[this.objectKey] = object;
                dragInfos[this.elementKey] = element;

                this.clipboardService.set(this.draginfokey, dragInfos);

                let data = 'notavailable';
                if (object) {
                    object.dragged = true;
                    data = JSON.stringify(data);
                }

                if (this.context && this.context.dragstartcallback) {
                    const e = event as IDejaDragEvent;
                    e.dragInfo = dragInfos;
                    e.dragObject = this.context.object;
                    e.dragElement = element;
                    this.context.dragstartcallback(e);
                    event.dataTransfer.setData('text/plain', data);
                    if (e.defaultPrevented) {
                        event.preventDefault();
                    }
                }

                Observable.fromEvent(element, 'dragend')
                    .first()
                    .subscribe((evt: DragEvent) => {
                        // console.log('dragend');
                        const dragEndInfos = this.clipboardService.get(this.draginfokey) as { [key: string]: any };
                        const obj = dragEndInfos && dragEndInfos[this.objectKey];
                        if (obj) {
                            delete obj.dragged;
                        }

                        if (this.context && this.context.dragendcallback) {
                            const e = evt as IDejaDragEvent;
                            e.dragInfo = dragEndInfos;
                            e.dragObject = obj;
                            e.dragElement = dragEndInfos[this.elementKey];
                            this.context.dragendcallback(e);

                            if (e.defaultPrevented) {
                                evt.stopPropagation();
                            }
                        }

                        this.clipboardService.clear();
                        this.dragdropid = undefined;
                    });
            });
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
