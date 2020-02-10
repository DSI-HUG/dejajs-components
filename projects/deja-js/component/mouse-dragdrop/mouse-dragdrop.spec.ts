/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { DejaMouseDragDropModule } from './index';
import { DejaMouseDraggableDirective, IDejaMouseDraggableContext } from './mouse-draggable.directive';
import { IDropCursorInfos } from './mouse-drop-cursor-infos.interface';
import { DejaMouseDroppableDirective, IDejaMouseDroppableContext } from './mouse-droppable.directive';

@Component({
    template: `<div id="dragArea" [deja-mouse-draggable]="getDragContext()">DragAndDroppedContent</div>
                <div #dropArea id="dropArea" [deja-mouse-droppable]="getDropContext(dropArea)"></div>
                <deja-mouse-dragdrop-cursor></deja-mouse-dragdrop-cursor>`,
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
    public getDragContext() {
        return {
            className: 'drag-cursor',
            dragStart: (target: HTMLElement) => {
                return of(target.innerText);
            },
        } as IDejaMouseDraggableContext;
    }

    public getDropContext(dropArea: HTMLElement) {
        return {
            dragEnter: (_dragContext) => {
                return {
                    width: 200,
                    height: 60,
                    className: 'drop-cursor',
                } as IDropCursorInfos;
            },
            drop: (dragContext) => {
                dropArea.innerText = dragContext.toString();
            },
            dragOver: () => {
                return {
                    width: 200,
                    height: 60,
                    className: 'drop-cursor',
                } as IDropCursorInfos;
            },
            dragLeave: () => {

            },
        } as IDejaMouseDroppableContext;
    }
}

describe('DejaMouseDragDrop', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                DejaMouseDragDropComponent,
            ],
            imports: [
                BrowserAnimationsModule,
                CommonModule,
                FormsModule,
                DejaMouseDragDropModule
            ]
        }).compileComponents();
    }));

    it('should create the components', async(() => {
        const fixture = TestBed.createComponent(DejaMouseDragDropComponent);
        fixture.detectChanges();
        const draggableDebugElement = fixture.debugElement.query(By.directive(DejaMouseDraggableDirective));
        const draggableInstance = draggableDebugElement.componentInstance;
        expect(draggableInstance).toBeTruthy();
        const droppableDebugElement = fixture.debugElement.query(By.directive(DejaMouseDroppableDirective));
        const droppableInstance = droppableDebugElement.componentInstance;
        expect(droppableInstance).toBeTruthy();
    }));

    it('should be able to drag and drop from the first div to the second', async (done) => {
        const fixture = TestBed.createComponent(DejaMouseDragDropComponent);

        fixture.detectChanges();
        fixture.whenStable().then(() => {
            const dragDebugElement = fixture.debugElement.query(By.css('div#dragArea'));
            const dropDebugElement = fixture.debugElement.query(By.css('div#dropArea'));
            const dragElement = dragDebugElement.nativeElement as HTMLElement;

            const sendMouseEvent = (element: EventTarget, type: string, x: number, y: number, buttons = 0) => {
                const eventInit = () => ({
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
                    relatedTarget: element,
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
            expect(dropElement.innerText).toEqual(dragElement.innerText);
            done();
        });
    }, 10000);
});
