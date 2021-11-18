/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */
import { ChangeDetectorRef, Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Destroy } from '@deja-js/component/core';
import { GroupingService } from '@deja-js/component/core/item-list';
import { Item, SortInfos, SortingService } from '@deja-js/component/v2/item-list';
import { DropCursorInfos, MouseDraggableContext, MouseDroppableContext } from '@deja-js/component/v2/mouse-dragdrop';
import { TreeListComponent } from '@deja-js/component/v2/tree-list';
import { ViewPortItem } from '@deja-js/component/v2/viewport';
import { BehaviorSubject, combineLatestWith, delay, filter, groupBy, map, mergeMap, Observable, of, range, reduce, shareReplay, Subject, Subscription, switchMap, take, takeUntil, tap, toArray, withLatestFrom } from 'rxjs';

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
    providers: [CountriesListService],
    encapsulation: ViewEncapsulation.None,
    selector: 'tree-list-demo',
    styleUrls: ['./tree-list-demo.scss'],
    templateUrl: './tree-list-demo.html'
})
export class TreeListDemoComponent extends Destroy {
    @ViewChild('news') private newsList: TreeListComponent<News>;
    @ViewChild('onexpand') private onExpandList: TreeListComponent<unknown>;

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
    public itemExpand$ = new Subject<CountryGroupItem>();
    public sortCountries$ = new BehaviorSubject<void>(undefined);
    public sortInfos$: Observable<SortInfos>;
    public numbers: number[];

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
    public sortedCountries$: Observable<Country[]>;
    public bigCountries$: Observable<Country[]>;
    public viewPortInfos: {
        name: string;
        value: string;
    }[];

    public bigNews$: Observable<News[]>;

    public viewPortInfos$: Subscription;
    public dialogResponse$: Subject<string> = new Subject<string>();
    public loremList$: Observable<Item<unknown>[]>;

    public sortInfos = {
        name: 'naqme'
    } as SortInfos;

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
        public sortingService: SortingService,
        private fb: FormBuilder
    ) {
        super();
        this.multiselectModel = JSON.parse('[{"naqme":"ÅlandIslands","code":"AX","label":"ÅlandIslands","depth":0,"odd":true,"selected":true},{"naqme":"AmericanSamoa","code":"AS","label":"AmericanSamoa","depth":0,"odd":false,"selected":true},{"naqme":"Argentina","code":"AR","label":"Argentina","depth":0,"odd":false,"selected":true},{"naqme":"ChristmasIsland","code":"CX","label":"ChristmasIsland","depth":0,"odd":false,"selected":true},{"naqme":"Egypt","code":"EG","label":"Egypt","depth":0,"odd":true,"selected":true},{"naqme":"Dominica","code":"DM","label":"Dominica","depth":0,"odd":false,"selected":true}]') as Country[];
        this.news$ = newsService.getNews$(50);
        this.bigCountries$ = countriesService.getCountries$(null, 100000);

        const bigNews$ = newsService.getNews$(10000).pipe(
            shareReplay({ bufferSize: 1, refCount: false })
        );

        this.bigNews$ = bigNews$.pipe(
            shareReplay({ bufferSize: 1, refCount: false })
        );

        this.loremList$ = range(0, 50).pipe(
            map(value => {
                const rand = Math.floor(Math.random() * (70 - 33 + 1)) + 33; // random de 33 à 70
                const item = new Item<unknown>(value.toString(), `${value} - Une ligne de test avec une taille de : ${rand}`);
                item.size = rand;
                return item;
            }),
            groupBy(p => p.size, { element: p => p }),
            mergeMap(group$ => group$.pipe(reduce((item, child) => {
                if (!item.items) {
                    item.label = child.label;
                    item.items = new Array<Item<unknown>>();
                }
                item.items.push(child);
                return item;
            }, new Item<unknown>()))),
            toArray(),
            shareReplay({ bufferSize: 1, refCount: false })
        );

        this.country = new Country();
        this.country.code = 'CH';
        this.country.displayName = 'Switzerland';
        this.country.naqme = 'Switzerland';
        this.country.color = 'rgb(211, 47, 47)';

        this.countries$ = this.countriesService.getCountries$();

        this.countryItems$ = this.countries$.pipe(
            map(countries => countries.map(country => new Item<Country>(country.code, country.naqme, country))),
            shareReplay({ bufferSize: 1, refCount: false })
        );

        this.sortInfos$ = this.sortCountries$.pipe(
            map(() => {
                this.sortInfos.order = this.sortInfos.order === 'ascending' ? 'descending' : 'ascending';
                return this.sortInfos;
            }),
            shareReplay({ bufferSize: 1, refCount: false })
        );

        this.sortedCountries$ = this.countries$.pipe(
            combineLatestWith(this.sortInfos$),
            map(([countries, sortInfos]) => sortingService.sort(countries, sortInfos)),
            shareReplay({ bufferSize: 1, refCount: false })
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
            toArray(),
            shareReplay({ bufferSize: 1, refCount: false })
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
            this.multiselectModel = JSON.parse('[{"naqme":"ÅlandIslands","code":"AX","label":"ÅlandIslands","depth":0,"odd":true,"selected":true},{"naqme":"AmericanSamoa","code":"AS","label":"AmericanSamoa","depth":0,"odd":false,"selected":true},{"naqme":"Argentina","code":"AR","label":"Argentina","depth":0,"odd":false,"selected":true},{"naqme":"ChristmasIsland","code":"CX","label":"ChristmasIsland","depth":0,"odd":false,"selected":true},{"naqme":"Egypt","code":"EG","label":"Egypt","depth":0,"odd":true,"selected":true},{"naqme":"Dominica","code":"DM","label":"Dominica","depth":0,"odd":false,"selected":true}]') as Country[];
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
                    const firstLetter = country.naqme[0];
                    const groupName = `Group ${firstLetter}`;
                    if (!countryMap[groupName]) {
                        countryMap[groupName] = [] as CountryGroupItem[];
                        const item = new CountryGroupItem(undefined, groupName);
                        item.collapsible = true;
                        item.items = countryMap[groupName];
                        item.selectable = false;
                        item.firstLetter = firstLetter;
                        res.push(item);
                    }

                    countryMap[groupName].push(new Item(country.code, country.naqme, country));
                    return res;
                }, result);
            }),
            shareReplay({ bufferSize: 1, refCount: false })
        );

        this.onDemandGroupedCountryItems$ = this.countries$.pipe(
            map(countries => {
                const countryMap = {} as { [groupName: string]: Item<Country>[] };

                return countries.reduce((result, country) => {
                    const firstLetter = country.naqme[0];
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
                        item.firstLetter = firstLetter;
                        result.push(item);
                    }

                    countryMap[groupName].push(new Item(country.code, country.naqme, country));
                    return result;
                }, [] as CountryGroupItem[]);
            }),
            shareReplay({ bufferSize: 1, refCount: false })
        );

        this.fruitForm = this.fb.group({
            fruitName: ['', [cheeseValidator]]
        });

        this.fruitFormModels = this.fb.group({
            fruitName: ['']
        });

        this.itemExpand$.pipe(
            delay(1000),
            withLatestFrom(this.countries$),
            takeUntil(this.destroyed$)
        ).subscribe(([item, countries]) => {
            item.loaded = true;
            item.items = countries.filter(country => country.naqme.startsWith(item.firstLetter)).map(country => new Item<Country>(country.code, country.displayName));
            this.onExpandList.itemService.refreshFlatItemList$.next();
        });

        this.numbers = Array.from({ length: 40 }, () => Math.floor(Math.random() * 40));
    }

    public loadingItems() {
        return (_query: string | RegExp, _selectedItems: Item<unknown>[]): Observable<Country[]> => this.countriesService.getCountries$().pipe(delay(3000));
    }

    public collapsingItem() {
        return (item: Item<Country>): Observable<Item<Country>> => {
            const countryItem = item as CountryGroupItem;
            return countryItem.loaded ? of(item) : this.confirmDialog()(item);
        };
    }

    public expandingItem() {
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

    public selectingItems() {
        return (items: Item<Country>[]): Observable<Item<Country>[]> => {
            this.dialogVisible = true;
            return this.dialogResponse$.pipe(
                take(1),
                map(response => {
                    this.dialogVisible = false;
                    return response === 'ok' ? items : null;
                }));
        };
    }

    public confirmDialog() {
        return (item: Item<Country>): Observable<Item<Country>> => {
            this.dialogVisible = true;
            return this.dialogResponse$.pipe(
                take(1),
                map(response => {
                    this.dialogVisible = false;
                    return response === 'ok' ? item : null;
                }),
                filter(itm => !!itm) // Stop observable prevent unseletion of the current selection
            );
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

    public imageLoaded(item: IExtendedViewPortItem): void {
        requestAnimationFrame(() => requestAnimationFrame(() => {
            if (!item.loaded) {
                item.loaded = true; // Loaded
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

    public getDragContext(treeList: TreeListComponent<Country>): MouseDraggableContext<Observable<Country>> {
        return {
            target: '.listitem',
            className: 'country-target-cursor',
            dragStart: dragContext => {
                const index = +dragContext.getAttribute('flat');
                return index >= 0 ? treeList.itemService.flatItemList$.pipe(
                    map(list => {
                        const item = list[index];
                        return (item && !item.items && item.model) || undefined;
                    })
                ) : undefined;
            }
        } as MouseDraggableContext<Observable<Country>>;
    }

    public getDropContext(dropArea: HTMLElement): MouseDroppableContext<Country> {
        return {
            dragEnter: () => ({
                width: 200,
                height: 40,
                className: 'country-target-cursor'
            } as DropCursorInfos),
            drop: country => {
                if (country) {
                    dropArea.innerText = `The dropped country is ${country.naqme} - the code is: ${country.code} `;
                }
            }
        } as MouseDroppableContext<Country>;
    }
}

class CountryGroupItem extends Item<Country> {
    public loaded?: boolean;
    public firstLetter?: string;
}

export interface IExtendedViewPortItem extends ViewPortItem<unknown> {
    loaded: boolean;
}
