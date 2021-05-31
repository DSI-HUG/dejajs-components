/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DejaTimePickerModule } from '.';
import { DejaTimePickerComponent } from './time-picker.component';

describe('DejaTimePickerComponent', () => {
    let component: DejaTimePickerComponent;
    let fixture: ComponentFixture<DejaTimePickerComponent>;

    beforeEach(waitForAsync(() => {
        void TestBed.configureTestingModule({
            imports: [
                BrowserAnimationsModule,
                DejaTimePickerModule
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(DejaTimePickerComponent);
        component = fixture.componentInstance;
        component.value = new Date(2021, 4, 12, 9, 55);
        fixture.detectChanges();
    }));

    it('should create the component', () => {
        void expect(component).toBeTruthy();
    });

    it('should display a specific date', () => {
        const hoursElement = fixture.debugElement.query(By.css('.time-picker > .hours input')).nativeElement as HTMLInputElement;
        const minutesElement = fixture.debugElement.query(By.css('.time-picker > .minutes input')).nativeElement as HTMLInputElement;

        fixture.detectChanges();

        void expect(hoursElement.value).toEqual('09');
        void expect(minutesElement.value).toEqual('55');
    });

    // it('should increment the hours', () => {
    //     const hoursIncrementArrowElement = fixture.debugElement.query(By.css('.time-picker > .hours > .numeric-stepper > .arrows.increment')).nativeElement as HTMLElement;
    //     const hoursElement = fixture.debugElement.query(By.css('.time-picker > .hours > .numeric-stepper > input.value')).nativeElement as HTMLInputElement;
    //     const minutesElement = fixture.debugElement.query(By.css('.time-picker > .minutes > .numeric-stepper > input.value')).nativeElement as HTMLInputElement;

    //     hoursIncrementArrowElement.click();
    //     fixture.detectChanges();

    //     void expect(hoursElement.value).toEqual('10');
    //     void expect(minutesElement.value).toEqual('55');
    // });

    // it('should increment the minutes', () => {
    //     const minutesIncrementArrowElement = fixture.debugElement.query(By.css('.time-picker > .minutes > .numeric-stepper > .arrows.increment')).nativeElement as HTMLElement;
    //     const hoursElement = fixture.debugElement.query(By.css('.time-picker > .hours > .numeric-stepper > input.value')).nativeElement as HTMLInputElement;
    //     const minutesElement = fixture.debugElement.query(By.css('.time-picker > .minutes > .numeric-stepper > input.value')).nativeElement as HTMLInputElement;

    //     minutesIncrementArrowElement.click();
    //     fixture.detectChanges();

    //     void expect(hoursElement.value).toEqual('09');
    //     void expect(minutesElement.value).toEqual('56');
    // });

    // it('should be disabled', () => {
    //     component.disabled = true;
    //     fixture.detectChanges();

    //     const hoursElement = fixture.debugElement.query(By.css('.time-picker > .hours > .numeric-stepper > input.value')).nativeElement as HTMLInputElement;
    //     const minutesElement = fixture.debugElement.query(By.css('.time-picker > .minutes > .numeric-stepper > input.value')).nativeElement as HTMLInputElement;

    //     void expect(hoursElement.getAttribute('disabled')).toEqual('');
    //     void expect(minutesElement.getAttribute('disabled')).toEqual('');
    // });
});
