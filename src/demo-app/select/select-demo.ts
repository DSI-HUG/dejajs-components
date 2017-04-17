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

import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';
import { IItemBase, IItemTree } from '../../common/core';
import { DejaSelectComponent } from '../../component';
import { CountriesListService } from '../services/countries-list.service';
import { CountriesService, ICountry } from '../services/countries.service';
import { INews, NewsService } from '../services/news.service';
import { IViewPortItem } from './../../common/core/item-list/viewport.service';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'deja-select-demo',
    styleUrls: ['./select-demo.scss'],
    templateUrl: './select-demo.html',
})
export class SelectDemoComponent implements OnInit {
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

    private countries: Observable<ICountry[]>;
    private countriesForTemplate: ICountry[];
    private countriesForMultiselect: ICountry[];
    private groupedCountries: IItemTree[];
    private multiselectModel: IItemTree[];
    private dialogVisible = false;

    @ViewChild('dialog') private dialogWrapper: ElementRef;
    @ViewChild('news') private newsSelect: DejaSelectComponent;

    constructor(private countriesService: CountriesService, protected countriesListService: CountriesListService, newsService: NewsService) {
        this.multiselectModel = JSON.parse('[{"naqme":"ÅlandIslands","code":"AX","displayName":"ÅlandIslands","depth":0,"odd":true,"selected":true},{"naqme":"AmericanSamoa","code":"AS","displayName":"AmericanSamoa","depth":0,"odd":false,"selected":true},{"naqme":"Argentina","code":"AR","displayName":"Argentina","depth":0,"odd":false,"selected":true},{"naqme":"ChristmasIsland","code":"CX","displayName":"ChristmasIsland","depth":0,"odd":false,"selected":true},{"naqme":"Egypt","code":"EG","displayName":"Egypt","depth":0,"odd":true,"selected":true},{"naqme":"Dominica","code":"DM","displayName":"Dominica","depth":0,"odd":false,"selected":true}]');
        this.news$ = newsService.getNews$(50);
        this.bigNews$ = newsService.getNews$(10000);
        this.bigCountries$ = countriesService.getCountries$(null, 100000);
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
            const result = [] as ISelectCountry[];
            const map = {} as { [groupName: string]: ISelectCountry[] };
            value.map((country) => {
                const groupName = 'Group ' + country.naqme[0];
                if (!map[groupName]) {
                    map[groupName] = [] as IItemTree[];
                    result.push({
                        collapsible: true,
                        groupName: groupName,
                        items: map[groupName],
                        displayName: groupName,
                        selectable: false,
                    });
                }

                /*let subGroupName = 'Subgroup ' + country.naqme[1];
                 if (!map[groupName + subGroupName]) {
                 map[groupName + subGroupName] = [] as IItemTree[];
                 map[groupName].push({
                 items: map[groupName + subGroupName],
                 suGroupName: subGroupName,
                 collapsible: true,
                 });
                 }*/

                map[groupName].push(country);
            });

            this.groupedCountries = result;
        });
    }

    protected confirmUnselection() {
        return (item: IItemBase) => {
            this.dialogVisible = true;
            const self = this;
            return Observable
                .fromEvent(this.dialogWrapper.nativeElement, 'click')
                .first()
                .do(() => self.dialogVisible = false)
                .map((e: Event) => {
                    let parentElement = e.target as HTMLElement;

                    while (parentElement && parentElement !== this.dialogWrapper.nativeElement) {
                        if (parentElement.id === 'okbtn') {
                            return item;
                        }
                        parentElement = parentElement.parentElement;
                    }

                    return null;
                });
        };
    }

    @ViewChild('bigCountries')
    protected set bigCountriesSelect(select: DejaSelectComponent) {
        if (this.viewPortInfos$) {
            this.viewPortInfos$.unsubscribe();
            this.viewPortInfos = [];
            delete this.viewPortInfos$;
        }

        this.viewPortInfos$ = select && select.viewPort.viewPort$.subscribe((viewPort) => {
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
            this.newsSelect.refreshViewPort(itemExt);
        }
    }
}

interface ISelectCountry extends IItemTree {
    groupName?: string;
    suGroupName?: string;
    items?: IItemTree[];
}

interface IExtendedViewPortItem extends IViewPortItem {
    loaded: boolean;
}
