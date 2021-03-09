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
import { ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Destroy } from '@deja-js/component/core';
import { GroupingService } from '@deja-js/component/core';
import { IViewPortItem } from '@deja-js/component/core';
import { IDejaDragEvent } from '@deja-js/component/dragdrop';
import { IDejaMouseDraggableContext, IDejaMouseDroppableContext, IDropCursorInfos } from '@deja-js/component/mouse-dragdrop';
import { Item } from '@deja-js/component/v2/item-list';
import { TreeListComponent } from '@deja-js/component/v2/tree-list';
import { from, Observable, of, range, Subject, Subscription } from 'rxjs';
import { delay, groupBy, map, mergeMap, reduce, switchMap, take, takeUntil, tap, toArray, withLatestFrom } from 'rxjs/operators';

import { News } from '../../common/news.model';
import { cheeseValidator } from '../../select/validators';
import { CountriesService, Country } from '../../services/countries.service';
import { CountriesListService } from '../../services/countries-list.service';
import { Folder, FoldersService } from '../../services/folders.service';
import { NewsService } from '../../services/news.service';

interface DeepCountry {
    l1: {
        l2: {
            name: string;
            value: string;
        };
    };
}

interface ViewPortInfo {
    name: string;
    value: string;
}

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'tree-list-demo',
    styleUrls: ['./tree-list-demo.scss'],
    templateUrl: './tree-list-demo.html'
})
export class TreeListDemoComponent extends Destroy {
    @ViewChild('news') private newsList: TreeListComponent<News>;
    // @ViewChild('onexpand') private onExpandList: TreeListComponent<unknown>;

    public fruct = 'Apricots';
    public fructs = [] as string[];
    public fructItems = [] as Item<unknown>[];
    public fructItemsWithPreSelection = [] as Item<unknown>[];
    public folders: Folder[];
    public ensureIndex: number;
    public tabIndex = 1;
    public deepCountries$: Observable<DeepCountry[]>;
    public countriesForMultiselect: Country[];
    public multiselectModel: Country[];
    public fruitForm: FormGroup;
    public fruitFormModels: FormGroup;
    public fruits$: Observable<string[]>;
    public countries$: Observable<Country[]>;
    public countryItems$: Observable<Item<Country>[]>;
    public groupedCountryItems$: Observable<CountryGroupItem[]>;
    public onDemandGroupedCountryItems$: Observable<CountryGroupItem[]>;

    public disabled: boolean;
    public country: Country;
    public deepCountry: DeepCountry = {
        l1: {
            l2: {
                name: 'Switzerland',
                value: 'CH'
            }
        }
    };

    public news$: Observable<News[]>;
    public bigNews$: Observable<News[]>;
    public bigCountries$: Observable<Country[]>;
    public viewPortInfos: {
        name: string;
        value: string;
    }[];

    public viewPortInfos$: Subscription;
    public dialogResponse$: Subject<string> = new Subject<string>();
    public loremList$: Observable<Item<unknown>[]>;

    private _dialogVisible = false;

    public set dialogVisible(value: boolean) {
        this._dialogVisible = value;
        this.changeDetectorRef.markForCheck();
    }

    public get dialogVisible(): boolean {
        return this._dialogVisible;
    }

    public constructor(
        private changeDetectorRef: ChangeDetectorRef,
        private countriesService: CountriesService,
        private folderService: FoldersService,
        public countriesListService: CountriesListService,
        public newsService: NewsService,
        public groupingService: GroupingService,
        private fb: FormBuilder
    ) {
        super();
        this.multiselectModel = JSON.parse('[{"naqme":"ÅlandIslands","code":"AX","label":"ÅlandIslands","depth":0,"odd":true,"selected":true},{"naqme":"AmericanSamoa","code":"AS","label":"AmericanSamoa","depth":0,"odd":false,"selected":true},{"naqme":"Argentina","code":"AR","label":"Argentina","depth":0,"odd":false,"selected":true},{"naqme":"ChristmasIsland","code":"CX","label":"ChristmasIsland","depth":0,"odd":false,"selected":true},{"naqme":"Egypt","code":"EG","label":"Egypt","depth":0,"odd":true,"selected":true},{"naqme":"Dominica","code":"DM","label":"Dominica","depth":0,"odd":false,"selected":true}]');
        this.news$ = newsService.getNews$(50);
        this.bigNews$ = newsService.getNews$(10000);
        this.bigCountries$ = countriesService.getCountries$(null, 100000);

        this.loremList$ = range(0, 50).pipe(
            map(value => {
                const rand = Math.floor(Math.random() * (70 - 33 + 1)) + 33; // random de 33 à 70
                const item = new Item<unknown>(value.toString(), `${value} - Une ligne de test avec une taille de : ${rand}`);
                item.size = rand;
                return item;
            }),
            groupBy(p => p.size, p => p),
            mergeMap(group$ => group$.pipe(reduce((item, child) => {
                if (!item.items) {
                    item.label = child.label;
                    item.items = new Array<Item<unknown>>();
                }
                item.items.push(child);
                return item;
            }, new Item<unknown>()))),
            toArray()
        );

        this.country = new Country();
        this.country.code = 'CH';
        this.country.displayName = 'Switzerland';
        this.country.naqme = 'Switzerland';
        this.country.color = 'rgb(211, 47, 47)';

        this.countries$ = this.countriesService.getCountries$();

        this.countryItems$ = this.countries$.pipe(
            map(countries => countries.map(country => new Item<Country>(country.code, country.naqme, country)))
        );

        this.folders = this.folderService.getFolders();

        this.deepCountries$ = this.countriesService.getCountries$().pipe(
            switchMap(countries => countries),
            map(country => ({
                l1: {
                    l2: {
                        name: country.naqme,
                        value: country.code
                    }
                }
            } as DeepCountry)),
            toArray()
        );

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

        this.fructItems = this.fructs.map(fruct => new Item<string>(fruct.toLowerCase(), fruct));

        this.fructItemsWithPreSelection = this.fructs.map((fruct, index) => {
            const item = new Item<string>(fruct.toLowerCase(), fruct);
            item.selected = index === 1;
            return item;
        });

        this.countries$.pipe(
            tap(value => this.countriesForMultiselect = value),
            delay(1),
            takeUntil(this.destroyed$)
        ).subscribe(() => {
            this.multiselectModel = JSON.parse('[{"naqme":"ÅlandIslands","code":"AX","label":"ÅlandIslands","depth":0,"odd":true,"selected":true},{"naqme":"AmericanSamoa","code":"AS","label":"AmericanSamoa","depth":0,"odd":false,"selected":true},{"naqme":"Argentina","code":"AR","label":"Argentina","depth":0,"odd":false,"selected":true},{"naqme":"ChristmasIsland","code":"CX","label":"ChristmasIsland","depth":0,"odd":false,"selected":true},{"naqme":"Egypt","code":"EG","label":"Egypt","depth":0,"odd":true,"selected":true},{"naqme":"Dominica","code":"DM","label":"Dominica","depth":0,"odd":false,"selected":true}]');
        });

        this.groupedCountryItems$ = this.countries$.pipe(
            map(countries => {
                const countryMap = {} as { [groupName: string]: Item<Country>[] };
                const result = [] as CountryGroupItem[];

                const emptyGroupItem = new CountryGroupItem(undefined, 'EmptyGroup');
                emptyGroupItem.collapsible = true;
                emptyGroupItem.collapsed = true;
                emptyGroupItem.items = [];
                emptyGroupItem.selectable = false;
                result.push(emptyGroupItem);

                return countries.reduce((res, country) => {
                    const groupName = `Group ${country.naqme[0]}`;
                    if (!countryMap[groupName]) {
                        countryMap[groupName] = [] as CountryGroupItem[];
                        const item = new CountryGroupItem(undefined, groupName);
                        item.collapsible = true;
                        item.items = countryMap[groupName];
                        item.selectable = false;
                        res.push(item);
                    }

                    countryMap[groupName].push(new Item(country.code, country.naqme, country));
                    return res;
                }, result);
            })
        );

        this.onDemandGroupedCountryItems$ = this.countries$.pipe(
            map(countries => {
                const countryMap = {} as { [groupName: string]: Item<Country>[] };

                return countries.reduce((result, country) => {
                    const groupName = `Group ${country.naqme[0]}`;
                    if (!countryMap[groupName]) {
                        countryMap[groupName] = [] as CountryGroupItem[];

                        const loadingItem = new CountryGroupItem(undefined, 'loading...');
                        loadingItem.selectable = false;

                        const item = new CountryGroupItem(undefined, groupName);
                        item.collapsible = true;
                        item.collapsed = true;
                        item.items = [loadingItem];
                        item.selectable = false;
                        item.loaded = false;
                        result.push(item);
                    }

                    countryMap[groupName].push(new Item(country.code, country.naqme, country));
                    return result;
                }, [] as CountryGroupItem[]);
            })
        );

        this.fruitForm = this.fb.group({
            fruitName: ['', [cheeseValidator]]
        });

        this.fruitFormModels = this.fb.group({
            fruitName: ['']
        });
    }

    public loadingItems() {
        return (_query: string | RegExp, _selectedItems: Item<unknown>[]): Observable<Country[]> => this.countriesService.getCountries$().pipe(delay(3000));
    }

    public collapsingItems() {
        return (item: Item<Country>): Observable<Item<Country>> => {
            const countryItem = item as CountryGroupItem;
            return countryItem.loaded ? of(item) : this.confirmDialog()(item);
        };
    }

    public expandingItems() {
        return (item: Item<Country>): Observable<Item<Country>> => {
            const group = item as CountryGroupItem;
            if (group.loaded) {
                return of(item);
            } else {
                return this.confirmDialog()(item).pipe(
                    switchMap(itm => {
                        if (!itm) {
                            return of(null as Item<Country>);
                        }

                        of(group).pipe(
                            delay(2000),
                            take(1),
                            withLatestFrom(this.groupedCountryItems$),
                            takeUntil(this.destroyed$)
                        ).subscribe(([grp, groupedCountryItems]) => {
                            // Simulate asynchronous load
                            const original = groupedCountryItems.find(c => c.label === grp.label);
                            grp.items = original.items;
                            grp.loaded = true;
                            // this.onExpandList.refresh();
                        });

                        return of(itm);
                    })
                );
            }
        };
    }

    public confirmDialog() {
        return (item: Item<Country>): Observable<Item<Country>> => {
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
    public set bigCountriesList(treelist: TreeListComponent<unknown>) {
        if (this.viewPortInfos$) {
            this.viewPortInfos$.unsubscribe();
            this.viewPortInfos = [];
            delete this.viewPortInfos$;
        }

        // eslint-disable-next-line rxjs-angular/prefer-takeuntil
        this.viewPortInfos$ = treelist?.viewPort$.subscribe(viewPort => {
            this.viewPortInfos = [
                { name: 'beforeSize', value: String(viewPort.beforeSize) },
                { name: 'startIndex', value: String(viewPort.startIndex) },
                { name: 'viewPortSize', value: String(viewPort.viewPortSize) },
                { name: 'visibleCount', value: String(viewPort.visibleItems?.length) },
                { name: 'endIndex', value: String(viewPort.endIndex) },
                { name: 'afterSize', value: String(viewPort.afterSize) },
                { name: 'itemsCount', value: String(viewPort.items?.length) }
            ] as ViewPortInfo[];
        });
    }

    public imageLoaded(item: IViewPortItem<News>): void {
        requestAnimationFrame(() => requestAnimationFrame(() => {
            if (!item.model.imageLoaded) {
                item.model.imageLoaded = true; // Loaded
                item.size = undefined;
                this.newsList.refreshViewPort();
            }
        }));
    }

    public multiselectModelChange(countries: Country[]): void {
        this.multiselectModel = countries || null;
    }

    public onFilterTemplateClicked(where: string): void {
        alert(`${where} clicked`);
    }

    public onItemDragStart(event: IDejaDragEvent): void {
        event.dragInfo.country = event.dragObject;
    }

    public onDivDragOver(event: IDejaDragEvent): void {
        // eslint-disable-next-line no-prototype-builtins
        if (event.dragInfo.hasOwnProperty('country')) {
            event.preventDefault();
        }
    }

    public onDivDropEvent(event: IDejaDragEvent): void {
        // eslint-disable-next-line no-prototype-builtins
        if (event.dragInfo.hasOwnProperty('country')) {
            const country = event.dragInfo.country as Country;
            (event.target as HTMLElement).innerText = `The dropped country is ${country.naqme} - the code is: ${country.code}`;
            event.preventDefault();
        }
    }

    public getDragContext(): IDejaMouseDraggableContext {
        return {
            target: '[ddid]',
            className: 'item-base-cursor',
            dragStart: (target: HTMLElement) => {
                const id = target?.getAttribute('ddid');
                return id && this.countriesService.getCountryByCode$(id);
            }
        } as IDejaMouseDraggableContext;
    }

    public getDropContext(dropArea: HTMLElement): IDejaMouseDroppableContext {
        return {
            dragEnter: _dragContext => ({
                width: 200,
                height: 60,
                className: 'country-target-cursor'
            } as IDropCursorInfos),
            drop: dragContext => {
                const country = dragContext as { naqme: string; code: string };
                dropArea.innerText = `The dropped country is ${country.naqme} - the code is: ${country.code}`;
            }
        } as IDejaMouseDroppableContext;
    }
}

class CountryGroupItem extends Item<Country> {
    public loaded?: boolean;
}

export interface IExtendedViewPortItem extends IViewPortItem<unknown> {
    loaded: boolean;
}
