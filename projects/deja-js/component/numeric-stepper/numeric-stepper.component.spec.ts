/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { CommonModule } from '@angular/common';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DejaTextMetricsModule } from '@deja-js/core';
import { DejaNumericStepperComponent } from './numeric-stepper.component';

describe('DejaNumericStepperComponent', () => {

    let comp: DejaNumericStepperComponent;
    let fixture: ComponentFixture<DejaNumericStepperComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                DejaNumericStepperComponent
            ],
            imports: [
                CommonModule,
                DejaTextMetricsModule,
                FormsModule,
                BrowserAnimationsModule,
            ],
            schemas: [NO_ERRORS_SCHEMA],
        }).compileComponents();

        fixture = TestBed.createComponent(DejaNumericStepperComponent);
        comp = fixture.componentInstance; // Component test instance
    }));

    it('should create the component', async(() => {
        expect(comp).toBeTruthy();
    }));

    it('should update the value', async(() => {
        comp.value = 10;

        fixture.detectChanges();
        expect(comp.value).toBe(10);
    }));

    it('should update the value even if it`s disabled', async(() => {
        comp.value = 10;
        comp.disabled = true;

        fixture.detectChanges();
        comp.value = 11;

        fixture.detectChanges();
        expect(comp.value).toBe(11);
    }));

    describe('when step clicked', () => {

        let steppers: DebugElement;

        beforeEach(() => {
            comp.value = 1.2;
            fixture.detectChanges();
            steppers = fixture.debugElement.query(By.css('.steppers'));
        });

        it('should substract 1 on click substract', async(() => {
            steppers.children[0].nativeElement.click();
            expect(comp.value).toEqual(0.2);
            expect(comp.value).not.toEqual(0.19999999999999996);
        }));

        it('should add 1 on click add', async(() => {
            steppers.children[1].nativeElement.click();
            expect(comp.value).toEqual(2.2);
        }));

    });
});
