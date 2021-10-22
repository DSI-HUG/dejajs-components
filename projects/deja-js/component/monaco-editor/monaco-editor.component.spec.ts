/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DejaMonacoEditorModule } from '.';
import { DejaMonacoEditorComponent } from './monaco-editor.component';
import { MonacoEditorService } from './monaco-editor.service';


describe('DejaMonacoEditorComponent', () => {
    let component: DejaMonacoEditorComponent;
    let fixture: ComponentFixture<DejaMonacoEditorComponent>;

    beforeEach(waitForAsync(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment
        const wnd = <any>window;
        // Define a monaco editor base path just for tests, because webpack configuration or asset plugin not working
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        wnd.MONACOEDITOR_BASEPATH = 'https://dsi-hug.github.io/dejajs-components/assets/monaco/vs';

        void TestBed.configureTestingModule({
            imports: [
                DejaMonacoEditorModule
            ],
            providers: [MonacoEditorService]
        }).compileComponents();

        fixture = TestBed.createComponent(DejaMonacoEditorComponent);
        component = fixture.componentInstance;
    }));

    it('should create the component', waitForAsync(() => {
        void expect(component).toBeTruthy();
    }));
});
/*  */
