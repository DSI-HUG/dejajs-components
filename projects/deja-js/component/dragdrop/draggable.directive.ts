/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */
import { Directive, ElementRef, HostBinding, Input, Optional } from '@angular/core';
import { DejaClipboardService, Destroy, IdService } from '@deja-js/component/core';
import { filter, fromEvent, switchMap, take, takeUntil } from 'rxjs';

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

    public constructor(elementRef: ElementRef, @Optional() private clipboardService: DejaClipboardService, idService: IdService) {
        super();

        const element = elementRef.nativeElement as HTMLElement;

        fromEvent<DragEvent>(element, 'dragstart').pipe(
            filter(() => !!this.context),
            switchMap(event => {
                if (!clipboardService) {
                    throw new Error('To use the DejaDraggableDirective, please import and provide the DejaClipboardService in your application.');
                }

                // console.log('dragstart');
                const dragInfos = {} as Record<string, unknown>;
                this.dragdropid = idService.generate();
                dragInfos[this.uuidKey] = this.dragdropid;

                const object = this.context?.object || element;
                dragInfos[this.objectKey] = object;
                dragInfos[this.elementKey] = element;

                this.clipboardService.set(this.draginfokey, dragInfos);

                let data = 'notavailable';
                if (object) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
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

                return fromEvent<DragEvent>(element, 'dragend').pipe(
                    take(1)
                );
            }),
            takeUntil(this.destroyed$)
        ).subscribe(evt => {
            // console.log('dragend');
            const dragEndInfos = this.clipboardService.get(this.draginfokey) as Record<string, unknown>;
            const obj = dragEndInfos?.[this.objectKey];
            if (obj) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
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
    dragstartcallback?: (event: IDejaDragEvent) => void;
    dragendcallback?: (event: IDejaDragEvent) => void;
}
