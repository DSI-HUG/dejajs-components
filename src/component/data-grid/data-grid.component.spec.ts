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
import { Observable } from 'rxjs/Observable';
import { DejaClipboardModule } from '../../common/core/clipboard/index';
import { GroupingService } from '../../common/core/grouping/grouping.service';
import { ItemListService } from '../../common/core/item-list/item-list.service';
import { ViewPortService } from '../../common/core/item-list/viewport.service';
import { SortingService } from '../../common/core/sorting/sorting.service';
import { IDejaGridColumn } from './data-grid-column/data-grid-column';
import { DejaGridComponent } from './data-grid.component';
import { DejaGridModule } from './index';

const FRUCTS = [
    {
        name: 'Peach',
        value: 'peach',
        color: '#FF6F00',
        Potassium: '285 mg',
        Phosphorus: '30 mg',
        Magnesium: '14 mg',
        Calcium: '9 mg',
        Iron: '0.38 mg',
        Selenium: '0.1 mcg',
        Manganese: '0.091 mg',
        Copper: '0.102 mg',
        Zinc: '0.26 mg',
        VitaminA: '489 IU',
        VitaminB1: '0.036 mg',
        VitaminB2: '0.047 mg',
        Niacin: '1.209 mg',
        Folate: '6 mcg',
        PantothenicAcid: '0.229 mg',
        VitaminB6: '0.037 mg',
        VitaminC: '9.9 mg',
        VitaminE: '1.09 mg',
        VitaminK: '3.9 mcg',
    },
    {
        name: 'Banana',
        value: 'banana',
        color: '#FFEB3B',
        Potassium: '422 mg',
        Phosphorus: '26 mg',
        Magnesium: '32 mg',
        Calcium: '6 mg',
        Sodium: '1 mg',
        Iron: '0.31 mg',
        Selenium: '1.2 mcg',
        Manganese: '0.319 mg',
        Copper: '0.092 mg',
        Zinc: '0.18 mg',
        VitaminA: '76 IU',
        VitaminB1: '0.037 mg',
        VitaminB2: '0.086 mg',
        Niacin: '0.785 mg',
        Folate: '24 mcg',
        PantothenicAcid: '0.394 mg',
        VitaminB6: '0.433 mg',
        VitaminC: '10.3 mg',
        VitaminE: '0.12 mg',
        VitaminK: '0.6 mcg',
    },
    {
        name: 'Cantaloupe',
        value: 'cantaloupe',
        color: '#AED581',
        Potassium: '184 mg',
        Phosphorus: '10 mg',
        Magnesium: '8 mg',
        Calcium: '6 mg',
        Sodium: '11 mg',
        Iron: '0.14 mg',
        Selenium: '0.3 mcg',
        Manganese: '0.028 mg',
        Copper: '0.028 mg',
        Zinc: '0.12 mg',
        VitaminA: '2334 IU',
        VitaminB1: '0.028 mg',
        VitaminB2: '0.013 mg',
        Niacin: '0.506 mg',
        Folate: '14 mcg',
        PantothenicAcid: '0.072 mg',
        VitaminB6: '0.05 mg',
        VitaminC: '25.3 mg',
        VitaminE: '0.03 mg',
        VitaminK: '1.7 mcg    ',
    },
    {
        name: 'Cherries',
        value: 'cherries',
        color: '#880E4F',
        Potassium: '306 mg',
        Phosphorus: '29 mg',
        Magnesium: '15 mg',
        Calcium: '18 mg',
        Iron: '0.5 mg',
        Zinc: '0.1 mg',
        Manganese: '0.097 mg',
        Copper: '0.083 mg    ',
        VitaminA: '88 IU',
        VitaminB1: '0.037 mg',
        VitaminB2: '0.046 mg',
        Niacin: '0.213 mg',
        Folate: '6 mcg',
        PantothenicAcid: '0.275 mg',
        VitaminB6: '0.068 mg',
        VitaminC: '9.7 mg',
        VitaminE: '0.1 mg',
        VitaminK: '2.9 mcg',
    },
    {
        name: 'Chinese Pears',
        value: 'chinesepears',
        color: '#F5F5F5',
        Potassium: '333 mg',
        Phosphorus: '30 mg',
        Magnesium: '22 mg',
        Calcium: '11 mg',
        Selenium: '0.3 mcg',
        Manganese: '0.165 mg',
        Copper: '0.138 mg',
        Zinc: '0.06 mg',
        VitaminA: '0 mg',
        VitaminB1: '0.025 mg',
        VitaminB2: '0.028 mg',
        Niacin: '0.602 mg',
        Folate: '22 mcg',
        PantothenicAcid: '0.193 mg',
        VitaminB6: '0.06 mg',
        VitaminC: '10.4 mg',
        VitaminE: '0.33 mg',
        VitaminK: '12.4 mcg',
    },
    {
        name: 'Cranberries',
        value: 'cranberries',
        color: '#C2185B',
        Potassium: '85 mg',
        Phosphorus: '13 mg',
        Magnesium: '6 mg',
        Calcium: '8 mg',
        Sodium: '2 mg',
        Iron: '0.25 mg',
        Selenium: '0.1 mcg',
        Manganese: '0.36 mg',
        Copper: '0.061 mg',
        Zinc: '0.1 mg',
        VitaminA: '60 IU',
        VitaminB1: '0.012 mg',
        VitaminB2: '0.02 mg',
        Niacin: '0.101 mg',
        Folate: '1 mcg',
        PantothenicAcid: '0.295 mg',
        VitaminB6: '0.057 mg',
        VitaminC: '13.3 mg',
        VitaminE: '1.2 mg',
        VitaminK: '5.1 mcg',
    },
    {
        name: 'Guava',
        value: 'guava',
        color: '#FFCA28',
        Potassium: '688 mg',
        Phosphorus: '66 mg',
        Magnesium: '36 mg',
        Calcium: '30 mg',
        Sodium: '3 mg',
        Iron: '0.43 mg',
        Selenium: '1 mcg',
        Manganese: '0.247 mg',
        Copper: '0.38 mg',
        Zinc: '0.38 mg',
        VitaminA: '1030 IU',
        VitaminB1: '0.111 mg',
        VitaminB2: '0.066 mg',
        Niacin: '1.789 mg',
        Folate: '81 mcg',
        PantothenicAcid: '0.744 mg',
        VitaminB6: '0.181 mg',
        VitaminC: '376.7 mg',
        VitaminE: '1.2 mg',
        VitaminK: '4.3 mcg',
    },
    {
        name: 'Grapes',
        value: 'grapes',
        color: '#303F9F',
        Potassium: '288 mg',
        Phosphorus: '30 mg',
        Magnesium: '11 mg',
        Calcium: '15 mg',
        Sodium: '3 mg',
        Iron: '0.54 mg',
        Selenium: '0.2 mcg',
        Manganese: '0.107 mg',
        Copper: '0.192 mg',
        Zinc: '0.11 mg',
        VitaminA: '100 IU',
        VitaminB1: '0.104 mg',
        VitaminB2: '0.106 mg',
        Niacin: '0.284 mg',
        Folate: '3 mcg',
        PantothenicAcid: '0.076 mg',
        VitaminB6: '0.13 mg',
        VitaminC: '16.3 mg',
        VitaminE: '0.29 mg',
        VitaminK: '22 mcg',
    },
    {
        name: 'Lemon',
        value: 'lemon',
        color: '#FFF176',
        Potassium: '116 mg',
        Phosphorus: '13 mg',
        Magnesium: '7 mg',
        Calcium: '22 mg',
        Sodium: '2 mg',
        Iron: '0.5 mg',
        Selenium: '0.3 mcg',
        Manganese: '0.025 mg',
        Copper: '0.031 mg',
        Zinc: '0.05 mg',
        VitaminA: '18 IU',
        VitaminB1: '0.034 mg',
        VitaminB2: '0.017 mg',
        Niacin: '0.084 mg',
        Folate: '9 mcg',
        PantothenicAcid: '0.16 mg',
        VitaminB6: '0.067 mg',
        VitaminC: '44.5 mg',
        VitaminE: '0.13 mg',
    },
    {
        name: 'Mango',
        value: 'mango',
        color: '#FBC02D',
        Potassium: '323 mg',
        Phosphorus: '23 mg',
        Magnesium: '19 mg',
        Calcium: '21 mg',
        Sodium: '4 mg',
        Iron: '0.27 mg',
        Selenium: '1.2 mcg',
        Manganese: '0.056 mg',
        Copper: '0.228 mg',
        Zinc: '0.08 mg',
        VitaminA: '1584 IU',
        VitaminB1: '0.12 mg',
        VitaminB2: '0.118 mg',
        Niacin: '1.209 mg',
        Folate: '29 mcg',
        PantothenicAcid: '0.331 mg',
        VitaminB6: '0.227 mg',
        VitaminC: '57.3 mg',
        VitaminE: '2.32 mg',
        VitaminK: '8.7 mcg',
    },
    {
        name: 'Pineapple',
        value: 'pineapple',
        color: '#FDD835',
        Potassium: '180 mg',
        Phosphorus: '13 mg',
        Magnesium: '20 mg',
        Calcium: '21 mg',
        Sodium: '2 mg',
        Iron: '0.48 mg',
        Selenium: '0.2 mcg',
        Manganese: '1.53 mg',
        Copper: '0.181 mg',
        Zinc: '0.2 mg',
        VitaminA: '96 IU',
        VitaminB1: '0.13 mg',
        VitaminB2: '0.053 mg',
        Niacin: '0.825 mg',
        Folate: '30 mcg',
        PantothenicAcid: '0.351 mg',
        VitaminB6: '0.185 mg',
        VitaminC: '78.9 mg',
        VitaminE: '0.03 mg',
        VitaminK: '1.2 mcg',
    },
    {
        name: 'Watermelon',
        value: 'watermelon',
        color: '#E91E63',
        Potassium: '320 mg',
        Phosphorus: '31 mg',
        Magnesium: '29 mg',
        Calcium: '20 mg',
        Sodium: '3 mg',
        Iron: '0.69 mg',
        Selenium: '1.1 mcg',
        Manganese: '0.109 mg',
        Copper: '0.12 mg',
        Zinc: '0.29 mg',
        VitaminA: '1627 IU',
        VitaminB1: '0.094 mg',
        VitaminB2: '0.06 mg',
        Niacin: '0.509 mg',
        Folate: '9 mcg',
        PantothenicAcid: '0.632 mg',
        VitaminB6: '0.129 mg',
        VitaminC: '23.2 mg',
        VitaminE: '0.14 mg',
        VitaminK: '0.3 mcg',
    },
] as any[];

const FRUCTS_COLUMNS = [
    {
        label: 'Color',
        name: 'color',
        width: '250px',
        useCellTemplate: true,
    },
    {
        label: 'Name',
        name: 'name',
        width: '250px',
    },
    {
        label: 'Vitamin A',
        name: 'VitaminA',
        width: '250px',
    },
    {
        label: 'Vitamin B1',
        name: 'VitaminB1',
        width: '250px',
    },
    {
        label: 'Vitamin B2',
        name: 'VitaminB2',
        width: '250px',
    },
    {
        label: 'Vitamin C',
        name: 'VitaminC',
        width: '250px',
    },
] as IDejaGridColumn[];

@Component({
    template: `<deja-grid style="height: 1000px;width: 1000px;" [rows]="fructs" [columns]="fructsColumns" valueField="value" selectedItem="mango" maxHeight="auto" sortable searchArea groupArea rowsDraggable rowsSortable columnsDraggable columnsSortable columnsSizable multiSelect>
                    <ng-template #cellTemplate let-row let-column="column">
                        <span *ngIf="column.name==='color'" class="color" [style.background-color]="row[column.name]"></span>
                    </ng-template>
                </deja-grid>`,
    providers: [
        GroupingService,
    ],
})
class DejaGridContainerComponent {
    public fructs = FRUCTS;
    public fructsColumns = FRUCTS_COLUMNS;

    constructor() {
    }
}

describe('DejaGridComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                DejaGridContainerComponent,
            ],
            imports: [
                BrowserAnimationsModule,
                CommonModule,
                FormsModule,
                DejaGridModule,
                DejaClipboardModule.forRoot(),
            ],
        }).compileComponents();
    }));

    const observeViewPort$ = (fixture: ComponentFixture<DejaGridContainerComponent>) => {
        const gridDebugElement = fixture.debugElement.query(By.directive(DejaGridComponent));
        const gridInstance = gridDebugElement.componentInstance as DejaGridComponent;

        return Observable.from(gridInstance.viewPort.viewPortResult$)
            .filter((result) => result.viewPortSize > 0);
    };

    it('should create the component', async(() => {
        const fixture = TestBed.createComponent(DejaGridContainerComponent);
        fixture.detectChanges();
        const gridDebugElement = fixture.debugElement.query(By.directive(DejaGridComponent));
        const gridInstance = gridDebugElement.componentInstance as DejaGridComponent;
        expect(gridInstance).toBeTruthy();
    }));

    it('should return the write property', (() => {
        const fixture = TestBed.createComponent(DejaGridContainerComponent);
        const gridDebugElement = fixture.debugElement.query(By.directive(DejaGridComponent));
        const gridInstance = gridDebugElement.componentInstance as DejaGridComponent;
        const grid = gridInstance as any;
        const itemListService = gridInstance.itemListService;
        fixture.detectChanges();

        expect(gridInstance.sortable).toBeTruthy();
        gridInstance.sortable = 'false';
        expect(gridInstance.sortable).toBeFalsy();

        expect(gridInstance.pageSize).toBe(0);
        gridInstance.pageSize = 5;
        expect(grid.pageSize).toBe(5);

        expect(gridInstance.hintLabel).toBeUndefined();
        gridInstance.hintLabel = 'I am a hint label';
        expect(gridInstance.hintLabel).toEqual(`I am a hint label`);

        expect(grid.viewPortRowHeight).toBe(ViewPortService.itemDefaultSize);
        gridInstance.viewPortRowHeight = 100;
        expect(grid.viewPortRowHeight).toBe(100);

        expect(gridInstance.childrenField).toBeUndefined();
        expect(itemListService.childrenField).toEqual(ItemListService.defaultChildrenField);
        gridInstance.childrenField = 'children';
        expect(gridInstance.childrenField).toEqual('children');

        expect(gridInstance.textField).toBeUndefined();
        gridInstance.textField = 'text';
        expect(gridInstance.textField).toEqual('text');

        expect(grid.valueField).toEqual('value');
        gridInstance.valueField = 'my value field';
        expect(grid.valueField).toEqual('my value field');

        expect(gridInstance.searchField).toBeUndefined();
        gridInstance.searchField = 'my search field';
        expect(gridInstance.searchField).toEqual('my search field');

        expect(gridInstance.multiSelect).toBeTruthy();
        gridInstance.multiSelect = 'false';
        expect(gridInstance.multiSelect).toBeFalsy();

        const myItemListService = new ItemListService();
        expect(gridInstance.itemListService).toBeDefined();
        gridInstance.itemListService = myItemListService;
        expect(gridInstance.itemListService).toBe(myItemListService);

        const sortingService = new SortingService();
        expect(myItemListService.getSortingService()).toBeDefined();
        gridInstance.sortingService = sortingService;
        gridInstance.refresh();
        fixture.detectChanges();
        expect(myItemListService.getSortingService()).toBe(sortingService);

        const groupingService = new GroupingService();
        expect(myItemListService.getGroupingService()).toBeDefined();
        gridInstance.groupingService = groupingService;
        gridInstance.refresh();
        fixture.detectChanges();
        expect(myItemListService.getGroupingService()).toBe(groupingService);

        expect(gridInstance.searchArea).toBeTruthy();
        gridInstance.searchArea = 'false';
        expect(gridInstance.searchArea).toBeFalsy();

        expect(gridInstance.groupArea).toBeTruthy();
        gridInstance.groupArea = 'false';
        expect(gridInstance.groupArea).toBeFalsy();

        expect(gridInstance.rowsDraggable).toBeTruthy();
        gridInstance.rowsDraggable = 'false';
        expect(gridInstance.rowsDraggable).toBeFalsy();

        expect(gridInstance.rowsSortable).toBeTruthy();
        gridInstance.rowsSortable = 'false';
        expect(gridInstance.rowsSortable).toBeFalsy();

        expect(gridInstance.columnsDraggable).toBeTruthy();
        gridInstance.columnsDraggable = 'false';
        expect(gridInstance.columnsDraggable).toBeFalsy();

        expect(gridInstance.columnsSortable).toBeTruthy();
        gridInstance.columnsSortable = 'false';
        expect(gridInstance.columnsSortable).toBeFalsy();

        expect(gridInstance.columnsSizable).toBeTruthy();
        gridInstance.columnsSizable = 'false';
        expect(gridInstance.columnsSizable).toBeFalsy();

        expect(gridInstance.waiter).toBeFalsy();
        gridInstance.waiter = true;
        expect(gridInstance.waiter).toBeTruthy();

        expect(gridInstance.columns && gridInstance.columns.length).toBe(6);

        expect(gridInstance.depthMax).toBe(0);
    }));

    it('should set and ensure the current cell', async(() => {
        const fixture = TestBed.createComponent(DejaGridContainerComponent);
        const gridContainerInstance = fixture.componentInstance as DejaGridContainerComponent;
        const gridDebugElement = fixture.debugElement.query(By.directive(DejaGridComponent));
        const gridInstance = gridDebugElement.componentInstance as DejaGridComponent;
        let pass = 0;

        observeViewPort$(fixture)
            .debounceTime(100) // Debounce here, because ensureVisible move the scroll and more than one viewPort can be raised
            .subscribe((vp) => {
                // Bind view port
                fixture.detectChanges();
                const listContainer = fixture.debugElement.query(By.css('deja-grid > deja-tree-list > .deja-listcontainer'));
                const listElement = listContainer.nativeElement as HTMLElement;
                const currentCells = fixture.debugElement.queryAll(By.css('deja-grid > deja-tree-list > .deja-listcontainer .cell-wrapper[current="true"]'));
                const currentRow = fixture.debugElement.queryAll(By.css('deja-grid > deja-tree-list > .deja-listcontainer > .listitem[current="true"]'));

                switch (++pass) {
                    case 1:
                        expect(gridInstance.currentColumn).toBeUndefined();
                        // Set current column
                        gridInstance.currentColumn = gridContainerInstance.fructsColumns[4];
                        gridInstance.currentRow = gridContainerInstance.fructs[4];
                        gridInstance.refresh();
                        fixture.detectChanges();
                        break;

                    default:
                        // Check current column
                        expect(vp.visibleItems.length).toBe(12);
                        expect(gridInstance.currentColumn).toBeDefined();
                        expect(gridInstance.currentColumn.name).toEqual('VitaminB2');
                        expect(listElement.scrollLeft).toBe(250);
                        expect(currentCells.length).toBe(12);
                        expect(currentCells[0] && currentCells[0].attributes.colindex).toBe('4');
                        expect(currentRow.length).toBe(1);
                        expect(currentRow[0] && currentRow[0].attributes.flat).toBe('4');
                        break;
                }
            });

        fixture.detectChanges();
    }));

    it('should group with the grouping area', async(() => {
        const fixture = TestBed.createComponent(DejaGridContainerComponent);
        const gridDebugElement = fixture.debugElement.query(By.directive(DejaGridComponent));
        const gridInstance = gridDebugElement.componentInstance as DejaGridComponent;
        let pass = 0;

        observeViewPort$(fixture)
            .debounceTime(10)
            .subscribe((vp) => {
                // Bind view port
                fixture.detectChanges();
                const groupChips = fixture.debugElement.queryAll(By.css('deja-grid > deja-grid-grouparea > #deja-grid-grouparea > deja-chips #close-button'));

                switch (++pass) {
                    case 1:
                        expect(vp.visibleItems.length).toBe(12);
                        expect(groupChips.length).toBe(0);
                        gridInstance.columnGroups = 'name';
                        gridInstance.refresh();
                        fixture.detectChanges();
                        break;

                    case 2:
                        expect(vp.visibleItems.length).toBe(24);
                        expect(groupChips.length).toBe(1);
                        if (groupChips.length) {
                            groupChips[0].nativeElement.click();
                            gridInstance.refresh();
                            fixture.detectChanges();
                        }
                        break;

                    default:
                        expect(groupChips.length).toBe(0);
                        expect(vp.visibleItems.length).toBe(12);
                        break;
                }
            });

        fixture.detectChanges();
    }));

    it('should sort when user click on the header', async(() => {
        const fixture = TestBed.createComponent(DejaGridContainerComponent);
        const gridDebugElement = fixture.debugElement.query(By.directive(DejaGridComponent));
        const gridInstance = gridDebugElement.componentInstance as DejaGridComponent;
        let pass = 0;

        const sendMouseClick = (element: DebugElement) => {
            // Simulate a mouse click on the header
            const event = document.createEvent('MouseEvents') as MouseEvent;
            const gridHeader = fixture.debugElement.query(By.css('deja-grid > deja-tree-list > #listheader > deja-grid-header'));
            event.initMouseEvent('mousedown', true, true, document.defaultView, 0, 0, 0, 0, 0, false, false, false, false, 1, gridHeader.nativeElement);
            element.nativeElement.dispatchEvent(event);
            fixture.detectChanges();
            Observable.timer(100)
                .first()
                .subscribe(() => {
                    const upEvent = document.createEvent('MouseEvents') as MouseEvent;
                    upEvent.initMouseEvent('mouseup', true, true, document.defaultView, 0, 0, 0, 0, 0, false, false, false, false, 1, gridHeader.nativeElement);
                    element.nativeElement.dispatchEvent(upEvent);
                    gridInstance.refreshViewPort();
                    fixture.detectChanges();
                });
        };

        observeViewPort$(fixture)
            .debounceTime(10)
            .subscribe((vp) => {
                // Bind view port
                fixture.detectChanges();
                const columnHeaders = fixture.debugElement.queryAll(By.css('deja-grid > deja-tree-list > #listheader > deja-grid-header .column-header'));

                switch (++pass) {
                    case 1:
                        expect(vp.visibleItems.length).toBe(12);
                        expect(columnHeaders.length).toBeGreaterThan(0);
                        if (columnHeaders.length) {
                            sendMouseClick(columnHeaders[1]);
                        }
                        break;

                    case 2:
                        debugger;
                        // expect(vp.visibleItems.length).toBe(24);
                        // expect(groupChips.length).toBe(1);
                        // if (groupChips.length) {
                        //     groupChips[0].nativeElement.click();
                        //     gridInstance.refresh();
                        //     fixture.detectChanges();
                        // }
                        break;

                    default:
                        // expect(groupChips.length).toBe(0);
                        // expect(vp.visibleItems.length).toBe(12);
                        break;
                }
            });

        fixture.detectChanges();
    }));

    // it('should return the write item class', (() => {
    //     const fixture = TestBed.createComponent(DejaGridContainerComponent);
    //     fixture.detectChanges();
    //     const gridDebugElement = fixture.debugElement.query(By.directive(DejaGridComponent));
    //     const gridInstance = gridDebugElement.componentInstance as DejaGridComponent;
    //     const grid = gridInstance as any;

    //     const item = {
    //         className: null,
    //         collapsing: false,
    //         expanding: false,
    //         depth: 0,
    //         collapsed: false,
    //         selected: false,
    //         odd: false,
    //     } as IItemTree;
    //     expect(grid.getItemClass(item)).toEqual('listitem parent');

    //     item.className = 'test';
    //     expect(grid.getItemClass(item)).toEqual('listitem test parent');

    //     item.collapsing = true;
    //     expect(grid.getItemClass(item)).toEqual('listitem test hide parent');

    //     item.collapsing = false;
    //     expect(grid.getItemClass(item)).toEqual('listitem test parent');

    //     item.expanding = true;
    //     expect(grid.getItemClass(item)).toEqual('listitem test hide parent');

    //     item.expanding = false;
    //     expect(grid.getItemClass(item)).toEqual('listitem test parent');

    //     item.collapsed = true;
    //     expect(grid.getItemClass(item)).toEqual('listitem test parent collapsed');

    //     item.selected = true;
    //     expect(grid.getItemClass(item)).toEqual('listitem test parent collapsed selected');

    //     item.selectable = true;
    //     expect(grid.getItemClass(item)).toEqual('listitem test parent collapsed selected');

    //     item.selectable = false;
    //     expect(grid.getItemClass(item)).toEqual('listitem test parent collapsed selected unselectable');

    //     item.odd = true;
    //     item.depth = 1;
    //     expect(grid.getItemClass(item)).toEqual('listitem test collapsed selected unselectable odd');
    // }));

    // it('should not load items if minSearchlength is defined', async(() => {
    //     let pass = 0;
    //     const fixture = TestBed.createComponent(DejaGridContainerComponent);
    //     const gridDebugElement = fixture.debugElement.query(By.directive(DejaGridComponent));
    //     const gridInstance = gridDebugElement.componentInstance as DejaGridComponent;
    //     gridInstance.minSearchlength = 2;
    //     const viewPortService = gridDebugElement.injector.get(ViewPortService) as ViewPortService;

    //     Observable.from(viewPortService.viewPortResult$)
    //         .debounceTime(100)
    //         .subscribe((_vp) => {
    //             // Bind view port
    //             fixture.detectChanges();
    //             const listItems = fixture.debugElement.queryAll(By.css('deja-tree-list > .deja-listcontainer > .listitem'));
    //             switch (++pass) {
    //                 case 1:
    //                     expect(listItems.length).toBe(0);
    //                     gridInstance.query = '33';
    //                     gridInstance.refresh();
    //                     fixture.detectChanges();
    //                     break;

    //                 default:
    //                     expect(listItems.length).toBeGreaterThan(0);
    //             }
    //         });

    //     fixture.detectChanges();
    // }));

    // it('should set the selected items', async(() => {
    //     let pass = 0;
    //     const fixture = TestBed.createComponent(DejaGridContainerComponent);
    //     const gridDebugElement = fixture.debugElement.query(By.directive(DejaGridComponent));
    //     const gridInstance = gridDebugElement.componentInstance as DejaGridComponent;

    //     observeViewPort$(fixture)
    //         .debounceTime(10)
    //         .subscribe((vp) => {
    //             // Bind view port
    //             fixture.detectChanges();
    //             const selectedElements = fixture.debugElement.queryAll(By.css('deja-tree-list > .deja-listcontainer > .listitem.selected'));
    //             const selectedItems = vp.items.filter((item: IItemBase) => item.selected);

    //             switch (++pass) {
    //                 case 1:
    //                     expect(selectedElements.length).toBe(0);
    //                     // Set selected items
    //                     gridInstance.selectedItems = [vp.items[vp.startIndex], vp.items[vp.endIndex], vp.items[vp.items.length - 1]];
    //                     expect(gridInstance.selectedItems).toBeDefined();
    //                     expect(gridInstance.selectedItems.length).toBe(3);
    //                     gridInstance.refreshViewPort();
    //                     fixture.detectChanges();
    //                     break;

    //                 case 2:
    //                     // Check selected items
    //                     expect(selectedElements.length).toBe(2);
    //                     expect(selectedElements[0] && selectedElements[0].attributes.flat).toBe(`${vp.startIndex}`);
    //                     expect(selectedElements[1] && selectedElements[1].attributes.flat).toBe(`${vp.endIndex}`);
    //                     expect(selectedItems.length).toBe(3);
    //                     // Clear selection
    //                     gridInstance.selectedItems = null;
    //                     gridInstance.refreshViewPort();
    //                     fixture.detectChanges();
    //                     break;

    //                 case 3:
    //                     // Check no selected
    //                     expect(selectedElements.length).toBe(0);
    //                     expect(selectedItems.length).toBe(0);
    //                     // Set selected item
    //                     gridInstance.selectedItem = vp.items[5];
    //                     expect(gridInstance.selectedItem).toBe(vp.items[5]);
    //                     gridInstance.refreshViewPort();
    //                     fixture.detectChanges();
    //                     break;

    //                 case 4:
    //                     // Check selected item
    //                     expect(selectedElements.length).toBe(1);
    //                     expect(selectedElements[0] && selectedElements[0].attributes.flat).toBe(`5`);
    //                     expect(selectedItems.length).toBe(1);
    //                     // Clear selection
    //                     gridInstance.selectedItem = null;
    //                     gridInstance.refreshViewPort();
    //                     fixture.detectChanges();
    //                     break;

    //                 default:
    //                     // Check no selected
    //                     expect(selectedElements.length).toBe(0);
    //                     expect(selectedItems.length).toBe(0);
    //             }
    //         });

    //     fixture.detectChanges();
    // }));

    // it('should toggle and collapse all the items', async(() => {
    //     let pass = 0;
    //     const fixture = TestBed.createComponent(DejaGridContainerComponent);
    //     const gridDebugElement = fixture.debugElement.query(By.directive(DejaGridComponent));
    //     const gridInstance = gridDebugElement.componentInstance as DejaGridComponent;

    //     observeViewPort$(fixture)
    //         .debounceTime(10)
    //         .subscribe((vp) => {
    //             // Bind view port
    //             fixture.detectChanges();
    //             const collapsed = fixture.debugElement.queryAll(By.css('deja-tree-list > .deja-listcontainer > .listitem.parent.collapsed'));
    //             const collapsedItems = vp.items.filter((item: IItemTree) => item.collapsed);
    //             const parentItems = vp.items.filter((item: IItemTree) => item.depth === 0);
    //             switch (++pass) {
    //                 case 1:
    //                     expect(collapsed.length).toBe(0);
    //                     expect(collapsedItems.length).toBe(0);
    //                     // Toggle all items
    //                     gridInstance.toggleAll();
    //                     gridInstance.refreshViewPort();
    //                     fixture.detectChanges();
    //                     break;

    //                 case 2:
    //                     // Check collapsed items
    //                     expect(collapsed.length).toBeGreaterThan(0);
    //                     expect(collapsedItems.length).toBe(parentItems.length);
    //                     // Clear toogle
    //                     gridInstance.toggleAll(false);
    //                     gridInstance.refreshViewPort();
    //                     fixture.detectChanges();
    //                     break;

    //                 default:
    //                     // Check no collapsed
    //                     expect(collapsed.length).toBe(0);
    //                     expect(collapsedItems.length).toBe(0);
    //             }
    //         });

    //     fixture.detectChanges();
    // }));
});

// describe('DejaGridByModelContainerComponent', () => {
//     beforeEach(async(() => {
//         TestBed.configureTestingModule({
//             declarations: [
//                 DejaGridByModelContainerComponent,
//             ],
//             imports: [
//                 BrowserAnimationsModule,
//                 CommonModule,
//                 FormsModule,
//                 DejaGridModule,
//             ],
//         }).compileComponents();
//     }));

//     const observeModelViewPort$ = (fixture: ComponentFixture<DejaGridByModelContainerComponent>) => {
//         const gridDebugElement = fixture.debugElement.query(By.directive(DejaGridComponent));
//         const viewPortService = gridDebugElement.injector.get(ViewPortService) as ViewPortService;

//         return Observable.from(viewPortService.viewPortResult$)
//             .filter((result) => result.viewPortSize > 0);
//     };

//     it('should create the component', async(() => {
//         const fixture = TestBed.createComponent(DejaGridByModelContainerComponent);
//         fixture.detectChanges();
//         const gridDebugElement = fixture.debugElement.query(By.directive(DejaGridComponent));
//         const gridInstance = gridDebugElement.componentInstance as DejaGridComponent;
//         expect(gridInstance).toBeTruthy();
//     }));

//     it('should set the selected models', async(() => {
//         let pass = 0;
//         const fixture = TestBed.createComponent(DejaGridByModelContainerComponent);
//         const gridDebugElement = fixture.debugElement.query(By.directive(DejaGridComponent));
//         const gridInstance = gridDebugElement.componentInstance as DejaGridComponent;

//         observeModelViewPort$(fixture)
//             .debounceTime(10)
//             .subscribe((vp) => {
//                 // Bind view port
//                 fixture.detectChanges();
//                 const selectedModels = fixture.debugElement.queryAll(By.css('deja-tree-list > .deja-listcontainer > .listitem.selected'));
//                 const models = vp.visibleItems.map((item: IItemBase) => item.model);
//                 const selectedItems = vp.items.filter((item: IItemBase) => item.selected);

//                 switch (++pass) {
//                     case 1:
//                         // Selection from HTML
//                         expect(selectedItems.length).toBe(3);
//                         // Set selected models
//                         gridInstance.selectedModels = [models[vp.startIndex], models[vp.endIndex]];
//                         expect(gridInstance.selectedModels).toBeDefined();
//                         expect(gridInstance.selectedModels.length).toBe(2);
//                         gridInstance.refreshViewPort();
//                         fixture.detectChanges();
//                         break;

//                     case 2:
//                         // Check selected models
//                         expect(selectedModels.length).toBe(2);
//                         expect(selectedItems.length).toBe(2);
//                         // Clear selection
//                         gridInstance.selectedModels = null;
//                         gridInstance.refreshViewPort();
//                         fixture.detectChanges();
//                         break;

//                     case 3:
//                         // Check no selected
//                         expect(selectedModels.length).toBe(0);
//                         expect(selectedItems.length).toBe(0);
//                         // Single select list
//                         gridInstance.multiSelect = false;
//                         fixture.detectChanges();
//                         // Set selected model
//                         gridInstance.selectedModel = models[5];
//                         expect(gridInstance.selectedModel).toBe(models[5]);
//                         gridInstance.refreshViewPort();
//                         fixture.detectChanges();
//                         break;

//                     case 4:
//                         // Check selected item
//                         expect(selectedModels.length).toBe(1);
//                         expect(selectedItems.length).toBe(1);
//                         // Clear selection
//                         gridInstance.selectedModel = null;
//                         gridInstance.refreshViewPort();
//                         fixture.detectChanges();
//                         break;

//                     case 5:
//                         // Check no selected
//                         expect(selectedModels.length).toBe(0);
//                         expect(selectedItems.length).toBe(0);
//                         // Set selection by value
//                         gridInstance.value = models[4];
//                         expect((gridInstance.value as IItemBase).model).toBe(models[4]);
//                         gridInstance.refreshViewPort();
//                         fixture.detectChanges();
//                         break;

//                     case 6:
//                         // Check selected item
//                         expect(selectedModels.length).toBe(1);
//                         expect(selectedItems.length).toBe(1);
//                         // Clear selection
//                         gridInstance.selectedModel = null;
//                         gridInstance.refreshViewPort();
//                         fixture.detectChanges();
//                         break;

//                     default:
//                         // Check no selected
//                         expect(selectedModels.length).toBe(0);
//                         expect(selectedItems.length).toBe(0);
//                 }
//             });

//         fixture.detectChanges();
//     }));

//     it('should flag pending keyboard navigation', async(() => {
//         const fixture = TestBed.createComponent(DejaGridByModelContainerComponent);
//         const gridDebugElement = fixture.debugElement.query(By.directive(DejaGridComponent));
//         const gridInstance = gridDebugElement.componentInstance as DejaGridComponent;
//         let listElement: HTMLElement;

//         observeModelViewPort$(fixture)
//             .debounceTime(100)
//             .do(() => expect(gridInstance.keyboardNavigation()).toBeTruthy())
//             .delay(1000)
//             .subscribe(() => expect(gridInstance.keyboardNavigation()).toBeFalsy());

//         const sendKeyDown = (code: string, shiftKey?: boolean, ctrlKey?: boolean) => {
//             const event = new KeyboardEvent('keydown', {
//                 code: code,
//                 shiftKey: shiftKey,
//                 ctrlKey: ctrlKey
//             } as KeyboardEventInit);
//             listElement.dispatchEvent(event);
//         };

//         fixture.detectChanges();
//         listElement = gridInstance.listElement;
//         sendKeyDown('DownArrow');
//     }));

//     it('should navigate with the keyboard', async(() => {
//         let pass = 0;
//         const fixture = TestBed.createComponent(DejaGridByModelContainerComponent);
//         const gridDebugElement = fixture.debugElement.query(By.directive(DejaGridComponent));
//         const gridInstance = gridDebugElement.componentInstance as DejaGridComponent;
//         let listElement: HTMLElement;

//         const sendKeyDown = (code: string, shiftKey?: boolean, ctrlKey?: boolean) => {
//             const event = new KeyboardEvent('keydown', {
//                 code: code,
//                 shiftKey: shiftKey,
//                 ctrlKey: ctrlKey
//             } as KeyboardEventInit);
//             listElement.dispatchEvent(event);
//             gridInstance.refreshViewPort();
//             fixture.detectChanges();
//         };

//         observeModelViewPort$(fixture)
//             .debounceTime(100)
//             .subscribe((vp) => {
//                 fixture.detectChanges();
//                 const selectedElements = fixture.debugElement.queryAll(By.css('deja-tree-list > .deja-listcontainer > .listitem.selected'));
//                 const currentElement = fixture.debugElement.query(By.css('deja-tree-list > .deja-listcontainer > .listitem[current="true"]'));
//                 const selectedItems = vp.items.filter((item: IItemBase) => item.selected);

//                 switch (++pass) {
//                     case 1:
//                         // Selection from HTML
//                         expect(vp.items.filter((item: IItemBase) => item.selected).length).toBe(3);
//                         // Clear selection
//                         gridInstance.selectedModel = null;
//                         gridInstance.refreshViewPort();
//                         fixture.detectChanges();
//                         break;

//                     case 2:
//                         // Check no selected
//                         expect(selectedElements.length).toBe(0);
//                         expect(selectedItems.length).toBe(0);
//                         // Select first line by keydown
//                         sendKeyDown('DownArrow');
//                         break;

//                     case 3:
//                         // Check selection
//                         expect(selectedElements.length).toBe(1);
//                         expect(selectedItems.length).toBe(1);
//                         expect(selectedElements[0] && selectedElements[0].attributes.flat).toBe('0');
//                         // Select second line by keydown
//                         sendKeyDown('DownArrow');
//                         break;

//                     case 4:
//                         // Check selection
//                         expect(selectedElements.length).toBe(1);
//                         expect(selectedItems.length).toBe(1);
//                         expect(selectedElements[0] && selectedElements[0].attributes.flat).toBe('1');
//                         // Select first line by keyup
//                         sendKeyDown('UpArrow');
//                         break;

//                     case 5:
//                         // Check selection
//                         expect(selectedElements.length).toBe(1);
//                         expect(selectedItems.length).toBe(1);
//                         expect(selectedElements[0] && selectedElements[0].attributes.flat).toBe('0');
//                         // Select first and second lines by shift+keydown
//                         sendKeyDown('DownArrow', true);
//                         break;

//                     case 6:
//                         // Check selection
//                         expect(selectedElements.length).toBe(2);
//                         expect(selectedItems.length).toBe(2);
//                         expect(selectedElements[0] && selectedElements[0].attributes.flat).toBe('0');
//                         expect(selectedElements[1] && selectedElements[1].attributes.flat).toBe('1');
//                         // Keep selection, but pass current line to the third line
//                         sendKeyDown('DownArrow', false, true);
//                         break;

//                     case 7:
//                         // Check selection
//                         expect(selectedElements.length).toBe(2);
//                         expect(selectedItems.length).toBe(2);
//                         expect(selectedElements[0] && selectedElements[0].attributes.flat).toBe('0');
//                         expect(selectedElements[1] && selectedElements[1].attributes.flat).toBe('1');
//                         // Check current item
//                         expect(currentElement.attributes.flat).toBe('2');
//                         // Select third line only
//                         sendKeyDown('Space');
//                         break;

//                     case 8:
//                         // Check selection
//                         expect(selectedElements.length).toBe(1);
//                         expect(selectedItems.length).toBe(1);
//                         expect(selectedElements[0] && selectedElements[0].attributes.flat).toBe('2');
//                         // Select first line with Home
//                         sendKeyDown('Home', true);
//                         break;

//                     case 9:
//                         // Check selection
//                         expect(selectedElements.length).toBe(1);
//                         expect(selectedItems.length).toBe(1);
//                         expect(selectedElements[0] && selectedElements[0].attributes.flat).toBe('0');
//                         // Select last line with End
//                         sendKeyDown('End');
//                         break;

//                     case 10:
//                         // Check selection
//                         expect(selectedElements.length).toBe(1);
//                         expect(selectedItems.length).toBe(1);
//                         expect(selectedElements[0] && selectedElements[0].attributes.flat).toBe('1999');
//                         // Select the two last lines with Shift+PageUp
//                         sendKeyDown('UpArrow', true);
//                         break;

//                     case 11:
//                         // Check selection
//                         expect(selectedElements.length).toBe(2);
//                         expect(selectedItems.length).toBe(2);
//                         expect(selectedElements[0] && selectedElements[0].attributes.flat).toBe('1998');
//                         expect(selectedElements[1] && selectedElements[1].attributes.flat).toBe('1999');
//                         // Keep selection, but pass current line to the first line
//                         sendKeyDown('Home', false, true);
//                         break;

//                     case 12:
//                         // Check selection
//                         expect(selectedElements.length).toBe(0);
//                         expect(selectedItems.length).toBe(2);
//                         // Check current item
//                         expect(currentElement && currentElement.attributes.flat).toBe('0');
//                         // Select line 11 (PageSize=10)
//                         sendKeyDown('PageDown');
//                         break;

//                     case 13:
//                         // Check selection
//                         expect(selectedElements.length).toBe(1);
//                         expect(selectedItems.length).toBe(1);
//                         expect(selectedElements[0] && selectedElements[0].attributes.flat).toBe('10');
//                         // Check current item
//                         expect(currentElement && currentElement.attributes.flat).toBe('10');
//                         // Select from line 11 to last line
//                         sendKeyDown('End', true);
//                         break;

//                     case 14:
//                         // Check selection
//                         expect(selectedElements.length).toBe(vp.visibleItems.length);
//                         expect(selectedItems.length).toBe(vp.items.length - 10);
//                         // Check current item
//                         expect(currentElement && currentElement.attributes.flat).toBe('1999');
//                         // Select first line with Home
//                         sendKeyDown('Home');
//                         break;

//                     case 15:
//                         // Check selection
//                         expect(selectedElements.length).toBe(1);
//                         expect(selectedItems.length).toBe(1);
//                         // Check current item
//                         expect(currentElement && currentElement.attributes.flat).toBe('0');
//                         // Select until line 11
//                         sendKeyDown('PageDown', true);
//                         break;

//                     case 16:
//                         // Check selection
//                         expect(selectedElements.length).toBe(11);
//                         expect(selectedItems.length).toBe(11);
//                         // Check current item
//                         expect(currentElement && currentElement.attributes.flat).toBe('10');
//                         // Select next line only
//                         sendKeyDown('DownArrow');
//                         break;

//                     case 17:
//                         // Check selection
//                         expect(selectedElements.length).toBe(1);
//                         expect(selectedItems.length).toBe(1);
//                         // Check current item
//                         expect(currentElement && currentElement.attributes.flat).toBe('11');
//                         // Select second line with PageUp
//                         sendKeyDown('PageUp');
//                         break;

//                     case 18:
//                         // Check selection
//                         expect(selectedElements.length).toBe(1);
//                         expect(selectedItems.length).toBe(1);
//                         // Check current item
//                         expect(currentElement && currentElement.attributes.flat).toBe('1');
//                         // Select last line
//                         sendKeyDown('End');
//                         break;

//                     case 19:
//                         // Check selection
//                         expect(selectedElements.length).toBe(1);
//                         expect(selectedItems.length).toBe(1);
//                         expect(selectedElements[0] && selectedElements[0].attributes.flat).toBe('1999');
//                         // Check current item
//                         expect(currentElement && currentElement.attributes.flat).toBe('1999');
//                         // Select from line 11 to last line
//                         sendKeyDown('PageUp', true);
//                         break;

//                     case 20:
//                         // Check selection
//                         expect(selectedElements.length).toBe(11);
//                         expect(selectedItems.length).toBe(11);
//                         // Select first line
//                         sendKeyDown('Home');
//                         break;

//                     case 21:
//                         // Check selection
//                         expect(selectedElements.length).toBe(1);
//                         expect(selectedItems.length).toBe(1);
//                         expect(selectedElements[0] && selectedElements[0].attributes.flat).toBe('0');
//                         // Check current item
//                         expect(currentElement && currentElement.attributes.flat).toBe('0');
//                         // Toggle first line selection with ctrl
//                         sendKeyDown('Space', false, true);
//                         break;

//                     case 22:
//                         // Check selection
//                         expect(selectedElements.length).toBe(0);
//                         expect(selectedItems.length).toBe(0);
//                         // Check current item
//                         expect(currentElement && currentElement.attributes.flat).toBe('0');
//                         // Select first line with enter in single select
//                         gridInstance.multiSelect = false;
//                         fixture.detectChanges();
//                         sendKeyDown('Enter');
//                         break;

//                     default:
//                         expect(selectedElements.length).toBe(1);
//                         expect(selectedItems.length).toBe(1);
//                         expect(selectedElements[0] && selectedElements[0].attributes.flat).toBe('0');
//                         expect(currentElement && currentElement.attributes.flat).toBe('0');

//                 }
//             });

//         fixture.detectChanges();
//         listElement = gridInstance.listElement;
//     }));

//     it('should refresh view port if windows is resized', async(() => {
//         let pass = 0;
//         const fixture = TestBed.createComponent(DejaGridByModelContainerComponent);

//         observeModelViewPort$(fixture)
//             .debounceTime(100)
//             .subscribe((vp) => {
//                 fixture.detectChanges();

//                 switch (++pass) {
//                     case 1:
//                         const event = new Event('resize', {});
//                         window.dispatchEvent(event);
//                         break;

//                     default:
//                         expect(vp.visibleItems.length).toBe(12);

//                 }
//             });

//         fixture.detectChanges();
//     }));
// });

// describe('DejaGridByOptionsContainerComponent', () => {
//     beforeEach(async(() => {
//         TestBed.configureTestingModule({
//             declarations: [
//                 DejaGridByOptionsContainerComponent,
//             ],
//             imports: [
//                 BrowserAnimationsModule,
//                 CommonModule,
//                 FormsModule,
//                 DejaGridModule,
//                 DejaItemModule,
//             ],
//         }).compileComponents();
//     }));

//     const observeOptionsViewPort$ = (fixture: ComponentFixture<DejaGridByOptionsContainerComponent>) => {
//         const gridDebugElement = fixture.debugElement.query(By.directive(DejaGridComponent));
//         const viewPortService = gridDebugElement.injector.get(ViewPortService) as ViewPortService;

//         return Observable.from(viewPortService.viewPortResult$)
//             .filter((result) => result.viewPortSize > 0);
//     };

//     it('should create the component', async(() => {
//         const fixture = TestBed.createComponent(DejaGridByOptionsContainerComponent);
//         const gridDebugElement = fixture.debugElement.query(By.directive(DejaGridComponent));
//         const gridInstance = gridDebugElement.componentInstance as DejaGridComponent;

//         observeOptionsViewPort$(fixture)
//             .debounceTime(100)
//             .subscribe(() => {
//                 fixture.detectChanges();
//                 const items = fixture.debugElement.queryAll(By.css('deja-tree-list > .deja-listcontainer > .listitem'));
//                 expect(items.length).toBe(12);
//             });

//         fixture.detectChanges();
//         expect(gridInstance).toBeTruthy();
//     }));

//     it('should filter and select with the keyboard', async(() => {
//         let pass = 0;
//         const fixture = TestBed.createComponent(DejaGridByOptionsContainerComponent);
//         const gridDebugElement = fixture.debugElement.query(By.directive(DejaGridComponent));
//         const gridInstance = gridDebugElement.componentInstance as DejaGridComponent;
//         let listElement: HTMLElement;

//         const sendKeyUp = (code: string) => {
//             const event = new KeyboardEvent('keyup', {
//                 code: `Key${code.toUpperCase()}`,
//                 key: code,
//             } as KeyboardEventInit);
//             listElement.dispatchEvent(event);
//             gridInstance.refreshViewPort();
//             fixture.detectChanges();
//         };

//         observeOptionsViewPort$(fixture)
//             .debounceTime(450) // Wait for the clear filter flag
//             .subscribe((vp) => {
//                 fixture.detectChanges();
//                 const selectedElements = fixture.debugElement.queryAll(By.css('deja-tree-list > .deja-listcontainer > .listitem.selected'));
//                 const currentElement = fixture.debugElement.query(By.css('deja-tree-list > .deja-listcontainer > .listitem[current="true"]'));
//                 const selectedItems = vp.items.filter((item: IItemBase) => item.selected);

//                 switch (++pass) {
//                     case 1:
//                         // Check selected and current
//                         expect(selectedElements.length).toBe(0);
//                         expect(selectedItems.length).toBe(0);
//                         // Search first started with c
//                         sendKeyUp('c');
//                         break;

//                     case 2:
//                         // Check selected and current
//                         expect(selectedElements.length).toBe(0);
//                         expect(selectedItems.length).toBe(0);
//                         expect(currentElement && currentElement.attributes.flat).toBe('2');
//                         // Search next
//                         sendKeyUp('c');
//                         break;

//                     case 3:
//                         // Check selected and current
//                         expect(selectedElements.length).toBe(0);
//                         expect(selectedItems.length).toBe(0);
//                         expect(currentElement && currentElement.attributes.flat).toBe('3');
//                         // Search next
//                         sendKeyUp('c');
//                         break;

//                     case 4:
//                         // Check selected and current
//                         expect(selectedElements.length).toBe(0);
//                         expect(selectedItems.length).toBe(0);
//                         expect(currentElement && currentElement.attributes.flat).toBe('4');
//                         // Search next
//                         sendKeyUp('c');
//                         break;

//                     case 5:
//                         // Check selected and current
//                         expect(selectedElements.length).toBe(0);
//                         expect(selectedItems.length).toBe(0);
//                         expect(currentElement && currentElement.attributes.flat).toBe('5');
//                         // Search next
//                         sendKeyUp('c');
//                         break;

//                     case 6:
//                         // Check selected and current
//                         expect(selectedElements.length).toBe(0);
//                         expect(selectedItems.length).toBe(0);
//                         expect(currentElement && currentElement.attributes.flat).toBe('2');
//                         // Enable search area
//                         gridInstance.searchArea = true;
//                         fixture.detectChanges();
//                         // Filter test
//                         (<any>gridInstance).setQuery$.next('c');
//                         gridInstance.refreshViewPort();
//                         fixture.detectChanges();
//                         break;

//                     default:
//                         expect(vp.visibleItems.length).toBe(5);

//                 }
//             });

//         fixture.detectChanges();
//         listElement = gridInstance.listElement;
//     }));

//     it('should select with the mouse', async(() => {
//         let pass = 0;
//         const fixture = TestBed.createComponent(DejaGridByOptionsContainerComponent);
//         const gridDebugElement = fixture.debugElement.query(By.directive(DejaGridComponent));
//         const gridInstance = gridDebugElement.componentInstance as DejaGridComponent;
//         let listElement: DebugElement;

//         const sendMouseClick = (element: DebugElement, shiftKey?: boolean, ctrlKey?: boolean, upElement?: DebugElement) => {
//             // Simulate a mouse click
//             const event = document.createEvent('MouseEvents') as MouseEvent;
//             event.initMouseEvent('mousedown', true, true, document.defaultView, 0, 0, 0, 0, 0, ctrlKey, false, shiftKey, false, 0, listElement.nativeElement);
//             element.nativeElement.dispatchEvent(event);
//             fixture.detectChanges();
//             Observable.timer(100)
//                 .first()
//                 .subscribe(() => {
//                     const upEvent = document.createEvent('MouseEvents') as MouseEvent;
//                     upEvent.initMouseEvent('mouseup', true, true, document.defaultView, 0, 0, 0, 0, 0, ctrlKey, false, shiftKey, false, 0, listElement.nativeElement);
//                     (upElement || element).nativeElement.dispatchEvent(upEvent);
//                     gridInstance.refreshViewPort();
//                     fixture.detectChanges();
//                 });
//         };

//         observeOptionsViewPort$(fixture)
//             .debounceTime(10)
//             .subscribe((vp) => {
//                 fixture.detectChanges();
//                 const displayedElements = fixture.debugElement.queryAll(By.css('deja-tree-list > .deja-listcontainer > .listitem'));
//                 const selectedElements = fixture.debugElement.queryAll(By.css('deja-tree-list > .deja-listcontainer > .listitem.selected'));
//                 const currentElement = fixture.debugElement.query(By.css('deja-tree-list > .deja-listcontainer > .listitem[current="true"]'));
//                 const selectedItems = vp.items.filter((item: IItemBase) => item.selected);

//                 switch (++pass) {
//                     case 1:
//                         // Check selected and current
//                         expect(selectedElements.length).toBe(0);
//                         expect(selectedItems.length).toBe(0);
//                         // Check flags
//                         expect(gridInstance.isMultiSelect).toBe(true);
//                         // Simulate click on first element on disabled
//                         gridInstance.disabled = true;
//                         fixture.detectChanges();
//                         sendMouseClick(displayedElements[1]);
//                         break;

//                     case 2:
//                         // Check selected and current
//                         expect(selectedElements.length).toBe(0);
//                         expect(selectedItems.length).toBe(0);
//                         // Simulate click on first element on disabled
//                         gridInstance.disabled = false;
//                         fixture.detectChanges();
//                         sendMouseClick(displayedElements[1]);
//                         break;

//                     case 3:
//                         // Check selected and current
//                         expect(selectedElements.length).toBe(1);
//                         expect(selectedItems.length).toBe(1);
//                         expect(currentElement && currentElement.attributes.flat).toBe('1');
//                         // Simulate click with ctrl
//                         sendMouseClick(displayedElements[4], false, true);
//                         break;

//                     case 4:
//                         // Check selected and current
//                         expect(selectedElements.length).toBe(2);
//                         expect(selectedItems.length).toBe(2);
//                         expect(currentElement && currentElement.attributes.flat).toBe('4');
//                         // Simulate click with shift
//                         sendMouseClick(displayedElements[6], true);
//                         break;

//                     case 5:
//                         // Check selected and current
//                         expect(selectedElements.length).toBe(3);
//                         expect(selectedItems.length).toBe(3);
//                         expect(currentElement && currentElement.attributes.flat).toBe('4');
//                         // Click outside must keep the selection
//                         sendMouseClick(listElement);
//                         break;

//                     case 6:
//                         // Check selected and current
//                         expect(selectedElements.length).toBe(3);
//                         expect(selectedItems.length).toBe(3);
//                         expect(currentElement && currentElement.attributes.flat).toBe('4');
//                         // Switch to single select
//                         gridInstance.multiSelect = false;
//                         expect(gridInstance.isMultiSelect).toBe(false);
//                         fixture.detectChanges();
//                         // Click first line
//                         sendMouseClick(displayedElements[0]);
//                         break;

//                     case 7:
//                         // Check selected and current
//                         expect(selectedElements.length).toBe(1);
//                         expect(selectedItems.length).toBe(1);
//                         expect(currentElement && currentElement.attributes.flat).toBe('0');
//                         // Simulate click with ctrl
//                         sendMouseClick(displayedElements[4], false, true);
//                         break;

//                     case 8:
//                         // Check selected and current
//                         expect(selectedElements.length).toBe(1);
//                         expect(selectedItems.length).toBe(1);
//                         expect(currentElement && currentElement.attributes.flat).toBe('4');
//                         // Simulate click with shift
//                         sendMouseClick(displayedElements[6], true);
//                         break;

//                     default:
//                         // Check selected and current
//                         expect(selectedElements.length).toBe(1);
//                         expect(selectedItems.length).toBe(1);
//                         expect(currentElement && currentElement.attributes.flat).toBe('6');

//                 }
//             });

//         fixture.detectChanges();
//         listElement = fixture.debugElement.query(By.css('deja-tree-list > .deja-listcontainer'));
//     }));
// });
