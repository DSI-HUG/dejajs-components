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
import { Http, ResponseContentType } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { Subscriber } from "rxjs/Subscriber";

@Injectable()
export class CountriesService {
    constructor(private http: Http) { }

    public getCountries(query?: string, number?: number): Observable<ICountry[]> {
        return new Observable<ICountry[]>((resolve: Subscriber<ICountry[]>) => {
            /* resolve.error('Get Countries Error'); */
            number = number || 1;
            let getNextBunch = () => {
                if (--number < 0) {
                    resolve.complete();
                    return;
                }

                this.http.get('src/demo-app/services/countries.json', { responseType: ResponseContentType.Json })
                    .map((response) => {
                        let datas = response.json();
                        let countries = datas.data as ICountry[];
                        countries.forEach((country) => { country.displayName = country.naqme; });

                        if (query) {
                            let sr = new RegExp('^' + query, 'i');
                            let sc = new RegExp('^(?!' + query + ').*(' + query + ')', 'i');
                            let result = countries.filter((z) => sr.test(z.naqme));
                            countries.forEach((z) => {
                                if (sc.test(z.naqme)) {
                                    result.push(z);
                                }
                            });
                            return result;
                        } else {
                            return countries;
                        }
                    })
                    .subscribe((response: ICountry[]) => {
                        resolve.next(response);
                        setTimeout(() => { getNextBunch(); }, 1);
                    });
            };
            getNextBunch();
        });
    }
}

export interface ICountry {
    displayName: string;
    naqme: string;
    code: string;
    equals?: (item: ICountry) => boolean;
}
