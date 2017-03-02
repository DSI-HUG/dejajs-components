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

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Rect } from '../../common/core/graphics/index';
import { MaterialColors } from '../../common/core/style/index';
import { IDejaMouseDraggableContext, IDejaMouseDroppableContext, IDejaTilesAddEvent, IDejaTile, IDejaTilesRemoveEvent, IDropCursorInfos } from '../../component';
import { CountriesService, ICountry } from '../services/countries.service';
import { Observable, Subject } from 'rxjs/Rx';

@Component({
    selector: 'deja-tiles-demo',
    styleUrls: ['./tiles-demo.scss'],
    templateUrl: './tiles-demo.html',
    encapsulation: ViewEncapsulation.None,
})
export class TilesDemoComponent implements OnInit {
    protected designMode = false;
    private messages$: Observable<IMessage[]>;
    private message$ = new Subject<IMessage>();
    private tiles1$: Observable<IDejaTile[]>;
    private tiles2$: Observable<IDejaTile[]>;

    constructor(private countriesService: CountriesService, private materialColors: MaterialColors) {
        this.messages$ = Observable.from(this.message$)
            .scan((acc, curr) => [...acc, curr], [])
            .defaultIfEmpty([]);
    }

    protected get debug() {
        // Check binding
        // console.log('bind ' + Date.now());
        return null;
    }

    public ngOnInit() {
        let x1 = 0;
        let y1 = 0;
        let x2 = 0;
        let y2 = 0;
        const colors = this.materialColors.getPalet('700');
        let colorIndex = 0;

        const tiles$ = this.countriesService.getCountries()
            .switchMap((countries) => countries);

        this.tiles1$ = tiles$
            .take(12)
            .map((country) => {
                const model = {
                    color: colors[colorIndex].toHex(),
                    country: country,
                } as ITemplateModel;

                const tile = {
                    bounds: new Rect(x1, y1, 15, 15),
                    id: country.code,
                    templateModel: model,
                } as IDejaTile;

                if (++colorIndex >= colors.length) {
                    colorIndex = 0;
                }

                x1 += 15;
                if (x1 + 15 > 100) {
                    x1 = 0;
                    y1 += 15;
                }

                return tile;
            })
            .reduce((acc, curr) => {
                acc.push(curr);
                return acc;
            }, []);

        this.tiles2$ = tiles$
            .map((country) => {
                const tile = {
                    bounds: new Rect(x2, y2, 15, 15),
                    id: country.code,
                    templateModel: {
                        color: colors[colorIndex].toHex(),
                        country: country,
                    } as ITemplateModel,
                } as IDejaTile;

                if (++colorIndex >= colors.length) {
                    colorIndex = 0;
                }

                x2 += 15;
                if (x2 + 15 > 100) {
                    x2 = 0;
                    y2 += 15;
                }

                return tile;
            })
            .reduce((acc, curr) => {
                acc.push(curr);
                return acc;
            }, []);
    }

    protected getDragContext() {
        return {
            target: 'deja-tile',
            className: 'deja-tile-cursor',
            dragStart: (target) => {
                return this.countriesService.getCountyByCode(target.id);
            },
        } as IDejaMouseDraggableContext;
    }

    protected getDropContext(dropArea: HTMLElement) {
        return {
            dragEnter: (_dragContext) => {
                return {
                    width: 200,
                    height: 60,
                    className: 'country-target-cursor',
                } as IDropCursorInfos;
            },
            drop: (dragContext) => {
                const country = dragContext as ICountry;
                dropArea.innerText = `The dropped country is ${country.naqme} - the code is: ${country.code}`;
            },
        } as IDejaMouseDroppableContext;
    }

    protected onContentAdded(event: IDejaTilesAddEvent) {
        this.message$.next({
            title: 'Tiles added',
            content: `${event.added.length} tiles added.`,
            type: 'warn',
            gate: true,
            cancel: function (value: boolean) {
                this.gate = false;
                event.cancel$.next(value);
            },
        } as IMessage);

        // Wait for message box validating the added tiles
        event.preventDefault();
    }

    protected onContentRemoved(event: IDejaTilesRemoveEvent) {
        this.message$.next({
            title: 'Tiles deleted',
            content: `${event.removed.length} tiles deleted.`,
            type: 'warn',
            gate: true,
            cancel: function (value: boolean) {
                this.gate = false;
                event.cancel$.next(value);
            },
        } as IMessage);

        // Wait for message box answer before destruction of the tiles
        event.preventDefault();
    }
}

interface ITemplateModel {
    color: string;
    country: ICountry;
}

interface IMessage {
    content: string;
    title: string;
    type: string;
    gate: boolean;
    cancel: () => {};
}
