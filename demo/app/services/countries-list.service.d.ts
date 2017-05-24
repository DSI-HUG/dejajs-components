import { Observable } from 'rxjs/Observable';
import { IItemBase, ItemListService } from '../../index';
import { CountriesService } from './countries.service';
export declare class CountriesListService extends ItemListService {
    private countriesService;
    constructor(countriesService: CountriesService);
    protected getItemList$(query?: RegExp | string): Observable<IItemBase[]>;
}
