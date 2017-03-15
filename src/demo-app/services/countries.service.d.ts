import { Http } from '@angular/http';
import { MaterialColors } from '../../common/core/style/index';
import { Observable } from 'rxjs/Observable';
export declare class CountriesService {
    private http;
    private materialColors;
    private countriesDic;
    constructor(http: Http, materialColors: MaterialColors);
    getCountryByIndex$(index: number): Observable<ICountry>;
    getCountryByCode$(code: string): Observable<ICountry>;
    getCountries$(query?: string, number?: number): Observable<ICountry[]>;
}
export interface ICountry {
    displayName: string;
    naqme: string;
    code: string;
    color: string;
    equals?: (item: ICountry) => boolean;
}
