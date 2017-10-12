/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { CommonModule } from '@angular/common';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatIconModule, MatInputModule, NoConflictStyleCompatibilityMode } from '@angular/material';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ViewPortService } from '../../common/core/item-list/viewport.service';
import { DejaChipsModule } from '../chips/index';
import { DejaViewPortComponent } from './viewport.component';

describe('DejaViewPortComponent', () => {

    let comp: DejaViewPortComponent;
    let viewPortService: ViewPortService;
    let fixture: ComponentFixture<DejaViewPortComponent>;

    const getNbItems = (): number => {
        const items = fixture.debugElement.queryAll(By.css('#viewport-wrapper > .listitem'));
        return items.length;
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                DejaViewPortComponent
            ],
            imports: [
                CommonModule,
                FlexLayoutModule,
                FormsModule,
                NoConflictStyleCompatibilityMode,
                MatIconModule,
                MatInputModule,
                FlexLayoutModule,
                DejaChipsModule,
                BrowserAnimationsModule,
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(DejaViewPortComponent);
        comp = fixture.componentInstance; // Component test instance
        viewPortService = fixture.debugElement.injector.get(ViewPortService);
    }));

    it('should create the component', async(() => {
        expect(comp).toBeTruthy();
    }));

    it('should init with countries', async(() => {
        const items = Array.from({ length: 3 }, (_v, k) => k);
        comp.items = items;
        comp.refreshViewPort();
        viewPortService.viewPortResult$.asObservable()
            .do(() => fixture.detectChanges())
            // .filter((result) => result.scrollPos !== undefined && result.visibleItems.length > 0) // Ignore viewport for meausre
            .subscribe(() => {
                console.log('Test2');
                expect(getNbItems()).toEqual(items.length);
            });
    }));

    // it('should add items', () => {
    //     expect(getNbItems()).toEqual(0);

    //     comp.onAddItem('CSS3');
    //     fixture.detectChanges();
    //     expect(getNbItems()).toEqual(1);

    //     comp.onAddItem('JSF');
    //     fixture.detectChanges();
    //     expect(getNbItems()).toEqual(2);
    // });

    // it('should not add null item', () => {
    //     expect(getNbItems()).toEqual(0);

    //     comp.onAddItem(null);
    //     fixture.detectChanges();
    //     expect(getNbItems()).toEqual(0);
    // });

    // it('should not add empty item', () => {
    //     expect(getNbItems()).toEqual(0);

    //     comp.onAddItem('');
    //     fixture.detectChanges();
    //     expect(getNbItems()).toEqual(0);
    // });

    // it('should add item on keypress Enter', () => {
    //     expect(getNbItems()).toEqual(0);
    //     const tmp = { keyCode: KeyCodes.Enter, target: { value: 'HTML5' } } as any;

    //     comp.onKeyDown(tmp);
    //     fixture.detectChanges();
    //     expect(getNbItems()).toEqual(1);
    // });

    // it('should not add item on keypress Ctrl', () => {
    //     expect(getNbItems()).toEqual(0);
    //     const tmp = { keyCode: KeyCodes.Ctrl, target: { value: 'HTML5' } } as any;

    //     comp.onKeyDown(tmp);
    //     fixture.detectChanges();
    //     expect(getNbItems()).toEqual(0);
    // });
});
