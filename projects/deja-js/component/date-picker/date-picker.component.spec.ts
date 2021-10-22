/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */
import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { take } from 'rxjs/operators';

import { DejaDatePickerComponent } from './date-picker.component';
import { DejaDatePickerModule } from './index';


class DatePickerTestingUtils {
    public testDone(): boolean {
        return true;
    }
}

@Component({
    selector: 'DejaDatePickerContainerComponent',
    template: `
        <deja-date-picker style="width: 1000px;">
        </deja-date-picker>`
})
class DejaDatePickerContainerComponent {
    public constructor() {
        document.body.style.width = '1280px';
        document.body.style.height = '1024px';
    }
}

describe('DejaDatePickerContainerComponent', () => {
    let component: DejaDatePickerComponent;
    let fixture: ComponentFixture<DejaDatePickerContainerComponent>;
    let datePickerTestingUtils: DatePickerTestingUtils;

    beforeEach(waitForAsync(() => {
        void TestBed.configureTestingModule({
            declarations: [
                DejaDatePickerContainerComponent
            ],
            imports: [
                BrowserAnimationsModule,
                DejaDatePickerModule
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        datePickerTestingUtils = new DatePickerTestingUtils();
        fixture = TestBed.createComponent(DejaDatePickerContainerComponent);
        const datePickerDebugElement = fixture.debugElement.query(By.directive(DejaDatePickerComponent));
        component = datePickerDebugElement.componentInstance as DejaDatePickerComponent;
        fixture.detectChanges();
    });

    it('should create the component', () => {
        void expect(component).toBeTruthy();
    });

    it('should init the mask', () => {
        component.value = new Date();
        const mask = 'B000/F0/d0';

        void expect(component.mask.length).toEqual(10);
        void expect(component.mask).toEqual(mask);
    });

    it('should display date and time', waitForAsync(() => {
        component.format = null;
        component.layout = 'datetime';
        component.formatChanged$.pipe(
            take(1)
        ).subscribe(format => {
            void expect(format).toEqual('yyyy/MM/dd HH:mm');
            datePickerTestingUtils.testDone();
        });

        spyOn(datePickerTestingUtils, 'testDone');
        fixture.detectChanges();
        component.ngOnInit();
        return fixture.whenStable().then(() => {
            // eslint-disable-next-line @typescript-eslint/unbound-method
            void expect(datePickerTestingUtils.testDone).toHaveBeenCalled();
        });
    }));

    it('should display time', waitForAsync(() => {
        component.format = null;
        component.layout = 'timeonly';
        component.formatChanged$.pipe(
            take(1)
        ).subscribe(format => {
            void expect(format).toEqual('HH:mm');
            datePickerTestingUtils.testDone();
        });

        spyOn(datePickerTestingUtils, 'testDone');
        fixture.detectChanges();
        component.ngOnInit();
        return fixture.whenStable().then(() => {
            // eslint-disable-next-line @typescript-eslint/unbound-method
            void expect(datePickerTestingUtils.testDone).toHaveBeenCalled();
        });
    }));

    it('Should be disabled even if disabled is set as a string', () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
        (<any>component).disabled = 'true';
        fixture.detectChanges();
        void expect(component.disabled).toBeTruthy();

        // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
        (<any>component).disabled = '';
        fixture.detectChanges();
        void expect(component.disabled).toBeTruthy();

        component.disabled = true;
        fixture.detectChanges();
        void expect(component.disabled).toBeTruthy();

        component.disabled = null;
        fixture.detectChanges();
        void expect(component.disabled).toBeNull();

        // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
        (<any>component).disabled = 'false';
        fixture.detectChanges();
        void expect(component.disabled).toBeNull();

        component.disabled = false;
        fixture.detectChanges();
        void expect(component.disabled).toBeNull();
    });

    it('Should be required even if required is set as a string', () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
        (<any>component).required = 'true';
        fixture.detectChanges();
        void expect(component.required).toBeTruthy();

        // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
        (<any>component).required = '';
        fixture.detectChanges();
        void expect(component.required).toBeTruthy();

        component.required = true;
        fixture.detectChanges();
        void expect(component.required).toBeTruthy();

        component.required = null;
        fixture.detectChanges();
        void expect(component.required).toBeNull();

        // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
        (<any>component).required = 'false';
        fixture.detectChanges();
        void expect(component.required).toBeNull();

        component.required = false;
        fixture.detectChanges();
        void expect(component.required).toBeNull();
    });

    it('Should set time even if time property is set as a string', () => {
        component.time = 'true';
        fixture.detectChanges();
        void expect(component.time).toBeTruthy();

        component.time = '';
        fixture.detectChanges();
        void expect(component.time).toBeTruthy();

        component.time = true;
        fixture.detectChanges();
        void expect(component.time).toBeTruthy();

        component.time = null;
        fixture.detectChanges();
        void expect(component.time).toBeNull();

        component.time = 'false';
        fixture.detectChanges();
        void expect(component.time).toBeNull();

        component.time = false;
        fixture.detectChanges();
        void expect(component.time).toBeNull();
    });

    it('should open modal when calendar-button is clicked', () => {
        const button = document.createElement('button');
        button.setAttribute('id', 'calendar-button');

        button.onclick = (e: MouseEvent): void => {
            component.toggleDateSelector(e);
            void expect(component.showDropDown).toBeTruthy();
        };

        button.click();
    });

    describe('free entry', () => {
        beforeEach(() => {
            component.allowFreeEntry = true;
            component.format = '0000-d0-M0';
            // Without dispatchEvent the incorrect input (the one which does not support free text) is set to the DOM
            // Don't know why fixture.detectChanges does not do the job
            (fixture.debugElement
                .query(By.css('input'))
                .nativeElement as HTMLElement).dispatchEvent(new Event('input'));
            fixture.detectChanges();
        });
        it('should accept string or date as value', () => {
            const input = fixture.debugElement.query(
                By.css('input')
            ).nativeElement as HTMLInputElement;
            input.value = 'ABCD';
            input.dispatchEvent(new Event('change'));
            fixture.detectChanges();
            component.updateModel(input.value); // Use this because don't know how to trigger ngModelChange event
            void expect(component.value).toBe('ABCD');
            input.value = '2018-01-01';
            input.dispatchEvent(new Event('change'));
            fixture.detectChanges();
            component.updateModel(input.value); // Use this because don't know how to trigger ngModelChange event
            void expect(component.value).toBe('2018-01-01');
        });
    });
});
