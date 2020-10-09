/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { timer } from 'rxjs';

import { DejaEditorComponent } from './deja-editor.component';
import { DejaEditorModule } from './deja-editor.module';
import { DejaEditorService } from './deja-editor.service';

describe('DejaEditorComponent', () => {
    let component: DejaEditorComponent;
    let fixture: ComponentFixture<DejaEditorComponent>;

    beforeEach(waitForAsync(() => {
        // Define a ckeditor base path just for tests, because webpack configuration or asset plugin not working
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (<any>window).CKEDITOR_BASEPATH = 'https://dsi-hug.github.io/dejajs-components/assets/ckeditor/';

        void TestBed.configureTestingModule({
            imports: [
                DejaEditorModule
            ],
            providers: [DejaEditorService]
        }).compileComponents();

        fixture = TestBed.createComponent(DejaEditorComponent);
        component = fixture.componentInstance;
    }));

    it('should create the component', waitForAsync(() => {
        void expect(component).toBeTruthy();
    }));

    it('should load ckeditor', done => {
        fixture.detectChanges();
        return fixture.whenStable().then(() => {
            timer(5000).subscribe(() => {
                fixture.detectChanges();
                // eslint-disable-next-line no-prototype-builtins
                void expect(window.hasOwnProperty('CKEDITOR')).toBeTruthy();
                const element = fixture.debugElement.query(By.css('textarea'));
                void expect(element).not.toBeNull();
                done();
            });
        });
    }, 10000);
});
