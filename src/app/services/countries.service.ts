/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Color, MaterialColorService } from '@deja-js/component/core/graphics';
import { ObjectMapper } from 'json-object-mapper';
import { map, Observable, of, shareReplay, switchMap, throwError } from 'rxjs';

export class Country {
    public displayName?: string = void 0;
    public naqme?: string = void 0;
    public code?: string = void 0;
    public color?: string = void 0;
    public equals?: (item: Country) => boolean;
}

@Injectable({
    providedIn: 'root'
})
export class CountriesService {
    private countriesDic = new Map<string, Country>();
    private materialColors: ReadonlyArray<Color> | undefined;

    private httpClient = inject(HttpClient);
    private materialColorService = inject(MaterialColorService);

    public constructor() {
        this.materialColors = this.materialColorService.getPalet('700');
    }

    public getCountryByIndex$(index: number): Observable<Country> {
        return this.getCountries$().pipe(
            map(countries => countries[index % countries.length]));
    }

    public getCountryByCode$(code: string): Observable<Country | undefined> {
        return of(this.countriesDic.get(code));
    }

    public getCountries$(query?: string, number?: number): Observable<Country[]> {
        let recordCount = number ?? 0;
        return this.httpClient.get<Record<string, unknown>>('assets/datas/countries.json', {}).pipe(
            switchMap(json => {
                if (!json.data) {
                    return throwError(() => new Error('Fail to get countries'));
                }

                return of(ObjectMapper.deserializeArray(Country, json.data));
            }),
            map(countries => {
                let colorIndex = 0;
                countries.forEach(country => {
                    country.displayName = country.naqme;
                    country.color = this.materialColors?.[colorIndex].toHex();
                    if (country.code) {
                        this.countriesDic.set(country.code, country);
                    }

                    if (this.materialColors && ++colorIndex >= this.materialColors.length) {
                        colorIndex = 0;
                    }
                });
                return countries;
            }),
            shareReplay({ bufferSize: 1, refCount: false }),
            map(countries => {
                if (query) {
                    const sr = new RegExp(`^${query}`, 'i');
                    const sc = new RegExp(`^(?!${query}).*(${query})`, 'i');
                    const result = countries.filter(z => z.naqme && sr.test(z.naqme));
                    countries.forEach(z => {
                        if (z.naqme && sc.test(z.naqme)) {
                            result.push(z);
                        }
                    });
                    return result;
                } else {
                    return countries;
                }
            }),
            map(countries => {
                let returnCountries = countries;
                if (recordCount) {
                    // eslint-disable-next-line no-loops/no-loops
                    while (recordCount > 0) {
                        returnCountries = returnCountries.concat(countries);
                        recordCount -= countries.length;
                    }
                }
                return returnCountries;
            })
        );
    }
}
