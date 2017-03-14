/*
 * *
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 * /
 *
 */

import { Directive, ElementRef, HostBinding, Input } from '@angular/core';
import { coerceBooleanProperty } from '@angular/material/core/coercion/boolean-property';
import { Observable } from 'rxjs/Rx';
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
    public set allEvents(value: boolean) {
        this._allEvents = coerceBooleanProperty(value);
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

    constructor(elementRef: ElementRef, private clipboardService: DejaClipboardService) {
        const element = elementRef.nativeElement as HTMLElement;

        Observable.fromEvent(element, 'dragenter')
            .filter(() => !!this.context)
            .subscribe(() => {
                const dragleave$ = Observable.fromEvent(element, 'dragleave');
                dragleave$
                    .first()
                    .subscribe((leaveEvent: DragEvent) => {
                        if (this.context && this.context.dragleavecallback) {
                            const bounds = element.getBoundingClientRect();
                            const inside = leaveEvent.x >= bounds.left && leaveEvent.x <= bounds.right && leaveEvent.y >= bounds.top && leaveEvent.y <= bounds.bottom;
                            if (!inside) {
                                const dragInfos = this.clipboardService.get(this.draginfokey) as { [key: string]: any };
                                const e = leaveEvent as IDejaDropEvent;
                                e.dragInfo = dragInfos;
                                e.dragObject = dragInfos[this.objectKey];
                                e.dragElement = element;
                                e.itsMe = dragInfos[this.elementKey] === element;

                                this.context.dragleavecallback(e);
                                if (e.defaultPrevented) {
                                    leaveEvent.preventDefault();
                                }
                            }
                        }
                    });

                const drop$ = Observable.fromEvent(element, 'drop');
                drop$
                    .first()
                    .subscribe((dropEvent: DragEvent) => {
                        if (this.context && this.context.dropcallback) {
                            const dragInfos = this.clipboardService.get(this.draginfokey) as { [key: string]: any };
                            const e = dropEvent as IDejaDropEvent;
                            e.dragInfo = dragInfos;
                            e.dragObject = dragInfos[this.objectKey];
                            e.dragElement = element;
                            e.itsMe = dragInfos[this.elementKey] === element;

                            this.context.dropcallback(e);
                            if (e.defaultPrevented) {
                                e.dragInfo[this.droppedKey] = true;
                                dropEvent.preventDefault();
                            }
                        }
                    });

                const kill$ = Observable
                    .merge(dragleave$, drop$)
                    .first();

                Observable.fromEvent(element, 'dragover')
                    .takeUntil(kill$)
                    .subscribe((overEvent: DragEvent) => {
                        if (!this._allEvents && this.lastTarget && this.lastTarget === overEvent.target) {
                            if (this.lastAccept) {
                                overEvent.preventDefault();
                            }
                            return;
                        }

                        if (this.context && this.context.dragovercallback) {
                            const dragInfos = this.clipboardService.get(this.draginfokey) as { [key: string]: any };
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
                            }
                        }
                    });
            });
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
