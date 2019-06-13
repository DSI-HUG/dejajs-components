/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { ChangeDetectorRef, Component, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DejaSelectComponent } from '@deja-js/component/select';
import { IItemBase, IItemTree, IViewPortItem } from '@deja-js/core';
import { from as observableFrom, Observable, of as observableOf, Subject, Subscription } from 'rxjs';
import { delay, first, map, tap } from 'rxjs/operators';
import { News } from '../common/news.model';
import { CountriesListService } from '../services/countries-list.service';
import { CountriesService, Country } from '../services/countries.service';
import { NewsService } from '../services/news.service';
import { cheeseValidator } from './validators';

@Component({
    selector: 'deja-select-demo',
    styleUrls: ['./select-demo.scss'],
    templateUrl: './select-demo.html',
})
export class SelectDemoComponent implements OnDestroy {
    public fruct = '';
    public fructs = [] as string[];

    public disabled: boolean;
    public country: Country;
    public tabIndex = 1;
    public news$: Observable<News[]>;
    public bigNews$: Observable<News[]>;
    public bigCountries$: Observable<Country[]>;
    public viewPortInfos: {
        name: string;
        value: string;
    }[];
    public viewPortInfos$: Subscription;
    public dialogResponse$: Subject<string> = new Subject<string>();
    public readonlyMultiSelect = false;
    public disableMultiSelect = false;
    public fruitForm: FormGroup;
    public fruitFormModels: FormGroup;
    public fruits$: Observable<string[]>;

    public countries: Observable<Country[]>;
    public countriesForMultiselect: Country[];
    public groupedCountries: ICountryGroup[];
    public onDemandGroupedCountries: ICountryGroup[];
    public multiselectModel: any[];
    private _dialogVisible = false;
    public onDemandPlaceHolder = 'Open to load';
    private subscriptions = [] as Subscription[];
    public yellowBackgroundColorHighlight = true;

    public firstOccurenceOnly = false;
    public firstOccurencePerWordOnly = false;
    public atTheBeginningOfWordOnly = false;

    @ViewChild('news') private newsSelect: DejaSelectComponent;
    @ViewChild('ondemand') private onDemandSelect: DejaSelectComponent;
    @ViewChild('onexpand') private onExpandSelect: DejaSelectComponent;

    public businessCountry: Country;

    public set dialogVisible(value: boolean) {
        this._dialogVisible = value;
        this.changeDetectorRef.markForCheck();
    }

    public get dialogVisible() {
        return this._dialogVisible;
    }

    constructor(private changeDetectorRef: ChangeDetectorRef, private countriesService: CountriesService, protected countriesListService: CountriesListService, newsService: NewsService, private _fb: FormBuilder) {
        this.multiselectModel = JSON.parse('[{"naqme":"ÅlandIslands","code":"AX","displayName":"ÅlandIslands","depth":0,"odd":true,"selected":true},{"naqme":"AmericanSamoa","code":"AS","displayName":"AmericanSamoa","depth":0,"odd":false,"selected":true},{"naqme":"Argentina","code":"AR","displayName":"Argentina","depth":0,"odd":false,"selected":true},{"naqme":"ChristmasIsland","code":"CX","displayName":"ChristmasIsland","depth":0,"odd":false,"selected":true},{"naqme":"Egypt","code":"EG","displayName":"Egypt","depth":0,"odd":true,"selected":true},{"naqme":"Dominica","code":"DM","displayName":"Dominica","depth":0,"odd":false,"selected":true}]');
        this.news$ = newsService.getNews$(50);
        this.bigNews$ = newsService.getNews$(10000);
        this.bigCountries$ = countriesService.getCountries$(null, 100000);

        this.country = new Country();
        this.country.code = 'CH';
        this.country.displayName = 'Switzerland';
        this.country.naqme = 'Switzerland';
        this.country.color = 'rgb(211, 47, 47)';

        this.countries = this.countriesService.getCountries$();

        this.fructs = [
            'Apricots',
            'Banana',
            'Cantaloupe',
            'Cherries',
            'Coconut',
            'Cranberries',
            'Durian',
            'Grapes',
            'Lemon',
            'Mango',
            'Pineapple',
            'Watermelon',
        ];

        this.fruits$ = observableOf(this.fructs);

        this.subscriptions.push(this.countries.pipe(
            tap((value) => this.countriesForMultiselect = value),
            delay(1), )
            .subscribe(() => {
                this.multiselectModel = JSON.parse('[{"naqme":"ÅlandIslands","code":"AX","displayName":"ÅlandIslands","depth":0,"odd":true,"selected":true},{"naqme":"AmericanSamoa","code":"AS","displayName":"AmericanSamoa","depth":0,"odd":false,"selected":true},{"naqme":"Argentina","code":"AR","displayName":"Argentina","depth":0,"odd":false,"selected":true},{"naqme":"ChristmasIsland","code":"CX","displayName":"ChristmasIsland","depth":0,"odd":false,"selected":true},{"naqme":"Egypt","code":"EG","displayName":"Egypt","depth":0,"odd":true,"selected":true},{"naqme":"Dominica","code":"DM","displayName":"Dominica","depth":0,"odd":false,"selected":true}]');
            }));

        this.subscriptions.push(this.countries
            .subscribe((value: Country[]) => {
                const result = [] as ICountryGroup[];
                const onDemandResult = [] as ICountryGroup[];
                const dic = {} as { [groupName: string]: ISelectCountry[] };

                result.push({
                    collapsible: true,
                    collapsed: true,
                    groupName: 'EmptyGroup',
                    items: [],
                    displayName: 'Empty Group',
                    selectable: false,
                } as ICountryGroup);

                value.forEach(country => {
                    const groupName = `Group${country.naqme[0]}`;
                    if (!dic[groupName]) {
                        dic[groupName] = [] as ICountryGroup[];
                        result.push({
                            collapsible: true,
                            groupName: groupName,
                            items: dic[groupName],
                            naqme: groupName,
                            selectable: true,
                        } as ICountryGroup);

                        onDemandResult.push({
                            collapsible: true,
                            collapsed: true,
                            groupName: groupName,
                            items: [{
                                displayName: 'loading...',
                                selectable: false,
                            }],
                            naqme: groupName,
                            selectable: false,
                            loaded: false,
                        } as ICountryGroup);
                    }

                    dic[groupName].push({ model: country });
                });

                this.groupedCountries = result;
                this.onDemandGroupedCountries = onDemandResult;
            }));

        this.fruitForm = this._fb.group({
            fruitName: ['', [cheeseValidator]],
        });
        this.fruitFormModels = this._fb.group({
            fruitName: [''],
        });
    }

    public ngOnDestroy() {
        this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
    }

    protected loadingItems() {
        const self = this;
        return (_query: string | RegExp, _selectedItems: IItemBase[]) => {
            self.onDemandSelect.waiter = true;
            self.onDemandPlaceHolder = 'loading...';
            return self.countriesService.getCountries$().pipe(
                delay(3000),
                tap(() => {
                    self.onDemandSelect.waiter = false;
                    self.onDemandPlaceHolder = 'Selected a country';
                }), );
        };
    }

    protected collapsingItems() {
        const self = this;
        return (item: IItemBase) => {
            const country = item as ICountryGroup;
            return country.loaded ? observableOf(item) : self.confirmDialog()(item);
        };
    }

    protected expandingItems() {
        return (item: IItemBase) => {
            const group = item as ICountryGroup;
            if (group.loaded) {
                return observableOf(item);
            } else {
                if (confirm('Please confirm your operation!')) {
                    observableOf(group).pipe(
                        delay(2000),
                        first(), )
                        .subscribe((grp) => {
                            // Simulate asynchronous load
                            const original = this.groupedCountries.find((c) => c.displayName === grp.displayName);
                            grp.items = original.items;
                            grp.loaded = true;
                            this.onExpandSelect.refresh();
                        });

                    return observableOf(item);
                } else {
                    return observableOf(null);
                }
            }
        };
    }

    protected confirmDialogWithPromise() {
        const self = this;
        return (item: IItemBase) => {
            return self.confirmDialog()(item).toPromise();
        };
    }

    protected confirmDialog() {
        const self = this;
        return (item: IItemBase) => {
            self.dialogVisible = true;
            return observableFrom(this.dialogResponse$).pipe(
                first(),
                map((response) => {
                    self.dialogVisible = false;
                    return response === 'ok' ? item : null;
                }), );
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
    items?: IItemTree[];
}

interface ICountryGroup extends ISelectCountry {
    groupName?: string;
    items: IItemBase[];
    loaded?: boolean;
}

interface IExtendedViewPortItem extends IViewPortItem {
    loaded: boolean;
}
