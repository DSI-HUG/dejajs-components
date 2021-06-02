/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DejaNumericStepperModule } from '@deja-js/component/v2/numeric-stepper';
import { timer } from 'rxjs';

import { DejaTimePickerComponent, DejaTimePickerModule } from '.';

@Component({
    selector: 'DejaTimePickerContainerComponent',
    template: `<form [formGroup]="dateForm">
                <deja-time-picker formControlName="dateValue" [step]="5"></deja-time-picker>
                </form>`
})
class DejaTimePickerContainerComponent {
    public dateValue = new Date(2021, 4, 12, 9, 55);
    public dateForm: FormGroup;

    public constructor(private fb: FormBuilder) {
        this.dateForm = this.fb.group({
            dateValue: this.dateValue
        });
    }
}

describe('DejaTimePickerComponent', () => {
    let component: DejaTimePickerComponent;
    let containerComponent: DejaTimePickerContainerComponent;
    let fixture: ComponentFixture<DejaTimePickerContainerComponent>;

    beforeEach(waitForAsync(() => {
        void TestBed.configureTestingModule({
            declarations: [
                DejaTimePickerContainerComponent
            ],
            imports: [
                BrowserAnimationsModule,
                CommonModule,
                DejaTimePickerModule,
                FormsModule,
                ReactiveFormsModule,
                DejaNumericStepperModule,
                MatFormFieldModule,
                MatInputModule
            ],
            providers: [FormBuilder]
        }).compileComponents();

        fixture = TestBed.createComponent(DejaTimePickerContainerComponent);
        component = fixture.debugElement.query(By.directive(DejaTimePickerComponent)).componentInstance as DejaTimePickerComponent;
        containerComponent = fixture.debugElement.componentInstance;
        fixture.detectChanges();
    }));

    it('should create the component', () => {
        void expect(component).toBeTruthy();
        void expect(containerComponent).toBeTruthy();
    });

    it('should display a specific date', () => {
        const hoursElement = fixture.debugElement.query(By.css('.time-picker > .hours input')).nativeElement as HTMLInputElement;
        const minutesElement = fixture.debugElement.query(By.css('.time-picker > .minutes input')).nativeElement as HTMLInputElement;

        fixture.detectChanges();

        void expect(hoursElement.value).toEqual('09');
        void expect(minutesElement.value).toEqual('55');
    });

    it('should update the inputs', done => {
        const hoursInputElement = fixture.debugElement.query(By.css('.time-picker > .hours input')).nativeElement as HTMLInputElement;
        const minutesInputElement = fixture.debugElement.query(By.css('.time-picker > .minutes input')).nativeElement as HTMLInputElement;

        containerComponent.dateForm.controls.dateValue.patchValue(new Date(2021, 4, 12, 10, 55));

        fixture.detectChanges();

        return fixture.whenRenderingDone().then(() => {
            timer(200).subscribe(() => {
                void expect(hoursInputElement.value).toEqual('10');
                void expect(minutesInputElement.value).toEqual('55');
                done();
            });
        });
    });

    it('should disable both hours and minutes mat form fields', () => {
        const hoursMinutesFields = fixture.debugElement.query(By.css('.time-picker mat-form-field')).nativeElement as HTMLInputElement;
        component.disabled = true;

        fixture.detectChanges();

        void expect(hoursMinutesFields.className).toContain('disabled');
    });
});
