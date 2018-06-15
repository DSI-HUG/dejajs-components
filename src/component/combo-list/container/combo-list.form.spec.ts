/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

// import { IDejaAction } from '../../../common/core/action.interface';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DejaComboListModule } from '../index';
import { DejaComboListComponent } from './combo-list.component';

const o1 = {
    id: 0,
    label: 'Jules'
};
const o2 = {
    id: 1,
    label: 'Jim',
};

@Component({
    template: `
    <form novalidate
    [formGroup]="comboListForm">
    <deja-combo-list
        formControlName="comboCtrl"
        [itemsToSelect]="itemToSelect"
        [labelFieldName]="fieldName"
        [sortDirection]="sort"
        [disableFastActions]="disableFastActions"></deja-combo-list>
        </form>`,
})
class DejaComboListContainerComponent {

    public comboListForm: FormGroup;

    public itemToSelect: any[];
    public itemSelected: any[];

    public selectedItems: any[];
    public fieldName = 'label';
    public fields: string[];
    public sort = 'asc';
    public disabled = false;
    public disableFastActions = false;
    private items: any[] = [o1, o2];

    constructor(private _fb: FormBuilder) {
        this.comboListForm = this._fb.group({
            comboCtrl: [this.items],
        });
    }
}

describe('DejaComboListForm', () => {

    let comp: DejaComboListContainerComponent;
    let fixture: ComponentFixture<DejaComboListContainerComponent>;

    beforeEach(
        async(
            () => {

                TestBed.configureTestingModule({
                    declarations: [
                        DejaComboListContainerComponent,
                    ],
                    imports: [
                        BrowserAnimationsModule,
                        CommonModule,
                        MatListModule,
                        ReactiveFormsModule,
                        FormsModule,
                        DejaComboListModule,
                    ]
                }).compileComponents();

                fixture = TestBed.createComponent(DejaComboListContainerComponent);
                comp = fixture.componentInstance;
                comp.fieldName = 'label';
                comp.disabled = false;
            }
        )
    );

    fit('should create an instance', () => {
        expect(comp).toBeTruthy();
    });

    fit('should create the component', () => {
        fixture.detectChanges();
        const debugElement = fixture.debugElement.query(By.directive(DejaComboListComponent));
        const componentInstance = debugElement.componentInstance as DejaComboListComponent<{}>;
        expect(componentInstance).toBeTruthy();
    });

    fit('should fires changes', () => {
        const debugElement = fixture.debugElement.query(By.directive(DejaComboListComponent));
        const componentInstance = debugElement.componentInstance as DejaComboListComponent<{}>;
        const form = comp.comboListForm;
        let valueChanges = false;
        let registerOnChange = false;
        form.valueChanges
            .do(() => {
                valueChanges = true;
            })
            .subscribe();
        componentInstance.registerOnChange(() => {
            registerOnChange = true;
        });

        const comboCtrl = form.get('comboCtrl');
        comboCtrl.patchValue([o1]);

        fixture.detectChanges();

        expect(valueChanges).toBeTruthy();
        expect(registerOnChange).toBeTruthy();

    });

    fit('should have form touched and dirty after raiseAll button click', () => {
        fixture.detectChanges();
        const form = comp.comboListForm;
        const raiseAllButton = fixture.debugElement.query(By.css('button[title="Select all"]'));

        raiseAllButton.nativeElement.click();

        expect(form.touched).toBeTruthy();
        expect(form.dirty).toBeTruthy();
    });

});
