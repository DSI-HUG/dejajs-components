/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Injectable } from '@angular/core';
import { Http, ResponseContentType } from '@angular/http';
import 'rxjs/add/operator/publishLast';
import { Observable } from 'rxjs/Observable';
import { Color } from '../../../src/common/core/graphics/color';
import { MaterialColors } from '../../../src/common/core/style/material-colors';

@Injectable()
export class CountriesService {
    private countriesDic = {} as { [code: string]: ICountry };
    private materialColors: Color[];

    constructor(private http: Http, materialColors: MaterialColors) {
        this.materialColors = materialColors.getPalet('700');
    }

    public getCountryByIndex$(index: number) {
        return this.getCountries$()
            .map((countries) => countries[index % countries.length]);
    }

    public getCountryByCode$(code: string) {
        return Observable.of(this.countriesDic[code]);
    }

    public getCountries$(query?: string, number?: number): Observable<ICountry[]> {
        let recordCount = number || 0;
        return this.http.get('https://raw.githubusercontent.com/DSI-HUG/dejajs-components/dev/demo-app/services/countries.json', { responseType: ResponseContentType.Json })
            .map((response) => response.json())
            .map((datas) => datas.data as ICountry[])
            .map((countries) => {
                let colorIndex = 0;
                countries.forEach((country) => {
                    country.displayName = country.naqme;
                    country.color = this.materialColors[colorIndex].toHex();
                    this.countriesDic[country.code] = country;

                    if (++colorIndex >= this.materialColors.length) {
                        colorIndex = 0;
                    }
                });
                return countries;
            })
            .publishLast()
            .refCount()
            .map((countries) => {
                if (query) {
                    const sr = new RegExp('^' + query, 'i');
                    const sc = new RegExp('^(?!' + query + ').*(' + query + ')', 'i');
                    const result = countries.filter((z) => sr.test(z.naqme));
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
            .map((countries) => {
                let returnCountries = countries;
                if (recordCount) {
                    while (recordCount > 0) {
                        returnCountries = returnCountries.concat(countries);
                        recordCount -= countries.length;
                    }
                }
                return returnCountries;
            });
    }
}

export interface ICountry {
    displayName?: string;
    naqme: string;
    code: string;
    color?: string;
    equals?: (item: ICountry) => boolean;
}
