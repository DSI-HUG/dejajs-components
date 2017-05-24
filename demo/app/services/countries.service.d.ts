import { Http } from '@angular/http';
import 'rxjs/add/operator/publishLast';
import { Observable } from 'rxjs/Observable';
import { MaterialColors } from '../../index';
export declare class CountriesService {
    private http;
    private countriesDic;
    private materialColors;
    constructor(http: Http, materialColors: MaterialColors);
    getCountryByIndex$(index: number): Observable<ICountry>;
    getCountryByCode$(code: string): Observable<ICountry>;
    getCountries$(query?: string, number?: number): Observable<ICountry[]>;
}
export interface ICountry {
    displayName?: string;
    naqme: string;
    code: string;
    color?: string;
    equals?: (item: ICountry) => boolean;
}
