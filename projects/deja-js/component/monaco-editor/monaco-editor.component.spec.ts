/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { from as observableFrom } from 'rxjs';
import { delay } from 'rxjs/operators';
import { DejaMonacoEditorComponent } from './monaco-editor.component';
import { MonacoEditorService } from './monaco-editor.service';

describe('DejaMonacoEditorComponent', () => {
    let component: DejaMonacoEditorComponent;
    let fixture: ComponentFixture<DejaMonacoEditorComponent>;

    beforeEach(async(() => {
        // Define a monaco editor base path just for tests, because webpack configuration or asset plugin not working
        (<any>window).MONACOEDITOR_BASEPATH = 'https://dsi-hug.github.io/dejajs-components/assets/monaco/vs';

        TestBed.configureTestingModule({
            declarations: [
                DejaMonacoEditorComponent,
            ],
            providers: [MonacoEditorService]
        }).compileComponents();

        fixture = TestBed.createComponent(DejaMonacoEditorComponent);
        component = fixture.componentInstance;
    }));

    it('should create the component', async(() => {
        expect(component).toBeTruthy();
    }));

    it('should load monaco editor', (done) => {
        fixture.detectChanges();
        observableFrom(fixture.whenStable()).pipe(
            delay(5000))
            .subscribe(() => {
                fixture.detectChanges();
                expect(window.hasOwnProperty('monaco')).toBeTruthy();
                component.value = '<p class="pTest"><a href="www.google.ch">site google</a></p>';
                fixture.detectChanges();
                const element = fixture.debugElement.query(By.css('.monaco-editor'));
                expect(element).not.toBeNull();
                done();
            });
    }, 10000);
});
