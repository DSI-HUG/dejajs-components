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

import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { IItemTree } from '../../common/core';
import { CountriesListService } from '../services/countries-list.service';
import { CountriesService, ICountry } from '../services/countries.service';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'deja-select-demo',
    styleUrls: ['./select-demo.scss'],
    templateUrl: './select-demo.html',
})
export class SelectDemoComponent extends OnInit {
    protected country: ICountry;
    private countries: Observable<ICountry[]>;
    private countriesForTemplate: ICountry[];
    private countriesForMultiselect: ICountry[];
    private groupedCountries: IItemTree[];
    private multiselectModel: IItemTree[];
    private dialogVisible = false;

    @ViewChild('dialog') private dialogWrapper: ElementRef;

    constructor(private countriesService: CountriesService, protected countriesListService: CountriesListService) {
        super();
        this.multiselectModel = JSON.parse('[{"naqme":"ÅlandIslands","code":"AX","displayName":"ÅlandIslands","depth":0,"odd":true,"selected":true},{"naqme":"AmericanSamoa","code":"AS","displayName":"AmericanSamoa","depth":0,"odd":false,"selected":true},{"naqme":"Argentina","code":"AR","displayName":"Argentina","depth":0,"odd":false,"selected":true},{"naqme":"ChristmasIsland","code":"CX","displayName":"ChristmasIsland","depth":0,"odd":false,"selected":true},{"naqme":"Egypt","code":"EG","displayName":"Egypt","depth":0,"odd":true,"selected":true},{"naqme":"Dominica","code":"DM","displayName":"Dominica","depth":0,"odd":false,"selected":true}]');
    }

    public ngOnInit() {
        this.country = {
            code: 'CH',
            displayName: 'Switzerland',
            naqme: 'Switzerland',
            color: 'rgb(211, 47, 47)',
        };

        this.countries = this.countriesService.getCountries();

        this.countriesService.getCountries().subscribe((value: ICountry[]) => {
            const result = [] as any[];
            value.map((s) => {
                s.toString = () => { return s.code + ' - ' + s.naqme; };
                result.push(s);
            });
            this.countriesForTemplate = result;
        }, (error) => this.handleError(error));

        this.countriesService.getCountries().subscribe((value: ICountry[]) => {
            /*let selection = {};
             event && event.selection.map(s => selection[s.code] = s);
             let result = [] as any[];
             value.map(s => {
             if (!selection[s.code]) {
             s.toString = () => { return s.code + ' - ' + s.naqme; };
             result.push(s);
             }
             });*/

            this.countriesForMultiselect = value;

            setTimeout(() => {
                this.multiselectModel = JSON.parse('[{"naqme":"ÅlandIslands","code":"AX","displayName":"ÅlandIslands","depth":0,"odd":true,"selected":true},{"naqme":"AmericanSamoa","code":"AS","displayName":"AmericanSamoa","depth":0,"odd":false,"selected":true},{"naqme":"Argentina","code":"AR","displayName":"Argentina","depth":0,"odd":false,"selected":true},{"naqme":"ChristmasIsland","code":"CX","displayName":"ChristmasIsland","depth":0,"odd":false,"selected":true},{"naqme":"Egypt","code":"EG","displayName":"Egypt","depth":0,"odd":true,"selected":true},{"naqme":"Dominica","code":"DM","displayName":"Dominica","depth":0,"odd":false,"selected":true}]');
            }, 10);
        }, (error) => this.handleError(error));

        this.countriesService.getCountries().subscribe((value: ICountry[]) => {
            const result = [] as ISelectCountry[];
            const map = {} as { [groupName: string]: ISelectCountry[] };
            value.map((country) => {
                const groupName = 'Group ' + country.naqme[0];
                if (!map[groupName]) {
                    map[groupName] = [] as IItemTree[];
                    result.push({
                        collapsible: true,
                        groupName: groupName,
                        items: map[groupName],
                    });
                }

                /*let subGroupName = 'Subgroup ' + country.naqme[1];
                 if (!map[groupName + subGroupName]) {
                 map[groupName + subGroupName] = [] as IItemTree[];
                 map[groupName].push({
                 items: map[groupName + subGroupName],
                 suGroupName: subGroupName,
                 collapsible: true,
                 });
                 }*/

                map[groupName].push(country);
            });

            this.groupedCountries = result;
        }, (error) => this.handleError(error));
    }

    protected confirmUnselection() {
        return () => {
            this.dialogVisible = true;
            const self = this;
            return new Promise<any>((resolve?: () => void, reject?: (reason: any) => void) => {
                Observable
                    .fromEvent(this.dialogWrapper.nativeElement, 'click').first().subscribe((e: Event) => {
                    let parentElement = e.target as HTMLElement;

                    while (parentElement && parentElement !== this.dialogWrapper.nativeElement) {
                        if (parentElement.id === 'okbtn') {
                            resolve();
                        } else if (parentElement.id === 'cancelbtn') {
                            reject('Canceled by the user.');
                        }
                        parentElement = parentElement.parentElement;
                    }

                    self.dialogVisible = false;
                });
            });
        };
    }

    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}

interface ISelectCountry extends IItemTree {
    groupName?: string;
    suGroupName?: string;
    items?: IItemTree[];
}
