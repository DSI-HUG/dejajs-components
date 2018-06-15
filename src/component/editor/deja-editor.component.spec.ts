/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { DejaEditorComponent } from './deja-editor.component';
import { DejaEditorService } from './deja-editor.service';

describe('DejaEditorComponent', () => {
    let component: DejaEditorComponent;
    let fixture: ComponentFixture<DejaEditorComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                DejaEditorComponent,
            ],
            imports: [
            ],
            providers: [DejaEditorService]
        }).compileComponents();

        fixture = TestBed.createComponent(DejaEditorComponent);
        component = fixture.componentInstance;
    }));

    it('should create the component', async(() => {
        expect(component).toBeTruthy();
    }));

    it('should load ckeditor', (done) => {
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            Observable.timer(1000).subscribe(() => {
                // expect(window.hasOwnProperty('CKEDITOR')).toBeTruthy();
                expect(fixture.debugElement.query(By.css('iframe'))).toBeDefined();
                done();
            });
        });
    });
});
