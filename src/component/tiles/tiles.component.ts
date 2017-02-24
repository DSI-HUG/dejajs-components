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

import { AfterViewInit, Component, ContentChild, ElementRef, EventEmitter, Input, OnDestroy, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { coerceBooleanProperty } from '@angular/material/core/coercion/boolean-property';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs/Rx';
import { Rect } from '../../common/core/graphics';
import { CloningService } from '../../common/core/cloning';
import { KeyCodes } from '../../common/core';
import { DejaTile, DejaTileComponent, IDejaTilesEvent, IDejaTile, IDejaTileEvent } from './index';
import { DejaTilesLayoutProvider } from './tiles-layout.provider';

@Component({
    providers: [DejaTilesLayoutProvider],
    selector: 'deja-tiles',
    styleUrls: [
        './tiles.component.scss',
    ],
    templateUrl: './tiles.component.html',
})
export class DejaTilesComponent implements AfterViewInit, OnDestroy {
    @Output() public tileTitleEditClick = new EventEmitter<IDejaTileEvent>();
    @Output() public selectionChanged = new EventEmitter<IDejaTilesEvent>();
    @Output() public layoutChanged = new EventEmitter<IDejaTilesEvent>();
    @Output() public modelChanged = new EventEmitter<IDejaTilesEvent>();
    @ContentChild('tileTemplate') public tileTemplate;
    @ViewChildren(DejaTileComponent) public tileComponents: QueryList<DejaTileComponent>;
    @ViewChild('tilesContainer') private tilesContainer: ElementRef;

    public cut$ = new Subject();
    public copy$ = new Subject();
    public paste$ = new Subject();
    public delete$ = new Subject();

    private _models = [] as IDejaTile[];
    private _designMode = false;
    private _modelsDic = {} as { [id: string]: IDejaTile };
    private deleteSubscriber: Subscription;
    private copySubscriber: Subscription;
    private cutSubscriber: Subscription;
    private pasteSubscriber: Subscription;
    private keyup$: Observable<KeyboardEvent>;
    private tiles$ = new BehaviorSubject<DejaTile[]>([]);

    constructor(el: ElementRef, private layoutProvider: DejaTilesLayoutProvider, private cloningService: CloningService) {
        const element = this.layoutProvider.container = el.nativeElement as HTMLElement;

        this.layoutProvider.selectionChanges$.subscribe((tiles) => {
            const event = {} as IDejaTilesEvent;
            event.tiles = tiles;
            this.selectionChanged.emit(event);
        });

        this.layoutProvider.layoutChanges$.subscribe((tiles) => {
            const event = {} as IDejaTilesEvent;
            event.tiles = tiles.map((tile) => this._modelsDic[tile.id] || this._models.find((m) => tile.equalsTo(m)));
            this.layoutChanged.emit(event);
        });

        this.keyup$ = Observable.fromEvent(element.ownerDocument, 'keyup');

        Observable.from(this.paste$)
            .map(() => DejaTilesLayoutProvider.copyBag)
            .filter((tiles) => !!tiles)
            .subscribe((tiles) => {
                const models = this.models;

                models.forEach((m) => m.selected = false);

                // Get max rectangle
                let bounds: Rect;
                tiles.forEach((tile) => {
                    bounds = bounds ? Rect.union(bounds, tile.bounds) : new Rect(tile.bounds);
                });

                tiles.forEach((tile) => {
                    tile.bounds.left -= bounds.left;
                    tile.bounds.top -= bounds.top;
                });

                bounds = this.getFreePlace(null, null, bounds.width, bounds.height);

                tiles
                    .map((m) => this.cloningService.cloneSync(m) as IDejaTile)
                    .forEach((m) => {
                        m.bounds = new Rect(
                            bounds.left + m.bounds.left || 0,
                            bounds.top + m.bounds.top || 0,
                            m.bounds.width || 15,
                            m.bounds.height || 15,
                        );
                        m.id = undefined;
                        m.selected = true;
                        models.push(m);
                    });

                this.models = models;
                this.onModelChange(this.models);
            });

        Observable.from(this.cut$)
            .subscribe(() => {
                this.copy$.next();
                this.delete$.next();
            });

        Observable.from(this.copy$)
            .subscribe(() => {
                DejaTilesLayoutProvider.copyBag = this.mapTiles(this.layoutProvider.tiles
                    .filter((tile) => tile.isSelected));
            });

        Observable.from(this.delete$)
            .subscribe(() => {
                this.models = this.mapTiles(this.layoutProvider.tiles.filter((tile) => !tile.isSelected));
                this.onModelChange(this.models);
            });
    }

    @Input()
    public set tileminwidth(value: string) {
        this.layoutProvider.tileminwidth = value;
    }

    @Input()
    public set tilemaxwidth(value: string) {
        this.layoutProvider.tilemaxwidth = value;
    }

    @Input()
    public set tileminheight(value: string) {
        this.layoutProvider.tileminheight = value;
    }

    @Input()
    public set tilemaxheight(value: string) {
        this.layoutProvider.tilemaxheight = value;
    }

    @Input()
    public set maxwidth(value: string) {
        this.layoutProvider.maxwidth = value;
    }

    @Input()
    public set maxheight(value: string) {
        this.layoutProvider.maxheight = value;
    }

    @Input()
    public set designMode(value: boolean) {
        this._designMode = value;
        this.layoutProvider.designMode$.next(coerceBooleanProperty(value));
    };

    @Input()
    public set models(models: IDejaTile[]) {
        this._models = models || [];
        this._modelsDic = {};

        this._models
            .filter((t) => !!t.id)
            .forEach((t) => this._modelsDic[t.id] = t);

        this.tiles$.next(this.layoutProvider.tiles = (models && models.map((tile) => new DejaTile(tile))) || []);
    }

    public get models() {
        return this._models;
    }

    @Input()
    public set canDelete(value: boolean) {
        if (coerceBooleanProperty(value)) {
            this.deleteSubscriber = this.keyup$
                .filter((event: KeyboardEvent) => event.keyCode === KeyCodes.Delete)
                .filter(() => this._designMode)
                .subscribe(() => this.delete$.next());

        } else if (this.deleteSubscriber) {
            this.deleteSubscriber.unsubscribe();
            this.deleteSubscriber = undefined;
        }
    }

    @Input()
    public set canCopy(value: boolean) {
        if (coerceBooleanProperty(value)) {
            this.copySubscriber = this.keyup$
                .filter((event: KeyboardEvent) => event.keyCode === KeyCodes.KeyC && event.ctrlKey)
                .subscribe(() => this.copy$.next());

        } else if (this.copySubscriber) {
            this.copySubscriber.unsubscribe();
            this.copySubscriber = undefined;
        }
    }

    @Input()
    public set canCut(value: boolean) {
        if (coerceBooleanProperty(value)) {
            this.cutSubscriber = this.keyup$
                .filter((event: KeyboardEvent) => event.keyCode === KeyCodes.KeyX && event.ctrlKey)
                .filter(() => this._designMode)
                .subscribe(() => this.cut$.next());

        } else if (this.cutSubscriber) {
            this.cutSubscriber.unsubscribe();
            this.cutSubscriber = undefined;
        }
    }

    @Input()
    public set canPaste(value: boolean) {
        if (coerceBooleanProperty(value)) {
            this.pasteSubscriber = this.keyup$
                .filter((event: KeyboardEvent) => event.keyCode === KeyCodes.KeyV && event.ctrlKey)
                .filter(() => this._designMode)
                .subscribe(() => this.paste$.next());

        } else if (this.pasteSubscriber) {
            this.pasteSubscriber.unsubscribe();
            this.pasteSubscriber = undefined;
        }
    }

    @Input()
    public set selectedTiles(selectedTiles: IDejaTile[]) {
        this.layoutProvider.selectionChanges$.next(selectedTiles);
    }

    public ngAfterViewInit() {
        Observable.fromEvent(window, 'resize').subscribe(() => {
            this.refresh();
        });
    }

    public ngOnDestroy() {
        if (this.deleteSubscriber) {
            this.deleteSubscriber.unsubscribe();
        }
        if (this.copySubscriber) {
            this.copySubscriber.unsubscribe();
        }
        if (this.cutSubscriber) {
            this.cutSubscriber.unsubscribe();
        }
        if (this.pasteSubscriber) {
            this.pasteSubscriber.unsubscribe();
        }
    }

    public onTitleEditClicked(e: Event, tile: IDejaTile) {
        const event = e as IDejaTileEvent;
        event.tile = tile;
        this.tileTitleEditClick.emit(event);
    }

    public ensureVisible(tile: IDejaTile) {
        this.layoutProvider.ensureVisible$.next(tile);
    }

    public expandTile(tile: IDejaTile, pixelheight: number) {
        this.layoutProvider.expandTile(tile, pixelheight);
    }

    public cancelExpand() {
        this.layoutProvider.cancelExpand();
    }

    public refresh() {
        this.layoutProvider.refreshTiles$.next(true);
    }

    public getFreePlace(pageX?: number, pageY?: number, width?: number, height?: number) {
        if (!this._models || this._models.length === 0) {
            return new Rect(0, 0, width, height);
        }

        // Check if we drag on a tile
        const containerElement = this.tilesContainer.nativeElement as HTMLElement;
        const containerBounds = containerElement.getBoundingClientRect();

        const x = pageX ? (pageX - containerBounds.left) : 0;
        const y = pageY ? (pageY - containerBounds.top) : 0;

        return this.layoutProvider.getFreePlace(new Rect(this.layoutProvider.getPercentSize(x), this.layoutProvider.getPercentSize(y), width, height));
    }

    protected onDragStart() {
        // Disallow HTML drag and drop in design mode
        return !this.layoutProvider.isDesignMode;
    }

    protected onModelChange(tiles: IDejaTile[]) {
        const event = {} as IDejaTilesEvent;
        event.tiles = tiles;
        this.modelChanged.emit(event);
    }

    private mapTiles(tiles: DejaTile[]) {
        return tiles.map((tile) => ({
            id: tile.id,
            type: tile.type,
            color: tile.color,
            bounds: tile.percentBounds,
            expanded: tile.expanded,
            selected: tile.selected,
            templateModel: tile.templateModel,
        } as IDejaTile));
    }
}
