/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Directive, ElementRef, HostBinding, Input, Optional } from '@angular/core';
import { DejaClipboardService, Destroy } from '@deja-js/core';
import { fromEvent, merge, Observable } from 'rxjs';
import { filter, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { IDejaDragEvent } from './draggable.directive';

@Directive({
    selector: '[deja-droppable]',
})
export class DejaDroppableDirective extends Destroy {

    /**
     * @deprecated
     */
    @Input('continous-dragover')
    public set allEvents(value: boolean | string) {
        this._allEvents = coerceBooleanProperty(value);
    }

    @HostBinding('attr.droppable') public droppable: boolean = null;
    private draginfokey = 'draginfos';
    private objectKey = 'object';
    private droppedKey = 'dropped';
    private elementKey = 'element';
    private lastTarget: EventTarget;
    private lastAccept: boolean;
    private _allEvents = false;
    private _context: IDejaDropContext;

    @Input('deja-droppable')
    public set context(value: IDejaDropContext) {
        this._context = value;
        this.droppable = !!value || null;
    }

    public get context() {
        return this._context;
    }

    constructor(elementRef: ElementRef, @Optional() private clipboardService: DejaClipboardService) {
        super();

        let inDrag = false;
        const element = elementRef.nativeElement as HTMLElement;

        // DragEnter event
        const dragEnterEvent$ = fromEvent(element, 'dragenter').pipe(
            tap(() => {
                if (!clipboardService) {
                    throw new Error('To use the DejaDroppableDirective, please import and provide the DejaClipboardService in your application.');
                }
            }),
            filter(() => !inDrag && !!this.context && !!this.context.dragentercallback && !!this.clipboardService.get(this.draginfokey)),
            tap(() => inDrag = true),
        ) as Observable<DragEvent>;

        // DragLeave event
        const dragLeaveEvent$ = fromEvent(element, 'dragleave').pipe(
            filter(() => inDrag && !!this.context && !!this.clipboardService.get(this.draginfokey)),
            filter((leaveEvent: DragEvent) => {
                const bounds = element.getBoundingClientRect();
                const inside = leaveEvent.x >= bounds.left && leaveEvent.x <= bounds.right && leaveEvent.y >= bounds.top && leaveEvent.y <= bounds.bottom;
                return !inside;
            })
        ) as Observable<DragEvent>;

        // Drop event
        const dropEvent$ = fromEvent(element, 'drop').pipe(
            filter(() => inDrag && !!this.context && !!this.clipboardService.get(this.draginfokey)),
        ) as Observable<DragEvent>;

        // DragOver event
        const dragOverEvent$ = fromEvent(element, 'dragover').pipe(
            filter(() => inDrag)
        ) as Observable<DragEvent>;

        const dragEndEvent$ = merge(dragEnterEvent$, dragLeaveEvent$, dropEvent$).pipe(
            tap(() => inDrag = false),
        );

        // DragEnter
        dragEnterEvent$.pipe(
            switchMap(dragEvent => {
                const dragInfos = this.clipboardService.get(this.draginfokey) as { [key: string]: any };
                const e = dragEvent as IDejaDropEvent;
                e.dragInfo = dragInfos;
                e.dragObject = (<any>dragEvent)[this.objectKey];
                e.dragElement = element;
                e.itsMe = (<any>dragEvent)[this.elementKey] === element;
                this.context.dragentercallback(e);
                if (e.defaultPrevented) {
                    dragEvent.preventDefault();
                    dragEvent.dataTransfer.dropEffect = 'copy';
                } else {
                    dragEvent.dataTransfer.dropEffect = 'none';
                }

                const leave$ = dragLeaveEvent$.pipe(
                    take(1),
                    filter(() => !!this.context.dragleavecallback),
                    tap(leaveEvent => {
                        const le = new CustomEvent('DejaDragLeave', { cancelable: true });
                        this.context.dragleavecallback(le);
                        if (le.defaultPrevented) {
                            leaveEvent.preventDefault();
                        }
                    })
                );

                const drop$ = dropEvent$.pipe(
                    take(1),
                    filter(() => !!this.context.dropcallback),
                    tap(dropEvent => {
                        if (dragInfos) {
                            const evt = dropEvent as IDejaDropEvent;
                            evt.dragInfo = dragInfos;
                            evt.dragObject = dragInfos[this.objectKey];
                            evt.dragElement = element;
                            evt.itsMe = dragInfos[this.elementKey] === element;

                            this.context.dropcallback(evt);
                            if (evt.defaultPrevented) {
                                evt.dragInfo[this.droppedKey] = true;
                                dropEvent.preventDefault();
                                dragEvent.dataTransfer.dropEffect = 'copy';
                            } else {
                                dragEvent.dataTransfer.dropEffect = 'none';
                            }
                        }
                    })
                );

                const over$ = dragOverEvent$.pipe(
                    takeUntil(dragEndEvent$),
                    tap(overEvent => {
                        if (!this._allEvents && this.lastTarget && this.lastTarget === overEvent.target) {
                            if (this.lastAccept) {
                                overEvent.preventDefault();
                                dragEvent.dataTransfer.dropEffect = 'copy';
                            } else {
                                dragEvent.dataTransfer.dropEffect = 'none';
                            }
                        } else if (this.context.dragovercallback && dragInfos) {
                            const evt = overEvent as IDejaDropEvent;
                            evt.dragInfo = dragInfos;
                            evt.dragObject = dragInfos[this.objectKey];
                            evt.dragElement = element;
                            evt.itsMe = dragInfos[this.elementKey] === element;

                            this.context.dragovercallback(evt);
                            this.lastTarget = overEvent.target;
                            this.lastAccept = evt.defaultPrevented;
                            if (evt.defaultPrevented) {
                                overEvent.preventDefault();
                                dragEvent.dataTransfer.dropEffect = 'copy';
                            } else {
                                dragEvent.dataTransfer.dropEffect = 'none';
                            }
                        }
                    })
                );

                return merge(drop$, over$, leave$);
            }),
            takeUntil(this.destroyed$)
        ).subscribe(_event => {
            // console.log(_event.type);
        });
    }
}

export interface IDejaDropEvent extends IDejaDragEvent {
    itsMe: boolean;
}

export interface IDejaDropContext {
    dragentercallback(event: IDejaDropEvent): void;
    dropcallback?(event: IDejaDropEvent): void;
    dragovercallback?(event: IDejaDropEvent): void;
    dragleavecallback?(event: CustomEvent): void;
}
