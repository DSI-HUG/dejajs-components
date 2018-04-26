/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Color } from '@deja-js/component';
import { MaterialColors } from '@deja-js/component';
import { UUID } from '@deja-js/component';
import { JsonProperty, ObjectMapper } from 'json-object-mapper';
import * as _ from 'lodash';
import 'rxjs/add/operator/publishLast';
import { Observable } from 'rxjs/Observable';

export class Friend {
    public id: number = void 0;
    public name: string = void 0;
}

export class Person {
    public _id: string = void 0;
    public index: number = void 0;
    public guid: string = void 0;
    public isActive: boolean = void 0;
    public balance: number = void 0;
    public picture: string = void 0;
    public age: number = void 0;
    public eyeColor: string = void 0;
    public name: string = void 0;
    public gender: string = void 0;
    public company: string = void 0;
    public email: string = void 0;
    public phone: string = void 0;
    public address: string = void 0;
    public about: string = void 0;
    @JsonProperty({ type: Date })
    public registered: Date = void 0;
    public latitude: number = void 0;
    public longitude: number = void 0;
    @JsonProperty({ type: String })
    public tags: string[] = void 0;
    public color: string = void 0;
    @JsonProperty({ type: Friend })
    public friends: Friend[] = void 0;
    public greeting: string = void 0;
    public favoriteFruit: string = void 0;
}

@Injectable()
export class PeopleService {
    private peopleDic = {} as { [code: string]: Person };
    private materialColors: Color[];

    constructor(private httpClient: HttpClient, materialColors: MaterialColors) {
        this.materialColors = materialColors.getPalet('700');
    }

    public getPeople$(query?: string, number?: number): Observable<Person[]> {
        let recordCount = number || 0;
        return this.httpClient.get('assets/datas/people.json', { })
            .map((json) => ObjectMapper.deserialize(Person, json))
            .reduce((acc, person) => {
                acc.push(person);
                return acc;
            }, [])
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
                    const sr = new RegExp(`^${query}`, 'i');
                    const sc = new RegExp(`^(?!${query}).*(${query})`, 'i');
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
                        const clonedPeople = people.map((person) => _.cloneDeep(person));
                        returnPeople = returnPeople.concat(clonedPeople.map((person) => {
                            person.guid = (new UUID()).toString();
                            return person;
                        }));
                        recordCount -= people.length;
                    }
                }
                return returnPeople;
            });
    }
}
