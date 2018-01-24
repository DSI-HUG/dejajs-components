/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DebugElement } from '@angular/core/src/debug/debug_node';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/first';
import { Observable } from 'rxjs/Observable';
import { GroupingService } from '../../common/core/grouping/grouping.service';
import { DejaItemModule } from '../../common/core/item-list/index';
import { IItemBase } from '../../common/core/item-list/item-base';
import { ItemListService } from '../../common/core/item-list/item-list.service';
import { IItemTree } from '../../common/core/item-list/item-tree';
import { ViewPortService } from '../../common/core/item-list/viewport.service';
import { DejaConnectionPositionPair } from '../../common/core/overlay/connection-position-pair';
import { ISortInfos } from '../../common/core/sorting/sort-infos.model';
import { SortingService } from '../../common/core/sorting/sorting.service';
import { DejaSelectModule } from './index';
import { DejaSelectSelectionPosition } from './select.component';
import { DejaSelectComponent } from './select.component';

@Component({
    template: `<deja-select style="width: 1000px;" [items]="itemList" viewportMode="variable" searchArea sortable itemsDraggable pageSize="10">
                    <ng-template #itemTemplate let-item>
                        Item {{ item.displayName }}
                    </ng-template>
                </deja-select>`,
    providers: [
        GroupingService
    ],
})
class DejaSelectContainerComponent {
    public itemList = [] as IItemTree[];

    constructor(groupingService: GroupingService) {
        document.body.style.width = '1280px';
        document.body.style.height = '1024px';

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

    public testDone() {
        return true;
    }
}

@Component({
    template: `<deja-select style="width: 1000px;" [(ngModel)]="selectedModels" [models]="modelsList$ | async" type="multiselect" viewportMode="fixed" valueField="id" selectionClearable>
                    <ng-template #itemTemplate let-item>
                        <span [style.background-color]="backgroundColor(item)">
                            Item {{ item.model.displayName }}
                        </span>
                    </ng-template>
                </deja-select>`,
    providers: [
        SortingService,
    ],
})
class DejaSelectByModelContainerComponent {
    public modelsList$: Observable<any[]>;
    public selectedModels: any[];

    constructor(sortingService: SortingService) {
        document.body.style.width = '1280px';
        document.body.style.height = '1024px';

        const modelsList = Array.apply(null, { length: 2000 }).map((_n, i) => {
            const rand = Math.floor(Math.random() * (70 - 33 + 1)) + 33; // random de 33 à 70;
            return {
                id: i,
                value: rand,
                displayName: `${i} - Une ligne de test avec une valeur de : ${rand}`,
            };
        });

        this.selectedModels = [1, 2, 3];
        this.modelsList$ = sortingService.sort$(modelsList, { name: 'value' } as ISortInfos);
    }

    public backgroundColor(item: IItemBase) {
        return item.selected ? '#888' : null;
    }

    public testDone() {
        return true;
    }
}

@Component({
    template: `<deja-select style="width: 1000px;" viewportMode="fixed" type="multiselect" sortable itemsDraggable pageSize="5" modelIsValue="true">
                    <deja-item value="" text=""></deja-item>
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
                    <ng-template #itemTemplate let-item>
                        <span [style.background-color]="backgroundColor(item)">
                            {{ item.text }}
                        </span>
                    </ng-template>
                </deja-select>`,
})
class DejaSelectByOptionsContainerComponent {
    constructor() {
        document.body.style.width = '1280px';
        document.body.style.height = '1024px';
    }

    public backgroundColor(item: IItemBase) {
        return item.selected ? '#888' : null;
    }

    public testDone() {
        return true;
    }
}

describe('DejaSelectComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                DejaSelectContainerComponent,
            ],
            imports: [
                BrowserAnimationsModule,
                CommonModule,
                FormsModule,
                DejaSelectModule,
            ],
        }).compileComponents();
    }));

    const observeViewPort$ = (fixture: ComponentFixture<DejaSelectContainerComponent>) => {
        const selectDebugElement = fixture.debugElement.query(By.directive(DejaSelectComponent));
        const viewPortService = selectDebugElement.injector.get(ViewPortService) as ViewPortService;
        const selectInstance = selectDebugElement.componentInstance as DejaSelectComponent;

        Observable.from(selectInstance.dropDownVisibleChange)
            .subscribe(() => fixture.detectChanges());

        return Observable.from(viewPortService.viewPortResult$)
            .filter((result) => result.viewPortSize > 0);
    };

    it('should create the component', async(() => {
        const fixture = TestBed.createComponent(DejaSelectContainerComponent);
        fixture.detectChanges();
        const selectDebugElement = fixture.debugElement.query(By.directive(DejaSelectComponent));
        const selectInstance = selectDebugElement.componentInstance as DejaSelectComponent;
        expect(selectInstance).toBeTruthy();
    }));

    it('should return the write property', (() => {
        const fixture = TestBed.createComponent(DejaSelectContainerComponent);
        const selectDebugElement = fixture.debugElement.query(By.directive(DejaSelectComponent));
        const selectInstance = selectDebugElement.componentInstance as DejaSelectComponent;
        const sl = selectInstance as any;
        const itemListService = selectInstance.getItemListService();

        fixture.detectChanges();

        expect(selectInstance.positions).toEqual(DejaConnectionPositionPair.default);
        selectInstance.positions = 'start top start bottom';
        expect(sl.positions).toEqual(DejaConnectionPositionPair.parse('start top start bottom'));

        selectInstance.dropDownWidth = 100;
        expect(sl.dropDownWidth).toEqual('100px');

        expect(selectInstance.readonly).toBeNull();
        sl.readonly = 'true';
        expect(selectInstance.readonly).toBeTruthy();

        expect(selectInstance.hideSelected).toBeUndefined();
        sl.hideSelected = 'true';
        expect(selectInstance.hideSelected).toBeTruthy();

        expect(selectInstance.pageSize).toBe(10);
        selectInstance.pageSize = 5;
        expect(selectInstance.pageSize).toBe(5);
        selectInstance.pageSize = 0;
        expect(selectInstance.pageSize).toBe(0);

        expect(selectInstance.hintLabel).toBeUndefined();
        selectInstance.hintLabel = 'I am a hint label';
        expect(selectInstance.hintLabel).toEqual(`I am a hint label`);

        expect(sl._viewPortRowHeight).toBe(ViewPortService.itemDefaultSize);
        selectInstance.viewPortRowHeight = 100;
        expect(sl._viewPortRowHeight).toBe(100);

        expect(selectInstance.childrenField).toBeUndefined();
        expect(itemListService.childrenField).toEqual(ItemListService.defaultChildrenField);
        selectInstance.childrenField = 'children';
        expect(selectInstance.childrenField).toEqual('children');
        expect(itemListService.childrenField).toEqual('children');

        expect(selectInstance.textField).toEqual(ItemListService.defaultTextField);
        selectInstance.textField = 'text';
        expect(selectInstance.textField).toEqual('text');

        expect(selectInstance.valueField).toEqual(ItemListService.defaultValueField);
        selectInstance.valueField = 'my value field';
        expect(selectInstance.valueField).toEqual('my value field');

        expect(selectInstance.searchField).toBeUndefined();
        selectInstance.searchField = 'my search field';
        expect(selectInstance.searchField).toEqual('my search field');

        expect(sl.delaySearchTrigger$.getValue()).toBe(250);
        selectInstance.delaySearchTrigger = 500;
        expect(sl.delaySearchTrigger$.getValue()).toBe(500);

        expect(selectInstance.selectedItemsPosition).toEqual(DejaSelectSelectionPosition.above);
        selectInstance.selectedItemsPosition = DejaSelectSelectionPosition.below;
        expect(selectInstance.selectedItemsPosition).toEqual(DejaSelectSelectionPosition.below);

        const myItemListService = new ItemListService();
        expect(selectInstance.itemListService).toBeDefined();
        selectInstance.itemListService = myItemListService;
        expect(selectInstance.itemListService).toBe(myItemListService);

        const sortingService = new SortingService();
        expect(myItemListService.getSortingService()).toBeDefined();
        selectInstance.sortingService = sortingService;
        expect(myItemListService.getSortingService()).toBe(sortingService);

        const groupingService = new GroupingService();
        expect(myItemListService.getGroupingService()).toBeDefined();
        selectInstance.groupingService = groupingService;
        expect(myItemListService.getGroupingService()).toBe(groupingService);

        const listService = myItemListService as any;
        const loadingItems = () => Observable.of([]);
        selectInstance.loadingItems = loadingItems;
        expect(listService.loadingItems$).toBe(loadingItems);
        const selectingItem = () => Observable.of([]);
        selectInstance.selectingItem = selectingItem;
        expect(listService.selectingItem$).toBe(selectingItem);
        const unselectingItem = () => Observable.of([]);
        selectInstance.unselectingItem = unselectingItem;
        expect(listService.unselectingItem$).toBe(unselectingItem);
        const expandingItem = () => Observable.of([]);
        selectInstance.expandingItem = expandingItem;
        expect(listService.expandingItem$).toBe(expandingItem);
        const collapsingItem = () => Observable.of([]);
        selectInstance.collapsingItem = collapsingItem;
        expect(listService.collapsingItem$).toBe(collapsingItem);

        expect(selectInstance.disabled).toBeNull();
        selectInstance.disabled = 'true';
        expect(selectInstance.disabled).toBeTruthy();
        selectInstance.setDisabledState(false);
        expect(selectInstance.disabled).toBeFalsy();

        expect(selectInstance.waiter).toBeFalsy();
        selectInstance.waiter = true;
        expect(selectInstance.waiter).toBeTruthy();

        expect(selectInstance.depthMax).toBe(1);
    }));

    it('should open and close the dropdown programatically', async(() => {
        let pass = 0;
        const fixture = TestBed.createComponent(DejaSelectContainerComponent);
        const selectContainerInstance = fixture.componentInstance as DejaSelectContainerComponent;
        const selectDebugElement = fixture.debugElement.query(By.directive(DejaSelectComponent));
        const selectInstance = selectDebugElement.componentInstance as DejaSelectComponent;
        const viewPortService = selectDebugElement.injector.get(ViewPortService) as ViewPortService;
        const sl = selectInstance as any;

        Observable.from(selectInstance.dropDownVisibleChange)
            .do((state) => {
                fixture.detectChanges();
                switch (++pass) {
                    case 1:
                        expect(state).toBeTruthy();
                        break;
                    case 2:
                        expect(state).toBeFalsy();
                        break;
                    case 3:
                        expect(state).toBeTruthy();
                        break;
                    default:
                        expect(state).toBeFalsy();
                }
            })
            .delay(100)
            .subscribe(() => {
                switch (pass) {
                    case 2:
                    case 3:
                        sl.toggleDropDown();
                        break;
                }
            });

        Observable.from(viewPortService.viewPortResult$)
            .debounceTime(100)
            .first()
            .subscribe((vp) => {
                // Bind view port
                fixture.detectChanges();
                expect(vp.items.length).toBeGreaterThan(0);
                expect(vp.visibleItems.length).toBeGreaterThan(0);
                sl.hideDropDown();
                selectContainerInstance.testDone();
            });

        sl.showDropDown();

        spyOn(selectContainerInstance, 'testDone');

        fixture.detectChanges();
        fixture.whenStable().then(() => {
            expect(selectContainerInstance.testDone).toHaveBeenCalled();
        });
    }));

    it('should toggle and collapse parent items', async(() => {
        let pass = 0;
        const fixture = TestBed.createComponent(DejaSelectContainerComponent);
        const selectContainerInstance = fixture.componentInstance as DejaSelectContainerComponent;
        const selectDebugElement = fixture.debugElement.query(By.directive(DejaSelectComponent));
        const selectInstance = selectDebugElement.componentInstance as DejaSelectComponent;
        const sl = selectInstance as any;

        observeViewPort$(fixture)
            .debounceTime(10)
            .subscribe((vp) => {
                // Bind view port
                fixture.detectChanges();
                const collapsed = fixture.debugElement.queryAll(By.css('.deja-overlay-container > .cdk-overlay-pane > .deja-listcontainer > .listitem.parent.collapsed'));
                const collapsedItems = vp.items.filter((item: IItemTree) => item.collapsed);
                const parentItems = vp.items.filter((item: IItemTree) => item.depth === 0);
                switch (++pass) {
                    case 1:
                        expect(collapsed.length).toBe(0);
                        expect(collapsedItems.length).toBe(0);
                        // Toggle all items
                        selectInstance.toggleAll();
                        selectInstance.refreshViewPort();
                        fixture.detectChanges();
                        break;

                    case 2:
                        // Check collapsed items
                        expect(collapsed.length).toBeGreaterThan(0);
                        expect(collapsedItems.length).toBe(parentItems.length);
                        // Toggle all items
                        selectInstance.toggleAll();
                        selectInstance.refreshViewPort();
                        fixture.detectChanges();
                        break;

                    case 3:
                        // Check collapsed items
                        expect(collapsed.length).toBe(0);
                        expect(collapsedItems.length).toBe(0);
                        // Toogle only first
                        selectInstance.toggleCollapse(0, true);
                        selectInstance.refreshViewPort();
                        fixture.detectChanges();
                        break;

                    case 4:
                        // Check collapsed items
                        expect(collapsed.length).toBe(1);
                        expect(collapsedItems.length).toBe(1);
                        // Clear toogle
                        selectInstance.toggleAll(false);
                        selectInstance.refreshViewPort();
                        fixture.detectChanges();
                        break;

                    default:
                        // Check no collapsed
                        expect(collapsed.length).toBe(0);
                        expect(collapsedItems.length).toBe(0);
                        selectContainerInstance.testDone();
                }
            });

        sl.showDropDown();

        spyOn(selectContainerInstance, 'testDone');

        fixture.detectChanges();
        fixture.whenStable().then(() => {
            expect(selectContainerInstance.testDone).toHaveBeenCalled();
        });
    }));

    it('should not load items if minSearchlength is defined', async(() => {
        let pass = 0;
        const fixture = TestBed.createComponent(DejaSelectContainerComponent);
        const selectContainerInstance = fixture.componentInstance as DejaSelectContainerComponent;
        const selectDebugElement = fixture.debugElement.query(By.directive(DejaSelectComponent));
        const selectInstance = selectDebugElement.componentInstance as DejaSelectComponent;
        const viewPortService = selectDebugElement.injector.get(ViewPortService) as ViewPortService;
        const sl = selectInstance as any;

        Observable.from(selectInstance.dropDownVisibleChange)
            .subscribe(() => fixture.detectChanges());

        Observable.from(viewPortService.viewPortResult$)
            .debounceTime(100)
            .subscribe((_vp) => {
                // Bind view port
                fixture.detectChanges();
                const listItems = fixture.debugElement.queryAll(By.css('.deja-overlay-container > .cdk-overlay-pane > .deja-listcontainer > .listitem'));
                switch (++pass) {
                    case 1:
                        expect(listItems.length).toBe(0);
                        sl.queryChanged('33');
                        sl.filterListComplete$.next();
                        selectInstance.refreshViewPort();
                        fixture.detectChanges();
                        break;

                    case 2:
                        expect(listItems.length).toBeGreaterThan(0);
                        sl.queryChanged('44');
                        sl.filterListComplete$.next();
                        selectInstance.refreshViewPort();
                        fixture.detectChanges();
                        break;

                    default:
                        expect(listItems.length).toBeGreaterThan(0);
                        selectContainerInstance.testDone();
                }
            });

        selectInstance.minSearchlength = 2;
        selectInstance.type = 'autocomplete';
        sl.showDropDown();

        spyOn(selectContainerInstance, 'testDone');

        fixture.detectChanges();
        fixture.whenStable().then(() => {
            expect(selectContainerInstance.testDone).toHaveBeenCalled();
        });
    }));
});

describe('DejaSelectByModelContainerComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                DejaSelectByModelContainerComponent,
            ],
            imports: [
                BrowserAnimationsModule,
                CommonModule,
                FormsModule,
                DejaSelectModule,
            ],
        }).compileComponents();
    }));

    it('should create the component', async(() => {
        const fixture = TestBed.createComponent(DejaSelectByModelContainerComponent);
        fixture.detectChanges();
        const selectDebugElement = fixture.debugElement.query(By.directive(DejaSelectComponent));
        const selectInstance = selectDebugElement.componentInstance as DejaSelectComponent;
        expect(selectInstance).toBeTruthy();
    }));

    it('should close the selection in multiselect', async(() => {
        const fixture = TestBed.createComponent(DejaSelectByModelContainerComponent);
        fixture.detectChanges();

        fixture.whenStable().then(() => {
            fixture.detectChanges();

            let selectedChips = fixture.debugElement.queryAll(By.css('deja-select > deja-chips > span > #close-button'));
            expect(selectedChips.length).toBe(3);

            selectedChips.forEach((closeButton) => closeButton.nativeElement.click());
            fixture.detectChanges();

            selectedChips = fixture.debugElement.queryAll(By.css('deja-select > deja-chips > span > #close-button'));
            expect(selectedChips.length).toBe(0);
        });
    }));

    it('should unselect all the elements in multiselect', async(() => {
        const fixture = TestBed.createComponent(DejaSelectByModelContainerComponent);
        const selectDebugElement = fixture.debugElement.query(By.directive(DejaSelectComponent));
        const selectInstance = selectDebugElement.componentInstance as DejaSelectComponent;
        const sl = selectDebugElement.componentInstance;

        fixture.detectChanges();

        fixture.whenStable().then(() => {
            fixture.detectChanges();

            let selectedChips = fixture.debugElement.queryAll(By.css('deja-select > deja-chips > span > #close-button'));
            expect(selectedChips.length).toBe(3);
            expect(selectInstance.selectedItems.length).toBe(3);
            expect(selectInstance.selectedModels.length).toBe(3);

            sl.removeSelection();
            fixture.detectChanges();

            selectedChips = fixture.debugElement.queryAll(By.css('deja-select > deja-chips > span > #close-button'));
            expect(selectedChips.length).toBe(0);
            expect(selectInstance.selectedItems.length).toBe(0);
            expect(selectInstance.selectedModels.length).toBe(0);
        });
    }));

    it('should close the selection in single select', async(() => {
        const fixture = TestBed.createComponent(DejaSelectByModelContainerComponent);
        const selectDebugElement = fixture.debugElement.query(By.directive(DejaSelectComponent));
        const selectInstance = selectDebugElement.componentInstance as DejaSelectComponent;

        fixture.detectChanges();

        selectInstance.type = 'select';
        fixture.detectChanges();

        fixture.whenStable().then(() => {
            fixture.detectChanges();

            expect(selectInstance.selectedItems.length).toBe(1);
            expect(selectInstance.selectedModels.length).toBe(1);
            expect(selectInstance.selectedModel && selectInstance.selectedModel.id).toBe(1);

            const closeButton = fixture.debugElement.query(By.css('deja-select #clear-button'));
            closeButton.nativeElement.click();
            fixture.detectChanges();

            expect(selectInstance.selectedItems.length).toBe(0);
            expect(selectInstance.selectedModels.length).toBe(0);

            selectInstance.value = selectInstance.getItemListService().getItems()[2];
            fixture.detectChanges();
            expect(selectInstance.selectedItems.length).toBe(1);
            expect(selectInstance.selectedModels.length).toBe(1);
            expect(selectInstance.value).toBe(selectInstance.getItemListService().getItems()[2]);
        });
    }));
});

describe('DejaSelectByOptionsContainerComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                DejaSelectByOptionsContainerComponent,
            ],
            imports: [
                BrowserAnimationsModule,
                CommonModule,
                FormsModule,
                DejaSelectModule,
                DejaItemModule,
            ],
        }).compileComponents();
    }));

    const observeOptionsViewPort$ = (fixture: ComponentFixture<DejaSelectByOptionsContainerComponent>) => {
        const selectDebugElement = fixture.debugElement.query(By.directive(DejaSelectComponent));
        const viewPortService = selectDebugElement.injector.get(ViewPortService) as ViewPortService;

        const selectInstance = selectDebugElement.componentInstance as DejaSelectComponent;

        Observable.from(selectInstance.dropDownVisibleChange)
            .subscribe(() => fixture.detectChanges());

        return Observable.from(viewPortService.viewPortResult$)
            .filter((result) => {
                return result.viewPortSize > 0;
            });
    };

    it('should open and close the dropdown programatically', async(() => {
        const fixture = TestBed.createComponent(DejaSelectByOptionsContainerComponent);
        const selectContainerInstance = fixture.componentInstance as DejaSelectByOptionsContainerComponent;
        const selectDebugElement = fixture.debugElement.query(By.directive(DejaSelectComponent));
        const selectInstance = selectDebugElement.componentInstance as DejaSelectComponent;
        const viewPortService = selectDebugElement.injector.get(ViewPortService) as ViewPortService;
        const sl = selectInstance as any;
        fixture.detectChanges();

        Observable.from(selectInstance.dropDownVisibleChange)
            .subscribe(() => fixture.detectChanges());

        Observable.from(viewPortService.viewPortResult$)
            .debounceTime(100)
            .first()
            .subscribe((vp) => {
                // Bind view port
                fixture.detectChanges();
                expect(vp.items.length).toBeGreaterThan(0);
                expect(vp.visibleItems.length).toBeGreaterThan(0);
                selectContainerInstance.testDone();
            });

        sl.isMobile = false;
        sl.showDropDown();

        spyOn(selectContainerInstance, 'testDone');

        fixture.detectChanges();
        fixture.whenStable().then(() => {
            expect(selectContainerInstance.testDone).toHaveBeenCalled();
        });
    }));

    it('should create the component', async(() => {
        const fixture = TestBed.createComponent(DejaSelectByOptionsContainerComponent);
        const selectContainerInstance = fixture.componentInstance as DejaSelectByOptionsContainerComponent;
        const selectDebugElement = fixture.debugElement.query(By.directive(DejaSelectComponent));
        const selectInstance = selectDebugElement.componentInstance as DejaSelectComponent;
        const sl = selectInstance as any;

        observeOptionsViewPort$(fixture)
            .debounceTime(100)
            .first()
            .subscribe(() => {
                fixture.detectChanges();

                const items = fixture.debugElement.queryAll(By.css('.deja-overlay-container > .cdk-overlay-pane > .deja-listcontainer > .listitem'));
                expect(items.length).toBe(13);
                selectContainerInstance.testDone();
            });

        fixture.detectChanges();
        expect(selectInstance).toBeTruthy();

        sl.showDropDown();

        spyOn(selectContainerInstance, 'testDone');

        fixture.detectChanges();
        fixture.whenStable().then(() => {
            expect(selectContainerInstance.testDone).toHaveBeenCalled();
        });
    }));

    it('should navigate with the keyboard', async(() => {
        let pass = 0;
        const fixture = TestBed.createComponent(DejaSelectByOptionsContainerComponent);
        const selectContainerInstance = fixture.componentInstance as DejaSelectByOptionsContainerComponent;
        const selectDebugElement = fixture.debugElement.query(By.directive(DejaSelectComponent));
        const selectInstance = selectDebugElement.componentInstance as DejaSelectComponent;
        const sl = selectInstance as any;

        const sendKeyDown = (code: string, shiftKey?: boolean, altKey?: boolean, ctrlKey?: boolean) => {
            const event = new KeyboardEvent('keydown', {
                code: code,
                shiftKey: shiftKey,
                altKey: altKey,
                ctrlKey: ctrlKey,
            } as KeyboardEventInit);
            sl.htmlInputElement.dispatchEvent(event);
            selectInstance.refreshViewPort();
            fixture.detectChanges();
        };

        observeOptionsViewPort$(fixture)
            .debounceTime(100)
            .subscribe((vp) => {
                fixture.detectChanges();
                const selectedChips = fixture.debugElement.queryAll(By.css('deja-select > deja-chips > span'));
                const selectedElements = fixture.debugElement.queryAll(By.css('.deja-overlay-container > .cdk-overlay-pane > .deja-listcontainer > .listitem.selected'));
                const currentElement = fixture.debugElement.query(By.css('.deja-overlay-container > .cdk-overlay-pane > .deja-listcontainer > .listitem[current="true"]'));
                const selectedItems = vp.items.filter((item: IItemBase) => item.selected);

                switch (++pass) {
                    case 1:
                        // Check no selected
                        expect(selectedElements.length).toBe(0);
                        expect(selectedItems.length).toBe(0);
                        expect(selectedChips.length).toBe(0);
                        // Current on first line by keydown
                        sendKeyDown('DownArrow');
                        break;

                    case 2:
                        // Check selection
                        expect(selectedElements.length).toBe(0);
                        expect(selectedItems.length).toBe(0);
                        expect(currentElement && currentElement.attributes.flat).toBe('0');
                        expect(selectedChips.length).toBe(0);
                        // Current on second line by keydown
                        sendKeyDown('DownArrow');
                        break;

                    case 3:
                        // Check selection
                        expect(selectedElements.length).toBe(0);
                        expect(selectedItems.length).toBe(0);
                        expect(currentElement && currentElement.attributes.flat).toBe('1');
                        expect(selectedChips.length).toBe(0);
                        // Current on first line by keyup
                        sendKeyDown('UpArrow');
                        break;

                    case 4:
                        // Check selection
                        expect(selectedElements.length).toBe(0);
                        expect(selectedItems.length).toBe(0);
                        expect(currentElement && currentElement.attributes.flat).toBe('0');
                        expect(selectedChips.length).toBe(0);
                        // Current on last line
                        sendKeyDown('End');
                        break;

                    case 5:
                        // Check selection
                        expect(selectedElements.length).toBe(0);
                        expect(selectedItems.length).toBe(0);
                        expect(currentElement && currentElement.attributes.flat).toBe('12');
                        expect(selectedChips.length).toBe(0);
                        // Current on line 6 by pageUp
                        sendKeyDown('PageUp');
                        break;

                    case 6:
                        // Check selection
                        expect(selectedElements.length).toBe(0);
                        expect(selectedItems.length).toBe(0);
                        expect(currentElement && currentElement.attributes.flat).toBe('7');
                        expect(selectedChips.length).toBe(0);
                        // Current on firstLine by Home
                        sendKeyDown('Home');
                        break;

                    case 7:
                        // Check selection
                        expect(selectedElements.length).toBe(0);
                        expect(selectedItems.length).toBe(0);
                        expect(currentElement && currentElement.attributes.flat).toBe('0');
                        expect(selectedChips.length).toBe(0);
                        // Current on Line 5 by pageDown
                        sendKeyDown('PageDown');
                        break;

                    case 8:
                        // Check selection
                        expect(selectedElements.length).toBe(0);
                        expect(selectedItems.length).toBe(0);
                        expect(currentElement && currentElement.attributes.flat).toBe('5');
                        expect(selectedChips.length).toBe(0);

                        // Select the lines with Enter
                        sendKeyDown('Enter');

                        Observable.from(selectInstance.dropDownVisibleChange)
                            .first()
                            .delay(10)
                            .subscribe(() => {
                                sl.htmlInputElement.click();
                            });

                        break;

                    case 9:
                        expect(selectedElements.length).toBe(1);
                        expect(selectedItems.length).toBe(1);
                        expect(currentElement && currentElement.attributes.flat).toBe('5');
                        expect(selectedChips.length).toBe(1);

                        // Select first line with enter in single select
                        selectInstance.type = 'select';
                        sendKeyDown('DownArrow');
                        break;

                    default:
                        expect(selectedElements.length).toBe(1);
                        expect(selectedItems.length).toBe(1);
                        expect(selectedElements[0] && selectedElements[0].attributes.flat).toBe('6');
                        expect(selectedChips.length).toBe(0);
                        selectContainerInstance.testDone();
                }
            });

        sl.showDropDown();

        spyOn(selectContainerInstance, 'testDone');

        fixture.detectChanges();
        fixture.whenStable().then(() => {
            expect(selectContainerInstance.testDone).toHaveBeenCalled();
        });
    }));

    it('should select with the mouse', async(() => {
        const fixture = TestBed.createComponent(DejaSelectByOptionsContainerComponent);
        const selectContainerInstance = fixture.componentInstance as DejaSelectByOptionsContainerComponent;
        const selectDebugElement = fixture.debugElement.query(By.directive(DejaSelectComponent));
        const selectInstance = selectDebugElement.componentInstance as DejaSelectComponent;
        const sl = selectInstance as any;

        const sendMouseClick = (element: DebugElement, shiftKey?: boolean, ctrlKey?: boolean, upElement?: DebugElement) => {
            // Simulate a mouse click
            const listElement = fixture.debugElement.query(By.css('.deja-overlay-container > .cdk-overlay-pane > .deja-listcontainer'));
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
                    selectInstance.refreshViewPort();
                    fixture.detectChanges();
                });
        };

        observeOptionsViewPort$(fixture)
            .debounceTime(10)
            .first()
            .subscribe((vp) => {
                fixture.detectChanges();
                const displayedElements = fixture.debugElement.queryAll(By.css('.deja-overlay-container > .cdk-overlay-pane > .deja-listcontainer > .listitem'));
                const selectedElements = fixture.debugElement.queryAll(By.css('.deja-overlay-container > .cdk-overlay-pane > .deja-listcontainer > .listitem.selected'));
                const selectedItems = vp.items.filter((item: IItemBase) => item.selected);

                // Check selected and current
                expect(selectedElements.length).toBe(0);
                expect(selectedItems.length).toBe(0);
                // Check flags
                expect(selectInstance.isMultiSelect).toBe(true);
                // Simulate click on first element on disabled
                selectInstance.disabled = true;
                fixture.detectChanges();

                Observable.from(selectInstance.selectedChange)
                    .first()
                    .subscribe(() => {
                        expect(selectInstance.selectedItems && selectInstance.selectedItems.length).toBe(1);
                        selectContainerInstance.testDone();
                    });

                sendMouseClick(displayedElements[1]);
            });

        sl.showDropDown();

        spyOn(selectContainerInstance, 'testDone');

        fixture.detectChanges();
        fixture.whenStable().then(() => {
            expect(selectContainerInstance.testDone).toHaveBeenCalled();
        });
    }));

    it('should select programatically', async(() => {
        const fixture = TestBed.createComponent(DejaSelectByOptionsContainerComponent);
        const selectDebugElement = fixture.debugElement.query(By.directive(DejaSelectComponent));
        const selectInstance = selectDebugElement.componentInstance as DejaSelectComponent;

        fixture.detectChanges();

        selectInstance.selectedModel = 'Apricots';
        fixture.detectChanges();

        expect(selectInstance.selectedItems && selectInstance.selectedItems.length).toBe(1);
        const apricots = selectInstance.selectedItems && selectInstance.selectedItems.length && selectInstance.selectedItems[0];
        expect(apricots.model.value).toEqual('Apricots');

        selectInstance.selectedModels = ['', 'Banana', 'Lemon', 'Cantaloupe'];
        fixture.detectChanges();

        expect(selectInstance.selectedItems && selectInstance.selectedItems.length).toBe(4);
        const empty = selectInstance.selectedItems && selectInstance.selectedItems.length && selectInstance.selectedItems[0];
        expect(empty.model.value).toEqual('');
        const banana = selectInstance.selectedItems && selectInstance.selectedItems.length && selectInstance.selectedItems[1];
        expect(banana.model.value).toEqual('Banana');
        const cantaloupe = selectInstance.selectedItems && selectInstance.selectedItems.length && selectInstance.selectedItems[2];
        expect(cantaloupe.model.value).toEqual('Cantaloupe');
        const lemon = selectInstance.selectedItems && selectInstance.selectedItems.length && selectInstance.selectedItems[3];
        expect(lemon.model.value).toEqual('Lemon');

        selectInstance.selectedItem = apricots;
        fixture.detectChanges();

        expect(selectInstance.selectedItems && selectInstance.selectedItems.length).toBe(1);
        expect(selectInstance.selectedItem).toBe(apricots);

        selectInstance.selectedItems = [apricots, cantaloupe, lemon];
        fixture.detectChanges();

        expect(selectInstance.selectedItems && selectInstance.selectedItems.length).toBe(3);
        expect(selectInstance.selectedItems[0]).toBe(apricots);
        expect(selectInstance.selectedItems[1]).toBe(cantaloupe);
        expect(selectInstance.selectedItems[2]).toBe(lemon);
    }));
});
