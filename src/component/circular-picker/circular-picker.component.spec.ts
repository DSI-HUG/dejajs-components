/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
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

    it('should update the cursor position', () => {
        component.ranges = ranges;
        component.value = 3;
        fixture.detectChanges();

        const values = fixture.debugElement.query(By.css('.circular-picker > .cursor-container > .cursor > span'));
        expect(values.nativeElement.innerHTML).toEqual('3');
    });
});
