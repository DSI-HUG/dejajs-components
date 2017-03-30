import { Observable } from 'rxjs/Rx';
import { IItemBase, ItemListService } from '../../common/core/item-list';
import { CountriesService } from './countries.service';
export declare class CountriesListService extends ItemListService {
    private countriesService;
    constructor(countriesService: CountriesService);
    protected getItemList$(query?: RegExp | string): Observable<IItemBase[]>;
}
