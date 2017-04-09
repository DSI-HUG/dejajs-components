/*
 * *
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 * /
 *
 */

import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { GroupingService, IGroupInfo, IItemTree } from '../../common/core';
import { DejaTextMetricsService, DejaTreeListComponent, DejaTreeListItemsEvent, IDejaDragEvent, IDejaMouseDraggableContext, IDejaMouseDroppableContext, IDropCursorInfos } from '../../component';
import { CountriesService, ICountry } from '../services/countries.service';
import { INews, NewsService } from '../services/news.service';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'deja-tree-list-demo',
    styleUrls: ['./tree-list-demo.scss'],
    templateUrl: './tree-list-demo.html',
})
export class DejaTreeListDemoComponent implements OnInit {
    protected news$: Observable<INews[]>;
    protected groupedCountries: IItemTree[];
    protected countries: Observable<ICountry[]>;
    private selectedCountries: ICountry[];
    private selectedItemsOut: IItemTree[];
    private selectedInfos = [];
    private loremList: IItemTree[] = [];
    @ViewChild('groupedtreelist') private groupedTreeList: DejaTreeListComponent;
    @ViewChild('treeList') private treeList: DejaTreeListComponent;

    constructor(private countriesService: CountriesService,
        groupingService: GroupingService,
        private textMetricsService: DejaTextMetricsService,
        newsService: NewsService) {
        this.countries = this.countriesService.getCountries$(null, 412);
        // this.countries = this.countriesService.getCountries(null, 1);

        this.news$ = newsService.getNews$(20);

        this.countriesService.getCountries$(null, 1).subscribe((values) => {
            const extendedCountries = values.map((country) => {
                return {
                    code: country.code,
                    displayName: country.displayName,
                    groupName: country.naqme[0],
                    naqme: country.naqme,
                    subGroupName: country.naqme[0] + country.naqme[1],
                } as IExtendedCountry;
            });

            const groupInfos = [
                {
                    groupByField: 'groupName',
                }, {
                    groupByField: 'subGroupName',
                },
            ] as IGroupInfo[];

            groupingService.group(extendedCountries, groupInfos, 'children').then((groupedResult) => {
                this.groupedCountries = groupedResult;
            });
        });

        for (let i = 0; i < 50; i++) {
            const rand = Math.floor(Math.random() * (70 - 33 + 1)) + 33; // random de 33 à 70
            this.loremList[i] = {} as IItemTree;
            this.loremList[i].size = rand;
            this.loremList[i].displayName = i + ' - Une ligne de test avec une taille de : ' + rand;
        }

        groupingService.group(this.loremList, [{ groupByField: 'height' }]).then((groupedResult) => {
            this.loremList = groupedResult;
        });
    }

    public ngOnInit() {
        this.textMetricsService.getTextHeight(300, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vulputate porttitor odio, non dictum massa vehicula nec. Proin finibus ex ac ipsum euismod, vitae lobortis augue pharetra. Ut tempor eu nunc sit amet rutrum. Aliquam a maximus est, id maximus quam. Proin justo quam, laoreet at placerat eu, vestibulum eget enim.')
            .first()
            .subscribe((height: number) => {
                // tslint:disable-next-line
                console.info('La taille du lorem ipsum dans une div de 300px est de : ', height, 'px');
            });
        this.textMetricsService.metricsElem = this.treeList && this.treeList.elementRef.nativeElement as HTMLElement;
    }

    protected onSelectionChanged(e: DejaTreeListItemsEvent) {
        // Ne jamais binder la sortie et l'entree des selections sur la meme variable
        this.selectedItemsOut = e.items;
        this.selectedInfos = [];
        e.items.forEach((item) => {
            const treeItem = item as IItemTree;
            const country = item as IExtendedCountry;
            switch (treeItem.depth) {
                case 0:
                    return 'Group ' + treeItem.toString();
                case 1:
                    return 'Subgroup ' + treeItem.toString();
                default:
                    this.groupedTreeList.getParentListInfos$(item)
                        .first()
                        .subscribe((parentInfos) => {
                            const parentDisplayName = parentInfos && parentInfos.parent ? parentInfos.parent.toString() : 'none';
                            this.selectedInfos.push('Country: ' + country.naqme + ' (' + country.code + ')' + (parentInfos ? '    parent: ' + parentDisplayName + ' (' + parentInfos.index + ')' : ''));
                        });
            }
        });
    }

    protected onSelectBusinessObject(e: ICountry[]) {
        this.selectedCountries = e;
    }

    protected onItemDragStart(event: IDejaDragEvent) {
        const itm = event.dragObject as IItemTree;
        if (itm.depth === 2) {
            event.dragInfo['country'] = event.dragObject;
        }
    }

    protected onDivDragOver(event: IDejaDragEvent) {
        if (event.dragInfo.hasOwnProperty('country')) {
            event.preventDefault();
        }
    }

    protected onDivDropEvent(event: IDejaDragEvent) {
        if (event.dragInfo.hasOwnProperty('country')) {
            const country = event.dragInfo['country'] as ICountry;
            (event.target as HTMLElement).innerText = `The dropped country is ${country.naqme} - the code is: ${country.code}`;
            event.preventDefault();
        }
    }

    protected onSuffixClicked() {
        this.groupedCountries[0].$items[0].$items.push({
            code: 'te',
            displayName: 'test',
            naqme: 'te',
        } as ICountry);
        this.groupedTreeList.refresh();
    }

    protected getDragContext() {
        return {
            target: '[ddid]',
            className: 'item-base-cursor',
            dragStart: (target: HTMLElement) => {
                const id = target && target.getAttribute('ddid');
                return id && this.countriesService.getCountryByCode$(id);
            },
        } as IDejaMouseDraggableContext;
    }

    protected getDropContext(dropArea: HTMLElement) {
        return {
            dragEnter: (_dragContext) => {
                return {
                    width: 200,
                    height: 60,
                    className: 'country-target-cursor',
                } as IDropCursorInfos;
            },
            drop: (dragContext) => {
                const country = dragContext as ICountry;
                dropArea.innerText = `The dropped country is ${country.naqme} - the code is: ${country.code}`;
            },
        } as IDejaMouseDroppableContext;
    }
}

interface IExtendedCountry extends ICountry {
    groupName: string;
    subGroupName: string;
}
