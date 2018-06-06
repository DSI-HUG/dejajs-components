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
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';
import { DejaClipboardModule } from '../../common/core/clipboard/index';
import { GroupingService } from '../../common/core/grouping/grouping.service';
import { ItemListService } from '../../common/core/item-list/item-list.service';
import { ViewPortService } from '../../common/core/item-list/viewport.service';
import { SortingService } from '../../common/core/sorting/sorting.service';
import { IDejaGridColumn, IDejaGridColumnLayoutEvent } from './data-grid-column/data-grid-column';
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

const PERCENT_COLUMNS = [
    {
        label: 'Color',
        name: 'color',
        width: '20%',
        useCellTemplate: true,
    },
    {
        label: 'Name',
        name: 'name',
        width: '20%',
    },
    {
        label: 'Vitamin A',
        name: 'VitaminA',
        width: '20%',
    },
    {
        label: 'Vitamin B1',
        name: 'VitaminB1',
        width: '100px',
        responsive: true,
    },
    {
        label: 'Vitamin B2',
        name: 'VitaminB2',
        width: '100px',
        responsive: true,
    },
] as IDejaGridColumn[];

@Component({
    template: `<deja-grid style="height: 1000px;width: 1000px;display: block;" [rows]="fructs" [columns]="columns" valueField="value" selectedItem="mango" maxHeight="auto" sortable searchArea groupArea rowsDraggable rowsSortable columnsDraggable columnsSortable columnsSizable multiSelect>
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
    public percentColumns = PERCENT_COLUMNS;
    public columns: any[];

    constructor() {
        this.columns = _.cloneDeep(this.fructsColumns);
    }
}

describe('DejaGridComponent', () => {
    let gridInstance: DejaGridComponent;
    let gridContainerInstance: DejaGridContainerComponent;
    let fixture: ComponentFixture<DejaGridContainerComponent>;
    let gridDebugElement: DebugElement;

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

        document.body.style.width = '1200px';
        document.body.style.height = '1200px';

        fixture = TestBed.createComponent(DejaGridContainerComponent);
        gridDebugElement = fixture.debugElement.query(By.directive(DejaGridComponent));
        gridInstance = gridDebugElement.componentInstance as DejaGridComponent;
        gridContainerInstance = fixture.componentInstance as DejaGridContainerComponent;
    }));

    const observeViewPort$ = () => {
        return Observable.from(gridInstance.viewPort.viewPortResult$)
            .filter((result) => result.viewPortSize > 0);
    };

    it('should create the component', async(() => {
        fixture.detectChanges();
        expect(gridInstance).toBeTruthy();
    }));

    it('should return the write property', (() => {
        const itemListService = gridInstance.itemListService;

        fixture.detectChanges();

        expect(gridInstance.sortable).toBeTruthy();
        gridInstance.sortable = 'false';
        expect(gridInstance.sortable).toBeFalsy();

        expect(gridInstance.pageSize).toBe(0);
        gridInstance.pageSize = 5;
        expect(gridInstance.pageSize).toBe(5);

        expect(gridInstance.hintLabel).toBeUndefined();
        gridInstance.hintLabel = 'I am a hint label';
        expect(gridInstance.hintLabel).toEqual(`I am a hint label`);

        expect(gridInstance.viewPortRowHeight).toBe(ViewPortService.itemDefaultSize);
        gridInstance.viewPortRowHeight = 100;
        expect(gridInstance.viewPortRowHeight).toBe(100);

        expect(gridInstance.childrenField).toBeUndefined();
        expect(itemListService.childrenField).toEqual(ItemListService.defaultChildrenField);
        gridInstance.childrenField = 'children';
        expect(gridInstance.childrenField).toEqual('children');

        expect(gridInstance.textField).toBeUndefined();
        gridInstance.textField = 'text';
        expect(gridInstance.textField).toEqual('text');

        expect(gridInstance.valueField).toEqual('value');
        gridInstance.valueField = 'my value field';
        expect(gridInstance.valueField).toEqual('my value field');

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

    it('should set and ensure the current cell', (done) => {
        let pass = 0;

        observeViewPort$()
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
                        gridInstance.currentColumn = gridContainerInstance.columns[4];
                        gridInstance.currentRow = gridContainerInstance.fructs[4];
                        gridInstance.refresh();
                        fixture.detectChanges();
                        break;

                    default:
                        // Check current column
                        expect(vp.items.length).toBe(12);
                        expect(gridInstance.currentColumn).toBeDefined();
                        expect(gridInstance.currentColumn.name).toEqual('VitaminB2');
                        expect(listElement.scrollLeft).toBeGreaterThanOrEqual(250);
                        expect(currentCells.length).toBe(12);
                        expect(currentRow.length).toBe(1);
                        done();
                        break;
                }
            });

        fixture.detectChanges();
    });

    it('should group with the grouping area', (done) => {
        let pass = 0;
        let doneCount = 0;

        const testIfDone = () => {
            if (++doneCount === 2) {
                done();
            }
        };

        observeViewPort$()
            .debounceTime(10)
            .subscribe((vp) => {
                // Bind view port
                fixture.detectChanges();
                const groupChips = fixture.debugElement.queryAll(By.css('deja-grid > deja-grid-grouparea > #deja-grid-grouparea > deja-chips #close-button'));

                switch (++pass) {
                    case 1:
                        expect(vp.items.length).toBe(12);
                        expect(groupChips.length).toBe(0);
                        gridInstance.columnGroups = 'name';
                        gridInstance.refresh();
                        fixture.detectChanges();
                        break;

                    case 2:
                        expect(vp.items.length).toBe(24);
                        expect(groupChips.length).toBe(1);
                        if (groupChips.length) {
                            groupChips[0].nativeElement.click();
                            gridInstance.refresh();
                            fixture.detectChanges();
                        }
                        break;

                    default:
                        expect(groupChips.length).toBe(0);
                        expect(vp.items.length).toBe(12);
                        testIfDone();
                        break;
                }
            });

        gridInstance.groupChanged.first().subscribe((groupInfos) => {
            expect(groupInfos.length).toBe(1);
            expect(groupInfos[0].groupByField).toEqual('name');
            expect(groupInfos[0].groupTextField).toEqual('name');
            testIfDone();
        });

        fixture.detectChanges();
    });

    it('should sort when user click on the header', (done) => {
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
                screenY: 0,
            } as MouseEventInit);
            const event = new MouseEvent('mousedown', eventInit());
            element.nativeElement.dispatchEvent(event);
            fixture.detectChanges();
            Observable.timer(100)
                .first()
                .subscribe(() => {
                    const upEvent = new MouseEvent('mouseup', eventInit());
                    element.nativeElement.dispatchEvent(upEvent);
                    gridInstance.refreshViewPort();
                    fixture.detectChanges();
                });
        };

        observeViewPort$()
            .debounceTime(10)
            .subscribe((vp) => {
                // Bind view port
                fixture.detectChanges();
                const columnHeaders = fixture.debugElement.queryAll(By.css('deja-grid > deja-tree-list > #listheader > deja-grid-header .column-header'));

                switch (++pass) {
                    case 1:
                        expect(vp.items.length).toBe(12);
                        expect(columnHeaders.length).toBeGreaterThan(0);
                        if (columnHeaders.length) {
                            sendMouseClick(columnHeaders[1]);
                        }
                        break;

                    default:
                        expect((<any>vp.items[0]).name).toEqual('Banana');
                        expect((<any>vp.items[8]).name).toEqual('Mango');
                        testIfDone();
                        break;
                }
            });

        gridInstance.sortChanged.first().subscribe((sortInfos) => {
            expect(sortInfos.name).toEqual('name');
            testIfDone();
        });

        fixture.detectChanges();
    });

    it('should size the column when user click on the header separator', (done) => {
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
                screenY: 0,
            } as MouseEventInit);
            const event = new MouseEvent('mousedown', eventInit());
            element.nativeElement.dispatchEvent(event);
            fixture.detectChanges();
            Observable.timer(100)
                .first()
                .do(() => {
                    const ei = eventInit();
                    ei.screenX = 100;
                    const moveEvent = new MouseEvent('mousemove', ei);
                    element.nativeElement.dispatchEvent(moveEvent);
                    fixture.detectChanges();
                })
                .delay(100)
                .subscribe(() => {
                    const ei = eventInit();
                    ei.screenX = 100;
                    const upEvent = new MouseEvent('mouseup', ei);
                    element.nativeElement.dispatchEvent(upEvent);
                    gridInstance.refreshViewPort();
                    fixture.detectChanges();
                });
        };

        observeViewPort$()
            .debounceTime(10)
            .subscribe((vp) => {
                // Bind view port
                fixture.detectChanges();
                const columnSeparators = fixture.debugElement.queryAll(By.css('deja-grid > deja-tree-list > #listheader > deja-grid-header [separator]'));
                const cells = fixture.debugElement.queryAll(By.css('deja-grid > deja-tree-list > .deja-listcontainer .cell-wrapper'));

                switch (++pass) {
                    case 1:
                        expect(vp.items.length).toBe(12);
                        expect(columnSeparators.length).toBeGreaterThan(0);
                        if (columnSeparators.length) {
                            sendMouseMove(columnSeparators[1]);
                        }
                        break;

                    case 2:
                        expect(cells[1].nativeElement.clientWidth).toBe(350);
                        gridContainerInstance.columns = gridContainerInstance.percentColumns;
                        fixture.detectChanges();
                        sendMouseMove(columnSeparators[2]);
                        break;

                    default:
                        expect(cells[2].nativeElement.clientWidth).toBeGreaterThan(10);
                        done();
                        break;
                }
            });

        fixture.detectChanges();
    });

    it('should refresh view port if windows is resized', (done) => {
        let pass = 0;

        observeViewPort$()
            .debounceTime(10)
            .subscribe((_vp) => {
                // Bind view port
                fixture.detectChanges();
                const cells = fixture.debugElement.queryAll(By.css('deja-grid > deja-tree-list > .deja-listcontainer .cell-wrapper'));

                switch (++pass) {
                    case 1:
                        const event = new Event('resize', {});
                        window.dispatchEvent(event);
                        break;

                    case 2:
                        gridInstance.clearViewPort();
                        gridInstance.clearRowsHeight();
                        gridInstance.refreshViewPort();
                        fixture.detectChanges();
                        break;

                    default:
                        expect(cells.length).toBeGreaterThan(0);
                        done();
                }
            });

        gridContainerInstance.columns = gridContainerInstance.percentColumns;

        fixture.detectChanges();
    });

    it('should navigate with the keyboard', (done) => {
        let pass = 0;

        const sendKeyDown = (code: string) => {
            const event = new KeyboardEvent('keydown', {
                code: code,
                shiftKey: false,
                altKey: false,
                ctrlKey: false,
            } as KeyboardEventInit);
            gridDebugElement.nativeElement.dispatchEvent(event);
            gridInstance.refreshViewPort();
            fixture.detectChanges();
        };

        observeViewPort$()
            .debounceTime(10)
            .subscribe((_vp) => {
                fixture.detectChanges();
                const currentCells = fixture.debugElement.queryAll(By.css('deja-grid > deja-tree-list > .deja-listcontainer .cell-wrapper[current="true"]'));

                switch (++pass) {
                    case 1:
                        expect(currentCells.length).toBe(0);
                        sendKeyDown('RightArrow');
                        break;

                    case 2:
                        expect(currentCells.length).toBeGreaterThan(0);
                        expect(currentCells[0] && currentCells[0].attributes.colindex).toBe('0');
                        sendKeyDown('RightArrow');
                        break;

                    case 3:
                        expect(currentCells.length).toBeGreaterThan(0);
                        expect(currentCells[0] && currentCells[0].attributes.colindex).toBe('1');
                        sendKeyDown('LeftArrow');
                        break;

                    default:
                        expect(currentCells.length).toBeGreaterThan(0);
                        expect(currentCells[0] && currentCells[0].attributes.colindex).toBe('0');
                        done();
                }
            });

        fixture.detectChanges();
    });

    it('should drag and drop a column from header to header', (done) => {
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
            dataTransfer: new DataTransfer(),
        } as MouseEventInit);

        Observable.from(gridInstance.columnLayoutChanged)
            .subscribe((layout: IDejaGridColumnLayoutEvent) => {
                // Bind view port
                const columnHeaders = fixture.debugElement.queryAll(By.css('deja-grid > deja-tree-list > #listheader > deja-grid-header .column-header-wrapper'));
                fixture.detectChanges();

                switch (++pass) {
                    case 1:
                        expect(layout.column.name).toEqual('name');
                        expect(layout.target.name).toEqual('VitaminA');

                        Observable.timer(10)
                            .first()
                            .do(() => {
                                const enterEventInit = eventInit();
                                const enterTarget = columnHeaders[3].nativeElement as HTMLElement;
                                const enterTargetBounds = enterTarget.getBoundingClientRect();
                                enterEventInit.clientY = enterTargetBounds.top + 1;
                                enterEventInit.clientX = enterTargetBounds.left + 1;
                                enterTarget.dispatchEvent(new DragEvent('dragenter', enterEventInit as any));
                                fixture.detectChanges();
                            })
                            .delay(100)
                            .subscribe(() => {
                                const overEventInit = eventInit();
                                const overTarget = columnHeaders[3].nativeElement as HTMLElement;
                                const overTargetBounds = overTarget.getBoundingClientRect();
                                overEventInit.clientY = overTargetBounds.top + 5;
                                overEventInit.clientX = overTargetBounds.right - 2;
                                overTarget.dispatchEvent(new DragEvent('dragover', overEventInit as any));
                                fixture.detectChanges();
                            });
                        break;

                    case 2:
                        expect(layout.column.name).toEqual('name');
                        expect(layout.target.name).toEqual('VitaminB1');
                        const dropEventInit = eventInit();
                        const dropTarget = columnHeaders[4].nativeElement as HTMLElement;
                        const dropTargetBounds = dropTarget.getBoundingClientRect();
                        dropEventInit.clientY = dropTargetBounds.top + 5;
                        dropEventInit.clientX = dropTargetBounds.right - 2;
                        dropTarget.dispatchEvent(new DragEvent('drop', dropEventInit as any));
                        fixture.detectChanges();
                        break;

                    default:
                        expect(layout.column.name).toEqual('name');
                        expect(layout.target.name).toEqual('VitaminB2');

                }
            });

        observeViewPort$()
            .debounceTime(10)
            .subscribe((vp) => {
                fixture.detectChanges();
                const columnHeaders = fixture.debugElement.queryAll(By.css('deja-grid > deja-tree-list > #listheader > deja-grid-header .column-header-wrapper'));
                gridHeader = fixture.debugElement.query(By.css('deja-grid > deja-tree-list > #listheader > deja-grid-header > #deja-grid-header'));

                expect(vp.items.length).toBe(12);
                expect(columnHeaders.length).toBeGreaterThan(0);
                if (columnHeaders.length) {
                    Observable.timer(10)
                        .first()
                        .do(() => {
                            const event = new DragEvent('dragstart', eventInit() as any);
                            columnHeaders[1].nativeElement.dispatchEvent(event);
                            fixture.detectChanges();
                        })
                        .delay(100)
                        .do(() => {
                            const enterEventInit = eventInit();
                            const enterTarget = columnHeaders[2].nativeElement as HTMLElement;
                            const enterTargetBounds = enterTarget.getBoundingClientRect();
                            enterEventInit.clientY = enterTargetBounds.top + 1;
                            enterEventInit.clientX = enterTargetBounds.left + 1;
                            enterTarget.dispatchEvent(new DragEvent('dragenter', enterEventInit as any));
                            fixture.detectChanges();
                        })
                        .delay(100)
                        .subscribe(() => {
                            const overEventInit = eventInit();
                            const overTarget = columnHeaders[2].nativeElement as HTMLElement;
                            const overTargetBounds = overTarget.getBoundingClientRect();
                            overEventInit.clientY = overTargetBounds.top + 5;
                            overEventInit.clientX = overTargetBounds.right - 2;
                            overTarget.dispatchEvent(new DragEvent('dragover', overEventInit as any));
                            fixture.detectChanges();
                            done();
                        });
                }
            });

        fixture.detectChanges();
    });

    it('should leave the drag and drop when we are outside the control', (done) => {
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
            dataTransfer: new DataTransfer(),
        } as MouseEventInit);

        Observable.from(gridInstance.columnLayoutChanged)
            .subscribe((layout: IDejaGridColumnLayoutEvent) => {
                fixture.detectChanges();
                const columnHeaders = fixture.debugElement.queryAll(By.css('deja-grid > deja-tree-list > #listheader > deja-grid-header .column-header-wrapper'));

                expect(layout.column.name).toEqual('name');
                expect(layout.target.name).toEqual('VitaminA');
                Observable.timer(10)
                    .first()
                    .do(() => {
                        const leaveEventInit = eventInit();
                        const leaveTarget = columnHeaders[2].nativeElement as HTMLElement;
                        const leaveTargetBounds = leaveTarget.getBoundingClientRect();
                        leaveEventInit.clientY = leaveTargetBounds.top - 5;
                        leaveEventInit.clientX = leaveTargetBounds.right - 2;
                        leaveTarget.dispatchEvent(new DragEvent('dragleave', leaveEventInit as any));
                        fixture.detectChanges();
                    })
                    .delay(100)
                    .subscribe(() => {
                        dragHeaderElement.dispatchEvent(new DragEvent('dragend', { dataTransfer: new DataTransfer() }));
                        fixture.detectChanges();
                    });
            });

        observeViewPort$()
            .debounceTime(10)
            .subscribe((vp) => {
                // Bind view port
                fixture.detectChanges();
                const columnHeaders = fixture.debugElement.queryAll(By.css('deja-grid > deja-tree-list > #listheader > deja-grid-header .column-header-wrapper'));
                gridHeader = fixture.debugElement.query(By.css('deja-grid > deja-tree-list > #listheader > deja-grid-header > #deja-grid-header'));

                expect(vp.items.length).toBe(12);
                expect(columnHeaders.length).toBeGreaterThan(0);
                if (columnHeaders.length) {
                    Observable.timer(10)
                        .first()
                        .do(() => {
                            dragHeaderElement = columnHeaders[1].nativeElement;
                            dragHeaderElement.dispatchEvent(new DragEvent('dragstart', eventInit() as any));
                            fixture.detectChanges();
                        })
                        .delay(100)
                        .do(() => {
                            const enterEventInit = eventInit();
                            const enterTarget = columnHeaders[2].nativeElement as HTMLElement;
                            const enterTargetBounds = enterTarget.getBoundingClientRect();
                            enterEventInit.clientY = enterTargetBounds.top + 1;
                            enterEventInit.clientX = enterTargetBounds.left + 1;
                            enterTarget.dispatchEvent(new DragEvent('dragenter', enterEventInit as any));
                            fixture.detectChanges();
                        })
                        .delay(100)
                        .subscribe(() => {
                            const overEventInit = eventInit();
                            const overTarget = columnHeaders[2].nativeElement as HTMLElement;
                            const overTargetBounds = overTarget.getBoundingClientRect();
                            overEventInit.clientY = overTargetBounds.top + 5;
                            overEventInit.clientX = overTargetBounds.right - 2;
                            overTarget.dispatchEvent(new DragEvent('dragover', overEventInit as any));
                            fixture.detectChanges();
                            done();
                        });
                }
            });

        fixture.detectChanges();
    });

    it('should drag and drop an header to the group area', (done) => {
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
            dataTransfer: new DataTransfer(),
        } as MouseEventInit);

        observeViewPort$()
            .debounceTime(20)
            .subscribe((vp) => {
                // Bind view port
                fixture.detectChanges();
                const columnHeaders = fixture.debugElement.queryAll(By.css('deja-grid > deja-tree-list > #listheader > deja-grid-header .column-header-wrapper'));
                gridHeader = fixture.debugElement.query(By.css('deja-grid > deja-tree-list > #listheader > deja-grid-header > #deja-grid-header'));
                gridGroupArea = fixture.debugElement.query(By.css('deja-grid > deja-grid-grouparea > #deja-grid-grouparea'));
                const chipsDraggable = fixture.debugElement.queryAll(By.css('deja-grid > deja-grid-grouparea > #deja-grid-grouparea > deja-chips span[draggable]'));

                const invertGroups = () => {
                    Observable.timer(10)
                        .first()
                        .do(() => {
                            const dragGroupElement = chipsDraggable[0].nativeElement;
                            const dragEventInit = eventInit(chipsDraggable[0]);
                            const dragTargetBounds = dragGroupElement.getBoundingClientRect();
                            dragEventInit.clientY = dragTargetBounds.top + 1;
                            dragEventInit.clientX = dragTargetBounds.left + 1;
                            dragGroupElement.dispatchEvent(new DragEvent('dragstart', eventInit(chipsDraggable[0]) as any));
                            fixture.detectChanges();
                        })
                        .delay(10)
                        .do(() => {
                            const enterEventInit = eventInit(gridGroupArea);
                            const enterTarget = gridGroupArea.nativeElement as HTMLElement;
                            const enterTargetBounds = enterTarget.getBoundingClientRect();
                            enterEventInit.clientY = enterTargetBounds.top + 1;
                            enterEventInit.clientX = enterTargetBounds.left + 1;
                            enterTarget.dispatchEvent(new DragEvent('dragenter', enterEventInit as any));
                            fixture.detectChanges();
                        })
                        .delay(10)
                        .do(() => {
                            const overEventInit = eventInit(gridGroupArea);
                            const overTarget = chipsDraggable[1].nativeElement as HTMLElement;
                            overTarget.dispatchEvent(new DragEvent('dragover', overEventInit as any));
                            fixture.detectChanges();
                        })
                        .delay(10)
                        .subscribe(() => {
                            const dropEventInit = eventInit(gridGroupArea);
                            const dropTarget = chipsDraggable[1].nativeElement as HTMLElement;
                            dropTarget.dispatchEvent(new DragEvent('drop', dropEventInit as any));
                            fixture.detectChanges();
                        });
                };

                switch (++pass) {
                    case 1:
                        // Drag a column to the group area
                        expect(vp.items.length).toBe(12);
                        expect(columnHeaders.length).toBeGreaterThan(0);
                        if (columnHeaders.length) {
                            Observable.timer(10)
                                .first()
                                .do(() => {
                                    dragHeaderElement = columnHeaders[1].nativeElement;
                                    dragHeaderElement.dispatchEvent(new DragEvent('dragstart', eventInit(gridHeader) as any));
                                    fixture.detectChanges();
                                })
                                .delay(10)
                                .do(() => {
                                    const enterEventInit = eventInit(gridGroupArea);
                                    const enterTarget = gridGroupArea.nativeElement as HTMLElement;
                                    const enterTargetBounds = enterTarget.getBoundingClientRect();
                                    enterEventInit.clientY = enterTargetBounds.top + 1;
                                    enterEventInit.clientX = enterTargetBounds.left + 1;
                                    enterTarget.dispatchEvent(new DragEvent('dragenter', enterEventInit as any));
                                    fixture.detectChanges();
                                })
                                .delay(10)
                                .subscribe(() => {
                                    const overEventInit = eventInit(gridGroupArea);
                                    const overTarget = gridGroupArea.nativeElement as HTMLElement;
                                    const overTargetBounds = overTarget.getBoundingClientRect();
                                    overEventInit.clientY = overTargetBounds.top + 5;
                                    overEventInit.clientX = overTargetBounds.right - 2;
                                    overTarget.dispatchEvent(new DragEvent('drop', overEventInit as any));
                                    fixture.detectChanges();
                                });
                        }
                        break;

                    case 2:
                        expect(vp.items.length).toBe(24);
                        expect((<any>vp.items[0]).$text).toEqual('Peach');
                        expect(chipsDraggable.length).toBe(1);
                        expect(chipsDraggable[0].nativeElement.innerText).toEqual('Name');
                        // Drag a second column to the group area
                        Observable.timer(10)
                            .first()
                            .do(() => {
                                dragHeaderElement = columnHeaders[0].nativeElement;
                                dragHeaderElement.dispatchEvent(new DragEvent('dragstart', eventInit(gridHeader) as any));
                                fixture.detectChanges();
                            })
                            .delay(10)
                            .do(() => {
                                const enterEventInit = eventInit(gridGroupArea);
                                const enterTarget = gridGroupArea.nativeElement as HTMLElement;
                                const enterTargetBounds = enterTarget.getBoundingClientRect();
                                enterEventInit.clientY = enterTargetBounds.top + 1;
                                enterEventInit.clientX = enterTargetBounds.left + 1;
                                enterTarget.dispatchEvent(new DragEvent('dragenter', enterEventInit as any));
                                fixture.detectChanges();
                            })
                            .delay(10)
                            .subscribe(() => {
                                const overEventInit = eventInit(gridGroupArea);
                                const overTarget = gridGroupArea.nativeElement as HTMLElement;
                                const overTargetBounds = overTarget.getBoundingClientRect();
                                overEventInit.clientY = overTargetBounds.top + 5;
                                overEventInit.clientX = overTargetBounds.right - 5;
                                overTarget.dispatchEvent(new DragEvent('drop', overEventInit as any));
                                fixture.detectChanges();
                            });
                        break;

                    case 3:
                        expect(vp.items.length).toBe(36);
                        expect((<any>vp.items[0]).$text).toEqual('Peach');
                        expect((<any>vp.items[1]).$text).toEqual('#FF6F00');
                        expect(chipsDraggable.length).toBe(2);
                        expect(chipsDraggable[0].nativeElement.innerText).toEqual('Name');

                        // Invert group in grouping area
                        invertGroups();
                        break;

                    case 4:
                        expect(vp.items.length).toBe(36);
                        expect((<any>vp.items[1]).$text).toEqual('Peach');
                        expect((<any>vp.items[0]).$text).toEqual('#FF6F00');
                        expect(chipsDraggable.length).toBe(2);

                        // Re-invert group in grouping area
                        invertGroups();
                        break;

                    case 5:
                        expect(vp.items.length).toBe(36);
                        expect((<any>vp.items[0]).$text).toEqual('Peach');
                        expect((<any>vp.items[1]).$text).toEqual('#FF6F00');
                        expect(chipsDraggable.length).toBe(2);

                        // Close name group
                        const chipsCloseButtons = fixture.debugElement.queryAll(By.css('deja-grid > deja-grid-grouparea > #deja-grid-grouparea > deja-chips #close-button'));
                        chipsCloseButtons[0].nativeElement.click();
                        break;

                    default:
                        expect(vp.items.length).toBe(24);
                        expect((<any>vp.items[0]).$text).toEqual('#FF6F00');
                        expect(chipsDraggable.length).toBe(1);
                        done();
                }
            });

        fixture.detectChanges();
    });
});
