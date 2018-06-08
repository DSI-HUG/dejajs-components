/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { OverlayModule } from '@angular/cdk/overlay';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { DejaDatePickerComponent } from './date-picker.component';

class DatePickerTestingUtils {
    public testDone(): boolean {
        return true;
    }
}

fdescribe('DejaDatePickerComponent', () => {
    let component: DejaDatePickerComponent;
    let fixture: ComponentFixture<DejaDatePickerComponent>;
    let datePickerTestingUtils: DatePickerTestingUtils;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                DejaDatePickerComponent
            ],
            imports: [OverlayModule],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();
    }));

    beforeEach(() => {
        datePickerTestingUtils = new DatePickerTestingUtils();
        fixture = TestBed.createComponent(DejaDatePickerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should init the mask', () => {
        component.value = new Date();
        const mask = [
            /[1|2]/,
            /\d/,
            /\d/,
            /\d/,
            '-',
            /[0|1]/,
            /\d/,
            '-',
            /[0-3]/,
            /\d/,
        ];

        expect(component.mask.length).toEqual(10);
        expect(component.mask).toEqual(mask);
    });

    it('should display date and time', async(() => {
        component.format = null;
        component.layout = 'datetime';
        Observable.from((component as any).formatChanged$)
        .first()
        .subscribe((format) => {
            expect(format).toEqual('YYYY-MM-DD HH:mm');
            datePickerTestingUtils.testDone();
        });

        spyOn(datePickerTestingUtils, 'testDone');
        fixture.detectChanges();
        component.ngOnInit();
        fixture.whenStable().then(() => {
            expect(datePickerTestingUtils.testDone).toHaveBeenCalled();
        });
    }));

    it('should display time', async(() => {
        component.format = null;
        component.layout = 'timeonly';
        Observable.from((component as any).formatChanged$)
        .first()
        .subscribe((format) => {
            expect(format).toEqual('HH:mm');
            datePickerTestingUtils.testDone();
        });

        spyOn(datePickerTestingUtils, 'testDone');
        fixture.detectChanges();
        component.ngOnInit();
        fixture.whenStable().then(() => {
            expect(datePickerTestingUtils.testDone).toHaveBeenCalled();
        });
    }));

    it('should display default format when layout is wrong', async(() => {
        component.format = null;
        component.layout = 'wrongLayout';
        Observable.from((component as any).formatChanged$)
        .first()
        .subscribe((format) => {
            expect(format).toEqual('YYYY-MM-DD');
            datePickerTestingUtils.testDone();
        });

        spyOn(datePickerTestingUtils, 'testDone');
        fixture.detectChanges();
        component.ngOnInit();
        fixture.whenStable().then(() => {
            expect(datePickerTestingUtils.testDone).toHaveBeenCalled();
        });
    }));

    it('Should be disabled even if disabled is set as a string', () => {
        component.disabled = 'true';
        fixture.detectChanges();
        expect((component as any)._disabled).toBeTruthy();

        component.disabled = '';
        fixture.detectChanges();
        expect((component as any)._disabled).toBeTruthy();

        component.disabled = true;
        fixture.detectChanges();
        expect((component as any)._disabled).toBeTruthy();

        component.disabled = null;
        fixture.detectChanges();
        expect((component as any)._disabled).toBeNull();

        component.disabled = 'false';
        fixture.detectChanges();
        expect((component as any)._disabled).toBeNull();

        component.disabled = false;
        fixture.detectChanges();
        expect((component as any)._disabled).toBeNull();
    });

    it('Should be required even if required is set as a string', () => {
        component.required = 'true';
        fixture.detectChanges();
        expect((component as any)._required).toBeTruthy();

        component.required = '';
        fixture.detectChanges();
        expect((component as any)._required).toBeTruthy();

        component.required = true;
        fixture.detectChanges();
        expect((component as any)._required).toBeTruthy();

        component.required = null;
        fixture.detectChanges();
        expect((component as any)._required).toBeNull();

        component.required = 'false';
        fixture.detectChanges();
        expect((component as any)._required).toBeNull();

        component.required = false;
        fixture.detectChanges();
        expect((component as any)._required).toBeNull();
    });

    it('Should set time even if time property is set as a string', () => {
        component.time = 'true';
        fixture.detectChanges();
        expect(component.time).toBeTruthy();

        component.time = '';
        fixture.detectChanges();
        expect(component.time).toBeTruthy();

        component.time = true;
        fixture.detectChanges();
        expect(component.time).toBeTruthy();

        component.time = null;
        fixture.detectChanges();
        expect(component.time).toBeNull();

        component.time = 'false';
        fixture.detectChanges();
        expect(component.time).toBeNull();

        component.time = false;
        fixture.detectChanges();
        expect(component.time).toBeNull();
    });

    it('should open modal when calendar-button is clicked', () => {
        const button = document.createElement('button');
        button.setAttribute('id', 'calendar-button');

        button.onclick = (e) => {
            (component as any).toggleDateSelector(e);
            expect((component as any)._showDropDown).toBeTruthy();
        };

        button.click();
    });
});
