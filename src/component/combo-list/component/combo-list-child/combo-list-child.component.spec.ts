/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatListModule } from '@angular/material/list';
import { By } from '@angular/platform-browser';
import { IDejaAction } from '../../../../common/core/action.interface';
import { DejaComboListChildComponent } from './combo-list-child.component';

describe('DejaComboListChildComponent', () => {

    let mycomp: DejaComboListChildComponent<{}>;
    let fixture: ComponentFixture<DejaComboListChildComponent<{}>>;
    const o1 = {
        id: 0,
        label: 'Jules'
    };
    const o2 = {
        id: 1,
        label: 'Jim',
    };

    beforeEach(
        async(
            () => {

                TestBed.configureTestingModule({
                    declarations: [
                        DejaComboListChildComponent,
                    ],
                    imports: [
                        MatListModule,
                    ]
                }).compileComponents();

                fixture = TestBed.createComponent(DejaComboListChildComponent);
                mycomp = fixture.componentInstance;
                mycomp.items = [o1, o2];
                mycomp.labelFieldName = 'label';
                mycomp.disabled = false;
                mycomp.itemsBuffer = [];
            }
        )
    );

    it('should create the component', () => {
        expect(mycomp).toBeTruthy();
    });

    it('should init with items', () => {
        fixture.detectChanges();
        const texts = fixture.debugElement.queryAll(By.css('.mat-list-text'));
        expect(texts.length).toEqual(2);
        expect(texts[0].nativeElement.innerHTML).toEqual('Jules');
        expect(texts[1].nativeElement.innerHTML).toEqual('Jim');
    });

    it('should init without items', () => {
        mycomp.items = [];
        fixture.detectChanges();
        const options = fixture.debugElement.queryAll(By.css('mat-list-option'));
        expect(options.length).toEqual(0);
    });

    it('should emit actions on item click', () => {
        let counter = 0;
        mycomp.action.subscribe((action: IDejaAction) => {
            expect(action).toBeTruthy();
            if (counter++ === 0) {
                expect(action.type).toEqual('single');
            } else {
                expect(action.type).toEqual('double');
            }
            expect(action.payload).toBe(o1);
        });

        fixture.detectChanges();
        const options = fixture.debugElement.queryAll(By.css('mat-list-option'));
        const firstOption = options[0];
        firstOption.triggerEventHandler('click', null);
        firstOption.triggerEventHandler('click', null);
    });

    it('should not emit actions if disabled', () => {
        mycomp.disabled = true;
        mycomp.action.subscribe(() => {
            expect(true).toBeFalsy();
        });
        fixture.detectChanges();
        const options = fixture.debugElement.queryAll(By.css('mat-list-option.mat-list-item-disabled'));
        expect(options.length).toBe(2);
        const firstOption = options[0];
        firstOption.triggerEventHandler('click', null);
    });

    it('should init with items already selected', () => {
        mycomp.itemsBuffer = [o2];
        fixture.detectChanges();
        const options = fixture.debugElement.queryAll(By.css('mat-list-option.list-selected'));
        expect(options.length).toBe(1);
    });

});
