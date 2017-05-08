/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs/Rx';
import { GroupingService, IItemBase, IItemTree } from '../../common/core';
import { DejaTreeListComponent, IDejaDragEvent, IDejaMouseDraggableContext , IDejaMouseDroppableContext, IDropCursorInfos} from '../../component';
import { CountriesListService } from '../services/countries-list.service';
import { CountriesService, ICountry } from '../services/countries.service';
import { INews, NewsService } from '../services/news.service';
import { IViewPortItem } from './../../common/core/item-list/viewport.service';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'deja-tree-list-demo',
    styleUrls: ['./tree-list-demo.scss'],
    templateUrl: './tree-list-demo.html',
})
export class DejaTreeListDemoComponent implements OnInit {
    protected disabled: boolean;
    protected country: ICountry;
    protected tabIndex = 1;
    protected news$: Observable<INews[]>;
    protected bigNews$: Observable<INews[]>;
    protected bigCountries$: Observable<ICountry[]>;
    protected viewPortInfos: {
        name: string;
        value: string;
    }[];
    protected viewPortInfos$: Subscription;
    protected dialogResponse$: Subject<string> = new Subject<string>();
    protected businessCountries: ICountry[];
    protected loremList: IItemTree[] = [];

    private countries: Observable<ICountry[]>;
    private countriesForTemplate: ICountry[];
    private countriesForMultiselect: ICountry[];
    private groupedCountries: ICountryGroup[];
    private onDemandGroupedCountries: ICountryGroup[];
    private multiselectModel: IItemTree[];
    private _dialogVisible = false;

    @ViewChild('news') private newsList: DejaTreeListComponent;
    @ViewChild('onexpand') private onExpandList: DejaTreeListComponent;

    protected set dialogVisible(value: boolean) {
        this._dialogVisible = value;
        this.changeDetectorRef.markForCheck();
    }

    protected get dialogVisible() {
        return this._dialogVisible;
    }

    constructor(private changeDetectorRef: ChangeDetectorRef, private countriesService: CountriesService, protected countriesListService: CountriesListService, newsService: NewsService, groupingService: GroupingService) {
        this.multiselectModel = JSON.parse('[{"naqme":"ÅlandIslands","code":"AX","displayName":"ÅlandIslands","depth":0,"odd":true,"selected":true},{"naqme":"AmericanSamoa","code":"AS","displayName":"AmericanSamoa","depth":0,"odd":false,"selected":true},{"naqme":"Argentina","code":"AR","displayName":"Argentina","depth":0,"odd":false,"selected":true},{"naqme":"ChristmasIsland","code":"CX","displayName":"ChristmasIsland","depth":0,"odd":false,"selected":true},{"naqme":"Egypt","code":"EG","displayName":"Egypt","depth":0,"odd":true,"selected":true},{"naqme":"Dominica","code":"DM","displayName":"Dominica","depth":0,"odd":false,"selected":true}]');
        this.news$ = newsService.getNews$(50);
        this.bigNews$ = newsService.getNews$(10000);
        this.bigCountries$ = countriesService.getCountries$(null, 100000);

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
        this.country = {
            code: 'CH',
            displayName: 'Switzerland',
            naqme: 'Switzerland',
            color: 'rgb(211, 47, 47)',
        };

        this.countries = this.countriesService.getCountries$();

        this.countriesService.getCountries$().subscribe((value: ICountry[]) => {
            const result = [] as any[];
            value.map((s) => {
                s.toString = () => { return s.code + ' - ' + s.naqme; };
                result.push(s);
            });
            this.countriesForTemplate = result;
        });

        this.countriesService.getCountries$()
            .do((value) => this.countriesForMultiselect = value)
            .delay(1)
            .subscribe(() => {
                this.multiselectModel = JSON.parse('[{"naqme":"ÅlandIslands","code":"AX","displayName":"ÅlandIslands","depth":0,"odd":true,"selected":true},{"naqme":"AmericanSamoa","code":"AS","displayName":"AmericanSamoa","depth":0,"odd":false,"selected":true},{"naqme":"Argentina","code":"AR","displayName":"Argentina","depth":0,"odd":false,"selected":true},{"naqme":"ChristmasIsland","code":"CX","displayName":"ChristmasIsland","depth":0,"odd":false,"selected":true},{"naqme":"Egypt","code":"EG","displayName":"Egypt","depth":0,"odd":true,"selected":true},{"naqme":"Dominica","code":"DM","displayName":"Dominica","depth":0,"odd":false,"selected":true}]');
            });

        this.countriesService.getCountries$().subscribe((value: ICountry[]) => {
            const result = [] as ICountryGroup[];
            const onDemandResult = [] as ICountryGroup[];
            const map = {} as { [groupName: string]: ISelectCountry[] };
            value.map((country) => {
                const groupName = 'Group ' + country.naqme[0];
                if (!map[groupName]) {
                    map[groupName] = [] as ICountryGroup[];
                    result.push({
                        collapsible: true,
                        groupName: groupName,
                        items: map[groupName],
                        displayName: groupName,
                        selectable: false,
                    } as ICountryGroup);

                    onDemandResult.push({
                        collapsible: true,
                        collapsed: true,
                        groupName: groupName,
                        items: [{
                            displayName: 'loading...',
                            selectable: false,
                        }],
                        displayName: groupName,
                        selectable: false,
                        loaded: false,
                    } as ICountryGroup);
                }

                map[groupName].push(country);
            });

            this.groupedCountries = result;
            this.onDemandGroupedCountries = onDemandResult;
        });
    }

    protected loadingItems() {
        const self = this;
        return (_query: string | RegExp, _selectedItems: IItemBase[]) => self.countriesService.getCountries$().delay(3000);
    }

    protected collapsingItems() {
        const self = this;
        return (item: IItemBase) => {
            const country = item as ICountryGroup;
            return country.loaded ? Observable.of(item) : self.confirmDialog()(item);
        }
    }

    protected expandingItems() {
        const self = this;
        return (item: IItemBase) => {
            const group = item as ICountryGroup;
            if (group.loaded) {
                return Observable.of(item);
            } else {
                return self.confirmDialog()(item)
                    .switchMap((itm) => {
                        if (!itm) {
                            return Observable.of(null);
                        }

                        Observable.of(group)
                            .delay(2000)
                            .first()
                            .subscribe((grp) => {
                                // Simulate asynchronous load
                                const original = this.groupedCountries.find((c) => c.displayName === grp.displayName);
                                grp.items = original.items;
                                grp.loaded = true;
                                this.onExpandList.refresh();
                            })

                        return Observable.of(itm);
                    });
            }
        }
    }

    protected confirmDialogWithPromise() {
        const self = this;
        return (item: IItemBase) => {
            return self.confirmDialog()(item).toPromise();
        }
    }

    protected confirmDialog() {
        const self = this;
        return (item: IItemBase) => {
            self.dialogVisible = true;
            return Observable.from(this.dialogResponse$)
                .first()
                .map((response) => {
                    self.dialogVisible = false;
                    return response === 'ok' ? item : null;
                });
        };
    }

    @ViewChild('bigCountries')
    protected set bigCountriesList(treelist: DejaTreeListComponent) {
        if (this.viewPortInfos$) {
            this.viewPortInfos$.unsubscribe();
            this.viewPortInfos = [];
            delete this.viewPortInfos$;
        }

        this.viewPortInfos$ = treelist && treelist.viewPort.viewPort$.subscribe((viewPort) => {
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

    protected imageLoaded(item: IViewPortItem) {
        const itemExt = item as IExtendedViewPortItem;
        if (!itemExt.loaded) {
            itemExt.loaded = true;
            this.newsList.refreshViewPort(itemExt);
        }
    }

    protected businessCountryChange(country: ICountry) {
        this.businessCountries = country ? [country] : null;
    }

    protected multiselectModelChange(countries: ICountry[]) {
        this.multiselectModel = countries ? countries : null;
    }

    protected onFilterTemplateClicked(where: string) {
        alert(`${where} clicked`);
    }

    protected onItemDragStart(event: IDejaDragEvent) {
        event.dragInfo['country'] = event.dragObject;
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

interface ISelectCountry extends IItemTree {
    items?: IItemTree[];
}

interface ICountryGroup extends ISelectCountry {
    groupName?: string;
    items: IItemBase[]
    loaded?: boolean,
}

export interface IExtendedViewPortItem extends IViewPortItem {
    loaded: boolean;
}

// /*
//  *  @license
//  *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
//  *
//  *  Use of this source code is governed by an Apache-2.0 license that can be
//  *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
//  */

// import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
// import { Observable } from 'rxjs/Rx';
// import { DejaItemsEvent, GroupingService, IGroupInfo, IItemTree, IViewPortItem } from '../../common/core';
// import { DejaTextMetricsService, DejaTreeListComponent, IDejaDragEvent, IDejaMouseDraggableContext, IDejaMouseDroppableContext, IDropCursorInfos } from '../../component';
// import { CountriesListService } from '../services/countries-list.service';
// import { CountriesService, ICountry } from '../services/countries.service';
// import { INews, NewsService } from '../services/news.service';

// @Component({
//     encapsulation: ViewEncapsulation.None,
//     selector: 'deja-tree-list-demo',
//     styleUrls: ['./tree-list-demo.scss'],
//     templateUrl: './tree-list-demo.html',
// })
// export class DejaTreeListDemoComponent implements OnInit {
//     protected tabIndex = 1;
//     protected news$: Observable<INews[]>;
//     protected groupedCountries$: Observable<IItemTree[]>;
//     protected countries: Observable<ICountry[]>;
//     private selectedCountries: ICountry[];
//     private selectedItemsOut: IItemTree[];
//     private selectedInfos = [];
//     @ViewChild('groupedtreelist') private groupedTreeList: DejaTreeListComponent;
//     @ViewChild('treeList') private treeList: DejaTreeListComponent;

//     constructor(private countriesService: CountriesService,
//         protected countriesListService: CountriesListService,
//         groupingService: GroupingService,
//         private textMetricsService: DejaTextMetricsService,
//         newsService: NewsService) {
//         this.countries = this.countriesService.getCountries$(null, 10000);
//         // this.countries = this.countriesService.getCountries(null, 1);

//         this.news$ = newsService.getNews$(3000);

//         this.countriesService.getCountries$(null, 1).subscribe((values) => {
//             const extendedCountries = values.map((country) => {
//                 return {
//                     code: country.code,
//                     displayName: country.displayName,
//                     groupName: country.naqme[0],
//                     naqme: country.naqme,
//                     subGroupName: country.naqme[0] + country.naqme[1],
//                 } as IExtendedCountry;
//             });

//             const groupInfos = [
//                 {
//                     groupByField: 'groupName',
//                 }, {
//                     groupByField: 'subGroupName',
//                 },
//             ] as IGroupInfo[];

//             this.groupedCountries$ = groupingService.group$(extendedCountries, groupInfos, 'children');
//         });


//     public ngOnInit() {
//         Observable.timer(1000)
//             .map(() => this.treeList && this.treeList.elementRef.nativeElement as HTMLElement)
//             .filter((element) => !!element)
//             .do((element) => this.textMetricsService.metricsElem = element)
//             .switchMap(() => this.textMetricsService.getTextHeight(300, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vulputate porttitor odio, non dictum massa vehicula nec. Proin finibus ex ac ipsum euismod, vitae lobortis augue pharetra. Ut tempor eu nunc sit amet rutrum. Aliquam a maximus est, id maximus quam. Proin justo quam, laoreet at placerat eu, vestibulum eget enim.'))
//             .first()
//             .subscribe((height: number) => {
//                 // tslint:disable-next-line
//                 console.info('La taille du lorem ipsum dans une div de 300px est de : ', height, 'px');
//             });
//     }

//     protected onSelectionChanged(e: DejaItemsEvent) {
//         // Ne jamais binder la sortie et l'entree des selections sur la meme variable
//         this.selectedItemsOut = e.items;
//         this.selectedInfos = [];
//         e.items.forEach((item) => {
//             const treeItem = item as IItemTree;
//             const country = item as IExtendedCountry;
//             switch (treeItem.depth) {
//                 case 0:
//                     return 'Group ' + treeItem.toString();
//                 case 1:
//                     return 'Subgroup ' + treeItem.toString();
//                 default:
//                     this.groupedTreeList.getParentListInfos$(item)
//                         .first()
//                         .subscribe((parentInfos) => {
//                             const parentDisplayName = parentInfos && parentInfos.parent ? parentInfos.parent.toString() : 'none';
//                             this.selectedInfos.push('Country: ' + country.naqme + ' (' + country.code + ')' + (parentInfos ? '    parent: ' + parentDisplayName + ' (' + parentInfos.index + ')' : ''));
//                         });
//             }
//         });
//     }

//     protected onSelectBusinessObject(e: ICountry[]) {
//         this.selectedCountries = e;
//     }

//     protected imageLoaded(item: IViewPortItem) {
//         const itemExt = item as IExtendedViewPortItem;
//         if (!itemExt.loaded) {
//             itemExt.loaded = true;
//             this.treeList.refreshViewPort(itemExt);
//         }
//     }
// }

// interface IExtendedCountry extends ICountry {
//     groupName: string;
//     subGroupName: string;
// }

// interface IExtendedViewPortItem extends IViewPortItem {
//     loaded: boolean;
// }
