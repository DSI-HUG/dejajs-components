/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { IDejaMouseDraggableContext, IDejaMouseDroppableContext, IDropCursorInfos } from '@deja-js/component/mouse-dragdrop';
import { DejaTile, IDejaTilesAddEvent, IDejaTilesRemoveEvent } from '@deja-js/component/tiles';
import { Rect } from '@deja-js/core';
import { DejaMessageBoxType } from 'projects/deja-js/component/message-box';
import { from, Observable, Subject } from 'rxjs';
import { defaultIfEmpty, map, reduce, scan, switchMap, take } from 'rxjs/operators';

import { CountriesService, Country } from '../services/countries.service';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'deja-tiles-demo',
    styleUrls: ['./tiles-demo.scss'],
    templateUrl: './tiles-demo.html'
})
export class DejaTilesDemoComponent implements OnInit {
    public tabIndex = 1;
    public messages$: Observable<IMessage[]>;
    public tiles1$: Observable<DejaTile[]>;
    public tiles2$: Observable<DejaTile[]>;
    public designMode = false;

    private message$ = new Subject<IMessage>();

    private countriesMap: Map<string, Country>;

    public constructor(private countriesService: CountriesService) {
        this.messages$ = from(this.message$).pipe(
            scan((acc, curr) => [...acc, curr], [] as IMessage[]),
            defaultIfEmpty([]));
    }

    public ngOnInit(): void {
        let x1 = 0;
        let y1 = 0;
        let x2 = 0;
        let y2 = 0;

        this.countriesMap = new Map();

        const tiles$ = this.countriesService.getCountries$().pipe(
            switchMap(countries => countries));

        this.tiles1$ = tiles$.pipe(
            take(12),
            map(country => {
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
            map(country => {
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
    }

    public getDragContext(): IDejaMouseDraggableContext {
        return {
            target: 'deja-tile',
            className: 'deja-tile-cursor',
            dragStart: target => {
                const country = this.countriesMap.get(target.id);
                const tile = new DejaTile();
                tile.percentBounds = new Rect(0, 0, 15, 15);
                tile.color = country.color;
                tile.templateModel = country;

                return {
                    country: country,
                    // eslint-disable-next-line @typescript-eslint/naming-convention
                    DejaTile: tile
                };
            }
        } as IDejaMouseDraggableContext;
    }

    public getDropContext(dropArea: HTMLElement): IDejaMouseDroppableContext {
        return {
            dragEnter: _dragContext => ({
                width: 200,
                height: 60,
                className: 'country-target-cursor'
            } as IDropCursorInfos),
            drop: dragContext => {
                const country = dragContext.country as Country;
                dropArea.innerText = `The dropped country is ${country.naqme} - the code is: ${country.code}`;
            }
        } as IDejaMouseDroppableContext;
    }

    public onContentAdding(event: IDejaTilesAddEvent): void {
        this.message$.next({
            title: 'Tiles added',
            content: `${event.added.length} tiles added.`,
            type: 'warn',
            gate: true,
            cancel: function(value: boolean) {
                this.gate = false;
                event.cancel$.next(value);
            }
        } as IMessage);

        // Wait for message box validating the added tiles
        event.preventDefault();
    }

    public onContentRemoving(event: IDejaTilesRemoveEvent): void {
        this.message$.next({
            title: 'Tiles deleted',
            content: `${event.removed.length} tiles deleted.`,
            type: 'warn',
            gate: true,
            cancel: function(value: boolean) {
                this.gate = false;
                event.cancel$.next(value);
            }
        } as IMessage);

        // Wait for message box answer before destruction of the tiles
        event.preventDefault();
    }
}

interface IMessage {
    content: string;
    title: string;
    type: DejaMessageBoxType;
    gate: boolean;
    cancel(value: boolean): void;
}
