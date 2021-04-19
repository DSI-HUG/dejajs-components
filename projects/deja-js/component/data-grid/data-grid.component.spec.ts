/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

/* eslint-disable @typescript-eslint/naming-convention */
import { Component } from '@angular/core';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GroupingService } from '@deja-js/component/core';
import { IItemBase } from '@deja-js/component/core';
import { ItemListService } from '@deja-js/component/core';
import { IViewPort } from '@deja-js/component/core';
import { KeyCodes } from '@deja-js/component/core';
import { SortingService } from '@deja-js/component/core';
import { ViewPortService } from '@deja-js/component/core';
import { cloneDeep } from 'lodash-es';
import { from, timer } from 'rxjs';
import { debounceTime, delay, filter, take, tap } from 'rxjs/operators';

import { DejaGridComponent } from './data-grid.component';
import { IDejaGridColumn, IDejaGridColumnLayoutEvent } from './data-grid-column/data-grid-column';
import { DejaGridModule } from './index';

interface IFructs extends IItemBase<unknown> {
    name: string;
    value: string;
    color: string;
    Potassium: string;
    Phosphorus: string;
    Magnesium: string;
    Calcium: string;
    Iron: string;
    Selenium: string;
    Manganese: string;
    Copper: string;
    Zinc: string;
    VitaminA: string;
    VitaminB1: string;
    VitaminB2: string;
    Niacin: string;
    Folate: string;
    PantothenicAcid: string;
    VitaminB6: string;
    VitaminC: string;
    VitaminE: string;
    VitaminK: string;
}

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
        VitaminK: '3.9 mcg'
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
        VitaminK: '0.6 mcg'
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
        VitaminK: '1.7 mcg    '
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
        VitaminK: '2.9 mcg'
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
        VitaminK: '12.4 mcg'
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
        VitaminK: '5.1 mcg'
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
        VitaminK: '4.3 mcg'
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
        VitaminK: '22 mcg'
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
        VitaminE: '0.13 mg'
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
        VitaminK: '8.7 mcg'
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
        VitaminK: '1.2 mcg'
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
        VitaminK: '0.3 mcg'
    }
] as IFructs[];

const FRUCTS_COLUMNS = [
    {
        label: 'Color',
        name: 'color',
        width: '250px',
        useCellTemplate: true
    },
    {
        label: 'Name',
        name: 'name',
        width: '250px'
    },
    {
        label: 'Vitamin A',
        name: 'VitaminA',
        width: '250px'
    },
    {
        label: 'Vitamin B1',
        name: 'VitaminB1',
        width: '250px'
    },
    {
        label: 'Vitamin B2',
        name: 'VitaminB2',
        width: '250px'
    },
    {
        label: 'Vitamin C',
        name: 'VitaminC',
        width: '250px'
    }
] as IDejaGridColumn[];

const PERCENT_COLUMNS = [
    {
        label: 'Color',
        name: 'color',
        width: '20%',
        useCellTemplate: true
    },
    {
        label: 'Name',
        name: 'name',
        width: '20%'
    },
    {
        label: 'Vitamin A',
        name: 'VitaminA',
        width: '20%'
    },
    {
        label: 'Vitamin B1',
        name: 'VitaminB1',
        width: '100px',
        responsive: true
    },
    {
        label: 'Vitamin B2',
        name: 'VitaminB2',
        width: '100px',
        responsive: true
    }
] as IDejaGridColumn[];

@Component({
    selector: 'DejaGridContainerComponent',
    template: `<deja-grid style="height: 1000px;width: 1000px;display: block;" [rows]="fructs" [columns]="columns" valueField="value" selectedItem="mango" maxHeight="auto" sortable searchArea groupArea rowsDraggable rowsSortable columnsDraggable columnsSortable columnsSizable multiSelect>
                    <ng-template #cellTemplate let-row let-column="column"><span *ngIf="column.name==='color'" class="color" [style.background-color]="row[column.name]"></span></ng-template>
                </deja-grid>`,
    providers: [
        GroupingService
    ]
})
class DejaGridContainerComponent {
    public fructs = FRUCTS;
    public fructsColumns = FRUCTS_COLUMNS;
    public percentColumns = PERCENT_COLUMNS;
    public columns: IDejaGridColumn[];

    public constructor() {
        this.columns = cloneDeep(this.fructsColumns);
    }
}

describe('DejaGridComponent', () => {
    let gridInstance: DejaGridComponent;
    let gridContainerInstance: DejaGridContainerComponent;
    let fixture: ComponentFixture<DejaGridContainerComponent>;
    let gridDebugElement: DebugElement;

    beforeEach(waitForAsync(() => {
        void TestBed.configureTestingModule({
            declarations: [
                DejaGridContainerComponent
            ],
            imports: [
                BrowserAnimationsModule,
                DejaGridModule
            ]
        }).compileComponents();

        document.body.style.width = '1200px';
        document.body.style.height = '1200px';

        fixture = TestBed.createComponent(DejaGridContainerComponent);
        gridDebugElement = fixture.debugElement.query(By.directive(DejaGridComponent));
        gridInstance = gridDebugElement.componentInstance;
        gridContainerInstance = fixture.componentInstance;
    }));

    const observeViewPort$ = () => gridInstance.viewPort.viewPortResult$.pipe(
        filter((result: IViewPort) => result.viewPortSize > 0));

    it('should create the component', waitForAsync(() => {
        fixture.detectChanges();
        void expect(gridInstance).toBeTruthy();
    }));

    it('should return the write property', (() => {
        const itemListService = gridInstance.itemListService;

        fixture.detectChanges();

        void expect(gridInstance.sortable).toBeTruthy();
        gridInstance.sortable = 'false';
        void expect(gridInstance.sortable).toBeFalsy();

        void expect(gridInstance.pageSize).toBe(0);
        gridInstance.pageSize = 5;
        void expect(gridInstance.pageSize).toBe(5);

        void expect(gridInstance.hintLabel).toBeUndefined();
        gridInstance.hintLabel = 'I am a hint label';
        void expect(gridInstance.hintLabel).toEqual('I am a hint label');

        void expect(gridInstance.viewPortRowHeight).toBe(ViewPortService.itemDefaultSize);
        gridInstance.viewPortRowHeight = 100;
        void expect(gridInstance.viewPortRowHeight).toBe(100);

        void expect(gridInstance.childrenField).toBeUndefined();
        void expect(itemListService.childrenField).toEqual(ItemListService.defaultChildrenField);
        gridInstance.childrenField = 'children';
        void expect(gridInstance.childrenField).toEqual('children');

        void expect(gridInstance.textField).toBeUndefined();
        gridInstance.textField = 'text';
        void expect(gridInstance.textField).toEqual('text');

        void expect(gridInstance.valueField).toEqual('value');
        gridInstance.valueField = 'my value field';
        void expect(gridInstance.valueField).toEqual('my value field');

        void expect(gridInstance.searchField).toBeUndefined();
        gridInstance.searchField = 'my search field';
        void expect(gridInstance.searchField).toEqual('my search field');

        void expect(gridInstance.multiSelect).toBeTruthy();
        gridInstance.multiSelect = 'false';
        void expect(gridInstance.multiSelect).toBeFalsy();

        const myItemListService = new ItemListService();
        void expect(gridInstance.itemListService).toBeDefined();
        gridInstance.itemListService = myItemListService;
        void expect(gridInstance.itemListService).toBe(myItemListService);

        const sortingService = new SortingService();
        void expect(myItemListService.getSortingService()).toBeDefined();
        gridInstance.sortingService = sortingService;
        gridInstance.refresh();
        fixture.detectChanges();
        void expect(myItemListService.getSortingService()).toBe(sortingService);

        const groupingService = new GroupingService();
        void expect(myItemListService.getGroupingService()).toBeDefined();
        gridInstance.groupingService = groupingService;
        gridInstance.refresh();
        fixture.detectChanges();
        void expect(myItemListService.getGroupingService()).toBe(groupingService);

        void expect(gridInstance.searchArea).toBeTruthy();
        gridInstance.searchArea = 'false';
        void expect(gridInstance.searchArea).toBeFalsy();

        void expect(gridInstance.groupArea).toBeTruthy();
        gridInstance.groupArea = 'false';
        void expect(gridInstance.groupArea).toBeFalsy();

        void expect(gridInstance.rowsDraggable).toBeTruthy();
        gridInstance.rowsDraggable = 'false';
        void expect(gridInstance.rowsDraggable).toBeFalsy();

        void expect(gridInstance.rowsSortable).toBeTruthy();
        gridInstance.rowsSortable = 'false';
        void expect(gridInstance.rowsSortable).toBeFalsy();

        void expect(gridInstance.columnsDraggable).toBeTruthy();
        gridInstance.columnsDraggable = 'false';
        void expect(gridInstance.columnsDraggable).toBeFalsy();

        void expect(gridInstance.columnsSortable).toBeTruthy();
        gridInstance.columnsSortable = 'false';
        void expect(gridInstance.columnsSortable).toBeFalsy();

        void expect(gridInstance.columnsSizable).toBeTruthy();
        gridInstance.columnsSizable = 'false';
        void expect(gridInstance.columnsSizable).toBeFalsy();

        void expect(gridInstance.waiter).toBeFalsy();
        gridInstance.waiter = true;
        void expect(gridInstance.waiter).toBeTruthy();

        void expect(gridInstance.columns?.length).toBe(6);

        void expect(gridInstance.depthMax).toBe(0);
    }));

    it('should set and ensure the current cell', done => {
        let pass = 0;

        observeViewPort$().pipe(
            debounceTime(100) // Debounce here, because ensureVisible move the scroll and more than one viewPort can be raised
        ).subscribe(vp => {
            // Bind view port
            fixture.detectChanges();
            const listContainer = fixture.debugElement.query(By.css('deja-grid > deja-tree-list > .deja-listcontainer'));
            const listElement = listContainer.nativeElement as HTMLElement;
            const currentCells = fixture.debugElement.queryAll(By.css('deja-grid > deja-tree-list > .deja-listcontainer .cell-wrapper[current="true"]'));
            const currentRow = fixture.debugElement.queryAll(By.css('deja-grid > deja-tree-list > .deja-listcontainer > .listitem[current="true"]'));

            switch (++pass) {
                case 1:
                    void expect(gridInstance.currentColumn).toBeUndefined();
                    // Set current column
                    gridInstance.currentColumn = gridContainerInstance.columns[4];
                    gridInstance.currentRow = gridContainerInstance.fructs[4];
                    gridInstance.refresh();
                    fixture.detectChanges();
                    break;

                default:
                    // Check current column
                    void expect(vp.items.length).toBe(12);
                    void expect(gridInstance.currentColumn).toBeDefined();
                    void expect(gridInstance.currentColumn.name).toEqual('VitaminB2');
                    void expect(listElement.scrollLeft).toBeGreaterThanOrEqual(250);
                    void expect(currentCells.length).toBe(12);
                    void expect(currentRow.length).toBe(1);
                    done();
                    break;
            }
        });

        fixture.detectChanges();
    });

    it('should group with the grouping area', done => {
        let pass = 0;
        let doneCount = 0;

        const testIfDone = () => {
            if (++doneCount === 2) {
                done();
            }
        };

        observeViewPort$().pipe(
            debounceTime(10)
        ).subscribe(vp => {
            // Bind view port
            fixture.detectChanges();
            const groupChips = fixture.debugElement.queryAll(By.css('deja-grid > deja-grid-grouparea > #deja-grid-grouparea > deja-chips #close-button'));

            switch (++pass) {
                case 1:
                    void expect(vp.items.length).toBe(12);
                    void expect(groupChips.length).toBe(0);
                    gridInstance.columnGroups = [{ name: 'name' }];
                    gridInstance.refresh();
                    fixture.detectChanges();
                    break;

                case 2:
                    void expect(vp.items.length).toBe(24);
                    void expect(groupChips.length).toBe(1);
                    if (groupChips.length) {
                        groupChips[0].nativeElement.click();
                        gridInstance.refresh();
                        fixture.detectChanges();
                    }
                    break;

                default:
                    void expect(groupChips.length).toBe(0);
                    void expect(vp.items.length).toBe(12);
                    testIfDone();
                    break;
            }
        });

        gridInstance.groupChanged.pipe(take(1)).subscribe(groupInfos => {
            void expect(groupInfos.length).toBe(1);
            void expect(groupInfos[0].groupByField).toEqual('name');
            void expect(groupInfos[0].groupTextField).toEqual('name');
            testIfDone();
        });

        fixture.detectChanges();
    });

    it('should sort when user click on the header', done => {
        let pass = 0;
        let doneCount = 0;

        const testIfDone = () => {
            if (++doneCount === 2) {
                done();
            }
        };

        const sendMouseClick = (element: DebugElement) => {
            // Simulate a mouse click on the header
            const gridHeader = fixture.debugElement.query(By.css('deja-grid > deja-tree-list > #listheader > deja-grid-header'));
            const eventInit = () => ({
                bubbles: true,
                cancelable: true,
                view: document.defaultView,
                altKey: false,
                ctrlKey: false,
                metaKey: false,
                shiftKey: false,
                button: 0,
                buttons: 1,
                clientX: 0,
                clientY: 0,
                relatedTarget: gridHeader.nativeElement,
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
                element.nativeElement.dispatchEvent(upEvent);
                gridInstance.refreshViewPort();
                fixture.detectChanges();
            });
        };

        observeViewPort$().pipe(
            debounceTime(10)
        ).subscribe(vp => {
            // Bind view port
            fixture.detectChanges();
            const columnHeaders = fixture.debugElement.queryAll(By.css('deja-grid > deja-tree-list > #listheader > deja-grid-header .column-header'));

            switch (++pass) {
                case 1:
                    void expect(vp.items.length).toBe(12);
                    void expect(columnHeaders.length).toBeGreaterThan(0);
                    if (columnHeaders.length) {
                        sendMouseClick(columnHeaders[1]);
                    }
                    break;

                default:
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    void expect((<any>vp.items[0]).name).toEqual('Banana');
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    void expect((<any>vp.items[8]).name).toEqual('Mango');
                    testIfDone();
                    break;
            }
        });

        gridInstance.sortChanged.pipe(take(1)).subscribe(sortInfos => {
            void expect(sortInfos.name).toEqual('name');
            testIfDone();
        });

        fixture.detectChanges();
    });

    it('should size the column when user click on the header separator', done => {
        let pass = 0;

        const sendMouseMove = (element: DebugElement) => {
            // Simulate a mouse click on the header
            const gridHeader = fixture.debugElement.query(By.css('deja-grid > deja-tree-list > #listheader > deja-grid-header'));
            const eventInit = () => ({
                bubbles: true,
                cancelable: true,
                view: document.defaultView,
                altKey: false,
                ctrlKey: false,
                metaKey: false,
                shiftKey: false,
                button: 0,
                buttons: 1,
                clientX: 0,
                clientY: 0,
                relatedTarget: gridHeader.nativeElement,
                screenX: 0,
                screenY: 0
            } as MouseEventInit);
            const event = new MouseEvent('mousedown', eventInit());
            element.nativeElement.dispatchEvent(event);
            fixture.detectChanges();
            timer(100).pipe(
                take(1),
                tap(() => {
                    const ei = eventInit();
                    ei.screenX = 100;
                    const moveEvent = new MouseEvent('mousemove', ei);
                    element.nativeElement.dispatchEvent(moveEvent);
                    fixture.detectChanges();
                }),
                delay(100)
            ).subscribe(() => {
                const ei = eventInit();
                ei.screenX = 100;
                const upEvent = new MouseEvent('mouseup', ei);
                element.nativeElement.dispatchEvent(upEvent);
                gridInstance.refreshViewPort();
                fixture.detectChanges();
            });
        };

        observeViewPort$().pipe(
            debounceTime(10)
        ).subscribe(vp => {
            // Bind view port
            fixture.detectChanges();
            const columnSeparators = fixture.debugElement.queryAll(By.css('deja-grid > deja-tree-list > #listheader > deja-grid-header [separator]'));
            const cells = fixture.debugElement.queryAll(By.css('deja-grid > deja-tree-list > .deja-listcontainer .cell-wrapper'));

            switch (++pass) {
                case 1:
                    void expect(vp.items.length).toBe(12);
                    void expect(columnSeparators.length).toBeGreaterThan(0);
                    if (columnSeparators.length) {
                        sendMouseMove(columnSeparators[1]);
                    }
                    break;

                case 2:
                    void expect(cells[1].nativeElement.clientWidth).toBe(350);
                    gridContainerInstance.columns = gridContainerInstance.percentColumns;
                    fixture.detectChanges();
                    sendMouseMove(columnSeparators[2]);
                    break;

                default:
                    void expect(cells[2].nativeElement.clientWidth).toBeGreaterThan(10);
                    done();
                    break;
            }
        });

        fixture.detectChanges();
    });

    it('should refresh view port if windows is resized', done => {
        let pass = 0;

        observeViewPort$().pipe(
            debounceTime(100)
        ).subscribe(_vp => {
            // Bind view port
            fixture.detectChanges();
            const cells = fixture.debugElement.queryAll(By.css('deja-grid > deja-tree-list > .deja-listcontainer .cell-wrapper'));

            switch (++pass) {
                case 1:
                    window.dispatchEvent(new Event('resize', {}));
                    break;

                case 2:
                    gridInstance.clearViewPort();
                    gridInstance.clearRowsHeight();
                    gridInstance.refreshViewPort();
                    fixture.detectChanges();
                    break;

                default:
                    void expect(cells.length).toBeGreaterThan(0);
                    done();
            }
        });

        gridContainerInstance.columns = gridContainerInstance.percentColumns;

        fixture.detectChanges();
    });

    it('should navigate with the keyboard', done => {
        let pass = 0;

        const sendKeyDown = (code: string) => {
            const event = new KeyboardEvent('keydown', {
                code: code,
                shiftKey: false,
                altKey: false,
                ctrlKey: false
            } as KeyboardEventInit);
            gridDebugElement.nativeElement.dispatchEvent(event);
            gridInstance.refreshViewPort();
            fixture.detectChanges();
        };

        observeViewPort$().pipe(
            debounceTime(10)
        ).subscribe(_vp => {
            fixture.detectChanges();
            const currentCells = fixture.debugElement.queryAll(By.css('deja-grid > deja-tree-list > .deja-listcontainer .cell-wrapper[current="true"]'));

            switch (++pass) {
                case 1:
                    void expect(currentCells.length).toBe(0);
                    sendKeyDown(KeyCodes.RightArrow);
                    break;

                case 2:
                    void expect(currentCells.length).toBeGreaterThan(0);
                    void expect(currentCells[0]?.attributes.colindex).toBe('0');
                    sendKeyDown(KeyCodes.RightArrow);
                    break;

                case 3:
                    void expect(currentCells.length).toBeGreaterThan(0);
                    void expect(currentCells[0]?.attributes.colindex).toBe('1');
                    sendKeyDown(KeyCodes.LeftArrow);
                    break;

                default:
                    void expect(currentCells.length).toBeGreaterThan(0);
                    void expect(currentCells[0]?.attributes.colindex).toBe('0');
                    done();
            }
        });

        fixture.detectChanges();
    });

    it('should drag and drop a column from header to header', done => {
        let gridHeader: DebugElement;
        let pass = 0;

        const eventInit = () => ({
            bubbles: true,
            cancelable: true,
            view: document.defaultView,
            altKey: false,
            ctrlKey: false,
            metaKey: false,
            shiftKey: false,
            button: 0,
            buttons: 1,
            clientX: 0,
            clientY: 0,
            relatedTarget: gridHeader.nativeElement,
            screenX: 0,
            screenY: 0,
            dataTransfer: new DataTransfer()
        } as MouseEventInit);

        from(gridInstance.columnLayoutChanged).subscribe((layout: IDejaGridColumnLayoutEvent) => {
            // Bind view port
            const columnHeaders = fixture.debugElement.queryAll(By.css('deja-grid > deja-tree-list > #listheader > deja-grid-header .column-header-wrapper'));
            fixture.detectChanges();
            let dropEventInit: MouseEventInit;
            let dropTarget: HTMLElement;
            let dropTargetBounds: DOMRect;

            switch (++pass) {
                case 1:
                    void expect(layout.column.name).toEqual('name');
                    void expect(layout.target.name).toEqual('VitaminA');

                    timer(10).pipe(
                        take(1),
                        tap(() => {
                            const enterEventInit = eventInit();
                            const enterTarget = columnHeaders[3].nativeElement as HTMLElement;
                            const enterTargetBounds = enterTarget.getBoundingClientRect();
                            enterEventInit.clientY = enterTargetBounds.top + 1;
                            enterEventInit.clientX = enterTargetBounds.left + 1;
                            enterTarget.dispatchEvent(new DragEvent('dragenter', enterEventInit as never));
                            fixture.detectChanges();
                        }),
                        delay(100)
                        // eslint-disable-next-line rxjs/no-nested-subscribe
                    ).subscribe(() => {
                        const overEventInit = eventInit();
                        const overTarget = columnHeaders[3].nativeElement as HTMLElement;
                        const overTargetBounds = overTarget.getBoundingClientRect();
                        overEventInit.clientY = overTargetBounds.top + 5;
                        overEventInit.clientX = overTargetBounds.right - 2;
                        overTarget.dispatchEvent(new DragEvent('dragover', overEventInit as never));
                        fixture.detectChanges();
                    });
                    break;

                case 2:
                    void expect(layout.column.name).toEqual('name');
                    void expect(layout.target.name).toEqual('VitaminB1');
                    dropEventInit = eventInit();
                    dropTarget = columnHeaders[4].nativeElement;
                    dropTargetBounds = dropTarget.getBoundingClientRect();
                    dropEventInit.clientY = dropTargetBounds.top + 5;
                    dropEventInit.clientX = dropTargetBounds.right - 2;
                    dropTarget.dispatchEvent(new DragEvent('drop', dropEventInit as never));
                    fixture.detectChanges();
                    break;

                default:
                    void expect(layout.column.name).toEqual('name');
                    void expect(layout.target.name).toEqual('VitaminB2');

            }
        });

        observeViewPort$().pipe(
            debounceTime(10)
        ).subscribe(vp => {
            fixture.detectChanges();
            const columnHeaders = fixture.debugElement.queryAll(By.css('deja-grid > deja-tree-list > #listheader > deja-grid-header .column-header-wrapper'));
            gridHeader = fixture.debugElement.query(By.css('deja-grid > deja-tree-list > #listheader > deja-grid-header > #deja-grid-header'));

            void expect(vp.items.length).toBe(12);
            void expect(columnHeaders.length).toBeGreaterThan(0);
            if (columnHeaders.length) {
                timer(10).pipe(
                    take(1),
                    tap(() => {
                        const event = new DragEvent('dragstart', eventInit() as never);
                        columnHeaders[1].nativeElement.dispatchEvent(event);
                        fixture.detectChanges();
                    }),
                    delay(100),
                    tap(() => {
                        const enterEventInit = eventInit();
                        const enterTarget = columnHeaders[2].nativeElement as HTMLElement;
                        const enterTargetBounds = enterTarget.getBoundingClientRect();
                        enterEventInit.clientY = enterTargetBounds.top + 1;
                        enterEventInit.clientX = enterTargetBounds.left + 1;
                        enterTarget.dispatchEvent(new DragEvent('dragenter', enterEventInit as never));
                        fixture.detectChanges();
                    }),
                    delay(100)
                    // eslint-disable-next-line rxjs/no-nested-subscribe
                ).subscribe(() => {
                    const overEventInit = eventInit();
                    const overTarget = columnHeaders[2].nativeElement as HTMLElement;
                    const overTargetBounds = overTarget.getBoundingClientRect();
                    overEventInit.clientY = overTargetBounds.top + 5;
                    overEventInit.clientX = overTargetBounds.right - 2;
                    overTarget.dispatchEvent(new DragEvent('dragover', overEventInit as never));
                    fixture.detectChanges();
                    done();
                });
            }
        });

        fixture.detectChanges();
    });

    it('should leave the drag and drop when we are outside the control', done => {
        let gridHeader: DebugElement;
        let dragHeaderElement: HTMLElement;

        const eventInit = () => ({
            bubbles: true,
            cancelable: true,
            view: document.defaultView,
            altKey: false,
            ctrlKey: false,
            metaKey: false,
            shiftKey: false,
            button: 0,
            buttons: 1,
            clientX: 0,
            clientY: 0,
            relatedTarget: gridHeader.nativeElement,
            screenX: 0,
            screenY: 0,
            dataTransfer: new DataTransfer()
        } as MouseEventInit);

        from(gridInstance.columnLayoutChanged).subscribe((layout: IDejaGridColumnLayoutEvent) => {
            fixture.detectChanges();
            const columnHeaders = fixture.debugElement.queryAll(By.css('deja-grid > deja-tree-list > #listheader > deja-grid-header .column-header-wrapper'));

            void expect(layout.column.name).toEqual('name');
            void expect(layout.target.name).toEqual('VitaminA');
            timer(10).pipe(
                take(1),
                tap(() => {
                    const leaveEventInit = eventInit();
                    const leaveTarget = columnHeaders[2].nativeElement as HTMLElement;
                    const leaveTargetBounds = leaveTarget.getBoundingClientRect();
                    leaveEventInit.clientY = leaveTargetBounds.top - 5;
                    leaveEventInit.clientX = leaveTargetBounds.right - 2;
                    leaveTarget.dispatchEvent(new DragEvent('dragleave', leaveEventInit as never));
                    fixture.detectChanges();
                }),
                delay(100)
                // eslint-disable-next-line rxjs/no-nested-subscribe
            ).subscribe(() => {
                dragHeaderElement.dispatchEvent(new DragEvent('dragend', { dataTransfer: new DataTransfer() }));
                fixture.detectChanges();
            });
        });

        observeViewPort$().pipe(
            debounceTime(10)
        ).subscribe(vp => {
        // Bind view port
            fixture.detectChanges();
            const columnHeaders = fixture.debugElement.queryAll(By.css('deja-grid > deja-tree-list > #listheader > deja-grid-header .column-header-wrapper'));
            gridHeader = fixture.debugElement.query(By.css('deja-grid > deja-tree-list > #listheader > deja-grid-header > #deja-grid-header'));

            void expect(vp.items.length).toBe(12);
            void expect(columnHeaders.length).toBeGreaterThan(0);
            if (columnHeaders.length) {
                timer(10).pipe(
                    take(1),
                    tap(() => {
                        dragHeaderElement = columnHeaders[1].nativeElement;
                        dragHeaderElement.dispatchEvent(new DragEvent('dragstart', eventInit() as never));
                        fixture.detectChanges();
                    }),
                    delay(100),
                    tap(() => {
                        const enterEventInit = eventInit();
                        const enterTarget = columnHeaders[2].nativeElement as HTMLElement;
                        const enterTargetBounds = enterTarget.getBoundingClientRect();
                        enterEventInit.clientY = enterTargetBounds.top + 1;
                        enterEventInit.clientX = enterTargetBounds.left + 1;
                        enterTarget.dispatchEvent(new DragEvent('dragenter', enterEventInit as never));
                        fixture.detectChanges();
                    }),
                    delay(100)
                // eslint-disable-next-line rxjs/no-nested-subscribe
                ).subscribe(() => {
                    const overEventInit = eventInit();
                    const overTarget = columnHeaders[2].nativeElement as HTMLElement;
                    const overTargetBounds = overTarget.getBoundingClientRect();
                    overEventInit.clientY = overTargetBounds.top + 5;
                    overEventInit.clientX = overTargetBounds.right - 2;
                    overTarget.dispatchEvent(new DragEvent('dragover', overEventInit as never));
                    fixture.detectChanges();
                    done();
                });
            }
        });

        fixture.detectChanges();
    });

    it('should drag and drop an header to the group area', done => {
        let gridHeader: DebugElement;
        let gridGroupArea: DebugElement;
        let dragHeaderElement: HTMLElement;
        let pass = 0;

        const eventInit = (relatedTarget: DebugElement) => ({
            bubbles: true,
            cancelable: true,
            view: document.defaultView,
            altKey: false,
            ctrlKey: false,
            metaKey: false,
            shiftKey: false,
            button: 0,
            buttons: 1,
            clientX: 0,
            clientY: 0,
            relatedTarget: relatedTarget.nativeElement,
            screenX: 0,
            screenY: 0,
            dataTransfer: new DataTransfer()
        } as MouseEventInit);

        observeViewPort$().pipe(
            debounceTime(20)
        ).subscribe(vp => {
        // Bind view port
            fixture.detectChanges();
            const columnHeaders = fixture.debugElement.queryAll(By.css('deja-grid > deja-tree-list > #listheader > deja-grid-header .column-header-wrapper'));
            gridHeader = fixture.debugElement.query(By.css('deja-grid > deja-tree-list > #listheader > deja-grid-header > #deja-grid-header'));
            gridGroupArea = fixture.debugElement.query(By.css('deja-grid > deja-grid-grouparea > #deja-grid-grouparea'));
            const chipsDraggable = fixture.debugElement.queryAll(By.css('deja-grid > deja-grid-grouparea > #deja-grid-grouparea > deja-chips span[draggable]'));

            const invertGroups = () => {
                timer(10).pipe(
                    take(1),
                    tap(() => {
                        const dragGroupElement = chipsDraggable[0].nativeElement as HTMLElement;
                        const dragEventInit = eventInit(chipsDraggable[0]);
                        const dragTargetBounds = dragGroupElement.getBoundingClientRect();
                        dragEventInit.clientY = dragTargetBounds.top + 5;
                        dragEventInit.clientX = dragTargetBounds.left + 5;
                        dragGroupElement.dispatchEvent(new DragEvent('dragstart', eventInit(chipsDraggable[0]) as never));
                        fixture.detectChanges();
                    }),
                    delay(10),
                    tap(() => {
                        const enterEventInit = eventInit(gridGroupArea);
                        const enterTarget = gridGroupArea.nativeElement as HTMLElement;
                        const enterTargetBounds = enterTarget.getBoundingClientRect();
                        enterEventInit.clientY = enterTargetBounds.top + 5;
                        enterEventInit.clientX = enterTargetBounds.left + 5;
                        enterTarget.dispatchEvent(new DragEvent('dragenter', enterEventInit as never));
                        fixture.detectChanges();
                    }),
                    delay(10),
                    tap(() => {
                        const overEventInit = eventInit(gridGroupArea);
                        const overTarget = chipsDraggable[1].nativeElement as HTMLElement;
                        overTarget.dispatchEvent(new DragEvent('dragover', overEventInit as never));
                        fixture.detectChanges();
                    }),
                    delay(10)
                // eslint-disable-next-line rxjs/no-nested-subscribe
                ).subscribe(() => {
                    const dropEventInit = eventInit(gridGroupArea);
                    const dropTarget = chipsDraggable[1].nativeElement as HTMLElement;
                    dropTarget.dispatchEvent(new DragEvent('drop', dropEventInit as never));
                    fixture.detectChanges();
                });
            };

            let chipsCloseButtons: DebugElement[];
            switch (++pass) {
                case 1:
                // Drag a column to the group area
                    void expect(vp.items.length).toBe(12);
                    void expect(columnHeaders.length).toBeGreaterThan(0);
                    if (columnHeaders.length) {
                        timer(10).pipe(
                            take(1),
                            tap(() => {
                                dragHeaderElement = columnHeaders[1].nativeElement;
                                dragHeaderElement.dispatchEvent(new DragEvent('dragstart', eventInit(gridHeader) as never));
                                fixture.detectChanges();
                            }),
                            delay(10),
                            tap(() => {
                                const enterEventInit = eventInit(gridGroupArea);
                                const enterTarget = gridGroupArea.nativeElement as HTMLElement;
                                const enterTargetBounds = enterTarget.getBoundingClientRect();
                                enterEventInit.clientY = enterTargetBounds.top + 1;
                                enterEventInit.clientX = enterTargetBounds.left + 1;
                                enterTarget.dispatchEvent(new DragEvent('dragenter', enterEventInit as never));
                                fixture.detectChanges();
                            }),
                            delay(10)
                        // eslint-disable-next-line rxjs/no-nested-subscribe
                        ).subscribe(() => {
                            const overEventInit = eventInit(gridGroupArea);
                            const overTarget = gridGroupArea.nativeElement as HTMLElement;
                            const overTargetBounds = overTarget.getBoundingClientRect();
                            overEventInit.clientY = overTargetBounds.top + 5;
                            overEventInit.clientX = overTargetBounds.right - 2;
                            overTarget.dispatchEvent(new DragEvent('drop', overEventInit as never));
                            fixture.detectChanges();
                        });
                    }
                    break;

                case 2:
                    void expect(vp.items.length).toBe(24);
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    void expect((<any>vp.items[0]).$text).toEqual('Peach');
                    void expect(chipsDraggable.length).toBe(1);
                    void expect(chipsDraggable[0].nativeElement.innerText).toEqual('Name');
                    // Drag a second column to the group area
                    timer(10).pipe(
                        take(1),
                        tap(() => {
                            dragHeaderElement = columnHeaders[0].nativeElement;
                            dragHeaderElement.dispatchEvent(new DragEvent('dragstart', eventInit(gridHeader) as never));
                            fixture.detectChanges();
                        }),
                        delay(10),
                        tap(() => {
                            const enterEventInit = eventInit(gridGroupArea);
                            const enterTarget = gridGroupArea.nativeElement as HTMLElement;
                            const enterTargetBounds = enterTarget.getBoundingClientRect();
                            enterEventInit.clientY = enterTargetBounds.top + 1;
                            enterEventInit.clientX = enterTargetBounds.left + 1;
                            enterTarget.dispatchEvent(new DragEvent('dragenter', enterEventInit as never));
                            fixture.detectChanges();
                        }),
                        delay(10)
                    // eslint-disable-next-line rxjs/no-nested-subscribe
                    ).subscribe(() => {
                        const overEventInit = eventInit(gridGroupArea);
                        const overTarget = gridGroupArea.nativeElement as HTMLElement;
                        const overTargetBounds = overTarget.getBoundingClientRect();
                        overEventInit.clientY = overTargetBounds.top + 5;
                        overEventInit.clientX = overTargetBounds.right - 5;
                        overTarget.dispatchEvent(new DragEvent('drop', overEventInit as never));
                        fixture.detectChanges();
                    });
                    break;

                case 3:
                    void expect(vp.items.length).toBe(36);
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    void expect((<any>vp.items[0]).$text).toEqual('Peach');
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    void expect((<any>vp.items[1]).$text).toEqual('#FF6F00');
                    void expect(chipsDraggable.length).toBe(2);
                    void expect(chipsDraggable[0].nativeElement.innerText).toEqual('Name');

                    // Invert group in grouping area
                    invertGroups();
                    break;

                case 4:
                    void expect(vp.items.length).toBe(36);
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    void expect((<any>vp.items[1]).$text).toEqual('Peach');
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    void expect((<any>vp.items[0]).$text).toEqual('#FF6F00');
                    void expect(chipsDraggable.length).toBe(2);

                    // Re-invert group in grouping area
                    invertGroups();
                    break;

                case 5:
                    void expect(vp.items.length).toBe(36);
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    void expect((<any>vp.items[0]).$text).toEqual('Peach');
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    void expect((<any>vp.items[1]).$text).toEqual('#FF6F00');
                    void expect(chipsDraggable.length).toBe(2);

                    // Close name group
                    chipsCloseButtons = fixture.debugElement.queryAll(By.css('deja-grid > deja-grid-grouparea > #deja-grid-grouparea > deja-chips #close-button'));
                    chipsCloseButtons[0].nativeElement.click();
                    break;

                default:
                    void expect(vp.items.length).toBe(24);
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    void expect((<any>vp.items[0]).$text).toEqual('#FF6F00');
                    void expect(chipsDraggable.length).toBe(1);
                    done();
            }
        });

        fixture.detectChanges();
    });
});
