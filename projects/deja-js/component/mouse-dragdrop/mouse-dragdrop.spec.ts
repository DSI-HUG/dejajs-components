/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Component } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

import { DejaMouseDragDropModule } from './index';
import { DejaMouseDraggableDirective, IDejaMouseDraggableContext } from './mouse-draggable.directive';
import { IDropCursorInfos } from './mouse-drop-cursor-infos.interface';
import { DejaMouseDroppableDirective, IDejaMouseDroppableContext } from './mouse-droppable.directive';

@Component({
    selector: 'DejaMouseDragDropComponent',
    template: `<div id="dragArea" [deja-mouse-draggable]="getDragContext()">DragAndDroppedContent</div>
                <div #dropArea id="dropArea" [deja-mouse-droppable]="getDropContext(dropArea)"></div>
                <deja-mouse-dragdrop-cursor></deja-mouse-dragdrop-cursor>`,
    // eslint-disable-next-line @angular-eslint/component-max-inline-declarations
    styles: [`* { transition: unset !important; }
    host: {
        left: 0;
        width: 0;
        position: absolute;
    }
    div#dragArea {
        left: 100px;
        top: 100px;
        width: 200px;
        height: 200px;
        position: absolute;
        border: 1px solid #000;
    }
    div#dropArea {
        left: 100px;
        top: 310px;
        width: 200px;
        height: 200px;
        position: absolute;
        border: 1px solid #000;
    }
    `]
})
class DejaMouseDragDropComponent {
    public getDragContext(): IDejaMouseDraggableContext {
        return {
            className: 'drag-cursor',
            dragStart: (target: HTMLElement) => of(target.innerText)
        } as IDejaMouseDraggableContext;
    }

    public getDropContext(dropArea: HTMLElement): IDejaMouseDroppableContext {
        return {
            dragEnter: _dragContext => ({
                width: 200,
                height: 60,
                className: 'drop-cursor'
            } as IDropCursorInfos),
            drop: dragContext => {
                // eslint-disable-next-line @typescript-eslint/no-base-to-string
                dropArea.innerText = dragContext.toString();
            },
            dragOver: () => ({
                width: 200,
                height: 60,
                className: 'drop-cursor'
            } as IDropCursorInfos),
            dragLeave: () => undefined as void
        } as IDejaMouseDroppableContext;
    }
}

describe('DejaMouseDragDrop', () => {
    beforeEach(waitForAsync(() => {
        void TestBed.configureTestingModule({
            declarations: [
                DejaMouseDragDropComponent
            ],
            imports: [
                BrowserAnimationsModule,
                DejaMouseDragDropModule
            ]
        }).compileComponents();
    }));

    it('should create the components', waitForAsync(() => {
        const fixture = TestBed.createComponent(DejaMouseDragDropComponent);
        fixture.detectChanges();
        const draggableDebugElement = fixture.debugElement.query(By.directive(DejaMouseDraggableDirective));
        const draggableInstance = draggableDebugElement.componentInstance as DejaMouseDraggableDirective;
        void expect(draggableInstance).toBeTruthy();
        const droppableDebugElement = fixture.debugElement.query(By.directive(DejaMouseDroppableDirective));
        const droppableInstance = droppableDebugElement.componentInstance as DejaMouseDraggableDirective;
        void expect(droppableInstance).toBeTruthy();
    }));

    it('should be able to drag and drop from the first div to the second', done => {
        const fixture = TestBed.createComponent(DejaMouseDragDropComponent);

        fixture.detectChanges();
        void fixture.whenStable().then(() => {
            const dragDebugElement = fixture.debugElement.query(By.css('div#dragArea'));
            const dropDebugElement = fixture.debugElement.query(By.css('div#dropArea'));
            const dragElement = dragDebugElement.nativeElement as HTMLElement;

            const sendMouseEvent = (element: EventTarget, type: string, x: number, y: number, buttons = 0): void => {
                const eventInit = (): MouseEventInit => ({
                    bubbles: true,
                    cancelable: (type !== 'mousemove'),
                    view: document.defaultView,
                    altKey: false,
                    ctrlKey: false,
                    metaKey: false,
                    shiftKey: false,
                    button: 0,
                    buttons: buttons,
                    clientX: x,
                    clientY: y,
                    relatedTarget: element
                } as MouseEventInit);
                const event = new MouseEvent(type, eventInit());
                element.dispatchEvent(event);
                fixture.detectChanges();
            };

            sendMouseEvent(dragElement, 'mouseenter', 110, 110);
            sendMouseEvent(dragElement, 'mousemove', 200, 200);
            sendMouseEvent(dragElement, 'mousedown', 200, 200, 1);
            sendMouseEvent(dragElement.ownerDocument, 'mousemove', 220, 220, 1);
            sendMouseEvent(dragElement.ownerDocument, 'mousemove', 200, 400, 1);
            sendMouseEvent(dragElement.ownerDocument, 'mouseup', 200, 400, 0);
            const dropElement = dropDebugElement.nativeElement as HTMLElement;
            void expect(dropElement.innerText).toEqual(dragElement.innerText);
            done();
        });
    }, 10000);
});
