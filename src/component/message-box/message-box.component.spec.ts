/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DejaMessageBoxComponent } from './message-box.component';

describe('DejaMessageBoxComponent', () => {

    let component: DejaMessageBoxComponent;
    let fixture: ComponentFixture<DejaMessageBoxComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                DejaMessageBoxComponent
            ],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();

        fixture = TestBed.createComponent(DejaMessageBoxComponent);
        component = fixture.componentInstance;
    }));

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    describe('input type', () => {
        it('should set an info_outline icon if type is info', () => {
            component.icon = null;
            component.type = 'info';
            fixture.detectChanges();
            expect(component.icon).toEqual('info_outline');
        });

        it('should set an info_outline icon if type is primary', () => {
            component.icon = null;
            component.type = 'primary';
            fixture.detectChanges();
            expect(component.icon).toEqual('info_outline');
        });

        it('should set a check icon if type is success', () => {
            component.icon = null;
            component.type = 'success';
            fixture.detectChanges();
            expect(component.icon).toEqual('check');
        });

        it('should set a warning icon if type is warn', () => {
            component.icon = null;
            component.type = 'warn';
            fixture.detectChanges();
            expect(component.icon).toEqual('warning');
        });

        it('should set an error_outline icon if type is danger', () => {
            component.icon = null;
            component.type = 'danger';
            fixture.detectChanges();
            expect(component.icon).toEqual('error_outline');
        });
    });

    describe('input title', () => {
        it('should display title in mat-card-title', () => {
            component.type = 'warn';
            component.title = 'Delete order';
            fixture.detectChanges();

            const el = fixture.debugElement.query(By.css('mat-card-title > span')).nativeElement;
            expect(el.innerHTML).toEqual('Delete order');
        });

        it('should display title in mat-card-content in horizontalMode', () => {
            component.type = 'warn';
            component.title = 'Delete order';
            component.horizontal = true;
            fixture.detectChanges();

            const el = fixture.debugElement.query(By.css('mat-card-content > h2')).nativeElement;
            expect(el.innerHTML).toEqual('Delete order');
        });
    });

    describe('input icon', () => {
        it('should display icon in mat-card-title', () => {
            component.icon = 'randomIcon';
            fixture.detectChanges();

            const el = fixture.debugElement.query(By.css('mat-card-title > mat-icon')).nativeElement;
            expect(el.innerHTML).toEqual('randomIcon');
        });

        it('should not display mat-card-title if no icon', () => {
            component.icon = null;
            fixture.detectChanges();
            expect(fixture.debugElement.query(By.css('mat-card-title'))).toBeNull();
        });
    });

    describe('input actions', () => {
        it('should display a button for each action in mat-card-actions', () => {
            component.actions = [
                {text: 'Yes', 'type': 'info', action: () => {}},
                {text: 'No', type: 'warn', action: () => {}},
            ];
            fixture.detectChanges();

            const els = fixture.debugElement.queryAll(By.css('mat-card-actions > span > button'));
            expect(els.length).toEqual(2);
        });

        it('should display a button with class with-icon if action has an icon and a text', () => {
            component.actions = [
                {text: 'Yes', 'type': 'info', action: () => {}, 'icon': 'randomIcon'}
            ];
            fixture.detectChanges();

            const el = fixture.debugElement.query(By.css('mat-card-actions > span > button')).nativeElement;
            expect(el.className).toEqual('with-icon');
        });

        it('should display a button without class if action has no icon and a text', () => {
            component.actions = [
                {text: 'Yes', 'type': 'info', action: () => {}, icon: null}
            ];
            component.ngOnInit = () => {}; // Prevent ngOnInit to set an icon from type
            fixture.detectChanges();

            const el = fixture.debugElement.query(By.css('mat-card-actions > span > button')).nativeElement;
            expect(el.className).toBeFalsy();
        });

        it('should display a button mat-mini-fab if action has an icon but no text', () => {
            component.actions = [
                {'type': 'info', action: () => {}, 'icon': 'randomIcon'}
            ];
            fixture.detectChanges();

            const el = fixture.debugElement.query(By.css('mat-card-actions > span > button')).nativeElement;
            expect(el.attributes['mat-mini-fab']).toBeTruthy();
        });
    });

});
