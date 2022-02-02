/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { delay, from } from 'rxjs';

import { MonacoEditorModule } from '.';
import { MonacoEditorComponent } from './monaco-editor.component';
import { MonacoEditorService } from './monaco-editor.service';

describe('MonacoEditorComponent', () => {
    let component: MonacoEditorComponent;
    let fixture: ComponentFixture<MonacoEditorComponent>;

    beforeEach(waitForAsync(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any,  @typescript-eslint/no-unsafe-assignment
        const wnd = <any>window;
        // Define a monaco editor base path just for tests, because webpack configuration or asset plugin not working
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        wnd.MONACOEDITOR_BASEPATH = 'https://dsi-hug.github.io/dejajs-components/assets/monaco/vs';

        void TestBed.configureTestingModule({
            imports: [
                MonacoEditorModule
            ],
            providers: [MonacoEditorService]
        }).compileComponents();

        fixture = TestBed.createComponent(MonacoEditorComponent);
        component = fixture.componentInstance;
    }));

    it('should create the component', waitForAsync(() => {
        void expect(component).toBeTruthy();
    }));

    it('should load monaco editor', done => {
        fixture.detectChanges();
        from(fixture.whenStable()).pipe(
            delay(1500)
        ).subscribe(() => {
            fixture.detectChanges();
            // eslint-disable-next-line no-prototype-builtins
            void expect(window.hasOwnProperty('monaco')).toBeTruthy();
            component.value = '<p class="pTest"><a href="www.google.ch">site google</a></p>';
            fixture.detectChanges();
            const element = fixture.debugElement.query(By.css('monaco-editor-control'));
            void expect(element).not.toBeNull();
            done();
        });
    }, 5000);
});
