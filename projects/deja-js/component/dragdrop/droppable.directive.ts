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
import { from, fromEvent, Subject } from 'rxjs';
import { filter, takeUntil, tap } from 'rxjs/operators';
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
        this.droppable = !!value ? true : null;
    }

    public get context() {
        return this._context;
    }

    constructor(elementRef: ElementRef, @Optional() private clipboardService: DejaClipboardService) {
        super();

        let inDrag = false;
        const element = elementRef.nativeElement as HTMLElement;
        const dragDrop$ = new Subject<DragEvent>();
        const kill$ = new Subject();

        const dragEnd$ = from(kill$).pipe(
            tap(() => inDrag = false),
            filter((value) => !value));

        from(dragDrop$).pipe(
            takeUntil(this.destroyed$)
        ).subscribe((dragEvent) => {
            if (dragEvent.type === 'dragenter') {
                if (inDrag) {
                    return;
                }
                inDrag = true;

                // console.log('DejaDragEnter');
                if (this.context.dragentercallback) {
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

                    fromEvent(element, 'drop').pipe(
                        takeUntil(dragEnd$))
                        .subscribe((dropEvent: DragEvent) => {
                            // console.log('DejaDrop');
                            if (this.context.dropcallback) {
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
                            }
                            kill$.next();
                            return;
                        });

                    fromEvent(element, 'dragover').pipe(
                        takeUntil(dragEnd$))
                        .subscribe((overEvent: DragEvent) => {
                            // console.log('DejaDragOver');
                            if (!this._allEvents && this.lastTarget && this.lastTarget === overEvent.target) {
                                if (this.lastAccept) {
                                    overEvent.preventDefault();
                                    dragEvent.dataTransfer.dropEffect = 'copy';
                                } else {
                                    dragEvent.dataTransfer.dropEffect = 'none';
                                }
                                return;
                            }

                            if (this.context.dragovercallback) {
                                if (dragInfos) {
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
                            }
                        });
                }
            } else {
                // console.log('DejaDragLeave');
                if (this.context.dragleavecallback) {
                    const e = new CustomEvent('DejaDragLeave', { cancelable: true });
                    this.context.dragleavecallback(e);
                    if (e.defaultPrevented) {
                        dragEvent.preventDefault();
                    }
                }
                kill$.next();
            }
        });

        fromEvent(element, 'dragenter').pipe(
            filter(() => !!this.context),
            filter(() => !!this.clipboardService.get(this.draginfokey)),
            takeUntil(this.destroyed$)
        ).subscribe((event: DragEvent) => {
            if (!clipboardService) {
                throw new Error('To use the DejaDroppableDirective, please import and provide the DejaClipboardService in your application.');
            }
            dragDrop$.next(event);
        });

        fromEvent(element, 'dragleave').pipe(
            filter(() => !!this.context),
            filter(() => !!this.clipboardService.get(this.draginfokey)),
            takeUntil(this.destroyed$)
        ).subscribe((leaveEvent: DragEvent) => {
            // console.log('dragleave ' + (leaveEvent.target as HTMLElement).tagName);
            const bounds = element.getBoundingClientRect();
            const inside = leaveEvent.x >= bounds.left && leaveEvent.x <= bounds.right && leaveEvent.y >= bounds.top && leaveEvent.y <= bounds.bottom;
            if (!inside) {
                dragDrop$.next(leaveEvent);
            }
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
