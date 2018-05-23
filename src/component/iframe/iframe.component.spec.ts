/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DejaIFrameComponent } from './iframe.component';

describe('DejaIFrameComponent', () => {
    let component: DejaIFrameComponent;
    let fixture: ComponentFixture<DejaIFrameComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                DejaIFrameComponent,
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(DejaIFrameComponent);
        component = fixture.componentInstance;
    }));

    it('should create the component', async(() => {
        expect(component).toBeTruthy();
    }));

    it('should load a website', () => {
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            // set onload on element
            const iframe = fixture.componentInstance;

            iframe.sourceUrl = 'chrome://version/';
            fixture.detectChanges();

            expect(iframe.sourceUrl).toEqual('chrome://version/');
            iframe.sourceUrl = '';
            fixture.detectChanges();

            expect(iframe.sourceUrl).toBeUndefined();
        });
    });
});
