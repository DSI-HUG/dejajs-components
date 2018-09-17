/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */
import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DejaSplitterModule } from '.';
import { DejaSplitterComponent } from './splitter.component';

@Component({
    template: `<deja-splitter [direction]="'horizontal'">
                <split-area [size]="25" order="1" minSizePixel="100" (lockEvents)="lockEvents" (unlockEvents)="unlockEvents">
                    <p>Lorem ipsum dolor sit amet...</p>
                </split-area>
                <split-area [size]="75" minSizePixel="100">
                    <p>Sed ut perspiciatis unde omnis iste natus erro...</p>
                </split-area>
            </deja-splitter>`,
})
class DejaSplitterContainerComponent {
    constructor() {
        document.body.style.width = '1280px';
        document.body.style.height = '1024px';
    }

    public lockEvents() {

    }

    public unlockEvents() {

    }
}

fdescribe('DejaSplitterContainerComponent', () => {
    let component: DejaSplitterComponent;
    let fixture: ComponentFixture<DejaSplitterContainerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                DejaSplitterContainerComponent
            ],
            imports: [
                BrowserAnimationsModule,
                DejaSplitterModule
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DejaSplitterContainerComponent);
        const splitterDebugElement = fixture.debugElement.query(By.directive(DejaSplitterComponent));
        component = splitterDebugElement.componentInstance;
        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should be able to drag and drop the splitter gutter and change the size', async (done) => {
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            const gutterDebugElement = fixture.debugElement.query(By.css('split-gutter'));
            const gutterElement = gutterDebugElement.nativeElement as HTMLElement;
            const areaDebugElements = fixture.debugElement.queryAll(By.css('split-area'));
            const leftAreaElement = areaDebugElements[0].nativeElement as HTMLElement;
            const rightAreaElement = areaDebugElements[1].nativeElement as HTMLElement;

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
                    screenX: x,
                    screenY: y,
                    relatedTarget: element,
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
            expect(leftAreaElement.clientWidth).toBe(415);
            expect(rightAreaElement.clientWidth).toBe(855);
            done();
        });
    }, 10000);

    it('should be able to drag and drop the splitter until the min size', async (done) => {
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            const gutterDebugElement = fixture.debugElement.query(By.css('split-gutter'));
            const gutterElement = gutterDebugElement.nativeElement as HTMLElement;
            const areaDebugElements = fixture.debugElement.queryAll(By.css('split-area'));
            const leftAreaElement = areaDebugElements[0].nativeElement as HTMLElement;
            const rightAreaElement = areaDebugElements[1].nativeElement as HTMLElement;

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
                    screenX: x,
                    screenY: y,
                    relatedTarget: element,
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
            expect(leftAreaElement.clientWidth).toBe(100);
            expect(rightAreaElement.clientWidth).toBe(1170);
            sendMouseEvent(gutterElement, 'mousedown', 105, 78, 1);
            sendMouseEvent(gutterElement.ownerDocument, 'mousemove', 1300, 78, 1);
            sendMouseEvent(gutterElement.ownerDocument, 'mouseup', 1300, 78, 0);
            expect(leftAreaElement.clientWidth).toBe(1170);
            expect(rightAreaElement.clientWidth).toBe(100);
            done();
        });
    }, 10000);
});
