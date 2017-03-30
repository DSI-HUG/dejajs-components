import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { IItemBase, ItemListService } from '../../common/core/item-list';
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
