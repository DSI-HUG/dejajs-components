/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */
import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DejaSplitterModule } from './index';
import { DejaSplitterComponent } from './splitter.component';

@Component({
    selector: 'DejaSplitterContainerComponent',
    // eslint-disable-next-line @angular-eslint/component-max-inline-declarations
    template: `<deja-splitter [direction]="'horizontal'">
                <split-area [size]="25" order="1" minSizePixel="100" (lockEvents)="lockEvents" (unlockEvents)="unlockEvents">
                    <p>Lorem ipsum dolor sit amet...</p>
                </split-area>
                <split-area [size]="75" minSizePixel="100">
                    <p>Sed ut perspiciatis unde omnis iste natus erro...</p>
                </split-area>
            </deja-splitter>`
})
class DejaSplitterContainerComponent {
    public constructor() {
        document.body.style.width = '1280px';
        document.body.style.height = '1024px';
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    public lockEvents(): void { }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    public unlockEvents(): void { }
}

describe('DejaSplitterContainerComponent', () => {
    let component: DejaSplitterComponent;
    let fixture: ComponentFixture<DejaSplitterContainerComponent>;

    beforeEach(waitForAsync(() => {
        void TestBed.configureTestingModule({
            declarations: [
                DejaSplitterContainerComponent
            ],
            imports: [
                BrowserAnimationsModule,
                DejaSplitterModule
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DejaSplitterContainerComponent);
        const splitterDebugElement = fixture.debugElement.query(By.directive(DejaSplitterComponent));
        component = splitterDebugElement.componentInstance as DejaSplitterComponent;
        fixture.detectChanges();
    });

    it('should create the component', () => {
        void expect(component).toBeTruthy();
    });

    it('should be able to drag and drop the splitter gutter and change the size', done => {
        fixture.detectChanges();
        void fixture.whenStable().then(() => {
            const gutterDebugElement = fixture.debugElement.query(By.css('.split-gutter'));
            const gutterElement = gutterDebugElement.nativeElement as HTMLElement;
            const areaDebugElements = fixture.debugElement.queryAll(By.css('split-area'));
            const leftAreaElement = areaDebugElements[0].nativeElement as HTMLElement;
            const rightAreaElement = areaDebugElements[1].nativeElement as HTMLElement;

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
                    screenX: x,
                    screenY: y,
                    relatedTarget: element
                } as MouseEventInit);
                const event = new MouseEvent(type, eventInit());
                element.dispatchEvent(event);
                fixture.detectChanges();
            };

            sendMouseEvent(gutterElement, 'mouseenter', 323, 73);
            sendMouseEvent(gutterElement, 'mousemove', 328, 78);
            sendMouseEvent(gutterElement, 'mousedown', 328, 78, 1);
            sendMouseEvent(gutterElement.ownerDocument, 'mousemove', 428, 78, 1);
            sendMouseEvent(gutterElement.ownerDocument, 'mouseup', 428, 78, 0);
            void expect(leftAreaElement.clientWidth).toBe(415);
            void expect(rightAreaElement.clientWidth).toBe(855);
            done();
        });
    }, 10000);

    it('should be able to drag and drop the splitter until the min size', done => {
        fixture.detectChanges();
        void fixture.whenStable().then(() => {
            const gutterDebugElement = fixture.debugElement.query(By.css('.split-gutter'));
            const gutterElement = gutterDebugElement.nativeElement as HTMLElement;
            const areaDebugElements = fixture.debugElement.queryAll(By.css('split-area'));
            const leftAreaElement = areaDebugElements[0].nativeElement as HTMLElement;
            const rightAreaElement = areaDebugElements[1].nativeElement as HTMLElement;

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
                    screenX: x,
                    screenY: y,
                    relatedTarget: element
                } as MouseEventInit);
                const event = new MouseEvent(type, eventInit());
                element.dispatchEvent(event);
                fixture.detectChanges();
            };

            sendMouseEvent(gutterElement, 'mouseenter', 323, 73);
            sendMouseEvent(gutterElement, 'mousemove', 328, 78);
            sendMouseEvent(gutterElement, 'mousedown', 328, 78, 1);
            sendMouseEvent(gutterElement.ownerDocument, 'mousemove', 0, 78, 1);
            sendMouseEvent(gutterElement.ownerDocument, 'mouseup', 0, 78, 0);
            void expect(leftAreaElement.clientWidth).toBe(100);
            void expect(rightAreaElement.clientWidth).toBe(1170);
            sendMouseEvent(gutterElement, 'mousedown', 105, 78, 1);
            sendMouseEvent(gutterElement.ownerDocument, 'mousemove', 1300, 78, 1);
            sendMouseEvent(gutterElement.ownerDocument, 'mouseup', 1300, 78, 0);
            void expect(leftAreaElement.clientWidth).toBe(1170);
            void expect(rightAreaElement.clientWidth).toBe(100);
            done();
        });
    }, 10000);
});
