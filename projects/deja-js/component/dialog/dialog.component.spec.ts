/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { DejaDialogModule } from '.';
import { DejaDialogComponent } from './dialog.component';

describe('DejaDialogComponent', () => {

    let component: DejaDialogComponent;
    let fixture: ComponentFixture<DejaDialogComponent>;

    beforeEach(waitForAsync(() => {
        void TestBed.configureTestingModule({
            imports: [
                DejaDialogModule
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(DejaDialogComponent);
        component = fixture.componentInstance;
    }));

    it('should create the component', () => {
        void expect(component).toBeTruthy();
    });

    it('should emit closed event if click on the toolbar button', done => {
        (fixture.debugElement.query(By.css('[data-cy="close-button"]')).nativeElement as HTMLElement).click();
        component.close$.subscribe(response => {
            expect(response).toBeUndefined();
            done();
        });
    });
});
