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

    it('should not emit closed event if click inside the dialog', () => {
        const spy = spyOn(component.closed, 'emit').and.callThrough();
        fixture.debugElement.query(By.css('.dialog')).nativeElement.click();
        void expect(spy).not.toHaveBeenCalled();
    });

    it('should emit closed event one time if click outside the dialog', () => {
        const spy = spyOn(component.closed, 'emit').and.callThrough();

        const event = {
            target: {},
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            preventDefault: () => {}
        };

        component.close(event as MouseEvent);
        void expect(spy).toHaveBeenCalledTimes(1);
    });

});
