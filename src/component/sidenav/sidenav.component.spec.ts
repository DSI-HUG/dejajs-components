/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DejaSidenavModule } from './index';
import { DejaSidenavComponent } from './sidenav.component';

describe('DejaSidenavComponent', () => {

    let comp: DejaSidenavComponent;
    let fixture: ComponentFixture<DejaSidenavComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                DejaSidenavModule
            ],
            schemas: [NO_ERRORS_SCHEMA],
        }).compileComponents();

        fixture = TestBed.createComponent(DejaSidenavComponent);
        comp = fixture.componentInstance; // Component test instance
    }));

    it('should create the component', async(() => {
        comp.ngOnInit();
        expect(comp).toBeTruthy();
    }));
});
