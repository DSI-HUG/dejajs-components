/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Color, MaterialColorService } from '@deja-js/component/core/graphics';
import { timer } from 'rxjs';

import { DejaColorFab } from './color-fab.class';
import { DejaColorSelectorComponent } from './color-selector.component';
import { DejaColorSelectorModule } from './index';

describe('DejaColorSelector', () => {

    let component: DejaColorSelectorComponent;
    let fixture: ComponentFixture<DejaColorSelectorComponent>;

    beforeEach(waitForAsync(() => {
        void TestBed.configureTestingModule({
            imports: [
                DejaColorSelectorModule
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(DejaColorSelectorComponent);
        component = fixture.componentInstance;
    }));

    it('should create the component', waitForAsync(() => {
        void expect(component).toBeTruthy();
    }));

    it('should have background-color undefined if no value specified', () => {
        component.colors = new MaterialColorService().colors;
        fixture.detectChanges();

        void expect(component.value).toBeUndefined();
    });

    it('should have background-color if value specified', done => {
        component.colors = new MaterialColorService().colors;
        component.value = Color.fromHex('#FFA012');
        fixture.detectChanges();

        void fixture.whenRenderingDone().then(() => {
            const color = component.value;
            void expect(color?.toHex()).toEqual('#FFA012');
            done();
        });
    });

    it('should be disabled if disabled is specified', done => {
        component.colors = new MaterialColorService().colors;
        component.disabled = true;
        fixture.detectChanges();

        void fixture.whenRenderingDone().then(() => {
            void expect(component.disabled).toBeTruthy();
            const elements = fixture.debugElement.queryAll(By.css('deja-color-fab'));
            elements.forEach(el => {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                const colorFab = el.componentInstance._colorFab as DejaColorFab;
                void expect(colorFab.disabled).toBeTruthy();
                const style = (el.nativeElement as HTMLElement).style.backgroundColor;
                const color = Color.parse(style);
                void expect(color.r).toEqual(color.g);
                void expect(color.r).toEqual(color.b);
            });
            done();
        });
    });

    it('should be reset to specified color', done => {
        component.colors = new MaterialColorService().colors;
        component.resetcolor = '#FFCC80';
        component.value = Color.fromHex('#FFA012');
        fixture.detectChanges();

        void fixture.whenRenderingDone().then(() => {
            const color = component.value;
            void expect(color?.toHex()).toEqual('#FFA012');

            component.resetDefaultColor();
            fixture.detectChanges();

            return fixture.whenRenderingDone().then(() => {
                const color2 = component.value;
                void expect(color2?.toHex()).toEqual('#FFCC80');
                done();
            });
        });
    });

    it('should be able to highligth the correct color', done => {
        component.colors = new MaterialColorService().colors;

        const sendMouseEvent = (element: EventTarget, type: string, x: number, y: number, buttons = 0): void => {
            const dragDropContainerElement = fixture.nativeElement as HTMLElement;
            const dragDropContainerBounds = dragDropContainerElement.getBoundingClientRect();
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
                clientX: dragDropContainerBounds.left + x,
                clientY: dragDropContainerBounds.top + y,
                relatedTarget: element
            } as MouseEventInit);
            const event = new MouseEvent(type, eventInit());
            element.dispatchEvent(event);
        };

        fixture.detectChanges();
        void fixture.whenRenderingDone().then(() => {
            const elements = fixture.debugElement.queryAll(By.css('deja-color-fab'));
            sendMouseEvent(elements[8].nativeElement as HTMLElement, 'mousemove', 5, 5);

            timer(200).subscribe(() => {
                const activeElements = fixture.debugElement.queryAll(By.css('deja-color-fab[active]'));
                void expect(activeElements.length).toBe(2);
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                const colorFab = activeElements[0].componentInstance._colorFab as DejaColorFab;
                void expect(colorFab.active).toBeTruthy();
                void expect((activeElements[0].nativeElement as HTMLElement).style.backgroundColor).toEqual((elements[8].nativeElement as HTMLElement).style.backgroundColor);
                done();
            });

            return fixture.detectChanges();
        });
    });

    it('should be able to select the correct color', done => {
        component.colors = new MaterialColorService().colors;

        fixture.detectChanges();
        void fixture.whenRenderingDone().then(() => {
            const elements = fixture.debugElement.queryAll(By.css('deja-color-fab'));
            (elements[8].nativeElement as HTMLElement).click();

            fixture.detectChanges();
            return fixture.whenRenderingDone().then(() => {
                const color = component.value;
                const color2 = Color.parse((elements[8].nativeElement as HTMLElement).style.backgroundColor);
                void expect(color?.toHex()).toEqual(color2?.toHex());
                done();
            });
        });
    });
});
