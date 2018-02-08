/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DejaComboListComponent } from './combo-list.component';

describe('ComboListComponent', () => {
    let component: DejaComboListComponent<any>;
    let fixture: ComponentFixture<DejaComboListComponent<any>>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DejaComboListComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DejaComboListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
