import { OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { IItemBase } from '../../common/core';
import { CountriesListService } from '../services/countries-list.service';
import { CountriesService, ICountry } from '../services/countries.service';
export declare class SelectDemoComponent implements OnInit {
    private countriesService;
    protected countriesListService: CountriesListService;
    protected country: ICountry;
    protected tabIndex: number;
    private countries;
    private countriesForTemplate;
    private countriesForMultiselect;
    private groupedCountries;
    private multiselectModel;
    private dialogVisible;
    private dialogWrapper;
    constructor(countriesService: CountriesService, countriesListService: CountriesListService);
    ngOnInit(): void;
    protected confirmUnselection(): (item: IItemBase) => Observable<IItemBase>;
    private handleError(error);
}
