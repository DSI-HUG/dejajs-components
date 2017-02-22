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

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Rect } from '../../common/core/graphics/index';
import { MaterialColors } from '../../common/core/style/index';
import { IDejaDragEvent, IDejaTile, IDejaTileEvent } from '../../component';
import { CountriesService, ICountry } from '../services/countries.service';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'deja-tiles-demo',
    styleUrls: ['./tiles-demo.scss'],
    templateUrl: './tiles-demo.html',
    encapsulation: ViewEncapsulation.None,
})
export class TilesDemo implements OnInit {
    protected designMode = false;
    private tiles: Observable<IDejaTile[]>;

    constructor(private countriesService: CountriesService, private materialColors: MaterialColors) {
    }

    protected get debug() {
        // Check binding
        console.log('bind ' + Date.now());
        return null;
    }

    public ngOnInit() {
        let x = 0;
        let y = 0;
        const colors = this.materialColors.getPalet('700');
        let colorIndex = 0;
        this.tiles = this.countriesService.getCountries()
            .switchMap((countries) => countries)
            .map((country) => {
                const tile = {
                    bounds: new Rect(x, y, 15, 15),
                    id: country.code,
                    templateModel: {
                        color: colors[colorIndex].toHex(),
                        country: country,
                    } as ITemplateModel,
                } as IDejaTile;

                if (++colorIndex >= colors.length) {
                    colorIndex = 0;
                }

                x += 15;
                if (x + 15 > 100) {
                    x = 0;
                    y += 15;
                }

                return tile;
            })
            .reduce((acc, curr) => {
                acc.push(curr);
                return acc;
            }, []);
    }

    protected getDragContext(tile: IDejaTile) {
        return {
            dragendcallback: () => {

            },
            dragstartcallback: (event: IDejaDragEvent) => {
                event.dragObject = tile;
                event.dragInfo['button'] = tile;
            },
        };
    }

    protected getDropContext() {
        return {
            dragovercallback: (event: IDejaDragEvent) => {
                if (event.dragInfo.hasOwnProperty('button')) {
                    event.preventDefault();
                }
            },
            dropcallback: (event: IDejaDragEvent) => {
                if (event.dragInfo.hasOwnProperty('button')) {
                    const model = event.dragInfo['button'] as ITemplateModel;
                    (event.target as HTMLElement).innerText = `The dropped country is ${model.country.naqme} - the code is: ${model.country.code}`;
                    event.preventDefault();
                }
            },
        };
    }

    protected onTitleEditClick(e: IDejaTileEvent) {
        if (e.tile.type === 'group') {
            /*this.groupNamePrompt.title = 'Editer un groupe';
             this.groupNamePrompt.value = e.tile.templateModel.title;
             this.groupNamePrompt.visible = true;
             this.groupNamePrompt.tile = e.tile;*/
        }
    }
}

interface ITemplateModel {
    color: string;
    country: ICountry;
}
