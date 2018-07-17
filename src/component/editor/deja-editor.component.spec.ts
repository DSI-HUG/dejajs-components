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
    let originalTimeout: number;

    beforeEach(async(() => {
        // Define a ckeditor base path just for tests, because webpack configuration or asset plugin not working
        (<any>window).CKEDITOR_BASEPATH = 'https://dsi-hug.github.io/dejajs-components/assets/ckeditor/';

        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

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

    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    it('should create the component', async(() => {
        expect(component).toBeTruthy();
    }));

    it('should load ckeditor', (done) => {
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            Observable.timer(5000).subscribe(() => {
                expect(window.hasOwnProperty('CKEDITOR')).toBeTruthy();
                expect(fixture.debugElement.query(By.css('iframe'))).toBeDefined();
                done();
            });
        });
    });
});
