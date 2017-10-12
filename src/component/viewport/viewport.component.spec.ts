/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NoConflictStyleCompatibilityMode } from '@angular/material';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable } from 'rxjs/Observable';
import { IViewPortItem, ViewPortService } from '../../common/core/item-list/viewport.service';
import { DejaViewPortModule } from './index';
import { DejaViewPortComponent } from './viewport.component';

@Component({
    template: `<deja-viewport style="height: 120px;" [items]="items">
                    <ng-template #itemTemplate let-item>
                        Item {{ item.label }}
                    </ng-template>
                </deja-viewport>`,
})
class DejaViewportContainerComponent {
    public items = Array.from({ length: 100 }, (_v, k) => ({
        label: k,
        size: 10 + k % 20,
    } as IViewPortItem));
}

describe('DejaViewPortComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                DejaViewportContainerComponent,
            ],
            imports: [
                BrowserAnimationsModule,
                CommonModule,
                FormsModule,
                NoConflictStyleCompatibilityMode,
                DejaViewPortModule,
            ],
        }).compileComponents();
    }));

    const noop = () => { };

    const observeViewPort$ = (fixture: ComponentFixture<DejaViewportContainerComponent>, elementCount: number, expectedBeforeSize: number, expectedAfterSize: number, expectedViewPortSize: number) => {
        const viewPortDebugElement = fixture.debugElement.query(By.directive(DejaViewPortComponent));
        const viewPortService = viewPortDebugElement.injector.get(ViewPortService);

        return Observable.from(viewPortService.viewPortResult$)
            .do(() => fixture.detectChanges())
            .filter((result) => result.viewPortSize > 0)
            .do((result) => {
                const listitems = fixture.debugElement.queryAll(By.css('deja-viewport > #viewport-wrapper > .listitem'));
                expect(listitems.length).toEqual(elementCount);
                expect(result.beforeSize).toEqual(expectedBeforeSize);
                expect(result.afterSize).toEqual(expectedAfterSize);
                expect(result.viewPortSize).toEqual(expectedViewPortSize);
            });
    };

    it('should create the component', async(() => {
        const fixture = TestBed.createComponent(DejaViewportContainerComponent);
        fixture.detectChanges();
        const viewPortDebugElement = fixture.debugElement.query(By.directive(DejaViewPortComponent));
        const viewPortInstance = viewPortDebugElement.componentInstance;
        expect(viewPortInstance).toBeTruthy();
    }));

    it('should render all items width viewport disabled', async(() => {
        const fixture = TestBed.createComponent(DejaViewportContainerComponent);
        const viewPortDebugElement = fixture.debugElement.query(By.directive(DejaViewPortComponent));
        const viewPortInstance = viewPortDebugElement.componentInstance as DejaViewPortComponent;

        observeViewPort$(fixture, 100, 0, 1860, 140).subscribe(noop);

        viewPortInstance.viewportMode = 'disabled';
        viewPortInstance.itemSize = 20;
        fixture.detectChanges();
    }));

    it('should render width viewport fixed', async(() => {
        const fixture = TestBed.createComponent(DejaViewportContainerComponent);
        const viewPortDebugElement = fixture.debugElement.query(By.directive(DejaViewPortComponent));
        const viewPortInstance = viewPortDebugElement.componentInstance as DejaViewPortComponent;

        observeViewPort$(fixture, 7, 0, 1860, 140).subscribe(() => noop);

        viewPortInstance.viewportMode = 'fixed';
        viewPortInstance.itemSize = 20;
        fixture.detectChanges();
    }));

    it('should render width viewport variable at position 0', async(() => {
        const fixture = TestBed.createComponent(DejaViewportContainerComponent);
        const viewPortDebugElement = fixture.debugElement.query(By.directive(DejaViewPortComponent));
        const viewPortInstance = viewPortDebugElement.componentInstance as DejaViewPortComponent;

        observeViewPort$(fixture, 9, 0, 1824, 126).subscribe(() => noop);

        viewPortInstance.viewportMode = 'variable';
        fixture.detectChanges();
    }));

    it('should render width viewport variable at position 90', async(() => {
        const fixture = TestBed.createComponent(DejaViewportContainerComponent);
        const viewPortDebugElement = fixture.debugElement.query(By.directive(DejaViewPortComponent));
        const viewPortInstance = viewPortDebugElement.componentInstance as DejaViewPortComponent;
        const viewPortService = viewPortDebugElement.injector.get(ViewPortService);

        observeViewPort$(fixture, 8, 75, 1719, 156).subscribe(noop);

        viewPortService.scrollPosition$.next(90);
        viewPortInstance.viewportMode = 'variable';
        fixture.detectChanges();
    }));

    it('should render width viewport variable at position 1200', async(() => {
        const fixture = TestBed.createComponent(DejaViewportContainerComponent);
        const viewPortDebugElement = fixture.debugElement.query(By.directive(DejaViewPortComponent));
        const viewPortInstance = viewPortDebugElement.componentInstance as DejaViewPortComponent;
        const viewPortService = viewPortDebugElement.injector.get(ViewPortService);

        observeViewPort$(fixture, 9, 1191, 615, 144).subscribe(noop);

        viewPortService.scrollPosition$.next(1200);
        viewPortInstance.viewportMode = 'variable';
        fixture.detectChanges();
    }));
});
