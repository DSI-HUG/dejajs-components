/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { By } from '@angular/platform-browser';
import { IDejaAction } from '../../../../common/core/action.interface';
import { DejaComboListActionbarComponent } from './combo-list-actionbar.component';

describe('DejaComboListActionbarComponent', () => {

    let mycomp: DejaComboListActionbarComponent;
    let fixture: ComponentFixture<DejaComboListActionbarComponent>;

    beforeEach(
        async(
            () => {
                TestBed.configureTestingModule({
                    declarations: [
                        DejaComboListActionbarComponent,
                    ],
                    imports: [
                        MatButtonModule,
                        MatIconModule,
                    ]
                }).compileComponents();

                fixture = TestBed.createComponent(DejaComboListActionbarComponent);
                mycomp = fixture.componentInstance;
            }
        )
    );

    it('should create the component', () => {
        expect(mycomp).toBeTruthy();
    });

    it('should init with four buttons', () => {
        fixture.detectChanges();
        const buts = fixture.debugElement.queryAll(By.css('button'));
        expect(buts.length).toEqual(4);
    });

    it('should init without fast action button', () => {
        mycomp.disableFastActions = true;
        fixture.detectChanges();
        const buts = fixture.debugElement.queryAll(By.css('button'));
        expect(buts.length).toEqual(2);
    });

    it('should disable buttons', () => {
        mycomp.disabled = true;
        fixture.detectChanges();
        const buts = fixture.debugElement.queryAll(By.css('button'));
        expect(buts[0].nativeElement.disabled).toBeTruthy();
    });

    it('should fire actions', () => {
        let action: IDejaAction;
        fixture.detectChanges();
        mycomp.action.subscribe((act: IDejaAction) => action = act);
        const buts = fixture.debugElement.queryAll(By.css('button'));
        const buttOne = buts[1];
        buttOne.triggerEventHandler('click', null);
        expect(action).toBeTruthy();
        expect(action.type).toEqual('raiseBuffer');
    });

});
