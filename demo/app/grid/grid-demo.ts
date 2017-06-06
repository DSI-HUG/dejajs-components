/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { IItemTree } from '../../../src/common/core/item-list/item-tree';
import { IViewPortItem } from '../../../src/common/core/item-list/viewport.service';
import { IDejaGridColumn, IDejaGridColumnSizeEvent } from '../../../src/component/data-grid/data-grid-column/data-grid-column';
import { IDejaGridRow } from '../../../src/component/data-grid/data-grid-row/data-grid-row';
import { DejaGridComponent } from '../../../src/component/data-grid/data-grid.component';
import { INews } from '../common/news.model';
import { NewsService } from '../services/news.service';
import { IPerson, PeopleService } from '../services/people.service';
import { IExtendedViewPortItem } from '../tree-list/tree-list-demo';
import { CloningService } from './../../../src/common/core/cloning/cloning.service';
import { IGroupInfo } from './../../../src/common/core/grouping/group-infos';
import { GroupingService } from './../../../src/common/core/grouping/grouping.service';
import { IDejaDragContext } from './../../../src/component/dragdrop/draggable.directive';
import { IDejaDropContext, IDejaDropEvent } from './../../../src/component/dragdrop/droppable.directive';

@Component({
    selector: 'grid-demo',
    styleUrls: ['./grid-demo.scss'],
    templateUrl: './grid-demo.html',
})
export class GridDemoComponent {
    protected tabIndex = 1;
    protected people$: Observable<IPerson[]>;
    protected peopleForMultiselect$: Observable<IPerson[]>;
    protected groupedByGenderPeople$: Observable<IPerson[]>;
    protected variableHeightPeopleRows$: Observable<IPerson[]>;
    protected groupedByEyesColorPeople$: Observable<IPerson[]>;
    protected groupedByColorPeople: {
        items: IPerson[],
        toString: () => string,
    }[];
    protected onDemandGroupedPeople: IPeopleGroup[];
    protected news$: Observable<INews[]>;
    protected dialogResponse$: Subject<string> = new Subject<string>();
    protected bigNews$: Observable<INews[]>;
    protected bigPeople$: Observable<IPerson[]>;
    protected columnGroups = [] as IDejaGridColumn[];
    protected draggedPerson;

    protected viewPortInfos: {
        name: string;
        value: string;
    }[];
    protected viewPortInfos$: Subscription;

    private _dialogVisible = false;

    @ViewChild('onexpand') private onExpandGrid: DejaGridComponent;

    protected peopleColumns = [
        {
            label: 'Name',
            name: 'name',
            width: '130px',
        },
        {
            label: 'Gender',
            name: 'gender',
            width: '70px',
        },
        {
            label: 'Company',
            name: 'company',
            width: '85px',
        },
        {
            label: 'Email',
            name: 'email',
            width: '210px',
        },
        {
            label: 'Phone',
            name: 'phone',
            width: '130px',
        },
        {
            label: 'Eyes Color',
            name: 'eyeColor',
            width: '85px',
        },
        {
            label: 'Address',
            name: 'address',
            width: '360px',
        },
        {
            label: 'About',
            name: 'about',
            width: '1000px',
        },
    ] as IDejaGridColumn[];

    protected peopleColumnsEx: IDejaGridColumn[];
    protected variableHeightPeopleColumns: IDejaGridColumn[];

    protected newsColumns = [
        {
            label: 'Logo',
            name: 'urlToImage',
            minWidth: 64,
            sizeable: true,
            useCellTemplate: true,
            width: '150px',
        },
        {
            label: 'title',
            name: 'title',
            sizeable: true,
            useCellTemplate: false,
            width: '180px',
        },
        {
            label: 'description',
            name: 'description',
            minWidth: 64,
            sizeable: true,
            width: '450px',
        },
        {
            label: 'url',
            name: 'url',
            width: '200px',
        },
        {
            label: 'category',
            name: 'category',
            width: '100px',
        },
        {
            label: 'language',
            name: 'language',
            width: '64px',
        },
        {
            label: 'country',
            name: 'country',
            width: '64px',
        },
    ] as IDejaGridColumn[];

    protected percentPeopleColumns = [
        {
            label: 'Name',
            name: 'name',
            width: '130px',
            sizeable: false,
        },
        {
            label: 'Gender',
            name: 'gender',
            width: '70px',
            sizeable: true,
        },
        {
            label: 'Company',
            name: 'company',
            width: '4.5%',
        },
        {
            label: 'Email',
            name: 'email',
            width: '6%',
        },
        {
            label: 'Phone',
            name: 'phone',
            width: '7%',
        },
        {
            label: 'Eyes Color',
            name: 'eyeColor',
            width: '4.5%',
        },
        {
            label: 'Address',
            name: 'address',
            width: '19%',
        },
        {
            label: 'About',
            name: 'about',
            width: '54%',
        },
    ] as IDejaGridColumn[];

    protected responsivePeopleColumns = [
        {
            label: 'Name',
            name: 'name',
            width: '130px',
            sizeable: false,
            minWidth: 64,
        },
        {
            label: 'Gender',
            name: 'gender',
            width: '70px',
            sizeable: true,
            responsive: 1,
        },
        {
            label: 'Company',
            name: 'company',
            width: '4.5%',
            minWidth: 64,
            responsive: 3,
        },
        {
            label: 'Email',
            name: 'email',
            width: '6%',
            minWidth: 64,
        },
        {
            label: 'Phone',
            name: 'phone',
            width: '7%',
            minWidth: 64,
        },
        {
            label: 'Eyes Color',
            name: 'eyeColor',
            width: '4.5%',
            minWidth: 64,
            responsive: 3,
        },
        {
            label: 'Address',
            name: 'address',
            width: '19%',
            minWidth: 64,
            responsive: 2,
        },
        {
            label: 'About',
            name: 'about',
            width: '54%',
            minWidth: 64,
            responsive: 4,
        },
    ] as IDejaGridColumn[];

    protected set dialogVisible(value: boolean) {
        this._dialogVisible = value;
        this.changeDetectorRef.markForCheck();
    }

    protected get dialogVisible() {
        return this._dialogVisible;
    }

    @ViewChild('bigPeople')
    protected set bigCountriesList(grid: DejaGridComponent) {
        if (this.viewPortInfos$) {
            this.viewPortInfos$.unsubscribe();
            this.viewPortInfos = [];
            delete this.viewPortInfos$;
        }

        this.viewPortInfos$ = grid && grid.viewPort.viewPort$
            .debounceTime(1)
            .subscribe((viewPort) => {
                this.viewPortInfos = [
                    { name: 'beforeSize', value: String(viewPort.beforeSize), },
                    { name: 'startIndex', value: String(viewPort.startIndex), },
                    { name: 'viewPortSize', value: String(viewPort.viewPortSize), },
                    { name: 'visibleCount', value: String(viewPort.visibleItems && viewPort.visibleItems.length), },
                    { name: 'endIndex', value: String(viewPort.endIndex), },
                    { name: 'afterSize', value: String(viewPort.afterSize), },
                    { name: 'itemsCount', value: String(viewPort.items && viewPort.items.length), }
                ];
            });
    }

    constructor(private changeDetectorRef: ChangeDetectorRef, private peopleService: PeopleService, newsService: NewsService, cloningService: CloningService, groupingService: GroupingService) {
        this.news$ = newsService.getNews$(50);
        this.bigNews$ = newsService.getNews$(10000);
        this.people$ = peopleService.getPeople$();
        this.bigPeople$ = peopleService.getPeople$(undefined, 100000);

        this.peopleForMultiselect$ = peopleService.getPeople$().switchMap((people) => cloningService.clone$(people));
        this.groupedByGenderPeople$ = peopleService.getPeople$()
            .switchMap((people) => groupingService.group$(people, {
                groupByField: 'gender',
            } as IGroupInfo));

        this.groupedByEyesColorPeople$ = peopleService.getPeople$()
            .switchMap((people) => groupingService.group$(people, {
                groupByField: 'eyeColor',
            } as IGroupInfo));

        peopleService.getPeople$()
            .switchMap((people) => groupingService.group$(people, {
                groupByField: 'color',
            } as IGroupInfo))
            .first()
            .subscribe((items) => {
                this.groupedByColorPeople = items;
            });

        this.peopleColumnsEx = [
            ...[{
                label: 'Color',
                name: 'color',
                width: '64px',
                useCellTemplate: true,
            } as IDejaGridColumn],
            ...this.peopleColumns,
        ];

        this.variableHeightPeopleColumns = [...this.peopleColumns];

        const addressCol = this.variableHeightPeopleColumns.find((column) => column.name === 'address');
        addressCol.sizeable = true;
        addressCol.width = '250px';

        const aboutCol = this.variableHeightPeopleColumns.find((column) => column.name === 'about');
        aboutCol.sizeable = true;
        aboutCol.width = '400px';

        this.variableHeightPeopleRows$ = peopleService.getPeople$().switchMap((people) => cloningService.clone$(people));

        this.peopleService.getPeople$().subscribe((value: IPerson[]) => {
            const onDemandResult = [] as IPeopleGroup[];
            const map = {} as { [groupName: string]: IDejaGridRow[] };
            value.map((person) => {
                const groupName = 'Group ' + person.color;
                if (!map[groupName]) {
                    map[groupName] = [] as IPerson[];
                    onDemandResult.push({
                        color: person.color,
                        collapsible: true,
                        collapsed: true,
                        groupName: groupName,
                        rows: [{
                            displayName: 'loading...',
                            selectable: false,
                        } as IDejaGridRow],
                        displayName: groupName,
                        selectable: false,
                        loaded: false,
                    } as IPeopleGroup);
                }

                map[groupName].push({
                    model: person,
                } as IDejaGridRow);
            });

            this.onDemandGroupedPeople = onDemandResult;
        });
    }

    protected onColumnSizeChanged(e: IDejaGridColumnSizeEvent, grid: DejaGridComponent) {
        switch (e.column.name) {
            case 'description':
            case 'urlToImage':
            case 'address':
            case 'about':
                grid.clearRowsHeight();
                grid.refreshViewPort();
                break;
            default:
        }
    }

    protected imageLoaded(item: IViewPortItem, grid: DejaGridComponent) {
        const itemExt = item as IExtendedViewPortItem;
        if (!itemExt.loaded) {
            itemExt.loaded = true;
            grid.refreshViewPort(itemExt);
        }
    }

    protected loadingRows() {
        const self = this;
        return (_query: string | RegExp, _selectedItems: IDejaGridRow[]) => self.peopleService.getPeople$().delay(3000);
    }

    protected collapsingRows() {
        const self = this;
        return (row: IDejaGridRow) => {
            const group = row as IPeopleGroup;
            return group.loaded ? Observable.of(row) : self.confirmDialog()(row);
        };
    }

    protected expandingRows() {
        const self = this;
        return (row: IDejaGridRow) => {
            const group = row as IPeopleGroup;
            if (group.loaded) {
                return Observable.of(row);
            } else {
                return self.confirmDialog()(row)
                    .switchMap((itm) => {
                        if (!itm) {
                            return Observable.of(null);
                        }

                        Observable.of(group)
                            .delay(2000)
                            .first()
                            .subscribe((grp) => {
                                // Simulate asynchronous load
                                const original = this.groupedByColorPeople.find((c) => c.toString() === grp.color);
                                grp.rows = original.items.map((person) => ({ model: person }));
                                grp.loaded = true;
                                this.onExpandGrid.refresh();
                            });

                        return Observable.of(itm);
                    });
            }
        };
    }

    protected confirmDialog() {
        const self = this;
        return (row: IDejaGridRow) => {
            self.dialogVisible = true;
            return Observable.from(this.dialogResponse$)
                .first()
                .map((response) => {
                    self.dialogVisible = false;
                    return response === 'ok' ? row : null;
                });
        };
    }

    protected onFilterTemplateClicked(where: string) {
        alert(`${where} clicked`);
    }

    protected getParentRowDecr(row: IDejaGridRow) {
        return row.toString();
    }

    protected getDragContext(row: IDejaGridRow) {
        return {
            object: row,
        } as IDejaDragContext;
    }

    protected getDropContext() {
        const drag = (event: IDejaDropEvent) => {
            if (event.dragInfo && event.dragInfo.element && event.dragInfo.element.tagName === 'DEJA-GRID-ROW') {
                event.preventDefault();
            }
        };

        return {
            dragentercallback: drag,
            dragovercallback: drag,
            dropcallback: (event: IDejaDropEvent) => {
                this.draggedPerson = event.dragInfo.object as IPerson;
                this.changeDetectorRef.markForCheck();
            },
        } as IDejaDropContext;
    }
}

interface IPeopleGroup extends IItemTree {
    groupName: string;
    color: string;
    rows: IDejaGridRow[];
    loaded?: boolean;
}
