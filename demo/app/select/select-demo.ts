/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { ChangeDetectorRef, Component, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { IItemBase } from '../../../src/common/core/item-list/item-base';
import { IItemTree } from '../../../src/common/core/item-list/item-tree';
import { IViewPortItem } from '../../../src/common/core/item-list/viewport.service';
import { DejaSelectComponent } from '../../../src/component/select/select.component';
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

    protected disabled: boolean;
    protected country: Country;
    public tabIndex = 1;
    protected news$: Observable<News[]>;
    protected bigNews$: Observable<News[]>;
    protected bigCountries$: Observable<Country[]>;
    protected viewPortInfos: {
        name: string;
        value: string;
    }[];
    protected viewPortInfos$: Subscription;
    protected dialogResponse$: Subject<string> = new Subject<string>();
    protected readonlyMultiSelect = false;
    protected disableMultiSelect = false;
    protected fruitForm: FormGroup;
    protected fruitFormModels: FormGroup;
    protected fruits$: Observable<string[]>;

    private countries: Observable<Country[]>;
    private countriesForMultiselect: Country[];
    private groupedCountries: ICountryGroup[];
    public onDemandGroupedCountries: ICountryGroup[];
    public multiselectModel: IItemTree[];
    private _dialogVisible = false;
    public onDemandPlaceHolder = 'Open to load';
    private subscriptions = [] as Subscription[];

    @ViewChild('news') private newsSelect: DejaSelectComponent;
    @ViewChild('ondemand') private onDemandSelect: DejaSelectComponent;
    @ViewChild('onexpand') private onExpandSelect: DejaSelectComponent;

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

        this.fruits$ = Observable.of(this.fructs);

        this.subscriptions.push(this.countries
            .do((value) => this.countriesForMultiselect = value)
            .delay(1)
            .subscribe(() => {
                this.multiselectModel = JSON.parse('[{"naqme":"ÅlandIslands","code":"AX","displayName":"ÅlandIslands","depth":0,"odd":true,"selected":true},{"naqme":"AmericanSamoa","code":"AS","displayName":"AmericanSamoa","depth":0,"odd":false,"selected":true},{"naqme":"Argentina","code":"AR","displayName":"Argentina","depth":0,"odd":false,"selected":true},{"naqme":"ChristmasIsland","code":"CX","displayName":"ChristmasIsland","depth":0,"odd":false,"selected":true},{"naqme":"Egypt","code":"EG","displayName":"Egypt","depth":0,"odd":true,"selected":true},{"naqme":"Dominica","code":"DM","displayName":"Dominica","depth":0,"odd":false,"selected":true}]');
            }));

        this.subscriptions.push(this.countries
            .subscribe((value: Country[]) => {
                const result = [] as ICountryGroup[];
                const onDemandResult = [] as ICountryGroup[];
                const map = {} as { [groupName: string]: ISelectCountry[] };

                result.push({
                    collapsible: true,
                    collapsed: true,
                    groupName: 'EmptyGroup',
                    items: [],
                    displayName: 'Empty Group',
                    selectable: false,
                } as ICountryGroup);

                value.map((country) => {
                    const groupName = `Group${country.naqme[0]}`;
                    if (!map[groupName]) {
                        map[groupName] = [] as ICountryGroup[];
                        result.push({
                            collapsible: true,
                            groupName: groupName,
                            items: map[groupName],
                            displayName: groupName,
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
                            displayName: groupName,
                            selectable: false,
                            loaded: false,
                        } as ICountryGroup);
                    }

                    map[groupName].push({ model: country });
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
            return self.countriesService.getCountries$()
                .delay(3000)
                .do(() => {
                    self.onDemandSelect.waiter = false;
                    self.onDemandPlaceHolder = 'Selected a country';
                });
        };
    }

    protected collapsingItems() {
        const self = this;
        return (item: IItemBase) => {
            const country = item as ICountryGroup;
            return country.loaded ? Observable.of(item) : self.confirmDialog()(item);
        };
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
                                this.onExpandSelect.refresh();
                            });

                        return Observable.of(itm);
                    });
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
            return Observable.from(this.dialogResponse$)
                .first()
                .map((response) => {
                    self.dialogVisible = false;
                    return response === 'ok' ? item : null;
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
