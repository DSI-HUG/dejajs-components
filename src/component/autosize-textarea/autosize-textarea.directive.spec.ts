/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DejaAutosizeTextAreaDirective } from './autosize-textarea.directive';
import { DejaAutosizeTextAreaModule } from './index';

@Component({
    encapsulation: ViewEncapsulation.None,
    template: `<textarea deja-autosize rows="18" [ngModel]="text"></textarea>`,
    styles: [`* { transition: unset !important; }
    textarea {
        left: 100px;
        top: 100px;
        width: 200px;
        postion: absolute;
    }`]
})
class DejaAutosizeTextAreaComponent {
    public text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br /> Mauris auctor sit amet odio et aliquet. Curabitur auctor eleifend mattis. <br /> Nullam sit amet quam tellus. Ut mattis tellus sed erat ultricies ornare. <br /> Nulla dictum nisi eu tortor lacinia porttitor. Donec eu arcu et enim cursus viverra. <br /> Praesent pulvinar dui nisi, a tincidunt arcu finibus sed.';
}

describe('DejaAutosizeTextAreaDirective', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                DejaAutosizeTextAreaComponent,
            ],
            imports: [
                BrowserAnimationsModule,
                CommonModule,
                FormsModule,
                DejaAutosizeTextAreaModule,
            ]
        }).compileComponents();
    }));

    it('should create the component', async(() => {
        const fixture = TestBed.createComponent(DejaAutosizeTextAreaComponent);
        fixture.detectChanges();
        const debugElement = fixture.debugElement.query(By.directive(DejaAutosizeTextAreaDirective));
        const instance = debugElement.componentInstance;
        expect(instance).toBeTruthy();
    }));

    it('should be by default at 4 lines height', async(() => {
        const fixture = TestBed.createComponent(DejaAutosizeTextAreaComponent);
        fixture.detectChanges();
        const textArea = fixture.debugElement.query(By.css('textarea[deja-autosize]'));
        const textAreaElement = textArea.nativeElement as HTMLElement;
        fixture.whenStable().then(() => {
            expect(textAreaElement.clientHeight).toBeGreaterThan(50);
        });
    }));

    it('should get the right size when content is added', async(() => {
        const fixture = TestBed.createComponent(DejaAutosizeTextAreaComponent);
        fixture.detectChanges();
        const textArea = fixture.debugElement.query(By.css('textarea[deja-autosize]'));
        const textAreaElement = textArea.nativeElement as HTMLTextAreaElement;
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            expect(textAreaElement.clientHeight).toBeGreaterThan(200);
        });
    }));
});
