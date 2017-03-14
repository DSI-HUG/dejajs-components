import { Injectable } from '@angular/core';
import { IItemBase, ItemListService } from '../../common/core/item-list';
import { CountriesService } from './countries.service';

@Injectable()
export class CountriesListService extends ItemListService {
    constructor(private countriesService: CountriesService) {
        super();
    }

    // Override for lazy loading
    protected getItemList(query?: RegExp | string): Promise<IItemBase[]> {
        return new Promise<IItemBase[]>((resolved?: (result: IItemBase[]) => void, rejected?: (reason: any) => void) => {
            this.countriesService.getCountries$(query as string).toPromise().then((itms) => {
                resolved(itms);
            }).catch(rejected);
        });
    }
}
