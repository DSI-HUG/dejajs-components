
/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { timer as observableTimer } from 'rxjs';
import { Color } from '../../common/core/graphics/color';
import { MaterialColors } from '../../common/core/style/material-colors';
import { DejaColorSelectorModule } from '../index';
import { DejaOverlayModule } from '../overlay/index';
import { DejaColorFab } from './color-fab.class';
import { DejaColorSelectorComponent } from './color-selector.component';

describe('DejaColorSelector', () => {

    let component: DejaColorSelectorComponent;
    let fixture: ComponentFixture<DejaColorSelectorComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [],
            imports: [
                DejaColorSelectorModule,
                FormsModule,
                DejaOverlayModule
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(DejaColorSelectorComponent);
        component = fixture.componentInstance;
    }));

    it('should create the component', async(() => {
        expect(component).toBeTruthy();
    }));

    it('should have background-color undefined if no value specified', () => {
        component.colors = new MaterialColors().colors;
        fixture.detectChanges();

        expect(component.value).toBeUndefined();
    });

    it('should have background-color if value specified', async (done) => {
        component.colors = new MaterialColors().colors;
        component.value = Color.fromHex('#FFA012');
        fixture.detectChanges();

        fixture.whenRenderingDone().then(() => {
            const color = component.value;
            expect(color && color.toHex()).toEqual('#FFA012');
            done();
        });
    });

    it('should be disabled if disabled is specified', async (done) => {
        component.colors = new MaterialColors().colors;
        component.disabled = true;
        fixture.detectChanges();

        fixture.whenRenderingDone().then(() => {
            expect(component.disabled).toBeTruthy();
            const elements = fixture.debugElement.queryAll(By.css('deja-color-fab'));
            elements.forEach(el => {
                const colorFab = el.componentInstance._colorFab as DejaColorFab;
                expect(colorFab.disabled).toBeTruthy();
                const style = el.nativeElement.style.backgroundColor;
                const color = Color.parse(style);
                expect(color.r).toEqual(color.g);
                expect(color.r).toEqual(color.b);
            });
            done();
        });
    });

    it('should be reset to specified color', async (done) => {
        component.colors = new MaterialColors().colors;
        component.resetcolor = '#FFCC80';
        component.value = Color.fromHex('#FFA012');
        fixture.detectChanges();

        fixture.whenRenderingDone().then(() => {
            const color = component.value;
            expect(color && color.toHex()).toEqual('#FFA012');

            component.resetDefaultColor();
            fixture.detectChanges();

            fixture.whenRenderingDone().then(() => {
                const color2 = component.value;
                expect(color2 && color2.toHex()).toEqual('#FFCC80');
                done();
            });
        });
    });

    it('should be able to highligth the right color', async (done) => {
        component.colors = new MaterialColors().colors;

        const sendMouseEvent = (element: EventTarget, type: string, x: number, y: number, buttons = 0) => {
            const dragDropContainerBounds = fixture.nativeElement.getBoundingClientRect();
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
                clientX: dragDropContainerBounds.left + x,
                clientY: dragDropContainerBounds.top + y,
                relatedTarget: element,
            } as MouseEventInit);
            const event = new MouseEvent(type, eventInit());
            element.dispatchEvent(event);
        };

        fixture.detectChanges();
        fixture.whenRenderingDone().then(() => {
            const elements = fixture.debugElement.queryAll(By.css('deja-color-fab'));
            sendMouseEvent(elements[8].nativeElement, 'mousemove', 5, 5);

            fixture.detectChanges();
            observableTimer(200).subscribe(() => {
                const activeElements = fixture.debugElement.queryAll(By.css('deja-color-fab[active]'));
                expect(activeElements.length).toBe(2);
                const colorFab = activeElements[0].componentInstance._colorFab as DejaColorFab;
                expect(colorFab.active).toBeTruthy();
                expect(activeElements[0].nativeElement.style.backgroundColor).toEqual(elements[8].nativeElement.style.backgroundColor);
                done();
            });
        });
    });

    it('should be able to select the right color', async (done) => {
        component.colors = new MaterialColors().colors;

        fixture.detectChanges();
        fixture.whenRenderingDone().then(() => {
            const elements = fixture.debugElement.queryAll(By.css('deja-color-fab'));
            elements[8].nativeElement.click();

            fixture.detectChanges();
            fixture.whenRenderingDone().then(() => {
                const color = component.value;
                const color2 = Color.parse(elements[8].nativeElement.style.backgroundColor);
                expect(color && color.toHex()).toEqual(color2 && color2.toHex());
                done();
            });
        });
    });
});
