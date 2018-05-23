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
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/filter';
import { Observable } from 'rxjs/Observable';
import { GroupingService } from '../../common/core/grouping/grouping.service';
import { DejaItemModule } from '../../common/core/item-list/index';
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
        const itemList = Array.apply(null, { length: 2000 }).map((_n: any, i: number) => {
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
    template: `<deja-tree-list style="height: 500px;width: 1000px;" [(ngModel)]="selectedModels" [models]="modelsList$" multiSelect viewportMode="fixed" searchArea pageSize="10" valueField="id">
                    <ng-template #itemTemplate let-item>
                        <span [style.background-color]="backgroundColor(item)">
                            Item {{ item.model.displayName }}
                        </span>
                    </ng-template>
                </deja-tree-list>`,
    providers: [
        SortingService,
    ],
})
class DejaTreeListByModelContainerComponent {
    public modelsList$: Observable<any[]>;
    public selectedModels: any[];

    constructor(sortingService: SortingService) {
        const modelsList = Array.apply(null, { length: 2000 }).map((_n: any, i: number) => {
            const rand = Math.floor(Math.random() * (70 - 33 + 1)) + 33; // random de 33 à 70;
            return {
                id: i,
                value: rand,
                displayName: `${i} - Une ligne de test avec une valeur de : ${rand}`,
            };
        });

        this.selectedModels = [0, 1, 2];
        this.modelsList$ = sortingService.sort$(modelsList, { name: 'value' } as ISortInfos);
    }

    public backgroundColor(item: IItemBase) {
        return item.selected ? '#888' : null;
    }
}

@Component({
    template: `<deja-tree-list style="height: 800px;width: 1000px;" viewportMode="fixed" multiSelect sortable itemsDraggable>
                    <deja-item value="Apricots" text="Apricots"></deja-item>
                    <deja-item value="Banana" text="Banana"></deja-item>
                    <deja-item value="Cantaloupe" text="Cantaloupe"></deja-item>
                    <deja-item value="Cherries" text="Cherries"></deja-item>
                    <deja-item value="Coconut" text="Coconut"></deja-item>
                    <deja-item value="Cranberries" text="Cranberries"></deja-item>
                    <deja-item value="Durian" text="Durian"></deja-item>
                    <deja-item value="Grapes" text="Grapes"></deja-item>
                    <deja-item value="Lemon" text="Lemon"></deja-item>
                    <deja-item value="Mango" text="Mango"></deja-item>
                    <deja-item value="Pineapple" text="Pineapple"></deja-item>
                    <deja-item value="Watermelon" text="Watermelon"></deja-item>
                </deja-tree-list>`,
})
class DejaTreeListByOptionsContainerComponent {
    constructor() { }
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

        expect(treeListInstance.pageSize).toBeGreaterThanOrEqual(10);
        treeListInstance.pageSize = '5';
        expect(tl.pageSize).toBe(5);
        treeListInstance.pageSize = 0;
        expect(treeListInstance.pageSize).toBeGreaterThanOrEqual(10);

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
        treeListInstance.disabled = 'true';
        expect(treeListInstance.disabled).toBeTruthy();
        treeListInstance.setDisabledState(false);
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

    it('should set and ensure the current item', (done) => {
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
                        expect(currentItems[0] && currentItems[0].attributes.flat).toBe('20');
                        expect(vp.endIndex).toBe(20);
                        expect(treeListInstance.currentItem).toBe(vp.items[20]);
                        // Set current item by item
                        treeListInstance.currentItem = vp.items[1];
                        fixture.detectChanges();
                        break;

                    default:
                        // Check currentItem by item
                        expect(currentItems.length).toBe(1);
                        expect(currentItems[0] && currentItems[0].attributes.flat).toBe('1');
                        expect(vp.startIndex).toBe(1);
                        expect(treeListInstance.currentItem).toBe(vp.items[1]);
                        done();
                }
            });

        fixture.detectChanges();
    });

    it('should not load items if minSearchlength is defined', (done) => {
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
                        done();
                }
            });

        fixture.detectChanges();
    });

    it('should set the selected items', (done) => {
        let pass = 0;
        const fixture = TestBed.createComponent(DejaTreeListContainerComponent);
        const treeListDebugElement = fixture.debugElement.query(By.directive(DejaTreeListComponent));
        const treeListInstance = treeListDebugElement.componentInstance as DejaTreeListComponent;

        observeViewPort$(fixture)
            .debounceTime(10)
            .subscribe((vp) => {
                // Bind view port
                fixture.detectChanges();
                const selectedElements = fixture.debugElement.queryAll(By.css('deja-tree-list > .deja-listcontainer > .listitem.selected'));
                const selectedItems = vp.items.filter((item: IItemBase) => item.selected);

                switch (++pass) {
                    case 1:
                        expect(selectedElements.length).toBe(0);
                        // Set selected items
                        treeListInstance.selectedItems = [vp.items[vp.startIndex], vp.items[vp.endIndex], vp.items[vp.items.length - 1]];
                        expect(treeListInstance.selectedItems).toBeDefined();
                        expect(treeListInstance.selectedItems.length).toBe(3);
                        treeListInstance.refreshViewPort();
                        fixture.detectChanges();
                        break;

                    case 2:
                        // Check selected items
                        expect(selectedElements.length).toBe(2);
                        expect(selectedElements[0] && selectedElements[0].attributes.flat).toBe(`${vp.startIndex}`);
                        expect(selectedElements[1] && selectedElements[1].attributes.flat).toBe(`${vp.endIndex}`);
                        expect(selectedItems.length).toBe(3);
                        // Clear selection
                        treeListInstance.selectedItems = null;
                        treeListInstance.refreshViewPort();
                        fixture.detectChanges();
                        break;

                    case 3:
                        // Check no selected
                        expect(selectedElements.length).toBe(0);
                        expect(selectedItems.length).toBe(0);
                        // Set selected item
                        treeListInstance.selectedItem = vp.items[5];
                        expect(treeListInstance.selectedItem).toBe(vp.items[5]);
                        treeListInstance.refreshViewPort();
                        fixture.detectChanges();
                        break;

                    case 4:
                        // Check selected item
                        expect(selectedElements.length).toBe(1);
                        expect(selectedElements[0] && selectedElements[0].attributes.flat).toBe(`5`);
                        expect(selectedItems.length).toBe(1);
                        // Clear selection
                        treeListInstance.selectedItem = null;
                        treeListInstance.refreshViewPort();
                        fixture.detectChanges();
                        break;

                    default:
                        // Check no selected
                        expect(selectedElements.length).toBe(0);
                        expect(selectedItems.length).toBe(0);
                        done();
                }
            });

        fixture.detectChanges();
    });

    it('should toggle and collapse all the items', (done) => {
        let pass = 0;
        const fixture = TestBed.createComponent(DejaTreeListContainerComponent);
        const treeListDebugElement = fixture.debugElement.query(By.directive(DejaTreeListComponent));
        const treeListInstance = treeListDebugElement.componentInstance as DejaTreeListComponent;

        observeViewPort$(fixture)
            .debounceTime(10)
            .subscribe((vp) => {
                // Bind view port
                fixture.detectChanges();
                const collapsed = fixture.debugElement.queryAll(By.css('deja-tree-list > .deja-listcontainer > .listitem.parent.collapsed'));
                const collapsedItems = vp.items.filter((item: IItemTree) => item.collapsed);
                const parentItems = vp.items.filter((item: IItemTree) => item.depth === 0);
                switch (++pass) {
                    case 1:
                        expect(collapsed.length).toBe(0);
                        expect(collapsedItems.length).toBe(0);
                        // Toggle all items
                        treeListInstance.toggleAll();
                        treeListInstance.refreshViewPort();
                        fixture.detectChanges();
                        break;

                    case 2:
                        // Check collapsed items
                        expect(collapsed.length).toBeGreaterThan(0);
                        expect(collapsedItems.length).toBe(parentItems.length);
                        // Clear toogle
                        treeListInstance.toggleAll(false);
                        treeListInstance.refreshViewPort();
                        fixture.detectChanges();
                        break;

                    default:
                        // Check no collapsed
                        expect(collapsed.length).toBe(0);
                        expect(collapsedItems.length).toBe(0);
                        done();
                }
            });

        fixture.detectChanges();
    });
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
                DejaTreeListModule,
            ],
        }).compileComponents();
    }));

    const observeModelViewPort$ = (fixture: ComponentFixture<DejaTreeListByModelContainerComponent>) => {
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
        expect(treeListInstance).toBeTruthy();
    }));

    it('should set the selected models', (done) => {
        let pass = 0;
        const fixture = TestBed.createComponent(DejaTreeListByModelContainerComponent);
        const treeListDebugElement = fixture.debugElement.query(By.directive(DejaTreeListComponent));
        const treeListInstance = treeListDebugElement.componentInstance as DejaTreeListComponent;

        observeModelViewPort$(fixture)
            .debounceTime(10)
            .subscribe((vp) => {
                // Bind view port
                fixture.detectChanges();
                const selectedModels = fixture.debugElement.queryAll(By.css('deja-tree-list > .deja-listcontainer > .listitem.selected'));
                const models = vp.visibleItems.map((item: IItemBase) => item.model);
                const selectedItems = vp.items.filter((item: IItemBase) => item.selected);

                switch (++pass) {
                    case 1:
                        // Selection from HTML
                        expect(selectedItems.length).toBe(3);
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
                        expect(selectedItems.length).toBe(2);
                        // Clear selection
                        treeListInstance.selectedModels = null;
                        treeListInstance.refreshViewPort();
                        fixture.detectChanges();
                        break;

                    case 3:
                        // Check no selected
                        expect(selectedModels.length).toBe(0);
                        expect(selectedItems.length).toBe(0);
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
                        // Check selected item
                        expect(selectedModels.length).toBe(1);
                        expect(selectedItems.length).toBe(1);
                        // Clear selection
                        treeListInstance.selectedModel = null;
                        treeListInstance.refreshViewPort();
                        fixture.detectChanges();
                        break;

                    case 5:
                        // Check no selected
                        expect(selectedModels.length).toBe(0);
                        expect(selectedItems.length).toBe(0);
                        // Set selection by value
                        treeListInstance.value = models[4];
                        expect((treeListInstance.value as IItemBase).model).toBe(models[4]);
                        treeListInstance.refreshViewPort();
                        fixture.detectChanges();
                        break;

                    case 6:
                        // Check selected item
                        expect(selectedModels.length).toBe(1);
                        expect(selectedItems.length).toBe(1);
                        // Clear selection
                        treeListInstance.selectedModel = null;
                        treeListInstance.refreshViewPort();
                        fixture.detectChanges();
                        break;

                    default:
                        // Check no selected
                        expect(selectedModels.length).toBe(0);
                        expect(selectedItems.length).toBe(0);
                        done();
                }
            });

        fixture.detectChanges();
    });

    it('should flag pending keyboard navigation', (done) => {
        const fixture = TestBed.createComponent(DejaTreeListByModelContainerComponent);
        const treeListDebugElement = fixture.debugElement.query(By.directive(DejaTreeListComponent));
        const treeListInstance = treeListDebugElement.componentInstance as DejaTreeListComponent;
        let listElement: HTMLElement;

        observeModelViewPort$(fixture)
            .debounceTime(100)
            .do(() => expect(treeListInstance.keyboardNavigation()).toBeTruthy())
            .delay(1000)
            .subscribe(() => {
                expect(treeListInstance.keyboardNavigation()).toBeFalsy();
                done();
            });

        const sendKeyDown = (code: string, shiftKey?: boolean, ctrlKey?: boolean) => {
            const event = new KeyboardEvent('keydown', {
                code: code,
                shiftKey: shiftKey,
                ctrlKey: ctrlKey
            } as KeyboardEventInit);
            listElement.dispatchEvent(event);
        };

        fixture.detectChanges();

        listElement = treeListInstance.listElement;
        sendKeyDown('DownArrow');
    });

    it('should navigate with the keyboard', (done) => {
        let pass = 0;
        const fixture = TestBed.createComponent(DejaTreeListByModelContainerComponent);
        const treeListDebugElement = fixture.debugElement.query(By.directive(DejaTreeListComponent));
        const treeListInstance = treeListDebugElement.componentInstance as DejaTreeListComponent;
        let listElement: HTMLElement;

        const sendKeyDown = (code: string, shiftKey?: boolean, ctrlKey?: boolean) => {
            const event = new KeyboardEvent('keydown', {
                code: code,
                shiftKey: shiftKey,
                ctrlKey: ctrlKey
            } as KeyboardEventInit);
            listElement.dispatchEvent(event);
            treeListInstance.refreshViewPort();
            fixture.detectChanges();
        };

        observeModelViewPort$(fixture)
            .debounceTime(100)
            .subscribe((vp) => {
                fixture.detectChanges();
                const selectedElements = fixture.debugElement.queryAll(By.css('deja-tree-list > .deja-listcontainer > .listitem.selected'));
                const currentElement = fixture.debugElement.query(By.css('deja-tree-list > .deja-listcontainer > .listitem[current="true"]'));
                const selectedItems = vp.items.filter((item: IItemBase) => item.selected);

                switch (++pass) {
                    case 1:
                        // Selection from HTML
                        expect(vp.items.filter((item: IItemBase) => item.selected).length).toBe(3);
                        // Clear selection
                        treeListInstance.selectedModel = null;
                        treeListInstance.refreshViewPort();
                        fixture.detectChanges();
                        break;

                    case 2:
                        // Check no selected
                        expect(selectedElements.length).toBe(0);
                        expect(selectedItems.length).toBe(0);
                        // Select first line by keydown
                        sendKeyDown('DownArrow');
                        break;

                    case 3:
                        // Check selection
                        expect(selectedElements.length).toBe(1);
                        expect(selectedItems.length).toBe(1);
                        expect(selectedElements[0] && selectedElements[0].attributes.flat).toBe('0');
                        // Select second line by keydown
                        sendKeyDown('DownArrow');
                        break;

                    case 4:
                        // Check selection
                        expect(selectedElements.length).toBe(1);
                        expect(selectedItems.length).toBe(1);
                        expect(selectedElements[0] && selectedElements[0].attributes.flat).toBe('1');
                        // Select first line by keyup
                        sendKeyDown('UpArrow');
                        break;

                    case 5:
                        // Check selection
                        expect(selectedElements.length).toBe(1);
                        expect(selectedItems.length).toBe(1);
                        expect(selectedElements[0] && selectedElements[0].attributes.flat).toBe('0');
                        // Select first and second lines by shift+keydown
                        sendKeyDown('DownArrow', true);
                        break;

                    case 6:
                        // Check selection
                        expect(selectedElements.length).toBe(2);
                        expect(selectedItems.length).toBe(2);
                        expect(selectedElements[0] && selectedElements[0].attributes.flat).toBe('0');
                        expect(selectedElements[1] && selectedElements[1].attributes.flat).toBe('1');
                        // Keep selection, but pass current line to the third line
                        sendKeyDown('DownArrow', false, true);
                        break;

                    case 7:
                        // Check selection
                        expect(selectedElements.length).toBe(2);
                        expect(selectedItems.length).toBe(2);
                        expect(selectedElements[0] && selectedElements[0].attributes.flat).toBe('0');
                        expect(selectedElements[1] && selectedElements[1].attributes.flat).toBe('1');
                        // Check current item
                        expect(currentElement.attributes.flat).toBe('2');
                        // Select third line only
                        sendKeyDown('Space');
                        break;

                    case 8:
                        // Check selection
                        expect(selectedElements.length).toBe(1);
                        expect(selectedItems.length).toBe(1);
                        expect(selectedElements[0] && selectedElements[0].attributes.flat).toBe('2');
                        // Select first line with Home
                        sendKeyDown('Home', true);
                        break;

                    case 9:
                        // Check selection
                        expect(selectedElements.length).toBe(1);
                        expect(selectedItems.length).toBe(1);
                        expect(selectedElements[0] && selectedElements[0].attributes.flat).toBe('0');
                        // Select last line with End
                        sendKeyDown('End');
                        break;

                    case 10:
                        // Check selection
                        expect(selectedElements.length).toBe(1);
                        expect(selectedItems.length).toBe(1);
                        expect(selectedElements[0] && selectedElements[0].attributes.flat).toBe('1999');
                        // Select the two last lines with Shift+PageUp
                        sendKeyDown('UpArrow', true);
                        break;

                    case 11:
                        // Check selection
                        expect(selectedElements.length).toBe(2);
                        expect(selectedItems.length).toBe(2);
                        expect(selectedElements[0] && selectedElements[0].attributes.flat).toBe('1998');
                        expect(selectedElements[1] && selectedElements[1].attributes.flat).toBe('1999');
                        // Keep selection, but pass current line to the first line
                        sendKeyDown('Home', false, true);
                        break;

                    case 12:
                        // Check selection
                        expect(selectedElements.length).toBe(0);
                        expect(selectedItems.length).toBe(2);
                        // Check current item
                        expect(currentElement && currentElement.attributes.flat).toBe('0');
                        // Select line 11 (PageSize=10)
                        sendKeyDown('PageDown');
                        break;

                    case 13:
                        // Check selection
                        expect(selectedElements.length).toBe(1);
                        expect(selectedItems.length).toBe(1);
                        expect(selectedElements[0] && selectedElements[0].attributes.flat).toBe('10');
                        // Check current item
                        expect(currentElement && currentElement.attributes.flat).toBe('10');
                        // Select from line 11 to last line
                        sendKeyDown('End', true);
                        break;

                    case 14:
                        // Check selection
                        expect(selectedElements.length).toBe(vp.visibleItems.length);
                        expect(selectedItems.length).toBe(vp.items.length - 10);
                        // Check current item
                        expect(currentElement && currentElement.attributes.flat).toBe('1999');
                        // Select first line with Home
                        sendKeyDown('Home');
                        break;

                    case 15:
                        // Check selection
                        expect(selectedElements.length).toBe(1);
                        expect(selectedItems.length).toBe(1);
                        // Check current item
                        expect(currentElement && currentElement.attributes.flat).toBe('0');
                        // Select until line 11
                        sendKeyDown('PageDown', true);
                        break;

                    case 16:
                        // Check selection
                        expect(selectedElements.length).toBe(11);
                        expect(selectedItems.length).toBe(11);
                        // Check current item
                        expect(currentElement && currentElement.attributes.flat).toBe('10');
                        // Select next line only
                        sendKeyDown('DownArrow');
                        break;

                    case 17:
                        // Check selection
                        expect(selectedElements.length).toBe(1);
                        expect(selectedItems.length).toBe(1);
                        // Check current item
                        expect(currentElement && currentElement.attributes.flat).toBe('11');
                        // Select second line with PageUp
                        sendKeyDown('PageUp');
                        break;

                    case 18:
                        // Check selection
                        expect(selectedElements.length).toBe(1);
                        expect(selectedItems.length).toBe(1);
                        // Check current item
                        expect(currentElement && currentElement.attributes.flat).toBe('1');
                        // Select last line
                        sendKeyDown('End');
                        break;

                    case 19:
                        // Check selection
                        expect(selectedElements.length).toBe(1);
                        expect(selectedItems.length).toBe(1);
                        expect(selectedElements[0] && selectedElements[0].attributes.flat).toBe('1999');
                        // Check current item
                        expect(currentElement && currentElement.attributes.flat).toBe('1999');
                        // Select from line 11 to last line
                        sendKeyDown('PageUp', true);
                        break;

                    case 20:
                        // Check selection
                        expect(selectedElements.length).toBe(11);
                        expect(selectedItems.length).toBe(11);
                        // Select first line
                        sendKeyDown('Home');
                        break;

                    case 21:
                        // Check selection
                        expect(selectedElements.length).toBe(1);
                        expect(selectedItems.length).toBe(1);
                        expect(selectedElements[0] && selectedElements[0].attributes.flat).toBe('0');
                        // Check current item
                        expect(currentElement && currentElement.attributes.flat).toBe('0');
                        // Toggle first line selection with ctrl
                        sendKeyDown('Space', false, true);
                        break;

                    case 22:
                        // Check selection
                        expect(selectedElements.length).toBe(0);
                        expect(selectedItems.length).toBe(0);
                        // Check current item
                        expect(currentElement && currentElement.attributes.flat).toBe('0');
                        // Select first line with enter in single select
                        treeListInstance.multiSelect = false;
                        fixture.detectChanges();
                        sendKeyDown('Enter');
                        break;

                    default:
                        expect(selectedElements.length).toBe(1);
                        expect(selectedItems.length).toBe(1);
                        expect(selectedElements[0] && selectedElements[0].attributes.flat).toBe('0');
                        expect(currentElement && currentElement.attributes.flat).toBe('0');
                        done();
                }
            });

        fixture.detectChanges();

        listElement = treeListInstance.listElement;
    });

    it('should refresh view port if windows is resized', (done) => {
        let pass = 0;
        const fixture = TestBed.createComponent(DejaTreeListByModelContainerComponent);

        observeModelViewPort$(fixture)
            .debounceTime(100)
            .subscribe((vp) => {
                fixture.detectChanges();

                switch (++pass) {
                    case 1:
                        const event = new Event('resize', {});
                        window.dispatchEvent(event);
                        break;

                    default:
                        expect(vp.visibleItems.length).toBeGreaterThan(10);
                        done();

                }
            });

        fixture.detectChanges();
    });
});

describe('DejaTreeListByOptionsContainerComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                DejaTreeListByOptionsContainerComponent,
            ],
            imports: [
                BrowserAnimationsModule,
                CommonModule,
                FormsModule,
                DejaTreeListModule,
                DejaItemModule,
            ],
        }).compileComponents();
    }));

    const observeOptionsViewPort$ = (fixture: ComponentFixture<DejaTreeListByOptionsContainerComponent>) => {
        const treeListDebugElement = fixture.debugElement.query(By.directive(DejaTreeListComponent));
        const viewPortService = treeListDebugElement.injector.get(ViewPortService) as ViewPortService;

        return Observable.from(viewPortService.viewPortResult$)
            .filter((result) => result.viewPortSize > 0);
    };

    it('should create the component', (done) => {
        const fixture = TestBed.createComponent(DejaTreeListByOptionsContainerComponent);
        const treeListDebugElement = fixture.debugElement.query(By.directive(DejaTreeListComponent));
        const treeListInstance = treeListDebugElement.componentInstance as DejaTreeListComponent;

        observeOptionsViewPort$(fixture)
            .debounceTime(100)
            .subscribe(() => {
                fixture.detectChanges();
                const items = fixture.debugElement.queryAll(By.css('deja-tree-list > .deja-listcontainer > .listitem'));
                expect(items.length).toBe(12);
                done();
            });

        fixture.detectChanges();

        expect(treeListInstance).toBeTruthy();
    });

    it('should filter and select with the keyboard', (done) => {
        let pass = 0;
        const fixture = TestBed.createComponent(DejaTreeListByOptionsContainerComponent);
        const treeListDebugElement = fixture.debugElement.query(By.directive(DejaTreeListComponent));
        const treeListInstance = treeListDebugElement.componentInstance as DejaTreeListComponent;
        let listElement: HTMLElement;

        const sendKeyUp = (code: string) => {
            const event = new KeyboardEvent('keyup', {
                code: `Key${code.toUpperCase()}`,
                key: code,
            } as KeyboardEventInit);
            listElement.dispatchEvent(event);
            treeListInstance.refreshViewPort();
            fixture.detectChanges();
        };

        observeOptionsViewPort$(fixture)
            .debounceTime(450) // Wait for the clear filter flag
            .subscribe((vp) => {
                fixture.detectChanges();
                const selectedElements = fixture.debugElement.queryAll(By.css('deja-tree-list > .deja-listcontainer > .listitem.selected'));
                const currentElement = fixture.debugElement.query(By.css('deja-tree-list > .deja-listcontainer > .listitem[current="true"]'));
                const selectedItems = vp.items.filter((item: IItemBase) => item.selected);

                switch (++pass) {
                    case 1:
                        // Check selected and current
                        expect(selectedElements.length).toBe(0);
                        expect(selectedItems.length).toBe(0);
                        // Search first started with c
                        sendKeyUp('c');
                        break;

                    case 2:
                        // Check selected and current
                        expect(selectedElements.length).toBe(0);
                        expect(selectedItems.length).toBe(0);
                        expect(currentElement && currentElement.attributes.flat).toBe('2');
                        // Search next
                        sendKeyUp('c');
                        break;

                    case 3:
                        // Check selected and current
                        expect(selectedElements.length).toBe(0);
                        expect(selectedItems.length).toBe(0);
                        expect(currentElement && currentElement.attributes.flat).toBe('3');
                        // Search next
                        sendKeyUp('c');
                        break;

                    case 4:
                        // Check selected and current
                        expect(selectedElements.length).toBe(0);
                        expect(selectedItems.length).toBe(0);
                        expect(currentElement && currentElement.attributes.flat).toBe('4');
                        // Search next
                        sendKeyUp('c');
                        break;

                    case 5:
                        // Check selected and current
                        expect(selectedElements.length).toBe(0);
                        expect(selectedItems.length).toBe(0);
                        expect(currentElement && currentElement.attributes.flat).toBe('5');
                        // Search next
                        sendKeyUp('c');
                        break;

                    case 6:
                        // Check selected and current
                        expect(selectedElements.length).toBe(0);
                        expect(selectedItems.length).toBe(0);
                        expect(currentElement && currentElement.attributes.flat).toBe('2');
                        // Enable search area
                        treeListInstance.searchArea = true;
                        fixture.detectChanges();
                        // Filter test
                        (<any>treeListInstance).setQuery$.next('c');
                        treeListInstance.refreshViewPort();
                        fixture.detectChanges();
                        break;

                    default:
                        expect(vp.visibleItems.length).toBe(5);
                        done();

                }
            });

        fixture.detectChanges();

        listElement = treeListInstance.listElement;
    });

    it('should select with the mouse', (done) => {
        let pass = 0;
        const fixture = TestBed.createComponent(DejaTreeListByOptionsContainerComponent);
        const treeListDebugElement = fixture.debugElement.query(By.directive(DejaTreeListComponent));
        const treeListInstance = treeListDebugElement.componentInstance as DejaTreeListComponent;
        let listElement: DebugElement;

        const sendMouseClick = (element: DebugElement, shiftKey?: boolean, ctrlKey?: boolean, upElement?: DebugElement) => {
            // Simulate a mouse click
            const eventInit = () => ({
                bubbles: true,
                cancelable: true,
                view: document.defaultView,
                altKey: false,
                ctrlKey: ctrlKey,
                metaKey: false,
                shiftKey: shiftKey,
                button: 0,
                buttons: 1,
                clientX: 0,
                clientY: 0,
                relatedTarget: listElement.nativeElement,
                screenX: 0,
                screenY: 0,
            } as MouseEventInit);
            const event = new MouseEvent('mousedown', eventInit());
            element.nativeElement.dispatchEvent(event);
            fixture.detectChanges();
            Observable.timer(100)
                .first()
                .subscribe(() => {
                    const upEvent = new MouseEvent('mouseup', eventInit());
                    (upElement || element).nativeElement.dispatchEvent(upEvent);
                    treeListInstance.refreshViewPort();
                    fixture.detectChanges();
                });
        };

        observeOptionsViewPort$(fixture)
            .debounceTime(10)
            .subscribe((vp) => {
                fixture.detectChanges();
                const displayedElements = fixture.debugElement.queryAll(By.css('deja-tree-list > .deja-listcontainer > .listitem'));
                const selectedElements = fixture.debugElement.queryAll(By.css('deja-tree-list > .deja-listcontainer > .listitem.selected'));
                const currentElement = fixture.debugElement.query(By.css('deja-tree-list > .deja-listcontainer > .listitem[current="true"]'));
                const selectedItems = vp.items.filter((item: IItemBase) => item.selected);

                switch (++pass) {
                    case 1:
                        // Check selected and current
                        expect(selectedElements.length).toBe(0);
                        expect(selectedItems.length).toBe(0);
                        // Check flags
                        expect(treeListInstance.isMultiSelect).toBe(true);
                        // Simulate click on first element on disabled
                        treeListInstance.disabled = true;
                        fixture.detectChanges();
                        sendMouseClick(displayedElements[1]);
                        break;

                    case 2:
                        // Check selected and current
                        expect(selectedElements.length).toBe(0);
                        expect(selectedItems.length).toBe(0);
                        // Simulate click on first element on disabled
                        treeListInstance.disabled = false;
                        fixture.detectChanges();
                        sendMouseClick(displayedElements[1]);
                        break;

                    case 3:
                        // Check selected and current
                        expect(selectedElements.length).toBe(1);
                        expect(selectedItems.length).toBe(1);
                        expect(currentElement && currentElement.attributes.flat).toBe('1');
                        // Simulate click with ctrl
                        sendMouseClick(displayedElements[4], false, true);
                        break;

                    case 4:
                        // Check selected and current
                        expect(selectedElements.length).toBe(2);
                        expect(selectedItems.length).toBe(2);
                        expect(currentElement && currentElement.attributes.flat).toBe('4');
                        // Simulate click with shift
                        sendMouseClick(displayedElements[6], true);
                        break;

                    case 5:
                        // Check selected and current
                        expect(selectedElements.length).toBe(3);
                        expect(selectedItems.length).toBe(3);
                        expect(currentElement && currentElement.attributes.flat).toBe('4');
                        // Click outside must keep the selection
                        sendMouseClick(listElement);
                        break;

                    case 6:
                        // Check selected and current
                        expect(selectedElements.length).toBe(3);
                        expect(selectedItems.length).toBe(3);
                        expect(currentElement && currentElement.attributes.flat).toBe('4');
                        // Switch to single select
                        treeListInstance.multiSelect = false;
                        expect(treeListInstance.isMultiSelect).toBe(false);
                        fixture.detectChanges();
                        // Click first line
                        sendMouseClick(displayedElements[0]);
                        break;

                    case 7:
                        // Check selected and current
                        expect(selectedElements.length).toBe(1);
                        expect(selectedItems.length).toBe(1);
                        expect(currentElement && currentElement.attributes.flat).toBe('0');
                        // Simulate click with ctrl
                        sendMouseClick(displayedElements[4], false, true);
                        break;

                    case 8:
                        // Check selected and current
                        expect(selectedElements.length).toBe(1);
                        expect(selectedItems.length).toBe(1);
                        expect(currentElement && currentElement.attributes.flat).toBe('4');
                        // Simulate click with shift
                        sendMouseClick(displayedElements[6], true);
                        break;

                    default:
                        // Check selected and current
                        expect(selectedElements.length).toBe(1);
                        expect(selectedItems.length).toBe(1);
                        expect(currentElement && currentElement.attributes.flat).toBe('6');
                        done();

                }
            });

        fixture.detectChanges();

        listElement = fixture.debugElement.query(By.css('deja-tree-list > .deja-listcontainer'));
    });
});
