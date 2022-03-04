/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { timer } from 'rxjs';

import { DejaTimePickerComponent, DejaTimePickerModule } from '.';

@Component({
    selector: 'DejaTimePickerContainerComponent',
    template: `<form [formGroup]="dateForm">
                <deja-time-picker formControlName="dateValue" [step]="5"></deja-time-picker>
                </form>`
})
class DejaTimePickerContainerComponent {
    @ViewChild(DejaTimePickerComponent) public timePicker: DejaTimePickerComponent;

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
                DejaTimePickerModule,
                ReactiveFormsModule
            ],
            providers: [FormBuilder]
        }).compileComponents();

        fixture = TestBed.createComponent(DejaTimePickerContainerComponent);
        component = fixture.debugElement.query(By.directive(DejaTimePickerComponent)).componentInstance as DejaTimePickerComponent;
        containerComponent = fixture.debugElement.componentInstance as DejaTimePickerContainerComponent;
        fixture.detectChanges();
    }));

    it('should create the component', () => {
        void expect(component).toBeTruthy();
        void expect(containerComponent).toBeTruthy();
    });

    it('should display a specific date', () => {
        const hoursElement = fixture.debugElement.query(By.css('deja-time-picker > .hours input')).nativeElement as HTMLInputElement;
        const minutesElement = fixture.debugElement.query(By.css('deja-time-picker > .minutes input')).nativeElement as HTMLInputElement;

        fixture.detectChanges();

        void expect(hoursElement.value).toEqual('09');
        void expect(minutesElement.value).toEqual('55');
    });

    it('should update the inputs', done => {
        const hoursInputElement = fixture.debugElement.query(By.css('deja-time-picker > .hours input')).nativeElement as HTMLInputElement;
        const minutesInputElement = fixture.debugElement.query(By.css('deja-time-picker > .minutes input')).nativeElement as HTMLInputElement;

        containerComponent.dateForm.controls.dateValue.patchValue(new Date(2021, 4, 12, 10, 55));

        fixture.detectChanges();

        void fixture.whenRenderingDone().then(() => {
            timer(200).subscribe(() => {
                void expect(hoursInputElement.value).toEqual('10');
                void expect(minutesInputElement.value).toEqual('55');
                done();
            });
        });
    });

    it('should disable both hours and minutes mat form fields', () => {
        const hoursMinutesFields = fixture.debugElement.query(By.css('deja-time-picker mat-form-field')).nativeElement as HTMLInputElement;
        component.disabled = true;

        fixture.detectChanges();

        void expect(hoursMinutesFields.className).toContain('disabled');
    });

    it('should focus on minutes after set hours', done => {
        fixture.detectChanges();

        const hoursElement = fixture.componentInstance.timePicker.hours.nativeElement;
        const minutesElement = fixture.componentInstance.timePicker.minutes.nativeElement;

        // Add a new caracter in existing value
        const $event = new KeyboardEvent('keydown', { key: '1', cancelable: true });
        void expect($event.key).toEqual('1');
        fixture.componentInstance.timePicker.onKeyDown($event, 'hours');
        void expect($event.defaultPrevented).toBeTruthy();
        void expect(hoursElement.value).toEqual('09');
        void expect(minutesElement.value).toEqual('55');

        // Select and reset with a new value
        hoursElement.select();
        fixture.detectChanges();
        const $event2 = new KeyboardEvent('keydown', { key: '1', cancelable: true });
        fixture.componentInstance.timePicker.onKeyDown($event2, 'hours');
        void expect($event2.defaultPrevented).toBeFalsy();
        hoursElement.value = '1';
        void expect(hoursElement.value).toEqual('1');
        void expect(minutesElement.value).toEqual('55');
        void expect(document.activeElement).toEqual(hoursElement);

        // Select 12h and change the focus
        hoursElement.select();
        fixture.detectChanges();
        const $event3 = {
            target: hoursElement,
            key: '2',
            cancelable: true
        } as unknown as KeyboardEvent;
        void expect(hoursElement).toEqual($event3.target as HTMLInputElement);

        fixture.componentInstance.timePicker.onKeyDown($event2, 'hours');
        void expect($event2.defaultPrevented).toBeFalsy();
        hoursElement.value = '12';
        void expect(hoursElement.value).toEqual('12');
        void expect(minutesElement.value).toEqual('55');
        void expect(document.activeElement).toEqual(hoursElement);
        void expect((fixture.componentInstance.timePicker as unknown as { _autoFocus: boolean })._autoFocus).toBeTruthy();
        fixture.componentInstance.timePicker.onHoursChange$.next($event3);

        timer(200).subscribe(() => {
            fixture.detectChanges();
            void expect(document.activeElement).toBeDefined();
            void expect(minutesElement).toBeDefined();
            void expect(minutesElement).toEqual(document.activeElement as HTMLInputElement);
            void expect(hoursElement.value).toEqual('12');
            void expect(minutesElement.value).toEqual('55');
            void expect(0).toEqual(minutesElement.selectionStart);
            void expect(2).toEqual(minutesElement.selectionEnd);
            done();
        });
    });
});
