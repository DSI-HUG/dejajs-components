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
import { FlexLayoutModule } from '@angular/flex-layout';
import { DejaDatePickerComponent } from './date-picker.component';

describe('DejaDatePickerComponent', () => {
    let component: DejaDatePickerComponent;
    let fixture: ComponentFixture<DejaDatePickerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                DejaDatePickerComponent
            ],
            imports: [FlexLayoutModule, OverlayModule],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();
    }));

    beforeEach(() => {
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
});
