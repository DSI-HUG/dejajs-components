/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IItemTree } from '../../../src/common/core/item-list/item-tree';
import { IViewPortItem } from '../../../src/common/core/item-list/viewport.service';
import { IDejaGridColumn, IDejaGridColumnSizeEvent } from '../../../src/component/data-grid/data-grid-column/data-grid-column';
import { IDejaGridRow } from '../../../src/component/data-grid/data-grid-row/data-grid-row';
import { DejaGridRowsEvent } from '../../../src/component/data-grid/data-grid-row/data-grid-rows-event';
import { DejaGridComponent } from '../../../src/component/data-grid/data-grid.component';
import { IDejaDragEvent } from '../../../src/component/dragdrop/draggable.directive';
import { INews } from '../common/news.model';
import { NewsService } from '../services/news.service';
import { IPerson, PeopleService } from '../services/people.service';
import { IExtendedViewPortItem } from '../tree-list/tree-list-demo';
import { CloningService } from './../../../src/common/core/cloning/cloning.service';
import { IGroupInfo } from './../../../src/common/core/grouping/group-infos';
import { GroupingService } from './../../../src/common/core/grouping/grouping.service';

@Component({
    selector: 'grid-demo',
    styleUrls: ['./grid-demo.scss'],
    templateUrl: './grid-demo.html',
})
export class GridDemoComponent {
    protected tabIndex = 1;
    protected people$: Observable<IPerson[]>;
    protected peopleForMultiselect$: Observable<IPerson[]>;
    protected groupedPeople$: Observable<IPerson[]>;
    protected news$: Observable<INews[]>;

    @ViewChild('news') private gridNews: DejaGridComponent;

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

    constructor(private peopleService: PeopleService, newsService: NewsService, cloningService: CloningService, groupingService: GroupingService) {
        this.news$ = newsService.getNews$(1);
        this.people$ = peopleService.getPeople$();
        this.peopleForMultiselect$ = peopleService.getPeople$().switchMap((people) => cloningService.clone$(people));
        this.groupedPeople$ = peopleService.getPeople$()
            .switchMap((people) => groupingService.group$(people, {
                groupByField: 'gender',
            } as IGroupInfo));

        this.peopleColumnsEx = [
            ...[{
                label: 'Color',
                name: 'color',
                width: '64px',
                useCellTemplate: true,
            } as IDejaGridColumn],
            ...this.peopleColumns,
        ]
    }

    protected onColumnSizeChanged(e: IDejaGridColumnSizeEvent) {
        if (e.column.name === 'description' || e.column.name === 'urlToImage') {
            this.gridNews.clearRowsHeight();
            this.gridNews.refreshViewPort();
        }
    }

    protected imageLoaded(item: IViewPortItem) {
        const itemExt = item as IExtendedViewPortItem;
        if (!itemExt.loaded) {
            itemExt.loaded = true;
            this.gridNews.refreshViewPort(itemExt);
        }
    }

    protected loadingRows() {
        const self = this;
        return (_query: string | RegExp, _selectedItems: IDejaGridRow[]) => self.peopleService.getPeople$().delay(3000);
    }

    protected collapsingRows() {
        // const self = this;
        // return (item: IItemBase) => {
        //     const country = item as ICountryGroup;
        //     return country.loaded ? Observable.of(item) : self.confirmDialog()(item);
        // };
    }

    protected expandingRows() {
        // const self = this;
        // return (item: IItemBase) => {
        //     const group = item as ICountryGroup;
        //     if (group.loaded) {
        //         return Observable.of(item);
        //     } else {
        //         return self.confirmDialog()(item)
        //             .switchMap((itm) => {
        //                 if (!itm) {
        //                     return Observable.of(null);
        //                 }

        //                 Observable.of(group)
        //                     .delay(2000)
        //                     .first()
        //                     .subscribe((grp) => {
        //                         // Simulate asynchronous load
        //                         const original = this.groupedCountries.find((c) => c.displayName === grp.displayName);
        //                         grp.items = original.items;
        //                         grp.loaded = true;
        //                         this.onExpandList.refresh();
        //                     });

        //                 return Observable.of(itm);
        //             });
        //     }
        // };
    }

    protected confirmDialogWithPromise() {
        // const self = this;
        // return (item: IItemBase) => {
        //     return self.confirmDialog()(item).toPromise();
        // };
    }

    protected confirmDialog() {
        // const self = this;
        // return (item: IItemBase) => {
        //     self.dialogVisible = true;
        //     return Observable.from(this.dialogResponse$)
        //         .first()
        //         .map((response) => {
        //             self.dialogVisible = false;
        //             return response === 'ok' ? item : null;
        //         });
        // };
    }
}

// export class GridDemoComponent implements OnInit {
//     protected percentColumns = [
//         {
//             label: 'transmissiondateformat',
//             name: 'transmissiondateformat',
//             sizeable: false,
//             useCellTemplate: true,
//             width: '60px',
//         },
//         {
//             label: 'receiptdateformat',
//             name: 'receiptdateformat',
//             sizeable: true,
//             width: '60px',
//         },
//         {
//             label: 'receiver',
//             name: 'receiver',
//             width: '3%',
//         },
//         {
//             label: 'serious',
//             name: 'serious',
//             width: '3%',
//         },
//         {
//             label: 'receivedateformat',
//             name: 'receivedateformat',
//             width: '3%',
//         },
//         {
//             label: 'fulfillexpeditecriteria',
//             name: 'fulfillexpeditecriteria',
//             width: '3%',
//         },
//         {
//             label: 'safetyreportid',
//             name: 'safetyreportid',
//             width: '5%',
//         },
//         {
//             label: 'companynumb',
//             name: 'companynumb',
//             width: '4%',
//         },
//         {
//             label: 'reaction',
//             name: 'reaction',
//             width: '4%',
//         },
//         {
//             label: 'patientonsetage',
//             name: 'patientonsetage',
//             width: '3%',
//         },
//         {
//             label: 'patientsex',
//             name: 'patientsex',
//             width: '3%',
//         },
//         {
//             label: 'patientonsetageunit',
//             name: 'patientonsetageunit',
//             width: '2%',
//         },
//         {
//             label: 'drug',
//             name: 'drug',
//             width: '2%',
//         },
//         {
//             label: 'senderorganization',
//             name: 'senderorganization',
//             width: '2%',
//         },
//         {
//             label: 'qualification',
//             name: 'qualification',
//             width: '3%',
//         },
//     ] as IDejaGridColumn[];

//     protected responsiveColumns = [
//         {
//             label: 'transmissiondateformat',
//             name: 'transmissiondateformat',
//             responsive: 0,
//             sizeable: false,
//             useCellTemplate: true,
//             width: '60px',
//         },
//         {
//             label: 'receiptdateformat',
//             name: 'receiptdateformat',
//             sizeable: true,
//             width: '60px',
//         },
//         {
//             label: 'receiver',
//             minWidth: 64,
//             name: 'receiver',
//             width: '3%',
//         },
//         {
//             label: 'serious',
//             minWidth: 64,
//             name: 'serious',
//             width: '3%',
//         },
//         {
//             label: 'receivedateformat',
//             minWidth: 64,
//             name: 'receivedateformat',
//             width: '3%',
//         },
//         {
//             label: 'fulfillexpeditecriteria',
//             minWidth: 64,
//             name: 'fulfillexpeditecriteria',
//             responsive: 7,
//             width: '3%',
//         },
//         {
//             label: 'safetyreportid',
//             minWidth: 64,
//             name: 'safetyreportid',
//             responsive: 1,
//             width: '5%',
//         },
//         {
//             label: 'companynumb',
//             minWidth: 64,
//             name: 'companynumb',
//             width: '4%',
//         },
//         {
//             label: 'reaction',
//             name: 'reaction',
//             responsive: 2,
//             width: '4%',
//         },
//         {
//             label: 'patientonsetage',
//             minWidth: 64,
//             name: 'patientonsetage',
//             width: '3%',
//         },
//         {
//             label: 'patientsex',
//             minWidth: 64,
//             name: 'patientsex',
//             responsive: 3,
//             width: '3%',
//         },
//         {
//             label: 'patientonsetageunit',
//             minWidth: 64,
//             name: 'patientonsetageunit',
//             responsive: 3,
//             width: '2%',
//         },
//         {
//             label: 'drug',
//             minWidth: 64,
//             name: 'drug',
//             responsive: 4,
//             width: '2%',
//         },
//         {
//             label: 'senderorganization',
//             minWidth: 64,
//             name: 'senderorganization',
//             width: '2%',
//         },
//         {
//             label: 'qualification',
//             minWidth: 64,
//             name: 'qualification',
//             responsive: 5,
//             width: '3%',
//         },
//     ] as IDejaGridColumn[];

//     protected tabIndex = 1;
//     protected drugCounts = 0;

//     private drugsBigRecord$: Observable<IDrug[]>;
//     private drugs$: Observable<IDrug[]>;
//     private news$: Observable<INews[]>;
//     private groupedDrugs$: Observable<IDrug[]>;
//     private selectedItems: IItemTree[];
//     @ViewChild(DejaGridComponent) private gridComponent: DejaGridComponent;


//     constructor(private drugsService: DrugsService, newsService: NewsService) {
//         this.news$ = newsService.getNews$(1);
//     }

//     ngOnInit() {
//         this.drugCounts = 0;

//         this.drugsBigRecord$ = this.drugsService
//             .getDrugs$(null, 1)
//             // .getDrugs$(null, 10)
//             .do((drugs) => this.drugCounts += drugs.length);

//         this.drugs$ = this.drugsService.getDrugs$();

//         this.groupedDrugs$ = this.drugsService.getGroupedDrugs$();
//     }


//     protected onSelectionChanged(e: DejaGridRowsEvent) {
//         this.selectedItems = e.items;
//     }

//     protected onSelectionChanged2() {

//     }

//     protected onSelectionChanged3() {

//     }

//     protected onItemDragStart(event: IDejaDragEvent) {
//         const itm = event.dragObject as IItemTree;
//         if (itm.depth === this.gridComponent.depthMax) {
//             event.dragInfo['drug'] = event.dragObject;
//         }
//     }

//     protected onDivDragOver(event: IDejaDragEvent) {
//         if (event.dragInfo.hasOwnProperty('drug')) {
//             event.preventDefault();
//         }
//     }

//     protected onDivDropEvent(event: IDejaDragEvent) {
//         if (event.dragInfo.hasOwnProperty('drug')) {
//             (event.target as HTMLElement).innerHTML = JSON.stringify(event.dragInfo['drug']);
//             event.preventDefault();
//         }
//     }

//     protected showMoreReaction() {

//     }

//     protected onSuffixClicked() {
//         alert('Suffix button was pressed');
//     }


// }
