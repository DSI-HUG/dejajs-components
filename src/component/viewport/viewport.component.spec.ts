/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
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

    // it('should create the component', async(() => {
    //     const fixture = TestBed.createComponent(DejaViewportContainerComponent);
    //     fixture.detectChanges();
    //     const viewPortDebugElement = fixture.debugElement.query(By.directive(DejaViewPortComponent));
    //     const viewPortInstance = viewPortDebugElement.componentInstance;
    //     expect(viewPortInstance).toBeTruthy();
    // }));

    // it('should render all items width viewport disabled', async(() => {
    //     const fixture = TestBed.createComponent(DejaViewportContainerComponent);
    //     const viewPortDebugElement = fixture.debugElement.query(By.directive(DejaViewPortComponent));
    //     const viewPortInstance = viewPortDebugElement.componentInstance as DejaViewPortComponent;
    //     const viewPortService = viewPortDebugElement.injector.get(ViewPortService);

    //     Observable.from(viewPortService.viewPortResult$)
    //         .filter((result) => result.viewPortSize > 0)
    //         .do(() => fixture.detectChanges())
    //         .map(() => fixture.debugElement.queryAll(By.css('deja-viewport > #viewport-wrapper > .listitem')))
    //         .subscribe((listitems) => expect(listitems.length).toEqual(100));

    //     viewPortInstance.viewportMode = 'disabled';
    //     viewPortInstance.itemSize = 20;
    //     fixture.detectChanges();
    // }));

    // it('should render 7 items width viewport fixed', async(() => {
    //     const fixture = TestBed.createComponent(DejaViewportContainerComponent);
    //     const viewPortDebugElement = fixture.debugElement.query(By.directive(DejaViewPortComponent));
    //     const viewPortInstance = viewPortDebugElement.componentInstance as DejaViewPortComponent;
    //     const viewPortService = viewPortDebugElement.injector.get(ViewPortService);

    //     Observable.from(viewPortService.viewPortResult$)
    //         .do(() => fixture.detectChanges())
    //         .filter((result) => result.viewPortSize > 0)
    //         .map(() => fixture.debugElement.queryAll(By.css('deja-viewport > #viewport-wrapper > .listitem')))
    //         .subscribe((listitems) => expect(listitems.length).toEqual(7));

    //     viewPortInstance.viewportMode = 'fixed';
    //     viewPortInstance.itemSize = 20;
    //     fixture.detectChanges();
    // }));

    it('should render width viewport variable', async(() => {
        const fixture = TestBed.createComponent(DejaViewportContainerComponent);
        const viewPortDebugElement = fixture.debugElement.query(By.directive(DejaViewPortComponent));
        const viewPortInstance = viewPortDebugElement.componentInstance as DejaViewPortComponent;
        const viewPortService = viewPortDebugElement.injector.get(ViewPortService);

        Observable.from(viewPortService.viewPortResult$)
            .do(() => fixture.detectChanges())
            .filter((result) => result.viewPortSize > 0)
            .map(() => fixture.debugElement.queryAll(By.css('deja-viewport > #viewport-wrapper > .listitem')))
            .subscribe((listitems) => expect(listitems.length).toEqual(9));

        viewPortInstance.viewportMode = 'variable';
        fixture.detectChanges();
    }));
});
