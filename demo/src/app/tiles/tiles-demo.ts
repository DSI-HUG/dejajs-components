/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Rect } from '@deja-js/component';
import { IDejaMouseDraggableContext } from '@deja-js/component';
import { IDejaMouseDroppableContext } from '@deja-js/component';
import { IDropCursorInfos } from '@deja-js/component';
import { IDejaTilesAddEvent, IDejaTilesRemoveEvent } from '@deja-js/component';
import { from as observableFrom, Observable, of, Subject } from 'rxjs';
import { defaultIfEmpty, map, reduce, scan, switchMap, take } from 'rxjs/operators';
import { DejaTileGroup } from '../../../../src/component/tiles/tile-group.class';
import { DejaTile } from '../../../../src/component/tiles/tile.class';
import { DejaTilesComponent } from '../../../../src/component/tiles/tiles.component';
import { CountriesService, Country } from '../services/countries.service';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'deja-tiles-demo',
    styleUrls: ['./tiles-demo.scss'],
    templateUrl: './tiles-demo.html',
})
export class DejaTilesDemoComponent implements OnInit {
    public tabIndex = 1;
    public messages$: Observable<IMessage[]>;
    public tiles1$: Observable<DejaTile[]>;
    public tiles2$: Observable<DejaTile[]>;
    public tiles3$: Observable<DejaTile[]>;
    public designMode = false;

    private message$ = new Subject<IMessage>();

    private countriesMap: Map<string, Country>;

    constructor(private countriesService: CountriesService) {
        this.messages$ = observableFrom(this.message$).pipe(
            scan((acc: any[], curr: any) => [...acc, curr], []),
            defaultIfEmpty([]));
    }

    public ngOnInit() {
        let x1 = 0;
        let y1 = 0;
        let x2 = 0;
        let y2 = 0;

        this.countriesMap = new Map();

        const tiles$ = this.countriesService.getCountries$().pipe(
            switchMap((countries) => countries));

        this.tiles1$ = tiles$.pipe(
            take(12),
            map((country) => {
                const tile = new DejaTile();
                tile.percentBounds = new Rect(x1, y1, 15, 15);
                tile.color = country.color;
                tile.templateModel = country;

                x1 += 15;
                if (x1 + 15 > 100) {
                    x1 = 0;
                    y1 += 15;
                }

                // Map for drag and drop
                this.countriesMap.set(tile.id, country);

                return tile;
            }),
            reduce((acc: DejaTile[], cur: DejaTile) => [...acc, cur], []));

        this.tiles2$ = tiles$.pipe(
            map((country) => {
                const tile = new DejaTile();
                tile.percentBounds = new Rect(x2, y2, 15, 15);
                tile.color = country.color;
                tile.templateModel = country;

                x2 += 15;
                if (x2 + 15 > 100) {
                    x2 = 0;
                    y2 += 15;
                }

                return tile;
            }),
            reduce((acc: DejaTile[], cur: DejaTile) => [...acc, cur], []));

        const tileGroup = new DejaTileGroup();
        tileGroup.percentBounds = new Rect(x2, y2, 60, 30);
        tileGroup.color = '#aba280';
        tileGroup.html = `<div>Tuile <b>éditable</b> de type groupe</div><div><div><p>Utilise le composant deja-editor</p></div></div></div></span></div>`;

        this.tiles3$ = of([tileGroup]);
    }

    public addGroup(tilesComponent: DejaTilesComponent) {
        const tileGroup = new DejaTileGroup();
        tileGroup.html = 'New Group';
        tilesComponent.addTiles([tileGroup]);
    }

    protected getDragContext() {
        return {
            target: 'deja-tile',
            className: 'deja-tile-cursor',
            dragStart: (target) => {
                const country = this.countriesMap.get(target.id);
                const tile = new DejaTile();
                tile.percentBounds = new Rect(0, 0, 15, 15);
                tile.color = country.color;
                tile.templateModel = country;

                return {
                    country: country,
                    DejaTile: tile,
                };
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
                const country = dragContext.country as Country;
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
    cancel(): {};
}
