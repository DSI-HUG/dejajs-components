/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DejaTimePickerModule } from '.';
import { DejaTimePickerComponent } from './time-picker.component';

describe('DejaTimePickerComponent', () => {
    let component: DejaTimePickerComponent;
    let fixture: ComponentFixture<DejaTimePickerComponent>;

    beforeEach(waitForAsync(() => {
        void TestBed.configureTestingModule({
            imports: [
                DejaTimePickerModule
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(DejaTimePickerComponent);
        component = fixture.componentInstance;
        component.value = new Date(2021, 4, 12, 9, 55);
        fixture.detectChanges();
    }));

    it('should create the component', () => {
        void expect(component).toBeTruthy();
    });
});
