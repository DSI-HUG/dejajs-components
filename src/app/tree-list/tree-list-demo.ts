/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */
import { ChangeDetectorRef, Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ControlsOf, Destroy } from '@deja-js/component/core';
import { GroupingService, IItemBase, IItemTree, IViewPortItem } from '@deja-js/component/core/item-list';
import { IDejaDragEvent } from '@deja-js/component/dragdrop';
import { IDejaMouseDraggableContext, IDejaMouseDroppableContext, IDropCursorInfos } from '@deja-js/component/mouse-dragdrop';
import { DejaTreeListComponent } from '@deja-js/component/tree-list';
import { delay, map, Observable, of, Subject, Subscription, switchMap, take, takeUntil, tap, toArray } from 'rxjs';

import { News } from '../common/news.model';
import { cheeseValidator } from '../select/validators';
import { CountriesService, Country } from '../services/countries.service';
import { CountriesListService } from '../services/countries-list.service';
import { Folder, FoldersService } from '../services/folders.service';
import { NewsService } from '../services/news.service';


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

interface FruitForm {
    fruitName: string;
}

@Component({
    providers: [CountriesListService],
    encapsulation: ViewEncapsulation.None,
    selector: 'deja-tree-list-demo',
    styleUrls: ['./tree-list-demo.scss'],
    templateUrl: './tree-list-demo.html'
})
export class DejaTreeListDemoComponent extends Destroy {
    @ViewChild('news') private newsList: DejaTreeListComponent;
    @ViewChild('onexpand') private onExpandList: DejaTreeListComponent;

    public fruct = 'apricots';
    public fructs = [] as string[];
    public fructItems = [] as IItemBase<unknown>[];
    public fructItemsWithPreSelection = [] as IItemBase<unknown>[];
    public folders: Folder[];
    public ensureIndex: number;
    public tabIndex = 1;
    public deepCountries$: Observable<DeepCountry[]>;
    public countriesForMultiselect: Country[];
    public onDemandGroupedCountries: ICountryGroup[];
    public multiselectModel: IItemTree<unknown>[];
    public fruitForm: FormGroup<ControlsOf<FruitForm>>;
    public fruitFormModels: FormGroup<ControlsOf<FruitForm>>;
    public fruits$: Observable<string[]>;
    public countries$: Observable<Country[]>;
    public groupedCountries: ICountryGroup[];

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
    public loremList: IItemTree<unknown>[] = [];

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
        this.multiselectModel = JSON.parse('[{"naqme":"ÅlandIslands","code":"AX","displayName":"ÅlandIslands","depth":0,"odd":true,"selected":true},{"naqme":"AmericanSamoa","code":"AS","displayName":"AmericanSamoa","depth":0,"odd":false,"selected":true},{"naqme":"Argentina","code":"AR","displayName":"Argentina","depth":0,"odd":false,"selected":true},{"naqme":"ChristmasIsland","code":"CX","displayName":"ChristmasIsland","depth":0,"odd":false,"selected":true},{"naqme":"Egypt","code":"EG","displayName":"Egypt","depth":0,"odd":true,"selected":true},{"naqme":"Dominica","code":"DM","displayName":"Dominica","depth":0,"odd":false,"selected":true}]') as IItemTree<unknown>[];
        this.news$ = newsService.getNews$(50);
        this.bigNews$ = newsService.getNews$(10000);
        this.bigCountries$ = countriesService.getCountries$(null, 100000);

        // eslint-disable-next-line no-loops/no-loops
        for (let i = 0; i < 50; i++) {
            const rand = Math.floor(Math.random() * (70 - 33 + 1)) + 33; // random de 33 à 70
            this.loremList[i] = {} as IItemTree<unknown>;
            this.loremList[i].size = rand;
            this.loremList[i].displayName = `${i} - Une ligne de test avec une taille de : ${rand}`;
        }

        groupingService.group$(this.loremList, [{ groupByField: 'height' }]).pipe(
            takeUntil(this.destroyed$)
        ).subscribe(groupedResult => {
            this.loremList = groupedResult as IItemTree<unknown>[];
        });

        this.country = new Country();
        this.country.code = 'CH';
        this.country.displayName = 'Switzerland';
        this.country.naqme = 'Switzerland';
        this.country.color = 'rgb(211, 47, 47)';

        this.countries$ = this.countriesService.getCountries$();

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

        this.fructItems = this.fructs.map(fruct => ({
            displayName: fruct,
            value: fruct.toLowerCase()
        } as IItemBase<unknown>));

        this.fructItemsWithPreSelection = this.fructs.map((fruct, index) => ({
            displayName: fruct,
            value: fruct.toLowerCase(),
            selected: index === 1
        } as IItemBase<unknown>));

        this.countries$.pipe(
            tap(value => this.countriesForMultiselect = value),
            delay(1),
            takeUntil(this.destroyed$)
        ).subscribe(() => {
            this.multiselectModel = JSON.parse('[{"naqme":"ÅlandIslands","code":"AX","displayName":"ÅlandIslands","depth":0,"odd":true,"selected":true},{"naqme":"AmericanSamoa","code":"AS","displayName":"AmericanSamoa","depth":0,"odd":false,"selected":true},{"naqme":"Argentina","code":"AR","displayName":"Argentina","depth":0,"odd":false,"selected":true},{"naqme":"ChristmasIsland","code":"CX","displayName":"ChristmasIsland","depth":0,"odd":false,"selected":true},{"naqme":"Egypt","code":"EG","displayName":"Egypt","depth":0,"odd":true,"selected":true},{"naqme":"Dominica","code":"DM","displayName":"Dominica","depth":0,"odd":false,"selected":true}]') as IItemTree<unknown>[];
        });

        this.countries$.pipe(
            takeUntil(this.destroyed$)
        ).subscribe((value: Country[]) => {
            const result = [] as ICountryGroup[];
            const onDemandResult = [] as ICountryGroup[];
            const countryMap = {} as { [groupName: string]: ISelectCountry[] };

            result.push({
                collapsible: true,
                collapsed: true,
                groupName: 'EmptyGroup',
                items: [],
                displayName: 'Empty Group',
                selectable: false
            } as ICountryGroup);

            value.forEach(country => {
                const groupName = `Group ${country.naqme[0]}`;
                if (!countryMap[groupName]) {
                    countryMap[groupName] = [] as ICountryGroup[];
                    result.push({
                        collapsible: true,
                        groupName: groupName,
                        items: countryMap[groupName],
                        displayName: groupName,
                        selectable: false
                    } as ICountryGroup);

                    onDemandResult.push({
                        collapsible: true,
                        collapsed: true,
                        groupName: groupName,
                        items: [{
                            displayName: 'loading...',
                            selectable: false
                        }],
                        displayName: groupName,
                        selectable: false,
                        loaded: false
                    } as ICountryGroup);
                }

                countryMap[groupName].push({ model: country });
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

    public loadingItems() {
        return (_query: string | RegExp, _selectedItems: IItemBase<unknown>[]): Observable<Country[]> => this.countriesService.getCountries$().pipe(delay(3000));
    }

    public collapsingItems() {
        return (item: IItemBase<unknown>): Observable<IItemBase<unknown>> => {
            const country = item as ICountryGroup;
            return country.loaded ? of(item) : this.confirmDialog()(item);
        };
    }

    public expandingItems() {
        return (item: IItemBase<unknown>): Observable<IItemBase<unknown>> => {
            const group = item as ICountryGroup;
            if (group.loaded) {
                return of(item);
            } else {
                return this.confirmDialog()(item).pipe(
                    switchMap(itm => {
                        if (!itm) {
                            return of(null as IItemBase<unknown>);
                        }

                        of(group).pipe(
                            delay(2000),
                            take(1),
                            takeUntil(this.destroyed$)
                        ).subscribe(grp => {
                            // Simulate asynchronous load
                            const original = this.groupedCountries.find(c => c.displayName === grp.displayName);
                            grp.items = original.items;
                            grp.loaded = true;
                            this.onExpandList.refresh();
                        });

                        return of(itm);
                    })
                );
            }
        };
    }

    public confirmDialog() {
        return (item: IItemBase<unknown>): Observable<IItemBase<unknown>> => {
            this.dialogVisible = true;
            return this.dialogResponse$.pipe(
                take(1),
                map(response => {
                    this.dialogVisible = false;
                    return response === 'ok' ? item : null;
                }));
        };
    }

    @ViewChild('bigCountries')
    public set bigCountriesList(treelist: DejaTreeListComponent) {
        if (this.viewPortInfos$) {
            this.viewPortInfos$.unsubscribe();
            this.viewPortInfos = [];
            delete this.viewPortInfos$;
        }

        // eslint-disable-next-line rxjs-angular/prefer-takeuntil
        this.viewPortInfos$ = treelist?.viewPort.viewPort$.subscribe(viewPort => {
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

    public imageLoaded(item: IViewPortItem): void {
        const itemExt = item as IExtendedViewPortItem;
        if (!itemExt.loaded) {
            itemExt.loaded = true;
            itemExt.size = undefined;
            this.newsList.refreshViewPort();
        }
    }

    public multiselectModelChange(countries: Country[]): void {
        this.multiselectModel = countries ? countries : null;
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

interface ISelectCountry extends IItemTree<unknown> {
    items?: IItemTree<unknown>[];
}

interface ICountryGroup extends ISelectCountry {
    groupName?: string;
    items: IItemBase<unknown>[];
    loaded?: boolean;
}

export interface IExtendedViewPortItem extends IViewPortItem {
    loaded: boolean;
}
