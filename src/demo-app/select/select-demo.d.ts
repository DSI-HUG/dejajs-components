import { OnInit } from '@angular/core';
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
    protected confirmUnselection(): () => Promise<any>;
    private handleError(error);
}
