/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Directive } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Input } from '@angular/core';
import { Destroy } from '@deja-js/component/core';
import { Position } from '@deja-js/component/core';
import { Rect } from '@deja-js/component/core';
import { from, Observable, of } from 'rxjs';
import { distinctUntilChanged, filter, switchMap, take, takeUntil, tap } from 'rxjs/operators';

import { IDragCursorInfos } from './mouse-drag-cursor-infos.interface';
import { DejaMouseDragDropService } from './mouse-dragdrop.service';
import { IDragDropContext } from './mouse-dragdrop-context.interface';
import { IDropCursorInfos } from './mouse-drop-cursor-infos.interface';

@Directive({
    selector: '[deja-mouse-droppable]'
})
export class DejaMouseDroppableDirective extends Destroy {
    private _context: IDejaMouseDroppableContext;
    private _dragContext: IDragDropContext;

    @Input('deja-mouse-droppable')
    public set context(value: IDejaMouseDroppableContext) {
        this._context = value;
    }

    public get context(): IDejaMouseDroppableContext {
        return this._context;
    }

    public constructor(elementRef: ElementRef, dragDropService: DejaMouseDragDropService) {
        super();

        const element = elementRef.nativeElement as HTMLElement;

        const dragging$ = from(dragDropService.dragging$).pipe(
            distinctUntilChanged()
        );

        const drop$ = from(dragDropService.dragCursor$).pipe(
            filter(value => !!value),
            switchMap(dragCursor => dragging$.pipe(
                filter(value => !value),
                take(1),
                tap(() => {
                    // console.log(`Drop ${!!this._dragContext}`)
                    if (this._dragContext && this.context?.drop) {
                        this.context.drop(this._dragContext, dragCursor);
                    }
                    this._dragContext = undefined;
                    dragDropService.dropCursor$.next(null);
                })
            ))
        );

        dragging$.pipe(
            filter(value => value),
            switchMap(() =>
                // console.log(`Drag ${!!this._dragContext}`)
                from(dragDropService.dragCursor$).pipe(
                    // eslint-disable-next-line rxjs/no-unsafe-takeuntil
                    takeUntil(drop$),
                    switchMap(dragCursor => {
                        const bounds = new Rect(element.getBoundingClientRect());
                        if (this.context && dragCursor) {
                            const { pageX, pageY } = dragCursor.originalEvent;
                            if (bounds.containsPoint(new Position(pageX, pageY))) {
                                if (!this._dragContext) {
                                    this._dragContext = dragDropService.context;
                                    if (this.context.dragEnter) {
                                        const dropContext$ = this.context.dragEnter(this._dragContext, dragCursor);
                                        if (dropContext$) {
                                            const dropContextObs$ = dropContext$ as Observable<IDropCursorInfos>;
                                            if (dropContextObs$.subscribe) {
                                                // Observable
                                                return dropContextObs$;
                                            } else {
                                                return of(dropContext$ as IDropCursorInfos);
                                            }
                                        }
                                    }
                                } else if (this.context.dragOver) {
                                    const overContext = this.context.dragOver(this._dragContext, dragCursor);
                                    if (overContext) {
                                        return of(overContext);
                                    }
                                }
                            } else if (this._dragContext) {
                                if (this.context?.dragLeave) {
                                    this.context.dragLeave(this._dragContext);
                                }
                                this._dragContext = undefined;
                                dragDropService.dropCursor$.next(null);
                            }
                        }

                        return of(null);
                    })
                )
            ),
            filter(dropCursor => !!dropCursor),
            takeUntil(this.destroyed$)
        ).subscribe(dropCursor => dragDropService.dropCursor$.next(dropCursor));
    }
}

export interface IDejaMouseDroppableContext {
    // eslint-disable-next-line rxjs/finnish
    dragEnter?(dragContext: IDragDropContext, dragCursor: IDragCursorInfos): IDropCursorInfos | Observable<IDropCursorInfos>; // Return object or observable<object>
    dragOver?(dragContext: IDragDropContext, dragCursor: IDragCursorInfos): IDropCursorInfos;
    dragLeave?(dragContext: IDragDropContext): void;
    drop?(dragContext: IDragDropContext, dragCursor: IDragCursorInfos): void;
}
