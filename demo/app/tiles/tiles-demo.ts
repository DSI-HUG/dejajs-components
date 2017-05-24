/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Rect } from '../../../src/common/core/graphics/rect';
import { IDropCursorInfos } from '../../../src/component/mouse-dragdrop/mouse-dragdrop.service';
import { IDejaMouseDraggableContext } from '../../../src/component/mouse-dragdrop/mouse-draggable.directive';
import { IDejaMouseDroppableContext } from '../../../src/component/mouse-dragdrop/mouse-droppable.directive';
import { IDejaTile } from '../../../src/component/tiles/tile.interface';
import { IDejaTilesAddEvent, IDejaTilesRemoveEvent } from '../../../src/component/tiles/tiles.event';
import { CountriesService, ICountry } from '../services/countries.service';

@Component({
    selector: 'deja-tiles-demo',
    styleUrls: ['./tiles-demo.scss'],
    templateUrl: './tiles-demo.html',
    encapsulation: ViewEncapsulation.None,
})
export class TilesDemoComponent implements OnInit {
    protected tabIndex = 1;

    protected designMode = false;

    private messages$: Observable<IMessage[]>;
    private message$ = new Subject<IMessage>();
    private tiles1$: Observable<IDejaTile[]>;
    private tiles2$: Observable<IDejaTile[]>;

    constructor(private countriesService: CountriesService) {
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

        const tiles$ = this.countriesService.getCountries$()
            .switchMap((countries) => countries);

        this.tiles1$ = tiles$
            .take(12)
            .map((country) => {
                const tile = {
                    bounds: new Rect(x1, y1, 15, 15),
                    id: country.code,
                    templateModel: country,
                } as IDejaTile;

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
                    templateModel: country,
                } as IDejaTile;

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
                return this.countriesService.getCountryByCode$(target.id)
                    .map((country) => {
                        return {
                            country: country,
                            IDejaTile: {
                                id: country.code,
                                type: country.displayName,
                                bounds: new Rect(0, 0, 15, 15),
                                templateModel: country,
                            } as IDejaTile,
                        };
                    });
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
                const country = dragContext['country'] as ICountry;
                dropArea.innerText = `The dropped country is ${country.naqme} - the code is: ${country.code}`;
            },
        } as IDejaMouseDroppableContext;
    }

    protected onContentAdding(event: IDejaTilesAddEvent) {
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

    protected onContentRemoving(event: IDejaTilesRemoveEvent) {
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

interface IMessage {
    content: string;
    title: string;
    type: string;
    gate: boolean;
    cancel: () => {};
}
