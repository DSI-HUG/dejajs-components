/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { inject, Injectable } from '@angular/core';
import { Item, ItemService } from '@deja-js/component/v2/item-list';
import { map, Observable } from 'rxjs';

import { CountriesService, Country } from './countries.service';

@Injectable()
export class CountriesListService extends ItemService<Country> {
    private countriesService = inject(CountriesService);

    // Override for lazy loading
    protected getItemList$(query?: RegExp | string): Observable<Item<Country>[]> {
        return this.countriesService.getCountries$(query as string).pipe(
            map(countries => countries.map(country => new Item<Country>(country.code, country.displayName, country)))
        );
    }
}
