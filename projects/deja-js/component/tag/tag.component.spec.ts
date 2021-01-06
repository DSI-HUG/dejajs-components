/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { KeyCodes } from '@deja-js/component/core';

import { DejaTagModule } from '.';
import { DejaTagComponent } from './tag.component';

describe('DejaTagComponent', () => {

    let comp: DejaTagComponent;
    let fixture: ComponentFixture<DejaTagComponent>;

    const getNbItems = (): number => {
        const items = fixture.debugElement.queryAll(By.css('deja-chips > span'));
        return items.length;
    };

    beforeEach(waitForAsync(() => {
        void TestBed.configureTestingModule({
            imports: [
                BrowserAnimationsModule,
                DejaTagModule
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(DejaTagComponent);
        comp = fixture.componentInstance; // Component test instance
    }));

    it('should create the component', waitForAsync(() => {
        void expect(comp).toBeTruthy();
    }));

    it('should init with items', () => {
        comp.value = ['Angular', 'HTML5'];
        fixture.detectChanges();
        void expect(getNbItems()).toEqual(2);
    });

    it('should add items', () => {
        void expect(getNbItems()).toEqual(0);

        comp.onAddItem('CSS3');
        fixture.detectChanges();
        void expect(getNbItems()).toEqual(1);

        comp.onAddItem('JSF');
        fixture.detectChanges();
        void expect(getNbItems()).toEqual(2);
    });

    it('should not add null item', () => {
        void expect(getNbItems()).toEqual(0);

        comp.onAddItem(null);
        fixture.detectChanges();
        void expect(getNbItems()).toEqual(0);
    });

    it('should not add empty item', () => {
        void expect(getNbItems()).toEqual(0);

        comp.onAddItem('');
        fixture.detectChanges();
        void expect(getNbItems()).toEqual(0);
    });

    it('should add item on keypress Enter', () => {
        void expect(getNbItems()).toEqual(0);
        const tmp = { code: KeyCodes.Enter, target: { value: 'HTML5' } } as never;

        comp.onKeyDown(tmp);
        fixture.detectChanges();
        void expect(getNbItems()).toEqual(1);
    });

    it('should not add item on keypress Ctrl', () => {
        void expect(getNbItems()).toEqual(0);
        const tmp = { code: KeyCodes.Ctrl, target: { value: 'HTML5' } } as never;

        comp.onKeyDown(tmp);
        fixture.detectChanges();
        void expect(getNbItems()).toEqual(0);
    });
});
