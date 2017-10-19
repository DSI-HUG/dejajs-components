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
import { GroupingService } from '../../common/core/grouping/grouping.service';
import { IItemTree } from '../../common/core/item-list/item-tree';
import { DejaTreeListModule } from './index';
import { DejaTreeListComponent } from './tree-list.component';

@Component({
    template: `<deja-tree-list style="height: 120px;width: 1000px;" [items]="items" multiSelect viewportMode="variable" searchArea sortable>
                    <ng-template #itemTemplate let-item>
                        Item {{ item.displayName }}
                    </ng-template>
                </deja-tree-list>`,
    providers: [
        GroupingService,
    ],
})
class DejaViewportContainerComponent {
    public itemList = [] as IItemTree[];

    constructor(groupingService: GroupingService) {
        for (let i = 0; i < 50; i++) {
            const rand = Math.floor(Math.random() * (70 - 33 + 1)) + 33; // random de 33 à 70
            this.itemList[i] = {} as IItemTree;
            this.itemList[i].size = rand;
            this.itemList[i].displayName = `${i} - Une ligne de test avec une taille de : ${rand}`;
        }

        groupingService.group(this.itemList, [{ groupByField: 'height' }]).then((groupedResult) => {
            this.itemList = groupedResult;
        });
    }
}

describe('DejaTreeListComponent', () => {
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
                DejaTreeListModule,
            ],
        }).compileComponents();
    }));

    // const noop = () => { };

    // const observeTreeList$ = (fixture: ComponentFixture<DejaViewportContainerComponent>, elementCount: number, expectedBeforeSize: number, expectedAfterSize: number, expectedTreeListSize: number, expectedTreeListStartIndex: number, expectedTreeListEndIndex: number) => {
    //     const viewPortDebugElement = fixture.debugElement.query(By.directive(DejaTreeListComponent));
    //     const viewPortService = viewPortDebugElement.injector.get(TreeListService) as TreeListService;

    //     return Observable.from(viewPortService.viewPortResult$)
    //         .do(() => fixture.detectChanges())
    //         .filter((result) => result.viewPortSize > 0)
    //         .do((result) => {
    //             const listitems = fixture.debugElement.queryAll(By.css('deja-viewport > #viewport-wrapper > .listitem'));
    //             expect(listitems.length).toEqual(elementCount);
    //             expect(result.beforeSize).toEqual(expectedBeforeSize);
    //             expect(result.afterSize).toEqual(expectedAfterSize);
    //             expect(result.viewPortSize).toEqual(expectedTreeListSize);
    //             expect(result.startIndex).toEqual(expectedTreeListStartIndex);
    //             expect(result.endIndex).toEqual(expectedTreeListEndIndex);
    //         });
    // };

    it('should create the component', async(() => {
        const fixture = TestBed.createComponent(DejaViewportContainerComponent);
        fixture.detectChanges();
        const viewPortDebugElement = fixture.debugElement.query(By.directive(DejaTreeListComponent));
        const viewPortInstance = viewPortDebugElement.componentInstance;
        expect(viewPortInstance).toBeTruthy();
    }));

    // it('should render horizontally', async(() => {
    //     const fixture = TestBed.createComponent(DejaViewportContainerComponent);
    //     const viewPortDebugElement = fixture.debugElement.query(By.directive(DejaTreeListComponent));
    //     const viewPortInstance = viewPortDebugElement.componentInstance as DejaTreeListComponent;

    //     observeTreeList$(fixture, 51, 0, 980, 1020, 0, 50).subscribe(() => {
    //         // tslint:disable-next-line:no-string-literal
    //         expect(viewPortInstance['clientSize']).toEqual(1000);
    //     });

    //     viewPortInstance.viewportMode = 'fixed';
    //     viewPortInstance.itemSize = 20;
    //     viewPortInstance.direction = 'horizontal';
    //     fixture.detectChanges();
    // }));

    // it('should render all items width viewport disabled', async(() => {
    //     const fixture = TestBed.createComponent(DejaViewportContainerComponent);
    //     const viewPortDebugElement = fixture.debugElement.query(By.directive(DejaTreeListComponent));
    //     const viewPortInstance = viewPortDebugElement.componentInstance as DejaTreeListComponent;

    //     observeTreeList$(fixture, 100, 0, 1860, 140, 0, 99).subscribe(noop);

    //     viewPortInstance.viewportMode = 'disabled';
    //     expect(ViewportMode.disabled === viewPortInstance.viewportMode as any);

    //     viewPortInstance.itemSize = 20;
    //     fixture.detectChanges();
    // }));

    // it('should render with viewport fixed with an item size of 20', async(() => {
    //     const fixture = TestBed.createComponent(DejaViewportContainerComponent);
    //     const viewPortDebugElement = fixture.debugElement.query(By.directive(DejaTreeListComponent));
    //     const viewPortInstance = viewPortDebugElement.componentInstance as DejaTreeListComponent;

    //     observeTreeList$(fixture, 7, 0, 1860, 140, 0, 6).subscribe(() => noop);

    //     viewPortInstance.viewportMode = 'fixed';
    //     expect(ViewportMode.fixed === viewPortInstance.viewportMode as any);

    //     viewPortInstance.itemSize = 20;
    //     fixture.detectChanges();
    // }));

    // it('should render with viewport fixed with an item size of 35', async(() => {
    //     const fixture = TestBed.createComponent(DejaViewportContainerComponent);
    //     const viewPortDebugElement = fixture.debugElement.query(By.directive(DejaTreeListComponent));
    //     const viewPortInstance = viewPortDebugElement.componentInstance as DejaTreeListComponent;

    //     observeTreeList$(fixture, 5, 0, 3325, 175, 0, 4).subscribe(() => noop);

    //     viewPortInstance.viewportMode = 'fixed';
    //     viewPortInstance.itemSize = 35;
    //     fixture.detectChanges();
    // }));

    // it('should render with viewport variable at position 0', async(() => {
    //     const fixture = TestBed.createComponent(DejaViewportContainerComponent);
    //     const viewPortDebugElement = fixture.debugElement.query(By.directive(DejaTreeListComponent));
    //     const viewPortInstance = viewPortDebugElement.componentInstance as DejaTreeListComponent;

    //     observeTreeList$(fixture, 9, 0, 1824, 126, 0, 8).subscribe(() => noop);

    //     viewPortInstance.viewportMode = 'variable';
    //     expect(ViewportMode.variable === viewPortInstance.viewportMode as any);

    //     fixture.detectChanges();
    // }));

    // it('should render with viewport variable at position 90', async(() => {
    //     const fixture = TestBed.createComponent(DejaViewportContainerComponent);
    //     const viewPortDebugElement = fixture.debugElement.query(By.directive(DejaTreeListComponent));
    //     const viewPortInstance = viewPortDebugElement.componentInstance as DejaTreeListComponent;
    //     const viewPortService = viewPortDebugElement.injector.get(TreeListService) as TreeListService;

    //     observeTreeList$(fixture, 8, 75, 1719, 156, 6, 13).subscribe(noop);

    //     viewPortService.scrollPosition$.next(90);
    //     viewPortInstance.viewportMode = 'variable';
    //     fixture.detectChanges();
    // }));

    // it('should render with viewport variable at position 1200', async(() => {
    //     const fixture = TestBed.createComponent(DejaViewportContainerComponent);
    //     const viewPortDebugElement = fixture.debugElement.query(By.directive(DejaTreeListComponent));
    //     const viewPortInstance = viewPortDebugElement.componentInstance as DejaTreeListComponent;
    //     const viewPortService = viewPortDebugElement.injector.get(TreeListService) as TreeListService;

    //     observeTreeList$(fixture, 9, 1191, 615, 144, 62, 70).subscribe(noop);

    //     viewPortService.scrollPosition$.next(1200);
    //     viewPortInstance.viewportMode = 'variable';
    //     fixture.detectChanges();
    // }));

    // it('should render with buttons instead scrollbar at position 0', async(() => {
    //     const fixture = TestBed.createComponent(DejaViewportContainerComponent);
    //     const viewPortDebugElement = fixture.debugElement.query(By.directive(DejaTreeListComponent));
    //     const viewPortInstance = viewPortDebugElement.componentInstance as DejaTreeListComponent;
    //     viewPortInstance.scrollingStyle = 'buttons';
    //     fixture.detectChanges();

    //     observeTreeList$(fixture, 5, 0, 1900, 100, 0, 4).subscribe(() => noop);

    //     viewPortInstance.viewportMode = 'fixed';
    //     viewPortInstance.itemSize = 20;
    //     fixture.detectChanges();
    // }));
});
