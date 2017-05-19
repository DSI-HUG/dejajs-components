/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Directive, ElementRef, HostBinding, Input, Optional } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { DejaClipboardService } from '../../common/core/clipboard/clipboard.service';
import { IDejaDragEvent } from './index';

@Directive({
    selector: '[deja-droppable]',
})
export class DejaDroppableDirective {

    /**
     * @deprecated
     */
    @Input('continous-dragover')
    public set allEvents(value: boolean | string) {
        this._allEvents = value != null && `${value}` !== 'false';
    }

    @HostBinding('attr.draggable') private droppable = null;
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
        const element = elementRef.nativeElement as HTMLElement;
        const dragDrop$ = new Subject<DragEvent>();
        const kill$ = new Subject();
        const dragEnd$ = Observable.from(kill$).filter((value) => !value);

        Observable.from(dragDrop$)
            .subscribe((dragEvent) => {
                if (dragEvent.type === 'dragenter') {
                    console.log('DejaDragEnter');
                    if (this.context.dragentercallback) {
                        const e = dragEvent as IDejaDropEvent;
                        e.dragInfo = dragEvent;
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
                                    const dragInfos = this.clipboardService.get(this.draginfokey) as { [key: string]: any };
                                    if (dragInfos) {
                                        const e = dropEvent as IDejaDropEvent;
                                        e.dragInfo = dragInfos;
                                        e.dragObject = dragInfos[this.objectKey];
                                        e.dragElement = element;
                                        e.itsMe = dragInfos[this.elementKey] === element;

                                        this.context.dropcallback(e);
                                        if (e.defaultPrevented) {
                                            e.dragInfo[this.droppedKey] = true;
                                            dropEvent.preventDefault();
                                            dragEvent.dataTransfer.dropEffect = 'copy';
                                        } else {
                                            dragEvent.dataTransfer.dropEffect = 'none';
                                        }
                                    }
                                }
                                dragDrop$.next(dropEvent);
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
                                    const dragInfos = this.clipboardService.get(this.draginfokey) as { [key: string]: any };
                                    if (dragInfos) {
                                        const e = overEvent as IDejaDropEvent;
                                        e.dragInfo = dragInfos;
                                        e.dragObject = dragInfos[this.objectKey];
                                        e.dragElement = element;
                                        e.itsMe = dragInfos[this.elementKey] === element;

                                        this.context.dragovercallback(e);
                                        this.lastTarget = overEvent.target;
                                        this.lastAccept = e.defaultPrevented;
                                        if (e.defaultPrevented) {
                                            overEvent.preventDefault();
                                            dragEvent.dataTransfer.dropEffect = 'copy';
                                        } else {
                                            dragEvent.dataTransfer.dropEffect = 'none';
                                        }
                                    }
                                }
                            });
                    }
                } else if (dragEvent.type === 'dragleave') {
                    console.log('DejaDragLeave');
                    if (this.context.dragleavecallback) {
                        const e = new CustomEvent('DejaDragLeave', { cancelable: false });
                        this.context.dragleavecallback(e);
                        if (e.defaultPrevented) {
                            dragEvent.preventDefault();
                        }
                    }
                    kill$.next();
                } else {
                    kill$.next();
                }
            });

        Observable.fromEvent(element, 'dragenter')
            .filter(() => !!this.context)
            .filter(() => !!this.clipboardService.get(this.draginfokey))
            .subscribe((event: DragEvent) => {
                if (!clipboardService) {
                    throw new Error('To use the DejaDroppableDirective, please import and provide the DejaClipboardService in your application.');
                }
                dragDrop$.next(event);
            });

        Observable.fromEvent(element, 'dragleave')
            .filter(() => !!this.context)
            .filter(() => !!this.clipboardService.get(this.draginfokey))
            .subscribe((leaveEvent: DragEvent) => {
                console.log('dragleave ' + (leaveEvent.target as HTMLElement).tagName);
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
    dragentercallback: (event: IDejaDropEvent) => void;
    dropcallback: (event: IDejaDropEvent) => void;
    dragovercallback: (event: IDejaDropEvent) => void;
    dragleavecallback: (event: CustomEvent) => void;
}
