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
import { DejaGridRowsEvent } from '../../../src/component/data-grid/data-grid-row/data-grid-rows-event';
import { DejaGridComponent } from '../../../src/component/data-grid/data-grid.component';
import { IDejaDragEvent } from '../../../src/component/dragdrop/draggable.directive';
import { INews } from '../common/news.model';
import { DrugsService, IDrug } from '../services/drugs.service';
import { NewsService } from '../services/news.service';
import { IExtendedViewPortItem } from '../tree-list/tree-list-demo';

@Component({
    // encapsulation: ViewEncapsulation.None,
    selector: 'grid-demo',
    styleUrls: ['./grid-demo.scss'],
    templateUrl: './grid-demo.html',
})
export class GridDemoComponent implements OnInit {
    protected columns = [
        {
            label: 'transmissiondateformat',
            name: 'transmissiondateformat',
            sortable: false,
            width: '79px',
        },
        {
            label: 'receiptdateformat',
            name: 'receiptdateformat',
            width: '66px',
        },
        {
            label: 'receiver',
            name: 'receiver',
            width: '0px',
        },
        {
            label: 'serious',
            name: 'serious',
            width: '57px',
        },
        {
            label: 'receivedateformat',
            name: 'receivedateformat',
            width: '71px',
        },
        {
            label: 'fulfillexpeditecriteria',
            name: 'fulfillexpeditecriteria',
            width: '59px',
        },
        {
            label: 'safetyreportid',
            name: 'safetyreportid',
            width: '99px',
        },
        {
            label: 'companynumb',
            name: 'companynumb',
            width: '183px',
        },
        {
            label: 'reaction',
            name: 'reaction',
            useCellTemplate: true,
            width: '456px',
        },
        {
            label: 'patientonsetage',
            name: 'patientonsetage',
            width: '66px',
        },
        {
            label: 'patientsex',
            name: 'patientsex',
            width: '36px',
        },
        {
            label: 'patientonsetageunit',
            name: 'patientonsetageunit',
            width: '63px',
        },
        {
            label: 'drug',
            name: 'drug',
            useCellTemplate: true,
            width: '128px',
        },
        {
            label: 'senderorganization',
            name: 'senderorganization',
            width: '130px',
        },
        {
            label: 'qualification',
            name: 'qualification',
            width: '55px',
        },
    ] as IDejaGridColumn[];

    protected percentColumns = [
        {
            label: 'transmissiondateformat',
            name: 'transmissiondateformat',
            sizeable: false,
            useCellTemplate: true,
            width: '60px',
        },
        {
            label: 'receiptdateformat',
            name: 'receiptdateformat',
            sizeable: true,
            width: '60px',
        },
        {
            label: 'receiver',
            name: 'receiver',
            width: '3%',
        },
        {
            label: 'serious',
            name: 'serious',
            width: '3%',
        },
        {
            label: 'receivedateformat',
            name: 'receivedateformat',
            width: '3%',
        },
        {
            label: 'fulfillexpeditecriteria',
            name: 'fulfillexpeditecriteria',
            width: '3%',
        },
        {
            label: 'safetyreportid',
            name: 'safetyreportid',
            width: '5%',
        },
        {
            label: 'companynumb',
            name: 'companynumb',
            width: '4%',
        },
        {
            label: 'reaction',
            name: 'reaction',
            width: '4%',
        },
        {
            label: 'patientonsetage',
            name: 'patientonsetage',
            width: '3%',
        },
        {
            label: 'patientsex',
            name: 'patientsex',
            width: '3%',
        },
        {
            label: 'patientonsetageunit',
            name: 'patientonsetageunit',
            width: '2%',
        },
        {
            label: 'drug',
            name: 'drug',
            width: '2%',
        },
        {
            label: 'senderorganization',
            name: 'senderorganization',
            width: '2%',
        },
        {
            label: 'qualification',
            name: 'qualification',
            width: '3%',
        },
    ] as IDejaGridColumn[];

    protected responsiveColumns = [
        {
            label: 'transmissiondateformat',
            name: 'transmissiondateformat',
            responsive: 0,
            sizeable: false,
            useCellTemplate: true,
            width: '60px',
        },
        {
            label: 'receiptdateformat',
            name: 'receiptdateformat',
            sizeable: true,
            width: '60px',
        },
        {
            label: 'receiver',
            minWidth: 64,
            name: 'receiver',
            width: '3%',
        },
        {
            label: 'serious',
            minWidth: 64,
            name: 'serious',
            width: '3%',
        },
        {
            label: 'receivedateformat',
            minWidth: 64,
            name: 'receivedateformat',
            width: '3%',
        },
        {
            label: 'fulfillexpeditecriteria',
            minWidth: 64,
            name: 'fulfillexpeditecriteria',
            responsive: 7,
            width: '3%',
        },
        {
            label: 'safetyreportid',
            minWidth: 64,
            name: 'safetyreportid',
            responsive: 1,
            width: '5%',
        },
        {
            label: 'companynumb',
            minWidth: 64,
            name: 'companynumb',
            width: '4%',
        },
        {
            label: 'reaction',
            name: 'reaction',
            responsive: 2,
            width: '4%',
        },
        {
            label: 'patientonsetage',
            minWidth: 64,
            name: 'patientonsetage',
            width: '3%',
        },
        {
            label: 'patientsex',
            minWidth: 64,
            name: 'patientsex',
            responsive: 3,
            width: '3%',
        },
        {
            label: 'patientonsetageunit',
            minWidth: 64,
            name: 'patientonsetageunit',
            responsive: 3,
            width: '2%',
        },
        {
            label: 'drug',
            minWidth: 64,
            name: 'drug',
            responsive: 4,
            width: '2%',
        },
        {
            label: 'senderorganization',
            minWidth: 64,
            name: 'senderorganization',
            width: '2%',
        },
        {
            label: 'qualification',
            minWidth: 64,
            name: 'qualification',
            responsive: 5,
            width: '3%',
        },
    ] as IDejaGridColumn[];

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
            width: '250px',
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

    protected tabIndex = 1;
    protected drugCounts = 0;

    private drugsBigRecord$: Observable<IDrug[]>;
    private drugs$: Observable<IDrug[]>;
    private news$: Observable<INews[]>;
    private groupedDrugs$: Observable<IDrug[]>;
    private selectedItems: IItemTree[];
    @ViewChild(DejaGridComponent) private gridComponent: DejaGridComponent;
    @ViewChild('news') private gridNews: DejaGridComponent;

    constructor(private drugsService: DrugsService, newsService: NewsService) {
        this.news$ = newsService.getNews$(1);
    }

    ngOnInit() {
        this.drugCounts = 0;

        this.drugsBigRecord$ = this.drugsService
            .getDrugs$(null, 1)
            // .getDrugs$(null, 10)
            .do((drugs) => this.drugCounts += drugs.length);

        this.drugs$ = this.drugsService.getDrugs$();

        this.groupedDrugs$ = this.drugsService.getGroupedDrugs$();
    }


    protected onSelectionChanged(e: DejaGridRowsEvent) {
        this.selectedItems = e.items;
    }

    protected onSelectionChanged2() {

    }

    protected onSelectionChanged3() {

    }

    protected onItemDragStart(event: IDejaDragEvent) {
        const itm = event.dragObject as IItemTree;
        if (itm.depth === this.gridComponent.depthMax) {
            event.dragInfo['drug'] = event.dragObject;
        }
    }

    protected onDivDragOver(event: IDejaDragEvent) {
        if (event.dragInfo.hasOwnProperty('drug')) {
            event.preventDefault();
        }
    }

    protected onDivDropEvent(event: IDejaDragEvent) {
        if (event.dragInfo.hasOwnProperty('drug')) {
            (event.target as HTMLElement).innerHTML = JSON.stringify(event.dragInfo['drug']);
            event.preventDefault();
        }
    }

    protected onColumnSizeChanged(e: IDejaGridColumnSizeEvent) {
        if (e.column.name === 'description' || e.column.name === 'urlToImage') {
            this.gridNews.clearRowsHeight();
            this.gridNews.refreshViewPort();
        }
    }

    protected showMoreReaction() {

    }

    protected onSuffixClicked() {
        alert('Suffix button was pressed');
    }

    protected imageLoaded(item: IViewPortItem) {
        const itemExt = item as IExtendedViewPortItem;
        if (!itemExt.loaded) {
            itemExt.loaded = true;
            this.gridNews.refreshViewPort(itemExt);
        }
    }
}
