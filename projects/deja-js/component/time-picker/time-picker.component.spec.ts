/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { DejaTimePickerModule } from '.';
import { DejaTimePickerComponent } from './time-picker.component';

describe('DejaTimePickerComponent', () => {
    let component: DejaTimePickerComponent;
    let fixture: ComponentFixture<DejaTimePickerComponent>;

    beforeEach(waitForAsync(() => {
        void TestBed.configureTestingModule({
            imports: [
                DejaTimePickerModule
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(DejaTimePickerComponent);
        component = fixture.componentInstance;
        component.value = 30;
        component.step = 10;
        fixture.detectChanges();
    }));

    it('should create the component', () => {
        void expect(component).toBeTruthy();
    });

    it('should change the value in input', () => {
        const inputElement = fixture.debugElement.query(By.css('.time-picker > .value-container > input.value')).nativeElement as HTMLInputElement;
        component.value = 15;
        fixture.detectChanges();
        void expect(inputElement.value).toEqual('15');
    });


    it('should increment by 10', () => {
        const inputElement = fixture.debugElement.query(By.css('.time-picker > .value-container > input.value')).nativeElement as HTMLInputElement;
        const incrementElement = fixture.debugElement.query(By.css('.time-picker > .increment')).nativeElement as HTMLElement;

        void expect(getComputedStyle(incrementElement).visibility).toEqual('hidden');
        void expect(inputElement.value).toEqual('30');

        incrementElement.click();
        fixture.detectChanges();

        void expect(inputElement.value).toEqual('40');
    });

    it('should decrement by 10', () => {
        const inputElement = fixture.debugElement.query(By.css('.time-picker > .value-container > input.value')).nativeElement as HTMLInputElement;
        const decrementElement = fixture.debugElement.query(By.css('.time-picker > .decrement')).nativeElement as HTMLElement;

        void expect(getComputedStyle(decrementElement).visibility).toEqual('hidden');
        void expect(inputElement.value).toEqual('30');

        decrementElement.click();
        fixture.detectChanges();

        void expect(inputElement.value).toEqual('20');
    });
});
