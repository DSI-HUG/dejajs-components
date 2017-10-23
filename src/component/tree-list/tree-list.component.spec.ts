/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { CommonModule } from '@angular/common';
import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NoConflictStyleCompatibilityMode } from '@angular/material';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable } from 'rxjs/Observable';
import { GroupingService } from '../../common/core/grouping/grouping.service';
import { ItemListService } from '../../common/core/item-list/item-list.service';
import { IItemTree } from '../../common/core/item-list/item-tree';
import { ViewPortService } from '../../common/core/item-list/viewport.service';
import { SortingService } from '../../common/core/sorting/sorting.service';
import { DejaTreeListModule } from './index';
import { DejaTreeListComponent } from './tree-list.component';

@Component({
    template: `<deja-tree-list style="height: 500px;width: 1000px;" [items]="itemList" multiSelect viewportMode="variable" searchArea sortable itemsDraggable pageSize="10">
                    <ng-template #itemTemplate let-item>
                        Item {{ item.displayName }}
                    </ng-template>
                </deja-tree-list>`,
    providers: [
        GroupingService,
    ],
})
class DejaTreeListContainerComponent {
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
    let fixture: ComponentFixture<DejaTreeListContainerComponent>;
    let treeListDebugElement: DebugElement;
    let treeListInstance: DejaTreeListComponent;
    let treeListElement: HTMLElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                DejaTreeListContainerComponent,
            ],
            imports: [
                BrowserAnimationsModule,
                CommonModule,
                FormsModule,
                NoConflictStyleCompatibilityMode,
                DejaTreeListModule,
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(DejaTreeListContainerComponent);
        fixture.detectChanges();
        treeListDebugElement = fixture.debugElement.query(By.directive(DejaTreeListComponent));
        treeListInstance = treeListDebugElement.componentInstance;
        treeListElement = treeListDebugElement.nativeElement as HTMLElement;
    }));

    // const noop = () => { };

    const observeViewPort$ = () => {
        const viewPortService = treeListDebugElement.injector.get(ViewPortService) as ViewPortService;

        return Observable.from(viewPortService.viewPortResult$)
            .do(() => fixture.detectChanges())
            .filter((result) => result.viewPortSize > 0);
    };

    it('should create the component', async(() => {
        expect(treeListInstance).toBeTruthy();
    }));

    it('should return the write property', async(() => {
        const tl = treeListInstance as any;
        const itemListService = treeListInstance.itemListService;

        expect(treeListInstance.sortable).toBeTruthy();
        treeListInstance.sortable = 'false';
        expect(treeListInstance.sortable).toBeFalsy();

        expect(treeListInstance.itemsDraggable).toBeTruthy();
        treeListInstance.itemsDraggable = 'false';
        expect(treeListInstance.itemsDraggable).toBeFalsy();

        expect(treeListInstance.pageSize).toBe(10);
        treeListInstance.pageSize = '5';
        expect(tl.pageSize).toBe(5);
        treeListInstance.pageSize = 0;
        expect(treeListInstance.pageSize).toBe(10);

        expect(treeListInstance.hintLabel).toBeUndefined();
        treeListInstance.hintLabel = 'I am a hint label';
        expect(treeListInstance.hintLabel).toEqual(`I am a hint label`);

        expect(tl._viewPortRowHeight).toBe(ViewPortService.itemDefaultSize);
        treeListInstance.viewPortRowHeight = 100;
        expect(tl._viewPortRowHeight).toBe(100);

        expect(treeListInstance.childrenField).toBeUndefined();
        expect(itemListService.childrenField).toEqual(ItemListService.defaultChildrenField);
        treeListInstance.childrenField = 'children';
        expect(treeListInstance.childrenField).toEqual('children');
        expect(itemListService.childrenField).toEqual('children');

        expect(tl.getTextField()).toEqual(ItemListService.defaultTextField);
        treeListInstance.textField = 'text';
        expect(tl.getTextField()).toEqual('text');

        expect(tl.getValueField()).toEqual(ItemListService.defaultValueField);
        treeListInstance.valueField = 'my value field';
        expect(tl.getValueField()).toEqual('my value field');
        expect(itemListService.valueField).toEqual('my value field');

        expect(treeListInstance.searchField).toBeUndefined();
        treeListInstance.searchField = 'my search field';
        expect(treeListInstance.searchField).toEqual('my search field');

        expect(treeListInstance.multiSelect).toBeTruthy();
        treeListInstance.multiSelect = 'false';
        expect(treeListInstance.multiSelect).toBeFalsy();

        const myItemListService = new ItemListService();
        expect(treeListInstance.itemListService).toBeDefined();
        treeListInstance.itemListService = myItemListService;
        expect(treeListInstance.itemListService).toBe(myItemListService);

        const sortingService = new SortingService();
        expect(myItemListService.getSortingService()).toBeDefined();
        treeListInstance.sortingService = sortingService;
        expect(myItemListService.getSortingService()).toBe(sortingService);

        const groupingService = new GroupingService();
        expect(myItemListService.getGroupingService()).toBeDefined();
        treeListInstance.groupingService = groupingService;
        expect(myItemListService.getGroupingService()).toBe(groupingService);

        expect(treeListInstance.minSearchlength).toBe(0);
        treeListInstance.minSearchlength = '3';
        expect(tl.minSearchlength).toBe(3);

        expect(treeListInstance.disabled).toBeNull();
        treeListInstance.disabled = 'false';
        expect(treeListInstance.disabled).toBeFalsy();

        expect(treeListInstance.waiter).toBeFalsy();
        treeListInstance.waiter = true;
        expect(treeListInstance.waiter).toBeTruthy();
    }));

    it('should return the write item class', async(() => {
        const tl = treeListInstance as any;
        const item = {
            className: null,
            collapsing: false,
            expanding: false,
            depth : 0,
            collapsed: false,
            selected: false,
            odd : false,
        } as IItemTree;
        expect(tl.getItemClass(item)).toEqual('listitem');

        item.className = 'test';
        expect(tl.getItemClass(item)).toEqual('listitem test');

        item.collapsing = true;
        expect(tl.getItemClass(item)).toEqual('listitem test hide');

        item.collapsing = false;
        expect(tl.getItemClass(item)).toEqual('listitem test');

        item.expanding = true;
        expect(tl.getItemClass(item)).toEqual('listitem test hide');

        item.expanding = false;
        expect(tl.getItemClass(item)).toEqual('listitem test');

        item.collapsed = true;
        expect(tl.getItemClass(item)).toEqual('listitem test collapsed');

        item.selected = true;
        expect(tl.getItemClass(item)).toEqual('listitem test collapsed selected');

        item.selectable  = true;
        expect(tl.getItemClass(item)).toEqual('listitem test collapsed selected');

        item.selectable  = false;
        expect(tl.getItemClass(item)).toEqual('listitem test collapsed selected unselectable');

        item.odd  = true;
        expect(tl.getItemClass(item)).toEqual('listitem test collapsed selected unselectable odd');

        observeViewPort$().subscribe(() => {
            expect(tl.getItemClass(item)).toEqual('listitem test parent collapsed selected unselectable');
        });
    }));
});
