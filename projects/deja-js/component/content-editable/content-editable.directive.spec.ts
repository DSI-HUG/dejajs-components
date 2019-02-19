/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { CommonModule } from '@angular/common';
import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DejaEditableDirective } from './content-editable.directive';
import { DejaEditableModule } from './index';

@Component({
    template: `<span deja-editable="false" [ngModel]="text"></span>`,
})
class DejaEditableContainerComponent {
    public text = 'Content to edit';
}

describe('DejaEditableDirective', () => {
    let fixture: ComponentFixture<DejaEditableContainerComponent>;
    let editableDebugElement: DebugElement;
    let editableInstance: DejaEditableDirective;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                DejaEditableContainerComponent,
            ],
            imports: [
                BrowserAnimationsModule,
                CommonModule,
                FormsModule,
                DejaEditableModule,
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(DejaEditableContainerComponent);
        fixture.detectChanges();
        editableDebugElement = fixture.debugElement.query(By.directive(DejaEditableDirective));
        editableInstance = editableDebugElement.injector.get(DejaEditableDirective);
    }));

    it('should create the component', async(() => {
        expect(editableDebugElement).not.toBeNull();
        expect(editableInstance).toBeTruthy();
    }));

    it('should get and set the model', async(() => {
        expect(editableInstance.value).toEqual('Content to edit');
        editableInstance.value = 'Content edited!';
        expect(editableInstance.value).toEqual('Content edited!');
    }));

    it('should able to pass in edition programatically', async(() => {
        const element = editableDebugElement.nativeElement as HTMLElement;
        const privateAccessInstance = editableInstance as any;

        expect(editableInstance.editMode).toBeFalsy();
        expect(editableInstance.inEdition).toBeFalsy();
        expect(element.getAttribute('contenteditable')).toBeNull();
        editableInstance.inEdition = 'true';
        fixture.detectChanges();

        expect(editableInstance.inEdition).toBeTruthy();
        expect(element.getAttribute('contenteditable')).toEqual('true');

        editableInstance.disabled = 'true';
        fixture.detectChanges();

        expect(editableInstance.inEdition).toBeFalsy();
        expect(privateAccessInstance._disabled).toBeTruthy();

        editableInstance.inEdition = 'true';
        fixture.detectChanges();

        expect(editableInstance.inEdition).toBeFalsy();
        expect(privateAccessInstance._disabled).toBeTruthy();

        editableInstance.disabled = 'false';
        fixture.detectChanges();

        editableInstance.edit(true);
        expect(editableInstance.inEdition).toBeTruthy();
    }));

    it('should get and set multiline', async(() => {
        expect(editableInstance.multiline).toBeFalsy();
        editableInstance.multiline = 'true';
        expect(editableInstance.multiline).toBeTruthy();
    }));

    it('should get and set mandatory', async(() => {
        expect(editableInstance.mandatory).toBeFalsy();
        editableInstance.mandatory = 'true';
        expect(editableInstance.mandatory).toBeTruthy();
    }));
});
