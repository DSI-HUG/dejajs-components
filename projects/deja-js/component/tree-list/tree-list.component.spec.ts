/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { CommonModule } from '@angular/common';
import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DejaItemModule, GroupingService, IItemBase, IItemTree, ISortInfos, ItemListService, KeyCodes, SortingService, ViewPortService } from '@deja-js/component/core';
import { debounceTime, delay, filter, Observable, take, tap, timer } from 'rxjs';

import { IViewPort } from '../core';
import { DejaTreeListModule } from './index';
import { DejaTreeListComponent } from './tree-list.component';

@Component({
    selector: 'DejaTreeListContainerComponent',
    template: `<deja-tree-list style="height: 500px;width: 1000px;" [items]="itemList" multiSelect viewportMode="variable" searchArea sortable itemsDraggable pageSize="10">
                    <ng-template #itemTemplate let-item>Item {{ item.displayName }}</ng-template>
                </deja-tree-list>`,
    providers: [
        GroupingService
    ]
})
class DejaTreeListContainerComponent {
    public itemList = [] as IItemTree<unknown>[];

    public constructor(groupingService: GroupingService) {
        const itemList = Array.from({ length: 2000 }).map((_n: unknown, i: number) => {
            const rand = Math.floor(Math.random() * (70 - 33 + 1)) + 33; // random de 33 à 70
            return {
                size: rand,
                displayName: `${i} - Une ligne de test avec une taille de : ${rand}`
            } as IItemTree<unknown>;
        });

        groupingService.group$(itemList, [{ groupByField: 'size' }]).pipe(
            take(1)
            // eslint-disable-next-line rxjs-angular/prefer-takeuntil
        ).subscribe(groupedResult => {
            this.itemList = groupedResult as IItemTree<unknown>[];
        });
    }
}

@Component({
    selector: 'DejaTreeListByModelContainerComponent',
    // eslint-disable-next-line @angular-eslint/component-max-inline-declarations
    template: `<deja-tree-list style="height: 500px;width: 1000px;" [(ngModel)]="selectedModels" [models]="modelsList$" multiSelect viewportMode="fixed" searchArea pageSize="10" valueField="id">
                    <ng-template #itemTemplate let-item>
                        <span [style.background-color]="backgroundColor(item)">
                            Item {{ item.model.displayName }}
                        </span>
                    </ng-template>
                </deja-tree-list>`,
    providers: [
        SortingService
    ]
})
class DejaTreeListByModelContainerComponent {
    public modelsList$: Observable<unknown[]>;
    public selectedModels: unknown[];

    public constructor(sortingService: SortingService) {
        const modelsList = Array.from({ length: 2000 }).map((_n: unknown, i: number) => {
            const rand = Math.floor(Math.random() * (70 - 33 + 1)) + 33; // random de 33 à 70;
            return {
                id: i,
                value: rand,
                displayName: `${i} - Une ligne de test avec une valeur de : ${rand}`
            };
        });

        this.selectedModels = [0, 1, 2];
        this.modelsList$ = sortingService.sort$(modelsList, { name: 'value' } as ISortInfos);
    }

    public backgroundColor(item: IItemBase<unknown>): string {
        return item.selected ? '#888' : null;
    }
}

@Component({
    selector: 'DejaTreeListByOptionsContainerComponent',
    // eslint-disable-next-line @angular-eslint/component-max-inline-declarations
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
                </deja-tree-list>`
})
class DejaTreeListByOptionsContainerComponent {
}

describe('DejaTreeListComponent', () => {
    beforeEach(waitForAsync(() => {
        void TestBed.configureTestingModule({
            declarations: [
                DejaTreeListContainerComponent
            ],
            imports: [
                BrowserAnimationsModule,
                CommonModule,
                FormsModule,
                DejaTreeListModule
            ]
        }).compileComponents();
    }));

    const observeViewPort$ = (fixture: ComponentFixture<DejaTreeListContainerComponent>): Observable<IViewPort> => {
        const treeListDebugElement = fixture.debugElement.query(By.directive(DejaTreeListComponent));
        const viewPortService = treeListDebugElement.injector.get(ViewPortService);

        return viewPortService.viewPortResult$.pipe(
            filter(result => result.viewPortSize > 0));
    };

    it('should create the component', waitForAsync(() => {
        const fixture = TestBed.createComponent(DejaTreeListContainerComponent);
        fixture.detectChanges();
        const treeListDebugElement = fixture.debugElement.query(By.directive(DejaTreeListComponent));
        const treeListInstance = treeListDebugElement.componentInstance as DejaTreeListComponent;
        void expect(treeListInstance).toBeTruthy();
    }));

    it('should return the write property', (() => {
        const fixture = TestBed.createComponent(DejaTreeListContainerComponent);
        const treeListDebugElement = fixture.debugElement.query(By.directive(DejaTreeListComponent));
        const treeListInstance = treeListDebugElement.componentInstance as DejaTreeListComponent;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment
        const tl = treeListInstance as any;
        const itemListService = treeListInstance.itemListService;
        fixture.detectChanges();

        void expect(treeListInstance.sortable).toBeTruthy();
        treeListInstance.sortable = 'false';
        void expect(treeListInstance.sortable).toBeFalsy();

        void expect(treeListInstance.itemsDraggable).toBeTruthy();
        treeListInstance.itemsDraggable = 'false';
        void expect(treeListInstance.itemsDraggable).toBeFalsy();

        void expect(treeListInstance.pageSize).toBeGreaterThanOrEqual(10);
        treeListInstance.pageSize = '5';
        void expect(tl.pageSize).toBe(5);
        treeListInstance.pageSize = 0;
        void expect(treeListInstance.pageSize).toBeGreaterThanOrEqual(10);

        void expect(treeListInstance.hintLabel).toBeUndefined();
        treeListInstance.hintLabel = 'I am a hint label';
        void expect(treeListInstance.hintLabel).toEqual('I am a hint label');

        void expect(tl._viewPortRowHeight).toBe(ViewPortService.itemDefaultSize);
        treeListInstance.viewPortRowHeight = 100;
        void expect(tl._viewPortRowHeight).toBe(100);

        void expect(treeListInstance.childrenField).toBeUndefined();
        void expect(itemListService.childrenField).toEqual(ItemListService.defaultChildrenField);
        treeListInstance.childrenField = 'children';
        void expect(treeListInstance.childrenField).toEqual('children');
        void expect(itemListService.childrenField).toEqual('children');

        void expect(tl.getTextField()).toEqual(ItemListService.defaultTextField);
        treeListInstance.textField = 'text';
        void expect(tl.getTextField()).toEqual('text');

        void expect(tl.getValueField()).toEqual(ItemListService.defaultValueField);
        treeListInstance.valueField = 'my value field';
        void expect(tl.getValueField()).toEqual('my value field');
        void expect(itemListService.valueField).toEqual('my value field');

        void expect(treeListInstance.searchField).toBeUndefined();
        treeListInstance.searchField = 'my search field';
        void expect(treeListInstance.searchField).toEqual('my search field');

        void expect(treeListInstance.multiSelect).toBeTruthy();
        treeListInstance.multiSelect = 'false';
        void expect(treeListInstance.multiSelect).toBeFalsy();

        const myItemListService = new ItemListService();
        void expect(treeListInstance.itemListService).toBeDefined();
        treeListInstance.itemListService = myItemListService;
        void expect(treeListInstance.itemListService).toBe(myItemListService);

        const sortingService = new SortingService();
        void expect(myItemListService.getSortingService()).toBeDefined();
        treeListInstance.sortingService = sortingService;
        void expect(myItemListService.getSortingService()).toBe(sortingService);

        const groupingService = new GroupingService();
        void expect(myItemListService.getGroupingService()).toBeDefined();
        treeListInstance.groupingService = groupingService;
        void expect(myItemListService.getGroupingService()).toBe(groupingService);

        void expect(treeListInstance.minSearchlength).toBe(0);
        treeListInstance.minSearchlength = '3';
        void expect(tl.minSearchlength).toBe(3);

        void expect(treeListInstance.disabled).toBeNull();
        treeListInstance.disabled = true;
        void expect(treeListInstance.disabled).toBeTruthy();
        treeListInstance.setDisabledState(false);
        void expect(treeListInstance.disabled).toBeFalsy();

        void expect(treeListInstance.waiter).toBeFalsy();
        treeListInstance.waiter = true;
        void expect(treeListInstance.waiter).toBeTruthy();
    }));

    it('should calc the item class', (() => {
        const fixture = TestBed.createComponent(DejaTreeListContainerComponent);
        fixture.detectChanges();
        const treeListDebugElement = fixture.debugElement.query(By.directive(DejaTreeListComponent));
        const treeListInstance = treeListDebugElement.componentInstance as DejaTreeListComponent;
        const tl = treeListInstance;

        const item = {
            className: null,
            collapsing: false,
            expanding: false,
            depth: 0,
            collapsed: false,
            selected: false,
            odd: false
        } as IItemTree<unknown>;
        void expect(tl.getItemClass(item)).toEqual('listitem parent');

        item.className = 'test';
        void expect(tl.getItemClass(item)).toEqual('listitem test parent');

        item.collapsing = true;
        void expect(tl.getItemClass(item)).toEqual('listitem test hide parent');

        item.collapsing = false;
        void expect(tl.getItemClass(item)).toEqual('listitem test parent');

        item.expanding = true;
        void expect(tl.getItemClass(item)).toEqual('listitem test hide parent');

        item.expanding = false;
        void expect(tl.getItemClass(item)).toEqual('listitem test parent');

        item.collapsed = true;
        void expect(tl.getItemClass(item)).toEqual('listitem test parent collapsed');

        item.selected = true;
        void expect(tl.getItemClass(item)).toEqual('listitem test parent collapsed selected');

        item.selectable = true;
        void expect(tl.getItemClass(item)).toEqual('listitem test parent collapsed selected');

        item.selectable = false;
        void expect(tl.getItemClass(item)).toEqual('listitem test parent collapsed selected unselectable');

        item.odd = true;
        item.depth = 1;
        void expect(tl.getItemClass(item)).toEqual('listitem test collapsed selected unselectable odd');
    }));

    it('should set and ensure the current item', done => {
        const fixture = TestBed.createComponent(DejaTreeListContainerComponent);
        const treeListDebugElement = fixture.debugElement.query(By.directive(DejaTreeListComponent));
        const treeListInstance = treeListDebugElement.componentInstance as DejaTreeListComponent;
        let pass = 0;

        observeViewPort$(fixture).pipe(
            debounceTime(100)// Debounce here, because ensureVisible move the scroll and more than one viewPort can be raised
        ).subscribe(vp => {
            fixture.detectChanges();
            const currentItems = fixture.debugElement.queryAll(By.css('deja-tree-list > .deja-listcontainer > .listitem[current="true"]'));

            switch (++pass) {
                case 1:
                    void expect(currentItems.length).toBe(0);
                    // Set current item by index
                    treeListInstance.currentItemIndex = 20;
                    void expect(treeListInstance.currentItemIndex).toBe(20);
                    treeListInstance.ensureItemVisible(treeListInstance.currentItemIndex);
                    fixture.detectChanges();
                    break;

                case 2:
                    // Check currentItem by index
                    void expect(currentItems.length).toBe(1);
                    void expect(currentItems[0]?.attributes.flat).toBe('20');
                    void expect(vp.endIndex).toBe(20);
                    void expect(treeListInstance.currentItem).toBe(vp.items[20]);
                    // Set current item by item
                    treeListInstance.currentItem = vp.items[1];
                    fixture.detectChanges();
                    break;

                default:
                    // Check currentItem by item
                    void expect(currentItems.length).toBe(1);
                    void expect(currentItems[0]?.attributes.flat).toBe('1');
                    void expect(vp.startIndex).toBe(1);
                    void expect(treeListInstance.currentItem).toBe(vp.items[1]);
                    done();
            }
        });

        fixture.detectChanges();
    });

    it('should not load items if minSearchlength is defined', done => {
        let pass = 0;
        const fixture = TestBed.createComponent(DejaTreeListContainerComponent);
        const treeListDebugElement = fixture.debugElement.query(By.directive(DejaTreeListComponent));
        const treeListInstance = treeListDebugElement.componentInstance as DejaTreeListComponent;
        treeListInstance.minSearchlength = 2;
        const viewPortService = treeListDebugElement.injector.get(ViewPortService);

        viewPortService.viewPortResult$.pipe(
            debounceTime(100)
        ).subscribe(_vp => {
            // Bind view port
            fixture.detectChanges();
            const listItems = fixture.debugElement.queryAll(By.css('deja-tree-list > .deja-listcontainer > .listitem'));
            switch (++pass) {
                case 1:
                    void expect(listItems.length).toBe(0);
                    treeListInstance.query = '33';
                    treeListInstance.refresh();
                    fixture.detectChanges();
                    break;

                default:
                    void expect(listItems.length).toBeGreaterThan(0);
                    done();
            }
        });

        fixture.detectChanges();
    });

    it('should set the selected items', done => {
        let pass = 0;
        const fixture = TestBed.createComponent(DejaTreeListContainerComponent);
        const treeListDebugElement = fixture.debugElement.query(By.directive(DejaTreeListComponent));
        const treeListInstance = treeListDebugElement.componentInstance as DejaTreeListComponent;

        observeViewPort$(fixture).pipe(
            debounceTime(10)
        ).subscribe(vp => {
            // Bind view port
            fixture.detectChanges();
            const selectedElements = fixture.debugElement.queryAll(By.css('deja-tree-list > .deja-listcontainer > .listitem.selected'));
            const selectedItems = vp.items.filter((item: IItemBase<unknown>) => item.selected);

            switch (++pass) {
                case 1:
                    void expect(selectedElements.length).toBe(0);
                    // Set selected items
                    treeListInstance.selectedItems = [vp.items[vp.startIndex], vp.items[vp.endIndex], vp.items[vp.items.length - 1]];
                    void expect(treeListInstance.selectedItems).toBeDefined();
                    void expect(treeListInstance.selectedItems.length).toBe(3);
                    treeListInstance.refreshViewPort();
                    fixture.detectChanges();
                    break;

                case 2:
                    // Check selected items
                    void expect(selectedElements.length).toBe(2);
                    void expect(selectedElements[0]?.attributes.flat).toBe(`${vp.startIndex}`);
                    void expect(selectedElements[1]?.attributes.flat).toBe(`${vp.endIndex}`);
                    void expect(selectedItems.length).toBe(3);
                    // Clear selection
                    treeListInstance.selectedItems = null;
                    treeListInstance.refreshViewPort();
                    fixture.detectChanges();
                    break;

                case 3:
                    // Check no selected
                    void expect(selectedElements.length).toBe(0);
                    void expect(selectedItems.length).toBe(0);
                    // Set selected item
                    treeListInstance.selectedItem = vp.items[5];
                    void expect(treeListInstance.selectedItem).toBe(vp.items[5]);
                    treeListInstance.refreshViewPort();
                    fixture.detectChanges();
                    break;

                case 4:
                    // Check selected item
                    void expect(selectedElements.length).toBe(1);
                    void expect(selectedElements[0]?.attributes.flat).toBe('5');
                    void expect(selectedItems.length).toBe(1);
                    // Clear selection
                    treeListInstance.selectedItem = null;
                    treeListInstance.refreshViewPort();
                    fixture.detectChanges();
                    break;

                default:
                    // Check no selected
                    void expect(selectedElements.length).toBe(0);
                    void expect(selectedItems.length).toBe(0);
                    done();
            }
        });

        fixture.detectChanges();
    });

    it('should toggle and collapse all the items', done => {
        let pass = 0;
        const fixture = TestBed.createComponent(DejaTreeListContainerComponent);
        const treeListDebugElement = fixture.debugElement.query(By.directive(DejaTreeListComponent));
        const treeListInstance = treeListDebugElement.componentInstance as DejaTreeListComponent;

        observeViewPort$(fixture).pipe(
            debounceTime(10)
        ).subscribe(vp => {
            // Bind view port
            fixture.detectChanges();
            const collapsed = fixture.debugElement.queryAll(By.css('deja-tree-list > .deja-listcontainer > .listitem.parent.collapsed'));
            const collapsedItems = vp.items.filter((item: IItemTree<unknown>) => item.collapsed);
            const parentItems = vp.items.filter((item: IItemTree<unknown>) => item.depth === 0);
            switch (++pass) {
                case 1:
                    void expect(collapsed.length).toBe(0);
                    void expect(collapsedItems.length).toBe(0);
                    // Toggle all items
                    treeListInstance.toggleAll();
                    treeListInstance.refreshViewPort();
                    fixture.detectChanges();
                    break;

                case 2:
                    // Check collapsed items
                    void expect(collapsed.length).toBeGreaterThan(0);
                    void expect(collapsedItems.length).toBe(parentItems.length);
                    // Clear toggle
                    treeListInstance.toggleAll(false);
                    treeListInstance.refreshViewPort();
                    fixture.detectChanges();
                    break;

                default:
                    // Check no collapsed
                    void expect(collapsed.length).toBe(0);
                    void expect(collapsedItems.length).toBe(0);
                    done();
            }
        });

        fixture.detectChanges();
    });
});

describe('DejaTreeListByModelContainerComponent', () => {
    beforeEach(waitForAsync(() => {
        void TestBed.configureTestingModule({
            declarations: [
                DejaTreeListByModelContainerComponent
            ],
            imports: [
                BrowserAnimationsModule,
                CommonModule,
                FormsModule,
                DejaTreeListModule
            ]
        }).compileComponents();
    }));

    const observeModelViewPort$ = (fixture: ComponentFixture<DejaTreeListByModelContainerComponent>): Observable<IViewPort> => {
        const treeListDebugElement = fixture.debugElement.query(By.directive(DejaTreeListComponent));
        const viewPortService = treeListDebugElement.injector.get(ViewPortService);

        return viewPortService.viewPortResult$.pipe(
            filter(result => result.viewPortSize > 0));
    };

    it('should create the component', waitForAsync(() => {
        const fixture = TestBed.createComponent(DejaTreeListByModelContainerComponent);
        fixture.detectChanges();
        const treeListDebugElement = fixture.debugElement.query(By.directive(DejaTreeListComponent));
        const treeListInstance = treeListDebugElement.componentInstance as DejaTreeListComponent;
        void expect(treeListInstance).toBeTruthy();
    }));

    it('should set the selected models', done => {
        let pass = 0;
        const fixture = TestBed.createComponent(DejaTreeListByModelContainerComponent);
        const treeListDebugElement = fixture.debugElement.query(By.directive(DejaTreeListComponent));
        const treeListInstance = treeListDebugElement.componentInstance as DejaTreeListComponent;

        observeModelViewPort$(fixture).pipe(
            debounceTime(10)
        ).subscribe(vp => {
            // Bind view port
            fixture.detectChanges();
            const selectedModels = fixture.debugElement.queryAll(By.css('deja-tree-list > .deja-listcontainer > .listitem.selected'));
            const models = vp.visibleItems.map((item: IItemBase<unknown>) => item.model);
            const selectedItems = vp.items.filter((item: IItemBase<unknown>) => item.selected);

            switch (++pass) {
                case 1:
                    // Selection from HTML
                    void expect(selectedItems.length).toBe(3);
                    // Set selected models
                    treeListInstance.selectedModels = [models[vp.startIndex], models[vp.endIndex]];
                    void expect(treeListInstance.selectedModels).toBeDefined();
                    void expect(treeListInstance.selectedModels.length).toBe(2);
                    treeListInstance.refreshViewPort();
                    fixture.detectChanges();
                    break;

                case 2:
                    // Check selected models
                    void expect(selectedModels.length).toBe(2);
                    void expect(selectedItems.length).toBe(2);
                    // Clear selection
                    treeListInstance.selectedModels = null;
                    treeListInstance.refreshViewPort();
                    fixture.detectChanges();
                    break;

                case 3:
                    // Check no selected
                    void expect(selectedModels.length).toBe(0);
                    void expect(selectedItems.length).toBe(0);
                    // Single select list
                    treeListInstance.multiSelect = false;
                    fixture.detectChanges();
                    // Set selected model
                    treeListInstance.selectedModel = models[5];
                    void expect(treeListInstance.selectedModel).toBe(models[5]);
                    treeListInstance.refreshViewPort();
                    fixture.detectChanges();
                    break;

                case 4:
                    // Check selected item
                    void expect(selectedModels.length).toBe(1);
                    void expect(selectedItems.length).toBe(1);
                    // Clear selection
                    treeListInstance.selectedModel = null;
                    treeListInstance.refreshViewPort();
                    fixture.detectChanges();
                    break;

                case 5:
                    // Check no selected
                    void expect(selectedModels.length).toBe(0);
                    void expect(selectedItems.length).toBe(0);
                    // Set selection by value
                    treeListInstance.value = models[4];
                    void expect((treeListInstance.value as IItemBase<unknown>).model).toBe(models[4]);
                    treeListInstance.refreshViewPort();
                    fixture.detectChanges();
                    break;

                case 6:
                    // Check selected item
                    void expect(selectedModels.length).toBe(1);
                    void expect(selectedItems.length).toBe(1);
                    // Clear selection
                    treeListInstance.selectedModel = null;
                    treeListInstance.refreshViewPort();
                    fixture.detectChanges();
                    break;

                default:
                    // Check no selected
                    void expect(selectedModels.length).toBe(0);
                    void expect(selectedItems.length).toBe(0);
                    done();
            }
        });

        fixture.detectChanges();
    });

    it('should flag pending keyboard navigation', done => {
        const fixture = TestBed.createComponent(DejaTreeListByModelContainerComponent);
        const treeListDebugElement = fixture.debugElement.query(By.directive(DejaTreeListComponent));
        const treeListInstance = treeListDebugElement.componentInstance as DejaTreeListComponent;

        observeModelViewPort$(fixture).pipe(
            debounceTime(100),
            tap(() => expect(treeListInstance.keyboardNavigation()).toBeTruthy()),
            delay(1000)
        ).subscribe(() => {
            void expect(treeListInstance.keyboardNavigation()).toBeFalsy();
            done();
        });

        const sendKeyDown = (code: string, shiftKey?: boolean, ctrlKey?: boolean): void => {
            const event = new KeyboardEvent('keydown', {
                code: code,
                shiftKey: shiftKey,
                ctrlKey: ctrlKey
            } as KeyboardEventInit);
            listElement.dispatchEvent(event);
        };

        fixture.detectChanges();

        const listElement = treeListInstance.listElement;
        sendKeyDown(KeyCodes.DownArrow);
    });

    it('should navigate with the keyboard', done => {
        let pass = 0;
        const fixture = TestBed.createComponent(DejaTreeListByModelContainerComponent);
        const treeListDebugElement = fixture.debugElement.query(By.directive(DejaTreeListComponent));
        const treeListInstance = treeListDebugElement.componentInstance as DejaTreeListComponent;

        const sendKeyDown = (code: string, shiftKey?: boolean, ctrlKey?: boolean): void => {
            const event = new KeyboardEvent('keydown', {
                code: code,
                shiftKey: shiftKey,
                ctrlKey: ctrlKey
            } as KeyboardEventInit);
            listElement.dispatchEvent(event);
            treeListInstance.refreshViewPort();
            fixture.detectChanges();
        };

        observeModelViewPort$(fixture).pipe(
            debounceTime(100)
        ).subscribe(vp => {
            fixture.detectChanges();
            const selectedElements = fixture.debugElement.queryAll(By.css('deja-tree-list > .deja-listcontainer > .listitem.selected'));
            const currentElement = fixture.debugElement.query(By.css('deja-tree-list > .deja-listcontainer > .listitem[current="true"]'));
            const selectedItems = vp.items.filter((item: IItemBase<unknown>) => item.selected);

            switch (++pass) {
                case 1:
                    // Selection from HTML
                    void expect(vp.items.filter((item: IItemBase<unknown>) => item.selected).length).toBe(3);
                    // Clear selection
                    treeListInstance.selectedModel = null;
                    treeListInstance.refreshViewPort();
                    fixture.detectChanges();
                    break;

                case 2:
                    // Check no selected
                    void expect(selectedElements.length).toBe(0);
                    void expect(selectedItems.length).toBe(0);
                    // Select first line by keydown
                    sendKeyDown(KeyCodes.DownArrow);
                    break;

                case 3:
                    // Check selection
                    void expect(selectedElements.length).toBe(1);
                    void expect(selectedItems.length).toBe(1);
                    void expect(selectedElements[0]?.attributes.flat).toBe('0');
                    // Select second line by keydown
                    sendKeyDown(KeyCodes.DownArrow);
                    break;

                case 4:
                    // Check selection
                    void expect(selectedElements.length).toBe(1);
                    void expect(selectedItems.length).toBe(1);
                    void expect(selectedElements[0]?.attributes.flat).toBe('1');
                    // Select first line by keyup
                    sendKeyDown(KeyCodes.UpArrow);
                    break;

                case 5:
                    // Check selection
                    void expect(selectedElements.length).toBe(1);
                    void expect(selectedItems.length).toBe(1);
                    void expect(selectedElements[0]?.attributes.flat).toBe('0');
                    // Select first and second lines by shift+keydown
                    sendKeyDown(KeyCodes.DownArrow, true);
                    break;

                case 6:
                    // Check selection
                    void expect(selectedElements.length).toBe(2);
                    void expect(selectedItems.length).toBe(2);
                    void expect(selectedElements[0]?.attributes.flat).toBe('0');
                    void expect(selectedElements[1]?.attributes.flat).toBe('1');
                    // Keep selection, but pass current line to the third line
                    sendKeyDown(KeyCodes.DownArrow, false, true);
                    break;

                case 7:
                    // Check selection
                    void expect(selectedElements.length).toBe(2);
                    void expect(selectedItems.length).toBe(2);
                    void expect(selectedElements[0]?.attributes.flat).toBe('0');
                    void expect(selectedElements[1]?.attributes.flat).toBe('1');
                    // Check current item
                    void expect(currentElement.attributes.flat).toBe('2');
                    // Select third line only
                    sendKeyDown('Space');
                    break;

                case 8:
                    // Check selection
                    void expect(selectedElements.length).toBe(1);
                    void expect(selectedItems.length).toBe(1);
                    void expect(selectedElements[0]?.attributes.flat).toBe('2');
                    // Select first line with Home
                    sendKeyDown('Home', true);
                    break;

                case 9:
                    // Check selection
                    void expect(selectedElements.length).toBe(1);
                    void expect(selectedItems.length).toBe(1);
                    void expect(selectedElements[0]?.attributes.flat).toBe('0');
                    // Select last line with End
                    sendKeyDown('End');
                    break;

                case 10:
                    // Check selection
                    void expect(selectedElements.length).toBe(1);
                    void expect(selectedItems.length).toBe(1);
                    void expect(selectedElements[0]?.attributes.flat).toBe('1999');
                    // Select the two last lines with Shift+PageUp
                    sendKeyDown(KeyCodes.UpArrow, true);
                    break;

                case 11:
                    // Check selection
                    void expect(selectedElements.length).toBe(2);
                    void expect(selectedItems.length).toBe(2);
                    void expect(selectedElements[0]?.attributes.flat).toBe('1998');
                    void expect(selectedElements[1]?.attributes.flat).toBe('1999');
                    // Keep selection, but pass current line to the first line
                    sendKeyDown('Home', false, true);
                    break;

                case 12:
                    // Check selection
                    void expect(selectedElements.length).toBe(0);
                    void expect(selectedItems.length).toBe(2);
                    // Check current item
                    void expect(currentElement?.attributes.flat).toBe('0');
                    // Select line 11 (PageSize=10)
                    sendKeyDown('PageDown');
                    break;

                case 13:
                    // Check selection
                    void expect(selectedElements.length).toBe(1);
                    void expect(selectedItems.length).toBe(1);
                    void expect(selectedElements[0]?.attributes.flat).toBe('10');
                    // Check current item
                    void expect(currentElement?.attributes.flat).toBe('10');
                    // Select from line 11 to last line
                    sendKeyDown('End', true);
                    break;

                case 14:
                    // Check selection
                    void expect(selectedElements.length).toBe(vp.visibleItems.length);
                    void expect(selectedItems.length).toBe(vp.items.length - 10);
                    // Check current item
                    void expect(currentElement?.attributes.flat).toBe('1999');
                    // Select first line with Home
                    sendKeyDown('Home');
                    break;

                case 15:
                    // Check selection
                    void expect(selectedElements.length).toBe(1);
                    void expect(selectedItems.length).toBe(1);
                    // Check current item
                    void expect(currentElement?.attributes.flat).toBe('0');
                    // Select until line 11
                    sendKeyDown('PageDown', true);
                    break;

                case 16:
                    // Check selection
                    void expect(selectedElements.length).toBe(11);
                    void expect(selectedItems.length).toBe(11);
                    // Check current item
                    void expect(currentElement?.attributes.flat).toBe('10');
                    // Select next line only
                    sendKeyDown(KeyCodes.DownArrow);
                    break;

                case 17:
                    // Check selection
                    void expect(selectedElements.length).toBe(1);
                    void expect(selectedItems.length).toBe(1);
                    // Check current item
                    void expect(currentElement?.attributes.flat).toBe('11');
                    // Select second line with PageUp
                    sendKeyDown('PageUp');
                    break;

                case 18:
                    // Check selection
                    void expect(selectedElements.length).toBe(1);
                    void expect(selectedItems.length).toBe(1);
                    // Check current item
                    void expect(currentElement?.attributes.flat).toBe('1');
                    // Select last line
                    sendKeyDown('End');
                    break;

                case 19:
                    // Check selection
                    void expect(selectedElements.length).toBe(1);
                    void expect(selectedItems.length).toBe(1);
                    void expect(selectedElements[0]?.attributes.flat).toBe('1999');
                    // Check current item
                    void expect(currentElement?.attributes.flat).toBe('1999');
                    // Select from line 11 to last line
                    sendKeyDown('PageUp', true);
                    break;

                case 20:
                    // Check selection
                    void expect(selectedElements.length).toBe(11);
                    void expect(selectedItems.length).toBe(11);
                    // Select first line
                    sendKeyDown('Home');
                    break;

                case 21:
                    // Check selection
                    void expect(selectedElements.length).toBe(1);
                    void expect(selectedItems.length).toBe(1);
                    void expect(selectedElements[0]?.attributes.flat).toBe('0');
                    // Check current item
                    void expect(currentElement?.attributes.flat).toBe('0');
                    // Toggle first line selection with ctrl
                    sendKeyDown('Space', false, true);
                    break;

                case 22:
                    // Check selection
                    void expect(selectedElements.length).toBe(0);
                    void expect(selectedItems.length).toBe(0);
                    // Check current item
                    void expect(currentElement?.attributes.flat).toBe('0');
                    // Select first line with enter in single select
                    treeListInstance.multiSelect = false;
                    fixture.detectChanges();
                    sendKeyDown('Enter');
                    break;

                default:
                    void expect(selectedElements.length).toBe(1);
                    void expect(selectedItems.length).toBe(1);
                    void expect(selectedElements[0]?.attributes.flat).toBe('0');
                    void expect(currentElement?.attributes.flat).toBe('0');
                    done();
            }
        });

        fixture.detectChanges();

        const listElement = treeListInstance.listElement;
    });

    it('should refresh view port if windows is resized', done => {
        let pass = 0;
        const fixture = TestBed.createComponent(DejaTreeListByModelContainerComponent);

        observeModelViewPort$(fixture).pipe(
            debounceTime(100)
        ).subscribe(vp => {
            fixture.detectChanges();
            let event: Event;
            switch (++pass) {
                case 1:
                    event = new Event('resize', {});
                    window.dispatchEvent(event);
                    break;

                default:
                    void expect(vp.visibleItems.length).toBeGreaterThan(10);
                    done();

            }
        });

        fixture.detectChanges();
    });
});

describe('DejaTreeListByOptionsContainerComponent', () => {
    beforeEach(waitForAsync(() => {
        void TestBed.configureTestingModule({
            declarations: [
                DejaTreeListByOptionsContainerComponent
            ],
            imports: [
                BrowserAnimationsModule,
                CommonModule,
                FormsModule,
                DejaTreeListModule,
                DejaItemModule
            ]
        }).compileComponents();
    }));

    const observeOptionsViewPort$ = (fixture: ComponentFixture<DejaTreeListByOptionsContainerComponent>): Observable<IViewPort> => {
        const treeListDebugElement = fixture.debugElement.query(By.directive(DejaTreeListComponent));
        const viewPortService = treeListDebugElement.injector.get(ViewPortService);

        return viewPortService.viewPortResult$.pipe(
            filter(result => result.viewPortSize > 0));
    };

    it('should create the component', done => {
        const fixture = TestBed.createComponent(DejaTreeListByOptionsContainerComponent);
        const treeListDebugElement = fixture.debugElement.query(By.directive(DejaTreeListComponent));
        const treeListInstance = treeListDebugElement.componentInstance as DejaTreeListComponent;

        observeOptionsViewPort$(fixture).pipe(
            debounceTime(100)
        ).subscribe(() => {
            fixture.detectChanges();
            const items = fixture.debugElement.queryAll(By.css('deja-tree-list > .deja-listcontainer > .listitem'));
            void expect(items.length).toBe(12);
            done();
        });

        fixture.detectChanges();

        void expect(treeListInstance).toBeTruthy();
    });

    it('should filter and select with the keyboard', done => {
        let pass = 0;
        const fixture = TestBed.createComponent(DejaTreeListByOptionsContainerComponent);
        const treeListDebugElement = fixture.debugElement.query(By.directive(DejaTreeListComponent));
        const treeListInstance = treeListDebugElement.componentInstance as DejaTreeListComponent;

        const sendKeyUp = (code: string): void => {
            const event = new KeyboardEvent('keyup', {
                code: `Key${code.toUpperCase()}`,
                key: code
            } as KeyboardEventInit);
            listElement.dispatchEvent(event);
            treeListInstance.refreshViewPort();
            fixture.detectChanges();
        };

        observeOptionsViewPort$(fixture).pipe(
            debounceTime(450) // Wait for the clear filter flag
        ).subscribe(vp => {
            fixture.detectChanges();
            const selectedElements = fixture.debugElement.queryAll(By.css('deja-tree-list > .deja-listcontainer > .listitem.selected'));
            const currentElement = fixture.debugElement.query(By.css('deja-tree-list > .deja-listcontainer > .listitem[current="true"]'));
            const selectedItems = vp.items.filter((item: IItemBase<unknown>) => item.selected);

            switch (++pass) {
                case 1:
                    // Check selected and current
                    void expect(selectedElements.length).toBe(0);
                    void expect(selectedItems.length).toBe(0);
                    // Search first started with c
                    sendKeyUp('c');
                    break;

                case 2:
                    // Check selected and current
                    void expect(selectedElements.length).toBe(0);
                    void expect(selectedItems.length).toBe(0);
                    void expect(currentElement?.attributes.flat).toBe('2');
                    // Search next
                    sendKeyUp('c');
                    break;

                case 3:
                    // Check selected and current
                    void expect(selectedElements.length).toBe(0);
                    void expect(selectedItems.length).toBe(0);
                    void expect(currentElement?.attributes.flat).toBe('3');
                    // Search next
                    sendKeyUp('c');
                    break;

                case 4:
                    // Check selected and current
                    void expect(selectedElements.length).toBe(0);
                    void expect(selectedItems.length).toBe(0);
                    void expect(currentElement?.attributes.flat).toBe('4');
                    // Search next
                    sendKeyUp('c');
                    break;

                case 5:
                    // Check selected and current
                    void expect(selectedElements.length).toBe(0);
                    void expect(selectedItems.length).toBe(0);
                    void expect(currentElement?.attributes.flat).toBe('5');
                    // Search next
                    sendKeyUp('c');
                    break;

                case 6:
                    // Check selected and current
                    void expect(selectedElements.length).toBe(0);
                    void expect(selectedItems.length).toBe(0);
                    void expect(currentElement?.attributes.flat).toBe('2');
                    // Enable search area
                    treeListInstance.searchArea = true;
                    fixture.detectChanges();
                    // Filter test
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    (<any>treeListInstance).setQuery$.next('c');
                    treeListInstance.refreshViewPort();
                    fixture.detectChanges();
                    break;

                default:
                    void expect(vp.visibleItems.length).toBe(5);
                    done();

            }
        });

        fixture.detectChanges();

        const listElement = treeListInstance.listElement;
    });

    it('should select with the mouse', done => {
        let pass = 0;
        const fixture = TestBed.createComponent(DejaTreeListByOptionsContainerComponent);
        const treeListDebugElement = fixture.debugElement.query(By.directive(DejaTreeListComponent));
        const treeListInstance = treeListDebugElement.componentInstance as DejaTreeListComponent;

        const sendMouseClick = (element: DebugElement, shiftKey?: boolean, ctrlKey?: boolean, upElement?: DebugElement): void => {
            // Simulate a mouse click
            const eventInit = (): MouseEventInit => ({
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
                relatedTarget: listElement.nativeElement as HTMLElement,
                screenX: 0,
                screenY: 0
            } as MouseEventInit);
            const event = new MouseEvent('mousedown', eventInit());
            element.nativeElement.dispatchEvent(event);
            fixture.detectChanges();
            timer(100).pipe(
                take(1)
            ).subscribe(() => {
                const upEvent = new MouseEvent('mouseup', eventInit());
                (upElement || element).nativeElement.dispatchEvent(upEvent);
                treeListInstance.refreshViewPort();
                fixture.detectChanges();
            });
        };

        observeOptionsViewPort$(fixture).pipe(
            debounceTime(10)
        ).subscribe(vp => {
            fixture.detectChanges();
            const displayedElements = fixture.debugElement.queryAll(By.css('deja-tree-list > .deja-listcontainer > .listitem'));
            const selectedElements = fixture.debugElement.queryAll(By.css('deja-tree-list > .deja-listcontainer > .listitem.selected'));
            const currentElement = fixture.debugElement.query(By.css('deja-tree-list > .deja-listcontainer > .listitem[current="true"]'));
            const selectedItems = vp.items.filter((item: IItemBase<unknown>) => item.selected);

            switch (++pass) {
                case 1:
                    // Check selected and current
                    void expect(selectedElements.length).toBe(0);
                    void expect(selectedItems.length).toBe(0);
                    // Check flags
                    void expect(treeListInstance.isMultiSelect).toBe(true);
                    // Simulate click on first element on disabled
                    treeListInstance.disabled = true;
                    fixture.detectChanges();
                    sendMouseClick(displayedElements[1]);
                    break;

                case 2:
                    // Check selected and current
                    void expect(selectedElements.length).toBe(0);
                    void expect(selectedItems.length).toBe(0);
                    // Simulate click on first element on disabled
                    treeListInstance.disabled = false;
                    fixture.detectChanges();
                    sendMouseClick(displayedElements[1]);
                    break;

                case 3:
                    // Check selected and current
                    void expect(selectedElements.length).toBe(1);
                    void expect(selectedItems.length).toBe(1);
                    void expect(currentElement?.attributes.flat).toBe('1');
                    // Simulate click with ctrl
                    sendMouseClick(displayedElements[4], false, true);
                    break;

                case 4:
                    // Check selected and current
                    void expect(selectedElements.length).toBe(2);
                    void expect(selectedItems.length).toBe(2);
                    void expect(currentElement?.attributes.flat).toBe('4');
                    // Simulate click with shift
                    sendMouseClick(displayedElements[6], true);
                    break;

                case 5:
                    // Check selected and current
                    void expect(selectedElements.length).toBe(3);
                    void expect(selectedItems.length).toBe(3);
                    void expect(currentElement?.attributes.flat).toBe('4');
                    // Click outside must keep the selection
                    sendMouseClick(listElement);
                    break;

                case 6:
                    // Check selected and current
                    void expect(selectedElements.length).toBe(3);
                    void expect(selectedItems.length).toBe(3);
                    void expect(currentElement?.attributes.flat).toBe('4');
                    // Switch to single select
                    treeListInstance.multiSelect = false;
                    void expect(treeListInstance.isMultiSelect).toBe(false);
                    fixture.detectChanges();
                    // Click first line
                    sendMouseClick(displayedElements[0]);
                    break;

                case 7:
                    // Check selected and current
                    void expect(selectedElements.length).toBe(1);
                    void expect(selectedItems.length).toBe(1);
                    void expect(currentElement?.attributes.flat).toBe('0');
                    // Simulate click with ctrl
                    sendMouseClick(displayedElements[4], false, true);
                    break;

                case 8:
                    // Check selected and current
                    void expect(selectedElements.length).toBe(1);
                    void expect(selectedItems.length).toBe(1);
                    void expect(currentElement?.attributes.flat).toBe('4');
                    // Simulate click with shift
                    sendMouseClick(displayedElements[6], true);
                    break;

                default:
                    // Check selected and current
                    void expect(selectedElements.length).toBe(1);
                    void expect(selectedItems.length).toBe(1);
                    void expect(currentElement?.attributes.flat).toBe('6');
                    done();

            }
        });

        fixture.detectChanges();

        const listElement = fixture.debugElement.query(By.css('deja-tree-list > .deja-listcontainer'));
    });
});
