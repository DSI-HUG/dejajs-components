/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { ChangeDetectorRef } from '@angular/core';
import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Destroy } from '@deja-js/component/core';
import { IItemBase } from '@deja-js/component/core';
import { IItemTree } from '@deja-js/component/core';
import { IViewPortItem } from '@deja-js/component/core';
import { DejaSelectComponent } from '@deja-js/component/select';
import { from, Observable, of, Subject, Subscription } from 'rxjs';
import { delay, map, take, takeUntil, tap } from 'rxjs/operators';

import { News } from '../common/news.model';
import { CountriesService, Country } from '../services/countries.service';
import { CountriesListService } from '../services/countries-list.service';
import { NewsService } from '../services/news.service';
import { cheeseValidator } from './validators';

@Component({
    selector: 'deja-select-demo',
    styleUrls: ['./select-demo.scss'],
    templateUrl: './select-demo.html'
})
export class SelectDemoComponent extends Destroy {
    @ViewChild('news') private newsSelect: DejaSelectComponent;
    @ViewChild('ondemand') private onDemandSelect: DejaSelectComponent;
    @ViewChild('onexpand') private onExpandSelect: DejaSelectComponent;

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

    // eslint-disable-next-line rxjs/finnish
    public countries: Observable<Country[]>;
    public countriesForMultiselect: Country[];
    public groupedCountries: ICountryGroup[];
    public onDemandGroupedCountries: ICountryGroup[];
    public multiselectModel: unknown[];
    public onDemandPlaceHolder = 'Open to load';
    public yellowBackgroundColorHighlight = true;

    public firstOccurenceOnly = false;
    public firstOccurencePerWordOnly = false;
    public atTheBeginningOfWordOnly = false;

    public businessCountry: Country;

    private _dialogVisible = false;

    public set dialogVisible(value: boolean) {
        this._dialogVisible = value;
        this.changeDetectorRef.markForCheck();
    }

    public get dialogVisible(): boolean {
        return this._dialogVisible;
    }

    public constructor(private changeDetectorRef: ChangeDetectorRef, private countriesService: CountriesService, public countriesListService: CountriesListService, newsService: NewsService, private fb: FormBuilder) {
        super();

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
            'Watermelon'
        ];

        this.fruits$ = of(this.fructs);

        this.countries.pipe(
            tap(value => this.countriesForMultiselect = value),
            delay(1),
            takeUntil(this.destroyed$)
        ).subscribe(() => {
            this.multiselectModel = JSON.parse('[{"naqme":"ÅlandIslands","code":"AX","displayName":"ÅlandIslands","depth":0,"odd":true,"selected":true},{"naqme":"AmericanSamoa","code":"AS","displayName":"AmericanSamoa","depth":0,"odd":false,"selected":true},{"naqme":"Argentina","code":"AR","displayName":"Argentina","depth":0,"odd":false,"selected":true},{"naqme":"ChristmasIsland","code":"CX","displayName":"ChristmasIsland","depth":0,"odd":false,"selected":true},{"naqme":"Egypt","code":"EG","displayName":"Egypt","depth":0,"odd":true,"selected":true},{"naqme":"Dominica","code":"DM","displayName":"Dominica","depth":0,"odd":false,"selected":true}]');
        });

        this.countries.pipe(
            takeUntil(this.destroyed$)
        ).subscribe((value: Country[]) => {
            const result = [] as ICountryGroup[];
            const onDemandResult = [] as ICountryGroup[];
            const dic = {} as { [groupName: string]: ISelectCountry[] };

            result.push({
                collapsible: true,
                collapsed: true,
                groupName: 'EmptyGroup',
                items: [],
                displayName: 'Empty Group',
                selectable: false
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
                        selectable: true
                    } as ICountryGroup);

                    onDemandResult.push({
                        collapsible: true,
                        collapsed: true,
                        groupName: groupName,
                        items: [{
                            displayName: 'loading...',
                            selectable: false
                        }],
                        naqme: groupName,
                        selectable: false,
                        loaded: false
                    } as ICountryGroup);
                }

                dic[groupName].push({ model: country });
            });

            this.groupedCountries = result;
            this.onDemandGroupedCountries = onDemandResult;
        });

        this.fruitForm = this.fb.group({
            fruitName: ['', [cheeseValidator]]
        });
        this.fruitFormModels = this.fb.group({
            fruitName: ['']
        });
    }

    public loadingItems(): (_query: string | RegExp, _selectedItems: IItemBase<unknown>[]) => Observable<Country[]> {
        return (_query: string | RegExp, _selectedItems: IItemBase<unknown>[]) => {
            this.onDemandSelect.waiter = true;
            this.onDemandPlaceHolder = 'loading...';
            return this.countriesService.getCountries$().pipe(
                delay(3000),
                tap(() => {
                    this.onDemandSelect.waiter = false;
                    this.onDemandPlaceHolder = 'Selected a country';
                }));
        };
    }

    public collapsingItems(): (item: IItemBase<unknown>) => Observable<IItemBase<unknown>> {
        return (item: IItemBase<unknown>) => {
            const country = item as ICountryGroup;
            return country.loaded ? of(item) : this.confirmDialog()(item);
        };
    }

    public expandingItems(): (item: IItemBase<unknown>) => Observable<unknown> {
        return (item: IItemBase<unknown>) => {
            const group = item as ICountryGroup;
            if (group.loaded) {
                return of(item);
            } else if (confirm('Please confirm your operation!')) {
                of(group).pipe(
                    delay(2000),
                    take(1),
                    takeUntil(this.destroyed$)
                ).subscribe(grp => {
                    // Simulate asynchronous load
                    const original = this.groupedCountries.find(c => c.displayName === grp.displayName);
                    grp.items = original.items;
                    grp.loaded = true;
                    this.onExpandSelect.refresh();
                });

                return of(item);
            } else {
                return of(null);
            }
        };
    }

    public confirmDialogWithPromise(): (item: IItemBase<unknown>) => Promise<IItemBase<unknown>> {
        // eslint-disable-next-line rxjs/no-topromise
        return (item: IItemBase<unknown>) => this.confirmDialog()(item).toPromise();
    }

    public confirmDialog(): (item: IItemBase<unknown>) => Observable<IItemBase<unknown>> {
        return (item: IItemBase<unknown>) => {
            this.dialogVisible = true;
            return from(this.dialogResponse$).pipe(
                take(1),
                map(response => {
                    this.dialogVisible = false;
                    return response === 'ok' ? item : null;
                }));
        };
    }

    @ViewChild('bigCountries')
    public set bigCountriesSelect(select: DejaSelectComponent) {
        if (this.viewPortInfos$) {
            this.viewPortInfos$.unsubscribe();
            this.viewPortInfos = [];
            delete this.viewPortInfos$;
        }

        this.viewPortInfos$ = select?.viewPort.viewPort$.pipe(
            takeUntil(this.destroyed$)
        ).subscribe(viewPort => {
            this.viewPortInfos = [
                { name: 'beforeSize', value: String(viewPort.beforeSize) },
                { name: 'startIndex', value: String(viewPort.startIndex) },
                { name: 'viewPortSize', value: String(viewPort.viewPortSize) },
                { name: 'visibleCount', value: String(viewPort.visibleItems?.length) },
                { name: 'endIndex', value: String(viewPort.endIndex) },
                { name: 'afterSize', value: String(viewPort.afterSize) },
                { name: 'itemsCount', value: String(viewPort.items?.length) }
            ];
        });
    }

    public imageLoaded(item: IViewPortItem): void {
        const itemExt = item as IExtendedViewPortItem;
        if (!itemExt.loaded) {
            itemExt.loaded = true;
            this.newsSelect.refreshViewPort(itemExt);
        }
    }

}

interface ISelectCountry extends IItemTree<unknown> {
    items?: IItemTree<unknown>[];
}

interface ICountryGroup extends ISelectCountry {
    groupName?: string;
    items: IItemBase<unknown>[];
    loaded?: boolean;
}

interface IExtendedViewPortItem extends IViewPortItem {
    loaded: boolean;
}
