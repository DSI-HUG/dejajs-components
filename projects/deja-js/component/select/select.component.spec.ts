/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

/* eslint-disable @angular-eslint/component-max-inline-declarations */
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DejaConnectionPositionPair } from '@deja-js/component/core';
import { DejaItemModule } from '@deja-js/component/core';
import { GroupingService } from '@deja-js/component/core';
import { IItemBase } from '@deja-js/component/core';
import { IItemTree } from '@deja-js/component/core';
import { ISortInfos } from '@deja-js/component/core';
import { ItemListService } from '@deja-js/component/core';
import { KeyCodes } from '@deja-js/component/core';
import { SortingService } from '@deja-js/component/core';
import { ViewPortService } from '@deja-js/component/core';
import { from, Observable, of, timer } from 'rxjs';
import { debounceTime, delay, filter, take, tap } from 'rxjs/operators';

import { DejaSelectModule } from './index';
import { DejaSelectComponent } from './select.component';

@Component({
    selector: 'DejaSelectContainerComponent',
    template: `<deja-select style="width: 1000px;" [items]="itemList" viewportMode="variable" searchArea sortable itemsDraggable pageSize="10">
                    <ng-template #itemTemplate let-item>Item {{ item.displayName }}</ng-template>
                </deja-select>`,
    providers: [
        GroupingService
    ]
})
class DejaSelectContainerComponent {
    public itemList = [] as IItemTree<unknown>[];

    public constructor(groupingService: GroupingService) {
        document.body.style.width = '1280px';
        document.body.style.height = '1024px';

        // eslint-disable-next-line prefer-spread
        const itemList = Array.apply(null, { length: 2000 }).map((_n: unknown, i: number) => {
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
            this.itemList = groupedResult;
        });
    }
}

@Component({
    selector: 'DejaSelectByModelContainerComponent',
    template: `<deja-select style="width: 1000px;" [(ngModel)]="selectedModels" [models]="modelsList$ | async" type="multiselect" viewportMode="fixed" valueField="id" selectionClearable>
                    <ng-template #itemTemplate let-item><span [style.background-color]="backgroundColor(item)">Item {{ item.model.displayName }}</span></ng-template>
                </deja-select>`,
    providers: [
        SortingService
    ]
})
class DejaSelectByModelContainerComponent {
    public modelsList$: Observable<unknown[]>;
    public selectedModels: unknown[];

    public constructor(sortingService: SortingService) {
        document.body.style.width = '1280px';
        document.body.style.height = '1024px';

        // eslint-disable-next-line prefer-spread
        const modelsList = Array.apply(null, { length: 2000 }).map((_n: unknown, i: number) => {
            const rand = Math.floor(Math.random() * (70 - 33 + 1)) + 33; // random de 33 à 70;
            return {
                id: i,
                value: rand,
                displayName: `${i} - Une ligne de test avec une valeur de : ${rand}`
            };
        });

        this.selectedModels = [1, 2, 3];
        this.modelsList$ = sortingService.sort$(modelsList, { name: 'value' } as ISortInfos);
    }

    public backgroundColor(item: IItemBase<unknown>) {
        return item.selected ? '#888' : null;
    }
}

@Component({
    selector: 'DejaSelectByOptionsContainerComponent',
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
                </deja-select>`
})
class DejaSelectByOptionsContainerComponent {
    public constructor() {
        document.body.style.width = '1280px';
        document.body.style.height = '1024px';
    }

    public backgroundColor(item: IItemBase<unknown>) {
        return item.selected ? '#888' : null;
    }
}

describe('DejaSelectComponent', () => {
    beforeEach(waitForAsync(() => {
        void TestBed.configureTestingModule({
            declarations: [
                DejaSelectContainerComponent
            ],
            imports: [
                BrowserAnimationsModule,
                CommonModule,
                FormsModule,
                DejaSelectModule
            ]
        }).compileComponents();
    }));

    const observeViewPort$ = (fixture: ComponentFixture<DejaSelectContainerComponent>) => {
        const selectDebugElement = fixture.debugElement.query(By.directive(DejaSelectComponent));
        const viewPortService = selectDebugElement.injector.get(ViewPortService);
        const selectInstance = selectDebugElement.componentInstance as DejaSelectComponent;

        from(selectInstance.dropDownVisibleChange).subscribe(() => fixture.detectChanges());

        return viewPortService.viewPortResult$.pipe(
            filter(result => result.viewPortSize > 0));
    };

    it('should create the component', () => {
        const fixture = TestBed.createComponent(DejaSelectContainerComponent);
        fixture.detectChanges();
        const selectDebugElement = fixture.debugElement.query(By.directive(DejaSelectComponent));
        const selectInstance = selectDebugElement.componentInstance as DejaSelectComponent;
        void expect(selectInstance).toBeTruthy();
    });

    it('should return the write property', () => {
        const fixture = TestBed.createComponent(DejaSelectContainerComponent);
        const selectDebugElement = fixture.debugElement.query(By.directive(DejaSelectComponent));
        const selectInstance = selectDebugElement.componentInstance as DejaSelectComponent;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const sl = selectInstance as any;
        const itemListService = selectInstance.getItemListService();

        fixture.detectChanges();

        void expect(selectInstance.positions).toEqual(DejaConnectionPositionPair.default);
        selectInstance.positions = 'start top start bottom';
        void expect(sl.positions).toEqual(DejaConnectionPositionPair.parse('start top start bottom'));

        selectInstance.dropDownWidth = 100;
        void expect(sl.dropDownWidth).toEqual(100);

        void expect(selectInstance.readonly).toBeNull();
        sl.readonly = 'true';
        void expect(selectInstance.readonly).toBeTruthy();

        void expect(selectInstance.hideSelected).toBeUndefined();
        sl.hideSelected = 'true';
        void expect(selectInstance.hideSelected).toBeTruthy();

        void expect(selectInstance.pageSize).toBe(10);
        selectInstance.pageSize = 5;
        void expect(selectInstance.pageSize).toBe(5);
        selectInstance.pageSize = 0;
        void expect(selectInstance.pageSize).toBe(0);

        void expect(selectInstance.hintLabel).toBeUndefined();
        selectInstance.hintLabel = 'I am a hint label';
        void expect(selectInstance.hintLabel).toEqual('I am a hint label');

        void expect(sl._viewPortRowHeight).toBe(ViewPortService.itemDefaultSize);
        selectInstance.viewPortRowHeight = 100;
        void expect(sl._viewPortRowHeight).toBe(100);

        void expect(selectInstance.childrenField).toBeUndefined();
        void expect(itemListService.childrenField).toEqual(ItemListService.defaultChildrenField);
        selectInstance.childrenField = 'children';
        void expect(selectInstance.childrenField).toEqual('children');
        void expect(itemListService.childrenField).toEqual('children');

        void expect(selectInstance.textField).toEqual(ItemListService.defaultTextField);
        selectInstance.textField = 'text';
        void expect(selectInstance.textField).toEqual('text');

        void expect(selectInstance.valueField).toEqual(ItemListService.defaultValueField);
        selectInstance.valueField = 'my value field';
        void expect(selectInstance.valueField).toEqual('my value field');

        void expect(selectInstance.searchField).toBeUndefined();
        selectInstance.searchField = 'my search field';
        void expect(selectInstance.searchField).toEqual('my search field');

        void expect(sl.delaySearchTrigger$.getValue()).toBe(250);
        selectInstance.delaySearchTrigger = 500;
        void expect(sl.delaySearchTrigger$.getValue()).toBe(500);

        const myItemListService = new ItemListService();
        void expect(selectInstance.itemListService).toBeDefined();
        selectInstance.itemListService = myItemListService;
        void expect(selectInstance.itemListService).toBe(myItemListService);

        const sortingService = new SortingService();
        void expect(myItemListService.getSortingService()).toBeDefined();
        selectInstance.sortingService = sortingService;
        void expect(myItemListService.getSortingService()).toBe(sortingService);

        const groupingService = new GroupingService();
        void expect(myItemListService.getGroupingService()).toBeDefined();
        selectInstance.groupingService = groupingService;
        void expect(myItemListService.getGroupingService()).toBe(groupingService);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const listService = myItemListService as any;
        const loadingItems = () => of([]);
        selectInstance.loadingItems = loadingItems;
        void expect(listService.loadingItems$).toBe(loadingItems);
        const selectingItem = () => of([]);
        selectInstance.selectingItem = selectingItem;
        void expect(listService.selectingItem$).toBe(selectingItem);
        const unselectingItem = () => of([]);
        selectInstance.unselectingItem = unselectingItem;
        void expect(listService.unselectingItem$).toBe(unselectingItem);
        const expandingItem = () => of([]);
        selectInstance.expandingItem = expandingItem;
        void expect(listService.expandingItem$).toBe(expandingItem);
        const collapsingItem = () => of([]);
        selectInstance.collapsingItem = collapsingItem;
        void expect(listService.collapsingItem$).toBe(collapsingItem);

        void expect(selectInstance.disabled).toBeNull();
        selectInstance.disabled = true;
        void expect(selectInstance.disabled).toBeTruthy();
        selectInstance.setDisabledState(false);
        void expect(selectInstance.disabled).toBeFalsy();

        void expect(selectInstance.waiter).toBeFalsy();
        selectInstance.waiter = true;
        void expect(selectInstance.waiter).toBeTruthy();

        void expect(selectInstance.depthMax).toBe(1);
    });

    it('should open and close the dropdown programatically', done => {
        let pass = 0;
        const fixture = TestBed.createComponent(DejaSelectContainerComponent);
        const selectDebugElement = fixture.debugElement.query(By.directive(DejaSelectComponent));
        const selectInstance = selectDebugElement.componentInstance as DejaSelectComponent;
        const viewPortService = selectDebugElement.injector.get(ViewPortService);
        const sl = selectInstance;

        fixture.detectChanges();

        from(fixture.whenStable()).subscribe(() => {
            from(selectInstance.dropDownVisibleChange).pipe(
                tap(state => {
                    fixture.detectChanges();
                    switch (++pass) {
                        case 1:
                            void expect(state).toBeTruthy();
                            break;
                        case 2:
                            void expect(state).toBeFalsy();
                            break;
                        case 3:
                            void expect(state).toBeTruthy();
                            break;
                        default:
                            void expect(state).toBeFalsy();
                    }
                }),
                delay(100)
                // eslint-disable-next-line rxjs/no-nested-subscribe
            ).subscribe(() => {
                switch (pass) {
                    case 2:
                    case 3:
                        sl.toggleDropDown();
                        break;
                    default:
                }
            });

            viewPortService.viewPortResult$.pipe(
                debounceTime(100),
                take(1)
                // eslint-disable-next-line rxjs/no-nested-subscribe
            ).subscribe(vp => {
                // Bind view port
                fixture.detectChanges();
                void expect(vp.items.length).toBeGreaterThan(0);
                void expect(vp.visibleItems.length).toBeGreaterThan(0);
                done();
            });

            sl.showDropDown();

            fixture.detectChanges();
        });
    });

    it('should toggle and collapse parent items', done => {
        let pass = 0;
        const fixture = TestBed.createComponent(DejaSelectContainerComponent);
        const selectDebugElement = fixture.debugElement.query(By.directive(DejaSelectComponent));
        const selectInstance = selectDebugElement.componentInstance as DejaSelectComponent;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const sl = selectInstance as any;

        fixture.detectChanges();

        from(fixture.whenStable()).subscribe(() => {
            observeViewPort$(fixture).pipe(
                debounceTime(20)
                // eslint-disable-next-line rxjs/no-nested-subscribe
            ).subscribe(vp => {
                fixture.detectChanges(); // Bind view port
                const collapsed = fixture.debugElement.queryAll(By.css('.deja-overlay-container .cdk-overlay-pane > .deja-listcontainer > .listitem.parent.collapsed'));
                const collapsedItems = vp.items.filter((item: IItemTree<unknown>) => item.collapsed);
                const parentItems = vp.items.filter((item: IItemTree<unknown>) => item.depth === 0);

                switch (++pass) {
                    case 1:
                        void expect(collapsed.length).toBe(0);
                        void expect(collapsedItems.length).toBe(0);
                        // Toggle all items
                        selectInstance.toggleAll();
                        selectInstance.refreshViewPort();
                        fixture.detectChanges();
                        break;

                    case 2:
                        // Check collapsed items
                        void expect(collapsedItems.length).toBe(parentItems.length);
                        void expect(collapsed.length).toBeGreaterThan(0);
                        // Toggle all items
                        selectInstance.toggleAll();
                        selectInstance.refreshViewPort();
                        fixture.detectChanges();
                        break;

                    case 3:
                        // Check collapsed items
                        void expect(collapsedItems.length).toBe(0);
                        void expect(collapsed.length).toBe(0);
                        // Toogle only first
                        selectInstance.toggleCollapse(0, true);
                        selectInstance.refreshViewPort();
                        fixture.detectChanges();
                        break;

                    case 4:
                        // Check collapsed items
                        void expect(collapsedItems.length).toBe(1);
                        void expect(collapsed.length).toBe(1);
                        // Clear toogle
                        selectInstance.toggleAll(false);
                        selectInstance.refreshViewPort();
                        fixture.detectChanges();
                        break;

                    default:
                        // Check no collapsed
                        void expect(collapsedItems.length).toBe(0);
                        void expect(collapsed.length).toBe(0);
                        done();
                }
            });

            sl.showDropDown();

            fixture.detectChanges();
        });
    });

    it('should not load items if minSearchlength is defined', done => {
        let pass = 0;
        const fixture = TestBed.createComponent(DejaSelectContainerComponent);
        const selectDebugElement = fixture.debugElement.query(By.directive(DejaSelectComponent));
        const selectInstance = selectDebugElement.componentInstance as DejaSelectComponent;
        const viewPortService = selectDebugElement.injector.get(ViewPortService);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const sl = selectInstance as any;

        fixture.detectChanges();

        from(fixture.whenStable()).subscribe(() => {
            // eslint-disable-next-line rxjs/no-nested-subscribe
            from(selectInstance.dropDownVisibleChange).subscribe(() => fixture.detectChanges());

            viewPortService.viewPortResult$.pipe(
                debounceTime(10)
                // eslint-disable-next-line rxjs/no-nested-subscribe
            ).subscribe(vp => {
                // Bind view port
                fixture.detectChanges();
                const listItems = fixture.debugElement.queryAll(By.css('.deja-overlay-container .cdk-overlay-pane > .deja-listcontainer > .listitem'));
                const items = vp.items;

                switch (++pass) {
                    case 1:
                        void expect(listItems.length).toBe(0);
                        sl.queryChanged('33');
                        sl.filterListComplete$.next();
                        selectInstance.refreshViewPort();
                        fixture.detectChanges();
                        break;

                    case 2:
                        void expect(listItems.length).toBeGreaterThan(0);
                        sl.queryChanged('44');
                        sl.filterListComplete$.next();
                        selectInstance.refreshViewPort();
                        fixture.detectChanges();
                        break;

                    default:
                        void expect(listItems.length).toBeGreaterThan(0);
                        void expect(items.length).toBeGreaterThan(0);
                        done();
                }
            });

            selectInstance.minSearchlength = 2;
            selectInstance.type = 'autocomplete';
            sl.showDropDown();

            fixture.detectChanges();
        });
    });
});

describe('DejaSelectByModelContainerComponent', () => {
    beforeEach(waitForAsync(() => {
        void TestBed.configureTestingModule({
            declarations: [
                DejaSelectByModelContainerComponent
            ],
            imports: [
                BrowserAnimationsModule,
                CommonModule,
                FormsModule,
                DejaSelectModule
            ]
        }).compileComponents();
    }));

    it('should create the component', done => {
        const fixture = TestBed.createComponent(DejaSelectByModelContainerComponent);
        fixture.detectChanges();
        const selectDebugElement = fixture.debugElement.query(By.directive(DejaSelectComponent));
        const selectInstance = selectDebugElement.componentInstance as DejaSelectComponent;
        void expect(selectInstance).toBeTruthy();
        done();
    });

    it('should close the selection in multiselect', done => {
        const fixture = TestBed.createComponent(DejaSelectByModelContainerComponent);
        fixture.detectChanges();

        return fixture.whenStable().then(() => {
            fixture.detectChanges();

            let selectedChips = fixture.debugElement.queryAll(By.css('deja-select > deja-chips > span.chips-item > #close-button'));
            void expect(selectedChips.length).toBe(3, '1');

            selectedChips.forEach(closeButton => {
                const button = closeButton.nativeElement as HTMLButtonElement;
                button.click();
            });
            fixture.detectChanges();

            selectedChips = fixture.debugElement.queryAll(By.css('deja-select > deja-chips > span.chips-item > #close-button'));
            void expect(selectedChips.length).toBe(0, '2');
            done();
        });
    });

    it('should unselect all the elements in multiselect', done => {
        const fixture = TestBed.createComponent(DejaSelectByModelContainerComponent);
        const selectDebugElement = fixture.debugElement.query(By.directive(DejaSelectComponent));
        const selectInstance = selectDebugElement.componentInstance as DejaSelectComponent;
        const sl = selectDebugElement.componentInstance;

        fixture.detectChanges();

        return fixture.whenStable().then(() => {
            fixture.detectChanges();
            void expect(selectInstance.selectedItems.length).toBe(3, '1');
            void expect(selectInstance.selectedModels.length).toBe(3, '2');

            let selectedChips = fixture.debugElement.queryAll(By.css('deja-select > deja-chips > span.chips-item > #close-button'));
            void expect(selectedChips.length).toBe(3, '3');

            sl.removeSelection();
            fixture.detectChanges();

            selectedChips = fixture.debugElement.queryAll(By.css('deja-select > deja-chips > span.chips-item > #close-button'));
            void expect(selectedChips.length).toBe(0, '4');
            void expect(selectInstance.selectedItems.length).toBe(0, '5');
            void expect(selectInstance.selectedModels.length).toBe(0, '6');
            done();
        });
    });

    it('should close the selection in single select', done => {
        const fixture = TestBed.createComponent(DejaSelectByModelContainerComponent);
        const selectDebugElement = fixture.debugElement.query(By.directive(DejaSelectComponent));
        const selectInstance = selectDebugElement.componentInstance as DejaSelectComponent;

        fixture.detectChanges();

        return fixture.whenStable().then(() => {
            selectInstance.type = 'select';
            fixture.detectChanges();

            void expect(selectInstance.selectedItems.length).toBe(3, '1');
            void expect(selectInstance.selectedModels.length).toBe(3, '2');

            const clearButton = fixture.debugElement.query(By.css('deja-select #clear-button'));
            clearButton.nativeElement.click();
            fixture.detectChanges();

            void expect(selectInstance.selectedItems.length).toBe(0, '3');
            void expect(selectInstance.selectedModels.length).toBe(0, '4');

            selectInstance.value = selectInstance.getItemListService().getItems()[2];
            fixture.detectChanges();
            void expect(selectInstance.selectedItems.length).toBe(1, '5');
            void expect(selectInstance.selectedModels.length).toBe(1, '6');
            void expect(selectInstance.value).toBe(selectInstance.getItemListService().getItems()[2]);
            done();
        });
    });
});

describe('DejaSelectByOptionsContainerComponent', () => {
    beforeEach(waitForAsync(() => {
        void TestBed.configureTestingModule({
            declarations: [
                DejaSelectByOptionsContainerComponent
            ],
            imports: [
                BrowserAnimationsModule,
                CommonModule,
                FormsModule,
                DejaSelectModule,
                DejaItemModule
            ]
        }).compileComponents();
    }));

    const observeOptionsViewPort$ = (fixture: ComponentFixture<DejaSelectByOptionsContainerComponent>) => {
        const selectDebugElement = fixture.debugElement.query(By.directive(DejaSelectComponent));
        const viewPortService = selectDebugElement.injector.get(ViewPortService);

        const selectInstance = selectDebugElement.componentInstance as DejaSelectComponent;

        from(selectInstance.dropDownVisibleChange).subscribe(() => fixture.detectChanges());

        return viewPortService.viewPortResult$.pipe(
            filter(result => result.viewPortSize > 0));
    };

    it('should open and close the dropdown programatically', done => {
        const fixture = TestBed.createComponent(DejaSelectByOptionsContainerComponent);
        const selectDebugElement = fixture.debugElement.query(By.directive(DejaSelectComponent));
        const selectInstance = selectDebugElement.componentInstance as DejaSelectComponent;
        const viewPortService = selectDebugElement.injector.get(ViewPortService);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const sl = selectInstance as any;

        fixture.detectChanges();

        return fixture.whenStable().then(() => {
            from(selectInstance.dropDownVisibleChange).subscribe(() => fixture.detectChanges());

            viewPortService.viewPortResult$.pipe(
                debounceTime(100),
                take(1)
            ).subscribe(vp => {
                // Bind view port
                fixture.detectChanges();
                void expect(vp.items.length).toBeGreaterThan(0);
                void expect(vp.visibleItems.length).toBeGreaterThan(0);
                done();
            });

            sl.isMobile = false;
            sl.showDropDown();

            fixture.detectChanges();
        });
    });

    it('should create the component', done => {
        const fixture = TestBed.createComponent(DejaSelectByOptionsContainerComponent);
        const selectDebugElement = fixture.debugElement.query(By.directive(DejaSelectComponent));
        const selectInstance = selectDebugElement.componentInstance as DejaSelectComponent;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const sl = selectInstance as any;
        fixture.detectChanges();

        return fixture.whenStable().then(() => {
            observeOptionsViewPort$(fixture).pipe(
                debounceTime(100),
                take(1)
            ).subscribe(() => {
                fixture.detectChanges();

                const items = fixture.debugElement.queryAll(By.css('.deja-overlay-container .cdk-overlay-pane > .deja-listcontainer > .listitem'));
                void expect(items.length).toBe(13);
                done();
            });

            fixture.detectChanges();
            void expect(selectInstance).toBeTruthy();

            sl.showDropDown();

            fixture.detectChanges();
        });
    });

    it('should navigate with the keyboard', done => {
        let pass = 0;
        const fixture = TestBed.createComponent(DejaSelectByOptionsContainerComponent);
        const selectDebugElement = fixture.debugElement.query(By.directive(DejaSelectComponent));
        const selectInstance = selectDebugElement.componentInstance as DejaSelectComponent;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const sl = selectInstance as any;

        const sendKeyDown = (code: string, shiftKey?: boolean, altKey?: boolean, ctrlKey?: boolean) => {
            const event = new KeyboardEvent('keydown', {
                code: code,
                shiftKey: shiftKey,
                altKey: altKey,
                ctrlKey: ctrlKey
            } as KeyboardEventInit);
            sl.htmlInputElement.dispatchEvent(event);
            selectInstance.refreshViewPort();
            fixture.detectChanges();
        };

        fixture.detectChanges();

        return fixture.whenStable().then(() => {
            observeOptionsViewPort$(fixture).pipe(
                debounceTime(100)
            ).subscribe(vp => {
                fixture.detectChanges();
                const selectedChips = fixture.debugElement.queryAll(By.css('deja-select > deja-chips > span.chips-item'));
                const selectedElements = fixture.debugElement.queryAll(By.css('.deja-overlay-container .cdk-overlay-pane > .deja-listcontainer > .listitem.selected'));
                const currentElement = fixture.debugElement.query(By.css('.deja-overlay-container .cdk-overlay-pane > .deja-listcontainer > .listitem[current="true"]'));
                const selectedItems = vp.items.filter((item: IItemBase<unknown>) => item.selected);
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const selItem = selectedItems[0] as any;

                switch (++pass) {
                    case 1:
                        // Check no selected
                        void expect(selectedElements.length).toBe(0, 'Check no selected 1-1');
                        void expect(selectedItems.length).toBe(0, 'Check no selected 1-2');
                        void expect(selectedChips.length).toBe(0, 'Check no selected 1-3');
                        // Current on first line by keydown
                        sendKeyDown(KeyCodes.DownArrow);
                        break;

                    case 2:
                        // Check selection
                        void expect(selectedElements.length).toBe(0, 'Check selection 2-1');
                        void expect(selectedItems.length).toBe(0, 'Check selection 2-2');
                        void expect(currentElement?.attributes.flat).toBe('0', 'Check selection 2-3');
                        void expect(selectedChips.length).toBe(0, 'Check selection 2-4');
                        // Current on second line by keydown
                        sendKeyDown(KeyCodes.DownArrow);
                        break;

                    case 3:
                        // Check selection
                        void expect(selectedElements.length).toBe(0, 'Check selection 3-1');
                        void expect(selectedItems.length).toBe(0, 'Check selection 3-2');
                        void expect(currentElement?.attributes.flat).toBe('1', 'Check selection 3-3');
                        void expect(selectedChips.length).toBe(0, 'Check selection 3-4');
                        // Current on first line by keyup
                        sendKeyDown(KeyCodes.UpArrow);
                        break;

                    case 4:
                        // Check selection
                        void expect(selectedElements.length).toBe(0, 'Check selection 4-1');
                        void expect(selectedItems.length).toBe(0, 'Check selection 4-2');
                        void expect(currentElement?.attributes.flat).toBe('0', 'Check selection 4-3');
                        void expect(selectedChips.length).toBe(0, 'Check selection 4-4');
                        // Current on last line
                        sendKeyDown('End');
                        break;

                    case 5:
                        // Check selection
                        void expect(selectedElements.length).toBe(0, 'Check selection 5-1');
                        void expect(selectedItems.length).toBe(0, 'Check selection 5-2');
                        void expect(currentElement?.attributes.flat).toBe('12', 'Check selection 5-3');
                        void expect(selectedChips.length).toBe(0, 'Check selection 5-4');
                        // Current on line 6 by pageUp
                        sendKeyDown('PageUp');
                        break;

                    case 6:
                        // Check selection
                        void expect(selectedElements.length).toBe(0, 'Check selection 6-1');
                        void expect(selectedItems.length).toBe(0, 'Check selection 6-2');
                        void expect(currentElement?.attributes.flat).toBe('7', 'Check selection 6-3');
                        void expect(selectedChips.length).toBe(0, 'Check selection 6-4');
                        // Current on firstLine by Home
                        sendKeyDown('Home');
                        break;

                    case 7:
                        // Check selection
                        void expect(selectedElements.length).toBe(0, 'Check selection 7-1');
                        void expect(selectedItems.length).toBe(0, 'Check selection 7-2');
                        void expect(currentElement?.attributes.flat).toBe('0', 'Check selection 7-3');
                        void expect(selectedChips.length).toBe(0, 'Check selection 7-4');
                        // Current on Line 5 by pageDown
                        sendKeyDown('PageDown');
                        break;

                    case 8:
                        // Check selection
                        void expect(selectedElements.length).toBe(0, 'Check selection 8-1');
                        void expect(selectedItems.length).toBe(0, 'Check selection 8-2');
                        void expect(currentElement?.attributes.flat).toBe('5', 'Check selection 8-3');
                        void expect(selectedChips.length).toBe(0, 'Check selection 8-4');

                        // Select the lines with Enter
                        sendKeyDown('Enter');

                        from(selectInstance.dropDownVisibleChange).pipe(
                            take(1),
                            delay(1000)
                            // eslint-disable-next-line rxjs/no-nested-subscribe
                        ).subscribe(() => {
                            sl.htmlInputElement.click();
                        });

                        break;

                    case 9:
                        void expect(selectedElements.length).toBeGreaterThan(0, 'Check selection 9-1');
                        void expect(selectedItems.length).toBe(1, 'Check selection 9-2');
                        void expect(currentElement?.attributes.flat).toBe('5', 'Check selection 9-3');
                        void expect(selectedChips.length).toBe(1, 'Check selection 9-4');

                        // Select first line with enter in single select
                        selectInstance.type = 'select';
                        sendKeyDown(KeyCodes.DownArrow);
                        break;

                    default:
                        void expect(selectedItems.length).toBe(1, 'Check selection 10-1');
                        void expect(selItem.model.value).toEqual('Cranberries', 'Check selection 10-2');
                        done();
                }
            });

            sl.showDropDown();

            fixture.detectChanges();
        });
    });

    it('should select with the mouse', done => {
        const fixture = TestBed.createComponent(DejaSelectByOptionsContainerComponent);
        const selectDebugElement = fixture.debugElement.query(By.directive(DejaSelectComponent));
        const selectInstance = selectDebugElement.componentInstance as DejaSelectComponent;
        const sl = selectInstance;

        const sendMouseClick = (element: DebugElement, shiftKey?: boolean, ctrlKey?: boolean, upElement?: DebugElement) => {
            // Simulate a mouse click
            const listElement = fixture.debugElement.query(By.css('.deja-overlay-container .cdk-overlay-pane > .deja-listcontainer'));
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
                selectInstance.refreshViewPort();
                fixture.detectChanges();
            });
        };

        fixture.detectChanges();

        return fixture.whenStable().then(() => {
            observeOptionsViewPort$(fixture).pipe(
                debounceTime(10),
                take(1)
            ).subscribe(vp => {
                fixture.detectChanges();
                const displayedElements = fixture.debugElement.queryAll(By.css('.deja-overlay-container .cdk-overlay-pane > .deja-listcontainer > .listitem'));
                const selectedElements = fixture.debugElement.queryAll(By.css('.deja-overlay-container .cdk-overlay-pane > .deja-listcontainer > .listitem.selected'));
                const selectedItems = vp.items.filter((item: IItemBase<unknown>) => item.selected);

                // Check selected and current
                void expect(selectedElements.length).toBe(0);
                void expect(selectedItems.length).toBe(0);
                // Check flags
                void expect(selectInstance.isMultiSelect).toBe(true);
                // Simulate click on first element on disabled
                selectInstance.disabled = true;
                fixture.detectChanges();

                from(selectInstance.selectedChange).pipe(
                    take(1)
                    // eslint-disable-next-line rxjs/no-nested-subscribe
                ).subscribe(() => {
                    void expect(selectInstance.selectedItems?.length).toBe(1);
                    done();
                });

                sendMouseClick(displayedElements[1]);
            });

            sl.showDropDown();

            fixture.detectChanges();
        });
    });

    it('should select programatically', () => {
        const fixture = TestBed.createComponent(DejaSelectByOptionsContainerComponent);
        const selectDebugElement = fixture.debugElement.query(By.directive(DejaSelectComponent));
        const selectInstance = selectDebugElement.componentInstance as DejaSelectComponent;

        fixture.detectChanges();

        selectInstance.selectedModel = 'Apricots';
        fixture.detectChanges();

        void expect(selectInstance.selectedItems?.length).toBe(1);
        const apricots = selectInstance.selectedItems?.length && selectInstance.selectedItems[0];
        const apricotsModel = apricots.model as { value: string };
        void expect(apricotsModel.value).toEqual('Apricots');

        selectInstance.selectedModels = ['', 'Banana', 'Lemon', 'Cantaloupe'];
        fixture.detectChanges();

        void expect(selectInstance.selectedItems?.length).toBe(4);
        const empty = selectInstance.selectedItems?.length && selectInstance.selectedItems[0];
        const emptyModel = empty.model as { value: string };
        void expect(emptyModel.value).toEqual('');
        const banana = selectInstance.selectedItems?.length && selectInstance.selectedItems[1];
        const bananaModel = banana.model as { value: string };
        void expect(bananaModel.value).toEqual('Banana');
        const cantaloupe = selectInstance.selectedItems?.length && selectInstance.selectedItems[2];
        const cantaloupeModel = cantaloupe.model as { value: string };
        void expect(cantaloupeModel.value).toEqual('Cantaloupe');
        const lemon = selectInstance.selectedItems?.length && selectInstance.selectedItems[3];
        const lemonModel = lemon.model as { value: string };
        void expect(lemonModel.value).toEqual('Lemon');

        selectInstance.selectedItem = apricots;
        fixture.detectChanges();

        void expect(selectInstance.selectedItems?.length).toBe(1);
        void expect(selectInstance.selectedItem).toBe(apricots);

        selectInstance.selectedItems = [apricots, cantaloupe, lemon];
        fixture.detectChanges();

        void expect(selectInstance.selectedItems?.length).toBe(3);
        void expect(selectInstance.selectedItems[0]).toBe(apricots);
        void expect(selectInstance.selectedItems[1]).toBe(cantaloupe);
        void expect(selectInstance.selectedItems[2]).toBe(lemon);
    });
});
