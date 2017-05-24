/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Injectable } from '@angular/core';
import { Http, ResponseContentType } from '@angular/http';
import 'rxjs/add/operator/repeat';
import { Observable } from 'rxjs/Observable';
import { IGroupInfo } from '../../../src/common/core/grouping/group-infos';
import { GroupingService } from '../../../src/common/core/grouping/grouping.service';

@Injectable()
export class DrugsService {
    constructor(private http: Http, private groupingService: GroupingService) { }

    public getGroupedDrugs$(query?: string): Observable<IDrug[]> {
        return this.getDrugs$(query)
            .switchMap((drugs) => {
                const groupInfos = [
                    {
                        groupByField: 'fulfillexpeditecriteria',
                    },
                    {
                        groupByField: 'patientonsetageunit',
                    },
                ] as IGroupInfo[];

                return this.groupingService.group$(drugs, groupInfos);
            });
    }

    public getDrugs$(query?: string, number?: number) {
        return this.http.get('https://raw.githubusercontent.com/DSI-HUG/dejajs-components/dev/demo-app/services/drugs.json', { responseType: ResponseContentType.Json })
            .map((response: any) => {
                const datas = response.json();
                const drugs = datas.data as IDrug[];

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
                    const sr = new RegExp('^' + query, 'i');
                    const sc = new RegExp('^(?!' + query + ').*(' + query + ')', 'i');
                    const result = drugs.filter((z) => sr.test(z.receivedate));
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
            .repeat(number || 1);
    }
}

export interface IDrug {
    indexedText: string;
    receivedate: string;
    companynumb: string;
    safetyreportid: string;
}
