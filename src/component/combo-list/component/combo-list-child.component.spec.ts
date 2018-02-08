/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DejaComboListChildComponent } from './combo-list-child.component';

describe('DejaComboListChildComponent', () => {
    let component: DejaComboListChildComponent<any>;
    let fixture: ComponentFixture<DejaComboListChildComponent<any>>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DejaComboListChildComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DejaComboListChildComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
