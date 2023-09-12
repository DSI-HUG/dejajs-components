/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { timer } from 'rxjs';

import { DejaTimePickerModule } from './index';
import { DejaTimePickerComponent } from './time-picker.component';

interface DateFormControls {
    dateValue: FormControl<Date>;
}

interface DurationFormControls {
    durationValue: FormControl<Duration>;
}

@Component({
    selector: 'DejaTimePickerWithDateContainerComponent',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `<form [formGroup]="dateForm">
                <deja-time-picker formControlName="dateValue" [step]="5"></deja-time-picker>
                </form>`
})
class DejaTimePickerWithDateContainerComponent {
    @ViewChild(DejaTimePickerComponent) public timePicker?: DejaTimePickerComponent;

    public dateForm: FormGroup<DateFormControls>;

    public constructor() {
        this.dateForm = new FormGroup<DateFormControls>({
            dateValue: new FormControl(new Date(2021, 4, 12, 9, 55), { nonNullable: true })
        });
    }
}

describe('DejaTimePickerDateComponent', () => {
    let component: DejaTimePickerComponent;
    let containerComponent: DejaTimePickerWithDateContainerComponent;
    let fixture: ComponentFixture<DejaTimePickerWithDateContainerComponent>;

    beforeEach(waitForAsync(() => {
        void TestBed.configureTestingModule({
            declarations: [
                DejaTimePickerWithDateContainerComponent
            ],
            imports: [
                BrowserAnimationsModule,
                DejaTimePickerModule,
                ReactiveFormsModule
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(DejaTimePickerWithDateContainerComponent);
        component = fixture.debugElement.query(By.directive(DejaTimePickerComponent)).componentInstance as DejaTimePickerComponent;
        containerComponent = fixture.debugElement.componentInstance as DejaTimePickerWithDateContainerComponent;
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

        const timePicker = fixture.componentInstance.timePicker;
        const hoursElement = timePicker?.hours?.nativeElement;
        const minutesElement = timePicker?.minutes?.nativeElement;

        void expect(hoursElement).toBeDefined();
        void expect(minutesElement).toBeDefined();
        if (!hoursElement || !minutesElement) {
            return;
        }

        // Add a new character in existing value
        const $event = new KeyboardEvent('keydown', { key: '1', cancelable: true });
        void expect($event.key).toEqual('1');
        timePicker.onKeyDown($event, 'hours');
        void expect($event.defaultPrevented).toBeTruthy();
        void expect(hoursElement.value).toEqual('09');
        void expect(minutesElement.value).toEqual('55');

        // Select and reset with a new value
        hoursElement.select();
        fixture.detectChanges();
        const $event2 = new KeyboardEvent('keydown', { key: '1', cancelable: true });
        timePicker.onKeyDown($event2, 'hours');
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

        timePicker.onKeyDown($event2, 'hours');
        void expect($event2.defaultPrevented).toBeFalsy();
        hoursElement.value = '12';
        void expect(hoursElement.value).toEqual('12');
        void expect(minutesElement.value).toEqual('55');
        void expect(document.activeElement).toEqual(hoursElement);
        void expect((timePicker as unknown as { _autoFocus: boolean })._autoFocus).toBeTruthy();
        timePicker.onHoursChange$.next($event3);

        timer(200).subscribe(() => {
            fixture.detectChanges();
            void expect(document.activeElement).toBeDefined();
            void expect(minutesElement).toBeDefined();
            void expect(minutesElement).toEqual(document.activeElement as HTMLInputElement);
            void expect(hoursElement.value).toEqual('12');
            void expect(minutesElement.value).toEqual('55');

            const selectionEnd = minutesElement.selectionEnd;
            const selectionStart = minutesElement.selectionStart;
            void expect(selectionEnd).toBeDefined();
            void expect(selectionStart).toBeDefined();
            if (selectionEnd === null || selectionStart === null) {
                return;
            }

            void expect(0).toEqual(selectionStart);
            void expect(2).toEqual(selectionEnd);
            done();
        });
    });
});

@Component({
    selector: 'DejaTimePickerWithDurationContainerComponent',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <form [formGroup]="durationForm">
            <deja-time-picker formControlName="durationValue"></deja-time-picker>
        </form>`
})
class DejaTimePickerWithDurationContainerComponent {
    @ViewChild(DejaTimePickerComponent) public timePicker?: DejaTimePickerComponent;

    public durationForm: FormGroup<DurationFormControls>;

    public constructor() {
        this.durationForm = new FormGroup<DurationFormControls>({
            durationValue: new FormControl({
                hours: 35,
                minutes: 5
            } as Duration, { nonNullable: true })
        });
    }
}

describe('DejaTimePickerDurationComponent', () => {
    let component: DejaTimePickerComponent;
    let containerComponent: DejaTimePickerWithDurationContainerComponent;
    let fixture: ComponentFixture<DejaTimePickerWithDurationContainerComponent>;

    beforeEach(waitForAsync(() => {
        void TestBed.configureTestingModule({
            declarations: [
                DejaTimePickerWithDurationContainerComponent
            ],
            imports: [
                BrowserAnimationsModule,
                DejaTimePickerModule,
                ReactiveFormsModule
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(DejaTimePickerWithDurationContainerComponent);
        component = fixture.debugElement.query(By.directive(DejaTimePickerComponent)).componentInstance as DejaTimePickerComponent;
        containerComponent = fixture.debugElement.componentInstance as DejaTimePickerWithDurationContainerComponent;
        fixture.detectChanges();
    }));

    it('should create the component', () => {
        void expect(component).toBeTruthy();
        void expect(containerComponent).toBeTruthy();
    });

    it('should display a specific duration', () => {
        const hoursElement = fixture.debugElement.query(By.css('deja-time-picker > .hours input')).nativeElement as HTMLInputElement;
        const minutesElement = fixture.debugElement.query(By.css('deja-time-picker > .minutes input')).nativeElement as HTMLInputElement;

        fixture.detectChanges();

        void expect(hoursElement.value).toEqual('35');
        void expect(minutesElement.value).toEqual('05');
    });

    it('should update the inputs', done => {
        const hoursInputElement = fixture.debugElement.query(By.css('deja-time-picker > .hours input')).nativeElement as HTMLInputElement;
        const minutesInputElement = fixture.debugElement.query(By.css('deja-time-picker > .minutes input')).nativeElement as HTMLInputElement;

        containerComponent.durationForm.controls.durationValue.patchValue({
            hours: 23,
            minutes: 20
        } as Duration);

        fixture.detectChanges();

        void fixture.whenRenderingDone().then(() => {
            timer(200).subscribe(() => {
                void expect(hoursInputElement.value).toEqual('23');
                void expect(minutesInputElement.value).toEqual('20');
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

        const timePicker = fixture.componentInstance.timePicker;
        const hoursElement = timePicker?.hours?.nativeElement;
        const minutesElement = timePicker?.minutes?.nativeElement;

        void expect(hoursElement).toBeDefined();
        void expect(minutesElement).toBeDefined();
        if (!hoursElement || !minutesElement) {
            return;
        }

        // Add a new character in existing value
        const $event = new KeyboardEvent('keydown', { key: '1', cancelable: true });
        void expect($event.key).toEqual('1');
        timePicker.onKeyDown($event, 'hours');
        void expect($event.defaultPrevented).toBeTruthy();
        void expect(hoursElement.value).toEqual('35');
        void expect(minutesElement.value).toEqual('05');

        // Select and reset with a new value
        hoursElement.select();
        fixture.detectChanges();
        const $event2 = new KeyboardEvent('keydown', { key: '1', cancelable: true });
        timePicker.onKeyDown($event2, 'hours');
        void expect($event2.defaultPrevented).toBeFalsy();
        hoursElement.value = '1';
        void expect(hoursElement.value).toEqual('1');
        void expect(minutesElement.value).toEqual('05');
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

        timePicker.onKeyDown($event2, 'hours');
        void expect($event2.defaultPrevented).toBeFalsy();
        hoursElement.value = '12';
        void expect(hoursElement.value).toEqual('12');
        void expect(minutesElement.value).toEqual('05');
        void expect(document.activeElement).toEqual(hoursElement);
        void expect((timePicker as unknown as { _autoFocus: boolean })._autoFocus).toBeTruthy();
        timePicker.onHoursChange$.next($event3);

        timer(200).subscribe(() => {
            fixture.detectChanges();
            void expect(document.activeElement).toBeDefined();
            void expect(minutesElement).toBeDefined();
            void expect(minutesElement).toEqual(document.activeElement as HTMLInputElement);
            void expect(hoursElement.value).toEqual('12');
            void expect(minutesElement.value).toEqual('05');

            const selectionEnd = minutesElement.selectionEnd;
            const selectionStart = minutesElement.selectionStart;
            void expect(selectionEnd).toBeDefined();
            void expect(selectionStart).toBeDefined();
            if (selectionEnd === null || selectionStart === null) {
                return;
            }

            void expect(0).toEqual(selectionStart);
            void expect(2).toEqual(selectionEnd);

            done();
        });
    });
});
