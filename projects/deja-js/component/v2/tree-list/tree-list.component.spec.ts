/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { CommonModule } from '@angular/common';
import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GroupingService } from '@deja-js/component/core';
import { Destroy } from '@deja-js/component/core/destroy';
import { KeyCodes } from '@deja-js/component/core/text';
import { Item, ItemModule, SortInfos, SortingService } from '@deja-js/component/v2/item-list';
import { debounceTime, delay, filter, Observable, take, takeUntil, tap, timer } from 'rxjs';

import { ViewPort } from '../viewport';
import { TreeListModule } from './index';
import { TreeListComponent } from './tree-list.component';


@Component({
    selector: 'TreeListContainerComponent',
    template: `<tree-list style="height:500px;width:1000px;" [items]="itemList" multiSelect viewPortMode="variable" searchArea pageSize="10">
                    <ng-template #itemTemplate let-item>Item {{ item.label }}</ng-template>
                </tree-list>`,
    providers: [
        GroupingService
    ]
})
class TreeListContainerComponent extends Destroy {
    public itemList = [] as Item<unknown>[];

    public constructor(groupingService: GroupingService) {
        super();

        // eslint-disable-next-line prefer-spread
        const itemList = Array.from({ length: 2000 }).map((_n: unknown, i: number) => {
            const rand = Math.floor(Math.random() * (70 - 33 + 1)) + 33; // random de 33 à 70
            const item = new Item<unknown>(i.toString(), `${i} - Une ligne de test avec une taille de : ${rand}`);
            item.size = rand;
            return item;
        });

        groupingService.group$(itemList, [{ groupByField: 'size' }]).pipe(
            take(1),
            takeUntil(this.destroyed$)
        ).subscribe(groupedResult => {
            this.itemList = groupedResult as Item<unknown>[];
        });
    }
}

@Component({
    selector: 'TreeListByModelContainerComponent',
    // eslint-disable-next-line @angular-eslint/component-max-inline-declarations
    template: `<tree-list style="height:500px;width:1000px;" ngModelType="value" [(ngModel)]="selectedModels" [models]="modelsList" multiSelect viewPortMode="fixed" searchArea pageSize="10" textField="label" valueField="id">
                    <ng-template #itemTemplate let-item>
                        <span [style.background-color]="backgroundColor(item)">
                            Item {{ item.model.label }}
                        </span>
                    </ng-template>
                </tree-list>`,
    providers: [
        SortingService
    ]
})
class TreeListByModelContainerComponent {
    public modelsList: unknown[];
    public selectedModels: unknown[];

    public constructor(sortingService: SortingService) {
        // eslint-disable-next-line prefer-spread
        const modelsList = Array.from({ length: 2000 }).map((_n: unknown, i: number) => {
            const rand = Math.floor(Math.random() * (70 - 33 + 1)) + 33; // random de 33 à 70;
            return {
                id: i,
                value: rand,
                label: `${i} - Une ligne de test avec une valeur de : ${rand}`
            };
        });

        this.selectedModels = [0, 1, 2];
        this.modelsList = sortingService.sort(modelsList, { name: 'value' } as SortInfos);
    }

    public backgroundColor(item: Item<unknown>): string {
        return item.selected ? '#888' : null;
    }
}

@Component({
    selector: 'TreeListByOptionsContainerComponent',
    // eslint-disable-next-line @angular-eslint/component-max-inline-declarations
    template: `<tree-list style="height:800px;width:1000px;" ngModelType="value" viewPortMode="fixed" multiSelect>
                    <item value="Apricots" text="Apricots"></item>
                    <item value="Banana" text="Banana" ></item>
                    <item value="Cantaloupe" text="Cantaloupe" selected="true"></item>
                    <item value="Cherries" text="Cherries" selected="true"></item>
                    <item value="Coconut" text="Coconut"></item>
                    <item value="Cranberries" text="Cranberries"></item>
                    <item value="Durian" text="Durian"></item>
                    <item value="Grapes" text="Grapes"></item>
                    <item value="Lemon" text="Lemon"></item>
                    <item value="Mango" text="Mango"></item>
                    <item value="Pineapple" text="Pineapple"></item>
                    <item value="Watermelon" text="Watermelon"></item>
                </tree-list>`
})
class TreeListByOptionsContainerComponent { }

describe('TreeListComponent', () => {
    beforeEach(waitForAsync(() => {
        void TestBed.configureTestingModule({
            declarations: [
                TreeListContainerComponent
            ],
            imports: [
                BrowserAnimationsModule,
                CommonModule,
                FormsModule,
                TreeListModule
            ]
        }).compileComponents();
    }));

    const observeViewPort$ = (fixture: ComponentFixture<TreeListContainerComponent>): Observable<ViewPort<unknown>> => {
        const treeListDebugElement = fixture.debugElement.query(By.directive(TreeListComponent));
        const treeListInstance = treeListDebugElement.componentInstance as TreeListComponent<unknown>;

        return treeListInstance.viewPort$.pipe(
            delay(1),
            tap(() => fixture.detectChanges(true)),
            delay(1),
            filter(result => result.viewPortSize > 0),
            debounceTime(100)
        );
    };

    it('should create the component', waitForAsync(() => {
        const fixture = TestBed.createComponent(TreeListContainerComponent);
        fixture.detectChanges();
        const treeListDebugElement = fixture.debugElement.query(By.directive(TreeListComponent));
        const treeListInstance = treeListDebugElement.componentInstance as TreeListComponent<unknown>;
        void expect(treeListInstance).toBeTruthy();
    }));

    it('should return the correct property', (() => {
        const fixture = TestBed.createComponent(TreeListContainerComponent);
        fixture.detectChanges();
        const treeListDebugElement = fixture.debugElement.query(By.directive(TreeListComponent));
        const treeListInstance = treeListDebugElement.componentInstance as TreeListComponent<unknown>;

        void expect(treeListInstance.pageSize).toBeGreaterThanOrEqual(10);
        treeListInstance.pageSize = '5';
        void expect(+treeListInstance.pageSize).toBe(5);
        treeListInstance.pageSize = 0;
        void expect(treeListInstance.pageSize).toBe(0);

        void expect(treeListInstance.hintLabel).toBeUndefined();
        treeListInstance.hintLabel = 'I am a hint label';
        void expect(treeListInstance.hintLabel).toEqual('I am a hint label');

        void expect(treeListInstance.viewPortRowHeight).toBe(40);
        treeListInstance.viewPortRowHeight = 100;
        void expect(treeListInstance.viewPortRowHeight).toBe(100);

        // eslint-disable-next-line rxjs/no-subject-value
        void expect(treeListInstance.itemService.textField$.getValue()).toEqual('label');
        treeListInstance.textField = 'text';
        // eslint-disable-next-line rxjs/no-subject-value
        void expect(treeListInstance.itemService.textField$.getValue()).toEqual('text');

        void expect(treeListInstance.multiSelect).toBeTruthy();
        treeListInstance.multiSelect = 'false';
        void expect(treeListInstance.multiSelect).toBeFalsy();

        void expect(treeListInstance.minSearchlength).toBe(undefined);
        treeListInstance.minSearchlength = '3';
        // eslint-disable-next-line rxjs/no-subject-value
        void expect(treeListInstance.itemService.minSearchLength$.getValue()).toBe(3);

        void expect(treeListInstance.disabled).toBeNull();
        treeListInstance.disabled = true;
        void expect(treeListInstance.disabled).toBeTruthy();
        treeListInstance.setDisabledState(false);
        void expect(treeListInstance.disabled).toBeFalsy();
    }));

    it('should set and ensure the current item', done => {
        const fixture = TestBed.createComponent(TreeListContainerComponent);
        const treeListDebugElement = fixture.debugElement.query(By.directive(TreeListComponent));
        const treeListInstance = treeListDebugElement.componentInstance as TreeListComponent<unknown>;
        let pass = 0;

        observeViewPort$(fixture).pipe(
            take(2)
        ).subscribe(vp => {
            const currentItems = fixture.debugElement.queryAll(By.css('tree-list > .listcontainer .listitem.current'));

            switch (++pass) {
                case 1:
                    void expect(currentItems.length).toBe(0);
                    // Set current item
                    treeListInstance.currentItem = vp.items[1] as Item<unknown>;
                    treeListInstance.refreshViewPort();
                    fixture.detectChanges();
                    break;

                default:
                    // Check currentItem
                    void expect(currentItems.length).toBe(1);
                    void expect(currentItems[0]?.attributes.flat).toBe('1');
                    void expect(vp.startIndex).toBe(0);
                    void expect(treeListInstance.currentItem).toBe(vp.items[1] as Item<unknown>);
                    done();
            }
        });

        fixture.detectChanges();
    });

    it('should not load items if minSearchlength is defined', done => {
        const fixture = TestBed.createComponent(TreeListContainerComponent);
        const treeListDebugElement = fixture.debugElement.query(By.directive(TreeListComponent));
        const treeListInstance = treeListDebugElement.componentInstance as TreeListComponent<unknown>;
        treeListInstance.minSearchlength = 2;
        fixture.detectChanges();

        observeViewPort$(fixture).pipe(
            take(1)
        ).subscribe(() => {
            // Bind view port
            fixture.detectChanges();
            const listItems = fixture.debugElement.queryAll(By.css('tree-list > .listcontainer .listitem'));
            void expect(listItems.length).toBeGreaterThan(0);
            done();
        });

        const listItems = fixture.debugElement.queryAll(By.css('tree-list > .listcontainer .listitem'));
        void expect(listItems.length).toBe(0);
        treeListInstance.itemService.query$.next('33');
        fixture.detectChanges();
    });

    it('should set the selected items', done => {
        let pass = 0;
        const fixture = TestBed.createComponent(TreeListContainerComponent);
        const treeListDebugElement = fixture.debugElement.query(By.directive(TreeListComponent));
        const treeListInstance = treeListDebugElement.componentInstance as TreeListComponent<unknown>;

        observeViewPort$(fixture).pipe(
            take(5)
        ).subscribe(vp => {
            const selectedElements = fixture.debugElement.queryAll(By.css('tree-list > .listcontainer .listitem.selected'));
            const selectedItems = vp.items.filter((item: Item<unknown>) => item.selected);
            let itemsToSelect;

            switch (++pass) {
                case 1:
                    void expect(selectedElements.length).toBe(0);
                    // Set selected items
                    itemsToSelect = [vp.items[vp.startIndex], vp.items[vp.endIndex], vp.items[vp.items.length - 1]] as Item<unknown>[];
                    treeListInstance.selectedItems = itemsToSelect;
                    void expect(treeListInstance.selectedItems).toBeDefined();
                    void expect(treeListInstance.selectedItems.length).toBe(3);
                    break;

                case 2:
                    // Check selected items
                    void expect(selectedElements.length).toBe(2);
                    void expect(selectedElements[0]?.attributes.flat).toBe(`${vp.startIndex}`);
                    void expect(selectedElements[1]?.attributes.flat).toBe(`${vp.endIndex}`);
                    void expect(selectedItems.length).toBe(3);
                    // Clear selection
                    treeListInstance.selectedItems = null;
                    treeListInstance.reloadViewPort();
                    fixture.detectChanges();
                    break;

                case 3:
                    // Check no selected
                    void expect(selectedElements.length).toBe(0);
                    void expect(selectedItems.length).toBe(0);
                    // Set selected item
                    treeListInstance.selectedItem = vp.items[5] as Item<unknown>;
                    void expect(treeListInstance.selectedItem).toBe(vp.items[5] as Item<unknown>);
                    fixture.detectChanges();
                    break;

                case 4:
                    // Check selected item
                    void expect(selectedElements.length).toBe(1);
                    void expect(selectedElements[0]?.attributes.flat).toBe('5');
                    void expect(selectedItems.length).toBe(1);
                    // Clear selection
                    treeListInstance.selectedItem = null;
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
});

describe('TreeListByModelContainerComponent', () => {
    beforeEach(waitForAsync(() => {
        void TestBed.configureTestingModule({
            declarations: [
                TreeListByModelContainerComponent
            ],
            imports: [
                BrowserAnimationsModule,
                CommonModule,
                FormsModule,
                TreeListModule
            ]
        }).compileComponents();
    }));

    const observeModelViewPort$ = (fixture: ComponentFixture<TreeListByModelContainerComponent>): Observable<ViewPort<unknown>> => {
        const treeListDebugElement = fixture.debugElement.query(By.directive(TreeListComponent));
        const treeListInstance = treeListDebugElement.componentInstance as TreeListComponent<unknown>;

        return treeListInstance.viewPort$.pipe(
            delay(1),
            tap(() => fixture.detectChanges(true)),
            delay(1),
            filter(result => result.viewPortSize > 0),
            debounceTime(100)
        );
    };

    it('should create the component', waitForAsync(() => {
        const fixture = TestBed.createComponent(TreeListByModelContainerComponent);
        fixture.detectChanges();
        const treeListDebugElement = fixture.debugElement.query(By.directive(TreeListComponent));
        const treeListInstance = treeListDebugElement.componentInstance as TreeListComponent<unknown>;
        void expect(treeListInstance).toBeTruthy();
    }));

    it('should set the selected models', done => {
        let pass = 0;
        const fixture = TestBed.createComponent(TreeListByModelContainerComponent);
        const treeListDebugElement = fixture.debugElement.query(By.directive(TreeListComponent));
        const treeListInstance = treeListDebugElement.componentInstance as TreeListComponent<unknown>;

        observeModelViewPort$(fixture).pipe(
            take(7)
        ).subscribe(vp => {
            const selectedModels = fixture.debugElement.queryAll(By.css('tree-list > .listcontainer .listitem.selected'));
            const models = vp.visibleItems.map((item: Item<unknown>) => item.model);
            const selectedItems = vp.items.filter((item: Item<unknown>) => item.selected);
            let itemToSelect: Item<unknown>;

            switch (++pass) {
                case 1:
                    // Check selection from initialisation
                    void expect(selectedItems.length).toBe(3);
                    // Set selected models
                    treeListInstance.selectedModels = [models[vp.startIndex], models[vp.endIndex]];
                    void expect(treeListInstance.selectedModels).toBeDefined();
                    void expect(treeListInstance.selectedModels.length).toBe(2);
                    treeListInstance.reloadViewPort();
                    fixture.detectChanges();
                    break;

                case 2:
                    // Check selected models
                    void expect(selectedModels.length).toBe(2);
                    void expect(selectedItems.length).toBe(2);
                    // Clear selection
                    treeListInstance.selectedModels = null;
                    treeListInstance.reloadViewPort();
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
                    treeListInstance.reloadViewPort();
                    fixture.detectChanges();
                    break;

                case 4:
                    // Check selected item
                    void expect(selectedModels.length).toBe(1);
                    void expect(selectedItems.length).toBe(1);
                    // Clear selection
                    treeListInstance.selectedModel = null;
                    treeListInstance.reloadViewPort();
                    fixture.detectChanges();
                    break;

                case 5:
                    // Check no selected
                    void expect(selectedModels.length).toBe(0);
                    void expect(selectedItems.length).toBe(0);
                    // Set selection by value
                    itemToSelect = vp.visibleItems[4] as Item<unknown>;
                    treeListInstance.value = itemToSelect.id;
                    void expect(treeListInstance.value).toBe(itemToSelect.id);
                    treeListInstance.reloadViewPort();
                    fixture.detectChanges();
                    break;

                case 6:
                    // Check selected item
                    void expect(selectedModels.length).toBe(1);
                    void expect(selectedItems.length).toBe(1);
                    // Clear selection
                    treeListInstance.selectedModel = null;
                    treeListInstance.reloadViewPort();
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

    it('should navigate with the keyboard', done => {
        let pass = 0;
        const fixture = TestBed.createComponent(TreeListByModelContainerComponent);
        const treeListDebugElement = fixture.debugElement.query(By.directive(TreeListComponent));
        const treeListInstance = treeListDebugElement.componentInstance as TreeListComponent<unknown>;
        const treeListListElement = fixture.debugElement.query(By.css('tree-list > .listcontainer'));

        const sendKeyDown = (code: string, shiftKey?: boolean, ctrlKey?: boolean): void => {
            const event = new KeyboardEvent('keydown', {
                code: code,
                shiftKey: shiftKey,
                ctrlKey: ctrlKey
            } as KeyboardEventInit);
            (treeListListElement.nativeElement as HTMLElement).dispatchEvent(event);
            treeListInstance.refreshViewPort();
            fixture.detectChanges();
        };

        observeModelViewPort$(fixture).pipe(
            take(23)
        ).subscribe(vp => {
            const selectedElements = fixture.debugElement.queryAll(By.css('tree-list > .listcontainer .listitem.selected'));
            const currentElement = fixture.debugElement.query(By.css('tree-list > .listcontainer .listitem.current'));
            const selectedItems = vp.items.filter((item: Item<unknown>) => item.selected);

            switch (++pass) {
                case 1:
                    // Selection from HTML
                    void expect(vp.items.filter((item: Item<unknown>) => item.selected).length).toBe(3);
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
                    void expect(selectedElements.length).toBe(3);
                    void expect(selectedItems.length).toBe(3);
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
                    void expect(currentElement?.attributes.flat).toBe('0');
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
    });

    it('should refresh view port if windows is resized', done => {
        let pass = 0;
        const fixture = TestBed.createComponent(TreeListByModelContainerComponent);

        observeModelViewPort$(fixture).pipe(
            take(2)
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

describe('TreeListByOptionsContainerComponent', () => {
    beforeEach(waitForAsync(() => {
        void TestBed.configureTestingModule({
            declarations: [
                TreeListByOptionsContainerComponent
            ],
            imports: [
                BrowserAnimationsModule,
                CommonModule,
                FormsModule,
                TreeListModule,
                ItemModule
            ]
        }).compileComponents();
    }));

    const observeOptionsViewPort$ = (fixture: ComponentFixture<TreeListByOptionsContainerComponent>): Observable<ViewPort<unknown>> => {
        const treeListDebugElement = fixture.debugElement.query(By.directive(TreeListComponent));
        const treeListInstance = treeListDebugElement.componentInstance as TreeListComponent<unknown>;

        return treeListInstance.viewPort$.pipe(
            delay(1),
            tap(() => fixture.detectChanges(true)),
            delay(1),
            filter(result => result.viewPortSize > 0),
            debounceTime(100)
        );
    };

    it('should create the component', done => {
        const fixture = TestBed.createComponent(TreeListByOptionsContainerComponent);

        observeOptionsViewPort$(fixture).pipe(
            take(1)
        ).subscribe(() => {
            const items = fixture.debugElement.queryAll(By.css('tree-list > .listcontainer .listitem'));
            void expect(items.length).toBe(12);
            done();
        });

        fixture.detectChanges();
        const treeListDebugElement = fixture.debugElement.query(By.directive(TreeListComponent));
        const treeListInstance = treeListDebugElement.componentInstance as TreeListComponent<unknown>;
        void expect(treeListInstance).toBeTruthy();
    });

    it('should filter and select with the keyboard', done => {
        let pass = 0;
        const fixture = TestBed.createComponent(TreeListByOptionsContainerComponent);
        const treeListDebugElement = fixture.debugElement.query(By.directive(TreeListComponent));
        const treeListInstance = treeListDebugElement.componentInstance as TreeListComponent<unknown>;
        const treeListListElement = fixture.debugElement.query(By.css('tree-list > .listcontainer'));

        const sendKeyUp = (code: string): void => {
            const event = new KeyboardEvent('keyup', {
                code: `Key${code.toUpperCase()}`,
                key: code
            } as KeyboardEventInit);
            (treeListListElement.nativeElement as HTMLElement).dispatchEvent(event);
            treeListInstance.refreshViewPort();
            fixture.detectChanges();
        };

        observeOptionsViewPort$(fixture).pipe(
            take(7) // Wait for the clear filter flag
        ).subscribe(vp => {
            const selectedElements = fixture.debugElement.queryAll(By.css('tree-list > .listcontainer .listitem.selected'));
            const currentElement = fixture.debugElement.query(By.css('tree-list > .listcontainer .listitem.current'));
            const selectedItems = vp.items.filter((item: Item<unknown>) => item.selected);

            switch (++pass) {
                case 1:
                    // Check selected and current
                    void expect(selectedElements.length).toBe(2);
                    void expect(selectedItems.length).toBe(2);
                    // Search first started with c
                    sendKeyUp('c');
                    break;

                case 2:
                    // Check selected and current
                    void expect(selectedElements.length).toBe(1);
                    void expect(selectedItems.length).toBe(1);
                    void expect(currentElement?.attributes.flat).toBe('2');
                    // Search next
                    sendKeyUp('c');
                    break;

                case 3:
                    // Check selected and current
                    void expect(selectedElements.length).toBe(1);
                    void expect(selectedItems.length).toBe(1);
                    void expect(currentElement?.attributes.flat).toBe('3');
                    // Search next
                    sendKeyUp('c');
                    break;

                case 4:
                    // Check selected and current
                    void expect(selectedElements.length).toBe(1);
                    void expect(selectedItems.length).toBe(1);
                    void expect(currentElement?.attributes.flat).toBe('4');
                    // Search next
                    sendKeyUp('c');
                    break;

                case 5:
                    // Check selected and current
                    void expect(selectedElements.length).toBe(1);
                    void expect(selectedItems.length).toBe(1);
                    void expect(currentElement?.attributes.flat).toBe('5');
                    // Search next
                    sendKeyUp('c');
                    break;

                case 6:
                    // Check selected and current
                    void expect(selectedElements.length).toBe(1);
                    void expect(selectedItems.length).toBe(1);
                    void expect(currentElement?.attributes.flat).toBe('2');
                    // Enable search area
                    treeListInstance.searchArea = true;
                    fixture.detectChanges();
                    // Filter test
                    treeListInstance.itemService.query$.next('c');
                    fixture.detectChanges();
                    break;

                default:
                    void expect(vp.visibleItems.length).toBe(5);
                    done();

            }
        });

        fixture.detectChanges();
    });

    it('should select with the mouse', done => {
        let pass = 0;
        const fixture = TestBed.createComponent(TreeListByOptionsContainerComponent);
        const treeListDebugElement = fixture.debugElement.query(By.directive(TreeListComponent));
        const treeListInstance = treeListDebugElement.componentInstance as TreeListComponent<unknown>;
        const treeListListElement = fixture.debugElement.query(By.css('tree-list > .listcontainer'));

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
                relatedTarget: treeListListElement.nativeElement as HTMLElement,
                screenX: 0,
                screenY: 0
            } as MouseEventInit);
            const event = new MouseEvent('mousedown', eventInit());
            (element.nativeElement as HTMLElement).dispatchEvent(event);
            fixture.detectChanges();
            timer(100).pipe(
                take(1)
            ).subscribe(() => {
                const upEvent = new MouseEvent('mouseup', eventInit());
                ((upElement || element).nativeElement as HTMLElement).dispatchEvent(upEvent);
                treeListInstance.refreshViewPort();
                fixture.detectChanges();
            });
        };

        observeOptionsViewPort$(fixture).pipe(
            take(9)
        ).subscribe(vp => {
            const displayedElements = fixture.debugElement.queryAll(By.css('tree-list > .listcontainer .listitem'));
            const selectedElements = fixture.debugElement.queryAll(By.css('tree-list > .listcontainer .listitem.selected'));
            const currentElement = fixture.debugElement.query(By.css('tree-list > .listcontainer .listitem.current'));
            const selectedItems = vp.items.filter((item: Item<unknown>) => item.selected);

            switch (++pass) {
                case 1:
                    // Check selected and current
                    void expect(selectedElements.length).toBe(2);
                    void expect(selectedItems.length).toBe(2);
                    // Check flags
                    void expect(treeListInstance.multiSelect).toBe(true);
                    // Simulate click on first element on disabled
                    treeListInstance.disabled = true;
                    fixture.detectChanges();
                    sendMouseClick(displayedElements[1]);
                    break;

                case 2:
                    // Check selected and current
                    void expect(selectedElements.length).toBe(2);
                    void expect(selectedItems.length).toBe(2);
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
                    sendMouseClick(treeListListElement);
                    break;

                case 6:
                    // Check selected and current
                    void expect(selectedElements.length).toBe(3);
                    void expect(selectedItems.length).toBe(3);
                    void expect(currentElement?.attributes.flat).toBe('4');
                    // Switch to single select
                    treeListInstance.multiSelect = false;
                    void expect(treeListInstance.multiSelect).toBe(false);
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
                    treeListInstance.refreshViewPort();
                    break;

                default:
                    // Check selected
                    void expect(selectedElements.length).toBe(1);
                    void expect(selectedItems.length).toBe(1);
                    done();

            }
        });

        fixture.detectChanges();
    });
});
