/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DejaCodeViewerComponent } from './code-viewer.component';

describe('DejaCodeViewerComponent', () => {
    let component: DejaCodeViewerComponent;
    let fixture: ComponentFixture<DejaCodeViewerComponent>;

    beforeEach(waitForAsync(() => {
        void TestBed.configureTestingModule({
            declarations: [
                DejaCodeViewerComponent
            ],
            imports: [
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(DejaCodeViewerComponent);
        component = fixture.componentInstance;
    }));

    it('should create the component', waitForAsync(() => {
        void expect(component).toBeTruthy();
    }));

    it('should load prismjs', waitForAsync(() => {
        fixture.detectChanges();
        return fixture.whenStable().then(() => {
            // eslint-disable-next-line no-prototype-builtins
            void expect(window.hasOwnProperty('Prism')).toBeTruthy();
        });
    }));
});
