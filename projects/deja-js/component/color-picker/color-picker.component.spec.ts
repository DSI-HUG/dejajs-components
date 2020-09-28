/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Color, MaterialColors } from '@deja-js/core';

import { DejaColorPickerComponent, DejaColorPickerModule } from './index';

describe('DejaColorPicker', () => {

    let component: DejaColorPickerComponent;
    let fixture: ComponentFixture<DejaColorPickerComponent>;

    beforeEach(waitForAsync(() => {
        void TestBed.configureTestingModule({
            imports: [
                DejaColorPickerModule
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(DejaColorPickerComponent);
        component = fixture.componentInstance;
    }));

    it('should create the component', waitForAsync(() => {
        fixture.detectChanges();
        void expect(component).toBeTruthy();
    }));

    it('should have background-color null if no value specified', () => {
        component.colors = new MaterialColors().colors;
        fixture.detectChanges();

        const el = fixture.debugElement.query(By.css('button'));
        const backgroundColor = el.styles['background-color'];
        void expect(backgroundColor).toBeFalsy();
    });

    it('should have background-color if value specified', () => {
        component.colors = new MaterialColors().colors;
        const expectedColorHex = '#FFA012';
        const expectedColorRgb = 'rgb(255, 160, 18)';
        component.value = Color.fromHex(expectedColorHex);
        fixture.detectChanges();

        const el = fixture.debugElement.query(By.css('button'));
        const backgroundColor = el.styles['background-color'];
        void expect([expectedColorHex, expectedColorRgb].includes(backgroundColor)).toBeTrue();
    });

    it('should set isOpen to true on show', () => {
        component.isOpen = false;
        component.show(null);

        void expect(component.isOpen).toBeTruthy();
    });

    it('should not set isOpen to true on show if component disabled', () => {
        component.isOpen = false;
        component.disabled = true;
        component.show(null);

        void expect(component.isOpen).toBeFalsy();
    });

    it('shoud set isOpen to true on close', () => {
        component.isOpen = true;
        component.close();

        void expect(component.isOpen).toBeFalsy();
    });

    it('should set isOpen to false and set value on onColorChange', () => {
        component.isOpen = true;
        component.value = new Color(100, 100, 100, undefined);
        component.onColorChange(Color.fromHex('#00FFFF'));

        const expectedColor: Color = new Color(0, 255, 255, undefined);

        void expect(component.isOpen).toBeFalsy();
        void expect(component.value).toEqual(expectedColor);
    });
});
