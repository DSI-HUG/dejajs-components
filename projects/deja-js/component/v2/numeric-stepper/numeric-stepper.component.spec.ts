/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { DejaNumericStepperModule } from '.';
import { DejaNumericStepperComponent } from './numeric-stepper.component';

describe('DejaNumericStepperComponent', () => {
    let component: DejaNumericStepperComponent;
    let fixture: ComponentFixture<DejaNumericStepperComponent>;

    beforeEach(waitForAsync(() => {
        void TestBed.configureTestingModule({
            imports: [
                DejaNumericStepperModule
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(DejaNumericStepperComponent);
        component = fixture.componentInstance;
        component.value = 30;
        component.step = 10;
        fixture.detectChanges();
    }));

    it('should create the component', () => {
        void expect(component).toBeTruthy();
    });

    it('should change the value in input', () => {
        const inputElement = fixture.debugElement.query(By.css('.numeric-stepper > .value-container > input.value')).nativeElement as HTMLInputElement;
        component.value = 15;
        fixture.detectChanges();
        void expect(inputElement.value).toEqual('15');
    });


    it('should increment by 10', () => {
        const inputElement = fixture.debugElement.query(By.css('.numeric-stepper > .value-container > input.value')).nativeElement as HTMLInputElement;
        const incrementElement = fixture.debugElement.query(By.css('.numeric-stepper > .increment')).nativeElement as HTMLElement;

        void expect(getComputedStyle(incrementElement).visibility).toEqual('hidden');
        void expect(inputElement.value).toEqual('30');

        incrementElement.click();
        fixture.detectChanges();

        void expect(inputElement.value).toEqual('40');
    });

    it('should decrement by 10', () => {
        const inputElement = fixture.debugElement.query(By.css('.numeric-stepper > .value-container > input.value')).nativeElement as HTMLInputElement;
        const decrementElement = fixture.debugElement.query(By.css('.numeric-stepper > .decrement')).nativeElement as HTMLElement;

        void expect(getComputedStyle(decrementElement).visibility).toEqual('hidden');
        void expect(inputElement.value).toEqual('30');

        decrementElement.click();
        fixture.detectChanges();

        void expect(inputElement.value).toEqual('20');
    });


    it('should apply a given number format', () => {
        component.value = 5;
        component.numberFormat = '2.';
        fixture.detectChanges();

        const inputElement = fixture.debugElement.query(By.css('.numeric-stepper > .value-container > input.value')).nativeElement as HTMLInputElement;

        void expect(inputElement.value).toEqual('05');
    });
});
