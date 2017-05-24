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
export class PeopleService {
    private peopleDic = {} as { [code: string]: IPerson };
    private materialColors: Color[];

    constructor(private http: Http, materialColors: MaterialColors) {
        this.materialColors = materialColors.getPalet('700');
    }

    public getPeople$(query?: string, number?: number): Observable<IPerson[]> {
        let recordCount = number || 0;
        return this.http.get('https://raw.githubusercontent.com/DSI-HUG/dejajs-components/dev/demo/app/services/people.json', { responseType: ResponseContentType.Json })
            .map((response) => response.json())
            .map((datas) => datas.data as IPerson[])
            .map((people) => {
                let colorIndex = 0;
                people.forEach((person) => {
                    person.color = this.materialColors[colorIndex].toHex();
                    this.peopleDic[person.guid] = person;

                    if (++colorIndex >= this.materialColors.length) {
                        colorIndex = 0;
                    }
                });
                return people;
            })
            .publishLast()
            .refCount()
            .map((people) => {
                if (query) {
                    const sr = new RegExp('^' + query, 'i');
                    const sc = new RegExp('^(?!' + query + ').*(' + query + ')', 'i');
                    const result = people.filter((z) => sr.test(z.name));
                    people.forEach((z) => {
                        if (sc.test(z.name)) {
                            result.push(z);
                        }
                    });
                    return result;
                } else {
                    return people;
                }
            })
            .map((people) => {
                let returnPeople = people;
                if (recordCount) {
                    while (recordCount > 0) {
                        returnPeople = returnPeople.concat(people);
                        recordCount -= people.length;
                    }
                }
                return returnPeople;
            });
    }
}

export interface IPerson {
    _id: string,
    index: number,
    guid: string,
    isActive: boolean,
    balance: number,
    picture: string,
    age: number,
    eyeColor: string,
    name: string,
    gender: string,
    company: string,
    email: string,
    phone: string,
    address: string,
    about: string,
    registered: Date,
    latitude: number,
    longitude: number,
    tags: string[],
    color: string,
    friends: [
        {
            id: number,
            name: string
        }
    ],
    greeting: string,
    favoriteFruit: string,
}

