import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IItemBase } from '../../../src/common/core/item-list/item-base';
import { ItemListService } from '../../../src/common/core/item-list/item-list.service';
import { CountriesService } from './countries.service';

@Injectable()
export class CountriesListService extends ItemListService {
    constructor(private countriesService: CountriesService) {
        super();
    }

    // Override for lazy loading
    protected getItemList$(query?: RegExp | string): Observable<IItemBase[]> {
        return this.countriesService.getCountries$(query as string);
    }
}
