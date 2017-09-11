/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Directive, ElementRef, HostBinding, Input, OnDestroy, Optional } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { DejaClipboardService } from '../../common/core/clipboard/clipboard.service';
import { IDejaDragEvent } from './draggable.directive';

@Directive({
    selector: '[deja-droppable]',
})
export class DejaDroppableDirective implements OnDestroy {

    /**
     * @deprecated
     */
    @Input('continous-dragover')
    public set allEvents(value: boolean | string) {
        this._allEvents = coerceBooleanProperty(value);
    }

    @HostBinding('attr.droppable') private droppable = null;
    private draginfokey = 'draginfos';
    private objectKey = 'object';
    private droppedKey = 'dropped';
    private elementKey = 'element';
    private lastTarget: EventTarget;
    private lastAccept: boolean;
    private _allEvents = false;
    private _context: IDejaDropContext;
    private subscriptions = [] as Subscription[];

    @Input('deja-droppable')
    public set context(value: IDejaDropContext) {
        this._context = value;
        this.droppable = !!value ? true : null;
    }

    public get context() {
        return this._context;
    }

    constructor(elementRef: ElementRef, @Optional() private clipboardService: DejaClipboardService) {
        let inDrag = false;
        const element = elementRef.nativeElement as HTMLElement;
        const dragDrop$ = new Subject<DragEvent>();
        const kill$ = new Subject();

        const dragEnd$ = Observable.from(kill$)
            .do(() => inDrag = false)
            .filter((value) => !value);

        this.subscriptions.push(Observable.from(dragDrop$)
            .subscribe((dragEvent) => {
                if (dragEvent.type === 'dragenter') {
                    if (inDrag) {
                        return;
                    }
                    inDrag = true;

                    console.log('DejaDragEnter');
                    if (this.context.dragentercallback) {
                        const dragInfos = this.clipboardService.get(this.draginfokey) as { [key: string]: any };
                        const e = dragEvent as IDejaDropEvent;
                        e.dragInfo = dragInfos;
                        e.dragObject = dragEvent[this.objectKey];
                        e.dragElement = element;
                        e.itsMe = dragEvent[this.elementKey] === element;
                        this.context.dragentercallback(e);
                        if (e.defaultPrevented) {
                            dragEvent.preventDefault();
                            dragEvent.dataTransfer.dropEffect = 'copy';
                        } else {
                            dragEvent.dataTransfer.dropEffect = 'none';
                        }

                        Observable.fromEvent(element, 'drop')
                            .takeUntil(dragEnd$)
                            .subscribe((dropEvent: DragEvent) => {
                                console.log('DejaDrop');
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

                        Observable.fromEvent(element, 'dragover')
                            .takeUntil(dragEnd$)
                            .subscribe((overEvent: DragEvent) => {
                                console.log('DejaDragOver');
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
                    console.log('DejaDragLeave');
                    if (this.context.dragleavecallback) {
                        const e = new CustomEvent('DejaDragLeave', { cancelable: false });
                        this.context.dragleavecallback(e);
                        if (e.defaultPrevented) {
                            dragEvent.preventDefault();
                        }
                    }
                    kill$.next();
                }
            }));

        this.subscriptions.push(Observable.fromEvent(element, 'dragenter')
            .filter(() => !!this.context)
            .filter(() => !!this.clipboardService.get(this.draginfokey))
            .subscribe((event: DragEvent) => {
                if (!clipboardService) {
                    throw new Error('To use the DejaDroppableDirective, please import and provide the DejaClipboardService in your application.');
                }
                dragDrop$.next(event);
            }));

        this.subscriptions.push(Observable.fromEvent(element, 'dragleave')
            .filter(() => !!this.context)
            .filter(() => !!this.clipboardService.get(this.draginfokey))
            .subscribe((leaveEvent: DragEvent) => {
                // console.log('dragleave ' + (leaveEvent.target as HTMLElement).tagName);
                const bounds = element.getBoundingClientRect();
                const inside = leaveEvent.x >= bounds.left && leaveEvent.x <= bounds.right && leaveEvent.y >= bounds.top && leaveEvent.y <= bounds.bottom;
                if (!inside) {
                    dragDrop$.next(leaveEvent);
                }
            }));
    }

    public ngOnDestroy() {
        this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
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
