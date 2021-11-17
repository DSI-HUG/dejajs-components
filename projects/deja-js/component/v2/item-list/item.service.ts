/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { DiacriticService } from '@deja-js/component/core/text';
import { BehaviorSubject, combineLatestWith, filter, map, mergeWith, Observable, of, ReplaySubject, shareReplay, startWith, switchMap, take, tap } from 'rxjs';

import { Item } from './item';
import { ItemComponent } from './item.component';


/** Service de gestion des listes (treelist et select).
 * Ce service permet la gestion du viewport et la gestion des caches des listes.
 * Il peut-être surchargé pour faire du lazy loading ou du paging.
 */
@Injectable()
export class ItemService<T> {
    public items$ = new ReplaySubject<Item<T>[]>(1);
    public models$ = new ReplaySubject<T[]>(1);
    public options$ = new ReplaySubject<ItemComponent[]>(1);

    public childrenField$ = new BehaviorSubject<string>('items');
    public textField$ = new BehaviorSubject<string>('label');
    public valueField$ = new BehaviorSubject<string>('value');
    public searchField$ = new BehaviorSubject<string>('searchText');
    public query$ = new BehaviorSubject<RegExp | string>('');
    public minSearchLength$ = new BehaviorSubject<number>(0);

    public itemList$: Observable<Item<T>[]>;
    public flatItemList$: Observable<Item<T>[]>;
    public refreshFlatItemList$ = new BehaviorSubject<void>(undefined);
    public filteredItemList$: Observable<Item<T>[]>;
    public refreshFilterItemList$ = new BehaviorSubject<void>(undefined);
    public visibleItemList$: Observable<Item<T>[]>;
    public refreshVisibleItemList$ = new BehaviorSubject<void>(undefined);
    public selectedItems$: Observable<Item<T>[]>;

    public selectingItems: (items: Item<T>[]) => Observable<Item<T>[]>;
    public unSelectingItems: (items: Item<T>[]) => Observable<Item<T>[]>;

    private refreshSelection$ = new BehaviorSubject<RefreshSelectionParams<T>>({});

    private previousQuery: string;

    public constructor(private diacriticService: DiacriticService) {

        const itemsFromOptions$ = this.options$.pipe(
            map(options => {
                const items = options.map(option => {
                    const item = new Item<T>(option.value, option.text);
                    item.selected = option.selected === true || option.selected === '';
                    return item;
                });
                if (items.length > 100) {
                    // eslint-disable-next-line no-debugger
                    debugger;
                    console.error('Select options with more than 100 items can have performance options. Please bind directly the items in code behind with items or models input.');
                }
                return items;
            }),
            shareReplay({ bufferSize: 1, refCount: false })
        );

        const itemsFromModels$ = this.models$.pipe(
            combineLatestWith(this.valueField$, this.textField$, this.childrenField$),
            map(([models, valueField, textField, childrenField]) => (models && models instanceof Array && this.mapToItem(models, valueField, textField, childrenField)) || []),
            shareReplay({ bufferSize: 1, refCount: false })
        );

        this.itemList$ = this.items$.pipe(
            mergeWith(itemsFromModels$, itemsFromOptions$),
            switchMap(items => {
                if (this.selectedItems$) {
                    return this.selectedItems$.pipe(
                        take(1),
                        map(selectedItems => {
                            if (selectedItems?.length) {
                                const selectedIdSet = selectedItems.reduce((set, item) => {
                                    if (item.id) {
                                        set.add(item.id);
                                    }
                                    return set;
                                }, new Set<string>());
                                items.forEach(item => {
                                    if (item.id) {
                                        item.selected = selectedIdSet.has(item.id);
                                    }
                                });
                            }
                            return items;
                        })
                    );
                }
                return of(items);
            }),
            shareReplay({ bufferSize: 1, refCount: false })
        );

        this.flatItemList$ = this.itemList$.pipe(
            combineLatestWith(this.refreshFlatItemList$),
            map(([items]) => {
                const addItems = (itms: Item<T>[], depth: number): Array<Item<T>> => itms.reduce((a, item) => {
                    item.depth = depth;
                    a.push(item);
                    if (item.items?.length) {
                        return [...a, ...addItems(item.items, depth + 1)];
                    }
                    return a;
                }, [] as Item<T>[]);
                return (items && addItems(items, 0)) || [];
            }),
            tap(() => {
                this.previousQuery = undefined;
            }),
            shareReplay({ bufferSize: 1, refCount: false })
        );

        const refreshFilterItemList$ = this.refreshFilterItemList$.pipe(
            tap(() => {
                this.previousQuery = undefined;
            })
        );

        this.filteredItemList$ = this.flatItemList$.pipe(
            combineLatestWith(this.query$, this.minSearchLength$, this.searchField$, refreshFilterItemList$),
            switchMap(([flatItemList, query, minSearchLength, searchField]) => {
                if (minSearchLength > 0 && (!query || typeof query === 'string' && query.length < minSearchLength)) {
                    this.previousQuery = null;
                    return of([] as Item<T>[]);
                }

                if (!query) {
                    return of(flatItemList);
                }

                const listToFilter$ = typeof query === 'string' && this.previousQuery && query.includes(this.previousQuery) && this.filteredItemList$ ? this.filteredItemList$ : of(flatItemList);

                this.previousQuery = typeof query === 'string' ? query : null;

                const escapeChars = (text: string): string => {
                    const specialChars = ['\\', '/', '|', '&', ';', '$', '%', '@', '"', '<', '>', '(', ')', '+'];
                    specialChars.forEach(c => text = text.replace(c, `\\${c}`));
                    return text;
                };

                // Check regexp validity
                // regExp.test(this.getTextValue(item));
                let regExp: RegExp;
                if (query) {
                    if (typeof query === 'string') {
                        try {
                            query = this.diacriticService.remove(query);
                            const escapedQuery = escapeChars(query);
                            regExp = new RegExp(escapedQuery, 'i');
                        } catch (exc) {
                            console.log('Invalid search parameters');
                        }
                    } else {
                        regExp = query;
                        if (regExp.test === undefined) {
                            regExp = undefined;
                        }
                    }
                }

                return listToFilter$.pipe(
                    take(1),
                    map(itemList => {
                        // Filter the list
                        let previousItem: Item<T>;
                        return [...itemList].reverse().filter(item => {
                            let isVisible: boolean;
                            if (item.items === undefined) {
                                // child
                                isVisible = this.itemMatch(item, searchField, regExp);
                            } else {
                                // parent
                                isVisible = this.parentItemMatch(item, previousItem, searchField, regExp);
                            }
                            if (isVisible) {
                                previousItem = item;
                            }
                            return isVisible;
                        }).reverse();
                    })
                );
            }),
            shareReplay({ bufferSize: 1, refCount: false })
        );

        this.visibleItemList$ = this.filteredItemList$.pipe(
            combineLatestWith(this.refreshVisibleItemList$),
            map(([items]) => {
                let isOdd = false;
                let hideDepth = undefined as number;
                return items.filter(item => {
                    if (hideDepth !== undefined && hideDepth <= item.depth) {
                        // hidden by parent
                        return false;
                    }
                    if (item.isVisible ?? true) {
                        if (item.collapsed) {
                            // hide all children
                            hideDepth = item.depth + 1;
                        } else {
                            // Clear children invisibility
                            hideDepth = undefined;
                        }

                        if (item.items === undefined) {
                            // child
                            isOdd = !isOdd;
                        } else {
                            // parent
                            isOdd = false;
                        }
                        item.odd = isOdd;

                        return true;
                    } else {
                        // hide all children
                        hideDepth = item.depth + 1;
                        return false;
                    }
                });
            }),
            shareReplay({ bufferSize: 1, refCount: false })
        );

        this.selectedItems$ = this.visibleItemList$.pipe(
            combineLatestWith(this.valueField$, this.refreshSelection$),
            filter(([items]) => items?.length > 0),
            switchMap(([items, valueField, refreshSelection]) => {
                const select = refreshSelection.selectItems;
                const unselect = refreshSelection.unselectItems;
                const toggle = refreshSelection.toggle;
                const checkSelectable = refreshSelection.checkSelectable;
                const selectParents = refreshSelection.selectParents;
                const selectModels = refreshSelection.selectModels;
                const selectValues = refreshSelection.selectValues;
                delete refreshSelection.selectItems;
                delete refreshSelection.unselectItems;
                delete refreshSelection.toggle;
                delete refreshSelection.checkSelectable;
                delete refreshSelection.selectParents;
                delete refreshSelection.selectModels;
                delete refreshSelection.selectValues;

                let itemsToChange: Item<T>[];

                if (unselect) {
                    const itemList = unselect === 'all' ? items : unselect;
                    itemsToChange = itemList.filter(item => {
                        item.selecting = item.selected ? false : undefined;
                        return !(item.selecting ?? true);
                    });
                } else {
                    itemsToChange = [] as Item<T>[];
                }

                if (select) {
                    if (select === 'all') {
                        itemsToChange = items.filter(item => {
                            item.selecting = ((selectParents || !item.items) && (!checkSelectable || item.isSelectable)) || item.selecting;
                            return item.selecting !== undefined;
                        });
                    } else if (select?.length) {
                        itemsToChange = [...itemsToChange, ...select.filter(item => {
                            item.selecting = (!checkSelectable || item.isSelectable) || item.selecting;
                            return item.selecting !== undefined;
                        })];
                    }
                }

                if (selectModels) {
                    itemsToChange = [...itemsToChange, ...items.filter(item => {
                        item.selecting = ((!checkSelectable || item.isSelectable) && selectModels.some(model => this.compareModels(model, item.model, valueField))) || item.selecting;
                        return item.selecting !== undefined;
                    })];
                }

                if (selectValues) {
                    itemsToChange = [...itemsToChange, ...items.filter(item => {
                        item.selecting = ((!checkSelectable || item.isSelectable) && selectValues.some(value => value === item.id)) || item.selecting;
                        return item.selecting !== undefined;
                    })];
                }

                if (toggle) {
                    toggle.forEach(item => {
                        item.selecting = !item.selected;
                        itemsToChange.push(item);
                    });
                }

                const itemsToSelect = itemsToChange.filter(item => item.selecting);
                const itemsToUnselect = itemsToChange.filter(item => !item.selecting);

                const selecting$ = itemsToSelect.length && this.selectingItems ? this.selectingItems(itemsToSelect) : of(itemsToSelect);
                return selecting$.pipe(
                    map(selectable => selectable?.forEach(item => item.selected = true)),
                    switchMap(() => itemsToUnselect.length && this.unSelectingItems ? this.unSelectingItems(itemsToUnselect) : of(itemsToUnselect)),
                    map(unselectable => {
                        unselectable?.forEach(item => item.selected = false);
                        itemsToChange.forEach(item => delete item.selecting);
                        return items.filter(item => item.selected);
                    })
                );
            }),
            startWith([] as Item<T>[]),
            shareReplay({ bufferSize: 1, refCount: false })
        );
    }

    /** Map une structure de modèles en items
     * @param mods  Modèles à évaluer.
     * @param valueField (optional) Champs à traiter comme valeur.
     * @param textField (optional) Champs à traiter comme text.
     * @param childrenField (optional) Champs à traiter comme enfants.
     * @return Structure mapée
     */
    public mapToItem(mods: T[], valueField: string, textField: string, childrenField?: string): Item<T>[] {
        return mods.map(model => {
            const item = new Item<T>();
            item.model = model;

            if (typeof model === 'string') {
                item.id = model;
                item.label = model;
            } else {
                const label = this.extractValueField(model, textField) as string;
                if (label !== undefined) {
                    item.label = label;
                }

                const id = this.extractValueField(model, valueField) as string;
                if (id !== undefined) {
                    item.id = id;
                }

                if (childrenField) {
                    const children = this.extractValueField(model, childrenField) as T[];
                    if (children && children instanceof Array) {
                        item.items = this.mapToItem(children, valueField, textField, childrenField);
                    }
                }
            }

            return item;
        });
    }

    /** Désélectionne tous les éléments sélectionnés */
    public unselectAll(): void {
        this.refreshSelection$.next({ unselectItems: 'all' });
    }

    /** Sélectionne tous les éléments */
    public selectAll(checkSelectable?: boolean): void {
        this.refreshSelection$.next({ selectItems: 'all', checkSelectable });
    }

    /** Déselectionne l'élément spécifié
     * @param item Elément à déselectionner.
     */
    public unSelectItem(item: Item<T>): void {
        this.refreshSelection$.next({ unselectItems: [item] });
    }

    /** Sélectionne l'élément spécifié
     * @param item Elément à sélectionner.
     */
    public selectItem(item: Item<T>): void {
        this.refreshSelection$.next({ selectItems: [item] });
    }

    /** Déselectionne les éléments spécifiés
     * @param items Liste des éléments à désélectionner.
     */
    public unSelectItems(items: Item<T>[]): void {
        this.refreshSelection$.next({ unselectItems: items });
    }

    /** Sélectionne les éléments spécifiés
     * @param items Liste des éléments à sélectionner.
     */
    public selectItems(items: Item<T>[]): void {
        this.refreshSelection$.next({ selectItems: items });
    }

    /** Set la selection sur les éléments spécifiés
     * @param items Liste des éléments à sélectionner.
     */
    public setSelectedItems(items: Item<T>[]): void {
        this.refreshSelection$.next({ unselectItems: 'all', selectItems: items });
    }

    /** Set la selection sur les éléments spécifiés
     * @param items Liste des modèles des éléments à sélectionner.
     */
    public setSelectedModels(models: T[]): void {
        this.refreshSelection$.next({ unselectItems: 'all', selectModels: models });
    }

    /** Set la selection sur les ids des éléments spécifiés
     * @param values Liste des ids des éléments à sélectionner.
     */
    public setSelectedValues(values: string[]): void {
        this.refreshSelection$.next({ unselectItems: 'all', selectValues: values });
    }

    /** Change l'état de sélection de l'élément spécifié.
     * @param items Liste des éléments à modifier.
     */
    public toggleSelect(items: Item<T>[]): void {
        this.refreshSelection$.next({ toggle: items });
    }

    /** Renvoie l'index de l'élément sur la liste plate corespondant à l'élément HTML spécifié
     * @return Index sur la liste plate corespondant à l'élément HTML
     */
    public getItemIndexFromHtmlElement(element: HTMLElement): number {
        // eslint-disable-next-line no-loops/no-loops
        while (element?.parentElement && element.hasAttribute && !element.hasAttribute('flat') && element.parentElement.tagName !== 'BODY') {
            element = element.parentElement;
        }

        if (!element || !element.hasAttribute('flat')) {
            return undefined;
        }

        return +element.getAttribute('flat');
    }

    /** Retourne une valeur indiquant si l'élément spécifié correspond aux critères de recherche spécifiés
     * @param item Elément à analyser.
     * @param searchField Nom du champ à utiliser pour la recherche. Le champ représenté peut-être une valeur ou une function.
     * @param regExp Expression de test sur le champs spécifié.
     * @return True si l'élément correspond aux critères de recherche.
     */
    protected itemMatch(item: Item<T>, searchField: string, regExp: RegExp): boolean {
        const indexedItem = item as IndexedItem<T>;
        const value = (searchField && indexedItem[searchField] as string) ?? item.label;
        return value && regExp.test(this.diacriticService.remove(value));
    }

    protected parentItemMatch(item: Item<T>, previousItem: Item<T>, _searchField: string, _regExp: RegExp): boolean {
        // parent, visible only if a child is visible
        return previousItem && previousItem.depth === item.depth + 1;
    }

    protected compareItems = (item1: Item<T>, item2: Item<T>): boolean => {
        const isDefined = (value: Item<T>): boolean => value !== undefined && value !== null;

        if (!isDefined(item1) || !isDefined(item2)) {
            return false;
        } else {
            const model1 = item1.model as unknown as Comparable<T>;
            const model2 = item1.model as unknown as Comparable<T>;
            if (model1?.equals) {
                return model1.equals(item2.model);
            } else if (model2?.equals) {
                return model2.equals(item1.model);
            } else if (item1.id && item2.id) {
                return item1.id === item2.id;
            } else {
                return item1.model === item2.model;
            }
        }
    };

    protected compareModels = (model1: T, model2: T, valueField: string): boolean => {
        const isDefined = (value: T): boolean => value !== undefined && value !== null;

        if (!isDefined(model1) || !isDefined(model2)) {
            return false;
        } else if (model1 === model2) {
            return true;
        } else if (Object(model1) === model1 && Object(model2) === model2) {
            const cmp1 = model1 as unknown as Comparable<T>;
            const cmp2 = model2 as unknown as Comparable<T>;
            if (cmp1?.equals) {
                return cmp1.equals(model2);
            } else if (cmp2?.equals) {
                return cmp2.equals(model1);
            } else if (valueField) {
                return this.extractValueField(model1, valueField) === this.extractValueField(model2, valueField);
            } else {
                return false;
            }
        } else {
            return false;
        }
    };

    protected extractValueField(model: T, field: string): unknown {
        const indexedModel = model as unknown as Record<string, unknown>;
        const fields = field.split('.');
        return fields.reduce((mdl, fld) => mdl[fld], indexedModel);
    }
}

interface Comparable<T> {
    equals: (model: T) => boolean;
}

interface RefreshSelectionParams<T> {
    toggle?: Item<T>[];
    selectItems?: Item<T>[] | 'all';
    checkSelectable?: boolean;
    selectParents?: boolean;
    unselectItems?: Item<T>[] | 'all';
    selectModels?: T[];
    selectValues?: string[];
}

export interface IndexedItem<T> extends Item<T>, Record<string, unknown> { }
