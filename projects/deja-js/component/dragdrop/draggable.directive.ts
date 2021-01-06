/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */
import { Directive } from '@angular/core';
import { ElementRef } from '@angular/core';
import { HostBinding } from '@angular/core';
import { Input } from '@angular/core';
import { Optional } from '@angular/core';
import { DejaClipboardService } from '@deja-js/component/core';
import { Destroy } from '@deja-js/component/core';
import { UUID } from '@deja-js/component/core';
import { fromEvent } from 'rxjs';
import { filter, switchMap, take, takeUntil } from 'rxjs/operators';

@Directive({
    selector: '[deja-draggable]'
})
export class DejaDraggableDirective extends Destroy {
    @HostBinding('attr.draggable') public draggable: boolean = null;
    @HostBinding('attr.dragdropid') public dragdropid: string;
    private draginfokey = 'draginfos';
    private objectKey = 'object';
    private elementKey = 'element';
    private uuidKey = 'uuid';
    private _context: IDejaDragContext;

    @Input('deja-draggable')
    public set context(value: IDejaDragContext) {
        this._context = value;
        this.draggable = !!value || null;
    }

    public get context(): IDejaDragContext {
        return this._context;
    }

    public constructor(elementRef: ElementRef, @Optional() private clipboardService: DejaClipboardService) {
        super();

        const element = elementRef.nativeElement as HTMLElement;

        fromEvent(element, 'dragstart').pipe(
            filter(() => !!this.context),
            switchMap((event: DragEvent) => {
                if (!clipboardService) {
                    throw new Error('To use the DejaDraggableDirective, please import and provide the DejaClipboardService in your application.');
                }

                // console.log('dragstart');
                const dragInfos = {} as Record<string, unknown>;
                this.dragdropid = new UUID().toString();
                dragInfos[this.uuidKey] = this.dragdropid;

                const object = this.context?.object || element;
                dragInfos[this.objectKey] = object;
                dragInfos[this.elementKey] = element;

                this.clipboardService.set(this.draginfokey, dragInfos);

                let data = 'notavailable';
                if (object) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    (<any>object).dragged = true;
                    data = JSON.stringify(data);
                }

                if (this.context?.dragstartcallback) {
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

                return fromEvent(element, 'dragend').pipe(
                    take(1)
                );
            }),
            takeUntil(this.destroyed$)
        ).subscribe((evt: DragEvent) => {
            // console.log('dragend');
            const dragEndInfos = this.clipboardService.get(this.draginfokey) as Record<string, unknown>;
            const obj = dragEndInfos?.[this.objectKey];
            if (obj) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                delete (<any>obj).dragged;
            }

            if (this.context?.dragendcallback && dragEndInfos) {
                const e = evt as IDejaDragEvent;
                e.dragInfo = dragEndInfos;
                e.dragObject = obj;
                e.dragElement = dragEndInfos[this.elementKey] as HTMLElement;
                this.context.dragendcallback(e);

                if (e.defaultPrevented) {
                    evt.stopPropagation();
                }
            }

            this.clipboardService.clear();
            this.dragdropid = undefined;
        });
    }
}

export interface IDejaDragEvent extends DragEvent {
    dragInfo: Record<string, unknown>;
    dragObject: unknown;
    dragElement: HTMLElement;
}

export interface IDejaDragContext {
    object?: unknown;
    dragstartcallback?(event: IDejaDragEvent): void;
    dragendcallback?(event: IDejaDragEvent): void;
}
