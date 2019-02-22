/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {timer as observableTimer } from 'rxjs';
import {delay, first, tap} from 'rxjs/operators';
import { DejaCircularPickerComponent, ICircularRange } from './circular-picker.component';

describe('DejaCircularPickerComponent', () => {
    let component: DejaCircularPickerComponent;
    let fixture: ComponentFixture<DejaCircularPickerComponent>;

    const ranges = [
        { min: 1, max: 20 },
    ] as ICircularRange[];

    const rangesWithInterval = [
        { min: 1, max: 20, labelInterval: 2 },
    ] as ICircularRange[];

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                DejaCircularPickerComponent
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(DejaCircularPickerComponent);
        component = fixture.componentInstance;
    }));

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should display as many values as asked', () => {
        component.ranges = ranges;
        fixture.detectChanges();

        const values = fixture.debugElement.queryAll(By.css('.circular-picker > .value'));
        expect(values.length).toEqual(20);
    });

    it('should display as many values as asked with interval', () => {
        component.ranges = rangesWithInterval;
        fixture.detectChanges();

        const values = fixture.debugElement.queryAll(By.css('.circular-picker > .value'));
        expect(values.length).toEqual(10);
    });

    it('should update the cursor position programmatically', () => {
        component.ranges = ranges;
        component.value = 3;
        fixture.detectChanges();

        const values = fixture.debugElement.query(By.css('.circular-picker > .cursor-container > .cursor > span'));
        expect(values.nativeElement.innerHTML).toEqual('3');
    });

    it('should update the cursor position on mouse event', async (done) => {
        component.ranges = ranges;
        component.value = 3;
        fixture.detectChanges();

        fixture.whenStable().then(() => {
            const htmlElement = fixture.debugElement.nativeElement as HTMLElement;
            const cursorElement = fixture.debugElement.query(By.css('.circular-picker > .cursor-container > .cursor > span')).nativeElement as HTMLSpanElement;
            const valueElement = fixture.debugElement.query(By.css('.circular-picker > [value="9"]')).nativeElement as HTMLSpanElement;

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

            const valueBounds = valueElement.getBoundingClientRect();
            const cursorBounds = cursorElement.getBoundingClientRect();
            sendMouseEvent(htmlElement, 'mousemove', 0, 0, 0);
            sendMouseEvent(cursorElement, 'mousemove', 0, 0, 0);
            sendMouseEvent(cursorElement, 'mousedown', 0, 0, 1);
            sendMouseEvent(htmlElement.ownerDocument, 'mousemove', cursorBounds.left + 1, cursorBounds.top + 1, 1);

            observableTimer(150).pipe(
                first(),
                tap(() => {
                    sendMouseEvent(htmlElement.ownerDocument, 'mousemove', cursorBounds.left + 50, cursorBounds.top + 67, 1);
                }),
                delay(150),
                tap(() => {
                    sendMouseEvent(htmlElement.ownerDocument, 'mouseup', cursorBounds.left + 50, cursorBounds.top + 67, 0);
                    expect(component.value).toEqual(5);
                }),
                delay(150),
                tap(() => {
                    // Move and click on value element
                    sendMouseEvent(valueElement, 'mousemove', 0, 0, 0);
                    sendMouseEvent(valueElement, 'mousedown', 0, 0, 1);
                }),
                delay(150),
                tap(() => {
                    sendMouseEvent(htmlElement.ownerDocument, 'mousemove', valueBounds.left +  1, valueBounds.top + 1, 0);
                    expect(component.value).toEqual(9);
                }))
                .subscribe(() => {
                    done();
                });
        });
    });
});
