/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */
import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { from as observableFrom } from 'rxjs';
import { first } from 'rxjs/operators';
import { DejaDatePickerComponent } from './date-picker.component';
import { DejaDatePickerModule } from './index';

class DatePickerTestingUtils {
    public testDone(): boolean {
        return true;
    }
}

@Component({
    template: `<deja-date-picker style="width: 1000px;">
                </deja-date-picker>`,
})
class DejaDatePickerContainerComponent {
    constructor() {
        document.body.style.width = '1280px';
        document.body.style.height = '1024px';
    }
}

describe('DejaDatePickerContainerComponent', () => {
    let component: DejaDatePickerComponent;
    let fixture: ComponentFixture<DejaDatePickerContainerComponent>;
    let datePickerTestingUtils: DatePickerTestingUtils;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                DejaDatePickerContainerComponent
            ],
            imports: [
                BrowserAnimationsModule,
                DejaDatePickerModule
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        datePickerTestingUtils = new DatePickerTestingUtils();
        fixture = TestBed.createComponent(DejaDatePickerContainerComponent);
        const datePickerDebugElement = fixture.debugElement.query(By.directive(DejaDatePickerComponent));
        component = datePickerDebugElement.componentInstance;
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
        observableFrom((component as any).formatChanged$).pipe(
            first())
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
        observableFrom((component as any).formatChanged$).pipe(
            first())
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

    // it('should display default format when layout is wrong', async(() => {
    //     component.format = null;
    //     component.layout = 'wrongLayout';
    //     Observable.from((component as any).formatChanged$)
    //     .first()
    //     .subscribe((format) => {
    //         expect(format).toEqual('YYYY-MM-DD');
    //         datePickerTestingUtils.testDone();
    //     });

    //     spyOn(datePickerTestingUtils, 'testDone');
    //     fixture.detectChanges();
    //     component.ngOnInit();
    //     fixture.whenStable().then(() => {
    //         expect(datePickerTestingUtils.testDone).toHaveBeenCalled();
    //     });
    // }));

    it('Should be disabled even if disabled is set as a string', () => {
        (component as any).disabled = 'true';
        fixture.detectChanges();
        expect((component as any)._disabled).toBeTruthy();

        (component as any).disabled = '';
        fixture.detectChanges();
        expect((component as any)._disabled).toBeTruthy();

        component.disabled = true;
        fixture.detectChanges();
        expect((component as any)._disabled).toBeTruthy();

        component.disabled = null;
        fixture.detectChanges();
        expect((component as any)._disabled).toBeNull();

        (component as any).disabled = 'false';
        fixture.detectChanges();
        expect((component as any)._disabled).toBeNull();

        component.disabled = false;
        fixture.detectChanges();
        expect((component as any)._disabled).toBeNull();
    });

    it('Should be required even if required is set as a string', () => {
        (component as any).required = 'true';
        fixture.detectChanges();
        expect((component as any)._required).toBeTruthy();

        (component as any).required = '';
        fixture.detectChanges();
        expect((component as any)._required).toBeTruthy();

        component.required = true;
        fixture.detectChanges();
        expect((component as any)._required).toBeTruthy();

        component.required = null;
        fixture.detectChanges();
        expect((component as any)._required).toBeNull();

        (component as any).required = 'false';
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

    describe('free entry', () => {
        beforeEach(() => {
            component.allowFreeEntry = true;
            component.format = 'YYYY-DD-MM';
            // Without dispatchEvent the incorrect input (the one which does not support free text) is set to the DOM
            // Don't know why fixture.detectChanges does not do the job
            fixture.debugElement
                .query(By.css('input'))
                .nativeElement.dispatchEvent(new Event('change'));
            fixture.detectChanges();
        });
        it('should accept string or date as value', () => {
            const input: HTMLInputElement = fixture.debugElement.query(
                By.css('input')
            ).nativeElement;
            input.value = 'ABCD';
            input.dispatchEvent(new Event('change'));
            fixture.detectChanges();
            expect(component.value).toBe('ABCD');
            input.value = '2018-01-01';
            input.dispatchEvent(new Event('change'));
            fixture.detectChanges();
            expect(component.value).toBe('2018-01-01');
        });
    });
});
