/*
 * *
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 * /
 *
 */

import { Injectable } from "@angular/core";
import { Http, ResponseContentType } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { Subscriber } from "rxjs/Subscriber";
import { setTimeout } from 'timers';
import { GroupingService, IGroupInfo } from '../../common/core';

@Injectable()
export class DrugsService {
    constructor(private http: Http, private groupingService: GroupingService) { }

    public getGroupedDrugs(query?: string): Promise<IDrug[]> {
        return new Promise<IDrug[]>((resolved?: (result: IDrug[]) => void, rejected?: (reason: any) => void) => {
            this.getDrugs(query).toPromise().then((drugs) => {
                let groupInfos = [
                    {
                        groupByField: 'fulfillexpeditecriteria',
                    },
                    {
                        groupByField: 'patientonsetageunit',
                    },
                ] as IGroupInfo[];
                this.groupingService.group(drugs, groupInfos).then((groupedDrugs) => resolved(groupedDrugs)).catch(rejected);
            });
        });
    }

    public getDrugs(query?: string, number?: number): Observable<IDrug[]> {
        return new Observable<IDrug[]>((resolve: Subscriber<IDrug[]>) => {
            /* resolve.error('Get Countries Error'); */
            number = number || 1;
            let getNextBunch = () => {
                if (--number < 0) {
                    resolve.complete();
                    return;
                }

                this.http.get('https://raw.githubusercontent.com/DSI-HUG/dejajs-components/dev/src/demo-app/services/drugs.json', { responseType: ResponseContentType.Json })
                    .map((response: any) => {
                        let datas = response.json();
                        let drugs = datas.data as IDrug[];

                        drugs.forEach((drug) => {
                            Object.keys(drug).forEach((key) => {
                                if (drug[key] && typeof drug[key] === 'object') {
                                    Object.keys(drug[key]).forEach((skey) => {
                                        drug[skey] = drug[key][skey];
                                    });
                                    delete drug[key];
                                }
                            });
                        });

                        if (query) {
                            let sr = new RegExp('^' + query, 'i');
                            let sc = new RegExp('^(?!' + query + ').*(' + query + ')', 'i');
                            let result = drugs.filter((z) => sr.test(z.receivedate));
                            drugs.forEach((z) => {
                                if (sc.test(z.receivedate)) {
                                    result.push(z);
                                }
                            });
                            return result;
                        } else {
                            drugs.forEach((drug) => drug.indexedText = drug.receivedate + ' ' + drug.companynumb + ' ' + drug.safetyreportid);

                            return drugs;
                        }
                    })
                    .subscribe((response: IDrug[]) => {
                        resolve.next(response);
                        setTimeout(() => { getNextBunch(); }, 1);
                    });
            };
            getNextBunch();
        });
    }
}

export interface IDrug {
    indexedText: string;
    receivedate: string;
    companynumb: string;
    safetyreportid: string;
}
