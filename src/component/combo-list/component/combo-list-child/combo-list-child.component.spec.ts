/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { By } from '@angular/platform-browser';
import { MatListModule } from '@angular/material';
import { DejaComboListChildComponent } from './combo-list-child.component';

// class ComboListTestModel {
//     public id: number;
//     public secretName: string;
//     public surname: string;
//     public firstName: string;
//     public gender: string;
// }

describe('DejaComboListChildComponent', () => {

    let mycomp: DejaComboListChildComponent<{}>;
    let fixture: ComponentFixture<DejaComboListChildComponent<{}>>;

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

            }
        )
    );

    it('should create the component', () => {
        expect(mycomp).toBeTruthy();
    });

    //     xit('should init with string items', () => {
    //         const o1: ComboListTestModel = {
    //             id: 0,
    //             secretName: 'casc',
    //             surname: 'casc',
    //             firstName: 'casc',
    //             gender: 'casc',
    //         };
    //         const o2: ComboListTestModel = {
    //             id: 0,
    //             secretName: 'casc',
    //             surname: 'casc',
    //             firstName: 'casc',
    //             gender: 'casc',
    //         };
    //         component.items = [o1, o2];
    //         fixture.detectChanges();
    //         const spans = fixture.debugElement.queryAll(By.css('mat-list-option'));
    //         expect(spans.length).toEqual(2);
    //         // expect(spans[0].nativeElement.innerHTML).toEqual('Angular 2');
    //         // expect(spans[1].nativeElement.innerHTML).toEqual('Java');
    //         // expect(spans[2].nativeElement.innerHTML).toEqual('Oracle');
    // });

});
