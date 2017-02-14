/*
 * *
 *  @license
 *  Copyright Hôpital Universitaire de Genève All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/deja-js/blob/master/LICENSE
 * /
 *
 */

import { Injectable } from "@angular/core";
import { IItemBase, ItemListService } from '../../common/core/item-list';
import { CountriesService, ICountry } from "./countries.service";

@Injectable()
export class CountriesListService extends ItemListService {
    constructor(private countriesService: CountriesService) {
        super();
    }

    // Override for lazy loading    
    protected getItemList(query?: RegExp | string, selectedItems?: IItemBase[]): Promise<IItemBase[]> {
        return new Promise<IItemBase[]>((resolved?: (result: IItemBase[]) => void, rejected?: (reason: any) => void) => {
            this.countriesService.getCountries(query as string).toPromise().then((itms) => {
                resolved(itms);
            }).catch(rejected);
        });
    }
}

