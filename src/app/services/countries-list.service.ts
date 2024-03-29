/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Injectable } from '@angular/core';
import { IItemBase, ItemListService } from '@deja-js/component/core/item-list';
import { Observable } from 'rxjs';

import { CountriesService } from './countries.service';

@Injectable()
export class CountriesListService extends ItemListService<unknown> {
    public constructor(private countriesService: CountriesService) {
        super();
    }

    // Override for lazy loading
    protected getItemList$(query?: RegExp | string): Observable<IItemBase<unknown>[]> {
        return this.countriesService.getCountries$(query as string);
    }
}
