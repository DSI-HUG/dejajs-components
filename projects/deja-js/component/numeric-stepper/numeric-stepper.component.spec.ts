/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DejaNumericStepperModule } from '.';
import { DejaNumericStepperComponent } from './numeric-stepper.component';

describe('DejaNumericStepperComponent', () => {

    let comp: DejaNumericStepperComponent;
    let fixture: ComponentFixture<DejaNumericStepperComponent>;

    beforeEach(waitForAsync(() => {
        void TestBed.configureTestingModule({
            imports: [
                BrowserAnimationsModule,
                DejaNumericStepperModule
            ],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();

        fixture = TestBed.createComponent(DejaNumericStepperComponent);
        comp = fixture.componentInstance; // Component test instance
    }));

    it('should create the component', waitForAsync(() => {
        void expect(comp).toBeTruthy();
    }));

    it('should update the value', waitForAsync(() => {
        comp.value = 10;

        fixture.detectChanges();
        void expect(comp.value).toBe(10);
    }));

    it('should update the value even if it`s disabled', waitForAsync(() => {
        comp.value = 10;
        comp.disabled = true;

        fixture.detectChanges();
        comp.value = 11;

        fixture.detectChanges();
        void expect(comp.value).toBe(11);
    }));

    it('value < min', waitForAsync(() => {
        comp.value = -5;
        comp.min = 0;
        comp.max = 20;
        fixture.detectChanges();
        const offLimits = fixture.debugElement.query(By.css('.off-limits'));
        void expect(offLimits).not.toBeNull();
    }));

    it('value > max', waitForAsync(() => {
        comp.value = 50;
        comp.min = 0;
        comp.max = 20;
        fixture.detectChanges();
        const offLimits = fixture.debugElement.query(By.css('.off-limits'));
        void expect(offLimits).not.toBeNull();
    }));

    it('min < value < max', waitForAsync(() => {
        comp.value = 10;
        comp.min = 0;
        comp.max = 20;
        fixture.detectChanges();
        const offLimits = fixture.debugElement.query(By.css('.off-limits'));
        void expect(offLimits).toBeNull();
    }));

    it('without min max', waitForAsync(() => {
        comp.value = 50;
        fixture.detectChanges();
        const offLimits = fixture.debugElement.query(By.css('.off-limits'));
        void expect(offLimits).toBeNull();
    }));

    describe('when step clicked', () => {

        let steppers: DebugElement;

        beforeEach(() => {
            comp.value = 1.2;
            fixture.detectChanges();
            steppers = fixture.debugElement.query(By.css('.steppers'));
        });

        it('should substract 1 on click substract', waitForAsync(() => {
            (steppers.children[0].nativeElement as HTMLElement).click();
            void expect(comp.value).toEqual(0.2);
            void expect(comp.value).not.toEqual(0.19999999999999996);
        }));

        it('should add 1 on click add', waitForAsync(() => {
            (steppers.children[1].nativeElement as HTMLElement).click();
            void expect(comp.value).toEqual(2.2);
        }));
    });
});
