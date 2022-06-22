/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */
import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ControlsOf } from '@deja-js/component/core';

import { DejaNumericStepperModule } from '.';
import { DejaNumericStepperComponent } from './numeric-stepper.component';

interface NumberForm {
    numberValue: number;
}

@Component({
    selector: 'DejaNumericStepperContainerComponent',
    template: `<mat-form-field appearance="outline" [formGroup]="numberForm">
                <input matInput type="text" formControlName="numberValue" id="testInput" />
                <deja-numeric-stepper (increment)="numberValue = numberValue + step" (decrement)="numberValue = numberValue - step"></deja-numeric-stepper></mat-form-field>`
})
class DejaNumericStepperContainerComponent {
    public numberForm: FormGroup<ControlsOf<NumberForm>>;
    public numberValue = 30;
    public step = 10;

    public constructor(private fb: FormBuilder) {
        this.numberForm = this.fb.group({
            numberValue: this.numberValue
        });
    }
}

describe('DejaNumericStepperComponent', () => {
    let component: DejaNumericStepperComponent;
    let containerComponent: DejaNumericStepperContainerComponent;
    let fixture: ComponentFixture<DejaNumericStepperContainerComponent>;

    beforeEach(waitForAsync(() => {
        void TestBed.configureTestingModule({
            declarations: [
                DejaNumericStepperContainerComponent
            ],
            imports: [
                BrowserAnimationsModule,
                DejaNumericStepperModule,
                ReactiveFormsModule
            ],
            providers: [FormBuilder]
        }).compileComponents();

        fixture = TestBed.createComponent(DejaNumericStepperContainerComponent);
        const numericStepperDebugElement = fixture.debugElement.query(By.directive(DejaNumericStepperComponent));
        containerComponent = fixture.debugElement.componentInstance as DejaNumericStepperContainerComponent;
        component = numericStepperDebugElement.componentInstance as DejaNumericStepperComponent;
        fixture.detectChanges();
    }));

    it('should create the component', () => {
        void expect(component).toBeTruthy();
        void expect(containerComponent).toBeTruthy();
    });

    it('should change the value in input', () => {
        const inputElement = fixture.debugElement.query(By.css('#testInput')).nativeElement as HTMLInputElement;

        void expect(inputElement.value).toEqual('30');

        inputElement.value = '15';
        inputElement.dispatchEvent(new Event('input'));
        fixture.detectChanges();

        void expect(inputElement.value).toEqual('15');
    });

    it('should increment by 10', () => {
        component.increment.emit();
        fixture.detectChanges();
        void expect(containerComponent.numberValue).toEqual(40);
    });

    it('should decrement by 10', () => {
        component.decrement.emit();
        fixture.detectChanges();
        void expect(containerComponent.numberValue).toEqual(20);
    });
});
