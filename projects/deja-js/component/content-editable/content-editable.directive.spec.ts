/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { DejaEditableDirective } from './content-editable.directive';
import { DejaEditableModule } from './index';

@Component({
    selector: 'DejaEditableContainerComponent',
    template: '<span deja-editable="false" [ngModel]="text"></span>'
})
class DejaEditableContainerComponent {
    public text = 'Content to edit';
}

describe('DejaEditableDirective', () => {
    let fixture: ComponentFixture<DejaEditableContainerComponent>;
    let editableDebugElement: DebugElement;
    let editableInstance: DejaEditableDirective;

    beforeEach(waitForAsync(() => {
        void TestBed.configureTestingModule({
            declarations: [
                DejaEditableContainerComponent
            ],
            imports: [
                FormsModule,
                DejaEditableModule
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(DejaEditableContainerComponent);
        fixture.detectChanges();
        editableDebugElement = fixture.debugElement.query(By.directive(DejaEditableDirective));
        editableInstance = editableDebugElement.injector.get(DejaEditableDirective);
    }));

    it('should create the component', waitForAsync(() => {
        void expect(editableDebugElement).not.toBeNull();
        void expect(editableInstance).toBeTruthy();
    }));

    it('should get and set the model', waitForAsync(() => {
        void expect(editableInstance.value).toEqual('Content to edit');
        editableInstance.value = 'Content edited!';
        void expect(editableInstance.value).toEqual('Content edited!');
    }));

    it('should able to pass in edition programatically', waitForAsync(() => {
        const element = editableDebugElement.nativeElement as HTMLElement;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment
        const privateAccessInstance = editableInstance as any;

        void expect(editableInstance.editMode).toBeFalsy();
        void expect(editableInstance.inEdition).toBeFalsy();
        void expect(element.getAttribute('contenteditable')).toBeNull();
        editableInstance.inEdition = 'true';
        fixture.detectChanges();

        void expect(editableInstance.inEdition).toBeTruthy();
        void expect(element.getAttribute('contenteditable')).toEqual('true');

        editableInstance.disabled = 'true';
        fixture.detectChanges();

        void expect(editableInstance.inEdition).toBeFalsy();
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        void expect(privateAccessInstance.disabled).toBeTruthy();

        editableInstance.inEdition = 'true';
        fixture.detectChanges();

        void expect(editableInstance.inEdition).toBeFalsy();
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        void expect(privateAccessInstance.disabled).toBeTruthy();

        editableInstance.disabled = 'false';
        fixture.detectChanges();

        editableInstance.edit(true);
        void expect(editableInstance.inEdition).toBeTruthy();
    }));

    it('should get and set multiline', waitForAsync(() => {
        void expect(editableInstance.multiline).toBeFalsy();
        editableInstance.multiline = 'true';
        void expect(editableInstance.multiline).toBeTruthy();
    }));

    it('should get and set mandatory', waitForAsync(() => {
        void expect(editableInstance.mandatory).toBeFalsy();
        editableInstance.mandatory = 'true';
        void expect(editableInstance.mandatory).toBeTruthy();
    }));
});
