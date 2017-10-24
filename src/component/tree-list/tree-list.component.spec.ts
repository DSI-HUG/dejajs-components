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
import { GroupingService } from '../../common/core/grouping/grouping.service';
import { IItemBase } from '../../common/core/item-list/item-base';
import { ItemListService } from '../../common/core/item-list/item-list.service';
import { IItemTree } from '../../common/core/item-list/item-tree';
import { ViewPortService } from '../../common/core/item-list/viewport.service';
import { ISortInfos } from '../../common/core/sorting/sort-infos.model';
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
        const itemList = Array.apply(null, { length: 2000 }).map((_n, i) => {
            const rand = Math.floor(Math.random() * (70 - 33 + 1)) + 33; // random de 33 à 70
            return {
                size: rand,
                displayName: `${i} - Une ligne de test avec une taille de : ${rand}`,
            } as IItemTree;
        });

        groupingService.group$(itemList, [{ groupByField: 'size' }])
            .first()
            .subscribe((groupedResult) => {
                this.itemList = groupedResult;
            });
    }
}

@Component({
    template: `<deja-tree-list style="height: 500px;width: 1000px;" [models]="modelsList$" multiSelect viewportMode="fixed" searchArea sortable itemsDraggable pageSize="10" valueField="model.id">
                    <ng-template #itemTemplate let-item>
                        Item {{ item.displayName }}
                    </ng-template>
                </deja-tree-list>`,
    providers: [
        SortingService,
    ],
})
class DejaTreeListByModelContainerComponent {
    public modelsList$: Observable<any[]>;

    constructor(sortingService: SortingService) {
        const modelsList = Array.apply(null, { length: 2000 }).map((_n, i) => {
            const rand = Math.floor(Math.random() * (70 - 33 + 1)) + 33; // random de 33 à 70;
            return {
                id: i,
                value: rand,
                displayName: `${i} - Une ligne de test avec une valeur de : ${rand}`,
            };
        });

        this.modelsList$ = sortingService.sort$(modelsList, { name: 'value' } as ISortInfos);
    }
}

describe('DejaTreeListComponent', () => {
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
    }));

    const observeViewPort$ = (fixture: ComponentFixture<DejaTreeListContainerComponent>) => {
        const treeListDebugElement = fixture.debugElement.query(By.directive(DejaTreeListComponent));
        const viewPortService = treeListDebugElement.injector.get(ViewPortService) as ViewPortService;

        return Observable.from(viewPortService.viewPortResult$)
            .filter((result) => result.viewPortSize > 0);
    };

    it('should create the component', async(() => {
        const fixture = TestBed.createComponent(DejaTreeListContainerComponent);
        fixture.detectChanges();
        const treeListDebugElement = fixture.debugElement.query(By.directive(DejaTreeListComponent));
        const treeListInstance = treeListDebugElement.componentInstance as DejaTreeListComponent;
        expect(treeListInstance).toBeTruthy();
    }));

    it('should return the write property', (() => {
        const fixture = TestBed.createComponent(DejaTreeListContainerComponent);
        const treeListDebugElement = fixture.debugElement.query(By.directive(DejaTreeListComponent));
        const treeListInstance = treeListDebugElement.componentInstance as DejaTreeListComponent;
        const tl = treeListInstance as any;
        const itemListService = treeListInstance.itemListService;
        fixture.detectChanges();

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

    it('should return the write item class', (() => {
        const fixture = TestBed.createComponent(DejaTreeListContainerComponent);
        fixture.detectChanges();
        const treeListDebugElement = fixture.debugElement.query(By.directive(DejaTreeListComponent));
        const treeListInstance = treeListDebugElement.componentInstance as DejaTreeListComponent;
        const tl = treeListInstance as any;

        const item = {
            className: null,
            collapsing: false,
            expanding: false,
            depth: 0,
            collapsed: false,
            selected: false,
            odd: false,
        } as IItemTree;
        expect(tl.getItemClass(item)).toEqual('listitem parent');

        item.className = 'test';
        expect(tl.getItemClass(item)).toEqual('listitem test parent');

        item.collapsing = true;
        expect(tl.getItemClass(item)).toEqual('listitem test hide parent');

        item.collapsing = false;
        expect(tl.getItemClass(item)).toEqual('listitem test parent');

        item.expanding = true;
        expect(tl.getItemClass(item)).toEqual('listitem test hide parent');

        item.expanding = false;
        expect(tl.getItemClass(item)).toEqual('listitem test parent');

        item.collapsed = true;
        expect(tl.getItemClass(item)).toEqual('listitem test parent collapsed');

        item.selected = true;
        expect(tl.getItemClass(item)).toEqual('listitem test parent collapsed selected');

        item.selectable = true;
        expect(tl.getItemClass(item)).toEqual('listitem test parent collapsed selected');

        item.selectable = false;
        expect(tl.getItemClass(item)).toEqual('listitem test parent collapsed selected unselectable');

        item.odd = true;
        item.depth = 1;
        expect(tl.getItemClass(item)).toEqual('listitem test collapsed selected unselectable odd');
    }));

    it('should set and ensure the current item', async(() => {
        const fixture = TestBed.createComponent(DejaTreeListContainerComponent);
        const treeListDebugElement = fixture.debugElement.query(By.directive(DejaTreeListComponent));
        const treeListInstance = treeListDebugElement.componentInstance as DejaTreeListComponent;
        const tl = treeListInstance as any;
        let pass = 0;

        observeViewPort$(fixture)
            .debounceTime(100) // Debounce here, because ensureVisible move the scroll and more than one viewPort can be raised
            .subscribe((vp) => {
                fixture.detectChanges();
                const currentItems = fixture.debugElement.queryAll(By.css('deja-tree-list > .deja-listcontainer > .listitem[current="true"]'));

                switch (++pass) {
                    case 1:
                        expect(currentItems.length).toBe(0);
                        // Set current item by index
                        tl.currentItemIndex = 20;
                        expect(tl.currentItemIndex).toBe(20);
                        treeListInstance.ensureItemVisible(tl.currentItemIndex);
                        fixture.detectChanges();
                        break;

                    case 2:
                        // Check currentItem by index
                        expect(currentItems.length).toBe(1);
                        expect(currentItems[0].attributes.flat).toBe('20');
                        expect(vp.endIndex).toBe(20);
                        expect(treeListInstance.currentItem).toBe(vp.items[20]);
                        // Set current item by item
                        treeListInstance.currentItem = vp.items[1];
                        fixture.detectChanges();
                        break;

                    default:
                        // Check currentItem by item
                        expect(currentItems.length).toBe(1);
                        expect(currentItems[0].attributes.flat).toBe('1');
                        expect(vp.startIndex).toBe(1);
                        expect(treeListInstance.currentItem).toBe(vp.items[1]);
                }
            });

        fixture.detectChanges();
    }));

    it('should not load items if minSearchlength is defined', async(() => {
        let pass = 0;
        const fixture = TestBed.createComponent(DejaTreeListContainerComponent);
        const treeListDebugElement = fixture.debugElement.query(By.directive(DejaTreeListComponent));
        const treeListInstance = treeListDebugElement.componentInstance as DejaTreeListComponent;
        treeListInstance.minSearchlength = 2;
        const viewPortService = treeListDebugElement.injector.get(ViewPortService) as ViewPortService;

        Observable.from(viewPortService.viewPortResult$)
            .debounceTime(100)
            .subscribe((_vp) => {
                // Bind view port
                fixture.detectChanges();
                const listItems = fixture.debugElement.queryAll(By.css('deja-tree-list > .deja-listcontainer > .listitem'));
                switch (++pass) {
                    case 1:
                        expect(listItems.length).toBe(0);
                        treeListInstance.query = '33';
                        treeListInstance.refresh();
                        fixture.detectChanges();
                        break;

                    default:
                        expect(listItems.length).toBeGreaterThan(0);
                }
            });

        fixture.detectChanges();
    }));

    it('should set the selected items', async(() => {
        let pass = 0;
        const fixture = TestBed.createComponent(DejaTreeListContainerComponent);
        const treeListDebugElement = fixture.debugElement.query(By.directive(DejaTreeListComponent));
        const treeListInstance = treeListDebugElement.componentInstance as DejaTreeListComponent;

        observeViewPort$(fixture)
            .debounceTime(10)
            .subscribe((vp) => {
                // Bind view port
                fixture.detectChanges();
                const selectedItems = fixture.debugElement.queryAll(By.css('deja-tree-list > .deja-listcontainer > .listitem.selected'));
                switch (++pass) {
                    case 1:
                        expect(selectedItems.length).toBe(0);
                        // Set selected items
                        treeListInstance.selectedItems = [vp.items[vp.startIndex], vp.items[vp.endIndex], vp.items[vp.items.length - 1]];
                        expect(treeListInstance.selectedItems).toBeDefined();
                        expect(treeListInstance.selectedItems.length).toBe(3);
                        treeListInstance.refreshViewPort();
                        fixture.detectChanges();
                        break;

                    case 2:
                        // Check selected items
                        expect(selectedItems.length).toBe(2);
                        expect(selectedItems[0].attributes.flat).toBe(`${vp.startIndex}`);
                        expect(selectedItems[1].attributes.flat).toBe(`${vp.endIndex}`);
                        expect(vp.items.filter((item: IItemBase) => item.selected).length).toBe(3);
                        // Clear selection
                        treeListInstance.selectedItems = null;
                        treeListInstance.refreshViewPort();
                        fixture.detectChanges();
                        break;

                    case 3:
                        // Check no selected
                        expect(selectedItems.length).toBe(0);
                        expect(vp.items.filter((item: IItemBase) => item.selected).length).toBe(0);
                        // Set selected item
                        treeListInstance.selectedItem = vp.items[5];
                        expect(treeListInstance.selectedItem).toBe(vp.items[5]);
                        treeListInstance.refreshViewPort();
                        fixture.detectChanges();
                        break;

                    case 4:
                        // Check selected item
                        expect(selectedItems.length).toBe(1);
                        expect(selectedItems[0].attributes.flat).toBe(`5`);
                        expect(vp.items.filter((item: IItemBase) => item.selected).length).toBe(1);
                        // Clear selection
                        treeListInstance.selectedItem = null;
                        treeListInstance.refreshViewPort();
                        fixture.detectChanges();
                        break;

                    default:
                        // Check no selected
                        expect(selectedItems.length).toBe(0);
                        expect(vp.items.filter((item: IItemBase) => item.selected).length).toBe(0);
                }
            });

        fixture.detectChanges();
    }));
});

describe('DejaTreeListByModelContainerComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                DejaTreeListByModelContainerComponent,
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

    const observeViewModelPort$ = (fixture: ComponentFixture<DejaTreeListByModelContainerComponent>) => {
        const treeListDebugElement = fixture.debugElement.query(By.directive(DejaTreeListComponent));
        const viewPortService = treeListDebugElement.injector.get(ViewPortService) as ViewPortService;

        return Observable.from(viewPortService.viewPortResult$)
            .filter((result) => result.viewPortSize > 0);
    };

    it('should create the component', async(() => {
        const fixture = TestBed.createComponent(DejaTreeListByModelContainerComponent);
        fixture.detectChanges();
        const treeListDebugElement = fixture.debugElement.query(By.directive(DejaTreeListComponent));
        const treeListInstance = treeListDebugElement.componentInstance as DejaTreeListComponent;
        // const treeListElement = treeListDebugElement.nativeElement as HTMLElement;
        expect(treeListInstance).toBeTruthy();
    }));

    it('should set the selected models', async(() => {
        let pass = 0;
        const fixture = TestBed.createComponent(DejaTreeListByModelContainerComponent);
        const treeListDebugElement = fixture.debugElement.query(By.directive(DejaTreeListComponent));
        const treeListInstance = treeListDebugElement.componentInstance as DejaTreeListComponent;

        observeViewModelPort$(fixture)
            .debounceTime(10)
            .subscribe((vp) => {
                // Bind view port
                fixture.detectChanges();
                const selectedModels = fixture.debugElement.queryAll(By.css('deja-tree-list > .deja-listcontainer > .listitem.selected'));
                const models = vp.visibleItems.map((item: IItemBase) => item.model);

                switch (++pass) {
                    case 1:
                        expect(selectedModels.length).toBe(0);
                        // Set selected models
                        treeListInstance.selectedModels = [models[vp.startIndex], models[vp.endIndex]];
                        expect(treeListInstance.selectedModels).toBeDefined();
                        expect(treeListInstance.selectedModels.length).toBe(2);
                        treeListInstance.refreshViewPort();
                        fixture.detectChanges();
                        break;

                    case 2:
                        // Check selected models
                        expect(selectedModels.length).toBe(2);
                        expect(vp.items.filter((item: IItemBase) => item.selected).length).toBe(2);
                        // Clear selection
                        treeListInstance.selectedModels = null;
                        treeListInstance.refreshViewPort();
                        fixture.detectChanges();
                        break;

                    case 3:
                        // Check no selected
                        expect(selectedModels.length).toBe(0);
                        expect(vp.items.filter((item: IItemBase) => item.selected).length).toBe(0);
                        // Single select list
                        treeListInstance.multiSelect = false;
                        fixture.detectChanges();
                        // Set selected model
                        treeListInstance.selectedModel = models[5];
                        expect(treeListInstance.selectedModel).toBe(models[5]);
                        treeListInstance.refreshViewPort();
                        fixture.detectChanges();
                        break;

                    case 4:
                        // Check selected model
                        expect(selectedModels.length).toBe(1);
                        expect(vp.items.filter((item: IItemBase) => item.selected).length).toBe(1);
                        // Clear selection
                        treeListInstance.selectedModel = null;
                        treeListInstance.refreshViewPort();
                        fixture.detectChanges();
                        break;

                    default:
                        // Check no selected
                        expect(selectedModels.length).toBe(0);
                        expect(vp.items.filter((item: IItemBase) => item.selected).length).toBe(0);
                }
            });

        fixture.detectChanges();
    }));
});
