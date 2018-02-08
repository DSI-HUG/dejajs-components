/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComboListDemoComponent } from './combo-list.component';

describe('ComboListDemoComponent', () => {
    let component: ComboListDemoComponent;
    let fixture: ComponentFixture<ComboListDemoComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ComboListDemoComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ComboListDemoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
